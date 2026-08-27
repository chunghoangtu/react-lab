.PHONY: up down restart logs docker-build rebuild \
        client server test-client build-client build-server \
        test build lint

# =========================
# Docker Compose
# =========================

up:
	docker compose up

down:
	docker compose down

restart:
	docker compose down
	docker compose up --build

logs:
	docker compose logs -f

docker-build:
	docker compose build

rebuild:
	docker compose up --build


# =========================
# PNPM
# =========================
dev:
	pnpm dev

client:
	pnpm client

server:
	pnpm server

test-client:
	pnpm test-client

build-client:
	pnpm build-client

build-server:
	pnpm build-server

build:
	pnpm build

lint:
	pnpm lint