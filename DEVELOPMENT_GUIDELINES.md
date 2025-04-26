# Development Guidelines

## vue-vuetify

### **Code Style and Structure**
- **撰寫簡潔、可維護、技術正確的 TypeScript 代碼**，並提供相關示例。
- **使用函數式和聲明式程式設計模式**，避免使用 `class`。
- **優先考慮模組化和可重複使用**，遵循 DRY 原則，避免重複代碼。
- **使用描述性變數名稱**，例如 `isLoading`、`hasError`，來提高可讀性。
- **系統性地組織檔案**：
  - **頁面元件 (Page Components):** 放置於 `src/pages`。頁面元件應主要負責組合來自 `src/components` 或 `src/views` 的子元件，保持自身邏輯簡潔。
  - **可複用元件 (Reusable Components):** 放置於 `src/components`。應按功能或模組進行分類 (e.g., `src/components/auth`, `src/components/shared`)。
  - **視圖片段元件 (View Partial Components):** 放置於 `src/views`。用於構成特定頁面或區塊，可能包含較多 UI 邏輯。（*釐清與 `src/components` 的界線，建議將可高度複用的移至 `components`*
  - **核心 UI 元件:** 依賴 `@core/components` 下的基礎元件。
  - **佈局元件 (Layout Components):** 放置於 `src/layouts`，樣式位於 `@layouts/styles`。
  - **組合式函數 (Composables):** 放置於 `src/composables`。用於封裝可複用的響應式邏輯 (e.g., `useApi.ts` 用於 API 請求)。
  - **API 相關:**
    - HTTP 客戶端封裝位於 `src/api/http.ts`。
    - Axios 實例配置位於 `src/api/apiInstance.ts`。
    - 具體的 API 服務函數可按模組放置於 `src/api/services/` 下。
  - **狀態管理 (Pinia Stores):** 放置於 `src/stores`。每個 store 負責應用程式的一個特定領域 (e.g., `useSnackbarStore`, `useLoadingStore`)。
  - **類型定義 (Type Definitions):** 若為全域共用，可放於 `src/types`；若為特定元件或模組使用，則放在對應目錄下 (e.g., `src/api/types/user.ts`)。
  - **工具函數 (Utility Functions):** 放置於 `src/utils`。
  - **路由設定 (Routing):** 檔案位於 `src/plugins/router`。
  - **導航項目 (Navigation Items):** 設定位於 `src/layouts/components/NavItems.vue`。
  - **插件註冊:** 統一在 `@core/utils/plugins/index.ts` (推測路徑) 中透過 `registerPlugins` 進行。
  - **靜態資源:** 放置於 `src/assets`。
  - **全域樣式:** 主要由 `@core/scss/template/index.scss` 和 `@layouts/styles/index.scss` 管理。

---

### **命名規範**
- **目錄使用小寫加連字符**（例如 `components/auth-wizard`, `api/services/user-service`）。
- **元件檔案名使用帕斯卡命名法 (PascalCase)** (e.g., `UserProfile.vue`, `BaseButton.vue`)。
- **組合式函數使用駝峰命名法並以 `use` 開頭** (e.g., `useApi.ts`, `usePagination.ts`)。
- **Pinia Store 檔案名使用駝峰命名法並以 `use` 開頭，`Store` 結尾** (e.g., `useAuthStore.ts`, `useSnackbarStore.ts`)。
- **類型/接口名使用帕斯卡命名法** (e.g., `interface UserProfile`, `type ApiResponse`)。
- **函數/變數優先使用駝峰命名法 (camelCase)** (e.g., `getUserProfile`, `isLoading`)。
- **常量使用大寫蛇形命名法 (UPPER_SNAKE_CASE)** (e.g., `const API_TIMEOUT = 5000`)。
- **函數優先使用具名匯出**，而非 `default export` (除了 Vue 元件和 Pinia Stores)。

---

### **TypeScript 使用規範**
- **所有代碼都使用 TypeScript**。
- **優先使用 `interface` 而非 `type`**，因為 `interface` 更具可擴展性，且可自動合併 (除非需要聯合類型、交叉類型等 `type` 特有功能)。
- **善用泛型 (`<T>`)** 來創建可複用且類型安全的函數和類型 (參考 `useApi.ts`)。
- **避免使用 `any`**，盡量提供明確的類型註解。若暫時無法確定類型，可使用 `unknown` 並進行類型守衛。
- **使用 `shallowRef`** 優化非深度響應式數據的性能 (參考 `useApi.ts` 中的 `error`)。
- **避免使用 `enum`，改用物件映射 (`Record<K, V>`) 或字串/數字字面量聯合類型** 來提升型別安全性和靈活度。
- **Vue 組件應使用 `<script setup>` 和函數式元件**，保持代碼簡潔。
- **Props 和 Emits 應有明確的類型定義**。

---

### **語法與格式**
- **純函數（Pure Function）使用 `function` 關鍵字**，利用 hoisting 優勢並提升可讀性。
- **Vue 組件統一使用 Composition API 的 `<script setup>`**，避免 Options API。
- **遵循專案配置的 ESLint 和 Prettier 規則** 以確保代碼風格一致性。

---

### **API 請求**
- **使用 `src/composables/useApi.ts`** 來處理標準的 API 請求流程，以統一載入狀態、錯誤處理和提示。
- **具體的 API 呼叫函數**應定義在 `src/api/services/` 目錄下，並注入到 `useApi` 中。
- **HTTP 客戶端配置** (如 base URL, interceptors) 應在 `src/api/apiInstance.ts` 中完成。

---

### **狀態管理 (Pinia)**
- **每個 Store 應關注單一職責**。
- **優先使用 `actions` 處理異步操作和修改 state**。
- **使用 `getters` 計算衍生狀態**。
- **在元件中通過對應的 `use...Store()` 函數訪問 Store**。

---

### **UI 和樣式（使用 Vuetify & @core）**
- **使用 Vuetify 作為 UI 組件庫**，確保一致的 UI 風格和可用性。
- **優先使用 `@core/components` 提供的基礎元件** (如果存在)。
- **使用 Vuetify 的 Grid System (`<v-row>`, `<v-col>`) 和內建的響應式類別來處理版面配置**。
- **使用 Remix Icons (`ri-*`)** 作為圖標來源。
- **遵循 Material Design 指南，確保良好的 UX 和可訪問性**。
- **針對移動裝置優化設計**，採用 Mobile-First 方法。
- **全域通知使用 `useSnackbarStore` 或 `useToastStore`**。
- **全域載入狀態使用 `useLoadingStore`**。

---

### **路由管理 (`src/plugins/router/routes.ts`)**
- **新增頁面路由:**
  - 在 `default` layout 的 `children` 陣列中添加新的路由物件。
  - `path`: 定義 URL 路徑 (e.g., `/new-page`)。
  - `name`: 定義路由名稱 (e.g., `NewPage`)。
  - `component`: 使用動態導入 `() => import('@/pages/NewPage.vue')` 指向頁面元件。
  - `meta`: 可選，用於定義麵包屑 (`breadcrumb`) 或其他元信息 (e.g., `requiresAuth: true`)。

---

### **導航項目 (`src/layouts/components/NavItems.vue`)**
- **新增導航連結:**
  - 在合適的區段 (`<VerticalNavSectionTitle>` 或 `<VerticalNavGroup>`) 下方添加 `<VerticalNavLink>`。
  - `title`: 設定顯示的連結文字。
  - `icon`: 設定 Remix Icon 圖標 (e.g., `ri-file-add-line`)。
  - `to`: 設定連結指向的路由路徑 (與 `routes.ts` 中的 `path` 對應)。
- **新增導航分組:**
  - 使用 `<VerticalNavGroup>` 包裹多個 `<VerticalNavLink>` 來創建下拉選單。
- **新增區段標題:**
  - 使用 `<VerticalNavSectionTitle>` 來分隔不同的導航區段。 
