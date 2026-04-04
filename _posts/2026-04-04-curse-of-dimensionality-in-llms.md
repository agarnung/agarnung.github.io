---
title: Maldición de la dimensionalidad en LLMs
tags: [computer science, divulgation]
style: fill
color: success
description: ¿Por qué no aparece la maldición de dimensionalidad en embeddings de LLMs?
---

La maldición de la dimensionalidad suele aparecer/preocupar cuando trabajamos con espacios de muchas dimensiones, pero entonces, si los embeddings de lenguaje tienen son vectores de cientos o miles de dimensiones, _¿por qué no aparece de la misma forma que en otros problemas?_

## ¿Qué es la maldición de dimensionalidad?

Antes de nada: [**la maldición de la dimensionalidad**](https://es.wikipedia.org/wiki/Maldici%C3%B3n_de_la_dimensi%C3%B3n) de [Bellman](https://es.wikipedia.org/wiki/Richard_Bellman) se refiere a varios fenómenos que ocurren cuando trabajamos en espacios de alta dimensión, que no ocurren en otros de baja dimensión:

* **Distancias se vuelven similares**: en espacios de alta dimensión, la mayoría de las distancias entre puntos tienden a ser muy similares (las distancias a los vecinos más cercanos y más lejanos ya no se vuelven muy parecias),
* **Volumen se concentra en la superficie**: la mayor parte del volumen de una esfera de alta dimensión está cerca de su superficie.
* **Datos se vuelven escasos**: se necesitan exponencialmente más datos para llenar un espacio de alta dimensión. El costo computacional puede crecer exponencialmente con la dimensión.

## ¿Por qué no aparece en embeddings de LLMs?

Hay varias razones clave por las que los _embeddings_ (vectores numéricos que representan el significa semántico de unidades de lenguaje como palabras o frases) de los modelos de lenguaje no sufren tanto este problema porque:

* Los embeddings viven en un **subespacio estructurado**: en teoría, la maldición aparece cuando los datos están **dispersos aleatoriamente** en un espacio de alta dimensión. Pero los embeddings de modelos basados en la arquitectura **Transformer** y, por tanto, no son aleatorios, sino que se **aprenden durante el entrenamiento**. Asimismo, el modelo empuja tokens con significado similar a **regiones cercanas** del espacio y, con esto, la distribución real suele ocupar un **subespacio de menor dimensión efectiva**. Es decir, aunque el vector tenga 768 o 4096 dimensiones, la **dimensión intrínseca** puede ser mucho menor, lo que reduce el efecto de la maldición.

* Las métricas usadas funcionan bien en alta dimensión: muchos problemas de alta dimensión ocurren con ciertas métricas (como la [distancia euclídea](https://es.wikipedia.org/wiki/Distancia_euclidiana) o [norma L2](https://es.wikipedia.org/wiki/Norma_vectorial#Ejemplos) pura). En embeddings se usan métricas como la [similitud coseno](https://es.wikipedia.org/wiki/Similitud_coseno), su versión [suave](https://es.wikipedia.org/wiki/Similitud_coseno#Similitud_Coseno_Suave) u [otras](https://www.youtube.com/watch?v=YDdKiQNw80c). Estas métricas funcionan bien porque **normalizan magnitudes** (pues no dependen del tamaño absoluto del vector) y **comparan ángulos, no distancias puras** (que hace que la separación semántica sea estable incluso con miles de dimensiones).

> [!TIP]
> La magnitud puede introducir ruido en el espacio de embeddings, porque esta puede variar por razones irrelevantes (e.g. frecuencia de palabras, escala que aplique el modelo, etc.) y no siempre captura significado semántico puro.

No solo esto, sino que aún más dimensiones pueden ayudar. Esto es porque en representaciones semánticas, **más dimensiones permiten codificar muchas propiedades a la vez**. Sin embargo, **cada dimensión no tiene un significado propio**, sino que el significado está **distribuido entre muchas dimensiones** ([_Distributed Representation_](https://deepai.org/machine-learning-glossary-and-terms/distributed-representation)). Así, propiedades como "diferenciado" o "agraviado" no están en un solo eje, sino en **patrones del vector completo**.

> [!TIP] Más dimensiones == más capacidad para representar combinaciones complejas, no "más etiquetas individuales".

Además, el entrenamiento regulariza el espacio. Esto significa que los embeddings se aprenden con **millones o miles de millones de ejemplos** y durante ese proceso se evita que los vectores se vuelvan arbitrarios, pues aparecen **estructuras geométricas útiles** de manera natural; algo observado en trabajos con modelos de aprendizaje de representaciones en espacios vectoriales como [Word2Vec](https://arxiv.org/abs/1301.3781), [GloVe](https://nlp.stanford.edu/pubs/glove.pdf) y otros modelos modernos de embeddings.

_El espacio aprendido tiene estructura que mitiga los problemas típicos de alta dimensión._

## Un [ejemplo famoso](https://p.migdal.pl/blog/2017/01/king-man-woman-queen-why/)

$$\text{vector("rey")} - \text{vector("hombre")} + \text{vector("mujer")} \approx \text{vector("reina")}$$

Esto muestra que el espacio aprendido tiene **estructura algebraica**; no es aleatorio.

Lo que sí aparece es **concentración de distancias**. En alta dimensión ocurre un fenómeno relacionado, y es que muchas distancias se vuelven similares; algo llamado como _**concentration of measure**_.

Por eso en sistemas reales se usan técnicas como **normalización** (para estabilizar las distancias), **reducción de dimensión (PCA)** (para reducir a dimensiones más manejables) o [**índices ANN (_Approximate Nearest Neighbor_)**](https://www.elastic.co/blog/understanding-ann) (para búsqueda eficiente en alta dimensión).

> [!NOTE] Visualización conceptual
> Imagínese un espacio de 4096 dimensiones como una habitación enorme. La maldición de dimensionalidad diría que los datos están dispersos aleatoriamente por toda la habitación.
>
> Pero en embeddings de LLMs:
>
> - Los datos están **organizados en regiones** (palabras similares cerca).
> - Ocupan un **subespacio de menor dimensión** (como una superficie de un objeto, o en las zonas de calor de la habitación).
> - Las **métricas usadas** (e.g. _cosine similarity_) son estables en este espacio estructurado.

Un acercamiento al tema algo menos básico: [Lecture 4 "Curse of Dimensionality / Perceptron" - Cornell CS4780 SP17](https://www.youtube.com/watch?v=BbYV8UfMJSA).
