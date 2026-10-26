import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const dist = new URL("../dist", import.meta.url).pathname;
const required = ["index.html", "404.html", "sitemap-index.xml"];

for (const file of required) {
	const path = join(dist, file);
	if (!existsSync(path)) {
		console.error(`missing: ${file}`);
		process.exit(1);
	}
}

const home = readFileSync(join(dist, "index.html"), "utf8");
if (!home.includes("Portafolio") && !home.includes("Ciberseguridad")) {
	console.error("home smoke content missing");
	process.exit(1);
}

const canonical = readFileSync(join(dist, "404.html"), "utf8");
if (!canonical.includes('rel="canonical"')) {
	console.error("canonical metadata missing");
	process.exit(1);
}

console.log("smoke tests passed");
