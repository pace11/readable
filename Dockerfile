FROM oven/bun:1.1.13 as builder
WORKDIR /app

COPY . .

ARG VITE_NEWS_API_URL
ARG VITE_NEWS_API_KEY

ENV VITE_NEWS_API_URL=$VITE_NEWS_API_URL
ENV VITE_NEWS_API_KEY=$VITE_NEWS_API_KEY

RUN bun install
RUN bun run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
