# 1. Usa una imagen base con Node
FROM node:18-alpine

# 2. Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Instala pnpm globalmente
RUN corepack enable && corepack prepare pnpm@latest --activate

# 4. Copia los archivos del proyecto
COPY . .

# 5. Instala las dependencias
RUN pnpm install

# 6. Construye la app
RUN pnpm build

# 7. Expone el puerto
EXPOSE 3000

# 8. Comando para iniciar la app
CMD ["pnpm", "start"]

