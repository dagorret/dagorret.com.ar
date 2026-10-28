---
title: "La dialéctica del dato: el marco PPDAC, la hermenéutica cuantitativa y la sociología del número"
date: 2026-08-16
slug: "la-dialectica-del-dato-el-marco-ppdac-la-hermeneutica-cuantitativa-y-la-sociologia-del-numero"
translation_key: "la-dialectica-del-dato-el-marco-ppdac-la-hermeneutica-cuantitativa-y-la-sociologia-del-numero"
lang: "es"
categories: ["Ciencia"]
tags: ["Big-Data","Epistemologia","hermeneutica"]
---

### Resumen

El presente ensayo examina las dimensiones epistemológicas, hermenéuticas y sociopolíticas del ciclo de resolución de problemas estadísticos. A partir del ciclo PPDAC (Problema, Plan, Datos, Análisis, Conclusiones) propuesto por Wild y Pfannkuch, se deconstruye la ilusión de la neutralidad del dato empírico, contrastándola con la carga teórica de la observación de Hanson y los paradigmas de Kuhn. Asimismo, se analiza el sesgo de medición (_measurement bias_) en la era algorítmica y la función de la estadística de Estado descrita por Alain Desrosières como un dispositivo de estandarización y ejercicio del poder público.

* * *

### 1\. El ciclo PPDAC como proceso epistemológico iterativo

En la enseñanza e investigación estadística tradicional, la disciplina suele presentarse como un conjunto deductivo de técnicas operativas aplicables a matrices de datos preconcebidas. Frente a este reduccionismo, Chris Wild y Maxine Pfannkuch, en “Statistical Thinking in Empirical Enquiry” (_International Statistical Review_, 1999), desarrollaron el ciclo **PPDAC** (_Problem, Plan, Data, Analysis, Conclusions_), planteando el pensamiento estadístico como una dinámica holística e iterativa de indagación empírica. Vale la aclaración —relevante para no atribuirle a Wild y Pfannkuch una originalidad que ellos mismos no reclaman— de que el esquema PPDAC en su forma más básica proviene de un modelo previo de MacKay y Oldford (1994); el aporte específico de Wild y Pfannkuch fue integrarlo dentro de un marco de cuatro dimensiones más amplio —el ciclo investigativo, el ciclo interrogativo, los tipos de pensamiento estadístico y las disposiciones del investigador— y documentarlo empíricamente mediante entrevistas en profundidad con estadísticos profesionales.

El ciclo se articula en cinco fases interconectadas:

1.  **Problema (P)**: formulación del problema en el dominio sustantivo, traduciendo una pregunta vaga o compleja de la realidad en un conjunto de preguntas investigables.
2.  **Planificación (P)**: diseño del estudio, selección del esquema de muestreo o diseño experimental, y operacionalización de variables abstractas en constructos medibles.
3.  **Datos (D)**: recolección, depuración, codificación y almacenamiento de la información.
4.  **Análisis (A)**: exploración de patrones, estimación de parámetros, contraste de hipótesis y ajuste de modelos matemáticos.
5.  **Conclusiones (C)**: interpretación de los resultados numéricos en el contexto del problema original, delimitando su alcance e identificando nuevas interrogantes.

La dimensión crucial del ciclo PPDAC radica en que la inferencia no empieza en la fase de Análisis, sino en la fase de Problema. La forma en que se conceptualiza un fenómeno orienta las métricas recopiladas y restringe de antemano el espacio de conclusiones alcanzables —un punto que, como se verá en la Sección 4, es exactamente el mismo que Desrosières formula desde la sociología histórica de la estadística de Estado, aunque llegando a él por un camino completamente distinto.

* * *

### 2\. Hermenéutica cuantitativa: la carga teórica de la observación

La concepción ingenuamente positivista de la ciencia asume que los “datos” (_data_, del latín _datum_: lo dado) son elementos primarios y neutros capturados directamente del mundo real. Sin embargo, la epistemología contemporánea sostiene que los datos no son “dados”, sino “capturados” o “construidos” (_capta_) —distinción que, dicho sea de paso, no proviene de una corriente difusa sino de un texto puntual: el ensayo de Johanna Drucker, “Humanities Approaches to Graphical Display” (_Digital Humanities Quarterly_, 2011), que explota precisamente la raíz etimológica latina de _datum_ (“lo dado”) frente a _captum_ (“lo tomado”) para marcar la diferencia entre una postura realista y una constructivista de la medición.

Norwood Russell Hanson acuñó el concepto de **la carga teórica de la observación** (_theory-ladenness of observation_), desarrollado en _Patterns of Discovery_ (1958): toda observación empírica está mediatizada por el marco teórico previo del observador. Lo que un científico “ve” depende tanto de la estimulación de su retina como de los conceptos teóricos que domina. Thomas Kuhn integró esta tesis en _La estructura de las revoluciones científicas_ (1962), demostrando que los datos recolectados bajo un paradigma determinado resultan en algún grado inconmensurables con los recolectados bajo otro.

En el ámbito estadístico, esto constituye el principio de la hermenéutica cuantitativa:

-   Un dato no existe de forma autónoma en la naturaleza; es el producto de un proceso de **operacionalización**, donde un concepto abstracto —inteligencia, pobreza, inflación— se proyecta sobre una escala numérica a través de un indicador formal.
-   La elección de la función de medición $m: \mathcal{Q} \to \mathbb{R}$ presupone un compromiso conceptual previo. Si se mide el desarrollo económico mediante el Producto Interno Bruto, se presupone que las actividades con transacción monetaria directa son prioritarias sobre la economía del cuidado no remunerada o la sostenibilidad ecológica —una elección de diseño, no un reflejo neutral de “la economía tal cual es”.

* * *

### 3\. Ética algorítmica y el sesgo de medición (_measurement bias_)

El auge de la ciencia de datos masiva (_big data_) y los modelos predictivos basados en aprendizaje automático ha reavivado la ilusión de un empirismo puro —”el fin de la teoría”, según formulaciones tecnocráticas de comienzos de la década de 2010—. Sin embargo, la automatización de la toma de decisiones ha puesto de manifiesto la propagación del sesgo de medición.

Sea $Y^*$ la variable latente objetiva que se pretende medir —por ejemplo, “idoneidad crediticia” o “riesgo de reincidencia penal”— y sea $Y$ la variable observada o proxy utilizada para entrenar un algoritmo —por ejemplo, “historial de pagos atrasados” o “arrestos previos”—. El sesgo de medición ocurre cuando la relación entre $Y^*$ e $Y$ no es invariante respecto a subgrupos demográficos o sociales $S$:

$$
\mathbb{P}(Y \mid Y^*, S = s_1) \neq \mathbb{P}(Y \mid Y^*, S = s_2)
$$

Si en una sociedad existe una vigilancia policial selectiva sobre ciertos barrios, la variable “arrestos previos” ($Y$) estará sobrerrepresentada en dichos sectores a igualdad de conducta delictiva real ($Y^*$). Un algoritmo predictivo que optimice $\mathbb{E}[Y \mid X]$ no aprenderá la criminalidad real, sino los patrones sistemáticos de patrullaje histórico. Al automatizar la concesión de fianzas o créditos basados en este proxy, el modelo petrifica y enmascara un sesgo social bajo un halo de objetividad matemática.

* * *

### 4\. Sociología del número: Alain Desrosières y la estadística de Estado

La dimensión política de la cuantificación fue ampliamente analizada por el sociólogo e historiador Alain Desrosières —administrador del INSEE (el instituto estadístico francés) y miembro del Groupe de sociologie politique et morale de la EHESS/CNRS— en _La politique des grands nombres: histoire de la raison statistique_ (1993), obra que, como el propio título en francés deja más claro que su traducción habitual, rastrea la génesis histórica del término _estadística_, ligado indisolublemente a la raíz _status_ —la ciencia del Estado— ([reseña bibliográfica del libro, Éditions La Découverte](https://www.editionsladecouverte.fr/la_politique_des_grands_nombres-9782707165046)).

Desrosières plantea que cuantificar es un acto de dos momentos fundamentalmente distintos, resumidos en la fórmula que resume mejor todo su programa intelectual —”convenir, mesurer, quantifier” (“convenir, medir, cuantificar”)—, retomada explícitamente en su obra póstuma _Prouver et gouverner_ (2014) ([Éditions La Découverte, reseña de _Prouver et gouverner_](https://www.editionsladecouverte.fr/prouver_et_gouverner-9782707178954)):

1.  **Convenir** (establecer la convención): acordar, definir, codificar y crear categorías comunes. Es una decisión política, social y conceptual previa a cualquier cómputo.
2.  **Medir** (realizar el cálculo): contar, codificar e integrar conforme a las reglas fijadas en la convención. Es una operación técnica y aritmética.

El error fetichista consiste en borrar el primer momento —convenir— y presentar el resultado del segundo —medir— como una realidad objetiva e inmutable, previa e independiente de cualquier decisión humana.

**La creación de realidades institucionales**. Las estadísticas oficiales no son meros espejos que reflejan la sociedad; son la condición de posibilidad de las políticas públicas. El ejemplo del desempleo que el ensayo original menciona está, en efecto, bien documentado en la literatura que Desrosières mismo cita y con la que dialoga: el trabajo de Robert Salais, Nicolas Baverez y Bénédicte Reynaud, _L’invention du chômage: histoire et transformations d’une catégorie en France des années 1890 aux années 1980_ —un estudio específico sobre la construcción histórica de esa categoría estadística, referenciado explícitamente en los trabajos posteriores de Desrosières sobre el tema ([gemdev.org, “La politique des grands nombres aura bientôt 30 ans!”](https://www.gemdev.org/wp-content/uploads/2022/01/La-politique-des-grands-nombres-30-ans-Vf.pdf))—. Antes de la consolidación de esa categoría estadística homogénea, el “desempleado” no existía como tal; existían individuos pobres, vagabundos o simplemente “sin trabajo” en un sentido mucho más heterogéneo y menos administrable. La creación de la categoría “población económicamente activa desocupada” permitió, precisamente por volver comparables y agregables situaciones antes dispersas, la articulación del Estado de Bienestar y los subsidios de desempleo modernos.

**Estandarización y poder**. La imposición de un marco de cuantificación por parte del Estado nacional homologa realidades locales heterogéneas, permitiendo el control a distancia y la centralización administrativa. Lo que no se cuantifica según los códigos del Estado se vuelve, en un sentido literal y no metafórico, administrativamente invisible: no puede ser objeto de política pública porque no existe en el lenguaje —el de los números oficiales— en el que las políticas públicas se formulan y se evalúan.

* * *

### 5\. Conclusión: hacia una práctica estadística reflexiva

La estadística no se reduce a una colección de algoritmos abstractos sobre espacios de probabilidad estériles, ni tampoco a una simple herramienta de persuasión política. Es una disciplina puente: una praxis cuantitativa que une el rigor axiomático de las matemáticas con las complejidades cambiantes de la realidad social y natural — y, en ese sentido, comparte con el ciclo PPDAC de la Sección 1 la misma estructura de fondo: ningún dato es el punto cero neutral desde el que arranca la indagación, porque la propia decisión de qué contar y cómo contarlo —el “Problema” del PPDAC, el “convenir” de Desrosières— ya es, en sí misma, una toma de posición teórica y política.

Aceptar la naturaleza hermenéutica del dato implica adoptar una estadística reflexiva: reconocer que todo número publicado es el resultado de un marco de convenios, simplificaciones teóricas e instrumentos de medición; explicitar de manera sistemática las limitaciones de las variables proxy y las incertidumbres estructurales asociadas a los modelos; y asumir que la objetividad estadística no radica en la pretensión de una neutralidad imposible, sino en la transparencia total del proceso mediante el cual las preguntas abstractas se transformaron en números y las evidencias numéricas en decisiones humanas.

* * *

### Fuentes citadas

-   [Éditions La Découverte — reseña de _La politique des grands nombres_ (1993)](https://www.editionsladecouverte.fr/la_politique_des_grands_nombres-9782707165046)
-   [Éditions La Découverte — reseña de _Prouver et gouverner_ (obra póstuma, 2014), con la fórmula “convenir, mesurer, quantifier”](https://www.editionsladecouverte.fr/prouver_et_gouverner-9782707178954)
-   [gemdev.org — “La politique des grands nombres aura bientôt 30 ans!” (contexto y referencia a Salais, Baverez y Reynaud sobre la invención del desempleo)](https://www.gemdev.org/wp-content/uploads/2022/01/La-politique-des-grands-nombres-30-ans-Vf.pdf)
-   [Digital Humanities Quarterly — Drucker, J. (2011), “Humanities Approaches to Graphical Display” (fuente de la distinción _data_/_capta_)](https://www.digitalhumanities.org/dhq/vol/5/1/000091/000091.html)
