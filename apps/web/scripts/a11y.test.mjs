#!/usr/bin/env node
// Local accessibility and layout audit for the production build.
//   node apps/web/scripts/a11y.test.mjs
// Serves dist/ with Astro preview, then audits the single-page portfolio at
// desktop and phone widths for axe violations, horizontal overflow, console
// errors and failed requests.
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

import { preview } from "astro";
import { chromium } from "playwright";

const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");

const root = fileURLToPath(new URL("../", import.meta.url));
const port = 4401;
const routes = ["/"];
const viewports = [
	{ name: "desktop", width: 1440, height: 900 },
	{ name: "phone", width: 390, height: 844 },
	{ name: "reduced", width: 1440, height: 900, reducedMotion: "reduce" },
];

const server = await preview({
	root,
	server: { host: "127.0.0.1", port },
	logLevel: "error",
});

const browser = await chromium.launch();
const axeReady = new WeakSet();
let failures = 0;

function report(label, issues) {
	if (issues.length) {
		failures++;
		console.error(`FAIL ${label}`);
		for (const issue of issues) console.error(`  ${issue}`);
	} else {
		console.log(`✓ ${label}`);
	}
}

async function waitForBoot(page) {
	await page.waitForFunction(
		() => {
			const loader = document.getElementById("loader");
			return (
				!loader || loader.hidden || getComputedStyle(loader).display === "none"
			);
		},
		null,
		{ timeout: 10_000 },
	);
	await page.waitForTimeout(1_400);
}

async function audit(page) {
	if (!axeReady.has(page)) {
		await page.addScriptTag({ content: axeSource });
		axeReady.add(page);
	}
	return page.evaluate(async () => {
		const report = await window.axe.run(document, {
			runOnly: {
				type: "tag",
				values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"],
			},
		});
		const root = document.documentElement;
		return {
			violations: report.violations.map((violation) => ({
				id: violation.id,
				impact: violation.impact,
				nodes: violation.nodes.map((node) => node.target.join(" ")),
			})),
			overflow: root.scrollWidth > root.clientWidth,
			scrollWidth: root.scrollWidth,
			clientWidth: root.clientWidth,
		};
	});
}

function auditIssues(result) {
	const issues = [];
	if (result.overflow) {
		issues.push(
			`desbordamiento horizontal ${result.scrollWidth} > ${result.clientWidth}`,
		);
	}
	for (const violation of result.violations) {
		issues.push(
			`a11y ${violation.id}: ${violation.nodes.slice(0, 3).join(", ")}`,
		);
	}
	return issues;
}

try {
	for (const viewport of viewports) {
		const context = await browser.newContext({
			viewport: { width: viewport.width, height: viewport.height },
			reducedMotion: viewport.reducedMotion,
		});

		for (const route of routes) {
			const page = await context.newPage();
			const errors = [];

			page.on("console", (message) => {
				if (message.type() === "error") errors.push(message.text());
			});
			page.on("pageerror", (error) => errors.push(error.message));
			page.on("requestfailed", (request) => {
				errors.push(`${request.url()} ${request.failure()?.errorText ?? ""}`);
			});

			const response = await page.goto(`http://127.0.0.1:${port}${route}`, {
				waitUntil: "load",
			});
			await waitForBoot(page);

			const issues = auditIssues(await audit(page));
			if (!response || response.status() >= 400) {
				issues.push(`HTTP ${response?.status() ?? "sin respuesta"}`);
			}
			report(`${viewport.name} ${route}`, issues);

			report(
				`${viewport.name} ${route} consola`,
				errors.map((error) => `consola: ${error}`),
			);
			await page.close();
		}
		await context.close();
	}
} finally {
	await browser.close();
	await server.stop();
}

if (failures) {
	console.error(`${failures} comprobación(es) fallidas.`);
	process.exit(1);
}
console.log("auditoría de accesibilidad y layout superada");
