import { z } from "zod";

export const uiSchema = z.object({
	id: z.string().min(1),
	locale: z.literal("es"),
	navigation: z.array(
		z.object({
			key: z.string().min(1),
			label: z.string().min(1),
			href: z.string().min(1),
		}),
	),
	actions: z.object({
		primary: z.string().min(1),
		secondary: z.string().min(1),
	}),
	messages: z.object({
		notFoundTitle: z.string().min(1),
		notFoundDescription: z.string().min(1),
		backHome: z.string().min(1),
	}),
});
