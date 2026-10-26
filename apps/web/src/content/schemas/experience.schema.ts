import { z } from "zod";

export const experienceSchema = z.object({
	id: z.string().min(1),
	locale: z.literal("es"),
	role: z.string().min(1),
	organizationId: z.string().min(1),
	startDate: z.string().min(1),
	endDate: z.string().min(1).optional(),
	current: z.boolean().default(false),
	location: z.string().min(1),
	summary: z.string().min(1),
	contributions: z.array(z.string().min(1)),
});
