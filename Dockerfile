# Utiliza una imagen base de Node.js
FROM node:21.4

# Establece el directorio de trabajo en el contenedor
WORKDIR /front

# Copia los archivos package.json y package-lock.json al directorio de trabajo
COPY package*.json ./ 

# Instala las dependencias del proyecto
RUN npm install

# Crea un usuario no root para ejecutar la aplicación
RUN useradd --create-home --shell /bin/bash appuser

# Copia el código fuente de la aplicación al directorio de trabajo
COPY . .

# Cambia el propietario de los archivos de la aplicación
RUN chown -R appuser:appuser /front

# Instala herramientas adicionales necesarias
USER root
RUN apt-get update && \
    apt-get install -y nano tzdata && \
    rm -rf /var/lib/apt/lists/*

# Establece la zona horaria a Bogotá
ENV TZ=America/Bogota

# Configura la zona horaria
RUN echo $TZ > /etc/timezone && dpkg-reconfigure -f noninteractive tzdata

# Construye la aplicación de React en modo de producción
RUN npm run build

# Instala el servidor web estático de producción
RUN npm install -g serve

# Cambia al usuario no root
USER appuser

# Expone el puerto en el que el servidor web estará escuchando
EXPOSE 3000

# Comando para ejecutar el servidor web cuando el contenedor se inicia
CMD [ "serve", "-s", "build" ]