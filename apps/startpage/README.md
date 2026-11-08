# @portfolio/startpage

Panel de arranque de la red local (`.home.arpa`): los servicios autoalojados (Immich, Pi-hole, Proxmox, Jellyfin, n8n, Ollama, Open WebUI, Uptime Kuma, Grafana, Prometheus) agrupados por función, con hostname y piloto de estado, más los enlaces a redes sociales.

Construido sobre `@juan-miii/brand` (tokens y estilos) y `@portfolio/ui` (componentes Astro), misma pila que `apps/web`.

## Ejecutar

```bash
pnpm --filter @portfolio/startpage dev     # http://localhost:4401
pnpm --filter @portfolio/startpage build
pnpm --filter @portfolio/startpage preview
pnpm --filter @portfolio/startpage check
```

`pnpm dev` en la raíz arranca `apps/web` y `apps/startpage` a la vez.

## Estructura

- `src/data/index.ts`: servicios (id, host, URL, icono) agrupados por función, y redes sociales. **Editar aquí** para añadir o mover un servicio.
- `src/components/ServiceGrid.astro`: grupos y filas del rack.
- `src/components/Socials.astro`: banda oscura de redes.
- `src/styles/global.css`: imports de marca, hero, rack, pilotos y banda social.
- `src/layouts/BaseLayout.astro`: cabecera con reloj, tema, navegación, metadatos y pie.

## Supuestos a revisar al desplegar

- Los servicios apuntan a `http://<servicio>.home.arpa` y el panel a `http://panel.home.arpa` (canonical, `robots.txt` y `sitemap.xml`). Si el host real es otro, cambia `site` en `astro.config.mjs` y los dos archivos de `public/`.
- Los subdominios son suposiciones: `proxmox`, `pihole`, `uptime-kuma`, `grafana`, `prometheus`, `immich`, `jellyfin`, `ollama`, `openwebui`, `n8n`.
- Algunos servicios pueden exigir HTTPS; cambia el esquema en `src/data/index.ts`.
- `meta robots` = `noindex` y `robots.txt` bloquea el rastreo: la página vive solo en la LAN. No la despliegues en un host público.
- `public/og.png` se generó con `node <skill>/scripts/og.mjs http://127.0.0.1:4401/ --out public/og.png`; vuelve a generarlo si cambia el hero.
- Fuentes: copias de `apps/web/public/fonts` en `public/fonts`.

## QA

El detalle del sistema y de la última pasada de QA está en `DESIGN.md`. Para repetirla:

```bash
pnpm build
node <skill>/scripts/serve.mjs dist --port 4401
node <skill>/scripts/shoot.mjs http://127.0.0.1:4401/ --out .shots/startpage --hovers 10
node <skill>/scripts/audit.mjs http://127.0.0.1:4401/
```

Los artefactos (`.shots*/`) están ignorados por git.
