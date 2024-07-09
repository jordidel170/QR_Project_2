# Etapa 1: Construcción del frontend
FROM node:14 AS frontend
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY webpack.common.js webpack.dev.js webpack.prod.js ./
COPY .babelrc ./
COPY template.html ./
COPY public ./public
COPY src/front ./src/front
RUN npm install @babel/preset-react
RUN npm install -g webpack webpack-cli
RUN npm run build -- --config webpack.prod.js

# Etapa 2: Construcción del backend
FROM python:3.9-slim AS backend
WORKDIR /app

# Instalar pkg-config y las dependencias necesarias
RUN apt-get update && apt-get install -y \
    gcc \
    pkg-config \
    libmariadb-dev

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY src/ ./
COPY .env ./

# Copiar el contenido del frontend construido
COPY --from=frontend /app/build /app/public

# Comando para iniciar la aplicación
CMD ["python", "main.py"]
