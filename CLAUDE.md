# CLAUDE.md — dagorret.com.ar

Sitio personal de Carlos Dagorret: ensayos (blog) y laboratorios interactivos (Lab).
Astro 7, contenido en Markdown/MDX, bilingüe (es/en), desplegado en Cloudflare Pages
desde la rama `main`.

## Reglas de trabajo

- Nunca hagas `git push`, merge ni cambios en `main` sin preguntarme antes.
- Trabajá siempre en la rama en la que estoy parado. Commits chicos, con mensajes claros
  en español (`fix(lab): …`, `feat(lab): …`, `docs(lab): …`).
- Antes de terminar, corré `npm run build` y confirmá que compila.
- Al final de cada tarea, escribí un resumen breve en `INFORME.md` (no lo commitees):
  qué hiciste, qué archivos tocaste, cómo lo verifico y qué quedó pendiente.
- Si una decisión es de contenido o de criterio, decidí vos la opción razonable y
  explicámela en dos o tres líneas simples. No me hagas elegir entre opciones técnicas.

## Comandos

- Desarrollo: `astro dev --background` (gestionar con `astro dev stop | status | logs`).
- Build completo: `npm run build` (= `astro build && pagefind --site dist`).
- El buscador (Pagefind) solo funciona después del build: `npm run build && npm run preview`.

## Cómo está hecho un Lab (respetar este patrón)

Cada lab tiene dos versiones (es y en) y un componente:

- Contenido: `src/content/lab/es/<slug>.mdx` y `src/content/lab/en/<slug>.mdx`.
- Componente interactivo: `src/components/lab/<Nombre>.astro`, importado desde el MDX
  dentro de `<div className="figure-wide">…</div>`.
- Modelos a seguir: `OlsLab.astro` y `TimeSeriesLab.astro`.

Frontmatter obligatorio (schema en `src/content.config.ts`):
`title`, `description`, `slug`, `lang`, `translation_key` (igual en es y en),
`category` con formato "Área · Subárea" (ej. "Econometría · Mínimos cuadrados"),
`order`, `visual`, `status: "interactive"`.

- `visual` es un enum en `src/content.config.ts`: un lab nuevo necesita agregar su valor
  ahí y su miniatura en `src/components/LabIndex.astro`.

Ciclo de vida del JavaScript (importante):

- El sitio usa `ClientRouter` (navegación sin recarga). Por eso cada lab se monta con
  `onPageLoad(selector, setup)` de `src/lib/page-lifecycle.ts`.
- `setup` debe devolver una función de limpieza que apague timers, listeners y
  `requestAnimationFrame`. Así lo hacen los 8 labs actuales.
- `docs/lab.md` describe alternativas (MPA, Web Components, `data-astro-reload`) que
  NO se usan. No las apliques.

Otras reglas de los labs:

- Sin librerías externas de gráficos (nada de Chart.js, D3, etc.): SVG/canvas a mano.
- `data-pagefind-ignore` en el elemento raíz del componente; el texto del MDX sí se
  indexa (`data-pagefind-body` ya está en `LabExperiment.astro`).
- Simulaciones con generador aleatorio con semilla (resultados reproducibles).
- Tiene que verse bien en el celular.
- Fórmulas en el MDX con `$…$` y `$$…$$`; las fórmulas largas, partidas con
  `gathered` o `aligned`.

## Contenido (tono y criterio)

- Español rioplatense neutro en el cuerpo; la versión en inglés, en inglés
  norteamericano culto.
- Decir siempre qué es dato real y qué es ilustrativo o simulado. Advertencias sobre
  causalidad y límites del modelo, sin exagerar.
- Solo fuentes reales y verificables, enlazadas. Si no estás seguro de una fuente,
  decímelo en vez de inventarla.

## KaTeX (no tocar sin avisar)

- `katex` está fijado en `^0.16.47` con `overrides` en `package.json`, para coincidir con
  la versión que usa `rehype-katex` 7 (si no, el CSS no coincide y se rompen subíndices
  y raíces).
- No subas KaTeX a 0.17+ hasta que salgan `rehype-katex` y `micromark-extension-math`
  con soporte para KaTeX `^0.19`. Ver `todo_update.md`.
- La regla de `svg` en `Layout.astro` excluye los SVG de KaTeX
  (`svg:not(.katex *)`): no la cambies.
