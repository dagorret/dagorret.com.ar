---
title: "La higiene del archivo: qué pasa cuando los datos humanos dejan de ser humanos"
date: 2026-11-12
slug: la-higiene-del-archivo
translation_key: la-higiene-del-archivo
lang: es
categories:
  - Inteligencia artificial
tags:
  - model collapse
  - sanitización
  - diversidad lingüística
  - deriva acotada
---

*Este texto es la tercera parte de la serie que empezó con [«El mito del colapso digital»](/mito-colapso-digital/) y siguió con [«Evolución con memoria»](/evolucion-con-memoria/). Allá sostuve que el colapso de los modelos depende de un supuesto, el reemplazo de los datos humanos, y que con acumulación lo que queda es una deriva acotada. Acá examino qué pasa cuando el supuesto que se rompe es otro: que los datos humanos sigan siendo humanos.*

## Un correo que sale mejor

Una secretaria de departamento tiene que avisar que se mueve una mesa de examen. Escribe el correo como escribe todos: arranca con un «les cuento que», mete a mitad de camino un paréntesis que se le acaba de ocurrir y cierra con una frase medio torcida que en la facultad entiende cualquiera. Antes de mandarlo lo pega en el asistente y le pide que lo deje «más prolijo». Lo que vuelve es, sin discusión, un correo mejor, sin errores, ordenado y con dos líneas menos. También podría haber salido de cualquier oficina de cualquier universidad de habla hispana, y eso fue lo que me quedó dando vueltas.

Tomado de a uno, el asunto no tiene gravedad, y el correo cumple su función mejor que antes. Lo que me preocupa es la suma. Millones de textos nacen humanos, pasan por un filtro estadístico y terminan en la red, en los repositorios y en los archivos con la etiqueta de humanos. En la discusión sobre el *model collapse* esos son los datos «biológicos» o «reales», los que supuestamente protegen a los modelos de degradarse.

De ahí sale la pregunta de este texto. Si lo humano llega cada vez más prefiltrado por los mismos modelos que después se entrenan con eso, ¿sigue en pie lo que sostuve en «Evolución con memoria»? La respuesta rápida es que sí, porque el archivo original está guardado y nadie lo toca. Me parece una respuesta demasiado cómoda. Mi hipótesis es que el archivo resiste, pero pierde el aliado que lo hacía suficiente, y que el daño empezaría por los bordes de la distribución mucho antes de notarse en el promedio. Es una hipótesis sobre un mecanismo, no un diagnóstico confirmado, y al final digo qué habría que medir para ponerla a prueba.

## Tres operaciones con un mismo nombre

Bajo la palabra «sanitizar» se mezclan, en la conversación pública, por lo menos tres operaciones. Está la *corrección*, que quita lo que el propio autor reconocería como un error: la tilde que falta, la concordancia rota, el dato equivocado. Está la *normalización*, que lleva el texto a una norma escrita en algún lado, sea un manual de estilo o las convenciones de un registro formal. Y hay una tercera, más difusa, que voy a llamar *homogeneización*: acercar el texto a lo que es más probable en un corpus, sin que nadie haya decidido nunca que eso sea una norma.

Las dos primeras son viejas y tienen autor. Un corrector humano sabe qué está corrigiendo y, si se lo preguntan, lo justifica; a un manual de estilo uno lo puede leer, discutir y, llegado el caso, desobedecer. La tercera es nueva, al menos en su escala, y tiene un rasgo que me parece decisivo: trata igual a todos los desvíos. Para un modelo de lenguaje, una errata y un neologismo feliz son la misma cosa, secuencias poco probables. El «les cuento que» de la secretaria y un error de sintaxis comparten una sola propiedad, la de quedar lejos del centro de la distribución, y el filtro trabaja achicando esa distancia.

Lo que el asistente hizo con aquel correo, entonces, fue tirar del texto hacia la media, más que aplicarle una regla. De ahí sale la conjetura que para mí es el núcleo del asunto: la sanitización por modelos actuaría primero sobre la varianza. También mueve la media, porque introduce sesgos, pero su efecto más directo sería estrechar la dispersión de lo que la gente escribe.

Hay indicios experimentales de que esto ocurre. [Doshi y Hauser (*Science Advances*, 2024)](https://doi.org/10.1126/sciadv.adn5290) hicieron un experimento con escritores de cuentos breves y encontraron que quienes recibían ideas de un modelo escribían textos que los evaluadores juzgaban más creativos, pero también más parecidos entre sí. Los autores lo plantean como un dilema social: a cada escritor le conviene usar la herramienta, y el conjunto termina con un repertorio más angosto. El trabajo de [Agarwal, Naaman y Vashistha (CHI 2025)](https://doi.org/10.1145/3706598.3713564) va un paso más allá. Con sugerencias de autocompletado, participantes de la India empezaron a escribir de un modo más parecido al de los estadounidenses, al punto de describir sus propias comidas y fiestas con una mirada occidental. La homogeneización, además, empuja hacia algún lado.

## El ancla y su aliado

Repaso el modelo de «Evolución con memoria», que ya presenté como un modelo de juguete: datos gaussianos y un estimador que solo aprende media y varianza. [Shumailov y colegas (*Nature*, 2024)](https://doi.org/10.1038/s41586-024-07566-y) mostraron que si cada generación se entrena únicamente con lo que produjo la anterior, las colas desaparecen y el modelo degenera. Mi objeción, que va en la línea de [Gerstgrasser y colegas (2024)](https://doi.org/10.48550/arXiv.2404.01413), fue que ese resultado depende de que los datos se reemplacen. Si se acumulan y el corpus humano original se conserva, el error aleatorio de la media queda acotado por la serie de Basilea y la varianza no se va a cero. Lo que no se acota es el sesgo. Si cada generación sintética corre la media un poco, siempre en la misma dirección, la deriva crece como el logaritmo del número de generaciones, despacio y sin un techo que la detenga.

En ese esquema la única ancla es el corpus original, $X_0$. Tiene una debilidad que en aquel texto dejé sin decir: su peso relativo cae como $1/(t+1)$, porque cada generación suma un lote nuevo y el original queda cada vez más diluido. No se pierde, pero pesa cada vez menos.

Al modelo le faltaba algo que en el mundo real existe y que ahora tengo que poner sobre la mesa: los datos humanos frescos, que siguen llegando. La gente escribe, habla y publica todos los días, y una parte de eso entra en cada entrenamiento nuevo. Ese flujo es el aliado del ancla. El archivo viejo cuenta cómo era la distribución y el flujo fresco cómo es hoy, de modo que este último puede ir corrigiendo el sesgo que los modelos introducen.

La sanitización pega justo ahí. El corpus original sigue intacto en los discos; lo que se contamina es el flujo nuevo, que conserva la etiqueta de humano aunque ya llegue inclinado hacia lo que el modelo considera probable. Lo que cae es el supuesto de que el dato humano nuevo es independiente del modelo.

## La parte humana que cuenta

Para ver qué cambia le agrego dos parámetros al modelo. En cada generación entra al corpus un lote nuevo del mismo tamaño que los anteriores. Una fracción $h$ de ese lote es texto humano fresco y el resto, $1-h$, es sintético. El texto sintético hereda el error del modelo vigente más un sesgo propio, $\delta$. El texto humano sanitizado hereda una parte $\alpha$ de ese mismo error, donde $\alpha = 0$ corresponde a alguien que escribe sin pasar por el modelo y $\alpha = 1$ a alguien que solo firma lo que el modelo escribió.

Llamo $e_t$ a la distancia entre la media estimada en la generación $t$ y la media verdadera. El error medio del lote nuevo resulta proporcional al error que ya tenía el modelo más su sesgo:

$$
\varepsilon_t = \gamma\,(e_{t-1} + \delta), \qquad \gamma = 1 - h\,(1-\alpha)
$$

Como el corpus acumula todos los lotes junto con $X_0$, la media estimada es el promedio de todos ellos, y la recursión queda así:

$$
e_t = e_{t-1}\,\frac{t+\gamma}{t+1} + \frac{\gamma\,\delta}{t+1}
$$

Todo depende de una cantidad, $h(1-\alpha)$, que voy a llamar *fracción humana efectiva*. Mide cuánto de lo que escriben los humanos no pasó por el modelo, y eso, más que el volumen total de texto humano, es lo que protege al sistema. Hay dos situaciones posibles.

Si la fracción humana efectiva es cero, porque no hay datos frescos o porque los que hay están totalmente sanitizados, entonces $\gamma = 1$ y la recursión vuelve a ser la de «Evolución con memoria»: la deriva crece con la serie armónica, como $\delta \ln t$, sin techo. Para el modelo, un flujo humano completamente sanitizado equivale a no tener flujo humano.

Si la fracción humana efectiva es positiva, la deriva tiene un techo. Igualando $e_t$ y $e_{t-1}$ se obtiene el punto fijo:

$$
e^{*} = \frac{\gamma\,\delta}{1-\gamma} = \delta\,\frac{1 - h(1-\alpha)}{h(1-\alpha)}
$$

El techo existe, pero se aleja muy rápido a medida que crece la sanitización, porque depende de la inversa de la fracción humana efectiva. Además, el sistema se le acerca despacio, como una potencia de $t$ con exponente $-h(1-\alpha)$. En la tabla está la simulación de la recursión con $\delta = 1$ y un 30 % de texto humano en cada lote; la deriva se lee en unidades del sesgo $\delta$.

| Escenario | Fracción humana efectiva | Deriva a 10 generaciones | Deriva a 20 generaciones | Deriva a 10.000 generaciones | Techo |
| --- | --- | --- | --- | --- | --- |
| Humanos sin filtro ($\alpha = 0$) | 0,30 | 1,09 | 1,31 | 2,17 | 2,33 |
| Sanitización media ($\alpha = 0{,}5$) | 0,15 | 1,51 | 1,88 | 4,16 | 5,67 |
| Sanitización fuerte ($\alpha = 0{,}9$) | 0,03 | 1,91 | 2,48 | 7,50 | 32,3 |
| Sin datos frescos ($h = 0$) | 0 | 2,02 | 2,65 | 8,79 | sin techo |

Cuando hice la cuenta esperaba otra cosa. En el horizonte que importa en la práctica, unas pocas decenas de generaciones, la sanitización cambia la deriva bastante menos de lo que yo suponía: a las veinte generaciones pasa de 1,3 a 2,5 veces el sesgo. El efecto grande está en el techo, que sube de 2,3 a 32. En el corto plazo casi no se ve, y justamente por eso es fácil subestimarla.

Hay, de todos modos, una salida que no depende de cómo escriban los humanos. Si en vez de dejar que $X_0$ se diluya se le asigna un peso fijo $w$ en cada entrenamiento, la deriva queda acotada por $(1-w)\delta/w$ aunque el flujo humano esté sanitizado del todo. Un ancla con peso fijo cumple la misma función que el aliado fresco, le pone techo a la deriva, con una diferencia que no es menor: el aliado se puede perder sin que nadie lo decida, mientras que el peso del ancla lo fija alguien.


## Las colas pagan con interés

Hasta acá hablé de la media. Si la sanitización trabaja sobre todo en la dispersión, sin embargo, hay que mirar la varianza, y eso me obliga a corregir algo que escribí. En «Evolución con memoria» afirmé que con acumulación las colas no desaparecen. Es verdad bajo el supuesto que declaré entonces, que el error sintético es ruido de media cero también para la varianza. Si el modelo tiende a producir textos menos dispersos que los que aprendió, el supuesto se cae y la afirmación con él.

Que los modelos de lenguaje hacen eso es una suposición razonable, y vale la pena decir de dónde viene. Una parte sale de la inferencia: se los muestrea con temperaturas bajas y se los usa, precisamente, para «prolijar». Sospecho, de todos modos, que el motor principal está en el posentrenamiento. [Kirk y colegas (ICLR 2024)](https://doi.org/10.48550/arXiv.2310.06452) compararon las etapas del ajuste de un modelo y encontraron que el refuerzo con preferencias humanas (RLHF) reduce de manera significativa la diversidad de las salidas respecto del ajuste supervisado, en varias medidas distintas. Para mi argumento esto pesa, porque saca a la contracción del terreno de la pura estadística. Hay una función de recompensa que premia el tono neutro, cortés y seguro, y detrás de ella hay gente que decidió qué respuestas eran preferibles; lo preferible quedó cerca del centro. Formalizo esto con un factor $c$ menor que uno: el lote sintético reproduce la varianza del modelo multiplicada por $c$, que hace con la dispersión lo que $\delta$ hacía con la media. Llamo $r_t$ al cociente entre la varianza del modelo y la varianza humana verdadera. Con la misma estructura de lotes, el lote nuevo tiene un cociente de varianza

$$
q_t = h\,(1-\alpha) + \gamma\,c\,r_{t-1}
$$

y, si existe un flujo humano efectivo, el sistema se estabiliza en

$$
r^{*} = \frac{h\,(1-\alpha)}{1 - \gamma\,c}
$$

Con $c = 1$ la sanitización no le hace nada a la varianza y $r_t$ se queda en uno. Me interesa remarcarlo, porque ubica el problema en que los modelos achiquen la dispersión, y no en el simple hecho de que los humanos los usen. Con $c < 1$ y sin flujo humano efectivo, la varianza tiende a cero aun con acumulación, aunque lo hace despacio. Acumular frena el colapso de la varianza, pero no alcanza para impedirlo cuando hay un sesgo de contracción. Es la misma historia que con la media: lo que daña es el sesgo, y el volumen importa poco.

Por comodidad usé el mismo $\alpha$ para la media y para la varianza, como si quien pasa su texto por el modelo heredara en igual medida su sesgo y su contracción. Cuando alguien pide que un texto «quede más prolijo» no ocurre eso. El modelo respeta lo que el texto dice y aplana cómo lo dice, de modo que mueve poco la media y achica mucho la dispersión. Si se separan los dos parámetros, con uno mayor para la varianza, la fracción humana efectiva que protege las colas resulta menor que la que protege el promedio. Las tablas usan el mismo valor para las dos cosas, así que, si se equivocan, es por quedarse cortas en la pérdida de los bordes.

La cuenta se pone interesante en el paso de la varianza a las colas. En una gaussiana, la probabilidad de caer a $k$ desviaciones de la media decae como la exponencial del cuadrado de $k$ dividido por la varianza, y por eso una contracción moderada de la varianza produce una pérdida desproporcionada en los extremos:

$$
\frac{P_r(|Z|>k)}{P_1(|Z|>k)} \approx \sqrt{r}\,\exp\!\left(-\frac{k^{2}}{2}\left(\frac{1}{r}-1\right)\right)
$$

La tabla muestra la simulación con $c = 0{,}9$ y un 30 % de texto humano. La última columna mide cuánto queda de los eventos que en la distribución humana original estaban más allá de tres desviaciones (1 = intactos).

| Escenario | Varianza relativa a 20 generaciones | Varianza relativa límite | Colas a 20 generaciones | Colas en el límite |
| --- | --- | --- | --- | --- |
| Humanos sin filtro ($\alpha = 0$) | 0,88 | 0,81 | 0,51 | 0,32 |
| Sanitización media ($\alpha = 0{,}5$) | 0,83 | 0,64 | 0,37 | 0,06 |
| Sanitización fuerte ($\alpha = 0{,}9$) | 0,78 | 0,24 | 0,25 | prácticamente 0 |
| Sin datos frescos ($h = 0$) | 0,77 | tiende a 0 | 0,22 | 0 |

Con una varianza un 20 % más chica se pierden dos tercios de los eventos extremos; con una un 36 % más chica, el 94 %. El centro casi no se mueve y el texto promedio sigue pareciendo humano, mientras los bordes se van vaciando.

En el lenguaje, esos bordes son las palabras raras, los giros regionales, las sintaxis inesperadas, las metáforas que fallan nueve veces y aciertan una. Acá el argumento necesita más cuidado. Se le puede objetar, y con razón, que la novedad lingüística vive en combinaciones inéditas y en cambios de contexto más que en la cola de una distribución fija, y que los modelos recombinan muy bien: inventan metáforas aunque su repertorio se estreche. Acepto la objeción solo en parte. La gaussiana del modelo representa cualquier rasgo medible del texto, incluido el tipo de combinación que se elige, y no únicamente la frecuencia de las palabras. Además, un modelo recombina dentro de lo que él mismo considera plausible. Mi sospecha es que la novedad que corre peligro es la que necesita salir de ese espacio: un uso regional que todavía no figura en ningún corpus, un concepto que nadie nombró, un registro que solo existe en un barrio. Eso no se obtiene recombinando lo que ya está; entra desde afuera, por el flujo humano fresco. Si estoy en lo cierto, la sanitización no empobrece el lenguaje de una manera que se vea, y lo que hace es angostar la puerta por la que entraba lo que todavía no estaba.

## Limpia, fija y da esplendor

Dicho así, el argumento podría sonar a la nostalgia de siempre frente a una tecnología nueva. Hay una objeción más seria, que es histórica: la lengua escrita estuvo sanitizada desde siempre. La Real Academia Española se fundó en 1713 con un lema que dice, literalmente, «limpia, fija y da esplendor». La imprenta unificó ortografías, los diccionarios fijaron palabras y durante siglos los correctores de editorial quitaron de los textos lo que en este ensayo llamo colas. Si sanitizar destruyera la novedad, el castellano se habría congelado hace trescientos años, y sigue cambiando.

La objeción es buena y me obliga a precisar qué es lo nuevo. Encuentro tres diferencias, y me parece que ninguna es solo de grado.

Para empezar, la norma culta trabajaba sobre una capa del lenguaje, el registro formal escrito. Por debajo seguían la oralidad, la carta privada, la jerga y el habla de cada barrio, y de ahí salían las novedades que la norma terminaba aceptando años después. Traducido al modelo, eso es una fracción humana efectiva grande: la norma limpiaba un lote, pero el flujo fresco seguía entrando por otros lados. El filtro de ahora se mete en la escritura de todos los días, en el correo de la secretaria y en el mensaje al grupo de la familia. Y hay indicios de que tampoco se queda en lo escrito. [Yakura y colegas (2024)](https://doi.org/10.48550/arXiv.2409.01754) analizaron cientos de miles de charlas académicas en YouTube y episodios de podcasts, y encontraron un aumento brusco, después del lanzamiento de ChatGPT, de palabras que ese modelo prefiere, como *delve* o *meticulous*. Ese estudio mide muletillas y no pérdida de dispersión, así que no prueba que el habla se esté aplanando. Sí muestra que el canal oral no es impermeable al modelo, y que el refugio en la oralidad, que muchos dan por seguro, tiene filtraciones.

La segunda diferencia es que aquella norma estaba escrita. Un manual de estilo se puede leer, y uno sabe qué dice, puede discutirlo y puede desobedecerlo a sabiendas, como hicieron casi todos los escritores que valen la pena. El filtro estadístico no tiene texto. Su norma es lo probable, que nadie publica ni somete a debate, y es difícil rebelarse contra una regla que nadie formuló.

La tercera, que es la que más me importa, tiene que ver con el circuito. El corrector de editorial no aprendía de los textos que corregía; el modelo sí. Lo que sanitiza hoy vuelve mañana como dato de entrenamiento, con la etiqueta de humano, y esa es exactamente la estructura que formalicé más arriba, con $\alpha$ como canal de retorno. La norma académica le llegaba al corpus desde afuera, mientras que el filtro actual ya forma parte de él.

Queda otra objeción, más técnica, según la cual lo que se observa son modas léxicas, y las modas pasan. [Kobak y colegas (*Science Advances*, 2025)](https://doi.org/10.1126/sciadv.adt3813) estimaron, por el exceso de ciertas palabras, que al menos el 13,5 % de los resúmenes biomédicos de 2024 pasaron por un modelo, con subcorpus que llegan al 40 %. Puede ser que dentro de dos años nadie diga *delve*. El argumento de este ensayo, de todos modos, no se apoya en ninguna palabra en particular. Las palabras de moda son la parte visible de la sanitización porque se pueden contar, y la contracción de la varianza no deja marcas de ese tipo: a un texto con menos giros raros no le sobra ninguna palabra delatora. Tengo la impresión de que lo que hoy se mide es la punta y que lo importante está más abajo, aunque eso, por ahora, es una hipótesis.

## La varianza como bien común

Si el diagnóstico es correcto, importa menos saber si los modelos colapsan que saber quién cuida la dispersión. De ahí salen algunas consecuencias, de alcance bastante desigual.

Empiezo por el archivo anterior a la explosión de los modelos. Se suele decir que vale porque tiene «datos puros», y me parece una mala forma de plantearlo, porque ese archivo nunca fue puro: tenía sus sesgos, sus censuras y sus normas. Lo valioso es que se trata del único tramo del corpus donde $\alpha$ vale cero por construcción. Su independencia del modelo la garantiza la fecha, sin necesidad de ningún detector, y eso importa, porque los detectores de texto generado son poco confiables y lo van a ser cada vez más a medida que la gente escriba como los modelos. Con la fecha ese problema no existe.

Después hay una consecuencia de diseño, que sale directo de la cuenta anterior. Si el ancla se diluye, como pasa cuando cada generación simplemente suma datos, la protección del sistema queda en manos del flujo humano fresco, que es justamente lo que la sanitización degrada. Darle a $X_0$ un peso fijo en cada entrenamiento le pone a la deriva un techo que no depende de cómo escriban los humanos. Eso lo decide quien entrena los modelos, y tiene costos. Un peso grande para el archivo viejo vuelve al modelo más lento para aprender lo nuevo legítimo, y hay un problema más de fondo, que es que $X_0$ está congelado. No tiene palabras, conceptos ni referencias posteriores a su fecha, y la recursión de la media supone una media verdadera quieta, cosa que el mundo no cumple. Un ancla pesada puede sostener la estructura del lenguaje (la sintaxis, los registros, la dispersión), pero no puede seguir a un mundo que cambia. Lo nuevo en sentido semántico solo puede llegar por el flujo fresco, y con eso volvemos al principio.

Lo más incómodo es que una parte del problema no tiene arreglo técnico. El dilema que describieron Doshi y Hauser tiene forma de problema de bienes comunes. A cada persona le conviene pasar su texto por el modelo, porque sale mejor, más rápido y con menos riesgo de error. Cada uso individual le quita un poco de varianza al corpus colectivo, y ese costo no lo paga nadie en el momento. Mi opinión, y la marco como tal, es que la dispersión del lenguaje humano se está comportando como un recurso común que todos aprovechan y del que nadie se ocupa.

Queda la salida que a veces se propone, que es desplazarse hacia los datos físicos y multimodales. Ayuda menos de lo que parece. Los sensores y el video sin editar no pasan por un asistente de escritura, es cierto, pero el habla grabada ya muestra rastros del modelo, y lo que la gente dice frente a una cámara es cada vez más algo que antes escribió o preparó con ayuda. El mundo físico no tiene sesgo de modelo, pero los humanos que lo describen lo tienen cada vez más.

## Cómo se podría refutar

Conviene decir con todas las letras qué estatus tiene lo anterior. Es una hipótesis mecanística: muestra cómo podría operar el circuito y qué forma tendría el daño, pero no demuestra que la diversidad del lenguaje humano se esté perdiendo. Los estudios que cité muestran homogeneización en experimentos y contagio de vocabulario en corpus reales; ninguno mide todavía una contracción de la dispersión a escala. Para que la hipótesis valga algo tiene que poder fallar, y para eso sus dos parámetros, la fracción humana efectiva y la contracción $c$, tienen que dejar de ser supuestos del modelo de juguete y convertirse en cosas que se miden.

La dispersión se puede medir sobre corpus reales con indicadores que separen el centro de los bordes:

- **Léxico:** diversidad corregida por longitud (MTLD, proporción de n-gramas distintos) y proporción de palabras raras respecto de un corpus de referencia, que es la cola en sentido literal.
- **Sintaxis:** varianza del largo de las oraciones y variedad de estructuras de dependencia.
- **Semántica:** distancia promedio entre textos en un espacio de *embeddings* y proporción de textos alejados más de $k$ desviaciones del centro, que es lo más parecido a la segunda tabla de este ensayo.

La fracción humana efectiva no se puede observar texto por texto, pero se puede acotar desde dos lados. El exceso de vocabulario, a la manera de Kobak y colegas, da una cota inferior de cuánto de un corpus pasó por un modelo. Un experimento en el que las mismas personas escriben con asistente y sin él mide cuánto mueve cada uso la media y cuánto achica la varianza, y así separa los dos $\alpha$ que en el modelo uní por comodidad. Combinadas, las dos vías convierten $h(1-\alpha)$ en un rango estimado.

El diseño tiene que esquivar una trampa obvia: si el corpus de 2025 lo escribe gente distinta que el de 2021, cualquier cambio en la dispersión puede deberse a la composición y no al modelo. Por eso conviene comparar los mismos autores antes y después, y contrastar géneros con mucha adopción de asistentes (correos administrativos, resúmenes académicos) con otros donde casi no se usan (habla espontánea transcripta, chats informales). Un caso a mano son los resúmenes de las tesinas de grado de una facultad, comparando las cohortes de 2018 a 2022 con las de 2023 en adelante: el género es el mismo, el corpus suele ser público y el tamaño es manejable.

Lo que vuelve refutable a la hipótesis es que no predice solo «menos diversidad», que casi cualquier explicación predeciría. Predice una forma: la masa de las colas debería caer bastante más de lo que se mueve el centro, y el efecto debería ser mayor donde la adopción es mayor. Si corpus comparables, con la composición controlada, no muestran esa pérdida desproporcionada en los bordes, el argumento de este ensayo queda seriamente debilitado. Prefiero dejarlo escrito así, porque una tesis que no puede salir mal tampoco dice mucho.

## Un resumen de mí mismo

Este texto nació de un accidente menor. Un buscador con inteligencia artificial resumió «Evolución con memoria» y le atribuyó a «el modelo de Dagorret» cuatro tesis sobre la sanitización de datos humanos. Solo una salía de mi artículo; otra decía lo contrario de lo que escribí sobre las colas, y las otras dos eran razonables, pero no eran mías. Leído con los ojos de este ensayo, el resumen hizo lo mismo que describo: agarró un argumento algo raro y lo acercó a la lectura más probable de un artículo sobre *model collapse*, sin inventar nada absurdo. El circuito, además, no termina en el buscador. Aquel artículo, igual que este, lo escribí conversando con un modelo, y el resumen que lo deformó salió de otro. Mi texto entró al circuito con un $\alpha$ que no era cero, salió con uno mayor y ahora vuelve a entrar como respuesta. No sé cuánto vale mi $\alpha$, y sospecho que casi nadie que escriba hoy sabe cuánto vale el suyo.

No creo que haya que dejar de usar estas herramientas, del mismo modo que nadie dejó de usar diccionarios. Me queda otra pregunta, que no sé contestar: qué parte de lo que escribimos queremos que siga siendo improbable, y quién está dispuesto a pagar lo que cuesta que lo sea. Un correo prolijo le sirve a quien lo manda. Un lenguaje capaz de producir lo que todavía no existe nos sirve a todos, y por ahora nadie se está ocupando de él.

## Fuentes

- Agarwal, D., Naaman, M. y Vashistha, A. (2025). «AI Suggestions Homogenize Writing Toward Western Styles and Diminish Cultural Nuances». *CHI ’25*, ACM. [doi:10.1145/3706598.3713564](https://doi.org/10.1145/3706598.3713564)
- Doshi, A. R. y Hauser, O. P. (2024). «Generative AI enhances individual creativity but reduces the collective diversity of novel content». *Science Advances*, 10(28), eadn5290. [doi:10.1126/sciadv.adn5290](https://doi.org/10.1126/sciadv.adn5290)
- Gerstgrasser, M., Schaeffer, R., Dey, A. et al. (2024). «Is Model Collapse Inevitable? Breaking the Curse of Recursion by Accumulating Real and Synthetic Data». arXiv:2404.01413. [doi:10.48550/arXiv.2404.01413](https://doi.org/10.48550/arXiv.2404.01413)
- Kirk, R., Mediratta, I., Nalmpantis, C. et al. (2024). «Understanding the Effects of RLHF on LLM Generalisation and Diversity». *ICLR 2024*. [doi:10.48550/arXiv.2310.06452](https://doi.org/10.48550/arXiv.2310.06452)
- Kobak, D., González-Márquez, R., Horvát, E.-Á. y Lause, J. (2025). «Delving into LLM-assisted writing in biomedical publications through excess vocabulary». *Science Advances*, 11(27). [doi:10.1126/sciadv.adt3813](https://doi.org/10.1126/sciadv.adt3813)
- Shumailov, I., Shumaylov, Z., Zhao, Y., Papernot, N., Anderson, R. y Gal, Y. (2024). «AI models collapse when trained on recursively generated data». *Nature*, 631, 755–759. [doi:10.1038/s41586-024-07566-y](https://doi.org/10.1038/s41586-024-07566-y)
- Yakura, H., Lopez-Lopez, E., Brinkmann, L. et al. (2024). «Empirical evidence of Large Language Model’s influence on human spoken communication». arXiv:2409.01754. [doi:10.48550/arXiv.2409.01754](https://doi.org/10.48550/arXiv.2409.01754)

*Nota de método:* las dos tablas salen de iterar numéricamente las recursiones del texto. Los límites se calcularon con 10.000 generaciones para la media y 200.000 para la varianza. El modelo sigue siendo de juguete: gaussiano, con lotes de igual tamaño y sin el ruido de muestreo, que en «Evolución con memoria» ya estaba acotado. Tampoco incluye el término de separación de medias de la ley de la varianza total: si el lote humano y el sintético tienen medias distintas, la mezcla suma una dispersión entre grupos proporcional al cuadrado de esa diferencia. Lo omití para aislar el efecto de la contracción $c$. Incluirlo elevaría un poco la varianza calculada, pero esa dispersión adicional no es diversidad: es la huella del sesgo.

*Editado el 13 de noviembre de 2026 a las 9:00.*
