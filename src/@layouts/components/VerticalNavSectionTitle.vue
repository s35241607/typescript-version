<script lang="ts" setup>
import type { NavSectionTitle } from '@layouts/types'

defineProps<{
  item: NavSectionTitle
}>()
</script>

<template>
  <li class="nav-section-title">
    <div class="title-wrapper">
      <!-- eslint-disable vue/no-v-text-v-html-on-component -->
      <span
        class="title-text"
        v-text="item.heading"
      />
      <!-- eslint-enable vue/no-v-text-v-html-on-component -->
    </div>
  </li>
</template>

<style lang="scss">
.layout-vertical-nav {
  .nav-section-title {
    transition: margin-inline 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    .title-text {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: flex-start;
      column-gap: 0.625rem;
      transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1), width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      opacity: 1;
      width: auto;
    }
  }
  .layout-vertical-nav-collapsed & {
    .title-text {
      opacity: 0;
      width: 0;
      min-width: 0;
      max-width: 0;
      padding: 0;
      margin: 0;
      overflow: hidden;
      pointer-events: none;
    }
    &.hovered {
      .title-text {
        opacity: 1 !important;
        width: auto !important;
        min-width: initial !important;
        max-width: initial !important;
        padding: initial !important;
        margin: initial !important;
        overflow: initial !important;
        pointer-events: auto !important;
      }
    }
  }
}
</style>
