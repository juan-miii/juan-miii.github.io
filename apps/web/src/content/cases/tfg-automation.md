---
id: tfg-automation
locale: es
slug: caso-tfg-correccion-practicas
projectId: tfg-automation
title: Corregir prácticas sin corregirlas a mano
summary: Un sistema de evaluación continua sobre GitHub Actions que ejecuta pruebas, inyecta tests privados y devuelve retroalimentación en cada entrega.
publicationStatus: published
disclosure: public
---

### Contexto: corregir a mano no escala

Corregir prácticas de programación una por una consume el tiempo que debería ir a enseñar. La retroalimentación llega tarde, las rúbricas se aplican de forma distinta según quién corrige y el alumnado no puede repetir la entrega con la misma prueba. El trabajo partía de una pregunta concreta: se puede convertir la entrega en el momento de la evaluación, sin montar una plataforma propia.

### Decisión: la entrega es el examen

Usé GitHub Classroom para distribuir el enunciado y GitHub Actions para ejecutar la corrección en cada push. Cada repositorio de práctica lleva sus workflows, filtrados por carpeta, de modo que solo se ejecuta la prueba que corresponde a esa entrega. El resultado se escribe en el propio pull request: el alumnado ve qué ha fallado sin esperar a una revisión manual.

### Construcción: tres escenarios, un mismo contrato

El repositorio de prueba de concepto cubre tres tipos de práctica. Un programa de entrada y salida se compara con `diff`. Una clase Java con cinco funciones se evalúa con tests JUnit privados. Un proyecto Maven completo ejecuta pruebas, cobertura con JaCoCo y Javadoc. Los tests privados viven en un repositorio aparte y se inyectan en el runner mediante una deploy key de solo lectura; los secretos se eliminan después del checkout. El alumnado nunca ve el código de las pruebas.

Los workflows aceptan pruebas personalizadas y scripts externos. Cada escenario declara su entrada, su comando de evaluación y su salida, así que añadir una práctica nueva no obliga a rehacer la cadena.

### Comparativa: qué aporta cada plataforma

Comparé Deliverit, GitLab CI, Jenkins, Gradescope y Codeboard con los mismos criterios: esfuerzo de puesta en marcha, control sobre el entorno, privacidad de las pruebas, integración con el aula y coste de mantenimiento. GitHub Actions y Classroom no ganan en todas las categorías. Ganan donde importa para este caso: el flujo ya está en el repositorio, la corrección es reproducible y el resultado queda junto a la entrega.

### Límites: una prueba de concepto

El sistema no sustituye a un campus virtual ni resuelve la gestión de notas. Depende de GitHub y de que el alumnado use la cuenta correcta. La comparativa se apoya en documentación pública y en pruebas de los escenarios incluidos, no en un despliegue con un curso completo. El siguiente paso sería medir el tiempo de corrección y la calidad de la retroalimentación con un grupo real.
