---
title: Split Bregman
tags: [iamge processing, math]
style: fill
color: danger
description: The marvelous Split Bregman tool
---

![braq](./braq.png)

# Introduction

Alguna vez te has topado con un funcional que no sabes por donde cogerlo? COn alguna "mixtura" der normas y términos de fidelidad y regularización que no sabes manejar "de una", todos a la vez? A veces echas en falta un buen decoupling de las variables No? Pues cuando te pase, que sepas que existe una técnica llamada Split Bregamn que puede serte muy útil.

Echemnos un vistazo más aplio al asunto. En procesamiento de imagen una clase muy importante de problemas osn los convex programs involving classical regularization terms like l1, l2 or TV. Las soluciones de estos problemas suelen ser costosos (lentos) de computar, pero **Bregman iteration** techniques y sus variantes, como **linearized Bregman**, **split Bregman** and **Bregman operator splitting**. have been shown to yield simple, fast and effective algorithms for these types of problems. Todos estos algoritmos tienen interesantes conexiones con técnicas clásicas basadas en the **Lagrangian**, como  **method of multipliers**, the **alternating direction method of multipliers** (ADMM) , and the **alternating minimization algorithm** (AMA), for the general problem of minimizing sums of convex functionals subject to linear equality constraints. These algorithms can be especially effective when the convex functionals are based on the l1 norm and the l2 norm squared [4]. 

Si nuestro problema es conxevo, tenemos la certeza de que podemos usar nuestra navaja suiza de Split Bregan para acelerar su cómputo; además se suele prestar a análisis de convergencia estándar. 

> [!NOTE] Remmark 
> Compressed sensing se refiere a un paradigma que permite reconstruir señales o imaǵenes (e.g. en MRI) a partir de cantidades "muy escasas" datos. Los l1-regularized optimization problems han recibido mucha atención en este sentido. Y los métodos basados en iteraciones de Bregman surgieron para lidiar con las complicaciones en la resolución de estos problemas con la norma l1 y otros demasiado domain-specific.

## Bregman iteration

Bregman iteration [8] is a technique for solving constrained convex minimization problems of the form:

argmin_u J(u) s.t. (subject to) H(u) = 0,

where J and H are (possibly non-differentiable, asTV or the L1 norm) convex functionals defined que toman como argumento elementos de un espacio de Hilbert y devuelven valores reales. La idea principal de todo esto es la distancia de Bregman, deifnida como:

D^p_J (u, v) := J(u) - J(v) - <p, u - v>, p \in parc_J(v),

donde <p, u - v> es el producto interno entre p (que pertenece al subdiferncial [derivada en un sentido débil] de Jen el punto v) y el vecotr u-v. Actúa como el plano tangente a la función en v.

![bd](./bd.jpg)

D^p_J (u, v) compara el valor J(u) con el plano tangente (que en 1D es una línea) J(v) + <p, u-v>. Escogiendo una H diferenciable, el subdiferencial se convierte en el gradiente nabla_H. Esta no es estrictamente una distancia, pues no es necesariamente simétrica, pero mantiene muchas propiedades de distancia (ver [8]). En vez de medir distancia directa entre dos puntos, la mide como diferencias entr elos valores d ela función, comparando el valor J(u) con una aproximación lineal de J basada en supunto tangente J(v). En otras paralbras, mide la diferencia entre el valor de la función en u, que es J(u), u la mejor aproximación lineal de J(u) desde v.

De la figura se nota que se requiere convexidad para una aproximación lineal efectiva. La distancia tiene a cero cuando v tiende al óptimo \hat{u}. Así que, dado un puntoinicial u⁰ y un parámetro gamma>0, el algoritmo de iteración de Bregman es formalmente:

uk+1 = argmin_u D^p^k_J (u, uk) + gamma*H(u), p^k parc_J(u^k)

La condición de optimalidad se convierte en la Bregman iteration:
```
p⁰ ºin parc_J(u⁰)
for k=0,1,... do 
    u^k+1 = argmin D^p^k_J (u, uk) + gamma*H(u)
    p^k+1 = p^k - gamma * nabla_H(u^k+1)
```

## Split Bregman

La frecuentemente llamada "Split Bregman Iteration" para resolver problemas convexos consiste esencialmente en formular el unconstrained minization problem as a constrained problem and then apply Bregman iteration to solve it [2]. Esta transformación del problema nos da la ventaja de luego poder usar (variable) splitting para separarlo en subproblemas más fáciles de resolver. Además, usualmente es posible emplear la FFT para resolver algún subproblema, lo que lo dota de especial eficiencia. So, this splitting of Bregman iterations forms the Split Bregman mehtod, first introduced to this field in [12].

Así, si hay una frase que pueda definir al método, esta es _"descomponer problemas complicados en varios subproblemás más sencillos"_. DEfinitivamente, la idea de split bregman es aplicar **operator splitting** y **Bregman iteration** oara resolver problemas de minimzación restringida.

# Implementation example

Para tener un poco de bagaje y que podamos implementar nosotros mismos el algoritmo, garabatearemos un ejemplo.

UN caso importante es cuando la imagen u \in R^n con restricciones linear equality. Sea A una atriz y H(u)=1/2||Au-f||_2², cuando A=I estamos ante el infame modelo ROF: 

min_u integral_Omega |grad u|_L2 d\mathbf{x} + lambda/2 integral_Omega u(\mathbf{x} - f(\mathbf{x})^2 d\mathbf{x}),

y la iteración de Bregman se simplifica a:

```
u \in R^n, b⁰ =0
for k=0,1,... do 
    u^k+1 = argmin J(u) + gamma/2 * ||Au-f+b^k||_2²
    b^k+1 = b^k + A * u^k+1 - f,
```

donde b^k es una vriable auxiliar añadida en le penalización cuadrática, que representa al subdiferencial p^k. Cuando las resitrcciones son lineales, esto es equivalente al método de AugmentedLagrangian (i.e. método de los multiplicadores) y está demostrado que converge a la solución tanto para el caso de TB isotrópico como anisotrópico [13].

Retomando esto con más detenimiento: Applying the operator splitting technique, convirtámoslo es un problema de optimizacion restringido:

min_d,u sum_i,j|d_i,j| + lambda/2 sum_i,j(f_i,j - u_i,j)²  s.t.  d_i,j = grad u_i,j

Por el hecho de integrar la variable d_i,j en lugar del gradiente de u conseguimos que los dos términos del funcional realmente no interactúen. AAsí, podemos resolverlo de manrea iterativa donde en cada iteración ,mantenemos una de las variables fijas y optimizamos el funcional con respecto a la otra. Pero primero debemos reconvertirlo de vuelta en un problema uncontrained...

Introduciendo un parámetros de penalizacíon gamma > 0 y una variable auxiliar bi,j (relacionada con la Bregamn iteration) que compensa el error para forzar que se cumpla la restricción impuesta:

min_d,u sum_i,j|d_i,j| + lambda/2 sum_i,j(f_i,j - u_i,j)² + gamma/2 sum_i,j |d_i,j - grad u_i,j - b_i,j|²

En [12] se propuso to solve the above-mentioned problem by an alternating direction approach: 

1. Compute the Euler-Lagrange equation of the **u-subproblem** with d fixed and solve it (may be solved for u in the frequecny domain (DFT or DCT with periodic boundary condition) or by the iterative matrix techniques such as the Gauss-Seidel or Jacobi iterative methods, as Goldstein & Osher proposed [12]).

2. compute the solution of the **d-subproblem** with u fixed by means of a projection or shrinkage/soft-threasholding, que impone sparsity controlando (en la dirección de gra u_i,j + b_ij) la magnitud de d_ij (i.e. que muchos ele,mentos de la solución tiendan ser cero o pequeños, regularizando para reducir el ruido co caracteŕisicas no esenciales). Este problema se desacopla sobre el espacio, lo que significa que se puede resolver independientemente para cada píxel..

3. The auxiliary variable b is initialized to zero and updated as bk+1 = bk + uk+1 dk+1.  A good choice of is one for which both d and u subproblems converge quickly and are numerically well-conditioned. In d subproblem, the shrinking effect is more dramatic when issmall. In u subproblem, the effect of and increase when  gets larger. It is also ill-conditioned in the limit gamma -> infinite. Therefore, should be neither extremely large nor small for good convergence [11].

Cabe mencionar que una manera alternativa de ver este procedimiento es que: primero se hace las sustituciones de las variables oportunas (e.g. d_i,j = grad u) , lo cual impone **aproximadamente** las restricciones de igualdad, por ejemplo, añadiendo penalizaciones cuadráticas:

(u^*, d^*) = argmin_u_d ||d||_1 + lambda/2 ||f-u||_2² + gamma/2||d - grad_u||_2²,

y luego querremos reforzar **exactamente** la restricción de igualdad d = grad_U aplicando bregman iteration al problema no restringido, lo cual ya nos leva al procedimiento descrito. Estos osn los pasos que componen SPlit Bregman.

Un sencillo pseudocódigo de este procedimineto nos sirve como regla mnemotécnica:

```
initialize u = f, d = b = \mathbf{0}
while ||ucurrent - uprevious||_2² / ||ucurrent||_2² > relative_tolerance do
    solve the u-subproblem
    solve the d-subproblem
    b <- b^k + grad_u - d
```

# Aplicaciones

## TV inpainting

En [1] se implementa un inpainting basado en TV mediante S-B. La gran ventaja es que la formulación para inpainting es igual que para la de denoising (y casi igual para deblurring) salvo por the stially-varying lambda in the u subproblem.

## TV-TV² inpainting

EN [2] se implementa un inpainting basado en TV-TV^2 mediante S-B.

# Deconvolution

En [14] usan el enfoque explicado para deconvolutión y no mantienen gamma fijo, sino que lo incrementan en cada iteración.

[1] Pascal Getreuer Total Variation Inpainting using Split Bregman http://www.ipol.im/pub/art/2012/g-tvi/ 
[2] Konstantinos Papafitsoros, Carola Bibiane Schoenlieb, Bati Sengul Combined First and Second Order Total Variation Inpainting using Split Bregman http://www.ipol.im/pub/art/2013/40/
[3] Yin, W., Osher, S., Goldfarb, D., Darbon, J., Bregman Iterative Algorithms for l1-Minimization with Applications to Compressed Sensing, UCLA CAM Report [07-37], 2007
[4] Applications of Lagrangian-Based Alternating Direction Methods and Connections to Split Bregman Ernie Esser March 2009
[5] An edge-weighted second order variational model for image decomposition Jinming Duan et al. 2015
[6] Handbook of  Mathematical Methods in Imaging Otmar Scherzer Second Edition 2015 ISBN 978-1-4939-0789-2 DOI 10.1007/978-1-4939-0790-8
[7] Image  denoising  feedback  framework  using  split  Bregman approach Jeong Heon Ki  et al 2017
[8] RudinOsherFatemi Total Variation Denoising using Split Bregman Pascal Getreuer 2012
[9] A regularization model with adaptive diffusivity for variational image denoising Po-Wen Hsiehet al 2017
[10] Variational Models and Numerical Methods for Image Processing Jia-Wei Liao 2020
[11] Variational Models and Numerical Methods for Image Processing Suh-Yuh Yang  2020
[12] THE SPLIT BREGMAN METHOD FOR L1 REGULARIZED PROBLEMS TOM GOLDSTEIN, STANLEY OSHER 2009
[13] E. Esser, Applications of Lagrangian-Based Alternating Direction Methods and Connections to Split Bregman, UCLA CAMReport09-21, 2009. ftp://ftp.math.ucla.edu/pub/camreport/ cam09-31.pdf
[14] Total variation blind deconvolution employing split Bregman iteration Weihong Li et al 2012
