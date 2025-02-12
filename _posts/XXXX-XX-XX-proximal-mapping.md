---
title: Proximal mapping
tags: [math]
style: fill
color: success
description: An introduction to proximal mappings and operators
---

![p-map-intuition](./p-map-intuition.png)

# Introduction

En este post hablaremos sobre los mapeos proximales, ampliamente utilizados en optimización convexa, procesamiento de imagen y visión por computador [1]. Daremos un contexto teórico y los supeditaremos al procesamiento de imagen.

## Proximal mappings
El *proximal mapping* (o mapeo proximal) de una función \( g \) es una operación fundamental en optimización y análisis variacional. Se define como:

\[
\text{prox}_{\gamma g}(x) = \underset{y \in \mathbb{R}^N}{\arg\min} \left\{ \frac{1}{2} \|x - y\|^2 + \gamma g(y) \right\}
\]

para cualquier \( \gamma > 0 \).

Es decir, encontramos el punto en el punto en el conjunto convexo C más cercano a v en términos de la norma Euclidiana. Intuitivamente, este operador encuentra un punto \( y \) que equilibra entre estar cerca de \( x \) (minimizando la distancia cuadrática \( \|x - y\|^2 \)) y minimizar la función \( g(y) \), ponderada por el parámetro \( \gamma \). Es ampliamente utilizado en algoritmos de optimización proximal para resolver problemas con términos de regularización no diferenciables.

El mapeo proximal es una herramienta muy útil y potente en optimización convexa, pues es una generalización de la proyección sobre conjuntos convexos, lo que significa que peude usarse para resolver problemas de minimización con términos no diferenciables, como regularización L1 (Lasso) o la norma total variación (TV).

## Proximal algorithms

Aproximal algorithm is an algorithm for solving a convex optimization problem that uses the proximal operators of the objective terms. For example, the proximal minimization algorithm minimizes a convex function f by repeatedly applying prox_f to some initial point x0. Los algoritmos proximales, cuando más útiles son, es cuando los oepradores asociados se puede computar suficientemente eficiente.

As said in [3], Los algoritmos proximales son herramientas fundamentales en optimización debido a varias razones. En primer lugar, tienen una aplicabilidad muy amplia, ya que pueden operar en condiciones generales, incluyendo funciones no suaves y valores extendidos, lo que implica restricciones implícitas en el problema. En segundo lugar, pueden ser muy eficientes, dado que existen operadores proximales simples para funciones que, de otro modo, serían difíciles de manejar en un problema de optimización. Además, los algoritmos proximales son adecuados para la optimización distribuida, lo que los hace ideales para resolver problemas a gran escala. Otra ventaja importante es su simplicidad conceptual y matemática, lo que facilita su comprensión, derivación e implementación en problemas específicos. Por último, muchos algoritmos proximales pueden interpretarse como generalizaciones de métodos bien conocidos, como el gradiente proyectado, lo que los convierte en una adición natural al conjunto de herramientas básicas para quienes trabajan en optimización convexa.

# Varios Mapeos Proximales

En el sigiuiente documento derivaremos los mapeos proximales de algunas normas muy importantes.

INSERTAR PDF

# Aplicaciones

El proximal mapping es la herramienta que sirve como pilar de algoritmos muy conocidos como ISTA (Iterative Shrinkage-Thresholding Algorithm), FISTA (Fast ISTA) y ADMM (Alternating Direction Method of Multipliers), que se utilizan para resolver problemas de optimización **estructurados**, i.e.g, aquellos problemas en los que, en vez de construir todo "desde cero", utilizamos la estructura del problema (aprovechando propiedades como esparsidad, separabilidad, regularización, restrcción a ciertos espacios vectoriales...) para encontrar soluciones más rápido y con menos costo computacional.

# Referencias

[1] 3D POINTCLOUDSUPER-RESOLUTIONVIAGRAPHTOTALVARIATIONONSURFACE NORMALS
[2] https://www.numerical-tours.com/matlab/optim_4_fb/
[3] Proximal Algorithms Neal Parikh Department of Computer Science Stanford University npparikh@cs.stanford.edu Stephen Boyd Department of Electrical Engineering Stanford University boyd@stanford.edu
[4] https://math.stackexchange.com/questions/4566494/example-for-closed-proper-convex-function
