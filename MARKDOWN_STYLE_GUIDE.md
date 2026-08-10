# Guía de Estilo Markdown para Posts

Todos los posts deben empezar con un encabezado de metadatos (front matter), adaptado al título y contenido del post. Ejemplo:

```yaml
---
title: Geometric Deep Learning - First glance
tags: [machine learning, deep learning, math, geometry, divulgation]
style: fill
color: info
description: An initial overview of Geometric Deep Learning
---
```

## Reglas de Sintaxis Markdown

### 1. Títulos y Encabezados

- **Solo mayúscula en la primera palabra**: Los títulos deben tener solo la primera palabra en mayúscula, el resto en minúsculas.
  - ✅ Correcto: `## Este título`
  - ❌ Incorrecto: `## Este Título`
  - ✅ Correcto: `### Implementación práctica`
  - ❌ Incorrecto: `### Implementación Práctica`

### 2. Dos Puntos y Capitalización

- **Después de dos puntos, siempre minúscula**: Cualquier texto que siga a dos puntos debe comenzar con minúscula.
  - ✅ Correcto: `**Nota**: esto es importante`
  - ❌ Incorrecto: `**Nota**: Esto es importante`
  - ✅ Correcto: `**Ejemplo**: aquí está el ejemplo`
  - ❌ Incorrecto: `**Ejemplo**: Aquí está el ejemplo`

### 3. Negrita y Dos Puntos

- **Los asteriscos de negrita NO deben incluir los dos puntos**: Los dos puntos deben estar fuera de los asteriscos.
  - ✅ Correcto: `**palabra**: texto`
  - ❌ Incorrecto: `**palabra:** texto`
  - ✅ Correcto: `**Definición actual**: aquí va la definición`
  - ❌ Incorrecto: `**Definición actual:** aquí va la definición`

### 4. Ecuaciones Matemáticas

- **Usar doble `$$` para ecuaciones**: No usar bloques de código con `latex`, usar directamente `$$` para ecuaciones matemáticas.
  - ✅ Correcto:
    ```
    $$SQI = \alpha \cdot FCxA + \beta \cdot DPA$$
    ```
  - ❌ Incorrecto:
    ````latex
    ```latex
    SQI = \alpha \cdot FCxA + \beta \cdot DPA
    ```
    ````
- **Evitar `|` sin escapar en fórmulas inline dentro de párrafos**: En Markdown, el carácter `|` puede romper tablas o el renderizado. En distribuciones condicionales, usar `\mid` en LaTeX (e.g. `$$q(\mathbf{z} \mid \mathbf{x})$$`).
- **No mezclar negrita, `$...$` y enlaces en la misma expresión**: Patrones como `**$\beta$-[texto](url)**` suelen fallar en Kramdown/Jekyll. Usar `**[β-VAE](url)**` (carácter Unicode) o separar el enlace del símbolo matemático.

### 5. Imágenes

- **Rutas relativas desde el archivo markdown**: Las imágenes deben usar rutas relativas desde la ubicación del archivo markdown.
  - ✅ Correcto: `![Descripción](../unpublised_data/unpublised_images/2026-01-01-SQI/imagen.png)`
  - ❌ Incorrecto: `![Descripción](/opt/unpublished-posts/unpublised_data/...)`

### 6. Listas y Elementos

- **Consistencia en listas**: Mantener formato consistente en listas numeradas y con viñetas.
- **Espaciado**: Dejar una línea en blanco antes y después de listas cuando sea apropiado.

### 7. Código

- **Bloques de código con lenguaje específico**: Para código, usar bloques con especificación de lenguaje.
  - ✅ Correcto:
    ```cpp
    int main() {
        return 0;
    }
    ```
  - ❌ Incorrecto:
    ```
    int main() {
        return 0;
    }
    ```

### 8. Tablas

- **Formato estándar de tablas markdown**: Usar el formato estándar con pipes `|` y separadores `---`.
  - ✅ Correcto:
    ```
    | Columna 1 | Columna 2 |
    |-----------|-----------|
    | Valor 1   | Valor 2   |
    ```

### 9. Referencias a Código Existente

- **Usar formato de referencia de código**: Para referenciar código existente en el codebase, usar el formato `startLine:endLine:filepath`.
  - ✅ Correcto:
    ```12:14:app/components/Todo.tsx
    export const Todo = () => {
      return <div>Todo</div>;
    };
    ```

### 10. Puntos Finales en Listas y Enumeraciones

- **Siempre añadir punto al final de cada frase**: Todas las frases, incluyendo elementos de listas y enumeraciones, deben terminar con punto.
  - ✅ Correcto:
    ```markdown
    - **Consistencia**: años consecutivos de pago.
    - **Crecimiento**: tasa de crecimiento anual.
    ```
  - ❌ Incorrecto:
    ```markdown
    - **Consistencia**: años consecutivos de pago
    - **Crecimiento**: tasa de crecimiento anual
    ```
  - ✅ Correcto en enumeraciones:
    ```markdown
    1. **Primer punto**: explicación del primer punto.
    2. **Segundo punto**: explicación del segundo punto.
    ```
  - ❌ Incorrecto:
    ```markdown
    1. **Primer punto**: explicación del primer punto
    2. **Segundo punto**: explicación del segundo punto
    ```

### 11. Metadatos Front Matter

- **Formato YAML para front matter**: Usar formato YAML válido para metadatos al inicio del archivo.
  - ✅ Correcto:
    ```yaml
    ---
    title: Título del Post
    tags: [tag1, tag2]
    style: fill
    color: warning
    description: Descripción del post
    ---
    ```

### 12. Referencias bibliográficas y enlaces web

- **No inventar referencias**: Cada cita (autor, año, título, revista o conferencia) debe corresponder a una publicación real y verificable. No atribuir papers, libros ni autores que no existan o no digan lo que se afirma.
- **No inventar URLs**: No enlazar a páginas supuestas si no se ha comprobado que existen. Si no hay enlace fiable, dejar el texto sin hipervínculo.
- **Comprobar que los enlaces funcionan**: Antes de publicar, verificar que cada URL responde correctamente (idealmente HTTP 200). Si un enlace devuelve 404 o está roto, sustituirlo por una fuente alternativa válida (e.g. DOI, arXiv, PDF oficial) o quitar el enlace.
- **Priorizar fuentes oficiales**: DOI, arXiv, OpenReview, repositorios de conferencias (NeurIPS, ICML, etc.), sitios de editoriales y Wikipedia para definiciones conceptuales. Evitar blogs o artículos genéricos como única fuente de un paper o concepto técnico.
- **Codificar paréntesis en URLs de Wikipedia**: En Markdown, un `)` cierra el enlace. URLs como `Neural_network_(machine_learning)` deben escribirse con `%28` y `%29`:
  - ✅ Correcto: `https://en.wikipedia.org/wiki/Neural_network_%28machine_learning%29`
  - ❌ Incorrecto: `https://en.wikipedia.org/wiki/Neural_network_(machine_learning)`
- **Enlaces inline y bibliografía**: Los términos importantes del texto pueden enlazarse a fuentes oficiales; la sección final de referencias debe repetir las citas clave con enlace verificado.

### 13. Abreviaturas

- **Siempre usar `e.g.`**, nunca `p. ej.`, `p.e.` ni variantes como `eg`.
  - ✅ Correcto: `modelos secuenciales (e.g. VRNN, SRNN).`
  - ❌ Incorrecto: `modelos secuenciales (p. ej. VRNN, SRNN).`

### 14. Comillas

- **Usar comillas rectas `"`**, no comillas tipográficas `“` ni `”`.
  - ✅ Correcto: `usando los propios datos como "profesor".`
  - ❌ Incorrecto: `usando los propios datos como “profesor”.`

### 15. Paréntesis anidados

- **Nunca usar paréntesis dentro de paréntesis**. Esto incluye enlaces markdown `[texto](url)`: la URL va entre paréntesis, así que `[enlace](url)` dentro de `(...)` también cuenta como anidamiento.
- Si hace falta anidar aclaraciones **sin enlace**, usar como máximo dos niveles: paréntesis `( ... )` y, dentro, corchetes `[ ... ]`.
- **Preferir reescribir la frase** antes que añadir un tercer nivel de aclaración.
- **Si la aclaración lleva enlace**, no meter el enlace dentro de paréntesis; reescribir la frase fuera de `()` o limitar el enlace al texto que no va entre paréntesis.
  - ✅ Correcto: `esto es una frase (esto es una frase [aclaración]).`
  - ✅ Correcto: `e.g. [VRNN](url) de Chung et al., 2015, SRNN, DMM y KVAE.`
  - ✅ Correcto: `[**adversarial autoencoder**](url) (AAE).`
  - ❌ Incorrecto: `(e.g. [VRNN](url), SRNN).`
  - ❌ Incorrecto: `(e.g. VRNN (Chung et al., 2015), SRNN).`

### 16. Guiones largos

- **Evitar los guiones largos (`—`)**: deben ser super escasos; procurar no usarlos.
- Preferir comas, dos puntos, paréntesis con corchetes o reescribir la frase antes que un guion largo.
  - ✅ Correcto: `mantenimiento predictivo (PdM).`
  - ✅ Correcto: `[VRNN](url) de Chung et al., 2015.`
  - ❌ Incorrecto: `mantenimiento predictivo — PdM —.`
  - ❌ Incorrecto: `[VRNN — Chung et al., 2015 —](url).`

### 17. Enumeraciones entre paréntesis

- **Acostumbrar a cerrar con puntos suspensivos (`...`)** las enumeraciones entre paréntesis cuando la lista es representativa y no exhaustiva.
  - ✅ Correcto: `(maracas, cuerdas, pianos...)`
  - ❌ Incorrecto: `(maracas, cuerdas, pianos)`

## Resumen de Reglas Críticas

1. ✅ Títulos: solo primera palabra en mayúscula.
2. ✅ Dos puntos: texto después siempre en minúscula.
3. ✅ Negrita: dos puntos fuera de los asteriscos (`**palabra**:` no `**palabra:**`).
4. ✅ Ecuaciones: usar `$$`, no bloques `latex`; cuidado con `|`, negrita y enlaces mezclados.
5. ✅ Imágenes: rutas relativas desde el archivo markdown.
6. ✅ Puntos finales: siempre añadir punto al final de cada frase, incluso en listas y enumeraciones.
7. ✅ Referencias y enlaces: solo citas y URLs reales, comprobadas y funcionales; nunca inventadas.
8. ✅ Comillas: usar `"` rectas, no `“` ni `”`.
9. ✅ Abreviaturas: siempre `e.g.`; nunca `p. ej.` ni variantes.
10. ✅ Paréntesis: nunca anidar `()`; no meter `[texto](url)` dentro de `()`; como mucho `( [ ] )`.
11. ✅ Guiones largos: evitarlos; procurar no usarlos.
12. ✅ Enumeraciones entre paréntesis: cerrar con `...` cuando la lista no es exhaustiva.

## Ejemplos de Aplicación

### Ejemplo 1: Título y Texto
```markdown
## Implementación práctica

**Nota importante**: esto es una nota que explica algo importante.
```

### Ejemplo 2: Lista con Negrita
```markdown
**Factores a considerar**: 
- **Consistencia**: años consecutivos de pago.
- **Crecimiento**: tasa de crecimiento anual.
```

### Ejemplo 3: Ecuación
```markdown
La fórmula se expresa como:

$$SQI = \alpha \cdot FCxA + \beta \cdot DPA$$

Donde los coeficientes son:
```

### Ejemplo 4: Sección Completa
```markdown
### Análisis de componentes

**A) Relación PER Forward/Actual**: 

El primer componente captura las expectativas del mercado:

- **Mayor que 1**: expectativas de crecimiento.
- **Cercano a 1**: estabilidad esperada.
- **Menor que 1**: deterioro anticipado.
```

### Ejemplo 5: Enlace verificado
```markdown
La revisión de [Berahmand et al. (2024)](https://doi.org/10.1007/s10462-023-10662-6) ofrece una taxonomía actualizada.

## Referencias

- Berahmand, K., et al. (2024). Autoencoders and their applications in machine learning: a survey. *Artificial Intelligence Review*, 57, 28. [DOI](https://doi.org/10.1007/s10462-023-10662-6).
```
