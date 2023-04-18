# Define la imagen base
FROM node:14.17.0-alpine3.13

# Establece el directorio de trabajo
WORKDIR /app

# Copia el código de la aplicación al contenedor
COPY ./back .

# Instala las dependencias del proyecto
RUN npm install

# Expone el puerto
EXPOSE 4200

# Define el comando de inicio de la aplicación
CMD ["npm", "start"]