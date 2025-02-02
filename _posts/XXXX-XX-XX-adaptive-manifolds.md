---
title: Adaptive Manifolds
tags: [computer vision, image processing, geometry, divulgation]
style: fill
color: danger
description: A little know filtering technique.
---

![image](IMAGEN DE KEENAN)

# Introduction

Manifolds: "variedades" in spanish. ¿Qué son los manifolds? Desde una perspectiva geométrica, son las **formas** que la geometría diferencial estudia. Estas formas se caracteŕizan, de manera intuitiva, por que si no acercamos conun zoom lo suficientemne grande, es decir, en la localidad, se ven como un espacio Euclídeo ordinario. Por ejemplo, si hablamos de la superficie de la Tierra (un esferoide), estamos hablando (aproximadamente) de un manifold, pues en ella, a un nivel humano (i.e. local), no es difícil discernir bajo inspección vaga si estamos viiendo en un plano o en una superficie con vurvatura. La asunciónd e los manifolds nos permite trasladar muchas de las herramientas del mundo Euclídeo 2D a espcaios curvos,.

COmo objeto matemático, los manifolds generalizan la noción de superficie curva en espacios de mayor dimensión; formalmente, se definen como espacios topológicos que localmente se parecen (en cierto sentido [1]) al espacio eculídeo R^n, pero globalmente puede tenre una estructura más compleja. UN manifold de dimensión n significa que localmente se comprta como R^n; por ejemplo,. uma linea (R¹) es un manifold 1D, una superficie como una esfera (R²) es un manifold 2D y el espacio en que vivimos (R³) es un maniofld 3D.

Pero, en el contecto del aprendizahje automático y procesamiento de señales, los manifolds se usan para represetnar datos en espacios de alta dimesión de menra eficiente. Por ejemplo., lo spíxeles de una imagen puieden estar distributidos en un manifold dentro de un espacio de características más grande, lo que permite aplicar para la técnica de filtrado que presentaremos a continuación.

# Adaptive Manifold

Es archiconocido el hecho subyacente al párrafo anterior; las redes neuronales generan capas y capas de vectores de alta dimensión a partir de aplicar operaciones lineales y no lineales a los datos de entrada. EN este contexto, los datos pasan a ser representados en un sistema de coordenadas que mantiene una relación con el del espacio euclídeo original, pero que puede tener una estructura más compleja. Similarmente, los píxeles de una imagen no están distirbutidos de manera aleatoria, sino que tienden a organizarse en una estructura subyacente. Es posible entonces contruir un adaptive manifold de alta dimensión que funcione como una aproximación de la distribución de los píxeles en un espacio de (sus) caracteŕisticas.

El método Adaptive Manifolds explota esta estructura para realizar un filtrado eficiente, preservando detalles y bordes sin los altos costos computacionales de otros enfoques, como el filtro bilateral, que operan directamente ne el "espcio euclídeo" de los píxeles. A través de una jerarquía de aproximaciones adaptativas, este método permite suavizar la imagen de manera selectiva, respetando las transiciones de intensidad importantes.

## 1. **Construcción de la Variedad Adaptativa**
Como la idea principal es representar una imagen \(u(\mathbf{x})\) en un manifold adaptativo \(\mathcal{M}\), la manera en que podemos hacer que el manifodl sea adaptativo es construirlo a través de una media ponderada (aproximación adaptativa) de la imagen:

\[
m(\mathbf{x}) = \frac{\int_{\Omega} G_s(\mathbf{x} - \mathbf{y}) I(\mathbf{y}) w(\mathbf{y}) d\mathbf{y}}{\int_{\Omega} G_s(\mathbf{x} - \mathbf{y}) w(\mathbf{y}) d\mathbf{y}}
\]

Donde:

- **\( I(\mathbf{x}) \)** es el valor de la imagen en el píxel **\( \mathbf{x} \)**.
- **\( G_s(\mathbf{x} - \mathbf{y}) \)** es un filtro Gaussiano que suaviza la imagen en función de la distancia espacial entre los píxeles **\( \mathbf{x} \)** y **\( \mathbf{y} \)**. La desviación estándar **\( \sigma_s \)** controla el suavizado espacial.
- **\( w(\mathbf{y}) \)** es una función de peso que controla la influencia de cada píxel **\( \mathbf{y} \)** en la aproximación.
- **\( \Omega \)** es el dominio de la imagen.

Esta ecuación define una **media ponderada adaptativa** de la imagen, lo que permite que la imagen se suavice de manera que respete las transiciones de intensidad importantes, preservando bordes y detalles.

## 2. **División en Máscaras Adaptativas**

El siguiente paso en el filtro es dividir la imagen en dos regiones basadas en la comparación con la media adaptativa **\( m(\mathbf{x}) \)**. Esto se hace para permitir un tratamiento diferente de las áreas de la imagen según su relación con la intensidad media adaptativa.

- **Máscara Baja**: La región donde los valores de la imagen son menores o iguales a la media adaptativa \( m(\mathbf{x}) \):

\[
M_{\text{low}}(\mathbf{x}) = 1 \, \text{si} \, I(\mathbf{x}) \leq m(\mathbf{x})
\]

- **Máscara Alta**: La región donde los valores de la imagen son mayores a la media adaptativa \( m(\mathbf{x}) \):

\[
M_{\text{high}}(\mathbf{x}) = 1 - M_{\text{low}}(\mathbf{x})
\]

Esta segmentación permite tratar cada región de forma separada, lo que facilita la preservación de bordes en las transiciones de intensidad.


## 3. **Proyección en la Variedad Adaptativa**

Una vez que la imagen se ha segmentado en las regiones baja y alta, cada punto de la imagen se proyecta en la variedad adaptativa utilizando un peso basado en la diferencia de intensidad entre el píxel actual **\( I(\mathbf{x}) \)** y la media adaptativa **\( m(\mathbf{x}) \)**:

\[
w(\mathbf{x}) = \exp \left( -\frac{(I(\mathbf{x}) - m(\mathbf{x}))^2}{\sigma_c^2} \right)
\]

Donde **\( \sigma_c \)** controla la sensibilidad a las diferencias de intensidad.

El resultado es una convolución con el filtro Gaussiano \( G_s \):

\[
I'(\mathbf{x}) = \frac{\int_{\Omega} G_s(\mathbf{x} - \mathbf{y}) w(\mathbf{y}) I(\mathbf{y}) d\mathbf{y}}{\int_{\Omega} G_s(\mathbf{x} - \mathbf{y}) w(\mathbf{y}) d\mathbf{y}}
\]

Esta ecuación realiza una **interpolación ponderada** sobre la variedad adaptativa, con el fin de suavizar la imagen sin perder detalles importantes.


## 4. **Filtrado Recursivo sobre la Variedad**

Para mejorar la calidad del filtrado, se aplica de manera recursiva en múltiples niveles de profundidad **\( d \)**:

\[
I_{d+1}(\mathbf{x}) = I_d(\mathbf{x}) + I_{\text{low}}(\mathbf{x}) + I_{\text{high}}(\mathbf{x})
\]

Donde:

- **\( I_{\text{low}}(\mathbf{x}) \)** y **\( I_{\text{high}}(\mathbf{x}) \)** son los componentes filtrados en cada nivel.
- Se combinan los resultados de forma jerárquica.

Esta recursividad permite refinar el filtrado a medida que se realizan más iteraciones.

## 5. **Comparación con el Filtro Bilateral**

El filtro bilateral es otro método popular para suavizar imágenes mientras preserva los bordes. Sin embargo, el filtro bilateral es menos eficiente porque realiza el cálculo de la distancia en un espacio de mayor dimensión. La ecuación del filtro bilateral es la siguiente:

\[
I'(\mathbf{x}) = \sum_{\mathbf{y} \in \Omega} G_s(\mathbf{x} - \mathbf{y}) G_c(I(\mathbf{x}) - I(\mathbf{y})) I(\mathbf{y}),
\]

donde:

- **\( G_c \)** es un filtro Gaussiano en el dominio espacial que atenúa los píxeles que están más alejados entre sí.
- **\( G_c \)** es un filtro Gaussiano en el dominio de intensidad, que suaviza las diferencias de intensidad.

La diferencia clave entre el filtro bilateral y el Adaptive Manifold Filter es que este último evita trabajar directamente en el espacio de alta dimensión de las intensidades de los píxeles. En cambio, utiliza una representación adaptativa de la imagen, lo que permite realizar el filtrado de manera más eficiente sin perder preservación de detalles y reduciendo los costos computacionales.

Para sigma_s=5.0, sigma_c=0.1, añadiendo ruido Gaussiano N(0,0.05) Y Poisson A LA IMAGEN ORIGINAl, estos son los resultados de PSNR y tiempo de ejecución: 

![original](./orig.png)

![noisy1](./noisy1.png)

![am1](./am1.png)

![bilat1](./bilat1.png)

Para sigma_s=7.0, sigma_c=0.25, añadiendo ruido Gaussiano N(0,0.25) Y Poisson: 

![noisy](./noisy.png)

![am](./am.png)

![bilat](./bilat.png)

Para sigma_s=5.0, sigma_c=0.5, añadiendo ruido Gaussiano N(0,0.25), Impulsional (p=0.02) Y Poisson: 

![noisy2](./noisy2.png)

![am2](./am2.png)

![bilat2](./bilat2.png)


# Conclusión

Ante niveles altos de ruido, se nota una dominancia del método adaptive manifold sobre el bilateral, algo muy interesante. Ante niveles bajos, el biltro filateral puede filtrar mejor con kernels pequeños, pero si lo que se desea es eficiencia computacional, adaptive manifold es la opción a elegir.

[1] Keenan Crane, DISCRETE DIFFERENTIAL GEOMETRY: AN APPLIED INTRODUCTION, 2023 p. 9
