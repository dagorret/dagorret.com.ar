---
title: "The Taxonomy of Ignorance: Rational Decision Between Computable Risk and Radical Uncertainty"
date: 2026-10-12
slug: "the-taxonomy-of-ignorance-rational-decision-between-computable-risk-and-radical-uncertainty"
translation_key: "the-taxonomy-of-ignorance-rational-decision-between-computable-risk-and-radical-uncertainty"
lang: "en"
categories: ["Mathematics","Philosophy"]
tags: ["Black swan","Decision theory","Ellsberg paradox","Knightian uncertainty"]
---

_**Abstract**_

This essay examines the conceptual and epistemological boundary between computable stochastic risk and radical, or Knightian, uncertainty. It analyzes the formalization of decision theory under ignorance, covering Abraham Wald’s maximin criterion, the concept of ambiguity aversion as illustrated by the Ellsberg Paradox, and the Ramsey–de Finetti coherence argument for subjective probability. It also sets out Nassim Nicholas Taleb’s critique of the Gaussian distribution in complex systems, formalizing power laws and the ontological impact of heavy-tailed events (“black swans”).

* * *

### 1\. Knight’s distinction: risk versus uncertainty

In his seminal work _Risk, Uncertainty and Profit_ (1921), Frank Knight established an epistemological dichotomy that became fundamental to economic theory and statistical inference:

1.  **Computable risk**: situations in which the space of future states $\Omega$ is known and the probability distribution $\mathbb{P}(\omega)$ over that space is fully defined, or can be estimated from well-established empirical frequencies or a priori symmetries.
2.  **Radical uncertainty (Knightian uncertainty)**: situations in which the state space $\Omega$ is incomplete or unforeseeable, or in which the probability measure $\mathbb{P}$ is objectively unknown and cannot be estimated from past data.

Under computable risk, decision-making reduces to a mathematical optimization problem: maximizing expected value, or von Neumann–Morgenstern expected utility:

$$
\max_{a \in \mathcal{A}} \mathbb{E}_{\mathbb{P}}[U(a, \omega)] = \max_{a \in \mathcal{A}} \int_{\Omega} U(a, \omega) \, d\mathbb{P}(\omega)
$$

where $\mathcal{A}$ is the set of available actions and $U(a, \omega)$ is the agent’s utility function. Under radical uncertainty this paradigm collapses: since there is no agreed-upon or valid probability measure $\mathbb{P}$, the Lebesgue integral has no operational definition.

* * *

### 2\. Formal decision criteria under pure ignorance: Wald and Savage

When the distribution $\mathbb{P}$ is unknown, decision theory turns to alternative axiomatic criteria. Abraham Wald, in _Statistical Decision Functions_ (1950), framed decision-making as a zero-sum game against nature and formulated the criterion now known as **maximin**:

$$
\max_{a \in \mathcal{A}} \min_{\omega \in \Omega} U(a, \omega)
$$

The maximin criterion selects the action whose worst possible outcome is the least unfavorable. It is a stance of extreme risk aversion that guarantees a lower bound on performance without assigning probabilities to the states of nature. Its dual formulation in terms of losses, $\min_a \max_\omega L(a,\omega)$, properly called “minimax”, is what originally gave rise to the name with which it is often confused; the two are interchangeable only under the transformation $L=-U$.

In contrast to Wald’s rigidity, Leonard Savage, in _The Foundations of Statistics_ (1954), developed the paradigm of **subjective prior probabilities** (_subjective expected utility_, SEU). Savage proved that if a rational agent’s preferences satisfy a set of axioms, including the **sure-thing principle**, then the agent’s decisions are mathematically equivalent to maximizing expected utility with respect to an implicit subjective probability measure $P_{\text{subj}}$.

* * *

### 3\. The Ellsberg Paradox and ambiguity aversion

The validity of Savage’s SEU model was challenged by Daniel Ellsberg in “Risk, Ambiguity, and the Savage Axioms” (_The Quarterly Journal of Economics_, 1961), a paper Ellsberg first presented at the Econometric Society meeting in St. Louis in December 1960 ([Moscati, “Ellsberg 1961: Text, Context, Influence”](https://link.springer.com/article/10.1007/s10203-024-00437-1)). A biographical note that is rarely mentioned adds color to the figure: this same Daniel Ellsberg would, ten years later, leak the Pentagon Papers, one of the most significant episodes in the history of American investigative journalism ([Philopedia, “Ellsberg Paradox”](https://philopedia.org/arguments/ellsberg-paradox/)). The economist who formalized human aversion to ambiguity ended up, in his other public life, choosing to reveal precisely the kind of radical uncertainty the Pentagon preferred to keep hidden.

Through a thought experiment, Ellsberg showed that human agents sharply distinguish between computable risk and radical uncertainty, systematically violating Savage’s axioms, and in particular the sure-thing principle itself.

Consider an urn containing $90$ balls:

-   -   $30$ balls are **red**.
