---
title: Torus fitting 
tags: [math, geometry]
style: filled
color: info
description: A resourceful least-squares Taylor-based torus fitting algorithm.
---

<!--<img src="../assets/blog_images/2025-01-22-torus-fit/torus.png" alt="torus" width="64" height="64">-->
<img src="../assets/blog_images/2025-01-22-torus-fit/torus.png" alt="torus">

## Introduction

In our previous [post](URL AL POST DE GEOMETRIC FITTING INTUITION) we grasped the topic of geometric fitting of various entity to a set of observed data points. 

When we want to deal with the fitting of an uncentered (or even unaligned with the horizontal XY plane) torus, which si useful in come metrology applications of cilindyral pàrts, one encounter with a non-linear eqution that must be optimized through methods like Newton-raphson, gradient descrnt, gauss-newton or Levenbeg-marquardt (see [6]).

NEvertheles, it may be benefitial to develop an alternative approach using the tools formulated some centuries ago by Brook Taylor, in order to encontrar enfoques lineales muy eficientes que muchas siempre nos hacen la vida más fácil.

## Paper

TO the benefict of better visualization, you can access the post main content in the LaTex PDF attached below:

**AQUÍ INSERTAR EL PDF DEL LATEX MEDIANTE SCRIPT.JS COMO EL CV DE ALESORDO**

## Experiments:

The code was implemented in C++ using STD and Eigen. In this section we present some self-expplained results and perform a subjective quality assessment of the proposed method.

## COnclusiones and future work.
The workaraound _does the trick_; NOS PERMITE ajustar a una nube de puntos en el espacio 3D de manera eficiente y robusta un toroide descentrado. EL ajuste de un toroide cuyo plano frontal de simetría tenga una orientación arbitraria complica enormemente el problema; la ecuación es aún más complicada de expresar, incluso aproximadamente, de manera cerrada. Si bien es cierto que la orientación puede integrarse como un paso desligado mediante un previo ajuste de plano como el plano frontal de simetría del toroide, así como su centraje mediante la aproximación con el cálculo del centroide de los puntos, encapsular enteramente la optimización en una formulación rigurosa esta abierta a una discusión como esta. Para una cercamiento a este tema ver (CITAR A TRABAJO PAPER DE ESE AJUSTE TOROIDE MÉTODO NOVEDOSO).

## References

[1] Chernov, N. (2010). *Circular and Linear Regression: Fitting Circles and Lines by Least Squares*. Boca Raton: Chapman and Hall-CRC. ISBN 978-1-439-83590-6. [Journal of the Royal Statistical Society Series A: Statistics in Society, Volume 174, Issue 3, July 2011, Page 843.](https://doi.org/10.1111/j.1467-985X.2011.00709_4.x)

[2] Birchfield, S. (2017). *Image Processing and Analysis*. 1st Edition. Cengage Learning. ISBN 978-1285179520.

[3] Schneider, P., & Eberly, D. H. (2002). *Geometric Tools for Computer Graphics*. 1st Edition. Morgan Kaufmann. ISBN 978-1558605947.

[4] Eberly, D. (2020). *Robust and Error-Free Geometric Computing*. 1st Edition. CRC Press. ISBN 978-0367352943.

[5] https://mathworld.wolfram.com/Torus.html

[6] https://www.geometrictools.com/Documentation/TorusFitting.pdf
 
...
