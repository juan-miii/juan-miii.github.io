---
id: firma-de-entrega
locale: es
slug: firma-de-entrega
projectId: delivery-pipeline
title: La entrega como afirmación verificable
summary: Una cadena de integración y despliegue que no confía en el nombre del artefacto y comprueba su digest antes de publicar.
publicationStatus: published
disclosure: public
---

### Contexto: publicar no es mover archivos

Publicar no es mover archivos. Es afirmar que lo que llega a producción es exactamente lo que se construyó, con las dependencias y las decisiones que se revisaron. En un sitio estático esa afirmación es fácil de perder: el artefacto se copia, se renombra, se sube a otra plataforma y nadie comprueba que los bytes son los mismos.

La cadena existente ya tenía integración continua y un destino de despliegue. El problema era de confianza. Quería que cada publicación pudiera responder tres preguntas: qué se construyó, con qué código y cómo se comprobó que el artefacto no cambió.

### Decisión: una cadena de custodia

Traté el despliegue como una cadena de custodia. La construcción produce un artefacto comprimido. Un paso calcula su digest SHA-256 y otro lo verifica antes de publicar. Si el digest no coincide, el trabajo falla y no hay despliegue.

La automatización se separa en dos momentos. La integración corre en cada cambio y ejecuta formato, lint, comprobación de tipos, validación de contenido y construcción. El despliegue solo se activa en la rama principal, repite las comprobaciones, añade pruebas de humo y auditoría de accesibilidad, y solo publica si todo pasa. Los permisos se limitan a lo necesario en cada trabajo.

No añadí un servicio externo de firma. Para este tamaño, un digest versionado, una verificación explícita y una atestación de procedencia emitida por la plataforma resuelven el riesgo principal sin introducir una clave que después nadie opera. La decisión queda documentada, junto con la ruta para endurecerla si el proyecto crece.

### Construcción: del commit al artefacto

El flujo empieza con la instalación reproducible de dependencias. La versión de Node y el gestor de paquetes están fijados. La construcción no acepta variables de entorno que cambien el resultado de forma silenciosa.

Después se ejecuta el verificador de contenido y la comprobación de tipos. Las pruebas de humo leen el HTML generado y fallan si falta la portada, una ficha o el contenido esperado. La auditoría de accesibilidad recorre la portada, cada ficha abierta y el 404 en escritorio, móvil y con movimiento reducido. La revisión de dependencias corre en un flujo aparte, programado. Solo entonces se empaqueta el resultado.

El paso de empaquetado calcula el digest y lo escribe junto al artefacto. El trabajo de despliegue vuelve a calcularlo y lo compara con el valor esperado. La verificación no se apoya en el nombre del archivo ni en la marca de tiempo. Si el contenido cambia aunque sea un byte, la publicación se detiene.

### Verificación: la prueba que falla a propósito

La prueba más útil es negativa: alterar el artefacto después de calcular el digest y comprobar que la cadena falla. Se puede reproducir en local con el script `verify-artifact.mjs`, que recibe la ruta y el digest esperado y devuelve un código de error cuando no coinciden.

La integración también conserva el registro de los pasos y el artefacto asociado a cada ejecución. Eso permite reconstruir qué versión se publicó y volver a ella. El README del repositorio describe el alcance de la cadena y lo que no cubre.

### Resultado: publicar deja de ser un acto de fe

La publicación deja de ser un acto de fe. Cada entrega tiene un artefacto identificable, una comprobación explícita y un registro que se puede revisar. La cadena es pequeña, pero falla de forma visible cuando algo no cuadra.

El límite principal es que la atestación la emite la plataforma, no una clave que controle fuera de ella. Una firma con una clave gestionada aparte sería el siguiente paso. Para un sitio personal, la relación entre coste y riesgo todavía no lo justifica. La decisión está escrita para que se pueda revisar cuando cambie el contexto.
