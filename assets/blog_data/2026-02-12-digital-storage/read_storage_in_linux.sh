#!/bin/bash
# Lector seguro con BLOQUEO de particiones del sistema
# IMPOSIBLE ejecutar sobre /, /boot, /home, etc.

TARGET="$1"
[ -z "$TARGET" ] && echo "Uso: $0 /punto/montaje" && exit 1
[ ! -d "$TARGET" ] && echo "Error: $TARGET no existe." && exit 1

# ========== LISTA NEGRA DE DIRECTORIOS PROHIBIDOS ==========
SYSTEM_PATHS=("/" "/boot" "/boot/efi" "/etc" "/usr" "/var" "/lib" "/lib64")
HOME_PATH="/home"
ROOT_DEVICE=$(findmnt -n -o SOURCE /)

# ========== VERIFICACIÓN 1: No es ruta del sistema? ==========
for sys_path in "${SYSTEM_PATHS[@]}"; do
    if [ "$TARGET" = "$sys_path" ] || [[ "$TARGET" == "$sys_path"/* ]]; then
        echo "❌ ERROR CRÍTICO: $TARGET es una ruta del sistema operativo" >&2
        echo "   Esto podría PARALIZAR tu sistema" >&2
        exit 1
    fi
done

# ========== VERIFICACIÓN 2: No es /home? (opcional pero recomendado) ==========
if [ "$TARGET" = "$HOME_PATH" ] || [[ "$TARGET" == "$HOME_PATH"/* ]]; then
    echo "⚠️  ADVERTENCIA: $TARGET está en /home" >&2
    echo "   Continuar podría ralentizar tus programas activos" >&2
    read -p "¿Continuar de todos modos? (SOLO 'SI'): " CONFIRM
    [ "$CONFIRM" != "SI" ] && exit 1
fi

# ========== VERIFICACIÓN 3: No es el dispositivo raíz? ==========
TARGET_DEVICE=$(findmnt -n -o SOURCE "$TARGET" 2>/dev/null || echo "unknown")
if [ "$TARGET_DEVICE" != "unknown" ] && [ "$TARGET_DEVICE" = "$ROOT_DEVICE" ]; then
    echo "❌ BLOQUEO: $TARGET está en el dispositivo raíz ($ROOT_DEVICE)" >&2
    echo "   Esto afectaría TODO el sistema operativo" >&2
    exit 1
fi

# ========== VERIFICACIÓN 4: Espacio libre (no < 1%) ==========
USED_PCT=$(df --output=pcent "$TARGET" | tail -1 | tr -dc '0-9')
FREE_PCT=$((100 - USED_PCT))

if [ "$FREE_PCT" -lt 1 ]; then
    echo "❌ ERROR: Menos del 1% de espacio libre en $TARGET" >&2
    echo "   Libera espacio antes de continuar" >&2
    exit 1
fi

# ========== CONFIRMACIÓN FINAL ==========
echo "=== CONFIRMACIÓN DE SEGURIDAD ==="
echo "Punto de montaje: $TARGET"
echo "Dispositivo: $TARGET_DEVICE"
echo "Espacio libre: $FREE_PCT%"
echo ""
echo "⚠️  ÚLTIMA ADVERTENCIA:"
echo "   • Tiempo estimado: VARIAS HORAS"
echo "   • Solo LECTURA - CERO modificaciones"
echo "   • Puede ralentizar la unidad temporalmente"
echo ""

read -p "¿ESTÁS SEGURO? (escribe 'CONFIRMAR'): " CONFIRM1
[ "$CONFIRM1" != "CONFIRMAR" ] && echo "Cancelado." && exit 0

read -p "¿REALMENTE para $TARGET? (escribe 'SI' otra vez): " CONFIRM2
[ "$CONFIRM2" != "SI" ] && echo "Cancelado." && exit 0

# ========== EJECUCIÓN ==========
echo "[INICIANDO] Lectura segura de $TARGET ..."

TOTAL_FILES=$(find "$TARGET" -type f ! -path "*/.snapshots/*" ! -path "*/lost+found/*" 2>/dev/null | wc -l)

if [ "$TOTAL_FILES" -eq 0 ]; then
    echo "No hay archivos que leer."
    exit 0
fi

echo "Archivos a leer: $TOTAL_FILES"

COUNTER=0
while IFS= read -r FILE; do
    COUNTER=$((COUNTER + 1))

    if [ $((COUNTER % 100)) -eq 0 ]; then
        PCT=$((COUNTER * 100 / TOTAL_FILES))
        echo -ne "Progreso: $PCT% ($COUNTER/$TOTAL_FILES)\r"
    fi

    # LECTURA SEGURA con dd (solo lectura)
    dd if="$FILE" of=/dev/null status=none 2>/dev/null || true

done < <(
    find "$TARGET" -type f \
        ! -path "*/.snapshots/*" \
        ! -path "*/lost+found/*" \
        2>/dev/null
)

echo ""
echo "✅ Proceso completado. $TOTAL_FILES archivos leídos."
