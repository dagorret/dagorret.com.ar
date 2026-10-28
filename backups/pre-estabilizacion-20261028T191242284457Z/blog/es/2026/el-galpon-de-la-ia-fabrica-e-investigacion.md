---
title: "El galpón de la IA: fábrica e investigación"
date: 2026-10-13
slug: "el-galpon-de-la-ia-fabrica-e-investigacion"
translation_key: "el-galpon-de-la-ia-fabrica-e-investigacion"
lang: "es"
categories: ["Filosofía"]
tags: ["Automatización","Inteligencia Artificial","s","Trabajo","Universidad"]
---

_Primera parte de una serie de tres sobre el trabajo real dentro de la inteligencia artificial. La segunda trata de [lo que hacen los filósofos](https://dagorret.com.ar/lo-que-hacen-los-filosofos-en-la-ia/); la tercera, de [la filosofía que hacen los ingenieros sin llamarla así](https://dagorret.com.ar/la-filosofia-que-hacen-los-ingenieros-sin-llamarla-asi/)._

La conversación pública sobre inteligencia artificial y trabajo tiene un vicio de origen: habla de “las empresas de IA” como si fueran un único lugar donde todos hacen más o menos lo mismo. Sobre esa simplificación se montan después todas las demás. Que los programadores van a desaparecer, que las humanidades vuelven a estar de moda, que los laboratorios contratan filósofos mientras las universidades dejan de formarlos. Cada una de esas frases puede contener algo de verdad, pero ninguna se puede evaluar si antes no se abre la puerta del costado y se mira qué pasa adentro del galpón.

Lo que se ve al abrirla es que no hay un galpón sino dos, con lógicas de trabajo distintas, perfiles distintos y riesgos distintos. Uno es una fábrica. El otro es un laboratorio de investigación. Confundirlos produce casi todos los malentendidos sobre quién hace falta, quién sobra y qué debería enseñar una universidad.

## La fábrica

Un modelo de lenguaje grande es, antes que nada, un producto industrial. Su fabricación tiene una cadena reconocible, y cada eslabón es un oficio.

El primero son los datos. Antes de entrenar hay que reunir, deduplicar, filtrar y limpiar cantidades de texto, código e imágenes que se miden en billones de palabras. Hay que documentar de dónde viene cada cosa, qué licencia tiene, qué contenido debe excluirse y qué sesgos arrastra. Es ingeniería de datos a una escala que pocas industrias conocen, y es un trabajo menos visible que decisivo: buena parte de la calidad de un modelo se decide acá, mucho antes de cualquier algoritmo.

El segundo es el entrenamiento previo. Un modelo de frontera se entrena durante semanas o meses en clústeres de miles de procesadores gráficos que funcionan como una sola máquina. El problema cotidiano de ese trabajo no es teórico. En un clúster de ese tamaño algo se rompe todos los días: un procesador, un enlace de red, un disco. El oficio consiste en que el entrenamiento sobreviva a esas fallas, que los puntos de control permitan retomar sin perder semanas de cómputo y que cada hora de máquina rinda lo que cuesta. Se parece más a operar una red eléctrica que a escribir una aplicación.

El tercero es el post-entrenamiento. El modelo que sale del entrenamiento previo predice texto, pero no sabe todavía comportarse como un asistente. Para eso se lo ajusta con preferencias humanas o de otros modelos, se entrenan modelos de recompensa y se organizan operaciones de etiquetado que suelen involucrar a miles de contratistas. Es la etapa donde el comportamiento del sistema se moldea de manera más directa, y por eso es también donde las decisiones normativas, qué debe hacer y qué no, se convierten en datos.

El cuarto son las evaluaciones. Hay que medir qué sabe hacer el modelo, dónde falla, qué capacidades peligrosas podría tener y cómo reacciona ante quien intenta forzarlo. Las baterías de pruebas, las pruebas adversarias y las evaluaciones de riesgo forman una disciplina en sí misma, con un problema epistemológico de fondo que retomaré en la tercera parte: medir bien es mucho más difícil de lo que parece.

El quinto es la inferencia, es decir, servir el modelo a millones de usuarios con una latencia aceptable y un costo que no funda a la empresa. Cuantización, procesamiento por lotes, cachés, enrutamiento, monitoreo, clasificadores de seguridad que filtran entradas y salidas, respuesta a incidentes. Y después la integración en productos: búsqueda en documentos, agentes que usan herramientas, interfaces, seguridad informática.

w
