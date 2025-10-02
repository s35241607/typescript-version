<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useDisplay } from 'vuetify'
import NavItems from '@/layouts/components/NavItems.vue'
import logo from '@images/logo.svg?raw'
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'

// Components
import Footer from '@/layouts/components/Footer.vue'
import AdvancedThemeSwitcher from '@/components/AdvancedThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'
import Breadcrumbs from '@/layouts/components/Breadcrumbs.vue'

const isVerticalNavCollapsed = ref(false)
const { mdAndDown } = useDisplay()

// 🔧 響應式處理優化：當螢幕大小改變時，重置收合狀態
watch(mdAndDown, isMobile => {
  // 當從桌面版切換到手機版時，確保狀態同步
  if (!isMobile && isVerticalNavCollapsed.value) {
    // 從手機版切回桌面版時，可以保持之前的收合狀態
    // 或者重置為展開狀態以避免混亂
    // isVerticalNavCollapsed.value = false // 可選：重置為展開狀態
  }
})
</script>

<template>
  <VerticalNavLayout :is-vertical-nav-collapsed="isVerticalNavCollapsed">
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 收合/展開按鈕（僅桌面顯示） - 重新設計 -->
        <VBtn
          class="nav-collapse-btn me-3 d-none d-lg-inline-flex"
          variant="text"
          size="small"
          icon
          @click="isVerticalNavCollapsed = !isVerticalNavCollapsed"
        >
          <VIcon
            :icon="isVerticalNavCollapsed ? 'ri-layout-left-line' : 'ri-layout-left-2-line'"
            size="20"
            class="nav-collapse-icon"
          />
          <VTooltip
            activator="parent"
            location="bottom"
          >
            {{ isVerticalNavCollapsed ? '展開側邊欄' : '收合側邊欄' }}
          </VTooltip>
        </VBtn>

        <!-- 👉 Vertical nav toggle in overlay mode -->
        <IconBtn
          class="ms-n3 d-lg-none mobile-menu-btn"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon icon="ri-menu-line" />
        </IconBtn>

        <!-- 👉 Breadcrumbs -->
        <Breadcrumbs />

        <VSpacer />

        <AdvancedThemeSwitcher />

        <IconBtn class="me-2">
          <VIcon icon="ri-notification-line" />
        </IconBtn>

        <UserProfile />
      </div>
    </template>

    <template #vertical-nav-header="{ toggleIsOverlayNavActive }">
      <RouterLink
        to="/"
        class="app-logo app-title-wrapper"
      >
        <!-- eslint-disable vue/no-v-html -->
        <div
          class="app-logo-icon d-flex"
          v-html="logo"
        />
        <!-- eslint-enable -->

        <Transition
          name="fade-slide"
          mode="out-in"
        >
          <h1
            v-if="!isVerticalNavCollapsed"
            class="app-logo-title font-weight-medium leading-normal text-xl"
          >
            Lan Side Project
          </h1>
        </Transition>
      </RouterLink>

      <IconBtn
        class="nav-close-btn d-block d-lg-none"
        @click="toggleIsOverlayNavActive(false)"
      >
        <VIcon icon="ri-close-line" />
      </IconBtn>
    </template>

    <template #vertical-nav-content>
      <NavItems />
    </template>

    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>

<style lang="scss" scoped>
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}

.app-logo {
  display: flex;
  align-items: center;
  column-gap: 0.75rem;
  min-block-size: 60px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  .app-logo-icon {
    min-inline-size: 32px;
    block-size: 32px;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

    svg {
      inline-size: 100%;
      block-size: 100%;
    }
  }

  .app-logo-title {
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.75rem;
    color: rgb(var(--v-theme-primary));
    white-space: nowrap;
  }

  &:hover .app-logo-icon {
    transform: scale(1.1) rotate(5deg);
  }
}

// Logo 文字的淡入淡出動畫
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

// 收合按鈕的進階樣式
.nav-collapse-btn {
  position: relative;
  overflow: hidden;

  &::before {
    position: absolute;
    content: '';
    inset-block-start: 50%;
    inset-inline-start: 50%;
    inline-size: 0;
    block-size: 0;
    border-radius: 50%;
    background: rgba(var(--v-theme-primary), 0.1);
    transform: translate(-50%, -50%);
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  &:hover::before {
    inline-size: 100%;
    block-size: 100%;
  }
}

// 手機版關閉按鈕
.nav-close-btn {
  border: 1px solid rgba(var(--v-theme-error), 12%) !important;
  border-radius: 12px !important;
  background: rgba(var(--v-theme-error), 8%) !important;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;

  &:hover {
    background: rgba(var(--v-theme-error), 15%) !important;
    transform: scale(1.05) rotate(90deg);
  }
}
</style>
