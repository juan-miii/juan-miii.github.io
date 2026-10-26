// Site-specific motion setup. The engine owns the clock; this file only says what
// happens with it on this site.
import { gsap } from "gsap";
import { onPage, setLoaderExit, setLoaderFormat } from "../engine";
import { ease } from "../engine/env";
import { initMenu } from "./menu";
import { initSignal } from "./signal";

export function setupMotion() {
	setLoaderFormat((progress) => String(Math.round(progress)).padStart(3, "0"));

	setLoaderExit((root) => {
		const out = root.querySelectorAll("[data-loader-out]");
		const rule = root.querySelector("[data-loader-rule]");
		const mark = root.querySelector("[data-loader-mark]");

		return gsap
			.timeline({ defaults: { ease: ease.inOut } })
			.to(rule, { scaleX: 1, duration: 0.6 }, 0)
			.to(mark, { rotate: 90, duration: 0.6 }, 0)
			.to(out, { yPercent: -110, duration: 0.5, stagger: 0.04 }, 0.1)
			.to(root, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.7 }, 0.4);
	});

	initMenu();

	// The trace has to rebuild after every page swap.
	onPage(() => initSignal());
	onPage(() => initClock());
}

function initClock() {
	const clock = document.querySelector<HTMLElement>("[data-clock]");
	if (!clock) return;

	const format = new Intl.DateTimeFormat("es-ES", {
		timeZone: "Europe/Madrid",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	});

	const update = () => {
		clock.textContent = `MAD ${format.format(new Date())}`;
	};
	update();
	const timer = window.setInterval(update, 30_000);
	return () => window.clearInterval(timer);
}
