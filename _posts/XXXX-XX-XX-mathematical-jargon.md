---
title: Mathematical jargon
tags: [math]
style: fill
color: success
description: Some commentaries about frequent concepts used in mathematical papers
---

see https://www.youtube.com/watch?v=PW63TDvdlBk&ab_channel=QuocDatPhung

![image](./image.png)

# Introduction

The other day, I was reading [some articles](https://pmc.ncbi.nlm.nih.gov/articles/PMC4575179/pdf/pone.0138682.pdf) on denoising and joint deconvolution for image processing, and I came up with a newbie question: what is the difference between Theorems, Propositions, Lemmas, etc., which are common in mathematical literature? In this post, we'll give an intuition for each one, so that next time you write a paper, you can use them more consciously and choose the one that fits best to convey your idea to the reader. Though it's worth mentioning that there is no well-established rule, and many people have their quirks and preferences regarding this language and the contexts in which each term should be used.

## _Theoretize, prove and define_

- **Definition**: An explanation of the mathematical meaning of a word. a precise and unambiguous description of the meaning of a mathematical term.  It characterizes the meaning of a word by giving all the properties and only those properties that must be true.
- **Theorem**: A very important true statement that can be proven in terms of definitions and axioms. a mathematical statement that is proved using rigorous mathematical reasoning.  In a mathematical paper, the term theorem is often reserved for the most important results.
- **Proposition**: A statement of fact that is true and interesting in a given context. a proved and often interesting result, but generally less important than a theorem.
- **Lemma**: A true statement used to prove other true statements. a minor result whose sole purpose is to help in proving a theorem.  It is a stepping stone on the path to proving a theorem. Very occasionally lemmas can take on a life of their own (Zorn’s lemma, Urysohn’s lemma, Burnside’s lemma, Sperner’s lemma).
- **Corollary**: A true statement that is a simple deduction from a theorem or proposition. a result in which the (usually short) proof relies heavily on a given theorem (we often say that “this is a corollary of Theorem A”).
- **Proof**: The explanation of why a statement is true.
- **Conjecture**: A statement believed to be true, but for which we have no proof. a statement that is unproved, but is believed to be true (Collatz conjecture, Goldbach conjecture, twin prime conjecture).
- **Axiom/Postulate**: A basic assumption about a mathematical situation (model) that requires no proof. a statement that is assumed to be true without proof. These are the basic building blocks from which all theorems are proved (Euclid’s five postulates, Zermelo-Fraenkel axioms, Peano axioms).
- **Claim**: An assertion that is then proved.  It is often used like an informal lemma.
- **Identity**: A mathematical expression giving the equality of two (often variable) quantities (trigonometric identities, Euler’s identity).

I have read over [there](https://math.stackexchange.com/questions/25639/lemma-proposition-theorem-which-one-should-we-pick) about other less used but remarkable terms:

- **Scholium**: In modern mathematics texts, scholia are marginal notes which may amplify a line of reasoning or compare it with proofs given earlier. A famous example is Bayes' Scholium, a well-known result for interpreting observations of a Bernoulli process. Writing a scholium instead of a remark is like writing a prolegomenon instead of a preface. It's not quite the same thing but has a distinct highbrow smell.
- **Sublemma**: ...
- **Paradox**: a statement that can be shown, using a given set of axioms and definitions, to be both true and false. Paradoxes are often used to show the inconsistencies in a flawed theory (Russell’s paradox).  The term paradox is often used informally to describe a surprising or counterintuitive result that follows from a given set of rules (Banach-Tarski paradox, Alabama paradox, Gabriel’s horn).

# Examples

Let's put this into practice, first with a formal example and then through a self-explanatory meta-explanation.

Let's start with the practical case:

INSERT PDF

Now, let's enjoy the meta-explanation:

INSERT PDF

# References

* https://divisbyzero.com/2008/09/22/what-is-the-difference-between-a-theorem-a-lemma-and-a-corollary/
