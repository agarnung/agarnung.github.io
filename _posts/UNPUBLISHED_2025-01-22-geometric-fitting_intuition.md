---
title: Geometric fitting intuition 
tags: [math, geometry]
style: filled
color: warning
description: A resourceful least-squares Taylor-based torus fitting algorithm.
---

<!--<img src="../assets/blog_images/2025-01-22-torus-fit/circle.png" alt="circle" width="64" height="64">-->
<img src="../assets/blog_images/2025-01-22-torus-fit/circle.png" alt="circle">

## Introduction

Fitting algorithms are a widely spread topic among geometry processing. Circle fitting algorithms like Taubin, Chernov, etc. or plane fitting algorithms with least-squares, are commonly utilized in 2D and 3D computer vision applications to measure geometric entities or perform registration. For a large bibliographic review in this topic, see [1](HREF A REF. [1])  

Imaginémonos un problema clásico: tenemos un conj8utno de putnos 2D y queremos ajustar una línea recta a ellos. Más aún, la línea que **mejor** se ajuste a ellos, en cierto sentido de la palabra. El enfoque least-squres en forma cerrada es una manera de darle concepción a este sentido de **optimalidad de ajuste**. La ecuación de una recta es:
ax+by+c=0
Y  satisface las condiciones de linealidad

eL PROBLEMa de ajuste least squres para una recta es por tanto:
E(a, b, c) = sum_i=1^m(ax_i + by_i + c)²

y se puede resolver en un solo paso porque representa una parábola, que es estrictamente convexa, pues la función de error es cuadrática en las incógnitas.

Diferenciando E(.) con respscrto a las incognitas e iualando a 0 resulta (por la gracia de la ecuacíon) en tres ecuaciones lineales en sus incógnitas.

SIn embargo, las curvas suelen ser funciones de mayor orden que las recrtas, por lo que la fu cion de error, en forma de suma de distancias perpendiculares a una curva, no es cuadrática usualmente, por lo que esos errores geométricos no se pueden minimizar "en un solo paso", sino empleando métodos no lineales iterativos. SIn embargo, mediante diferentes enfoques se puede aproximar "bastante bien" la minimzación del **error geomértico** por la de un **error algebraico**, típicamente cuadrático· Esto categoriza los métodos de ajuste en dos grandes familias: algebraicos y geométricos. En general, el error algebraico es una buena aproximación del geométrico, incluso la semilla inciial del me´doso iterativo geométrico. Véase [2] para una discusión continuada de estos conceptos.

We will gain some insight about various important geometric fitting algorithm.

## Paper

TO the benefict of better visualization, you can access the post main content in the LaTex PDF attached below:

**AQUÍ INSERTAR EL PDF DEL LATEX MEDIANTE SCRIPT.JS**

## COnclusiones and future work.
Ya tenemos una ligera intuición más formada de este tópico, aunque de momento Hemos solamente atisbado el mudno del ajuste geométrico. 
<img src="../assets/blog_images/2025-01-22-torus-fit/torus2.png" alt="torus2">
__A work in progress__

## References

[1] Circular and linear regression: fitting circlean and lines by least sqrueas -nikolai chernov.
[2] Stan Birchfield p. 523
[3] Geometry tools for computer graphics - schneider, eberly
[4] RObust and error free goemetric computin schneider and eberly) - dave eberly
 
...
