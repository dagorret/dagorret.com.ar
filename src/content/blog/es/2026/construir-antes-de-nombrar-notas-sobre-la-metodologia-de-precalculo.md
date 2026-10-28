---
title: "Construir antes de nombrar: notas sobre la metodología de Precálculo"
date: 2026-09-03
slug: "construir-antes-de-nombrar-notas-sobre-la-metodologia-de-precalculo"
translation_key: "construir-antes-de-nombrar-notas-sobre-la-metodologia-de-precalculo"
lang: "es"
categories: ["Matemáticas"]
tags: ["Axiomas"]
---

## El principio detrás de todo

_Este artículo forma parte de las notas sobre **Precálculo**, el primer libro de la colección **Biblioteca de Matemáticas — Dagorret**: un texto de fundamentación matemática rigurosa para oyentes universitarios, que no da por sabido ningún objeto —ni π, ni e, ni la exponencial, ni el logaritmo— sin construirlo primero desde sus axiomas. El libro completo, junto con el resto de la colección, está disponible de forma abierta en [matematicas.dagorret.com.ar](https://matematicas.dagorret.com.ar/)._

La mayoría de los libros de precálculo dan por sabidas sus propias herramientas: $\pi$ es “esa constante que ya conocés”, $e$ aparece como un botón en la calculadora, y el logaritmo se presenta como la operación que “deshace” a la exponencial sin preguntar, primero, si esa exponencial está siquiera bien definida para cualquier exponente real. _Precálculo_ invierte ese orden en cada uno de sus capítulos: antes de usar un objeto, lo construye; antes de nombrar una propiedad, la demuestra; y cuando una pregunta legítima excede lo que el libro puede fundamentar con lo ya construido, lo dice explícitamente en vez de resolverla a medias.

Esa inversión de orden —construcción antes que uso— es la columna vertebral de todo el proyecto, y vale la pena mostrarla en detalle, capítulo por capítulo, para que se entienda no solo _qué_ temas cubre el libro, sino _cómo_ los cubre de una manera que lo distingue de un precálculo convencional.

* * *

## Capítulo 1 — Conceptos Fundamentales

El libro arranca donde casi ningún precálculo se detiene: en la construcción de $\mathbb{R}$ mismo. El axioma de completitud —la existencia de supremo para todo conjunto no vacío acotado superiormente— se fija con precisión en el §1.1, junto con una demostración explícita de que $\sqrt2$ no es racional y de que el conjunto $\{x\in\mathbb{Q}\mid x^2\lt2\}$ no tiene supremo _dentro_ de $\mathbb{Q}$ —la evidencia concreta de qué le falta a los racionales para ser los reales—. Ese único axioma, introducido en la primera sección del libro, termina siendo la herramienta que sostiene, sin excepción, la construcción de $e$ en el Capítulo 4 y la de $\pi$ en el Capítulo 5: todo el libro es, en cierto sentido, una larga demostración de qué puede construirse a partir de esa sola propiedad de los números reales.

## Capítulo 2 — Funciones

Las funciones se presentan como relaciones entre conjuntos —no como “fórmulas”—, y el capítulo introduce, sin usar todavía la palabra “límite”, el aparato $M$-$\delta$/$\varepsilon$-$N$ para describir comportamiento asintótico: qué significa, con precisión, que una función crezca sin cota o se acerque a un valor sin alcanzarlo nunca. Esa decisión —construir la técnica antes que el nombre— se revierte más adelante: cuando el Capítulo 4 necesita nombrar formalmente el concepto de límite para construir $e$ mediante sucesiones, el libro vuelve al §2.4 y declara explícitamente que ya se había construido el concepto sin decirlo, cerrando una brecha de vocabulario que había dejado abierta a propósito.

## Capítulo 3 — Polinomios y Funciones Racionales

El punto más alto de rigor de este capítulo es la construcción axiomática de $\mathbb{C}$: no como “números con una raíz de $-1$ agregada por decreto”, sino como $\mathbb{R}\times\mathbb{R}$ dotado de una estructura de cuerpo, con cada propiedad algebraica demostrada desde cero antes de introducir la notación abreviada $a+bi$. El capítulo cierra con un ensayo epistemológico que traza la historia de los números complejos desde Cardano y Bombelli en el siglo XVI —quienes manipulaban raíces de números negativos sin poder decir qué eran— hasta Hamilton en el XIX, que finalmente los fundamentó. Ese patrón —uso fecundo durante siglos, fundamentación rigurosa mucho después— reaparece, casi textualmente, en los dos capítulos siguientes.

## Capítulo 4 — Funciones Exponenciales y Logarítmicas

Este es, probablemente, el capítulo donde la metodología del libro se pone más a prueba, porque el objeto que construye —$a^x$ para $x$ real, no solo racional— es uno que casi ningún precálculo se detiene siquiera a cuestionar.

**La construcción de $a^x$.** El §4.1 no define $a^x$ para $x$ irracional: lo _construye_, mediante el supremo de $\{a^r : r\in\mathbb{Q},\, r\le x\}$ para el caso $a>1$, y su dual con ínfimo para $0\lt a\lt1$ —demostrado como una Proposición completamente independiente, no derivada de la primera por simetría algebraica—. La demostración de que esta construcción efectivamente preserva la propiedad de homomorfismo, $a^{x+y}=a^x a^y$, para _todo_ par de reales, exigió construir dos lemas técnicos propios —el supremo de un producto y el ínfimo de un producto— que no existían en ningún capítulo anterior.

**La construcción de $e$.** En vez de presentar $e\approx2{,}71828$ como una constante dada, el §4.2 lo construye como el valor común entre el supremo de $a_n=(1+1/n)^n$ y el ínfimo de $b_n=(1+1/n)^{n+1}$ —dos sucesiones que se aprietan, demostradas monótonas mediante una versión estricta de la desigualdad de Bernoulli, sin apelar al binomio de Newton—. Las cotas $2\lt e\lt3$ se obtienen con aritmética exacta de fracciones, no con una calculadora.

**El logaritmo como inversa, no como operación separada.** El §4.3 no introduce $\log_a$ con una definición nueva: lo obtiene aplicando, sin modificación, la teoría general de funciones inversas ya demostrada en el §2.7 sobre la biyectividad de $a^x$ ya probada en el §4.1. Las cuatro leyes de los logaritmos del §4.4 —producto, cociente, potencia, cambio de base— se derivan, cada una, del homomorfismo de la exponencial leído en la dirección opuesta.

**Aplicaciones fundamentadas, no ilustradas.** El §4.6 no se limita a mostrar ejemplos de crecimiento exponencial: demuestra una Proposición general —si la razón de crecimiento de un proceso en un intervalo depende solo de la duración de ese intervalo, y no de cuándo empieza, entonces el proceso _tiene_ que ser de la forma $Q(t)=Q_0 a^t$—, y solo después aplica esa Proposición al interés compuesto, al decaimiento radiactivo y a las escalas logarítmicas (pH, Richter, decibeles).

**El cierre epistemológico.** El §4.7 sitúa toda esta construcción en su contexto histórico: Napier en 1614 usando logaritmos sin ninguna fundamentación, Newton en 1687 razonando sobre límites sin tener la palabra, Euler en 1748 operando con $e^x$ para exponentes irracionales sin poder demostrar que ese objeto existía. Entre Napier y la fundamentación rigurosa de $\mathbb{R}$ por Dedekind y Cantor —el mismo axioma que abre el Capítulo 1— pasan casi 260 años. El capítulo también conecta la construcción con la ciencia contemporánea: la entropía de Boltzmann y la de Shannon usan el logaritmo por la misma razón estructural —traducir un producto de probabilidades en una suma de información—, y el capítulo nombra, sin poder demostrarla, la identidad de Euler $e^{i\pi}+1=0$, explicando con precisión por qué excede lo que el libro construyó.

## Capítulo 5 — Funciones Trigonométricas de Números Reales

Si el Capítulo 4 fue exigente, el Capítulo 5 plantea un problema que casi ningún libro de precálculo se atreve a resolver: ¿de dónde sale $\pi$?

**Construir $\pi$ sin trigonometría.** El §5.1 usa el método de Arquímedes —perímetros de polígonos regulares inscritos y circunscritos en la circunferencia unitaria, duplicando el número de lados en cada paso—, calculado exclusivamente con el teorema de Pitágoras. La elección de empezar con un cuadrado en vez de un hexágono no es arbitraria: un hexágono exigiría saber que su ángulo central mide 60°, lo cual presupone ya conocer una fracción de $\pi$ —exactamente la circularidad que el capítulo necesitaba evitar—.

**La función de enrollamiento.** El §5.2 construye $W:\mathbb{R}\to$ circunferencia unitaria —la función que asocia a cada real $t$ el punto alcanzado recorriendo una longitud de arco $t$— sin apelar, en ningún momento, a un teorema general de convergencia de sucesiones de Cauchy, porque ese teorema general excede lo que el libro se permitió construir en el Capítulo 4. En su lugar, la existencia de cada punto se obtiene con sucesiones monótonas acotadas —supremo e ínfimo—, la misma herramienta que construyó $e$ y $\pi$.

**Seno y coseno como coordenadas, no como razones.** El §5.3 define $\cos t$ y $\sin t$ como las dos coordenadas de $W(t)$ —no como catetos sobre hipotenusa—, y deriva de esa única definición la identidad pitagórica, la periodicidad, la paridad y los signos por cuadrante, sin postular ninguna por separado.

**El cierre epistemológico.** El §5.6 traza una historia de dos mil años: Hiparco (150 a.C.) tabulando cuerdas, Ptolomeo sistematizándolas en el _Almagesto_, Aryabhata introduciendo la media cuerda en la India del siglo V, los matemáticos del mundo islámico medieval refinando tangente y cotangente. El giro decisivo —tratar al seno como función de un número real, no como razón en un triángulo— ocurre recién con Euler, en el mismo libro de 1748 citado en el Capítulo 4. Y ni siquiera ese giro bastaba: a Euler todavía le faltaba una definición rigurosa de “longitud de arco”, que es, precisamente, lo que este capítulo construyó desde cero.

* * *

## El hilo que conecta todo

Un lector que recorra estos cinco capítulos encontrará la misma estructura repetida, con variaciones, una y otra vez: un objeto que la tradición matemática usó durante siglos —a veces milenios— antes de poder demostrar que existía; una construcción rigurosa de ese objeto usando, casi siempre, el mismo axioma de completitud fijado en la primera página del libro; y un cierre honesto que declara, sin ambigüedad, qué preguntas legítimas quedan todavía sin respuesta —la derivada, principalmente— porque exceden lo que este libro, en particular, se propuso construir.

Esa honestidad sobre los propios límites —decir “esto excede el alcance de este libro” en vez de resolver a medias, o peor, fingir que no hay pregunta pendiente— es, quizás, la marca editorial más distintiva del proyecto: un libro de precálculo que trata a su lector como alguien capaz de sostener una pregunta abierta hasta que le llegue la herramienta correcta para resolverla.
