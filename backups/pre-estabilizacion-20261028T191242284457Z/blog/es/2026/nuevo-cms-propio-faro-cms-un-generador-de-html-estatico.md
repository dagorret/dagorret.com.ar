---
title: "Nuevo CMS propio: Faro CMS, un generador de HTML estático"
date: 2026-08-09
slug: "nuevo-cms-propio-faro-cms-un-generador-de-html-estatico"
translation_key: "nuevo-cms-propio-faro-cms-un-generador-de-html-estatico"
lang: "es"
categories: ["Tecnología"]
tags: ["CMS","generador estático","HTML","php","SSG"]
---

**Después de años publicando sobre tecnología con herramientas de otros, llegó el momento de construir la mía. Faro CMS separa la gestión del contenido de su publicación y convierte cada entrada en HTML estático listo para ser servido directamente por Nginx. El resultado: menos piezas, menos recursos y una web que vuelve a ser simple.**

Durante años este sitio funcionó sobre WordPress. Cumplió su función y la cumplió bien. Pero con el tiempo apareció una pregunta inevitable: ¿cuánta infraestructura hace falta realmente para publicar un blog?

Para mostrar un artículo, WordPress pone en movimiento PHP, una base de datos, plugins, temas, cachés y distintas capas de optimización. Es una arquitectura perfectamente razonable para muchos sitios, pero empezó a parecerme excesiva para algo que, una vez publicado, cambia muy poco.

Un artículo es contenido. Y, una vez terminado, puede ser simplemente un archivo HTML.

De esa idea nació **Faro CMS**.

## Qué es Faro CMS

Faro es un CMS propio construido sobre Laravel y Filament.

Laravel proporciona la base de la aplicación y Filament la interfaz de administración. Desde allí puedo escribir y editar artículos, administrar categorías, páginas, medios y el resto de la información necesaria para construir el sitio.

Pero Faro introduce una separación importante entre **administrar** y **publicar**.

El CMS no atiende las visitas del sitio público.

Cuando se ejecuta el proceso de construcción, Faro toma el contenido almacenado, lo procesa y genera una distribución estática completa:

```
Faro CMS
  ├── Laravel + Filament
  ├── SQLite
  └── Build
        ↓
      dist/
        ├── index.html
        ├── articulo/index.html
        ├── category/...
        ├── archive/...
        ├── sitemap.xml
        ├── feed.xml
        ├── robots.txt
        ├── JSON
        └── assets
```

Ese directorio `dist` es el sitio público.

Nginx lo sirve directamente.

Cuando alguien entra a `dagorret.com.ar`, no se inicia Laravel, no se consulta SQLite y no se ejecuta PHP para construir la página.

El camino es esencialmente:

```
Visitante → Nginx → archivo HTML
```

Eso es Faro.

## ¿Por qué construir otro CMS?

No porque al mundo le faltaran gestores de contenidos.

Lo hice porque quería experimentar con una arquitectura diferente.

La mayor parte de un blog es contenido que cambia únicamente cuando su autor decide modificarlo. Sin embargo, los CMS tradicionales suelen reconstruir dinámicamente una respuesta ante cada solicitud, aunque el resultado sea idéntico al entregado segundos antes.

La alternativa es trasladar ese trabajo al momento de publicación.

Faro hace el trabajo costoso una vez.

Renderiza las entradas, genera índices, navegación, archivos JSON, portada, feed, sitemap, página 404 y publica los assets necesarios. A partir de ese momento, el servidor web solo tiene que entregar archivos.

Hay además una consecuencia que me interesa especialmente: **la complejidad queda fuera del camino crítico del visitante**.

Puedo utilizar Laravel, Filament, Editor.js, SQLite y toda la comodidad de una aplicación moderna para administrar el sitio sin obligar a cada lector a atravesar esa infraestructura.

La aplicación puede ser compleja.

La publicación no tiene por qué serlo.

## El generador estático

Faro no consiste simplemente en exportar algunos archivos HTML.

El build funciona como un pequeño compilador del sitio.

La ejecución que llevó esta versión a producción procesó las entradas pendientes y después reconstruyó los componentes globales: esquemas JSON, portada, navegación progresiva, `feed.xml`, sitemap segmentado, `404.html` y el build de Vite.

Una ejecución completa sobre el contenido actual terminó así:

```
Tiempo total:            2,24 segundos
Pico de memoria:         48,5 MB
URLs del sitemap:        208
Registros procesados:    94
```

El VPS donde corre todo esto dispone de aproximadamente **950 MB de RAM** y, una vez funcionando el sistema, ronda los **135 MB utilizados**.

Es decir: queda una cantidad considerable de capacidad sin utilizar.

Y eso me gusta.

No porque 135 MB constituyan algún récord particularmente importante, sino porque demuestra que para publicar un sitio como éste no hace falta necesariamente una infraestructura grande.

### Rendimiento

La prueba más interesante no fue sobre este sitio de producción, sino sobre una carga sintética de **300.000 posts**, procesados en lotes de 1.000.

El registro conservado llega con certeza hasta **245.000 posts procesados**. En ese punto el generador llevaba:

```
245.000 posts
885,44 segundos
187,51 MB de memoria en uso
196,5 MB de pico
```

Algunos puntos intermedios de la misma corrida:

```
30.000 posts   → 100,99 s   | pico 74,5 MB
100.000 posts  → 341,02 s   | pico 114,5 MB
150.000 posts  → 515,47 s   | pico 142,5 MB
200.000 posts  → 720,52 s   | pico 170,5 MB
245.000 posts  → 885,44 s   | pico 196,5 MB
```

El rendimiento se mantuvo aproximadamente entre **275 y 295 posts por segundo**.

El dato más importante de aquella prueba no fue solamente la velocidad. Fue descubrir dónde aparecía realmente el límite.

Incluso cerca de un cuarto de millón de entradas, el proceso seguía por debajo de **200 MB de memoria de pico**. La RAM y la CPU no aparecían como el cuello de botella inmediato. En cambio, empezaban a pesar otros factores: **I/O de disco, cantidad de archivos e inodos del filesystem**.

La corrida no dejó registrada una línea final de 300.000 posts, por lo que no corresponde presentarla como una medición completa. Extrapolando la pendiente observada, los 300K habrían quedado aproximadamente en el orden de **18 minutos y 220–230 MB de RAM**, pero esos dos valores son una **proyección**, no una medición.

La conclusión práctica fue más interesante que el benchmark puntual: con una estrategia adecuada de generación, escritura por bloques y control de memoria, **1 o 2 millones de documentos no parecen un problema de RAM**, sino principalmente un problema de cómo organizar la escritura y el filesystem.

Eso es justamente uno de los objetivos de la próxima etapa de Faro: convertir el constructor completo en un **constructor diferencial**, capaz de regenerar solamente aquello que realmente cambió.

## Caché sin convertirla en arquitectura

También simplifiqué la estrategia de caché.

Los documentos HTML pueden permanecer en el navegador durante unos diez minutos. Imágenes, CSS, JavaScript y fuentes tienen una vida de caché mucho mayor, actualmente de treinta días.

En cambio, archivos como `sitemap.xml`, `feed.xml` y `robots.txt` permanecen sin caché persistente para que una nueva compilación pueda reflejarse inmediatamente.

No existe una compleja cadena de cachés intentando compensar una aplicación dinámica.

El recurso original ya es estático.

La caché vuelve a ser una optimización y no una condición necesaria para que el sistema sea rápido.

## Una separación que cambia bastante

Quizás lo que más me interesa de Faro no sean los números.

Es la separación conceptual.

El **CMS** es una herramienta privada de trabajo. Puede autenticar usuarios, consultar una base de datos, procesar imágenes, ejecutar comandos y consumir los recursos que necesite.

El **sitio**, en cambio, es el producto terminado.

No hay razón para que el visitante tenga que pagar computacionalmente por las herramientas que utilicé para producirlo.

Es una idea bastante antigua, en realidad: compilar primero y ejecutar después.

Aplicada a un CMS significa que escribir sigue siendo dinámico, pero leer vuelve a ser extraordinariamente simple.

## Conclusión

Faro CMS todavía es joven. Seguramente aparecerán errores, decisiones que revisar y funcionalidades que hoy ni siquiera están previstas.

Pero su primera versión en producción ya demuestra la idea que quería comprobar.

Puedo administrar un sitio con herramientas modernas, mantener una experiencia cómoda de edición y, al mismo tiempo, publicar un resultado compuesto esencialmente por archivos estáticos.

El build completo tarda unos segundos. El consumo del servidor es pequeño. PageSpeed se acerca al máximo. Y una visita pública termina reducida a algo casi trivial:

```
GET /articulo/
    ↓
  Nginx
    ↓
index.html
```

Después de años agregando capas para hacer más rápidas aplicaciones cada vez más complejas, Faro parte de la pregunta contraria:

**¿qué pasa si aquello que no necesita ser dinámico simplemente deja de serlo?**

Por ahora, la respuesta está sirviendo esta misma página.

![](/images/faro-cms.png)
