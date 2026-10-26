# Especificación integral del portfolio

**Propuesta de arquitectura y producto · Versión 1.0 · 23 de octubre de 2026**

El repositorio será una **plataforma personal modular**, inicialmente desplegada como un portfolio estático con Astro. Su propósito será presentar la actividad profesional de un consultor en ciberseguridad y tecnología y, al mismo tiempo, demostrar criterio de ingeniería mediante su arquitectura, diseño, documentación y cadena de entrega.

La dirección visual será **premium, editorial y tecnológica**, con movimiento distintivo y transiciones trabajadas. La modularidad deberá facilitar la expansión sin convertir el proyecto en un framework propio ni introducir complejidad sin utilidad.

> **Principio rector:** sobredimensionar las fronteras, los contratos y la calidad; no las funcionalidades vacías.

Las decisiones indicadas como **base** constituyen la arquitectura recomendada. Los ejemplos de contenido son ilustrativos: no describen proyectos ni resultados profesionales reales.

***

## Propósito del repositorio

El repositorio perseguirá cuatro objetivos:

- **Comunicación profesional:** explicar qué problemas se abordan, cómo se trabaja y qué experiencia respalda esas capacidades.
- **Demostración técnica:** mostrar decisiones justificadas sobre modularidad, accesibilidad, rendimiento, automatización y seguridad.
- **Plataforma evolutiva:** permitir incorporar nuevas secciones y aplicaciones sin rehacer identidad, componentes ni contenido.
- **Desarrollo asistido por IA:** proporcionar contratos, instrucciones y verificaciones que permitan evolucionar el proyecto de forma controlada.

El portfolio no deberá limitarse a un currículum acompañado de enlaces a GitHub. Los proyectos privados podrán tener protagonismo mediante casos de estudio autorizados, aunque no exista código publicable.

### Alcance inicial

- Inicio.
- Casos de estudio.
- Proyectos y open source.
- Experiencia profesional.
- Sobre mí.
- Contacto.
- Cómo está construida esta web.
- Página 404.
- Metadatos, sitemap y recursos sociales.
- Documentación técnica y operativa del repositorio.
- CI/CD con despliegue en GitHub Pages.
- Verificación de procedencia del artefacto como evolución de la cadena de entrega.

### Fuera del alcance inicial

- Backend propio.
- Autenticación.
- Base de datos.
- CMS remoto.
- Publicación de paquetes en npm.
- Aplicaciones adicionales sin contenido real.
- Blog vacío o compromiso artificial de publicación periódica.
- Sistema universal de bloques o constructor visual de páginas.
- Dependencia de APIs externas para mostrar información esencial.

Estas capacidades podrán incorporarse mediante decisiones documentadas cuando exista una necesidad concreta.

***

## Principios de arquitectura

| Principio | Aplicación |
|---|---|
| Contenido separado | Los textos y datos editoriales no se escribirán dentro de componentes |
| Responsabilidades claras | Marca, UI, contenido y aplicación tendrán contratos distintos |
| Dependencias explícitas | Cada paquete declarará lo que utiliza |
| Fuente única | Un mismo dato no se mantendrá manualmente en varias ubicaciones |
| HTML primero | El contenido principal estará disponible en el HTML generado |
| Mejora progresiva | El movimiento enriquecerá la experiencia sin hacerla imprescindible |
| Validación temprana | Los errores de contenido y referencias deberán bloquear el build |
| Seguridad proporcionada | Cada control deberá responder a un riesgo identificable |
| Complejidad justificada | Los nuevos paquetes y herramientas requerirán una utilidad concreta |
| Reversibilidad | Las decisiones costosas deberán explicar cómo podrían deshacerse |
| Documentación versionada | Los cambios de arquitectura actualizarán sus documentos en la misma PR |
| Evidencias honestas | No se inventarán métricas, clientes, certificaciones ni contribuciones |

La reutilización no implicará independencia absoluta de cualquier tecnología. Por ejemplo, `ui` podrá ser una biblioteca de componentes Astro; `brand` y los datos editoriales deberán ser mucho más portables.

***

## Stack tecnológico

| Área | Decisión base | Criterio |
|---|---|---|
| Runtime de desarrollo | Node.js LTS | Compatibilidad y mantenimiento |
| Gestor de paquetes | pnpm | Workspace y dependencias internas explícitas |
| Orquestación | Turborepo | Grafo de tareas, ejecución y caché |
| Framework web | Astro | Generación estática y composición de contenido |
| Lenguaje | TypeScript estricto | Contratos y detección temprana de errores |
| Estilos | CSS nativo, variables y estilos acotados | Control visual sin un framework CSS obligatorio |
| Formato y linting | Biome | Herramienta principal para los formatos soportados |
| Formato de Astro | Prettier y plugin de Astro | Cobertura específica mientras se mantenga la cautela con Biome |
| Datos editoriales | JSON | Edición estructurada, validación y portabilidad |
| Narrativa extensa | Markdown con frontmatter | Casos de estudio y contenido largo |
| Validación | Zod y Content Collections | Esquemas y contenido tipado |
| Pruebas unitarias | Vitest | Lógica, validadores y transformaciones |
| Pruebas de navegador | Playwright | Navegación, interacción y regresión |
| Accesibilidad automatizada | axe integrado en pruebas | Detección de parte de los problemas |
| Automatización | GitHub Actions | Validación, seguridad, construcción y entrega |
| Hosting inicial | GitHub Pages | Publicación estática |
| Actualizaciones | Dependabot | Dependencias y acciones |
| Documentación | Markdown en `/docs` | Revisión y versionado junto al código |

**Base de runtime:** Node.js 24 LTS es una opción válida para esta especificación; al crear el repositorio se fijará un parche actualizado con las correcciones de seguridad disponibles. No se utilizará una versión flotante como contrato de reproducibilidad. [nodejs](https://nodejs.org/en/blog/release/v24.22.0)

### Política de versiones

- Fijar una versión exacta de Node en un archivo de referencia, por ejemplo `.node-version`.
- Fijar una versión exacta de pnpm en `package.json`.
- Mantener un único `pnpm-lock.yaml`.
- Utilizar `pnpm install --frozen-lockfile` en CI.
- Actualizar versiones mediante PR.
- No mezclar npm, Yarn, Bun y pnpm en el mismo flujo de instalación.
- No asumir que Corepack estará instalado: el bootstrap deberá dejar explícito cómo se obtiene pnpm.

Las versiones exactas de Astro, Turborepo, Biome y demás dependencias se elegirán durante el arranque y quedarán registradas en los manifiestos y el lockfile. Este documento no sustituye al inventario ejecutable de dependencias.

### Biome y archivos Astro

La implementación de soporte completo para Astro en Biome se introdujo como experimental; por tanto, no se tratará como equivalente a una cobertura estable sin comprobar la versión utilizada y sus limitaciones. [github](https://github.com/biomejs/biome/commit/28e8860b8c4ddd069a70cde76ce54cde8f388a13)

La política inicial será:

- Biome será la herramienta principal para JS, TS, JSON y CSS.
- Markdown y YAML podrán asignarse a Biome tras verificar su soporte en la versión fijada.
- Prettier será responsable del formato de `.astro`.
- `astro check` comprobará tipos y diagnósticos del proyecto Astro.
- Las comprobaciones de navegador y accesibilidad complementarán estas herramientas.
- Cada extensión tendrá **un único responsable de formato**.

No se añadirá ESLint por inercia. Si se requiere análisis específico de plantillas Astro que no cubran los controles existentes, se incorporará con alcance limitado y una decisión documentada.

***

## Modelo del monorepo

La separación entre aplicaciones desplegables y bibliotecas internas seguirá el modelo de Turborepo: las aplicaciones serán consumidores finales del grafo; las bibliotecas las apoyarán, sin importar código de las aplicaciones. [turborepo](https://turborepo.dev/docs/core-concepts/package-types)

### Paquetes iniciales

| Ubicación | Responsabilidad |
|---|---|
| `apps/web` | Rutas, layouts, composición, integración Astro y comportamiento de la web |
| `packages/brand` | Identidad visual, tokens, recursos de marca y principios de movimiento |
| `packages/ui` | Componentes reutilizables de presentación e interacción |
| `packages/content` | Información editorial, textos, esquemas y recursos de contenido |
| `packages/typescript-config` | Configuraciones TypeScript compartidas |

Los paquetes se crearán porque tienen responsabilidades diferentes, no porque deban publicarse ni porque ya existan varias aplicaciones.

**`packages/content` se justifica desde el inicio** por el requisito explícito de editar información sin tocar componentes y por la intención de reutilizarla en futuras superficies: otra web, un CV generado o un catálogo de proyectos.

### Paquetes que no se crearán

No se introducirán inicialmente:

- `utils`, como cajón de sastre.
- `types`, como contenedor de todos los tipos.
- `config`, para cualquier configuración.
- `motion`, sin lógica compartida suficiente.
- `seo`, para encapsular unas pocas etiquetas.
- `api`, sin API real.
- `testing`, si todavía no existe infraestructura compartida.

Cuando una responsabilidad crezca, se extraerá desde una implementación real.

***

## Estructura del repositorio

```text
.
├── apps/
│   └── web/
│       ├── public/
│       │   ├── .nojekyll
│       │   ├── robots.txt
│       │   └── .well-known/
│       │       └── security.txt
│       ├── src/
│       │   ├── assets/
│       │   ├── components/
│       │   │   └── sections/
│       │   ├── layouts/
│       │   ├── lib/
│       │   │   ├── content/
│       │   │   ├── media/
│       │   │   ├── routing/
│       │   │   └── seo/
│       │   ├── pages/
│       │   │   ├── index.astro
│       │   │   ├── proyectos/
│       │   │   ├── casos/
│       │   │   ├── experiencia.astro
│       │   │   ├── sobre-mi.astro
│       │   │   ├── contacto.astro
│       │   │   ├── esta-web.astro
│       │   │   └── 404.astro
│       │   ├── scripts/
│       │   ├── styles/
│       │   └── content.config.ts
│       ├── tests/
│       │   ├── unit/
│       │   ├── e2e/
│       │   └── visual/
│       ├── astro.config.mjs
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   ├── brand/
│   │   ├── assets/
│   │   │   ├── logos/
│   │   │   └── fonts/
│   │   ├── src/
│   │   │   ├── tokens/
│   │   │   ├── themes/
│   │   │   └── motion/
│   │   ├── README.md
│   │   └── package.json
│   │
│   ├── ui/
│   │   ├── src/
│   │   │   ├── primitives/
│   │   │   ├── components/
│   │   │   └── styles/
│   │   ├── tests/
│   │   ├── README.md
│   │   └── package.json
│   │
│   ├── content/
│   │   ├── data/
│   │   │   └── es/
│   │   │       ├── profile.json
│   │   │       ├── site.json
│   │   │       ├── ui.json
│   │   │       ├── pages/
│   │   │       ├── organizations/
│   │   │       ├── experience/
│   │   │       ├── projects/
│   │   │       └── cases/
│   │   ├── media/
│   │   ├── src/
│   │   │   ├── schemas/
│   │   │   ├── paths.ts
│   │   │   └── validation/
│   │   ├── tests/
│   │   ├── README.md
│   │   └── package.json
│   │
│   └── typescript-config/
│       ├── base.json
│       ├── library.json
│       ├── README.md
│       └── package.json
│
├── docs/
│   ├── architecture/
│   ├── decisions/
│   ├── design/
│   ├── content/
│   ├── security/
│   └── runbooks/
│
├── tooling/
│   ├── scripts/
│   └── policies/
│
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── deploy.yml
│   │   └── security.yml
│   ├── ISSUE_TEMPLATE/
│   ├── dependabot.yml
│   ├── CODEOWNERS
│   └── pull_request_template.md
│
├── AGENTS.md
├── README.md
├── CONTRIBUTING.md
├── SECURITY.md
├── LICENSE
├── .editorconfig
├── .gitignore
├── .node-version
├── biome.json
├── package.json
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
└── turbo.json
```

El árbol define responsabilidades y ubicaciones previstas. No obliga a crear directorios vacíos ni documentos sin contenido.

Los archivos de código fuente usarán nombres consistentes; las rutas públicas podrán utilizar español. La identidad del titular y los datos profesionales se introducirán exclusivamente a partir de información confirmada.

***

## Contratos entre paquetes

### Grafo permitido

```text
apps/web ────────────────► packages/ui
    │                          │
    │                          └──► packages/brand
    │
    ├────────────────────► packages/brand

Configuraciones de desarrollo:
apps y paquetes ─────────► packages/typescript-config
```

### Restricciones

- `brand` no importará contenido profesional ni componentes.
- `content` no importará UI ni rutas de una aplicación.
- `ui` no importará `content`.
- Ningún paquete importará código de `apps/web`.
- Los componentes reutilizables recibirán datos mediante props y slots.
- Las rutas y secciones de `apps/web` resolverán contenido y compondrán componentes.
- Los tipos pertenecerán al módulo que define su contrato.
- No se permitirán ciclos entre paquetes.
- No se utilizarán rutas relativas para importar código privado de otro paquete.

Los recursos editoriales requieren una integración de filesystem o bundler. Esa integración vivirá en el adaptador de la aplicación y no dará permiso general para saltarse los contratos entre paquetes.

### Exportaciones y dependencias

Cada paquete tendrá:

- `package.json`.
- Nombre con scope coherente, por ejemplo `@portfolio/ui`.
- `"private": true` mientras no exista intención de publicación.
- `exports` explícitos.
- README con responsabilidad y ejemplos.
- Dependencias declaradas.
- Pruebas cuando contenga lógica.

Las dependencias internas utilizarán `workspace:*`. No se recurrirá a dependencias instaladas accidentalmente en la raíz.

Los componentes se consumirán preferiblemente por exportaciones concretas:

```ts
import Button from "@portfolio/ui/button";
```

Se evitará un único punto de entrada que mezcle todos los componentes, estilos y comportamiento del paquete.

### Compilación de bibliotecas

La base será consumir fuentes mediante Astro/Vite cuando sea viable. No se añadirá un build propio a cada paquete solo por uniformidad.

Un paquete pasará a compilado cuando lo necesite un consumidor real, una distribución independiente o una transformación específica. Esa decisión deberá incluir sus salidas, tipos, pruebas y efecto en Turborepo.

***

## Sistema de contenido

**Decisión central: JSON para información estructurada y Markdown para narrativa extensa, ambos validados.**

Astro Content Collections permite organizar contenido y validar sus datos; será la integración de la aplicación, no el lugar donde se mezcle contenido con presentación. [github](https://github.com/withastro/docs/blob/main/src/content/docs/en/guides/content-collections.mdx)

### Elección de formatos

| Formato | Uso previsto | Política |
|---|---|---|
| JSON | Perfil, navegación, textos de interfaz, experiencia y proyectos | Formato estructurado por defecto |
| Markdown | Casos de estudio y contenido largo | Formato narrativo por defecto |
| YAML | Frontmatter de Markdown | Permitido para metadatos editoriales |
| MDX | Contenido que requiera componentes editoriales especiales | No utilizar inicialmente |
| TypeScript | Esquemas, adaptadores y lógica | No utilizar como almacén habitual de textos |

JSON evita introducir lógica en los datos. Markdown evita convertir cada párrafo largo en una cadena JSON con saltos escapados.

No se incorporarán varios formatos equivalentes para el mismo tipo de entidad sin una razón concreta.

### Distribución editorial

| Archivo o colección | Contenido |
|---|---|
| `profile.json` | Identidad pública, presentación profesional y enlaces |
| `site.json` | Nombre editorial del sitio y valores generales |
| `ui.json` | Navegación, botones, mensajes y etiquetas accesibles |
| `pages/*.json` | Textos y selección editorial de cada página |
| `organizations/*.json` | Información pública de empresas u organizaciones |
| `experience/*.json` | Roles, fechas y contribuciones |
| `projects/*.json` | Información estructurada de los proyectos |
| `cases/*.md` | Narrativa de casos de estudio |

La configuración operativa —por ejemplo, URL del entorno de despliegue— no se mezclará indiscriminadamente con los textos editoriales.

### Proyectos y casos

Un **proyecto** será una entidad: herramienta, producto, iniciativa o trabajo.

Un **caso de estudio** será una explicación de un problema y las decisiones adoptadas. Podrá relacionarse con un proyecto, pero no será obligatorio que todo proyecto tenga un caso.

Esto permitirá:

- Publicar pequeños proyectos open source sin forzar una narrativa extensa.
- Dar protagonismo a trabajos privados mediante casos autorizados.
- Relacionar un caso con una experiencia laboral.
- Evitar duplicar empresas, enlaces y fechas en múltiples páginas.

***

## Contratos editoriales

### Modelo de proyecto

Ejemplo conceptual:

```json
{
  "id": "portfolio-platform",
  "locale": "es",
  "slug": "plataforma-portfolio",
  "title": "Plataforma personal de portfolio",
  "summary": "Portfolio modular centrado en contenido, diseño y entrega verificable.",
  "kind": "personal",
  "sourceAvailability": "public",
  "lifecycle": "active",
  "publicationStatus": "published",
  "featuredOrder": 1,
  "technologies": ["astro", "typescript", "turborepo"],
  "links": [
    {
      "kind": "repository",
      "label": "Código fuente",
      "url": "https://github.com/example/portfolio"
    }
  ]
}
```

El enlace es ilustrativo y no deberá llegar al contenido real.

Se distinguirán expresamente:

- **Tipo de trabajo:** profesional, personal u open source.
- **Disponibilidad del código:** público, privado o no aplicable.
- **Estado del proyecto:** activo, completado o archivado.
- **Estado editorial:** borrador o publicado.

Son conceptos distintos y no deberán condensarse en un campo ambiguo llamado `status`.

### Modelo de caso

```md
---
id: portfolio-delivery
locale: es
slug: entrega-verificable
projectId: portfolio-platform
title: Una entrega verificable para una web estática
summary: Decisiones y límites de una cadena de publicación con procedencia.
publicationStatus: draft
disclosure: public
---

## Problema

## Contribución personal

## Restricciones

## Alternativas consideradas

## Decisiones

## Resultados verificables

## Límites y aprendizaje
```

Este bloque es una **plantilla editorial**, no un caso listo para publicación. Un documento publicado deberá contener información real y suficiente.

### Identificadores y relaciones

- `id` será estable y no dependerá del título mostrado.
- `slug` será editorial y podrá cambiar con una migración de URL.
- Las referencias utilizarán identificadores, no títulos.
- Los identificadores serán únicos dentro de su colección.
- La ordenación destacada será explícita.
- Las fechas emplearán un formato consistente.
- Las relaciones se validarán antes de construir.
- Un cambio de slug deberá evaluar enlaces existentes.

No se utilizará el orden de los archivos en disco como criterio editorial.

### Esquemas

Los esquemas se mantendrán en `packages/content/src/schemas`.

La integración con Astro deberá utilizar una versión de Zod compatible con la versión fijada del framework. La compatibilidad se comprobará mediante una prueba de integración; no se asumirán intercambiables distintas versiones mayores de la biblioteca.

Las validaciones cubrirán:

- Campos obligatorios.
- Enumeraciones.
- URLs y protocolos permitidos.
- Fechas y rangos coherentes.
- Referencias entre entidades.
- IDs y slugs únicos.
- Recursos multimedia existentes.
- Textos alternativos cuando correspondan.
- Selecciones de portada válidas.
- Referencias publicadas que no conduzcan a borradores.

Los límites de longitud se utilizarán donde protejan una composición concreta, no para imponer restricciones arbitrarias a todos los textos.

***

## Contenido y presentación

### Responsabilidad de las capas

```text
Datos y Markdown
        │
        ▼
Validación editorial
        │
        ▼
Content Collections / adaptadores
        │
        ▼
Modelos de presentación
        │
        ▼
Secciones y páginas
        │
        ▼
Componentes UI
```

Los adaptadores convertirán los datos editoriales en la forma necesaria para cada página: resolver relaciones, ordenar proyectos, generar enlaces y seleccionar imágenes.

### Qué no contendrá UI

```astro
<!-- Evitar en packages/ui -->
<h1>Consultor en ciberseguridad y tecnología</h1>
```

### Qué recibirá UI

```astro
---
interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---

<header>
  <h1>{title}</h1>
  <p>{description}</p>
</header>
```

La página resolverá los textos desde contenido validado y los pasará al componente.

Esta separación incluirá también:

- Etiquetas de navegación.
- Textos de botones.
- Mensajes de error.
- Texto de la página 404.
- Etiquetas accesibles.
- Metadatos sociales.
- Descripciones de enlaces.
- Textos de estados vacíos.

Las constantes técnicas —por ejemplo, un nombre de evento o una clase CSS— no se considerarán contenido editorial.

### Sin constructor universal

La portada podrá tener un archivo con sus textos y referencias:

```json
{
  "hero": {
    "eyebrow": "Ciberseguridad e ingeniería",
    "title": "Tecnología con criterio.",
    "description": "Texto editorial de presentación.",
    "primaryAction": {
      "label": "Explorar casos",
      "routeKey": "cases"
    }
  },
  "featuredProjectIds": ["portfolio-platform"]
}
```

Este ejemplo define información, no un lenguaje para describir todo el DOM.

No se diseñará inicialmente un sistema arbitrario de bloques anidados con estilos, scripts y componentes configurables desde JSON.

***

## Recursos e internacionalización

### Recursos multimedia

Se distinguirán:

- **Recursos de marca:** logotipo, isotipo y tipografías, en `brand`.
- **Recursos editoriales:** capturas, diagramas e imágenes de casos, en `content/media`.
- **Recursos propios de la aplicación:** elementos técnicos específicos, en `apps/web`.

El contenido referenciará imágenes mediante identificadores estables. Un adaptador de la aplicación resolverá esos identificadores a los recursos que procese Astro.

Se verificará en el arranque la integración entre los recursos del workspace y el pipeline de imágenes. Si necesita un manifiesto generado, este será mecánico y no contendrá textos editoriales.

No se copiarán manualmente las mismas imágenes en varios paquetes.

### Internacionalización preparada

La base será:

- Contenido inicial en español.
- Directorio de idioma explícito.
- Campo `locale` en las entidades que lo necesiten.
- Textos de UI separados.
- IDs conceptuales independientes del idioma.
- Rutas centralizadas mediante un resolvedor.

No se anunciará una versión inglesa hasta disponer de contenido revisado.

La primera versión podrá mantener español en `/`. La futura incorporación de inglés deberá definir conscientemente si se conserva esa estructura o se migra a prefijos como `/es/` y `/en/`.

Preparar idiomas no significa duplicar archivos vacíos ni traducir automáticamente toda la información.

***

## Arquitectura de información

| Sección | Objetivo |
|---|---|
| Inicio | Comunicar posicionamiento y dirigir al trabajo más relevante |
| Casos | Mostrar decisiones, contribución, restricciones y resultados |
| Proyectos | Presentar productos, herramientas y experimentos |
| Experiencia | Explicar trayectoria y responsabilidades |
| Sobre mí | Mostrar criterio profesional, motivaciones y forma de trabajar |
| Contacto | Facilitar el siguiente paso |
| Esta web | Documentar la web como proyecto de ingeniería |

La navegación principal no tendrá que mostrar todas las páginas. Por ejemplo, contacto y detalles de construcción podrán tener una jerarquía secundaria.

### Inicio

La portada incluirá:

- Presentación breve y específica.
- Una dirección visual reconocible.
- Selección de trabajo relevante.
- Capacidades respaldadas por ejemplos.
- Extracto de experiencia o forma de trabajo.
- Acceso claro al contacto.

No se recomendarán barras porcentuales de habilidades ni una nube interminable de tecnologías como principal evidencia profesional.

### Casos confidenciales

Antes de publicar se revisará:

- Permiso de divulgación.
- Datos del cliente.
- Capturas y diagramas.
- URLs, nombres internos y metadatos.
- Detalles de seguridad potencialmente sensibles.
- Contribución individual frente a la del equipo.

Un borrador excluido del build **seguirá siendo público si está en un repositorio público**. Por tanto, el repositorio no contendrá material confidencial pendiente de anonimizar.

El campo editorial de divulgación será una ayuda de proceso, no un mecanismo de control de acceso.

***

## Dirección visual premium

### Concepto

**Identidad editorial-tecnológica, composición limpia y movimiento expresivo.**

La ambición visual deberá apreciarse en:

- Tipografía.
- Jerarquía.
- Espacio.
- Composición.
- Calidad de los recursos.
- Continuidad entre páginas.
- Respuesta de las interacciones.
- Coherencia del sistema.

No se reducirá el objetivo a añadir gradientes, sombras o animaciones a una plantilla genérica.

### Sistema de marca

`packages/brand` contendrá:

- Paleta primitiva.
- Tokens semánticos.
- Tipografía y licencias.
- Escala de espacio.
- Radios.
- Sombras.
- Capas.
- Temas.
- Duraciones y curvas.
- Recursos gráficos de identidad.

Los componentes consumirán preferentemente tokens semánticos:

```css
--color-surface;
--color-surface-raised;
--color-text-primary;
--color-text-muted;
--color-accent;
--color-border;
--motion-duration-fast;
--motion-duration-scene;
--motion-easing-emphasized;
```

Los valores concretos se decidirán durante la dirección artística. No se fijará una estética oscura únicamente por tratarse de ciberseguridad.

### Componentes y secciones

- `ui` contendrá primitivas y componentes reutilizables.
- `apps/web/components/sections` contendrá composiciones específicas del portfolio.
- Una sección no se moverá a `ui` solo por tener un archivo grande.
- Las variantes representarán necesidades reales, no todas las posibilidades imaginables.
- Las primitivas definirán estados de foco, interacción, error y desactivación cuando correspondan.

***

## Sistema de movimiento

El movimiento será parte del lenguaje visual, no una capa decorativa posterior.

### Niveles

| Nivel | Ejemplos | Ubicación |
|---|---|---|
| Identidad | Duraciones, curvas y desplazamientos | `brand` |
| Componente | Hover, foco, expansión y estados | `ui` |
| Página | Entrada de portada y coreografía de secciones | `apps/web` |
| Navegación | Continuidad entre tarjeta y caso | Integración de la aplicación |

### Experiencias previstas

- Entrada coreografiada de portada.
- Transiciones visuales entre listado y detalle.
- Tarjetas con respuesta y profundidad.
- Menú con comportamiento trabajado.
- Composiciones ligadas al scroll en ubicaciones seleccionadas.
- Alternancia de escenas expresivas y zonas tranquilas de lectura.

Las transiciones entre documentos del mismo origen pueden implementarse sin convertir obligatoriamente toda la web en una SPA; la plataforma dispone de transiciones entre documentos con activación por ambas páginas. [developer.chrome](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document)

La base recomendada será explorar primero esa posibilidad nativa. El router de cliente de Astro se valorará si aporta un comportamiento necesario que compense su complejidad.

### Restricciones de experiencia

- No bloquear el acceso por una introducción.
- No imponer un scroll artificial.
- No repetir toda la coreografía tras cualquier interacción.
- No ocultar información esencial hasta completar una animación.
- No depender exclusivamente del hover.
- No convertir el cursor personalizado en un requisito de interacción.
- No mantener animaciones fuera de pantalla sin utilidad.
- Evitar que una navegación rápida deje estados intermedios.

### Tecnología de animación

Orden de preferencia:

1. CSS para transiciones y animaciones simples.
2. APIs nativas cuando satisfagan la experiencia.
3. Biblioteca especializada cuando exista una coreografía que lo justifique.

No se incorporarán simultáneamente varias bibliotecas de animación sin una división clara de responsabilidades.

Si se utiliza una biblioteca adicional:

- Se medirá su impacto.
- Se cargará donde se necesite.
- Se limpiarán sus listeners y efectos.
- Se probará con navegación repetida.
- Se documentará su licencia.
- Se definirá el comportamiento de movimiento reducido.

***

## Accesibilidad y rendimiento

### Accesibilidad

Objetivo de producto: **WCAG 2.2 AA**, acompañado de revisión manual.

La aceptación incluirá:

- Navegación completa con teclado.
- Foco visible.
- Jerarquía semántica.
- Contraste adecuado.
- Etiquetas accesibles.
- Menú móvil utilizable.
- Alternativas a interacciones con puntero.
- Lectura comprensible sin animación.
- Respeto a `prefers-reduced-motion`.
- Comprobación de cambios de página y foco.

La versión de movimiento reducido se diseñará expresamente; no será simplemente una experiencia rota con todas las duraciones a cero.

### Rendimiento

Los siguientes valores serán **objetivos internos iniciales**, no promesas de resultados ni requisitos universales:

| Métrica o recurso | Objetivo propuesto |
|---|---|
| LCP | Hasta 2,5 s en condiciones de medición acordadas |
| CLS | Hasta 0,1 |
| INP | Hasta 200 ms cuando exista medición de campo suficiente |
| JavaScript inicial | Presupuesto orientativo de 100 KiB comprimidos en páginas estándar |
| Recursos pesados | Carga diferida fuera del contenido inicial |
| Movimiento | Sin bloqueos perceptibles en el dispositivo de referencia |

Las excepciones se evaluarán mediante medición y una decisión explícita. No se sacrificará toda la identidad visual para alcanzar una puntuación aislada, ni se utilizará la identidad como excusa para una experiencia lenta.

La portada deberá seguir presentando información útil sin JavaScript. Las mejoras interactivas podrán depender de él.

### Medición

- Fijar dispositivo, viewport y configuración de prueba.
- Separar resultados locales, laboratorio y campo.
- No presentar una ejecución aislada como garantía.
- Mantener pruebas de rendimiento repetibles.
- No añadir analítica invasiva únicamente para obtener métricas.

***

## Turborepo y tareas

Turborepo identifica relaciones mediante las dependencias de los paquetes y utiliza un grafo separado para las tareas. Ambos deberán reflejar la arquitectura real. [turborepo](https://turborepo.dev/docs/core-concepts/package-and-task-graph)

### Comandos públicos

| Comando | Responsabilidad |
|---|---|
| `pnpm dev` | Desarrollo de la web |
| `pnpm build` | Construcción de aplicaciones |
| `pnpm check` | Comprobaciones agregadas |
| `pnpm lint` | Análisis estático |
| `pnpm format` | Formato local |
| `pnpm format:check` | Verificación de formato |
| `pnpm content:check` | Validación editorial y referencias |
| `pnpm test` | Pruebas unitarias |
| `pnpm test:e2e` | Pruebas de navegador |
| `pnpm test:visual` | Regresión visual |
| `pnpm preview` | Inspección de la salida estática |

Los comandos agregados deberán ser comprensibles y no esconder efectos secundarios.

### Tareas e invalidación

- `dev` será persistente y no cacheable.
- `build` declarará salidas reales.
- Las tareas considerarán cambios en sus dependencias internas.
- Los cambios en contenido deberán invalidar las páginas consumidoras.
- Los cambios en tokens deberán invalidar las comprobaciones visuales relevantes.
- Las tareas de publicación y atestación no se tratarán como un build cacheable.
- Las variables que alteren la salida formarán parte de su contrato de caché.

Turborepo documenta los nodos de tránsito para mantener relaciones e invalidación incluso cuando un paquete no ejecuta una tarea de compilación propia. Este mecanismo se valorará para los paquetes consumidos como fuente. [turborepo](https://turborepo.com/docs/crafting-your-repository/configuring-tasks)

No se dará por suficiente una configuración genérica con `dependsOn: ["^build"]` sin probar sus efectos.

### Pruebas del grafo

Antes de aceptar la caché se comprobará que:

- Modificar `brand` cambia la salida de `web`.
- Modificar `content` reconstruye las páginas correspondientes.
- Modificar un esquema ejecuta de nuevo la validación.
- Cambiar el origen o base de publicación invalida la salida.
- El build funciona desde un checkout limpio.

La optimización por paquetes afectados se añadirá cuando sea útil. En un repositorio pequeño se priorizará la corrección.

***

## Pruebas y calidad

| Capa | Cobertura |
|---|---|
| Contenido | Esquemas, relaciones, recursos, estados y enlaces internos |
| Lógica | Ordenación, formatos, rutas y transformaciones |
| Componentes | Estados, contratos y comportamiento reutilizable |
| Integración | Carga del contenido externo y construcción Astro |
| Navegador | Navegación, filtros, menú y cambios de tema |
| Accesibilidad | Análisis automatizado y revisión manual |
| Visual | Portada, listados, casos y estados representativos |
| Producción | Smoke tests tras publicar |

### Escenarios imprescindibles

- Abrir directamente una URL de detalle.
- Navegar atrás y adelante.
- Acceder con teclado.
- Usar movimiento reducido.
- Desactivar JavaScript.
- Cambiar entre tamaños de pantalla.
- Navegar rápido durante una transición.
- Acceder a una ruta inexistente.
- Construir con una referencia editorial inválida.
- Intentar publicar un borrador como destacado.
- Comprobar rutas con una base no vacía.

Las pruebas visuales fijarán navegador, fuentes y viewport. Los cambios de referencia deberán revisarse; no se aceptarán automáticamente porque una prueba haya fallado.

Los enlaces externos se comprobarán por separado o de forma programada para evitar que una caída ajena bloquee indefinidamente una publicación sin relación.

***

## Estrategia de ramas

**Base: desarrollo basado en `main`, con ramas cortas y pull requests.**

- `main` deberá permanecer publicable.
- No se creará `develop`.
- Las ramas representarán cambios acotados.
- Se preferirá squash merge.
- El título de PR seguirá una convención coherente.
- Las decisiones de arquitectura se revisarán junto con el código.
- Los cambios de contenido también pasarán por PR.

Ejemplos:

```text
feat/case-study-layout
feat/project-content-model
fix/reduced-motion-navigation
docs/deployment-runbook
chore/update-astro
```

### Protección realista

- Exigir comprobaciones automáticas.
- Bloquear force push y eliminación de `main`.
- Limitar excepciones.
- Proteger cambios sensibles de workflows.
- Utilizar `CODEOWNERS` cuando aporte revisión real.

Para un único mantenedor no se exigirá una aprobación de otra persona inexistente. Se mantendrán PR, verificaciones y revisión propia explícita, sin presentar eso como revisión independiente.

***

## CI/CD

### Separación de flujos

| Flujo | Eventos | Permisos y alcance |
|---|---|---|
| `ci.yml` | PR y cambios relevantes | Validación sin publicación |
| `deploy.yml` | Push autorizado a `main` | Construcción y publicación controladas |
| `security.yml` | Programación y eventos seleccionados | Comprobaciones de seguridad |

La publicación desde GitHub Actions es un flujo soportado por GitHub Pages y permite separar preparación del artefacto y despliegue. [docs.github](https://docs.github.com/en/get-started/start-your-journey/deploying-your-website-automatically)

### Validación de PR

1. Checkout.
2. Configuración de Node y pnpm.
3. Instalación con lockfile congelado.
4. Formato.
5. Análisis y tipos.
6. Validación de contenido.
7. Pruebas unitarias.
8. Build.
9. Pruebas de navegador.
10. Informe agregado.

Las PR no tendrán acceso a permisos de publicación ni a credenciales innecesarias.

### Construcción de producción

- Construir desde el commit autorizado de `main`.
- Ejecutar las comprobaciones exigidas en ese contexto.
- No reutilizar directamente un build de una PR.
- No reconstruir después de verificar el artefacto final.
- Registrar commit, ejecución y herramientas utilizadas.
- Mantener separados los datos de build de los textos editoriales.

Los artefactos de prueba no deberán confundirse con el artefacto publicable.

### Permisos

- Validación y build: lectura del repositorio.
- Atestación: permisos específicos de atestación y OIDC.
- Publicación: permisos específicos de Pages y OIDC.
- No conceder `contents: write` a todo el workflow.
- Utilizar permisos por job.

El código del proyecto no se ejecutará innecesariamente en los jobs con privilegios de firma o publicación.

### Cachés

- Cachear el almacén de paquetes cuando proceda.
- No considerar la caché una evidencia de procedencia.
- No introducir secretos en salidas cacheadas.
- No permitir que una caché no confiable determine el artefacto de producción.
- En la primera implementación, preferir un build de publicación sin restaurar salidas de Turborepo.

La caché de producción podrá optimizarse después de documentar su frontera de confianza.

### Concurrencia

- Cancelar validaciones obsoletas de una misma PR.
- Serializar la publicación.
- Evitar que un build antiguo sobrescriba uno más reciente.
- Antes de desplegar, comprobar que el commit sigue autorizado.
- Tratar un rollback como una operación explícita, no como una carrera entre ejecuciones.

***

## Atestación verificable

### Objetivo de seguridad

La política será:

> Solo se publica el artefacto cuya procedencia validada corresponde al repositorio, workflow, referencia y commit autorizados.

No se afirmará que una firma demuestra ausencia de vulnerabilidades ni que convierte el proceso en reproducible.

### Diseño del artefacto

La cadena utilizará **un paquete final e inmutable**, compatible con el formato requerido por Pages.

```text
Commit autorizado
        │
        ▼
Validación y build
        │
        ▼
Paquete final de Pages
        │
        ▼
Atestación de ese paquete
        │
        ▼
Verificación y política
        │
        ▼
Despliegue del mismo paquete
```

Si una acción vuelve a empaquetar los archivos, habrá que demostrar que se está verificando el objeto que finalmente consume el despliegue. No será válido firmar un ZIP auxiliar y publicar después una salida diferente.

### Jobs propuestos

**Build**

- Ejecuta el proyecto con permisos mínimos.
- Produce la salida estática.
- Comprueba que no contiene archivos inesperados.
- Genera una única vez el paquete final.
- Lo sube como artefacto de esa ejecución.

**Atestación**

- Descarga ese artefacto por su identidad.
- No instala ni ejecuta código del proyecto.
- Genera su atestación.
- Registra el resultado y su asociación con el paquete.

**Publicación**

- Recupera el mismo artefacto.
- Valida criptográficamente su atestación.
- Comprueba la política de identidad.
- Publica sin reconstruir ni modificar.

La implementación deberá comprobar qué identidad de workflow registra la versión fijada del mecanismo de atestación, especialmente si se introducen workflows reutilizables.

### Política de verificación

La política conceptual será:

```yaml
expected:
  repository: repositorio-autorizado
  workflow: workflow-autorizado
  sourceRef: refs/heads/main
  sourceCommit: commit-del-evento-autorizado
  subjectDigest: digest-del-paquete-descargado

onFailure: deny
```

Este bloque no es configuración ejecutable: expresa las condiciones que el verificador deberá imponer.

Los valores esperados procederán del contexto autorizado de publicación. No se tomarán únicamente de un manifiesto que acompañe al artefacto.

Un checksum sin autenticación de procedencia no sustituye esta verificación.

### Pruebas negativas

Será obligatorio demostrar que se impide publicar cuando:

- Se modifica el paquete.
- No existe atestación.
- El commit no es el autorizado.
- El firmante no es el esperado.
- El repositorio no coincide.
- La verificación falla o no está disponible.

### Límites

Esta cadena no resuelve por sí sola:

- Dependencias maliciosas durante un build autorizado.
- Cambios maliciosos aprobados en el repositorio.
- Compromiso del control de la cuenta.
- Alteración conjunta del workflow y su política.
- Compromiso posterior del hosting.

Tampoco se afirmará un nivel SLSA concreto sin evaluar todos sus requisitos.

**Criterio de incorporación:** la atestación se activará cuando estén implementados la verificación obligatoria, la publicación del mismo artefacto y los casos negativos. Hasta entonces se considerará una capacidad pendiente, no una garantía de seguridad.

***

## Seguridad y mantenimiento

### Repositorio y automatización

- Activar autenticación fuerte en las cuentas administradoras.
- Utilizar runners alojados por GitHub como base.
- No conectar PR públicas con runners del homelab.
- Mantener credenciales fuera del repositorio.
- Evitar eventos privilegiados que ejecuten código no confiable.
- Revisar entradas de usuario utilizadas en scripts.
- Limitar las acciones autorizadas.
- Fijar dependencias de workflow de forma verificable.
- Revisar cambios de automatización con especial atención.

La referencia de seguridad de GitHub deberá utilizarse como política operativa para permisos, dependencias de workflows y tratamiento de código no confiable: [Secure use reference](https://docs.github.com/en/actions/reference/security/secure-use).

### Dependabot

La configuración cubrirá:

- Ecosistema npm utilizado por el workspace.
- GitHub Actions.
- Actualizaciones programadas.
- Límite razonable de PR.
- Agrupación de cambios compatibles cuando reduzca ruido.
- Cambios mayores separados.

No se configurará automerge indiscriminado para dependencias, workflows y paquetes críticos.

Se verificará que la versión de pnpm y las características de su lockfile sean compatibles con la automatización elegida.

### Comprobaciones

- Alertas de dependencias.
- Revisión de nuevas dependencias.
- Detección de secretos cuando esté disponible.
- Análisis de workflows.
- Code scanning cuando aporte cobertura útil.
- Revisión periódica de permisos y excepciones.

Un fallo de seguridad real deberá bloquear o requerir una excepción documentada con responsable y fecha de revisión. No se añadirán controles que se ignoren permanentemente.

***

## Publicación en Pages

### Configuración

- Astro generará una salida estática.
- `site` representará el origen público.
- `base` representará el prefijo real de publicación.
- Las rutas internas se generarán mediante un resolvedor central.
- Los recursos no asumirán siempre que la web vive en `/`.

Para un sitio de usuario como `usuario.github.io`, la base prevista es `/`. Para un sitio publicado bajo un repositorio, la base deberá incluir ese prefijo. La configuración exacta se probará antes de migrar el sitio existente.

### Página 404

La 404 deberá:

- Generar el archivo final esperado por el hosting.
- Mantener identidad visual.
- Ofrecer retorno a inicio y proyectos.
- Utilizar textos del sistema de contenido.
- Funcionar sin JavaScript.
- Comprobarse mediante una URL inexistente en producción.

No se redirigirán todas las rutas desconocidas a la portada para simular una SPA.

### Recursos públicos

Se comprobará que el empaquetado conserva los archivos necesarios, incluidos los directorios con punto como `.well-known`.

`security.txt` solo se publicará con un contacto real y un proceso de respuesta razonable. No será un elemento decorativo.

### Limitaciones del hosting

No se diseñará una política de cabeceras que dependa de capacidades no verificadas de Pages.

Si se utiliza CSP mediante una etiqueta `meta`, se documentarán sus limitaciones y su interacción con scripts, estilos y recursos generados. No se dará por equivalente a disponer de control completo de cabeceras HTTP.

Si el proyecto necesita ese control, habrá que valorar un proxy o un hosting distinto mediante ADR.

### Operación y recuperación

Después del despliegue:

- Comprobar portada.
- Comprobar un caso.
- Comprobar recursos.
- Comprobar 404.
- Registrar el commit publicado.
- Confirmar que la URL pública corresponde al despliegue esperado.

Se conservarán los artefactos necesarios para una ventana de recuperación definida.

Un rollback reutilizará preferentemente un artefacto conocido y verificado. Si debe reconstruirse, se registrará como un build nuevo de un commit anterior, no como el mismo artefacto original.

***

## Versionado y releases

### Despliegues

Cada despliegue se identificará por:

- Commit.
- Ejecución.
- Digest del paquete.
- Fecha de publicación.
- Versión editorial o release, si existe.

No se hará un bump automático de todos los paquetes por cada cambio de texto.

### Paquetes internos

Mientras sean privados y no publicados:

- No necesitarán releases independientes.
- Los cambios incompatibles se resolverán dentro del monorepo.
- La trazabilidad principal será Git.
- Se evitará añadir Changesets sin una necesidad de publicación o versionado independiente.

### Releases del portfolio

Se podrán crear releases para hitos relevantes:

- Primera versión pública.
- Rediseño.
- Nuevo sistema de contenido.
- Cambio de arquitectura de entrega.

Si se automatizan, se preferirá un proceso explícito y revisable —por ejemplo, una PR de release— frente a commits de versión inesperados durante cada despliegue.

Publicar una nueva versión y publicar un nuevo commit son operaciones relacionadas, pero no equivalentes.

***

## Documentación y wiki

### Fuente principal

La documentación vivirá en `/docs`, junto al código.

| Documento | Finalidad |
|---|---|
| `README.md` | Qué es, requisitos y arranque |
| `CONTRIBUTING.md` | Cómo trabajar en el repositorio |
| `SECURITY.md` | Comunicación de problemas de seguridad |
| `docs/architecture` | Paquetes, contratos y flujos |
| `docs/decisions` | ADR |
| `docs/design` | Identidad, componentes y movimiento |
| `docs/content` | Edición y publicación de contenido |
| `docs/security` | Riesgos, controles y política de verificación |
| `docs/runbooks` | Despliegue, recuperación y mantenimiento |

### ADR

Cada decisión relevante recogerá:

- Contexto.
- Decisión.
- Alternativas.
- Consecuencias.
- Estado.
- Condiciones de revisión.

Los primeros ADR cubrirán:

- Astro estático.
- Monorepo con pnpm y Turborepo.
- Paquetes iniciales.
- JSON y Markdown.
- Sistema visual y movimiento.
- Estrategia de ramas.
- Pages y sus limitaciones.
- Cadena de procedencia.
- Política de versionado.

### Wiki

**Decisión inicial: no utilizar la wiki como fuente documental.**

GitHub plantea las wikis como un espacio de documentación extensa del proyecto; podrán incorporarse si aparece una necesidad distinta de los documentos versionados: [About wikis](https://docs.github.com/en/communities/documenting-your-project-with-wikis/about-wikis).

Si se habilita más adelante, será un portal o índice. No se mantendrán manualmente dos versiones de las mismas guías.

La página pública «Esta web» será una selección editorial de decisiones interesantes, no un volcado automático de todo `/docs`.

***

## Desarrollo asistido por IA

### Instrucciones del repositorio

`AGENTS.md` contendrá:

- Propósito del proyecto.
- Mapa de paquetes.
- Restricciones de dependencias.
- Comandos oficiales.
- Reglas de contenido.
- Convenciones visuales.
- Política de movimiento.
- Comprobaciones obligatorias.
- Límites de seguridad.
- Criterios para añadir dependencias.

Las instrucciones específicas de un paquete solo se añadirán cuando aporten diferencias reales. Se evitarán duplicados contradictorios para distintas herramientas.

### Reglas de trabajo

- No inventar información profesional.
- No incorporar textos editoriales directamente a componentes.
- No modificar lockfiles manualmente.
- No introducir dependencias sin justificar su utilidad.
- No saltarse controles para hacer pasar CI.
- No alterar workflows de publicación sin revisión explícita.
- No utilizar datos privados como contexto de herramientas externas sin autorización.
- No crear una nueva abstracción antes de comprender los contratos existentes.

### Proceso esperado

1. Leer documentación e instrucciones.
2. Identificar alcance.
3. Proponer un cambio acotado.
4. Implementarlo.
5. Ejecutar verificaciones.
6. Revisar el diff.
7. Actualizar documentación.
8. Presentar límites y pruebas realizadas.

No se habilitarán inicialmente agentes con capacidad autónoma para aprobar sus propios cambios y publicar en producción.

### Tipos de tareas útiles

- Añadir un caso siguiendo el esquema.
- Crear una variante de componente existente.
- Implementar una transición definida.
- Añadir una prueba negativa de publicación.
- Revisar accesibilidad de un flujo.
- Actualizar una dependencia con verificación.
- Explicar y documentar una decisión.

***

## Privacidad, SEO y licencias

### Privacidad

Base propuesta:

- Sin tracking publicitario.
- Sin embeds de terceros por defecto.
- Sin fuentes remotas obligatorias.
- Sin analítica hasta existir una necesidad.
- Contacto mediante enlaces directos inicialmente.

No se interpretará «sin cookies propias» como ausencia automática de cualquier consideración de privacidad. Se revisarán el hosting, las integraciones y los datos publicados.

### SEO

- Título y descripción por página.
- Canonical coherente.
- Sitemap con páginas publicadas.
- Exclusión de borradores.
- Open Graph.
- Imágenes sociales.
- Enlaces descriptivos.
- Datos estructurados solo con información verificable.

No se publicarán valoraciones, credenciales ni testimonios ficticios para completar metadatos.

### Licencias

Se distinguirán:

- Código del repositorio.
- Textos profesionales.
- Marca.
- Fotografías y diagramas.
- Recursos de terceros.

Una licencia de código abierto no deberá aplicarse accidentalmente a todo el contenido si esa no es la intención.

Se mantendrá un inventario de recursos de terceros con licencia y atribución cuando corresponda.

***

## Evolución por fases

| Fase | Resultado | Condición de cierre |
|---|---|---|
| Fundaciones | Workspace, contratos y herramientas | Instalación y build desde cero |
| Contenido | Datos, esquemas y adaptadores | Editar información sin tocar componentes |
| Sistema visual | Marca, componentes y movimiento | Estados y accesibilidad definidos |
| Portfolio | Páginas y casos reales | Contenido suficiente y revisado |
| Entrega | CI, Pages y recuperación | Publicación repetible y smoke tests |
| Procedencia | Atestación y verificación | Pruebas negativas superadas |
| Expansión | Nuevas secciones o apps | Necesidad real y responsabilidades claras |

La expansión podrá incluir:

- Notas técnicas.
- Documentación pública.
- Laboratorios interactivos.
- Catálogo de componentes.
- CV generado desde información compartida.
- Una nueva aplicación bajo `apps/`.

Antes de crear una aplicación independiente se evaluará si basta con una sección de Astro. Un subdominio, un nuevo despliegue y un nuevo ciclo de actualización no son gratuitos en mantenimiento.

***

## Criterios de aceptación

### Arquitectura y contenido

- [ ] Cada paquete tiene una responsabilidad documentada.
- [ ] No existen ciclos ni imports desde paquetes hacia aplicaciones.
- [ ] Los textos visibles y accesibles proceden del sistema de contenido.
- [ ] Añadir un proyecto no exige modificar un componente.
- [ ] Añadir un caso utiliza un esquema y una plantilla editorial.
- [ ] Las referencias inválidas bloquean el build.
- [ ] Los borradores no aparecen en rutas, sitemap ni selecciones públicas.
- [ ] No hay información confidencial en archivos excluidos de la web.
- [ ] Los cambios en contenido y marca invalidan correctamente las tareas.

### Experiencia

- [ ] La identidad visual no depende de una plantilla genérica sin adaptación.
- [ ] La portada incorpora movimiento trabajado.
- [ ] La navegación tiene continuidad visual donde esté diseñada.
- [ ] No hay scroll secuestrado ni introducciones obligatorias.
- [ ] Existe una experiencia de movimiento reducido.
- [ ] El contenido principal es accesible sin JavaScript.
- [ ] Se puede navegar con teclado.
- [ ] Se han probado móvil, navegación rápida y atrás/adelante.
- [ ] Se han medido los presupuestos de rendimiento.

### Entrega y seguridad

- [ ] CI funciona con permisos mínimos.
- [ ] Las PR no publican ni acceden a credenciales de producción.
- [ ] La publicación parte de un commit autorizado.
- [ ] El artefacto publicado está identificado.
- [ ] La 404 y las rutas directas funcionan en producción.
- [ ] Existe un procedimiento de recuperación probado.
- [ ] Dependabot y las comprobaciones de seguridad están operativos.
- [ ] Si se anuncia atestación, su verificación es obligatoria.
- [ ] Los casos negativos impiden desplegar.
- [ ] No se reconstruye el artefacto después de verificarlo.

### Mantenibilidad

- [ ] El arranque está documentado y probado desde cero.
- [ ] Las decisiones importantes tienen ADR.
- [ ] Las instrucciones para IA reflejan los contratos reales.
- [ ] Las licencias de código, contenido y marca están diferenciadas.
- [ ] No se mantienen fuentes documentales duplicadas.
- [ ] Las funcionalidades futuras no se han representado mediante paquetes vacíos.

***

## Decisiones pendientes

La arquitectura anterior puede implementarse sin resolver todos los detalles visuales. Antes de publicar deberán concretarse:

| Decisión | Qué debe fijarse |
|---|---|
| Identidad pública | Nombre mostrado, denominación profesional y marca |
| Público prioritario | Clientes, empleadores, colaboradores o combinación con jerarquía |
| Posicionamiento | Problemas concretos que se quieren asociar al perfil |
| Dirección artística | Tipografía, paleta, recursos y referencias |
| Contenido inicial | Proyectos y casos que pueden divulgarse |
| Dominio | Continuidad de `github.io` o dominio propio |
| Idiomas | Español inicial y prioridad real de una segunda versión |
| Licencias | Alcance del código abierto frente a contenido y marca |
| Contacto | Canales y datos que se publicarán |
| Operación | Retención de artefactos y ventana de recuperación |

Estas decisiones deberán documentarse con información confirmada. No se rellenarán mediante supuestos de la IA ni mediante contenido ficticio para aparentar un portfolio terminado.