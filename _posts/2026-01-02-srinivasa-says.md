---
title: Srinivasa says
tags: [electronics]
style: fill
color: warning
description:  Un juego al estilo Simon Says basado en ATmega328P que reproduce dígitos de π en notas musicales. 
---

Enlace al proyecto: **[https://github.com/agarnung/srinivasa-says](https://github.com/agarnung/srinivasa-says)**.

![Imagen 1](../assets/blog_images/2026-01-02-srinivasa-says/full1.png)

![Imagen 2](../assets/blog_images/2026-01-02-srinivasa-says/full2.png)

![Imagen 3](../assets/blog_images/2026-01-02-srinivasa-says/full3.png)

![GIF animado](../assets/blog_images/2026-01-02-srinivasa-says/proto.gif)

## Resumen del proyecto

**Concepto**: dispositivo interactivo que asocia un teclado numérico a frecuencias sonoras, permitiendo crear música o jugar en un modo de memoria donde los fallos activan una señal de error.

* **Hardware principal**: microcontrolador [ATmega328P-PU](https://ww1.microchip.com/downloads/en/DeviceDoc/ATmega48A-PA-88A-PA-168A-PA-328-P-DS-DS40002061B.pdf) montado con un cristal externo de 16 MHz para garantizar la precisión temporal de las notas.
* **Salida de audio**: buzzer pasivo piezoeléctrico con un circuito de control de volumen analógico mediante un trimmer de 10 kΩ y resistencias de protección.
* **Gestión de potencia**: alimentación flexible a través de USB-C o baterías, protegida por un interruptor rocker y reguladores de tensión.
* **Interfaz visual**: LEDs controlados por transistores BJT 2N3904 que actúan como drivers para evitar el consumo excesivo de corriente desde los pines del microcontrolador.

## Herramientas y software

El desarrollo del proyecto integró diversas disciplinas de ingeniería mediante el siguiente stack tecnológico:

* **Diseño electrónico**: [EasyEDA](https://oshwlab.com/agarnung/srinivasa-says) para la creación del esquemático y el ruteado de la pcb, permitiendo la exportación de modelos 3d para su integración mecánica.
* **Simulación de sistemas**: [Proteus 8.12](https://www.labcenter.com/whatsnew/8.12/) para validar la lógica del código y el comportamiento del hardware antes de la fabricación física.
* **Desarrollo de firmware**: [WinAVR](https://winavr.sourceforge.net/) y [avr-gcc](https://winavr.sourceforge.net/) para compilar código en c puro. Usado a través de [Microship Stuio](https://www.microchip.com/en-us/tools-resources/develop/microchip-studio) (antes [Atmel Studio](https://www.microchip.com/en-us/tools-resources/develop/microchip-studio)).
* **Modelado mecánico**: [Blender](https://www.blender.org/) para diseñar la carcasa protectora. [Fusion](https://www.autodesk.com/es/products/fusion-360/overview) para el diseño de los botones táctiles personalizados.
* **Fabricación aditiva**: [BambuStudio](https://bambulab.com/es/download/studio) para la laminación y [Bambulab A1 mini](https://bambulab.com/es/a1-mini) para la impresión 3D de las piezas.
* **Grabación de hardware**: programador [USBASP](https://www.tiendatec.es/maker-zone/programadores/526-programador-usbasp-v20-avr-icsp-con-cable-para-arduino-8405261440008.html) y la herramienta [AVRDUDE](https://github.com/avrdudes/avrdude) (a través de su GUI [AVRDUDESS](https://blog.zakkemble.net/avrdudess-a-gui-for-avrdude/)) para cargar el archivo .hex directamente en el chip mediante la interfaz ISP.
