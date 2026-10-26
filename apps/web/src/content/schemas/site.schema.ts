import { z } from "zod";

export const siteSchema = z.object({
	id: z.string().min(1),
	locale: z.literal("es"),
	name: z.string().min(1),
	description: z.string().min(1),
});
