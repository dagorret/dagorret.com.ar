---
title: "The Hygiene of the Archive: What Happens When Human Data Stops Being Human"
date: 2026-11-12
slug: the-hygiene-of-the-archive
translation_key: la-higiene-del-archivo
lang: en
categories:
  - Artificial Intelligence
tags:
  - model collapse
  - sanitization
  - linguistic diversity
  - bounded drift
---

*This text is the third part of the series that began with [“The Myth of Digital Collapse”](/mito-colapso-digital/) and went on with [“Evolution with Memory”](/evolucion-con-memoria/). There I argued that model collapse depends on one assumption, that human data gets replaced, and that once data accumulates what remains is a bounded drift. Here I look at what happens when a different assumption breaks: that human data stays human.*

## An email that comes out better

A department secretary needs to let people know that an exam session has been moved. She writes the email the way she writes all of them: she opens with a “les cuento que” (roughly, “just so you all know”), slips in a parenthesis that occurs to her halfway through, and closes with a slightly crooked sentence that anyone at the school understands. Before sending it she pastes it into the assistant and asks it to make it “tidier.” What comes back is, no question, a better email: no mistakes, well ordered, two lines shorter. It could also have come out of any office at any Spanish-speaking university, and that is what kept nagging at me.

Taken one at a time, none of this is serious, and the email does its job better than before. What worries me is the sum. Millions of texts are born human, pass through a statistical filter and end up on the web, in repositories and in archives labeled as human. In the debate about *model collapse* these are the “biological” or “real” data, the ones that are supposed to protect models from degrading.

That is where the question of this text comes from. If what is human arrives more and more prefiltered by the very models that are later trained on it, does what I argued in “Evolution with Memory” still hold? The quick answer is yes, because the original archive is stored and nobody touches it. I think that answer is too comfortable. My hypothesis is that the archive holds up but loses the ally that made it sufficient, and that the damage would start at the edges of the distribution long before it showed up in the average. It is a hypothesis about a mechanism, not a confirmed diagnosis, and at the end I say what would have to be measured to test it.

## Three operations under one name

In public conversation, the word “sanitize” covers at least three different operations. There is *correction*, which removes what the author would recognize as a mistake: a missing accent, a broken agreement, a wrong figure. There is *normalization*, which brings the text in line with a norm written down somewhere, whether a style manual or the conventions of a formal register. And there is a third, vaguer one that I will call *homogenization*: pulling the text toward whatever is most probable in a corpus, without anyone ever having decided that this is a norm.

The first two are old and have an author. A human copy editor knows what she is correcting and can justify it if asked; a style manual can be read, argued with and, when it comes to that, disobeyed. The third is new, at least in scale, and it has a feature I find decisive: it treats every deviation the same. To a language model, a typo and a lucky neologism are the same thing, low-probability sequences. The secretary’s “les cuento que” and a syntax error share just one property, that of sitting far from the center of the distribution, and the filter works by shrinking that distance.

So what the assistant did to that email was pull the text toward the mean, more than apply a rule to it. That leads to the conjecture I take to be the heart of the matter: sanitization by models would act on variance first. It also moves the mean, because it introduces biases, but its most direct effect would be to narrow the spread of what people write.

There is experimental evidence that this happens. [Doshi and Hauser (*Science Advances*, 2024)](https://doi.org/10.1126/sciadv.adn5290) ran an experiment with writers of short stories and found that those who received ideas from a model wrote texts that evaluators judged more creative, but also more similar to one another. The authors frame it as a social dilemma: each writer is better off using the tool, and the group ends up with a narrower repertoire. The study by [Agarwal, Naaman and Vashistha (CHI 2025)](https://doi.org/10.1145/3706598.3713564) goes a step further. With autocomplete suggestions, participants from India started writing more like Americans, to the point of describing their own foods and festivals through a Western lens. Homogenization, on top of everything, pushes in a particular direction.

## The anchor and its ally

Let me go over the model from “Evolution with Memory,” which I already presented as a toy model: Gaussian data and an estimator that learns only mean and variance. [Shumailov and colleagues (*Nature*, 2024)](https://doi.org/10.1038/s41586-024-07566-y) showed that if each generation is trained only on what the previous one produced, the tails vanish and the model degenerates. My objection, along the lines of [Gerstgrasser and colleagues (2024)](https://doi.org/10.48550/arXiv.2404.01413), was that this result depends on the data being replaced. If data accumulates and the original human corpus is kept, the random error in the mean stays bounded by the Basel series and the variance does not go to zero. What does not stay bounded is the bias. If each synthetic generation nudges the mean a little, always in the same direction, the drift grows like the logarithm of the number of generations, slowly and with no ceiling to stop it.

In that setup the only anchor is the original corpus, $X_0$. It has a weakness I left unstated back then: its relative weight falls as $1/(t+1)$, because each generation adds a new batch and the original gets more and more diluted. It is not lost, but it weighs less and less.

The model was missing something that exists in the real world and that I now have to put on the table: fresh human data, which keeps arriving. People write, talk and publish every day, and part of that goes into each new round of training. That flow is the anchor’s ally. The old archive tells you what the distribution used to look like and the fresh flow tells you what it looks like today, so the latter can keep correcting the bias that models introduce.

Sanitization hits right there. The original corpus stays intact on the disks; what gets contaminated is the new flow, which keeps its human label even though it already arrives tilted toward what the model considers probable. What falls is the assumption that new human data is independent of the model.

## The human share that counts

To see what changes, I add two parameters to the model. In each generation a new batch, the same size as the previous ones, enters the corpus. A fraction $h$ of that batch is fresh human text and the rest, $1-h$, is synthetic. Synthetic text inherits the current model’s error plus a bias of its own, $\delta$. Sanitized human text inherits a share $\alpha$ of that same error, where $\alpha = 0$ is someone who writes without going through the model and $\alpha = 1$ is someone who just signs what the model wrote.

I call $e_t$ the distance between the estimated mean at generation $t$ and the true mean. The average error of the new batch turns out to be proportional to the model’s existing error plus its bias:

$$
\varepsilon_t = \gamma\,(e_{t-1} + \delta), \qquad \gamma = 1 - h\,(1-\alpha)
$$

Since the corpus accumulates every batch together with $X_0$, the estimated mean is the average of all of them, and the recursion becomes:

$$
e_t = e_{t-1}\,\frac{t+\gamma}{t+1} + \frac{\gamma\,\delta}{t+1}
$$

Everything depends on one quantity, $h(1-\alpha)$, which I will call the *effective human fraction*. It measures how much of what humans write did not pass through the model, and that, more than the total volume of human text, is what protects the system. There are two possible situations.

If the effective human fraction is zero, because there is no fresh data or because what there is has been fully sanitized, then $\gamma = 1$ and the recursion goes back to the one in “Evolution with Memory”: the drift grows with the harmonic series, like $\delta \ln t$, with no ceiling. For the model, a fully sanitized human flow is the same as having no human flow at all.

If the effective human fraction is positive, the drift has a ceiling. Setting $e_t$ equal to $e_{t-1}$ gives the fixed point:

$$
e^{*} = \frac{\gamma\,\delta}{1-\gamma} = \delta\,\frac{1 - h(1-\alpha)}{h(1-\alpha)}
$$

The ceiling exists, but it moves away very fast as sanitization grows, because it depends on the inverse of the effective human fraction. On top of that, the system approaches it slowly, like a power of $t$ with exponent $-h(1-\alpha)$. The table shows a simulation of the recursion with $\delta = 1$ and 30% human text in each batch; drift is read in units of the bias $\delta$.

| Scenario | Effective human fraction | Drift at 10 generations | Drift at 20 generations | Drift at 10,000 generations | Ceiling |
| --- | --- | --- | --- | --- | --- |
| Unfiltered humans ($\alpha = 0$) | 0.30 | 1.09 | 1.31 | 2.17 | 2.33 |
| Moderate sanitization ($\alpha = 0.5$) | 0.15 | 1.51 | 1.88 | 4.16 | 5.67 |
| Heavy sanitization ($\alpha = 0.9$) | 0.03 | 1.91 | 2.48 | 7.50 | 32.3 |
| No fresh data ($h = 0$) | 0 | 2.02 | 2.65 | 8.79 | none |

When I ran the numbers I expected something else. Over the horizon that matters in practice, a few dozen generations, sanitization changes the drift much less than I had assumed: at twenty generations it goes from 1.3 to 2.5 times the bias. The big effect is in the ceiling, which rises from 2.3 to 32. In the short run it is barely visible, and that is exactly why it is easy to underestimate.

There is, all the same, a way out that does not depend on how humans write. If instead of letting $X_0$ dilute you give it a fixed weight $w$ in every round of training, the drift stays bounded by $(1-w)\delta/w$ even when the human flow is fully sanitized. An anchor with a fixed weight does the same job as the fresh ally, putting a ceiling on the drift, with one difference that is not minor: the ally can be lost without anyone deciding it, whereas the anchor’s weight is something somebody sets.

## The tails pay with interest

So far I have talked about the mean. If sanitization works mainly on dispersion, though, we have to look at the variance, and that forces me to correct something I wrote. In “Evolution with Memory” I claimed that with accumulation the tails do not disappear. That is true under the assumption I stated at the time, that synthetic error is zero-mean noise for the variance as well. If the model tends to produce texts less dispersed than the ones it learned from, the assumption falls and the claim falls with it.

That language models do this is a reasonable supposition, and it is worth saying where it comes from. Part of it comes from inference: they are sampled at low temperatures and used, precisely, to “tidy up.” I suspect, though, that the main driver lies in post-training. [Kirk and colleagues (ICLR 2024)](https://doi.org/10.48550/arXiv.2310.06452) compared the stages of fine-tuning a model and found that reinforcement learning from human feedback (RLHF) significantly reduces output diversity compared with supervised fine-tuning, across several different measures. This matters for my argument, because it takes the contraction out of the realm of pure statistics. There is a reward function that favors a neutral, polite, safe tone, and behind it there are people who decided which answers were preferable; what was preferable turned out to sit near the center. I formalize this with a factor $c$ less than one: the synthetic batch reproduces the model’s variance multiplied by $c$, which does to dispersion what $\delta$ did to the mean. I call $r_t$ the ratio of the model’s variance to the true human variance. With the same batch structure, the new batch has a variance ratio of

$$
q_t = h\,(1-\alpha) + \gamma\,c\,r_{t-1}
$$

and, if there is an effective human flow, the system settles at

$$
r^{*} = \frac{h\,(1-\alpha)}{1 - \gamma\,c}
$$

With $c = 1$ sanitization does nothing to the variance and $r_t$ stays at one. I want to stress this, because it locates the problem in models shrinking dispersion, not in the mere fact that humans use them. With $c < 1$ and no effective human flow, the variance tends to zero even with accumulation, though slowly. Accumulating slows the collapse of the variance, but it is not enough to prevent it when there is a contraction bias. It is the same story as with the mean: what does the damage is the bias, and volume matters little.


For convenience I used the same $\alpha$ for the mean and for the variance, as if whoever runs a text through the model inherited its bias and its contraction in equal measure. That is not what happens when someone asks for a text to be made “tidier.” The model respects what the text says and flattens how it says it, so it moves the mean a little and shrinks the dispersion a lot. If the two parameters are separated, with a larger one for the variance, the effective human fraction that protects the tails turns out smaller than the one that protects the average. The tables use the same value for both, so if they are wrong, they err by understating the loss at the edges.

The math gets interesting in the step from variance to tails. In a Gaussian, the probability of landing $k$ deviations from the mean decays like the exponential of $k$ squared divided by the variance, which is why a moderate contraction of the variance produces a disproportionate loss at the extremes:

$$
\frac{P_r(|Z|>k)}{P_1(|Z|>k)} \approx \sqrt{r}\,\exp\!\left(-\frac{k^{2}}{2}\left(\frac{1}{r}-1\right)\right)
$$

The table shows the simulation with $c = 0.9$ and 30% human text. The last column measures how much remains of the events that, in the original human distribution, lay beyond three deviations (1 = intact).

| Scenario | Relative variance at 20 generations | Limiting relative variance | Tails at 20 generations | Tails in the limit |
| --- | --- | --- | --- | --- |
| Unfiltered humans ($\alpha = 0$) | 0.88 | 0.81 | 0.51 | 0.32 |
| Moderate sanitization ($\alpha = 0.5$) | 0.83 | 0.64 | 0.37 | 0.06 |
| Heavy sanitization ($\alpha = 0.9$) | 0.78 | 0.24 | 0.25 | practically 0 |
| No fresh data ($h = 0$) | 0.77 | tends to 0 | 0.22 | 0 |

With a variance 20% smaller, two thirds of the extreme events are lost; with one 36% smaller, 94%. The center barely moves and the average text still looks human, while the edges empty out.

In language, those edges are the rare words, the regional turns of phrase, the unexpected syntax, the metaphors that fail nine times and land once. Here the argument needs more care. One can object, rightly, that linguistic novelty lives in unprecedented combinations and shifts of context more than in the tail of a fixed distribution, and that models are very good at recombining: they come up with new metaphors even as their repertoire narrows. I accept the objection only in part. The Gaussian in the model stands for any measurable feature of a text, including the kind of combination chosen, not just word frequency. Besides, a model recombines within what it itself considers plausible. My suspicion is that the novelty at risk is the kind that needs to step outside that space: a regional usage that does not yet appear in any corpus, a concept nobody has named, a register that exists only in one neighborhood. That cannot be had by recombining what is already there; it comes in from outside, through the fresh human flow. If I am right, sanitization does not impoverish language in a way anyone can see, and what it does is narrow the door through which what was not yet there used to come in.

## Cleanses, fixes, and gives splendor

Put this way, the argument could sound like the usual nostalgia in the face of a new technology. There is a more serious objection, a historical one: written language has always been sanitized. The Royal Spanish Academy was founded in 1713 with a motto that says, literally, “limpia, fija y da esplendor” (“it cleanses, fixes, and gives splendor”). The printing press unified spellings, dictionaries fixed words, and for centuries publishers’ copy editors removed from texts what this essay calls tails. If sanitizing destroyed novelty, Spanish would have frozen three hundred years ago, and it keeps changing.

The objection is a good one and forces me to say exactly what is new. I find three differences, and I do not think any of them is merely a matter of degree.

To begin with, the educated norm worked on one layer of language, the formal written register. Underneath it there was still speech, private letters, slang and the way each neighborhood talked, and that is where the novelties came from that the norm ended up accepting years later. Translated into the model, that is a large effective human fraction: the norm cleaned one batch, but the fresh flow kept coming in through other channels. Today’s filter gets into everyday writing, into the secretary’s email and the message to the family group chat. And there are signs that it does not stay in writing either. [Yakura and colleagues (2024)](https://doi.org/10.48550/arXiv.2409.01754) analyzed hundreds of thousands of academic talks on YouTube and podcast episodes, and found an abrupt rise, after ChatGPT’s release, in words that model favors, such as *delve* or *meticulous*. That study measures verbal tics, not loss of dispersion, so it does not prove that speech is flattening. It does show that the spoken channel is not impervious to the model, and that the refuge many take for granted in spoken language has leaks.

The second difference is that the old norm was written down. A style manual can be read: you know what it says, you can argue with it and you can knowingly disobey it, as almost every writer worth reading has done. The statistical filter has no text. Its norm is what is probable, which nobody publishes or puts up for debate, and it is hard to rebel against a rule nobody ever stated.

The third, the one that matters most to me, has to do with the loop. The publisher’s copy editor did not learn from the texts she corrected; the model does. What it sanitizes today comes back tomorrow as training data, labeled human, and that is exactly the structure I formalized above, with $\alpha$ as the return channel. The academic norm reached the corpus from outside, whereas today’s filter is already part of it.

There is another, more technical objection: what we are seeing are lexical fashions, and fashions pass. [Kobak and colleagues (*Science Advances*, 2025)](https://doi.org/10.1126/sciadv.adt3813) estimated, from the excess of certain words, that at least 13.5% of 2024 biomedical abstracts went through a model, with subcorpora reaching 40%. It may be that in two years nobody says *delve*. The argument of this essay, however, does not rest on any particular word. Fashionable words are the visible part of sanitization because they can be counted, and the contraction of variance leaves no marks of that kind: a text with fewer odd turns of phrase contains no telltale word. My impression is that what gets measured today is the tip and that what matters lies further down, although for now that is a hypothesis.

## Variance as a commons

If the diagnosis is right, whether models collapse matters less than who looks after dispersion. A few consequences follow, of quite uneven reach.

I will start with the archive from before the explosion of models. People often say it is valuable because it holds “pure data,” and I think that is a poor way to put it, because that archive was never pure: it had its biases, its censorships and its norms. What makes it valuable is that it is the only stretch of the corpus where $\alpha$ is zero by construction. Its independence from the model is guaranteed by the date, with no need for any detector, and that matters, because detectors of generated text are unreliable and will become more so as people write like the models. With the date, that problem does not exist.

Next there is a design consequence that follows directly from the earlier calculation. If the anchor dilutes, as happens when each generation simply adds data, the system’s protection rests on the fresh human flow, which is exactly what sanitization degrades. Giving $X_0$ a fixed weight in every round of training puts a ceiling on the drift that does not depend on how humans write. That is a decision for whoever trains the models, and it has costs. A large weight on the old archive makes the model slower to learn what is legitimately new, and there is a deeper problem: $X_0$ is frozen. It has no words, concepts or references from after its date, and the recursion for the mean assumes a true mean that stays put, which the world does not. A heavy anchor can hold up the structure of language (syntax, registers, dispersion), but it cannot follow a world that changes. What is semantically new can only come through the fresh flow, and that brings us back to the beginning.

The most uncomfortable part is that some of the problem has no technical fix. The dilemma Doshi and Hauser described has the shape of a commons problem. Each person is better off running their text through the model, because it comes out better, faster and with less risk of error. Each individual use takes a little variance away from the collective corpus, and nobody pays that cost at the moment it is incurred. My opinion, and I flag it as such, is that the dispersion of human language is behaving like a common resource that everyone draws on and nobody looks after.

That leaves the way out that is sometimes proposed: shifting toward physical and multimodal data. It helps less than it seems. Sensors and unedited video do not go through a writing assistant, true, but recorded speech already shows traces of the model, and what people say in front of a camera is more and more something they wrote or prepared beforehand with help. The physical world has no model bias, but the humans who describe it have more and more of it.

## How it could be refuted

It is worth stating plainly what status all of the above has. It is a mechanistic hypothesis: it shows how the loop could operate and what shape the damage would take, but it does not show that the diversity of human language is being lost. The studies I cited show homogenization in experiments and vocabulary contagion in real corpora; none of them yet measures a contraction of dispersion at scale. For the hypothesis to be worth anything it has to be able to fail, and for that its two parameters, the effective human fraction and the contraction $c$, have to stop being assumptions of a toy model and become things that are measured.

Dispersion can be measured on real corpora with indicators that separate the center from the edges:

- **Lexicon:** length-corrected diversity (MTLD, share of distinct n-grams) and the share of rare words relative to a reference corpus, which is the tail in the literal sense.
- **Syntax:** variance of sentence length and variety of dependency structures.
- **Semantics:** average distance between texts in an *embedding* space and the share of texts lying more than $k$ deviations from the center, which is the closest thing to the second table in this essay.

The effective human fraction cannot be observed text by text, but it can be bounded from two sides. Excess vocabulary, in the manner of Kobak and colleagues, gives a lower bound on how much of a corpus went through a model. An experiment in which the same people write with and without an assistant measures how much each use moves the mean and how much it shrinks the variance, and so separates the two $\alpha$ values that the model merged for convenience. Combined, the two routes turn $h(1-\alpha)$ into an estimated range.

The design has to avoid an obvious trap: if the 2025 corpus is written by different people than the 2021 one, any change in dispersion may be due to composition and not to the model. That is why it makes sense to compare the same authors before and after, and to contrast genres with heavy assistant adoption (administrative emails, academic abstracts) with others where assistants are hardly used (transcribed spontaneous speech, informal chats). One case close at hand is the abstracts of a school’s undergraduate theses, comparing the 2018–2022 cohorts with those from 2023 onward: the genre is the same, the corpus is usually public and the size is manageable.

What makes the hypothesis refutable is that it does not just predict “less diversity,” which almost any explanation would predict. It predicts a shape: the mass in the tails should fall considerably more than the center moves, and the effect should be larger where adoption is higher. If comparable corpora, with composition controlled, do not show that disproportionate loss at the edges, the argument of this essay is seriously weakened. I prefer to leave it written that way, because a thesis that cannot turn out wrong does not say much either.

## A summary of myself

This text was born from a small accident. An AI-powered search engine summarized “Evolution with Memory” and attributed to “Dagorret’s model” four theses about the sanitization of human data. Only one came from my article; another said the opposite of what I wrote about the tails, and the other two were reasonable, but they were not mine. Read through the lens of this essay, the summary did exactly what I describe: it took a somewhat odd argument and moved it toward the most probable reading of an article about *model collapse*, without inventing anything absurd. The loop, moreover, does not end at the search engine. That article, like this one, I wrote in conversation with a model, and the summary that distorted it came from another. My text entered the loop with an $\alpha$ that was not zero, came out with a larger one and is now going back in as a reply. I do not know what my $\alpha$ is, and I suspect almost nobody who writes today knows what theirs is.

I do not think we should stop using these tools, any more than anyone stopped using dictionaries. I am left with another question, one I cannot answer: which part of what we write do we want to remain improbable, and who is willing to pay what it costs to keep it that way. A tidy email serves whoever sends it. A language able to produce what does not yet exist serves all of us, and for now nobody is taking care of it.

## Sources

- Agarwal, D., Naaman, M. and Vashistha, A. (2025). “AI Suggestions Homogenize Writing Toward Western Styles and Diminish Cultural Nuances.” *CHI ’25*, ACM. [doi:10.1145/3706598.3713564](https://doi.org/10.1145/3706598.3713564)
- Doshi, A. R. and Hauser, O. P. (2024). “Generative AI enhances individual creativity but reduces the collective diversity of novel content.” *Science Advances*, 10(28), eadn5290. [doi:10.1126/sciadv.adn5290](https://doi.org/10.1126/sciadv.adn5290)
- Gerstgrasser, M., Schaeffer, R., Dey, A. et al. (2024). “Is Model Collapse Inevitable? Breaking the Curse of Recursion by Accumulating Real and Synthetic Data.” arXiv:2404.01413. [doi:10.48550/arXiv.2404.01413](https://doi.org/10.48550/arXiv.2404.01413)
- Kirk, R., Mediratta, I., Nalmpantis, C. et al. (2024). “Understanding the Effects of RLHF on LLM Generalisation and Diversity.” *ICLR 2024*. [doi:10.48550/arXiv.2310.06452](https://doi.org/10.48550/arXiv.2310.06452)
- Kobak, D., González-Márquez, R., Horvát, E.-Á. and Lause, J. (2025). “Delving into LLM-assisted writing in biomedical publications through excess vocabulary.” *Science Advances*, 11(27). [doi:10.1126/sciadv.adt3813](https://doi.org/10.1126/sciadv.adt3813)
- Shumailov, I., Shumaylov, Z., Zhao, Y., Papernot, N., Anderson, R. and Gal, Y. (2024). “AI models collapse when trained on recursively generated data.” *Nature*, 631, 755–759. [doi:10.1038/s41586-024-07566-y](https://doi.org/10.1038/s41586-024-07566-y)
- Yakura, H., Lopez-Lopez, E., Brinkmann, L. et al. (2024). “Empirical evidence of Large Language Model’s influence on human spoken communication.” arXiv:2409.01754. [doi:10.48550/arXiv.2409.01754](https://doi.org/10.48550/arXiv.2409.01754)

*Note on method:* both tables come from iterating the recursions in the text numerically. The limits were computed with 10,000 generations for the mean and 200,000 for the variance. The model is still a toy: Gaussian, with equal-size batches and without sampling noise, which was already bounded in “Evolution with Memory.” Nor does it include the mean-separation term from the law of total variance: if the human and synthetic batches have different means, the mixture adds a between-group dispersion proportional to the square of that difference. I left it out to isolate the effect of the contraction $c$. Including it would raise the computed variance somewhat, but that extra dispersion is not diversity: it is the footprint of the bias.

*Edited on November 13, 2026, at 9:00.*
