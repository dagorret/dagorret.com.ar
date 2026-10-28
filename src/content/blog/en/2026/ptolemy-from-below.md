---
title: "Ptolemy from Below"
date: 2026-10-28
slug: "ptolemy-from-below"
translation_key: "ptolomeo-por-debajo"
lang: "en"
categories: ["Mathematics"]
tags: ["Artificial Intelligence","Geometry","Mathematical Proof","Ptolemy's Inequality","Quadrilaterals"]
---

Someone opens a [question on Mathematics Stack Exchange](https://math.stackexchange.com/questions/5152789/is-this-reverse-ptolemy-inequality-true). They know Ptolemy’s theorem for quadrilaterals inscribed in a circle, and they wonder what is left of it when the quadrilateral is arbitrary. They measure, try cases, and find something: the product of the diagonals never seems to drop below a certain fraction of the sum of the products of opposite sides, and that fraction depends only on how the diagonals cut each other. They ask whether this can be proved. They say they could not find a reference in the literature.

I have not found a reference for this formulation either. This text presents the inequality, its proof, which quadrilaterals attain it with equality and, at the end, how it reached my hands. It is not a paper: it is an expository note on a small, clean result. I do not know whether it is new; it does deserve to be explained.

## What Ptolemy says

In what follows, we consider non-degenerate convex quadrilaterals, with their vertices labeled in order.

If $ABCD$ is a quadrilateral inscribed in a circle, the product of its diagonals equals the sum of the products of its opposite sides:

$$
AC\cdot BD=AB\cdot CD+BC\cdot DA.
$$

For an arbitrary convex quadrilateral, the equality becomes an inequality, the so-called Ptolemy inequality:

$$
AC\cdot BD\le AB\cdot CD+BC\cdot DA.
$$

The classical theorem and its applications are presented, for instance, in the [work of Knežević and Savić](https://teaching.math.rs/landing.php?name=tm2317&p=TM231.cap). The inequality and the conditions for cyclicity also appear in [Pech’s paper](https://link.springer.com/chapter/10.1007/978-3-642-21898-9_34).

Put differently, the ratio between the product of the diagonals and the sum of products of opposite sides never exceeds $1$, and it equals $1$ exactly for cyclic quadrilaterals. Ptolemy sets a ceiling. The natural question is whether there is also a floor.

## A floor that depends on the diagonals

Let $O$ be the point where the diagonals of $ABCD$ meet. I write

$$
x=OA\cdot OC,\qquad y=OB\cdot OD:
$$

each is the product of the two pieces into which $O$ divides a diagonal. The proposed inequality is

$$
AC\cdot BD\ge\frac{2\sqrt{xy}}{x+y}\,\bigl(AB\cdot CD+BC\cdot DA\bigr).
$$

The coefficient has an immediate reading: it is the ratio of the geometric mean to the arithmetic mean of $x$ and $y$. It equals $1$ when $x=y$ and shrinks as the relative imbalance between the two products grows. Combining Ptolemy’s ceiling with this floor, the ratio is squeezed as follows:

$$
\frac{2\sqrt{xy}}{x+y}\le\frac{AC\cdot BD}{AB\cdot CD+BC\cdot DA}\le 1.
$$

One detail is worth noticing before going on. The condition $x=y$, that is, $OA\cdot OC=OB\cdot OD$, is exactly the one that characterizes cyclic quadrilaterals in this setting: it is the intersecting chords theorem and its converse. So the floor and the ceiling meet precisely where Ptolemy holds with equality.

Away from that, the floor depends on the relative imbalance between the two products. The size of the figure does not matter, only the ratio between $x$ and $y$. This imbalance should not be confused with a geometric distance to a cyclic quadrilateral: no such distance has been defined here.

## The proof: two inequalities and an identity

I write

$$
OA=p,\qquad OB=q,\qquad OC=r,\qquad OD=s,
$$

and call $\theta$ the angle $AOB$, with $c=\cos\theta$. Since the diagonals meet in the interior, the four lengths are positive. The four angles around $O$ are $\theta$, $\pi-\theta$, $\theta$, $\pi-\theta$, so the law of cosines gives the four sides:

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

The angle is the nuisance: it shows up everywhere, with different signs. The idea of the proof is to make it disappear.

### First part: choosing the weights

For that we use a weighted form of the inequality between means. For any $u,v>0$ and $\lambda>0$,

$$
uv\le\frac12\left(\lambda u^2+\frac{v^2}{\lambda}\right).
$$

There is nothing mysterious behind it: just expand the square

$$
\left(\sqrt{\lambda}\,u-\frac{v}{\sqrt{\lambda}}\right)^2\ge 0.
$$

Equality holds exactly when $v=\lambda u$.

We apply this inequality once to $AB\cdot CD$ and once to $BC\cdot DA$, but with different weights:

$$
\lambda=\sqrt{\frac{rs}{pq}},\qquad\mu=\sqrt{\frac{sp}{qr}}.
$$

The choice is made so that

$$
\lambda pq=\frac{rs}{\lambda}=\mu qr=\frac{sp}{\mu}=\sqrt{pqrs}.
$$

Let $P=\sqrt{pqrs}=\sqrt{xy}$. The first application gives

$$
AB\cdot CD\le\frac12\left(\lambda AB^2+\frac{CD^2}{\lambda}\right),
$$

with

$$
\lambda AB^2+\frac{CD^2}{\lambda}=\lambda(p^2+q^2)+\frac{r^2+s^2}{\lambda}-4Pc.
$$

The second gives

$$
BC\cdot DA\le\frac12\left(\mu BC^2+\frac{DA^2}{\mu}\right),
$$

with

$$
\mu BC^2+\frac{DA^2}{\mu}=\mu(q^2+r^2)+\frac{s^2+p^2}{\mu}+4Pc.
$$

The terms $-4Pc$ and $+4Pc$ cancel when we add. **The angle disappears without our assuming anything special about it.**

### Second part: recognizing an identity

Once the two estimates are added, we are left with

$$
AB\cdot CD+BC\cdot DA\le\frac P2\left(\frac pq+\frac qp+\frac qr+\frac rq+\frac rs+\frac sr+\frac sp+\frac ps\right).
$$

The sum of fractions looks cumbersome, but it satisfies an exact identity:

$$
pqrs\left(\frac pq+\frac qp+\frac qr+\frac rq+\frac rs+\frac sr+\frac sp+\frac ps\right)=(p+r)(q+s)(pr+qs).
$$

To check it, just expand both sides. The same polynomial appears in each:

$$
p^2qr+p^2rs+pq^2s+q^2rs+pqr^2+pr^2s+pqs^2+qrs^2.
$$

Since $pqrs=P^2$, the previous estimate becomes

$$
AB\cdot CD+BC\cdot DA\le\frac{(p+r)(q+s)(pr+qs)}{2P}.
$$

Finally, $AC=p+r$, $BD=q+s$, $pr=x$ and $qs=y$. Substituting and rearranging,

$$
AC\cdot BD\ge\frac{2\sqrt{xy}}{x+y}\,\bigl(AB\cdot CD+BC\cdot DA\bigr).
$$

The proof ends there. All the work of the inequality lay in the two applications of the arithmetic–geometric mean inequality. What came afterwards was an identity.

## Who reaches the floor

A bound is not fully understood until we know when it is attained. Here, equality at the end requires both inequalities used in the proof to be equalities:

$$
CD=\lambda AB,\qquad DA=\mu BC.
$$

Since all lengths and weights are positive, we may square without introducing extra solutions. Substituting the expressions from the law of cosines, the angle terms disappear again:

$$
CD^2-\lambda^2 AB^2=r^2+s^2-\frac{rs}{pq}(p^2+q^2)=\frac{(pr-qs)(qr-ps)}{pq},
$$

 

$$
DA^2-\mu^2 BC^2=p^2+s^2-\frac{sp}{qr}(q^2+r^2)=\frac{(qs-pr)(rs-pq)}{qr}.
$$

Hence the equality conditions are exactly

$$
\frac{(pr-qs)(qr-ps)}{pq}=0\qquad\text{and}\qquad\frac{(qs-pr)(rs-pq)}{qr}=0.
$$

These two factorizations separate all possible cases.

### Cyclic quadrilaterals

If $pr=qs$, both expressions vanish. This is precisely the cyclicity condition mentioned earlier.

To see the converse as well, draw the circle through $A$, $B$ and $C$, and let $D'$ be the second point where the line $BO$ meets it. Since $O$ lies inside that circle, $D'$ is on the same ray from $O$ as $D$. By the intersecting chords theorem,

$$
OB\cdot OD'=OA\cdot OC.
$$

If $pr=qs$, then $OD'=s=OD$, and therefore $D'=D$. All four vertices lie on the same circle.

In this case $x=y$, the coefficient equals $1$, and we recover Ptolemy’s classical equality.

### Parallelograms

If $pr\ne qs$, the other two factors must vanish:

$$
qr=ps,\qquad rs=pq.
$$

Dividing the first equation by the second,

$$
\frac qs=\frac sq.
$$

Since $q,s>0$, we get $q=s$. Substituting into either of the previous equations gives $r=p$.

The diagonals bisect each other: $OA=OC$ and $OB=OD$. That characterizes a parallelogram.

Conversely, in any parallelogram we have $p=r$, $q=s$, $\lambda=\mu=1$, and opposite sides are equal. Both applications of the inequality between means are then equalities.

**Equality holds if and only if the quadrilateral is cyclic or a parallelogram.** The two families are not mutually exclusive: rectangles belong to both.

## Why the coefficient cannot be improved

Parallelograms do more than complete a list of special cases. They show that the coefficient is the best possible for every ratio between $x$ and $y$.

In a parallelogram whose half-diagonals measure $p$ and $q$,

$$
x=p^2,\qquad y=q^2.
$$

We can choose positive $p$ and $q$ in any ratio, and an angle between the diagonals other than $0$ and $\pi$. We always obtain a non-degenerate parallelogram.

Moreover, its diagonals satisfy

$$
AC\cdot BD=4pq,
$$

and, adding the expressions for the squares of two consecutive sides,

$$
AB\cdot CD+BC\cdot DA=AB^2+BC^2=2(p^2+q^2).
$$

Therefore,

$$
\frac{AC\cdot BD}{AB\cdot CD+BC\cdot DA}=\frac{2pq}{p^2+q^2}=\frac{2\sqrt{xy}}{x+y}.
$$

For any prescribed value of $x/y>0$, then, there is a quadrilateral that reaches the floor exactly. Raising the coefficient for that ratio would make the inequality false for that parallelogram.

This is not a bound that is only approached as the figure flattens or degenerates. **The floor is attained by non-degenerate parallelograms, for every positive ratio between the products.**

## How it got here

The question that gave rise to this note is by **Nilotpal Kanti Sinha**: [“Is this reverse-Ptolemy inequality true?”](https://math.stackexchange.com/questions/5152789/is-this-reverse-ptolemy-inequality-true), on Mathematics Stack Exchange. Both the proposed inequality and the conjecture that its coefficient is optimal are there. The formulation of the problem is not mine.

I posted an answer on that site and later withdrew it. This note keeps the mathematical development and gives it more room to explain the proof, the equality cases and the optimality.

I developed the proof in dialogue with Claude, an artificial intelligence model: the choice of weights that cancels the angle came from there. The complete characterization of the equality cases, the converse for cyclicity and the verification of the computations are my own work. I take responsibility for what I publish.

I make no claim of bibliographic priority. Not having found a precedent does not prove that none exists. What is proved here is the inequality, its equality cases, and the impossibility of improving its coefficient if it depends only on $x/y$.

Ptolemy set the ceiling. This question made us look at the floor. And, looking carefully, we found two elementary inequalities, one identity, and a whole family of figures resting exactly on it.

## References and related reading

The first reference is the source of the question. The others provide context on Ptolemy’s theorem, its inequality and cyclicity; I do not present them as sources for the lower bound proved in this note.

1.  **Nilotpal Kanti Sinha.** [_Is this reverse-Ptolemy inequality true?_](https://math.stackexchange.com/questions/5152789/is-this-reverse-ptolemy-inequality-true). Mathematics Stack Exchange. Source of the conjecture and of the question about the optimal coefficient.
2.  **Miljan Knežević and Dragana Savić (2020).** [_Some Remarks on Ptolemy’s Theorem and Its Applications_](https://teaching.math.rs/landing.php?name=tm2317&p=TM231.cap). _The Teaching of Mathematics_, **23**(1), 57–70. Presents the classical theorem and geometric applications.
3.  **Pavel Pech (2011).** [_On Equivalence of Conditions for a Quadrilateral to Be Cyclic_](https://link.springer.com/chapter/10.1007/978-3-642-21898-9_34). In _Computational Science and Its Applications — ICCSA 2011_, Lecture Notes in Computer Science, **6785**, 399–411. Springer. DOI: [10.1007/978-3-642-21898-9\_34](https://doi.org/10.1007/978-3-642-21898-9_34). Studies equivalent conditions for cyclicity and proves Ptolemy’s inequality.
4.  **Mario Gómez and Facundo Mémoli (2024).** [_The Four Point Condition: An Elementary Tropicalization of Ptolemy’s Inequality_](https://doi.org/10.1080/00029890.2023.2285695). _The American Mathematical Monthly_, **131**(3), 187–203. [Preprint at arXiv:2111.10328](https://arxiv.org/abs/2111.10328). Offers broader context on Ptolemaic inequalities and metric geometry.
