# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code
COPY . .

# Compiler TypeScript
RUN npm run build

# Exposer le port
EXPOSE 8080

# Démarrer l'application
CMD ["npm", "run", "start:prod"]