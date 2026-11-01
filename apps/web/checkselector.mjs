import { preview } from "astro";
import { chromium } from "playwright";

const server = await preview({
	root: "/home/jym/Projects/juan-miii.github.io/apps/web",
	server: { host: "127.0.0.1", port: 4402 },
	logLevel: "error",
});
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://127.0.0.1:4402/", { waitUntil: "load" });
await page.waitForTimeout(2000);
console.log(
	"count:",
	await page.locator(".project-row__title a[data-project-open]").count(),
);
console.log(
	"title html:",
	await page.locator(".project-row__title").first().innerHTML(),
);
await browser.close();
await server.close();
