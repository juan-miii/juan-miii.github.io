// Page transitions. The Astro adapter runs leave() while the next page loads.
// The panel is a signal sweep: dark field, red leading edge, 0.7 s each way.
import { gsap } from "gsap";
import { ease, prefersReducedMotion } from "./env";

export type Transition = {
	leave: (curtain: HTMLElement) => Promise<unknown> | gsap.core.Animation;
	enter: (curtain: HTMLElement) => Promise<unknown> | gsap.core.Animation;
};

const move = (curtain: HTMLElement) =>
	curtain.querySelector<HTMLElement>(".curtain__panel");

const current: Transition = {
	leave: (curtain) => {
		const panel = move(curtain);
		if (!panel) return gsap.timeline();
		return gsap
			.timeline()
			.set(curtain, { autoAlpha: 1 })
			.fromTo(
				panel,
				{ clipPath: "inset(100% 0% 0% 0%)" },
				{ clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: ease.inOut },
			);
	},
	enter: (curtain) => {
		const panel = move(curtain);
		if (!panel) return gsap.timeline();
		return gsap
			.timeline()
			.to(panel, {
				clipPath: "inset(0% 0% 100% 0%)",
				duration: 0.7,
				ease: ease.inOut,
			})
			.set(curtain, { autoAlpha: 0 });
	},
};

const reduced: Transition = {
	leave: (curtain) =>
		gsap
			.timeline()
			.set(curtain, { autoAlpha: 1 })
			.fromTo(curtain, { opacity: 0 }, { opacity: 1, duration: 0.2 }),
	enter: (curtain) => gsap.to(curtain, { autoAlpha: 0, duration: 0.2 }),
};

let active: Transition = current;
export const setTransition = (transition: Transition) => {
	active = transition;
};

const pick = () => (prefersReducedMotion() ? reduced : active);
const curtain = () => document.getElementById("curtain") as HTMLElement;

export const playLeave = () => Promise.resolve(pick().leave(curtain()));
export const playEnter = () => Promise.resolve(pick().enter(curtain()));
