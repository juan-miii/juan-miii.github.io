// The signature: a bus drawn in the left margin, branching into every section node.
// Positions are measured from the DOM, never hard-coded, and the whole thing is one
// document-sized SVG updated from the single scroll clock.
import { onScroll, prefersReducedMotion, scrollState } from "../engine";

const NS = "http://www.w3.org/2000/svg";

type Branch = {
	path: SVGPathElement;
	port: SVGCircleElement;
	y: number;
	length: number;
	live: boolean;
};

function node<K extends keyof SVGElementTagNameMap>(
	name: K,
	attributes: Record<string, string | number>,
) {
	const element = document.createElementNS(NS, name);
	for (const [key, value] of Object.entries(attributes)) {
		element.setAttribute(key, String(value));
	}
	return element;
}

export function initSignal() {
	const root = document.getElementById("signal-trace");
	const scope = document.querySelector<HTMLElement>("[data-trace-scope]");
	if (!root || !scope) return;

	const svg = root.querySelector("svg");
	const bus = root.querySelector<SVGPathElement>("[data-trace-bus]");
	const group = root.querySelector<SVGGElement>("[data-trace-branches]");
	const pulse = root.querySelector<SVGCircleElement>("[data-trace-pulse]");
	if (!svg || !bus || !group || !pulse) return;

	const reduced = prefersReducedMotion();
	const traceScope = scope;
	const svgEl = svg;
	const busEl = bus;
	const groupEl = group;
	const pulseEl = pulse;
	let width = 0;
	let height = 0;
	let busX = 0;
	let branches: Branch[] = [];
	let frame = 0;
	let reach = 0;

	function measure() {
		const scopeRect = traceScope.getBoundingClientRect();
		const shell = traceScope.querySelector<HTMLElement>(".shell");
		const shellRect = shell?.getBoundingClientRect();
		const margin = shellRect ? shellRect.left - scopeRect.left : 24;

		width = Math.max(1, Math.round(scopeRect.width));
		height = Math.max(1, Math.round(traceScope.offsetHeight));
		busX = Math.round(Math.min(72, Math.max(10, margin * 0.44)));

		svgEl.setAttribute("width", String(width));
		svgEl.setAttribute("height", String(height));
		busEl.setAttribute("d", `M ${busX} 1 V ${height - 1}`);
		busEl.style.strokeDasharray = String(height);
		busEl.style.strokeDashoffset = reduced ? "0" : String(height);

		groupEl.replaceChildren();
		branches = [];

		const seen = new Set<number>();
		const anchors = traceScope.querySelectorAll<HTMLElement>(
			"[data-trace-anchor]",
		);

		for (const anchor of anchors) {
			const rect = anchor.getBoundingClientRect();
			if (rect.width === 0) continue;
			const y = Math.round(rect.top - scopeRect.top + rect.height / 2);
			if (y < 0 || y > height || seen.has(y)) continue;
			seen.add(y);

			const anchorX = Math.round(rect.left - scopeRect.left);
			const endX = Math.max(busX + 10, anchorX - 6);
			const length = endX - busX;
			if (length < 4) continue;

			const path = node("path", {
				d: `M ${busX} ${y} H ${endX}`,
				class: "trace__branch",
				"stroke-dasharray": length,
				"stroke-dashoffset": reduced ? 0 : length,
			});
			const port = node("circle", {
				cx: endX,
				cy: y,
				r: 2.6,
				class: "trace__port",
			});
			groupEl.append(path, port);

			branches.push({
				path,
				port,
				y,
				length,
				live: reduced,
			});
		}

		paint();
	}

	function paint() {
		const state = scrollState();
		const scopeTop = traceScope.getBoundingClientRect().top + window.scrollY;
		const viewport = window.innerHeight;

		// The bus is complete up to a little above the fold, so the hero already
		// shows a live line instead of an empty margin.
		reach = Math.min(height, Math.max(0, state.y + viewport * 0.86 - scopeTop));

		if (!reduced) {
			busEl.style.strokeDashoffset = String(Math.max(0, height - reach));
		}

		for (const branch of branches) {
			const live = reduced || reach >= branch.y - 4;
			if (live === branch.live) continue;
			branch.live = live;
			branch.path.style.strokeDashoffset = live ? "0" : String(branch.length);
			branch.path.classList.toggle("is-live", live);
			branch.port.classList.toggle("is-live", live);
		}

		if (!reduced) {
			const cy = Math.max(
				6,
				Math.min(height - 6, state.y + viewport * 0.56 - scopeTop),
			);
			pulseEl.setAttribute("cx", String(busX));
			pulseEl.setAttribute("cy", String(Math.round(cy)));
			pulseEl.classList.add("is-live");
		}
	}

	function scheduleMeasure() {
		cancelAnimationFrame(frame);
		frame = requestAnimationFrame(measure);
	}

	measure();

	const offScroll = onScroll(paint);
	const observer = new ResizeObserver(scheduleMeasure);
	observer.observe(scope);
	window.addEventListener("resize", scheduleMeasure);
	document.fonts.ready.then(scheduleMeasure);

	return () => {
		cancelAnimationFrame(frame);
		offScroll();
		observer.disconnect();
		window.removeEventListener("resize", scheduleMeasure);
	};
}
