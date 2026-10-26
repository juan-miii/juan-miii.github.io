import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const dist = new URL("../dist", import.meta.url).pathname;
const required = [
	"index.html",
	"404.html",
	"sitemap-index.xml",
	"proyectos/index.html",
	"proyectos/plataforma-portfolio/index.html",
	"proyectos/cadena-verificable/index.html",
	"experiencia/index.html",
	"sobre-mi/index.html",
	"contacto/index.html",
];

for (const file of required) {
	const path = join(dist, file);
	if (!existsSync(path)) {
		console.error(`missing: ${file}`);
		process.exit(1);
	}
}

const home = readFileSync(join(dist, "index.html"), "utf8");
for (const content of [
	"Juan",
	"Miguel",
	"Ingeniero informático",
	"plataforma-portfolio",
	"cadena-verificable",
]) {
	if (!home.includes(content)) {
		console.error(`home smoke content missing: ${content}`);
		process.exit(1);
	}
}

const project = readFileSync(
	join(dist, "proyectos/plataforma-portfolio/index.html"),
	"utf8",
);
for (const content of ["Contexto", "Decisión", "Verificación", "Resultado"]) {
	if (!project.includes(content)) {
		console.error(`project case content missing: ${content}`);
		process.exit(1);
	}
}

const contact = readFileSync(join(dist, "contacto/index.html"), "utf8");
if (!contact.includes("94069179-juan-miii@proton.me")) {
	console.error("contact email missing");
	process.exit(1);
}

const canonical = readFileSync(join(dist, "404.html"), "utf8");
if (!canonical.includes('rel="canonical"')) {
	console.error("canonical metadata missing");
	process.exit(1);
}

if (!canonical.includes('name="robots"')) {
	console.error("404 noindex missing");
	process.exit(1);
}

console.log("smoke tests passed");
