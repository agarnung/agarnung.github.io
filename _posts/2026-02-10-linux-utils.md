---
title: Linux utils
tags: [Linux]
style: fill
color: success
description: Una fórmula propia para estimar el valor intrínseco de una compañía.
---

Cada vez que instalo una distribución de Linux para uso frecuente, suelo crear varios aliases, atajos y utilidades que me han servido a lo largo de los años. Vamos a comentar algunos y registrarlos para "copiar y pegarlos" la próxima vez:

> [!IMPORTANT] 
> Por cierto, [chequea el video](https://www.youtube.com/watch?v=mfv0V1SxbNA) con Linus y Linus construyendo el PC _perfecto_ 🙂.

## Liberar Espacio en Disco

> [!NOTE] 
> Los comandos `du`, `rm`, `apt`, `snap` y `journalctl` son herramientas del sistema de archivos y gestión de paquetes de Linux. Modificar `.bashrc` afecta al entorno de shell del usuario actual.

Muchas veces, después de eliminar descargas, documentos e imágenes redundantes, aún necesitamos liberar espacio. Estos aliases ayudan a gestionar ese problema:

Agrega al archivo `~/.bashrc`:

```bash
# Muestra los 10 archivos/directorios más grandes en el directorio actual
alias ducks='du -cks * | sort -rn | head'
```

```bash
# Elimina la caché de miniaturas generadas por gestores de archivos (GNOME/Thunar/Nemo)
alias limpiaThumbnails='rm -rfv ~/.cache/thumbnails'
```

```bash
# Vacía la papelera del usuario (Trash) según estándar XDG
alias limpiaBasura='cd ~/.local/share/Trash && rm -rf *'
```

```bash
# Limpia caché de paquetes APT y elimina dependencias innecesarias
alias limpiaCache='sudo apt-get autoclean && sudo apt-get clean && sudo apt-get autoremove'
```

```bash
# Elimina versiones antiguas de paquetes Snap que están deshabilitadas
alias limpiaSnaps='LANG=C snap list --all | while read snapname ver rev trk pub notes; do if [[ $notes = *disabled* ]]; then sudo snap remove "$snapname" --revision="$rev"; fi; done'
```

```bash
# Reduce el tamaño de los logs del systemd journal a solo los últimos 3 días
alias limpiaJournals='sudo journalctl --vacuum-time=3d'
```

```bash
# Ejecuta todas las limpiezas anteriores en secuencia
alias limpiaTodo='limpiaThumbnails && limpiaBasura && limpiaCache && limpiaSnaps && limpiaJournals'
```

## Alias útiles

> [!NOTE] 
> `chown` cambia el propietario de archivos, `du` mide uso de disco, `export -f` hace funciones disponibles en subshells.

Agrega al archivo `~/.bashrc`:

```bash
# Cambia recursivamente el propietario de archivos/directorios al usuario actual
alias mio='sudo chown $(whoami):$(whoami) -R .'
```

```bash
# Función para ver el tamaño de directorios ordenados por uso (no alias)
function lsize { 
    du -h --max-depth=1 "$1" | sort -rh 
}
export -f lsize
```
## Seguridad: Protección contra `rm -rf /`

> [!WARNING] 
> Modificar comandos del sistema en `/usr/bin/` requiere permisos root y puede romper el sistema. Puedes considerar usar un alias o función en su lugar.

```bash
# Alternativa más segura (agregar al ~/.bashrc en lugar de modificar /usr/bin/rm):
alias rm='rm -i' # Pide confirmación antes de eliminar
```

Si aún quieres la protección mediante wrapper, crea un script en `/usr/local/bin/rm`:
.
```bash
#!/bin/bash
# Protección contra eliminación recursiva forzada del sistema de archivos raíz
if [[ "$*" =~ \-[rf]*\s*/ ]]; then
    echo "[ERROR] Comando prohibido: rm $*"
    echo "Use 'rm --preserve-root' o elimine rutas específicas explícitamente."
    exit 1
else
    /bin/rm "$@"
fi
```

> [!NOTE] 
> En sistemas modernos, `rm --preserve-root` es la protección estándar. Considera usar `alias rm='rm --preserve-root'` en su lugar.

## Personalización del terminal

Por supuesto, también suelo personalizar mi bash (o tu _zsh_ o lo que uses tú) con un heades de echo de strings en el bashrc, usando [esta web](https://patorjk.com/software/taag/#p=display&f=Graffiti&t=Type+Something+&x=none&v=4&h=4&w=80&we=false):

Agrega esto al final de tu ~/.bashrc para mostrar un encabezado al abrir el terminal:

```bash
echo "   _____  .__              __                   .___              "
echo "  /  _  \ |  |   ____     |__|____    ____    __| _/______  ____  "
echo " /  /_\  \|  | _/ __ \    |  \__  \  /    \  / __ |\_  __ \/  _ \ "
echo "/    |    \  |_\  ___/    |  |/ __ \|   |  \/ /_/ | |  | \(  <_> )"
echo "\____|__  /____/\___  >\__|  (____  /___|  /\____ | |__|   \____/ "
echo "        \/          \/\______|    \/     \/      \/               "
echo "                                                                  "
```

![alejandro](../assets/blog_images/2026-02-10-linux-utils/alejandro.png)

> [!TIP] 
> Puedes usar `neofetch` o `screenfetch` para mostrar información del sistema con estilo ASCII. Instálalo con `sudo apt install neofetch`.

## Recarga la Configuración

Después de editar `~/.bashrc`, ejecuta:

```bash
source ~/.bashrc
# O simplemente cierra y reabre el terminal
```

> [!WARNING] 
> Nunca ejecutes comandos `rm -rf` con rutas que no hayas verificado. Considera usar `trash-cli` (`sudo apt install trash-cli`) para mover archivos a la papelera en lugar de eliminarlos permanentemente.

## ...

Se irán añadiendo más...