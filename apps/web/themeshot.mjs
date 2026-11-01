import { chromium } from "playwright";

const browser = await chromium.launch();
for (const [name, theme] of [
	["light", "light"],
	["dark", "dark"],
]) {
	const page = await browser.newPage({
		viewport: { width: 1440, height: 1000 },
	});
	await page.goto("http://localhost:4400/", { waitUntil: "domcontentloaded" });
	await page.evaluate((t) => {
		document.documentElement.setAttribute("data-theme", t);
		document.documentElement.style.colorScheme = t;
	}, theme);
	await page.waitForTimeout(1500);
	await page.screenshot({
		path: `/tmp/opencode/theme-${name}-top.png`,
		fullPage: false,
	});
	await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
	await page.waitForTimeout(800);
	await page.screenshot({
		path: `/tmp/opencode/theme-${name}-bottom.png`,
		fullPage: false,
	});
	await page.close();
}
await browser.close();
console.log("done");
