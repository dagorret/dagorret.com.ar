---
title: "What Philosophers Do in AI"
date: 2026-10-15
slug: "what-philosophers-do-in-ai"
translation_key: "what-philosophers-do-in-ai"
lang: "en"
categories: ["Philosophy"]
tags: ["AI ethics","Alignment","Artificial consciousness","Philosophy of mind"]
---

_Part two of a three-part series on the actual work inside artificial intelligence. Part one describes [the AI shed: factory and research](https://en.dagorret.com.ar/the-ai-shed-factory-and-research/); part three covers [the philosophy engineers do without calling it that](https://en.dagorret.com.ar/the-philosophy-engineers-do-without-calling-it-that/)._

It is often said that artificial intelligence companies hire philosophers to “ask the big questions”. The phrase flatters philosophy and is fairly imprecise about what actually happens. A philosopher’s work inside the industry is less solemn than that, smaller in number and, in one sense, more interesting: it consists of turning concepts the tradition has debated for centuries into something a system can learn and a technical team can measure.

## Five trades

The first is specifying behavior. Someone has to write down what it means for a model to be honest, when it should refuse a request, how to balance the autonomy of the person asking against the prevention of harm, what to do with a contested political question. That work produces normative documents: constitutions, behavior specifications, character guidelines. The method known as [_Constitutional AI_](https://arxiv.org/abs/2212.08073) (Bai et al., 2022) literally turned a set of written principles into a training signal: the model critiques and revises its own answers in light of those principles, and learns from those revisions. Amanda Askell, who holds a PhD in philosophy from New York University, works at Anthropic on the character of its models. She is the most visible example of the trade: applied ethics that ends up as training data.

The second is operationalizing concepts. To evaluate whether a model lies, one has to distinguish between lying, error, hallucination, deception and strategic insincerity. [_Truthful AI_](https://arxiv.org/abs/2110.06674) (Evans et al., 2021) is a good example of this work: it carefully separates the “truthful”, which says only true things, from the “honest”, which asserts only what it believes, and shows why the difference matters for designing evaluations and standards. The same goes for manipulation, sycophancy, consent or harm. It is classic conceptual analysis, of the kind done in any analytic philosophy seminar, with one decisive difference: the final product is a test battery.

The third is thinking about alignment as a normative problem. Iason Gabriel, a political philosopher at Google DeepMind, argued in [_Artificial Intelligence, Values, and Alignment_](https://arxiv.org/abs/2001.09768) (2020) that “aligning a system with human values” is not a technical problem with a philosophical detail attached, but a question about which values, whose, and with what legitimacy, which technique cannot answer on its own. His proposal was to look for principles that people with different conceptions of the good could accept, along lines close to Rawls. His group later coordinated [_The Ethics of Advanced AI Assistants_](https://arxiv.org/abs/2404.16244) (2024), an extensive report on what changes when millions of people delegate decisions to artificial assistants.

The fourth, the newest and the most uncomfortable, is the welfare and moral status of the models themselves. In 2024 Anthropic hired a researcher dedicated to the subject, and in April 2025 it made public [a research program](https://www.anthropic.com/research/exploring-model-welfare) on whether AI systems might deserve moral consideration. The work consists of asking, under an uncertainty nobody knows how to dispel, whether a system could have morally relevant experiences and what reasonable precautions would follow from that possibility. That the question is taken seriously inside a company says something about the moment; that it has no answer says something about the state of knowledge.

The fifth is governance. Political and legal philosophers work on deployment rules, risk-assessment frameworks, regulatory standards and the allocation of responsibility. It is the trade closest to public policy, and the one that connects with the discussion in [The Guardian’s Law](https://en.dagorret.com.ar/the-guardians-law-biology-cannot-be-delegated/) about who can be called to answer for a decision that a machine makes, or prepares.

## What usually goes unsaid

Now the less comfortable part. Ethics teams in the industry proved fragile. Google fired Timnit Gebru at the end of 2020 and Margaret Mitchell in early 2021, both co-leads of its ethical AI team, in a conflict that began over a critical paper on language models ([Engadget](https://engadget.com/margaret-mitchell-google-ai-233309349.html)). Twitter disbanded its machine learning ethics, transparency and accountability team in November 2022, in the first mass layoffs after Elon Musk’s purchase ([Khaleej Times](https://www.khaleejtimes.com/business/tech/human-rights-curation-accessibility-take-a-look-at-key-twitter-teams-axed-by-elon-musk-so-far)). Microsoft eliminated its Ethics and Society team in March 2023, in the middle of the race to integrate OpenAI’s models into its products ([TechCrunch](https://techcrunch.com/2023/03/13/microsoft-lays-off-an-ethical-ai-team-as-it-doubles-down-on-openai); [Daily Nous](https://dailynous.com/2023/03/16/microsoft-jettisons-ai-ethics-team/)).
