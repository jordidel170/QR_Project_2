# Usa la imagen base oficial de Python
FROM python:3.9-slim

# Establece el directorio de trabajo
WORKDIR /app

# Instala dependencias necesarias
RUN apt-get update && apt-get install -y \
    gcc \
    pkg-config \
    libmariadb-dev

# Copia el archivo de requisitos
COPY requirements.txt .

# Instala las dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Copia todo el contenido del proyecto
COPY . .

# Expone el puerto
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["python", "src/main.py"]


