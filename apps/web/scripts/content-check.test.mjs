import { execFileSync } from "node:child_process";
import { cpSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(scriptDir, "..");
const contentSource = join(appRoot, "src/content");
const checkScript = join(scriptDir, "content-check.mjs");
const repoRoot = resolve(appRoot, "../..");

function makeFixture(name) {
	const fixture = join(tmpdir(), `content-${name}-${Date.now()}`);
	cpSync(contentSource, fixture, { recursive: true });
	return fixture;
}

function readJson(fixture, relativePath) {
	return JSON.parse(readFileSync(join(fixture, relativePath), "utf8"));
}

function writeJson(fixture, relativePath, value) {
	writeFileSync(join(fixture, relativePath), JSON.stringify(value, null, "\t"));
}

function runCheck(fixture) {
	try {
		execFileSync(process.execPath, [checkScript], {
			cwd: repoRoot,
			env: { ...process.env, CONTENT_ROOT: fixture },
			stdio: "pipe",
		});
		return { ok: true };
	} catch (error) {
		return { ok: false, stderr: error.stderr?.toString() ?? "" };
	}
}

const scenarios = [
	{
		name: "valid-content",
		mutate: () => {},
		expected: true,
	},
	{
		name: "duplicate-project-id",
		mutate: (fixture) => {
			const project = readJson(fixture, "projects/portfolio-platform.json");
			project.id = "accenture";
			writeJson(fixture, "projects/portfolio-platform.json", project);
		},
		expected: false,
	},
	{
		name: "invalid-organization-reference",
		mutate: (fixture) => {
			const role = readJson(fixture, "experience/accenture-consultant.json");
			role.organizationId = "missing-organization";
			writeJson(fixture, "experience/accenture-consultant.json", role);
		},
		expected: false,
	},
	{
		name: "invalid-project-reference-in-case",
		mutate: (fixture) => {
			const mdPath = join(fixture, "cases/entrega-verificable.md");
			const text = readFileSync(mdPath, "utf8").replace(
				"projectId: portfolio-platform",
				"projectId: missing-project",
			);
			writeFileSync(mdPath, text);
		},
		expected: false,
	},
	{
		name: "draft-featured-project",
		mutate: (fixture) => {
			const project = readJson(fixture, "projects/portfolio-platform.json");
			project.publicationStatus = "draft";
			project.featuredOrder = 1;
			writeJson(fixture, "projects/portfolio-platform.json", project);
		},
		expected: false,
	},
	{
		name: "missing-media-reference",
		mutate: (fixture) => {
			const project = readJson(fixture, "projects/portfolio-platform.json");
			project.cover = "/images/does-not-exist.svg";
			writeJson(fixture, "projects/portfolio-platform.json", project);
		},
		expected: false,
	},
	{
		name: "case-slug-collision",
		mutate: (fixture) => {
			const mdPath = join(fixture, "cases/entrega-verificable.md");
			const text = readFileSync(mdPath, "utf8").replace(
				"slug: entrega-verificable",
				"slug: plataforma-portfolio",
			);
			writeFileSync(mdPath, text);
		},
		expected: false,
	},
];

let failed = false;

for (const scenario of scenarios) {
	const fixture = makeFixture(scenario.name);
	try {
		scenario.mutate(fixture);
		const result = runCheck(fixture);
		if (result.ok !== scenario.expected) {
			failed = true;
			console.error(
				`✗ ${scenario.name}: esperado ${scenario.expected ? "válido" : "inválido"}, obtenido ${result.ok ? "válido" : "inválido"}`,
			);
			if (result.stderr) console.error(result.stderr.trim());
		} else {
			console.log(`✓ ${scenario.name}`);
		}
	} finally {
		rmSync(fixture, { recursive: true, force: true });
	}
}

if (failed) process.exit(1);

console.log("content validation tests passed");
