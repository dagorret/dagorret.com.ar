---
title: "La filosofía que hacen los ingenieros sin llamarla así"
date: 2026-10-13
slug: "la-filosofia-que-hacen-los-ingenieros-sin-llamarla-asi"
translation_key: "la-filosofia-que-hacen-los-ingenieros-sin-llamarla-asi"
lang: "es"
categories: ["Filosofía"]
tags: ["Epistemologia","Ingeniería","Interpretabilidad","Ley de Goodhart"]
---

_Tercera parte de una serie de tres sobre el trabajo real dentro de la inteligencia artificial. La primera describe [el galpón de la IA: fábrica e investigación](https://dagorret.com.ar/el-galpon-de-la-ia-fabrica-e-investigacion/); la segunda, [lo que hacen los filósofos en la IA](https://dagorret.com.ar/lo-que-hacen-los-filosofos-en-la-ia/)._

En la imagen habitual, el filósofo hace preguntas y el ingeniero resuelve problemas. Mirando de cerca la última década de la inteligencia artificial, esa división no resiste. Varios de los debates técnicos centrales del campo son, en buena medida, problemas filosóficos, aunque se publiquen en arXiv, se formulen con ecuaciones y los discutan personas que nunca tomaron un curso de epistemología. Esta tercera parte recorre ese corazón técnico del galpón y lo que tiene de filosofía sin nombre.

## El oficio en la fábrica

Conviene empezar por lo que no es filosofía. La mayor parte del trabajo de ingeniería en la industria es construir y operar: ingeniería de datos a escala de petabytes, infraestructura de entrenamiento distribuido, post-entrenamiento y operaciones de etiquetado, ingeniería de evaluaciones, inferencia eficiente, seguridad operativa, integración en productos. En la [primera parte](https://dagorret.com.ar/el-galpon-de-la-ia-fabrica-e-investigacion/) describí esa cadena. Su exigencia central es la confiabilidad: que un sistema de una complejidad enorme funcione todos los días, con fallas constantes de hardware, con millones de usuarios y con costos que se miden en cientos de millones de dólares.

Ese oficio es ingeniería en el sentido más clásico, y su valor no depende de ninguna reflexión filosófica. Pero es también el lugar donde se toman, a menudo sin advertirlo, decisiones que tienen consecuencias normativas: qué datos se incluyen y cuáles no, qué métrica define el éxito de una evaluación, qué umbral activa un filtro de seguridad. Cada una de esas decisiones es un juicio de valor disfrazado de parámetro.

## Los hitos de la investigación

El laboratorio de la última década tiene pocos hitos teóricos, y muy concretos.

La arquitectura [Transformer](https://arxiv.org/abs/1706.03762) (Vaswani et al., 2017) es la base de casi todo lo que vino después. Su idea central, el mecanismo de atención, permite que cada palabra de un texto se relacione directamente con todas las demás, y se paraleliza muy bien en el hardware disponible. Esta última propiedad, más prosaica, explica tanto su éxito como la primera.

Las [leyes de escala](https://arxiv.org/abs/2001.08361) (Kaplan et al., 2020) mostraron que el rendimiento de estos modelos mejora de manera predecible, siguiendo leyes de potencia, cuando se aumentan los parámetros, los datos y el cómputo. Dos años después, [Chinchilla](https://arxiv.org/abs/2203.15556) (Hoffmann et al., 2022) corrigió la proporción óptima entre tamaño del modelo y cantidad de datos: los modelos de entonces estaban subentrenados. Richard Sutton había resumido el espíritu de época en [_The Bitter Lesson_](http://www.incompleteideas.net/IncIdeas/BitterLesson.html) (2019): a largo plazo, los métodos generales que aprovechan el aumento del cómputo les ganan a los que intentan codificar conocimiento humano. Es una lección amarga para quien dedicó su carrera a esto último, y una tesis epistemológica fuerte sobre la relación entre conocimiento y búsqueda.

El aprendizaje por refuerzo con preferencias humanas ([Christiano et al., 2017](https://arxiv.org/abs/1706.03741); [InstructGPT](https://arxiv.org/abs/2203.02155), 2022) convirtió modelos que predicen texto en asistentes que siguen instrucciones. Más recientemente, el cómputo en tiempo de inferencia, que deja al modelo [razonar durante más tiempo](https://openai.com/index/learning-to-reason-with-llms/) antes de responder, abrió un segundo eje de escalamiento.
