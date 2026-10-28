---
title: "The Shape of the Probable"
date: 2026-10-24
slug: "the-shape-of-the-probable"
translation_key: "the-shape-of-the-probable"
lang: "en"
categories: ["Technology"]
tags: ["How AI Works","Language Models","Neural Networks","Science Communication"]
---

_First part of a triptych. The second, [The Shape of the Probable, Without Formulas](https://dagorret.com.ar/the-shape-of-the-probable-without-formulas/), explains the same mechanism with diagrams and no mathematics; the third, [The Shape of the Probable, in Formulas](https://dagorret.com.ar/the-shape-of-the-probable-in-formulas/), develops it with its full formal apparatus._

**An answer from an artificial intelligence is not an observation of the world, but the shape that the most probable takes, given what humanity has left in writing. This essay examines the mechanism that produces that shape and the limits that follow from it.**

The public conversation about artificial intelligence has two default images. The first is the robot: a metal body that walks, looks and, sooner or later, decides. The second is the thinking computer, an ever more powerful machine that at some point “wakes up”. Both images share a flaw: they place intelligence in the device. One puts it in the body, the other in the hardware.

The thesis I hold is a different one. The AI we use today is neither a robot nor a computer: it is an algorithm. The computer is merely the place where that algorithm runs, just as paper is the place where a proof is written. But it is worth not stopping at the formula “nothing but algorithms”, because it hides what matters most. The algorithm itself is surprisingly short. What carries the weight, what knows and what gets things wrong lies elsewhere: in a set of numbers learned from what we humans have written.

To see that hidden side, one has to go down to the mechanism. I start with the smallest piece.

## A sum with the name of a cell

An artificial neuron does not look much like a neuron. It is a calculation. It receives several input numbers, multiplies each one by a weight, adds everything up, adds a fixed term called the bias, and passes the result through a function. In notation:

$$
z = \sum_{i=1}^{n} w_i\, x_i + b, \qquad y = f(z)
$$

Graphically, for three inputs:

$$
\begin{array}{ccccc} x_1 \cdot w_1 & \searrow & & & \\ x_2 \cdot w_2 & \longrightarrow & \boxed{\;\Sigma + b\;} & \xrightarrow{\;\;f\;\;} & y \\ x_3 \cdot w_3 & \nearrow & & & \end{array}
$$

The inputs $x_i$ can be anything that can be expressed as a number: the intensity of a pixel, an encoded word, the output of another neuron. The weight $w_i$ says how much each input matters, and it can be negative, which is the mathematical way of saying “this inhibits me”. The bias $b$ shifts the threshold at which the neuron responds.

The function $f$ is called the activation function, and it is less decorative than it seems. The best known are the ReLU, which lets positive values through and zeroes out negative ones, and the sigmoid, which squashes any number into the range between 0 and 1:

$$
\mathrm{ReLU}(z) = \max(0, z), \qquad \sigma(z) = \frac{1}{1 + e^{-z}}
$$

Today’s language models use smoother variants, but the idea is the same. What matters is that $f$ is not linear. If it were, stacking a thousand layers of neurons would give exactly the same result as a single one, because a composition of linear functions is still linear. Non-linearity is what allows a network to approximate arbitrarily complicated functions; the classic result in this direction is the universal approximation theorem of Hornik, Stinchcombe and White (_Neural Networks_, 1989).

The biological metaphor goes back a long way. Warren McCulloch and Walter Pitts proposed a logical model of the neuron in 1943 ([_Bulletin of Mathematical Biophysics_](https://doi.org/10.1007/BF02478259)), and Frank Rosenblatt built the perceptron on that idea in 1958 ([_Psychological Review_](https://doi.org/10.1037/h0042519)). The dendrites were the inputs, the soma the sum, the axon the output. But the analogy is weak, and it is worth saying so: a real neuron has temporal dynamics, spikes, chemistry, and dendrites that compute on their own. Beniaguev, Segev and London showed that it takes a multi-layer artificial network to faithfully mimic the response of a single cortical pyramidal neuron ([_Neuron_, 2021](https://doi.org/10.1016/j.neuron.2021.07.002)). The artificial neuron is not a simplified neuron. It is something else with a borrowed name.

## The weights belong to no one

A natural question is who the weights belong to: each neuron, or the network? The precise answer is that they belong to the connections. Each weight lives on the link between a neuron in one layer and a neuron in the next. A neuron that receives 512 inputs has 512 weights and one bias, and that set defines which pattern activates it.

In practice, no one computes neuron by neuron. An entire layer is expressed as a matrix multiplication:

$$
\mathbf{y} = f\left(W\mathbf{x} + \mathbf{b}\right), \qquad W \in \mathbb{R}^{1024 \times 512}
$$

If the layer receives 512 values and has 1024 neurons, its weights form a matrix of 1024 rows by 512 columns. That is why graphics cards, designed to multiply matrices at high speed, became the infrastructure of AI. And when a model is said to have “seventy billion parameters”, what is being counted is the sum of all the weights and biases in all its matrices.

There is a more uncomfortable point. An isolated weight almost never means anything interpretable. Knowledge is distributed: a concept is encoded in patterns spread across a great many weights at once, and each weight takes part in many concepts. There is no place in the network where “Paris” or “irony” is stored. That is why reading what a model knows is so hard, and why there is an entire discipline, mechanistic interpretability, devoted to trying.

## Why it is called a network

As soon as the output of one neuron is connected to the input of another, what appears is a graph: the neurons are nodes, and the connections with their weights are edges. The name “network” is not a metaphor but a literal description.

The most common arrangement is in layers. An input layer receives the data and computes nothing; the intermediate layers, called hidden because they cannot be seen from outside, take what the previous one produced and transform it; an output layer delivers the result. When information always flows forward, without cycles, the graph is directed and acyclic, and the network is called _feedforward_. Recurrent networks, by contrast, have cycles: a neuron receives its own output from the previous step, which gives them a form of memory.

What matters about layers is that the network is not a sum of neurons but a composition of functions:

$$
\hat{y} = f_L\big(\cdots f_2\big(f_1(\mathbf{x})\big)\cdots\big)
$$

Each layer works on what the previous one produced. In a network that processes images, the first layers end up detecting edges, the intermediate ones shapes and textures, the last ones objects. No one programs that hierarchy; it emerges from training, because composing simple things turns out to be an efficient way of representing complex ones. The word “deep” in _deep learning_ has nothing mystical about it: it simply means many layers.

## The journey of a prompt

So far, the description applies to almost any neural network. Language models add a specific architecture, the _transformer_ (Vaswani et al., [“Attention Is All You Need”, 2017](https://arxiv.org/abs/1706.03762)), and a particular mode of use. It is worth following the path of a text from the moment it is written until the answer arrives:

$$
\begin{aligned} \text{text} &\xrightarrow{\;\text{tokenizer}\;} [\,t_1, t_2, \dots, t_n\,] \\ &\xrightarrow{\;\text{embeddings}\;} [\,\mathbf{e}_1, \mathbf{e}_2, \dots, \mathbf{e}_n\,] \\ &\xrightarrow{\;\text{layers}\,\times N\;} \mathbf{h}_n \\ &\xrightarrow{\;\text{softmax}\;} P\big(t_{n+1} \mid t_1, \dots, t_n\big) \end{aligned}
$$

The first step is tokenization. The network does not read letters or words: a preliminary program splits the text into frequent fragments (pieces of words, punctuation, spaces) and assigns each one a number from a fixed vocabulary, which usually has between fifty and two hundred thousand entries. A question becomes a list of integers.

The second step is the _embeddings_. Each number is used as an index into a huge table of vectors with thousands of dimensions. That table is also made of learned weights, and it is the model’s first real layer: it turns an arbitrary number into a point in a space where fragments with similar meanings end up close together. Position information is added to these vectors, because otherwise the network would not know in what order they came.

The third step is the stack of layers, which in large models reaches dozens, or more than a hundred. Each layer has two parts. The first is attention, the mechanism that lets each token “look” at the previous ones and take context from them:

$$
\mathrm{Attention}(Q, K, V) = \mathrm{softmax}\!\left(\frac{QK^{\top}}{\sqrt{d_k}}\right) V, \qquad Q = XW_Q,\; K = XW_K,\; V = XW_V
$$

The matrices $W_Q$, $W_K$ and $W_V$ are learned and fixed weights, but who attends to whom is computed on the spot, according to the specific text. It is the difference between learning a rule and applying it. This is how the word “bank” ends up represented one way if “river” appeared before it, and another way if “loan” did. The second part of each layer is a classic _feedforward_ network, made of the same neurons we started with, which transforms each vector separately. Layer after layer, each token’s vector becomes loaded with context.

The fourth step is the output. The final vector of the last token is multiplied by another matrix that produces a score $z_i$ for each item in the vocabulary, and a function called _softmax_ turns those scores into probabilities:

$$
P(t_i) = \frac{e^{z_i / T}}{\sum_{j} e^{z_j / T}}
$$

The parameter $T$ is the famous temperature. With a low $T$, the distribution concentrates on the most probable options; with a high $T$, it flattens and the model becomes less predictable. A token is chosen from that distribution.

And then comes the step that usually goes unnoticed: that token is appended to the end of the sequence and the whole process starts again. The answer is not thought out in full and then written down. It is generated one token at a time, and each new token becomes part of the input for the next. Formally, the model breaks down the probability of a complete text as a product of conditional probabilities:

$$
P(t_1, \dots, t_n) = \prod_{k=1}^{n} P\big(t_k \mid t_1, \dots, t_{k-1}\big)
$$

## How the network is fed

Everything above describes the network once trained. Training uses the same path, with a trick. An enormous amount of text is taken and, at each position, the model is asked to predict the next token, which in this case is already known. The error is measured with a function called cross-entropy:

$$
\mathcal{L}(\theta) = -\sum_{k} \log P_\theta\big(t_k \mid t_1, \dots, t_{k-1}\big)
$$

where $\theta$ stands for the set of all the weights. An algorithm called backpropagation, popularized by Rumelhart, Hinton and Williams ([_Nature_, 1986](https://doi.org/10.1038/323533a0)), computes how much each weight contributed to that error, and gradient descent corrects each one slightly in the direction that reduces it:

$$
\theta \leftarrow \theta - \eta\, \nabla_\theta \mathcal{L}(\theta)
$$

After trillions of tokens, predicting the next word well forces the model to capture grammar, facts, styles, and a good dose of reasoning. This stage is called pre-training. Then comes a later adjustment, with dialogue examples and feedback from humans or other models, that turns a text predictor into something that behaves like an assistant.

There is one detail that changes how the whole system is perceived. Once training is over, the weights are fixed. When someone writes a prompt, the model learns nothing in its weights. Everything it “knows” about that conversation lives in the sequence of tokens that is passed to it again on every turn, the so-called context window. The conversation leaves no trace on the algorithm; it is the algorithm that runs through it, over and over, from the beginning.

## Plausible by design

With the mechanism in view, it is possible to answer a question that is usually badly posed: what, exactly, is an AI answer?

The quick answer is that it is a prediction. But that still does not explain what we observe, which is a strange combination: the answers almost always sound plausible, they are right very often and yet, at times, they invent things with complete composure. All three have the same root.

First, likelihood. Minimizing cross-entropy is equivalent to what statistics calls maximum likelihood estimation:

$$
\hat{\theta} = \arg\max_{\theta} \prod_{k} P_\theta\big(t_k \mid t_1, \dots, t_{k-1}\big)
$$

The name is no coincidence. The model is optimized, quite literally, to produce the most likely text given the preceding sequence, according to the distribution of what it read. In Spanish the technical term is _máxima verosimilitud_, maximum verisimilitude, which makes the point even more bluntly: being plausible is not a side effect. It is the objective function.

Second, correspondence with reality. The text used for training is not arbitrary. It was written by people describing the world, arguing, calculating, correcting themselves. To predict that text well, the most efficient strategy is not to memorize it but to capture the regularities of the world that produced it. There is evidence that this actually happens: Li and colleagues found that a model trained only on sequences of Othello moves forms an internal representation of the board ([ICLR, 2023](https://arxiv.org/abs/2210.13382)), and Gurnee and Tegmark showed that language models internally encode geographic coordinates and temporal order ([2023](https://arxiv.org/abs/2310.02207)). On top of this, truth has a statistical advantage: it is consistent. Errors and lies are diverse and contradict one another; facts reinforce each other from many sources. My suspicion is that much of the “truthfulness” of these systems is explained this way: in a huge number of cases, the most probable coincides with the true.

Third, and here lies the hidden side, the answer is not reality. There are several reasons. The model is a map of a map: it never touched the world, only text about the world, and it inherits its biases, its gaps and everything that was never written down. It has no internal verification mechanism: the same process that produces a correct fact produces an invented one, with identical fluency. Put differently, a hallucination is not a breakdown of the system but the system working as designed, generating something plausible where there was no sufficiently strong true pattern. It is also a frozen snapshot, because the weights were fixed when training ended and the world moved on. And it is a sample: the same question can yield different answers, because there is no single answer from the model, only a distribution of possible answers.

A deeper reason remains, one that is philosophical and still open. In 1990, Stevan Harnad formulated the symbol grounding problem: how can the symbols of a system mean anything if they are defined only by other symbols ([_Physica D_](https://arxiv.org/abs/cs/9906002))? Emily Bender and Alexander Koller restated it for language models with the image of an octopus that intercepts messages between two castaways and learns to imitate them without ever having seen the island ([ACL, 2020](https://aclanthology.org/2020.acl-main.463/)). Up to this point, the argument could be read as confirming that sceptical position, but the results on internal representations complicate it. My impression is that the most defensible position lies in between: there is something more than surface statistics, because the model builds structures that correspond to the world, but without causal contact with that world, reference remains borrowed, mediated by the humans who did the writing. This is an interpretive hypothesis, not an established result.

## What the algorithm cannot do for us

I return to the initial thesis. AI is neither a robot nor a computer; it is an algorithm. But the algorithm, in its bare form, fits in a few pages of code: multiply matrices, apply functions, compute probabilities, choose a token, repeat. What makes it capable of writing, translating or explaining is not in the code but in the weights, and the weights are the statistical sediment of what humanity has left in writing. The hidden side of AI is not a consciousness concealed in the machine. It is our own text, compressed and handed back in the shape of the probable.

From this follows the status of any answer it produces. It is not testimony, because no one saw anything; nor is it an observation, because nothing was measured. It is a well-informed hypothesis, much like what someone who has read an enormous amount, but cannot go out and check anything, would say. That is why the tools that connect the model to something external (a search, the execution of a program, a database) change its nature: they give it back a foothold outside the text.

And that is why verification cannot be delegated. The relevant question is not whether the machine “knows”, but who takes responsibility for what the machine says. That responsibility remains, entirely, on the side of the reader.

* * *

## Sources

-   Bender, E. M. and Koller, A. (2020). “Climbing towards NLU: On Meaning, Form, and Understanding in the Age of Data”. _Proceedings of the 58th Annual Meeting of the ACL_, 5185–5198. https://aclanthology.org/2020.acl-main.463/
-   Beniaguev, D., Segev, I. and London, M. (2021). “Single cortical neurons as deep artificial neural networks”. _Neuron_, 109(17), 2727–2739. https://doi.org/10.1016/j.neuron.2021.07.002
-   Gurnee, W. and Tegmark, M. (2023). “Language Models Represent Space and Time”. arXiv:2310.02207. https://arxiv.org/abs/2310.02207
-   Harnad, S. (1990). “The Symbol Grounding Problem”. _Physica D_, 42, 335–346. https://arxiv.org/abs/cs/9906002
-   Hornik, K., Stinchcombe, M. and White, H. (1989). “Multilayer feedforward networks are universal approximators”. _Neural Networks_, 2(5), 359–366. https://doi.org/10.1016/0893-6080(89)90020-8
-   Li, K., Hopkins, A. K., Bau, D., Viégas, F., Pfister, H. and Wattenberg, M. (2023). “Emergent World Representations: Exploring a Sequence Model Trained on a Synthetic Task”. _ICLR 2023_. https://arxiv.org/abs/2210.13382
-   McCulloch, W. S. and Pitts, W. (1943). “A logical calculus of the ideas immanent in nervous activity”. _Bulletin of Mathematical Biophysics_, 5, 115–133. https://doi.org/10.1007/BF02478259
-   Rosenblatt, F. (1958). “The perceptron: A probabilistic model for information storage and organization in the brain”. _Psychological Review_, 65(6), 386–408. https://doi.org/10.1037/h0042519
-   Rumelhart, D. E., Hinton, G. E. and Williams, R. J. (1986). “Learning representations by back-propagating errors”. _Nature_, 323, 533–536. https://doi.org/10.1038/323533a0
-   Vaswani, A. et al. (2017). “Attention Is All You Need”. _Advances in Neural Information Processing Systems 30_. https://arxiv.org/abs/1706.03762
