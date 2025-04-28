<script lang="ts" setup>
import type { NavLink } from '@layouts/types'

defineProps<{
  item: NavLink
}>()
</script>

<template>
  <li
    class="nav-link"
    :class="{ disabled: item.disable }"
  >
    <Component
      :is="item.to ? 'RouterLink' : 'a'"
      :to="item.to"
      :href="item.href"
      :target="item.target"
    >
      <VIcon
        :icon="item.icon || 'ri-checkbox-blank-circle-line'"
        class="nav-item-icon"
      />
      <span class="nav-item-title nav-link-title">
        {{ item.title }}
      </span>
      <span
        class="nav-item-badge"
        :class="item.badgeClass"
      >
        {{ item.badgeContent }}
      </span>
    </Component>
  </li>
</template>

<style lang="scss">
.layout-vertical-nav {
  .nav-link a {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .layout-vertical-nav-collapsed & {
    .nav-link-title,
    .nav-item-badge {
      display: none !important;
    }
  }
}
</style>
