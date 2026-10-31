---
title: "La taxonomía de la ignorancia: decisión racional entre el riesgo computable y la incertidumbre radical"
description: "Un examen epistemológico sobre la frontera entre el riesgo estocástico computable y la incertidumbre knightiana, desde Wald y Ellsberg hasta Taleb."
pubDate: 2026-09-30
slug: "la-taxonomia-de-la-ignorancia-decision-racional-entre-el-riesgo-computable-y-la-incertidumbre-radical"
categories: ["Filosofía", "Matemáticas"]
tags: ["Cisne negro", "Incertidumbre Knightiana", "Paradoja de Ellsberg", "Teoría de la decisión"]
draft: false
---

El presente ensayo examina la frontera conceptual y epistemológica que separa al riesgo estocástico computable de la incertidumbre radical o knightiana. 

Se analiza la formalización de la teoría de la decisión bajo ignorancia, abarcando el criterio maximin de Abraham Wald, el concepto de aversión a la ambigüedad ilustrado por la Paradoja de Ellsberg, y la prueba de coherencia de Ramsey-de Finetti para la probabilidad subjetiva. Asimismo, se expone la crítica de Nassim Nicholas Taleb sobre la distribución gaussiana en sistemas complejos, formalizando las leyes de potencia (*power laws*) y el impacto ontológico de los eventos de cola pesada («cisnes negros»).

---

## 1. La distinción de Knight: riesgo frente a incertidumbre

En su obra seminal *Risk, Uncertainty and Profit* (1921), Frank Knight estableció una dicotomía epistemológica fundamental para la teoría económica y la inferencia estadística:

1. **Riesgo computable**: situaciones donde el espacio de estados futuros $\Omega$ es conocido y la distribución de probabilidad $\mathbb{P}(\omega)$ sobre dicho espacio está perfectamente definida o es estimable a partir de frecuencias empíricas consolidadas o simetrías a priori.
2. **Incertidumbre radical (incertidumbre knightiana)**: situaciones donde el espacio de estados $\Omega$ es incompleto o impredecible, o bien la medida de probabilidad $\mathbb{P}$ es objetivamente desconocida e inestimable mediante datos pasados.

En el marco del riesgo computable, la toma de decisiones se reduce a un problema de optimización matemática del valor esperado o de la utilidad esperada de von Neumann-Morgenstern:

$$
\max_{a \in \mathcal{A}} \mathbb{E}_{\mathbb{P}}[U(a, \omega)] = \max_{a \in \mathcal{A}} \int_{\Omega} U(a, \omega) \, d\mathbb{P}(\omega)
$$

donde $\mathcal{A}$ es el conjunto de acciones disponibles y $U(a, \omega)$ es la función de utilidad del agente. En la incertidumbre radical, este paradigma colapsa: al no existir una medida de probabilidad $\mathbb{P}$ consensuada o válida, la integral de Lebesgue carece de definición operativa.

---

## 2. Criterios formales de decisión bajo ignorancia pura: Wald y Savage

Cuando la distribución $\mathbb{P}$ es desconocida, la teoría de decisiones recurre a criterios axiomáticos alternativos. Abraham Wald, en *Statistical Decision Functions* (1950), planteó la toma de decisiones como un juego de suma cero contra la naturaleza, formulando el criterio que hoy se conoce como **maximin**:

$$
\max_{a \in \mathcal{A}} \min_{\omega \in \Omega} U(a, \omega)
$$

El criterio maximin selecciona la acción cuyo peor resultado posible sea el menos desfavorable. Es una postura de aversión extrema al riesgo que garantiza una cota inferior de rendimiento sin asignar probabilidades a los estados de la naturaleza. 

Su formulación dual sobre pérdidas —$\min_a \max_\omega L(a,\omega)$, propiamente «minimax»— es la que originalmente motivó el nombre con el que suele confundirse; ambas son intercambiables únicamente bajo la transformación $L = -U$.

Frente a la rigidez de Wald, Leonard Savage, en *The Foundations of Statistics* (1954), desarrolló el paradigma de las **probabilidades subjetivas a priori** (*subjective expected utility*, SEU). Savage demostró que si las preferencias de un agente racional satisfacen un conjunto de axiomas —incluyendo el **axioma de la cosa segura** o *sure-thing principle*—, sus decisiones son matemáticamente equivalentes a optimizar la utilidad esperada respecto a una medida de probabilidad subjetiva implícita $P_{\text{subj}}$.

---

## 3. La Paradoja de Ellsberg y la aversión a la ambigüedad

La validez del modelo SEU de Savage fue cuestionada por Daniel Ellsberg en «Risk, Ambiguity, and the Savage Axioms» (*The Quarterly Journal of Economics*, 1961), trabajo presentado originalmente en la reunión de la Econometric Society en St. Louis en diciembre de 1960. 

Vale una nota biográfica que retrata la personalidad del autor: el mismo Daniel Ellsberg es quien, una década más tarde, filtraría los célebres Papeles del Pentágono. El economista que formalizó la aversión humana a la ambigüedad terminó decidiendo, en su vida pública, revelar con exactitud el tipo de incertidumbre radical que las esferas de poder preferían ocultar.

Ellsberg demostró mediante un experimento mental que los agentes distinguen nítidamente entre el riesgo computable y la incertidumbre radical, violando de forma sistemática el *sure-thing principle*.

Considérese una urna que contiene $90$ bolas:
* $30$ bolas son de color **rojo**.
* $60$ bolas son una mezcla indeterminada de bolas **negras** y **amarillas**.

Se plantean dos elecciones independientes al participante:

**Elección 1:**
* **Apuesta A**: gana USD 100 si saca una bola **roja**. $\mathbb{P}(\text{Roja}) = 30/90 = 1/3$.
* **Apuesta B**: gana USD 100 si saca una bola **negra**. $\mathbb{P}(\text{Negra})$ es desconocida (entre $0$ y $2/3$).

**Elección 2:**
* **Apuesta C**: gana USD 100 si saca una bola **roja** o **amarilla**.
* **Apuesta D**: gana USD 100 si saca una bola **negra** o **amarilla**. $\mathbb{P}(\text{Negra} \cup \text{Amarilla}) = 60/90 = 2/3$.

Empíricamente, la gran mayoría de los individuos eligen **A** en la primera opción y **D** en la segunda ($A \succ B$ y $D \succ C$).

### Demostración de la inconsistencia axiomática

Si las preferencias reflejaran una probabilidad subjetiva consistente $P$, la elección $A \succ B$ implicaría:

$$
P(\text{Roja}) > P(\text{Negra}) \implies \frac{1}{3} > P(\text{Negra})
$$

Por su parte, la elección $D \succ C$ exigiría:

$$
P(\text{Negra} \cup \text{Amarilla}) > P(\text{Roja} \cup \text{Amarilla})
$$

Dado que los eventos son disjuntos, por la propiedad aditiva de la probabilidad:

$$
P(\text{Negra}) + P(\text{Amarilla}) > P(\text{Roja}) + P(\text{Amarilla}) \implies P(\text{Negra}) > P(\text{Roja}) = \frac{1}{3}
$$

Lo cual contradice directamente la primera desigualdad. La Paradoja de Ellsberg prueba formalmente la **aversión a la ambigüedad**: las personas prefieren de forma consistente asumir riesgos con probabilidades objetivas conocidas antes que exponerse a situaciones donde la propia distribución de probabilidad es opaca.

Ellsberg observó algo fundamental: al confrontar a los participantes con la contradicción lógica en la que acababan de incurrir, sujetos sofisticados e instruidos —tras revisar los axiomas— optaban deliberadamente por ratificar sus elecciones iniciales en vez de corregirlas. 

Lejos de tratarse de una simple distorsión experimental, la literatura posterior —incluidos los modelos de utilidad maximin con múltiples distribuciones a priori de Gilboa y Schmeidler (1989)— consagró a la aversión a la ambigüedad como un rasgo estructurado, coherente y defendible de la racionalidad humana.

---

## 4. La prueba de coherencia de Ramsey-de Finetti y los «Dutch Books»

Para justificar el uso de probabilidades subjetivas en la inferencia operativa, Frank Ramsey (en *Truth and Probability*, redactado en 1926 y publicado en 1931) y Bruno de Finetti (*La prévision: ses lois logiques, ses sources subjectives*, 1937) desarrollaron la teoría de la **coherencia operativa**. 

De Finetti definió la probabilidad no como una cualidad intrínseca o física de los objetos, sino como el grado de creencia cuantificable de un agente, medible mediante los precios monetarios a los que estaría dispuesto a intercambiar apuestas.

Sea $p$ el precio que un agente asigna a una apuesta que rinde $1$ unidad monetaria si el evento $E$ ocurre, y $0$ si no ocurre. Si el agente acepta comprar o vender cualquier cantidad $\alpha$ de esta apuesta a ese precio, su rendimiento neto $S$ es:

$$
S = \alpha (I_E - p)
$$

donde $I_E$ denota la función indicadora del evento $E$.

Un conjunto de apuestas se define formalmente como **incoherente** si existe una combinación de posturas —un *Dutch book* o «libro holandés»— que garantiza que el agente incurra en una pérdida neta estricta bajo cualquier estado del mundo:

$$
\exists \, \alpha_1, \alpha_2, \dots, \alpha_n \quad \text{tal que} \quad \sum_{i=1}^{n} S_i < 0 \quad \forall \omega \in \Omega
$$

> **Teorema de coherencia de de Finetti:** Un conjunto de precios subjetivos de apuesta asignados a una familia de eventos es coherente (inmune a la estructuración de un *Dutch book*) si y solo si obedece de manera estricta los axiomas clásicos de Kolmogorov.

Si las convicciones subjetivas de un agente infringen propiedades elementales —tales como la aditividad finita o la condición de normalización $\mathbb{P}(\Omega) = 1$—, un contraparte puede diseñar una cartera de apuestas cruzadas donde el agente perderá capital con total certeza.

---

## 5. Mediocristán frente a Extremistán: Taleb y las distribuciones de cola pesada

Nassim Nicholas Taleb profundizó la crítica sobre el tratamiento estocástico tradicional en las finanzas y las ciencias sociales al analizar la geometría de las colas de probabilidad, principalmente en *El cisne negro* (2007) y *Antifrágil* (2012). Taleb divide las dinámicas generadoras en dos territorios epistemológicos:

* **Mediocristán (procesos de cola corta):** Sistemas modelados mediante variables independientes e idénticamente distribuidas (i.i.d.) con varianza finita, gobernados por el teorema del límite central. La suma acumulada $S_n = \sum_{i=1}^n X_i$ está dominada por el valor esperado; ninguna observación individual $X_k$ es capaz de distorsionar el total agregado cuando $n \to \infty$.
* **Extremistán (procesos de cola pesada):** Entornos descritos por distribuciones de ley de potencia (*power laws*), cuya función de supervivencia asintótica verifica:

$$
\mathbb{P}(X > x) \approx L(x) \, x^{-\alpha}
$$

donde $\alpha > 0$ es el exponente de cola y $L(x)$ es una función de variación lenta. 

Cuando $\alpha \le 2$, la distribución posee varianza teórica infinita; cuando $\alpha \le 1$, carece incluso de media finita. En estos regímenes, el teorema del límite central se dilata asintóticamente o deja de operar.

### Propiedad de catástrofe (*single large deviation principle*)

En distribuciones subexponenciales de cola pesada, la probabilidad de que una suma acumulada supere una cota masiva $x$ se aproxima a la probabilidad de que **una sola observación** aislada rebase dicho umbral:

$$
\lim_{x \to \infty} \frac{\mathbb{P}(X_1 + X_2 + \dots + X_n > x)}{\mathbb{P}(\max(X_1, X_2, \dots, X_n) > x)} = 1
$$

Esta propiedad define matemáticamente la naturaleza de un **cisne negro**: un suceso atípico, indetectable a partir de series temporales históricas, que absorbe la mayor parte del impacto y la varianza del sistema. Gestionar riesgos en Extremistán utilizando instrumentos gaussianos —como la desviación típica o el Valor en Riesgo (VaR)— infunde una falsa sensación de certidumbre que magnifica la fragilidad del diseño institucional.

---

## 6. Consideraciones finales

Confundir la incertidumbre radical con un mero problema de riesgo computable constituye una omisión metodológica profunda. Mientras que el riesgo se resuelve mediante la recolección empírica y la optimización lineal de expectativas, la incertidumbre demanda la construcción de estructuras antifrágiles: mecanismos diseñados para asimilar la dispersión y los eventos extremos sin colapsar.

La inferencia estadística debe asumir sus límites normativos. En entornos dominados por colas pesadas e ignorancia knightiana, el objetivo primario no radica en calcular la probabilidad de lo inaprensible, sino en limitar la exposición al daño que provocan los cisnes negros. 

La aversión a la ambigüedad documentada por Ellsberg no debe catalogarse como un sesgo cognitivo a desterrar, sino como un principio de prudencia adaptativa frente a una ignorancia estructural que ningún algoritmo predictivo puede disolver.

---

## Fuentes citadas

* [Moscati, I. — «Ellsberg 1961: Text, Context, Influence» (Springer Link)](https://link.springer.com/article/10.1007/s10203-024-00437-1)
* [Philopedia — «Ellsberg Paradox» (Contexto biográfico y Papeles del Pentágono)](https://philopedia.org/arguments/ellsberg-paradox/)
* [djmarsay — Comentario y transcripción del experimento original de Daniel Ellsberg](https://djmarsay.wordpress.com/mathematics/maths-subjects/uncertainty-maths/broader-uncertainty/ellsbergs-risk-ambiguity-and-savage/)
* [Aerts, D. et al. — «Identifying Quantum Structures in the Ellsberg Paradox» (arXiv:1302.3850)](https://arxiv.org/pdf/1302.3850)
