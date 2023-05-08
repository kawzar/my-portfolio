---
title: Builds desde Unity en la nube (sin salir de GitHub) ☁️🔧[1/3]
date: 2023/05/07
description: Un poco de DevOps con GitHub Actions.
tag: posts, productivity, gamedev, spanish
author: Marlow Haspert
---

## Introducción 
Desde que empecé a meterme en el mundo del _gamedev_, un poco empecé también a _sentir un vacío_. Ese vacío en realidad era la falta de herramientas para la desarrolladora que trabaja usando Unity como motor y que estaba acostumbrada a que en las grandes software factories lxs devs estén obligadxs a cumplir con un montón de estándares y de chequeos automáticos.

> Este es el primero de una serie de tres posts en donde espero poder compartirles de forma sencilla pero no acotada, el workflow que estamos actualmente utilizando en el estudio para buildear y publicar a un servidor local un proyecto en WebGL

Es tambien una serie de textos que decido encarar en castellano como resultado de una decision politica y que tiene un tono (demasiado) personal porque no encontre otra forma de escribir. 
Asi que espero que ante cualquier duda o comentario no duden en dar su feedback :) y sin mas dilaciones empecemos por el principio...
 
## GitHub Actions
GitHub Actions es una plataforma de integración y entregas continuas que forma parte del entorno GitHub y permite a los usuarios automatizar sus procesos de build, test y deployment. No está destinado únicamente a DevOps, ya que los workflows creados se pueden ejecutar como respuesta a distintos eventos que suceden en el repositorio o dispararlos on-demand. Un workflow es un proceso automatizado y configurable que ejecuta uno o más jobs. Se definen en un archivo YAML, que se pushea al repositorio como cualquier otro archivo. Para conocer más sobre GitHub actions, se puede consultar la [documentación oficial](https://docs.github.com/en/actions)

## GameCI
Investigando un poco las acciones disponibles en el marketplace oficial de GitHub, me encontré con una comunidad que tiene como objetivo facilitar la incorporación de técnicas de integración continua de alta calidad a proyectos de videojuegos. Se llama [GameCI](https://game.ci/) y vamos a estar utilizando algunos de los workflows que proveen.

## Modelo mental
Vamos a tener un workflow que consta de tres pasos (jobs)
* Hacer el build desde Unity: nuestro ejecutable se expondrá como un artifact que puede ser consumido luego por otros jobs. 
* Publicar nuestro juego: vamos a copiar la build que esta guardada como artifact, a un servidor FTP
* Notificación: enviaremos un mensaje por Discord con un link que apunte a la versión publicada 
 
![Diagrama de flujo de nuestro workflow tal y como se ve en la UI de GitHub](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rbp85i8yvrfay3hxjavj.png)

## Manos a la obra
La documentacion oficial de la action que utilizaremos [esta disponible online](https://game.ci/docs/github/builder). 

De hecho, **un requerimiento a la hora de ejecutar una de estas actions es primero obtener una licencia de Unity que sea valida para nuestro ambiente**. Recordemos que la nube no es mas que la computadora de alguien mas, así que tendremos que registrar la instancia de Unity que va a estar corriendo en el contenedor del job de GitHub con una licencia valida. Para eso, se pueden seguir los [siguientes pasos de la guía oficial](https://game.ci/docs/github/activation). Una vez hecho esto _-se necesita una única vez por repositorio-_ podrás seguir leyendo sin problemas :)

Como dijimos antes, un workflow consta de diversos jobs. Entonces, en un principio vamos a comenzar definiendo un archivo `build.yml` en la carpeta `.github`. Podemos editar directamente desde el navegador, y de esa manera definir lo siguiente:
```
name: Build project
on: 
  workflow_dispatch:
jobs:
  buildForWebGL:
```
De esta manera, definimos que nuestro workflow se llamara "Build project", pueda ser ejecutado on demand y que contenga un job llamado "buildForWebGL". 

Debajo, detallo el workflow con el job completo:

{% gist https://gist.github.com/kawzar/f37df771bc2a1f18a7e81622d277abd0 %}

Los steps, basicamente definen la serie de pasos que van a ejecutarse dentro de nuestro job de forma ordenada. Cuando los ejecutamos se ven de forma mas amigable :) 
![Screenshot que muestra como una sucesion de pasos el detalle del workflow en la UI de GitHub](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ehdtm9da5xu97llprdsd.png)

A destacarse entonces en este job es que, el nombre de la variable
 ```${{ secrets.UNITY_LICENSE }}``` 
en este caso `UNITY_LICENSE` debera coincidir con la que creamos a nivel de repositorio en el [paso de activar Unity](https://game.ci/docs/github/activation).

Si ahora vamos a la pestaña `Actions` de nuestro repositorio, podremos encontrar y ejecutar nuestro workflow, siguiendo los pasos que detalla la imagen de abajo. 
![Como encontrar el workflow y ejecutarlo desde la UI de GitHub](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rxeonvqgjzncl3s8xta7.png)

Una vez ejecutado, podrán ver que como resultado nuestro workflow produjo un artifact que puede ser descargado (es la build en WebGL, lista para copiar al FTP). En los próximos posts, vamos a explorar como automatizar ese paso. 
 

---

### Misc

Sonaba en mi cabeza: 
{% spotify spotify:track:1IJcROM3wuO4phCdjlEl5t %}

La imagen de cabecera es de [Natasha Remarchuk](https://icons8.com/illustrations/author/5e7e24ce01d0360013bb7479)