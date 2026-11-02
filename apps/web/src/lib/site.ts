import { getEntry } from "astro:content";

/** Loads the single site document, failing the build if it is missing. */
export async function getSite() {
	const entry = await getEntry("pages", "site");
	if (!entry) throw new Error("No existe el contenido del sitio.");
	return entry.data;
}
