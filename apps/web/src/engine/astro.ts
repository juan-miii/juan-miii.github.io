// Astro ClientRouter adapter. The leave animation runs in parallel with fetching the next page.
import { boot, cleanup, enter, leave, syncFlags } from "./index";

let navigating = false;

export function start(setup?: () => void) {
	document.addEventListener("astro:before-preparation", (event) => {
		navigating = true;
		const preparation = event as Event & {
			loader: () => Promise<void>;
		};
		const load = preparation.loader;
		preparation.loader = async () => {
			await Promise.all([leave(), load()]);
		};
	});

	document.addEventListener("astro:before-swap", () => cleanup());

	document.addEventListener("astro:after-swap", () => {
		syncFlags();
		// The loader is first-load only; every new page carries its markup.
		document.getElementById("loader")?.remove();
	});

	document.addEventListener("astro:page-load", () => {
		if (!navigating) return void boot(setup);
		navigating = false;
		void enter();
	});

	// Module scripts run after parsing: boot now instead of waiting for astro:page-load.
	void boot(setup);
}
