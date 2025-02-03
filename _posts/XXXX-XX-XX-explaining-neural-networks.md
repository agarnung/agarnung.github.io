---
title: Explaining Neural Networks
tags: [machine learning, divulgation]
style: fill
color: info
description: Metaphorically Explaining Neural Networks
---

![nn](../assets/blog_images/XXXX-XX-XX-explaining-neural-networks/nn.png)

Richard Feynman had a very simple way of explaining how he would explain complex concepts to people who had no knowledge about the topic, or to anyone in general. The typical thing that is said is that if you can’t explain it to an elderly person (many people like to use the example of their grandmother), you don’t understand it. This comes from the quote by Albert Einstein: "If you can't explain it simply, then you don’t understand it well enough." I don’t like this point of view; it seems incomplete to me. Feynman, for his part, tells us that his (very useful) recipe for success is as follows:

1. **Explain (literally) the concept to a small but smart child**: Imagine you’re explaining the topic to an 8-year-old, like your cousin. Use simple language, analogies, and examples that make it easier to understand. The goal is to simplify it as much as possible.

2. **Reflect on what you’ve explained**: After giving that explanation, take some time to reflect on what you said. Ask yourself if you truly understand every part of the concept. This reflection period allows you to see the problem from a different perspective, as you become aware of the gaps in your knowledge when you compare what you thought you understood with what you can actually explain.

3. **Explain it again, but simpler**: Now, after that reflection, repeat the explanation but with more clarity and simplification, focusing on the parts you might have overlooked or didn’t understand completely. In this step, you’ll be more aware of the details that in the first explanation you might have overly simplified.

So formally, Feynman's technique is a method of learning and understanding that involves explaining a new concept to an imaginary child in order to identify gaps in your understanding and reinforce what you’ve learned. During the pause between steps 2 and 3, your brain has seen the problem retrospectively; you’ve already told the child what you thought was a brilliant simplification of the problem, so in step 3, in addition to simplifying further, you’ll consciously or unconsciously highlight details that in the first iteration you might have overlooked, trying to "patch" those concepts you didn’t explain well to the child, even if you didn’t know it. Be sure that after that second explanation, you’ll be able to apply Einstein's criterion!

# But, what is a neural network?

Convince yourself, friend, if you’re reading this, you’re going to have to explain this (if it’s not too late) to someone who has no idea what the answer is. I’ll try to write what I would say; in fact, this serves as preparation for the situation. And let’s be honest, right now I feel kind of bored.

Imagine you’re in your second year of university, attending a Calculus II class on double integrals. You’ve been assigned a terribly complicated task about parameterizing a volume of revolution that you don’t know how to approach, so you start asking your classmates for their opinions on how they would approach it: your classmate, who knows less than you, says something that makes no sense, so you’re stuck; the repeat student acts all smart and you’ve noticed he was saying nonsense; the smart student of the class tells you to use something called "Jacobian in cylindrical coordinates," so you write it down... After questioning your 15 classmates, you gather what seems to be good ideas in your notes and request a tutoring session with the professor. The next day, in his office, he suddenly grabs the notebook and rips your paper in half to pick the one thing worth mentioning from your 32 notes. Why? Because 16 students have already asked him for the same tutoring!

What we just recreated is a very bad metaphor of what a neural network is and how it works. Let’s try again:

Imagine you’re a chef trying to improve a pasta recipe. You know that the basic thing is making a good sauce, but you’re not sure what spices to use to make it taste the best. So you decide to experiment with different combinations of spices. You have a lot of ingredients, and at first, you don’t know what’s going to work. But after trying several times, you realize that, for example, a hint of basil works wonders, and black pepper brings out the flavor just the way you need it. With each attempt, you learn what combination has the biggest impact on the final flavor. So you adjust your ingredients and keep improving your recipe!

This is a slightly better metaphor (at least clearer) because we’ve learned from the mistakes we made when explaining it the first time (remember Feynman!). Let’s try again; I promise (_written a posteriori_) that this will be the last iteration...

Imagine that you’re a detective solving a mystery. You have lots of clues, but you don’t know if they’re relevant. At first, some of them don’t seem to make sense, and others lead you down the wrong paths. But as you go on, you learn to identify which clues are more important and how they connect with each other. Each clue gives you a small part of the solution, and little by little, you piece the puzzle together. In the end, you have everything solved and the mystery completely clear!

Okay, this metaphor _now completes everything_. At this point I’m sure you understand what a neural network is without the need to even mention technical terms (not a single one) like bias, weight, neocognitron, perceptron, hidden layer, dense layer, backpropagation, etc... Still not clear? Alright, then check this out ~~and explain the joke~~. This is how a neural network works through our metaphors:

1. The difference between what our student knew (or thought he knew) and what he gathered that his classmates knew was the cost function to minimize (at least, he wanted to minimize the gap of knowledge between him and the professor! [between what the network predicts and the correct answer]), the responses from his classmates were linear combinations (and his classmates and he were neurons), their responses together through tutoring represented pooling and message passing, and our dear professor was trying to be a nonlinear activation function...
  
2. The chef's recipe is the neural network, and the ingredients are the different parameters (e.g. the weights of the connections between neurons) that get adjusted as the network learns. At first, those ingredients aren’t balanced, but as the chef tries, tries, and tries, he improves the recipe. With each attempt, he adjusts those parameters to provide a better response, learning from every mistake to refine the final result. And in the end, you have the perfect recipe!

3. The detective starts with many clues (raw data) and, after many tests and adjustments, he makes sense of them to come up with the best answer. When an idea "clicks", it’s because the activation function has provided an answer, discarding false hypotheses about the culprit... (_characteristics of the input data that are not representative? => "let’s change our approach..."_).

Wait, in fact, this post itself is a hyper-metaphor (quasi-metaphor?, META-METAPHOR??) about how a neural network works... stop and think about it... :thinking_emoji:

I think you now have the tools to explain it to whoever you prefer.

Thanks for reading.

~~Formally, the central idea is to extract linear combinations of the inputs as derived features, and then model the target as a nonlinear function of these features~~

