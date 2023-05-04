FROM node:16-alpine

# Establecer la variable de entorno NODE_ENV a "production"
ENV NODE_ENV=production

# Expone el puerto 3001 para Express

EXPOSE 3001

# Copiar los archivos de configuración de la aplicación
COPY package.json yarn.lock ./
COPY src ./src

# Instalar las dependencias de la aplicación
RUN yarn install --frozen-lockfile

# Configurar las variables de entorno adicionales, si es necesario
# ENV DB_HOST=localhost
# ENV DB_PORT=5432
# ...

# Exponer el puerto de la aplicación (si es necesario)
# EXPOSE 3000

# Iniciar la aplicación cuando se inicie el contenedor
CMD ["yarn", "start"]
