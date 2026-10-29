# COMPONENTS: mapa de edición de la web

Este documento dice **dónde vive cada cosa visible** para poder cambiarla a mano sin
leer toda la aplicación. La web es una sola página: la portada contiene todas las
secciones y las fichas de proyecto se abren en diálogos nativos. La única ruta
adicional es el 404.

Orden de lectura recomendado:

1. El texto está en `apps/web/src/content`. Empieza ahí.
2. La estructura de la portada está en `apps/web/src/pages/index.astro`.
3. El marco común (head, loader, cabecera, menú, pie) está en
   `apps/web/src/layouts/BaseLayout.astro` y sus componentes.
4. La dirección de arte está en `packages/brand/src/styles/tokens.css`.
5. El concepto y las decisiones de diseño están en [`DESIGN.md`](./DESIGN.md).

Convenciones de las tablas:

- **Contenido**: JSON o Markdown. No requiere tocar código.
- **Componente**: archivo `.astro` con marcado y estilos propios.
- **Estilo**: CSS global, de marca o con ámbito del componente.
- **Comportamiento**: TypeScript en `src/engine` o `src/motion`.

## 1. Árbol de archivos

```text
apps/web/
├── astro.config.mjs              sitio, sitemap, iconos, CSS inline
├── public/
│   ├── favicon.svg               icono de pestaña
│   ├── og.png                    imagen para redes
│   ├── robots.txt
│   └── fonts/                    Switzer y JetBrains Mono
└── src/
    ├── layouts/BaseLayout.astro  html, head, loader, header, main, footer, menú, cursor
    ├── pages/index.astro         orden y composición de la portada
    ├── pages/404.astro           única ruta adicional
    ├── components/               cada bloque visible
    ├── content/                  textos, proyectos, casos, experiencia
    ├── engine/                   ciclo de vida, scroll, loader, revelaciones
    ├── motion/                   traza, scrollspy, fichas, menú, reloj
    ├── styles/global.css         botones, prosa, loader, cursor, utilidades
    └── assets/profile.webp       retrato original

packages/brand/src/styles/
├── tokens.css                    colores, tipos, espacio, movimiento, capas
├── base.css                      shell, secciones, etiquetas de nodo, campo oscuro
└── icons.css                     tamaños de icono compartidos

packages/ui/src/                  componentes compartidos (ver sección 9)
```

## 2. Orden de la página

| Qué se ve | Ancla | Marcado | Contenido |
| --- | --- | --- | --- |
| Loader de entrada | — | `layouts/BaseLayout.astro` | nombres y coordenadas de `site.json` |
| Cabecera fija | — | `components/Header.astro` | `site.name`, `site.role`, `site.navigation`, `site.availability` |
| Hero | `#inicio` | `components/Hero.astro` | `site.hero`, `site.location`, `site.availability` |
| Disciplina y método | `#disciplina` | `pages/index.astro` | `site.approach`, `site.method`, `site.process` |
| Capacidades (dentro de disciplina) | `#capacidades` | `pages/index.astro` | `site.capabilities` |
| Trabajo | `#trabajo` | `pages/index.astro` + `ProjectRow` | `site.work`, colección `projects` |
| Trayectoria | `#trayectoria` | `components/ExperienceList.astro` | colecciones `experience` y `organizations` |
| Perfil | `#perfil` | `pages/index.astro` + `PortraitPlate` | `site.profile`, `site.location` |
| Contacto y CTA | `#contacto` | `components/ContactSection.astro` | `site.contact`, `site.email`, `site.github`, `site.availability`, `site.navigation`, `site.footer` |
| Barra legal | — | `components/Footer.astro` | `site.footer.rights`, `site.name` |
| Fichas de proyecto | `#proyecto-<slug>` | `components/ProjectSheet.astro` | `projects/*.json` + `cases/*.md` |
| Menú móvil | — | `components/Menu.astro` | `site.navigation`, `site.email`, `site.github` |
| 404 | — | `pages/404.astro` | `site.notFound` |

La portada está envuelta por `BaseLayout`, que coloca el `Footer` **fuera** de
`main`. `ContactSection` está **dentro** de `main` para que la traza pueda medir su
etiqueta. No muevas el contacto fuera de `main` sin revisar `motion/signal.ts`.

## 3. Dónde está el texto

| Archivo | Qué contiene |
| --- | --- |
| `apps/web/src/content/pages/site.json` | Todo el texto de la portada, navegación, contacto, pie y 404. Es el primer sitio que hay que editar. |
| `apps/web/src/content/projects/*.json` | Ficha del proyecto: título, resumen, rol, periodo, estado, tecnologías, enlaces y variante del esquema. |
| `apps/web/src/content/cases/*.md` | Caso completo que se lee dentro de la ficha. Los `###` generan el índice lateral. |
| `apps/web/src/content/experience/*.json` | Puestos, fechas, resumen y contribuciones. |
| `apps/web/src/content/organizations/*.json` | Nombre, URL y descripción de cada organización. |
| `apps/web/src/content/schemas/*.ts` | Contrato Zod de cada colección. Si añades un campo, actualiza su esquema. |
| `apps/web/scripts/content-check.mjs` | Referencias entre colecciones, ids duplicados, slugs y recursos. |

Rutas principales dentro de `site.json`:

| Ruta | Se usa en |
| --- | --- |
| `name`, `role`, `title`, `description` | `<title>`, meta, cabecera, loader, JSON-LD y pie |
| `location.city/country/coordinates` | hero, loader, contacto, JSON-LD |
| `email`, `github` | CTA de contacto, menú, JSON-LD |
| `availability` | cabecera, hero, contacto |
| `navigation` | cabecera, menú y mapa del cierre |
| `hero` | hero |
| `approach`, `method`, `process` | disciplina y método |
| `capabilities` | capacidades dentro de disciplina |
| `work` | trabajo |
| `experienceSection` | cabecera de trayectoria |
| `profile` | perfil |
| `contact` | cierre y CTA |
| `footer` | cierre y barra legal |
| `notFound` | 404 |

## 4. Marco común

### 4.1 Head, SEO y metadatos

Todo se monta en `apps/web/src/layouts/BaseLayout.astro`, dentro de `<head>`.

| Qué se ve o consume | Fuente | Cómo cambiarlo |
| --- | --- | --- |
| Título de pestaña | `title={site.title}` en `index.astro`; `notFound.title` en `404.astro` | `site.json` → `title` |
| Descripción | `description={site.description}` | `site.json` → `description` |
| Canonical | `BaseLayout` con `Astro.site` | `astro.config.mjs` → `site` |
| Open Graph y Twitter | `BaseLayout` + `public/og.png` | `site.json` y `astro.config.mjs` |
| JSON-LD `Person` | `BaseLayout` | `site.json`; arrays `knowsAbout` en el layout |
| `theme-color` | `BaseLayout` | literal `#F2F1EC` |
| Favicon | `public/favicon.svg` | sustituir el SVG |
| Fuentes precargadas | `BaseLayout` + `public/fonts` | rutas y `@font-face` en `tokens.css` |
| `noindex` | `404.astro` pasa `noindex` | `pages/404.astro` |
| Sitemap | `@astrojs/sitemap` | `astro.config.mjs` |
| `robots.txt` | `public/robots.txt` | editar el archivo |
| `security.txt` | `public/.well-known/security.txt` | editar el archivo |

### 4.2 Loader

Marcado en `BaseLayout.astro`, estilos en `styles/global.css` (`.loader*`), salida
en `motion/setup.ts` y espera real en `engine/loader.ts`.

| Elemento visible | Texto o fuente | Archivo |
| --- | --- | --- |
| Arriba izquierda | `{site.name} / Portafolio` | `BaseLayout.astro` |
| Arriba derecha | `{city}, {country}` | `BaseLayout.astro` + `site.json` |
| Marca central `JM.` | literal | `BaseLayout.astro` |
| Etiqueta | `Preparando la señal` | `BaseLayout.astro` |
| Contador | `000 /100` | `BaseLayout.astro` y `motion/setup.ts` |
| Barra roja | `[data-loader-bar]` | `styles/global.css` |
| Abajo izquierda | `Ingeniería / Seguridad / Entrega` | `BaseLayout.astro` |
| Abajo derecha | coordenadas | `BaseLayout.astro` + `site.json` |

El loader solo aparece con JavaScript (`html.js #loader`). Espera fuentes, retrato
crítico y la primera pantalla; después se retira con la cortina de `setup.ts`.
No lo alargues de forma artificial.

### 4.3 Cabecera

Componente: `apps/web/src/components/Header.astro`. Datos: `site.json`.

| Elemento visible | Fuente | Nota |
| --- | --- | --- |
| Cuadrado `JM` | literal en `Header.astro` | decorativo, `aria-hidden` |
| Nombre | `site.name` | enlace a inicio |
| Rol | `site.role` | debajo del nombre |
| Navegación de 5 nodos | `site.navigation` | `[data-section-nav]`; el estado activo lo pone `motion/scrollspy.ts` |
| Punto verde y disponibilidad | `site.availability.label` | el `title` usa `availability.note` |
| Reloj `MAD --:--` | `motion/setup.ts` | zona `Europe/Madrid`, actualiza cada 30 s |
| `Contacto` | literal `Header.astro` | apunta a `#contacto` o `/#contacto` |
| Botón `Menú` | literal `Header.astro` | abre `Menu.astro` |

La cabecera se queda pegada arriba (`position: sticky`). Sus estilos están en el
`<style>` del propio componente. El estado activo de los enlaces se pinta con
`.is-active` y `aria-current="location"`.

### 4.4 Traza de señal

| Elemento | Archivo |
| --- | --- |
| SVG, bus, ramas, puertos y pulso | `components/SignalTrace.astro` |
| Cálculo de geometría y animación | `motion/signal.ts` |
| Colores y pulso | `packages/brand/src/styles/tokens.css` y el `<style is:global>` del componente |
| Puntos de anclaje | atributos `data-trace-anchor` en `SectionHeading`, `ProjectRow`, `ExperienceList` y `ContactSection` |
| Ámbito | `main[data-trace-scope]` en `BaseLayout.astro` |

La traza se oculta por debajo de 900 px y con `prefers-reduced-motion`. Se dibuja
a partir de posiciones reales, no de coordenadas escritas a mano. Si añades una
sección con `SectionHeading`, la traza la detecta sin tocar `signal.ts`.

### 4.5 Cursor

| Elemento | Archivo |
| --- | --- |
| Punto y etiqueta | `BaseLayout.astro` (`#cursor`) |
| Estilos | `styles/global.css` (`#cursor`, `.cursor__inner`) |
| Movimiento | `engine/interactions.ts` |
| Etiquetas | `data-cursor="Perfil"`, `"Bajar"`, `"Abrir ficha"`, `"Escribir"` |

El cursor nativo nunca se oculta. En táctil o con movimiento reducido el seguidor
desaparece.

### 4.6 Menú móvil

Componente: `components/Menu.astro`. Comportamiento: `motion/menu.ts`.

| Elemento visible | Fuente |
| --- | --- |
| `Menú / Juan Miguel` | literal + `site.name` |
| `Cerrar` | literal |
| 5 enlaces grandes | `site.navigation` |
| Correo | `site.email` |
| GitHub | `site.github` |
| Ciudad | `site.location.city` |

El menú es un panel oscuro a pantalla completa. Bloquea el scroll, hace inerte el
resto de la página y devuelve el foco al botón que lo abrió. Sus enlaces también
actualizan el estado activo mediante `[data-section-nav]`.

### 4.7 Barra legal

Componente: `components/Footer.astro`, con datos de `site.json`. Es el
`contentinfo` de la página y va fuera de `main`.

| Elemento visible | Fuente |
| --- | --- |
| `Fin de la señal` | literal |
| `© {año} {name}` | año actual + `site.name` |
| Derechos | `site.footer.rights` |
| `Diseño y código propios` | literal |
| `Volver al inicio` | literal + `homeHref` |

El antiguo nombre gigante del pie ya no existe. El cierre visual es
`ContactSection.astro`; la barra legal solo remata la página.

## 5. Portada, sección por sección

### 5.1 Hero

Componente: `components/Hero.astro`. Retrato: `src/assets/profile.webp`.

| Elemento visible | Fuente | Archivo |
| --- | --- | --- |
| `Portafolio / 2026` | `site.hero.kicker` | `site.json` |
| Coordenadas | `site.location.coordinates` | `site.json` |
| `Señal activa` | literal | `Hero.astro` |
| `Juan` / `Miguel.` | `site.hero.firstName` / `lastName` | `site.json` |
| Nombre accesible del `h1` | `site.name` | `site.json` |
| Retrato | `src/assets/profile.webp` | sustituir el archivo |
| Alt del retrato | `Retrato de {site.name}` | `Hero.astro` |
| Pie del retrato | `site.hero.portraitCaption` | `site.json` |
| Rol junto al retrato | `site.role` | `site.json` |
| Introducción | `site.hero.intro` | `site.json` |
| Botón sólido | `site.hero.primaryAction` | `site.json` |
| Botón de línea | `site.hero.secondaryAction` | `site.json` |
| Punto y disponibilidad | `site.availability.label` | `site.json` |
| Nota de disponibilidad | `site.availability.note` | `site.json` |
| `Desplaza para recorrer la señal` | `site.hero.scrollCue` | `site.json` |

El retrato usa `astro:assets`: se generan variantes webp de 152, 288 y 560 px. Si
cambias la imagen, mantén una proporción cuadrada para no romper la retícula.

### 5.2 Disciplina y método

Marcado en `pages/index.astro`, con datos de `site.json`.

| Elemento visible | Fuente |
| --- | --- |
| Etiqueta `01 / Disciplina` | `site.approach.index`, `label` |
| Titular | `site.approach.title` |
| Párrafo | `site.approach.body` |
| `Método` | `site.method.label` |
| `Cuatro pasos, ninguna caja negra.` | `site.method.title` |
| Párrafo del método | `site.method.body` |
| Cuatro pasos numerados | `site.process` (`index`, `title`, `description`) |

Los estilos de esta sección están en el `<style>` de `pages/index.astro`
(`.method*`, `.capabilities*`). El encabezado común lo pone `SectionHeading.astro`.
La sub-sección de capacidades se monta dentro de este mismo `<section>`.

### 5.3 Trabajo

| Elemento visible | Fuente |
| --- | --- |
| Etiqueta, titular y párrafo | `site.work.index`, `label`, `title`, `body` |
| Filas de proyecto | colección `projects`, ordenadas por `featuredOrder` |
| Número de fila | índice automático |
| Título, resumen, hitos y enlaces | `projects/*.json` |
| Tecnologías | `technologies` |
| Año, rol y estado | `year`, `role`, `statusLabel` |
| Flecha y texto accesible | `ProjectRow.astro` |

El título de cada fila es un enlace a `#proyecto-<slug>` con
`aria-haspopup="dialog"` y una capa `::after` que cubre la fila. Los enlaces
externos y `Ver caso` quedan por encima de esa capa. Al pasar el ratón, el fondo
se invierte de abajo arriba con `::before` y `scaleY`. Los estilos están en
`components/ProjectRow.astro`; el contenedor, en `pages/index.astro`.

### 5.4 Capacidades

Sub-bloque con `id="capacidades"` dentro de la sección `#disciplina`.

| Elemento visible | Fuente |
| --- | --- |
| Etiqueta, titular y párrafo | `site.capabilities.*` |
| Cuatro tarjetas | `site.capabilities.items` |
| Letra de tarjeta (`A` a `D`) | índice automático |
| Icono | array `capabilityIcons` en `pages/index.astro` |
| Título, descripción y herramientas | `items[].title`, `description`, `tools` |

Orden de `capabilityIcons` (debe coincidir con el orden de `items`):

1. `tabler:route`
2. `tabler:shield-check`
3. `tabler:terminal-2`
4. `tabler:git-branch`

Si añades una quinta capacidad, añade también su icono al array y el nombre a la
lista permitida de `astro.config.mjs`.

### 5.5 Trayectoria

Componente: `components/ExperienceList.astro`. Datos:
`content/experience/*.json` y `content/organizations/*.json`.

| Elemento visible | Fuente |
| --- | --- |
| Etiqueta, titular y párrafo | `site.experienceSection.*` |
| Número de puesto | índice automático |
| Organización | `organizations.name`; enlace si tiene `url` |
| Puesto y fechas | `experience.role`, `startDate` y `endDate`; `current` muestra `actualidad` |
| Resumen | `experience.summary` |
| Contribuciones | `experience.contributions` |
| Lugar | `experience.location` |
| `En curso` / `Finalizada` | literal en el componente, según `current` |

La lista se ordena por `current` y después por `startDate` descendente. El
componente admite `compact`, pero la portada usa la versión completa.

### 5.6 Perfil

| Elemento visible | Fuente |
| --- | --- |
| Etiqueta y titular | `site.profile.index`, `label`, `title` |
| Cuatro párrafos biográficos | `site.profile.long` |
| Retrato grande | `components/PortraitPlate.astro` + `src/assets/profile.webp` |
| Alt | `Retrato de {site.name}` |
| Pie `Madrid` | `site.location.city` |
| `Perfil / 04` | `site.profile.index` en `pages/index.astro` |

El mismo archivo `profile.webp` alimenta el retrato pequeño del hero y el grande
del perfil. `PortraitPlate` aplica escala de grises y un cuadrado rojo decorativo;
sus estilos están en el propio componente.

### 5.7 Contacto y CTA

Componente: `components/ContactSection.astro`. Es el cierre visual y el CTA
principal. Vive dentro de `main` y usa el campo oscuro (`.dark-field`).

| Elemento visible | Fuente | Archivo |
| --- | --- | --- |
| Etiqueta `05 / Contacto` | `site.contact.index`, `label` | `site.json` |
| `Señal abierta` | literal | `ContactSection.astro` |
| Titular `Hablemos.` | `site.contact.title` | `site.json` |
| Párrafo | `site.contact.body` | `site.json` |
| `Escribir un correo` | `site.contact.emailLabel` | `site.json` |
| Dirección grande | `site.email` | `site.json` |
| Nota del correo | `site.contact.note` | `site.json` |
| `Qué incluir` | literal | `ContactSection.astro` |
| Tres pasos de la guía | `site.contact.guide` | `site.json` |
| `Mapa` | literal | `ContactSection.astro` |
| Cinco celdas del mapa | `site.navigation` | `site.json` |
| Nota de cierre | `site.footer.note` | `site.json` |
| Colofón | `site.footer.colophon` | `site.json` |
| `GitHub` | `site.github` | `site.json` |
| Ciudad y país | `site.location.*` | `site.json` |
| Disponibilidad y respuesta | `site.availability.*` | `site.json` |

En el cierre, la dirección de correo es el único CTA grande: no hay botón `mailto`
duplicado ni lista de temas. El mapa usa `[data-section-nav]`, así que el mismo
scrollspy que marca la cabecera marca la celda activa. Al pasar el ratón o
enfocar, cada celda se inunda de papel con un `::before` animado.

Los estilos del cierre están todos en el `<style>` de `ContactSection.astro`.
Los colores del campo oscuro vienen de `.dark-field` en
`packages/brand/src/styles/base.css`.

## 6. Fichas de proyecto

Se abren desde cada fila de `ProjectRow`. El diálogo nativo está en
`components/ProjectSheet.astro`; el contenido, en `projects/*.json` y
`cases/*.md`; el comportamiento, en `motion/projects.ts`.

| Elemento visible | Fuente |
| --- | --- |
| `Ficha / 01 de 02` | índice y total calculados en `pages/index.astro` |
| Título en la barra | `projects.title` |
| `Cerrar ficha` | literal en `ProjectSheet.astro` |
| `Proyecto / periodo / cliente` | `period`, `client` |
| Titular y resumen | `title`, `summary` |
| Botón de repositorio | `links[kind=repository]` |
| Botón de demo | `links[kind=demo]`, si existe |
| Botón de documentación | `links[kind=documentation]`, si existe |
| `Rol`, `Periodo`, `Estado`, `Tecnologías` | etiquetas literales + campos del JSON |
| Esquema | `components/ProjectPlate.astro`, variante `plate` |
| Título accesible del esquema | `coverAlt` (o `title`) |
| `Lectura` | literal |
| Índice de capítulos | encabezados `###` de `cases/*.md` |
| Prosa del caso | cuerpo Markdown de `cases/*.md` |
| `Divulgación / ...` | `cases.disclosure` |
| `Siguiente ficha` | siguiente proyecto en el orden de la colección |
| `Volver al índice` | literal, enlaza a `#trabajo` |

Reglas de edición:

- El `id` del diálogo es `proyecto-<slug>`. Ese hash es el enlace profundo y el
  fallback sin JavaScript. No cambies el slug sin actualizar enlaces y pruebas.
- Cada proyecto necesita un caso publicado cuyo `projectId` coincida con el `id`
  del proyecto. Si falta, el build falla.
- Solo los encabezados de nivel 3 (`###`) entran en el índice lateral. Los `##`
  se reservan para la prosa.
- `cover` ya no pinta nada en la ficha. El dibujo visible es el SVG escrito a mano
  de `ProjectPlate.astro`; `coverAlt` sigue siendo el título accesible del
  esquema. Los SVG de `public/images` quedan como material de apoyo.
- `plate` admite `content` o `pipeline`. Cada variante tiene su propia lista de
  pasos y su propio SVG. El dibujo comparte una retícula de 11 líneas verticales y
  6 horizontales cada 80 px, con un bus inferior y el acento en el paso crítico.
  Para cambiar el diagrama, edita `ProjectPlate.astro`.
- Por debajo de 900 px el SVG se sustituye por una lista ordenada accesible de
  pasos. No es una imagen generada ni una captura.

Comportamiento: `dialog.showModal()` da contención de foco, Escape y backdrop. Al
cerrar se restaura el foco en el enlace que abrió la ficha. `history.replaceState`
mantiene el hash sin llenar el historial; el botón Atrás del navegador no cierra
la ficha.

## 7. 404

Página: `apps/web/src/pages/404.astro`. Datos: `site.notFound`.

| Elemento visible | Fuente |
| --- | --- |
| `404 / Señal perdida` | `notFound.index`, `label` |
| `Endpoint no resuelto` | literal |
| Titular `Este nodo no existe.` | `notFound.title` |
| Descripción | `notFound.description` |
| Botón principal | `notFound.backLabel`, `backHref` |
| Botón `Contacto` | literal `/#contacto` |
| Diagrama abierto | SVG literal en la página |
| `Circuito / abierto`, `señal`, `sin destino` | texto literal del SVG |
| Enlaces `Trabajo`, `Perfil`, `Contacto` | literales con `/#...` |

El 404 comparte cabecera, menú, pie, cursor y traza con la portada. La navegación
se reescribe a `/#sección` porque esas secciones no existen en esta ruta.

## 8. Estilos y design system

### 8.1 Tokens

Archivo: `packages/brand/src/styles/tokens.css`.

| Grupo | Variables | Uso |
| --- | --- | --- |
| Paleta clara | `--c-ground`, `--c-ink`, `--c-muted`, `--c-line`, `--c-line-strong` | Fondo, texto, bordes |
| Acento | `--c-accent`, `--c-accent-ink`, `--c-accent-dark` | Señal, numeración, foco, subrayados |
| Campo oscuro | `--c-dark`, `--c-paper`, `--c-muted-dark` | Contacto, pie, menú, fichas |
| Tipografía | `--f-display`, `--f-body`, `--f-mono` | Switzer y JetBrains Mono |
| Escala | `--t-mega`, `--t-display`, `--t-xl`, `--t-l`, `--t-m`, `--t-body`, `--t-s`, `--t-xs` | Tamaños fluidos |
| Retícula | `--shell`, `--gutter` | Ancho máximo y márgenes |
| Espacio | `--s-1` a `--s-10` | Ritmo vertical y horizontal |
| Forma | `--radius*`, `--shadow*` | Radio 0 y sin sombras |
| Movimiento | `--motion-fast/base/slow/scene`, `--motion-easing` | Duraciones y curva |
| Capas | `--z-trace`, `--z-content`, `--z-header`, `--z-menu`, `--z-cursor`, `--z-sheet`, `--z-loader` | Apilado |

Para cambiar el acento de todo el sitio, edita las tres variables
`--c-accent*`. Para invertir el cierre, edita `--c-dark` y `--c-paper`.

### 8.2 Base compartida

Archivo: `packages/brand/src/styles/base.css`.

| Clase | Qué controla |
| --- | --- |
| `.shell` | Ancho y centrado de todas las secciones |
| `.section`, `.section--tight` | Ritmo vertical |
| `.mono` | Texto monoespaciado en mayúsculas |
| `.node-label` | Etiqueta con puerto que conecta con la traza |
| `.display` | Titular de display |
| `.text-link` | Enlace subrayado con relleno al pasar el ratón |
| `.dark-field` | Fondo oscuro y remapeo de variables |
| `.sr-only` | Texto solo para lectores de pantalla |
| `.skip-link` | Enlace `Saltar al contenido` |

### 8.3 Estilos globales de la app

Archivo: `apps/web/src/styles/global.css`.

| Bloque | Qué controla |
| --- | --- |
| `main`, traza y capas | Contenido por encima de la traza |
| `[data-reveal]`, `[data-split]` | Visibilidad inicial hasta que el motor revela |
| `.btn`, `.btn--solid`, `.btn--line`, `.btn--light`, `.btn--accent` | Botones y sus rellenos |
| `.link-arrow` | Enlace con flecha |
| `.prose` | Caso dentro de la ficha: párrafos, listas, código, capítulos |
| `.loader*` | Loader de entrada |
| `#cursor`, `.cursor__inner` | Seguidor del puntero |
| `html:has(.sheet ...)` | Fallback de scroll sin JavaScript |

Cada componente guarda sus propios estilos en un `<style>` con ámbito. Si un
selector debe afectar a HTML inyectado o a otro componente, se usa `:global()`.
No dupliques tokens en los componentes: usa las variables.

## 9. Assets, iconos y paquetes

| Asset | Archivo | Uso |
| --- | --- | --- |
| Retrato | `apps/web/src/assets/profile.webp` | Hero y perfil |
| Favicon | `apps/web/public/favicon.svg` | Pestaña |
| OG | `apps/web/public/og.png` | Redes sociales |
| Fuentes | `apps/web/public/fonts/*.woff2` | Switzer y JetBrains Mono |
| SVG de proyectos | `apps/web/public/images/*.svg` | Material de apoyo; no se pinta en la ficha |
| Nota de SVG | `apps/web/public/images/NOTASVG.md` | Contexto de esos archivos |
| `robots.txt`, `security.txt` | `apps/web/public/` | Rastreo y contacto de seguridad |

Iconos:

- El set permitido se declara en `apps/web/astro.config.mjs`. Si usas un icono
  nuevo de Tabler o Simple Icons, añádelo allí antes de referenciarlo.
- Los iconos de capacidad se eligen en `capabilityIcons` dentro de
  `pages/index.astro`.
- `components/TechStack.astro` sigue disponible para futuros bloques de stack,
  pero la portada ya no lo usa.
- Los tamaños compartidos están en `packages/brand/src/styles/icons.css`.

Paquetes:

- `packages/brand` sí se usa: tokens, base e iconos.
- `packages/ui` existe y se mantiene, pero la portada usa componentes locales.
  Su catálogo está en `docs/design/components.md`.

## 10. Movimiento y comportamiento

| Archivo | Qué controla |
| --- | --- |
| `engine/astro.ts` | Arranque único para Astro |
| `engine/index.ts` | Ciclo de vida, `onPage`, clases `js`, `is-booted`, `motion` |
| `engine/scroll.ts` | Lenis, ScrollTrigger y estado de scroll |
| `engine/reveal.ts` | Revelaciones por líneas y bloques (`data-reveal`, `data-split`, `data-intro`, `data-delay`) |
| `engine/loader.ts` | Espera de assets críticos y retirada del loader |
| `engine/interactions.ts` | Cursor seguidor y `data-magnetic` (soportado, sin uso actual) |
| `motion/setup.ts` | Une todo, configura el loader y el reloj de Madrid |
| `motion/signal.ts` | Dibuja la traza desde `data-trace-anchor` |
| `motion/scrollspy.ts` | Marca el nodo activo en todas las navegaciones |
| `motion/projects.ts` | Abre, cierra y encadena fichas |
| `motion/menu.ts` | Abre y cierra el menú, foco e inercia |

Atributos de datos que puedes usar al editar marcado:

| Atributo | Efecto |
| --- | --- |
| `data-reveal="up"` / `"fade"` | Revela el bloque al entrar en pantalla |
| `data-split="lines"` | Divide el titular en líneas animadas |
| `data-intro` | Incluye el elemento en la secuencia de entrada |
| `data-delay="0.2"` | Retraso en segundos |
| `data-trace-anchor` | Punto de conexión de la traza |
| `data-section-nav` | Sincroniza el estado activo de esa navegación |
| `data-project-open="slug"` | Abre la ficha |
| `data-project-close` | Cierra la ficha |
| `data-cursor="Texto"` | Etiqueta del cursor |
| `data-magnetic="0.35"` | Atracción al puntero (disponible, sin uso) |
| `data-clock` | Reloj de Madrid |
| `data-critical` | Asset que el loader espera |

Todo el movimiento pasa por el reloj de GSAP. No añadas `scroll` listeners ni
bucles de `requestAnimationFrame` propios. Con `prefers-reduced-motion` no hay
scroll suave, ni revelaciones, ni pulso, ni theatros de loader; el contenido se
muestra completo.

## 11. Recetas de edición

### Cambiar nombre, rol, correo, GitHub o ubicación

1. Edita `apps/web/src/content/pages/site.json`.
2. Cambia `name`, `role`, `email`, `github` o `location`.
3. Revisa `hero.firstName`, `hero.lastName`, `hero.portraitCaption` y
   `profile.long` si el cambio afecta a esos textos.
4. Ejecuta `pnpm content:check && pnpm build`.

### Cambiar el texto de una sección

1. Localiza la clave en `site.json` (`approach`, `work`, `capabilities`,
   `profile`, `contact`, etc.).
2. Si el texto es una etiqueta literal, búscalo en el componente indicado en este
   documento.
3. No cambies el `id` del ancla sin actualizar `navigation` y las pruebas.

### Reordenar o renombrar la navegación

1. Edita el array `navigation` de `site.json`.
2. Mantén los cinco `href` existentes salvo que añadas o quites una sección real.
3. Si añades una sección, crea su `<section id="...">` en `index.astro` con un
   `SectionHeading`.
4. Revisa `apps/web/scripts/smoke.test.mjs` y `a11y.test.mjs`, que comprueban los
   ids.

### Añadir o editar un proyecto

1. Crea o edita `apps/web/src/content/projects/<id>.json`.
2. Crea o edita su caso en `apps/web/src/content/cases/<slug>.md` con el mismo
   `projectId`.
3. Usa `###` para los capítulos que deben aparecer en el índice de la ficha.
4. Elige `plate: "content"` o `"pipeline"`.
5. Añade `featuredOrder` para colocarlo en la lista.
6. Ejecuta `pnpm content:check` y `pnpm build`.
7. Si el caso tiene enlaces, decláralos en `links` con `kind: "repository"` o
   `"demo"`.

### Añadir o editar experiencia

1. Edita `apps/web/src/content/experience/*.json`.
2. Asegúrate de que `organizationId` existe en
   `apps/web/src/content/organizations/*.json`.
3. `current: true` muestra `actualidad` y `En curso`.
4. Ejecuta `pnpm content:check`.

### Cambiar el retrato

1. Sustituye `apps/web/src/assets/profile.webp` por otra imagen cuadrada.
2. Ajusta el `alt` en `Hero.astro` o en `index.astro` si cambia el significado.
3. Revisa las variantes de `astro:assets` en `Hero.astro` y `PortraitPlate.astro`.

### Cambiar colores o tipografía

1. Edita `packages/brand/src/styles/tokens.css`.
2. Para el acento, cambia `--c-accent`, `--c-accent-ink` y `--c-accent-dark`.
3. Para el cierre oscuro, cambia `--c-dark`, `--c-paper` y `--c-muted-dark`.
4. Si cambias una familia, actualiza `@font-face`, los archivos de
   `apps/web/public/fonts` y las precargas de `BaseLayout.astro`.

### Cambiar el cierre o el CTA

1. El titular, párrafo, guía y nota están en `site.contact`.
2. La nota y el colofón del cierre están en `site.footer`.
3. La estructura y los estilos están en `components/ContactSection.astro`.
4. La barra legal está en `components/Footer.astro`; no vuelvas a poner el nombre
   gigante ni el mapa allí.

### Cambiar un diagrama de proyecto

1. Abre `apps/web/src/components/ProjectPlate.astro`.
2. Edita el array `steps` de la variante (`content` o `pipeline`).
3. Edita el SVG del mismo archivo para mover cajas, puertos o etiquetas.
4. Mantén el `viewBox="0 0 960 560"` y la lista móvil en paralelo.
5. Revisa la ficha abierta en escritorio y en móvil.

### Añadir un icono

1. Añade el nombre a `include` en `apps/web/astro.config.mjs`.
2. Úsalo con `<Icon name="tabler:..." />` o `simple-icons:...`.
3. Si es del stack, añade también su etiqueta legible en `TechStack.astro`.

## 12. Verificación

Comandos, desde la raíz:

```bash
pnpm format        # formatea todo
pnpm check         # formato, lint, tipos y Astro
pnpm content:check # valida contenido y referencias
pnpm build         # genera apps/web/dist
pnpm test          # pruebas del verificador de contenido
pnpm test:e2e      # build + smoke test del HTML generado
pnpm test:a11y     # build + axe, foco, overflow y consola
```

`test:e2e` y `test:a11y` construyen antes de probar. Para revisar a mano:

```bash
pnpm build
pnpm --filter @portfolio/web preview --port 4400
```

Revisa en `http://localhost:4400`:

- 320, 390, 720, 900, 1024, 1440 y 1920 px sin desbordamiento horizontal.
- Las cinco anclas y el estado activo en cabecera, menú y mapa del cierre.
- Las dos fichas: apertura, cierre con Escape, backdrop, foco devuelto y enlace
  profundo `#proyecto-...`.
- El 404 y sus enlaces `/#...`.
- Navegación solo con teclado, foco visible y `prefers-reduced-motion`.
- Que el contenido se ve sin JavaScript (las fichas usan `:target`).

## 13. Mantener este documento

Actualiza `COMPONENTS.md` cuando:

- añadas o quites una sección, un ancla o una ruta;
- añadas un componente visible o cambies quién lo renderiza;
- muevas texto entre `site.json`, un JSON de colección y un `.astro`;
- cambies tokens, loader, menú, fichas o el cierre;
- añadas un asset o un icono.

Si una entrada de este documento y el código no coinciden, manda el código:
corrige el documento en el mismo cambio.
