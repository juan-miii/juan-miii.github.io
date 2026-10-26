// Declarative reveals through data attributes. Keep the contract stable.
//   data-split="lines|words|chars"   masked text reveal (SplitText)
//   data-reveal="up|fade|clip|scale"  block reveal
//   data-intro                        play with the page intro
//   data-delay="0.2"                  extra delay in seconds
//   data-parallax="0.15"              scrubbed vertical drift
// Every effect is skipped under reduced motion. CSS keeps content visible without JS.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ease, prefersReducedMotion } from "./env";

gsap.registerPlugin(ScrollTrigger, SplitText);

const durations = { lines: 1.15, words: 1.05, chars: 0.85 } as const;
const staggers = { lines: 0.07, words: 0.03, chars: 0.015 } as const;

function splitTween(el: HTMLElement, isIntro: boolean) {
	const type = (el.dataset.split || "lines") as keyof typeof durations;
	const delay = Number.parseFloat(el.dataset.delay || "0");
	const state = {
		tween: undefined as gsap.core.Tween | undefined,
		done: false,
		requested: false,
	};

	SplitText.create(el, {
		type: type === "lines" ? "lines" : `lines,${type}`,
		mask: "lines",
		aria: "none",
		autoSplit: true,
		linesClass: "split-line",
		onSplit(self) {
			gsap.set(el, { visibility: "visible" });
			if (state.done) return;
			const targets =
				type === "lines"
					? self.lines
					: type === "words"
						? self.words
						: self.chars;
			state.tween = gsap.from(targets, {
				yPercent: 110,
				rotate: type === "chars" ? 0 : 2,
				duration: durations[type],
				stagger: staggers[type],
				ease: ease.out,
				delay,
				paused: isIntro && !state.requested,
				onComplete: () => {
					state.done = true;
				},
				...(isIntro
					? {}
					: {
							scrollTrigger: {
								trigger: el,
								start: "top 88%",
								once: true,
							},
						}),
			});
			return state.tween;
		},
	});

	return () => {
		state.requested = true;
		state.tween?.play();
	};
}

function blockTween(el: HTMLElement, paused: boolean) {
	const kind = el.dataset.reveal || "up";
	const delay = Number.parseFloat(el.dataset.delay || "0");
	const from: gsap.TweenVars =
		kind === "fade"
			? { autoAlpha: 0 }
			: kind === "clip"
				? { clipPath: "inset(100% 0% 0% 0%)", autoAlpha: 1 }
				: kind === "scale"
					? { scale: 1.08, clipPath: "inset(10% 10% 10% 10%)", autoAlpha: 1 }
					: { y: 40, autoAlpha: 0 };
	const to: gsap.TweenVars =
		kind === "clip" || kind === "scale"
			? { clipPath: "inset(0% 0% 0% 0%)", scale: 1 }
			: {};

	gsap.set(el, { visibility: "visible" });
	return gsap.fromTo(el, from, {
		...to,
		y: 0,
		autoAlpha: 1,
		duration: kind === "fade" ? 0.9 : 1.2,
		ease: ease.out,
		delay,
		paused,
		...(paused
			? {}
			: {
					scrollTrigger: {
						trigger: el,
						start: "top 90%",
						once: true,
					},
				}),
	});
}

/** Wire every reveal inside root. Returns the paused intro timeline. */
export function initReveals(root: ParentNode = document) {
	const intro = gsap.timeline({ paused: true });
	if (prefersReducedMotion()) return intro;

	// Only the intro is built up front. Everything below the fold is split and
	// given its ScrollTrigger when it gets close to the viewport, so the first
	// load does not measure the whole document.
	const deferred = new Map<Element, () => void>();

	for (const el of root.querySelectorAll<HTMLElement>("[data-split]")) {
		const isIntro = el.hasAttribute("data-intro");
		if (isIntro) {
			intro.add(splitTween(el, true), 0);
			continue;
		}
		deferred.set(el, () => splitTween(el, false));
	}

	for (const el of root.querySelectorAll<HTMLElement>("[data-reveal]")) {
		const isIntro = el.hasAttribute("data-intro");
		if (isIntro) {
			const tween = blockTween(el, true);
			intro.add(() => tween.play(), 0);
			continue;
		}
		deferred.set(el, () => blockTween(el, false));
	}

	if (deferred.size > 0 && !("IntersectionObserver" in window)) {
		for (const build of deferred.values()) build();
		deferred.clear();
	}

	if (deferred.size > 0) {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					const build = deferred.get(entry.target);
					if (!build) continue;
					observer.unobserve(entry.target);
					deferred.delete(entry.target);
					build();
				}
			},
			// Start a quarter-screen early so the trigger exists before the
			// element reaches its reading line.
			{ rootMargin: "25% 0px 25% 0px" },
		);
		for (const el of deferred.keys()) observer.observe(el);
	}

	for (const el of root.querySelectorAll<HTMLElement>("[data-parallax]")) {
		const amount = Number.parseFloat(el.dataset.parallax || "0.15");
		gsap.fromTo(
			el,
			{ yPercent: -amount * 100 },
			{
				yPercent: amount * 100,
				ease: "none",
				scrollTrigger: {
					trigger: el.parentElement || el,
					start: "top bottom",
					end: "bottom top",
					scrub: true,
				},
			},
		);
	}

	return intro;
}
