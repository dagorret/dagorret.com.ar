---
title: "La taxonomía de la ignorancia: decisión racional entre el riesgo computable y la incertidumbre radical"
date: 2026-09-30
slug: "la-taxonomia-de-la-ignorancia-decision-racional-entre-el-riesgo-computable-y-la-incertidumbre-radical"
translation_key: "la-taxonomia-de-la-ignorancia-decision-racional-entre-el-riesgo-computable-y-la-incertidumbre-radical"
lang: "es"
categories: ["Filosofía","Matemáticas"]
tags: ["Cisne negro","Incertidumbre Knightiana","Paradoja de Ellsberg","Teoría de la decisión"]
---

Resumen

El presente ensayo examina la frontera conceptual y epistemológica que separa al riesgo estocástico computable de la incertidumbre radical o knightiana. Se analiza la formalización de la teoría de la decisión bajo ignorancia, abarcando el criterio maximin de Abraham Wald, el concepto de aversión a la ambigüedad ilustrado por la Paradoja de Ellsberg, y la prueba de coherencia de Ramsey-de Finetti para la probabilidad subjetiva. Asimismo, se expone la crítica de Nassim Nicholas Taleb sobre la distribución gaussiana en sistemas complejos, formalizando las leyes de potencia (_power laws_) y el impacto ontológico de los eventos de cola pesada (“cisnes negros”).

* * *

### 1\. La distinción de Knight: riesgo frente a incertidumbre

En su obra seminal _Risk, Uncertainty and Profit_ (1921), Frank Knight estableció una dicotomía epistemológica fundamental para la teoría económica y la inferencia estadística:

1.  **Riesgo computable**: situaciones donde el espacio de estados futuros $\Omega$ es conocido y la distribución de probabilidad $\mathbb{P}(\omega)$ sobre dicho espacio está perfectamente definida o es estimable a partir de frecuencias empíricas consolidadas o simetrías a priori.
2.  **Incertidumbre radical (incertidumbre knightiana)**: situaciones donde el espacio de estados $\Omega$ es incompleto o impredecible, o bien la medida de probabilidad $\mathbb{P}$ es objetivamente desconocida e inestimable mediante datos pasados.

En el marco del riesgo computable, la toma de decisiones se reduce a un problema de optimización matemática del valor esperado o de la utilidad esperada de von Neumann-Morgenstern:

$$
\max_{a \in \mathcal{A}} \mathbb{E}_{\mathbb{P}}[U(a, \omega)] = \max_{a \in \mathcal{A}} \int_{\Omega} U(a, \omega) \, d\mathbb{P}(\omega)
$$

donde $\mathcal{A}$ es el conjunto de acciones disponibles y $U(a, \omega)$ es la función de utilidad del agente. En la incertidumbre radical, este paradigma colapsa: al no existir una medida de probabilidad $\mathbb{P}$ consensuada o válida, la integral de Lebesgue carece de definición operativa.

* * *

### 2\. Criterios formales de decisión bajo ignorancia pura: Wald y Savage

Cuando la distribución $\mathbb{P}$ es desconocida, la teoría de decisiones recurre a criterios axiomáticos alternativos. Abraham Wald, en _Statistical Decision Functions_ (1950), planteó la toma de decisiones como un juego de suma cero contra la naturaleza, formulando el criterio que hoy se conoce como **maximin**:

$$
\max_{a \in \mathcal{A}} \min_{\omega \in \Omega} U(a, \omega)
$$

El criterio maximin selecciona la acción cuyo peor resultado posible sea el menos desfavorable. Es una postura de aversión extrema al riesgo que garantiza una cota inferior de rendimiento sin asignar probabilidades a los estados de la naturaleza. Su formulación dual sobre pérdidas —$\min_a \max_\omega L(a,\omega)$, propiamente “minimax”— es la que originalmente motivó el nombre con el que suele confundirse, y ambas son intercambiables solo bajo la transformación $L=-U$.

Frente a la rigidez de Wald, Leonard Savage, en _The Foundations of Statistics_ (1954), desarrolló el paradigma de las **probabilidades subjetivas a priori** (_subjective expected utility_, SEU). Savage demostró que si las preferencias de un agente racional satisfacen un conjunto de axiomas —incluyendo el **axioma de la cosa segura** o _sure-thing principle_—, sus decisiones son matemáticamente equivalentes a optimizar la utilidad esperada respecto a una medida de probabilidad subjetiva implícita $P_{\text{subj}}$.

* * *

### 3\. La Paradoja de Ellsberg y la aversión a la ambigüedad

La validez del modelo SEU de Savage fue cuestionada por Daniel Ellsberg en “Risk, Ambiguity, and the Savage Axioms” (_The Quarterly Journal of Economics_, 1961), un artículo que Ellsberg presentó primero en la reunión de la Econometric Society en St. Louis en diciembre de 1960 ([Moscati, “Ellsberg 1961: Text, Context, Influence”](https://link.springer.com/article/10.1007/s10203-024-00437-1)). Vale una nota biográfica que rara vez se menciona pero que da color al personaje: el mismo Daniel Ellsberg es quien, diez años más tarde, filtraría los Papeles del Pentágono, uno de los episodios más relevantes de la historia del periodismo de investigación estadounidense ([Philopedia, “Ellsberg Paradox”](https://philopedia.org/arguments/ellsberg-paradox/)) —el economista que formalizó la aversión humana a la ambigüedad terminó, en su otra vida pública, decidiendo revelar exactamente el tipo de incertidumbre radical que el Pentágono prefería mantener oculta—.

Ellsberg demostró mediante un experimento mental que los agentes humanos distinguen nítidamente entre el riesgo computable y la incertidumbre radical, violando de forma sistemática los axiomas de Savage —en particular, el propio _sure-thing principle_—.

Considérese una urna que contiene $90$ bolas:

-   $30$ bolas son de color **rojo**.
-   $60$ bolas son una mezcla desconocida de bolas **negras** y **amarillas**.

Se proponen dos elecciones independientes al participante:

**Elección 1**:

-   **Apuesta A**: gana \\$100 si saca una bola **roja**. $\mathbb{P}(\text{Roja}) = 30/90 = 1/3$.
-   **Apuesta B**: gana \\$100 si saca una bola **negra**. $\mathbb{P}(\text{Negra})$ es desconocida (entre $0$ y $2/3$).

**Elección 2**:

-   **Apuesta C**: gana \\$100 si saca una bola **roja** o **amarilla**.
-   **Apuesta D**: gana \\$100 si saca una bola **negra** o **amarilla**. $\mathbb{P}(\text{Negra} \cup \text{Amarilla}) = 60/90 = 2/3$.

Empíricamente, la mayoría de los individuos eligen **A** en la primera opción y **D** en la segunda ($A \succ B$ y $D \succ C$).

_Demostración de la incoherencia axiomática_: si las preferencias reflejaran una probabilidad subjetiva consistente $P$, la elección $A \succ B$ implica:

$$
P(\text{Roja}) > P(\text{Negra}) \implies \frac{1}{3} > P(\text{Negra})
$$

Por su parte, la elección $D \succ C$ implica:

$$
P(\text{Negra} \cup \text{Amarilla}) > P(\text{Roja} \cup \text{Amarilla})
$$

Dado que los eventos son disjuntos, por aditividad de la probabilidad:

$$
P(\text{Negra}) + P(\text{Amarilla}) > P(\text{Roja}) + P(\text{Amarilla}) \implies P(\text{Negra}) > P(\text{Roja}) = \frac{1}{3}
$$

Lo cual contradice directamente la primera desigualdad. La Paradoja de Ellsberg demuestra la **aversión a la ambigüedad**: las personas prefieren de forma consistente asumir riesgos con probabilidades conocidas frente a situaciones donde la probabilidad misma es incierta. Ellsberg mismo observó, en el propio artículo, algo que refuerza el peso normativo del hallazgo: al confrontar a sus sujetos con la contradicción formal que acababan de cometer, un número significativo de personas sofisticadas y razonables —tras reconsiderar sus decisiones a la luz de los axiomas— optaban deliberadamente por persistir en sus elecciones “incoherentes”, en lugar de corregirlas ([djmarsay, cita del artículo original de Ellsberg](https://djmarsay.wordpress.com/mathematics/maths-subjects/uncertainty-maths/broader-uncertainty/ellsbergs-risk-ambiguity-and-savage/)). Esto convirtió a la paradoja en algo más que una curiosidad experimental: es, para buena parte de la literatura posterior —incluidos los modelos de utilidad _maxmin_ con prior no único de Gilboa y Schmeidler (1989)—, evidencia de que la aversión a la ambigüedad puede ser una característica estable y defendible de la racionalidad humana, no un simple error a corregir.

* * *

### 4\. La prueba de coherencia de Ramsey-de Finetti y los “Dutch Books”

Para justificar el uso de probabilidades subjetivas en la toma de decisiones, Frank Ramsey —en “Truth and Probability”, ensayo redactado en 1926 y publicado póstumamente en 1931— y Bruno de Finetti —cuya formulación más influyente aparece en _La prévision: ses lois logiques, ses sources subjectives_ (1937)— desarrollaron la teoría de la **coherencia operativa**. De Finetti definió la probabilidad no como una propiedad física de los objetos, sino como el grado de creencia personal de un individuo, medible a través de los precios a los cuales está dispuesto a apostar.

Sea $p$ el precio que un agente asigna a una apuesta que paga $1$ unidad monetaria si el evento $E$ ocurre, y $0$ si no ocurre. Si el agente acepta comprar o vender cualquier cantidad $\alpha$ de esta apuesta a ese precio, su ganancia o pérdida neta $S$ es:

$$
S = \alpha (I_E - p)
$$

donde $I_E$ es la función indicadora del evento $E$.

Un conjunto de apuestas se define como **incoherente** si existe una combinación de elecciones —un _Dutch book_ o “libro holandés”— que garantiza que el agente sufra una pérdida neta sin importar el resultado del mundo real:

$$
\exists \, \alpha_1, \alpha_2, \dots, \alpha_n \quad \text{tal que} \quad \sum_{i=1}^{n} S_i \lt 0 \quad \forall \omega \in \Omega
$$

**Teorema de coherencia de de Finetti**: un conjunto de precios de apuestas subjetivos asignados a una familia de eventos es coherente —impide la construcción de un _Dutch book_— si y solo si cumple estricta y formalmente con los axiomas de Kolmogorov de la teoría de probabilidades.

Si las creencias subjetivas de un individuo violan axiomas probabilísticos básicos —como la aditividad, o que $\mathbb{P}(\Omega) = 1$—, un oponente puede estructurar un conjunto de apuestas en las que el individuo perderá dinero con certeza.

* * *

### 5\. Mediocristán frente a Extremistán: Taleb y las distribuciones de cola pesada

Nassim Nicholas Taleb extendió la crítica a la gestión estocástica del riesgo en el ámbito financiero y social al analizar la arquitectura de las distribuciones de probabilidad subyacentes, principalmente en _El cisne negro_ (2007) y en _Antifrágil_ (2012). Taleb divide los generadores de datos en dos dominios ontológicos: Mediocristán, con varianza finita y acotada, ergodicidad rápida y supuesto gaussiano o sub-gaussiano; y Extremistán, gobernado por distribuciones de ley de potencia, de cola pesada (paretianas), donde un solo evento puede dominar la suma total de la serie.

**Mediocristán (procesos de cola corta)**: sistemas gobernados por variables independientes e idénticamente distribuidas (i.i.d.) con varianza finita, regidas por el teorema del límite central. La suma acumulada $S_n = \sum_{i=1}^n X_i$ está dominada por la media. Ninguna observación individual $X_k$ puede alterar significativamente el agregado total a medida que $n \to \infty$.

**Extremistán (procesos de cola pesada)**: sistemas regidos por distribuciones de ley de potencia (_power laws_), cuya función de supervivencia asintótica satisface:

$$
\mathbb{P}(X > x) \approx L(x) \, x^{-\alpha}
$$

donde $\alpha > 0$ es el exponente de cola y $L(x)$ es una función de variación lenta. Cuando $\alpha \le 2$, la distribución posee varianza infinita; cuando $\alpha \le 1$, posee media infinita. En estos entornos, el teorema del límite central opera de forma extremadamente lenta o colapsa por completo.

**Propiedad de catástrofe** (_single large deviation principle_ o “principio del único gran salto”): para distribuciones de cola pesada —como las distribuciones subexponenciales—, la probabilidad de que una suma supere un umbral masivo $x$ está determinada por la probabilidad de que una sola observación supere dicho umbral:

$$
\lim_{x \to \infty} \frac{\mathbb{P}(X_1 + X_2 + \dots + X_n > x)}{\mathbb{P}(\max(X_1, X_2, \dots, X_n) > x)} = 1
$$

Esta propiedad define formalmente el concepto de **cisne negro**: un evento extremo no pronosticable mediante datos históricos pasados que domina la varianza y la masa estadística total del sistema. Intentar gestionar el riesgo en Extremistán aplicando métricas gaussianas —como la desviación estándar o el Valor en Riesgo (VaR)— genera una ilusión de control probabilístico que incrementa, paradójicamente, la fragilidad sistémica.

* * *

### 6\. Conclusión

Tratar la incertidumbre radical como si fuera un simple problema de riesgo computable es un error epistemológico grave. Mientras que el riesgo se resuelve mediante la recolección de datos y la optimización de expectativas, la incertidumbre exige diseñar sistemas antifrágiles —sistemas que se benefician de la volatilidad y los eventos extremos, o que al menos no son destruidos por ellos—.

La inferencia estadística debe reconocer con humildad sus fronteras de aplicabilidad: en dominios de cola pesada y bajo ignorancia knightiana, el objetivo prioritario no es predecir la probabilidad de lo imponderable, sino reducir la exposición al impacto devastador de los cisnes negros. La aversión a la ambigüedad que Ellsberg documentó experimentalmente no es, bajo esta lectura, un sesgo cognitivo a corregir: es, más bien, una respuesta adaptativa razonable frente a un tipo de ignorancia que ningún cálculo de expectativas, por sofisticado que sea, puede en rigor eliminar.

* * *

### Fuentes citadas

-   [Moscati, I. — “Ellsberg 1961: Text, Context, Influence” (contexto histórico y fecha de la presentación original)](https://link.springer.com/article/10.1007/s10203-024-00437-1)
-   [Philopedia — “Ellsberg Paradox” (nota biográfica sobre los Papeles del Pentágono)](https://philopedia.org/arguments/ellsberg-paradox/)
-   [djmarsay — cita y comentario del artículo original de Ellsberg, incluida la reacción de los sujetos ante la contradicción](https://djmarsay.wordpress.com/mathematics/maths-subjects/uncertainty-maths/broader-uncertainty/ellsbergs-risk-ambiguity-and-savage/)

[arXiv — “Identifying Quantum Structures in the Ellsberg Paradox” (referencias completas a Knight, Savage, Ellsberg, Gilboa-Schmeidler)](https://arxiv.org/pdf/1302.3850)
