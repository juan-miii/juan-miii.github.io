---
id: entrega-verificable
locale: es
slug: entrega-verificable
projectId: portfolio-platform
title: Una entrega verificable para una web estática
summary: Cómo convertir un portfolio en un sistema de contenido validado, construcción reproducible y publicación rastreable.
publicationStatus: published
disclosure: public
---

### Contexto: una web que también es una prueba

Un portfolio lo leen personas que juzgan decisiones técnicas. Una página bonita no demuestra nada por sí sola. Necesitaba que el sitio fuese, además de una presentación, una prueba de cómo trabajo: contenido separado de la interfaz, una construcción que falla cuando los datos no encajan y una publicación que se puede rastrear.

El repositorio ya existía como monorepo con Astro, pnpm y Turborepo. La restricción era no sustituir esa base por una plantilla nueva. Había que llevar la estructura existente a un sistema coherente sin perder los contratos de contenido que ya usaban las pruebas.

### Decisión: tres capas y ningún CMS

Mantuve tres capas. `apps/web` contiene la página principal, el 404 y la composición de la interfaz. `packages/brand` define tokens, tipografía y reglas de base. `packages/ui` conserva los componentes compartidos. El contenido vive en colecciones de Astro, con esquemas de Zod que validan cada entrada antes de construir.

La salida es estática. No hay CMS en tiempo de ejecución ni base de datos que mantener. Los proyectos, la experiencia, las organizaciones y los casos son datos versionados. Un cambio de texto es un cambio de repositorio, revisable y reversible.

También fijé una sola dirección visual: papel claro, tinta oscura y una señal roja. El contacto y el pie usan el campo oscuro como cierre. Sin selector de tema, porque duplicar la superficie visual no ayudaba al encargo. La tipografía es Switzer para texto y JetBrains Mono para datos. El movimiento se concentra en una traza que recorre la página y en la apertura de las fichas; el resto del sitio se queda quieto.

### Construcción: una retícula y un solo reloj

La retícula es de doce columnas con un margen exterior estable. Las secciones se leen como nodos: un índice a la izquierda, el contenido desde la cuarta columna y los metadatos a la derecha. La traza se dibuja en el margen a partir de las posiciones reales de las secciones, no de coordenadas escritas a mano.

La capa de movimiento es un ciclo de vida pequeño en `apps/web/src/engine`. Un solo reloj, GSAP, mueve Lenis, ScrollTrigger y la traza. La página se sirve completa, sin router de cliente ni intercambio de rutas: las fichas de proyecto son diálogos nativos y el resto del contenido vive en la misma página. Las animaciones se declaran con atributos de datos, así que el HTML sigue siendo legible y el contenido no depende de JavaScript.

La reducción de movimiento no es un extra. Si el sistema lo pide, desaparecen el suavizado, las revelaciones y el pulso; la traza se dibuja completa y el contenido se muestra sin espera. La misma regla se aplica al cargador y a las fichas.

### Verificación: puertas antes de publicar

La cadena tiene varias puertas. El verificador de contenido comprueba identificadores únicos, referencias entre colecciones, colisiones de slug y recursos multimedia. Sus pruebas crean fixtures inválidos y esperan que el proceso falle. La construcción de Astro valida los esquemas otra vez antes de generar el HTML.

Después de construir, las pruebas de humo comprueban que existen la portada, las dos fichas de proyecto y el 404, y que el contenido esperado está presente. Una auditoría con Playwright y axe revisa estructura, contraste, desbordamiento y consola en la portada, en cada ficha abierta y en el 404, en cada despliegue. El despliegue usa un artefacto con digest SHA-256, lo verifica antes de publicar y adjunta una atestación de procedencia.

### Resultado: un sitio que se puede auditar

El resultado es un sitio que se puede leer, reconstruir y auditar. El contenido se edita sin tocar componentes. La interfaz no necesita un framework de cliente para renderizar texto. Un fallo de datos detiene la entrega antes de llegar al navegador.

Los límites también son claros. Es un proyecto de una sola persona, sin analítica ni personalización. La revisión visual con capturas se ejecuta en local; la auditoría automática de accesibilidad sí forma parte del despliegue. El siguiente paso sería publicar esos informes junto al artefacto.
