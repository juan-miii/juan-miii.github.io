import { defineConfig } from "astro/config";
import icon from "astro-icon";

export default defineConfig({
	site: "http://panel.home.arpa",
	base: "",
	output: "static",
	trailingSlash: "always",
	build: {
		// Panel pequeño: los estilos van en el documento para no esperar a
		// peticiones CSS en la primera pintura.
		inlineStylesheets: "always",
	},
	integrations: [
		icon({
			include: {
				tabler: [
					"camera",
					"shield-check",
					"server",
					"play",
					"share-2",
					"ai",
					"message-circle",
					"heart",
					"dashboard",
					"activity",
					"brand-linkedin",
					"brand-github",
					"brand-gitlab",
					"arrow-up-right",
				],
			},
		}),
	],
});
