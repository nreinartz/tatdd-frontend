FROM node:20-alpine3.17 AS build

LABEL org.opencontainers.image.created=${BUILD_DATE}
LABEL org.opencontainers.image.version="1.0.0-dev.6"
LABEL org.opencontainers.image.authors="Nico Reinartz <nico.reinartz@rwth-aachen.de>"
LABEL org.opencontainers.image.vendor="Nico Reinartz"
LABEL org.opencontainers.image.title="Trend Detection WebUI"
LABEL org.opencontainers.image.description="WebUI for trend detection results"
LABEL org.opencontainers.image.source = "https://github.com/nreinartz/tatdd-frontend"

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM nginx:stable-alpine3.17-slim

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
