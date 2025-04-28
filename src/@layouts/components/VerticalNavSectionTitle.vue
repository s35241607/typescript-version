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
  .layout-vertical-nav-collapsed & {
    .title-text {
      display: none !important;
    }
    &.hovered {
      .title-text {
        display: flex !important;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: flex-start;
        column-gap: 0.625rem;
      }
    }
  }
}
</style>
