# Portfolio

Portfolio personal construido como monorepo con `pnpm` y Turborepo. La web se genera estáticamente con Astro.

## Requisitos

- Node.js `24.22.1` (`.node-version`)
- pnpm `12.15.0`

## Comandos

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm build
pnpm check
pnpm test
pnpm preview
```

## Estructura

- `apps/web`: aplicación Astro.
- `packages/brand`: tokens y estilos.
- `packages/ui`: componentes reutilizables.
- `packages/typescript-config`: configuraciones TypeScript compartidas.
