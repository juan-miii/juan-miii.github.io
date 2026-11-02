import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root =
	process.env.CONTENT_ROOT ||
	new URL("../src/content", import.meta.url).pathname;

function readJsonDir(dir) {
	const path = join(root, dir);
	return readdirSync(path)
		.filter((file) => file.endsWith(".json"))
		.map((file) => JSON.parse(readFileSync(join(path, file), "utf8")));
}

function unique(values, label) {
	const seen = new Set();
	for (const value of values) {
		if (seen.has(value))
			throw new Error(`Identificador duplicado en ${label}: ${value}`);
		seen.add(value);
	}
}

const errors = [];

try {
	const organizations = readJsonDir("organizations");
	const experience = readJsonDir("experience");
	const projects = readJsonDir("projects");

	unique(
		organizations.map((x) => x.id),
		"organizations",
	);
	unique(
		experience.map((x) => x.id),
		"experience",
	);
	unique(
		projects.map((x) => x.id),
		"projects",
	);
	unique(
		projects.map((x) => x.slug),
		"project slugs",
	);
	unique(
		projects.map((x) => x.featuredOrder).filter((order) => order !== undefined),
		"project featuredOrder",
	);

	const organizationIds = new Set(organizations.map((x) => x.id));

	for (const role of experience) {
		if (role.organizationId && !organizationIds.has(role.organizationId)) {
			errors.push(
				`Experience ${role.id}: organizationId inválido (${role.organizationId}).`,
			);
		}
	}
} catch (error) {
	console.error(error.message);
	process.exit(1);
}

if (errors.length > 0) {
	for (const error of errors) console.error(error);
	process.exit(1);
}

console.log("content check passed");
