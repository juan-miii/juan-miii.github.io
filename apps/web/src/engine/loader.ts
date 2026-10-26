// First-load sequence. Progress follows real work (fonts + critical images), with a floor so
// it reads as intentional and a ceiling so it never becomes a usability problem.
import { gsap } from "gsap";
import { ease, isTouch, prefersReducedMotion } from "./env";

let format = (p: number) => String(Math.round(p)).padStart(3, "0");
export const setLoaderFormat = (fn: (p: number) => string) => {
	format = fn;
};

let exit: ((root: HTMLElement) => gsap.core.Timeline) | null = null;
export const setLoaderExit = (
	fn: (root: HTMLElement) => gsap.core.Timeline,
) => {
	exit = fn;
};

const MIN = isTouch() ? 0.6 : 0.8;
const MAX = isTouch() ? 1 : 1.5;

function criticalAssets(): Promise<unknown>[] {
	const images = [
		...document.querySelectorAll<HTMLImageElement>(
			"img[data-critical], [data-intro] img, [data-gl-instant] img",
		),
	];
	return [
		document.fonts.ready,
		...images.map((image) =>
			image.complete ? Promise.resolve() : image.decode().catch(() => {}),
		),
	];
}

export async function runLoader(onExit?: () => void): Promise<void> {
	const root = document.getElementById("loader");
	if (!root) {
		onExit?.();
		return;
	}

	if (prefersReducedMotion()) {
		await Promise.race([Promise.all(criticalAssets()), wait(0.35)]);
		onExit?.();
		await gsap.to(root, { autoAlpha: 0, duration: 0.2 });
		finish(root);
		return;
	}

	const count = root.querySelector<HTMLElement>("[data-loader-count]");
	const bar = root.querySelector<HTMLElement>("[data-loader-bar]");
	const tasks = criticalAssets();
	let done = 0;
	const shown = { value: 0 };
	const target = { value: 0 };
	for (const task of tasks) {
		task.then(() => {
			done++;
			target.value = (done / tasks.length) * 100;
		});
	}
	const start = performance.now();

	await new Promise<void>((resolve) => {
		const tick = () => {
			const elapsed = (performance.now() - start) / 1000;
			const timeCap = Math.min(100, (elapsed / MIN) * 100);
			const goal = elapsed > MAX ? 100 : Math.min(target.value, timeCap);
			shown.value += (goal - shown.value) * 0.12;
			if (goal === 100 && shown.value > 99.5) shown.value = 100;
			if (count) count.textContent = format(shown.value);
			if (bar) bar.style.transform = `scaleX(${shown.value / 100})`;
			if (shown.value === 100) {
				gsap.ticker.remove(tick);
				resolve();
			}
		};
		gsap.ticker.add(tick);
	});

	// Hand over to the page as the curtain lifts, not after it: the hero is
	// already in motion when the last line clears.
	onExit?.();

	if (exit) {
		await exit(root);
		finish(root);
		return;
	}

	await gsap
		.timeline()
		.to(root.querySelectorAll("[data-loader-out]"), {
			yPercent: -110,
			duration: 0.6,
			ease: ease.inOut,
			stagger: 0.04,
		})
		.to(
			root,
			{ clipPath: "inset(0% 0% 100% 0%)", duration: 0.8, ease: ease.inOut },
			"-=0.3",
		);
	finish(root);
}

function finish(root: HTMLElement) {
	root.hidden = true;
	document.documentElement.classList.add("is-loaded");
}

const wait = (seconds: number) =>
	new Promise((resolve) => setTimeout(resolve, seconds * 1000));
