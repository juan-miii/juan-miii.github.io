# Catálogo visual

## `@portfolio/ui`

- `page-wrapper`: envoltura base de página.
- `base-hero`: hero base con su `shell`.
- `base-footer`: pie base con su `shell` y el campo oscuro.
- `section-heading`: encabezado de sección; compone `NodeLabel` y acepta `anchor`.
- `button`: botón/enlace con variantes `solid`, `line`, `light`, `accent`.
- `node-label`: etiqueta de nodo con puerto para la traza.
- `prose`: contenedor de prosa larga.
- `theme-script`: inicializa el tema antes del primer pintado, dentro de `<head>`.
- `theme-toggle`: botón de cambio de tema, dentro de la cabecera.

## Tema: dos piezas, no una

`theme-script` y `theme-toggle` están separados a propósito:

- `theme-script` se renderiza en `<head>` como script inline y bloqueante. Lee
  `localStorage` y `prefers-color-scheme`, fija `data-theme` y `color-scheme`
  antes de que el navegador pinte. Así no hay destello de tema claro.
- `theme-toggle` se renderiza en el `<body>` y solo aporta el botón y su
  listener. Su `<script>` es un módulo diferido: si inicializara el tema, la
  página ya se habría pintado.

Además, el script de arranque debe existir aunque una página no tenga toggle
(por ejemplo, una futura página de Starlight). El toggle solo necesita existir
donde haya control visible.

`theme-script` deja `data-theme-light`, `data-theme-dark` y
`data-theme-storage-key` en `<html>`; `theme-toggle` lee de ahí la configuración
en lugar de duplicarla.

## Importación recomendada

```astro
import PageWrapper from "@portfolio/ui/page-wrapper";
import Button from "@portfolio/ui/button";
import ThemeScript from "@portfolio/ui/theme-script";
import ThemeToggle from "@portfolio/ui/theme-toggle";
```
