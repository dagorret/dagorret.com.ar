---
title: "Evolución con memoria: por qué la inteligencia artificial no tiene por qué colapsar"
date: 2026-11-05
slug: evolucion-con-memoria
translation_key: evolucion-con-memoria
lang: es
categories:
  - Inteligencia artificial
tags:
  - model collapse
  - datos sintéticos
  - deriva acotada
  - probabilidad
---

*Este texto es la segunda parte de [«El mito del colapso digital»](/mito-colapso-digital/). Allá discutí el relato; acá discuto la matemática.*

El argumento del *model collapse* tiene una parte formal impecable y un supuesto que casi nadie mira. La parte formal demuestra que un modelo entrenado solo con lo que generó el anterior pierde, generación tras generación, la variedad de los datos originales. El supuesto es que los datos humanos se tiran después del primer paso. La tesis que sostengo es que, si se cambia ese supuesto por uno más realista (los datos se acumulan en vez de reemplazarse), el colapso desaparece y lo que queda es una deriva acotada. No es una demostración sobre los modelos de lenguaje reales, sino sobre un modelo de juguete que alcanza para mostrar dónde está el agujero.

## La fotocopia de la fotocopia

La imagen que circula es la de sacar una fotocopia de otra fotocopia: en cada copia se pierde un poco, y al cabo de suficientes copias no queda nada legible. La versión académica es el artículo de [Shumailov y colegas en *Nature* (2024)](https://doi.org/10.1038/s41586-024-07566-y), que mostró que el uso indiscriminado de contenido generado por modelos hace desaparecer las colas de la distribución original: lo raro, lo técnico, lo metafórico. El fenómeno es real. La pregunta pertinente es bajo qué condiciones ocurre.

## La formulación

Sea $p_0$ la distribución de los datos humanos. En cada generación $t \ge 1$ se entrena un modelo con $n$ muestras y se usa ese modelo para producir las muestras de la siguiente. Para poder hacer cuentas conviene el caso más simple posible: datos gaussianos y un modelo que solo estima media y varianza.

$$
X_0^{(1)},\dots,X_0^{(n)} \sim \mathcal{N}(\mu,\sigma^2), \qquad X_t^{(1)},\dots,X_t^{(n)} \sim \mathcal{N}(\hat\mu_{t-1},\hat\sigma^2_{t-1})
$$

Lo decisivo es qué datos ve el modelo $t$. Hay dos regímenes. En el de reemplazo, el modelo $t$ se entrena solo con las $n$ muestras que generó el modelo $t-1$. En el de acumulación, se entrena con todo lo que hay: las muestras humanas originales más todas las sintéticas producidas hasta ese momento. El desarrollo formal del colapso, incluidas las fórmulas que circulan en su versión de divulgación, trabaja en el primer régimen.

## Por qué el reemplazo colapsa

Empiezo por la media. En el régimen de reemplazo, cada estimación es la anterior más un ruido nuevo, y los ruidos se suman sin que nada los corrija. La media hace una caminata aleatoria y su error crece sin límite:

$$
\hat\mu_t = \hat\mu_{t-1} + \varepsilon_t, \quad \varepsilon_t \sim \mathcal{N}\!\left(0,\tfrac{\sigma^2}{n}\right) \quad\Longrightarrow\quad \operatorname{Var}(\hat\mu_t-\mu) = \frac{(t+1)\,\sigma^2}{n} \xrightarrow[t\to\infty]{} \infty
$$

(Para aislar el efecto supuse varianza conocida; el resultado no cambia en lo esencial.)

Con la varianza pasa algo más fino. Si la media es conocida, la varianza de cada generación es la anterior multiplicada por un factor aleatorio $W_t$ de media 1:

$$
\hat\sigma^2_t = \hat\sigma^2_{t-1}\,W_t, \qquad W_t \sim \frac{\chi^2_n}{n}, \qquad \mathbb{E}[W_t]=1
$$

Como la esperanza de cada factor es 1, la varianza esperada no cambia nunca. Y sin embargo colapsa. La razón es que el logaritmo de $W_t$ tiene esperanza negativa (por la desigualdad de Jensen), de modo que el logaritmo de la varianza es una suma de términos que, en promedio, restan:

$$
\mathbb{E}[\ln W_t] = \psi\!\left(\tfrac{n}{2}\right) + \ln 2 - \ln n \approx -\frac{1}{n} \quad\Longrightarrow\quad \ln\hat\sigma^2_t = \ln\hat\sigma^2_0 + \sum_{j=1}^{t}\ln W_j \xrightarrow[t\to\infty]{\text{c.s.}} -\infty
$$

Por la ley de los grandes números, casi todas las trayectorias van a cero aunque el promedio se quede quieto. Es un caso de manual en el que la esperanza engaña: unas pocas trayectorias excepcionales sostienen el promedio mientras casi todas se apagan. Esto corrige dos afirmaciones frecuentes de la versión de divulgación. La primera: que la varianza esperada decae como $((n-1)/n)^t$ vale solo para el estimador de máxima verosimilitud con media desconocida; con el insesgado, la esperanza no decae. La segunda: el límite es una delta de Dirac, pero no en la media original, sino en el punto al azar donde terminó la caminata de la media.

Hay un detalle más, que no es menor: la escala. El logaritmo de la varianza baja aproximadamente $1/n$ por generación. Con $n$ del tamaño de un corpus de entrenamiento, el colapso existe en el papel y es invisible en la práctica.

## El supuesto que nadie cumple

Hasta aquí, el argumento podría leerse como una confirmación del colapso. Pero todo depende de una decisión que el modelo toma sin anunciarla: tirar los datos humanos después del primer paso. Nadie entrena así. Internet no se borra cuando aparece un texto sintético; los corpus crecen. [Gerstgrasser y colegas (2024)](https://doi.org/10.48550/arXiv.2404.01413) lo plantearon explícitamente: el colapso estudiado en la literatura supone reemplazo, y el régimen realista es la acumulación. Su escenario de acumulación es, de hecho, pesimista a propósito: imagina un futuro en el que lo sintético se vuelca sin control a la web y se aspira todo para entrenar.

## La demostración: con memoria no hay colapso

En el régimen de acumulación, el modelo $t$ estima la media con todos los lotes juntos: el humano original y los $t$ sintéticos, cada uno de tamaño $n$. Si $m_j$ es la media del lote $j$, la estimación es el promedio de los promedios, y la recurrencia cambia de forma decisiva:

$$
\hat\mu_t = \frac{1}{t+1}\sum_{j=0}^{t} m_j \quad\Longrightarrow\quad \hat\mu_t = \hat\mu_{t-1} + \frac{\varepsilon_t}{t+1}
$$

El ruido nuevo entra dividido por $t+1$. Cada generación pesa menos que la anterior, porque comparte el corpus con todo lo que ya había. Sumando las varianzas:

$$
\operatorname{Var}(\hat\mu_t-\mu) = \frac{\sigma^2}{n}\sum_{k=1}^{t+1}\frac{1}{k^2} \;<\; \frac{\pi^2}{6}\cdot\frac{\sigma^2}{n}
$$

Es la serie de Basilea. El error no crece sin límite: queda acotado, para siempre, por menos del doble del error de la primera generación ($\pi^2/6 \approx 1{,}64$). Es el mismo factor que encontraron Gerstgrasser y colegas para regresión lineal.

Con la varianza el argumento es paralelo. Si $v_j$ es la varianza del lote $j$, la estimación acumulada es su promedio, y la recurrencia queda así:

$$
\hat\sigma^2_t = \hat\sigma^2_{t-1}\left(1+\frac{W_t-1}{t+1}\right), \qquad \mathbb{E}\!\left[\hat\sigma^2_t \mid \hat\sigma^2_{t-1}\right] = \hat\sigma^2_{t-1}
$$

Es una martingala, como antes, pero ahora sus saltos se achican como $1/(t+1)$. Su segundo momento queda acotado:

$$
\mathbb{E}\!\left[\hat\sigma^4_t\right] = \mathbb{E}\!\left[\hat\sigma^4_0\right]\prod_{j=1}^{t}\left(1+\frac{2}{n\,(j+1)^2}\right) \;\le\; \mathbb{E}\!\left[\hat\sigma^4_0\right]\,e^{\pi^2/(3n)}
$$

Una martingala acotada en $L^2$ converge casi seguramente y en media cuadrática a un límite $\sigma^2_\infty$ cuya esperanza es la varianza original $\sigma^2$. Falta ver que ese límite no es cero. Para eso basta mirar el logaritmo: es una suma de términos independientes cuyas medias y varianzas son del orden de $1/(n(j+1)^2)$, dos series que convergen. Por el criterio de las tres series de Kolmogorov, el logaritmo converge a un número finito y, por lo tanto, la varianza límite es estrictamente positiva. Lo dejo como esbozo: los detalles son de manual, pero conviene revisarlos con calma antes de darlos por cerrados. (Si la media también se estima, la varianza acumulada suma además la dispersión entre lotes, que solo puede agregar variedad.)

Dicho de otro modo: con reemplazo, casi todas las trayectorias se apagan. Con acumulación, la distribución se estabiliza en una versión levemente desplazada de la original, con varianza positiva. Las colas no desaparecen.

## No es colapso, es deriva

El nombre importa, porque «colapso» sugiere un final. Lo que la matemática describe se parece mucho más a un fenómeno que la genética de poblaciones conoce desde hace un siglo: la deriva génica. En el modelo de Wright-Fisher, una población finita sin mutación ni migración pierde diversidad en cada generación, y la heterocigosis decae como $(1 - 1/(2N))^t$. Es la misma forma que $((n-1)/n)^t$. El régimen de reemplazo es una población aislada que solo se reproduce consigo misma: termina fijada en una sola variante.

La genética también sabe qué rompe la deriva: la mutación y la migración, que reinyectan variedad desde afuera, y la selección, que decide qué se conserva. La acumulación de datos humanos cumple el papel de la memoria y de la migración; la curaduría y la verificación, el de la selección. Por eso propongo llamar al fenómeno **deriva acotada**, y al proceso completo **evolución con memoria**. Es una analogía, no una identidad: los modelos no son poblaciones ni los textos son genes. Pero la estructura matemática es la misma, y la analogía ordena mejor la pregunta que la metáfora de la fotocopia.

## Límites de la memoria y la deriva del sesgo

La demostración anterior descansa en un supuesto que conviene exponer con la misma franqueza con que expuse el del reemplazo: que el error sintético es ruido puro, de media cero. Un modelo de lenguaje no se equivoca así. Alucina de forma sistemática, repite sesgos estructurales y cae una y otra vez en los mismos bucles. Para ver qué cambia, alcanza con agregar al modelo de juguete un sesgo $b$ que cada generación sintética empuja en la misma dirección.

$$
m_t = \hat\mu_{t-1} + b + \varepsilon_t
$$

En el régimen de reemplazo, el sesgo se suma entero en cada paso. En el de acumulación, entra dividido por $t+1$, igual que el ruido:

$$
\text{reemplazo: } \mathbb{E}[\hat\mu_t-\mu] = b\,t \qquad \text{acumulación: } \mathbb{E}[\hat\mu_t-\mu] = b\sum_{j=1}^{t}\frac{1}{j+1} = b\,(H_{t+1}-1) \approx b\ln t
$$

La diferencia entre las dos series es todo el argumento. La de Basilea, que gobierna el ruido, converge: por eso el error aleatorio queda acotado. La armónica, que gobierna el sesgo, no converge: crece como el logaritmo. La acumulación frena el ruido, pero solo desacelera el sesgo. La deriva sigue sin techo; crece tan despacio que no se nota en una generación ni en diez. Eso no la vuelve inofensiva. La vuelve silenciosa.

Con esto se aclara también la objeción de la dilución. Es cierto que el peso de los datos humanos cae como $1/(t+1)$, pero la demostración ya lo contemplaba: la dilución, por sí sola, no devuelve el sistema al régimen de reemplazo. Lo que sí lo hace es otra combinación: si el volumen sintético crece de forma geométrica y además está sesgado, el peso de cada lote nuevo deja de achicarse y la deriva vuelve a ser lineal. A eso se suma que el corpus humano anterior a la explosión de los modelos está archivado: $X_0$ no se pierde aunque la web lo tape. El peligro es el sesgo, no el volumen.

Acumular tampoco es gratis, aunque conviene no exagerar la cuenta. El corpus crece como $(t+1)\cdot n$, de forma lineal, y entrenar cada generación sobre todo lo anterior hace que el cómputo acumulado crezca de forma cuadrática, no exponencial. Tampoco hace falta acumular todo para siempre: mantener una fracción fija de datos reales ya estabiliza el proceso. El costo que sí pesa es el que señalan Dohmatob, Feng y Kempe: aun sin colapso, las leyes de escala se degradan, porque cada token sintético enseña menos que uno humano. Y curar cuesta, lo que favorece a quien puede pagarlo.

Queda el verificador. La analogía biológica pide selección, y la selección necesita un criterio. En código y en matemática existe: un compilador o un probador de teoremas dicen sí o no sin opinar. En lenguaje natural, en filosofía o en arte no hay un verificador automático e insesgado, y usar otro modelo como juez reintroduce el bucle con el sesgo del evaluador. Es exactamente ahí donde nace la $b$ que la acumulación no corrige.

Nada de esto deja de ser un modelo de juguete: muestra un mecanismo, no el comportamiento de un sistema real (aunque Gerstgrasser y colegas comprobaron el efecto de la acumulación también en transformers entrenados sobre texto). Pero el mecanismo alcanza para corregir mi propia conclusión.

Mi sospecha inicial era que el debate se había equivocado de palabra y que el riesgo era el olvido. Me quedé corto. El artículo de *Nature* exageró a partir de un supuesto irreal: borrar la web en cada generación. La evolución con memoria, sola, pecaría de optimismo a partir de otro igual de irreal: que equivocarse es promediar gaussianas independientes. Lo que queda entre los dos no es un colapso que termina en una palabra repetida, sino una sedimentación lenta: modelos más caros de entrenar, marginalmente más pobres en matices y dominados por un consenso sintético que homogeniza el lenguaje sin que ninguna generación lo note. La deriva está acotada en el ruido. En el sesgo, no.

## Fuentes

- Shumailov, I., Shumaylov, Z., Zhao, Y., Papernot, N., Anderson, R. y Gal, Y. (2024). «AI models collapse when trained on recursively generated data». *Nature*, 631, 755–759. [doi:10.1038/s41586-024-07566-y](https://doi.org/10.1038/s41586-024-07566-y)
- Gerstgrasser, M., Schaeffer, R., Dey, A. et al. (2024). «Is Model Collapse Inevitable? Breaking the Curse of Recursion by Accumulating Real and Synthetic Data». arXiv:2404.01413. [doi:10.48550/arXiv.2404.01413](https://doi.org/10.48550/arXiv.2404.01413)
- Dohmatob, E., Feng, Y. y Kempe, J. (2024). «Model Collapse Demystified: The Case of Regression». arXiv.
- Dohmatob, E., Feng, Y., Yang, P., Charton, F. y Kempe, J. (2024). «A Tale of Tails: Model Collapse as a Change of Scaling Laws». arXiv.
