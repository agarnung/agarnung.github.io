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

And that's it, this image doesn't have more isocontours (let's assume the color is really uniform as it was synthetically generated, and let's not zoom in too much on it...). You don't believe this? Let's show its histogram. 

<img src="../assets/blog_images/2025-01-30-conformal-prediction/squares/hist.png" alt="hist" width=500 align="center">

Although it's a work in progress to create a nicer histogram, the image doesn't have more than 4 gray levels; tha is the number of isocontours.

A more complex example is shown below:

<img src="../assets/blog_images/2025-01-30-conformal-prediction/complex/original.png" alt="original" width=500 align="center">
<img src="../assets/blog_images/2025-01-30-conformal-prediction/complex/hist.png" alt="hist" width=500 align="center">
<img src="../assets/blog_images/2025-01-30-conformal-prediction/complex/displayImage.png" alt="displayImage" width=500 align="center">

As a curiosity, we used a ```std::set``` and a custom comparison criterion to iterate through the image pixels and assign a unique color to each level set:
```cpp

struct ScalarComparator {
bool operator()(const cv::Scalar& a, const cv::Scalar& b) const {
    if (a[0] != b[0]) return a[0] < b[0];
    if (a[1] != b[1]) return a[1] < b[1];
    return a[2] < b[2];
}
};

std::set<cv::Scalar, ScalarComparator> usedColors;

auto getUniqueColor = [&usedColors]() -> cv::Scalar {
static std::random_device rd;
static std::mt19937 gen(rd());
std::uniform_int_distribution<> dis(0, 255);

cv::Scalar color;
do {
    color = cv::Scalar(dis(gen), dis(gen), dis(gen));
} while (usedColors.find(color) != usedColors.end());

usedColors.insert(color);
return color;
};
```

But wait... aren't we cheating a bit? Aren't we predefining the number of isocontours that (we know, or something) the image has? Yes, and this was just for illustrative purposes. What we should do is analyze the number of "independent intensities" in the image to figure out how many level sets it should have. We will use the following image:

<img src="../assets/blog_images/2025-01-30-conformal-prediction/peppers/original.png" alt="original" width=500 align="center">
Its histogram and the number of level sets that we get are (approx.) the following:

<img src="../assets/blog_images/2025-01-30-conformal-prediction/peppers/hist.png" alt="hist" width=500 align="center">
They look something like this:

<img src="../assets/blog_images/2025-01-30-conformal-prediction/peppers/displayImage.png" alt="displayImage" width=500 align="center">
We found: 244 unique intensity values, i.e., 244 isocontours. That's quite a few! But they look somewhat off, maybe due to the presence of noise... Let's smooth the peppers a bit and try again:

<img src="../assets/blog_images/2025-01-30-conformal-prediction/smooth_peppers/original.png" alt="original" width=500 align="center">
Its histogram and the number of level sets that we get are (approx.) the following:

<img src="../assets/blog_images/2025-01-30-conformal-prediction/smooth_peppers/hist.png" alt="hist" width=500 align="center">
They look something like this:

<img src="../assets/blog_images/2025-01-30-conformal-prediction/smooth_peppers/displayImage.png" alt="displayImage" width=500 align="center">
This time we found: 226 isocontours. Since the image has been smoothed with a Gaussian, it has moved one step closer to its equilibrium state, so the number of level sets has decreased, and with that, the total variation (we will talk about this later). At least now it looks more visual.

Although we are only visually simplifying the concept of level sets, let’s take the exercise of asking ourselves a different question. Instead of asking, "If I specify the isocontours by setting the range of gray levels that generate them?", what about more abstract questions like "What if I specify the isocontours through other intrinsic properties of the image?" What attributes and methods can guide certain curves to form visually reasonable isocontours that separate structures that may resemble the objects in the image? Level sets are precisely tools that allow us to provide a robust answer to these abstract suggestions.

# Level sets

When working with images from a fascinating mathematical-applied perspective, explicit computational representation often proves insufficient and crude. It becomes necessary to rely on a mathematical representation in order to leverage mathematical tools through functions that appropriately characterize the properties of the image (such as piecewise smoothness) and natural scenes (richness in low frequencies) [7].

Throughout the history of science, the world that humans experience has been hypothesized through countless models, which have been tested over time. A typical model for images assumes that they are at least twice differentiable, meaning that (at least in a weak sense) the gradient and curvature of the image are well-defined throughout its entire domain (for all pixels). Based on this representation, images can be viewed as collections of level sets corresponding to certain intensity values; that is, for each brightness value, there exists a set of "companion" pixels (i.e., level sets).

Consider a grayscale image as a function with the aforementioned characteristics (at least twice continuously differentiable) and define the level set as the set of positions (pixels) in the image that share a specific brightness level. This is akin to partitioning the image into regions based on intensity, as we previously introduced with the equivalent concept of isocontours. In this way, the image can be represented as a family or collection of all the level sets, which depend on the "intensity" parameter.

This representation leads to the image domain being partitioned as the joint union of all disjoint level sets. Notice that with this type of representation, the normal vector to each level set is given by the gradient of the image. Since the curvature of a curve is defined as the rate of change of the unit normal vector along the curve, we obtain a fundamental relationship between these two geometric concepts. This connection can help constrain the solutions of our variational formulations in image processing problems from a mathematical perspective.

# Mathematical intuition

Level sets are extremely important in image processing from a variational perspective. Variational methods aim to minimize or maximize certain functionals to solve specific problems. In the case of level sets, the evolution of the contour is driven by the minimization of an energy functional, often related to the length of the boundary. This method naturally adapts to the underlying image structure, offering advantages in terms of robustness and flexibility in dealing with complex shapes.

Sea u=u(\textbf{x}) y f=f(\textfb{x}) dos funciones escalares  definidas en R^n, donde u es de hecho nuestra imagen,. asúmase que u es Lpischitz continua (i.e. que "no cambia demasiado rtápido") y que para casi toda lambda \in R, el level set L_lambda = {x \in R^n _: u(x)=lambda} es uns hipersuperficie suave de n-1 duimensiones en R^n. Asúmase también que f es continua e integrable. Así, se pude demostrar que se cumple la fórmula de co-area, que  se puede represetnar como:
  
integral_R^m |nabla u| f dx = integral_-inf_+inf (integral_L_lambda f ds) dlambda,

The co-area formula es una poderosa herramienta para el an´ñalisis funcoinal. It tells us that there existe una natrual conexiones between the total variation (TV) de una iamgen and the perimteres of its level sets.

Para el caso particular cuando f(x)=1 y la región de integración es un sunconjunto Omega c R^n, se tiene que:

inetgral_Omega |nabla u| * 1 * dx = integral_-inf_+inf (integral_L_lambda 1 ds) dlamda = integral_-inf_+inf Per(L_lambda, Omega) dlamda,

donde Per representa el perímetro. Este resultado muestra que la variacion total de una imagen es simplemente la usma de la .longitud de cada uno de sus conjuntos de nivel. En vez de integrar directamente en R^n,. se puede hacer integrando primero sobre cada level set L_lambda, que represetn todos los puntos donde la imagen vale lambda, y luego integrar a lo largo de los valores de lambda.

De esata forma, la contribuciónde todas las distcontinuidades (saltos) de la imagen son tomadas en consideración al calcular el valor de la integral, asegurando la contribución de lols bordes en el modelo de imaen dado por la TV. Esto no sucede en otros modelos de imagen, donde los bordes (gradientes) son altamente penalizados (como pasa por ejemplo con la norma Euclídea al cuadrado); el uso de esos modelos en p`rpocesamidetno de imagen da generalmente bordes no definidos. He aquí en parte que los level sets sean tan importantes para la aplicación que más adelante se comentará.

Verificaremos esto empíricamente. COmenzaremos calculando los levels sets de la siguiente imagen, acumularemos los perímetros de cada uno y además calcularemos el valor de la variación total (tanto isotrópica como anisotrópica) en todo el dominio mediante un esquema simple de  diferencias backward.

Esta es nuestra imagen :

<img src="../assets/blog_images/2025-01-30-conformal-prediction/kiel/original.png" alt="original" width=500 align="center">

Y estos son el histograma y los los level sets (tiene 256):

<img src="../assets/blog_images/2025-01-30-conformal-prediction/kiel/hist.png" alt="hist" width=500 align="center">
<img src="../assets/blog_images/2025-01-30-conformal-prediction/kiel/displayImage.png" alt="displayImage" width=500 align="center">

El valor del perímetro es 832868 (píxeles) y el valor de la variación total es 697204 (isotrópica) y 817512 (anisotrópica). El teorema parece no cumplirse precisamente. Y es que si nos fijamos, el modelo asumindo ( u(x, y) \in C²(Omega)) no se ajusta muy bien a esta imagen, que contiene una cantidad considerable de bordes, saltos rápidos de intensidad, ruiido impulsional y blanco(entre otros) y, sobre todo, una baja resolución y por tanto efectos fuertes discretización y cuantificación que menoscaban la modelización continua. Si, por el contrario, usamos una función (imagen) más suave (una Gaussiana 2D), desde luego de variación acotada (BV), como la siguiente, veremos qué pasa...:

<img src="../assets/blog_images/2025-01-30-conformal-prediction/kiBV_imageel/original.png" alt="original" width=500 align="center">

Y estos son el histograma y los level sets (tiene 256):

<img src="../assets/blog_images/2025-01-30-conformal-prediction/BV_image/hist.png" alt="hist" width=500 align="center">
<img src="../assets/blog_images/2025-01-30-conformal-prediction/BV_image/displayImage.png" alt="displayImage" width=500 align="center">

El valor del perímetro es 570025 (píxeles) y el valor de la variación total es 610659 (isotrópica) y 662554 (anisotrópica). Aunque todo indica a que ahora los valores tienden a acercarse, el teorema se sigue cumpliendo aún aproximadamente por los motivos antes mencionados derivados de la discretización y digitalización.

# What do we need level sets for?

The level set formulation is based on the observation that **a closed curve f(s) can be seen/described as a zero level(s)/crossing(s) of a function φ(x, y) in a higher dimension** (often called _characteristic function_ or _embedding function_) and it allows major simplification, easily changing topology and incorporating region-based statistics, which other parametric methods do not allow. That is, it uses an implicit representation of contours by evolving a level set function, often used in segmentation problems. Level sets allow for the dynamic modeling of contours that can split, merge, and move over time, making them a powerful tool for capturing complex shapes in images. In the context of image processing, level sets can be used to extract meaningful regions, detect edges, and segment images into distinct areas. Today, this is a widely used way to evolve curves and surfaces numeric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ally [4].

Level sets evolve to track and adjust to objects of interest by modifying the underlying function φ(x, y) instead of f(s). To reduce the amount of computation required, only a small strip (frontier) around the locations of the current zero-crossing needs to be updated at each step, which results in what are called fast marching methods [6].

For example, a curve in R² can be represented as the zero-level line of a function R²->R, e.g. the signed distance to the curve, negative inside and positive outside:

<img src="../assets/blog_images/2025-01-30-conformal-prediction/squares/ls.png" alt="lsa" width=500 align="center">

Mathematically, let us assume that the unknown set of edges K is the boundary of an open and bounded subset of Ω; thus K can be represented by K = {x ∈ Ω : φ(x) = 0} for some (unknown) Lipschitz continuous function φ : Ω → R, called a level set function. Unas condiciones más "continuas" y un método de cálculo de la longgitud de los contornos sub-píxel, entre otros, podrían ayudar a que la fórmula se cumpla más precisamente, pero pasaremos a distcutir otra interesante cuestión...

## Segmentation

The main purpose of segmentation is to find the contours of objects in images particionándola en regiones disjuntas. Two very established paradigms of image segmentation, within the framework of active contours, are parametric models (like the snakes of Kass, Witkin, and Terzopoulos and intelligent scissors (Mortensen and Barrett 1995) [5-6]) and *geometric deformable models* (like *Geodesic Active Contours* [GAC] by Caselles, Kimmel, and Sapiro) [1-3]. The latter are formulated to address the limitations of the former and are based on the evolution of curves (or surfaces) with a formulation grounded in *level sets*. This evolution is guided by geometric measures.

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
[7] Introducción a losmétodos variacionales en imagen -  Carlos Brito

