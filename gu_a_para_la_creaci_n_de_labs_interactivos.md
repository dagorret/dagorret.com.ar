# Guía Técnica: Creación de Componentes Interactivos en el Lab

Esta guía documenta los patrones y reglas arquitectónicas obligatorias para construir nuevas simulaciones, calculadoras o gráficos interactivos en el **Laboratorio** de `dagorret.com.ar`, garantizando compatibilidad total con la navegación instantánea tipo SPA provista por `ClientRouter` de Astro.

---

## 1. El Problema de Fondo: SPA vs. MPA

En un sitio estático clásico (MPA), cada cambio de página descarga un documento nuevo y el navegador destruye toda la memoria previa. Con `ClientRouter`:
* El documento HTML **nunca se destruye** por completo: solo se reemplaza el contenido del `<main>`.
* El evento `DOMContentLoaded` **no se vuelve a disparar** al navegar hacia el Lab desde otro artículo.
* Si un script crea un `setInterval`, `requestAnimationFrame` o añade listeners globales a `window` o `document`, **permanecen vivos en segundo plano** si no se destruyen explícitamente, provocando fugas de memoria y llamadas a elementos inexistentes.

---

## 2. Los Dos Patrones Permitidos

Para no sufrir al crear un experimento nuevo, elegí **uno** de estos dos métodos:

---

### Opción A: Web Component (Custom Element Nativo) — *Recomendada*
Es la solución más elegante y a prueba de fallos. El ciclo de vida lo gestiona el propio motor del navegador de forma automática.

#### Estructura básica (`MiLab.astro`):
```html
<simulador-onda data-velocidad="2.5">
  <div class="panel-controles">
    <button class="btn-play">Iniciar</button>
    <canvas class="canvas-grafico" width="600" height="300"></canvas>
  </div>
</simulador-onda>

<script>
  class SimuladorOnda extends HTMLElement {
    private animId: number | null = null;
    private canvas: HTMLCanvasElement | null = null;
    private btnPlay: HTMLButtonElement | null = null;

    // Se ejecuta automáticamente cuando el elemento entra al DOM
    connectedCallback() {
      this.canvas = this.querySelector('.canvas-grafico');
      this.btnPlay = this.querySelector('.btn-play');

      this.btnPlay?.addEventListener('click', this.iniciarAnimacion);
    }

    // Se ejecuta automáticamente cuando el usuario cambia de página (limpieza)
    disconnectedCallback() {
      if (this.animId) {
        cancelAnimationFrame(this.animId);
        this.animId = null;
      }
      this.btnPlay?.removeEventListener('click', this.iniciarAnimacion);
    }

    iniciarAnimacion = () => {
      const bucle = () => {
        // Lógica de cálculo y pintado en Canvas...
        this.animId = requestAnimationFrame(bucle);
      };
      this.animId = requestAnimationFrame(bucle);
    };
  }

  // Se registra solo una vez en la ventana global
  if (!customElements.get('simulador-onda')) {
    customElements.define('simulador-onda', SimuladorOnda);
  }
</script>
```

**Ventajas:**
1. No requiere escuchar eventos de Astro.
2. Si el usuario sale y vuelve a entrar, `connectedCallback` y `disconnectedCallback` limpian e inicializan todo automáticamente sin duplicar eventos.

---

### Opción B: Script Estándar con Ciclo de Vida Astro

Si preferís escribir JavaScript imperativo plano sin clases, debés usar **siempre** el evento `astro:page-load` junto con `astro:before-swap` para la desconexión.

#### Estructura básica (`MiLab.astro`):
```html
<div id="contenedor-lab">
  <button id="boton-accion">Calcular</button>
  <div id="resultado"></div>
</div>

<script>
  let timerId: number | null = null;

  function inicializarLab() {
    const contenedor = document.getElementById('contenedor-lab');
    if (!contenedor) return; // Si no estamos en la página del lab, abortar

    const boton = document.getElementById('boton-accion');
    boton?.addEventListener('click', onBotonClick);

    // Ejemplo de temporizador recurrente
    timerId = window.setInterval(() => {
      // Tareas periódicas...
    }, 1000);
  }

  function limpiarLab() {
    // Apagar temporizadores e intervalos
    if (timerId !== null) {
      clearInterval(timerId);
      timerId = null;
    }

    // Remover listeners si interactúan fuera del contenedor
    const boton = document.getElementById('boton-accion');
    boton?.removeEventListener('click', onBotonClick);
  }

  function onBotonClick() {
    console.log('Interacción ejecutada.');
  }

  // 1. Escuchar la carga de cada navegación SPA
  document.addEventListener('astro:page-load', inicializarLab);

  // 2. Escuchar el desmontaje antes del reemplazo del DOM
  document.addEventListener('astro:before-swap', limpiarLab);
</script>
```

---

## 3. Checklist Obligatorio Antes de Publicar un Lab

Antes de subir un nuevo experimento, verificar en el navegador con la consola abierta (`F12`):

- [ ] **Visita repetida:** Navegar al Lab, ir a un ensayo de *Writing*, presionar el botón «Atrás» del navegador y volver al Lab. ¿Los botones y controles siguen respondiendo?
- [ ] **Limpieza de timers:** Si hay animación o `setInterval`, verificar que al salir de la página no siga imprimiendo logs ni consumiendo CPU en la pestaña de *Performance*.
- [ ] **Scope de selectores:** Evitar `document.querySelector(...)` genéricos si pueden colisionar con otros elementos del layout. Usar identificadores únicos o buscar dentro del propio componente (`this.querySelector(...)`).
- [ ] **No usar `window.onload` ni `DOMContentLoaded`:** Reemplazarlos por `astro:page-load` o `connectedCallback()`.
- [ ] **Bibliotecas externas (Plotly, D3, KaTeX JS):** Si se importan librerías que manipulan el DOM, inicializarlas dentro del ciclo seguro y destruir las instancias en el desmontaje (`instance.destroy()`).

----

# Guía de Arquitectura: Cómo crear un Lab compatible con ClientRouter

## 1. El problema que resuelve esta guía

Astro con `<ClientRouter/>` funciona como una **SPA (Single Page Application)**: al hacer clic en un enlace interno, el navegador no recarga la página completa ni destruye la ventana. Solo reemplaza el HTML del cuerpo en memoria y actualiza la URL.

Esto produce dos efectos críticos en cualquier script interactivo:

1. **El evento clásico `DOMContentLoaded` ya no sirve:** solo se dispara la primera vez que el usuario entra al sitio desde la barra de direcciones o recarga con F5. Si el usuario navega desde otro artículo hacia el Lab, ese evento nunca vuelve a ejecutarse.

2. **Riesgo de fugas de memoria y listeners zombis:** si un Lab inicia un `setInterval`, un `requestAnimationFrame`, un canvas de simulación o un observador (`ResizeObserver` / `IntersectionObserver`), esos procesos siguen corriendo en segundo plano aunque el usuario haya cambiado de página. Si no se desconectan explícitamente, consumen memoria y causan errores al intentar manipular elementos que ya no existen en el DOM.

## 2. Los dos caminos para crear un Lab

Existen dos patrones técnicos para implementar interactividad. El **Patrón A (Custom Elements)** es el estándar recomendado porque el propio navegador gestiona el ciclo de vida de forma automática.

### Patrón A: Custom Elements nativos (Recomendado)

Los Web Components nativos se montan y desmontan solos cuando entran o salen del DOM, sin necesidad de escuchar eventos manuales de Astro.

#### Estructura de archivo: `src/components/lab/MiSimulacion.astro`

Code snippet

```
---
interface Props {
  titulo?: string;
}

const { titulo = "Simulación Interactiva" } = Astro.props;
---

<mi-simulacion class="lab-container">
  <h3>{titulo}</h3>
  <div class="controls">
    <button data-action="start">Iniciar</button>
    <button data-action="stop">Detener</button>
  </div>
  <canvas class="sim-canvas" width="600" height="300"></canvas>
</mi-simulacion>

<script>
  class MiSimulacion extends HTMLElement {
    private timerId: number | null = null;
    private canvas: HTMLCanvasElement | null = null;
    private ctx: CanvasRenderingContext2D | null = null;
    private startBtn: HTMLButtonElement | null = null;
    private stopBtn: HTMLButtonElement | null = null;

    // 1. Se ejecuta automáticamente cuando el elemento entra en pantalla
    connectedCallback() {
      this.canvas = this.querySelector('.sim-canvas');
      this.ctx = this.canvas?.getContext('2d') ?? null;
      this.startBtn = this.querySelector('[data-action="start"]');
      this.stopBtn = this.querySelector('[data-action="stop"]');

      this.startBtn?.addEventListener('click', this.iniciar);
      this.stopBtn?.addEventListener('click', this.detener);
    }

    // 2. Se ejecuta automáticamente cuando el usuario cambia de página
    disconnectedCallback() {
      this.detener();
      this.startBtn?.removeEventListener('click', this.iniciar);
      this.stopBtn?.removeEventListener('click', this.detener);
    }

    private iniciar = () => {
      if (this.timerId !== null) return;
      this.timerId = window.setInterval(() => {
        this.renderPaso();
      }, 100);
    };

    private detener = () => {
      if (this.timerId !== null) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
    };

    private renderPaso() {
      if (!this.ctx || !this.canvas) return;
      // Lógica de dibujo o cálculo...
    }
  }

  // Registrar el elemento únicamente si no fue registrado previamente
  if (!customElements.get('mi-simulacion')) {
    customElements.define('mi-simulacion', MiSimulacion);
  }
</script>

<style>
  .lab-container {
    display: block;
    border: 1px solid var(--border);
    background: var(--card-bg);
    border-radius: 8px;
    padding: 1.5rem;
    margin: 2rem 0;
  }
</style>
```

### Patrón B: Scripts clásicos con eventos de Astro

Si prefieres usar JavaScript plano sin clases ni Web Components, debes suscribirte a los eventos del ciclo de vida del router de Astro.

#### Estructura:

Code snippet

```
<div id="mi-experimento">
  <canvas id="lienzo"></canvas>
  <button id="btn-calcular">Calcular</button>
</div>

<script>
  let intervaloId: number | null = null;

  function inicializarLab() {
    const contenedor = document.getElementById('mi-experimento');
    // Salir de inmediato si este Lab no está presente en la página actual
    if (!contenedor) return;

    const boton = document.getElementById('btn-calcular');
    boton?.addEventListener('click', manejarCalculo);

    intervaloId = window.setInterval(() => {
      // Tarea periódica...
    }, 1000);
  }

  function limpiarLab() {
    // Apagar temporizadores y listeners antes de que el router reemplace el HTML
    if (intervaloId !== null) {
      clearInterval(intervaloId);
      intervaloId = null;
    }
    const boton = document.getElementById('btn-calcular');
    boton?.removeEventListener('click', manejarCalculo);
  }

  function manejarCalculo() {
    console.log("Calculando...");
  }

  // Se dispara cada vez que una página termina de cargar (entrada inicial o navegación SPA)
  document.addEventListener('astro:page-load', inicializarLab);

  // Se dispara justo antes de que el router reemplace el contenido para salir de la página
  document.addEventListener('astro:before-swap', limpiarLab);
</script>
```

## 3. Tabla de eventos del ciclo de vida en Astro

| **Evento**              | **Cuándo ocurre**                                                                  | **Uso principal**                                                                                    |
| ----------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **`astro:page-load`**   | Al final de la carga de la página (tanto al abrir F5 como en cada navegación SPA). | Inicializar gráficos, canvas, buscar elementos en el DOM y asociar eventos.                          |
| **`astro:before-swap`** | Justo antes de que el nuevo HTML reemplace al viejo en pantalla.                   | Desconectar `ResizeObserver`, cancelar animaciones `requestAnimationFrame` y limpiar temporizadores. |
| **`astro:after-swap`**  | Inmediatamente después de insertar el nuevo DOM, antes de que sea visible.         | Reaplicar clases de tema oscuro/claro si hiciera falta evitar destellos.                             |

## 4. Checklist rápido para revisar antes de publicar un Lab

1. [ ] **¿Hay llamadas a `window.addEventListener('DOMContentLoaded', ...)`?**

   *Si las hay, reemplázalas por `astro:page-load` o muévelas a un Custom Element.*

2. [ ] **¿Se limpian los bucles?**

   *Verifica que todo `setInterval`, `setTimeout` recurrente o `requestAnimationFrame` tenga su correspondiente `clearInterval` / `cancelAnimationFrame` al desmontar.*

3. [ ] **¿Se desconectan los observadores?**

   *Si usas `ResizeObserver` o `IntersectionObserver`, llama a `.disconnect()` en la fase de limpieza.*

4. [ ] **¿Se registra el Custom Element de forma segura?**

   *Usa siempre el guardián `if (!customElements.get('nombre-etiqueta')) { ... }` para evitar errores de doble registro en navegaciones repetidas.*
