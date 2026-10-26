// Astro adapter. Every route is static HTML and there are no client page swaps,
// so the engine boots once against the current document.
import { boot } from "./index";

export function start(setup?: () => void) {
	void boot(setup);
}
