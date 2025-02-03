---
title: Explaining Neural Networkds
tags: [machine learning, divulgation]
style: fill
color: info
description: Revisiting the Discrete Cosine Transform to denoise images
---

Richard Feynmann tenía una manera muy sencilla de explicar cómo hacía él para explicar conceptos complejos a personas que desconocían del tema, o a cualquier persona en general. Lo típico que se suele decir es que si no sabes explicárselo a una persona muy mayor (a mucha gente le gusta poner el ejemplo de su abuela), no lo entiendes. Esto deriva de la cita de Albert Einstein: "I you can’t explain it simply, then you don’t understand it well enough". A mi no me gusta este punto de vista; me parece incompleto. Feyman nos dice, por su parte, que su (muy útil) receta de la fortuna  a seguir es:

Explica (literalmente) el concepto a un niño pequeño pero inteligente: Imagina que estás explicando el tema a un niño de 8 años, como tu primo. Usa un lenguaje sencillo, analogías y ejemplos que faciliten la comprensión. El objetivo es simplificar tanto como sea posible.

Medita sobre lo que has explicado: Después de dar esa explicación, toma un tiempo para reflexionar sobre lo que dijiste. Pregúntate si realmente entiendes cada parte del concepto. Este espacio de reflexión te permite ver el problema desde una perspectiva diferente, ya que te das cuenta de las posibles lagunas en tu conocimiento, al comparar lo que creías que entendías con lo que realmente puedes explicar.

Vuelve a explicarlo, de nuevo más simple: Ahora, después de esa reflexión, repite la explicación, pero con más claridad y simplificación, enfocándote en las partes que quizás pasaste por alto o no entendiste completamente. En este paso, serás más consciente de los detalles que en la primera explicación pudiste haber simplificado en exceso. Tras esta segunda iteración, estarás listo para explicarlo incluso a alguien más, como tu abuela.

La Técnica de Feynman es un método de aprendizaje y comprensión que consiste en explicar un concepto nuevo a un niño imaginario para identificar las lagunas en tu comprensión y afianzar lo aprendido .

Durante esa pausa entre el paso 2 y el 3, tu cerebro ha visto el problema desde una perspectiva a posteriori; tú ya le has soltado al niño lo que creías que era una simplificación soberbia del probelma, así que en el paso 3, además de volver a hacer una enorme simplificación, resaltarás consciente o inconscientemente, detalles que en la primera iteración debías de haber pasado por alto, tratando de "parchear" aquellos conceptos que no le explicaste bien al niño, aun sin saberlo. Estate seguro de que, tras esa segunda explicación, estarás en condiciones de pasar a expllicárselo a tu abuela.

# Pero, ¿qué es una red neuronal?

Convéncete, amigo, si estás leyedno esto te va a tocar explicar esto (si no es demasiado tarde) a alguien que no tiene ni la más remota idea de la respuesta. Yo trataré de decir lo que diría, de hecho esto me sirve de preparación ante la situación. Seamos honestos, ahora mismo me siento ciertamente aburrido.

Imagínate que es´tas en tu segundo año de universidad, atendiendo a una clase de Cállculo I sobre integrales dobles. Os han mandado un trabajo tremendamente complicado sobre la parametrización de un volumen de revolución que no sabes por donde coger,así que vas preguntando a tus compañeros opinión sobre cómo lo plantearían ellos: tu compañero que tiene menos idea que tú te dice algo que no tiene ningún tipo de sentido así que te quedas como estabas, el repetidor se hace el listo porque has captado que decía algunas sandeces, el listo de la clase te dice que uses algo llamado "Jacobiano en coordenadas cilíndricas"
así que lo apuntas... Tras un cuestionario a tus 15 compañeros recopilas en tus apuntes lo que te parecen buenas ideas y le pides una tutoría al profesor, que sin ton ni son coge todo el aire y te rompe la hoja a la mitad para seleccionar de tus 32 anotaciones la única que vale la pena. ¿Por qué? ¡porque ya van 16 alumnos alumnos que le piden la misma tutoría!

Esto que acabamos de recrear es una muy mala metáfora de lo que es y cómo funciona una red neuronal! Probemos otra vez:

Imagínate que eres un chef tratando de mejorar una receta de pasta. Tú sabes que lo básico es hacer una buena salsa, pero no estás seguro de qué tipo de especias usar para que tenga el mejor sabor. Así que decides probar con diferentes combinaciones de especias. Tienes un montón de ingredientes, y al principio no sabes qué va a funcionar. Pero, después de probar varias veces, te das cuenta de que, por ejemplo, un toque de albahaca hace maravillas y la pimienta negra resalta el sabor justo como necesitas. Te vas dando cuenta, con cada intento, de qué mezcla tiene más impacto en el sabor final. ¡Así que ajustas tus ingredientes y sigues mejorando tu receta!

Esto que volvimos a recrear es una algo mejor metáfora (al menos más clara), porque hemos aprendido de los errores que cometimos al explicarlo la primera vez (recuerda a FEynman!!). VOlvamos a intentarlo; prometo (_escrito a posteriori_) que será la última interación...

Imagínate que, en lugar de un chef, eres un detective resolviendo un misterio. Tienes montones de pistas que no sabes si son relevantes. Al principio, algunas de ellas no parecen tener sentido, y otras te llevan por caminos equivocados. Pero a medida que avanzas, vas aprendiendo a identificar qué pistas son más importantes y cómo se conectan entre sí. Cada pista te da una pequeña parte de la solución, y poco a poco, vas armando el rompecabezas. ¡Al final, tienes todo resuelto y el misterio completamente claro! 

Vale,  Esta metáfora _ya sí lo tiene todo_, ahora seguro que ya te ha quedado claro qué es una red neuronal sin falta de ponerme técnico ni de nombrar términos técnicnos (ni uno solo) como bias, weight, neocognitrón, perceptrón, capa oculpa, capa densa, backprogpagation, etc... ¿Aún no? De acuerdo, pues mira esto. Así funciona una red neuronal a través de nuestras metáforas: 
1. La diferencia entre lo que nuestro alumno sabía (o intuía saber) y lo que captaba/capturaba que sabían sus compañeros era la función de coste a minimizar (por lo menos, eĺ quería minimizar la diferencia de sabiduría entre él y el profesor!!! [entre lo que la red predice y la respuesta correcta]), las respuestas de sus compañeros eran combinaciones lineales, (sus propios compañeros y él eran neuronas), sus respuestas en conjunción a través de las tutorías representaban pooling y message passing y nuestro querido profesor pretendía ser una función de activación no lineal... 
2. la receta del chef esla red neuronal y los ingredientes son los diferentes parámetros (e.g. pesos los pesos de las conexiones entre neuronas), que se ajustan mientras la red aprende. Al principio, esos ingredientes no están bien balanceados, pero a medida que el chef prueba, prueba y prueba, va mejorando la receta. Con cada intento, ajusta esos parámetros para dar una mejor respuesta, aprendiendo de cada error para afinar el resultado final. ¡Y al final, tienes la receta perfecta!
3. el detective comienza con muchas pistas (datos) y, tras muchas pruebas y ajustes, va sacando sentido de ellas para dar la mejor respuesta. Cuando una idea le hace "click", es que la funciones de activación gha soltado una respuesta, deshechando hipótesis falsas sobre el culpable... (caracteŕisticas de los datos de entrada no representativas => "cambiemos de enfoque"...).

Espera, de hecho, este propio post es una hyper-metáfora (quasi-metáfora?, META-METÁFORA??) sobre el funcionamiento de una red neuronal... párate a pensaro... :emoji_de_pensamiento. 

Creo que ahora tienes las herramientas para explicárselo a quien más prefieras.

Gracias por la lectura.

~~Formalmente, la idea central es extraer combinaciones lineales de las entradas como derived features, y luego model the target as a nonlinear function of these features~~


