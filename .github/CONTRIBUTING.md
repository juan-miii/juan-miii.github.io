# Contributing

Thanks for your interest in contributing to this project. This is Juan Miguel's personal portfolio, but suggestions, bug reports and documentation improvements are welcome.

## How to contribute

1. **Open an issue** to propose a change, report a bug or suggest an improvement. Describe the problem, the expected behavior and reproduction steps if applicable.
2. **Create a branch** from `main` with a descriptive name: `feat/...`, `fix/...`, `docs/...`, `chore/...`.
3. **Make the changes** following the repository conventions (see below).
4. **Run the checks** locally before opening the pull request.
5. **Open a pull request** against `main` describing the change, the reason and how it was tested.

## Branch conventions

Use short, prefixed branches:

```text
feat/feature-name
fix/bug-description
docs/readme-update
chore/dependency-update
```

## Commit conventions

Clear messages, in English or Spanish, in imperative mood, no trailing period:

```text
feat: add dark theme with toggle
fix: fix horizontal overflow on mobile
docs: update component map
chore: update GitHub Actions dependencies
```

## Local requirements

[Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) are required. Both are included in `mise.toml` config file. Then, project dependencies can be installed using the following command:

```bash
pnpm install --frozen-lockfile
```

## Required checks

Before submitting a pull request, run from the repository root:

```bash
# Formatting (Biome)
pnpm format:check

# Linting (Biome)
pnpm lint

# Types and diagnostics (Turbo)
pnpm typecheck

# Content validation
pnpm content:check

# Content tests
pnpm test

# Production build
pnpm build

# End-to-end and accessibility tests
pnpm test:e2e
pnpm test:a11y
```

Or all at once:

```bash
pnpm check
```

## Versioning and releases

The monorepo uses [Changesets](https://github.com/changesets/changesets) to version packages and generate changelogs. `@juan-miii/brand` is the only package published to npm; `@portfolio/ui` and `@portfolio/web` are private but still versioned.

When a change affects a package's observable behaviour:

```bash
pnpm changeset
```

Select the packages and the bump type (`patch`, `minor`, `major`), then write a short English summary. Commit the generated `.changeset/*.md` file with the change. Changesets uses semver, so a `major` bump on a `0.x` package produces `1.0.0`.

Check the pending release before merging:

```bash
pnpm changeset status
```

Apply the pending changesets:

```bash
pnpm version:packages
# or: pnpm changeset version
```

This consumes the `.changeset/*.md` files and updates the `package.json` and `CHANGELOG.md` files of the affected packages. The root `portfolio` package is not managed by Changesets; bump it by hand when the whole repository gets a new version.

On `main`, `.github/workflows/release.yml` runs `changesets/action`: it opens or updates a `chore: version packages` pull request and publishes `@juan-miii/brand` when that pull request is merged.

## Repository structure

- `apps/web`: Astro application, routes, layout, components, motion and content.
- `packages/brand`: visual identity (tokens, base, layout, components, motion, loader).
- `packages/ui`: reusable base Astro components.
- `.github/workflows`: CI, deploy and security.

## Content rules

- Visible text lives in `apps/web/src/content`. Do not invent clients, awards or metrics.
- The site's primary language is Spanish. Do not use em/en dashes in visible text.
- Do not add credentials, logos or fictional testimonials.
- Visual changes must preserve the current identity (see `DESIGN.md` and `COMPONENTS.md`).

## Pull request review

- Changes in `packages/brand` invalidate the visual checks in `apps/web`.
- Changes in `apps/web/src/content` rebuild the affected pages.
- Pull requests that break the build or accessibility tests are not accepted.
- Keep changes focused: one responsibility per pull request.

## Contact

For questions about the project, open an issue or see [`SECURITY.md`](./SECURITY.md) for reporting vulnerabilities.