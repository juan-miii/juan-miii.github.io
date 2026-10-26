import { z } from "zod";

export const pageSchema = z.object({
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
	experience: z.array(
		z.object({
			title: z.string().min(1),
			date: z.string().min(1),
			description: z.string().min(1),
		}),
	),
	projects: z.array(
		z.object({
			title: z.string().min(1),
			description: z.string().min(1),
			tags: z.array(z.string().min(1)).default([]),
		}),
	),
	about: z.object({
		title: z.string().min(1),
		bio: z.string().min(1),
	}),
	contact: z.object({
		title: z.string().min(1),
		description: z.string().min(1),
		email: z.string().email(),
	}),
	thisSite: z.object({
		title: z.string().min(1),
		description: z.string().min(1),
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
