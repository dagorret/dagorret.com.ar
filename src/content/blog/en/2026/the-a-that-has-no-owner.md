---
title: "The A That Has No Owner: Non-Rival Knowledge and Collective Action"
date: 2026-11-14
slug: "the-a-that-has-no-owner"
translation_key: "la-a-que-no-tiene-dueno"
lang: "en"
categories: ["Economics"]
tags: ["Argentina","Mancur Olson","Elinor Ostrom"]
---

*An essay in the political economy of development*

*The distributive conflict between capital and labor organizes both the Marxist tradition and standard neoclassical economics, yet it plays a secondary role in explaining why some countries are several times richer than others. In an aggregate production function, the variable that weighs most in income-per-worker differences is total factor productivity, $A$. I argue that $A$ admits a decomposition into two factors: a global stock of knowledge, which is non-rival and therefore available, and a national capacity to use it, which is built through social coordination and cannot be bought. The central hypothesis follows: the persistent backwardness of economies such as Argentina's responds, in essence, to a collective-action problem, even when access to information is guaranteed. I set the hypothesis against its theoretical and empirical limits and present it as a research program.*

## The problem

The classic discussion of capital and labor concerns how a given product is divided. In volume I of *Capital*, Marx defines the value of labor power as that of the means of subsistence needed to reproduce it, and calls surplus value the excess of the working day over that value; with $v$ as variable capital and $s$ as surplus value, the rate of exploitation is:

$$e = \frac{s}{v}$$

Neoclassical theory, with a different apparatus, discusses the same partition: under competition each factor receives its marginal product, and the shares of capital and labor in income are $\alpha$ and $1-\alpha$. Institutionalized collective bargaining operates, in turn, as an adjustment mechanism within that partition, so that in all three cases the underlying question is who gets what.

My thesis is that this question, though legitimate, does not explain differences in development levels across countries. What follows is an interpretive argument supported by empirical literature, without testing of my own, and I mark as inference whatever exceeds what is established.

## The place of A in production

Consider the aggregate Cobb-Douglas production function:

$$Y = A\,K^{\alpha}L^{1-\alpha}$$

where $K$ is capital, $L$ is labor, and $A$ is total factor productivity. Solow (1957) showed for the United States between 1909 and 1949 that around 87.5% of the increase in output per hour worked was attributable to technical change, and only the remainder to greater capital intensity. The equation, moreover, understates the weight of $A$, because capital responds to it. Writing $K/L = (K/Y)(Y/L)$ and solving for output per worker $y = Y/L$ gives:

$$y = A^{\frac{1}{1-\alpha}}\left(\frac{K}{Y}\right)^{\frac{\alpha}{1-\alpha}}$$

With $\alpha = 1/3$, the usual value of the capital share, the exponent on $A$ is 3/2: a productivity difference is amplified because it induces capital accumulation (Klenow and Rodríguez-Clare, 1997). The development-accounting literature (Klenow and Rodríguez-Clare, 1997; Hall and Jones, 1999; Caselli, 2005) agrees that the international dispersion of $A$ is of an order comparable to, or greater than, that of factor accumulation, depending on the specification.

Growth accounting makes that observation operational. Differentiating the logarithm of the production function with respect to time, with a dot over each variable to denote its time derivative, yields:

$$\frac{\dot{Y}}{Y} = \frac{\dot{A}}{A} + \alpha\,\frac{\dot{K}}{K} + (1-\alpha)\,\frac{\dot{L}}{L}$$

from which the Solow residual is computed as:

$$\frac{\dot{A}}{A} = \frac{\dot{Y}}{Y} - \alpha\,\frac{\dot{K}}{K} - (1-\alpha)\,\frac{\dot{L}}{L}$$

It is the part of output growth left unexplained once the measured growth of capital and labor, weighted by their income shares, is subtracted. Because it is obtained by difference, the residual absorbs everything that measurement does not capture, and its interpretation requires the caution that follows.

A methodological warning conditions the rest of the argument. $A$ is a residual, what Abramovitz (1956) called a measure of our ignorance, and it contains much more than knowledge: measurement error, institutional quality, and the allocation of resources across firms (Hsieh and Klenow, 2009; Restuccia and Rogerson, 2008), which is why I decompose it below.

## The economic nature of A

A good is non-rival when its use by one agent does not reduce the quantity available to another. Samuelson (1954) incorporated it into the theory of public goods, together with non-excludability, and Arrow (1962) observed that information is hard to appropriate by its very nature. Romer (1990) made that property the core of endogenous growth theory: ideas are non-rival and only partially excludable. The formal consequence is a replication argument (Jones, 2005): doubling rival inputs doubles output, but knowledge does not need to be doubled to be used twice, so the function exhibits increasing returns in the set of its arguments:

$$F(\lambda A,\lambda K,\lambda L) = \lambda^{2}\,F(A,K,L)$$

This is the economic basis of what Marx called, in the *Grundrisse* (notebooks VI-VII, the "Fragment on Machines"), the *general intellect*: the degree to which general social knowledge has become a direct productive force. The reading requires the nuance that, for Marx, that knowledge is objectified in fixed capital, that is, in machinery that has an owner. It is therefore useful to distinguish between a natural owner and an instituted owner: non-rivalry prevents $A$ from having the former but leaves open the existence of the latter, because excludability is built with intellectual property rights, secrecy, and control of complementary assets. To say that knowledge belongs to no one describes its economic nature and leaves unanswered who appropriates its fruits.

It helps to place $A$ in the usual typology of goods, which crosses two independent properties: rivalry and excludability. Private goods are rival and excludable; pure public goods (Samuelson, 1954) are non-rival and non-excludable; club goods (Buchanan, 1965) are non-rival and excludable; and common-pool resources (Ostrom, 1990) are rival and non-excludable. Knowledge is non-rival by nature, but its excludability is an institutional design variable: without protection it behaves as a public good and, with patents or secrecy, as a club good. That variability explains why societies argue over the design of intellectual property, which must balance the incentive to produce knowledge against the diffusion that makes it productive for everyone (Romer, 1990).

## From availability to appropriation

Non-rivalry allows many to use the same knowledge and leaves open the question of who can do so in practice. A substantial part of it is tacit (Polanyi, 1966) and resides in organizational routines (Nelson and Winter, 1982); assimilating external knowledge requires prior related knowledge, what Cohen and Levinthal (1990) called absorptive capacity; and lagging countries capture the advantages of backwardness only if they possess the "social capability" to do so (Gerschenkron, 1962; Abramovitz, 1986). Parente and Prescott (1994) formalized the idea as barriers to technology adoption.

Cohen and Levinthal (1989) also showed that R&D investment has two faces: it generates innovations and, at the same time, the capacity to learn from what others generate. Hence absorptive capacity is cumulative and path-dependent: whoever did not invest in learning today faces a higher cost of doing so tomorrow, and the availability of knowledge does not substitute for that prior investment.

Along those lines I propose, as a working specification, to decompose a country's productivity into a global stock $\Omega$, common to all, and a national coefficient $\phi\in(0,1]$ that measures how much of that stock the country is able to use:

$$A = \phi\,\Omega$$

Substituting into the expression for output per worker, and comparing with a frontier economy ($\phi = 1$) with the same capital-output ratio, gives:

$$\frac{y}{y^{F}} = \phi^{\frac{1}{1-\alpha}}$$

Here $y^{F}$ is the output per worker of the frontier economy. With $\alpha = 1/3$, a $\phi = 0.5$ implies output per worker near 35% of the frontier's; the figure is illustrative and serves to show the structure: $\Omega$ is a global good that does not vary across countries, so all international variation in $A$ comes from $\phi$. The diffusion evidence is consistent with this reading: Comin and Hobijn (2010) find that technology adoption lags are long and vary across countries, and that they explain an appreciable share of income differences. The Korean case shows the other extreme: Amsden (1989) and Kim (1997) document how an economy went from imitating to innovating in a few decades through deliberately organized technological learning.

Solow's (1956) model predicts that economies with less capital per worker grow faster and converge. The data show convergence among relatively homogeneous economies, such as industrialized countries or regions within a country (Baumol, 1986; Barro and Sala-i-Martin, 1992) and, in broad country samples, only conditional convergence on determinants such as saving, population growth, and human capital (Mankiw, Romer, and Weil, 1992). Within the framework of this essay, the absence of unconditional convergence is an expected consequence: if $\phi$ differs across countries, each tends toward its own equilibrium level, and the distance to the frontier closes only when $\phi$ rises. That reading can be tested, because it predicts that the countries that converge are those that raised their capacity for coordination and absorption, not those that simply accumulated capital.

## The bottleneck is coordination

If $\Omega$ is available, what determines $\phi$ is the provision of collective goods: the education system, standards, stable rules, public capabilities in science and technology, contract enforcement. Olson (1965) showed that large groups tend to provide fewer collective goods than suit them, because without selective incentives each member prefers that another bear the cost. In *The Rise and Decline of Nations* (1982) he extended the argument: stable societies accumulate distributional coalitions which, by internalizing only a fraction of the social cost of their demands, destroy more than they distribute and slow adaptation, so that the resulting game has negative sum.

The simplest formal structure is a repeated prisoner's dilemma, with payoffs $T>R>P>S$ (temptation, reward, punishment, sucker). Cooperation is a subgame-perfect equilibrium under a trigger strategy if:

$$\delta \geq \frac{T-R}{T-P}$$

where $\delta$ is the players' discount factor. It is the standard sustainability condition, a particular case of the folk theorem (Fudenberg and Maskin, 1986), and it is obtained by comparing discounted flows. Cooperating forever yields $R/(1-\delta)$; deviating once yields $T$ today and permanent punishment $P$ from tomorrow on, that is, $T + \delta P/(1-\delta)$. Cooperation pays when:

$$\frac{R}{1-\delta} \geq T + \frac{\delta P}{1-\delta}$$

Solving gives the previous condition. The shorter the actors' horizon, the lower $\delta$ and the harder it is to sustain cooperation even with complete information. If, in addition, the relationship continues each period with probability $\pi$, which depends for example on actors remaining in office, the relevant factor becomes $\delta\pi$. My inference is that political instability reduces cooperation even among patient actors.

Spiller and Tommasi (2007) apply precisely this repeated-game theory to Argentina: its key political actors have short horizons, and the country lacks the institutional glue (a professional bureaucracy, an independent judiciary) that would allow intertemporal agreements to be enforced, with the result of volatile policies and underinvestment in capabilities.

The Argentine literature describes an equivalent structure. O'Donnell (1977) analyzed the pendulum between a defensive alliance and an offensive alliance in 1956-1976, and Portantiero (1973, 1977) formulated the concept of hegemonic stalemate: no force can impose its project and all can veto the other's. My inference is that these works describe, for that period, the non-cooperative equilibrium that the model predicts with low $\delta$; that the structure persists in the present is a working hypothesis that this text does not establish.

According to Maddison's (2001) series, around the beginning of the twentieth century Argentina ranked among the economies with the highest per capita income, and over the course of the century it lost relative position (Della Paolera and Taylor, 2003). A country that had access to frontier knowledge and did not sustain its advantage is consistent with a coordination diagnosis and hardly compatible with an access diagnosis.

## Objections and limits

A first objection is that $A$ includes more than knowledge. Since the residual covers the allocation of resources, part of $\phi$ reflects distortions that divert capital and labor toward low-productivity firms (Hsieh and Klenow, 2009; Restuccia and Rogerson, 2008). The proposed decomposition is compatible with this, though it limits the scope of non-rivalry, which describes $\Omega$, while a good part of $\phi$ is organizational and institutional in nature.

Another objection questions the very separation between distributing and producing. The dispute between capital and labor matters because distributive conflict is one of the channels through which coordination fails: Acemoglu and Robinson (2006) show that elites who fear losing rents or political power can block the adoption of technologies and institutions that would raise total output, and Acemoglu and Robinson (2012) generalize the argument. The thesis must therefore be formulated more carefully: what decides development is the extent to which the conflict between $K$ and $L$ prevents organizing to absorb $\Omega$, regardless of how much is distributed.

Attainable does not mean free, either. The Korean experience (Amsden, 1989) included state discipline over firms and reciprocity mechanisms that were costly to set up, so organizing to take available knowledge is a demanding political undertaking.

There is also a less pessimistic reading than Olson's. Ostrom (1990) documented communities that sustain shared resources for generations without recourse to privatization or a central state, through defined access rules, monitoring by the users themselves, graduated sanctions, and local arenas for conflict resolution. For $\phi$ the implication is that collective action can be organized and that the institutional conditions that favor it are specific and constructible. Which design works for a national economy of technological learning remains an open question.

A problem of identification remains, because the argument rests on single-country narratives and on suggestive but inconclusive comparisons, such as that of Argentina with Australia and Canada (Taylor, 1992). Terms of trade, human capital, geography, and macroeconomic instability compete as explanations, and designing contrasts that separate the coordination hypothesis from those alternatives is the pending task. I note, as an illustrative example and without analysis of my own, that islands of sustained technological capability in a weakly coordinated environment, such as INVAP, suggest that $\phi$ also varies across organizations and is not a homogeneous attribute of the country. Those high-$\phi$ enclaves within a low aggregate $\phi$ raise an additional hypothesis: the national coefficient would be an average of very unequal organizational capabilities, and the gap would depend less on a lack of capacity everywhere than on the islands failing to diffuse it to the rest. The research question that follows is how such islands of high coordination survive and replicate in institutional environments of low aggregate coordination, and what distinguishes those that diffuse from those that remain isolated. That question opens the door to the microeconomic measurement with which the essay closes.

## Toward a research program

The argument rests on three linked pieces. The classic dispute looks only at $K$ and $L$, whereas in the production function what weighs most in income differences is $A$, amplified by the capital accumulation it induces. The global component of $A$ is non-rival and therefore has no natural owner, though it may have an instituted one. And if that component is available, persistent backwardness is explained by the inability to build $\phi$, which has the structure of a collective-action problem with short horizons.

The implication is that the central question of development shifts toward the organization of a society capable of appropriating the global knowledge that already exists, with distributive conflict as one of the obstacles it must resolve. The research program that follows consists of measuring $\phi$ at the level of sectors and organizations and testing whether shorter political horizons predict lower technology adoption, controlling for alternative explanations.

## References

- Abramovitz, M. (1956). Resource and output trends in the United States since 1870. *American Economic Review*, 46(2), 5-23.
- Abramovitz, M. (1986). Catching up, forging ahead, and falling behind. *Journal of Economic History*, 46(2), 385-406.
- Acemoglu, D. and Robinson, J. A. (2006). Economic backwardness in political perspective. *American Political Science Review*, 100(1), 115-131.
- Acemoglu, D. and Robinson, J. A. (2012). *Why Nations Fail: The Origins of Power, Prosperity, and Poverty*. Crown.
- Amsden, A. H. (1989). *Asia's Next Giant: South Korea and Late Industrialization*. Oxford University Press.
- Arrow, K. J. (1962). Economic welfare and the allocation of resources for invention. In *The Rate and Direction of Inventive Activity* (pp. 609-626). Princeton University Press.
- Barro, R. J. and Sala-i-Martin, X. (1992). Convergence. *Journal of Political Economy*, 100(2), 223-251.
- Baumol, W. J. (1986). Productivity growth, convergence, and welfare: what the long-run data show. *American Economic Review*, 76(5), 1072-1085.
- Buchanan, J. M. (1965). An economic theory of clubs. *Economica*, 32(125), 1-14.
- Caselli, F. (2005). Accounting for cross-country income differences. In P. Aghion and S. Durlauf (eds.), *Handbook of Economic Growth* (vol. 1A, pp. 679-741). Elsevier.
- Cohen, W. M. and Levinthal, D. A. (1989). Innovation and learning: the two faces of R&D. *Economic Journal*, 99(397), 569-596.
- Cohen, W. M. and Levinthal, D. A. (1990). Absorptive capacity: a new perspective on learning and innovation. *Administrative Science Quarterly*, 35(1), 128-152.
- Comin, D. and Hobijn, B. (2010). An exploration of technology diffusion. *American Economic Review*, 100(5), 2031-2059.
- Della Paolera, G. and Taylor, A. M. (eds.) (2003). *A New Economic History of Argentina*. Cambridge University Press.
- Fudenberg, D. and Maskin, E. (1986). The folk theorem in repeated games with discounting or with incomplete information. *Econometrica*, 54(3), 533-554.
- Gerschenkron, A. (1962). *Economic Backwardness in Historical Perspective*. Harvard University Press.
- Hall, R. E. and Jones, C. I. (1999). Why do some countries produce so much more output per worker than others? *Quarterly Journal of Economics*, 114(1), 83-116.
- Hsieh, C.-T. and Klenow, P. J. (2009). Misallocation and manufacturing TFP in China and India. *Quarterly Journal of Economics*, 124(4), 1403-1448.
- Jones, C. I. (2005). Growth and ideas. In P. Aghion and S. Durlauf (eds.), *Handbook of Economic Growth* (vol. 1B, pp. 1063-1111). Elsevier.
- Kim, L. (1997). *Imitation to Innovation: The Dynamics of Korea's Technological Learning*. Harvard Business School Press.
- Klenow, P. J. and Rodríguez-Clare, A. (1997). The neoclassical revival in growth economics: has it gone too far? *NBER Macroeconomics Annual*, 12, 73-103.
- Maddison, A. (2001). *The World Economy: A Millennial Perspective*. OECD.
- Mankiw, N. G., Romer, D. and Weil, D. N. (1992). A contribution to the empirics of economic growth. *Quarterly Journal of Economics*, 107(2), 407-437.
- Marx, K. (1990 [1867]). *Capital*, vol. I (trans. B. Fowkes). Penguin.
- Marx, K. (1973 [1857-1858]). *Grundrisse: Foundations of the Critique of Political Economy* (trans. M. Nicolaus). Penguin.
- Nelson, R. R. and Winter, S. G. (1982). *An Evolutionary Theory of Economic Change*. Harvard University Press.
- O'Donnell, G. (1977). Estado y alianzas en la Argentina, 1956-1976. *Desarrollo Económico*, 16(64), 523-554.
- Olson, M. (1965). *The Logic of Collective Action*. Harvard University Press.
- Olson, M. (1982). *The Rise and Decline of Nations*. Yale University Press.
- Ostrom, E. (1990). *Governing the Commons: The Evolution of Institutions for Collective Action*. Cambridge University Press.
- Parente, S. L. and Prescott, E. C. (1994). Barriers to technology adoption and development. *Journal of Political Economy*, 102(2), 298-321.
- Polanyi, M. (1966). *The Tacit Dimension*. Doubleday.
- Portantiero, J. C. (1973). Clases dominantes y crisis política en la Argentina actual. In O. Braun (ed.), *El capitalismo argentino en crisis*. Siglo XXI.
- Portantiero, J. C. (1977). Economía y política en la crisis argentina: 1958-1973. *Revista Mexicana de Sociología*, 39(2), 531-566.
- Restuccia, D. and Rogerson, R. (2008). Policy distortions and aggregate productivity with heterogeneous establishments. *Review of Economic Dynamics*, 11(4), 707-720.
- Romer, P. M. (1990). Endogenous technological change. *Journal of Political Economy*, 98(5, part 2), S71-S102.
- Samuelson, P. A. (1954). The pure theory of public expenditure. *Review of Economics and Statistics*, 36(4), 387-389.
- Solow, R. M. (1956). A contribution to the theory of economic growth. *Quarterly Journal of Economics*, 70(1), 65-94.
- Solow, R. M. (1957). Technical change and the aggregate production function. *Review of Economics and Statistics*, 39(3), 312-320.
- Spiller, P. T. and Tommasi, M. (2007). *The Institutional Foundations of Public Policy in Argentina: A Transactions Cost Approach*. Cambridge University Press.
- Taylor, A. M. (1992). External dependence, demographic burdens, and Argentine economic decline after the Belle Époque. *Journal of Economic History*, 52(4), 907-936.
