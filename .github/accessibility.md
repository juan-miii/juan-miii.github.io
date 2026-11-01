# Accesibilidad

Este sitio tiene como objetivo cumplir con **WCAG 2.2 AA**.

## Pruebas automatizadas

Cada pull request y push a `main` ejecuta `.github/workflows/ci.yml` y `.github/workflows/deploy.yml`, que incluyen:

- `pnpm test:a11y`: auditoría de accesibilidad con axe-core, comprobación de desbordamiento horizontal, foco visible y consola, en la portada, las fichas de proyecto y el 404, en escritorio, móvil y con movimiento reducido.

## Requisitos manuales

- Navegación completa con teclado.
- Foco visible en todos los elementos interactivos.
- Jerarquía semántica de encabezados.
- Contraste de color adecuado (AA).
- Etiquetas accesibles en todos los controles.
- Menú móvil utilizable.
- Respeto a `prefers-reduced-motion`.
- Saltar al contenido mediante el enlace de omisión.

## Contacto

Para problemas de accesibilidad, abre un issue o usa el contacto de `security.txt`.