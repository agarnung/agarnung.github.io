---
title: Casual Physics - Electron flow
tags: [physics]
style: fill
color: danger
description: Un comentario sobre la electricidad y el electromagnetismo 
---

![image](https://tallerelectronica.com/wp-content/uploads/2015/03/personajesvri.png)

El otro día me regalaron un banco de carga (tipo [esto](https://www.amazon.es/Stylebest-El%C3%A9ctrica-Port%C3%A1til-Capacidad-Actividades/dp/B0H5JG33TK?dib=eyJ2IjoiMSJ9.loPMYXhjS_A7fwH9gO_Jd7N5M5Q8A4uqtbHtEthH8QKb7SLv6K52SW9i36jz1KVJpikRGgsjEGiPQBGAhpFkBZROwgZ8hmdcBIWUyeTovPHkGOyDydRh6tBc8TmQoAdse4fhyMHpFwSdF1tqcxPf7Xwwat-pqusJHpyRxBoOMSlQU3DRRgxEYxQzOgnI5O5_UaC9PUHVHmPIo1ecqABYZDaiXvWf0c1hc11eFgsEtoZLDyUISfFNzzc566sKTsVt_W5x9mjT5qSiMldXm3dMJ01ZeEijjX6ghqmYm9jgiRc.mtQ2YItZcc0IjiRT2Yc-bVH9sYddkHVklIduXu0VleI&dib_tag=se&keywords=bateria%2Bportatil%2Bgrande&qid=1783445030&refinements=p_n_date_first_available_absolute%3A831289031&s=electronics&ufe=app_do%3Aamzn1.fos.5e544547-1f8e-4072-8c08-ed563e39fc7d&xpid=ALVP2evATUkjG&th=1)) muy útil en el que puedes conectar varios dispositivos USB-A y USB-C con hasta _ciertos_ W de potencia, con reguladores para controlar la corriente máxima por puerto para cada carga. 

Conecté mi móvil (un [Redmi Note 10 Pro](https://www.mi.com/es/product/redmi-note-10-pro/)), con una [batería BN53](https://www.repuestosfuentes.es/bateria-bn53-de-5020mah-para-xiaomi-redmi-note-9-pro-redmi-note-9-pro-max-redmi-note-10-pro-4g-72695.html) de capacidad de carga de 5020 mAh, o sea, que cuando la batería pasa del 0 al 100 % (suponiendo un voltaje de la batería de 3,85 V), almacena unos 3,85 × 5020 / 1000 ≈ 19,33 Wh de energía. Suponiendo una eficiencia total del sistema de carga de 0,85 (cargador + conversión interna del teléfono), esto son unos 0,023 kWh (unos 0,45 céntimos a 0,20 €/kWh) que consume de la red eléctrica para una carga completa.

Pues me di cuenta de un fenómeno que no me esperaba: la **potencia** consumida por el dispositivo **no** saltaba casi de inmediato a su **valor nominal** (de aprox. 33 W con su adaptador oficial), sino que **crecía paulatinamente**. Esto es porque el cargador rápido (o el del banco de carga) negocia inicialmente con el controlador de carga de las baterías del móvil (acordar tensión y corriente, verificar temperatura...) para incrementar gradualmente la potencia hasta el valor permitido, según cierto protocolo acordado  (CC/CV u otras estrategias), para alargar la vida útil del móvil, independientemente de que el dispositivo pudiera soportar una carga a 33 W constantes y, por tanto, mayor rapidez.

Pero es que esto llevó a repasar ideas muy extendidas sobre el **flujo electromagnético**. La primera, intuitiva y a la vez engañosa, es que los electrones que se mueven por el cable son quienes "transportan la electricidad” de un sitio a otro. Un segundo punto de vista admite que los electrones no avanzan como el agua en una tubería hasta el grifo, sino que es la **energía** la que se transmite. En analogía con el grifo: al abrir la válvula el líquido llega enseguida porque la columna ya estaba sometida a presión; algo parecido se dice del movimiento colectivo de portadores frente a la señal eléctrica.

Un tercer enfoque, que es el más adecuado, habla en términos de campos: aunque los electrones sí se desplazan lentamente por el conductor, la energía que alimenta la carga se describe mucho mejor como un flujo del **campo electromagnético** alrededor de los conductores; lo que transporta la **potencia** en el sentido moderno es ese campo, mientras que los electrones siguen siendo imprescindibles para establecer las corrientes y las condiciones de contorno que hacen posibles esos campos.

> [!NOTE]
> En electromagnetismo, el **vector de Poynting** ($$\mathbf{S}=\mathbf{E}\times\mathbf{H}$$) representa el **flujo de energía electromagnética**, es decir, la potencia que atraviesa una unidad de superficie (W/m²). Su dirección indica **hacia dónde se transporta la energía**. En un cable eléctrico, este flujo no discurre por el interior del metal como si los electrones llevaran la energía "a cuestas", sino principalmente por el **campo electromagnético que rodea a los conductores**, mientras que los electrones establecen las corrientes y las condiciones necesarias para que esos campos existan.

En el canal [Veritasium](https://www.youtube.com/watch?v=vjFefDCIje0) se muestra un experimento con un circuito (bucle cerrado) larguísimo en un desierto: al cerrar el interruptor, una lámpara cercana puede iluminarse sin esperar a que un hipotético "viaje de electrones" recorra todo el perímetro, porque al cerrar el circuito se genera una onda electromagnética que se propaga alrededor de los conductores aproximadamente a una fracción de la velocidad de la luz; el campo eléctrico y el magnético existen en el espacio entre los conductores y el flujo de energía viene dado por el vector de Poynting. La energía empieza a fluir desde la fuente en el instante en que se cierra el circuito. Si la lámpara está junto al tramo de retorno, las **condiciones de borde** bastan para que reciba potencia casi de inmediato (salvo detalles de línea y reflexiones), sin que haga falta modelar toda la longitud del cable como un retardo de transporte de carga llevada por electrones.

> [!TIP]
> Este fenómeno recuerda más o menos a lo que pasa con las pastillas de las guitarras eléctricas cuando estás muy cerca de un centro de transformadores.

## Carga inalámbrica y la imagen del “flujo por el cable”

Un caso cotidiano son las [base de carga inductivas](https://es.hama.com/productos/accesorios-para-moviles/tecnologia-de-carga/estacion-de-carga-inductiva); la duda habitual es cómo puede haber energía **sin** contacto metálico directo como en un enchufe. La respuesta corta es que no hay “electricidad viajando como agua por un tubo” dentro del cable, sino **campos electromagnéticos** que transportan energía por el espacio; los conductores confinan y condicionan la distribución de los campos. [Maxwell](https://es.wikipedia.org/wiki/James_Clerk_Maxwell#Electromagnetismo) sentó las bases de esta descripción hace más de un siglo, así que un poquito de favor y pensemos con propiedad. La explicación usando la analogía hidráulica es intuitiva pero puede llevar a confusión cuando se pretende explicar carga por inducción o la propagación de señales.

_Una mejor manera de explicarlo_:

**Analogía con el sonido**: en un altavoz no se ve “salir” la música por un conducto; lo que se propaga es una perturbación (onda) en el aire. En el cable, lo que interesa para la potencia no es solo el desplazamiento neto de electrones a lo largo del metal, sino el **campo** asociado a la corriente y su energía en el entorno del conductor.

La energía electromagnética se propaga en el medio (y en el campo) con la velocidad característica del medio; en un cable doméstico los electrones suelen avanzar con velocidades de deriva del orden de milímetros por segundo, mientras que la perturbación electromagnética que transmite la energía se propaga a una fracción importante de la velocidad de la luz. La imagen de electrones en fila india recorriendo cientos de millones de metros en segundos no describe bien la entrega de energía a un receptor cercano.

En resumen: lo que se modela de forma coherente con esta teoría es el **transporte de energía por el campo electromagnético**, no un fluido eléctrico desplazándose solo “por el interior” del cable.
