import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

export default defineConfig({
	site: "https://juan-miii.github.io",
	base: "",
	output: "static",
	trailingSlash: "always",
	prefetch: {
		prefetchAll: true,
		defaultStrategy: "hover",
	},
	build: {
		inlineStylesheets: "auto",
	},
	integrations: [
		sitemap(),
		icon({
			include: {
				tabler: [
					"arrow-up-right",
					"arrow-right",
					"x",
					"mail",
					"shield-check",
					"terminal-2",
					"git-branch",
					"route",
				],
				"simple-icons": [
					"astro",
					"typescript",
					"nodedotjs",
					"pnpm",
					"turborepo",
					"zod",
					"githubactions",
					"git",
					"playwright",
					"docker",
					"linux",
					"biome",
				],
			},
		}),
	],
});
