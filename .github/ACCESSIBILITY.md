# Accessibility

The site targets **WCAG 2.2 AA**.

## Automated tests

Every pull request and push to `main` runs `.github/workflows/ci.yml` and `.github/workflows/deploy.yml`, which include:

- `pnpm test:a11y`: accessibility audit with axe-core, horizontal overflow check, focus visibility and console errors, on the home page, in desktop, mobile and reduced-motion modes.

## Manual requirements

- Full navigation with keyboard.
- Visible focus on every interactive element.
- Semantic heading hierarchy.
- Adequate color contrast (AA).
- Accessible labels on all controls.
- Usable mobile menu.
- Respect for `prefers-reduced-motion`.
- Skip to main content link.

## Contact

For accessibility issues, open an issue or use the `security.txt` contact.