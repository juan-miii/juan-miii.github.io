# COMPONENTS: mapa de edición de la web

Este documento dice **dónde vive cada cosa visible** para poder cambiarla a mano sin
leer toda la aplicación. La web es una sola página compuesta por secciones dentro de `main`;
el cierre (contacto y barra legal) vive en el pie, que va fuera de `main`. El marco común se
compone desde `BaseLayout.astro`.

Orden de lectura recomendado:

1. El texto está en `apps/web/src/content`: empieza ahí.
2. La composición de la portada está en `apps/web/src/pages/index.astro`.
3. El marco común (head, tema, loader, cabecera, menú, traza, pie) está en
   `apps/web/src/layouts/BaseLayout.astro`.
4. La dirección de arte está definida en `packages/brand/src/styles/tokens.css` y en los
   componentes de sección.
5. El concepto y las decisiones de diseño están en [`DESIGN.md`](./DESIGN.md).
6. El catálogo de componentes compartidos está en `docs/design/components.md`.

Convenciones:

- **Contenido**: JSON validado con Zod. Los tipos de componentes se derivan en `apps/web/src/types.ts`.
- **Componente**: `.astro` con marcado y estilos propios.
- **Estilo compartido**: CSS de `packages/brand` (prefijo de primitivas base: `base-*`).
- **Comportamiento**: TypeScript en `src/engine` y `src/motion`.
- Sin em ni en dash en copia visible.

## 1. Árbol de archivos

```text
apps/web/
├── astro.config.mjs              sitio, sitemap, iconos, robots, CSS inline
├── public/
│   ├── favicon.svg               icono de pestaña
│   ├── og.png                    imagen para redes
│   ├── robots.txt
│   ├── llms.txt
│   ├── .well-known/security.txt
│   ├── images/                   SVG de proyectos, base para otros usos
│   └── fonts/                    Switzer y JetBrains Mono
└── src/
    ├── layouts/BaseLayout.astro  html, tema, loader, cabecera, menú, traza, pie
    ├── pages/index.astro         composición de la portada
    ├── lib/site.ts               carga única del contenido del sitio
    ├── types.ts                  tipos derivados de los schemas Zod
    ├── components/
    │   ├── sections/{Hero,Discipline,Work,Experience,Profile}.astro
    │   ├── Header.astro          cabecera fija
    │   ├── Menu.astro            menú móvil
    │   ├── Footer.astro          contacto y barra legal (sección #contacto)
    │   ├── Loader.astro          loader de entrada
    │   ├── SignalTrace.astro     traza de señal (SVG)
    │   ├── PortraitPlate.astro   retrato principal
    │   ├── ProjectRow.astro      fila de proyecto
    │   ├── ExperienceList.astro  lista presentacional de trayectoria
    │   ├── MethodSteps.astro     método y proceso
    │   └── CapabilityGrid.astro  capacidades
    ├── engine/                   ciclo de vida, revelación, scroll, loader, entorno
    ├── motion/                   setup, traza, scrollspy, menú
    ├── styles/global.css         estilos propios de la app
    └── content/                  texto, schemas y colecciones

packages/brand/src/styles/
├── tokens.css                    colores, tipos, espacio, movimiento, capas
├── base.css                      reset, shell, secciones, nodo, campo oscuro
├── icons.css                     tamaños de icono compartidos
├── layout.css                    base-wrapper, base-hero, base-footer, base-section-head
├── components.css                base-btn, prosa, text-link
├── motion.css                    visibilidad de revelaciones
└── loader.css                    loader de entrada

packages/ui/src/
├── theme.ts                      valores por defecto del tema
├── components/                   PageWrapper, BaseHero, BaseFooter, SectionHeading,
│   Button, NodeLabel, Prose, ThemeScript, ThemeToggle
```

## 2. Orden de la página

La tabla refleja el DOM actual. No hay ruta 404 ni fichas: los proyectos se muestran como filas en el flujo y sus enlaces externos abren fuera de la página.

| Qué se ve | Ancla | Marcado | Contenido |
| --- | --- | --- | --- |
| Loader de entrada | — | `layouts/BaseLayout.astro` + `Loader.astro` | `site.name`, `site.location.city`, `site.location.country` |
| Cabecera fija | — | `Header.astro` | `site.name`, `site.role`, `site.navigation`; `ThemeToggle` |
| Hero | `#inicio` | `sections/Hero.astro` | `site.hero`, `site.name` |
| Disciplina y método | `#disciplina` | `sections/Discipline.astro` | `site.approach`, `site.method`, `site.process`, `site.capabilities` |
| Trabajo | `#trabajo` | `sections/Work.astro` + `ProjectRow` | `site.work`, colección `projects` |
| Trayectoria | `#trayectoria` | `sections/Experience.astro` + `ExperienceList` | `site.experienceSection`, colecciones `experience` y `organizations` |
| Perfil | `#perfil` | `sections/Profile.astro` | `site.profile`, `site.name`, `site.location.city` |
| Contacto y cierre | `#contacto` | `Footer.astro` (`BaseFooter`, campo oscuro) | `site.footer`, `site.navigation`, `site.github`, `site.location`, `site.name` |
| Menú móvil | — | `Menu.astro` | `site.navigation`, `site.footer.links` |
| Traza de señal | — | `SignalTrace.astro`, dentro de `main` | nodos detectados por `data-trace-anchor` |

`BaseLayout` coloca `Footer` fuera de `main`; el cierre funciona como pie legal y contacto. `Menu` va también fuera de `main` para no quedar atrapado en el apilado. La única página servida es la portada; el mismo layout admite `noindex` por props, aunque no se usa ahora.

## 3. Dónde está el texto

| Archivo | Qué contiene |
| --- | --- |
| `apps/web/src/content/pages/site.json` | Todo el texto de portada, navegación y pie/contacto. Es el primer archivo a editar. |
| `apps/web/src/content/projects/*.json` | Proyectos: título, resumen, highlights, año, estado, organización, tecnologías y enlaces. |
| `apps/web/src/content/experience/*.json` | Puestos, fechas, resumen y contribuciones. |
| `apps/web/src/content/organizations/*.json` | Nombre, URL y descripción de la organización. |
| `apps/web/src/content/schemas/*.ts` | Contratos Zod. Si añades un campo, actualiza el schema. |
| `apps/web/scripts/content-check.test.mjs` | Referencias entre colecciones, ids duplicados, slugs y recursos. |

Rutas principales de `site.json`:

| Ruta | Se usa en |
| --- | --- |
| `name`, `role`, `title`, `description` | `<title>`, meta, cabecera, hero, JSON-LD, pie |
| `location.city/country/coordinates` | loader, contacto, JSON-LD |
| `github` | cabecera/pie, JSON-LD |
| `navigation` (5 items) | cabecera, menú y mapa del footer |
| `hero` | hero (`firstName`, `lastName`, `intro`, `primaryAction`, `secondaryAction`) |
| `approach`, `method` | disciplina |
| `process` | pasos numerados |
| `capabilities` | capacidades dentro de disciplina |
| `work` | trabajo |
| `experienceSection` | cabecera de trayectoria |
| `profile` | perfil |
| `footer` | cierre, barra legal, links y colofón |

No existen `availability`, `email`, `contact`, `hero.scrollCue`, `hero.kicker`, `notFound` ni `about`: son campos antiguos que no forman parte del schema actual. El único contacto visible (`github`, LinkedIn, GitLab) sale de `footer.links`, más el correo/CTA que quieras añadir manualmente.

Los componentes de sección consumen slices concretos:

- `Hero`: `site.name`, `site.hero.firstName`, `site.hero.lastName`, `site.hero.intro`, `primaryAction`, `secondaryAction`.
- `Discipline`: `site.approach`, `site.method`, `site.process`, `site.capabilities`.
- `Work`: `site.work` y la colección `projects`.
- `Experience`: `site.experienceSection` y colecciones `experience`/`organizations`.
- `Profile`: `site.profile`, `site.name`, `site.location.city`.
- `Footer`: `site.name`, `site.navigation`, `site.footer`, `site.location`, `site.github`.
- `Header`: `site.name`, `site.role`, `site.navigation`.

## 4. Marco común

### 4.1 Head, SEO y metadatos

Todo se monta en `apps/web/src/layouts/BaseLayout.astro`, dentro de `<head>`.

| Qué se consume | Fuente | Cómo cambiarlo |
| --- | --- | --- |
| Título de pestaña | `title={site.title}` en `index.astro` | JSON |
| Descripción | `description={site.description}` | JSON |
| Canonical | `BaseLayout` con `Astro.site` o fallback | `astro.config.mjs` → `site` |
| Open Graph / Twitter | `BaseLayout` + `public/og.png` | JSON + config |
| JSON-LD `Person` | `BaseLayout` | JSON; `knowsAbout` literal en layout |
| `theme-color` | `BaseLayout` (`#F2F1EC`) y script de tema | meta tag / `ThemeScript` |
| Favicon | `public/favicon.svg` | sustituir |
| Fuentes precargadas | `BaseLayout` + `public/fonts` | rutas y `@font-face` en `tokens.css` |
| Sitemap | `@astrojs/sitemap` | `astro.config.mjs` |
| `robots.txt` | `public/robots.txt` | editar archivo |
| `security.txt` | `public/.well-known/security.txt` con workflow de expiración | archivo o workflow |
| `llms.txt` | `llms.txt` | editar archivo |

### 4.2 Loader

Marcado en `Loader.astro` y `BaseLayout`; estilos en `styles/global.css` y `packages/brand/src/styles/loader.css`; salida en `motion/setup.ts`; espera real en `engine/loader.ts`.

| Elemento visible | Texto o fuente |
| --- | --- |
| Arriba izquierda | `{site.name} / Portfolio` |
| Arriba derecha | `{site.location.city}, {site.location.country}` |
| Marca central | `JM.` |
| Etiqueta | `Cargando el sitio` |
| Contador | `000 /100` |
| Barra roja | `[data-loader-bar]` |
| Abajo izquierda | `Ingeniería y Consultoría` |
| Abajo derecha | `© {año}` |

El loader solo se ve con JavaScript (`html.js #loader`). Espera fuentes, activa assets críticos y se retira con la cortina definida en `motion/setup.ts`. No alargarlo artificialmente.

### 4.3 Cabecera

`Header.astro`, datos de `site.json`, sticky con `z-index: var(--z-header)`. Bajo 1024 px, la nav horizontal desaparece y el botón `Menú` abre el panel.

- El estado activo de los enlaces lo pone `motion/scrollspy.ts`.
- `ThemeToggle` muestra el icono contrario al tema activo.
- No hay reloj visible: `initClock` consulta `[data-clock]`, pero ningún marcado usa esa atributo hoy.

### 4.4 Traza de señal

`SignalTrace.astro` contiene SVG y estilos globales; la geometría se calcula en `motion/signal.ts`.

- Anclajes actuales: `SectionHeading.astro` (si `anchor` está activo), `ProjectRow.astro` y `Footer.astro` (`NodeLabel` con `data-trace-anchor`).
- Ámbito de medición: `main[data-trace-scope]`.
- Colores y pulso: tokens en `packages/brand`.
- Solo se pinta ≥900 px y pausa con `prefers-reduced-motion`.

### 4.5 Menú móvil

`Menu.astro` + `motion/menu.ts`.

| Elemento visible | Fuente |
| --- | --- |
| `Menú / Portfolio` | literal + `site.name` |
| `Cerrar` | literal |
| 5 enlaces grandes | `site.navigation` |
| LinkedIn, GitHub, GitLab | `site.footer.links` |

Panel oscuro (`--c-dark`) a pantalla completa: bloquea scroll, hace inerte la página, devuelve el foco y conserva estado activo en `data-section-nav`.

### 4.6 Footer / contacto

`Footer.astro`, con `BaseFooter` y sección `id="contacto"`. Va fuera de `main`.

| Elemento visible | Fuente |
| --- | --- |
| `Fin de la señal` | literal |
| `Volver al inicio` | literal + `homeHref` |
| Nota de cierre | `site.footer.note` |
| Colofón | `site.footer.colophon` |
| `Mapa` y sus cinco celdas | literal + `site.navigation` |
| LinkedIn, GitHub, GitLab | `site.footer.links` |
| Ciudad y país | `site.location` |
| `© {año} {name}` | año actual + `site.name` |
| Derechos | `site.footer.rights` |
| `Diseño y código propios` | literal |

El estado activo se pinta sobre la celda actual mediante `data-section-nav`.

## 5. Secciones

### 5.1 Hero (`id="inicio"`)

`sections/Hero.astro` sobre `BaseHero`. El hero actual es tipográfico: dos líneas (`Juan`, `Miguel.`), un punto rojo y dos acciones debajo.

| Elemento visible | Fuente | Detalle |
| --- | --- | --- |
| `h1` accesible | `site.name` (vía `aria-label`) | marcado visual con `firstName` y `lastName` |
| `Juan` / `Miguel.` | `site.hero.firstName`, `site.hero.lastName` | `data-split="lines"`, `data-intro`, delayed |
| Punto rojo | literal `.` con `.hero__dot` | acento visual |
| Introducción | `site.hero.intro` | `.hero__intro` |
| `Ver proyectos` | `site.hero.primaryAction` | `Button` variante `solid` |
| `Trayectoria` | `site.hero.secondaryAction` | `Button` variante `line` |

No hay retrato en el hero; el retrato aparece en `#perfil`. Los campos antiguos (`summary`, `kicker`, `coordinates`, `portraitCaption`) no existen en el schema actual.

### 5.2 Disciplina (`#disciplina`)

`sections/Discipline.astro` compone `SectionHeading`, `MethodSteps` y `CapabilityGrid`.

| Elemento | Fuente |
| --- | --- |
| Etiqueta `01 / Disciplina` y titular | `site.approach` |
| body | `site.approach.body` |
| `Método`, titular y cuerpo | `site.method` |
| cuatro pasos | `site.process` |
| `Capacidades` + cuatro tarjetas | `site.capabilities`, iconos fijos en `CapabilityGrid.astro` |

Iconos fijos, en el orden de `site.capabilities.items`:

1. `tabler:route`
2. `tabler:shield-check`
3. `tabler:terminal-2`
4. `tabler:git-branch`

Si añades una quinta, añade el icono al array y amplía la lista permitida en `astro.config.mjs`.

### 5.3 Trabajo (`#trabajo`)

`sections/Work.astro` compone `SectionHeading` y `ProjectRow` por cada proyecto, ordenado por `featuredOrder`.

`ProjectRow.astro` pinta índice, título, resumen, `highlights`, tecnologías, año, organización y estado. En `externalLinks` excluye los enlaces con `kind === "demo"`.

Hover: la fila se invierte con un `::before` que escala de abajo a arriba; el título se desplaza y los textos cambian. Los estilos están en `ProjectRow.astro`; el contenedor, en `Work.astro`.

Los proyectos no se abren como fichas: solo enlazan fuera (`target="_blank"`). No se renderizan SVG de proyecto dentro de la portada; quedan en `public/images` como material de apoyo.

### 5.4 Trayectoria (`#trayectoria`)

`sections/Experience.astro` carga `experience` y resuelve la organización; `ExperienceList.astro` es puramente presentacional.

| Elemento | Fuente |
| --- | --- |
| Etiqueta, titular, párrafo | `site.experienceSection` |
| Organización | `organizations.name`, con enlace si hay `url` |
| Puesto y fechas | `role`, `startDate`, `endDate` o `current` |
| Resumen | `summary` |
| Contribuciones | `contributions` |
| Lugar | `location` |
| `Actual` o año de cierre | literal del componente, según `current` |

Orden: primero los puestos actuales y luego por `startDate` descendente. La entrada encaja por `organizationId`.

### 5.5 Perfil (`#perfil`)

`sections/Profile.astro` compone `SectionHeading` y `PortraitPlate`.

| Elemento | Fuente |
| --- | --- |
| Etiqueta `04 / Perfil` | `site.profile.index`, `label` |
| Titular | `site.profile.title` |
| Biografía | `site.profile.long` (varios párrafos) |
| Retrato | `PortraitPlate.astro` + `src/assets/profile.webp` |
| Alt | `Retrato de {site.name}` |
| Pie | `site.location.city` |
| `Perfil / 04` | `site.profile.index` |

`PortraitPlate` aplica escala de grises y un cuadrado rojo decorativo; usa `srcset` de 360/544/720 px.

## 6. Comportamiento y motor

### 6.1 Arranque

`BaseLayout` importa `start` de `engine/astro.ts` y `setupMotion` de `motion/setup.ts`.

1. `boot(setupMotion)` añade clases `js` e `is-booted`, activa o desactiva `motion`.
2. Se inicializan scroll, loader y reveals.
3. `runLoader()` espera assets críticos; después arranca scroll y ejecuta la timeline de intro.
4. `onPage(() => initSignal())` registra la traza.

No hay router cliente ni `ClientRouter`; la página se construye estáticamente.

### 6.2 Archivos del motor

| Archivo | Qué controla |
| --- | --- |
| `engine/astro.ts` | arranque único para Astro |
| `engine/index.ts` | ciclo de vida, `onPage`, flags `js`/`is-booted`/`motion`, carga del loader |
| `engine/env.ts` | `isTouch`, `isMobile`, `prefersReducedMotion`, `ease` |
| `engine/scroll.ts` | Lenis, ScrollTrigger, `scrollState`, `onScroll`, `scrollToTarget` |
| `engine/reveal.ts` | revelaciones por líneas/bloques |
| `engine/loader.ts` | espera de assets críticos y retirada del loader |

| Archivo | Qué controla |
| --- | --- |
| `motion/setup.ts` | une todo, configura loader, menú, scrollspy y traza (define `initClock`, que queda inerte porque no hay `[data-clock]` visible) |
| `motion/signal.ts` | dibuja la traza a partir de `data-trace-anchor` |
| `motion/scrollspy.ts` | marca el nodo activo en cabecera y footer |
| `motion/menu.ts` | abre/cierra menú, foco e inercia |

Eliminado: `motion/projects.ts`, `engine/interactions.ts`, `initCursor`, `initMagnetic` y la lógica de fichas.

### 6.3 Atributos de datos útiles

| Atributo | Efecto |
| --- | --- |
| `data-reveal="up"` / `"fade"` | revela el bloque al entrar |
| `data-split="lines"` | divide el titular en líneas animadas |
| `data-intro` | incluye el elemento en la secuencia de entrada |
| `data-delay="0.2"` | retraso en segundos dentro de la secuencia |
| `data-trace-anchor` | punto de conexión de la traza |
| `data-section-nav` | sincroniza el estado activo de cabecera/footer |
| `data-loader-count`, `data-loader-bar`, `data-loader-rule`, `data-loader-mark`, `data-loader-out` | animación del loader |
| `data-critical` | asset que el loader espera |
| `data-inert-when-menu` | bloqueo de scroll cuando el menú está abierto |
| `data-theme-toggle` | botón de cambio de tema |
| `data-theme`, `data-theme-light`, `data-theme-dark`, `data-theme-storage-key` | estado y valores del tema en `<html>` |

## 7. Texto compartido, estilo y paquetes

### 7.1 Shared base classes

Todo lo compartido usa el prefijo `base-`:

- `base-hero`
- `base-footer`
- `base-wrapper`
- `base-section-head`
- `base-btn`
- `base-btn--solid/line/light/accent`

### 7.2 Paquetes compartidos

- `packages/brand` (`@juan-miii/brand`): package público, CSS only. Tokens, base, iconos, layout, componentes, motion y loader.
- `packages/ui` (`@portfolio/ui`): privado, componentes base. Incluye `PageWrapper`, `BaseHero`, `BaseFooter`, `SectionHeading`, `Button`, `NodeLabel`, `Prose`, `ThemeScript`, `ThemeToggle`.
- `packages/ui/src/theme.ts`: `themeDefaults` (`storageKey`, `lightColor`, `darkColor`).
- `packages/brand/src/styles/tokens.css`: overrides de dark theme en `html[data-theme="dark"]`.
- Los componentes de `packages/ui` no usan `astro-icon`; emplean SVG inline.
- El cursor de marca se ha eliminado por completo (`initCursor` no se usaba).
- La configuración compartida de TypeScript se ha eliminado; `web` y `ui` extienden `astro/tsconfigs/strictest`, y `brand` tiene su propio tsconfig autónomo.

### 7.3 Catálogo de componentes compartidos

Consultar `docs/design/components.md`. Además:

- `PageWrapper` (`.base-wrapper`).
- `BaseHero` (`.base-hero`).
- `BaseFooter` (`.base-footer.dark-field`).
- `SectionHeading` (`.base-section-head`, `index`, `label`, `title`, `body`, `anchor`).
- `Button` (`variant` solid/line/light/accent).
- `NodeLabel` (etiqueta + puerto con `data-trace-anchor`).
- `Prose`.
- `ThemeScript` en `<head>`.
- `ThemeToggle` en cabecera.

### 7.4 Tema claro/oscuro

- `ThemeScript` se renderiza en `<head>` como script inline bloqueante. Fija `data-theme`, `color-scheme` y el `meta[name="theme-color"]` antes del primer pintado.
- `ThemeToggle` se renderiza en el `<body>` y es un módulo diferido.
- `ThemeScript` escribe en `<html>`: `data-theme-light`, `data-theme-dark`, `data-theme-storage-key`.
- `.dark-field` aplica variables en footer/menú/líneas.

### 7.5 Paquetes y publicación

- `@juan-miii/brand`: package público (`1.0.0`), CSS only, provenance en CI.
- `@portfolio/ui`: privado (`1.0.0`), versionado por Changesets sin tags.
- `@portfolio/web`: privado (`2.0.0`), versionado por Changesets sin tags.
- Paquete raíz `portfolio`: `2.0.0`, infraestructura.

## 8. Paleta y tokens

- Claro: `--c-ground #F2F1EC`, `--c-ink #141413`, `--c-muted #62615B`, acento `#D93A2B`.
- Oscuro: `html[data-theme="dark"]` cambia a `--c-ground #0f0f0e`, `--c-ink #f2f1ec`, `--c-muted #8c8c88`.
- `.dark-field` usa `--c-dark` para footer/menú.
- Capas: `--z-trace 0`, `--z-content 1`, `--z-header 50`, `--z-menu 60`, `--z-loader 100`. Ya no existe `--z-cursor`.

## 9. Contenido, schemas y pruebas

- Schemas: `experience.schema.ts`, `organization.schema.ts`, `page.schema.ts`, `project.schema.ts`, `index.ts`.
- Tipos en `apps/web/src/types.ts`. Carga centralizada en `apps/web/src/lib/site.ts`.
- `pnpm test`: `scripts/content-check.test.mjs`.
- `pnpm test:e2e`: `pnpm build && node apps/web/scripts/smoke.test.mjs`.
- `pnpm test:a11y`: `pnpm build && pnpm --filter @portfolio/web test:a11y`.
- `pnpm check`: formato Biome, lint y `turbo run check`.

## 10. Assets, seguridad y despliegue

- `src/assets/profile.webp` con `srcset` 360/544/720.
- `public/images`: SVG de proyectos, base para otros usos.
- Iconos declarados en `astro.config.mjs` (`@iconify-json/tabler`, `@iconify-json/simple-icons`).
- `public/og.png`, `favicon.svg`, fuentes self-host Switzer/JetBrains Mono.
- `public/.well-known/security.txt` con workflow de expiración.
- `llms.txt` describe el repo y documentación.
- Deployment: `.github/workflows/deploy.yml`.
- Release: Changesets. Expiración de `security.txt`: workflow dedicado.
- Gitleaks: `.github/workflows/gitleaks.yml`, `.gitleaks.toml`, hook local opcional.

## 11. Notas de mantenimiento

- `initClock()` se define en `motion/setup.ts`, pero `[data-clock]` no se usa.
- `site.footer.links` alimenta menú y footer.
- Los enlaces con `kind: "demo"` se excluyen en `ProjectRow.astro`.
- `SectionHeading.anchor` controla si el node label es ancla de la traza.
- Los selectores globales usan `:global()` dentro de `<style>`.
