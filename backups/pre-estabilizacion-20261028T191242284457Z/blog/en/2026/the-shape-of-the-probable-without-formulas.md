---
title: "The Shape of the Probable, Without Formulas"
date: 2026-10-24
slug: "the-shape-of-the-probable-without-formulas"
translation_key: "the-shape-of-the-probable-without-formulas"
lang: "en"
categories: ["Technology"]
tags: ["How AI Works","Language Models","Neural Networks","Science Communication"]
---

_Second part of a triptych. The first, [The Shape of the Probable](https://dagorret.com.ar/the-shape-of-the-probable/), sets out the argument; the third, [The Shape of the Probable, in Formulas](https://dagorret.com.ar/the-shape-of-the-probable-in-formulas/), develops it with its full mathematical apparatus. This version tells the same story with diagrams and not a single equation._

**Understanding what an artificial intelligence does when it answers does not require knowing mathematics, only following a path: from a small calculation that votes to a question that is turned into numbers and comes back turned into words. This text proposes that path.**

Someone types into a chat window: “What will the sky be like today?”. A few seconds later a fluent, well-written answer appears, in a reasonable tone. It is hard not to imagine someone on the other side, or at least a machine that looked out of the window. Neither of those things happened. What happened is more modest and, at the same time, stranger.

The question that organizes this text is simple: what happened between pressing the send key and the answer appearing? To answer it, it is best to start with the smallest piece.

## A calculation that votes

The basic unit of an artificial intelligence is called, for historical reasons, an artificial neuron. The name is misleading. It does not resemble a brain cell; it looks more like a small committee that votes.

Picture a committee of three members. Each one brings an opinion, but not all opinions weigh the same: one member’s voice counts for a lot, another’s for little, and a third’s, when it speaks, subtracts instead of adding. The committee gathers the votes, each with its weight, and checks whether the total reaches a threshold. If it does, the committee speaks; if not, it stays silent.

![Diagram of an artificial neuron: three inputs with arrows of different thickness, one thick, one thin and one dotted, reach a summing circle; from there they pass to a threshold and then to the output.](/images/01-neuron-1024x474.png)

`Diagram of an artificial neuron: three inputs with arrows of different thickness, one thick, one thin and one dotted, reach a summing circle; from there they pass to a threshold and then to the output.`

That is all. The inputs are numbers, the weights are numbers and the output is a number. The only interesting part is where the weights come from, because no one writes them by hand: they are learned. We will see how further on.

## Many calculations in a row

A single neuron is almost useless. The power appears when many are connected, so that what one says becomes the input of others. Connecting them forms a network, and that is the literal meaning of the phrase “neural network”: points joined by lines.

The most common way to organize them is in layers. The first receives the data as it comes. Each following layer works on what the previous one delivered, and the last one gives the result.

![Diagram of a neural network with four columns of circles connected by lines: an input with three nodes, two hidden layers of four nodes and an output with two; underneath it reads raw data, detects edges, builds shapes and recognizes cat.](/images/02-layered-network-1024x538.png)

`Diagram of a neural network with four columns of circles connected by lines: an input with three nodes, two hidden layers of four nodes and an output with two; underneath it reads raw data, detects edges, builds shapes and recognizes cat.`

What is remarkable is that no one tells the network what each layer should do. In a network that looks at photos, the first layers end up detecting edges, the middle ones build shapes and the last ones recognize objects. That division of labor appears on its own during learning, because building the complex out of the simple turns out to be the most economical way to solve the problem. When people talk about “deep” learning, the word hides no mystery: it simply means many layers.

## Where the learning lives

If you opened up one of these networks, you would not find words, rules or data stored anywhere. You would find numbers: the weights of all the connections. A useful image is a mixing console with billions of knobs, each set to a precise position. The largest models have hundreds of billions.

The uncomfortable part is that no knob, on its own, means anything. There is no knob for “Paris” and another for “irony”. What the network knows is spread across the combination of all of them, and each knob takes part in many different things at once. That is why it is so hard to explain why an artificial intelligence said what it said: the answer is not written in one place, but distributed across the whole apparatus.

## The journey of a question

With these pieces, we can follow the path of the question from the beginning.

![Five boxes in a row joined by arrows: your text, fragments, coordinates, layers and candidates; an arrow returns from candidates to fragments to show that the process repeats.](/images/03-prompt-journey-1024x358.png)

`Five boxes in a row joined by arrows: your text, fragments, coordinates, layers and candidates; an arrow returns from candidates to fragments to show that the process repeats.`

**First, the text is cut up.** The network does not read letters or whole words. A preliminary program splits the text into frequent fragments: sometimes a complete word, sometimes a piece, like “neur” and “on”. Each fragment corresponds to a number in a fixed dictionary.

**Second, each fragment becomes a place.** Each number is translated into a position within a gigantic space, a kind of map of meanings with thousands of directions. On that map, fragments that are used in similar ways end up close together: “dog” near “cat”, “Monday” near “Tuesday”. The order in which they came is also recorded, because “the dog bit the man” is not the same as the reverse.

**Third, each word looks at the others.** Here lies the heart of today’s models, a mechanism called attention. In each layer, each fragment “looks” at the previous ones and takes from them what it needs. The word “bank” means one thing if “river” came before it and another if “loan” did; attention is what lets the network notice that difference. Layer after layer, each fragment becomes loaded with context.

**Fourth, candidates appear.** At the end of the path, the network does not produce an answer: it produces a list of all possible words, each with its probability of being the next one.

![Horizontal bar chart of the candidate words to complete the sentence The sky today is: cloudy 41 percent, clear 33, gray 12, blue 9 and other 5.](/images/04-candidates-1024x435.png)

H`orizontal bar chart of the candidate words to complete the sentence The sky today is: cloudy 41 percent, clear 33, gray 12, blue 9 and other 5.`

One is chosen from that list. Not always the most probable: a setting called temperature regulates how much daring is allowed. With a low temperature, the network almost always chooses the expected; with a high temperature, it ventures into the unusual.

**Fifth, everything starts again.** The chosen word is appended to the end of the text and the whole path is repeated to find the next one. And the next. An answer several paragraphs long is just that: hundreds of laps around the same circuit, one word at a time. An artificial intelligence does not think out the whole answer and then write it down; it writes it as it calculates it.

## How it learned

That leaves the question of the knobs. Who set them in place?

The method is surprisingly simple to describe. You take an enormous amount of text written by people, cover up the next word and ask the network to guess it. At first, with the knobs in random positions, it guesses badly. You measure how wrong it was and turn each knob a tiny bit in the direction that would have reduced the error. Then you repeat. Trillions of times.

What is astonishing is what such a modest task produces. To guess the next word well in texts of every kind, the network ends up forced to capture grammar, many facts about the world, writing styles and a good dose of reasoning. Then comes an adjustment stage, with conversation examples and corrections, that turns it into something that behaves like an assistant.

There is one detail that often surprises people. Once learning is over, the knobs are fixed. When someone talks with an artificial intelligence, it learns nothing new in its knobs. What it “remembers” of the conversation is only the text that is passed to it again, in full, on every turn. The conversation does not change it; it runs through it.

## The plausible and the true

With the whole path in view, the opening question can be answered: what is the answer about the sky?

It is not an observation. No one looked out of the window. It is the most probable continuation of a text, calculated from how similar texts usually continue. That explains three things we observe at the same time.

It explains why the answer sounds right. The network was trained, quite literally, to produce the most plausible text, that is, whatever most resembles what a human would write in that context. Sounding right is not an accident: it is its function.

It also explains why it is so often right. The texts it learned from were written by people describing the world, and truth has an advantage: it is consistent. Errors are varied and contradict one another, while facts are repeated from many sources. That is why, very often, the most probable coincides with the true.

And it explains, above all, why it is sometimes wrong with complete confidence.

![Four boxes in a row joined by arrows: the world, the texts, the model and the answer; a red dotted arrow returns from the answer to the world, noting that checking is the reader’s job.](/images/05-map-of-a-map-1024x339.png)

`Four boxes in a row joined by arrows: the world, the texts, the model and the answer; a red dotted arrow returns from the answer to the world, noting that checking is the reader’s job.`

An artificial intelligence is a map of a map. It never touched the world, only texts about the world, and it inherits their gaps, their biases and everything that was never written down. It has no way of checking what it says: the same mechanism that produces a correct fact produces an invented one, with the same fluency and the same tone. When it invents, it is not failing; it is doing exactly what it knows how to do, producing something plausible, in a place where the plausible and the true did not coincide. Moreover, its knowledge is a snapshot taken on the day it finished learning, and each answer is a choice among candidates, so the same question can yield different answers.

## What remains on our side

The conclusion is not that artificial intelligence should be distrusted, but that we should understand what kind of thing it delivers. It is neither testimony nor a measurement. It is more like the opinion of someone who has read an enormous amount, who almost always has a reasonable idea, but who cannot go outside and check anything.

That is why the tools that connect these systems to the outside, such as a web search or a program that actually does the math, change their usefulness so much: they give them back a foothold outside the text. And that is why, in the diagram above, the last arrow is not drawn by the machine. It is drawn by the reader.

* * *

## Further reading

-   McCulloch, W. S. and Pitts, W. (1943). “A logical calculus of the ideas immanent in nervous activity”. _Bulletin of Mathematical Biophysics_, 5, 115–133. https://doi.org/10.1007/BF02478259
-   Vaswani, A. et al. (2017). “Attention Is All You Need”. _Advances in Neural Information Processing Systems 30_. https://arxiv.org/abs/1706.03762
-   Bender, E. M. and Koller, A. (2020). “Climbing towards NLU: On Meaning, Form, and Understanding in the Age of Data”. _Proceedings of the 58th Annual Meeting of the ACL_. https://aclanthology.org/2020.acl-main.463/
-   The full references, with the formal development of each step, are in the third part of this series.
