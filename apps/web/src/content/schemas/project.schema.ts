import { z } from "zod";

export const projectSchema = z.object({
	id: z.string().min(1),
	locale: z.literal("es"),
	slug: z.string().min(1),
	title: z.string().min(1),
	summary: z.string().min(1),
	highlights: z.string().min(1),
	featuredOrder: z.number().int().min(1).optional(),
	year: z.string().min(1),
	statusLabel: z.string().min(1),
	relatedOrg: z.string().min(1),
	technologies: z.array(z.string().min(1)),
	links: z.array(
		z.object({
			kind: z.enum(["repository", "demo", "documentation", "other"]),
			label: z.string().min(1),
			url: z.url(),
		}),
	),
});
