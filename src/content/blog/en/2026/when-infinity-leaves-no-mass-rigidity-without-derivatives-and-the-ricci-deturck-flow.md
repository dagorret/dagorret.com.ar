---
title: "When Infinity Leaves No Mass: Rigidity Without Derivatives and the Ricci–DeTurck Flow"
date: 2026-10-14
slug: "when-infinity-leaves-no-mass-rigidity-without-derivatives-and-the-ricci-deturck-flow"
translation_key: "when-infinity-leaves-no-mass-rigidity-without-derivatives-and-the-ricci-deturck-flow"
lang: "en"
categories: ["Mathematics"]
tags: ["ADM mass","Differential Geometry","Edward Witten","General Relativity","Gromov conjecture","Jianchun Chu","Jingbo Wan","Man-Chun Lee","Mikhail Gromov","Positive Mass Theorem","Ricci flow","Ricci–DeTurck flow","Richard Schoen","Rigidity","Scalar Curvature","Schwarzschild metric","Shing-Tung Yau"]
---

_A reading of the work of Chu, Lee and Wan_

Some geometric results draw their strength not only from their conclusion but from the disproportion between what they assume and what they end up asserting. The paper that Jianchun Chu (Peking), Man-Chun Lee (Hong Kong) and Jingbo Wan (Sorbonne) posted to arXiv this year, [_Rigidity of positive mass theorem with fast metric decay_](https://arxiv.org/abs/2607.17236), belongs to that family. They start from a metric that, away from a compact set, resembles the Euclidean one slightly more than the imprint of an isolated mass allows. That resemblance is controlled only in the value of the metric, not in how it changes from one point to another. And yet they conclude that the entire geometry, the interior included, must be exactly that of flat space.

Put in one line: if the scalar curvature is nonnegative and

$$
g-g_{\mathrm{euc}}=o(|x|^{2-n}),
$$

then, in dimension $n\ge4$, the manifold is isometric to $\mathbb R^n$. All the difficulty lies in a very precise tension. That decay is enough to erase the imprint of the mass, but not enough to measure the mass with the usual tool. The proof consists in manufacturing the missing regularity without losing, along the way, the information that came from infinity.

## The order that gives a mass away

A metric is asymptotically Euclidean when, in suitable coordinates outside a compact set, it can be written as $g_{ij}=\delta_{ij}+h_{ij}$ with a perturbation $h$ that dies out as one moves away. The interesting question is never whether it dies out, but how fast. And there is one rate that is not just one among others: $|x|^{2-n}$.

It is not an exponent chosen for convenience. It is the order of the fundamental solution of the Laplacian in dimension $n$, that is, the way the potential of a point charge decays. And it is also the order at which the Schwarzschild geometry, the spatial model of an isolated body with mass $m$, departs from the Euclidean one. In isotropic coordinates,

$$
g_{\mathrm{Sch}}=\left(1+\frac{m}{2|x|^{n-2}}\right)^{\frac{4}{n-2}}g_{\mathrm{euc}},
$$

so the difference from flat space is exactly of order $|x|^{2-n}$, with the coefficient $m$ playing the leading role. That is why the hypothesis of Chu, Lee and Wan has an almost immediate physical reading. Requiring $g-g_{\mathrm{euc}}$ to be $o(|x|^{2-n})$, strictly faster than that order, is requiring that no trace of the Schwarzschild term remain at infinity. The metric approaches the flat one without leaving the signature of a body with mass.

That the threshold is exactly this one, and not a more comfortable one, is shown by the authors themselves in an appendix. For any $c>0$ they construct a complete, non-flat metric with identically vanishing scalar curvature that behaves like $(1+c|x|^{2-n}+\dots) g_{\mathrm{euc}}$. The construction is a classical one that they reproduce for completeness: perturb the round sphere near a point, take the Green’s function of the conformal Laplacian with a pole at another point, and perform a conformal blow-up that sends that pole to infinity. The result is a space with positive mass that decays exactly at the critical order. If that order is allowed, mass appears. If something faster is required, the theorem says nothing is left.

## A conjecture of Gromov, with a typo

The question comes from Mikhail Gromov, who in his _Four lectures on scalar curvature_ asked whether the rigidity of the positive mass theorem survives when only the $C^0$ deviation of the metric from the Euclidean one is controlled. The background is a conviction widespread in the field, one Gromov himself helped establish: the condition $\operatorname{scal}\ge0$ seems to depend only on the $C^0$ geometry, and it is stable under uniform convergence of metrics even though its definition uses two derivatives. If that is so, rigidity ought to be expressible without mentioning derivatives.

The paper points out a detail worth telling. In Gromov’s text the decay rate appears as $|x|^{-1}$, which is correct only in dimension three. For $n\ge4$, the Schwarzschild order is $|x|^{2-n}$, which decays at least as fast as $|x|^{-2}$. In those dimensions, the metrics from the appendix, which decay exactly at the critical order $O(|x|^{2-n})$, are already $o(|x|^{-1})$: the original formulation admitted precisely non-flat metrics with positive mass. The conjecture as written was false because of a typo; the version with the correct exponent is the one that gets proved.

The three-dimensional case had been settled shortly before by another route. [Mazurowski and Yao](https://arxiv.org/abs/2605.29915) proposed an approach based on harmonic functions and a monotonicity formula of Agostiniani, Mazzieri and Oronzio; [You and Zhang](https://arxiv.org/abs/2606.15372) refined it and proved the conjecture for $n=3$, and almost at the same time Mazurowski and Yao obtained it as a consequence of their [positive mass theorem for continuous metrics](https://arxiv.org/abs/2606.19123). Those arguments rely on the Gauss–Bonnet theorem on level sets and are therefore tied to low dimension. Chu, Lee and Wan complete the picture from the other side: their method works exactly from $n=4$ on and breaks down at $n=3$. Between the two lines of work, the conjecture is settled in all dimensions.

The statement is somewhat more general than Gromov’s. The manifold need not be $\mathbb R^n$ to begin with: it is enough that it have a Euclidean end, that is, a compact set outside of which it is diffeomorphic to $\mathbb R^n$ minus a ball, and that in that chart the metric satisfy the decay condition. The conclusion includes the topology. If the manifold had several ends a priori, the argument forces it to have only one.

## Why one cannot start with the mass

The ADM mass, the quantity introduced by Arnowitt, Deser and Misner in 1961 and shown by Bartnik to be a geometric invariant, is computed as a flux through very large spheres:

$$
m_{\mathrm{ADM}}(g)=\frac{1}{2(n-1)\omega_{n-1}}\lim_{r\to\infty}\int_{S_r}\left(\partial_i g_{ij}-\partial_j g_{ii}\right)\nu^j dA .
$$

What gets integrated are first derivatives of the metric. And Gromov’s hypothesis says nothing about derivatives. A function can be very small and oscillate very fast; the decay of $g-g_{\mathrm{euc}}$ does not prevent $\partial g$ from doing anything at all. Under a purely $C^0$ decay hypothesis there is no asymptotic control over those derivatives, and the limit that defines the ADM mass need not even exist.

This matters because the temptation, when reading the theorem, is to summarize it as “fast decay forces zero mass, and then the rigidity of the positive mass theorem gives flat space”. That sentence is not false as an intuition, but it hides exactly the part that needs proving. The proof does not begin by asserting that the mass of the original metric vanishes. It cannot, because that mass is not available. Derivatives have to be obtained first.

## The flow as a regularity factory

To obtain them, the authors let the metric evolve. Ricci flow, $\partial_t g=-2\operatorname{Ric}(g)$, tends to smooth out geometry the way the heat equation smooths out an irregular temperature, but it has a technical flaw: being invariant under diffeomorphisms, it is not strictly parabolic. The standard fix is DeTurck’s trick, which adds a Lie derivative term with respect to a field $W$ built by comparing the connections of $g$ with those of a reference geometry:

$$
\partial_t g=-2\operatorname{Ric}(g)+\mathcal L_W g .
$$

The result is a strictly parabolic equation that, up to a time-dependent change of coordinates, is still Ricci flow.

The choice of reference geometry is where the paper takes the most care. The natural thing would be to compare with the Euclidean metric, but the decay hypothesis does not guarantee that $g_0$ is uniformly close to it everywhere, which is what stability theory requires. So the authors build an intermediate metric $\tilde g_0$: it agrees with $g_0$ on a large region and is exactly Euclidean outside a compact set. The reference is not a frozen $\tilde g_0$, but the Ricci flow starting from it. That flow is no longer flat at infinity for positive time, because diffusion spreads a little curvature outward. But a localization lemma shows that, where the initial metric was flat, the curvature stays of order $t^\ell r^{-2\ell-2}$ for any $\ell$, that is, negligible to any polynomial order.

With that reference, a weak stability theorem due to Chan, Lai and Lee himself ensures that the Ricci–DeTurck flow starting from $g_0$ exists and stays close to the reference. And by comparing with auxiliary flows that start from truncations of $g_0$ at different scales, the authors obtain the two estimates they need:

$$
|g(t)-g_{\mathrm{euc}}|=o(|x|^{2-n}), \qquad t^{1/2} |\nabla g(t)|=o(|x|^{2-n}).
$$

The first says the flow does not spoil the decay. The second is the missing piece, and the factor $t^{1/2}$ is not decorative: it says that control of the derivatives degrades as $t\to0$, as befits an initial metric that did not have it. But for each fixed positive time, the factor is a constant and the estimate reads simply as $|\nabla g(t)|=o(|x|^{2-n})$. The initial metric had no reason to have controlled derivatives; any metric evolved for a positive time does have them, at the same order. Iterating the argument yields more derivatives, though not all of them are equally useful. In the classical framework of asymptotic flatness, where each derivative has to decay at a sufficient order, the regularized metric is asymptotically flat with $C^k$ control only for

$0\le k<\tfrac{n-2}{2}$

. For $n\ge7$ this includes two derivatives, which is enough to apply the classical rigidity of the positive mass theorem directly. Below that, the paper’s own argument is needed, which makes do with just one.

One more requirement remains: the flow must not destroy the geometric hypothesis. Under Ricci flow, scalar curvature evolves according to

$$
\partial_t R=\Delta R+2|\operatorname{Ric}|^2,
$$

a heat equation with a source that is never negative. By the maximum principle, if $R\ge0$ at the start, it stays that way. On non-compact manifolds this does not come for free, and the authors resort to a localized version of the maximum principle, but that is the structure. There is an idea here that goes beyond the problem: when a quantity cannot be defined for lack of regularity, one can sometimes regularize the geometry with a flow and show that what mattered survives.

## Truncate, deform, compare masses

With derivatives in hand, the core of the paper is an auxiliary result that can be read as the equality case of a weak positive mass theorem. If $g$ has nonnegative scalar curvature and both $g-g_{\mathrm{euc}}$ and $\partial g$ decay as $o(|x|^{2-n})$, then $\operatorname{scal}(g)\equiv0$. What is interesting is how it is proved, because here too the mass of $g$ is never computed.

The first step is to truncate. For each large radius $R$ one builds a metric $g_R$ that agrees with $g$ up to the ball of radius $R$, is exactly Euclidean beyond $2R$, and interpolates between the two in the intermediate annulus. Since $g_R$ is flat outside a compact set, its ADM mass is well defined and equals zero. The price of truncation is that scalar curvature, possibly negative, appears in the annulus: gluing two geometries is not innocent. Much of the technical work consists in showing that this defect is small. Writing the scalar curvature in divergence form with respect to the Euclidean background, the error in the annulus is controlled by a quantity $\varepsilon_R$ that tends to zero thanks to the $o(|x|^{2-n})$ decay of $g$ and its derivatives, multiplied by powers of $R$ that turn out to be manageable.

The second step is a conformal deformation. One looks for a positive function $\psi_R$ that tends to $1$ at infinity and solves

$$
-\Delta_{g_R}\psi_R+c_0 \operatorname{scal}(g_R) \psi_R=0, \qquad c_0=\frac{n-2}{4(n-1)} .
$$

Since the curvature of $g_R$ is not nonnegative everywhere, the existence of $\psi_R$ is not automatic; it is obtained precisely because the negative part is small in an integral sense, controlled by a Sobolev inequality uniform in $R$. With that function, the metric $\tilde g_R=\psi_R^{4/(n-2)}g_R$ has identically vanishing scalar curvature, by the conformal transformation law for scalar curvature.

The third step is where the positive mass theorem comes in. Schoen and Yau proved it up to dimension seven and Witten for spin manifolds in any dimension; the dimensional restriction that remained in the non-spin case was recently removed: [Bi, Hao, He, Shi and Zhu](https://arxiv.org/abs/2603.02769) reached dimension 19 and [Brendle and Wang](https://arxiv.org/abs/2604.08473) completed the rest. Applied to $\tilde g_R$, it says that its mass is nonnegative. And the conformal deformation relates the two masses through an integral identity:

$$
m_{\mathrm{ADM}}(g_R)-m_{\mathrm{ADM}}(\tilde g_R)=\kappa_n\int_M\left(|\nabla\psi_R|^2+c_0 \operatorname{scal}(g_R) \psi_R^2\right)d\mathrm{vol}_{g_R},
$$

where $\kappa_n=\frac{2}{(n-2)\omega_{n-1}}$ is a positive constant depending only on the dimension. The left-hand side is zero minus something nonnegative. Therefore the integral on the right is less than or equal to zero. If the scalar curvature of $g_R$ were nonnegative everywhere, this would immediately force the gradient of $\psi_R$ to vanish. It is not, so one has to fight: the authors split the negative contribution of the annulus into several terms and show that each one is bounded by $\varepsilon_R$ times a power of $R$, so that the energy $\int|\nabla\psi_R|^2$ tends to zero as $R\to\infty$.

It is in one of those terms that the dimension shows up. The corresponding error comes multiplied by $R^{4-n}$, which stays bounded for $n\ge4$ and grows without control for $n=3$. This is not a matter of style; it is the exact place where the argument breaks.

As $R$ grows, the metrics $g_R$ agree with $g$ on ever larger compact sets, and the $\psi_R$, bounded by Sobolev and by interior estimates, converge smoothly to a function $\psi$ with zero gradient that equals $1$. Plugging this into the equation, $\operatorname{scal}(g)=c_0^{-1}\psi^{-1}\Delta\psi=0$. The mass of $g$ was never computed. It was cornered by a family of auxiliary metrics that do have one.

## The contradiction

With all of that in place, the conclusion is short. Suppose $g_0$ is not flat and let it evolve under the Ricci–DeTurck flow. The scalar curvature stays nonnegative, and the strong maximum principle leaves two possibilities. If it is not identically zero, it becomes strictly positive at every point for all $t>0$. If instead it is identically zero, the evolution equation reduces to $0=2|\operatorname{Ric}|^2$, and the source forces $g_0$ to be Ricci-flat. A Ricci-flat metric that looks Euclidean at infinity has Euclidean volume growth, and Bishop–Gromov rigidity makes it flat, contrary to the assumption. That leaves the first case.

But now fix a time $t_0>0$ and look at $g(t_0)$. By the flow estimates, it decays as $o(|x|^{2-n})$, and so do its derivatives. It satisfies the hypotheses of the auxiliary result, so its scalar curvature vanishes identically. That same curvature was strictly positive. The contradiction forces the initial metric to be flat, and with the topological hypotheses of the theorem, that is $\mathbb R^n$.

## What is left out, and what should not be simplified

The theorem proves something conceptually new, that rigidity can be obtained without any initial hypothesis on the derivatives of the metric, but it does not do so without support. The positive mass theorem is used as a deep prior result, in its all-dimensions version that was closed only very recently, and the paper does not offer a new proof of it. Nor is this a purely asymptotic phenomenon: decay by itself says nothing about the interior of the manifold, and the global conclusion depends on $\operatorname{scal}\ge0$ holding everywhere and on the whole apparatus of flow, stability and elliptic equations.

A couple of side remarks help to situate the method. The authors note that in some cases shortcuts were already available: for spin manifolds with $n\ge5$, the theorem follows from the positive mass theorem of Lee and LeFloch for low-regularity metrics applied to the regularized metric; and for $n\ge7$, as we saw, regularization is enough to apply the classical rigidity directly. What the paper contributes is a unified argument for all $n\ge4$. The first version of the work used spinors; the second replaced them with the conformal method, which needs no spin structure. And although the theorem is stated for smooth metrics, the authors state that the argument adapts to merely continuous metrics with the same decay, provided $\operatorname{scal}\ge0$ is understood in an approximation sense; they say so, but do not develop it.

Finally, a word of caution for the reader. The flow does a great deal of work, and that work is not formal. One has to build a suitable reference, prove existence with global control, and show that the decay is preserved, that the scalar curvature does not become negative and that the derivatives appear at the right order. Each of those steps rests on recent technical results, several of them by the same group. Reading the theorem as an elegant consequence of positive mass is correct in spirit, but it erases the finest part: the part that teaches how to turn a hypothesis that only looks at values into a conclusion that demands derivatives, without losing along the way the only thing infinity had to say, which here
