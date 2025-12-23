---
title: OpenCV.js
tags: [image processing, computer vision, programming]
style: fill
color: success
description: Demostración interactiva de procesamiento de imágenes usando OpenCV.js en el navegador
---

## Introducción

En este post vemos cómo ejecutar código de PdI y VpC en el navegador, lo que será muy útil por el perfil de este blog.

**TL;DR**:

- Se carga desde el **CDN oficial** al abrir la página.
- La API de OpenCV.js se usa en **JavaScript**, similar a `cv2` en Python.
- Todo el **procesamiento ocurre en el cliente**, sin necesidad de servidor backend.

## Procesamiento de imágenes interactivo (web)

Esta demostración utiliza **OpenCV.js**, que es OpenCV compilado a JavaScript/WebAssembly, permitiendo ejecutar operaciones de procesamiento de imágenes directamente en el navegador sin necesidad de servidor backend. La API es muy similar a la de OpenCV en Python.

### Carga una imagen

<div style="margin: 20px 0;">
  <input type="file" id="imageInput" accept="image/*" style="margin-bottom: 15px;">
  <button id="loadDefaultBtn" style="margin-left: 10px; padding: 8px 15px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Cargar imagen de ejemplo</button>
</div>

### Controles

<div style="margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 8px;">
  <div style="margin-bottom: 15px;">
    <label for="blurSlider" style="display: block; margin-bottom: 5px; font-weight: 500;">
      Desenfoque Gaussiano (Kernel Size): <span id="blurValue">5</span>
    </label>
    <input type="range" id="blurSlider" min="1" max="15" value="5" step="2" style="width: 100%;">
    <small style="color: #666;">Valores impares: 1, 3, 5, 7, 9, 11, 13, 15</small>
  </div>

  <div style="margin-bottom: 15px;">
    <label for="thresholdSlider" style="display: block; margin-bottom: 5px; font-weight: 500;">
      Umbral de Binarización: <span id="thresholdValue">127</span>
    </label>
    <input type="range" id="thresholdSlider" min="0" max="255" value="127" style="width: 100%;">
  </div>

  <div style="margin-bottom: 15px;">
    <label for="cannyLowSlider" style="display: block; margin-bottom: 5px; font-weight: 500;">
      Canny - Umbral Bajo: <span id="cannyLowValue">50</span>
    </label>
    <input type="range" id="cannyLowSlider" min="0" max="255" value="50" style="width: 100%;">
  </div>

  <div style="margin-bottom: 15px;">
    <label for="cannyHighSlider" style="display: block; margin-bottom: 5px; font-weight: 500;">
      Canny - Umbral Alto: <span id="cannyHighValue">150</span>
    </label>
    <input type="range" id="cannyHighSlider" min="0" max="255" value="150" style="width: 100%;">
  </div>

  <div style="margin-bottom: 15px;">
    <label for="operationSelect" style="display: block; margin-bottom: 5px; font-weight: 500;">
      Operación:
    </label>
    <select id="operationSelect" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ddd;">
      <option value="original">Imagen Original</option>
      <option value="grayscale">Escala de Grises</option>
      <option value="blur">Desenfoque Gaussiano</option>
      <option value="threshold">Binarización (Threshold)</option>
      <option value="canny">Detección de Bordes (Canny)</option>
      <option value="morphology">Morfología (Erosión/Dilatación)</option>
      <option value="histogram">Ecualización de Histograma</option>
    </select>
  </div>
</div>

### Resultado

<div style="text-align: center; margin: 20px 0;">
  <canvas id="outputCanvas" style="max-width: 100%; border: 1px solid #ddd; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"></canvas>
  <p id="statusText" style="margin-top: 10px; color: #666;">Carga una imagen para comenzar</p>
</div>

### Código equivalente en Python

El código JavaScript que se ejecuta es equivalente a este código Python:

```python
import cv2
import numpy as np

# Cargar imagen
img = cv2.imread('imagen.jpg')

# Convertir a escala de grises
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Aplicar desenfoque gaussiano
blur = cv2.GaussianBlur(gray, (kernel_size, kernel_size), 0)

# Binarización
_, binary = cv2.threshold(gray, threshold_value, 255, cv2.THRESH_BINARY)

# Detección de bordes (Canny)
edges = cv2.Canny(gray, low_threshold, high_threshold)

# Morfología
kernel = np.ones((5,5), np.uint8)
eroded = cv2.erode(binary, kernel, iterations=1)
dilated = cv2.dilate(binary, kernel, iterations=1)

# Ecualización de histograma
equalized = cv2.equalizeHist(gray)
```

---

<script async src="https://docs.opencv.org/4.8.0/opencv.js" type="text/javascript"></script>

<script>
let cvReady = false;
let srcMat = null;
let currentImage = null;

function initializeOpenCV() {
  // Caso 1: cv es una Promesa (construcciones personalizadas más recientes)
  if (cv instanceof Promise) {
    cv.then((resolvedCv) => {
      window.cv = resolvedCv; // Asigna a ámbito global
      cvReady = true;
      console.log('OpenCV.js (Promise) está listo');
      onOpenCVInitialized();
    }).catch(err => {
      console.error('Error cargando OpenCV:', err);
      document.getElementById('statusText').textContent = 'Error cargando OpenCV.js';
    });
  } 
  // Caso 2: cv es un objeto normal, usar onRuntimeInitialized
  else if (cv && cv.onRuntimeInitialized) {
    cv['onRuntimeInitialized'] = () => {
      cvReady = true;
      console.log('OpenCV.js (onRuntimeInitialized) está listo');
      onOpenCVInitialized();
    };
  }
  // Caso 3: Fallback si no hay mecanismo de inicialización claro
  else {
    console.warn('Mecanismo de inicialización no detectado. Intentando usar cv directamente.');
    // Esperar un momento por si acaso
    setTimeout(() => {
      if (typeof cv !== 'undefined' && cv.Mat) {
        cvReady = true;
        onOpenCVInitialized();
      } else {
        document.getElementById('statusText').textContent = 
          'Error: No se pudo inicializar OpenCV.js';
      }
    }, 500);
  }
}

// Esta función se ejecuta SOLO cuando OpenCV está realmente listo
function onOpenCVInitialized() {
  document.getElementById('statusText').textContent = 'OpenCV.js cargado. Carga una imagen para comenzar.';
  
  // Habilitar controles que requieren OpenCV
  document.getElementById('loadDefaultBtn').disabled = false;
  document.getElementById('imageInput').disabled = false;
  
  // Cargar imagen por defecto
  loadDefaultImage();
}

// Verificación inicial cuando la página carga
if (typeof cv === 'undefined') {
  // Esperar a que se cargue el script opencv.js
  document.addEventListener('DOMContentLoaded', function() {
    // El script ya está en la página, usar evento load
    const opencvScript = document.querySelector('script[src*="opencv.js"]');
    if (opencvScript) {
      opencvScript.onload = initializeOpenCV;
    } else {
      // Por si acaso, intentar inicializar después de un tiempo
      setTimeout(initializeOpenCV, 1000);
    }
  });
} else {
  // cv ya está definido, inicializar directamente
  initializeOpenCV();
}

function loadDefaultImage() {
  // Crear una imagen de ejemplo (patrón de prueba)
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 400;
  const ctx = canvas.getContext('2d');
  
  // Dibujar un patrón de prueba
  const gradient = ctx.createLinearGradient(0, 0, 400, 400);
  gradient.addColorStop(0, '#ff0000');
  gradient.addColorStop(0.5, '#00ff00');
  gradient.addColorStop(1, '#0000ff');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 400, 400);
  
  // Añadir algunas formas
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(200, 200, 100, 0, 2 * Math.PI);
  ctx.fill();
  
  ctx.fillStyle = 'black';
  ctx.font = '48px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('OpenCV.js', 200, 220);
  
  processImageFromCanvas(canvas);
}

function processImageFromCanvas(canvas) {
  // Verificar que OpenCV esté disponible
  if (typeof cv === 'undefined' || !cvReady) {
    document.getElementById('statusText').textContent = 'Esperando a que OpenCV.js se cargue...';
    return;
  }
  
  // Verificar que el canvas sea válido
  if (!canvas || canvas.width === 0 || canvas.height === 0) {
    document.getElementById('statusText').textContent = 'Error: Canvas inválido';
    return;
  }
  
  try {
    // Limpiar imagen anterior si existe
    if (srcMat && !srcMat.isDeleted()) {
      srcMat.delete();
    }
    
    // Convertir canvas a Mat de OpenCV
    srcMat = cv.imread(canvas);
    
    // Verificar que la imagen se cargó correctamente
    if (srcMat.empty()) {
      document.getElementById('statusText').textContent = 'Error: No se pudo cargar la imagen';
      return;
    }
    
    currentImage = {
      width: canvas.width,
      height: canvas.height
    };
    
    applyProcessing();
  } catch (e) {
    console.error('Error procesando imagen:', e);
    document.getElementById('statusText').textContent = 'Error: ' + e.message;
    
    // Limpiar en caso de error
    if (srcMat && !srcMat.isDeleted()) {
      srcMat.delete();
      srcMat = null;
    }
  }
}

function applyProcessing() {
  // Verificar que OpenCV esté cargado y disponible
  if (typeof cv === 'undefined' || !cvReady) {
    document.getElementById('statusText').textContent = 'Esperando a que OpenCV.js se cargue...';
    return;
  }
  
  // Verificar que haya una imagen cargada
  if (!srcMat || srcMat.empty()) {
    document.getElementById('statusText').textContent = 'Por favor, carga una imagen primero.';
    return;
  }
  
  try {
    const outputCanvas = document.getElementById('outputCanvas');
    const operation = document.getElementById('operationSelect').value;
    const blurValue = parseInt(document.getElementById('blurSlider').value);
    const thresholdValue = parseInt(document.getElementById('thresholdSlider').value);
    const cannyLow = parseInt(document.getElementById('cannyLowSlider').value);
    const cannyHigh = parseInt(document.getElementById('cannyHighSlider').value);
    
    let dst = new cv.Mat();
    
    switch(operation) {
      case 'original':
        srcMat.copyTo(dst);
        break;
        
      case 'grayscale':
        cv.cvtColor(srcMat, dst, cv.COLOR_RGBA2GRAY);
        cv.cvtColor(dst, dst, cv.COLOR_GRAY2RGBA);
        break;
        
      case 'blur':
        // Asegurar que el kernel size es impar
        const kernelSize = blurValue % 2 === 0 ? blurValue + 1 : blurValue;
        cv.cvtColor(srcMat, dst, cv.COLOR_RGBA2RGB);
        cv.GaussianBlur(dst, dst, new cv.Size(kernelSize, kernelSize), 0, 0, cv.BORDER_DEFAULT);
        cv.cvtColor(dst, dst, cv.COLOR_RGB2RGBA);
        break;
        
      case 'threshold':
        let gray = new cv.Mat();
        cv.cvtColor(srcMat, gray, cv.COLOR_RGBA2GRAY);
        cv.threshold(gray, dst, thresholdValue, 255, cv.THRESH_BINARY);
        cv.cvtColor(dst, dst, cv.COLOR_GRAY2RGBA);
        gray.delete();
        break;
        
      case 'canny':
        let grayCanny = new cv.Mat();
        cv.cvtColor(srcMat, grayCanny, cv.COLOR_RGBA2GRAY);
        cv.Canny(grayCanny, dst, cannyLow, cannyHigh);
        cv.cvtColor(dst, dst, cv.COLOR_GRAY2RGBA);
        grayCanny.delete();
        break;
        
      case 'morphology':
        let grayMorph = new cv.Mat();
        let binaryMorph = new cv.Mat();
        cv.cvtColor(srcMat, grayMorph, cv.COLOR_RGBA2GRAY);
        cv.threshold(grayMorph, binaryMorph, 127, 255, cv.THRESH_BINARY);
        
        let kernel = cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(5, 5));
        cv.dilate(binaryMorph, dst, kernel, new cv.Point(-1, -1), 1);
        cv.cvtColor(dst, dst, cv.COLOR_GRAY2RGBA);
        
        grayMorph.delete();
        binaryMorph.delete();
        kernel.delete();
        break;
        
      case 'histogram':
        let grayHist = new cv.Mat();
        cv.cvtColor(srcMat, grayHist, cv.COLOR_RGBA2GRAY);
        cv.equalizeHist(grayHist, dst);
        cv.cvtColor(dst, dst, cv.COLOR_GRAY2RGBA);
        grayHist.delete();
        break;
    }
    
    // Mostrar resultado
    cv.imshow(outputCanvas, dst);
    
    // Limpiar memoria
    dst.delete();
    
    document.getElementById('statusText').textContent = `Imagen procesada: ${currentImage.width}x${currentImage.height} píxeles`;
    
  } catch (e) {
    console.error('Error en procesamiento:', e);
    document.getElementById('statusText').textContent = 'Error: ' + e.message;
  }
}

// Event listeners
document.getElementById('imageInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        processImageFromCanvas(canvas);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById('loadDefaultBtn').addEventListener('click', function() {
  loadDefaultImage();
});

// Sliders - con verificación de OpenCV y imagen cargada
document.getElementById('blurSlider').addEventListener('input', function(e) {
  document.getElementById('blurValue').textContent = e.target.value;
  if (typeof cv !== 'undefined' && cvReady && srcMat && !srcMat.empty()) {
    applyProcessing();
  }
});

document.getElementById('thresholdSlider').addEventListener('input', function(e) {
  document.getElementById('thresholdValue').textContent = e.target.value;
  if (typeof cv !== 'undefined' && cvReady && srcMat && !srcMat.empty()) {
    applyProcessing();
  }
});

document.getElementById('cannyLowSlider').addEventListener('input', function(e) {
  document.getElementById('cannyLowValue').textContent = e.target.value;
  if (typeof cv !== 'undefined' && cvReady && srcMat && !srcMat.empty()) {
    applyProcessing();
  }
});

document.getElementById('cannyHighSlider').addEventListener('input', function(e) {
  document.getElementById('cannyHighValue').textContent = e.target.value;
  if (typeof cv !== 'undefined' && cvReady && srcMat && !srcMat.empty()) {
    applyProcessing();
  }
});

document.getElementById('operationSelect').addEventListener('change', function() {
  if (typeof cv !== 'undefined' && cvReady && srcMat && !srcMat.empty()) {
    applyProcessing();
  }
});

// Limpiar memoria al salir
window.addEventListener('beforeunload', function() {
  if (srcMat && !srcMat.isDeleted()) {
    srcMat.delete();
  }
});
</script>

## Sintaxis utilizada y conceptos relacionados

### ¿Qué es OpenCV.js?

OpenCV.js es **OpenCV compilado a WebAssembly**, una tecnología que permite ejecutar código de bajo nivel en el navegador. Esto significa que podemos utilizar las mismas funciones de visión por computadora que en Python o C++, pero directamente en JavaScript, en la parte del cliente web (tú).

### Cómo se carga OpenCV.js

```html
<script async src="https://docs.opencv.org/4.8.0/opencv.js" 
        onload="onOpenCvReady();" 
        type="text/javascript"></script>
```

- **async**: Carga el script de forma asíncrona sin bloquear la página
- **onload**: Ejecuta una función cuando OpenCV.js se ha cargado completamente
- **src**: URL del CDN oficial de OpenCV

### Estructura Básica del Código

#### 1. Variables Globales y Estado

```javascript
let cvReady = false;     // Flag que indica si OpenCV está cargado
let srcMat = null;       // Matriz de OpenCV (equivalente a numpy array)
let currentImage = null; // Información de la imagen actual
```

#### 2. Función de Inicialización Robusta

La inicialización de OpenCV.js verifica múltiples mecanismos de carga para garantizar compatibilidad:

```javascript
function initializeOpenCV() {
  // Caso 1: cv es una Promesa (versiones recientes)
  if (cv instanceof Promise) {
    cv.then((resolvedCv) => {
      window.cv = resolvedCv;
      cvReady = true;
      onOpenCVInitialized();
    });
  }
  // Caso 2: Usar callback onRuntimeInitialized
  else if (cv && cv.onRuntimeInitialized) {
    cv['onRuntimeInitialized'] = () => {
      cvReady = true;
      onOpenCVInitialized();
    };
  }
  // Caso 3: Fallback con verificación directa
  else {
    setTimeout(() => {
      if (typeof cv !== 'undefined' && cv.Mat) {
        cvReady = true;
        onOpenCVInitialized();
      }
    }, 500);
  }
}
```

**Verificaciones críticas antes de usar OpenCV:**
- `typeof cv !== 'undefined'`: Verifica que el objeto `cv` exista
- `cvReady`: Bandera que confirma que OpenCV está completamente inicializado
- `srcMat && !srcMat.empty()`: Verifica que haya una imagen válida cargada

### Sintaxis de OpenCV.js

Es prácticamente idéntico a en otros lenguajes, usando `cv.Mat` y cuidando de la reserva de memoria para las variables, inicialización y su posterior liberación:

#### Mat (Matriz)

```javascript
// Crear una nueva matriz
let mat = new cv.Mat();

// Leer una imagen desde un canvas
srcMat = cv.imread(canvas);

// Verificar si la matriz está vacía
if (!srcMat.empty()) {
  // Procesar la imagen
}

// Liberar memoria (IMPORTANTE)
mat.delete();
```

#### Conversión de Espacios de Color

```javascript
// RGBA a Grises
cv.cvtColor(srcMat, dst, cv.COLOR_RGBA2GRAY);

// Grises a RGBA (para mostrar en canvas)
cv.cvtColor(dst, dst, cv.COLOR_GRAY2RGBA);

// RGBA a RGB
cv.cvtColor(srcMat, dst, cv.COLOR_RGBA2RGB);
```

### Operaciones de Procesamiento Explicadas

#### 1. Desenfoque Gaussiano

```javascript
case 'blur':
  // Asegurar tamaño impar del kernel
  const kernelSize = blurValue % 2 === 0 ? blurValue + 1 : blurValue;
  
  // Convertir a RGB (OpenCV.js funciona mejor con RGB que RGBA)
  cv.cvtColor(srcMat, dst, cv.COLOR_RGBA2RGB);
  
  // Aplicar filtro Gaussiano
  cv.GaussianBlur(
    dst,                    // imagen de entrada
    dst,                    // imagen de salida (puede ser la misma)
    new cv.Size(kernelSize, kernelSize),  // tamaño del kernel
    0, 0,                  // desviación estándar en X e Y
    cv.BORDER_DEFAULT      // tipo de borde
  );
  
  // Convertir de vuelta a RGBA para mostrar
  cv.cvtColor(dst, dst, cv.COLOR_RGB2RGBA);
  break;
```

#### 2. Binarización (Threshold)

```javascript
case 'threshold':
  // 1. Convertir a escala de grises
  let gray = new cv.Mat();
  cv.cvtColor(srcMat, gray, cv.COLOR_RGBA2GRAY);
  
  // 2. Aplicar umbral
  cv.threshold(
    gray,                  // imagen en grises
    dst,                   // imagen binaria de salida
    thresholdValue,        // valor del umbral (0-255)
    255,                  // valor máximo
    cv.THRESH_BINARY      // tipo de umbralización
  );
  
  // 3. Convertir a RGBA para visualización
  cv.cvtColor(dst, dst, cv.COLOR_GRAY2RGBA);
  
  // 4. Limpiar memoria
  gray.delete();
  break;
```

#### 3. Detección de Bordes (Canny)

```javascript
case 'canny':
  // Convertir a grises primero
  let grayCanny = new cv.Mat();
  cv.cvtColor(srcMat, grayCanny, cv.COLOR_RGBA2GRAY);
  
  // Aplicar algoritmo de Canny
  cv.Canny(
    grayCanny, // imagen en grises
    dst,       // imagen de bordes
    cannyLow,  // umbral bajo
    cannyHigh, // umbral alto
    3,         // tamaño del kernel de Sobel
    false      // usar L2 gradient?
  );
  
  // Convertir a RGBA
  cv.cvtColor(dst, dst, cv.COLOR_GRAY2RGBA);
  grayCanny.delete();
  break;
```

#### 4. Operaciones Morfológicas

```javascript
case 'morphology':
  // 1. Convertir a grises y binarizar
  let grayMorph = new cv.Mat();
  let binaryMorph = new cv.Mat();
  cv.cvtColor(srcMat, grayMorph, cv.COLOR_RGBA2GRAY);
  cv.threshold(grayMorph, binaryMorph, 127, 255, cv.THRESH_BINARY);
  
  // 2. Crear kernel para operaciones morfológicas
  let kernel = cv.getStructuringElement(
    cv.MORPH_RECT,    // forma del kernel (rectangular)
    new cv.Size(5, 5) // tamaño del kernel
  );
  
  // 3. Aplicar dilatación
  cv.dilate(
    binaryMorph,          // imagen binaria
    dst,                  // resultado
    kernel,               // kernel estructural
    new cv.Point(-1, -1), // punto de anclaje (centro)
    1                     // número de iteraciones
  );
  
  // 4. Limpiar y convertir
  cv.cvtColor(dst, dst, cv.COLOR_GRAY2RGBA);
  grayMorph.delete();
  binaryMorph.delete();
  kernel.delete();
  break;
```

#### 5. Ecualización de Histograma

```javascript
case 'histogram':
  let grayHist = new cv.Mat();
  // Convertir a grises
  cv.cvtColor(srcMat, grayHist, cv.COLOR_RGBA2GRAY);
  
  // Ecualizar histograma para mejorar contraste
  cv.equalizeHist(grayHist, dst);
  
  // Convertir de vuelta a color
  cv.cvtColor(dst, dst, cv.COLOR_GRAY2RGBA);
  grayHist.delete();
  break;
```

### Manejo de Imágenes del Usuario

```javascript
document.getElementById('imageInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    
    reader.onload = function(event) {
      const img = new Image();
      
      img.onload = function() {
        // Crear canvas temporal
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Dibujar imagen en canvas
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        // Procesar imagen
        processImageFromCanvas(canvas);
      };
      
      img.src = event.target.result;
    };
    
    reader.readAsDataURL(file); // Leer archivo como URL de datos
  }
});
```

### Gestión de Memoria

OpenCV.js usa WebAssembly, que maneja memoria manualmente. **Siempre** se debería liberar la memoria:

```javascript
// ALWAYS delete Mat objects when done
let tempMat = new cv.Mat();
// ... usar tempMat ...
tempMat.delete(); // ← IMPORTANTE

// En caso de error, limpiar todo
try {
  // operaciones...
} catch (e) {
  // Limpiar todas las matrices
  if (tempMat) tempMat.delete();
  throw e;
}

// Limpiar al salir de la página
window.addEventListener('beforeunload', function() {
  if (srcMat) {
    srcMat.delete();
  }
});
```

### Configuración del Canvas de Salida

```javascript
// Mostrar imagen procesada en canvas
cv.imshow(outputCanvas, dst);

// El canvas debe tener las dimensiones correctas
outputCanvas.width = dst.cols;
outputCanvas.height = dst.rows;
```


### Optimizaciones Importantes

```javascript
// 1. Reutilizar matrices cuando sea posible
let reusableMat = new cv.Mat();

// 2. Redimensionar imágenes grandes
if (srcMat.cols > 1000 || srcMat.rows > 1000) {
  let resized = new cv.Mat();
  cv.resize(srcMat, resized, new cv.Size(800, 600));
  srcMat.delete();
  srcMat = resized;
}

// 3. Usar requestAnimationFrame para actualizaciones suaves
function updateProcessing() {
  requestAnimationFrame(() => {
    applyProcessing();
  });
}
```

### Solución de Problemas Comunes

```javascript
// Verificar si OpenCV está cargado
if (typeof cv === 'undefined') {
  console.error('OpenCV.js no está cargado');
  return;
}

// Verificar si la imagen se cargó correctamente
if (!srcMat || srcMat.empty()) {
  console.error('No hay imagen para procesar');
  return;
}

// Manejar errores de WebAssembly
try {
  cv.imshow(outputCanvas, dst);
} catch (e) {
  if (e.message.includes('out of memory')) {
    console.error('Memoria insuficiente. Intenta con una imagen más pequeña.');
  }
}
```

---

### Ventajas y limitaciones

#### Ventajas

1. **Privacidad total**: Las imágenes nunca salen del dispositivo del usuario.
2. **Baja latencia y velocidad**: Todo se procesa localmente con WebAssembly, casi tan rápido como código nativo.
3. **Sin costos de servidor**: No requiere backend, solo hosting estático.
4. **Multiplataforma**: Funciona en cualquier navegador moderno.
5. **API similar a Python**: Facilita la migración de proyectos existentes.
6. **Interactividad en tiempo real**: Controles como sliders actualizan los resultados inmediatamente.

#### Limitaciones

1. **Tamaño del archivo**: `opencv.js` tiene ~8 MB, la primera carga puede ser lenta.
2. **Memoria limitada**: WebAssembly tiene restricciones; imágenes grandes pueden consumir muchos recursos.
3. **Operaciones avanzadas no disponibles**: Machine learning, stitching, calibración, y módulos contrib/third-party.
4. **Compatibilidad de navegador**: Solo funciona en navegadores modernos con soporte WebAssembly.

---

## Referencias

- [OpenCV.js Documentation](https://docs.opencv.org/4.8.0/d5/d10/tutorial_js_root.html)
- [WebAssembly Documentation](https://webassembly.org/)
- [Ejemplos de visualizaciones interactivas en Jekyll](https://www.zachburchill.ml/plotly_with_jekyll/)
- [Trucos con Knitr y Plotly](https://www.zachburchill.ml/knitr_tricks/#rightplotly)

---

# TODO

- La idea es pensar a futuro cómo poder incrustar código Python, por ejemplo, en snippets dentro de estos posts, para extender funcionalidades de librerías como Opencv.js, que pueden estar limitadas. Es un tema a estudiar, porque no se puedes ejecutar Python directamente en Jekyll, ya que genera sitios estáticos y el servidor solo sirve HTML, CSS y JS, pero se podría desplegar el código Python en un backend (Railway, Render, Streamlit Cloud...) y luego incrustarlo o consumirlo desde el sitio estático mediante <iframe> o llamadas API (fetch), extendiendo las librerías en cliente con funcionalidades avanzadas o incluso GPU.