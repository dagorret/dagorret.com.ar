---
title: "Cuando el infinito no deja masa: rigidez sin derivadas y flujo de Ricci–DeTurck"
date: 2026-09-29
slug: "cuando-el-infinito-no-deja-masa-rigidez-sin-derivadas-y-flujo-de-ricci-deturck"
translation_key: "cuando-el-infinito-no-deja-masa-rigidez-sin-derivadas-y-flujo-de-ricci-deturck"
lang: "es"
categories: ["Matemáticas"]
tags: ["Conjetura de Gromov","Curvatura Escalar","Edward Witten","Flujo de Ricci","Flujo de Ricci–DeTurck","Geometría Diferencial","Jianchun Chu","Jingbo Wan","Man-Chun Lee","Masa ADM","Métrica de Schwarzschild","Mikhail Gromov","Relatividad General","Richard Schoen","Shing-Tung Yau"]
---

Hay resultados geométricos cuya fuerza no está sólo en la conclusión, sino en la desproporción entre lo que suponen y lo que terminan afirmando. El trabajo que Jianchun Chu (Peking), Man-Chun Lee (Hong Kong) y Jingbo Wan (Sorbonne) subieron a arXiv este año, _Rigidity of positive mass theorem with fast metric decay_, pertenece a esa familia. Parten de una métrica que, lejos de un conjunto compacto, se parece a la euclídea un poco más de lo que permite la huella de una masa aislada. Ese parecido se controla sólo en el valor de la métrica, no en cómo cambia de un punto a otro. Y sin embargo concluyen que la geometría entera, también en el interior, tiene que ser exactamente la del espacio plano.

Dicho en una línea: si la curvatura escalar es no negativa y

$$
g - g_{\mathrm{euc}} = o(|x|^{2-n}),
$$

entonces, en dimensión $n \ge 4$, la variedad es isométrica a $\mathbb{R}^n$. Toda la dificultad está en una tensión muy precisa. Ese decaimiento alcanza para borrar la huella de la masa, pero no alcanza para medir la masa con la herramienta de siempre. La prueba consiste en fabricar la regularidad que falta sin perder, en el camino, la información que venía del infinito.

## El orden que delata una masa

Una métrica es asintóticamente euclídea cuando, en coordenadas adecuadas fuera de un compacto, se escribe como $g_{ij} = \delta_{ij} + h_{ij}$ con una perturbación $h$ que se apaga al alejarse. La pregunta interesante nunca es si se apaga, sino a qué velocidad. Y hay una velocidad que no es una más entre otras: $|x|^{2-n}$.

No es un exponente elegido por comodidad. Es el orden de la solución fundamental del laplaciano en dimensión $n$, es decir, el modo en que decae el potencial de una carga puntual. Y es también el orden en que la geometría de Schwarzschild, el modelo espacial de un cuerpo aislado con masa $m$, se aparta de la euclídea. En coordenadas isotrópicas,

$$
g_{\mathrm{Sch}} = \left(1 + \frac{m}{2|x|^{n-2}}\right)^{\frac{4}{n-2}} g_{\mathrm{euc}},
$$

de modo que la diferencia con el espacio plano es exactamente de orden $|x|^{2-n}$, con el coeficiente $m$ como protagonista. Por eso la hipótesis de Chu, Lee y Wan tiene una lectura física casi inmediata. Pedir que $g - g_{\mathrm{euc}}$ sea $o(|x|^{2-n})$, estrictamente más rápido que ese orden, es pedir que en el infinito no quede rastro del término de Schwarzschild. La métrica se acerca a la plana sin dejar la firma de un cuerpo con masa.

Que el umbral es exactamente ese, y no uno más cómodo, lo muestran los propios autores en un apéndice. Para cualquier $c > 0$ construyen una métrica completa, no plana y con curvatura escalar idénticamente nula, que se comporta como $(1 + c|x|^{2-n} + \dots) g_{\mathrm{euc}}$. La construcción es un clásico que ellos reponen por prolijidad: se perturba la esfera redonda cerca de un punto, se toma la función de Green del laplaciano conforme con polo en otro punto y se hace una explosión conforme que manda ese polo al infinito. El resultado es un espacio con masa positiva que decae exactamente al orden crítico. Si se permite ese orden, aparece la masa. Si se exige algo más rápido, el teorema dice que no queda nada.

## Una conjetura de Gromov, con una errata

La pregunta viene de Mikhail Gromov, que en sus _Four lectures on scalar curvature_ se preguntó si la rigidez del teorema de masa positiva sobrevive cuando sólo se controla la desviación $C^0$ de la métrica respecto de la euclídea. El trasfondo es una convicción extendida en el área, que Gromov mismo ayudó a instalar: la condición $\operatorname{scal} \ge 0$ parece depender sólo de la geometría $C^0$, y es estable bajo convergencia uniforme de métricas aunque su definición use dos derivadas. Si eso es así, la rigidez tendría que poder formularse sin mencionar derivadas.

El artículo señala un detalle que vale la pena contar. En el texto de Gromov la tasa de decaimiento aparece como $|x|^{-1}$, que es correcta sólo en dimensión tres. Para $n \ge 4$, el orden de Schwarzschild es $|x|^{2-n}$, que decae al menos tan rápido como $|x|^{-2}$. En esas dimensiones, las métricas del apéndice, que decaen exactamente al orden crítico $O(|x|^{2-n})$, ya son $o(|x|^{-1})$: la formulación original admitía precisamente métricas no planas con masa positiva. La conjetura tal como estaba escrita era falsa por una errata; la versión con el exponente correcto es la que se prueba.

El caso tridimensional se había cerrado poco antes por otra vía. Mazurowski y Yao propusieron un enfoque basado en funciones armónicas y una fórmula de monotonía de Agostiniani, Mazzieri y Oronzio; You y Zhang lo refinaron y probaron la conjetura en $n = 3$, y casi al mismo tiempo Mazurowski y Yao la obtuvieron como consecuencia de su teorema de masa positiva para métricas continuas. Esos argumentos dependen del teorema de Gauss–Bonnet sobre conjuntos de nivel y por eso quedan atados a la dimensión baja. Chu, Lee y Wan completan el cuadro desde el otro lado: su método funciona exactamente a partir de $n = 4$ y se rompe en $n = 3$. Entre ambos trabajos, la conjetura queda resuelta en todas las dimensiones.

El enunciado es un poco más general que el de Gromov. No hace falta que la variedad sea $\mathbb{R}^n$ de entrada: basta con que tenga un extremo euclídeo, es decir, un compacto afuera del cual es difeomorfa a $\mathbb{R}^n$ menos una bola, y con que en esa carta la métrica cumpla la condición de decaimiento. La conclusión incluye la topología. Si la variedad tuviera a priori varios extremos, el argumento fuerza a que tenga uno solo.

## Por qué no se puede empezar por la masa

La masa ADM, la cantidad que Arnowitt, Deser y Misner introdujeron en 1961 y que Bartnik mostró que es un invariante geométrico, se calcula como un flujo a través de esferas muy grandes:

$$
m_{\mathrm{ADM}}(g) = \frac{1}{2(n-1)\omega_{n-1}} \lim_{r \to \infty} \int_{S_r} \left(\partial_i g_{ij} - \partial_j g_{ii}\right) \nu^j \, dA.
$$

Lo que se integra son primeras derivadas de la métrica. Y la hipótesis de Gromov no dice nada sobre derivadas. Una función puede ser muy chica y oscilar muy rápido; que $g - g_{\mathrm{euc}}$ decaiga no impide que $\partial g$ haga cualquier cosa. Bajo una hipótesis puramente $C^0$ de decaimiento no hay control asintótico sobre esas derivadas, y el límite que define la masa ADM ni siquiera tiene por qué existir.

Esto importa porque la tentación, al leer el teorema, es resumirlo como _“el decaimiento rápido fuerza masa cero y entonces la rigidez del teorema de masa positiva da el espacio plano”_. Esa frase no es falsa como intuición, pero esconde exactamente la parte que hace falta demostrar. La prueba no arranca afirmando que la masa de la métrica original es nula. No puede hacerlo, porque esa masa no está disponible. Primero hay que conseguir derivadas.

## El flujo como fábrica de regularidad

Para conseguirlas, los autores ponen a la métrica a evolucionar. El flujo de Ricci, $\partial_t g = -2\operatorname{Ric}(g)$, tiende a suavizar la geometría del mismo modo en que la ecuación del calor suaviza una temperatura irregular, pero tiene un defecto técnico: como es invariante por difeomorfismos, no es strictly parabólico. La corrección estándar es el truco de DeTurck, que agrega un término de Lie derivada respecto de un campo $W$ construido comparando las conexiones de $g$ con las de una geometría de referencia:

$$
\partial_t g = -2\operatorname{Ric}(g) + \mathcal{L}_W g.
$$

El resultado es una ecuación estrictamente parabólica que, salvo un cambio de coordenadas dependiente del tiempo, sigue siendo el flujo de Ricci.

La elección de la geometría de referencia es donde el artículo pone más cuidado. Lo natural sería comparar con la métrica euclídea, pero la hipótesis de decaimiento no garantiza que $g_0$ esté uniformemente cerca de ella en todas partes, que es lo que pide la teoría de estabilidad. Así que los autores fabrican una métrica intermedia $\tilde{g}_0$: coincide con $g_0$ en una región grande y es exactamente euclídea afuera de un compacto. La referencia no es $\tilde{g}_0$ congelada, sino el flujo de Ricci que parte de ella. Ese flujo ya no es plano en el infinito para tiempo positivo, porque la difusión desparrama un poco de curvatura hacia afuera. Pero un lema de localización muestra que, donde la métrica inicial era plana, la curvatura se mantiene del orden de $t^\ell r^{-2\ell-2}$ para cualquier $\ell$, es decir, despreciable a cualquier orden polinomial.

Con esa referencia, un teorema de estabilidad débil debido a Chan, Lai y el propio Lee asegura que el flujo de Ricci–DeTurck que parte de $g_0$ existe y se mantiene cerca de la referencia. Y comparando con flujos auxiliares que parten de truncaciones de $g_0$ a distintas escalas, los autores obtienen las dos estimaciones que necesitan:

$$
|g(t) - g_{\mathrm{euc}}| = o(|x|^{2-n}), \qquad t^{1/2} |\nabla g(t)| = o(|x|^{2-n}).
$$

La primera dice que el flujo no arruina el decaimiento. La segunda es la pieza que faltaba, y el factor $t^{1/2}$ no es decorativo: dice que el control de las derivadas se degrada cuando $t \to 0$, como corresponde a una métrica inicial que no lo tenía. Pero para cada tiempo positivo fijo, el factor es una constante y la estimación se lee simplemente como $|\nabla g(t)| = o(|x|^{2-n})$. La métrica inicial no tenía por qué tener derivadas controladas; cualquier métrica evolucionada durante un tiempo positivo sí las tiene, al mismo orden. Iterando el argumento se ganan más derivadas, aunque no todas sirven igual. En el marco clásico de planitud asintótica, donde cada derivada tiene que decaer con un orden suficiente, la métrica regularizada es asintóticamente plana con control $C^k$ sólo para $0 \le k < \frac{n-2}{2}$. Para $n \ge 7$ eso incluye dos derivadas y alcanza para aplicar directamente la rigidez clásica del teorema de masa positiva. Por debajo hace falta el argumento propio del artículo, que se conforma con una sola.

Queda un requisito más: que el flujo no destruya la hipótesis geométrica. La curvatura escalar evoluciona, bajo el flujo de Ricci, según

$$
\partial_t R = \Delta R + 2|\operatorname{Ric}|^2,
$$

una ecuación del calor con una fuente que nunca es negativa. Por el principio del máximo, si $R \ge 0$ al comienzo, sigue siéndolo. En variedades no compactas esto no es gratuito, y los autores recurren a una versión localizada del principio del máximo, pero la estructura es esa. Hay acá una idea que excede el problema: cuando una cantidad no se puede definir por falta de regularidad, a veces se puede regularizar la geometría con un flujo y demostrar que lo que importaba sobrevive.

## Truncar, deformar, comparar masas

Con derivadas en la mano, el núcleo del artículo es un resultado auxiliar que se puede leer como el caso de igualdad de un teorema de masa positiva débil. Si $g$ tiene curvatura escalar no negativa y tanto $g - g_{\mathrm{euc}}$ como $\partial g$ decaen como $o(|x|^{2-n})$, entonces $\operatorname{scal}(g) \equiv 0$. Lo interesante es cómo se prueba, porque tampoco acá se calcula la masa de $g$.

El primer paso es truncar. Para cada radio grande $R$ se arma una métrica $g_R$ que coincide con $g$ hasta la bola de radio $R$, es exactamente euclídea más allá de $2R$ y en la corona intermedia interpola entre las dos. Como $g_R$ es plana fuera de un compacto, su masa ADM está bien definida y vale cero. El precio de la truncación es que en la corona aparece curvatura escalar que puede ser negativa: pegar dos geometrías no es inocente. Buena parte del trabajo técnico consiste en mostrar que ese defecto es chico. Escribiendo la curvatura escalar en forma de divergencia respecto del fondo euclídeo, el error en la corona queda controlado por una cantidad $\varepsilon_R$ que tiende a cero gracias al decaimiento $o(|x|^{2-n})$ de $g$ y de sus derivadas, multiplicada por potencias de $R$ que resultan manejables.

El segundo paso es una deformación conforme. Se busca una función positiva $\psi_R$ que tienda a $1$ en el infinito y resuelva

$$
-\Delta_{g_R}\psi_R + c_0 \operatorname{scal}(g_R) \psi_R = 0, \qquad c_0 = \frac{n-2}{4(n-1)}.
$$

Como la curvatura de $g_R$ no es no negativa en todas partes, la existencia de $\psi_R$ no es automática; se obtiene precisamente porque la parte negativa es chica en sentido integral, controlada por una desigualdad de Sobolev uniforme en $R$. Con esa función, la métrica $\tilde{g}_R = \psi_R^{4/(n-2)}g_R$ tiene curvatura escalar idénticamente nula, por la ley de transformación conforme de la curvatura escalar.

El tercer paso es donde entra el teorema de masa positiva. Schoen y Yau lo probaron hasta dimensión siete y Witten para variedades spin en cualquier dimensión; la restricción dimensional que quedaba en el caso no spin se eliminó recientemente: Bi, Hao, He, Shi y Zhu llegaron hasta dimensión 19 y Brendle y Wang completaron el resto. Aplicado a $\tilde{g}_R$, dice que su masa es no negativa. Y la deformación conforme relaciona las dos masas mediante una identidad integral:

$$
m_{\mathrm{ADM}}(g_R) - m_{\mathrm{ADM}}(\tilde{g}_R) = \kappa_n \int_M \left(|\nabla\psi_R|^2 + c_0 \operatorname{scal}(g_R) \psi_R^2\right) d\mathrm{vol}_{g_R},
$$

donde $\kappa_n = \frac{2}{(n-2)\omega_{n-1}}$ es una constante positiva que sólo depende de la dimensión. El lado izquierdo es cero menos algo no negativo. Por lo tanto la integral de la derecha es menor o igual que cero. Si la curvatura escalar de $g_R$ fuera no negativa en todas partes, esto obligaría de inmediato a que el gradiente de $\psi_R$ se anule. No lo es, así que hay que pelear: los autores reparten la contribución negativa de la corona en varios términos y muestran que cada uno queda acotado por $\varepsilon_R$ por una potencia de $R$, con lo cual la energía $\int|\nabla\psi_R|^2$ tiende a cero cuando $R \to \infty$.

Es en uno de esos términos donde aparece la dimensión. El error correspondiente viene multiplicado por $R^{4-n}$, que se mantiene acotado para $n \ge 4$ y crece sin control en $n = 3$. No es una limitación de estilo; es el lugar exacto donde el argumento se quiebra.

Cuando $R$ crece, las métricas $g_R$ coinciden con $g$ en compactos cada vez más grandes, y las $\psi_R$, acotadas por Sobolev y por estimaciones interiores, convergen suavemente a una función $\psi$ con gradiente nulo que vale $1$. Llevando eso a la ecuación, $\operatorname{scal}(g) = c_0^{-1}\psi^{-1}\Delta\psi = 0$. La masa de $g$ nunca se calculó. Se la acorraló con una familia de métricas auxiliares que sí la tienen.

## La contradicción

Con todo eso armado, el cierre es corto. Supongamos que $g_0$ no es plana y hagámosla evolucionar por el flujo de Ricci–DeTurck. La curvatura escalar sigue siendo no negativa, y el principio del máximo fuerte deja dos posibilidades. Si no es idénticamente nula, se vuelve strictly positiva en todo punto para todo $t > 0$. Si en cambio es idénticamente nula, la ecuación de evolución se reduce a $0 = 2|\operatorname{Ric}|^2$, y la fuente obliga a que $g_0$ sea Ricci-plana. Una métrica Ricci-plana que en el infinito se parece a la euclídea tiene crecimiento de volumen euclídeo, y la rigidez de Bishop–Gromov la vuelve plana, contra lo supuesto. Queda entonces el primer caso.

Pero ahora se fija un tiempo $t_0 > 0$ y se mira $g(t_0)$. Por las estimaciones del flujo, decae como $o(|x|^{2-n})$ y sus derivadas también. Cumple las hipótesis del resultado auxiliar, así que su curvatura escalar es idénticamente nula. Esa misma curvatura era estrictamente positiva. La contradicción obliga a que la métrica inicial sea plana, y con las hipótesis topológicas del teorema, eso es $\mathbb{R}^n$.

## Lo que queda afuera y lo que conviene no simplificar

El teorema demuestra algo conceptualmente nuevo, que la rigidez se obtiene sin ninguna hipótesis inicial sobre las derivadas de la métrica, pero no lo hace sin apoyos. El teorema de masa positiva se usa como un resultado profundo previo, en su versión para todas las dimensiones que se cerró hace muy poco, y el artículo no ofrece una prueba nueva de él. Tampoco se trata de un fenómeno puramente asintótico: el decaimiento por sí solo no dice nada sobre el interior de la variedad, y la conclusión global depende de que $\operatorname{scal} \ge 0$ valga en todas partes y de todo el aparato de flujo, estabilidad y ecuaciones elípticas.

Hay un par de observaciones laterales que ayudan a situar el método. Los autores notan que en algunos casos ya se podía llegar por atajos: para variedades spin con $n \ge 5$, el teorema se sigue del teorema de masa positiva de Lee y LeFloch para métricas de baja regularidad aplicado a la métrica regularizada; y para $n \ge 7$, como ya vimos, la regularización alcanza para aplicar directamente la rigidez clásica. Lo que el artículo aporta es un argumento unificado para todo $n \ge 4$. La primera versión del trabajo usaba espinores; la segunda los reemplazó por el método conforme, que no necesita estructura spin. Y aunque el teorema está enunciado para métricas suaves, los autores afirman que el argumento se adapta a métricas sólo continuas con el mismo decaimiento, siempre que $\operatorname{scal} \ge 0$ se entienda en sentido de aproximación; lo dicen, pero no lo desarrollan.

Queda, por último, una advertencia de lectura. El flujo hace muchísimo trabajo, y ese trabajo no es formal. Hay que construir una referencia adecuada, probar existencia con control global, mostrar que el decaimiento se preserva, que la curvatura escalar no se vuelve negativa y que las derivadas aparecen al orden correcto. Cada uno de esos pasos descansa en resultados técnicos recientes, varios de ellos del mismo grupo. Leer el teorema como una consecuencia elegante de la masa positiva es correcto en el espíritu, pero borra la parte más fina: la que enseña cómo convertir una hipótesis que sólo mira valores en una conclusión que exige derivadas, sin que en el camino se pierda lo único que el infinito tenía para decir, que acá es que no hay masa.

## Bibliografía

\[1\] J. Chu, M.-C. Lee y J. Wan, Rigidity of Positive Mass Theorem with Fast Metric Decay, preprint, arXiv:2607.17236v2 (3 de septiembre de 2026). https://arxiv.org/abs/2607.17236  
\[2\] M. Gromov, Four Lectures on Scalar Curvature, en Perspectives in Scalar Curvature, vol. 1, World Scientific, 2023, 1–514. Preprint: arXiv:1908.10612. https://arxiv.org/abs/1908.10612  
\[3\] R. Arnowitt, S. Deser y C. W. Misner, Coordinate Invariance and Energy Expressions in General Relativity, Physical Review 122 (1961), 997–1006.  
\[4\] R. Bartnik, The Mass of an Asymptotically Flat Manifold, Communications on Pure and Applied Mathematics 39 (1986), 661–693.  
\[5\] R. Schoen y S.-T. Yau, On the Proof of the Positive Mass Conjecture in General Relativity, Communications in Mathematical Physics 65 (1979), 45–76.  
\[6\] E. Witten, A New Proof of the Positive Energy Theorem, Communications in Mathematical Physics 80 (1981), 381–402.  
\[7\] Y. Bi, T. Hao, S. He, Y. Shi y J. Zhu, A Proof for the Riemannian Positive Mass Theorem up to Dimension 19, preprint, arXiv:2603.02769. https://arxiv.org/abs/2603.02769  
\[8\] S. Brendle e Y. Wang, A Dimension Descent Scheme for the Positive Mass Theorem in High Dimensions, preprint, arXiv:2604.08473. https://arxiv.org/abs/2604.08473  
\[9\] D. A. Lee y P. G. LeFloch, The Positive Mass Theorem for Manifolds with Distributional Curvature, Communications in Mathematical Physics 339 (2015), 99–120.  
\[10\] L. Mazurowski y X. Yao, Rigidity in the Positive Mass Theorem with C⁰ Decay, preprint, arXiv:2605.29915. https://arxiv.org/abs/2605.29915  
\[11\] L. Mazurowski y X. Yao, A Positive Mass Theorem for Continuous Metrics, preprint, arXiv:2606.19123. https://arxiv.org/abs/2606.19123  
\[12\] J. You y H. Zhang, Gromov’s Euclidean Endpoint C⁰ Rigidity for the Positive Mass Theorem, preprint, arXiv:2606.15372. https://arxiv.org/abs/2606.15372  
\[13\] P.-Y. Chan, Y. Lai y M.-C. Lee, Higher-Dimensional Flying Wing Steady Ricci Solitons, preprint, arXiv:2510.23005. https://arxiv.org/abs/2510.23005  
\[14\] W.-X. Shi, Deforming the Metric on Complete Riemannian Manifolds, Journal of Differential Geometry 30 (1989), 223–301.  
\[15\] B. Chow et al., The Ricci Flow: Techniques and Applications. Part II: Analytic Aspects, Mathematical Surveys and Monographs 144, American Mathematical Society, 2008.
