// Engine core: framework-agnostic page lifecycle. No DOM access at import time.
// Astro adapter calls boot() once, leave() → cleanup() before a swap, enter() after it.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initScroll, resetScroll, startScroll, stopScroll } from "./scroll";
import { initReveals } from "./reveal";
import { initCursor, initMagnetic } from "./interactions";
import { runLoader } from "./loader";
import { playEnter, playLeave } from "./transition";
import { prefersReducedMotion } from "./env";

export {
	onScroll,
	scrollState,
	scrollToTarget,
	stopScroll,
	startScroll,
} from "./scroll";
export { setTransition } from "./transition";
export { setLoaderFormat, setLoaderExit } from "./loader";
export { ease, isTouch, isMobile, prefersReducedMotion } from "./env";

export type PageFn = (page: {
	intro: gsap.core.Timeline;
	path: string;
}) => (() => void) | undefined;

const pageFns = new Set<PageFn>();
const cleanups: (() => void)[] = [];
let ctx: gsap.Context | null = null;
let intro: gsap.core.Timeline | null = null;
let ready = false;
let booted = false;

/** Run fn on every page load (and now, if a page is ready). Returns an unsubscribe. */
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
		const cleanup = fn({ intro: timeline, path: location.pathname });
		if (typeof cleanup === "function") cleanups.push(cleanup);
	});
}

/** Flags on <html>. Re-applied on every page because Astro swaps root attributes. */
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

/** First load. setup runs once, before the first page is initialized. */
export async function boot(setup?: () => void) {
	if (booted) return;
	booted = true;
	syncFlags();
	initScroll();
	initCursor();
	setup?.();
	stopScroll();
	initPage();
	await runLoader();
	startScroll();
	intro?.play();
}

/** Play the leave animation. Resolves when the screen is covered. */
export async function leave() {
	stopScroll();
	await playLeave();
}

/** Tear down the current page: reverts tweens, ScrollTriggers and splits. */
export function cleanup() {
	if (!ready) return;
	ready = false;
	for (const cleanupFn of cleanups.splice(0)) cleanupFn();
	ctx?.revert();
	ctx = null;
	document.body.classList.remove("menu-open");
}

/** Initialize the new page. transition: false for back/forward. */
export async function enter({ transition = true, scrollTop = true } = {}) {
	if (!booted) return;
	cleanup();
	if (scrollTop) resetScroll();
	initPage();
	if (transition) await playEnter();
	startScroll();
	intro?.play();
}
