import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto("http://localhost:4400/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(1000);
// Check initial state (should be light)
const initialTheme = await page.evaluate(() =>
	document.documentElement.getAttribute("data-theme"),
);
console.log("initial theme:", initialTheme);
// Click the toggle
await page.click("[data-theme-toggle]");
await page.waitForTimeout(500);
const afterTheme = await page.evaluate(() =>
	document.documentElement.getAttribute("data-theme"),
);
console.log("after click theme:", afterTheme);
// Click again
await page.click("[data-theme-toggle]");
await page.waitForTimeout(500);
const finalTheme = await page.evaluate(() =>
	document.documentElement.getAttribute("data-theme"),
);
console.log("after second click theme:", finalTheme);
await browser.close();
console.log("done");
