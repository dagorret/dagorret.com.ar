# Opciones de Arquitectura para Componentes Interactivos (Lab)

Este documento describe las tres alternativas técnicas disponibles para implementar simulaciones, calculadoras o gráficos interactivos en el proyecto Astro, detallando el comportamiento de navegación y la gestión del ciclo de vida de JavaScript en cada caso.

---

## Opción 1: Apagar `ClientRouter` y volver a MPA clásico

Esta opción elimina la capa de Single Page Application (SPA) en todo el sitio, regresando al modelo estándar de Multi-Page Application (MPA).

### Implementación
En el archivo `src/layouts/Layout.astro`, remover la etiqueta del router en el `<head>`:

```astro
---
// Eliminar o comentar la importación:
// import { ClientRouter } from 'astro:transitions';
---
<head>
  <!-- Eliminar o comentar la directiva: -->
  <!-- <ClientRouter /> -->
</head>
```

### Características
* **Comportamiento del navegador:** Cada cambio de ruta realiza una navegación tradicional. La ventana del navegador destruye por completo el DOM, la memoria, variables de JavaScript y temporizadores previos antes de cargar la nueva URL.
* **Escritura de scripts:** Se puede usar JavaScript estándar sin patrones especiales. Scripts planos o escuchas tradicionales (`DOMContentLoaded`, `window.onload`) funcionan sin necesidad de limpieza manual.
* **Rendimiento:** Al mantener las tipografías locales y los recursos compilados estáticamente en Cloudflare Pages, el tiempo de respuesta sigue siendo rápido; la única diferencia visual es el refresco convencional entre páginas.

---

## Opción 2: Usar Custom Elements nativos (Web Components)

Esta opción mantiene activa la navegación SPA con `ClientRouter` en todo el sitio, delegando la gestión de montaje y desmontaje directamente al estándar de Web Components del navegador.

### Implementación
Encapsular el interactivo dentro de una etiqueta personalizada y extender `HTMLElement`:

```html
<!-- src/components/lab/MiLab.astro -->
<mi-lab>
  <div class="panel">
    <button data-action="iniciar">Iniciar</button>
    <canvas id="lienzo" width="400" height="200"></canvas>
  </div>
</mi-lab>

<script>
  class MiLab extends HTMLElement {
    private timer: number | null = null;

    // Se ejecuta de forma nativa al montarse en el DOM
    connectedCallback() {
      const boton = this.querySelector('[data-action="iniciar"]');
      boton?.addEventListener('click', () => {
        this.timer = window.setInterval(() => {
          // Lógica recurrente o actualización visual
        }, 100);
      });
    }

    // Se ejecuta de forma nativa al salir de la página o removerse del DOM
    disconnectedCallback() {
      if (this.timer !== null) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  }

  if (!customElements.get('mi-lab')) {
    customElements.define('mi-lab', MiLab);
  }
</script>
```

### Características
* **Gestión autónoma:** No requiere suscripción manual a los eventos propios de Astro (`astro:page-load` o `astro:before-swap`).
* **Seguridad de memoria:** `disconnectedCallback` asegura que temporizadores, listeners o bucles de `requestAnimationFrame` se apaguen automáticamente cuando el usuario cambia de ruta.
* **Experiencia de usuario:** Conserva la navegación instantánea y fluida entre ensayos y secciones.

---

## Opción 3: Desactivar el router exclusivamente en las páginas de Lab

Esta opción conserva la navegación rápida tipo SPA en todas las secciones editoriales y artículos de texto, pero desactiva intencionalmente el router al acceder a experimentos del Lab.

### Implementación
Agregar la directiva `data-astro-reload` en los enlaces que apunten a los Labs:

```html
<!-- Enlace en la navegación o dentro de un artículo -->
<a href="/lab/mi-experimento" data-astro-reload>
  Abrir simulación
</a>
```

Para forzar la salida con recarga completa al regresar del Lab al blog, los enlaces de retorno dentro de la plantilla del Lab también deben incluir el atributo:

```html
<a href="/writing" data-astro-reload>
  ← Volver a Ensayos
</a>
```

### Características
* **Aislamiento por ruta:** El navegador ejecuta una recarga convencional únicamente al entrar o salir del Lab, reseteando la memoria por completo.
* **Escritura libre en el componente:** Los scripts del interactivo pueden escribirse como código imperativo tradicional sin riesgo de fugas de memoria en el resto de la navegación.
* **Preservación general:** Los más de 500 artículos de contenido escrito continúan navegando de manera instantánea mediante el router en memoria.
