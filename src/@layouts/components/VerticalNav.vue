<script lang="ts" setup>
import type { Component } from 'vue'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { useDisplay } from 'vuetify'
import logo from '@images/logo.svg?raw'

interface Props {
  tag?: string | Component
  isOverlayNavActive: boolean
  toggleIsOverlayNavActive: (value: boolean) => void
  isVerticalNavCollapsed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'aside',
  isVerticalNavCollapsed: false,
})

const { mdAndDown } = useDisplay()

const refNav = ref()

/*
  ℹ️ Close overlay side when route is changed
  Close overlay vertical nav when link is clicked
*/
const route = useRoute()

watch(
  () => route.path,
  () => {
    props.toggleIsOverlayNavActive(false)
  })

const isVerticalNavScrolled = ref(false)
const updateIsVerticalNavScrolled = (val: boolean) => isVerticalNavScrolled.value = val

const handleNavScroll = (evt: Event) => {
  isVerticalNavScrolled.value = (evt.target as HTMLElement).scrollTop > 0
}

// hover 狀態
const isHovered = ref(false)
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <Component
    :is="props.tag"
    ref="refNav"
    data-allow-mismatch
    class="layout-vertical-nav"
    :class="[
      {
        'visible': isOverlayNavActive,
        'scrolled': isVerticalNavScrolled,
        'overlay-nav': mdAndDown,
        'hovered': props.isVerticalNavCollapsed && isHovered,
      },
    ]"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- 👉 Header -->
    <div class="nav-header">
      <slot name="nav-header">
        <RouterLink
          to="/"
          class="app-logo app-title-wrapper"
        >
          <div
            class="d-flex"
            v-html="logo"
          />
          <h1
            v-if="!props.isVerticalNavCollapsed || isHovered"
            class="font-weight-medium leading-normal text-xl text-uppercase"
          >
            Materio
          </h1>
        </RouterLink>
      </slot>
    </div>
    <slot name="before-nav-items">
      <div class="vertical-nav-items-shadow" />
    </slot>
    <slot
      name="nav-items"
      :update-is-vertical-nav-scrolled="updateIsVerticalNavScrolled"
    >
      <PerfectScrollbar
        tag="ul"
        class="nav-items"
        :options="{ wheelPropagation: false }"
        @ps-scroll-y="handleNavScroll"
      >
        <slot />
      </PerfectScrollbar>
    </slot>
    <slot name="after-nav-items" />
  </Component>
</template>

<style lang="scss" scoped>
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

<style lang="scss">
@use "@configured-variables" as variables;
@use "@layouts/styles/mixins";

// 👉 Vertical Nav
.layout-vertical-nav {
  position: fixed;
  z-index: variables.$layout-vertical-nav-z-index;
  display: flex;
  flex-direction: column;
  block-size: 100%;
  inline-size: variables.$layout-vertical-nav-width;
  inset-block-start: 0;
  inset-inline-start: 0;
  transition: inline-size 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, inline-size, box-shadow;

  .nav-header {
    display: flex;
    align-items: center;
    transition: padding 0.25s cubic-bezier(0.4, 0, 0.2, 1);

    .header-action {
      cursor: pointer;

      @at-root {
        #{variables.$selector-vertical-nav-mini} .nav-header .header-action {
          &.nav-pin,
          &.nav-unpin {
            display: none !important;
          }
        }
      }
    }
  }

  .app-title-wrapper {
    margin-inline-end: auto;
    transition: margin 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .nav-items {
    block-size: 100%;
    transition: padding 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .nav-item-title {
    overflow: hidden;
    margin-inline-end: auto;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1), width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  // 👉 Collapsed
  .layout-vertical-nav-collapsed & {
    &:not(.hovered) {
      inline-size: variables.$layout-vertical-nav-collapsed-width;
    }
  }
}

// Small screen vertical nav transition
@media (max-width: 1279px) {
  .layout-vertical-nav {
    &:not(.visible) {
      transform: translateX(-#{variables.$layout-vertical-nav-width});

      @include mixins.rtl {
        transform: translateX(variables.$layout-vertical-nav-width);
      }
    }

    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }
}
</style>
