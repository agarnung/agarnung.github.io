---
title: Linux tree
tags: [Linux, programming, divulgation]
style: fill
color: success
description: Briefly analyzing Linux tree structure
---

# Introduction

En el campo del procesamiento de imagen, el poder detectar y representar contornos de objetos y regionres de interes es crucial, ya sea en la detección de rostros, eliminaciónn de fondo, potenciacíon del seguimiento de objetos en vídeo o aplicaciones de MRI donde interesa estudiar complejos escaneos de las estructuras cerebrales. Los boundaries o contours de los objetos son muy bien capturados por un framework bastante poderoso matemáticamente, el level sets method, que ofrece una manera continua y flexible de represetnar curvas y superficies. En este post daremos una intuición de esta técnica.

Before level sets, lets first dig in the concept of _isocontour_. This concept is very intuitively understood; imagine an image as a mountain. The mountain is not a perfect inverted parabola, on the contrary, it has significant relief and texture; there are small and large stones along the path, bumps and ridges, gravel and sand act as sinks, rock formations create different levels in the terrain, there are even rivers and meanders that vary the average height of the mountainous surface, etc. When it rains, we experience that some areas "fill" before others. If we do some geoengineering and manage to provoke rain for a controlled period of time, we will see that multiple water paths have formed on the mountain, each flowing through different places but connected through the water molecules' connections within the same current. Each path with equal flow can be seen as a level set.

In digital images, its domain (typically grid-based) is mapped into a discrete set of values, e.g., {0, 255} if we are dealing with grayscale intensity levels. By zooming into an image, we will see that there are paths of "same grayscale," some more extended than others. Each of these paths, formed by pixels connected under a certain notion of neighborhood, is called a level set. In this post, we will see why they are so important and some of their most common uses.

We can begin drawing the concept of level sets by creating isocontours at various threshold levels of a grayscale image. The provided code generates distinct level sets by applying thresholding and then finding the contours at each threshold level. The contours are drawn with different colors, highlighting how the boundaries evolve at different intensity levels in the image.

Let's test this with the following image:

<img src="../assets/blog_images/2025-01-30-conformal-prediction/squares/original.png" alt="original" width=500 align="center">

How many isocontours might it have? Easy, 4, if we count the edge (exterior) of the image. And we can draw them:

<img src="../assets/blog_images/2025-01-30-conformal-prediction/squares/displayImage.png" alt="displayImage" width=500 align="center">

And that's it, this image doesn't have more isocontours (let's assume the color is really uniform as it was synthetically generated, and let's not zoom in too much on it...). 

A more complex example is shown below:

IMAGENES CON VARIOS NÚMEROS DE ISOCONTORNOS

Although we are only visually simplifying the concept of level sets, let’s take the exercise of asking ourselves a different question. Instead of asking, "If I specify the isocontours by setting the range of gray levels that generate them?", what about more abstract questions like "What if I specify the isocontours through other intrinsic properties of the image?" What attributes and methods can guide certain curves to form visually reasonable isocontours that separate structures that may resemble the objects in the image? Level sets are precisely tools that allow us to provide a robust answer to these abstract suggestions.

# What do we need level sets for?

Level sets are extremely important in image processing from a variational perspective. Variational methods aim to minimize or maximize certain functionals to solve specific problems. In the case of level sets, the evolution of the contour is driven by the minimization of an energy functional, often related to the length of the boundary. This method naturally adapts to the underlying image structure, offering advantages in terms of robustness and flexibility in dealing with complex shapes.

The co-area formula tells us that BLABLABLA.  
FORMULA

This tells us that the perimeter of the level sets and the total variation BLABLA are certainly equivalent.

The level set formulation is based on the observation that **a closed curve f(s) can be seen/described as a zero level(s)/crossing(s) of a function φ(x, y) in a higher dimension** (often called _characteristic function_ or _embedding function_) and it allows major simplification, easily changing topology and incorporating region-based statistics, which other parametric methods do not allow. That is, it uses an implicit representation of contours by evolving a level set function, often used in segmentation problems. Level sets allow for the dynamic modeling of contours that can split, merge, and move over time, making them a powerful tool for capturing complex shapes in images. In the context of image processing, level sets can be used to extract meaningful regions, detect edges, and segment images into distinct areas. Today, this is a widely used way to evolve curves and surfaces numerically [4].

Level sets evolve to track and adjust to objects of interest by modifying the underlying function φ(x, y) instead of f(s). To reduce the amount of computation required, only a small strip (frontier) around the locations of the current zero-crossing needs to be updated at each step, which results in what are called fast marching methods [6].

For example, a curve in R² can be represented as the zero-level line of a function R²->R, e.g. the signed distance to the curve, negative inside and positive outside:

<img src="../assets/blog_images/2025-01-30-conformal-prediction/squares/ls.png" alt="lsa" width=500 align="center">

Mathematically, let us assume that the unknown set of edges K is the boundary of an open and bounded subset of Ω; thus K can be represented by K = {x ∈ Ω : φ(x) = 0} for some (unknown) Lipschitz continuous function φ : Ω → R, called a level set function.

## Segmentation

The main purpose of segmentation is to find the contours of objects in images. Two very established paradigms of image segmentation, within the framework of active contours, are parametric models (like the snakes of Kass, Witkin, and Terzopoulos and intelligent scissors (Mortensen and Barrett 1995) [5-6]) and *geometric deformable models* (like *Geodesic Active Contours* [GAC] by Caselles, Kimmel, and Sapiro) [1-3]. The latter are formulated to address the limitations of the former and are based on the evolution of curves (or surfaces) with a formulation grounded in *level sets*. This evolution is guided by geometric measures.

Thus, the main purpose of segmentation through GAC and level sets is to model the contours of objects as curves that (typically) must move with a certain speed to match the highest gradients. The level set evolution for a GAC, the characteristic function φ is updated based on the curvature of the underlying surface modulated by an edge/speed function g(I), as well as the gradient of g(I), thereby attracting it to strong edges [6].

The problem is that dealing with the evolution of the curve in the image explicitly (i.e., parametrizing the curve and discretizing its equations) can be costly; that's why one of the main advantages of GAC is that it can be formulated as a *level set* problem, which tackles that difficulty. A *level set* \( \phi \) can be defined as follows:

- \( \phi(x, y) = 0 \) for all points \( (x, y) \) that are on the curve.
- \( \phi(x, y) > 0 \) for points inside the region delimited by the curve.
- \( \phi(x, y) < 0 \) for points outside the region delimited by the curve.

Thanks to this implicit representation, important geometric attributes like the unit normal to the curve can be calculated, which is obtained through:
   \[
   N = \frac{\nabla \phi}{|\nabla \phi|}
   \]
2. **The mean curvature** \( \kappa \), which is given by the divergence of the unit normal:
   \[
   \kappa = \nabla \cdot N = \text{div} \left( \frac{\nabla \phi}{|\nabla \phi|} \right)
   \]

The *Geodesic Active Contours* method is based on an evolution equation of the form:

\[
\frac{\partial \phi}{\partial t} = g(I) \left( |\nabla \phi| \cdot \text{div} \left( \frac{\nabla \phi}{|\nabla \phi|} \right) \right) + c g(I) |\nabla \phi|,
\]

where:
- \( g(I) \) is a function based on the image gradient that acts as a stopping criterion, i.e., it halts the evolution when the curve encounters a strong edge.
- The first part of the equation contains the mean curvature term, which smooths the curve.
- The second part contains a normal velocity term \( V \), which moves the curve according to the content of the image.

This formulation allows the curve to evolve flexibly, splitting or merging without explicit intervention. Thus, the level set-based method overcomes the limitations of traditional parametric methods in image segmentation. The Geodesic Active Contour model heavily relies on image edge information, so it is practically not applicable in images with poorly defined edges. Additionally, as it depends on local measures such as image gradients, it is susceptible to local minima. The pioneering Chan-Vese model is a variant of Active Contours and can be applied without the need for edges. Such approaches tackle this problem by making the energy measure the consistency of image statistics (e.g., color, texture, motion) inside and outside the segmented regions [6].

# References

[1] J.A. Sethian, *Level Set Methods and Fast Marching Methods: Evolving Interfaces in Computational Geometry, Fluid Mechanics, Computer vision, and Materials Science* (Cambridge University Press, Cambridge, 1999)  
[2] S. Osher, R. Fedkiw, *Level Set Methods and Dynamic Implicit Surfaces* (Springer, Berlin, 2002)  
[3] R. Kimmel, *Numerical Geometry of Images: Theory, Algorithms, and Applications* (Springer, Berlin, 2012)  
[4] Guy Gilboa *Nonlinear* page 29  
[5] *Mathematical Problems in Image Processing* page 173  
[6] Szielisky page 470

