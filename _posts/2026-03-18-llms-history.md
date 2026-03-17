---
title: Interface contra LLMs
tags: [computer science, divulgation]
style: fill
color: warning
description: Breve historia de la programación con LLMs
---

Hoy en día, el flujo estándar para interactuar con la mayoría de modelos de lenguaje grandes (LLMs) es usar `requests` con la API de OpenAI (principalmente) o servicios similares. Pero esto no es desde hace mucho (bueno, [ni los LLM](https://en.wikipedia.org/wiki/Large_language_model#History) son de hace mucho). En este post visitaremos brevísimamente cuáles eran los "estándares" antes y cómo ha ido evolucionando la forma de programar e interactuar con los modelos de lenguaje.

Aunque realmente se puede resumir en que no hubo un único estándar _per se_, pero sí una evolución que podemos dividir en varias etapas claras.

## Pre-2018: antes de los LLMs modernos

Antes de 2018 (aproximadamente), **no existía un "estándar LLM"** porque no existían LLMs como servicio. Lo habitual era trabajar con:

* **Modelos locales**: ejecutados directamente en tu máquina.
* **Librerías específicas por framework**: cada framework tenía su propia interfaz.
* **APIs directas**: llamadas a funciones en Python (NLTK, Gensim, Scikit-learn, spaCy...) o C++ (MITIE, Dlib, OpenNLP...), sin HTTP ni JSON.

O sea, se trabajaba alrededor de librerías que se centraban más en el ** _feature engineering_** manual y modelos estadísticos o predictivos de **n-gramas**, o **redes neuronales** relativamente poco pesadas computacionalmente, a diferencia de los modelos basados en **Transformers** actuales.

Por ejemplo, en la época, entre otras técnicas muy utilizadas destacan:

* [**word2vec**](https://lamyiowce.github.io/word2viz/): para manejo de embeddings de palabras, sin arquitectura de lenguaje. U otros modelos como **seq2seq** usando LSTM.
* [**GloVe**](https://www-nlp.stanford.edu/projects/glove/): aprendizaje no supervisado para obtener embeddings globales de palabras, modelos estáticos.
* [**fastText**](https://github.com/facebookresearch/fastText?tab=readme-ov-file): "library for efficient learning of word representations and sentence classification".
* **RNNs/LSTMs entrenados a mano**: modelos recurrentes con arquitecturas diseñadas manualmente o, en algunos casos, combinadas con modelos probabilísticos como CRF o grafos de factores, que podía resultar en sistemas bastante complejos.

> [!IMPORTANT] Lejos de estar obsoletas, muchas de estas herramientas son idóneas hoy día, incluso con todos los avances "académicos" y en _benchmarks_, para ejecutar modelos de lenguaje y aplicaciones de PLN en dispositivos de muy bajas prestaciones, o en tiempo real, o cuando no se dispone de grandes conjuntos de datos.

Las interfaces típicamente eran programáticas o por [línea de comandos (CLI)](https://fasttext.cc/docs/en/cheatsheet.html#content), del estilo:

```python
# Python API directa
> model.generate(tokens)
```

```bash
# CLI
$ fairseq-generate
```

Es decir, no se usaba HTTP, JSON, servicios remotos ni nada similar (al menos en general). Todo era local y directo.

## 2018-2020: con transformers pero aún en fase de investigación

Con la llegada de [**BERT (_Bidirectional Encoder Representations from Transformers__)**](https://www.ultralytics.com/glossary/bert-bidirectional-encoder-representations-from-transformers) (2018) y [**GPT-2**](https://es.wikipedia.org/wiki/GPT-2) (2019), aparecieron los transformers modernos, pero el estándar _de facto_ seguía siendo **llamadas a librerías, no a servicios.**

Los frameworks que más se usaban era, aun así:, **Hugging Face transformers** y **PyTorch / TensorFlow**.

De nuevo con una interfaz típica:

```python
tokenizer(text)
model(input_ids)
```

La escena seguía igual:

* Los modelos corrían en tu máquina.
* Eran _stateless_ (i.e. sin estado, sin memoria de conversación).
* No había conversación ni prompts largos.
* Todo era local y bajo tu control.

## 2020-2022: primeros LLMs como servicio (OpenAI GPT-3)

Aquí ya nació el cambio importante, con el lanzamiento de [**GPT-3**](https://es.wikipedia.org/wiki/GPT-3) en 2020, cuando OpenAI introdujo el concepto de LLM como servicio.

Con esto, se empezó a adoptar el nuevo estándar propuesto: **HTTP + JSON sobre REST**, que no surgió por consenso de la industria, sino porque **OpenAI lo impuso** y así siguió haciéndolo la comunidad, desarrollador tras desarrollador.

Ahora el uso del modelo se convertía en algo abstraíble, desligado a tu máquina, del tipo:

```txt
POST /v1/completions

{
  "prompt": "Once upon a time",
  "max_tokens": 100
}
```

Pero aún no había streaming "serio", herramientas (_tools_), ni _function calling_.

Y probablemente **REST** se eligió por simplicidad o comodidad, no por ser lo mejor técnicamente. Otras opciones a HTTP/REST pudieron ser gRPC (_Google Remote Procedure Call_), WebSockets o Message queues (Kafka, RabbitMQ...).

## 2023-2024: entran las "requests"

Aquí ya se consolida lo que hoy día podríamos llamar "el flujo de requests".

Es un estándar moderno que tiene múltiples características que lo hacen ventajoso respecto a los anteriores:

* **HTTP**: protocolo universal.
* **JSON**: formato de datos estándar.
* **Stateless**: cada petición es independiente.
* **Autenticación por token**: Uso de API keys para uso seguro de agentes como servicios.
* **Streaming por SSE**: _Server-Sent Events_ para respuestas en tiempo real (ir mandándolas de la que se va pensando/generando, no esperar a finalizar...).

Por ejemplo:

```txt
POST /v1/chat/completions
```

Y probablemente acogió tanto éxito porque funciona desde cualquier lenguaje (mayor) y desde `curl`, también detrás de proxies, es fácil de versionar y es un protocolo que parece universal.

### Endpoints comunes de OpenAI `/v1/`

* **`/v1/completions`** (Legacy): para modelos antiguos no ajustados para chat (como modelos base GPT-3) para completar prompts de texto crudo.
* **`/v1/chat/completions`**: el estándar para IA conversacional moderna, manejando mensajes estructurados (_system_, _user_, _assistant_) y reteniendo contexto.
* **`/v1/responses`**: la última unificación, diseñada para inputs multimodales (texto/imágenes) y características avanzadas de agentes como _tool use_ y _reasoning_.

> [!TIP] 
> ¿Y por qué el `/v1/` en los endpoints?
>
> Parece arbitrario, pero el `/v1/` en endpoints como `/v1/completions` simplemente significa **version 1**, indicando la primera iteración mayor de ese diseño de API específico.

## ¿Por qué no hubo un estándar formal, tipo SQL?

Bien es cierto que el campo evolucionó tan rápido (cada mes traía cambios o avances que incluían el _hype_ de parecer fundamentales) que quizá por eso se estandarizó esta solución y no se desarrollaron otras a gran escala. Así que cada empreas tiró por su lado, y nadie se preocupó en mejorar un estándar que ya pareció muy aceptable, sino continuar la "carrera" de la IA por el lado que mejor pudiera, e.g. OpenAI → chat, Anthropic → IA constitucional, Google → herramientas, Meta → inferencia local, Microsoft → nube...

## Pequeña tabla comparativa...

...del "estándar" de cada época: 

| Época | Interfaz dominante |
|-------|-------------------|
| Pre-2018 | API local (Python/C++) |
| 2018-2020 | HuggingFace / PyTorch |
| 2020-2022 | REST `/completions` |
| 2023-hoy | REST `/chat` (+ _tools_ + _streaming_...) |

> [!NOTE]
> _Stateless_ vs _stateful_.
>
> **Stateless** significa que una aplicación trata cada petición de forma independiente, sin recordar interacciones pasadas (sin "memoria"), haciéndola altamente escalable y tolerante a fallos (e.g. APIs REST, servidores web).
> **Stateful** significa que la aplicación retiene información (estado) de peticiones previas, requiriendo almacenamiento en el servidor para contexto, llevando a gestión de sesión más fácil pero escalado complejo (e.g. bases de datos, servidores de correo, banca).
>
> Los LLMs modernos como servicio son típicamente **stateless** en el nivel de API, aunque podrían mantener contexto dentro de una conversación mediante el historial de mensajes (siendo la manera correcta de pasar el historial mediante las _request_ exactas, i.e. especificando _assistant_, _user_ y resto de etiquetas...).

## Referencias

* [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)
* [Stack Overflow: OpenAI v1 completions vs v1 chat completions](https://stackoverflow.com/questions/76192496/openai-v1-completions-vs-v1-chat-completions-end-points)
* [Hugging Face Transformers](https://huggingface.co/docs/transformers)
* [Neural Networks: Zero to Hero](https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ)