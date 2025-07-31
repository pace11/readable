FROM node:20-alpine AS builder

WORKDIR /app

COPY . .

ARG VITE_NEWS_API_URL
ARG VITE_NEWS_API_KEY

ENV VITE_NEWS_API_URL=$VITE_NEWS_API_URL
ENV VITE_NEWS_API_KEY=$VITE_NEWS_API_KEY

RUN npm install -g bun

RUN bun install
RUN bun run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
