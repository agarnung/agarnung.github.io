---
title: Computación Neuromórfica
tags: [computer science, divulgation]
style: fill
color: danger
description: Un primer acercamiento a este paradigma de computación.
---

## Introducción

Ya comentamos en [un post](./quantum-post) alguna cosa sencilla sobre la computación cuántica (superposición, entrelazamiento de bits cuánticos o qubits...) y, por supuesto, principalmente todo el blog se fundamenta en el framework de la computación clásica (algoritmos secuenciales y deterministas, puertas lógicas y álgebra de Bool, bits como unidad básica, arquitectura de Von Neumann...), pero existe (al menos) un tercer tipo de computación que está poniéndose de moda desde hace un tiempo, y es la computación neuromórfica.

> [!TIP]
> La arquitectura de Von Neumann, en la que se basan los computadores clásicos y la gran mayoría de del hardware moderno, consta principalmente de una unidad central de procesamiento (CPU), memoria principal (RAM) y unidades de entradasalida (E/S), donde tanto datos como programas se almacenan en la misma memoria. 

![vonneumann-vs-neuromorphic](https://www.researchgate.net/profile/Prasanna-Date/publication/358255092/figure/fig1/AS:1118564325031937@1643697925232/Comparison-of-the-von-Neumann-architecture-with-the-neuromorphic-architecture-These_W640.jpg)

Es un concepto en el que ya se pensaba desde hace tiempo, pero requería algo de investigación teórica y evolución de nuevo hardware para llevar al mundo real. Si pensamos en el cerebro humano, sabemos que las neuronas no son rígidas, ni en el sentido individual (nacen y mueren neuronas constantemente a lo largo de nuestra vida [aunque esta tasa varíe con la edad]) ni colectivo (los enlaces y sinapsis entre neuronas y grupos de neuronas se degradan, reorganizan y refuerzan de maneras impredecibles). Por lo tanto, las redes neuronales clásicas (conn peso y _bias_) son, en este sentido, una limitación arquitectónica muy simplificada de la realidad. Un modelo más fidedigno necesitaría dar flexibilidad a las conexiones, por lo menos, i.e. la red debiera aprender como auto-organizarse dinámicamente.

En esta línea de pensamiento, los investigadores han ido desarrollando herramientas alrededor de la computación neuromórfica, que recoge esta idea y (hoy día) es capaz de emular en hardware real el comportamiento biológico del cerebro mediante el procesamiento de impulsos (_spikes_) y la integración de memoria (e.g. dinamismo de las neuronas) y cálculo (e.g. acción impulsiva de estas) en una misma unidad, eliminando el "cuello de botella" de Von Neumann.

> [!WARNING]
> El cuello de botella de la arquitectura de Von Neumann es una limitación muy conocida y frecuencia que se da cuando existe una diferencia de rendimiento reconocible entre la CPU y la memoria. En esta situación, al compartir un mismo bus para datos e instrucciones, la CPU queda inactiva esperando información, ya que su velocidad de procesamiento puede superar con creces la capacidad de transferencia de la memoria (ya sea desde memoria volátil o no volátil).

Además, hay evidencias de que la computación neuromórfica permite la ejecución de modelos de IA más eficientes y sostenibles, lo que acelera el interés institucional en ella. Y los avances en investigación han evolucionado efectivamente hasta hoy día, cuando ya existen sistemas de escala masiva y aplicaciones comerciales _edge_ para desarrollar soluciones basadas en ello.

## Sobre este enfoque

Expuesto en 2024, [Hala Point](https://download.intel.com/newsroom/archive/2025/es-xl-2024-04-17-intel-construye-el-sistema-neuromorfico-mas-grande-del-mundo-para-posibilitar-una-ia-mas-sostenible.pdf) es el sistema de computación neuromórfica más grande del mundo, desarrollado por Intel, en los [Laboratorios Nacionales Sandía 🍉](https://www.sandia.gov/), que utiliza 1152 procesadores neuromórficos **Loihi 2 / 3** para emular 1150 millones de neuronas (el equivalente al cerebro de un **búho** 🦉), logrando una eficiencia energética (aprox. > 15 TOPS/W) de hasta 50 veces superior al equiparable en GPUs convencionales (con cargas de trabajo similares).

En el borde, destacan procesadores como el [Akida de Brainchip](https://brainchip.com/ip/9), que se integran en soluciones IoT funcionales e incluso en [vehículos](https://brainchip.com/brainchip-mercedes-neuromorphic-ev-concept-car/) [de Mercedes](https://www.motor.com.co/seccion/revista-motor/vision-iconic-el-mercedes-neuromorfico_20723), permitiendo inferencia de altas prestaciones en tiempo real sin depender de la nube.

![Akida](https://brainchip.com/wp-content/uploads/2025/04/3.-AXI-Bus-Interconnect-diagram-1-1-1200x683.png)

Otros procesadores neuromórficos son [NorthPole](https://research.ibm.com/blog/northpole-ibm-ai-chip) de IBM (arquitectura digital de alta densidad para inferencia de visión y lenguaje), [SpiNNaker 1 / 2](https://open-neuromorphic.org/neuromorphic-computing/hardware/spinnaker-2-university-of-dresden/) de la Univ. de Manchester y la Univ. de Dresden (arquitectura masivamente paralela específicamente diseñada y optimizada para simulación o modelización cerebral), o [Xylo](https://www.synsense.ai/products/xylo/) de SynSense (específicamente para audio, señales eléctricas o nerviosas y sensores de baja potencia).

_¿En qué conceptos se basa la arquitectura neuromórfica (**neuromorfología**)?_:

- Las SNN (_Spiking Neural Networks_) son la arquitectura fundamental; se basan en que la neuronas reales no transmiten valores continuos, sino "picos" (_**spikes**_) de energía en momentos discretos. Entonces, si no necesidad de disparar un evento, no hay consumo eléctrico (mayor eficiencia).
- El sistema (la red) solo se activa cuando detecta cambios en los datos de entrada (como pasa en un ojo humano... ni siquiera prestamos atención a lo que pasa en el _background_ o fondo aunque esté visible a nuestros ojos, a no ser que aparezca algo distintivo "de repente" que nos llame la atención) (**procesamiento basado en eventos**), reduciendo así el consumo energético incluso en varios órdenes de magnitud.
- Los circuitos neuronales tienen **plasticidad** (pueden deformarse); pueden aprender y reconfigurar sus conexiones sinápticas en tiempo real, sin depender de un entrenamiento masivo previo en la nube.

## Librerías y frameworks

_¿Y qué librerías podemos utiliar tanto para programar el hardware (silicio) neuromórfico así como para emularlo en computadores clásicos?_:

| Librería / Framework | Función Principal                                                                 | Enfoque de Programación                                                                 | Hardware Real |
|---------------------|----------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|---------------|
| Lava (Intel)        | Orquestación y despliegue de aplicaciones neuromórficas de extremo a extremo.    | Agnóstico: Permite desarrollar algoritmos que corren tanto en CPUs como en chips Loihi. | ✅ Sí (Optimizado para Loihi 1/2) |
| snntorch            | Entrenamiento de SNNs mediante gradiente descendente (Backpropagation).          | Deep Learning: Basado en PyTorch; ideal para investigadores de IA clásica.               | ❌ No directamente (Requiere exportar el modelo) |
| Nengo              | Simulación de sistemas cognitivos complejos y funciones matemáticas a gran escala.| Arquitectura: Usa el NEF (Neural Engineering Framework) para modelar el cerebro.         | ✅ Sí (Loihi, SpiNNaker, FPGAs) |
| SpikingJelly        | Framework de aprendizaje profundo para SNNs con soporte para aceleración en GPU. | PyTorch-based: Muy popular para visión artificial y procesamiento de señales.            | ⚠️ Solo vía exportación (ej. a chips de SynSense) |
| Rockstar            | Optimización de hiperparámetros y ajuste de redes de impulsos en tiempo real.    | Ajuste Fino: Se enfoca en que la red sea eficiente y precisa bajo restricciones.         | ❌ Principalmente simulación/emulación |

## Trabajo futuro

Entre posibles líneas de trabajo e investigación, se abren posibilidades como las siguientes:

- **Integrar** computación cuántica con neuromórfica para optimizar el aprendizaje automático y la gestión de sensores. Así como **complementar** a las GPU actuales, no sustituirlas (e.g. usar GPU para aprendizaje y entrenamiento masivo, y procesadores neuromórficos para re-aprendizaje e inferencia).
- Utilizar procesadores neuromórficos como cerbro de robots humanoides modernos o robots colaborativos (**Cobots**), permitiéndoles interactuar físicamente con el mundo con una latencia mínima y una adaptación continua al entorno.
- Integrar **implantes en cerebros** de seres vivos que recojan, decodifiquen y exploten señales e impulsos neuronales reales, previa simulación y aprovechando su bajo consumo y mínima generación de calor.
- Incorporar circuitos integrados neuromórficos en **dispositivos móviles**, para ejecutar aplicaciones de IA (e.g. asistentes personales) locales sin sacrificar apenas batería.
- Aprovehcar todos sus principios de funcionamiento para cubrir aplicaciones con nuevos sensores, e.g. usando [**sensores de visión por eventos**](https://foro3d.com/articulos/como-funcionan-los-sensores-de-vision-basados-en-eventos.html) (o de la **fuente de datos que sea**), que no capturan fotogramas, sino cambios de luz por píxel (e.g. aplicable a drones de alta velocidad y viligancia 24/7).
- Uso de **memristores** (componentes electrónicos que "recuerdan" su resistencia pasada) para alcanzar densidades de sinapsis cada vez más cercanas a las del cerebro humano, en un espacio mínimo cada vez más reducido.

Como desventaja, actualmente aún es un problema abierto qué **algoritmos** diseñar y usar **para entrenar las redes neuromórficas** tan eficazmente como hace el _backpropagation_ y sus variantes en las redes tradicionales.