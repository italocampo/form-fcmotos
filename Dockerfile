# Etapa 1: Construção
FROM node:22-alpine as build
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o projeto
COPY . .

# --- CORREÇÃO DO ERRO ---
# Força a permissão de execução no binário do Vite
RUN chmod +x node_modules/.bin/vite
# ------------------------

# Comando de Build
RUN npm run build

# Etapa 2: Servidor (Nginx)
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]