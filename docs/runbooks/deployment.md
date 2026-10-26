# Runbook de despliegue

1. Verificar que `main` está publicable.
2. Ejecutar `pnpm check`, `pnpm content:check`, `pnpm build`.
3. Revisar `apps/web/dist`.
4. Lanzar el workflow de publicación.
5. Comprobar portada, proyectos, 404 y recursos.
6. Registrar commit publicado.
