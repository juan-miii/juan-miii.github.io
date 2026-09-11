// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from 'astro/config';

// https://juan-miii.github.io/
export default defineConfig({
	site: 'https://juan-miii.github.io',
	base: '',
	vite: {
		plugins: [tailwindcss()]
	},
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'es'],
		routing: {
			prefixDefaultLocale: false
		}
	}
})
