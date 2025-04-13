always respond in 繁體中文.

This project is a frontend web application built with Vite, Vue 3 (using Composition API), Vuetify, TypeScript, Axios, and Pinia.
The project follows a modular architecture with separate folders for components (`src/components`), views/pages (`src/views`, `src/pages`), and stores (`src/stores`).
It utilizes `src/composables` for reusable logic and `src/api` for API interactions, including `src/api/http.ts` for base HTTP methods and `src/api/services` for specific service implementations.
Routing is handled by `vue-router` configured in `src/plugins/router`.
Global state management is done using Pinia stores located in `src/stores`.
UI components from Vuetify are used extensively, along with custom components like `EnhancedDataTable.vue` and `AdvanceDataTable.vue` found in `src/components`. Icons used in the project are primarily from the Remix Icon set.
When applying colors, prioritize using the Vuetify theme colors defined in `src/plugins/vuetify/theme.ts` (e.g., `primary`, `success`, `grey-lighten-1`) instead of hardcoded hex values or CSS color names.
Styling might involve SCSS as seen in some components.
The project uses `pnpm` as the package manager.
