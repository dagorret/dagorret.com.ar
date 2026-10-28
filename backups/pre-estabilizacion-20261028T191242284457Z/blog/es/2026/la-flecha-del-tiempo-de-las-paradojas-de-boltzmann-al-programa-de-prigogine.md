---
title: "La flecha del tiempo: de las paradojas de Boltzmann al programa de Prigogine"
date: 2026-08-16
slug: "la-flecha-del-tiempo-de-las-paradojas-de-boltzmann-al-programa-de-prigogine"
translation_key: "la-flecha-del-tiempo-de-las-paradojas-de-boltzmann-al-programa-de-prigogine"
lang: "es"
categories: ["Filosofía"]
tags: ["Boltzmann","Entropía","prigogine"]
---

### _Cuarto artículo de la serie Entropía: física, información, sociedad_

El primer artículo de esta serie dejó planteada, sin desarrollar, la pregunta filosófica que subyace a todo lo demás: si la irreversibilidad que describe el Segundo Principio es una propiedad óntica de la naturaleza —una asimetría real, tan fundamental como cualquier ley de conservación— o si es, en cambio, un efecto de nuestra ignorancia sobre los microestados exactos de un sistema, una limitación epistémica disfrazada de ley física.

Mencioné ahí las dos posiciones —la subjetivista de Jaynes y la realista de Prigogine— sin el aparato técnico que permite evaluarlas. Este cuarto artículo hace ese trabajo, con el mismo método que vengo aplicando desde el artículo 2: reconstruyo primero el problema con precisión matemática, y evalúo después, nivel por nivel de garantía epistémica, qué parte del programa de Prigogine está establecida y qué parte es una extrapolación filosófica que su propia autoridad científica —un Premio Nobel genuino, por un trabajo genuino— no alcanza a sostener.

* * *

## I. El problema exacto: dos objeciones al teorema H de Boltzmann

Boltzmann creyó haber demostrado, en 1872, algo más fuerte que una mera tendencia estadística: una prueba mecánica de la ley de aumento de entropía. Su teorema $H$ define una función

$$
H(t) = \int f(v,t) \ln f(v,t)\, dv
$$

sobre la distribución de velocidades $f$ de un gas diluido, y muestra, usando la ecuación de transporte que hoy lleva su nombre, que

$$
\frac{dH}{dt} \le 0
$$

siempre —$H$ solo puede decrecer o permanecer constante, y como la entropía es proporcional a $-H$, esto equivale a demostrar que la entropía crece monótonamente hasta el equilibrio—. La demostración se apoya en una hipótesis adicional, la _Stosszahlansatz_ o hipótesis del caos molecular, que asume que las velocidades de dos partículas que están por colisionar son estadísticamente independientes entre sí.

Dos objeciones, formuladas por contemporáneos de Boltzmann, mostraron que esa demostración no podía ser lo que él inicialmente creyó. Josef Loschmidt, en 1876, señaló el problema de reversibilidad: si las ecuaciones de Newton son invariantes bajo inversión temporal, entonces para toda trayectoria que hace crecer la entropía existe, por construcción, otra trayectoria igualmente legal —la que se obtiene invirtiendo todas las velocidades en un instante dado— que recorre exactamente la misma secuencia de estados en sentido inverso, y que por lo tanto hace decrecer la entropía.

Si el teorema $H$ fuera una consecuencia pura de la mecánica newtoniana, tendría que valer para ambas trayectorias, lo cual es contradictorio; luego, el teorema no puede ser una consecuencia pura de la mecánica.

Ernst Zermelo, veinte años después, añadió una objeción distinta y más radical: el teorema de recurrencia de Poincaré garantiza que cualquier sistema hamiltoniano aislado, con energía y volumen finitos, retorna —con probabilidad uno, aunque en general en un tiempo astronómicamente largo— a una configuración arbitrariamente cercana a su estado inicial. Si eso es así, ninguna cantidad puede decrecer monótonamente para siempre, porque tarde o temprano el sistema tiene que volver cerca de donde empezó, deshaciendo el aumento de entropía acumulado.

* * *

## II. La respuesta de Boltzmann: probabilidad, no necesidad mecánica

La respuesta madura de Boltzmann a ambas objeciones —que él mismo articuló con más cuidado después de la crítica de Zermelo que en su formulación original de 1872— es la que define, todavía hoy, el consenso dominante de la física estadística, y conviene enunciarla con precisión porque es exactamente el punto que Prigogine va a discutir después.

Boltzmann concedió que el teorema $H$ no es una necesidad mecánica: es una afirmación estadística sobre la inmensa mayoría de las condiciones iniciales, no sobre todas. Loschmidt tiene razón en que existen trayectorias que hacen decrecer la entropía —las que se obtienen invirtiendo las velocidades de una trayectoria que la hace crecer—, pero esas trayectorias forman un conjunto de medida extraordinariamente pequeña en el espacio de todas las condiciones iniciales posibles compatibles con el macroestado observado: son “atípicas” en un sentido que puede formalizarse con precisión.

Zermelo tiene razón en que el sistema recurre, pero el tiempo de recurrencia de Poincaré, para un sistema con el número de partículas de un gas macroscópico ($N \sim 10^{23}$), es de un orden de magnitud tan colosal —muy superior a la edad del universo— que la recurrencia es, a todo efecto práctico y observacional, irrelevante.

Esta idea, formalizada rigurosamente en el siglo veinte bajo el nombre de tipicidad —el trabajo de Joel Lebowitz es la referencia moderna estándar— sostiene que un comportamiento es típico si el conjunto de microestados que lo exhiben ocupa una fracción del volumen de fase que tiende a uno a medida que crece el número de partículas del sistema.

Con esta reformulación, el Segundo Principio deja de ser una ley mecánica estricta y pasa a ser una ley estadística de una robustez casi mecánica: no imposible de violar, pero violarla requeriría una condición inicial tan atípica que su probabilidad es, para cualquier propósito práctico, cero.

* * *

## III. El aporte real de Prigogine: termodinámica lineal, criterio de evolución, estructuras disipativas

Antes de entrar en la parte controvertida del programa de Prigogine, hay que fijar con la misma precisión el terreno donde su contribución es sólida, ampliamente reconocida, y la razón efectiva por la que recibió el Premio Nobel de Química en 1977 —no, como suele repetirse en la divulgación, por resolver el problema filosófico de la flecha del tiempo, sino por un cuerpo de trabajo técnico específico en termodinámica de procesos irreversibles—.

La primera etapa de ese trabajo, desarrollada desde los años cuarenta junto con su maestro Théophile de Donder, extiende la termodinámica clásica —que solo describe estados de equilibrio— a sistemas fuera del equilibrio pero cerca de él, formalizando la producción de entropía como una cantidad calculable a partir de los flujos irreversibles del sistema —fricción, viscosidad, conducción de calor y de electricidad, difusión, reacciones químicas— y sus fuerzas termodinámicas conjugadas.

La segunda etapa, formulada junto con Paul Glansdorff en 1954, extiende el análisis a sistemas lejos del equilibrio mediante un criterio general de evolución, y es este marco el que permite el resultado más célebre y menos disputado de todo el programa: las estructuras disipativas.

Un sistema abierto, sostenido lejos del equilibrio por un flujo constante de energía o materia que lo atraviesa, puede desarrollar espontáneamente patrones espaciales o temporales ordenados —los patrones de convección de Bénard, los relojes químicos como la reacción de Belousov-Zhabotinsky, los patrones de reacción-difusión— exportando entropía al entorno a una tasa suficiente para que su propio orden interno, lejos de violar el Segundo Principio, sea la consecuencia directa de una disipación intensa.

Este resultado está hoy incorporado sin controversia al núcleo de la física estadística de no equilibrio, se extiende con naturalidad a la materia activa y a sistemas biológicos, y es la base legítima de la afirmación que cerró el primer artículo de esta serie: que la vida es una tecnología de gestión de entropía, no una excepción al Segundo Principio.

* * *

## IV. La parte disputada: el intento de derivar la irreversibilidad como propiedad fundamental de la dinámica

La ambición filosófica de Prigogine, sin embargo, fue más allá de este programa consolidado. Insatisfecho con una respuesta al problema de Loschmidt-Zermelo que dependía, en última instancia, de una elección metodológica —el paso del _coarse-graining_, la renuncia deliberada a rastrear correlaciones microscópicas finas—, Prigogine desarrolló, sobre todo en las últimas dos décadas de su vida, un programa matemático más radical: intentó mostrar que la irreversibilidad podía derivarse directamente de la dinámica misma, sin apelar a ningún paso de aproximación estadística añadido desde afuera.

Ese programa —construido alrededor de lo que llamó “operadores de tiempo interno” y resonancias de Poincaré en sistemas dinámicos inestables, sistemas caóticos donde trayectorias infinitesimalmente cercanas divergen exponencialmente— pretendía mostrar que para una clase amplia de sistemas dinámicamente inestables, la propia estructura matemática de las ecuaciones de evolución fuerza una ruptura de la simetría temporal que no depende de ninguna decisión del observador sobre qué grado de descripción usar.

Es, en el vocabulario que fijé en el artículo 1, la defensa técnica más sofisticada de la posición realista u ontológica: la irreversibilidad no sería un artefacto de nuestra ignorancia, sino una propiedad objetiva de ciertos sistemas físicos, tan real como cualquier otra magnitud dinámica.

* * *

## V. La recepción crítica: por qué la comunidad de física estadística no adoptó el programa

Acá es donde el mismo estándar de prueba que apliqué en los artículos 2 y 3 se vuelve indispensable, porque la literatura especializada documenta con bastante unanimidad una brecha entre el prestigio general de Prigogine —merecido, por el trabajo de la sección III— y la recepción técnica específica de su programa de irreversibilidad fundamental.

Un análisis reciente de la historiografía de la física resume la situación con una frase que vale la pena citar en su contenido, no en su forma: mientras las contribuciones de Prigogine a la termodinámica de no equilibrio son ampliamente reconocidas, sus esfuerzos filosóficos y teóricos posteriores siguen siendo controvertidos, y su teoría de transformación matemática, que buscaba integrar la irreversibilidad directamente en la mecánica, no logró una aceptación amplia en la física contemporánea.

La crítica técnica más detallada y más citada es la de Jean Bricmont, físico teórico que en un trabajo de 1995 dedicado específicamente a desenredar confusiones sobre el caos, el determinismo y la flecha del tiempo, defiende la línea clásica que va de Laplace y Boltzmann hasta la formalización moderna de la tipicidad, y cuestiona el programa de Prigogine en un punto metodológico preciso: Bricmont muestra que las propias palabras de Boltzmann, en su respuesta madura a Loschmidt y Zermelo, ya contienen la resolución estadística que Prigogine presenta como si fuera una ausencia que su propio programa viene a llenar.

Bricmont documenta, además, que la presentación que Prigogine hace de la posición de Boltzmann —como si Boltzmann hubiera concluido que la irreversibilidad termodinámica era simplemente incompatible con la dinámica reversible, sin más— tergiversa lo que Boltzmann efectivamente escribió. Dicho de otro modo, parte de la fuerza retórica del programa de Prigogine depende de presentar el problema de Loschmidt-Zermelo como si siguiera abierto en la forma en que lo estaba en 1876, cuando la comunidad de física estadística lo considera resuelto, en el sentido preciso de la tipicidad, desde hace más de un siglo.

* * *

## VI. El diagnóstico, aplicado con la misma disciplina que en los artículos anteriores

El patrón, otra vez, es reconocible. Hay un núcleo de resultados sólidamente establecidos y sin controversia activa: el teorema $H$ con la hipótesis del caos molecular explícitamente reconocida como una hipótesis estadística, no mecánica; la resolución de Loschmidt y Zermelo mediante el concepto de tipicidad, que convierte al Segundo Principio en una ley estadística de robustez práctica absoluta sin necesidad de negar la reversibilidad microscópica subyacente; y, en el propio programa de Prigogine, la termodinámica lineal y no lineal de no equilibrio y la teoría de estructuras disipativas, que es precisamente el trabajo que el Comité Nobel premió en 1977 y que hoy sostiene campos activos como la física de la materia activa.

Hay, en un nivel completamente distinto de garantía, la extensión posterior de Prigogine hacia una teoría de la irreversibilidad como propiedad dinámica fundamental —los operadores de tiempo interno, las resonancias de Poincaré como mecanismo de ruptura temporal intrínseca—, que no logró el consenso técnico de la comunidad de física estadística, que fue objeto de críticas detalladas y documentadas por especialistas como Bricmont, y que en el balance historiográfico disponible se describe, con las palabras más generosas posibles, como una legítima línea de investigación minoritaria y no como el reemplazo del marco estadístico estándar que Prigogine mismo esperaba que fuera.

El error que hay que evitar acá —el mismo de los tres artículos anteriores— es dejar que el prestigio genuino del Nobel de 1977 preste autoridad, sin costo argumental adicional, a una tesis filosófica sobre la naturaleza última del tiempo que ese premio no reconoció, que la comunidad especializada mayoritariamente no adoptó, y que sigue exigiendo, para cualquiera que quiera defenderla hoy, el mismo trabajo técnico independiente que cualquier otra hipótesis de frontera no consolidada.

* * *

## VII. Dónde queda entonces la pregunta filosófica original

Con este balance hecho, vale la pena volver, para cerrar, a la pregunta con la que abrí el artículo. El consenso técnico —Boltzmann vía tipicidad, Lebowitz en su formulación moderna— no es en sí mismo una respuesta a la pregunta óntica-versus-epistémica que planteé en el primer artículo: es compatible con ambas lecturas filosóficas.

Un subjetivista puede leer la tipicidad como la formalización precisa de por qué nuestra ignorancia sobre las condiciones iniciales exactas produce, de manera casi inevitable, la apariencia de una flecha del tiempo objetiva.

Un realista puede leer la misma tipicidad como una descripción de una asimetría genuina en la estructura del universo observable —condiciones iniciales de entropía extremadamente baja en el Big Bang, un hecho contingente pero real sobre nuestro universo particular, del cual se sigue todo lo demás sin necesidad de ningún mecanismo dinámico adicional—.

Esta segunda lectura, defendida hoy por físicos como David Albert y Sean Carroll bajo el nombre de “hipótesis del pasado”, no necesita el aparato de operadores de tiempo interno de Prigogine para sostener una posición realista sobre la flecha del tiempo: le alcanza con la baja entropía inicial del universo como condición de contorno, sin ninguna ruptura adicional de la reversibilidad microscópica.

Que exista esa alternativa realista, más económica y con mayor aceptación técnica que la de Prigogine, es en sí mismo un argumento adicional para separar, con el mismo cuidado que en toda esta serie, el prestigio de un nombre del contenido específico y verificable de una tesis.

* * *

> **Notas y fuentes consultadas:** Boltzmann (1872), teorema $H$ y la hipótesis del caos molecular; Loschmidt (1876), objeción de reversibilidad; Zermelo (1896), objeción de recurrencia sobre la base del teorema de Poincaré; formalización moderna de la tipicidad en Lebowitz (“Boltzmann’s entropy and time’s arrow”, 1993) y trabajos posteriores sobre el modelo de Ehrenfest; Prigogine y De Donder, termodinámica lineal de no equilibrio; Glansdorff y Prigogine (1954), criterio general de evolución y teoría de estructuras disipativas; Bricmont, “Science of Chaos or Chaos in Science?” (1995), crítica detallada al programa de irreversibilidad fundamental de Prigogine; análisis historiográfico reciente sobre la recepción dividida de la obra de Prigogine entre física y filosofía; hipótesis del pasado (Albert, Carroll) como alternativa realista a la flecha del tiempo que no requiere el aparato de Prigogine.
