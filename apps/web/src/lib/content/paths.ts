export const locales = ["es"] as const;

export type Locale = (typeof locales)[number];

export type RouteKey =
	| "home"
	| "cases"
	| "projects"
	| "experience"
	| "about"
	| "contact"
	| "thisSite"
	| "notFound";

const routes: Record<RouteKey, string> = {
	home: "/",
	cases: "/casos/",
	projects: "/proyectos/",
	experience: "/experiencia/",
	about: "/sobre-mi/",
	contact: "/contacto/",
	thisSite: "/esta-web/",
	notFound: "/404/",
};

export function resolvePath(key: RouteKey, _locale: Locale = "es"): string {
	return routes[key];
}
