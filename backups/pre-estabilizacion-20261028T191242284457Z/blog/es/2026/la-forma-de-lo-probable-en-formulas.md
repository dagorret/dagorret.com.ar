---
title: "La forma de lo probable, en fórmulas"
date: 2026-10-24
slug: "la-forma-de-lo-probable-en-formulas"
translation_key: "la-forma-de-lo-probable-en-formulas"
lang: "es"
categories: ["Inteligencia Artificial"]
tags: ["Epistemologia","Matemática","Modelos de Lenguaje","Transformers"]
---

_Tercera parte de un tríptico. La primera, [La forma de lo probable](https://dagorret.com.ar/la-forma-de-lo-probable/), plantea el argumento; la segunda, [La forma de lo probable, sin fórmulas](https://dagorret.com.ar/la-forma-de-lo-probable-sin-formulas/), lo cuenta con esquemas. Esta parte escribe el mecanismo completo, ecuación por ecuación._

**En la primera parte sostuve que el algoritmo de un modelo de lenguaje cabe en unas pocas páginas. Esta parte pone a prueba esa afirmación: escribe el algoritmo entero, desde el prompt convertido en matriz hasta la función que se minimiza, y muestra en qué lugar exacto de las ecuaciones la verosimilitud se separa de la verdad.**

Afirmar que algo es simple es fácil; demostrarlo exige escribirlo. Lo que sigue es una reconstrucción formal de un _transformer_ de solo decodificador, la arquitectura de los modelos de lenguaje actuales, con la notación más estándar posible. Las variantes industriales difieren en detalles (normalización, activaciones, codificación de posición), y señalaré las más relevantes, pero el esqueleto es este. La tesis que interesa no es técnica: es que, una vez escrito todo, se ve que lo que falta en las ecuaciones es precisamente lo que el sistema sabe.

## Notación

Escribo los vectores en negrita minúscula, $\mathbf{x}$, y las matrices en mayúscula, $W$. Un vector es una fila cuando forma parte de una matriz de secuencia. El vocabulario es un conjunto finito $\mathcal{V}$ de tamaño $|\mathcal{V}|$; $d$ es la dimensión del modelo, $n$ la longitud de la secuencia, $L$ el número de capas y $H$ el número de cabezas de atención. El conjunto de todos los parámetros se denota $\theta$.

## La neurona y la capa

Una neurona artificial es una función $\mathbb{R}^m \to \mathbb{R}$ de la forma

$$
y = \varphi\left(\mathbf{w}^{\top}\mathbf{x} + b\right) = \varphi\left(\sum_{i=1}^{m} w_i x_i + b\right)
$$

donde $\varphi$ es una función no lineal. Una capa de $k$ neuronas que comparten la entrada se escribe como una sola operación matricial:

$$
\mathbf{y} = \varphi\left(W\mathbf{x} + \mathbf{b}\right), \qquad W \in \mathbb{R}^{k \times m},\; \mathbf{b} \in \mathbb{R}^{k}
$$

con $\varphi$ aplicada componente a componente. Una red de $L$ capas es una composición $f = f_L \circ \cdots \circ f_1$.

La justificación teórica de esta arquitectura es el teorema de aproximación universal, probado por George Cybenko para activaciones sigmoidales ([_Mathematics of Control, Signals and Systems_, 1989](https://doi.org/10.1007/BF02551274)) y generalizado por Hornik, Stinchcombe y White ([_Neural Networks_, 1989](https://doi.org/10.1016/0893-6080\(89\)90020-8)). En su forma clásica dice que, para toda función continua $f$ sobre un compacto $K \subset \mathbb{R}^m$ y todo $\varepsilon > 0$, existe una red con una sola capa oculta tal que

$$
\sup_{\mathbf{x} \in K} \left| f(\mathbf{x}) - \sum_{j=1}^{N} \alpha_j\, \sigma\left(\mathbf{w}_j^{\top}\mathbf{x} + b_j\right) \right| < \varepsilon
$$

Conviene leer el teorema con cuidado, porque se lo cita mucho más de lo que se lo entiende. Garantiza existencia, no construcción: no dice cuántas neuronas $N$ hacen falta ni cómo encontrar los pesos. Que una red pueda representar una función no implica que el entrenamiento la vaya a encontrar. La profundidad, en la práctica, es lo que vuelve alcanzables representaciones que con una sola capa exigirían un número astronómico de neuronas.

Sin la no linealidad, todo esto colapsa: la composición de funciones afines es afín, $W_2(W_1\mathbf{x} + \mathbf{b}_1) + \mathbf{b}_2 = W'\mathbf{x} + \mathbf{b}'$, y mil capas equivaldrían a una.

## El prompt es una matriz

Este es el punto que más se pasa por alto en la divulgación: la red nunca ve un texto. Ve una matriz.

El primer paso es la tokenización. Un algoritmo de segmentación en subpalabras, típicamente una variante de _byte pair encoding_ (Sennrich, Haddow y Birch, [ACL, 2016](https://arxiv.org/abs/1508.07909)), convierte el texto en una secuencia de índices $t_1, \dots, t_n \in \{1, \dots, |\mathcal{V}|\}$. El tokenizador no se entrena junto con la red: es un preprocesamiento fijo.

El segundo paso es la incrustación. Sea $E \in \mathbb{R}^{|\mathcal{V}| \times d}$ la matriz de _embeddings_ y $\mathbf{u}_t \in \{0,1\}^{|\mathcal{V}|}$ el vector indicador del token $t$. La incrustación es una selección de fila:

$$
\mathbf{e}_t = E^{\top}\mathbf{u}_t \in \mathbb{R}^{d}
$$

Apilando las filas de toda la secuencia, y sumando una codificación de posición $\mathbf{p}_k$ que veremos enseguida, se obtiene la matriz de entrada:

$$
X^{(0)} = \begin{pmatrix} \mathbf{e}_{t_1} + \mathbf{p}_1 \\ \vdots \\ \mathbf{e}_{t_n} + \mathbf{p}_n \end{pmatrix} \in \mathbb{R}^{n \times d}
$$

Esa matriz es, literalmente, lo que la red recibe de una pregunta. Un prompt de mil tokens en un modelo con $d = 4096$ es una matriz de cuatro millones de números. Todo lo que sigue son transformaciones de esa matriz que conservan su forma $n \times d$ hasta la última capa. El recorrido completo, con sus dimensiones, es este:

$$
t_{1:n} \xrightarrow{\;E\;} X^{(0)} \in \mathbb{R}^{n \times d} \xrightarrow{\;\text{bloque}_1\;} X^{(1)} \xrightarrow{\;\cdots\;} X^{(L)} \xrightarrow{\;W_U\;} Z \in \mathbb{R}^{n \times |\mathcal{V}|} \xrightarrow{\;\text{softmax}\;} P
$$

## La fórmula del seno

La atención, como se verá, trata la secuencia como un conjunto: si se permutan las filas de $X$, la salida se permuta igual. Sin información adicional, “el perro mordió al hombre” y “el hombre mordió al perro” serían indistinguibles. Vaswani y colaboradores resolvieron esto en el artículo original del _transformer_ ([“Attention Is All You Need”, 2017](https://arxiv.org/abs/1706.03762)) con una codificación fija, construida con senos y cosenos:

$$
\mathrm{PE}_{(pos,\,2i)} = \sin\left(\frac{pos}{10000^{2i/d}}\right), \qquad \mathrm{PE}_{(pos,\,2i+1)} = \cos\left(\frac{pos}{10000^{2i/d}}\right)
$$

para $i = 0, 1, \dots, d/2 - 1$. La intuición es la de un reloj con muchas agujas: cada par de dimensiones gira a una frecuencia distinta, $\omega_i = 10000^{-2i/d}$, con longitudes de onda que crecen en progresión geométrica desde $2\pi$ hasta $10000 \cdot 2\pi$. Las agujas rápidas distinguen posiciones vecinas; las lentas, posiciones lejanas. Cada posición queda marcada por la configuración conjunta de todas las agujas.

La elección no es estética. Tiene una propiedad que justifica el seno por encima de cualquier otra función periódica. Para cada frecuencia, el par correspondiente a la posición $pos + k$ se obtiene del par de la posición $pos$ mediante una rotación que depende solo de $k$:

$$
\begin{pmatrix} \sin\left(\omega_i (pos + k)\right) \\ \cos\left(\omega_i (pos + k)\right) \end{pmatrix} = \begin{pmatrix} \cos(\omega_i k) & \sin(\omega_i k) \\ -\sin(\omega_i k) & \cos(\omega_i k) \end{pmatrix} \begin{pmatrix} \sin(\omega_i\, pos) \\ \cos(\omega_i\, pos) \end{pmatrix}
$$

La demostración es la fórmula del seno de una suma, $\sin(a + b) = \sin a \cos b + \cos a \sin b$, y su análoga para el coseno. Lo importante es la consecuencia: la posición relativa es una transformación lineal independiente de la posición absoluta. Una red hecha de transformaciones lineales puede, entonces, aprender a razonar en términos de “tres tokens atrás” sin importar dónde esté en el texto.

Muchos modelos actuales, entre ellos la familia LLaMA (Touvron y otros, [2023](https://arxiv.org/abs/2302.13971)), llevan esta idea a su conclusión lógica con la codificación rotatoria de Su y colaboradores (RoFormer, [2021](https://arxiv.org/abs/2104.09864)). En lugar de sumar la posición, rotan directamente los vectores de consulta y clave: si $R_m$ es la matriz de rotación por bloques asociada a la posición $m$, entonces

$$
\left\langle R_m \mathbf{q},\, R_n \mathbf{k} \right\rangle = \mathbf{q}^{\top} R_m^{\top} R_n\, \mathbf{k} = \mathbf{q}^{\top} R_{n-m}\, \mathbf{k}
$$

porque las rotaciones del mismo plano conmutan y $R_m^{\top} = R_{-m}$. El producto escalar entre dos tokens depende solo de su distancia $n - m$. El seno de 2017 sigue estando, ahora dentro de una matriz de rotación.

## La atención

Cada bloque del _transformer_ contiene un mecanismo de atención. A partir de la matriz de entrada $X \in \mathbb{R}^{n \times d}$ se calculan tres proyecciones con matrices aprendidas $W_Q, W_K, W_V \in \mathbb{R}^{d \times d_k}$:

$$
Q = X W_Q, \qquad K = X W_K, \qquad V = X W_V
$$

Cada fila de $Q$ es una consulta; cada fila de $K$, una clave; cada fila de $V$, un valor. La atención compara cada consulta con todas las claves y devuelve un promedio ponderado de los valores:

$$
\mathrm{Attention}(Q, K, V) = \mathrm{softmax}\left(\frac{Q K^{\top}}{\sqrt{d_k}} + M\right) V
$$

donde la softmax se aplica por filas. La matriz $Q K^{\top} \in \mathbb{R}^{n \times n}$ contiene el puntaje de afinidad entre cada par de tokens. La matriz $M$ es la máscara causal, que impide que un token vea los que vienen después:

$$
M_{ij} = \begin{cases} 0 & \text{si } j \le i \\ -\infty & \text{si } j > i \end{cases}
$$

El factor $\sqrt{d_k}$ tiene una justificación precisa. Si las componentes de $\mathbf{q}$ y $\mathbf{k}$ son independientes, de media cero y varianza uno, entonces

$$
\mathbb{E}\left[\mathbf{q}^{\top}\mathbf{k}\right] = 0, \qquad \mathrm{Var}\left(\mathbf{q}^{\top}\mathbf{k}\right) = \sum_{i=1}^{d_k} \mathrm{Var}(q_i k_i) = d_k
$$

Sin la corrección, con $d_k = 128$, los puntajes tendrían desvío típico cercano a 11, la softmax se saturaría en casi un solo valor y sus gradientes serían prácticamente nulos. Dividir por $\sqrt{d_k}$ devuelve la varianza a uno.

En la práctica se usan $H$ cabezas en paralelo, cada una con sus propias proyecciones, y se concatenan:

$$
\mathrm{MultiHead}(X) = \mathrm{Concat}\left(\mathrm{head}_1, \dots, \mathrm{head}_H\right) W_O, \qquad \mathrm{head}_h = \mathrm{Attention}\left(X W_Q^{h}, X W_K^{h}, X W_V^{h}\right)
$$

con $H d_k = d$ y $W_O \in \mathbb{R}^{d \times d}$. Aquí aparece una distinción que en la primera parte formulé en prosa: las matrices $W$ son fijas después del entrenamiento, pero la matriz de pesos de atención $\mathrm{softmax}(QK^{\top}/\sqrt{d_k} + M)$ se recalcula para cada texto. Lo aprendido es la regla con la que se atiende; a quién se atiende se decide en el momento.

La matriz de afinidades es $n \times n$, de modo que el costo de la atención crece como $\mathcal{O}(n^2 d)$. Esa sola expresión explica por qué ampliar la ventana de contexto es caro: duplicar el texto cuadruplica la cuenta.

## El bloque completo

Un bloque combina la atención con una red _feedforward_ clásica, ambas envueltas en conexiones residuales y normalización. En la variante con normalización previa, hoy dominante, un bloque transforma $X$ así:

$$
X' = X + \mathrm{MultiHead}\left(\mathrm{LN}(X)\right), \qquad X" = X' + \mathrm{FFN}\left(\mathrm{LN}(X')\right)
$$

La normalización por capa (Ba, Kiros y Hinton, [2016](https://arxiv.org/abs/1607.06450)) se aplica a cada fila $\mathbf{x} \in \mathbb{R}^d$:

$$
\mathrm{LN}(\mathbf{x}) = \boldsymbol{\gamma} \odot \frac{\mathbf{x} - \mu}{\sqrt{s^2 + \epsilon}} + \boldsymbol{\beta}, \qquad \mu = \frac{1}{d}\sum_{j=1}^{d} x_j, \quad s^2 = \frac{1}{d}\sum_{j=1}^{d} (x_j - \mu)^2
$$

La red _feedforward_ actúa sobre cada token por separado, con una dimensión intermedia que suele ser $d_{ff} \approx 4d$:

$$
\mathrm{FFN}(\mathbf{x}) = W_2\, \varphi\left(W_1 \mathbf{x} + \mathbf{b}_1\right) + \mathbf{b}_2, \qquad W_1 \in \mathbb{R}^{d_{ff} \times d},\; W_2 \in \mathbb{R}^{d \times d_{ff}}
$$

Aquí reaparecen las neuronas del principio: cada fila de $W_1$ es una neurona. La activación original era la ReLU; hoy predominan la GELU, $\mathrm{GELU}(x) = x\,\Phi(x)$ con $\Phi$ la distribución normal acumulada (Hendrycks y Gimpel, [2016](https://arxiv.org/abs/1606.08415)), y variantes con compuertas como SwiGLU (Shazeer, [2020](https://arxiv.org/abs/2002.05202)).

Las conexiones residuales permiten una lectura que la interpretabilidad ha vuelto central: la matriz $X$ funciona como un canal de comunicación, el _residual stream_, en el que cada capa lee y escribe incrementos sin borrar lo anterior (Elhage y otros, [“A Mathematical Framework for Transformer Circuits”, 2021](https://transformer-circuits.pub/2021/framework/index.html)). El modelo no reemplaza representaciones; las va sumando.

## Contar los parámetros

Con las ecuaciones escritas, puede verificarse una cifra que suele repetirse sin explicación. Cada bloque tiene cuatro matrices de atención de $d \times d$ y dos matrices de la red _feedforward_ de $d \times 4d$. Despreciando sesgos y normalizaciones, que son de orden $d$:

$$
N_{\text{bloque}} \approx 4d^2 + 2 \cdot 4d^2 = 12\, d^2, \qquad N_{\text{total}} \approx 12\, L\, d^2 + |\mathcal{V}|\, d
$$

Con $d = 4096$, $L = 32$ y $|\mathcal{V}| = 32\,000$, el primer término da $12 \cdot 32 \cdot 4096^2 \approx 6{,}44 \times 10^9$ y la matriz de _embeddings_ agrega $1{,}3 \times 10^8$. Si la matriz de salida no se comparte con la de entrada, se suman otros $1{,}3 \times 10^8$, y el total ronda los $6{,}7 \times 10^9$: es la cifra que se informa para el modelo de siete mil millones de parámetros de la familia LLaMA, que usa SwiGLU con una dimensión intermedia elegida para mantener aproximadamente esos $8d^2$. El “7B” no es una etiqueta comercial; es una consecuencia aritmética de tres números.

## La salida

Después de $L$ bloques y una normalización final, la última fila $\mathbf{h}_n$ de $X^{(L)}$ se proyecta sobre el vocabulario:

$$
\mathbf{z} = W_U\, \mathbf{h}_n \in \mathbb{R}^{|\mathcal{V}|}
$$

En muchos modelos $W_U = E$, una técnica llamada atadura de pesos (Press y Wolf, [EACL, 2017](https://arxiv.org/abs/1608.05859)): la misma matriz que convierte tokens en vectores convierte vectores en puntajes. Los puntajes $z_i$, llamados _logits_, se transforman en una distribución con una softmax con temperatura $T > 0$:

$$
P(t_{n+1} = i \mid t_{1:n}) = \frac{\exp(z_i / T)}{\sum_{j=1}^{|\mathcal{V}|} \exp(z_j / T)}
$$

Los casos límite aclaran el parámetro. Cuando $T \to 0^{+}$, la distribución se concentra en $\arg\max_i z_i$ y el muestreo se vuelve la decodificación voraz. Cuando $T \to \infty$, tiende a la uniforme sobre $\mathcal{V}$. Entre ambos extremos se suele truncar la cola con el muestreo de núcleo, que conserva el menor conjunto de tokens cuya probabilidad acumulada supera un umbral $p$ (Holtzman y otros, [ICLR, 2020](https://arxiv.org/abs/1904.09751)).

## La autorregresión

El token elegido se agrega a la secuencia y el proceso se repite. Formalmente, el modelo define la probabilidad de un texto completo mediante la regla de la cadena:

$$
P_\theta(t_1, \dots, t_n) = \prod_{k=1}^{n} P_\theta\left(t_k \mid t_1, \dots, t_{k-1}\right)
$$

La máscara causal es lo que hace legítima esta factorización: la representación del token $k$ depende solo de los anteriores. Y tiene una consecuencia práctica: las filas de $K$ y $V$ de los tokens ya procesados no cambian al agregar uno nuevo, de modo que se guardan en memoria, la llamada caché KV, y cada paso nuevo cuesta $\mathcal{O}(n d)$ por capa en lugar de recalcular todo.

## El entrenamiento

Dado un corpus, el entrenamiento minimiza la entropía cruzada promedio de la predicción del token siguiente:

$$
\mathcal{L}(\theta) = -\frac{1}{N} \sum_{k=1}^{N} \log P_\theta\left(t_k \mid t_{<k}\right)
$$

Su exponencial, $\mathrm{PPL} = \exp\left(\mathcal{L}\right)$, es la perplejidad: el número efectivo de opciones entre las que el modelo duda en cada paso.

El gradiente respecto de los _logits_ tiene una forma notablemente simple. Para un solo paso, con $y$ el token correcto, la pérdida es $\ell = -z_y + \log \sum_j e^{z_j}$, y por lo tanto

$$
\frac{\partial \ell}{\partial z_i} = p_i - \mathbb{1}[i = y]
$$

es decir, la diferencia entre la distribución predicha y la verdadera, vista como vector indicador. Ese error se propaga hacia atrás, capa por capa, mediante la regla de la cadena: es la retropropagación de Rumelhart, Hinton y Williams ([_Nature_, 1986](https://doi.org/10.1038/323533a0)). Los parámetros se actualizan con alguna variante del descenso por gradiente,

$$
\theta_{s+1} = \theta_s - \eta\, \nabla_\theta \mathcal{L}(\theta_s)
$$

en la práctica con el optimizador Adam (Kingma y Ba, [ICLR, 2015](https://arxiv.org/abs/1412.6980)), que adapta el tamaño de paso de cada parámetro según sus gradientes recientes.

La relación entre escala y rendimiento resultó sorprendentemente regular. Kaplan y colaboradores ([2020](https://arxiv.org/abs/2001.08361)) encontraron que la pérdida decrece como una ley de potencia en el número de parámetros, aproximadamente $\mathcal{L}(N) \approx (N_c / N)^{\alpha_N}$ con $\alpha_N$ cercano a 0,076, y Hoffmann y colaboradores ([2022](https://arxiv.org/abs/2203.15556)) mostraron que, para un presupuesto de cómputo dado, conviene entrenar con del orden de veinte tokens por parámetro. Son regularidades empíricas, no leyes derivadas, y su extrapolación es materia de debate.

## Dónde se separan lo verosímil y lo verdadero

Llego al punto que justifica el tríptico. Minimizar la entropía cruzada equivale a maximizar la verosimilitud del corpus:

$$
\hat{\theta} = \arg\max_{\theta} \prod_{k=1}^{N} P_\theta\left(t_k \mid t_{<k}\right)
$$

Y la pérdida esperada admite una descomposición que vuelve explícito qué se está optimizando. Si $p$ es la distribución que generó los datos,

$$
\mathbb{E}_{x \sim p}\left[-\log P_\theta(x)\right] = H(p) + D_{\mathrm{KL}}\left(p \,\|\, P_\theta\right)
$$

La entropía $H(p)$ no depende de $\theta$. Lo único que el entrenamiento puede reducir es la divergencia de Kullback-Leibler entre la distribución del texto humano y la del modelo. La lectura es precisa y, a mi juicio, decisiva: la función objetivo contiene a $p$, la distribución de lo que se escribió, y no contiene ningún término para lo verdadero. La verdad entra al sistema solo de manera indirecta, en la medida en que lo escrito tiende a ser verdadero. Cuando ambas cosas coinciden, el modelo acierta; cuando divergen, el modelo sigue a $p$, porque es lo único que se le pidió.

Hay una segunda observación formal, más sutil. La softmax impone $\sum_i P(t_{n+1} = i \mid t_{1:n}) = 1$ en cada paso. El modelo no tiene un estado “no sé”: está obligado a repartir toda la masa de probabilidad entre los tokens del vocabulario, incluso cuando la información del contexto no alcanza. La abstención solo existe si se aprendió como una secuencia de palabras más, con su propia probabilidad.

La literatura reciente le dio a esta intuición una forma más fuerte. Kalai y Vempala ([STOC, 2024](https://arxiv.org/abs/2311.14648)) demostraron que un modelo bien calibrado, en un sentido estadístico preciso, debe alucinar sobre ciertos tipos de hechos con una frecuencia acotada inferiormente por la proporción de hechos que aparecen una sola vez en los datos de entrenamiento, una estimación emparentada con el estimador de Good-Turing. Al mismo tiempo, Kadavath y colaboradores ([2022](https://arxiv.org/abs/2207.05221)) mostraron que los modelos grandes están parcialmente calibrados: sus probabilidades internas contienen información sobre cuándo es probable que acierten. Es decir, el modelo “sabe” algo sobre su propia incertidumbre, pero el objetivo de entrenamiento no lo obliga a expresarla.

## Lo que las ecuaciones no contienen

Con esto queda escrito el algoritmo completo: tokenización, incrustación, codificación de posición, atención con máscara, red _feedforward_, normalización, proyección al vocabulario, softmax, autorregresión, entropía cruzada y descenso por gradiente. Caben, efectivamente, en unas pocas páginas, y un programador entrenado puede implementarlas en unos cientos de líneas.

Lo que no aparece en ninguna de estas ecuaciones es el valor de $\theta$. Las fórmulas describen la forma de lo probable; el contenido de esa forma, los miles de millones de números que la vuelven capaz de escribir, no se deduce de nada de lo anterior. Se obtiene minimizando $D_{\mathrm{KL}}(p \,\|\, P_\theta)$ sobre lo que escribimos. Esa es, quizás, la conclusión más incómoda del tríptico: la parte del sistema que podemos entender por completo es la que no sabe nada, y la parte que sabe es la que no podemos leer.

* * *

## Fuentes

-   Ba, J. L., Kiros, J. R. y Hinton, G. E. (2016). “Layer Normalization”. arXiv:1607.06450. https://arxiv.org/abs/1607.06450
-   Cybenko, G. (1989). “Approximation by superpositions of a sigmoidal function”. _Mathematics of Control, Signals and Systems_, 2(4), 303–314. https://doi.org/10.1007/BF02551274
-   Elhage, N. y otros (2021). “A Mathematical Framework for Transformer Circuits”. _Transformer Circuits Thread_. https://transformer-circuits.pub/2021/framework/index.html
-   Hendrycks, D. y Gimpel, K. (2016). “Gaussian Error Linear Units (GELUs)”. arXiv:1606.08415. https://arxiv.org/abs/1606.08415
-   Hoffmann, J. y otros (2022). “Training Compute-Optimal Large Language Models”. arXiv:2203.15556. https://arxiv.org/abs/2203.15556
-   Holtzman, A., Buys, J., Du, L., Forbes, M. y Choi, Y. (2020). “The Curious Case of Neural Text Degeneration”. _ICLR 2020_. https://arxiv.org/abs/1904.09751
-   Hornik, K., Stinchcombe, M. y White, H. (1989). “Multilayer feedforward networks are universal approximators”. _Neural Networks_, 2(5), 359–366. https://doi.org/10.1016/0893-6080(89)90020-8
-   Kadavath, S. y otros (2022). “Language Models (Mostly) Know What They Know”. arXiv:2207.05221. https://arxiv.org/abs/2207.05221
-   Kalai, A. T. y Vempala, S. S. (2024). “Calibrated Language Models Must Hallucinate”. _Proceedings of the 56th ACM Symposium on Theory of Computing (STOC)_. https://arxiv.org/abs/2311.14648
-   Kaplan, J. y otros (2020). “Scaling Laws for Neural Language Models”. arXiv:2001.08361. https://arxiv.org/abs/2001.08361
-   Kingma, D. P. y Ba, J. (2015). “Adam: A Method for Stochastic Optimization”. _ICLR 2015_. https://arxiv.org/abs/1412.6980
-   Press, O. y Wolf, L. (2017). “Using the Output Embedding to Improve Language Models”. _EACL 2017_. https://arxiv.org/abs/1608.05859
-   Rumelhart, D. E., Hinton, G. E. y Williams, R. J. (1986). “Learning representations by back-propagating errors”. _Nature_, 323, 533–536. https://doi.org/10.1038/323533a0
-   Sennrich, R., Haddow, B. y Birch, A. (2016). “Neural Machine Translation of Rare Words with Subword Units”. _ACL 2016_. https://arxiv.org/abs/1508.07909
-   Shazeer, N. (2020). “GLU Variants Improve Transformer”. arXiv:2002.05202. https://arxiv.org/abs/2002.05202
-   Su, J. y otros (2021). “RoFormer: Enhanced Transformer with Rotary Position Embedding”. arXiv:2104.09864. https://arxiv.org/abs/2104.09864
-   Touvron, H. y otros (2023). “LLaMA: Open and Efficient Foundation Language Models”. arXiv:2302.13971. https://arxiv.org/abs/2302.13971
-   Vaswani, A. y otros (2017). “Attention Is All You Need”. _Advances in Neural Information Processing Systems 30_. https://arxiv.org/abs/1706.03762
