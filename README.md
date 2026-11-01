# Juan Miguel — Portfolio

[![CI](https://github.com/juan-miii/juan-miii.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/juan-miii/juan-miii.github.io/actions/workflows/ci.yml)
[![Deploy](https://github.com/juan-miii/juan-miii.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/juan-miii/juan-miii.github.io/actions/workflows/deploy.yml)
[![Security](https://github.com/juan-miii/juan-miii.github.io/actions/workflows/security.yml/badge.svg)](https://github.com/juan-miii/juan-miii.github.io/actions/workflows/security.yml)
[![Biome](https://img.shields.io/badge/formatter-biome-60a5fa?style=flat-square)](https://biomejs.dev/)
[![Astro](https://img.shields.io/badge/framework-astro-ff5d01?style=flat-square)](https://astro.build/)

Portfolio personal de **Juan Miguel**, ingeniero informático y consultor tecnológico en Madrid. Monorepo con `pnpm` y Turborepo; la web se genera estáticamente con **Astro** y se publica en **GitHub Pages**.

El sitio es una sola página: disciplina (con método y capacidades), trabajo, experiencia, perfil y contacto. Cada proyecto abre una ficha superpuesta con su caso completo y enlaces al código fuente. La única ruta adicional es el 404.

El concepto, la dirección de arte y las decisiones de diseño están en [`DESIGN.md`](./DESIGN.md). El mapa de cada elemento visible y el archivo donde se edita está en [`COMPONENTS.md`](./COMPONENTS.md).

## Tabla de contenidos

- [Requisitos](#requisitos)
- [Comandos](#comandos)
- [Estructura](#estructura)
- [Contenido](#contenido)
- [Despliegue](#despliegue)
- [Calidad y pruebas](#calidad-y-pruebas)
- [Seguridad](#seguridad)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

## Requisitos

- Node.js `24.22.1` (`.node-version`)
- pnpm `12.16.1` (`packageManager`)
- `pnpm install --frozen-lockfile` en CI

## Comandos

Desde la raíz del repositorio:

```bash
# Instalar dependencias (con lockfile congelado)
pnpm install --frozen-lockfile

# Servidor de desarrollo (Astro, apps/web)
pnpm dev

# Build estático en apps/web/dist
pnpm build

# Servir el build localmente
pnpm preview

# Formato, lint y tipos (check completo)
pnpm check

# Validación del contenido (colecciones, referencias, slugs)
pnpm content:check

# Pruebas unitarias del contenido
pnpm test

# Build + smoke test del HTML generado
pnpm test:e2e

# Build + axe, desbordamiento, foco y consola (portada, fichas, 404)
pnpm test:a11y
```

## Estructura

```text
.
├── apps/
│   └── web/                    # Aplicación Astro (sitio desplegado)
│       ├── public/             # Recursos estáticos (fuentes, favicon, OG, security.txt)
│       ├── src/
│       │   ├── assets/         # Recursos de imagen del sitio
│       │   ├── components/     # Componentes Astro (Hero, Footer, ContactSection…)
│       │   ├── content/        # Colecciones de contenido (JSON + Markdown)
│       │   ├── engine/         # Ciclo de vida, scroll, loader, revelaciones
│       │   ├── layouts/        # BaseLayout (head, loader, cabecera, pie, menú)
│       │   ├── motion/         # Traza, scrollspy, fichas, menú, reloj
│       │   ├── pages/          # index.astro, 404.astro
│       │   ├── scripts/        # Pruebas e2e, a11y, validación de contenido
│       │   ├── styles/         # global.css (imports de brand + reglas de la app)
│       │   └── content.config.ts
│       ├── astro.config.mjs
│       └── package.json
├── packages/
│   ├── brand/                  # Identidad visual: tokens, base, layout, componentes, movimiento
│   ├── ui/                     # Componentes base reutilizables de Astro (PageWrapper, BaseHero, BaseFooter…)
│   └── typescript-config/      # Configuraciones TypeScript compartidas
├── .devcontainer/              # Entorno de desarrollo contenedorizado (GitHub Codespaces / devcontainer)
├── .github/                    # Workflows de CI, despliegue, seguridad y plantillas
├── docs/                       # Documentación de diseño y componentes
├── DESIGN.md                   # Concepto, dirección de arte y decisiones de diseño
├── COMPONENTS.md               # Mapa de edición de cada elemento visible
├── DETALLES.md                 # Decisiones de arquitectura y contratos entre paquetes
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── package.json
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
├── turbo.json
└── .node-version
```

## Contenido

El texto vive en `apps/web/src/content`; los esquemas Zod están en `apps/web/src/content/schemas`. Para publicar un proyecto hacen falta su ficha (`projects/*.json`) y su caso (`cases/*.md`). El esquema visual se elige con `plate` y se dibuja en `ProjectPlate.astro`. La portada compone ambos proyectos y monta cada caso como un diálogo nativo; el hash `#proyecto-<slug>` abre la ficha correspondiente.

## Despliegue

Cada push a `main` ejecuta `.github/workflows/deploy.yml`: valida, construye, prueba el build, audita la accesibilidad, empaqueta `dist` con digest SHA-256, firma la procedencia con GitHub Attestations, verifica el paquete y publica en GitHub Pages. El digest protege la integridad del artefacto y la atestación acredita que se construyó en este repositorio.

## Calidad y pruebas

| Comando | Qué verifica |
|---|---|
| `pnpm format:check` | Formato con Biome |
| `pnpm lint` | Análisis estático con Biome |
| `pnpm typecheck` | Tipos y diagnósticos de Astro |
| `pnpm content:check` | Referencias entre colecciones, ids duplicados, slugs |
| `pnpm test:e2e` | Smoke test sobre el build de producción |
| `pnpm test:a11y` | Accesibilidad (axe), desbordamiento, foco, consola |

## Seguridad

Consulta [`SECURITY.md`](./SECURITY.md) para información sobre cómo reportar vulnerabilidades de forma responsable.

## Contribuir

Consulta [`CONTRIBUTING.md`](./CONTRIBUTING.md) para saber cómo proponer cambios, abrir issues y enviar pull requests.

## Código de conducta

Este proyecto sigue el [Contributor Covenant](CODE_OF_CONDUCT.md). Al participar, esperamos que cumplas el [código de conducta](CODE_OF_CONDUCT.md).

## Licencia

El código del repositorio está bajo la licencia del propio repositorio. Los textos profesionales, la marca y los recursos gráficos no se consideran código abierto salvo que se indique lo contrario.

---

Hecho con [`astro`](https://astro.build/), [`pnpm`](https://pnpm.io/) y [`turborepo`](https://turbo.build/).