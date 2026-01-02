---
title: Srinivasa says
tags: [electronics]
style: fill
color: warning
description:  Un juego al estilo Simon Says basado en ATmega328P que reproduce dígitos de π en notas musicales. 
---

Enlace al proyecto: **[https://github.com/agarnung/srinivasa-says](https://github.com/agarnung/srinivasa-says)**.

<video width="640" height="360" controls>
  <source src="https://private-user-images.githubusercontent.com/191017814/531484094-b9acbc8d-a9ce-4489-b028-960156978bec.mp4?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjczNjU3MTAsIm5iZiI6MTc2NzM2NTQxMCwicGF0aCI6Ii8xOTEwMTc4MTQvNTMxNDg0MDk0LWI5YWNiYzhkLWE5Y2UtNDQ4OS1iMDI4LTk2MDE1Njk3OGJlYy5tcDQ_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwMTAyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDEwMlQxNDUwMTBaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT03NzU2Y2ZiYTNhMTU5MmQwZTQ3NWEzMjBlMTc2NDhlYmNlMWNmYTAzNjU5Y2MzNTA3ZjY5OTUwZjgxOTNiNDIyJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.NW9fLrqXp3iGHPCom8Lk6pBQnX5fwcAowYpggHD6TwE" type="video/mp4">
  Tu navegador no soporta la etiqueta de video.
</video>

<img src="https://github.com/agarnung/srinivasa-says/raw/main/assets/full1.png" alt="Imagen 1">

<img src="https://github.com/agarnung/srinivasa-says/raw/main/assets/full2.png" alt="Imagen 2">
  
<img src="https://github.com/agarnung/srinivasa-says/raw/main/assets/full3.png" alt="Imagen 3">

<img src="https://github.com/agarnung/srinivasa-says/raw/main/assets/proto.gif" alt="GIF animado">

## Resumen del proyecto

**Concepto**: dispositivo interactivo que asocia un teclado numérico a frecuencias sonoras, permitiendo crear música o jugar en un modo de memoria donde los fallos activan una señal de error.

* **Hardware principal**: microcontrolador atmega328pu montado con un cristal externo de 16 mhz para garantizar la precisión temporal de las notas.
* **Salida de audio**: buzzer pasivo piezoeléctrico con un circuito de control de volumen analógico mediante un trimmer de 10 kΩ y resistencias de protección.
* **Gestión de potencia**: alimentación flexible a través de usb-c o baterías, protegida por un interruptor rocker y reguladores de tensión.
* **Interfaz visual**: leds controlados por transistores bjt 2n3904 que actúan como drivers para evitar el consumo excesivo de corriente desde los pines del microcontrolador.

## Herramientas y software

El desarrollo del proyecto integró diversas disciplinas de ingeniería mediante el siguiente stack tecnológico:

* **Diseño electrónico**: [EasyEDA](https://oshwlab.com/agarnung/srinivasa-says) para la creación del esquemático y el ruteado de la pcb, permitiendo la exportación de modelos 3d para su integración mecánica.
* **Simulación de sistemas**: [Proteus 8.12](https://www.labcenter.com/whatsnew/8.12/) para validar la lógica del código y el comportamiento del hardware antes de la fabricación física.
* **Desarrollo de firmware**: [WinAVR](https://winavr.sourceforge.net/) y [avr-gcc](https://winavr.sourceforge.net/) para compilar código en c puro. Usado a través de [Microship Stuio](https://www.microchip.com/en-us/tools-resources/develop/microchip-studio) (antes [Atmel Studio](https://www.microchip.com/en-us/tools-resources/develop/microchip-studio)).
* **Modelado mecánico**: [Blender](https://www.blender.org/) para diseñar la carcasa protectora. [Fusion](https://www.autodesk.com/es/products/fusion-360/overview) para el diseño de los botones táctiles personalizados.
* **Fabricación aditiva**: [BambuStudio](https://bambulab.com/es/download/studio) y [Bambulab A1 mini](https://bambulab.com/es/a1-mini)  el laminado de las piezas destinadas a impresión 3d.
* **Grabación de hardware**: programador [USBASP](https://www.tiendatec.es/maker-zone/programadores/526-programador-usbasp-v20-avr-icsp-con-cable-para-arduino-8405261440008.html) y la herramienta [AVRDUDE](https://github.com/avrdudes/avrdude) (a través de su GUI [AVRDUDESS](https://blog.zakkemble.net/avrdudess-a-gui-for-avrdude/)) para cargar el archivo .hex directamente en el chip mediante la interfaz ISP.
