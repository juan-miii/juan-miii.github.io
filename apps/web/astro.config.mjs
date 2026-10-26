import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
	site: "https://juan-miii.github.io",
	base: "",
	output: "static",
	trailingSlash: "always",
	integrations: [sitemap()],
});
