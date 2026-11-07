// Accessible mobile menu. One delegated listener is wired once against the
// static document; the overlay markup is looked up at open time.
import { gsap } from "gsap";
import { ease, prefersReducedMotion, startScroll, stopScroll } from "../engine";

let wired = false;
let open = false;
let lastFocus: HTMLElement | null = null;

const overlay = () => document.querySelector<HTMLElement>("[data-menu]");
const panel = () => document.querySelector<HTMLElement>("[data-menu-panel]");
const items = () => [
	...document.querySelectorAll<HTMLElement>("[data-menu-item]"),
];

function setExpanded(value: boolean) {
	for (const toggle of document.querySelectorAll<HTMLElement>(
		"[data-menu-toggle]",
	)) {
		toggle.setAttribute("aria-expanded", String(value));
		toggle.setAttribute("aria-label", value ? "Cerrar menú" : "Abrir menú");
	}
}

function setPageInert(value: boolean) {
	for (const region of document.querySelectorAll<HTMLElement>(
		"[data-inert-when-menu]",
	)) {
		if (value) region.setAttribute("inert", "");
		else region.removeAttribute("inert");
	}
}

function focusables(root: HTMLElement) {
	return [
		...root.querySelectorAll<HTMLElement>(
			'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
		),
	].filter((element) => element.offsetParent !== null);
}

function openMenu() {
	if (open) return;
	const root = overlay();
	const sheet = panel();
	if (!root || !sheet) return;

	open = true;
	lastFocus =
		document.activeElement instanceof HTMLElement
			? document.activeElement
			: null;
	root.hidden = false;
	document.body.classList.add("menu-open");
	setPageInert(true);
	setExpanded(true);
	stopScroll();

	const links = items();
	if (prefersReducedMotion()) {
		gsap.set(sheet, { yPercent: 0 });
		gsap.set(links, { yPercent: 0, autoAlpha: 1 });
	} else {
		gsap
			.timeline()
			.fromTo(
				sheet,
				{ yPercent: 100 },
				{ yPercent: 0, duration: 0.72, ease: ease.inOut },
			)
			.fromTo(
				links,
				{ yPercent: 110, autoAlpha: 0 },
				{
					yPercent: 0,
					autoAlpha: 1,
					duration: 0.8,
					stagger: 0.05,
					ease: ease.out,
				},
				0.2,
			);
	}

	requestAnimationFrame(() => {
		const first =
			root.querySelector<HTMLElement>("[data-menu-close]") ??
			focusables(root)[0];
		(first ?? root).focus();
	});
}

function closeMenu({ instant = false } = {}) {
	if (!open) return;
	const root = overlay();
	const sheet = panel();
	open = false;
	document.body.classList.remove("menu-open");
	setPageInert(false);
	setExpanded(false);
	startScroll();

	const restore = () => {
		if (root) root.hidden = true;
		lastFocus?.focus();
	};

	if (!root || !sheet || instant || prefersReducedMotion()) {
		restore();
		return;
	}

	gsap
		.timeline({ onComplete: restore })
		.to(items(), {
			yPercent: -90,
			autoAlpha: 0,
			duration: 0.4,
			stagger: 0.025,
			ease: ease.inOut,
		})
		.to(sheet, { yPercent: 100, duration: 0.6, ease: ease.inOut }, 0.1);
}

export function initMenu() {
	if (wired) return;
	wired = true;

	document.addEventListener("click", (event) => {
		const target = event.target as HTMLElement;
		if (target.closest("[data-menu-toggle]")) {
			event.preventDefault();
			if (open) closeMenu();
			else openMenu();
			return;
		}
		if (target.closest("[data-menu-close]")) {
			event.preventDefault();
			closeMenu();
			return;
		}
		if (target.closest("[data-menu-backdrop]")) {
			closeMenu();
			return;
		}
		if (open && target.closest("[data-menu] a")) {
			closeMenu({ instant: true });
		}
	});

	document.addEventListener("keydown", (event) => {
		if (!open) return;
		const root = overlay();
		if (!root) return;

		if (event.key === "Escape") {
			event.preventDefault();
			closeMenu();
			return;
		}

		if (event.key !== "Tab") return;
		const available = focusables(root);
		if (available.length === 0) return;
		const first = available[0];
		const last = available.at(-1);
		if (!first || !last) return;
		if (event.shiftKey && document.activeElement === first) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault();
			first.focus();
		}
	});

	window.addEventListener("resize", () => {
		if (open && window.innerWidth >= 1024) closeMenu({ instant: true });
	});
}
