import { z } from "zod";

export const projectSchema = z.object({
	id: z.string().min(1),
	locale: z.literal("es"),
	slug: z.string().min(1),
	title: z.string().min(1),
	summary: z.string().min(1),
	highlights: z.array(z.string().min(1)).min(1),
	kind: z.enum(["professional", "personal", "open-source"]),
	sourceAvailability: z.enum(["public", "private", "not-applicable"]),
	lifecycle: z.enum(["active", "completed", "archived"]),
	publicationStatus: z.enum(["draft", "published"]),
	featuredOrder: z.number().int().min(1).optional(),
	year: z.string().min(1),
	period: z.string().min(1),
	client: z.string().min(1),
	role: z.string().min(1),
	statusLabel: z.string().min(1),
	technologies: z.array(z.string().min(1)),
	cover: z.string().optional(),
	coverAlt: z.string().min(1).optional(),
	plate: z.enum(["content", "pipeline"]),
	links: z.array(
		z.object({
			kind: z.enum(["repository", "demo", "documentation", "other"]),
			label: z.string().min(1),
			url: z.url(),
		}),
	),
});
