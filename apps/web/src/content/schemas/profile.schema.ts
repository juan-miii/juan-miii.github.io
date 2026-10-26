import { z } from "zod";

export const profileSchema = z.object({
	id: z.string().min(1),
	locale: z.literal("es"),
	name: z.string().min(1),
	role: z.string().min(1),
	location: z.string().min(1).optional(),
	bio: z.string().min(1),
	links: z.array(
		z.object({
			label: z.string().min(1),
			href: z.url(),
		}),
	),
});
