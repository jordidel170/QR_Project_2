# Stage 1: Build React frontend
FROM node:14 AS build

WORKDIR /app

# Copiar los archivos de configuración de npm y el código fuente de React
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2: Setup Flask backend
FROM python:3.9-slim

WORKDIR /app

# Instalar dependencias necesarias para construir mysqlclient
RUN apt-get update && apt-get install -y \
    gcc \
    pkg-config \
    libmariadb-dev

# Copiar y instalar las dependencias de Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código fuente de Flask y la build de React
COPY . .

# Establecer las variables de entorno necesarias
ENV FLASK_APP=src/app.py
ENV FLASK_RUN_HOST=0.0.0.0

# Exponer el puerto en el que la aplicación correrá
EXPOSE 5000

# Comando por defecto para correr la aplicación
CMD ["flask", "run"]

