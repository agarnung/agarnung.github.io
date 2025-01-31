---
title: Linux tree
tags: [Linux, programming, divulgation]
style: fill
color: success
description: Briefly analyzing Linux tree structure
---

# Introduction

Este concepto se comprende de manera muy intuitica; imaginémonos una imagen como una montaña. La montaña no es una parábola invertida perfecta, por el contrario, tiene un gran relieve y textura; hay pequeñas y grandes piedras en el camino, badenes y resaltes, la grava y arena actúan como sumideros, formaciones rocosas craen distintos niveles en el terreno, hay incluso ríos y meandros que hacen vbarian la altura media de la superficie montañosa, etc. Cuando llueve, experimentamos que algunas zonas se van "llenando" antres que otras. Si hacemos un poco de geongeniería y logramos provocar lluevia durante un lapso controlado de tiempo, veremos que se habrán formado múltiples caminos de agua en la montaña, cada uno discurriendo por distintos lugares pero conectados a través de las conexiones de las moléculas de agua dentro de un mismo caudal. Cada camino de igual caudal se pude ver como un level set.

En imagen digital, su dominio (típicametne cuadriculado) se mapea en un conjunto de valores discreto, e.g. {0, 255} si tratamos con niveles de intensidad en grises. Haciendo "zoom" a una imagen podremos ver que existen caminos de "mismo nivel de gris", algunos más extendidos que otros. Cada uno de estos caminos, formado por píxeles conectados bajo cierta noción de vecindad, se denominan level sets. EN este post veremos por qué son tan importantes y alguno de sus usos más extendidos.

# ¿Para qué queremos los level sets?

Tomemos como prueba esta imagen:

<img src="../assets/blog_images/2025-01-30-conformal-prediction/squares/original.png" alt="original" width=500 align="center">

Cuántos level sets podrá tener? Fácil, 4, si contamos el borde (extreior) de la imagen,. Y podemos dibujasrlos:

<img src="../assets/blog_images/2025-01-30-conformal-prediction/squares/displayImage.png" alt="displayImage" width=500 align="center">

Ya está, esta imagen no tiene más level sets (creamos que el color es realmente uniforme al ser generada sintétciamente, y no hagamos zoom mucho en ella...).

...

Los level sets son sumamente importantes en procesamiento de imagen desde una perspefctiva variacional. 

La fórmula de co-área nos dice que BLABLABLA.
FORMULA

Esto nos dice que el perímetro de los level sets y la variación total BLABLA don ciertamente equivalentes.

The level set formulation is based on the observation that **a closed curve can be seen/described as a zero level/crossing of a function in a higher dimension** and it allows major simplification. Hoy día, esta es una manera ampliamente utilizada para hacer evolucionar numerically curves and surfaces [4].

Por ejemplo, una curva en R² se puede representar como la zero-level linea de una función R²->R, e.g. la signed distance to the curve, negative inside and positive outside:

<img src="../assets/blog_images/2025-01-30-conformal-prediction/squares/ls.png" alt="lsa" width=500 align="center">

## Segmentation

El propósito principal de la segmentación es encontrar los contornos de los objetos en las imágenes. Dos paradigmas de segmentación de imagen clásicos son los modelos paramétricos (como las snakes de Kass, Witkin, and Terzopoulos) [5] y los *geometric deformable models* (como los *Geodesic Active Contours* [GAC] de Caselles, Kimmel, and Sapiro) [1-3]. Los últimos se formulan para lidiar con las limitaciones de los primeros y se basan en la evolución de curvas (o superficies) con una formulación fundamentada en *level sets*. Esta evolución está guiada por medidas geométricas. 

Así, el propóstio principal de la segmentacíon emdainte GAC y level sets es  modelar los contornos de los objetos como curvas que (típicamente) deben moverse con cierta velociad para match the highest gradients. 

El problema es que puede ser costoso lidiar con la evolución de la curva en la imagen de manera explícita (o sea, parametrizando la curva y disrectizando sus ecuaciones); por eso una de las principales ventajas de GAC es que puede formularse como un problem de *level sets*, que afronta esa dificultad. Un *level set* \( \phi \) puede definirse de la siguiente forma:

- \( \phi(x, y) = 0 \) para todos los puntos \( (x, y) \) que se encuentran en la curva.  
- \( \phi(x, y) > 0 \) para los puntos que están dentro de la región delimitada por la curva.  
- \( \phi(x, y) < 0 \) para los puntos que están fuera de la región delimitada por la curva.  

Gracias a esta representación implícita, se pueden calcular atributos geométricos importantes como la normal unitaria a la curva, que se obtiene mediante:  
   \[
   N = \frac{\nabla \phi}{|\nabla \phi|}
   \]
2. **La curvatura media** \( \kappa \), que está dada por la divergencia de la normal unitaria:  
   \[
   \kappa = \nabla \cdot N = \text{div} \left( \frac{\nabla \phi}{|\nabla \phi|} \right)
   \]

El método de *Geodesic Active Contours* se basa en una ecuación de evolución de la forma:

\[
\frac{\partial \phi}{\partial t} = g(I) \left( |\nabla \phi| \cdot \text{div} \left( \frac{\nabla \phi}{|\nabla \phi|} \right) \right) + c g(I) |\nabla \phi|,
\]

donde:
- \( g(I) \) es una función basada en el gradiente de la imagen que actúa como criterio de parada, es decir, frena la evolución cuando la curva se encuentra con un borde fuerte.
- La primera parte de la ecuación contiene el término de curvatura media, que suaviza la curva.
- La segunda parte contiene un término de velocidad normal \( V \), que mueve la curva según el contenido de la imagen.  

Esta formulación permite que la curva evolucione de manera flexible, dividiéndose o fusionándose sin necesidad de intervención explícita. Así, el método basado en *level sets* supera las limitaciones de los métodos paramétricos tradicionales en la segmentación de imágenes. El modelo de Geodesic Active Contour depende en gran medida de la información de los bordes de la imagen, por lo que prácticamente no es aplicable en imágenes que no tienen bordes bien definidos. El modelo pionero de Chan-Vese es una variante de los Active Contours y puede aplicarse sin necesidad de bordes.

# References

[1] J.A. Sethian, Level Set Methods and Fast Marching Methods: Evolving Interfaces in Computational Geometry, Fluid Mechanics, Computer vision, and Materials Science (Cambridge university press, Cambridge, 1999)
[2] S. Osher, R. Fedkiw, Level Set Methods and Dynamic Implicit Surfaces (Springer, Berlin, 2002)
[3] R. Kimmel, Numerical Geometry of Images: Theory, Algorithms, and Applications (Springer, Berlin, 2012)
[4] Guy Gilboa non linear pag 29
[5] Mathematical problems in image processing pag 173




