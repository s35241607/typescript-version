<script lang="ts" setup>
import type { NavGroup } from '@layouts/types'

defineProps<{
  item: Omit<NavGroup, 'children'>
}>()

const isOpen = ref(false)

const handleGroupClick = (event: MouseEvent) => {
  event.stopPropagation()
  isOpen.value = !isOpen.value
}
</script>

<template>
  <li
    class="nav-group"
    :class="isOpen && 'open'"
  >
    <div
      class="nav-group-label"
      @click="handleGroupClick"
    >
      <VIcon
        :icon="typeof item.icon === 'string' ? item.icon : 'ri-checkbox-blank-circle-line'"
        class="nav-item-icon"
      />
      <span class="nav-item-title nav-group-title">{{ item.title }}</span>
      <span
        class="nav-item-badge"
        :class="item.badgeClass"
      >
        {{ item.badgeContent }}
      </span>
      <VIcon
        icon="ri-arrow-right-s-line"
        class="nav-group-arrow"
        :style="isOpen ? 'transform: rotate(90deg); transition: transform 0.2s;' : 'transition: transform 0.2s;'"
      />
    </div>
    <div
      v-show="isOpen"
      class="nav-group-children-wrapper"
    >
      <ul class="nav-group-children">
        <slot />
      </ul>
    </div>
  </li>
</template>

<style lang="scss">
.layout-vertical-nav {
  .nav-group {
    &-label {
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .nav-group-children-wrapper {
      transition: grid-template-rows 0.3s ease-in-out;
    }

    &.open {
      .nav-group-children-wrapper {
        // grid-template-rows: 1fr;
      }
    }
  }

  .layout-vertical-nav-collapsed & {
    .nav-group-title,
    .nav-item-badge,
    .nav-group-arrow {
      display: none !important;
    }
    &.hovered {
      .nav-group-title,
      .nav-item-badge,
      .nav-group-arrow {
        display: initial !important;
      }
    }
  }
}
</style>
