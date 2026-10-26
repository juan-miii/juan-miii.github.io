# Portfolio

Portfolio personal de Juan Miguel, ingeniero informático y consultor tecnológico. Monorepo con `pnpm` y Turborepo; la web se genera estáticamente con Astro y se publica en GitHub Pages.

El sitio es una sola página: perfil, enfoque, trabajo, capacidades, trayectoria y contacto. Cada proyecto abre una ficha superpuesta con su caso completo y enlaces al código fuente. La única ruta adicional es el 404.

El concepto, la dirección de arte y las decisiones de diseño están en [`DESIGN.md`](./DESIGN.md).

## Requisitos

- Node.js `24.22.1` (`.node-version`)
- pnpm `12.15.0`

## Comandos

```bash
pnpm install --frozen-lockfile
pnpm dev              # servidor de desarrollo
pnpm build            # build estático en apps/web/dist
pnpm preview          # sirve el build
pnpm check            # formato, lint y tipos
pnpm test             # validación del contenido
pnpm test:e2e         # smoke test sobre el build
pnpm test:a11y        # axe, desbordamiento, foco y consola en portada, fichas y 404
pnpm content:check    # referencias entre proyectos, casos y organizaciones
```

## Estructura

- `apps/web`: aplicación Astro, la página principal, el 404, componentes, movimiento y contenido.
- `apps/web/src/content`: colecciones de contenido (páginas, proyectos, casos, experiencia, organizaciones).
- `packages/brand`: tokens y estilos base.
- `packages/ui`: componentes reutilizables.
- `packages/typescript-config`: configuraciones TypeScript compartidas.

## Contenido

El texto vive en `apps/web/src/content`; los esquemas Zod están en `apps/web/src/content/schemas`. Para publicar un proyecto hacen falta su ficha (`projects/*.json`), su caso (`cases/*.md`) y una portada en `apps/web/public/images`. La portada compone ambos proyectos y monta cada caso como un diálogo nativo; el hash `#proyecto-<slug>` abre la ficha correspondiente.

## Despliegue

Cada push a `main` ejecuta `.github/workflows/deploy.yml`: valida, construye, prueba el build, audita la accesibilidad, empaqueta `dist` con digest SHA-256, firma la procedencia con GitHub Attestations, verifica el paquete y publica en GitHub Pages. El digest protege la integridad del artefacto y la atestación acredita que se construyó en este repositorio; ninguna de las dos sustituye una firma con una clave propia.
