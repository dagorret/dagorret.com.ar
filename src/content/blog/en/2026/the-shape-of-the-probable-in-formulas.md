---
title: "The Shape of the Probable, in Formulas"
date: 2026-10-24
slug: "the-shape-of-the-probable-in-formulas"
translation_key: "la-forma-de-lo-probable-en-formulas"
lang: "en"
categories: ["Technology"]
tags: ["Epistemology","Language Models","Mathematics","Transformers"]
---

_Third part of a triptych. The first, [The Shape of the Probable](https://dagorret.com.ar/the-shape-of-the-probable/), sets out the argument; the second, [The Shape of the Probable, Without Formulas](https://dagorret.com.ar/the-shape-of-the-probable-without-formulas/), tells it with diagrams. This part writes out the complete mechanism, equation by equation._

**In the first part I argued that the algorithm of a language model fits in a few pages. This part puts that claim to the test: it writes out the entire algorithm, from the prompt turned into a matrix to the function being minimized, and shows the exact place in the equations where likelihood parts ways with truth.**

Claiming that something is simple is easy; proving it requires writing it out. What follows is a formal reconstruction of a decoder-only _transformer_, the architecture of today’s language models, using the most standard notation possible. Industrial variants differ in details (normalization, activations, position encoding), and I will point out the most relevant ones, but this is the skeleton. The thesis that matters is not technical: it is that, once everything is written out, it becomes clear that what is missing from the equations is precisely what the system knows.

## Notation

I write vectors in bold lowercase, $\mathbf{x}$, and matrices in uppercase, $W$. A vector is a row when it is part of a sequence matrix. The vocabulary is a finite set $\mathcal{V}$ of size $|\mathcal{V}|$; $d$ is the model dimension, $n$ the sequence length, $L$ the number of layers and $H$ the number of attention heads. The set of all parameters is denoted $\theta$.

## The neuron and the layer

An artificial neuron is a function $\mathbb{R}^m \to \mathbb{R}$ of the form

$$
y = \varphi\left(\mathbf{w}^{\top}\mathbf{x} + b\right) = \varphi\left(\sum_{i=1}^{m} w_i x_i + b\right)
$$

where $\varphi$ is a non-linear function. A layer of $k$ neurons sharing the same input is written as a single matrix operation:

$$
\mathbf{y} = \varphi\left(W\mathbf{x} + \mathbf{b}\right), \qquad W \in \mathbb{R}^{k \times m},\; \mathbf{b} \in \mathbb{R}^{k}
$$

with $\varphi$ applied component-wise. A network of $L$ layers is a composition $f = f_L \circ \cdots \circ f_1$.

The theoretical justification for this architecture is the universal approximation theorem, proved by George Cybenko for sigmoidal activations ([_Mathematics of Control, Signals and Systems_, 1989](https://doi.org/10.1007/BF02551274)) and generalized by Hornik, Stinchcombe and White ([_Neural Networks_, 1989](https://doi.org/10.1016/0893-6080\(89\)90020-8)). In its classic form it states that, for every continuous function $f$ on a compact set $K \subset \mathbb{R}^m$ and every $\varepsilon > 0$, there exists a network with a single hidden layer such that

$$
\sup_{\mathbf{x} \in K} \left| f(\mathbf{x}) - \sum_{j=1}^{N} \alpha_j\, \sigma\left(\mathbf{w}_j^{\top}\mathbf{x} + b_j\right) \right| < \varepsilon
$$

The theorem deserves a careful reading, because it is cited far more often than it is understood. It guarantees existence, not construction: it says neither how many neurons $N$ are needed nor how to find the weights. That a network can represent a function does not mean training will find it. In practice, depth is what makes reachable the representations that, with a single layer, would require an astronomical number of neurons.

Without non-linearity, all of this collapses: the composition of affine functions is affine, $W_2(W_1\mathbf{x} + \mathbf{b}_1) + \mathbf{b}_2 = W'\mathbf{x} + \mathbf{b}'$, and a thousand layers would amount to one.

## The prompt is a matrix

This is the point most often overlooked in popular accounts: the network never sees a text. It sees a matrix.

The first step is tokenization. A subword segmentation algorithm, typically a variant of _byte pair encoding_ (Sennrich, Haddow and Birch, [ACL, 2016](https://arxiv.org/abs/1508.07909)), converts the text into a sequence of indices $t_1, \dots, t_n \in \{1, \dots, |\mathcal{V}|\}$. The tokenizer is not trained together with the network: it is a fixed preprocessing step.

The second step is embedding. Let $E \in \mathbb{R}^{|\mathcal{V}| \times d}$ be the embedding matrix and $\mathbf{u}_t \in \{0,1\}^{|\mathcal{V}|}$ the indicator vector of token $t$. Embedding is a row selection:

$$
\mathbf{e}_t = E^{\top}\mathbf{u}_t \in \mathbb{R}^{d}
$$

Stacking the rows for the whole sequence, and adding a position encoding $\mathbf{p}_k$ that we will see shortly, yields the input matrix:

$$
X^{(0)} = \begin{pmatrix} \mathbf{e}_{t_1} + \mathbf{p}_1 \\ \vdots \\ \mathbf{e}_{t_n} + \mathbf{p}_n \end{pmatrix} \in \mathbb{R}^{n \times d}
$$

That matrix is, literally, what the network receives from a question. A prompt of a thousand tokens in a model with $d = 4096$ is a matrix of four million numbers. Everything that follows consists of transformations of that matrix that preserve its $n \times d$ shape up to the last layer. The complete path, with its dimensions, is this:

$$
t_{1:n} \xrightarrow{\;E\;} X^{(0)} \in \mathbb{R}^{n \times d} \xrightarrow{\;\text{block}_1\;} X^{(1)} \xrightarrow{\;\cdots\;} X^{(L)} \xrightarrow{\;W_U\;} Z \in \mathbb{R}^{n \times |\mathcal{V}|} \xrightarrow{\;\text{softmax}\;} P
$$

## The sine formula

Attention, as we will see, treats the sequence as a set: if the rows of $X$ are permuted, the output is permuted in the same way. Without additional information, “the dog bit the man” and “the man bit the dog” would be indistinguishable. Vaswani and colleagues solved this in the original _transformer_ paper ([“Attention Is All You Need”, 2017](https://arxiv.org/abs/1706.03762)) with a fixed encoding built from sines and cosines:

$$
\mathrm{PE}_{(pos,\,2i)} = \sin\left(\frac{pos}{10000^{2i/d}}\right), \qquad \mathrm{PE}_{(pos,\,2i+1)} = \cos\left(\frac{pos}{10000^{2i/d}}\right)
$$

for $i = 0, 1, \dots, d/2 - 1$. The intuition is that of a clock with many hands: each pair of dimensions rotates at a different frequency, $\omega_i = 10000^{-2i/d}$, with wavelengths growing in geometric progression from $2\pi$ to $10000 \cdot 2\pi$. The fast hands distinguish neighboring positions; the slow ones, distant positions. Each position is marked by the joint configuration of all the hands.

The choice is not aesthetic. It has a property that justifies the sine over any other periodic function. For each frequency, the pair corresponding to position $pos + k$ is obtained from the pair for position $pos$ through a rotation that depends only on $k$:

$$
\begin{pmatrix} \sin\left(\omega_i (pos + k)\right) \\ \cos\left(\omega_i (pos + k)\right) \end{pmatrix} = \begin{pmatrix} \cos(\omega_i k) & \sin(\omega_i k) \\ -\sin(\omega_i k) & \cos(\omega_i k) \end{pmatrix} \begin{pmatrix} \sin(\omega_i\, pos) \\ \cos(\omega_i\, pos) \end{pmatrix}
$$

The proof is the sine addition formula, $\sin(a + b) = \sin a \cos b + \cos a \sin b$, and its counterpart for the cosine. What matters is the consequence: relative position is a linear transformation independent of absolute position. A network made of linear transformations can therefore learn to reason in terms of “three tokens back” regardless of where it is in the text.

Many current models, including the LLaMA family (Touvron et al., [2023](https://arxiv.org/abs/2302.13971)), take this idea to its logical conclusion with the rotary encoding of Su and colleagues (RoFormer, [2021](https://arxiv.org/abs/2104.09864)). Instead of adding the position, they directly rotate the query and key vectors: if $R_m$ is the block rotation matrix associated with position $m$, then

$$
\left\langle R_m \mathbf{q},\, R_n \mathbf{k} \right\rangle = \mathbf{q}^{\top} R_m^{\top} R_n\, \mathbf{k} = \mathbf{q}^{\top} R_{n-m}\, \mathbf{k}
$$

because rotations in the same plane commute and $R_m^{\top} = R_{-m}$. The dot product between two tokens depends only on their distance $n - m$. The sine of 2017 is still there, now inside a rotation matrix.

## Attention

Each _transformer_ block contains an attention mechanism. From the input matrix $X \in \mathbb{R}^{n \times d}$, three projections are computed with learned matrices $W_Q, W_K, W_V \in \mathbb{R}^{d \times d_k}$:

$$
Q = X W_Q, \qquad K = X W_K, \qquad V = X W_V
$$

Each row of $Q$ is a query; each row of $K$, a key; each row of $V$, a value. Attention compares each query with all the keys and returns a weighted average of the values:

$$
\mathrm{Attention}(Q, K, V) = \mathrm{softmax}\left(\frac{Q K^{\top}}{\sqrt{d_k}} + M\right) V
$$

where the softmax is applied row-wise. The matrix $Q K^{\top} \in \mathbb{R}^{n \times n}$ contains the affinity score between every pair of tokens. The matrix $M$ is the causal mask, which prevents a token from seeing the ones that come after it:

$$
M_{ij} = \begin{cases} 0 & \text{if } j \le i \\ -\infty & \text{if } j > i \end{cases}
$$

The factor $\sqrt{d_k}$ has a precise justification. If the components of $\mathbf{q}$ and $\mathbf{k}$ are independent, with zero mean and unit variance, then

$$
\mathbb{E}\left[\mathbf{q}^{\top}\mathbf{k}\right] = 0, \qquad \mathrm{Var}\left(\mathbf{q}^{\top}\mathbf{k}\right) = \sum_{i=1}^{d_k} \mathrm{Var}(q_i k_i) = d_k
$$

Without the correction, with $d_k = 128$, the scores would have a standard deviation close to 11, the softmax would saturate on nearly a single value and its gradients would be practically zero. Dividing by $\sqrt{d_k}$ brings the variance back to one.

In practice, $H$ heads are used in parallel, each with its own projections, and they are concatenated:

$$
\mathrm{MultiHead}(X) = \mathrm{Concat}\left(\mathrm{head}_1, \dots, \mathrm{head}_H\right) W_O, \qquad \mathrm{head}_h = \mathrm{Attention}\left(X W_Q^{h}, X W_K^{h}, X W_V^{h}\right)
$$

with $H d_k = d$ and $W_O \in \mathbb{R}^{d \times d}$. Here a distinction appears that I stated in prose in the first part: the matrices $W$ are fixed after training, but the attention weight matrix $\mathrm{softmax}(QK^{\top}/\sqrt{d_k} + M)$ is recomputed for each text. What is learned is the rule by which attention is paid; who is attended to is decided on the spot.

The affinity matrix is $n \times n$, so the cost of attention grows as $\mathcal{O}(n^2 d)$. That single expression explains why enlarging the context window is expensive: doubling the text quadruples the computation.

## The complete block

A block combines attention with a classic _feedforward_ network, both wrapped in residual connections and normalization. In the pre-normalization variant, dominant today, a block transforms $X$ as follows:

$$
X' = X + \mathrm{MultiHead}\left(\mathrm{LN}(X)\right), \qquad X" = X' + \mathrm{FFN}\left(\mathrm{LN}(X')\right)
$$

Layer normalization (Ba, Kiros and Hinton, [2016](https://arxiv.org/abs/1607.06450)) is applied to each row $\mathbf{x} \in \mathbb{R}^d$:

$$
\mathrm{LN}(\mathbf{x}) = \boldsymbol{\gamma} \odot \frac{\mathbf{x} - \mu}{\sqrt{s^2 + \epsilon}} + \boldsymbol{\beta}, \qquad \mu = \frac{1}{d}\sum_{j=1}^{d} x_j, \quad s^2 = \frac{1}{d}\sum_{j=1}^{d} (x_j - \mu)^2
$$

The _feedforward_ network acts on each token separately, with an intermediate dimension that is usually $d_{ff} \approx 4d$:

$$
\mathrm{FFN}(\mathbf{x}) = W_2\, \varphi\left(W_1 \mathbf{x} + \mathbf{b}_1\right) + \mathbf{b}_2, \qquad W_1 \in \mathbb{R}^{d_{ff} \times d},\; W_2 \in \mathbb{R}^{d \times d_{ff}}
$$

Here the neurons from the beginning reappear: each row of $W_1$ is a neuron. The original activation was the ReLU; today the GELU predominates, $\mathrm{GELU}(x) = x\,\Phi(x)$ with $\Phi$ the cumulative normal distribution (Hendrycks and Gimpel, [2016](https://arxiv.org/abs/1606.08415)), along with gated variants such as SwiGLU (Shazeer, [2020](https://arxiv.org/abs/2002.05202)).

Residual connections allow a reading that interpretability research has made central: the matrix $X$ works as a communication channel, the _residual stream_, in which each layer reads and writes increments without erasing what came before (Elhage et al., [“A Mathematical Framework for Transformer Circuits”, 2021](https://transformer-circuits.pub/2021/framework/index.html)). The model does not replace representations; it keeps adding to them.

## Counting the parameters

With the equations written out, a figure that is usually repeated without explanation can be verified. Each block has four attention matrices of size $d \times d$ and two _feedforward_ matrices of size $d \times 4d$. Ignoring biases and normalizations, which are of order $d$:

$$
N_{\text{block}} \approx 4d^2 + 2 \cdot 4d^2 = 12\, d^2, \qquad N_{\text{total}} \approx 12\, L\, d^2 + |\mathcal{V}|\, d
$$

With $d = 4096$, $L = 32$ and $|\mathcal{V}| = 32\,000$, the first term gives $12 \cdot 32 \cdot 4096^2 \approx 6.44 \times 10^9$ and the embedding matrix adds $1.3 \times 10^8$. If the output matrix is not shared with the input one, another $1.3 \times 10^8$ is added, and the total comes to about $6.7 \times 10^9$: this is the figure reported for the seven-billion-parameter model of the LLaMA family, which uses SwiGLU with an intermediate dimension chosen to keep roughly those $8d^2$. The “7B” is not a marketing label; it is an arithmetic consequence of three numbers.

## The output

After $L$ blocks and a final normalization, the last row $\mathbf{h}_n$ of $X^{(L)}$ is projected onto the vocabulary:

$$
\mathbf{z} = W_U\, \mathbf{h}_n \in \mathbb{R}^{|\mathcal{V}|}
$$

In many models $W_U = E$, a technique called weight tying (Press and Wolf, [EACL, 2017](https://arxiv.org/abs/1608.05859)): the same matrix that turns tokens into vectors turns vectors into scores. The scores $z_i$, called _logits_, are transformed into a distribution with a temperature softmax, $T > 0$:

$$
P(t_{n+1} = i \mid t_{1:n}) = \frac{\exp(z_i / T)}{\sum_{j=1}^{|\mathcal{V}|} \exp(z_j / T)}
$$

The limiting cases clarify the parameter. As $T \to 0^{+}$, the distribution concentrates on $\arg\max_i z_i$ and sampling becomes greedy decoding. As $T \to \infty$, it tends to the uniform distribution over $\mathcal{V}$. Between the two extremes, the tail is usually truncated with nucleus sampling, which keeps the smallest set of tokens whose cumulative probability exceeds a threshold $p$ (Holtzman et al., [ICLR, 2020](https://arxiv.org/abs/1904.09751)).

## Autoregression

The chosen token is appended to the sequence and the process repeats. Formally, the model defines the probability of a complete text through the chain rule:

$$
P_\theta(t_1, \dots, t_n) = \prod_{k=1}^{n} P_\theta\left(t_k \mid t_1, \dots, t_{k-1}\right)
$$

The causal mask is what makes this factorization legitimate: the representation of token $k$ depends only on the previous ones. And it has a practical consequence: the rows of $K$ and $V$ for tokens already processed do not change when a new one is added, so they are kept in memory, the so-called KV cache, and each new step costs $\mathcal{O}(n d)$ per layer instead of recomputing everything.

## Training

Given a corpus, training minimizes the average cross-entropy of next-token prediction:

$$
\mathcal{L}(\theta) = -\frac{1}{N} \sum_{k=1}^{N} \log P_\theta\left(t_k \mid t_{<k}\right)
$$

Its exponential, $\mathrm{PPL} = \exp\left(\mathcal{L}\right)$, is the perplexity: the effective number of options among which the model hesitates at each step.

The gradient with respect to the _logits_ has a remarkably simple form. For a single step, with $y$ the correct token, the loss is $\ell = -z_y + \log \sum_j e^{z_j}$, and therefore

$$
\frac{\partial \ell}{\partial z_i} = p_i - \mathbb{1}[i = y]
$$

that is, the difference between the predicted distribution and the true one, seen as an indicator vector. That error is propagated backward, layer by layer, through the chain rule: this is the backpropagation of Rumelhart, Hinton and Williams ([_Nature_, 1986](https://doi.org/10.1038/323533a0)). The parameters are updated with some variant of gradient descent,

$$
\theta_{s+1} = \theta_s - \eta\, \nabla_\theta \mathcal{L}(\theta_s)
$$

in practice with the Adam optimizer (Kingma and Ba, [ICLR, 2015](https://arxiv.org/abs/1412.6980)), which adapts the step size of each parameter according to its recent gradients.

The relationship between scale and performance turned out to be surprisingly regular. Kaplan and colleagues ([2020](https://arxiv.org/abs/2001.08361)) found that the loss decreases as a power law in the number of parameters, approximately $\mathcal{L}(N) \approx (N_c / N)^{\alpha_N}$ with $\alpha_N$ close to 0.076, and Hoffmann and colleagues ([2022](https://arxiv.org/abs/2203.15556)) showed that, for a given compute budget, it pays to train on the order of twenty tokens per parameter. These are empirical regularities, not derived laws, and extrapolating them is a matter of debate.

## Where the plausible and the true part ways

I now reach the point that justifies the triptych. Minimizing cross-entropy is equivalent to maximizing the likelihood of the corpus:

$$
\hat{\theta} = \arg\max_{\theta} \prod_{k=1}^{N} P_\theta\left(t_k \mid t_{<k}\right)
$$

And the expected loss admits a decomposition that makes explicit what is being optimized. If $p$ is the distribution that generated the data,

$$
\mathbb{E}_{x \sim p}\left[-\log P_\theta(x)\right] = H(p) + D_{\mathrm{KL}}\left(p \,\|\, P_\theta\right)
$$

The entropy $H(p)$ does not depend on $\theta$. The only thing training can reduce is the Kullback-Leibler divergence between the distribution of human text and that of the model. The reading is precise and, in my view, decisive: the objective function contains $p$, the distribution of what was written, and contains no term for what is true. Truth enters the system only indirectly, to the extent that what is written tends to be true. When the two coincide, the model is right; when they diverge, the model follows $p$, because that is the only thing it was asked to do.

There is a second, subtler formal observation. The softmax imposes $\sum_i P(t_{n+1} = i \mid t_{1:n}) = 1$ at every step. The model has no “I don’t know” state: it is forced to distribute all the probability mass among the tokens of the vocabulary, even when the information in the context falls short. Abstention exists only if it was learned as one more sequence of words, with its own probability.

Recent literature has given this intuition a stronger form. Kalai and Vempala ([STOC, 2024](https://arxiv.org/abs/2311.14648)) proved that a well-calibrated model, in a precise statistical sense, must hallucinate about certain kinds of facts at a rate bounded below by the proportion of facts that appear only once in the training data, an estimate related to the Good-Turing estimator. At the same time, Kadavath and colleagues ([2022](https://arxiv.org/abs/2207.05221)) showed that large models are partially calibrated: their internal probabilities carry information about when they are likely to be right. In other words, the model “knows” something about its own uncertainty, but the training objective does not oblige it to express it.

## What the equations do not contain

With this, the complete algorithm has been written out: tokenization, embedding, position encoding, masked attention, _feedforward_ network, normalization, projection onto the vocabulary, softmax, autoregression, cross-entropy and gradient descent. They do indeed fit in a few pages, and a trained programmer can implement them in a few hundred lines.

What appears in none of these equations is the value of $\theta$. The formulas describe the shape of the probable; the content of that shape, the billions of numbers that make it capable of writing, cannot be deduced from anything above. It is obtained by minimizing $D_{\mathrm{KL}}(p \,\|\, P_\theta)$ over what we have written. That is perhaps the most uncomfortable conclusion of the triptych: the part of the system we can understand completely is the part that knows nothing, and the part that knows is the part we cannot read.

* * *

## Sources

-   Ba, J. L., Kiros, J. R. and Hinton, G. E. (2016). “Layer Normalization”. arXiv:1607.06450. https://arxiv.org/abs/1607.06450
-   Cybenko, G. (1989). “Approximation by superpositions of a sigmoidal function”. _Mathematics of Control, Signals and Systems_, 2(4), 303–314. https://doi.org/10.1007/BF02551274
-   Elhage, N. et al. (2021). “A Mathematical Framework for Transformer Circuits”. _Transformer Circuits Thread_. https://transformer-circuits.pub/2021/framework/index.html
-   Hendrycks, D. and Gimpel, K. (2016). “Gaussian Error Linear Units (GELUs)”. arXiv:1606.08415. https://arxiv.org/abs/1606.08415
-   Hoffmann, J. et al. (2022). “Training Compute-Optimal Large Language Models”. arXiv:2203.15556. https://arxiv.org/abs/2203.15556
-   Holtzman, A., Buys, J., Du, L., Forbes, M. and Choi, Y. (2020). “The Curious Case of Neural Text Degeneration”. _ICLR 2020_. https://arxiv.org/abs/1904.09751
-   Hornik, K., Stinchcombe, M. and White, H. (1989). “Multilayer feedforward networks are universal approximators”. _Neural Networks_, 2(5), 359–366. https://doi.org/10.1016/0893-6080(89)90020-8
-   Kadavath, S. et al. (2022). “Language Models (Mostly) Know What They Know”. arXiv:2207.05221. https://arxiv.org/abs/2207.05221
-   Kalai, A. T. and Vempala, S. S. (2024). “Calibrated Language Models Must Hallucinate”. _Proceedings of the 56th ACM Symposium on Theory of Computing (STOC)_. https://arxiv.org/abs/2311.14648
-   Kaplan, J. et al. (2020). “Scaling Laws for Neural Language Models”. arXiv:2001.08361. https://arxiv.org/abs/2001.08361
-   Kingma, D. P. and Ba, J. (2015). “Adam: A Method for Stochastic Optimization”. _ICLR 2015_. https://arxiv.org/abs/1412.6980
-   Press, O. and Wolf, L. (2017). “Using the Output Embedding to Improve Language Models”. _EACL 2017_. https://arxiv.org/abs/1608.05859
-   Rumelhart, D. E., Hinton, G. E. and Williams, R. J. (1986). “Learning representations by back-propagating errors”. _Nature_, 323, 533–536. https://doi.org/10.1038/323533a0
-   Sennrich, R., Haddow, B. and Birch, A. (2016). “Neural Machine Translation of Rare Words with Subword Units”. _ACL 2016_. https://arxiv.org/abs/1508.07909
-   Shazeer, N. (2020). “GLU Variants Improve Transformer”. arXiv:2002.05202. https://arxiv.org/abs/2002.05202
-   Su, J. et al. (2021). “RoFormer: Enhanced Transformer with Rotary Position Embedding”. arXiv:2104.09864. https://arxiv.org/abs/2104.09864
-   Touvron, H. et al. (2023). “LLaMA: Open and Efficient Foundation Language Models”. arXiv:2302.13971. https://arxiv.org/abs/2302.13971
-   Vaswani, A. et al. (2017). “Attention Is All You Need”. _Advances in Neural Information Processing Systems 30_. https://arxiv.org/abs/1706.03762
