---
title: Los registros de la Commodore64
date: 2023/05/07
description: Si nos hemos decidido a aprender a programar en el llamado "lenguaje de máquina" de la Commodore 64, en seguida nos encontraremos con algo llamado registros.
tag: posts, retroprogramming, c64, spanish, assembly
author: Marlow Haspert
---

## Introducción

Si nos hemos decidido a aprender a programar en el llamado "lenguaje de máquina" de la Commodore 64, en seguida nos encontraremos con algo llamado registros. 

En la disciplina de arquitectura de computadoras se llama  registros a memoria muy rápida, usada para ejecutar programas y operaciones de forma eficiente. El propósito de tener registros es poder consultar rápidamente datos para ser procesados por el CPU, incluso más rápidamente que accediendo a través de la memoria RAM. 

---


## Registros de la C64

### A - Acumulador

En el lenguaje de máquina se hace referencia a él simplemente como A y es utilizado principalmente para operaciones aritméticas y lógicas. El resultado de este tipo de operaciones se guarda en este registro y muchas instrucciones hacen referencia a él de forma implícita, o de forma semi-implícita.

```
; Ejemplo: Sumar 2+3
lda #02     ; guardar 2 en A (explicito)
add #03     ; agregar 3 al valor guardado en A (implicito)
sta $C000   ; guardar el resultado en la direccion de memoria $C000 (explicito)
```

### X - Registro Indice X

Es utilizado para cargarle valores que luego seran utilizados como un offset para una determinada dirección de memoria. Esto es útil para recorrer direcciones de memoria consecutivas en ciclos.

#### Modo de direccionamiento absoluto indizado por X (Absolute Indexed by X Addressing)

En este modo de direccionamiento, la dirección en cuestión se crea a partir de la locación de 16 bits más el contenido del registro X. Por ejemplo, la instrucción 

`lda $0400, x`

carga el valor de la locación $0405 cuando el registro X tiene el valor #$05.

#### Modo de direccionamiento indirecto indizado(Indirect Indexed Addressing)

Muy similar al anterior, con la diferencia que la dirección de base será guardada en la memoria y por lo tanto accedida de forma indirecta.

{% gist https://gist.github.com/actraiser/1524478f770ce9c6fc01 %}


### Y - Registro Indice Y

Tiene un uso analogo al del registro X, y los mismos modos de direccionamiento. Sin embargo puede utilizarse en conjunto con el acumulador para hacer cosas que necesitan 16 bits de espacio. 

### PC - Program counter

Tambien conocido como puntero de instrucciones, es el único registro de 16 bits en la CPU 6510 y guarda la dirección de memoria de la instrucción que está siendo actualmente ejecutada en la C64. Se puede modificar el valor del PC utilizando instrucciones como jumping o branching. Cuando el CPU ejecuta una instrucción de la memoria, el PC es incrementado de forma automática. 

### P - Registro de estado P

Es un registro de 8bits, pero su valor no se considera en su totalidad. En su lugar, hay que mirar cada uno de sus bits de forma individual como si fueran banderas. Para manipular estas banderas, es importante conocer sobre [bit-masking](https://medium.com/analytics-vidhya/bits-bitmasking-62277789f6f5). 

---

## Recursos 

- [What are C64 registers](https://retro-programming.com/what-are-c64-registers/)
- [Different classes of CPU registers](https://www.geeksforgeeks.org/different-classes-of-cpu-registers/)
- [Addressing Modes](https://dustlayer.com/cpu-6510-articles/2013/5/23/whatever-you-like-coming-to-addressing-modes)
