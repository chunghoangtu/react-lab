# React Lab

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)

React Lab is a full-stack TypeScript project organized as a monorepo with a React client and an Express-based server. It is designed as a learning and experimentation workspace for modern web development patterns including routing, internationalization, authentication, GraphQL, real-time communication, and containerized development.

## 🚀 Project Overview

This repository combines:

- 🟦 Modern frontend built with React, Vite, and TypeScript
- 🟩 Backend API powered by Node.js and Express
- 🟧 Authentication and middleware support
- 🟪 GraphQL and real-time Socket.IO integration
- 🟨 Docker-based local development setup

## 🧩 Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- TanStack Router
- Tailwind CSS
- i18next for multilingual support

### Backend

- Node.js
- Express 5
- TypeScript
- Apollo Server + GraphQL
- Socket.IO
- JWT-based authentication
- Server-Sent Events (SSE)

## 🛠️ Tooling and Development Workflow

- npm workspaces for client/server management
- ESLint and Prettier for code quality
- Husky and Commitlint for Git hooks and commit standards
- Docker Compose for local services
- TypeScript project references for both frontend and backend

## 🧪 Getting Started

From the repository root, install dependencies:

```bash
npm install
```

Run the app in development mode:

```bash
npm run dev
```

This starts the client and server concurrently.

## 📁 Folder Structure

```text
react-lab/
├── .husky/                                  # Git hooks
├── .prettierrc                              # Prettier config
├── client/                                  # React + Vite frontend
│   ├── .env                                 # Environment variables
│   ├── .env.development                     # Development env values
│   ├── .env.production                      # Production env values
│   ├── .env.staging                         # Staging env values
│   ├── Dockerfile                           # Frontend container config
│   ├── index.html                           # Vite HTML entry point
│   ├── package.json                         # Frontend scripts and deps
│   ├── public/                              # Static assets
│   ├── src/                                 # Source code
│   │   ├── assets/                          # Fonts, images, icons
│   │   ├── components/                      # Reusable UI components
│   │   │   ├── composite/                   # Header, language selector, theme toggle
│   │   │   ├── layouts/                     # Shared layouts
│   │   │   └── ui/                          # Shared UI primitives
│   │   ├── constants/                       # Constants
│   │   ├── features/                        # Feature modules
│   │   ├── hooks/                           # Custom hooks
│   │   ├── i18n/                            # i18next config and locales
│   │   ├── lib/                             # Shared libraries/helpers
│   │   ├── providers/                       # Router/App providers
│   │   ├── routes/                          # Route definitions
│   │   ├── services/                        # API, GraphQL, socket services
│   │   ├── stores/                          # State stores
│   │   ├── styles/                          # Global styles and theme files
│   │   ├── types/                           # Shared TypeScript types
│   │   ├── utils/                           # Utility helpers
│   │   ├── routeTree.gen.ts                 # Generated route tree
│   │   ├── App.tsx                          # Root app component
│   │   ├── main.tsx                         # App entry point
│   ├── tsconfig.json                        # Base TS config
│   ├── tsconfig.app.json                    # App TS config
│   ├── tsconfig.node.json                   # Node TS config
│   └── vite.config.ts                       # Vite configuration
├── server/                                  # Express + TypeScript backend
│   ├── .dockerignore                        # Docker ignore rules
│   ├── Dockerfile                           # Server container config
│   ├── package.json                         # Server scripts and deps
│   ├── tsconfig.json                        # Server TS config
│   └── src/                                 # Backend source files
│       ├── index.ts                         # Server entry point
│       ├── auth/                            # Auth routes, controller, JWT middleware
│       ├── graphql/                         # Apollo GraphQL server setup
│       ├── socket/                          # Socket.IO server logic
│       ├── sse/                             # SSE routes
│       └── types/                           # Shared backend types
├── docker-compose.yml                       # Docker Compose setup
├── eslint.config.js                         # ESLint config
├── commitlint.config.js                     # Commitlint config
├── lint-staged.config.js                    # Lint-staged config
├── package.json                             # Root workspace config
└── README.md                                # Project documentation
```

## 💡 Notes

This project is well-suited for experimentation with a modern full-stack architecture and can be extended with additional features such as dashboards, user management, real-time collaboration, and richer API integrations.
