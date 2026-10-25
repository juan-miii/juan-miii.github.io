import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const pageSchema = z.object({
	id: z.string().min(1),
	locale: z.literal("es"),
	title: z.string().min(1),
	description: z.string().min(1),
	action: z.object({
		label: z.string().min(1),
		href: z.string().startsWith("#"),
	}),
	notFound: z.object({
		title: z.string().min(1),
		description: z.string().min(1),
		backLabel: z.string().min(1),
	}),
	navigation: z.array(
		z.object({
			label: z.string().min(1),
			href: z.string().min(1),
		}),
	),
	hero: z.object({
		badge: z.string().min(1),
		title: z.string().min(1),
		bio: z.string().min(1),
		links: z.array(
			z.object({
				label: z.string().min(1),
				href: z.url(),
			}),
		),
	}),
	footer: z.object({
		owner: z.string().min(1),
		ownerUrl: z.url(),
		rights: z.string().min(1),
		links: z.array(
			z.object({
				label: z.string().min(1),
				href: z.string().min(1),
			}),
		),
	}),
});

const pages = defineCollection({
	loader: glob({
		pattern: "*.json",
		base: "./src/content/pages",
		generateId: ({ data }) => String(data.id),
	}),
	schema: pageSchema,
});

export const collections = { pages };
