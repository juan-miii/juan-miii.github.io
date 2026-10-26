import { z } from "zod";

export const caseFrontmatterSchema = z.object({
	id: z.string().min(1),
	locale: z.literal("es"),
	slug: z.string().min(1),
	projectId: z.string().min(1).optional(),
	title: z.string().min(1),
	summary: z.string().min(1),
	publicationStatus: z.enum(["draft", "published"]),
	disclosure: z.enum(["public", "authorized", "confidential"]),
});
