// @ts-check
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// https://juan-miii.github.io/juan-miii
export default defineConfig({
	site: 'https://juan-miii.github.io',
	base: 'juan-miii',
	integrations: [tailwind()],
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'es'],
		routing: {
			prefixDefaultLocale: false
		},
		fallback: {
			es: 'en'
		}
	}
})
