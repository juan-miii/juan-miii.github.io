import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const dist = new URL("../dist", import.meta.url).pathname;
const required = ["index.html", "sitemap-index.xml"];

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

	"https://github.com/juan-miii/juan-miii.github.io",
	"https://github.com/juan-miii/tfg",
]) {
	if (!home.includes(content)) {
		console.error(`home smoke content missing: ${content}`);
		process.exit(1);
	}
}

console.log("smoke tests passed");
