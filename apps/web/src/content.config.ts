import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import {
	experienceSchema,
	organizationSchema,
	pageSchema,
	projectSchema,
} from "@/content/schemas";

const pages = defineCollection({
	loader: glob({
		pattern: "*.json",
		base: "./src/content/pages",
		generateId: ({ data }) => String(data.id),
	}),
	schema: pageSchema,
});

const organizations = defineCollection({
	loader: glob({
		pattern: "*.json",
		base: "./src/content/organizations",
		generateId: ({ data }) => String(data.id),
	}),
	schema: organizationSchema,
});

const experience = defineCollection({
	loader: glob({
		pattern: "*.json",
		base: "./src/content/experience",
		generateId: ({ data }) => String(data.id),
	}),
	schema: experienceSchema,
});

const projects = defineCollection({
	loader: glob({
		pattern: "*.json",
		base: "./src/content/projects",
		generateId: ({ data }) => String(data.id),
	}),
	schema: projectSchema,
});

export const collections = {
	pages,
	organizations,
	experience,
	projects,
};
