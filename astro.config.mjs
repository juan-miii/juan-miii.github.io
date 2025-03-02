// @ts-check
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// https://juan-miii.github.io/
export default defineConfig({
	site: 'https://juan-miii.github.io',
	base: '',
	integrations: [tailwind()],
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'es'],
		routing: {
			prefixDefaultLocale: true
		},
		fallback: {
			es: 'en'
		}
	}
})
