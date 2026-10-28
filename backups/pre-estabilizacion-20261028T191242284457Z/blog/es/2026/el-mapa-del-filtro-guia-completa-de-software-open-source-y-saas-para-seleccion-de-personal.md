---
title: "El mapa del filtro: Guía completa de software open source y SaaS para selección de personal"
date: 2026-08-29
slug: "el-mapa-del-filtro-guia-completa-de-software-open-source-y-saas-para-seleccion-de-personal"
translation_key: "el-mapa-del-filtro-guia-completa-de-software-open-source-y-saas-para-seleccion-de-personal"
lang: "es"
categories: ["Sistemas"]
tags: ["Reclutamiento","recursos humanos"]
---

Cualquiera que haya buscado “software para selección de personal” en los últimos años sabe lo que encuentra: un archipiélago de landing pages, cada una prometiendo resolver un problema distinto —tests, entrevistas, matching, agenda— sin que exista, en ningún lado, una página que junte el panorama completo. Esa dispersión no es casual: cada proveedor vive de que el comprador no compare, y los directorios que sí comparan suelen ser generados automáticamente para SEO, sin criterio editorial. Esta nota intenta ser lo que falta: un mapa, ordenado por función, de las herramientas que hoy se usan para automatizar tramos del proceso de selección, y de las alternativas que existen para no depender de ellas.

Conviene separar dos universos que casi nunca se muestran juntos. Por un lado, el software comercial: SaaS pagos, con soporte, integraciones y —cada vez más— capas de inteligencia artificial vendidas como diferencial competitivo. Por otro, el software libre y autoalojable: proyectos que uno puede instalar en su propio servidor, auditar el código, y no depender de que una empresa de Silicon Valley decida un día subir el precio o discontinuar el producto. La primera tabla cubre el primer universo; la segunda, el segundo. Juntas dan una idea bastante completa de qué es técnicamente posible hoy en la automatización del reclutamiento —y de cuánto de esa automatización queda, inevitablemente, en manos de terceros.

## 1\. El ecosistema comercial

Esta tabla agrupa las categorías más consolidadas del mercado SaaS de _HR tech_: evaluación de habilidades, simulaciones de trabajo real, gamificación, psicometría, búsqueda y matching asistido por IA, entrevistas automatizadas, verificación de referencias y antecedentes, CRM de talento y coordinación de agenda. La mayoría de estos productos se vende por asiento o por proceso, y varios —HireVue, Eightfold, SHL— llevan más de una década en el mercado, lo que los hace opciones probadas pero también más caras y más rígidas en cuanto a qué datos del candidato terminan procesando y dónde.

Uso en selección

Herramienta

Qué hace

URL

Pruebas online de habilidades

**TestGorilla**

Tests de conocimientos, razonamiento, idiomas, programación, etc. Permite crear evaluaciones específicas para un puesto.

[https://www.testgorilla.com/](https://www.testgorilla.com/)

Simulaciones / muestras de trabajo

**Vervoe**

Hace que el candidato resuelva tareas similares a las reales: Excel, programación, presentaciones, respuestas en video, etc.

[https://vervoe.com/](https://vervoe.com/)

Assessment virtual

**Talview**

Evaluaciones remotas, entrevistas y procesos de selección virtuales.

[https://info.talview.com/campus-recruitment](https://info.talview.com/campus-recruitment)

Gamificación / evaluación mediante tareas

**Arctic Shores**

Utiliza tareas interactivas en lugar de los cuestionarios tradicionales para observar comportamientos y capacidades.

[https://www.arcticshores.com/](https://www.arcticshores.com/)

Pruebas psicométricas

**SHL**

Aptitudes cognitivas, personalidad, razonamiento y competencias. Ofrece más de mil instrumentos de evaluación.

[https://shl.pt/es/instrumentos-de-assessment/](https://shl.pt/es/instrumentos-de-assessment/)

IA para búsqueda y preselección de candidatos

**Eightfold AI**

Analiza habilidades y perfiles para identificar candidatos potencialmente adecuados.

[https://eightfold.ai/products/talent-acquisition/](https://eightfold.ai/products/talent-acquisition/)

Matching candidato–puesto

**Demo de matching de Eightfold**

Permite cargar un CV para hacer _job matching_ en vivo.

[https://app.eightfold.ai/careers/home?domain=eightfolddemo-skumpatla.com](https://app.eightfold.ai/careers/home?domain=eightfolddemo-skumpatla.com)

Entrevista con IA

**HireVue AI Interviewer**

Realiza entrevistas automatizadas para una primera etapa de selección y entrega información al reclutador.

[https://www.hirevue.com/platform/ai-interviewer](https://www.hirevue.com/platform/ai-interviewer)

Entrevista estructurada automática

**TestGorilla AI Interviews**

Entrevistas por video, audio y avatar con las mismas preguntas y criterios para todos los candidatos.

[https://www.testgorilla.com/](https://www.testgorilla.com/)

Verificación de referencias

**Xref**

Envía automáticamente cuestionarios a las referencias laborales y genera informes comparables.

[https://www.xref.com/solutions/reference-checking](https://www.xref.com/solutions/reference-checking)

Verificación de antecedentes

**Xref**

Además de referencias, ofrece verificaciones de antecedentes laborales.

[https://www.xref.com/](https://www.xref.com/)

Talent CRM / banco de candidatos

**Beamery**

Mantiene una base de potenciales candidatos, construye _talent pools_ y permite recuperar candidatos anteriores.

[https://beamery.com/platform/talent-acquisition/talent-crm/](https://beamery.com/platform/talent-acquisition/talent-crm/)

Automatización de agenda de entrevistas

**GoodTime**

Solicita disponibilidad y coordina automáticamente horarios entre candidatos y entrevistadores.

[https://www.goodtime.io/](https://www.goodtime.io/)

Lo que se observa al leer la tabla en conjunto es que el proceso de selección ya está, en la práctica, descompuesto en microtareas delegables a un proveedor distinto para cada una: filtrar por habilidad, simular el puesto, medir personalidad, rankear CV, entrevistar sin humano de por medio, chequear el pasado del candidato, guardar el histórico y hasta coordinar el calendario. Ninguna empresa mediana necesita las trece categorías a la vez, pero el mercado ya ofrece una pieza de software para cada eslabón de la cadena, lo cual dice bastante sobre hacia dónde va la industria: menos criterio humano puntual, más infraestructura continua de evaluación.

## 2\. La alternativa open source y self-hosted

El costado abierto del mismo problema es mucho menos conocido, en parte porque no tiene presupuesto de marketing y en parte porque exige más trabajo de implementación: no es “contratar un SaaS”, es levantar y mantener infraestructura propia. A cambio, ofrece algo que ningún producto comercial da por defecto: control total sobre dónde vive el dato del candidato, posibilidad de auditar el código que decide quién avanza en un proceso, y costo marginal cercano a cero una vez instalado.

Esta segunda tabla no es una lista de sustitutos uno a uno de la primera —sería ingenuo pensar que un proyecto de pocos colaboradores en GitHub iguala una década de HireVue—, sino un stack: ATS de base, herramientas de matching y evaluación técnica, videoconferencia e infraestructura de audio y video propias, transcripción y modelos de lenguaje corriendo en servidores propios, y almacenamiento compatible con S3 para todo lo que el proceso vaya generando.

Función

Software

Qué permite hacer

Lenguaje / Stack

URL

ATS / seguimiento de candidatos

**OpenCATS**

Gestión de candidatos, puestos, contactos, búsquedas y etapas del proceso de selección.

PHP + MySQL

[https://www.opencats.org/](https://www.opencats.org/)

ATS moderno con IA

**Vekt**

Publicación de puestos, recepción de CV, scoring, ranking, screening y gestión de candidatos.

No especificado en el repo

[https://github.com/Behnoudmst/vekt](https://github.com/Behnoudmst/vekt)

ATS con entrevistas y evaluación

**OpenATS**

Gestión de candidatos, pipeline, entrevistas, evaluaciones, parsing y scoring de CV.

TypeScript/Node.js (Drizzle, PostgreSQL, Redis) + Next.js

[https://github.com/chamals3n4/OpenATS](https://github.com/chamals3n4/OpenATS)

Matching CV–puesto

**SkillAI**

Comparación de CV con requisitos de puestos y ranking automático de candidatos.

TypeScript, self-hosted, GPL-3 (usa APIs de Claude/Gemini)

[https://github.com/olafkfreund/SkillAi](https://github.com/olafkfreund/SkillAi)

Entrevistas con IA

**OpenInterview**

Entrevistas, grabación, transcripción, scoring, revisión humana y auditoría.

No especificado en el repo

[https://github.com/ildrm/open-source-ai-interview-platform](https://github.com/ildrm/open-source-ai-interview-platform)

Evaluaciones técnicas

**SignalLoop**

Creación de ejercicios, pruebas prácticas y evaluación de candidatos técnicos.

No especificado en el repo

[https://github.com/signalloop-ai/signalloop](https://github.com/signalloop-ai/signalloop)

Plataforma integral de reclutamiento

**Emp Recruit**

ATS, entrevistas, agenda, scorecards, evaluaciones, ofertas y videollamadas.

No especificado en el repo (suite EmpCloud)

[https://github.com/EmpCloud/emp-recruit](https://github.com/EmpCloud/emp-recruit)

RRHH + reclutamiento

**Frappe HR / ERPNext**

Puestos, candidatos, entrevistas, ofertas, onboarding y administración de RRHH.

Python (framework Frappe) + JavaScript, MariaDB/MySQL

[https://github.com/frappe/hrms](https://github.com/frappe/hrms)

Videoentrevistas

**Jitsi Meet**

Videoconferencias y entrevistas sin depender de Teams, Zoom o Meet.

JavaScript/React + Java (Videobridge/Jicofo)

[https://github.com/jitsi/jitsi-meet](https://github.com/jitsi/jitsi-meet)

Infraestructura de video

**LiveKit**

Audio y video en tiempo real para construir entrevistas o assessment propios.

Go (servidor) + SDKs cliente

[https://github.com/livekit/livekit](https://github.com/livekit/livekit)

Transcripción de entrevistas

**Whisper**

Conversión local de audio y video a texto.

Python (PyTorch)

[https://github.com/openai/whisper](https://github.com/openai/whisper)

Transcripción rápida local

**faster-whisper**

Implementación optimizada de Whisper para servidores propios.

Python (CTranslate2)

[https://github.com/SYSTRAN/faster-whisper](https://github.com/SYSTRAN/faster-whisper)

IA local

**Ollama**

Ejecutar modelos de lenguaje localmente para análisis de CV, entrevistas o textos.

Go

[https://github.com/ollama/ollama](https://github.com/ollama/ollama)

Servidor de modelos IA

**vLLM**

Servir modelos LLM localmente con alto rendimiento.

Python (PyTorch/CUDA)

[https://github.com/vllm-project/vllm](https://github.com/vllm-project/vllm)

Almacenamiento de CV y videos

**MinIO**

Almacenamiento de documentos, CV, grabaciones y evidencias compatible con S3.

Go

[https://github.com/minio/minio](https://github.com/minio/minio)

Vale una aclaración de método: para tres proyectos —Vekt, OpenInterview y SignalLoop— y para el módulo de reclutamiento de la suite EmpCloud, no encontré documentación pública confiable sobre su stack técnico específico; son repositorios chicos, con poca visibilidad, y prefiero dejarlo marcado como “no especificado” antes que inventar un dato.

## 3\. Lo que queda afuera de las dos tablas

Ninguna de las dos listas resuelve la pregunta de fondo, que no es técnica sino de gobernanza: quién decide con qué criterio avanza un candidato cuando ese criterio está codificado en un modelo entrenado por un tercero. El software comercial ofrece velocidad y soporte a cambio de opacidad —rara vez se sabe qué pesa el modelo de HireVue o de Eightfold para descartar a alguien—. El stack open source ofrece lo inverso: control y auditabilidad a cambio de la carga de mantenerlo, parchearlo y, sobre todo, de definir uno mismo las reglas de scoring que antes venían prearmadas en la caja negra del proveedor. Ese segundo trabajo —decidir qué mide cada evaluación y por qué— es el que ningún software, propietario o libre, hace por quien contrata.
