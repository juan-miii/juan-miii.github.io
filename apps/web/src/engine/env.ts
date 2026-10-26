export const prefersReducedMotion = () =>
	matchMedia("(prefers-reduced-motion: reduce)").matches;
export const isTouch = () =>
	matchMedia("(hover: none), (pointer: coarse)").matches;
export const isMobile = () => matchMedia("(max-width: 767px)").matches;

// One easing vocabulary for the whole site. Never invent per-component curves.
export const ease = {
	out: "expo.out",
	inOut: "expo.inOut",
	soft: "power3.out",
	spring: "back.out(1.6)",
} as const;
