---
title: Quine 
tags: [math, computer science, philosophy, divulgation]
style: fill
color: success
description: Quine programs and self-referential computing
---

![image](./image.png)

# Introduction

[Quine (computing) - Wikipedia](https://en.wikipedia.org/wiki/Quine_(computing))

## Implementation

### Writing a Quine Program in C++
```cpp
```

## Non-formal Mathematical Intuition

INSERT PDF

Let's put the previous document in more accessible terms. The basic idea is that we are constructing a **"manual of instructions for generating mathematical knowledge."**

### 1. Axiom as the Fundamental Basis

_"Every formal deductive system contains at least one undefined primitive element."_

- Axioms are like the **atoms** of mathematical thought—truths accepted without proof.
- Example in **Euclidean geometry**: _"A straight line can be drawn between any two points."_
- Similarly, axioms function like the **basic rules of a board game**—they are not questioned but accepted as a foundation.

### 2. Theorem as an Epistemic Morphism

_"A theorem is a morphism in the category of formal proofs [...]"_

- A **morphism** is a transformation between mathematical structures that preserves internal structure, like a recipe that converts ingredients into a cake while maintaining their essence.
- **Domain (Axioms) → Codomain (Conclusions)**. Example:
  - **Axioms**: Arithmetic rules
  - **Theorem**: \( a + b = b + a \) (commutativity)
  - **Morphism**: The logical process that derives this new truth from basic rules.
- The **commutativity of the logical diagram** ensures that regardless of the logical path taken, the same conclusion is reached.

### 3. Lemma of Conceptual Self-Support

_"For every formal system \( \Sigma \), there exists an injective function between definitions and theorems..."_

Breaking it down:
- **Formal system (\( \Sigma \))**: A set of rules and symbols (like chess: pieces + movement rules).
- **Injective function**: Each definition generates a unique theorem (like each key opens only one lock).
- **\( \Sigma \cup \{ \Sigma \} \)**: A system that can describe itself (like a dictionary that includes the word "dictionary").

Example:
- **Definition**: _Even number_ = integer divisible by 2
- **Generated theorem**: _The sum of two even numbers is even_
- The function \( \iota \) ensures that this theorem directly **emerges** from the definition.

### 4. Principle of Methodological Reflection

_"There exists an elementary embedding between a metamodel and its consistent extension."_

Discussion:
- **Metamodel (𝔐)**: Like the blueprint of a building.
- **Consistent extension (Con(𝔐))**: The actual constructed building, now including instructions for self-modification.
- **Elementary embedding (j)**: Ensures that everything true in the blueprint remains true in the expanded structure.

Example: Imagine a **video game that can modify itself while running**, without breaking its original rules.

### 5. Fundamental Theorem of Self-Referential Exposition

\[ \Sigma \vdash \text{Con}(E_{\Sigma}) \leftrightarrow \text{Con}(\Sigma) \]

- **\( \Sigma \)**: Your mathematical theory (e.g., number theory)
- **\( \text{Con}(\Sigma) \)**: "\( \Sigma \) does not allow contradictions"
- **\( E_{\Sigma} \)**: A user manual for \( \Sigma \) that includes instructions on how to use \( \Sigma \)
- **Equivalence**: If your theory is consistent, then its **"user manual"** is also consistent, and vice versa, avoiding the direct self-reference that Gödel blocks in his **Incompleteness Theorem**.

The act of explaining a mathematical theory does not introduce errors **if the original theory was solid.**

### 6. Corollary of Structural Integrity

\[ E_{\text{Comp}}(E) = E_{\text{Prof}}(E) \otimes E_{\text{Clar}}(E) \]

- **\( E_{\text{Comp}} \)**: Overall quality of exposition
- **\( E_{\text{Prof}} \)**: Technical depth
- **\( E_{\text{Clar}} \)**: Expository clarity
- **\( \otimes \)**: Harmonic combination (not a simple sum)

Analogous to **Einstein’s equation** \( E = mc^2 \), where the quality of exposition arises from the interaction between:
- **Mass (depth)**
- **Light (clarity)**

### 7. The Quinean System (Final Observation)

**Key Concept:**

- **Coherent self-reference**: The document uses the concepts it defines, creating a **loop of validity.**

- **Literary example**: A novel where the protagonist writes the novel you are reading.

### Logical Guarantee
Consistency emerges from the relationship between:

- **Syntax**: How symbols are written
- **Semantics**: What those symbols mean

