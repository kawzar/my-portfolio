---
title: Builds desde Unity en la nube (sin salir de GitHub) ☁️🔧[2/3]
date: 2023/05/07
description: Un poco de DevOps con GitHub Actions.
tag: posts, productivity, gamedev, spanish
author: Marlow Haspert
---
## Introducción 

En el [post anterior de esta serie](https://dev.to/kawzar/builds-desde-unity-en-la-nubesin-salir-de-github-13-10hc), vimos una introduccion a las GitHub Actions y tambien maquetamos lo que sera nuestro workflow para esta serie de posts. 

Asi habia quedado:

{% gist https://gist.github.com/kawzar/f37df771bc2a1f18a7e81622d277abd0 %}


## Modelo mental

- Agregaremos dos nuevos jobs a nuestro workflow. Estos se ejecutaran luego del build.
- El primero de esos jobs, copia la build que expusimos como artifact en el paso anterior a un servidor FTP.
- El segundo job, manda un mensaje a Discord una vez que la copia al FTP se realizo correctamente. 

## Manos a la obra

Como ya nos familiarizamos con el pipeline de las GitHub Actions en el post anterior, voy a dejar mas abajo el esqueleto del workflow terminado exceptuando el detalle del codigo para el job de build. 

{% gist https://gist.github.com/kawzar/fda438e45c7e18d900e185ae1bfd1799 %}

### Copiar al FTP

En este caso, usaremos el action [dist-to-ftp](https://github.com/isthatcentered/dist-to-ftp) que se encuentra disponible en el Marketplace de GitHub Actions.

Para guardar de forma segura la URL de nuestro FTP, asi como sus accesos usaremos _secrets_. Los secretos pueden configurarse en GitHub a nivel de repositorio en `Settings -> Secrets -> Actions`. 

![Listado de secrets en un repositorio](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8jejo5hpd4termfn6y1z.png)


### Mandar un mensaje a Discord

De nuevo usaremos una accion disponible en el marketplace, esta vez [action-discord](https://github.com/Ilshidur/action-discord). Leyendo su documentacion nos encontramos con que primero debemos configurar un WebHook para un canal en nuestro servidor Discord. Esto puede hacerse [siguiendo los pasos dados en su propia documentacion](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks). 

Una vez que creamos nuestro webhook, guardaremos nuevamente estos valores como _secrets_ a nivel del repositorio.

### Wrap up

Si vamos a la pestaña de `Actions` tal y como en el post anterior, podemos correr nuevamente el workflow y chequear su ejecucion. 
Si todo resulto bien, cuando el build se realice y se copie exitosamente al FTP, recibiremos un mensaje en nuestro canal de discord con un link que apunta a la nueva version. 

---
La imagen de cabecera es de Natasha Remarchuk
