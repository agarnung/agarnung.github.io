import os
import requests

# No usaremos token, así que solo listamos los repos públicos. 
# Pero esto también limita las posibles solicitudes a 60 por hora.
USERNAME = "agarnung"

# Endpoint de la API de GitHub para listar repositorios públicos
GITHUB_API_URL = f"https://api.github.com/users/{USERNAME}/repos"

# Carpeta para guardar los archivos de cada repo
os.makedirs("repos_metadata", exist_ok=True)

# Obtener la lista de repositorios públicos
response = requests.get(GITHUB_API_URL)

# Código de estado HTTP de respuesta satisfactoria (200–299)
if response.status_code == 200:
    repos = response.json()

    for repo in repos:
        # Metadatos para crear los archivos YAML
        name = repo["name"]
        description = repo["description"] or "No description provided"
        html_url = repo["html_url"]

	# Endpoint de los lenguajes
        languages_url = repo["languages_url"]
        languages_response = requests.get(languages_url)
        if languages_response.status_code == 200:
            languages = list(languages_response.json().keys())
        else:
            languages = ["Not specified"]

        # Formato del portfolio
        content = f"""---
name: {name}
tools: {languages}
image: PLACE_YOUR_FULL_URL_HERE_IF_ANY
description: {description}
external_url: {html_url}
---"""

        # Cada archivo tiene el nombre del repo
        filename = os.path.join("repos_metadata", f"{name}.md")
        with open(filename, "w") as file:
            file.write(content)

        print(f"Archivo generado para el repositorio: {name}")

else:
    print(f"Error al obtener repositorios: {response.status_code} - {response.text}")

