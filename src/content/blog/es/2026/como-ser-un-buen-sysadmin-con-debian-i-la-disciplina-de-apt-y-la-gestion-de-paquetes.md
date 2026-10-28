---
title: "Cómo ser un buen sysadmin con Debian (I): La disciplina de apt y la gestión de paquetes"
date: 2026-09-12
slug: "como-ser-un-buen-sysadmin-con-debian-i-la-disciplina-de-apt-y-la-gestion-de-paquetes"
translation_key: "como-ser-un-buen-sysadmin-con-debian-i-la-disciplina-de-apt-y-la-gestion-de-paquetes"
lang: "es"
categories: ["Sistemas","Tecnología"]
tags: ["Debian","Infraestructura","Matenimiento","Sysadmin"]
---

Hay un mito que circula en foros, en charlas de pasillo y, cada vez más, en las respuestas prolijas de cualquier IA generativa: que la estabilidad en administración de sistemas consiste en congelar un servidor y no tocarlo. Instalar, configurar, y después cruzar los dedos durante una década. El razonamiento implícito es tranquilizador — si no lo tocás, no se rompe — pero es exactamente al revés de cómo funciona el software en el mundo real.

Un sistema que no se toca durante diez años no está “estable”. Está acumulando una deuda técnica silenciosa que no se ve hasta el día en que se ve: se vence el soporte de la versión, falla el disco, hay que migrar a hardware nuevo, o aparece una CVE que nadie puede parchear sin romper media pila de dependencias congeladas en el tiempo. Ese día, la migración que debería haber sido un trámite de rutina se convierte en una reconstrucción completa, bajo presión, con el jefe preguntando cada media hora cuánto falta.

El verdadero arte de administrar Debian —y la razón por la que hay instalaciones de Debian corriendo ininterrumpidamente durante décadas, absorbiendo release tras release, sin una sola caída catastrófica— es exactamente lo opuesto: la migración incremental. Debian publica una nueva versión _stable_ cada dos años, aproximadamente. Ese ritmo no es un obstáculo burocrático, es una oportunidad. Cada release es una dosis pequeña y manejable de cambio. El sysadmin que aprovecha ese ritmo nunca enfrenta un salto de una década de una sola vez; siempre está absorbiendo el cambio en porciones digeribles.

Pero para que esa filosofía funcione en la práctica, hace falta disciplina diaria. No alcanza con “actualizar cuando hay tiempo”. Hace falta un protocolo, y ese protocolo empieza con el comando más subestimado del ecosistema Debian: `apt`.

## El flujo quirúrgico: update, upgrade, autoremove — y lo que se esconde detrás

La secuencia canónica es conocida por cualquiera que haya tocado un Debian o derivado:

```
apt update ──► apt upgrade ──► apt autoremove
(sincronizar)   (actualizar seguro)  (inspeccionar y limpiar)
```

Vale la pena decir explícitamente qué hace cada paso y, más importante, qué _no_ hace.

**`apt update`** no instala nada. Descarga los índices de los repositorios configurados en `/etc/apt/sources.list` y `/etc/apt/sources.list.d/`. Es una foto del estado del mundo, no una intervención. Podés correrlo cien veces por día sin ningún riesgo.

**`apt upgrade`** es donde empieza la disciplina real. Instala versiones más nuevas de los paquetes ya instalados, mientras la versión nueva no requiera instalar o remover ningún paquete adicional. Esto es clave: si resolver una actualización requeriría un cambio de dependencias no trivial, apt **retiene** ese paquete (lo que en la jerga se llama _held back_) y no toca nada más. Esta conducta conservadora es justamente lo que hace seguro automatizar `apt upgrade` en un cron o con `unattended-upgrades`: en el peor caso, un paquete se queda una versión atrás hasta que un humano decida qué hacer. Nunca rompe algo por sorpresa.

**`apt autoremove`** elimina las librerías huérfanas — paquetes que fueron instalados como dependencia de algo que ya no está. Acá va la primera recomendación de terreno que casi nadie sigue: nunca corras `autoremove` en piloto automático en un servidor de producción. Corré primero `apt autoremove --dry-run` (o simplemente leé la lista antes de confirmar) y **mirá** qué se va a borrar. He visto autoremove llevarse de encuentro un kernel que todavía estaba en uso porque el sistema de gestión de paquetes calculó, erróneamente desde el punto de vista operativo, que ya no hacía falta. Cinco segundos de inspección visual evitan una reconstrucción de una tarde.

### El comando que falta en casi todos los tutoriales: `needrestart`

Acá es donde la mayoría de las guías de “buenas prácticas de apt” se quedan cortas, y es un error caro. Después de un `apt upgrade` que parchea, por ejemplo, `libssl` o `glibc`, el archivo en disco está actualizado — pero cualquier proceso que ya tenía esa librería cargada en memoria (tu servidor Nginx, tu daemon de Postfix, tu proceso de PHP-FPM) sigue corriendo contra el código viejo, vulnerabilidades incluidas. `apt` no reinicia servicios por vos. El sistema queda “actualizado” en la superficie —`apt list --upgradable` no muestra nada pendiente— pero sigue siendo vulnerable en tiempo de ejecución.

`needrestart` (instalable con `apt install needrestart`) resuelve exactamente este punto ciego: escanea qué procesos tienen mapeadas en memoria versiones de librerías que ya fueron reemplazadas en disco, y te dice con precisión qué reiniciar. En modo interactivo te pregunta; en modo automatizado (`NEEDRESTART_MODE=a`) reinicia lo necesario sin intervención. Si tu rutina de actualización termina en `apt autoremove` y no pasa por `needrestart`, tenés un punto ciego operativo real, no teórico.

## Retener paquetes a propósito: `apt-mark hold`

El resumen típico de “cómo funciona apt” te cuenta que el sistema retiene paquetes automáticamente cuando hay conflicto de dependencias. Lo que casi nunca te cuentan es que vos, como sysadmin, también podés y a veces _debés_ retener un paquete manualmente, a propósito, con una razón operativa concreta.

Ejemplos reales: congelar la versión del kernel mientras estás validando que un módulo propietario (un driver de RAID, un driver de GPU) siga siendo compatible con el kernel nuevo antes de dejarlo actualizar solo. O congelar la versión de PHP en un servidor que corre una aplicación heredada mientras coordinás con el equipo de desarrollo la migración de código deprecado.

```
apt-mark hold nombre-del-paquete
apt-mark unhold nombre-del-paquete
apt-mark showhold   # qué tenés retenido, y por qué deberías acordarte por qué
```

El punto débil de esta práctica no es técnico, es de memoria organizacional: si retenés un paquete y no dejás un registro de _por qué_, en seis meses vas a tener un servidor con un paquete congelado sin que nadie del equipo (incluido tu yo futuro) sepa la razón. La disciplina no es solo ejecutar el comando — es documentar el motivo al lado del comando, en el mismo commit de tu repositorio de configuración o en tu bitácora de infraestructura.

## El error que rompe más instalaciones Debian de lo que cualquiera admite: mezclar suites sin pinning

Si tuviera que nombrar la causa número uno de sistemas Debian que terminan en un estado irreconciliable, no sería un bug de apt ni una falla de hardware. Sería esto: alguien necesitó una versión más nueva de un paquete, agregó `testing` o `unstable` a su `sources.list` junto a `stable`, instaló lo que necesitaba, y dejó los repos mezclados para siempre. A partir de ese momento, cada `apt upgrade` es una ruleta rusa, porque el sistema empieza a resolver dependencias entre ramas que fueron pensadas para vivir separadas.

La forma correcta de resolver “necesito una versión más nueva de X sin salir de Debian stable” tiene nombre y es exactamente para esto que existe: **backports**.

```
# /etc/apt/sources.list.d/backports.list
deb http://deb.debian.org/debian bookworm-backports main
```

Y crucialmente, con **pinning explícito** para que backports no se convierta en la fuente por defecto de todo el sistema:

```
# /etc/apt/preferences.d/backports
Package: *
Pin: release a=bookworm-backports
Pin-Priority: 100
```

Con esta configuración, backports queda disponible pero no se usa a menos que lo pidas explícitamente con `apt install -t bookworm-backports paquete`. Es la diferencia entre “tengo una puerta lateral para casos puntuales” y “abrí la puerta principal de par en par y ahora vive ahí cualquiera”.

Lo mismo aplica, con más razón todavía, a los repositorios de terceros: Docker CE, PostgreSQL (`apt.postgresql.org`), Node.js, etc. Estos no siguen el ciclo de release de Debian y no tienen ninguna obligación de ser compatibles entre sí ni con la próxima versión mayor de Debian. Tenerlos en el sistema está bien — es prácticamente inevitable en infraestructura real — pero hay que saber que son código extranjero dentro de la ciudad, y tratarlos como tal: revisarlos con atención especial en cada salto de versión mayor, y estar dispuesto a deshabilitarlos temporalmente si generan conflictos durante una migración.

## Automatización sin perder el control: `unattended-upgrades`

Todo lo anterior describe una rutina manual, y la pregunta obvia es: ¿esto hay que hacerlo a mano todos los días en cada servidor? No. `unattended-upgrades` es el paquete oficial de Debian para automatizar exactamente la parte segura de este proceso — parches de seguridad — sin delegar las decisiones riesgosas.

La configuración clave está en `/etc/apt/apt.conf.d/50unattended-upgrades`, donde por defecto solo se habilitan las actualizaciones del origen `-security`, dejando fuera los cambios de la rama regular de stable-updates a menos que se habiliten explícitamente. Esa separación no es casualidad: es el mismo principio que separa `apt upgrade` de `apt full-upgrade`, aplicado a la automatización. Dejás que la máquina se ocupe de lo que es seguro que se ocupe sola, y reservás el juicio humano para lo que requiere juicio humano.

Un detalle de terreno que vale la pena configurar explícitamente: `Unattended-Upgrade::Automatic-Reboot` y `Automatic-Reboot-Time`. Si tu política de seguridad requiere reiniciar automáticamente cuando el kernel se actualiza, definí una ventana horaria de bajo tráfico explícita — no dejes el reboot automático en manos del default, porque el default no sabe cuándo tu negocio tiene menos usuarios conectados.

## Por qué todo esto importa para “sobrevivir décadas”

Ninguna de estas prácticas es espectacular por sí sola. `needrestart`, `apt-mark hold` con su bitácora, pinning de backports, `unattended-upgrades` bien configurado — son detalles de higiene, no arquitectura. Pero es exactamente esa acumulación de higiene diaria, sostenida durante años, la que determina si un servidor Debian llega al día del salto de versión mayor en un estado predecible o en un estado de sorpresas acumuladas.

En la segunda parte de esta serie voy a meterme de lleno en ese día: el protocolo real para saltar de una versión mayor de Debian a la siguiente — no la checklist genérica de “hacé un backup y actualizá”, sino el orden exacto de operaciones, los errores más comunes al mezclar `sources.list` antes de tiempo, y qué hacer con los archivos de configuración que vos modificaste cuando el paquete nuevo quiere pisarlos.
