# Contribuir

Gracias por interesarte en contribuir a este proyecto. Este es el portfolio personal de Juan Miguel, pero las sugerencias, reportes de errores y mejoras de documentación son bienvenidos.

## Cómo contribuir

1. **Abre un issue** para proponer un cambio, reportar un error o sugerir una mejora. Describe el problema, el comportamiento esperado y pasos para reproducirlo si aplica.
2. **Crea una rama** a partir de `main` con un nombre descriptivo: `feat/...`, `fix/...`, `docs/...`, `chore/...`.
3. **Realiza los cambios** siguiendo las convenciones del repositorio (ver más abajo).
4. **Ejecuta las verificaciones** locales antes de enviar el pull request.
5. **Abre un pull request** contra `main` y describe el cambio, el porqué y cómo se probó.

## Convenciones de ramas

Usa ramas cortas y con prefijo:

```text
feat/nombre-de-la-feature
fix/descripcion-del-error
docs/actualizacion-del-readme
chore/actualizacion-de-dependencias
```

## Convenciones de commits

Mensajes claros, en español, en imperativo y sin punto final:

```text
feat: añade tema oscuro con toggle
fix: corrige overflow horizontal en móvil
docs: actualiza mapa de componentes
chore: actualiza dependencias de GitHub Actions
```

## Requisitos locales

- Node.js `24.22.1` (`.node-version`)
- pnpm `12.16.1`

```bash
pnpm install --frozen-lockfile
```

## Verificaciones obligatorias

Antes de enviar un pull request, ejecuta desde la raíz:

```bash
# Formato (Biome)
pnpm format:check

# Lint (Biome)
pnpm lint

# Tipos y diagnósticos (Turbo)
pnpm typecheck

# Validación de contenido
pnpm content:check

# Pruebas del contenido
pnpm test

# Build de producción
pnpm build

# Pruebas e2e y de accesibilidad
pnpm test:e2e
pnpm test:a11y
```

O todo de una vez:

```bash
pnpm check
```

## Estructura del repositorio

- `apps/web`: aplicación Astro, rutas, layout, componentes, movimiento y contenido.
- `packages/brand`: identidad visual (tokens, base, layout, componentes, movimiento, loader, cursor).
- `packages/ui`: componentes base reutilizables de Astro.
- `packages/typescript-config`: configuraciones TypeScript compartidas.
- `.github/workflows`: CI, despliegue y seguridad.

## Reglas de contenido

- Los textos visibles viven en `apps/web/src/content`. No inventes clientes, premios ni métricas.
- El idioma principal del sitio es español. No uses rayas (em/en) en texto visible.
- No añadas credenciales, logotipos o testimonios ficticios.
- Cualquier cambio visual debe mantener la identidad actual (ver `DESIGN.md` y `COMPONENTS.md`).

## Revisión de pull requests

- Los cambios en `packages/brand` invalidan las comprobaciones visuales de `apps/web`.
- Los cambios en `apps/web/src/content` reconstruyen las páginas correspondientes.
- No se aceptan pull requests que rompan el build o las pruebas de accesibilidad.
- Mantén los cambios acotados; una sola responsabilidad por pull request.

## Contacto

Para dudas sobre el proyecto, abre un issue o consulta [`SECURITY.md`](./SECURITY.md) para reportar vulnerabilidades.