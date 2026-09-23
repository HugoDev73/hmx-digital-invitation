# Convenciones para proyectos Astro

Documento vivo de buenas prácticas, destilado de dos proyectos previos:
`hmx-personal-web` (A) y `hmx-xula-website` (B, más reciente). Donde ambos
coinciden, la convención es firme. Donde difieren, se adopta la versión de B
por ser la iteración más madura, salvo que se indique lo contrario. Los
huecos que ninguno de los dos resolvió quedan marcados como **decisión
nueva**.

> **Convención de idioma** (heredada de `spec-project.md`): código en inglés
> (identificadores, nombres de archivo, props, comentarios); español solo en
> el contenido que ve el usuario final.

---

## 1. Estructura de carpetas

```
src/
  components/
    layout/      # Header, Footer — chrome del sitio
    sections/    # bloques de página, uno por sección de scroll
    ui/          # primitivas reutilizables: Button, Card, SectionHeader...
  config/        # datos estructurales del sitio: nav, social, site meta
  content/       # astro:content — contenido largo/repetible (blog, etc.)
  content.config.ts
  layouts/       # BaseLayout.astro, layouts especializados
  pages/
  styles/
    base.css       # reset, scroll-behavior, focus-visible, reduced-motion
    tokens.css     # custom properties — ver sección 4
    utilities.css  # clases u-* reutilizables
  types/         # tipos transversales (ej. SeoProps)
  utils/         # helpers transversales (ej. schema.ts para JSON-LD)
```

- `components/{layout,sections,ui}` es firme en ambos proyectos.
- Si el sitio no tiene contenido largo/repetible (blog, productos), se omite
  `content/` y `content.config.ts` — no crear collections vacías.
- Datos estructurales (nav, social, textos del evento/sitio) van en TS plano
  bajo `config/` (o `data/` si el proyecto ya usa ese nombre) — nunca hay que
  forzar content collections para esto.

---

## 2. Naming

| Elemento | Convención |
|---|---|
| Archivos de componente | PascalCase (`Button.astro`) |
| Archivos `.ts` de datos/utils | camelCase (`site.ts`, `schema.ts`) |
| Rutas de página | kebab-case, en el idioma del contenido |
| Props | `type Props = {...}` — **nunca** `interface Props` |
| Clases CSS de componente | BEM: `block__element--modifier` |
| Clases utilitarias | prefijo `u-` (`.u-container`, `.u-eyebrow`) |
| Custom properties CSS | kebab-case por familia: `--color-*`, `--text-*`, `--space-*`, `--radius-*`, `--weight-*`, `--leading-*`, `--tracking-*`, `--shadow-*`, `--transition-*` |
| Config tipada | `satisfies Type`, no `as const` ni anotación manual |

---

## 3. Patrones de componente

- Props: `const { foo, bar = false } = Astro.props;` con defaults por
  desestructuración, tipado con `type Props`.
- Clases condicionales: siempre `class:list={[...]}`, nunca template strings
  concatenados a mano.
- **Prioridad alta:** promover patrones repetidos a componentes reales desde
  el día uno, no clases utilitarias sueltas repetidas por sección — ej.
  `Button.astro` (variant, href, label, ariaLabel) y `SectionHeader.astro`
  (eyebrow, title, description, align). A repetía este markup a mano en
  cada sección; el costo aparece después, cuando un ajuste de diseño obliga
  a tocar N archivos en vez de uno. Cualquier elemento que se repita 2+
  veces en el diseño (botones, dividers, pills) es candidato inmediato.
- Componentes que consumen content collections: `type Props = { entry:
  CollectionEntry<"nombre"> }`, desestructurando `entry.data` adentro.
- Composición: página = layout + lista ordenada de componentes de
  `sections/`, cada uno autocontenido con su propio `<style>`.
- Interactividad: `<script>` vanilla dentro del componente, hooks vía
  `data-*`, guards `instanceof HTMLElement` antes de tocar el DOM, estado
  ARIA manejado a mano (`aria-expanded`, `aria-hidden`). Sin frameworks de
  islas (React/Vue/Svelte) salvo que el proyecto lo justifique explícitamente.
- Si el sitio usa View Transitions (`<ClientRouter />`), reenganchar los
  scripts de interactividad en `astro:page-load`, no solo en el load inicial.

---

## 4. Estilos y tokens

- Sin Tailwind, sin CSS Modules, sin CSS-in-JS — CSS nativo con custom
  properties, scoped `<style>` por componente.
- `tokens.css` es el punto de entrada del sistema de diseño, importado una
  vez desde `base.css`/`global.css`, importado una vez desde el layout base.
- Para proyectos con paleta rica: separar en `styles/tokens/` con un archivo
  por concern (`colors.css`, `typography.css`, `spacing.css`, `shape.css`,
  `motion.css`, `themes.css` para alias semánticos sobre los primitivos).
  Para proyectos simples: un solo `tokens.css` plano está bien.
- Derivar estados (hover, etc.) con `color-mix()` en vez de hardcodear un
  segundo color.
- Reset base a copiar tal cual: box-sizing global, `scroll-behavior:
  smooth`, anillo de foco con `:focus-visible` token-driven, media query
  `prefers-reduced-motion: reduce`.
- `color-scheme` explícito cuando el sitio no soporta modo oscuro, para que
  el visor no invierta la paleta.
- **No replicar scaffolding sin usar.** A deja tokens de modo oscuro
  preparados (`[data-theme="light"]`, comentado como "reservado para
  futuro") que nunca se aplican. Si el proyecto no tiene modo oscuro en el
  alcance actual, no dejar esa capa muerta — es CSS que nadie ejercita y
  contradice la regla de no diseñar para requisitos hipotéticos. Añadirla
  el día que realmente se implemente.

---

## 5. TypeScript

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- Sin overrides de `compilerOptions`, sin path aliases — imports relativos.
  (Si un proyecto concreto quiere `@/*`, es una decisión nueva explícita, no
  continuidad de práctica previa.)
- Colocar el tipo junto al dato que describe (`Project` en `projects.ts`) en
  vez de un `types.ts` gigante. Un `types/` dedicado solo para lo realmente
  transversal (ej. `SeoProps`).
- Con content collections, dejar que `CollectionEntry<"x">` infiera el tipo
  desde el schema de zod — no duplicar la interface a mano.

---

## 6. Astro config

```js
// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://dominio-real.com', // usar Astro.site, no una constante propia
});
```

- **Prioridad alta — decisión nueva:** configurar `site` (y `base` si
  aplica) en `astro.config.mjs` y consumir `Astro.site` para URLs
  canónicas/OG, en vez de hardcodear la URL en un archivo de config aparte
  (gap detectado en B: arma las URLs absolutas a mano con
  `new URL(path, siteConfig.url)`). Es lógica que Astro ya resuelve nativo;
  duplicarla se rompe en cuanto hay un dominio de preview/staging distinto
  al de producción, y cualquier sitio que necesite `og:image` con URL
  absoluta depende de que esto esté bien resuelto desde el config.
- Sin integraciones ni adapter salvo que el proyecto lo requiera (build
  estático por defecto).

---

## 7. Assets

- `public/` para imágenes/favicons, agrupadas por rol o dominio
  (`public/images/{brand,...}`).
- **Prioridad alta — decisión nueva:** usar `astro:assets` (`<Image />`)
  para optimización automática (WebP/AVIF, tamaños responsivos) en vez de
  `<img>` con `src` string. Ninguno de los dos proyectos previos lo usa, así
  que no hay patrón que copiar, pero es la mejora de mayor impacto para
  sitios con presupuesto de performance ajustado (ej. imagen protagonista
  pesada + objetivo de carga en 4G): automatiza justo el trabajo que a mano
  se hace de forma inconsistente.
- Si por algún motivo no se adopta `<Image />`, fijar `width`/`height` y
  `loading="lazy"` a mano en **cada** `<img>` sin excepción — B lo hace de
  forma consistente, A no, y esa inconsistencia causa salto de layout (CLS)
  en conexiones lentas. No es un matiz de estilo, es un defecto medible.
- Iconos: si hay set propio de iconos SVG, considerar el patrón de A
  (`AssetIcon.astro`, ícono como CSS mask recoloreable vía `currentColor`)
  en vez de inlinear SVGs sueltos.
- `alt` descriptivo en imágenes de contenido; `alt=""`/`aria-hidden` en
  ornamentos decorativos.

---

## 8. Huecos sin precedente (decidir por proyecto)

Ninguno de los dos proyectos de referencia resolvió esto — no hay
convención previa que continuar, son decisiones nuevas:

- **Lint/format — prioridad media:** no hay ESLint/Prettier/EditorConfig en
  ninguno, y se nota: hay typos en nombres de archivo y en mensajes de
  commit ("sopecialties", "ro asset icon"). Introducir Prettier +
  `prettier-plugin-astro` desde el inicio es barato; introducirlo después
  con código ya escrito no lo es.
- **Commits — prioridad media:** B empezó con Conventional Commits (`feat:`,
  `chore:`) y lo abandonó en los últimos commits. La convención a medias es
  peor que no tener ninguna (rompe la expectativa del historial). Si se
  adopta, comprometerse desde el primer commit, opcionalmente reforzado con
  `commitlint`; si no, no fingir que se está usando.
- **Accesibilidad/performance automatizados — prioridad baja/media según el
  proyecto:** ninguno de los dos corre Lighthouse CI ni axe-core. Para un
  sitio con reglas de contraste estrictas o requisito de
  `prefers-reduced-motion` explícito, un check automatizado evita que una
  regresión pase sin que nadie la note en revisión manual. Para un sitio
  simple sin esos requisitos, es prescindible.
- **README:** ninguno personalizó el README default de Astro — el proyecto
  nuevo debería tener uno real.
- **Modo oscuro:** ninguno lo implementa. A deja los tokens preparados
  (`[data-theme="light"]` reservado) pero sin uso real — ver nota en
  sección 4 sobre no replicar ese scaffolding si no hace falta.

---

## 9. package.json / entorno

```json
{
  "engines": { "node": ">=22.12.0" },
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  }
}
```

Mantener dependencias mínimas: Astro solo, sin devDependencies hasta que una
necesidad concreta las justifique (lint/format cuenta como justificación,
ver sección 8).
