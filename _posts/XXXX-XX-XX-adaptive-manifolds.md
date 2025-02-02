---
title: Adaptive Manifolds
tags: [computer vision, image processing, geometry, divulgation]
style: fill
color: danger
description: A little known filtering technique.
---

![image](./intro.png)

# Introduction

Manifolds: "variedades" in Spanish. What are manifolds? From a geometric perspective, they are the **shapes** that differential geometry studies. These shapes are intuitively characterized by the fact that if we zoom in sufficiently, that is, locally, they look like an ordinary Euclidean space. For example, if we talk about the surface of the Earth (a spheroid), we are (approximately) talking about a manifold, because at a human level (i.e., locally), it is not difficult to discern under vague inspection whether we are looking at a plane or a surface with curvature. The assumption of manifolds allows us to transfer many of the tools of the 2D Euclidean world to curved spaces.

As a mathematical object, manifolds generalize the notion of a curved surface in higher-dimensional spaces; formally, they are defined as topological spaces that locally resemble (in a certain sense [1]) Euclidean space \( R^n \), but globally they may have a more complex structure. An \( n \)-dimensional manifold means that locally it behaves like \( R^n \); for example, a line (\( R^1 \)) is a 1D manifold, a surface like a sphere (\( R^2 \)) is a 2D manifold, and the space we live in (\( R^3 \)) is a 3D manifold.

However, in the context of machine learning and signal processing, manifolds are used to efficiently represent data in high-dimensional spaces, as every "small regions" in the manifold can be mapped to a euclidean space. For example, the pixels of an image may be distributed in a manifold within a larger feature space, which enables the filtering technique we will present below.

In many machine learning problems, data resides on a manifold with a more complex structure than a conventional Euclidean space. For example, in biomechanics, joint movement follows geometric constraints that define a configuration space manifold. Similarly, in natural language processing, semantic relationships between words form curved spaces where distances are not linear but shaped by linguistic structure. Meshes, which represent 3D surfaces, and graphs, where distances are measured by edge traversal rather than straight lines, are also examples of non-Euclidean domains. Understanding the underlying geometry of these data structures enables more precise analysis and processing techniques.

The article in [3] presents a methodology for image mosaicing that overcomes the limitations of traditional methods, which use predetermined manifolds based on the type of camera motion. The proposal involves projecting strips of images onto manifolds adapted to the camera's movement, allowing mosaicing in more general situations, such as forward motion, overcoming the constraints of previous techniques. This post will build upon the work in [4], where they develop a high-dimensional image and video filtering technique in real-time, which accelerates the process by calculating the filter's response at a reduced set of points and then interpolating for all pixels. This approach allows the filtering cost to be linearly dependent on both the number of pixels and the dimension of the space in which the filter is applied. The technique is flexible, capable of approximating several types of standard filters, and even performing a hybrid Euclidean-geodesic filter in a single pass. Additionally, it is faster and requires less memory than previous methods, proving effective in tasks such as color filtering, noise reduction, and detail enhancement.

# Adaptive Manifold

The underlying fact mentioned in the previous paragraph is well known; neural networks generate layers upon layers of high-dimensional vectors by applying linear and nonlinear operations to input data. In this context, data are represented in a coordinate system that maintains a relationship with the original Euclidean space but may have a more complex structure. Similarly, the pixels of an image are not randomly distributed but tend to organize themselves into an underlying structure. It is then possible to construct a high-dimensional adaptive manifold that approximates the distribution of pixels in a (sub)feature space.

The Adaptive Manifolds method exploits this structure to perform efficient filtering, preserving details and edges without the high computational costs of other approaches, such as the bilateral filter, which operates directly in the "Euclidean space" of pixels. Through a hierarchy of adaptive approximations, this method allows selective smoothing of the image while respecting important intensity transitions.

## 1. **Construction of the Adaptive Manifold**
Since the main idea is to represent an image \( u(\mathbf{x}) \) on an adaptive manifold \( \mathcal{M} \), the way we can make the manifold adaptive is by constructing it through a weighted mean (adaptive approximation) of the image:

\[
m(\mathbf{x}) = \frac{\int_{\Omega} G_s(\mathbf{x} - \mathbf{y}) I(\mathbf{y}) w(\mathbf{y}) d\mathbf{y}}{\int_{\Omega} G_s(\mathbf{x} - \mathbf{y}) w(\mathbf{y}) d\mathbf{y}}
\]

Where:

- **\( I(\mathbf{x}) \)** is the image value at pixel **\( \mathbf{x} \)**.
- **\( G_s(\mathbf{x} - \mathbf{y}) \)** is a Gaussian filter that smooths the image based on the spatial distance between pixels **\( \mathbf{x} \)** and **\( \mathbf{y} \)**. The standard deviation **\( \sigma_s \)** controls spatial smoothing.
- **\( w(\mathbf{y}) \)** is a weight function that controls the influence of each pixel **\( \mathbf{y} \)** in the approximation.
- **\( \Omega \)** is the image domain.

This equation defines an **adaptive weighted mean** of the image, which allows the image to be smoothed in a way that respects important intensity transitions, preserving edges and details.

## 2. **Segmentation into Adaptive Masks**

The next step in the filter is to divide the image into two regions based on comparison with the adaptive mean **\( m(\mathbf{x}) \)**. This is done to allow different treatment of image areas according to their relationship with the adaptive mean intensity.

- **Low Mask**: The region where image values are less than or equal to the adaptive mean \( m(\mathbf{x}) \):

\[
M_{\text{low}}(\mathbf{x}) = 1 \, \text{if} \, I(\mathbf{x}) \leq m(\mathbf{x})
\]

- **High Mask**: The region where image values are greater than the adaptive mean \( m(\mathbf{x}) \):

\[
M_{\text{high}}(\mathbf{x}) = 1 - M_{\text{low}}(\mathbf{x})
\]

This segmentation allows each region to be treated separately, facilitating edge preservation in intensity transitions.

## 3. **Projection onto the Adaptive Manifold**

Once the image has been segmented into low and high regions, each point in the image is projected onto the adaptive manifold using a weight based on the intensity difference between the current pixel **\( I(\mathbf{x}) \)** and the adaptive mean **\( m(\mathbf{x}) \)**:

\[
w(\mathbf{x}) = \exp \left( -\frac{(I(\mathbf{x}) - m(\mathbf{x}))^2}{\sigma_c^2} \right)
\]

Where **\( \sigma_c \)** controls sensitivity to intensity differences.

The result is a convolution with the Gaussian filter \( G_s \):

\[
I'(\mathbf{x}) = \frac{\int_{\Omega} G_s(\mathbf{x} - \mathbf{y}) w(\mathbf{y}) I(\mathbf{y}) d\mathbf{y}}{\int_{\Omega} G_s(\mathbf{x} - \mathbf{y}) w(\mathbf{y}) d\mathbf{y}}
\]

This equation performs a **weighted interpolation** on the adaptive manifold to smooth the image without losing important details.

## 4. **Recursive Filtering on the Manifold**

To improve filtering quality, it is applied recursively at multiple depth levels **\( d \)**:

\[
I_{d+1}(\mathbf{x}) = I_d(\mathbf{x}) + I_{\text{low}}(\mathbf{x}) + I_{\text{high}}(\mathbf{x})
\]

Where:

- **\( I_{\text{low}}(\mathbf{x}) \)** and **\( I_{\text{high}}(\mathbf{x}) \)** are the filtered components at each level.
- The results are combined hierarchically.

This recursion allows refining the filtering as more iterations are performed.

# Comparison with the Bilateral Filter

The bilateral filter is another popular method for smoothing images while preserving edges. However, the bilateral filter is less efficient because it calculates distances in a higher-dimensional space. The bilateral filter equation is:

\[
I'(\mathbf{x}) = \sum_{\mathbf{y} \in \Omega} G_s(\mathbf{x} - \mathbf{y}) G_c(I(\mathbf{x}) - I(\mathbf{y})) I(\mathbf{y}),
\]

where:

- **\( G_c \)** is a Gaussian filter in the spatial domain that attenuates pixels that are farther apart.
- **\( G_c \)** is a Gaussian filter in the intensity domain, smoothing intensity differences.

The key difference between the bilateral filter and the Adaptive Manifold Filter is that the latter avoids working directly in the high-dimensional intensity space of pixels. Instead, it uses an adaptive representation of the image, enabling more efficient filtering while preserving details and reducing computational costs.

To maintain a common framework, we will use the same sigma values for both filters. For $\sigma_s=5.0$, $\sigma_c=0.1$, adding Gaussian noise $N(0,0.05)$ and Poisson noise to the original image, these are the results for PSNR and execution time:

![original](./orig.png)

![noisy1](./noisy1.png)

![am1](./am1.png)

![bilat1](./bilat1.png)

For $\sigma_s=7.0$, $\sigma_c=0.25$, adding Gaussian noise $N(0,0.25)$ and Poisson noise:

![noisy](./noisy.png)

![am](./am.png)

![bilat](./bilat.png)

For $\sigma_s=5.0$, $\sigma_c=0.5$, adding Gaussian noise $N(0,0.25)$, Impulsive noise ($p=0.02$), and Poisson noise:

![noisy2](./noisy2.png)

![am2](./am2.png)

![bilat2](./bilat2.png)

We are fortunate that this filter is available in OpenCV (tested in C++); let’s try it out:

For $\sigma_s=16.0$, $\sigma_c=0.2$, adding Gaussian noise $N(0,0.25)$:

![noisy3](./noisy3.png)

![am3](./am3.png)

![bilat3](./bilat3.png)

# Conclusion

At high noise levels, the adaptive manifold method shows superiority over the bilateral filter, which is quite interesting. At low levels, the bilateral filter may perform better with small kernels, but if computational efficiency is the goal, the adaptive manifold is the better choice.

[1] Keenan Crane, DISCRETE DIFFERENTIAL GEOMETRY: AN APPLIED INTRODUCTION, 2023 p. 9
[2] Geometric Deep Learning Grids, Groups, Graphs, Geodesics, and Gauges Michael M. Bronstein1, Joan Bruna2, Taco Cohen3, Petar Veličković4 May 4, 2021
[3] Peleg, S., Rousso, B., Rav-Acha, A., & Zomet, A. (2000). Mosaicing on adaptive manifolds.
[4] Gastal, E. S. L., & Oliveira, M. M. (2012). Adaptive Manifolds for Real-Time High-Dimensional Filtering. ACM Transactions on Graphics (TOG), 31(4), 1–13.
[5] OpenCV. Adaptive Manifold Filter Documentation. Retrieved from https://docs.opencv.org/3.4/de/db7/classcv_1_1ximgproc_1_1AdaptiveManifoldFilter.html

