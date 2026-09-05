.PHONY: up down docker-build restart rebuild rebuild-restart logs \
        dev build test lint format \
        react-client test-react-client build-react-client \
        express-server test-express-server build-express-server

# =========================
# Docker Compose
# =========================

up:
	docker compose up

down:
	docker compose down

docker-build:
	docker compose build

restart:
	docker compose restart

rebuild:
	docker compose up --build

rebuild-restart:
	docker compose down -v
	docker compose up --build

logs:
	docker compose logs -f

# =========================
# PNPM +Turbo
# =========================
dev:
	pnpm dev

build:
	pnpm build

test:
	pnpm test

lint:
	pnpm lint

format:
	pnpm format

react-client:
	pnpm dev:react-client

test-react-client:
	pnpm test:react-client

build-react-client:
	pnpm build:react-client

express-server:
	pnpm dev:express-server

test-express-server:
	pnpm test:express-server

build-express-server:
	pnpm build:express-server
	