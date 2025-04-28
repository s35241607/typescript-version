<script lang="ts" setup>
import { ref } from 'vue'
import NavItems from '@/layouts/components/NavItems.vue'
import logo from '@images/logo.svg?raw'
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'

// Components
import Footer from '@/layouts/components/Footer.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'
import Breadcrumbs from '@/layouts/components/Breadcrumbs.vue'

const isVerticalNavCollapsed = ref(false)
</script>

<template>
  <VerticalNavLayout :is-vertical-nav-collapsed="isVerticalNavCollapsed">
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 收合/展開按鈕（僅桌面顯示） -->
        <IconBtn
          class="me-2 d-none d-lg-inline-flex"
          @click="isVerticalNavCollapsed = !isVerticalNavCollapsed"
        >
          <VIcon :icon="isVerticalNavCollapsed ? 'ri-arrow-right-s-line' : 'ri-arrow-left-s-line'" />
        </IconBtn>
        <!-- 👉 Vertical nav toggle in overlay mode -->
        <IconBtn
          class="ms-n3 d-lg-none"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon icon="ri-menu-line" />
        </IconBtn>
        <!-- 👉 Breadcrumbs -->
        <Breadcrumbs />

        <VSpacer />

        <NavbarThemeSwitcher />

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
          class="d-flex"
          v-html="logo"
        />
        <!-- eslint-enable -->

        <h1 class="font-weight-medium leading-normal text-xl ">
          Lan Side Projcet
        </h1>
      </RouterLink>

      <IconBtn
        class="d-block d-lg-none"
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

  .app-logo-title {
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.75rem;
    text-transform: uppercase;
  }
}
</style>
