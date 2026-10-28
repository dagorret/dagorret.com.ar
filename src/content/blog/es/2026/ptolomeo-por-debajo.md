---
title: "Ptolomeo por debajo"
date: 2026-10-28
slug: "ptolomeo-por-debajo"
translation_key: "ptolomeo-por-debajo"
lang: "es"
categories: ["Matemáticas"]
tags: ["Cuadriláteros","Demostración Matemática","Desigualdad de Ptolomeo","Geometría","Inteligencia Artificial"]
---

Alguien abre una [pregunta en Mathematics Stack Exchange](https://math.stackexchange.com/questions/5152789/is-this-reverse-ptolemy-inequality-true). Conoce el teorema de Ptolomeo para cuadriláteros inscritos en una circunferencia y se pregunta qué queda de él cuando el cuadrilátero es cualquiera. Mide, prueba casos y encuentra algo: el producto de las diagonales parece no bajar de cierta fracción de la suma de los productos de lados opuestos, y esa fracción depende únicamente de cómo se cortan las diagonales. Pregunta si eso se puede demostrar. Dice que no encontró una referencia en la literatura.

Yo tampoco he encontrado una referencia para esta formulación. Este texto cuenta la desigualdad, su demostración, quiénes la alcanzan con igualdad y, al final, cómo llegó a mis manos. No es un paper: es una nota de divulgación sobre un resultado pequeño y limpio. No sé si es nuevo; sí merece que se lo explique.

## Lo que dice Ptolomeo

En lo que sigue, consideraremos cuadriláteros convexos no degenerados, con sus vértices nombrados en orden.

Si $ABCD$ es un cuadrilátero inscrito en una circunferencia, el producto de sus diagonales es igual a la suma de los productos de sus lados opuestos:

$$
AC\cdot BD=AB\cdot CD+BC\cdot DA.
$$

Para un cuadrilátero convexo cualquiera, la igualdad se convierte en desigualdad, la llamada desigualdad de Ptolomeo:

$$
AC\cdot BD\le AB\cdot CD+BC\cdot DA.
$$

El teorema clásico y sus aplicaciones se presentan, por ejemplo, en el [trabajo de Knežević y Savić](https://teaching.math.rs/landing.php?name=tm2317&p=TM231.cap). La desigualdad y las condiciones de ciclicidad también aparecen en el [artículo de Pech](https://link.springer.com/chapter/10.1007/978-3-642-21898-9_34).

Dicho de otro modo, el cociente entre el producto de las diagonales y la suma de productos de lados opuestos nunca supera $1$, y vale $1$ exactamente en los cuadriláteros cíclicos. Ptolomeo pone un techo. La pregunta natural es si hay también un piso.

## Un piso que depende de las diagonales

Sea $O$ el punto donde se cortan las diagonales de $ABCD$. Llamo

$$
x=OA\cdot OC,\qquad y=OB\cdot OD:
$$

cada uno es el producto de los dos trozos en que $O$ divide a una diagonal. La desigualdad propuesta es

$$
AC\cdot BD\ge\frac{2\sqrt{xy}}{x+y}\,\bigl(AB\cdot CD+BC\cdot DA\bigr).
$$

El coeficiente tiene una lectura inmediata: es el cociente entre la media geométrica y la media aritmética de $x$ e $y$. Vale $1$ cuando $x=y$ y se achica a medida que aumenta el desequilibrio relativo entre los dos productos. Juntando el techo de Ptolomeo con este piso, el cociente queda encerrado así:

$$
\frac{2\sqrt{xy}}{x+y}\le\frac{AC\cdot BD}{AB\cdot CD+BC\cdot DA}\le 1.
$$

Hay un detalle que conviene notar antes de seguir. La condición $x=y$, es decir, $OA\cdot OC=OB\cdot OD$, es exactamente la que caracteriza a los cuadriláteros cíclicos en este contexto: es el teorema de las cuerdas que se cortan y su recíproco. Así que el piso y el techo coinciden justo donde Ptolomeo vale con igualdad.

Fuera de ahí, el piso depende del desequilibrio relativo entre los dos productos. No importa el tamaño del dibujo, sino la proporción entre $x$ e $y$. Conviene no confundir ese desequilibrio con una distancia geométrica a un cuadrilátero cíclico: aquí no hemos definido tal distancia.

## La demostración: dos desigualdades y una identidad

Escribo

$$
OA=p,\qquad OB=q,\qquad OC=r,\qquad OD=s,
$$

y llamo $\theta$ al ángulo $AOB$, con $c=\cos\theta$. Como las diagonales se cortan en el interior, las cuatro longitudes son positivas. Los cuatro ángulos alrededor de $O$ son $\theta$, $\pi-\theta$, $\theta$, $\pi-\theta$, así que el teorema del coseno da los cuatro lados:

$$
AB^2=p^2+q^2-2pq\,c,
$$

 

$$
BC^2=q^2+r^2+2qr\,c,
$$

 

$$
CD^2=r^2+s^2-2rs\,c,
$$

 

$$
DA^2=s^2+p^2+2sp\,c.
$$

El ángulo es el estorbo: aparece en todos lados y con signos distintos. La idea de la prueba es hacerlo desaparecer.

### Primera parte: elegir los pesos

Para eso se usa una forma ponderada de la desigualdad entre medias. Para cualesquiera $u,v>0$ y $\lambda>0$,

$$
uv\le\frac12\left(\lambda u^2+\frac{v^2}{\lambda}\right).
$$

No hay nada misterioso detrás: basta desarrollar el cuadrado

$$
\left(\sqrt{\lambda}\,u-\frac{v}{\sqrt{\lambda}}\right)^2\ge 0.
$$

La igualdad se alcanza exactamente cuando $v=\lambda u$.

Aplicamos esta desigualdad una vez a $AB\cdot CD$ y otra a $BC\cdot DA$, pero con pesos distintos:

$$
\lambda=\sqrt{\frac{rs}{pq}},\qquad\mu=\sqrt{\frac{sp}{qr}}.
$$

La elección está hecha para que

$$
\lambda pq=\frac{rs}{\lambda}=\mu qr=\frac{sp}{\mu}=\sqrt{pqrs}.
$$

Llamemos $P=\sqrt{pqrs}=\sqrt{xy}$. En la primera aplicación obtenemos

$$
AB\cdot CD\le\frac12\left(\lambda AB^2+\frac{CD^2}{\lambda}\right),
$$

con

$$
\lambda AB^2+\frac{CD^2}{\lambda}=\lambda(p^2+q^2)+\frac{r^2+s^2}{\lambda}-4Pc.
$$

En la segunda,

$$
BC\cdot DA\le\frac12\left(\mu BC^2+\frac{DA^2}{\mu}\right),
$$

con

$$
\mu BC^2+\frac{DA^2}{\mu}=\mu(q^2+r^2)+\frac{s^2+p^2}{\mu}+4Pc.
$$

Los términos $-4Pc$ y $+4Pc$ se cancelan al sumar. **El ángulo desaparece sin que hayamos supuesto nada especial sobre él.**

### Segunda parte: reconocer una identidad

Una vez sumadas las dos estimaciones, queda

$$
AB\cdot CD+BC\cdot DA\le\frac P2\left(\frac pq+\frac qp+\frac qr+\frac rq+\frac rs+\frac sr+\frac sp+\frac ps\right).
$$

La suma de fracciones parece engorrosa, pero cumple una identidad exacta:

$$
pqrs\left(\frac pq+\frac qp+\frac qr+\frac rq+\frac rs+\frac sr+\frac sp+\frac ps\right)=(p+r)(q+s)(pr+qs).
$$

Para comprobarla basta desarrollar ambos miembros. En los dos aparece el mismo polinomio:

$$
p^2qr+p^2rs+pq^2s+q^2rs+pqr^2+pr^2s+pqs^2+qrs^2.
$$

Como $pqrs=P^2$, la estimación anterior se convierte en

$$
AB\cdot CD+BC\cdot DA\le\frac{(p+r)(q+s)(pr+qs)}{2P}.
$$

Finalmente, $AC=p+r$, $BD=q+s$, $pr=x$ y $qs=y$. Sustituyendo y reordenando,

$$
AC\cdot BD\ge\frac{2\sqrt{xy}}{x+y}\,\bigl(AB\cdot CD+BC\cdot DA\bigr).
$$

La prueba termina ahí. Todo el trabajo de desigualdad estuvo en las dos aplicaciones de la media aritmética y la geométrica. Lo que vino después fue una identidad.

## Quiénes alcanzan el piso

Una cota no está del todo entendida hasta saber cuándo se alcanza. En este caso, la igualdad final exige que las dos desigualdades usadas en la prueba sean igualdades:

$$
CD=\lambda AB,\qquad DA=\mu BC.
$$

Como todas las longitudes y los pesos son positivos, podemos elevar al cuadrado sin introducir soluciones adicionales. Al sustituir las expresiones del teorema del coseno, vuelven a desaparecer los términos del ángulo:

$$
CD^2-\lambda^2 AB^2=r^2+s^2-\frac{rs}{pq}(p^2+q^2)=\frac{(pr-qs)(qr-ps)}{pq},
$$

 

$$
DA^2-\mu^2 BC^2=p^2+s^2-\frac{sp}{qr}(q^2+r^2)=\frac{(qs-pr)(rs-pq)}{qr}.
$$

Por lo tanto, las condiciones de igualdad son exactamente

$$
\frac{(pr-qs)(qr-ps)}{pq}=0\qquad\text{y}\qquad\frac{(qs-pr)(rs-pq)}{qr}=0.
$$

Estas dos factorizaciones separan todos los casos posibles.

### Los cuadriláteros cíclicos

Si $pr=qs$, las dos expresiones se anulan. Es precisamente la condición de ciclicidad que mencionamos antes.

Para ver también el recíproco, tracemos la circunferencia que pasa por $A$, $B$ y $C$, y llamemos $D'$ al segundo punto donde la recta $BO$ la corta. Como $O$ está dentro de esa circunferencia, $D'$ está en la misma semirrecta desde $O$ que $D$. Por el teorema de las cuerdas,

$$
OB\cdot OD'=OA\cdot OC.
$$

Si $pr=qs$, entonces $OD'=s=OD$ y, por lo tanto, $D'=D$. Los cuatro vértices están en la misma circunferencia.

En este caso $x=y$, el coeficiente vale $1$ y recuperamos la igualdad clásica de Ptolomeo.

### Los paralelogramos

Si $pr\ne qs$, necesariamente deben anularse los otros dos factores:

$$
qr=ps,\qquad rs=pq.
$$

Al dividir la primera igualdad por la segunda,

$$
\frac qs=\frac sq.
$$

Como $q,s>0$, resulta $q=s$. Sustituyendo en cualquiera de las igualdades anteriores obtenemos $r=p$.

Las diagonales se bisecan: $OA=OC$ y $OB=OD$. Eso caracteriza a un paralelogramo.

Recíprocamente, en cualquier paralelogramo se tiene $p=r$, $q=s$, $\lambda=\mu=1$ y los lados opuestos son iguales. Las dos aplicaciones de la desigualdad entre medias son entonces igualdades.

**La igualdad se alcanza si y solo si el cuadrilátero es cíclico o es un paralelogramo.** Las familias no son excluyentes: los rectángulos pertenecen a ambas.

## Por qué el coeficiente no se puede mejorar

Los paralelogramos hacen algo más que completar una lista de casos especiales. Demuestran que el coeficiente es el mejor posible para cada proporción entre $x$ e $y$.

En un paralelogramo, si las semidiagonales miden $p$ y $q$,

$$
x=p^2,\qquad y=q^2.
$$

Podemos elegir $p$ y $q$ positivos con cualquier proporción, y un ángulo entre las diagonales distinto de $0$ y de $\pi$. Siempre obtenemos un paralelogramo no degenerado.

Además, sus diagonales satisfacen

$$
AC\cdot BD=4pq,
$$

y, al sumar las expresiones de los cuadrados de dos lados consecutivos,

$$
AB\cdot CD+BC\cdot DA=AB^2+BC^2=2(p^2+q^2).
$$

Por lo tanto,

$$
\frac{AC\cdot BD}{AB\cdot CD+BC\cdot DA}=\frac{2pq}{p^2+q^2}=\frac{2\sqrt{xy}}{x+y}.
$$

Para cualquier valor prescrito de $x/y>0$ existe, entonces, un cuadrilátero que alcanza exactamente el piso. Aumentar el coeficiente para esa proporción haría falsa la desigualdad en ese paralelogramo.

No estamos ante una cota que se aproxima solamente cuando la figura se aplasta o degenera. **El piso se alcanza con paralelogramos no degenerados, para cualquier proporción positiva entre los productos.**

## Cómo llegó hasta aquí

La pregunta que originó esta nota es de **Nilotpal Kanti Sinha**: [«Is this reverse-Ptolemy inequality true?»](https://math.stackexchange.com/questions/5152789/is-this-reverse-ptolemy-inequality-true), en Mathematics Stack Exchange. Allí están tanto la desigualdad propuesta como la conjetura de que su coeficiente es óptimo. La formulación del problema no es mía.

Publiqué una respuesta en ese sitio y después la retiré. Esta nota conserva el desarrollo matemático y lo presenta con más espacio para explicar la prueba, los casos de igualdad y la optimalidad.

La demostración la desarrollé en diálogo con Claude, un modelo de inteligencia artificial: de ahí salió la elección de pesos que cancela el ángulo. La caracterización completa de los casos de igualdad, el recíproco de la ciclicidad y la verificación de las cuentas son trabajo mío. Asumo la responsabilidad por lo que publico.

No pretendo establecer una prioridad bibliográfica. No haber encontrado un antecedente no demuestra que no exista. Lo que sí queda demostrado aquí es la desigualdad, sus casos de igualdad y la imposibilidad de mejorar su coeficiente si este depende únicamente de $x/y$.

Ptolomeo ponía el techo. Esta pregunta nos hizo mirar el piso. Y, al mirar con cuidado, aparecieron dos desigualdades elementales, una identidad y una familia entera de figuras que se apoyan exactamente sobre él.

## Referencias y lecturas relacionadas

La primera referencia es la fuente de la pregunta. Las restantes ofrecen contexto sobre el teorema de Ptolomeo, su desigualdad y la ciclicidad; no las presento como fuentes de la cota inferior demostrada en esta nota.

1.  **Nilotpal Kanti Sinha.** [_Is this reverse-Ptolemy inequality true?_](https://math.stackexchange.com/questions/5152789/is-this-reverse-ptolemy-inequality-true). Mathematics Stack Exchange. Fuente de la conjetura y de la pregunta sobre el coeficiente óptimo.
2.  **Miljan Knežević y Dragana Savić (2020).** [_Some Remarks on Ptolemy’s Theorem and Its Applications_](https://teaching.math.rs/landing.php?name=tm2317&p=TM231.cap). _The Teaching of Mathematics_, **23**(1), 57–70. Presenta el teorema clásico y aplicaciones geométricas.
3.  **Pavel Pech (2011).** [_On Equivalence of Conditions for a Quadrilateral to Be Cyclic_](https://link.springer.com/chapter/10.1007/978-3-642-21898-9_34). En _Computational Science and Its Applications — ICCSA 2011_, Lecture Notes in Computer Science, **6785**, 399–411. Springer. DOI: [10.1007/978-3-642-21898-9\_34](https://doi.org/10.1007/978-3-642-21898-9_34). Estudia condiciones equivalentes de ciclicidad y demuestra la desigualdad de Ptolomeo.
4.  **Mario Gómez y Facundo Mémoli (2024).** [_The Four Point Condition: An Elementary Tropicalization of Ptolemy’s Inequality_](https://doi.org/10.1080/00029890.2023.2285695). _The American Mathematical Monthly_, **131**(3), 187–203. [Prepublicación en arXiv:2111.10328](https://arxiv.org/abs/2111.10328). Ofrece un contexto más amplio sobre desigualdades ptolemaicas y geometría métrica.
