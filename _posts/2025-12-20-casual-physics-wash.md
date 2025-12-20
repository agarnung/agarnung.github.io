---
title: Casual Physics - Wash
tags: [physics]
style: fill
color: info
description: Eficacia termodinámica del agua caliente en la limpieza de vajillas
---

## Introducción

La limpieza de platos (ya sea de saliva, aceites, grasas o restos líquidos de comida) implica procesos físicos y químicos complejos, donde el agua caliente juega un papel crítico. Este artículo aborda si el agua caliente por sí misma (o hasta qué punto y por qué) es suficiente para eliminar residuos orgánicos, considerando fenómenos como la ruptura de enlaces, cambios en la tensión superficial y la sinergia con aditivos químicos. 

**¿Es suficiente agua (muy) caliente para la limpieza?** En este post lo discutiremos. Nos fundamentaremos en principios termodinámicos, cinéticos y, en resumen, varios factores físico-químicos como la tensión superficial, viscosidad, adhesión e interacción entre el líquido de limpieza y los residuos.

---

## Mecanismos físico-químicos involucrados

### Energía térmica y ruptura de enlaces débiles

Al elevar la temperatura del agua ($$T$$), se incrementa la velocidad de las moléculas y, con ello, la [energía cinética promedio](http://hyperphysics.phy-astr.gsu.edu/hbasees/Kinetic/eqpar.html#c2) de sus moléculas:

$$E_k = \frac{3}{2} k_B T$$

donde $$k_B$$ es la constante de Boltzmann y $$T$$ la temperatura absoluta. Esto facilita la ruptura de interacciones **inter**moleculares débiles:

- **Puentes de Hidrógeno** (entre hidrógeno y oxígeno): [Dominantes en moléculas](https://epgp.inflibnet.ac.in/epgpdata/uploads/epgp_content/food_technology/food_chemistry/02.water_in_food_systems/et/10_et_m2.pdf) (además que en el agua), como en grasas, almidones, azúcares y proteínas. La energía térmica supera su [energía de cohesión](https://www.sciencedirect.com/topics/physics-and-astronomy/hydrogen-bond); esta última no excede los 0.42 eV ($$40 \, \text{kJ/mol}$$), mucho menor que los [enlaces covalentes ordinarios](https://study.com/academy/lesson/covalent-compounds-properties-naming-formation.html). La energía de ruptura de un puente de hidrógeno (sabiendo que 1 mol tiene $$6.022 \times 10^{23}$$ moléculas) es $$6.64 \times 10^{-23} \, \text{J/molécula}$$. Sustituyendo el valor de $$k_B = 1.38 \times 10^{-23} \, \text{J/K}$$, nos da una temperatura de 255 K, aprox. -18 ºC. Esto es una temperatura muy baja; las moléculas en este punto estarían vibrando con más intensidad y los puentes de hidrógeno podrían debilitarse o romperse parcialmente. Sin embargo, esto no implica necesariamente que el agua pase de líquido a gas, sino que las interacciones intermoleculares se debilitan, lo que puede afectar propiedades como la viscosidad o la capacidad de disolución. 
- **Fuerzas de Van der Waals**: Interacciones dipolo-dipolo inducidas ($$E_{\text{vdW}} \approx 0.1\text{--}5 \, \text{kJ/mol}$$). Su ruptura permite separar moléculas no polares (e.g. aceites) de superficies.

#### Ecuación de Arrhenius:
La tasa de ruptura de enlaces sigue:

$$
k = A e^{-E_a/(RT)}
$$

donde $$k$$ es la constante de velocidad, $$E_a$$ la energía de activación, y $$R$$ la constante de los gases. Un aumento de $$T$$ aumenta el término exponencial, y con ello del valor de $$k$$. Esto significa que las reacciones químicas (como la descomposición o solubilización) aceleran exponencialmente con la temperatura, haciendo más rápida la disolución de residuos. Desde este punto de vista tiene sentido utilizar agua caliente para este fin.

> [!WARNING] ¿Y los restos de saliva, desaparecen?
>
> La saliva es un fluido complejo compuesto principalmente por [agua](https://scielo.isciii.es/scielo.php?script=sci_arttext&pid=S1698-69462006000500015) (≈99%), mucinas (glicoproteínas que le confieren viscosidad de 1.5-4 mPa·s), enzimas (amilasa, lisozima), iones (Na⁺, K⁺, Cl⁻, HCO₃⁻) y proteínas. Su adhesión a superficies depende de la viscosidad (gobernada por las mucinas mediante interacciones de van der Waals y puentes de hidrógeno), la rugosidad superficial y la naturaleza del material.
>
> En superficies cristalinas (vidrio, cerámica vitrificada), la adhesión es relativamente débil debido a la baja [rugosidad superficial](https://www.ugr.es/~elenasb/teaching/Bloque2_Tema1_TablasManning) (Ra < 0.1 μm) y la naturaleza hidrofílica del material, lo que facilita la remoción con agua caliente. El agua a 50-60°C reduce la viscosidad de las mucinas mediante ruptura de puentes de hidrógeno, facilitando el arrastre mecánico. En materiales porosos (madera, plásticos no vitrificados), la adhesión es mayor debido a la penetración capilar y mayor área de contacto efectiva, requiriendo acción mecánica adicional o detergentes para su eliminación completa.

---

### Reducción de Viscosidad y Tensión Superficial

#### Viscosidad ($$\eta$$)

> [!NOTE]
> Fluidos newtonianos
>
> Un fluido newtoniano es un fluido cuya viscosidad puede considerarse constante, a cierta temperatura y aunque sea sometido a fuerzas externas. La relación entre el esfuerzo sometido contra su superficie y la tasa temporal de deformación es lineal en este tipo de fluidos.
> Por el contrario, un fluido no newtoniano se comporta en reposo como un fluido, pero aumenta su viscosidad cuando se le somete a fuerzas de estrés.

La viscosidad es una medida de la resistencia interna al flujo dentro de un líquido. El agua tiene una viscosidad de aprox. 1.002 mPa·s a temperatura ambiente (20 ºC). Sin embargo, como buen líquido newtoniano, su [viscosidad varía con la temperatura](https://www.flottweg.com/es/wiki/tecnica-de-separacion/viscosidad-dinamica/), disminuyendo a medida que aumenta la temperatura según la [ecuación de Andrade](https://es.wikipedia.org/wiki/Ecuaci%C3%B3n_de_Andrade):

$$\eta \propto e^{B/T}$$

donde $$B$$ es un parámetro característico de cada sustancia. Al calentar, las grasas disminuyen su viscosidad, facilitando el flujo y arrastre. Sin embargo, la ecuación de Andrade es válida, o segura, solo para un rango limitado de temperatura, según la sustancia de interés.

> [!NOTE]
> Fuerzas de Van der Waals
>
> Las [fuerzas de van der Waals](https://www-sciencedirect-com.translate.goog/topics/pharmacology-toxicology-and-pharmaceutical-science/van-der-waals-interactions?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=rq) (o fuerzas London) son fuerzas residuales, de atracción o repulsión entre moléculas o grupos atómicos, que no se derivan de las de un enlace covalente, o de la interacción electrostática entre iones, o de grupos iónicos entre sí o con moléculas neutras. Por el contrario, se originan cuando átomos adyacentes se acercan lo suficiente como para que sus nubes electrónicas externas apenas se toquen; esta acción induce fluctuaciones de carga que resultan en una atracción no específica y no direccional. Estas fuerzas crecen con la longitud del [extremo no polar de una sustancia](https://concepto.de/fuerzas-de-van-der-waals/), puesto que están causadas por correlaciones entre las polarizaciones fluctuantes entre átomos, moléculas o superficies cercanas, consecuencia de la dinámica cuántica.

Otros fluidos como algunas grasas o incluso la saliva (debido a la presencia de familias de proteinas como las mucinas) pueden presentar valores superiores de viscosidad, lo que aumenta su “pegajosidad” y dificultad para ser removidos. El [aceite de oliva](https://www.flottweg.com/es/wiki/tecnica-de-separacion/viscosidad-dinamica/), por ejemplo, es aprox. 80 veces más viscoso que el agua. Estos fluidos viscosos se pueden adherir fuertemente a la superficie del plato, ya que sus moléculas interactúan de forma cohesiva entre sí (por medio de fuerzas de Van der Waals e interacciones [hidrofóbicas](https://bioquibi.webs.ull.es/temascompletos/InteraccionesNC/agua/hidrofobicos.htm) [una molécula es hidrofóbica cuando no es capaz de interaccionar con las moléculas de agua ni por interacciones ión-dipolo ni mediante puentes de hidrógeno]). 

La dificultad para “arrastrar” estos residuos se debe a que la fuerza de adhesión supera, en parte, la capacidad del líquido de limpieza para movilizarlos, especialmente si la viscosidad es elevada. Para contrarrestar este efecto es importante utilizar agentes tensioactivos (detergentes) que, además de reducir la tensión superficial, pueden modificar la viscosidad aparente en el sistema de limpieza. Otra forma, en ausencia de dichos agentes, es aumentando el flujo de agua para promover mecánicamente el arrastre así como su temperatura, para hacer menos viscoso el residuo. 

> [!NOTE]
> ¿Por qué el aceite y el agua no se juntan?
>
> Ya no es solamente que el aceite "flote" en el agua al tener menos densidad (efecto de flotabilidad; líquidos "immiscibles") (1000 kg/m^3 para el agua, ≈ 850 kg/m^3 para el aceite), sino que, además, no se pueden mezclar. Esto ocurre [porque](https://web.fscj.edu/Milczanowski/psc/lect/Ch10/slide10.htm) las moleculas de agua son polares y se atraen más entre ellas, mientras que las moléculas de aceite son apolares y no se atraigan con las de agua.
> El agua líquida se mantiene unida por enlaces de hidrógeno (el agua líquida tiene menos enlaces de hidrógeno que el hielo), mientras que los aceites y las grasas no tienen ninguna parte polar, por lo que para disolverse en el agua tendrían que romper algunos de los enlaces de hidrógeno del agua. El agua no hace esto, así que el aceite se ve obligado a permanecer separado del agua.

Los aceites y grasas son compuestos hidrofóbicos que no se mezclan fácilmente con agua, debido a su diferente polaridad, entre otros factores. Esto significa que, sin la acción de agentes tensioactivos, el agua tiene poca capacidad para “arrastrar” estos residuos. La emulsificación puede ayudar a eliminarlos y depende tanto de la reducción de la tensión superficial como de la acción mecánica.

> [!NOTE]
> Emulsificación
>
> La emulsificación es la unión más o menos homogénea de dos líquidos inmiscibles, o sea, que no se mezclan totalmente el uno con el otro un proceso. Permite combinar dos líquidos que no se mezclan fácilmente, como el agua y el aceite. El resultado es una emulsión, esto es, una mezcla estable de dos fases líquidas. 
> Por ejemplo, conlleva la formación de pequeñas gotitas dispersas en agua, típicamente mediante una máquina rotor-estátor. La emulsión implica que pequeñas gotas de un líquido (como el aceite) estén dispersas de manera estable en otro líquido (como el agua).

#### Tensión Superficial ($$\gamma$$)

> [!TIP]
> Surfractantes
>
> Los [surfactantes](https://nunalin.com/blog/understanding-the-chemistry-of-dish-detergents-142.htm) son sustancias químicas que reducen la tensión superficial entre dos sustancias, como dos líquidos o un líquido y un sólido. También se les conoce como agentes tensioactivos. Las moléculas de estas sustancias tienen un extremo hidrofílico (que atrae agua) y otro hidrofóbico (que la repela). Esto permite que el detergente forme una barrera que ayuda a disolver y eliminar la grasa.

La tensión superficial de un líquido es la cantidad de energía necesaria para aumentar su superficie por unidad de área (por eso podemos colocar un trozo de plástico, hoja o insecto encima de una gota de agua pero si la presionamos un poco con el dedo, la gota se expande por la superficie). Es decir, es la propiedad de la superficie de un líquido que le permite resistir fuerzas externas. Las fuerzas intermoleculares en los líquidos, junto con las fuerzas que se dan entre los líquidos y las superficies sólidas que entran en contacto con ellos (capilaridad), manifiestan la tensión superficial. Según la [ecuación de Eötvös](https://es.wikipedia.org/wiki/Regla_de_E%C3%B6tv%C3%B6s):

$$
\gamma = k \left( T_c - T - 6 \right),
$$

donde $$T_c$$ es la temperatura crítica. Al aumentar $$T$$, $$\gamma$$ disminuye, mejorando la humectación de superficies.

La [tensión superficial](https://es.wikipedia.org/wiki/Tensi%C3%B3n_superficial) del agua es de aproximadamente 72 mN/m (o 72 dina/cm) a temperatura ambiente (20 ºC). Otras sustancias tienen [diferentes tensiones superficiales](https://www.researchgate.net/publication/269094854_Surface_Tension_Prediction_of_Vegetable_Oils_Using_Artificial_Neural_Networks_and_Multiple_Linear_Regression/figures). Los [aceites](https://www.researchgate.net/publication/282997104_Separation_of_toxic_heavy_metals_from_its_aqueous_solution_using_environmentally_benign_vegetable_oil_as_liquid_membrane/figures?lo=1) suelen rondar los 30 dina/cm, es decir, tienen [tensiones superficiales menores que el agua](https://www.cradle-cfd.com/media/column/a143), lo que influye en su comportamiento hidrofóbico. Una alta tensión superficial en el agua (sin aditivos) hace que ésta tienda a formar gotas en vez de extenderse sobre la superficie, lo que limita su capacidad para penetrar y desprender la suciedad adherida. Sin embargo, es posible reducir su tensión superficial incrementando su temperatura o mezclándola con otras sustancias, como surfactantes. Así es como los detergentes, al añadirse al agua, reducen la tensión superficial (a menudo hasta valores cercanos a 30–40 mN/m) y favorecen la humectación de la superficie del plato, facilitando la emulsificación (mezcla de dos líquidos "difíciles de mezclar") y remoción de sustancias oleosas y grasas.

La grasa y el aceite, comúnmente encontrados en los platos sucios, es difícil que se disuelven solo con agua. Aquí es donde los [tensioactivos](https://nunalin.com/blog/understanding-the-chemistry-of-dish-detergents-142.htm) son efectivos, para romper la tensión superficial y arrastrarlos de los platos. Las colas hidrofóbicas de las moléculas de tensioactivo se adhieren a la grasa, mientras que las cabezas hidrofílicas se unen al agua. Como resultado, la grasa se descompone en pequeñas gotas, lo que facilita su eliminación. 

De nuevo, pero a mayor escala, los [surfactantes](https://onlinelibrary.wiley.com/doi/abs/10.1002/bbpc.19920960527) del detergente forman micelas, estructuras esféricas donde los extremos hidrófobos atrapan la grasa en su interior, mientras los extremos hidrófilos interactúan con el agua. Gracias al calor, la grasa se ablanda y disuelve más fácilmente, permitiendo que las micelas la rodeen y la suspendan en el agua para ser eliminada al enjuagar.

Más aún, cuando usamos agua caliente, la energía térmica aumenta la energía cinética de las moléculas, lo que hace que se muevan con más fuerza. El aumento del movimiento molecular ayuda a que las moléculas de detergente y agua choquen y se adhieran a la grasa y la suciedad de manera más efectiva.

En [esta tabla](https://www.microcare.com/es-US/Resources/Resource-Center/FAQs/How-Does-Surface-Tension-Affect-Cleaning-Performan) se puede ver un listado de varios líquidos de limpieza comunes; típicamente más efectivo será cuando mayor índice de humectación, menos viscosidad y menos tensión superficial tenga.

> [!NOTE]
> Acción capilar
>
> Se define como el movimiento del agua dentro de los espacios de un material poroso, debido a las fuerzas de adhesión y a la tensión de la superficie. Es importante para mover el agua (y todas las cosas que están disueltas en ella).
> La acción capilar, que depende de la tensión superficial, es fundamental para que el líquido de limpieza pueda "arrastrar" los residuos desde poros, grietas y superficies adherentes.

---

### Hidrólisis Térmica de Enlaces Covalentes

> [!NOTE]
> Hidrólisis
>
> La hidrólisis es una reacción química que implica la acción del agua sobre otras especies, bien modificando sus propiedades ácido-base, o bien provocando la ruptura de determinados enlaces, fragmentado la molécula y dando lugar a otras especies distintas a la molécula original.

Dos átomos de carbono pueden formar un enlace covalente fuerte. Para romper un enlace $$C\text{--}C$$, se [necesita en promedio](https://bioquibi.webs.ull.es/temascompletos/InteraccionesNC/presentacion.htm) aprox. $$E \approx 350 \, \text{kJ/mol}$$ (energía de disociación), mientras que el agua tiene una capacidad calorífica de 4.184 J/g·°C [lo que significa que para elevar la temperatura de 1 gramo de agua en 1 °C, se requieren 4.184 julios de energía], con lo que si consideramos, por exagerar, 18 g de agua [que es aproximadamente 1 mol, 6,022 x 10^23 moléculas de H2O], la energía absorbida al calentarla de 25 °C a 100 °C sería: 4.184 J/g·°C × 75 °C × 18 g = 5648.4 J, muy por debajo de los 348000 J necesarios para romper un mol de enlaces C-C. Aunque el agua caliente no rompe enlaces covalentes fuertes como este, sí que induce hidrólisis en grupos funcionales:

> [!TIP]
> ¿Qué enlaces son los más comunes en los restos de comida?
>
> Los [enlaces químicos](https://quimica.diaonia.com/descubre-los-10-enlaces-covalentes-mas-comunes-en-tu-dia-a-dia/) más comunes en los alimentos (macronutrientes como grasas, proteínas y carbohidratos...) incluyen enlaces carbono-carbono (C–C), enlaces carbono-hidrógeno (C–H), enlaces carbono-oxígeno (C–O), enlaces carbono-nitrógeno (C–N), enlaces ésteres, [enlaces peptídicos](https://vivo.colostate.edu/hbooks/pathphys/digestion/basics/foodchem.html), enlaces glicosídicos, enlaces disulfuro y enlaces de hidrógeno.

#### Ésteres

Los ésteres son responsables del aroma de muchas frutas, como manzanas, peras, piñas, fresas, etc. La hidrólisis se refiere a la ruptura (-_lisis_) de un enlace mediante agua (_hidro_). 

La hidrólisis es una reacción química en la que se rompe un enlace mediante la acción del agua. En el caso de los ésteres, esta ruptura da lugar a un ácido carboxílico y un alcohol.

Existen dos tipos principales de hidrólisis:

- Hidrólisis ácida: ocurre en presencia de agua y un ácido fuerte (como ácido clorhídrico [HCl] o ácido sulfúrico [H₂SO₄] diluidos), que actúa como catalizador. En estas condiciones, el éster se descompone en un ácido carboxílico y un alcohol. Sin embargo, el agua del grifo no posee la acidez necesaria para que esta reacción se produzca de forma efectiva.

- Hidrólisis básica (también llamada saponificación): tiene lugar en presencia de una base fuerte (como hidróxido de sodio [NaOH]) o sustancias de carácter básico, como algunos jabones. En este caso, el éster se rompe para dar un alcohol y la sal del ácido carboxílico correspondiente. Esta reacción es más rápida y eficaz en ambientes domésticos, como el lavado con detergente.

Por lo tanto, si un plato contiene restos de ésteres responsables de ciertos olores, simplemente enjuagarlo con agua del grifo no será suficiente para eliminarlos completamente. Para eliminar el olor de forma más eficaz se recomienda:

Aunque hayamos escogido este compuesto para analizar el caso de uso, los ésteres no son precisamente los compuesto que peor huelan ni los que menos nos gustaría que se quedaran en nuestras vajillas. Las aminas, por ejemplo, son otros compuestos orgánicos con  bajos [puntos de ebullición](https://www.quimicaorganica.org/aminas/485-propiedades-fisicas-de-aminas.html); por ejemplo, la etilamina hierve a 17 ºC, y la trimetilamina a 3 ºC.

#### Medidas adicionales

###### Usar agua caliente
   
El agua caliente ayuda a volatilizar los compuestos aromáticos. Muchos ésteres tienen [puntos de ebullición bajos](https://espanol.libretexts.org/Quimica/Qu%C3%ADmica_General/Libro%3A_ChemPrime_(Moore_et_al.)/08%3A_Propiedades_de_los_Compuestos_Org%C3%A1nicos/8.18%3A_%C3%89steres) debido a su estructura molecular, por lo que se evaporan fácilmente con el calor. Esto implica que el agua caliente aumenta la volatilización de estos compuestos, reduciendo su concentración en la superficie y, por tanto, el olor. El acetato de etilo, por ejemplo, hierve a 77.1°C, menor que el etanol (78.5°C).

> [!TIP]
> [Constante de Boltzmann y constante de los gases ideales](https://es.wikipedia.org/wiki/Constante_de_Boltzmann)
>
> Macroscópicamente, la ley de los gases ideales establece que, para un gas ideal, el producto de la presión $$p$$ y el volumen $$V$$ es proporcional al producto de cantidad de sustancia $$n$$ y la temperatura absoluta $$T$$:
> 
> $$p V = n R T$$
> 
> donde $$R$$ es la constante molar de los gases (8.31446261815324 J·K⁻¹·mol⁻¹). Introduciendo la constante de Boltzmann como la constante de gas por molécula $$k_B = R/N_A$$ transforma la ley de los gases ideales en una forma alternativa:
> 
> $$p V = N k_B T$$
> 
> donde $$N$$ es el número de moléculas del gas. 

Visto de otra forma, podemos fijarnos en la energía térmica necesaria para [romper enlaces covalentes simples](https://quimicax2011.blogspot.com/2011/07/energetica-de-enlaces-covalentes.html) (simples, como los C–H o C–C), que es $$E_a \approx 200\text{--}400 \, \text{kJ/mol}$$.

A 100 °C (373 K), la [energía térmica promedio](http://hyperphysics.phy-astr.gsu.edu/hbasees/Kinetic/eqpar.html#c2) por mol de moléculas se puede estimar utilizando la constante de los gases ideales $ R $ (8.314 J/mol·K):

$$
E = R \cdot T = 8.314\,\text{J/mol·K} \times 373\,\text{K} \approx 3.1\,\text{kJ/mol}
$$

> [!NOTE]
> Cabe destacar que si usáramos la [constante de Boltzmann](http://hyperphysics.phy-astr.gsu.edu/hbasees/Kinetic/eqpar.html), $$k_B$$, la ecuación representaría la energía térmica promedio por partícula ($$k_B T \approx 2.5 \, \text{kJ/mol}$$ a $$100^\circ \text{C}$$), no por mol.

Así, la energía necesaria para romper enlaces covalentes fuertes es significativamente mayor que la proporcionada por agua en ebullición. Por ello, se requiere acción mecánica o química adicional para potenciar la rotura de los enlaces más fuertes frecuentemente presentes en los restos de comida.

###### Jabón o detergente
   
Aplicar jabón o detergente con carácter básico ([pH básico](https://torkalpormayor.cl/blogs/tork-ph-blog/ph-del-jabon) entre 9 y 11) puede favorecer la hidrólisis básica o, al menos, la disolución y arrastre de los ésteres. Y aunque no se complete la hidrólisis, el jabón rompe la película superficial de grasa o residuos y permite que el agua los arrastre.

Algunos [detergentes](https://nunalin.com/blog/understanding-the-chemistry-of-dish-detergents-142.htm) modernos para platos contienen enzimas, moléculas biológicas que aceleran las reacciones químicas. Las enzimas en los detergentes para platos están diseñadas para atacar manchas específicas, como las proteínas de los residuos de alimentos. Al descomponer estas moléculas complejas en fragmentos más pequeños y solubles, las enzimas mejoran la eficiencia de limpieza del detergente.

Los detergentes contienen moléculas [anfifílicas](https://es.wikipedia.org/wiki/Mol%C3%A9cula_anfif%C3%ADlica) (esto es, que tienen propiedades tanto hidrófilas como hidrófobas, permitiéndoles interactuar con el agua y con las grasas, pudiendo estar parcialmente disueltas en agua) que reducen la tensión superficial $$\gamma$$ (funcionan como tensioactivos) y forman micelas (membranas celulares o partículas muy pequeñas compuestas de sustancias solubles en agua que se juntan formando una bola, permitiendo transportar otras sustancias en su interior [e.g. arrastrar las moléculas de grasa]). La [concentración micelar crítica](https://books.google.es/books?id=5IxIgmYV1K8C&pg=PA692&dq=Critical+micelle+concentration&hl=fr&ei=BSBXTMqrG4H_4Aaf4pSnBQ&sa=X&oi=book_result&ct=result&redir_esc=y#v=onepage&q&f=false) ([CMC](https://investigacion.unirioja.es/documentos/61765e029a6e185d87489fc0)) es la concentración mínima de un tensioactivo a partir de la cual se forman micelas y depende de la temperatura:

$$
\text{CMC} \propto e^{-\Delta H_{\text{mic}}/(RT)}
$$

Más precisamente, como se ha [comprobado](https://onlinelibrary-wiley-com.translate.goog/doi/10.1155/2012/961739?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=sge#:~:text=For%20each%20surfactant%2C%20as%20the,concentrations%20as%20the%20temperature%20increases.) [empíricamente](https://link-springer-com.translate.goog/chapter/10.1007/978-3-642-72701-6_45?error=cookies_not_supported&code=21364cf5-e1ad-4c03-a97e-9c4d544ee41a&_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=sge#:~:text=Abstract,first%20decreases%20and%20later%20increased.), la CMC de [alguna sustancia](https://nailib.com/ia-sample/ib-chemistry-hl/667f8b6735560f690d3e1a62#conclusion) disminuye inicialmente y luego aumenta con la temperatura. Esto se debe a que a temperaturas más altas hay menor probabilidad de formación de enlaces de hidrógeno.

A [temperaturas bajas](https://nailib.com/ia-sample/ib-chemistry-hl/667f8b6735560f690d3e1a62#conclusion), la [CMC](https://riull.ull.es/xmlui/bitstream/handle/915/19980/Tensioactivos.%20CMC%20a%20temperaturas%20bajas%20o%20moderadas.%20Influencia%20sobre%20la%20CMC%20de%20la%20presencia%20de%20compuestos%20neutros%20o%20polares.%20L-valina%20.pdf?sequence=1&isAllowed=y) disminuye conforme la temperatura sube, favoreciendo la formación de micelas. Sin embargo, al superar [cierto umbral](https://nailib.com/ia-sample/ib-chemistry-hl/667f8b6735560f690d3e1a62#conclusion), la CMC comienza a aumentar de forma casi lineal. Esto tiene implicaciones prácticas: usar agua caliente puede facilitar la limpieza porque, en un rango óptimo de temperatura, la CMC disminuye, lo que permite que las micelas (las estructuras responsables de encapsular y arrastrar la grasa) se formen con menos cantidad de detergente. Esto significa que más moléculas están disponibles para interactuar con la suciedad antes de saturarse en forma de micelas. Sin embargo, a temperaturas excesivamente altas, la CMC vuelve a aumentar, por lo que se necesita más concentración de detergente para formar micelas eficaces, reduciendo la eficiencia del proceso si no se ajusta la cantidad de detergente. Por tanto, hay un rango de temperatura ideal (alrededor de 30–40 °C) donde el agua caliente ayuda a lavar mejor (con menos producto), no solo por su efecto físico (disolver grasas más fácilmente), sino también por su impacto químico en la eficiencia del detergente.

###### Frotar con estropajo

Como es lógico, la acción mecánica facilita la eliminación de residuos adheridos a la superficie. Así, aunque no se rompan todos los ésteres por completo, se logra reducir significativamente su presencia y, con ello, el olor asociado.

Como conclusión, relacionándolo con lo anterior, solo el agua, especialmente si está caliente, puede ser casi suficiente para limpiar algunos platos poco sucios, ya que ayuda a desprender grasas y aceites. Sin embargo, para que esto sea realmente eficaz, es esencial que la superficie sea casi nada porosa y que los utensilios queden completamente secos, ya que la humedad residual en combinación con restos mínimos puede favorecer la proliferación de bacterias a futuro.

---

## Conclusión

El agua caliente optimiza la limpieza mediante:
1. Reducción de $$\gamma$$ y $$\eta$$.
2. Aceleración de reacciones de hidrólisis.
3. Debilitamiento de fuerzas de Van der Waals.

Sin embargo, su eficacia es insuficiente ante residuos complejos (ej. biopelículas, polímeros), requiriendo tensioactivos para romper enlaces covalentes y estabilizar emulsiones. La sinergia entre temperatura y química de detergentes maximiza la termodinámica de la limpieza y se evidencia en la optimización del proceso de lavado, ya que el aumento de la temperatura reduce la viscosidad y el punto de fusión de las grasas, facilitando su emulsificación y desplazamiento, lo que permite obtener altos niveles de detergencia incluso con concentraciones de tensioactivos moderadas. 

La acción del [detergente](https://digibug.ugr.es/bitstream/handle/10481/856/15847093.pdf;jsessionid=41DA81AA585B71EEF0F8B2DF4BA1AFBB?sequence=1) se potencia aún más cuando se controlan otros parámetros críticos, como el caudal de recirculación y la composición óptima de agentes secuestrantes, lo que se traduce en un proceso de limpieza más eficiente y en tiempos reducidos. Además, la incorporación de modelos cinéticos y experimentos estadísticos ha permitido comprender que, a temperaturas cercanas a 40ºC, el efecto del arrastre de suciedad predomina sobre otros factores, concluyendo que la combinación ajustada de agua caliente y formulaciones detergentes adecuadas resulta esencial para maximizar la eficacia del lavado sobre superficies duras.

---

## Referencias

**Interacciones Intermoleculares y Fuerzas de Superficie**:

- Israelachvili, J. N. (2011). *Intermolecular and Surface Forces* (3rd ed.). Academic Press. ISBN 978-0-12-391927-4.  
  Tratado clásico sobre fuerzas de Keesom, Debye y London, fundamentales para entender las interacciones entre moléculas en sistemas alimentarios.

- Jeffrey, G. A. (1997). *An Introduction to Hydrogen Bonding*. Oxford University Press. ISBN 978-0-19-509549-4.  
  Referencia sobre puentes de hidrógeno, con valores de energía típicos de 4-25 kJ/mol dependiendo del entorno.

- Larsson, K. (1994). *Lipids - Molecular Organization, Physical Functions and Technical Applications*. The Oily Press. ISBN 978-0-9514171-6-4.  
  Sobre fuerzas de dispersión de London en lípidos y grasas, con valores de energía de cohesión de ~5 kJ/mol.

**Química de Alimentos y Emulsiones**:

- Damodaran, S., Parkin, K. L., & Fennema, O. R. (2017). *Fennema's Food Chemistry* (5th ed.). CRC Press. ISBN 978-1-4987-0750-2.  
  Aplicaciones de interacciones intermoleculares en emulsiones y sistemas alimentarios.

- Kessler, H. G. (2002). *Food Engineering and Dairy Technology*. Verlag A. Kessler. ISBN 978-3-9802378-2-0.  
  Cinética de desnaturalización proteica, con valores de energía de activación (ΔG‡ ≈ 80 kJ/mol para ovoalbúmina).

**Efectos Cooperativos y Transiciones de Fase**:

- Cevc, G. (1993). "Phospholipids Handbook". In *Chemistry and Physics of Lipids*, 64(1-3), pp. 163-186.  
  Modelo de Zimm-Bragg para explicar efectos cooperativos en la ruptura de enlaces en sistemas lipídicos.

- Landau, L. D., & Lifshitz, E. M. (1980). *Statistical Physics* (3rd ed., Part 1). Pergamon Press. ISBN 978-0-08-023039-9.  
  Teoría de Landau para transiciones de fase, aplicable a la fusión de grasas y cambios de estado en alimentos.

**Propiedades de Grasas y Lípidos**:

- Timms, R. E. (2003). *Confectionery Fats Handbook: Properties, Production and Application*. The Oily Press. ISBN 978-0-9531949-5-7.  
  Entalpía de fusión de grasas y propiedades termodinámicas de triglicéridos.

- Walstra, P. (2003). *Physical Chemistry of Foods*. Marcel Dekker. ISBN 978-0-8247-9345-7.  
  Ecuaciones para interfaces grasa-agua, con parámetros como γ ≈ 1.2×10⁻³ J/m²·K¹/² para interfaces grasa-agua.

**Transiciones Vítreas y Carbohidratos**:

- Roos, Y. H. (1995). *Phase Transitions in Foods*. Academic Press. ISBN 978-0-12-595340-5.  
  Ecuación de Williams-Landel-Ferry (WLF) para transiciones vítreas en sacarosa, con temperatura de transición vítrea T_g ≈ 62°C.

**Efecto Hidrofóbico**:

- Chandler, D. (2005). "Interfaces and the driving force of hydrophobic assembly". *Nature*, 437(7059), 640-647.  
  Sobre el efecto hidrofóbico y la formación de "jaulas" de agua alrededor de moléculas no polares, con valores de energía ΔG_hidrofóbico ≈ -0.1 kJ/mol·Å².
