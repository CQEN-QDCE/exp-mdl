# Stage 1: Use yarn to build the app
FROM node:14 AS builder
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2: Copy the JS React SPA into the Nginx HTML directory
FROM bitnami/nginx:1.21.6
COPY --from=builder /usr/src/app/build /app
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]