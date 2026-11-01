import { chromium } from "playwright";

const browser = await chromium.launch();
for (const theme of ["light", "dark"]) {
	const page = await browser.newPage({
		viewport: { width: 1440, height: 900 },
	});
	await page.goto("http://localhost:4400/", { waitUntil: "domcontentloaded" });
	await page.evaluate((t) => {
		document.documentElement.setAttribute("data-theme", t);
		document.documentElement.style.colorScheme = t;
	}, theme);
	await page.waitForTimeout(1500);
	await page.screenshot({
		path: `/tmp/opencode/${theme}.png`,
		fullPage: false,
	});
	await page.close();
}
await browser.close();
