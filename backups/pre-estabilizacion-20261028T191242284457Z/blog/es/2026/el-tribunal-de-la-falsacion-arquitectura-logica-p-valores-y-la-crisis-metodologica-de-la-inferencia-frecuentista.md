---
title: "El tribunal de la falsación: arquitectura lógica, *p*-valores y la crisis metodológica de la inferencia frecuentista"
date: 2026-09-11
slug: "el-tribunal-de-la-falsacion-arquitectura-logica-p-valores-y-la-crisis-metodologica-de-la-inferencia-frecuentista"
translation_key: "el-tribunal-de-la-falsacion-arquitectura-logica-p-valores-y-la-crisis-metodologica-de-la-inferencia-frecuentista"
lang: "es"
categories: ["Matemáticas"]
tags: ["Inferencia Estadística"]
---

### Resumen

El presente ensayo examina la estructura matemática y la fundamentación epistemológica de la Prueba de Hipótesis Nula (_Null Hypothesis Significance Testing_, NHST). Se analiza la tensión histórica e irresuelta entre la filosofía de la prueba de significación de Sir Ronald Fisher y el modelo de decisión binario de Jerzy Neyman y Egon Pearson. Asimismo, se mapea la correspondencia formal entre el condicional probabilístico frecuentista y la asimetría del falsacionismo de Karl Popper, demostrando cómo la deformación de este marco en un “ritualismo metodológico” ha derivado en la crisis contemporánea de replicabilidad. Finalmente, se presentan los Factores de Bayes (_Bayes Factors_) como el contrapeso formal para la cuantificación directa de la evidencia relativa entre hipótesis compitiendo en el campo científico.

* * *

### 1\. Marco formal: la arquitectura del _p_\-valor y la prueba de hipótesis

En la estadística frecuentista estándar, el contraste de hipótesis parte de definir un espacio de probabilidad $(\Omega, \mathcal{F}, \mathbb{P}_{\theta})$ indexado por un parámetro desconocido $\theta \in \Theta$. El espacio parametral se divide en dos regiones disjuntas: la hipótesis nula $H_0: \theta \in \Theta_0$ y la hipótesis alternativa $H_1: \theta \in \Theta_1$, tales que $\Theta_0 \cap \Theta_1 = \emptyset$.

Para evaluar la plausibilidad del modelo $H_0$, se define un estadístico de prueba $T(X): \mathcal{X} \to \mathbb{R}$, que mapea el espacio de datos observados a la recta real. La distribución de probabilidad de $T(X)$ bajo el supuesto estricto de que $H_0$ es la verdadera generadora de los datos se denota como $f_T(t \mid H_0)$.

El **$p$-valor** se define formalmente como la probabilidad condicional de obtener un estadístico $T(X)$ tan o más extremo que el valor empíricamente computado en la muestra, $t_{\text{obs}}$, asumiendo la validez absoluta de $H_0$:

$$
p\text{-valor} = \mathbb{P}(T(X) \ge t_{\text{obs}} \mid H_0) = \int_{t_{\text{obs}}}^{\infty} f_T(t \mid H_0) \, dt
$$

Es imprescindible explicitar el error de apreciación categórico más extendido en la práctica científica: **el $p$-valor no es la probabilidad de que la hipótesis nula sea cierta**:

$$
p\text{-valor} = \mathbb{P}(T(X) \ge t_{\text{obs}} \mid H_0) \neq \mathbb{P}(H_0 \mid T(X) = t_{\text{obs}})
$$

Invertir los términos del condicional probabilístico constituye la **falacia de la condicional transpuesta** (_transposed conditional fallacy_), estrechamente emparentada con lo que en el contexto forense se conoce como la falacia del fiscal (_prosecutor’s fallacy_): confundir $\mathbb{P}(\text{evidencia} \mid \text{inocencia})$ con $\mathbb{P}(\text{inocencia} \mid \text{evidencia})$. Para calcular $\mathbb{P}(H_0 \mid D)$ se requiere aplicar el Teorema de Bayes, lo cual exige introducir de manera explícita la probabilidad a priori de la hipótesis, $\mathbb{P}(H_0)$:

$$
\mathbb{P}(H_0 \mid D) = \frac{\mathbb{P}(D \mid H_0) \, \mathbb{P}(H_0)}{\mathbb{P}(D \mid H_0) \, \mathbb{P}(H_0) + \mathbb{P}(D \mid H_1) \, \mathbb{P}(H_1)}
$$

Dado que el marco frecuentista rechaza la asignación de distribuciones de probabilidad a parámetros fijos pero desconocidos como $\theta$, el $p$-valor se limita estrictamente a medir la compatibilidad estocástica de los datos con el modelo nulo; no mide la veracidad o falsedad de la teoría que originó el experimento.

* * *

### 2\. La tensión inconciliable: Fisher frente a Neyman-Pearson

La metodología contemporánea del contraste de hipótesis es, en un sentido preciso y bien documentado en la historia de la estadística, una **fusión híbrida e inconsistente** de dos escuelas epistemológicas que sus propios fundadores consideraban incompatibles entre sí: la _Prueba de Significación_ de Sir Ronald Fisher y la _Teoría de Decisiones_ de Jerzy Neyman y Egon Pearson.

#### A. El modelo inductivo de Fisher

Para Fisher, el $p$-valor era un índice continuo que expresaba la fuerza de la evidencia en contra de $H_0$. Un $p$-valor pequeño sugería que o bien había ocurrido un evento extremadamente raro, o bien la hipótesis nula era falsa. Fisher no concibió un marco binario de aceptación/rechazo rígido ni introdujo una hipótesis alternativa formal ($H_1$). Tampoco contempló el error de Tipo II. El proceso era inductivo y, en el propio vocabulario de Fisher, evidencial: el investigador evaluaba el nivel de sorpresa que le causaban los datos en el contexto de su dominio disciplinar, sin comprometerse con una regla de decisión mecánica aplicable de antemano a cualquier experimento futuro.

#### B. El modelo de decisión de Neyman-Pearson

Neyman y Pearson, en su artículo fundacional “On the Problem of the Most Efficient Tests of Statistical Hypotheses” (_Philosophical Transactions of the Royal Society A_, 1933), rechazaron la noción fisheriana de medir “evidencia continua” y plantearon el problema como un mecanismo de **comportamiento inductivo racional** orientado a la toma de decisiones repetidas, minimizando tasas de error a largo plazo ([Royal Society, texto original](https://royalsocietypublishing.org/doi/10.1098/rsta.1933.0009)). Para ello introdujeron:

1.  La formulación explícita de una hipótesis alternativa $H_1$.
2.  La definición _a priori_ del Error de Tipo I ($\alpha$): $\alpha = \mathbb{P}(\text{Rechazar } H_0 \mid H_0 \text{ es verdadera})$.
3.  La definición del Error de Tipo II ($\beta$): $\beta = \mathbb{P}(\text{Aceptar } H_0 \mid H_1 \text{ es verdadera})$.
4.  El concepto de **potencia estadística** ($1 - \beta$), que mide la capacidad del diseño para detectar un efecto real de magnitud especificada.

Bajo Neyman-Pearson, la regla de decisión se rige por el célebre lema que hoy lleva su nombre, que demuestra que la región crítica más potente para contrastar hipótesis simples se obtiene mediante el cociente de verosimilitudes:

$$
\Lambda(x) = \frac{L(\theta_0 \mid x)}{L(\theta_1 \mid x)} \le k
$$

El hibridaje actual toma de Fisher la fijación post-hoc del $p$-valor como medida de evidencia, pero lo combina con el umbral binario $\alpha = 0{,}05$ de Neyman-Pearson sin calcular sistemáticamente la potencia ni especificar $H_1$ de antemano. Esta mescolanza —que ningún estadístico de la generación fundacional habría reconocido como coherente— ha resultado en una distorsión epistemológica severa en la ciencia empírica contemporánea.

* * *

### 3\. Asimetría lógica y la lectura popperiana de la hipótesis nula

El diseño formal del contraste frecuentista encuentra su paralelo directo en la filosofía de la ciencia de Karl Popper. Popper identificó, en _La lógica de la investigación científica_ (1934), una asimetría lógica insuperable entre la verificación y la refutación de enunciados universales.

Sea una teoría científica que predice un fenómeno: $T \implies P$. La verificación empírica del fenómeno $P$ no demuestra la verdad de la teoría $T$, incurriendo en la falacia deductiva de **afirmación del consecuente**:

$$
((T \implies P) \land P) \not\implies T
$$

Por el contrario, la constatación empírica de la ausencia del fenómeno ($\neg P$) refuta categóricamente la teoría que lo predecía, mediante la regla válida del **modus tollens**:

$$
((T \implies P) \land \neg P) \implies \neg T
$$

La prueba de hipótesis de Neyman-Pearson formaliza esta asimetría deductiva en el lenguaje probabilístico: nunca se “prueba” o “acepta” la hipótesis nula ($H_0$); únicamente se concluye que no hay evidencia suficiente para rechazarla. La hipótesis nula opera como la conjetura que se expone al tribunal de la prueba para intentar ser refutada. El rechazo de $H_0$ representa la corroboración provisional de que el modelo nulo es incompatible con los datos; pero la no-refutación de $H_0$ jamás equivale a su verificación ontológica.

Sin embargo, existe un desfasaje estructural entre Popper y la práctica frecuentista que vale la pena subrayar con más fuerza de la que suele dársele: mientras que para Popper la teoría que se expone al riesgo de refutación es la hipótesis sustantiva del investigador ($T$, la conjetura científica en juego), en la arquitectura de la NHST la hipótesis que se intenta refutar es casi siempre la hipótesis nula de “ausencia de efecto” ($H_0$) —el reverso lógico de la conjetura sustantiva—. El investigador busca, por lo tanto, rechazar el modelo nulo para validar de manera indirecta su propia teoría, invirtiendo el objeto directo del intento de refutación respecto de lo que Popper tenía en mente. Es una correspondencia formal real, pero parcial: la NHST hereda de Popper la lógica del modus tollens, no la elección de qué proposición se somete a juicio.

* * *

### 4\. La crisis de replicabilidad y la patología del _p-hacking_

En 2005, John Ioannidis publicó “Why Most Published Research Findings Are False” en _PLoS Medicine_, un artículo hoy considerado fundacional para el campo de la metaciencia ([Wikipedia, “Why Most Published Research Findings Are False”](https://en.wikipedia.org/wiki/Why_Most_Published_Research_Findings_Are_False)). Ioannidis demostró matemáticamente que en campos dominados por estudios con baja potencia estadística, sesgos de publicación y hipótesis a priori poco plausibles, buena parte de los hallazgos declarados “estadísticamente significativos” ($p < 0{,}05$) son, en realidad, falsos positivos.

Sea $R$ la razón entre el número de relaciones verdaderas y el número de relaciones nulas en un campo de investigación determinado ($R = \mathbb{P}(H_1) / \mathbb{P}(H_0)$). El **Valor Predictivo Positivo (VPP)** de un hallazgo significativo se define, aplicando directamente el teorema de Bayes sobre esas razones, como:

$$
\text{VPP} = \frac{(1 - \beta) R}{(1 - \beta) R + \alpha}
$$

Esta es exactamente la formulación del propio Ioannidis, verificable en el texto original del paper ([Ioannidis, 2005, versión completa en PLoS Medicine](https://journals.plos.org/plosmedicine/article/file?id=10.1371%2Fjournal.pmed.0020124&type=printable)). Si un campo estudia hipótesis altamente especulativas donde $R = 0{,}10$, utilizando la potencia estándar del $1 - \beta = 0{,}80$ y el nivel de significación $\alpha = 0{,}05$:

$$
\text{VPP} = \frac{0{,}80 \times 0{,}10}{(0{,}80 \times 0{,}10) + 0{,}05} = \frac{0{,}08}{0{,}08 + 0{,}05} \approx 0{,}615
$$

Incluso en condiciones ideales sin manipulación de datos, el $38{,}5\%$ de todos los descubrimientos significativos serían falsos. Vale una aclaración que el propio debate posterior al paper de Ioannidis puso sobre la mesa: Steven Goodman y Sander Greenland señalaron en una réplica publicada también en _PLoS Medicine_ (2007) que el modelo de Ioannidis, en sus versiones extendidas con sesgo ($u$), tiende a diminuir sistemáticamente el valor evidencial de cualquier estudio individual —incluidos los metaanálisis—, lo cual hace que su conclusión titular sea, en cierto sentido, una consecuencia casi garantizada de los supuestos del propio modelo más que un descubrimiento empírico independiente ([Goodman & Greenland, 2007, PLoS Medicine](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1855693/)). Esta salvedad no invalida el diagnóstico general —la crisis de replicabilidad es hoy un hecho ampliamente documentado por vías independientes del argumento de Ioannidis—, pero sí matiza la fuerza demostrativa que conviene atribuirle específicamente a esta fórmula, que es más una ilustración pedagógica poderosa del problema que una medición empírica directa de su magnitud real.

A esta debilidad estructural se suma la práctica sistémica del **_p_\-hacking**, término popularizado en gran medida por el trabajo de Joseph Simmons, Leif Nelson y Uri Simonsohn, “False-Positive Psychology” (_Psychological Science_, 2011), que documentó empíricamente cuánto se infla la tasa de falsos positivos cuando el investigador dispone de un puñado de “grados de libertad” no reportados en el análisis:

1.  **Parada de recolección selectiva** (_optional stopping_): monitorear continuamente los datos y detener el experimento en el momento exacto en que $p < 0{,}05$.
2.  **Selección post-hoc de variables y submuestras**: evaluar múltiples covariables y reportar únicamente aquellas combinaciones que arrojan significación.
3.  **HARKing** (_Hypothesizing After the Results are Known_), término acuñado por Norbert Kerr en un artículo homónimo de 1998: presentar una hipótesis surgida del análisis exploratorio posterior como si hubiese sido formulada a priori.

El “ritual de la significación estadística” —expresión con la que Gerd Gigerenzer y otros críticos de la psicología metodológica describen esta práctica— transformó una herramienta de evaluación probabilística en una aduana burocrática que premia, estructuralmente, la invención de resultados no replicables.

* * *

### 5\. La alternativa bayesiana: Factores de Bayes como cuantificación continua

Frente a las patologías del contraste frecuentista binario, la inferencia bayesiana ofrece una alternativa formal basada en la comparación directa de la verosimilitud de dos modelos competidores.

El **Factor de Bayes** ($BF_{10}$) cuantifica cuántas veces más probables son los datos observados bajo la hipótesis alternativa $H_1$ en comparación con la hipótesis nula $H_0$:

$$
BF_{10} = \frac{\mathbb{P}(D \mid H_1)}{\mathbb{P}(D \mid H_0)} = \frac{\int_{\Theta_1} f(D \mid \theta_1) \, \pi(\theta_1) \, d\theta_1}{\int_{\Theta_0} f(D \mid \theta_0) \, \pi(\theta_0) \, d\theta_0}
$$

donde $\pi(\theta_1)$ y $\pi(\theta_0)$ representan las distribuciones de probabilidad a priori de los parámetros bajo cada modelo. La escala de interpretación cualitativa más citada para el Factor de Bayes —”evidencia débil” entre 1 y 3, “sustancial” entre 3 y 10, “fuerte” entre 10 y 30, y así sucesivamente— proviene originalmente de Harold Jeffreys en _Theory of Probability_ (1939, con ediciones posteriores revisadas), y sigue siendo el punto de referencia estándar en la literatura bayesiana contemporánea, aunque distintos autores proponen umbrales ligeramente distintos.

Ventajas clave del Factor de Bayes:

-   **Simetría evaluativa**: permite acumular evidencia tanto a favor de la hipótesis alternativa ($BF_{10} > 1$) como a favor de la propia hipótesis nula ($BF_{10} < 1$) — algo que el marco frecuentista, por diseño, no permite hacer con la hipótesis nula.
-   **Invariancia ante la regla de parada**: cumple con el _principio de verosimilitud_, lo que implica que la evidencia acumulada no depende de cuándo decida el investigador detener la recolección de la muestra —a diferencia del $p$-valor bajo _optional stopping_, que sí se infla con el monitoreo continuo—.
-   **Graduación continua de la evidencia**: reemplaza la frontera artificial binaria por una escala continua de fuerza de evidencia.

* * *

### 6\. Conclusión

El $p$-valor no es una medida de la verdad científica ni de la relevancia sustantiva de una teoría; es una métrica de discrepancia condicional entre observaciones empíricas y un modelo estocástico nulo. La conversión de esta herramienta probabilística en un dogma binario mediante el umbral de $p < 0{,}05$ —una convención que ni Fisher ni Neyman-Pearson, por separado, habrían suscripto en la forma híbrida en que hoy se aplica— ha erosionado la confianza en la producción científica empírica.

Para superar la crisis metodológica actual es indispensable abandonar el ritualismo del contraste nulo, transparentar la exploración de datos previa al registro formal del experimento (_preregistration_), e integrar métricas de comparación de modelos continuas como los Factores de Bayes. Solo así la inferencia estadística podrá restituir el espíritu del falsacionismo popperiano, sin la deformación estructural que la fusión accidental de Fisher con Neyman-Pearson terminó imponiéndole en la práctica.

* * *

### Fuentes citadas

-   [Royal Society Publishing — Neyman, J. & Pearson, E.S. (1933), “On the Problem of the Most Efficient Tests of Statistical Hypotheses”, texto original](https://royalsocietypublishing.org/doi/10.1098/rsta.1933.0009)
-   [Wikipedia — “Why Most Published Research Findings Are False”](https://en.wikipedia.org/wiki/Why_Most_Published_Research_Findings_Are_False)
-   [PLoS Medicine — Ioannidis, J.P.A. (2005), texto completo, con la fórmula original del VPP](https://journals.plos.org/plosmedicine/article/file?id=10.1371%2Fjournal.pmed.0020124&type=printable)
-   [PMC — Goodman, S. & Greenland, S. (2007), réplica crítica al modelo de Ioannidis](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1855693/)
