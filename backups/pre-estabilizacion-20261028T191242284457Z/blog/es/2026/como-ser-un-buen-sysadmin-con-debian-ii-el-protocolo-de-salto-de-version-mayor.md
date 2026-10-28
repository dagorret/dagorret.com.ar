---
title: "Cómo ser un buen sysadmin con Debian (II): El protocolo de salto de versión mayor"
date: 2026-09-15
slug: "como-ser-un-buen-sysadmin-con-debian-ii-el-protocolo-de-salto-de-version-mayor"
translation_key: "como-ser-un-buen-sysadmin-con-debian-ii-el-protocolo-de-salto-de-version-mayor"
lang: "es"
categories: ["Sistemas","Tecnología"]
tags: ["Debian","Infraestructura","Mantenimiento de Servidores","Sysadmin"]
---

Este articulo es para un serie:  
[Artículo I](/como-ser-un-buen-sysadmin-con-debian-i-la-disciplina-de-apt-y-la-gestion-de-paquetes)  
[Artículo II](/como-ser-un-buen-sysadmin-con-debian-ii-el-protocolo-de-salto-de-version-mayor/\)  
[Artilo III](/como-ser-un-buen-sysadmin-con-debian-iii-observabilidad-hardening-y-la-disciplina-de-las-decadas/)

Todo sysadmin de Debian que lleva suficiente tiempo en esto tiene una historia sobre el día que un `apt full-upgrade` salió mal. La mía —y la de casi todos los que conozco— tiene el mismo patrón de fondo: no fue el comando el que falló, fue el orden. `full-upgrade` es una herramienta correcta y confiable cuando se ejecuta en el momento correcto, sobre un sistema preparado. Es un desastre cuando se ejecuta como atajo, saltándose los pasos previos.

En la primera parte de esta serie hablé de la higiene diaria: apt bien administrado, paquetes retenidos con criterio, backports con pinning, automatización de parches de seguridad. Esa disciplina es la que te deja llegar al día del salto de versión mayor —de Debian 12 a Debian 13, por ejemplo— con un sistema en un estado conocido. Ahora toca el día en sí: qué hacer, en qué orden, y por qué el orden es la parte que más se pasa por alto.

## El esqueleto de cuatro fases (y por qué la checklist genérica no alcanza)

Cualquier resumen decente de este proceso te va a dar una estructura de cuatro fases:

```
┌──────────────────────────────────────────────────────────┐
│ 1. Auditoría: leer las Release Notes y buscar incompatib. │
├──────────────────────────────────────────────────────────┤
│ 2. Staging: clonar el entorno y probar el salto completo  │
├──────────────────────────────────────────────────────────┤
│ 3. Backup: generar snapshots del entorno de producción    │
├──────────────────────────────────────────────────────────┤
│ 4. Despliegue: actualizar repos y ejecutar full-upgrade   │
└──────────────────────────────────────────────────────────┘
```

Como esqueleto, está bien. El problema es que cada una de estas cuatro palabras esconde una cantidad de detalle operativo que, si se ignora, convierte el esqueleto en una trampa de falsa seguridad: “seguí los cuatro pasos y aun así se rompió todo”. Vamos fase por fase, con el detalle que normalmente falta.

### Fase 1 — Auditoría: más allá de las Release Notes generales

Leer las Release Notes de la nueva versión de Debian es el punto de partida obvio, y ahí es donde la mayoría se queda. Pero las Release Notes generales documentan cambios a nivel de distribución — no te van a decir que tu configuración específica de Postfix con un `main.cf` de hace ocho años tiene una directiva deprecada, o que el `php.ini` que arrastrás desde PHP 7 tiene una opción que PHP 8.x directamente ignora en silencio.

Para eso existe un archivo que casi nadie revisa de forma sistemática: **`NEWS.Debian`**, específico de cada paquete, ubicado en `/usr/share/doc/<paquete>/NEWS.Debian.gz` una vez instalado el paquete nuevo, o consultable de antemano en el changelog del paquete en el repositorio de Debian. Ahí es donde el mantenedor de Postfix, de Nginx, de tu motor de base de datos, documenta específicamente qué cambió en el comportamiento por defecto, qué directiva de configuración fue renombrada o eliminada, y qué acción manual se espera del administrador.

La auditoría completa, entonces, tiene dos capas: la capa de distribución (Release Notes generales, para saber qué cambia en el sistema como un todo) y la capa de paquete (NEWS.Debian de cada servicio crítico que corrés, para saber qué cambia específicamente en lo que te importa). Saltarse la segunda capa es la razón número uno por la que alguien “leyó las Release Notes” y aun así se llevó una sorpresa.

### Fase 2 — Staging: el orden de operaciones que nadie te explica bien

Clonar el servidor en una VM aislada y probar ahí el salto es la parte que el sentido común ya te dicta. Lo que el sentido común no te dicta, y que es la causa concreta de la mayoría de los saltos de versión mal hechos, es el **orden exacto** en el que hay que tocar `sources.list` y ejecutar los comandos de apt. El error más común —cometido tanto por sysadmins apurados como por guías escritas sin experiencia de terreno— es editar `sources.list` al release nuevo y correr `apt full-upgrade` de una sola vez. El procedimiento correcto es:

```
# 1. Agotar la versión actual primero
apt update && apt upgrade
apt full-upgrade   # de ser necesario, dentro de la MISMA versión

# 2. Recién ahora, editar sources.list / sources.list.d apuntando al nuevo release
#    (bookworm -> trixie, por ejemplo)

# 3. Releer los índices contra los repos nuevos
apt update

# 4. Simular antes de ejecutar — esto es lo que casi nadie hace
apt full-upgrade --simulate    # o -s

# 5. Recién con la simulación revisada, ejecutar de verdad
apt full-upgrade
```

El paso 4 —simular antes de ejecutar— es la diferencia entre enterarte de un problema en una pantalla de texto que podés leer con calma, o enterarte a mitad de una actualización real con paquetes a medio instalar. `apt full-upgrade --simulate` te muestra exactamente qué se va a instalar, qué se va a remover y qué se va a retener, sin tocar nada. Si algo en esa lista te sorprende —un paquete que asumías que se iba a actualizar y en cambio aparece marcado para remoción— es la señal de parar y entender por qué antes de seguir.

Dentro del staging, además de correr el proceso, hay que **usarlo**: levantar la aplicación real, correr las rutinas reales, y buscar activamente errores HTTP 500, dependencias de PHP o Python rotas, o discrepancias de versión en el motor de base de datos. Un salto de versión que “no tiró errores en apt” pero que rompe silenciosamente una función de tu aplicación en producción no fue una prueba de staging exitosa — fue una prueba de staging incompleta.

### Fase 3 — Backup: lo que un snapshot no te salva

Tomar un snapshot LVM, ZFS o Btrfs del volumen antes de tocar producción es correcto y es rápido, y por eso es tentador tratarlo como suficiente. No lo es, en un caso muy específico y muy común: cuando el servicio tiene estado que vive fuera del filesystem en un sentido consistente — típicamente, una base de datos con conexiones activas y escrituras en curso.

Un snapshot de filesystem tomado a mitad de una transacción de base de datos puede capturar un estado en disco que es _crash-consistent_ pero no necesariamente coherente con lo que la aplicación espera al reiniciar. La mayoría de los motores modernos (PostgreSQL, MySQL/MariaDB con InnoDB) tienen mecanismos de recuperación ante crash que hacen que esto funcione la mayoría de las veces — pero “la mayoría de las veces” no es el estándar que uno quiere para el único backup que tiene antes de una migración mayor.

La práctica correcta es coordinar el snapshot con el servicio: o bien un `flush`/checkpoint explícito antes del snapshot (`CHECKPOINT` en PostgreSQL, por ejemplo), o directamente usar el mecanismo de backup nativo del motor (`pg_basebackup`, `mysqldump` o backups físicos con `xtrabackup`) en paralelo al snapshot de filesystem. El snapshot te da el rollback rápido de “segundos” para el sistema operativo y los binarios; el backup nativo de la base de datos te da la garantía de consistencia que el snapshot solo, por sí mismo, no te puede dar.

### Fase 4 — Despliegue y el momento de `/etc`

Durante el `full-upgrade` real, apt va a encontrar archivos de configuración en `/etc` que vos modificaste y que el paquete nuevo también quiere modificar. Este es el momento de las preguntas de `dpkg` que todo el mundo conoce a medias:

Opción de apt

Qué hace

Cuándo usarla

**Keep current (N)**

Mantiene tu archivo local intacto

Opción por defecto razonable: preserva tu configuración en producción

**Install package version (Y)**

Sobrescribe tu archivo con el del mantenedor

Solo si decidiste rehacer esa configuración desde cero

**Show difference (D)**

Muestra el diff entre ambas versiones

Imprescindible: es la única forma de saber qué directivas nuevas introdujo el mantenedor antes de decidir N o Y

Lo que la mayoría de las guías no dicen es que, en un entorno donde la configuración está bajo control de versiones (Ansible, Puppet, Chef, o simplemente un repositorio git con tus `/etc` importantes), responder estas preguntas de forma interactiva en el momento del `full-upgrade` es la excepción, no la regla. Lo correcto en un pipeline reproducible es fijar el comportamiento de antemano con las opciones de dpkg:

```
apt-get -y \
  -o Dpkg::Options::="--force-confdef" \
  -o Dpkg::Options::="--force-confold" \
  full-upgrade
```

Esto le dice a dpkg: si hay un default razonable, tomalo; y si el archivo fue modificado localmente, mantené la versión local sin preguntar. La revisión de los diffs (la opción D de la tabla) entonces no desaparece — se mueve de “el momento del upgrade en producción, bajo presión” a “la fase de staging, con calma”, que es exactamente donde tiene que estar.

## El trabajo no termina cuando `full-upgrade` termina

Acá está el punto ciego más caro de todo el proceso, y es el mismo error de fondo que mencioné en la primera parte con `needrestart`, ahora a escala de sistema completo: un `full-upgrade` que termina sin errores en pantalla no es lo mismo que un sistema verificado.

Dos verificaciones mínimas, no negociables, después de cualquier salto de versión mayor:

**`journalctl -p 3 -xb`** — te muestra los mensajes de nivel error (prioridad 3) desde el arranque actual. Es la forma más rápida de detectar un servicio que arrancó mal, un módulo de kernel que no cargó, o un daemon que está reintentando conectarse a algo que ya no existe con ese nombre.

**`debsums -c`** — verifica la integridad de los archivos instalados por paquetes contra sus checksums originales, y te avisa si algo quedó corrompido o modificado de forma inesperada durante el proceso de actualización (instalalo de antemano con `apt install debsums`, antes de necesitarlo).

Un salto de versión mayor termina, en rigor, cuando pasaste estas dos verificaciones y confirmaste que los servicios críticos están efectivamente sirviendo tráfico real como se espera — no cuando la terminal te devolvió el prompt sin mensajes en rojo.

## Lo que viene

Con la higiene diaria de la primera parte y el protocolo de salto de la segunda, ya tenés cubierto el ciclo de vida técnico del paquete: cómo mantenerlo al día y cómo moverlo entre versiones mayores sin sorpresas. Lo que falta es la capa que sostiene todo esto en el tiempo y que rara vez se trata como parte de “ser un buen sysadmin”: la disciplina de observar lo que el sistema está haciendo, endurecerlo contra lo que no debería pasar, y documentar las decisiones para que sobrevivan al que las tomó. De eso trata la tercera parte.
