---
title: "Sobre la asimetría de la aprehensión empírica — correlación, causalidad y la arquitectura contrafáctica"
date: 2026-09-04
slug: "sobre-la-asimetria-de-la-aprehension-empirica-correlacion-causalidad-y-la-arquitectura-contrafactica"
translation_key: "sobre-la-asimetria-de-la-aprehension-empirica-correlacion-causalidad-y-la-arquitectura-contrafactica"
lang: "es"
categories: ["Uncategorized"]
tags: []
---

## Resumen

El presente ensayo examina la frontera ontológica y matemática que separa la covariación asociativa de la relación causal. Partiendo del problema de la inducción en David Hume y su posterior formalización en la teoría regularista, se analiza la insuficiencia epistemológica de los modelos estocásticos pasivos. Se expone de manera rigurosa el cálculo de intervenciones (_do_\-calculus) de Judea Pearl, la Paradoja de Simpson como demostración de la opacidad asociativa, el contraste entre la causalidad de Granger y la causalidad contrafáctica, y las limitaciones intrínsecas del aprendizaje profundo (_deep learning_) frente a la inferencia estructural.

## 1\. El marco formal de la covariación y la simetría asociativa

La estadística clásica se construyó, en gran medida, sobre la caracterización de distribuciones conjuntas de variables aleatorias. Sean $X$ e $Y$ dos variables aleatorias definidas sobre un espacio de probabilidad determinado $(\Omega, \mathcal{F}, \mathbb{P})$. La medida fundamental de dependencia lineal entre ambas viene dada por la covarianza:

$$
\text{Cov}(X,Y) = \mathbb{E}[(X - \mathbb{E}[X])(Y - \mathbb{E}[Y])]
$$

Al estandarizar la covarianza mediante el producto de las desviaciones típicas $\sigma_X$ y $\sigma_Y$, obtenemos el coeficiente de correlación de Pearson ($\rho_{X,Y}$):

$$
\rho_{X,Y} = \frac{\text{Cov}(X,Y)}{\sigma_X \sigma_Y}
$$

donde $\rho_{X,Y} \in [-1, 1]$. La propiedad lógica y matemática primordial de este operador es su estricta simetría:

$$
\text{Cov}(X,Y) = \text{Cov}(Y,X) \implies \rho_{X,Y} = \rho_{Y,X}
$$

Esta simetría implica que la información provista por la correlación se limita a cuantificar el grado de covariación simultánea en la muestra observada. Si $X$ e $Y$ presentan una correlación de $0{,}85$, el formalismo estocástico clásico no ofrece ningún criterio interno para determinar si $X$ influye en $Y$, si $Y$ influye en $X$, si ambas están gobernadas por un factor de confusión común $Z$, o si la relación es enteramente espuria.

En el marco del condicionamiento probabilístico estándar (definido por Kolmogorov), la actualización del conocimiento sobre $Y$ tras observar que $X$ toma el valor $x$ se expresa mediante la probabilidad condicional simple:

$$
\mathbb{P}(Y = y \mid X = x) = \frac{\mathbb{P}(Y = y, X = x)}{\mathbb{P}(X = x)}
$$

Esta operación es algebraicamente equivalente a filtrar el espacio muestral $\Omega$ para restringirlo al subconjunto donde la condición $X = x$ ya se satisface de forma natural. Sin embargo, no describe qué le ocurriría a $Y$ si un agente externo alterara mecánicamente el estado de $X$. El filtrado pasivo es un acto de observación, no de intervención.

## 2\. La crítica de Hume y la ontología de la causa

La incapacidad de derivar la dirección causal a partir de la mera coexistencia fenoménica fue identificada por David Hume en su _Tratado de la naturaleza humana_ (1739-1740) y consolidada en la _Investigación sobre el entendimiento humano_ (1748). Hume desmanteló la noción aristotélica y escolástica de la “causa eficiente”, argumentando que la mente humana jamás percibe el “nexo necesario” (_necessary connexion_) que une a dos eventos.

Según el análisis humeano, cuando afirmamos que un evento $A$ causa un evento $B$, la experiencia sensible solo nos proporciona tres elementos: contigüidad en el espacio y en el tiempo; prioridad temporal del supuesto antecedente ($A$) respecto al consecuente ($B$); y conjunción constante (_constant conjunction_) —la verificación histórica repetida de que a eventos semejantes a $A$ les han seguido eventos semejantes a $B$.

Para Hume, la causalidad no radica en una propiedad física u ontológica del mundo exterior, sino en una costumbre o hábito psicológico. Tras presenciar la conjunción constante entre $A$ y $B$, la mente realiza una proyección inductiva e infiere una necesidad que la naturaleza nunca le exhibe de forma directa. Este planteamiento dio origen a la teoría regularista de la causalidad: se define que $c$ es causa de $e$ si y solo si los eventos tipo $C$ son seguidos con regularidad por eventos tipo $E$ bajo condiciones de contigüidad y sucesión temporal.

El límite epistemológico del planteamiento humeano radicaba en que la conjunción constante es indistinguible de la correlación perfecta. Si dos fenómenos son efectos independientes de una misma causa oculta —por ejemplo, la lectura de un barómetro y la llegada de una tormenta—, la conjunción constante se verifica sin que exista una relación causal directa entre ellos. Mover manualmente la aguja del barómetro no desencadenará una tormenta. La filosofía de la ciencia del siglo XX comprendió que para romper el círculo vicioso de la teoría regularista era indispensable introducir un concepto formal de manipulación contrafáctica.

## 3\. La revolución estructural de Pearl y el cálculo _do_

Judea Pearl superó el impase humeano mediante el desarrollo de los Modelos Causales Estructurales (_Structural Causal Models_, SCM) y el álgebra del operador _do_. En la formulación de Pearl, un sistema causal se representa mediante un Grafo Acíclico Dirigido (DAG) $G = (V, E)$, donde los vértices $V$ representan variables aleatorias y las aristas dirigidas $E$ representan relaciones causales directas.

Un SCM consta de un conjunto de variables endógenas $V$, un conjunto de variables exógenas o de ruido $U$, y un conjunto de funciones estructurales $F = \{f_1, f_2, \dots, f_k\}$ tales que cada variable $V_i \in V$ se determina de manera determinista condicionada por sus padres causales $\text{Pa}_i \subset V$ y por las variables no observadas $U_i$:

$$
V_i = f_i(\text{Pa}_i, U_i)
$$

A partir de esta arquitectura, Pearl formaliza la distinción entre observación e intervención. Mientras que $\mathbb{P}(Y \mid X = x)$ representa la probabilidad condicional observacional, la expresión $\mathbb{P}(Y \mid \text{do}(X = x))$ representa la distribución de probabilidad de $Y$ cuando el sistema es sometido a una intervención externa que fija $X$ al valor $x$.

Gráficamente, la operación $\text{do}(X = x)$ equivale a realizar una “cirugía gráfica” sobre el DAG: se eliminan todas las aristas dirigidas que entran hacia $X$, y se sustituye la función $f_X$ por la constante $x$. Con esta operación se rompe el flujo de confusión entrante desde cualquier variable ancestro $Z$, aislando el efecto causal puro que se propaga desde $X$ hacia sus descendientes.

```
Grafo observacional (confundido por Z)          Grafo intervenido: do(X = x)

              [ Z ]                                        [ Z ]
             /     \                                              \
            v       v                                              v
          [ X ] --> [ Y ]                          X = x -----> [ Y ]

   (flecha Z -> X presente)                    (flecha Z -> X eliminada por cirugía)
```

El cálculo _do_ se rige por tres reglas fundamentales que permiten transformar expresiones que contienen el operador _do_ en expresiones puramente observacionales, siempre que la topología del grafo cumpla con criterios de separación (_d_\-separación):

**Regla 1** (inserción/eliminación de observaciones):  

$$
\mathbb{P}(y \mid \text{do}(x), z, w) = \mathbb{P}(y \mid \text{do}(x), w) \quad \text{si } (Y \perp\!\!\!\perp Z \mid X, W)_{G_{\bar{X}}}
$$

**Regla 2** (intercambio de acción y observación):  

$$
\mathbb{P}(y \mid \text{do}(x), \text{do}(z), w) = \mathbb{P}(y \mid \text{do}(x), z, w) \quad \text{si } (Y \perp\!\!\!\perp Z \mid X, W)_{G_{\bar{X}, \underline{Z}}}
$$

**Regla 3** (inserción/eliminación de acciones):  

$$
\mathbb{P}(y \mid \text{do}(x), \text{do}(z), w) = \mathbb{P}(y \mid \text{do}(x), w) \quad \text{si } (Y \perp\!\!\!\perp Z \mid X, W)_{G_{\bar{X}, \bar{Z}(W)}}
$$

donde $G_{\bar{X}}$ denota el grafo resultante de eliminar las aristas entrantes a $X$, y $G_{\underline{Z}}$ el resultante de eliminar las aristas salientes de $Z$.

La célebre Fórmula de Ajuste por la Puerta Trasera (_backdoor criterion_) se deriva directamente de estas reglas: si un conjunto de variables $Z$ satisface que ningún elemento de $Z$ es descendiente de $X$, y $Z$ bloquea todo camino entrante a $X$ que conduzca a $Y$, entonces el efecto causal se puede calcular mediante datos pasivos:

$$
\mathbb{P}(Y = y \mid \text{do}(X = x)) = \sum_{z} \mathbb{P}(Y = y \mid X = x, Z = z) \, \mathbb{P}(Z = z)
$$

## 4\. La Paradoja de Simpson como demostración de opacidad asociativa

La insuficiencia de la estadística no estructural se manifiesta con claridad en la Paradoja de Simpson (o efecto Yule-Simpson). Esta paradoja ocurre cuando la dirección de una asociación estadística entre dos variables se invierte al desagregar los datos en subgrupos gobernados por una tercera variable.

Considérese el siguiente caso empírico simulado sobre la efectividad de un tratamiento médico ($X = 1$ si recibe fármaco, $X = 0$ en caso contrario) sobre la recuperación de los pacientes ($Y = 1$ si se recupera, $Y = 0$ en caso contrario), condicionado a la severidad del cuadro del paciente al ingreso ($Z = 1$ para casos graves, $Z = 0$ para casos leves):

**Datos agregados de la población** (ciegos a $Z$):

Grupo

Recuperados ($Y=1$)

Total

Tasa de recuperación

Tratados ($X=1$)

200

800

25%

Control ($X=0$)

160

400

40%

En apariencia, el tratamiento empeora los resultados: la tasa de recuperación de los tratados (25%) es sensiblemente inferior a la de los no tratados (40%). Sin embargo, esta agregación oculta que la distribución de $Z$ no es la misma en ambos grupos: los pacientes graves, que tienen peor pronóstico con independencia del tratamiento, son sistemáticamente derivados con mayor frecuencia hacia el grupo tratado —un patrón habitual en la práctica clínica real, donde a los casos más severos se les ofrece el fármaco precisamente por su gravedad—.

**Datos desagregados por severidad ($Z$):**

Grupo

Severidad

Recuperados ($Y=1$)

Total

Tasa de recuperación

Tratados ($X=1$)

Graves ($Z=1$)

180

600

30%

Control ($X=0$)

Graves ($Z=1$)

30

100

30%

Tratados ($X=1$)

Leves ($Z=0$)

20

200

10%

Control ($X=0$)

Leves ($Z=0$)

130

300

43{,}3%

_(Nota: este segundo desglose no es el que invierte la tendencia respecto al agregado, sino el que la explica por composición: casi todos los tratados —600 de 800— son casos graves con peor pronóstico basal, mientras que la mayoría de los controles —300 de 400— son casos leves con mejor pronóstico basal. La agregación mezcla dos poblaciones de gravedad estructuralmente distinta.)_

Para obtener el ejemplo canónico de Simpson —donde la tendencia se **invierte**, no solo se explica por composición—, basta con reponderar el ejemplo de modo que el tratamiento sea mejor en **ambos** subgrupos y aun así aparezca peor en el agregado:

Grupo

Severidad

Recuperados ($Y=1$)

Total

Tasa de recuperación

Tratados ($X=1$)

Graves ($Z=1$)

180

600

**30%**

Control ($X=0$)

Graves ($Z=1$)

20

100

20%

Tratados ($X=1$)

Leves ($Z=0$)

20

200

**10%**

Control ($X=0$)

Leves ($Z=0$)

140

300

46{,}7%

Verificación algebraica de los totales agregados con esta segunda reponderación: tratados, $(180+20)/(600+200) = 200/800 = 25\%$; control, $(20+140)/(100+300) = 160/400 = 40\%$ — exactamente las cifras agregadas de la tabla original. Y sin embargo, dentro de cada subgrupo de severidad, el tratamiento es _igual o peor_ que el control (30% vs. 20% entre graves —aquí el tratado es mejor—, y 10% vs. 46,7% entre leves —aquí es mucho peor—), lo cual muestra que el agregado no revela una relación causal simple: la dirección del efecto depende críticamente de si se condiciona o no en $Z$, y decidir cuál de las dos lecturas —agregada o desagregada— es la causalmente correcta no es una pregunta que los datos respondan por sí solos. Requiere, en el vocabulario de Pearl, saber si $Z$ es un confusor que debe cerrarse mediante ajuste por puerta trasera, o si es en cambio una variable mediadora o un colisionador, cuyo ajuste introduciría sesgo en lugar de corregirlo. La aritmética nunca decide esa pregunta: la decide la estructura causal supuesta, representada en el DAG.

## 5\. La causalidad de Granger frente a la causalidad contrafáctica

Un segundo formalismo que suele confundirse con la causalidad estructural de Pearl —a veces de forma acrítica en la literatura econométrica y de series de tiempo— es la causalidad de Granger, propuesta por el econometrista Clive W. J. Granger en su artículo seminal “Investigating Causal Relations by Econometric Models and Cross-Spectral Methods” (_Econometrica_, 1969), trabajo que contribuyó a que Granger recibiera el Premio Nobel de Economía en 2003 ([Econlib, biografía de Clive Granger](https://www.econlib.org/library/Enc/bios/Granger.html)).

La definición formal de Granger es puramente predictiva, no estructural: dada una serie temporal $X_t$ y otra $Y_t$, se dice que $X_t$ “Granger-causa” a $Y_t$ si los valores pasados de $X_t$ mejoran la predicción de los valores futuros de $Y_t$ más allá de lo que ya predicen los valores pasados de la propia $Y_t$ ([Wikipedia, “Granger causality”](https://en.wikipedia.org/wiki/Granger_causality); [Number Analytics, “Granger Causality in Statistical Inference”](https://www.numberanalytics.com/blog/granger-causality-statistical-inference)). En la especificación autorregresiva estándar mediante un modelo VAR (vector autorregresivo), esto se traduce en probar si los coeficientes asociados a los rezagos de $X$ son conjuntamente significativos en la ecuación que predice $Y$:

$$
Y_t = \alpha + \sum_{i=1}^{p} \beta_i Y_{t-i} + \sum_{j=1}^{q} \delta_j X_{t-j} + \varepsilon_t
$$

Si el conjunto $\{\delta_1, \dots, \delta_q\}$ es estadísticamente distinguible de cero (mediante un test F conjunto), se concluye que $X_t$ Granger-causa a $Y_t$. La propiedad de asimetría del test —que $X$ Granger-cause a $Y$ no implica que $Y$ Granger-cause a $X$— es lo que le da al formalismo su apariencia de robustez direccional, y explica buena parte de su popularidad en econometría y en el análisis de conectividad de series biológicas ([arXiv, “Towards a Quantitative Theory of Digraph-Based Complexes”](https://arxiv.org/pdf/2409.09862)).

Sin embargo, el propio Granger fue explícito sobre las limitaciones filosóficas de su propuesta: la relación que su test detecta es de **precedencia predictiva**, no de causalidad estructural en el sentido de Pearl o incluso en el sentido humeano completo. El propio nombre del test es, en cierto sentido, engañoso —Granger prefería en sus escritos posteriores hablar de “causalidad temporal” o directamente evitar el término “causalidad” sin matización—. Dos problemas concretos separan a Granger de Pearl:

1.  **Vulnerabilidad a la confusión no observada.** Si una variable oculta $Z$ afecta tanto a $X$ como a $Y$ con distintos rezagos temporales, $X_{t-1}$ puede mejorar la predicción de $Y_t$ sin que exista ningún vínculo causal directo entre ambas —el caso paradigmático es el del “amigo sobrio que sigue al borracho”: si un amigo sobrio camina detrás de una persona ebria manteniendo una distancia constante para asegurarse de que no se lastime, la trayectoria del amigo será predecible a partir de la trayectoria pasada del ebrio con altísima precisión estadística, sin que el ebrio esté causando el movimiento del amigo en ningún sentido estructural relevante ([Econlib, ejemplo desarrollado en la biografía de Granger](https://www.econlib.org/library/Enc/bios/Granger.html))—.
2.  **Incapacidad para responder preguntas contrafácticas.** Aun cuando el test de Granger detecte precedencia predictiva genuina y no espuria, no puede responder la pregunta $\mathbb{P}(Y \mid \text{do}(X=x))$: no puede decir qué ocurriría con $Y$ si un agente externo fijara $X$ en un valor distinto al que tomó naturalmente. Es, en la terminología de la “escalera de la causalidad” que el propio Pearl propone en _The Book of Why_, una herramienta que opera enteramente en el primer peldaño —el de la asociación y la predicción—, sin ascender al segundo peldaño de la intervención ni, mucho menos, al tercero, el de los contrafácticos propiamente dichos ([lgmoneda.github.io, resumen de la escalera de causalidad de Pearl](https://lgmoneda.github.io/2018/06/01/the-book-of-why.html); [arXiv, “Bounding Causal Effects and Counterfactuals”, exposición formal de los tres niveles](https://arxiv.org/pdf/2508.13607)).

La causalidad de Granger, en suma, es un test operacional útil dentro de su dominio de aplicación —la predicción de series temporales bajo el supuesto, casi nunca verificado explícitamente, de ausencia de confusores no observados—, pero no debe confundirse con una prueba de causalidad estructural en el sentido pleno. Confundir ambos formalismos es, en cierto modo, una repetición contemporánea del mismo error que Hume ya había señalado: tomar la conjunción constante —aquí, la mejora predictiva sistemática— por la necesidad causal.

## 6\. Las limitaciones estructurales del aprendizaje profundo frente a la inferencia causal

La arquitectura dominante del aprendizaje automático contemporáneo —incluidos los modelos de aprendizaje profundo de mayor escala— opera, en la terminología de Pearl, casi exclusivamente en el primer peldaño de la escalera de la causalidad: el de la asociación. Un modelo entrenado mediante descenso de gradiente sobre una función de pérdida definida sobre pares observacionales $(x, y)$ aprende, en el mejor de los casos, a aproximar la distribución condicional $\mathbb{P}(Y \mid X)$ —o, en arquitecturas generativas más recientes, la distribución conjunta completa—, pero no incorpora, salvo que se lo fuerce explícitamente mediante supuestos adicionales, ningún mecanismo para distinguir esa distribución de la distribución interviniente $\mathbb{P}(Y \mid \text{do}(X))$.

Pearl fue explícito y reiterado en esta crítica en distintas entrevistas y en _The Book of Why_ (2018, con Dana Mackenzie): calificó al aprendizaje profundo, tal como se practica mayoritariamente, como un ejercicio sofisticado de ajuste de curvas (_curve fitting_) —complejo, no trivial, capaz de capturar regularidades estadísticas de altísima dimensionalidad, pero incapaz, por construcción, de responder a la pregunta “por qué” en el sentido causal fuerte del término, precisamente porque nunca fue entrenado sobre datos de intervención ni sobre una estructura causal explícita que le permita simular contrafácticos ([Data Machina, cita de Pearl sobre _curve fitting_, 2024](https://datamachina.com/2024/02/25/data-machina-242/); [p-hunermund.com, reseña del simposio “Beyond Curve Fitting” en Stanford](https://p-hunermund.com/2019/04/04/beyond-curve-fitting/)).

Esta limitación no es meramente retórica: tiene una manifestación técnica precisa. Un modelo asociativo, entrenado exclusivamente sobre $\mathbb{P}(Y \mid X)$, no dispone de información suficiente para responder correctamente cuando la distribución de los confusores $Z$ cambia entre el conjunto de entrenamiento y el de despliegue —el problema conocido como _distributional shift_—, porque la relación aprendida está condicionada implícitamente a la distribución particular de $Z$ observada durante el entrenamiento, y no aísla el mecanismo estructural invariante $f_Y(X, Z, U_Y)$ que seguiría siendo válido bajo una intervención. Evaluaciones recientes sobre modelos de lenguaje de gran escala, usando explícitamente la escalera de causalidad de Pearl como referencia —por ejemplo, el benchmark _CLadder_, diseñado para evaluar razonamiento causal en modelos de lenguaje—, muestran que estos sistemas siguen teniendo un desempeño notablemente más débil en preguntas de intervención y, sobre todo, contrafactuales que en preguntas puramente asociativas, aun cuando su desempeño en tareas de lenguaje natural sea sobresaliente ([Data Machina, resumen del paper _CLadder_](https://datamachina.com/2024/02/25/data-machina-242/)).

La respuesta que propone el propio Pearl —y que ha sido retomada por investigadores como Yoshua Bengio bajo la etiqueta de _causal representation learning_— no es abandonar el aprendizaje profundo, sino dotarlo de una capa estructural explícita: incorporar supuestos causales en forma de grafos, mecanismos invariantes o restricciones de independencia que permitan al sistema, al menos en principio, ascender del primer al segundo peldaño de la escalera —de la asociación a la intervención— y eventualmente al tercero. El diagnóstico de fondo, sin embargo, permanece: ningún volumen de datos puramente observacionales, por masivo que sea, puede sustituir por sí solo a la información estructural que solo una intervención real, o un supuesto causal explícito y falsable, puede proporcionar. Es, en el fondo, la misma lección que Hume dejó planteada en 1739 y que Pearl formalizó dos siglos y medio después: la escala de los datos no resuelve el problema de la inducción: solo lo hace más difícil de notar.

## Conclusión general

Los seis apartados de este ensayo convergen en una sola tesis, sostenida en registros distintos —filosófico en Hume, matemático en Pearl, estadístico en Simpson, econométrico en Granger, y computacional en el aprendizaje profundo—: ninguna cantidad de covariación observada, por perfecta que sea su ajuste estadístico, sustituye a una estructura causal explícita. La correlación describe lo que el mundo hizo; la causalidad, formalizada mediante el operador _do_, describe lo que el mundo haría si actuáramos sobre él distinto. Confundir ambos registros —ya sea por comodidad computacional, por la elegancia predictiva de un test de Granger, o por la potencia bruta de un modelo de aprendizaje profundo— es repetir, con herramientas cada vez más sofisticadas, el mismo salto que Hume identificó como un hábito de la imaginación y no como una necesidad del mundo.

* * *

### Fuentes citadas

-   [Econlib — “Clive W. J. Granger”, biografía y ejemplo del “amigo sobrio que sigue al borracho”](https://www.econlib.org/library/Enc/bios/Granger.html)
-   [Wikipedia — “Granger causality”](https://en.wikipedia.org/wiki/Granger_causality)
-   [Number Analytics — “Granger Causality in Statistical Inference”](https://www.numberanalytics.com/blog/granger-causality-statistical-inference)
-   [arXiv — “Towards a Quantitative Theory of Digraph-Based Complexes and its Applications in Brain Network Analysis” (formulación VAR de Granger)](https://arxiv.org/pdf/2409.09862)
-   [lgmoneda.github.io — resumen de la escalera de causalidad de Pearl](https://lgmoneda.github.io/2018/06/01/the-book-of-why.html)
-   [arXiv — “Bounding Causal Effects and Counterfactuals” (formalización de los tres niveles de la escalera)](https://arxiv.org/pdf/2508.13607)
-   [Data Machina #242 — cita de Pearl sobre _curve fitting_ y el benchmark CLadder](https://datamachina.com/2024/02/25/data-machina-242/)
-   [p-hunermund.com — reseña del simposio “Beyond Curve Fitting”, Stanford](https://p-hunermund.com/2019/04/04/beyond-curve-fitting/)
