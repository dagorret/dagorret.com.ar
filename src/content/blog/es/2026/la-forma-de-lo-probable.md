---
title: "La forma de lo probable"
date: 2026-10-24
slug: "la-forma-de-lo-probable"
translation_key: "la-forma-de-lo-probable"
lang: "es"
categories: ["Inteligencia Artificial"]
tags: ["Epistemologia","Filosofía de la Tecnología","Modelos de Lenguaje","Redes Neuronales"]
---

_Primera parte de un tríptico. La segunda, [La forma de lo probable, sin fórmulas](https://dagorret.com.ar/la-forma-de-lo-probable-sin-formulas/), explica el mismo mecanismo con esquemas y sin matemática; la tercera, [La forma de lo probable, en fórmulas](https://dagorret.com.ar/la-forma-de-lo-probable-en-formulas/), lo desarrolla con todo su aparato formal._

**Una respuesta de inteligencia artificial no es una observación del mundo, sino la forma que adopta lo más probable a partir de lo que la humanidad dejó por escrito. Este ensayo examina el mecanismo que produce esa forma y los límites que de él se derivan.**

La conversación pública sobre inteligencia artificial tiene dos imágenes por defecto. La primera es el robot: un cuerpo metálico que camina, mira y, tarde o temprano, decide. La segunda es la computadora que piensa, una máquina cada vez más potente que en algún momento “despierta”. Las dos imágenes comparten un vicio: ubican la inteligencia en el aparato. Una la pone en el cuerpo y la otra en el hardware.

La tesis que sostengo es otra. La IA que hoy usamos no es un robot ni una computadora: es un algoritmo. La computadora es apenas el lugar donde ese algoritmo se ejecuta, como el papel es el lugar donde se escribe una demostración. Pero conviene no quedarse en la fórmula “nada más que algoritmos”, porque esconde lo decisivo. El algoritmo, en sí, es sorprendentemente corto. Lo que pesa, lo que sabe y lo que se equivoca está en otra parte: en unos números aprendidos a partir de lo que los humanos escribimos.

Para ver esa cara oculta hay que bajar al mecanismo. Empiezo por la pieza más chica.

## Una cuenta con nombre de célula

Una neurona artificial no se parece mucho a una neurona. Es una cuenta. Recibe varios números de entrada, los multiplica cada uno por un peso, suma todo, agrega un término fijo llamado sesgo y pasa el resultado por una función. Dicho en notación:

$$
z = \sum_{i=1}^{n} w_i\, x_i + b, \qquad y = f(z)
$$

Gráficamente, para tres entradas:

$$
\begin{array}{ccccc} x_1 \cdot w_1 & \searrow & & & \\ x_2 \cdot w_2 & \longrightarrow & \boxed{\;\Sigma + b\;} & \xrightarrow{\;\;f\;\;} & y \\ x_3 \cdot w_3 & \nearrow & & & \end{array}
$$

Las entradas $x_i$ pueden ser cualquier cosa que se pueda expresar como número: la intensidad de un píxel, una palabra codificada, la salida de otra neurona. El peso $w_i$ dice cuánto importa cada entrada, y puede ser negativo, que es la forma matemática de decir “esto me inhibe”. El sesgo $b$ corre el umbral a partir del cual la neurona responde.

La función $f$ se llama función de activación y es menos decorativa de lo que parece. Las más conocidas son la ReLU, que deja pasar los valores positivos y anula los negativos, y la sigmoide, que aplasta cualquier número entre 0 y 1:

$$
\mathrm{ReLU}(z) = \max(0, z), \qquad \sigma(z) = \frac{1}{1 + e^{-z}}
$$

Los modelos de lenguaje actuales usan variantes más suaves, pero la idea es la misma. Lo importante es que $f$ no es lineal. Si lo fuera, apilar mil capas de neuronas daría exactamente lo mismo que una sola, porque una composición de funciones lineales sigue siendo lineal. La no linealidad es lo que permite que una red aproxime funciones arbitrariamente complicadas; el resultado clásico en esta dirección es el teorema de aproximación universal de Hornik, Stinchcombe y White (_Neural Networks_, 1989).

La metáfora biológica viene de lejos. Warren McCulloch y Walter Pitts propusieron en 1943 un modelo lógico de la neurona ([_Bulletin of Mathematical Biophysics_](https://doi.org/10.1007/BF02478259)), y Frank Rosenblatt construyó sobre esa idea el perceptrón en 1958 ([_Psychological Review_](https://doi.org/10.1037/h0042519)). Las dendritas eran las entradas, el soma la suma, el axón la salida. Pero la analogía es floja, y conviene decirlo: una neurona real tiene dinámica temporal, disparos, química y dendritas que computan por su cuenta. Beniaguev, Segev y London mostraron que hace falta una red artificial de varias capas para imitar con fidelidad la respuesta de una sola neurona piramidal cortical ([_Neuron_, 2021](https://doi.org/10.1016/j.neuron.2021.07.002)). La neurona artificial no es una neurona simplificada. Es otra cosa con un nombre prestado.

## Los pesos no son de nadie

Una pregunta natural es de quién son los pesos: ¿de cada neurona o de la red? La respuesta precisa es que pertenecen a las conexiones. Cada peso vive en el enlace entre una neurona de una capa y una neurona de la siguiente. Una neurona que recibe 512 entradas tiene 512 pesos y un sesgo, y ese conjunto define qué patrón la activa.

En la práctica, nadie calcula neurona por neurona. Una capa entera se expresa como una multiplicación de matrices:

$$
\mathbf{y} = f\left(W\mathbf{x} + \mathbf{b}\right), \qquad W \in \mathbb{R}^{1024 \times 512}
$$

Si la capa recibe 512 valores y tiene 1024 neuronas, sus pesos forman una matriz de 1024 filas por 512 columnas. Por eso las placas gráficas, diseñadas para multiplicar matrices a gran velocidad, se volvieron la infraestructura de la IA. Y cuando se dice que un modelo tiene “setenta mil millones de parámetros”, lo que se cuenta es la suma de todos los pesos y sesgos de todas sus matrices.

Hay un punto más incómodo. Un peso aislado casi nunca significa nada interpretable. El conocimiento está distribuido: un concepto queda codificado en patrones de muchísimos pesos a la vez, y cada peso participa de muchos conceptos. No hay un lugar en la red donde esté guardado “París” o “ironía”. Esa es la razón por la que leer qué sabe un modelo es tan difícil, y por la que existe toda una disciplina, la interpretabilidad mecanicista, dedicada a intentarlo.

## Por qué se llama red

Apenas se conecta la salida de una neurona con la entrada de otra, lo que aparece es un grafo: las neuronas son nodos y las conexiones con sus pesos son aristas. El nombre “red” no es una metáfora sino una descripción literal.

La disposición más común es en capas. Una capa de entrada recibe los datos y no calcula nada; las capas intermedias, llamadas ocultas porque no se ven desde afuera, toman lo que produjo la anterior y lo transforman; una capa de salida entrega el resultado. Cuando la información fluye siempre hacia adelante, sin ciclos, el grafo es dirigido y acíclico, y la red se llama _feedforward_. Las redes recurrentes, en cambio, tienen ciclos: una neurona recibe su propia salida del paso anterior, lo que les da una forma de memoria.

Lo decisivo de las capas es que la red no es una suma de neuronas sino una composición de funciones:

$$
\hat{y} = f_L\big(\cdots f_2\big(f_1(\mathbf{x})\big)\cdots\big)
$$

Cada capa trabaja sobre lo que produjo la anterior. En una red que procesa imágenes, las primeras capas terminan detectando bordes, las intermedias formas y texturas, las últimas objetos. Nadie programa esa jerarquía; emerge del entrenamiento, porque componer cosas simples resulta una forma eficiente de representar cosas complejas. La palabra “profundo” de _deep learning_ no tiene nada de místico: significa, simplemente, muchas capas.

## El viaje de un prompt

Hasta aquí, la descripción vale para casi cualquier red neuronal. Los modelos de lenguaje agregan una arquitectura específica, el _transformer_ (Vaswani y otros, [“Attention Is All You Need”, 2017](https://arxiv.org/abs/1706.03762)), y un modo particular de uso. Vale la pena seguir el recorrido de un texto desde que se escribe hasta que llega la respuesta:

$$
\begin{aligned} \text{texto} &\xrightarrow{\;\text{tokenizador}\;} [\,t_1, t_2, \dots, t_n\,] \\ &\xrightarrow{\;\text{embeddings}\;} [\,\mathbf{e}_1, \mathbf{e}_2, \dots, \mathbf{e}_n\,] \\ &\xrightarrow{\;\text{capas}\,\times N\;} \mathbf{h}_n \\ &\xrightarrow{\;\text{softmax}\;} P\big(t_{n+1} \mid t_1, \dots, t_n\big) \end{aligned}
$$

El primer paso es la tokenización. La red no lee letras ni palabras: un programa previo parte el texto en fragmentos frecuentes (pedazos de palabras, signos, espacios) y le asigna a cada uno un número de un vocabulario fijo, que suele tener entre cincuenta y doscientos mil elementos. Una pregunta se convierte en una lista de enteros.

El segundo paso son los _embeddings_. Cada número se usa como índice en una tabla enorme de vectores de miles de dimensiones. Esa tabla también está hecha de pesos aprendidos, y es la primera capa real del modelo: transforma un número arbitrario en un punto de un espacio donde los fragmentos de significado parecido quedan cerca. A esos vectores se les incorpora información de posición, porque de otro modo la red no sabría en qué orden venían.

El tercer paso es la pila de capas, que en los modelos grandes llega a ser de decenas o más de cien. Cada capa tiene dos partes. La primera es la atención, el mecanismo que permite que cada token “mire” a los anteriores y tome contexto de ellos:

$$
\mathrm{Attention}(Q, K, V) = \mathrm{softmax}\!\left(\frac{QK^{\top}}{\sqrt{d_k}}\right) V, \qquad Q = XW_Q,\; K = XW_K,\; V = XW_V
$$

Las matrices $W_Q$, $W_K$ y $W_V$ son pesos aprendidos y fijos, pero quién atiende a quién se calcula en el momento, según el texto concreto. Es la diferencia entre aprender una regla y aplicarla. Así, la palabra “banco” termina representada de una manera si antes apareció “plaza” y de otra si apareció “préstamo”. La segunda parte de cada capa es una red _feedforward_ clásica, hecha de las mismas neuronas del principio, que transforma cada vector por separado. Capa tras capa, el vector de cada token se va cargando de contexto.

El cuarto paso es la salida. El vector final del último token se multiplica por otra matriz que produce un puntaje $z_i$ para cada elemento del vocabulario, y una función llamada _softmax_ convierte esos puntajes en probabilidades:

$$
P(t_i) = \frac{e^{z_i / T}}{\sum_{j} e^{z_j / T}}
$$

El parámetro $T$ es la famosa temperatura. Con $T$ baja, la distribución se concentra en las opciones más probables; con $T$ alta, se aplana y el modelo se vuelve más impredecible. De esa distribución se elige un token.

Y entonces viene el paso que suele pasar inadvertido: ese token se agrega al final de la secuencia y todo el proceso vuelve a empezar. La respuesta no se piensa entera y después se escribe. Se genera de a un token por vez, y cada token nuevo pasa a ser parte de la entrada del siguiente. Formalmente, el modelo descompone la probabilidad de un texto completo como un producto de probabilidades condicionales:

$$
P(t_1, \dots, t_n) = \prod_{k=1}^{n} P\big(t_k \mid t_1, \dots, t_{k-1}\big)
$$

## Cómo se alimenta la red

Todo lo anterior describe la red ya entrenada. El entrenamiento usa el mismo recorrido con un truco. Se toma una cantidad descomunal de texto y, en cada posición, se le pide al modelo que prediga el token siguiente, que en este caso ya se conoce. Se mide el error con una función llamada entropía cruzada:

$$
\mathcal{L}(\theta) = -\sum_{k} \log P_\theta\big(t_k \mid t_1, \dots, t_{k-1}\big)
$$

donde $\theta$ representa el conjunto de todos los pesos. Un algoritmo llamado retropropagación, popularizado por Rumelhart, Hinton y Williams ([_Nature_, 1986](https://doi.org/10.1038/323533a0)), calcula cuánto contribuyó cada peso a ese error, y el descenso por gradiente corrige cada uno un poco en la dirección que lo reduce:

$$
\theta \leftarrow \theta - \eta\, \nabla_\theta \mathcal{L}(\theta)
$$

Después de billones de tokens, predecir bien la palabra siguiente obliga al modelo a capturar gramática, hechos, estilos y una buena dosis de razonamiento. Esa etapa se llama preentrenamiento. Luego viene un ajuste posterior, con ejemplos de diálogo y retroalimentación humana o de otros modelos, que convierte un predictor de texto en algo que se comporta como un asistente.

Hay un detalle que cambia la percepción de todo el sistema. Una vez terminado el entrenamiento, los pesos quedan fijos. Cuando alguien escribe un prompt, el modelo no aprende nada en sus pesos. Todo lo que “sabe” de esa conversación vive en la secuencia de tokens que se le vuelve a pasar en cada vuelta, la llamada ventana de contexto. La conversación no deja huella en el algoritmo; es el algoritmo el que la recorre, una y otra vez, desde el principio.

## Verosímil por diseño

Con el mecanismo a la vista, se puede responder una pregunta que suele plantearse mal: ¿qué es, exactamente, una respuesta de IA?

La respuesta rápida es que es una predicción. Pero eso todavía no explica lo que se observa, que es una combinación extraña: las respuestas suenan casi siempre plausibles, aciertan muy a menudo y, aun así, a veces inventan con total aplomo. Las tres cosas tienen la misma raíz.

Primero, la verosimilitud. Minimizar la entropía cruzada equivale a lo que en estadística se llama estimación por máxima verosimilitud:

$$
\hat{\theta} = \arg\max_{\theta} \prod_{k} P_\theta\big(t_k \mid t_1, \dots, t_{k-1}\big)
$$

El término no es una coincidencia afortunada del castellano. El modelo está optimizado, literalmente, para producir el texto más verosímil dada la secuencia anterior, según la distribución de lo que leyó. La verosimilitud no es un efecto colateral: es la función objetivo.

Segundo, la correspondencia con la realidad. El texto con el que se entrena no es arbitrario. Lo escribieron personas describiendo el mundo, discutiendo, calculando, corrigiéndose. Para predecir bien ese texto, la estrategia más eficiente no es memorizarlo sino capturar las regularidades del mundo que lo produjo. Hay evidencia de que esto efectivamente ocurre: Li y colaboradores encontraron que un modelo entrenado solo con secuencias de jugadas de Othello forma una representación interna del tablero ([ICLR, 2023](https://arxiv.org/abs/2210.13382)), y Gurnee y Tegmark mostraron que los modelos de lenguaje codifican internamente coordenadas geográficas y orden temporal ([2023](https://arxiv.org/abs/2310.02207)). A esto se suma una ventaja estadística de la verdad: es consistente. Los errores y las mentiras son diversos y se contradicen entre sí; los hechos se refuerzan desde muchas fuentes. Mi sospecha es que buena parte de la “veracidad” de estos sistemas se explica así: en una enorme cantidad de casos, lo más probable coincide con lo verdadero.

Tercero, y aquí está la cara oculta, la respuesta no es la realidad. Las razones son varias. El modelo es un mapa de un mapa: nunca tocó el mundo, solo el texto sobre el mundo, y hereda sus sesgos, sus huecos y todo lo que nunca se escribió. No tiene un mecanismo interno de verificación: el mismo proceso que produce un dato correcto produce uno inventado, con idéntica fluidez. Dicho de otro modo, una alucinación no es una avería del sistema sino el sistema funcionando como fue diseñado, generando algo verosímil donde no había un patrón verdadero lo bastante fuerte. Además, es una foto congelada, porque los pesos se fijaron al terminar el entrenamiento y el mundo siguió. Y es un muestreo: la misma pregunta puede dar respuestas distintas, porque no hay “la” respuesta del modelo sino una distribución de respuestas posibles.

Queda una razón más profunda, que es filosófica y está abierta. Stevan Harnad formuló en 1990 el problema del anclaje simbólico: cómo pueden los símbolos de un sistema significar algo si solo se definen por otros símbolos ([_Physica D_](https://arxiv.org/abs/cs/9906002)). Emily Bender y Alexander Koller lo reformularon para los modelos de lenguaje con la imagen de un pulpo que intercepta mensajes entre dos náufragos y aprende a imitarlos sin haber visto nunca la isla ([ACL, 2020](https://aclanthology.org/2020.acl-main.463/)). Hasta aquí, el argumento podría leerse como una confirmación de esa postura escéptica, pero los resultados sobre representaciones internas la complican. Tengo la impresión de que la posición más defendible es intermedia: hay algo más que estadística superficial, porque el modelo construye estructuras que se corresponden con el mundo, pero sin contacto causal con ese mundo la referencia queda prestada, mediada por los humanos que escribieron. Es una hipótesis interpretativa, no un resultado establecido.

## Lo que el algoritmo no puede hacer por nosotros

Vuelvo a la tesis inicial. La IA no es un robot ni una computadora; es un algoritmo. Pero el algoritmo, en su forma desnuda, cabe en unas pocas páginas de código: multiplicar matrices, aplicar funciones, calcular probabilidades, elegir un token, repetir. Lo que lo vuelve capaz de escribir, traducir o explicar no está en el código sino en los pesos, y los pesos son la sedimentación estadística de lo que la humanidad dejó por escrito. La cara oculta de la IA no es una conciencia escondida en la máquina. Es nuestro propio texto, comprimido y devuelto con la forma de lo probable.

De ahí se sigue el estatus de cualquier respuesta que produzca. No es un testimonio, porque nadie vio nada; tampoco es una observación, porque nada se midió. Es una hipótesis bien informada, parecida a lo que diría alguien que leyó muchísimo y no puede salir a comprobar nada. Por eso las herramientas que conectan el modelo con algo externo (una búsqueda, la ejecución de un programa, una base de datos) cambian su naturaleza: le devuelven un punto de apoyo fuera del texto.

Y por eso la verificación no se delega. La pregunta pertinente no es si la máquina “sabe”, sino quién se hace cargo de lo que la máquina dice. Esa responsabilidad sigue estando, entera, del lado de quien lee.

* * *

## Fuentes

-   Bender, E. M. y Koller, A. (2020). “Climbing towards NLU: On Meaning, Form, and Understanding in the Age of Data”. _Proceedings of the 58th Annual Meeting of the ACL_, 5185–5198. https://aclanthology.org/2020.acl-main.463/
-   Beniaguev, D., Segev, I. y London, M. (2021). “Single cortical neurons as deep artificial neural networks”. _Neuron_, 109(17), 2727–2739. https://doi.org/10.1016/j.neuron.2021.07.002
-   Gurnee, W. y Tegmark, M. (2023). “Language Models Represent Space and Time”. arXiv:2310.02207. https://arxiv.org/abs/2310.02207
-   Harnad, S. (1990). “The Symbol Grounding Problem”. _Physica D_, 42, 335–346. https://arxiv.org/abs/cs/9906002
-   Hornik, K., Stinchcombe, M. y White, H. (1989). “Multilayer feedforward networks are universal approximators”. _Neural Networks_, 2(5), 359–366. https://doi.org/10.1016/0893-6080(89)90020-8
-   Li, K., Hopkins, A. K., Bau, D., Viégas, F., Pfister, H. y Wattenberg, M. (2023). “Emergent World Representations: Exploring a Sequence Model Trained on a Synthetic Task”. _ICLR 2023_. https://arxiv.org/abs/2210.13382
-   McCulloch, W. S. y Pitts, W. (1943). “A logical calculus of the ideas immanent in nervous activity”. _Bulletin of Mathematical Biophysics_, 5, 115–133. https://doi.org/10.1007/BF02478259
-   Rosenblatt, F. (1958). “The perceptron: A probabilistic model for information storage and organization in the brain”. _Psychological Review_, 65(6), 386–408. https://doi.org/10.1037/h0042519
-   Rumelhart, D. E., Hinton, G. E. y Williams, R. J. (1986). “Learning representations by back-propagating errors”. _Nature_, 323, 533–536. https://doi.org/10.1038/323533a0
-   Vaswani, A. y otros (2017). “Attention Is All You Need”. _Advances in Neural Information Processing Systems 30_. https://arxiv.org/abs/1706.03762
