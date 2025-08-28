# Build stage
FROM node:18-alpine AS build

WORKDIR /app

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

# Copy all package files
COPY package.json ./
COPY package-lock.json ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/

# Install all dependencies for the monorepo
RUN npm install

# Copy frontend source code
COPY frontend/ ./frontend/

# Build the frontend app
RUN npm run build -w frontend

# Serve stage
FROM nginx:stable-alpine

# Copy the built files from the build stage
COPY --from=build /app/frontend/dist /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
