---
title: "La retórica de las magnitudes: análisis ético y matemático del riesgo absoluto y el riesgo relativo"
date: 2026-09-19
slug: "la-retorica-de-las-magnitudes-analisis-etico-y-matematico-del-riesgo-absoluto-y-el-riesgo-relativo"
translation_key: "la-retorica-de-las-magnitudes-analisis-etico-y-matematico-del-riesgo-absoluto-y-el-riesgo-relativo"
lang: "es"
categories: ["Filosofía"]
tags: ["Estadística","salud"]
---

## Resumen

El presente trabajo examina las métricas de evaluación del riesgo en estudios de intervención y epidemiología. Se analizan las diferencias formales entre el riesgo absoluto, el riesgo relativo y el número necesario a tratar (NNT), se incorpora su contraparte para eventos adversos —el número necesario para dañar (NNH)—, se documenta con evidencia empírica real el efecto de encuadre (_framing effect_) en la comunicación del riesgo, y se evalúan las implicancias éticas de ese encuadre en la toma de decisiones clínicas y políticas.

## 1\. Marco matemático y teórico

Sea una población expuesta a un factor o tratamiento donde se evalúa la aparición de un evento dicotómico $E$ (por ejemplo, enfermedad, recaída o muerte) en dos grupos: expuestos o tratados ($G_1$) y no expuestos o control ($G_0$).

**Riesgo absoluto (RA)**: la probabilidad condicional simple de que el evento ocurra en un grupo determinado.

$$
RA_1 = \mathbb{P}(E \mid G_1), \quad RA_0 = \mathbb{P}(E \mid G_0)
$$

**Reducción del riesgo absoluto (RRA)**: la diferencia aritmética directa entre ambas probabilidades basales.

$$
\text{RRA} = \left| RA_1 - RA_0 \right|
$$

**Riesgo relativo (RR)**: la razón proporcional entre las dos probabilidades condicionales.

$$
\text{RR} = \frac{\mathbb{P}(E \mid G_1)}{\mathbb{P}(E \mid G_0)}
$$

**Reducción del riesgo relativo (RRR)**: el porcentaje de disminución del riesgo respecto a la línea de base.

$$
\text{RRR} = 1 - \text{RR} = \frac{RA_0 - RA_1}{RA_0}
$$

**Número necesario a tratar (NNT)**: cuántos individuos deben recibir la intervención para prevenir exactamente un evento adverso adicional; el inverso multiplicativo de la RRA.

$$
\text{NNT} = \frac{1}{\text{RRA}}
$$

_Demostración comparativa_: supóngase una enfermedad poco común con $RA_0 = 0{,}002$ ($0{,}2\%$) y un fármaco que disminuye el riesgo a $RA_1 = 0{,}001$ ($0{,}1\%$).

$$
\text{RR} = \frac{0{,}001}{0{,}002} = 0{,}5 \implies \text{RRR} = 50\%
$$

 

$$
\text{RRA} = 0{,}002 - 0{,}001 = 0{,}001 \implies 0{,}1\%
$$

 

$$
\text{NNT} = \frac{1}{0{,}001} = 1000
$$

### 1.1. El complemento asimétrico: el número necesario para dañar (NNH)

El aparato del NNT tiene un espejo que la divulgación casi nunca menciona con el mismo peso, y que resulta indispensable para una evaluación ética completa de cualquier intervención: el **número necesario para dañar** (_number needed to harm_, NNH). Si $RA_1^{h}$ y $RA_0^{h}$ denotan, respectivamente, el riesgo absoluto de un efecto adverso $H$ en el grupo tratado y en el control —eventos que pueden ser enteramente distintos del evento $E$ que la intervención busca prevenir—, entonces:

$$
\text{NNH} = \frac{1}{\left| RA_1^{h} - RA_0^{h} \right|}
$$

La comparación entre NNT y NNH es, en rigor, la que determina el balance neto de una intervención, no el NNT tomado de manera aislada. Un fármaco con $\text{NNT} = 1000$ pero $\text{NNH} = 50$ para un efecto adverso grave presenta un perfil de beneficio-riesgo radicalmente distinto de uno con el mismo NNT pero $\text{NNH} = 100.000$, y ningún reporte de RRR o de NNT en soledad permite distinguir estos dos escenarios sin el dato complementario del NNH.

### 1.2. Incertidumbre muestral: el NNT no es un número puntual

Una omisión formal habitual en la comunicación clínica —y que merece señalarse en un documento que aspira al rigor— es tratar al NNT como si fuera una constante determinística en lugar de una estimación puntual sujeta a error muestral. Dado que $\text{RRA}$ se estima a partir de proporciones muestrales con su propia varianza, el NNT hereda esa incertidumbre de forma no lineal —al ser un inverso multiplicativo, su distribución es asimétrica y, cuando el intervalo de confianza de la RRA incluye el cero, el intervalo de confianza del NNT se vuelve discontinuo, con una rama que tiende a infinito positivo y otra a infinito negativo (interpretada esta última como un “número necesario para dañar” en la dirección opuesta)—. Reportar un NNT puntual sin su intervalo de confianza asociado es, en ese sentido, una forma adicional —y menos discutida— del mismo problema de encuadre que motiva este ensayo: la precisión aparente de un número entero oculta la incertidumbre real de la estimación subyacente.

## 2\. Evidencia empírica del efecto de encuadre

El reporte de magnitudes mediante el riesgo relativo o la reducción del riesgo absoluto no es solo un problema teórico de filosofía del lenguaje: es un fenómeno psicológico documentado experimentalmente con notable solidez, y vale la pena anclarlo a su fuente empírica primaria en lugar de tratarlo como una intuición razonable sin más.

El estudio fundacional es el de Amos Tversky y Daniel Kahneman, “The Framing of Decisions and the Psychology of Choice” (_Science_, 1981), que introdujo el célebre “problema de la enfermedad asiática” (_Asian disease problem_). A un grupo de sujetos se les presentó un escenario donde una enfermedad amenazaba con matar a 600 personas, y se les ofrecían dos programas alternativos formulados en términos de vidas _salvadas_: el Programa A salvaba con certeza a 200 personas; el Programa B tenía una probabilidad de 1/3 de salvar a las 600 y 2/3 de no salvar a nadie. Con este encuadre en ganancias, el $72\%$ de los sujetos eligió la opción seguro (Programa A). A un segundo grupo se le presentó el mismo problema, matemáticamente idéntico, pero formulado en términos de muertes: el Programa C producía con certeza 400 muertes; el Programa D tenía una probabilidad de 1/3 de que nadie muriera y 2/3 de que murieran las 600 personas. Con este encuadre en pérdidas, el patrón se invirtió: el $78\%$ de los sujetos prefirió la opción riesgosa (Programa D) ([Tversky & Kahneman, 1981, texto original en _Science_](https://psych.hanover.edu/classes/cognition/papers/tversky81.pdf); [resumen del experimento y sus cifras](https://yukaichou.com/behavioral-analysis/framing-effect-tversky-kahneman-gain-loss-framing/)). Los dos programas de cada par son formalmente equivalentes en valor esperado —200 salvados es idéntico a 400 muertos sobre una base de 600—; el único elemento que cambia es el marco lingüístico bajo el cual se presenta la misma información numérica. Este resultado, que Tversky y Kahneman vinculan a su Teoría de las Perspectivas (_Prospect Theory_, 1979), es la demostración experimental directa de que la “invariancia” —el axioma según el cual la preferencia racional no debería depender de cómo se formula un problema— se viola de manera sistemática y predecible en sujetos humanos, incluidos expertos.

La traslación de este hallazgo al dominio médico específico está, a su vez, ampliamente documentada por el trabajo de Gerd Gigerenzer y sus colaboradores en el Max Planck Institute for Human Development. En un estudio con 160 ginecólogos, Gigerenzer y su equipo encontraron que un tercio de los profesionales desconocía el beneficio real —en términos absolutos— del cribado mamográfico, y que la mayoría era incapaz de calcular correctamente el valor predictivo positivo de un resultado positivo en la prueba ([resumen citado en “Risk literacy assessment of general practitioners and medical students”, PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC7362657/)). El caso concreto de la mamografía es paradigmático del problema que este ensayo analiza: la cifra que suele comunicarse públicamente es que el cribado “reduce la mortalidad por cáncer de mama en aproximadamente un 25%” —una reducción del riesgo relativo—, mientras que la reducción del riesgo absoluto correspondiente, según la evidencia sintetizada en las revisiones Cochrane sobre el tema, ronda apenas 1 en 1000 mujeres examinadas durante el período de seguimiento típico de los ensayos ([Wegwarth & Gigerenzer, “The Barrier to Informed Choice in Cancer Screening”](https://www.researchgate.net/publication/319912469_The_Barrier_to_Informed_Choice_in_Cancer_Screening_Statistical_Illiteracy_in_Physicians_and_Patients)). En esa misma muestra de 160 ginecólogos, un tercio no comprendía correctamente el significado de esa reducción del 25%, y la mayoría sobreestimaba por un orden de magnitud completo el número de muertes que se evitarían si se examinara a toda la población femenina, calculando 250 muertes evitadas por cada 1000 mujeres examinadas cuando la mejor estimación basada en evidencia ronda apenas 1 en 1000 ([Making sense of health statistics, PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC2733256/)).

## 3\. Dimensión filosófica y epistemológica

El reporte de magnitudes mediante el riesgo relativo o la reducción del riesgo absoluto plantea un problema fundamental de la filosofía del lenguaje aplicada a la comunicación del riesgo: el efecto de encuadre (_framing effect_), que la evidencia repasada en la sección anterior confirma no como una hipótesis plausible sino como un fenómeno empíricamente robusto, replicado en poblaciones legas y en profesionales de la salud por igual. Aunque ambas métricas son formalmente correctas y matemáticamente derivables una de la otra conociendo el riesgo basal, transmiten imágenes cognitivas radicalmente distintas sobre el impacto real de un fenómeno.

Comunicar que una intervención “reduce el riesgo en un $50\%$” (RRR) genera en el interlocutor una percepción de eficacia masiva, soslayando que el beneficio individual neto, en el ejemplo de la sección 1, es de apenas 1 en 1000 ($\text{RRA} = 0{,}1\%$). Esta práctica es habitual en la comunicación farmacéutica y en los titulares periodísticos, precisamente porque maximiza el impacto perceptivo sin alterar en absoluto la veracidad técnica del enunciado —lo cual es lo que vuelve al fenómeno tan difícil de corregir apelando solo a criterios de exactitud formal, y lo que explica que incluso profesionales entrenados en estadística sigan siendo sistemáticamente vulnerables a él—.

Un antídoto formal parcialmente exitoso, documentado también por el grupo de Gigerenzer, es la comunicación mediante **frecuencias naturales** en lugar de porcentajes o probabilidades condicionales abstractas: expresar el riesgo como “1 de cada 1000 mujeres” en lugar de “0,1% de reducción del riesgo” mejora de manera medible la comprensión del riesgo real, tanto en pacientes legos como en médicos, porque preserva la información sobre la clase de referencia (el denominador) que las probabilidades normalizadas tienden a hacer implícita y, por lo tanto, invisible ([Hoffrage, Lindsey, Hertwig & Gigerenzer, “Communicating statistical information”, _Science_, 2000, citado en la guía de riskyr](https://cran.r-project.org/web/packages/riskyr/vignettes/A_user_guide.html)).

Desde una perspectiva de ética kantiana, ocultar el riesgo absoluto y presentar únicamente métricas relativas distorsiona el juicio racional del sujeto que recibe la información. Si el imperativo categórico exige tratar a las personas como fines en sí mismas y no meramente como medios, y si eso supone, en el terreno epistémico, respetar su capacidad de juicio autónomo, entonces comunicar de un modo que sistemáticamente induce a sobreestimar un beneficio —aun sin mentir en sentido literal, y aun cuando el propio comunicador no sea consciente del sesgo que está induciendo— atenta contra esa autonomía y desvirtúa la doctrina del consentimiento informado en bioética. Para tomar decisiones racionales, un agente moral necesita conocer no solo la velocidad proporcional del cambio, sino la escala real de su impacto basal en la existencia cotidiana —y, siguiendo la extensión introducida en la sección 1.1, también el perfil simétrico de daño potencial (NNH), sin el cual ningún balance de riesgo-beneficio puede considerarse éticamente completo.

## 4\. Conclusión

El riesgo relativo es útil para la investigación etiológica pura —donde interesa la fuerza de la asociación entre exposición y evento, con independencia de su prevalencia basal—, pero resulta insuficiente y empíricamente demostrado como engañoso para la toma de decisiones clínicas y de política pública, tanto en población lega como en profesionales entrenados. La evaluación ética de cualquier intervención exige la transparencia simultánea del riesgo absoluto, del NNT junto a su NNH complementario, y —cuando la evidencia lo permite— de su incertidumbre muestral, para garantizar la racionalidad efectiva del consentimiento, no solo su legalidad formal. La comunicación mediante frecuencias naturales, respaldada por evidencia experimental replicada, ofrece una vía formalmente equivalente pero cognitivamente más transparente que las razones y porcentajes que dominan hoy la comunicación médica y periodística del riesgo.

* * *

### Fuentes citadas

-   [Tversky, A. & Kahneman, D. (1981), “The Framing of Decisions and the Psychology of Choice”, _Science_ 211(4481), texto original](https://psych.hanover.edu/classes/cognition/papers/tversky81.pdf)
-   [Yu-kai Chou — resumen y cifras del “problema de la enfermedad asiática” (72%/78%)](https://yukaichou.com/behavioral-analysis/framing-effect-tversky-kahneman-gain-loss-framing/)
-   [Wegwarth, O. & Gigerenzer, G. — “The Barrier to Informed Choice in Cancer Screening: Statistical Illiteracy in Physicians and Patients”](https://www.researchgate.net/publication/319912469_The_Barrier_to_Informed_Choice_in_Cancer_Screening_Statistical_Illiteracy_in_Physicians_and_Patients)
-   [PMC — “Risk literacy assessment of general practitioners and medical students using the Berlin Numeracy Test”](https://pmc.ncbi.nlm.nih.gov/articles/PMC7362657/)
-   [PMC — “Making sense of health statistics” (caso de los 160 ginecólogos y la sobreestimación de un orden de magnitud)](https://pmc.ncbi.nlm.nih.gov/articles/PMC2733256/)
-   [CRAN, guía de usuario del paquete _riskyr_ — cita de Hoffrage, Lindsey, Hertwig & Gigerenzer (2000), “Communicating statistical information”, _Science_](https://cran.r-project.org/web/packages/riskyr/vignettes/A_user_guide.html)
