---
title: "Configuración inicial de un servidor Ubuntu 24.04 LTS"
date: 2026-04-22
slug: "initial-server-setup-with-ubuntu-16-04"
translation_key: "initial-server-setup-with-ubuntu-16-04"
lang: "es"
categories: ["Sistemas"]
tags: ["Agujeros negros","Entropía","Gravedad cuántica","Gravedad entrópica","Principio holográfico"]
---

> **Versión:** Ubuntu Server 24.04 LTS  
> **Actualizado:** Agosto de 2026

## Introducción

La primera configuración de un servidor determina gran parte de su seguridad futura. Antes de instalar servicios conviene establecer una base sólida: actualizar el sistema, crear un usuario administrativo, configurar autenticación mediante claves SSH, activar un firewall y habilitar las actualizaciones automáticas.

Esta guía asume una instalación limpia de Ubuntu Server 24.04 LTS con acceso inicial mediante la cuenta `root`.

* * *

# 1\. Actualizar el sistema

```
apt update
apt full-upgrade -y
reboot
```

Comenzar con un sistema completamente actualizado evita instalar servicios sobre paquetes con vulnerabilidades conocidas.

* * *

# 2\. Crear un usuario administrativo

No es recomendable utilizar `root` para el trabajo cotidiano.

```
adduser carlos
usermod -aG sudo carlos
```

Verificar:

```
su - carlos
sudo whoami
```

Resultado esperado:

```
root
```

* * *

# 3\. Configurar autenticación SSH

Generar una clave **Ed25519** desde la máquina local:

```
ssh-keygen -t ed25519 -a 100
```

Copiar la clave pública:

```css
ssh-copy-id carlos@IP_DEL_SERVIDOR
```

Comprobar el acceso:

```css
ssh carlos@IP_DEL_SERVIDOR
```

* * *

# 4\. Endurecer SSH

Editar:

```
sudo nano /etc/ssh/sshd_config
```

Asegurarse de tener:

```
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
```

Reiniciar el servicio:

```
sudo systemctl restart ssh
```

**Importante:** abra una segunda terminal y verifique el acceso antes de cerrar la sesión actual.

* * *

# 5\. Configurar el firewall

Permitir SSH:

```
sudo ufw allow OpenSSH
```

Activar UFW:

```
sudo ufw enable
```

Verificar:

```
sudo ufw status
```

* * *

# 6\. Actualizaciones automáticas

```
sudo apt install unattended-upgrades
sudo dpkg-reconfigure unattended-upgrades
```

* * *

# 7\. Instalar herramientas básicas

```
sudo apt install \
    curl \
    wget \
    git \
    vim \
    htop \
    unzip \
    tree \
    rsync
```

* * *

# 8\. Verificaciones finales

Compruebe:

-   Acceso mediante SSH.
-   Funcionamiento de `sudo`.
-   Firewall activo.
-   Sistema actualizado.
-   Hora correcta (`timedatectl`).
-   Espacio disponible (`df -h`).

* * *

# Buenas prácticas adicionales

-   Utilice siempre claves **Ed25519**.
-   Mantenga deshabilitado el acceso remoto de `root`.
-   Realice copias de seguridad periódicas.
-   Instale únicamente los servicios necesarios.
-   Revise periódicamente los registros del sistema con `journalctl`.

* * *

# Conclusión

Tras estos pasos el servidor dispone de una base moderna y segura sobre Ubuntu 24.04 LTS. A partir de aquí puede instalar servicios como Nginx, PostgreSQL, Podman, Docker, aplicaciones web o cualquier otra infraestructura sabiendo que la configuración inicial sigue las prácticas recomendadas actuales.
