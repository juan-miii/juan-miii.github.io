import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import icon from "astro-icon";

export default defineConfig({
	site: "https://juan-miii.github.io",
	base: "",
	output: "static",
	trailingSlash: "always",
	build: {
		// One page, small CSS: keep the styles in the document so the first
		// render does not wait for two extra requests.
		inlineStylesheets: "always",
	},
	integrations: [
		sitemap(),
		icon({
			include: {
				tabler: [
					"arrow-up-right",
					"arrow-down",
					"arrow-up",
					"arrow-right",
					"x",
					"plus",
					"mail",
					"shield-check",
					"terminal-2",
					"git-branch",
					"route",
					"sun",
					"moon",
				],
			},
		}),
	],
});
