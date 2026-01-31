# Etapa 1: Construção (Usando Node 22 que o Vite exige)
FROM node:22-alpine as build
WORKDIR /app

# Copia os arquivos de dependência primeiro
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o resto do projeto
COPY . .

# Comando de Build
RUN npm run build

# Etapa 2: Servidor (Nginx)
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]