# Etapa 1: Construcción del frontend
FROM node:14 as frontend

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración del frontend
COPY package.json package-lock.json ./
COPY webpack.common.js webpack.dev.js webpack.prod.js ./
COPY .babelrc ./
COPY template.html ./

# Instala las dependencias del frontend
RUN npm install

# Copia el código fuente del frontend
COPY src/front ./src/front
COPY public ./public

# Construye el frontend
RUN npm install @babel/preset-react && npm run build -- --config webpack.prod.js

# Etapa 2: Construcción del backend y combinación con el frontend
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

# Copia el código fuente del backend
COPY src/ ./

# Copia el archivo .env al contenedor
COPY .env ./

# Copia los archivos construidos del frontend a la carpeta public
COPY --from=frontend /app/build /app/public

# Expone el puerto
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["python", "main.py"]


