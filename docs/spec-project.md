# Invitación digital — XV Años de Areli Edith

Especificación técnica para construir el micrositio. Este documento es el brief:
contiene datos, diseño, funcionalidades y snippets listos para usar.

> **Convención de idioma:** todo el **código** va en inglés (identificadores,
> nombres de archivo, propiedades, comentarios). En **español** solo el contenido
> que ve el invitado: nombres, textos, direcciones, horas y mensajes.

> **Nota sobre arquitectura:** la estructura de archivos de la sección 5 es
> orientativa. Si se provee un proyecto de referencia con convenciones propias
> (organización de carpetas, naming, patrones de componentes), esas convenciones
> tienen prioridad. Lo que NO es negociable son los datos, la paleta, las reglas
> de contraste y las funcionalidades.

---

## 1. Resumen

- **Tipo:** micrositio de una sola página (landing), scroll vertical.
- **Evento:** XV años de **Areli Edith**.
- **Objetivo:** invitación digital compartible por WhatsApp; el 95% la abrirá en
  teléfono, así que el diseño es **móvil-first**.
- **Stack:** Astro + TypeScript. Sin framework de UI adicional; los interactivos
  se resuelven con JS vanilla (islas de Astro donde aplique).
- **Deploy:** Vercel o GitHub Pages (por definir; no bloquea el desarrollo).

---

## 2. Design tokens

Definir como CSS custom properties globales. Copiar tal cual:

```css
:root {
  /* Roses */
  --rose-strong: #BF777F;
  --rose:        #D28990;
  --rose-soft:   #E7B3B8;
  /* Base */
  --bg:          #F7F1E8;  /* cream background */
  --gold:        #C8A96B;  /* gold, decorative only */
  --ink:         #65423E;  /* ink / main text */

  /* Typography */
  --font-title: 'Cinzel', serif;
  --font-body:  'Jost', sans-serif;
}
```

---

## 3. Reglas de contraste (IMPORTANTE)

Medido sobre el fondo crema `#F7F1E8`. Respetar estrictamente para legibilidad
en teléfono a plena luz:

| Color | Ratio sobre crema | Uso permitido |
|---|---|---|
| `#65423E` (ink) | ~7.8:1 | **Cualquier texto**, incluso el más pequeño |
| `#BF777F` (rose-strong) | ~3.0:1 | **Solo texto grande y en negrita** (títulos, horas, nombres de sede) |
| `#D28990` (rose) | <3:1 | **Solo decorativo** (dividers, acentos) — nunca texto |
| `#E7B3B8` (rose-soft) | <3:1 | **Solo decorativo** (fondos tenues, ornamentos) |
| `#C8A96B` (gold) | <3:1 | **Solo decorativo** (líneas, dividers, ornamentos) |

**Regla práctica:** todo dato que la gente necesita leer (direcciones, horarios,
texto corrido) va en `--ink`. El rosa fuerte se reserva para títulos grandes y
acentos. Dorado y rosas medio/suave: exclusivamente decoración, jamás texto.

---

## 4. Tipografía

- **Cinzel** → títulos, nombre, datos destacados (horas, fecha, nombres de sede).
  Pesos 400/500/600/700. Es solo mayúsculas y **no tiene itálica**.
- **Jost** → la cita/frase y cualquier texto corrido. Pesos 300/400/500.

Auto-hospedar con **@fontsource** (evita request externo, funciona offline,
carga más rápido que Google Fonts):

```bash
npm i @fontsource/cinzel @fontsource/jost
```

```ts
// in the base layout
import '@fontsource/cinzel/400.css';
import '@fontsource/cinzel/600.css';
import '@fontsource/cinzel/700.css';
import '@fontsource/jost/300.css';
import '@fontsource/jost/400.css';
import '@fontsource/jost/500.css';
```

---

## 5. Estructura de archivos (orientativa)

```
src/
  pages/
    index.astro           # assembles the sections
  layouts/
    Base.astro            # <html>, <head>, meta/OG, fonts, tokens
  components/
    Hero.astro
    Quote.astro
    EventDate.astro
    Countdown.astro       # island with JS
    Venue.astro           # reusable: ceremony and reception
    BetweenVenues.astro   # 5-min notice + route
    Godparents.astro      # renders from data/godparents.ts
    Contact.astro         # WhatsApp
    Closing.astro         # closing line + add to calendar
    Button.astro          # reusable button (outline / solid variants)
  data/
    event.ts              # event data (dates, venues, texts)
    godparents.ts         # extensible godparents list
  styles/
    tokens.css            # the variables from section 2
public/
  celebrant.webp          # quinceañera illustration (provided by Hugo)
  bouquet.webp            # floral bouquet (provided by Hugo)
  event.ics               # calendar file
  og.jpg                  # share preview image
  favicon.svg
```

---

## 6. Datos del evento

Centralizar en `data/event.ts` para no tener strings sueltos en el markup.
Las **claves van en inglés**; los **valores en español** (los ve el invitado).

```ts
export const event = {
  celebrant: 'Areli Edith',
  title: 'Mis XV Años',
  quote: 'Hay momentos que pasan en un instante y recuerdos que permanecen eternamente. Quiero que formes parte de este.',
  date: {
    weekday: 'Sábado',
    day: '05',
    month: 'Diciembre',
    year: '2026',
    // countdown target — see section 8.1
    iso: '2026-12-05T18:00:00-06:00',
  },
  ceremony: {
    time: '6:00 PM',
    venue: 'San Antonio de Padua',
    address: 'C. Fray Sebastián de Aparicio 301, Virrey Antonio de Mendoza, Morelia',
    mapsQuery: 'San Antonio de Padua Fray Sebastián de Aparicio 301 Morelia Michoacán',
  },
  reception: {
    time: '7:00 PM',
    venue: 'Salón Sol y Luna',
    address: 'Benito Muñoz 471, Unión, 58226 Morelia, Mich.',
    mapsQuery: 'Salón Sol y Luna Benito Muñoz 471 Unión 58226 Morelia Michoacán',
  },
  closing: 'Te espero para celebrar juntos este gran día.',
  // ⚠️ PLACEHOLDER — replace with the real number before publishing
  whatsapp: '524431234567', // format: 52 + area code + number, no symbols
};
```

```ts
// data/godparents.ts — extensible list
export interface Godparent {
  role: string;
  names: string;
}

export const godparents: Godparent[] = [
  // ⚠️ PLACEHOLDER — replace with real names
  { role: 'Padrinos de Honor', names: 'Roberto Guzmán y María Elena Torres' },
  // To add more groups, just append objects here:
  // { role: 'Padrinos de Vals',  names: '...' },
  // { role: 'Padrinos de Ramo',  names: '...' },
];
```

El componente `Godparents.astro` itera con `.map()` sobre este array; agregar
grupos nuevos no requiere tocar el markup.

---

## 7. Funcionalidades

### Confirmadas (implementar)
1. **Cuenta regresiva** al 5 dic 2026, 6:00 PM.
2. **Cómo llegar — Iglesia** (enlace a Google Maps).
3. **Cómo llegar — Salón** (enlace a Google Maps).
4. **Agregar al calendario** (archivo `.ics`).
5. **Contacto por WhatsApp** (para dudas; NO es confirmación de asistencia).
6. **Sección de padrinos** (extensible desde `data/godparents.ts`).
7. **Aviso entre sedes** ("5 min de la iglesia al salón") + botón de ruta.

### Fase 2 (dejar la estructura preparada, no implementar aún)
- **Itinerario** de la noche (línea de tiempo).
- **Galería** de fotos.

Diseñar el layout de modo que sumar estas dos secciones después sea agregar un
componente, sin reestructurar.

### Decisiones pendientes con la familia (no bloquean)
- **Código de vestimenta** — si aplica, es un renglón.
- **Mesa de regalos / lluvia de sobres** — si aplica, es un bloque corto.

Ambas son de lo que más se pregunta en un XV; dejar el hueco previsto por si se
deciden a incluirlas.

---

## 8. Secciones (orden de scroll)

1. **Hero** — eyebrow "Mis XV Años", ramillete floral, **"Areli Edith"** en
   Cinzel grande (rose-strong), divider dorado ornamental, e **ilustración de la
   quinceañera** como pieza central (protagonista visual del hero).
2. **Cita** — la frase en Jost, caja baja, mucho aire.
3. **Fecha** — "Sábado" / "05" grande en Cinzel / "Diciembre 2026" en pill con borde.
4. **Cuenta regresiva** — 4 celdas: Días / Horas / Min / Seg.
5. **Ceremonia** — 6:00 PM · San Antonio de Padua · dirección · botón "Cómo llegar".
6. **Recepción** — 7:00 PM · Salón Sol y Luna · dirección · botón "Cómo llegar".
7. **Aviso entre sedes** — tarjeta tenue: "Solo 5 minutos de la iglesia al salón"
   + botón "Ver ruta iglesia → salón".
8. **Padrinos** — encabezado + grupos desde el array.
9. **Contacto** — "¿Tienes dudas?" + botón de WhatsApp.
10. **Cierre** — la frase de despedida + botón "Agregar al calendario".

> **Nota de layout:** en el diseño físico la ilustración va lateral (columna
> izquierda). En móvil no cabe lado a lado, así que va apilada bajo el nombre.
> El hero funciona como "portada" y al hacer scroll se despliega lo funcional.

---

## 8.1 Detalles de los interactivos

### Cuenta regresiva
Objetivo: `2026-12-05T18:00:00-06:00`.

> **Michoacán no aplica horario de verano desde 2022**, así que está fijo en
> **UTC−6 todo el año**. Hardcodear el offset `-06:00` es lo correcto y evita
> bugs de zona horaria.

```js
const target = new Date('2026-12-05T18:00:00-06:00').getTime();
function tick() {
  const diff = target - Date.now();
  if (diff <= 0) { /* show 00:00:00:00 */ return; }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff % 86400000 / 3600000);
  const m = Math.floor(diff % 3600000 / 60000);
  const s = Math.floor(diff % 60000 / 1000);
  // paint d, h (2 digits), m (2 digits), s (2 digits)
}
tick();
setInterval(tick, 1000);
```

### Google Maps — "Cómo llegar"
Usar la Maps URL API (abre la app nativa en el teléfono, sin API key ni iframe).
**Incluir "Morelia Michoacán"** en la query de la iglesia para no caer en otro
"San Antonio de Padua" del país.

```
https://www.google.com/maps/search/?api=1&query=<URL_ENCODED_QUERY>
```

### Google Maps — Ruta iglesia → salón
```
https://www.google.com/maps/dir/?api=1&origin=<CHURCH_ENCODED>&destination=<VENUE_ENCODED>
```

### WhatsApp
```
https://wa.me/<52AREACODENUMBER>?text=<URL_ENCODED_MESSAGE>
```
Mensaje sugerido (español): *"Hola, tengo una duda sobre los XV de Areli Edith"*.

### Agregar al calendario (.ics)
Servir un archivo estático desde `public/event.ics`. Ojo: las horas en `.ics`
van en **UTC**; 6:00 PM CST (−6) = **00:00 UTC del día siguiente** (6 dic).
Los valores `SUMMARY`/`DESCRIPTION`/`LOCATION` van en **español** (los ve el
invitado en su calendario).

```ics
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//XV Areli Edith//ES
CALSCALE:GREGORIAN
BEGIN:VEVENT
UID:xv-areli-2026@areli-edith
DTSTAMP:20260101T000000Z
DTSTART:20261206T000000Z
DTEND:20261206T060000Z
SUMMARY:XV Años de Areli Edith
DESCRIPTION:Ceremonia 6:00 PM San Antonio de Padua · Recepción 7:00 PM Salón Sol y Luna
LOCATION:San Antonio de Padua\, Morelia\, Michoacán
END:VEVENT
END:VCALENDAR
```

Botón: `<a href="/event.ics" download>`. En un sitio real (no en un preview
sandbox) esto descarga el archivo y el teléfono ofrece agregarlo al calendario.

---

## 9. Diseño y UX

- **Contenedor:** móvil-first, columna centrada de ~432px máx. En pantallas
  grandes se centra como una tarjeta sobre un fondo ligeramente más oscuro que
  el crema, con sombra suave y esquinas redondeadas. Marco interior de 1px en
  rosa translúcido (evoca el borde del diseño físico).
- **Alineación:** centrada en todas las secciones (coherente con la invitación física).
- **Jerarquía:** el nombre "Areli Edith" y la ilustración de la quinceañera son el
  foco; todo lo demás, disciplinado y quieto.
- **Animación:** un solo momento orquestado — entrada del hero con fade-up
  escalonado (eyebrow → ramillete → nombre → divider → ilustración). Opcional:
  caída de pétalos **muy sutil** de fondo (pocos, lentos, baja opacidad).
  Nada de fade-in en cada sección ni hover en cada card.
- **`prefers-reduced-motion`:** apaga la entrada y los pétalos.
- **`color-scheme: light`:** forzar apariencia clara; definir colores explícitos
  para que el modo oscuro del visor no invierta la paleta.

---

## 10. Assets

Hugo provee la **ilustración de la quinceañera** y el **ramillete floral**
(recortados del diseño original).

- **Formato ideal:** PNG con transparencia (o WebP) para que la ilustración se
  integre sobre el fondo crema sin borde de recuadro.
- **Optimizar:** exportar a WebP; la ilustración de la quinceañera es el asset
  más pesado, apuntar a que el sitio cargue en **< 1s en 4G**.
- **Ubicación en el diseño:**
  - Quinceañera (`celebrant.webp`) → pieza central del hero (bajo el nombre y el divider).
  - Ramillete (`bouquet.webp`) → sobre el nombre / como acento en encabezados si se quiere.
- Añadir `alt` descriptivo a la ilustración; los ornamentos decorativos van con
  `alt=""` (o `aria-hidden`).

---

## 11. Pulido y calidad

- **Open Graph** en el `<head>` para que el link se vea como tarjeta bonita al
  pegarlo en WhatsApp (crítico, porque ese es el canal principal). El texto de
  `content` va en español:
  ```html
  <meta property="og:title" content="XV Años de Areli Edith · 05 Dic 2026">
  <meta property="og:description" content="Acompáñanos a celebrar. Toca para ver los detalles.">
  <meta property="og:image" content="<ABSOLUTE_URL>/og.jpg">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
  ```
- **Favicon:** un pétalo o la inicial (SVG).
- **Accesibilidad:** foco visible por teclado, `alt` en imágenes, contraste de la
  sección 3, `prefers-reduced-motion` respetado.
- **Performance:** imágenes en WebP, `loading` apropiado, evitar librerías pesadas.
- **Meta viewport** con `viewport-fit=cover` y manejo de `safe-area-inset` si se
  abre a pantalla completa.

---

## 12. Deploy (cuando toque)

- **Vercel:** deploy directo del repo, dominio `*.vercel.app` o propio.
- **GitHub Pages:** si el repo no está en la raíz del dominio, configurar
  `base` y `site` en `astro.config.mjs`, y revisar que las rutas de assets
  respeten ese `base`.

---

## 13. Checklist antes de publicar

- [ ] Reemplazar número de WhatsApp real (`data/event.ts`).
- [ ] Reemplazar nombres reales de padrinos (`data/godparents.ts`).
- [ ] Integrar la ilustración de la quinceañera y el ramillete (WebP/PNG optimizado).
- [ ] Generar la imagen `og.jpg` para el preview de WhatsApp.
- [ ] Verificar los enlaces de Maps (iglesia, salón, ruta) en un teléfono real.
- [ ] Probar el `.ics` en iPhone y Android.
- [ ] Confirmar con la familia: ¿dress code? ¿mesa de regalos?
- [ ] Probar el countdown y revisar contraste a plena luz en móvil.
