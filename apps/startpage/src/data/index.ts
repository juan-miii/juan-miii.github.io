export type Service = {
	id: string;
	label: string;
	host: string;
	href: string;
	icon: string;
};

export type Social = {
	label: string;
	handle: string;
	url: string;
	icon: string;
};

export type ServiceGroup = {
	id: string;
	label: string;
	services: Service[];
};

/*
 * Servicios autoalojados en la red local (.home.arpa).
 * Los esquemas asumen HTTP; ajustar a HTTPS si algún servicio lo exige.
 * Los hosts son suposiciones: corregir el subdominio de cada servicio aquí.
 * Estos enlaces son internos y no se publican fuera de la red.
 */
const service = (
	id: string,
	label: string,
	icon: string,
	host = id,
): Service => ({
	id,
	label,
	host: `${host}.home.arpa`,
	href: `http://${host}.home.arpa`,
	icon,
});

export const groups: ServiceGroup[] = [
	{
		id: "infraestructura",
		label: "Infraestructura",
		services: [
			service("proxmox", "Proxmox", "tabler:server"),
			service("pihole", "Pi-hole", "tabler:shield-check"),
			service("uptime-kuma", "Uptime Kuma", "tabler:heart"),
			service("grafana", "Grafana", "tabler:dashboard"),
			service("prometheus", "Prometheus", "tabler:activity"),
		],
	},
	{
		id: "medios",
		label: "Medios",
		services: [
			service("immich", "Immich", "tabler:camera"),
			service("jellyfin", "Jellyfin", "tabler:play"),
		],
	},
	{
		id: "ia",
		label: "IA local",
		services: [
			service("ollama", "Ollama", "tabler:ai"),
			service("openwebui", "Open WebUI", "tabler:message-circle"),
		],
	},
	{
		id: "automatizacion",
		label: "Automatización",
		services: [service("n8n", "n8n", "tabler:share-2")],
	},
];

export const services: Service[] = groups.flatMap((group) => group.services);

export const socials: Social[] = [
	{
		label: "LinkedIn",
		handle: "in/juanmiguelrs",
		url: "https://www.linkedin.com/in/juanmiguelrs/",
		icon: "tabler:brand-linkedin",
	},
	{
		label: "GitHub",
		handle: "juan-miii",
		url: "https://github.com/juan-miii",
		icon: "tabler:brand-github",
	},
	{
		label: "GitLab",
		handle: "juan-miii",
		url: "https://gitlab.com/juan-miii",
		icon: "tabler:brand-gitlab",
	},
];
