# Startpage — diseño

## Brief
- **Sujeto:** panel de arranque personal de la red local (`.home.arpa`).
- **Audiencia:** el propietario (uso diario, escritorio y móvil).
- **Trabajo:** abrir rápido los servicios autoalojados y las redes sociales.
- **Idioma:** español.
- **Restricción:** los enlaces `.home.arpa` son internos y privados; el sitio no se indexa ni se publica fuera de la red.

## Concepto
```
Idea:        El cuadro de la red: cada servicio es un módulo del patchbay,
             con su piloto encendido y su hostname a la vista.
Metáfora:    Rack de servidores / panel de relés de un homelab.
Signatura:   La fila entera se llena de tinta desde abajo al apuntarla
             (mismo relleno que los botones de @juan-miii/brand) y el
             piloto del módulo sigue latiendo en reposo.
Emoción:     Reconocer la casa de un vistazo y saltar sin pensar.
Verbo:       "encajar como un relé": pulsar, llenar, soltar.
Captura:     El titular "Todo en casa." sobre el papel cuadriculado,
             con las filas del rack empezando debajo.
```

## Sistema
- **Paleta:** roles de marca (`--c-ground`, `--c-ink`, `--c-muted`, `--c-line`, `--c-accent`, `--c-paper`), claro y oscuro. El acento rojo (`#d93a2b`) solo marca el piloto y el punto del titular.
- **Tipografía:** Switzer (display y cuerpo) y JetBrains Mono (hostnames, metadatos, etiquetas de grupo). Titular a `clamp(3.3rem, 8.6vw, 7.4rem)`, tracking `-0.06em`; nombre de servicio a `clamp(1.35rem, 2.3vw, 1.9rem)`.
- **Grid y ritmo:** shell de marca (`--shell`), retícula de 12 columnas con `--gutter` en el hero. Secciones: hero asimétrico (titular 1–9, meta 9–13), rack a ancho completo con cuatro grupos de 5/2/2/1 filas, banda oscura de redes, pie.
- **Forma:** radio 0. Módulos cuadrados, filetes de 1 px, sin sombras.
- **Lenguaje de movimiento:** una sola familia de easing (`--motion-easing`); el relleno sube en 420 ms, la flecha se desplaza 3 px. Los pilotos laten en bucle (2,8 s) con desfase de 130 ms por fila.
- **Reduced motion:** los pilotos se quedan fijos y el relleno/flecha se resuelven al instante (reglas de marca).

## Composición
```
+------------------------------------------------------------------+
| ● Panel .home.arpa        SERVICIOS  REDES        18:40  [tema]  |
+------------------------------------------------------------------+
|                                          ┌────────────────────┐  |
|  (papel cuadriculado)                    │ Fotos, medios...   │  |
|  Todo en casa.                           ├────────────────────┤  |
|                                          │ SERVICIOS       10 │  |
|                                          │ RED      .home.arpa│  |
|                                          │ ACCESO      sólo LAN│ |
|                                          └────────────────────┘  |
|                                                                  |
|  INFRAESTRUCTURA ───────────────────────────────────────────  05 |
|  ┌────────────────────────────────────────────────────────────┐  |
|  │ [server]● Proxmox                  proxmox.home.arpa     ↗ │  |
|  │ [shield]● Pi-hole                  pihole.home.arpa      ↗ │  |
|  │ ...                                                        │  |
|  MEDIOS ────────────────────────────────────────────────────  02 |
|  IA LOCAL ──────────────────────────────────────────────────  02 |
|  AUTOMATIZACIÓN ────────────────────────────────────────────  01 |
+------------------------------------------------------------------+
|  ██ Redes                                        fuera de la red |
|  [LinkedIn]──────────[GitHub]──────────[GitLab]                  |
|  nota de red local                                    Madrid     |
+------------------------------------------------------------------+
```

## Decisiones
- **Sin loader y sin GSAP:** es la página que se abre decenas de veces al día; tiene que estar en el primer frame. La vida en reposo la llevan los pilotos, no una animación de entrada.
- **Los pilotos laten siempre** (salvo `prefers-reduced-motion`). Es el estado idle del concepto, no un adorno: en un panel real los LEDs indican que el nodo está vivo. El 404 comparte el sistema pero se queda casi quieto a propósito (solo un piloto).
- **Cada servicio es un enlace real** con su hostname visible; las redes abren en pestaña nueva con `rel="noopener"`.
- **Agrupado por función** (infraestructura, medios, IA local, automatización) para que diez filas se lean de un vistazo.
- **Tema oscuro** con los mismos tokens; el relleno de las filas invierte a claro y el texto pasa a tinta oscura.
- **Cabecera en un solo bloque:** la navegación vive junto al reloj y el selector de tema, alineada a la derecha. Antes flotaba en el centro con dos huecos grandes a los lados.
- **404 de altura completa:** el titular arriba, una línea de señal rota ("sin ruta en esta red") en el vacío y la fila de vuelta anclada al borde inferior, justo encima del pie. Así el espacio en blanco es composición, no un hueco.
- **Banda oscura elevada en tema oscuro:** en claro la banda es tinta sobre papel; en oscuro un negro más negro que el fondo desaparecía, así que la superficie sube un 7 % hacia el papel y el filete superior se refuerza.
- **Pie a 13 px:** la nota y las coordenadas eran el texto más pequeño (12 px); suben un paso para leerse en móvil.
- **Skip link:** el texto es "Saltar al contenido" (`href="#main"`). El check `keyboard.skipLinkFirst` de `shoot.mjs` busca las palabras inglesas skip/#main/#content dentro de la etiqueta renderizada y da falso negativo con el texto en español; el enlace sí es el primer stop del tabulador.
- **`panel.home.arpa`** es el hostname asumido para el panel (canonical, robots y sitemap). Cambiarlo en `astro.config.mjs` si el host real es otro.

## QA (build de producción, 2026-11-07)
- `audit.mjs`: **0 FAIL, 0 WARN** (canonical, OG image 1200x630, robots y sitemap) en `/` y `/404.html`.
- `shoot.mjs`: sin errores de consola ni peticiones fallidas, sin overflow, 0 targets pequeños, LCP 72 ms / CLS 0 en escritorio y 56 ms en móvil, 60 fps, `noHoverChange` y `colorOnly` vacíos, `idleMotion: true`, axe sin violaciones.
- Contraste medido: texto principal 16,3:1; metadatos mono 5,5:1 sobre el fondo y 7,5:1 sobre el relleno de hover; banda oscura 8,4:1.
- 404 disparada aparte: LCP 60 ms, sin violaciones, sin overflow ni targets pequeños; su `idleMotion` es `false` a propósito (un solo piloto, sin latido).

## Crítica independiente
Pasada de crítica a ciegas sobre las capturas (sin acceso al código ni a este documento). El modelo no pudo abrir los PNG, así que las notas son de **baja confianza**: salen del informe de QA, el OCR y las medidas de las capturas, no de una inspección visual.

| Categoría | Nota | Peso |
|---|---|---|
| Design | 8,0 | 40 % |
| Usability | 8,5 | 30 % |
| Creativity | 8,5 | 20 % |
| Content | 9,0 | 10 % |
| **Total ponderado** | **8,35** | |

Desarrollo: Semantics/SEO 8,5 · Animations 9 · Accessibility 9 · WPO 10 · Responsive 9 · Markup/Meta 8,5.

Los tres arreglos que pedía ya están aplicados: el vacío del 404 (ahora composición de altura completa), la superficie del pie en tema oscuro y la alineación de la cabecera. La crítica también señaló el texto de 12 px del pie (subido a 13 px) y el falso negativo del skip link (documentado arriba).
