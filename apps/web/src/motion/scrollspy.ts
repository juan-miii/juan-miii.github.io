// In-page navigation state. One observer marks the section crossing the reading
// line, and every copy of the navigation (header, menu, footer) stays in sync.
export function initSectionNav() {
	const links = [
		...document.querySelectorAll<HTMLAnchorElement>(
			"[data-section-nav] a[href^='#']",
		),
	];
	if (links.length === 0) return;

	const ids = [...new Set(links.map((link) => link.hash.slice(1)))].filter(
		(id) => id.length > 0 && document.getElementById(id),
	);
	if (ids.length === 0) return;

	const visible = new Set<string>();

	function setActive(id: string | null) {
		for (const link of links) {
			const active = id !== null && link.hash === `#${id}`;
			link.classList.toggle("is-active", active);
			if (active) link.setAttribute("aria-current", "location");
			else link.removeAttribute("aria-current");
		}
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) visible.add(entry.target.id);
				else visible.delete(entry.target.id);
			}
			setActive(ids.find((id) => visible.has(id)) ?? null);
		},
		{ rootMargin: "-45% 0px -50% 0px", threshold: 0 },
	);

	for (const id of ids) {
		const section = document.getElementById(id);
		if (section) observer.observe(section);
	}

	for (const link of links) {
		link.addEventListener("click", () => {
			const id = link.hash.slice(1);
			if (ids.includes(id)) setActive(id);
		});
	}

	const initial = ids.find((id) => location.hash === `#${id}`);
	setActive(initial ?? null);

	return () => observer.disconnect();
}
