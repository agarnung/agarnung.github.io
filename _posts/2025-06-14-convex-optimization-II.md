---
title: Convex Optimization II
tags: [math]
style: fill
color: none
description: Solving a real LP basic problem
---

# Introducción

A veces los problemas ejemplares en optimización convexa ya parten de una formulación matemática, la cual luego se fuerza a encajar en una aplicación específica. Pero este enfoque solo lo "sigue" bien alguien que ya ha pasado por el entrenamiento de saber precisamente cómo funciona la optimización convexa.

Aquí vamos a tratar de hacerlo al revés, como es debido, formulando un caso de uso del día a día y luego entendiendo cómo podemos "castearlo" como un problema de optimización convexa.

Concretamente, este post lo dedicaremos a la programación lineal (LP), uno de los más sencillos tipos de optimización convexa donde tanto la función objetivo como las restricciones son combinaciones lineales de las variables de decisión.

En la vida real las personas se enfrentan a situaciones donde tienen que tomar decisiones complejas con recursos limitados y objetivos claros (como ganar más, gastar menos, entregar más rápido...), pero no están pensando en “sistemas de desigualdades lineales” o “funciones objetivo”.

# Pongamos un ejemplo

Imaginemos un **restaurante** pequeño que ofrece cuatro platos principales en su menú:

- Pasta al pesto (P1)
- Pollo al curry (P2)
- Hamburguesa clásica (P3)
- Pescado con patatas (P4)

Cada uno de estos platos requiere cierta cantidad de ingredientes (como pasta, carne, verduras, pan, etc.), pero también requieren tiempo de cocina. Y resulta que el restaurante tiene recursos limitados cada día: solo cierta cantidad de ingredientes y solo cierto número de horas de trabajo del chef.

¿Cuál es el objetivo del dueño? Quiere saber cuántos de cada plato debería preparar al día para maximizar las ganancias, usando los recursos que tiene y sin sobrepasarlos.

¿Qué datos conoce el dueño?

El precio al que se vende cada plato:

- P1 deja 6 € de ganancia
- P2 deja 4 €
- P3 deja 7 €
- P4 deja 5 €

El restaurante dispone, por día, de:

- 40 kg de ingredientes generales
- 30 frascos de salsa especial
- 10 horas de cocina

El uso de recursos por plato es algo así:

| Plato | Ingredientes (kg) | Tiempo cocina (h) | Salsa especial (unid.) |
|-------|--------------------|--------------------|----------------------|
| P1    | 0.3                  | 0.75                  | 0                    |
| P2    | 0.6                  | 0.5                  | 2                    |
| P3    | 0.75                  | 0.25                  | 1                    |
| P4    | 0.5                  | 1                  | 1                    |

¿Cuál es el problema? El dueño del restaurante no puede cocinar platos ilimitados, porque se queda sin tiempo, sin salsa o sin ingredientes (recursos). Entonces se pregunta: “¿Cuál es la combinación óptima de platos que debo preparar al día para ganar lo máximo posible, sin pasarme de los ingredientes ni del tiempo de cocina?” (obviamente, independiente de lo que quiera la gente [aquí se ofrece lo que está preparado...]).

Esta es la intuición del problema. No hay ecuaciones todavía, pero ya se empieza a ver la naturaleza del dilema: asignar recursos limitados para maximizar una ganancia.

# Resolución

Ahora podemos formular el problema como una optimización lineal (y por tanto convexa):

Nuestras variables (de decisión) son:

- x1: número de platos P1 (pasta)
- x2: número de platos P2 (pollo)
- x3: número de platos P3 (hamburguesa)
- x4: número de platos P4 (pescado)

Función objetivo (ganancia total a maximizar, considerando ganancias unitarias por producto):

$$
max Z = 6x_1 + 4x_2 + 7x_3 + 5x_4
$$

Las restricciones, especificadas por los recursos, son:

Ingredientes:

$$
3x1+4x2+5x3+2x4≤40
$$

Tiempo de cocina:

$$
2x1+1x2+3x3+2x4≤20
$$

Salsa especial:

$$
0x1+1x2+1x3+1x4≤30
$$
     
Además, queremos hacer, como mínimo, 2 P1, 4 P2, 5 P3 y 3 P4 (porque sí; e.g. en base a lo que solemos vender normalmente):

$$
x1​≥2
$$

$$
x2≥4
$$

$$
x3≥6
$$

$$
x4≥3
$$

No podemos "anticocinar" platos:

$$
x1,x2,x3,x4≥0
$$

El código, usando la librería de optimización en Python Pyomo, está disponible [aquí](https://github.com/agarnung/computerVisionMiscellaneous/tree/main/2025-06-14-convex-optimization-II).

La combinación de platos óptima que nos da el mayor beneficio es (tras optimizar):

```txt
Resultado de optimización:
P1: 2 platos
P2: 4 platos
P3: 14 platos
P4: 3 platos
Ganancia total: 141.00 €
```

Si el lector no confía en las propiedades de la optimización convexa o en el sover utilizado, en el script también se comprueba que la solución encontrada es óptima verificando con búsqueda exhaustiva que la ganancia encontrada es la máxima que respeta las restricciones:

```txt
Mejor combinación encontrada por búsqueda exhaustiva: {'P1': 2, 'P2': 4, 'P3': 14, 'P4': 3}
Ganancia máxima encontrada: 141.00 €
La solución del solver es óptima.
```

# Referencias 

- Chong, E. K. P., & Zak, S. H. (2001). Introduction to Optimization (2nd ed.). Wiley-Interscience Series in Discrete Mathematics and Optimization. John Wiley & Sons, Inc. pág. 257.

- Bangerth, W. (2017). Examples of optimization problems [Lecture slides]. Departamento de Matemáticas, Colorado State University. https://www.math.colostate.edu/~bangerth/teaching/2017-spring-561/optimization-slides.pdf
