import os
import time
from tqdm import tqdm

def read_all_files(root_dir):
    # Obtener lista total de archivos
    print("Buscando todos los archivos...")
    all_files = []
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            file_path = os.path.join(root, file)
            all_files.append(file_path)
    
    # Leer cada archivo con barra de progreso
    print(f"Leyendo {len(all_files)} archivos...")
    for file_path in tqdm(all_files, unit='file'):
        try:
            with open(file_path, 'rb') as f:
                # Leer el archivo en bloques para no saturar memoria
                while True:
                    chunk = f.read(1024*1024) # 1MB por chunk
                    if not chunk:
                        break
        except (PermissionError, IOError) as e:
            # Ignorar archivos inaccesibles
            pass

if __name__ == "__main__":
    import sys
    if len(sys.argv) != 2:
        print("Uso: python disk_refresh.py /ruta/al/disco")
        sys.exit(1)
    
    start_time = time.time()
    read_all_files(sys.argv[1])
    end_time = time.time()
    
    print(f"\nProceso completado en {end_time - start_time:.2f} segundos")