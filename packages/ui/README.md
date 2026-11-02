# ui

Componentes base de Astro compartidos por `apps/web`, alineados con
`packages/brand` y reutilizables por el futuro blog en Starlight.

## Componentes

- `PageWrapper`: envoltura de página (`.base-wrapper`).
- `BaseHero`: hero base con `shell`.
- `BaseFooter`: pie base con `shell` y `.dark-field`.
- `SectionHeading`: encabezado de sección; compone `NodeLabel`.
- `Button`: enlace o botón con las variantes de `.base-btn`.
- `NodeLabel`: etiqueta de nodo para la traza.
- `Prose`: contenedor de prosa larga.
- `ThemeScript`: arranque del tema en `<head>`.
- `ThemeToggle`: botón de cambio de tema.

## Tema

`ThemeScript` y `ThemeToggle` viven separados por una razón de orden de
ejecución: el primero debe ser un script inline en `<head>` para fijar
`data-theme` antes del primer pintado; el segundo solo aporta el botón y su
listener. Unirlos provocaría un destello de tema claro y ataría el arranque del
tema a que exista un botón en la página.

Los componentes no importan `astro-icon`: usan SVG inline para no arrastrar la
integración a cualquier consumidor.
