import { z } from "zod";

export const organizationSchema = z.object({
	id: z.string().min(1),
	locale: z.literal("es"),
	name: z.string().min(1),
	url: z.url().optional(),
	description: z.string().min(1),
});
