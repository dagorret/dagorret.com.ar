---
title: "Graph Engineering: El arte de convertir una IA en un equipo de producción"
date: 2026-08-26
slug: "quien-pone-las-reglas-el-viejo-problema-detras-del-trabajador-de-plataforma"
translation_key: "quien-pone-las-reglas-el-viejo-problema-detras-del-trabajador-de-plataforma"
lang: "es"
categories: ["Inteligencia Artificial"]
tags: ["Acreditación curricular","Certificación laboral","Precarización docente","Reforma universitaria","Tasa de graduación"]
---

La mayoría de los usuarios utiliza la inteligencia artificial como si fuera una conversación telefónica: escriben un mensaje, esperan la respuesta, corrigen sobre la marcha y repiten. El problema de este flujo lineal es que el contexto del modelo se satura rápidamente, la memoria falla y la tasa de error se dispara. La solución a este techo de rendimiento no requiere modelos más grandes, sino una arquitectura diferente: Graph Engineering (Ingeniería de Grafos).

## El techo del chat lineal

Todo modelo de lenguaje sufre el mismo problema estructural a medida que una conversación se extiende: la llamada degradación por “lost in the middle”, el fenómeno por el cual la información ubicada en el centro de un contexto largo pierde peso frente a lo que está al principio y al final. Cuantas más vueltas de ida y vuelta acumula un chat —más herramientas invocadas, más correcciones sobre la marcha, más resultados intermedios pegados en el medio de la conversación—, más crece la probabilidad de que el modelo pierda una directiva temprana o mezcle el estado de dos tareas que en realidad eran independientes. No es un defecto de un modelo en particular: es una consecuencia de pedirle a una sola ventana de contexto que cargue con todo el historial de un proyecto entero.

La respuesta obvia —”pedile más despacio, con más detalle”— tiene un techo bajo. El problema no es la calidad del prompt individual, sino la arquitectura del flujo: un agente conversacional lineal solo puede hacer una cosa a la vez, y cada cosa que hace queda contaminada por todo lo que hizo antes en la misma sesión.

## ¿Qué es el Graph Engineering?

En lugar de delegar un proyecto entero a un solo agente conversacional, esta metodología estructura el trabajo como una red orientada (Directed Acyclic Graph o DAG). El proceso se compone de tres elementos fundamentales: los nodos, unidades de trabajo individuales y aisladas —un agente, una entrada, una salida—; los bordes (edges), que representan la dependencia real donde la salida de un nodo es indispensable para la entrada del siguiente; y el grafo en sí, el flujo completo donde múltiples nodos independientes se ejecutan simultáneamente en paralelo.

La diferencia con un pipeline rígido tradicional es que el grafo no obliga a que todo se resuelva en secuencia. Solo se respeta el orden allí donde existe una dependencia real de datos; todo lo demás se libera para ejecutarse en paralelo. Esa distinción —entre dependencia real y dependencia heredada de la costumbre de escribir instrucciones una detrás de la otra— es, en el fondo, la que separa a un sistema eficiente de uno que solo aparenta estar organizado.

## Las cuatro etapas de ejecución de un grafo de agentes

Todo despliegue serio de este tipo atraviesa cuatro etapas. La primera es el _scope_ o alcance: un agente orquestador analiza la tarea y traza la red de dependencias. Acá la regla de oro es eliminar los “falsos bordes” —si el paso B no necesita leer el resultado del paso A, ambos deben ejecutarse al mismo tiempo, no en cadena—. Este es el momento en el que más se juega la eficiencia final del sistema: cada dependencia que se declara sin necesidad real le resta paralelismo al resto del grafo.

Superada esa fase entra el _fan-out_ o despliegue, donde se ejecutan múltiples agentes en paralelo para resolver tareas independientes. Ningún agente comparte contexto ni memoria con sus pares: esa separación es la que evita la contaminación de datos entre ejecuciones que, en teoría, no tienen nada que ver entre sí. Un agente que investiga un aspecto de un problema no debería arrastrar el razonamiento —ni los errores— de otro agente que está investigando un aspecto distinto.

La tercera etapa, la de _verification_, es la que distingue a un sistema robusto de uno cosmético: un agente independiente evalúa el trabajo de los agentes ejecutores. La regla acá es innegociable —nunca permitir que el mismo agente revise su propia salida—, porque los modelos tienden a sobrevalorar su propio texto entre un 10% y un 25%. Un verificador ciego al proceso que generó la respuesta juzga el resultado por sus propios méritos, no por la memoria de haberlo escrito.

Finalmente llega la _synthesis_, la prensa o merge: se recopilan las salidas ya verificadas en un reporte o archivo único, y el contexto intermedio —todo el ruido de las etapas anteriores— se descarta, dejando pasar solo la información validada. Es la etapa que convierte un conjunto de fragmentos correctos en un entregable coherente, y la que evita que el usuario final tenga que reconstruir a mano lo que el sistema ya verificó.

## El rendimiento real: Ley de Amdahl y el límite de los equipos

A pesar de que ejecutar 16 o 64 agentes en paralelo promete aceleraciones drásticas, el rendimiento total está limitado por la Ley de Amdahl:

$$
S = \frac{1}{(1-p) + \dfrac{p}{N}}
$$

Donde _p_ representa la proporción de trabajo paralelizable y _N_ el número de agentes. Si el 95% del trabajo es independiente (p = 0.95), desplegar 16 agentes no multiplica la velocidad por 16, sino por 9,14. El tiempo del proceso siempre estará atado al camino crítico: la cadena más larga de dependencias secuenciales imposibles de paralelizar.

Esta ley, formulada originalmente para el paralelismo en hardware, se traslada casi sin fricción al mundo de los agentes porque el cuello de botella es el mismo: no importa cuántos agentes sumes, el sistema completo nunca puede ir más rápido que su tramo más largo de pasos que dependen unos de otros. Agregar agentes ayuda a cubrir más terreno en paralelo, pero no acorta la cadena de razonamiento secuencial que ningún atajo puede saltar.

## Cuándo implementar un equipo de agentes y cuándo no

La evidencia empírica más sólida sobre este punto viene del estudio de Google DeepMind [“Towards a Science of Scaling Agent Systems”](https://arxiv.org/abs/2512.08296) (Kim et al., 2025), que evaluó 180 configuraciones de coordinación entre agentes cruzando cuatro benchmarks distintos —desde razonamiento financiero hasta planificación secuencial en Minecraft—. El hallazgo central es que el rendimiento de un equipo de agentes depende menos de la arquitectura elegida que del punto de partida: qué tan bien resuelve la tarea un solo agente antes de sumarle compañía.

Cuando ese agente único ya resuelve más del 45% del problema con un prompt directo, coordinar un equipo genera retornos negativos y dispara el costo en tokens sin necesidad. Pero cuando esa eficacia individual cae por debajo del 45% —el caso típico de auditorías masivas de código o investigaciones exhaustivas—, la arquitectura en grafo puede superar a la ejecución individual por márgenes enormes: en las tareas de razonamiento financiero del estudio, una topología centralizada llegó a superar al agente único en un 80,8%.

Ese mismo estudio muestra, sin embargo, que el beneficio no es parejo entre distintos tipos de tarea, y esa es quizás la lección menos citada del paper. En problemas de búsqueda y navegación web —donde la tarea consiste en localizar información dispersa en varias fuentes—, la mejora fue mucho más modesta y sensible a la topología elegida: una arquitectura descentralizada, con debate entre agentes, rindió mejor que una centralizada, que apenas se movió del rendimiento de un agente solo. En el otro extremo, en tareas de planificación estrictamente secuencial —donde cada paso depende del anterior sin margen para paralelizar—, ningún esquema multi-agente logró superar al agente único: todos degradaron el resultado, porque el costo de coordinación consumió presupuesto sin comprar ningún paralelismo real. La lección práctica es que la pregunta correcta no es “¿cuántos agentes necesito?” sino “¿esta tarea se puede partir en piezas verdaderamente independientes, o es una cadena que ningún reparto de trabajo puede acortar?”.

## Topologías: de la manada de agentes al orquestador

El paper de Kim et al. compara cinco esquemas de coordinación, y esa taxonomía es útil para diseñar un grafo real. Está el agente único, que resuelve todo en secuencia con el mínimo de fricción pero sin ningún paralelismo. Está el esquema independiente, donde varios agentes trabajan en paralelo sobre subtareas separadas y una síntesis final junta los resultados —fuerte para tareas de amplitud, como investigación o generación de ideas, débil cuando las piezas están íntimamente acopladas—. Está el esquema descentralizado, donde los agentes debaten en varias rondas y deciden por mayoría, lo cual mejora la robustez pero puede hacer que los errores se propaguen por el mismo canal que se usa para corregirlos si nadie controla la conversación. Está el esquema centralizado, con un orquestador único que coordina a un equipo de especialistas —la opción más estable a escala, porque contiene el ruido y limita la propagación de errores—. Y está el esquema híbrido, que combina orquestación central con intercambios puntuales entre pares, el más flexible pero también el más fácil de sobre-diseñar.

Un hallazgo curioso del mismo estudio, contraintuitivo a primera vista, es que en algunos equipos centralizados un orquestador de menor capacidad combinado con sub-agentes de alta capacidad puede superar a un equipo homogéneo de alta capacidad en toda su cadena. La explicación es que el orquestador solo necesita enrutar y sintetizar bien; la sustancia del trabajo la producen los ejecutores. La implicancia práctica para quien diseña un sistema con presupuesto limitado es clara: conviene invertir en la capacidad de los nodos que efectivamente hacen el trabajo, no necesariamente en la del nodo que reparte las tareas.

## El riesgo del sesgo en cascada

El mismo estudio de Kim et al. cuantifica el peligro de montar un equipo sin disciplina de coordinación: los llamados “bag of agents” —redes planas donde todos los agentes hablan entre sí sin jerarquía ni control— pueden amplificar sus errores hasta 17,2 veces respecto de un solo agente, porque las alucinaciones y los sesgos se retroalimentan en cada ronda de intercambio. Una arquitectura centralizada, con un orquestador que actúa como punto único de verificación, contiene esa propagación y la reduce a un factor de 4,4 veces.

Vale la pena remarcar por qué pasa esto: en una red sin jerarquía, cada agente trata las afirmaciones de sus pares como si fueran evidencia externa confiable, cuando en realidad son solo otra generación del mismo tipo de modelo, con los mismos puntos ciegos. Dos o tres agentes que coinciden en un error no lo vuelven más cierto; simplemente lo vuelven más difícil de detectar, porque ahora hay consenso aparente donde antes había una sola fuente de duda. El nodo de verificación centralizado rompe esa dinámica al no participar del consenso: su única función es medir la salida contra un criterio externo —una prueba, una especificación, un hecho verificable— y no contra lo que opinan los demás agentes.

## El costo real de un equipo de agentes

Un aspecto que casi nunca se discute cuando se habla de multiplicar agentes es el costo en tokens, y acá la intuición suele fallar. El costo total de un sistema multi-agente no crece solo con la cantidad de agentes que se despliegan, sino con la cantidad de rondas de coordinación —cuántas veces el orquestador reasigna tareas, cuántas rondas de debate se permiten, cuántos mensajes cruzan los agentes entre sí— multiplicada por el volumen de esos mensajes. En esquemas descentralizados o híbridos, donde los agentes conversan libremente entre ellos, ese costo de coordinación puede empezar a comportarse de forma cuadrática respecto de la cantidad de agentes, porque cada uno tiene que leer lo que dijeron todos los demás. La conclusión práctica es que escalar agentes solo vale la pena cuando la tarea gana más en paralelismo de lo que pierde en coordinación: para investigación o búsqueda independiente, el balance suele ser favorable; para razonamiento secuencial con dependencias fuertes, cada ronda extra de coordinación es presupuesto que se quema sin comprar nada.

## Un caso real: cómo lo está usando la industria

Este no es un ejercicio puramente teórico. El equipo de Cursor —la compañía detrás de un editor de código asistido por IA— documentó públicamente su experiencia coordinando grandes cantidades de agentes en tareas de semanas de duración, incluyendo la generación de un navegador web completo y la migración de una base de código entera de un framework a otro ([Cursor, 2026](https://cursor.com/blog/scaling-agents)). Su conclusión coincide con la teoría: un esquema jerárquico de planificador y ejecutores rindió mejor que un enjambre plano de agentes sin coordinación central, porque el planificador permite delegación controlada y trazabilidad de quién hizo qué. La analogía con un equipo humano real no es casual —como escribió Fred Brooks en _The Mythical Man-Month_ ya en 1975, sumar gente a un proyecto atrasado sin darle estructura organizativa no acelera nada, solo agrega reuniones—. Lo mismo vale, casi punto por punto, para un equipo de agentes.

## El paso siguiente

El paso clave para escalar el uso de modelos de lenguaje no radica en afinar prompts largos, sino en diseñar la red adecuada de dependencias: dividir el trabajo independiente, aislar las ejecuciones y validar cada entrega mediante un contexto totalmente limpio. La pregunta que separa a un sistema que rinde de uno que solo quema presupuesto no es cuántos agentes se despliegan, sino si la tarea que se les da realmente admite ser partida sin perder la cadena de razonamiento que la sostiene.
