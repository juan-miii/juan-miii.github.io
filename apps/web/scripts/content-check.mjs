import { existsSync, readdirSync, readFileSync } from "node:fs";
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

function readMarkdownDir(dir) {
	const path = join(root, dir);
	if (!existsSync(path)) return [];
	return readdirSync(path)
		.filter((file) => file.endsWith(".md"))
		.map((file) => {
			const text = readFileSync(join(path, file), "utf8");
			const match = text.match(/^---\n([\s\S]*?)\n---/);
			if (!match) throw new Error(`${file}: frontmatter obligatorio.`);
			const frontmatter = Object.fromEntries(
				match[1]
					.trim()
					.split("\n")
					.map((line) => {
						const idx = line.indexOf(":");
						return [
							line.slice(0, idx).trim(),
							line
								.slice(idx + 1)
								.trim()
								.replace(/^['"]|['"]$/g, ""),
						];
					}),
			);
			return { file, ...frontmatter };
		});
}

function unique(values, label) {
	const seen = new Set();
	for (const value of values) {
		if (seen.has(value))
			throw new Error(`Identificador duplicado en ${label}: ${value}`);
		seen.add(value);
	}
}

function checkMedia(url, fileLabel) {
	if (!url?.startsWith("/")) return;
	const mediaPath = join(process.cwd(), "apps/web/public", url);
	if (!existsSync(mediaPath)) {
		throw new Error(`${fileLabel}: recurso multimedia inexistente (${url}).`);
	}
}

const errors = [];

try {
	const organizations = readJsonDir("organizations");
	const experience = readJsonDir("experience");
	const projects = readJsonDir("projects");
	const cases = readMarkdownDir("cases");

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
		cases.map((x) => x.id),
		"cases",
	);
	unique(
		cases.map((x) => x.slug),
		"case slugs",
	);

	const organizationIds = new Set(organizations.map((x) => x.id));
	const projectIds = new Set(projects.map((x) => x.id));
	const projectSlugs = new Set(projects.map((x) => x.slug));

	for (const role of experience) {
		if (role.organizationId && !organizationIds.has(role.organizationId)) {
			errors.push(
				`Experience ${role.id}: organizationId inválido (${role.organizationId}).`,
			);
		}
	}

	for (const study of cases) {
		if (study.projectId && !projectIds.has(study.projectId)) {
			errors.push(`Case ${study.id}: projectId inválido (${study.projectId}).`);
		}
		if (study.slug && projectSlugs.has(study.slug)) {
			errors.push(`Case ${study.id}: slug colisiona con un proyecto.`);
		}
		if (study.cover?.startsWith("/")) {
			checkMedia(study.cover, `Case ${study.id}`);
		}
	}

	for (const project of projects) {
		if (project.publicationStatus === "draft" && project.featuredOrder) {
			errors.push(`Project ${project.id}: un borrador no puede ser destacado.`);
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
