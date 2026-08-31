#  Using node:26-bookworm-slim as a parent layer
FROM node:26-bookworm-slim

WORKDIR /app

RUN npm install -g pnpm@11.23.0

COPY . .

RUN pnpm install

EXPOSE 5173
EXPOSE 6006

CMD ["pnpm", "dev:react-client"]