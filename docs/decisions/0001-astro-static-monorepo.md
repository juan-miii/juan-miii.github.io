# ADR 0001 — Astro estático en monorepo pnpm/Turborepo

## Estado
Aceptado

## Contexto
Se necesita un portfolio estático, rápido y mantenible, con separación entre aplicación, marca, UI y contenido.

## Decisión
Usar Astro con salida estática dentro de un monorepo pnpm gestionado con Turborepo.

## Alternativas
- Sitio Astro único sin monorepo: más simple, pero dificulta reutilizar componentes y contenido.
- Framework SPA: mayor complejidad y bundle innecesario.

## Consecuencias
- Mejor separación de responsabilidades.
- Checks y builds cacheables por paquete.
- Mayor configuración inicial.
