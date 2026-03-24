---
title: Claves y criptografía cuántica
tags: [computer science, divulgation]
style: fill
color: info
description: Computación cuántica y criptografía - por qué aumentar claves no es (o puede no ser) suficiente
---

Trabajando en [una empresa](https://www.fundacionctic.org/es/proyectos?combine=&field_sector_target_id=All&field_ambito_geografico_target_id=All&field_tecnologias_target_id=34&ambito_tid=All) donde la investigación en computación cuántica es el pan de cada día, me parece inevitable dedicar un post a este tema, por introductorio que sea (tampoco doy para más).

Una pregunta común que me hago es: **_¿por qué no podemos simplemente aumentar el tamaño de las claves para protegernos de los computadores cuánticos?_** La respuesta no es muy compleja pero tiene raíces muy arraigadas en la seguridad criptográfica.

## El problema fundamental

La razón fundamental de la cuestión es que **las computadoras cuánticas no atacan al cifrado simétrico y al asimétrico de la misma manera**. En el cifrado simétrico aumentar el tamaño de la clave es una solución práctica, mientras que en el asimétrico es ineficaz contra la amenaza cuántica, debido a la forma en que funcionan sus algoritmos...

## ...¿Por qué? El impacto de Shor vs. Grover

### Cifrado simétrico (AES-256, DES, Blowfish, etc.)

Todo (en teoría) cifrado simétrico se ve afectado (debilitado) por el [**algoritmo de Grover**](https://es.wikipedia.org/wiki/Algoritmo_de_Grover).

* Este algoritmo reduce la seguridad a la mitad.
* Por tanto una clave de 256 bits equivale a una de 128 bits frente a un ataque cuántico.
* **Esto sigue siendo seguro**, pues AES-256 con Grover sigue siendo equivalente a AES-128 clásico, que es considerado razonablemente seguro.

> [!NOTE] Por dar números, con fuerza bruta, el espacio de las claves es de $$2^{128} \approx 3.4 \times 10^{38}$$. Siendo muy optimistas, una máquina muy potente hoy día puede hacer 2.000 millones de intentos de claves diferentes por segundo. Pues usemos 1.000 veces más por margen de seguridad, i.e., 2 millones de millones ($$2 \times 10^{12}$$) de claves/segundo. Esto son $$3.4 \times 10^{38} / 2 \times 10^{12} = 1.7 \times 10^{26}$$ segundos $$\approx 5.39 \times 10^{18}$$ años, que son aprox. **5.39 trillones de años** (escala larga). El universo tiene $$\sim 1.38 \times 10^{10}$$ años. Es decir, tardaríamos **~390 millones de veces** la edad del universo.
>
> Y si el algoritmo de Grover reduce de $$2^n$$ a $$2^{n/2}$$, la seguridad efectiva de un AES-128 se reduciría a $$\approx 2^{64}$$. Supongamos que una máquina es capaz de hacer $$10^{12}$$ operaciones cuánticas/segundo (sobredimensionando); tardaría aprox. $$2^{64} / 10^{12} \approx 1.8 \times 10^7$$ s $$\approx 0.6$$ años $$\sim 7$$ meses. Esto suponiendo un escenario perfecto (millones de qubits lógicos, corrección de errores masivos, circuitos extremadamente profundos, etc.).
>
> **Conclusión:** Mientras que el AES-128 es inexpugnable para la computación clásica, la llegada de un ordenador cuántico maduro obligará a dar el salto al **AES-256**. Al duplicar la longitud de la clave, incluso tras la reducción de Grover, nos quedaría una seguridad efectiva de $$2^{128}$$, devolviendo el tiempo de ruptura a cifras astronómicas imposibles de alcanzar, pues pasar de 128 a 256 bits no duplica el tiempo, sino que lo multiplica por 2128 (un número de 39 dígitos).

**Solución práctica**: para el cifrado simétrico, con simplemente duplicar el tamaño de la clave (e.g. de 128 a 256 bits), es suficiente para contar con una seguridad critpgráfica fiable hoy día.

### Cifrado asimétrico (RSA, ECC)

Todo (en teoría) cifrado asimétrico se ve afectado (roto _por completo_) por el [**algoritmo de Shor**](https://es.wikipedia.org/wiki/Algoritmo_de_Shor).

Shor **no es un ataque de fuerza bruta**, sino un algoritmo matemático diseñado para encontrar períodos en funciones. Lo que hace es romper la **factorización de números primos** (base de RSA) de manera **exponencial**, no lineal, lo que significa que el tiempo necesario para factorizar números inmensos crece de manera irrisoria con el tamaño del número, haciendo plausible un problema que era intratable con ordenadores clásicos. También rompe el **problema del logaritmo discreto** (base de la [Criptografía de Curva Elíptica [ECC]](https://www.digicert.com/es/faq/cryptography/what-is-elliptic-curve-cryptography)).

Aquí, el problema es que aumentar el tamaño de la clave no soluciona eficazmente esta carencia intrínseca que logra explotar el algoritmo ante Shor.

> [!TIP]
> Aumentar el tamaño de la clave es como usar una llave más pesada para abrir una puerta vulnerable cuando hay algo (los computadores cuánticos) que puede hacer desaparecer la puerta. La solución es cambiar el tipo de acceso o puerta, directamente.

_¿Y por qué es ineficiente aumentar el tamaño de las claves asimétricas?_

Aumentar el tamaño de las claves asimétricas (por ejemplo, de RSA-2048 a RSA-4096) no ofrece una protección proporcional, sino que lo único que causa es que se descifrado (de lado del usuario o receptor estándar) se vuelva impracticable y exponencialmente más costoso. Es decir, para resistir una computadora cuántica, las claves asimétricas tendrían que ser **tan grandes** que harían que los meros intercambios de claves fueran inusualmente lentos e imposibles en dispositivos con recursos limitados (IoT, móviles, etc.). Sin hablar de la mera genercaión de estas claves.

Es decir, que realmente la solución **no es más grande, sino diferente**. Básicamente la solución más fácil al cifrado asimétrico no es usar claves más grandes, sino **migrar a la Criptografía Post-Cuántica (PQC)**.

_¿Qué es la criptografía post-cuántica?_

Son **nuevos algoritmos** (basados en redes o celosía [_lattices_], códigos, o isogenias [aplicación lineal entre dos curvas elıpticas]) que no dependen de la factorización de números primos, ni de los logaritmos discretos de métodos asimétricos. Son un reto incluso para las computadoras cuánticas.

Ejemplos de algoritmos post-cuánticos son:

* **CRYSTALS-Kyber**: cifrado de clave pública basado en redes.
* **CRYSTALS-Dilithium**: firma digital basada en redes.
* **SPHINCS+**: firma digital basada en hash.
* **NTRU**: criptosistema de clave pública.

Estos algoritmos están siendo estandarizados por el **NIST (National Institute of Standards and Technology)** en un proceso que comenzó en 2016. Aunque los fundamentos de los sistemas post-cuánticos ya nacieron mucho antes, e.g. NTRU, [Shor](https://dl.acm.org/doi/10.1145/237814.237866) y [Grover](https://dl.acm.org/doi/10.1145/237814.237866) son de los 90.

> [!NOTE]
> ¿Y por qué si toda esta teoría es de los 90, no se hizo famosa la computación cuántica hasta hace unos pocos años?
> Pues porque si bien el "software" ya estaba estudiado, por aquel entonces no existía la maquinaria o "hardware" para ejecutar los algoritmos. Hoy día, la **superconducción** y los [**láseres avanzados**](https://www.ionq.com/) permiten crear **qubits reales y estables**.

## Estado actual y migración

Aunque las computadoras cuánticas capaces de romper RSA-2048 aún no existen:

* Existe el **_"harvest now, decrypt later"_**: los atacantes están almacenando datos cifrados hoy para descifrarlos cuando tengan computadoras cuánticas (véase [Y2Q (_Year-to-Quantum_) o "Día-Q"](https://www.platinumciber.com/es/y2q-apocalipsis-cuantico/)).
* La **migración toma tiempo**: cambiar sistemas criptográficos es un proceso largo y complejo.

Por eso, una estrategia factible de mitigación valora:

1. **Identificar sistemas críticos**: qué necesita protección post-cuántica.
2. **Evaluar algoritmos PQC**: probar y validar nuevos algoritmos.
3. **Implementar híbridos**: usar tanto algoritmos clásicos como post-cuánticos durante la transformación.
4. **Planificar la transición**: hacer una migración gradual y controlada según un órden de prioridad lógico.

## Resumen

En resumen, podemos rescatar 4 ideas atómicas de todo esto:

* Cifrado **simétrico** es vulnerable: aumentar claves funciona (duplicar tamaño es suficiente; Grover no ofrece ventaja práctica ilimitada).
* Cifrado **asimétrico** es quebreable: aumentar claves no funciona (Shor rompe la base matemática).
* **Solución**: migrar a **criptografía post-cuántica**.
* **Estado actual**: algoritmos PQC están siendo estandarizados por NIST.

## Referencias

* NIST Post-Quantum Cryptography Standardization: [https://csrc.nist.gov/projects/post-quantum-cryptography](https://csrc.nist.gov/projects/post-quantum-cryptography)
* Shor, P. W. (1997). "Polynomial-time algorithms for prime factorization and discrete logarithms on a quantum computer." *SIAM Journal on Computing*, 26(5), 1484-1509. [Paper](https://epubs.siam.org/doi/10.1137/S0097539795293172).
* Grover, L. K. (1996). "A fast quantum mechanical algorithm for database search." *Proceedings of the 28th Annual ACM Symposium on Theory of Computing*. [Paper](https://dl.acm.org/doi/10.1145/237814.237866).
* Nielsen, M. A., & Chuang, I. L. (2010). Quantum Computation and Quantum Information. Cambridge University Press.