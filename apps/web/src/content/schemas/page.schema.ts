import { z } from "zod";

const linkSchema = z.object({
	label: z.string().min(1),
	href: z.string().min(1),
});

const actionSchema = z.object({
	label: z.string().min(1),
	href: z.string().min(1),
});

const sectionSchema = z.object({
	index: z.string().min(1),
	label: z.string().min(1),
	title: z.string().min(1),
	body: z.string().min(1),
});

const subSectionSchema = z.object({
	label: z.string().min(1),
	title: z.string().min(1),
	body: z.string().min(1),
});

export const pageSchema = z.object({
	id: z.string().min(1),
	locale: z.literal("es"),
	name: z.string().min(1),
	title: z.string().min(1),
	description: z.string().min(1),
	role: z.string().min(1),
	location: z.object({
		city: z.string().min(1),
		country: z.string().min(1),
		coordinates: z.string().min(1),
	}),
	email: z.email(),
	github: z.url(),
	availability: z.object({
		label: z.string().min(1),
		note: z.string().min(1),
	}),
	navigation: z.array(linkSchema.extend({ index: z.string().min(1) })),
	hero: z.object({
		kicker: z.string().min(1),
		firstName: z.string().min(1),
		lastName: z.string().min(1),
		intro: z.string().min(1),
		primaryAction: actionSchema,
		secondaryAction: actionSchema,
		portraitCaption: z.string().min(1),
		scrollCue: z.string().min(1),
	}),
	approach: sectionSchema,
	work: sectionSchema,
	capabilities: subSectionSchema.extend({
		items: z.array(
			z.object({
				title: z.string().min(1),
				description: z.string().min(1),
				tools: z.array(z.string().min(1)),
			}),
		),
	}),
	experienceSection: sectionSchema,
	method: subSectionSchema,
	profile: sectionSchema.omit({ body: true }).extend({
		long: z.array(z.string().min(1)),
	}),
	contact: z.object({
		index: z.string().min(1),
		label: z.string().min(1),
		title: z.string().min(1),
		body: z.string().min(1),
		emailLabel: z.string().min(1),
		note: z.string().min(1),
	}),
	footer: z.object({
		note: z.string().min(1),
		colophon: z.string().min(1),
		rights: z.string().min(1),
	}),
	process: z.array(
		z.object({
			index: z.string().min(1),
			title: z.string().min(1),
			description: z.string().min(1),
		}),
	),
});
