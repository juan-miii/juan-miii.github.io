// Engine core: one document lifecycle. No DOM access at import time.
// The Astro adapter calls boot() once; there are no client-side page swaps.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initScroll, startScroll, stopScroll } from "./scroll";
import { initReveals } from "./reveal";
import { initCursor, initMagnetic } from "./interactions";
import { runLoader } from "./loader";
import { prefersReducedMotion } from "./env";

export {
	onScroll,
	scrollState,
	scrollToTarget,
	stopScroll,
	startScroll,
} from "./scroll";
export { setLoaderFormat, setLoaderExit } from "./loader";
export { ease, isTouch, isMobile, prefersReducedMotion } from "./env";

export type PageFn = (page: {
	intro: gsap.core.Timeline;
	path: string;
}) => void;

const pageFns = new Set<PageFn>();
let ctx: gsap.Context | null = null;
let intro: gsap.core.Timeline | null = null;
let ready = false;
let booted = false;

/** Run fn when the document is ready (and immediately if it already is). */
export function onPage(fn: PageFn) {
	pageFns.add(fn);
	if (ready) runPageFn(fn);
	return () => {
		pageFns.delete(fn);
	};
}

function runPageFn(fn: PageFn) {
	if (!ctx || !intro) return;
	const timeline = intro;
	ctx.add(() => {
		fn({ intro: timeline, path: location.pathname });
	});
}

/** Flags on <html>. The site boots once, so this runs on the initial document. */
export function syncFlags() {
	const classes = document.documentElement.classList;
	classes.add("js", "is-booted");
	classes.toggle("motion", !prefersReducedMotion());
	document.body?.classList.remove("menu-open");
}

function initPage() {
	syncFlags();
	document.getElementById("cursor")?.classList.remove("is-active");
	ctx = gsap.context(() => {
		intro = initReveals(document);
		initMagnetic(document);
	});
	ready = true;
	for (const fn of pageFns) runPageFn(fn);
	requestAnimationFrame(() => ScrollTrigger.refresh());
}

/** First load. setup runs once, before the document is initialized. */
export async function boot(setup?: () => void) {
	if (booted) return;
	booted = true;
	syncFlags();
	initScroll();
	setup?.();
	stopScroll();
	initPage();
	await runLoader(() => {
		startScroll();
		intro?.play();
	});
}
