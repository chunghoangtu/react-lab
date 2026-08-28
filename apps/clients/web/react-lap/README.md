# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

# Folder Structure

```text
src/
├── main.tsx                       # React entry point
├── App.tsx                        # Root component
│
├── providers/                     # Global React providers
│   ├── index.tsx                  # Compose all providers
│   ├── theme-provider.tsx         # Dark/light theme
│   ├── query-provider.tsx         # TanStack Query
│   ├── i18n-provider.tsx          # Localization
│   └── socket-provider.tsx        # Socket context (optional)
│
├── routes/                        # TanStack Router
│   ├── __root.tsx                 # Root layout
│   ├── index.tsx                  # /
│   ├── login.tsx                  # /login
│   ├── dashboard.tsx              # /dashboard
│   └── routeTree.gen.ts           # Auto-generated
│
├── components/                    # Reusable UI
│   ├── ui/                        # Atomic - Atom (Shadcn UI)
│   │   └── button/
│   │       ├── Button.tsx
│   │       ├── Button.test.tsx
│   │       ├── Button.stories.tsx
│   │       └── index.ts
│   │
│   ├── composite/                 # Atomic - Molecule
│   │   └── theme-toggle/
│   │       ├── ThemeToggle.tsx
│   │       ├── ThemeToggle.test.tsx
│   │       ├── ThemeToggle.stories.tsx
│   │       └── index.ts
│   │
│   └── layouts/                   # Atomic - Organism
│       └── dashboard-layout/
│           ├── DashboardLayout.tsx
│           └── index.ts
│
├── features/                      # Business modules
│   ├── auth/
│   │   ├── api/
│   │   ├── graphql/
│   │   ├── hooks/
│   │   ├── schemas/
│   │   ├── components/
│   │   ├── types.ts
│   │   └── index.ts
│   │
│   ├── users/
│   │   ├── api/
│   │   ├── graphql/
│   │   ├── hooks/
│   │   ├── schemas/
│   │   ├── components/
│   │   ├── store/
│   │   ├── types.ts
│   │   └── index.ts
│   │
│   └── chat/
│       ├── components/
│       ├── hooks/
│       ├── socket/
│       ├── store/
│       └── index.ts
│
├── services/                      # External communication
│   ├── http/
│   │   ├── axios-client.ts       # Axios instance
│   │   └── interceptors.ts       # JWT, refresh token
│   │
│   ├── graphql/
│   │   └── client.ts              # GraphQL client config
│   │
│   └── socket/
│       ├── socket-client.ts       # Socket.IO instance
│       └── events.ts
│
├── stores/                        # Global Zustand
│   ├── auth.store.ts
│   ├── theme.store.ts
│   └── ui.store.ts
│
├── hooks/                         # Global reusable hooks
│   ├── use-theme.ts
│   ├── use-debounce.ts
│   └── use-media-query.ts
│
├── lib/                           # Library configuration
│   ├── query-client.ts
│   ├── graphql-client.ts
│   ├── env.ts
│   └── utils.ts
│
├── utils/                         # Pure helper functions
│   ├── cn.ts                      # clsx + tailwind-merge
│   ├── date.util.ts               # date-fns wrapper
│   ├── object.util.ts             # lodash wrapper
│   ├── format-date.util.ts
│   └── format-currency.util.ts
│
├── i18n/                          # Localization resources
│   ├── index.ts
│   ├── types.ts
│   └── locales/
│       ├── en/
│       │   ├── common.json
│       │   └── auth.json
│       └── vi/
│           ├── common.json
│           └── auth.json
│
├── styles/                        # Frontend styling
│   ├── index.css                  # Tailwind entry
│   └── theme/
│       └── semantic.css           # Semantic tokens
│
├── assets/                        # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── types/                         # Global TS types
│   ├── api.ts
│   ├── common.ts
│   └── global.d.ts
│
└── constants/                     # Global constants
    ├── route.constant.ts
    └── api.constant.ts
```
