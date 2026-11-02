# Juan Miguel — Portfolio

[![CI](https://github.com/juan-miii/juan-miii.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/juan-miii/juan-miii.github.io/actions/workflows/ci.yml)
[![Deploy](https://github.com/juan-miii/juan-miii.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/juan-miii/juan-miii.github.io/actions/workflows/deploy.yml)
[![Security](https://github.com/juan-miii/juan-miii.github.io/actions/workflows/security.yml/badge.svg)](https://github.com/juan-miii/juan-miii.github.io/actions/workflows/security.yml)

My personal porfolio as a software engineer and technology consultant in Madrid. Built following best practices, creating a monorepo with [`pnpm`](https://pnpm.io/) and [Turborepo](https://turborepo.dev/); the site is built statically with [Astro](https://astro.build/) and published to [GitHub Pages](https://docs.github.com/en/pages).

The concept, art direction and design decisions live in [`DESIGN.md`](./DESIGN.md). The map of every visible element and the file where it is edited lives in [`COMPONENTS.md`](./COMPONENTS.md).

## Table of contents

- [Requirements](#requirements)
- [Commands](#commands)
- [Structure](#structure)
- [Content](#content)
- [Deploy](#deploy)
- [Quality and tests](#quality-and-tests)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

## Requirements

- Node.js
- pnpm

_Both are installed and managed using [`mise`](https://mise.jdx.dev/)._ 

```bash
mise install

pnpm install --frozen-lockfile
```

## Commands

From the repository root:

```bash
# Install dependencies (frozen lockfile)
pnpm install --frozen-lockfile

# Development server (Astro, apps/web)
pnpm dev

# Static build into apps/web/dist
pnpm build

# Serve the build locally
pnpm preview

# Format, lint and types (full check)
pnpm check

# Content validation (collections, references, slugs)
pnpm content:check

# Content unit tests
pnpm test

# Build + smoke test of the generated HTML
pnpm test:e2e

# Build + axe, overflow, focus and console (home, sheets, 404)
pnpm test:a11y
```

## Structure

```text
.
├── apps/
│   └── web/                    # Astro application (deployed site)
│       ├── public/             # Static assets (fonts, favicon, OG, security.txt)
│       ├── src/
│       │   ├── assets/         # Site images
│       │   ├── components/     # Astro components (Hero, Footer, ContactSection...)
│       │   ├── content/        # Content collections (JSON + Markdown)
│       │   ├── engine/         # Lifecycle, scroll, loader, revelations
│       │   ├── layouts/        # BaseLayout (head, loader, header, footer, menu)
│       │   ├── motion/         # Trace, scrollspy, sheets, menu, clock
│       │   ├── pages/          # index.astro, 404.astro
│       │   ├── scripts/        # e2e, a11y and content validation scripts
│       │   ├── styles/         # global.css (brand imports plus app rules)
│       │   └── content.config.ts
│       ├── astro.config.mjs
│       └── package.json
├── packages/
│   ├── brand/                  # Visual identity: tokens, base, layout, components, motion, loader, cursor
│   ├── ui/                     # Reusable Astro base components (PageWrapper, BaseHero, BaseFooter...)
│   └── typescript-config/      # Shared TypeScript configurations
├── .devcontainer/              # Containerized development environment (Codespaces / devcontainer)
├── .github/                    # CI, deploy, security workflows and templates
├── docs/                       # Design and component documentation
├── DESIGN.md                   # Concept, art direction and design decisions
├── COMPONENTS.md               # Edit map for every visible element
├── DETALLES.md                 # Architecture and contracts between packages
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

## Content

The copy lives in `apps/web/src/content`; Zod schemas live in `apps/web/src/content/schemas`. Publishing a project requires its entry (`projects/*.json`) and its case (`cases/*.md`). The visual layout is chosen with `plate` and drawn in `ProjectPlate.astro`. The home composes both projects and mounts each case as a native dialog; the hash `#proyecto-<slug>` opens the sheet.

## Deploy

Every push to `main` runs `.github/workflows/deploy.yml`: validate, build, smoke-test the build, audit accessibility, package `dist` with a SHA-256 digest, sign provenance with GitHub Attestations, verify the package and publish to GitHub Pages. The digest protects the artifact's integrity and the attestation proves it was built in this repository.

## Quality and tests

| Command | What it checks |
|---------|----------------|
| `pnpm format:check` | Format with Biome |
| `pnpm lint` | Static analysis with Biome |
| `pnpm typecheck` | Types and Astro diagnostics |
| `pnpm content:check` | References across collections, duplicate ids, slugs |
| `pnpm test:e2e` | Smoke test on the production build |
| `pnpm test:a11y` | Accessibility (axe), overflow, focus, console |

## Security

See [`SECURITY.md`](./SECURITY.md) for how to report vulnerabilities responsibly.

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for how to propose changes, open issues and submit pull requests.

## Code of conduct

This project follows the [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold it.

## License

The repository's code is under this repository's license. Professional text, brand and graphic assets are not considered open source unless stated otherwise.

---

Built with [`astro`](https://astro.build/), [`pnpm`](https://pnpm.io/) and [`turborepo`](https://turbo.build/).