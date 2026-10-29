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

// The portfolio is one page. Old routes must not be emitted again.
const removed = [
	"proyectos/index.html",
	"proyectos/plataforma-portfolio/index.html",
	"proyectos/tfg-correccion-practicas/index.html",
	"experiencia/index.html",
	"sobre-mi/index.html",
	"contacto/index.html",
];

for (const file of removed) {
	if (existsSync(join(dist, file))) {
		console.error(`route should be removed: ${file}`);
		process.exit(1);
	}
}

const home = readFileSync(join(dist, "index.html"), "utf8");
for (const content of [
	"Juan",
	"Miguel",
	"Ingeniero informático",
	'id="disciplina"',
	'id="trabajo"',
	'id="capacidades"',
	'id="trayectoria"',
	'id="perfil"',
	'id="contacto"',
	'id="proyecto-plataforma-portfolio"',
	'id="proyecto-tfg-correccion-practicas"',
	'aria-haspopup="dialog"',
	'data-project-open="plataforma-portfolio"',
	'data-project-open="tfg-correccion-practicas"',
	"Contexto: una web que también es una prueba",
	"Contexto: corregir a mano no escala",
	"https://github.com/juan-miii/juan-miii.github.io",
	"https://github.com/juan-miii/tfg",
	"94069179-juan-miii@proton.me",
]) {
	if (!home.includes(content)) {
		console.error(`home smoke content missing: ${content}`);
		process.exit(1);
	}
}

// Both sheets need the source repository link and their own chapter index.
const sheetCount = (home.match(/<dialog[^>]+data-project-sheet=/g) ?? [])
	.length;
if (sheetCount !== 2) {
	console.error(`expected 2 project sheets, found ${sheetCount}`);
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
