// Project sheets. Native dialogs provide focus containment, Escape and the top
// layer. The links keep working without JavaScript through :target.
import { gsap } from "gsap";
import { ease, prefersReducedMotion, startScroll, stopScroll } from "../engine";

let current: HTMLDialogElement | null = null;
let lastFocus: HTMLElement | null = null;
let returnHash = "";
let pending: string | null = null;

const panel = (dialog: HTMLDialogElement) =>
	dialog.querySelector<HTMLElement>("[data-project-panel]");

const closeButton = (dialog: HTMLDialogElement) =>
	dialog.querySelector<HTMLElement>("[data-project-close]");

function open(
	dialog: HTMLDialogElement,
	{ instant = false, keepFocus = false } = {},
) {
	if (!dialog.open) {
		if (!keepFocus) {
			lastFocus =
				document.activeElement instanceof HTMLElement
					? document.activeElement
					: null;
			returnHash = location.hash.startsWith("#proyecto-")
				? "#trabajo"
				: location.hash;
		}
		dialog.showModal();
		current = dialog;
		document.documentElement.classList.add("sheet-open");
		stopScroll();
		history.replaceState(null, "", `#${dialog.id}`);
	}

	requestAnimationFrame(() => {
		closeButton(dialog)?.focus({ preventScroll: true });
	});

	const inner = panel(dialog);
	if (!inner) return;
	if (instant || prefersReducedMotion()) {
		gsap.set(inner, { yPercent: 0, autoAlpha: 1 });
		return;
	}
	gsap.fromTo(
		inner,
		{ yPercent: 100, autoAlpha: 0 },
		{ yPercent: 0, autoAlpha: 1, duration: 0.72, ease: ease.inOut },
	);
}

function close(dialog: HTMLDialogElement, { instant = false } = {}) {
	if (!dialog.open) return;
	const inner = panel(dialog);

	const finish = () => {
		dialog.close();
		if (current === dialog) current = null;
		document.documentElement.classList.remove("sheet-open");
		history.replaceState(null, "", returnHash || location.pathname);
		startScroll();
		if (pending) {
			const next = document.getElementById(`proyecto-${pending}`);
			pending = null;
			if (next instanceof HTMLDialogElement) open(next, { keepFocus: true });
			return;
		}
		lastFocus?.focus({ preventScroll: true });
	};

	if (!inner || instant || prefersReducedMotion()) {
		gsap.set(inner, { yPercent: 100 });
		finish();
		return;
	}

	gsap.to(inner, {
		yPercent: 100,
		autoAlpha: 0,
		duration: 0.5,
		ease: ease.inOut,
		onComplete: finish,
	});
}

function show(id: string) {
	const dialog = document.getElementById(`proyecto-${id}`);
	if (!(dialog instanceof HTMLDialogElement)) return;
	if (current && current !== dialog) {
		pending = id;
		close(current, { instant: true });
		return;
	}
	open(dialog);
}

export function initProjectSheets() {
	document.addEventListener("click", (event) => {
		const target = event.target as HTMLElement;

		const opener = target.closest<HTMLAnchorElement>("[data-project-open]");
		if (opener) {
			const id = opener.dataset.projectOpen;
			if (!id) return;
			event.preventDefault();
			show(id);
			return;
		}

		const closer = target.closest<HTMLAnchorElement>("[data-project-close]");
		if (closer) {
			event.preventDefault();
			if (current) close(current);
			return;
		}

		const chapter = target.closest<HTMLAnchorElement>("[data-project-chapter]");
		if (chapter) {
			event.preventDefault();
			const hash = chapter.getAttribute("href");
			const heading = hash ? current?.querySelector(hash) : null;
			heading?.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	});

	for (const dialog of document.querySelectorAll<HTMLDialogElement>(
		"[data-project-sheet]",
	)) {
		dialog.addEventListener("click", (event) => {
			if (event.target === dialog) close(dialog);
		});
		dialog.addEventListener("cancel", (event) => {
			event.preventDefault();
			close(dialog);
		});
	}

	const initial = location.hash.match(/^#proyecto-(.+)$/);
	if (initial?.[1]) {
		const dialog = document.getElementById(`proyecto-${initial[1]}`);
		if (dialog instanceof HTMLDialogElement) {
			requestAnimationFrame(() => open(dialog, { instant: true }));
		}
	}
}
