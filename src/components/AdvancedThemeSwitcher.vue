<script setup lang="ts">
import { useTheme } from 'vuetify'
import { computed } from 'vue'

interface ThemeOption {
  name: string
  displayName: string
  icon: string
  color?: string
  isDark: boolean
}

const { global: globalTheme } = useTheme()

const themeOptions: ThemeOption[] = [
  // 明亮主題
  {
    name: 'light',
    displayName: '經典白',
    icon: 'ri-sun-line',
    color: 'warning',
    isDark: false,
  },
  {
    name: 'ocean',
    displayName: '海洋藍',
    icon: 'ri-water-flash-line',
    color: 'info',
    isDark: false,
  },
  {
    name: 'sunset',
    displayName: '日落橙',
    icon: 'ri-sun-cloudy-line',
    color: 'warning',
    isDark: false,
  },
  {
    name: 'forest',
    displayName: '森林綠',
    icon: 'ri-leaf-line',
    color: 'success',
    isDark: false,
  },
  {
    name: 'sakura',
    displayName: '櫻花粉',
    icon: 'ri-flower-line',
    color: 'secondary',
    isDark: false,
  },

  // 深色主題
  {
    name: 'dark',
    displayName: '經典暗',
    icon: 'ri-moon-clear-line',
    color: 'primary',
    isDark: true,
  },
  {
    name: 'oceanDark',
    displayName: '深海藍',
    icon: 'ri-moon-foggy-line',
    color: 'info',
    isDark: true,
  },
  {
    name: 'midnight',
    displayName: '午夜藍',
    icon: 'ri-moon-line',
    color: 'info',
    isDark: true,
  },
  {
    name: 'deepSpace',
    displayName: '深空紫',
    icon: 'ri-space-ship-line',
    color: 'secondary',
    isDark: true,
  },
  {
    name: 'carbon',
    displayName: '炭黑橙',
    icon: 'ri-fire-line',
    color: 'warning',
    isDark: true,
  },
]

const lightThemes = computed(() => themeOptions.filter(theme => !theme.isDark))
const darkThemes = computed(() => themeOptions.filter(theme => theme.isDark))

const currentTheme = computed(() => globalTheme.name.value)

const currentThemeData = computed(() =>
  themeOptions.find(theme => theme.name === currentTheme.value),
)

const currentThemeIcon = computed(() =>
  currentThemeData.value?.icon || 'ri-palette-line',
)

const currentThemeDisplayName = computed(() =>
  currentThemeData.value?.displayName || currentTheme.value,
)

const changeTheme = (newThemeName: string) => {
  globalTheme.name.value = newThemeName
  localStorage.setItem('theme', newThemeName)
}
</script>

<template>
  <VMenu offset="8">
    <template #activator="{ props: menuProps }">
      <IconBtn v-bind="menuProps">
        <VIcon :icon="currentThemeIcon" />
        <VTooltip
          activator="parent"
          open-delay="1000"
          scroll-strategy="close"
        >
          <span class="text-capitalize">{{ currentThemeDisplayName }}</span>
        </VTooltip>
      </IconBtn>
    </template>

    <VList class="theme-switcher-menu">
      <VListSubheader class="text-high-emphasis">
        <VIcon
          icon="ri-palette-line"
          class="me-2"
        />
        選擇主題
      </VListSubheader>

      <VDivider />

      <!-- 明亮主題 -->
      <VListSubheader class="text-medium-emphasis text-sm">
        明亮主題
      </VListSubheader>

      <VListItem
        v-for="theme in lightThemes"
        :key="theme.name"
        :class="{ 'v-list-item--active': currentTheme === theme.name }"
        @click="changeTheme(theme.name)"
      >
        <template #prepend>
          <VIcon
            :icon="theme.icon"
            :color="theme.color"
            class="me-3"
          />
        </template>

        <VListItemTitle class="text-capitalize">
          {{ theme.displayName }}
        </VListItemTitle>

        <template #append>
          <VIcon
            v-if="currentTheme === theme.name"
            icon="ri-check-line"
            color="primary"
            size="small"
          />
        </template>
      </VListItem>

      <VDivider />

      <!-- 深色主題 -->
      <VListSubheader class="text-medium-emphasis text-sm">
        深色主題
      </VListSubheader>

      <VListItem
        v-for="theme in darkThemes"
        :key="theme.name"
        :class="{ 'v-list-item--active': currentTheme === theme.name }"
        @click="changeTheme(theme.name)"
      >
        <template #prepend>
          <VIcon
            :icon="theme.icon"
            :color="theme.color"
            class="me-3"
          />
        </template>

        <VListItemTitle class="text-capitalize">
          {{ theme.displayName }}
        </VListItemTitle>

        <template #append>
          <VIcon
            v-if="currentTheme === theme.name"
            icon="ri-check-line"
            color="primary"
            size="small"
          />
        </template>
      </VListItem>
    </VList>
  </VMenu>
</template>

<style scoped lang="scss">
.theme-switcher-menu {
  border-radius: 12px !important;
  max-inline-size: 280px;
  min-inline-size: 220px;

  .v-list-item {
    border-radius: 8px;
    margin-block: 2px;
    margin-inline: 8px;

    &.v-list-item--active {
      background-color: rgba(var(--v-theme-primary), 0.12);
    }

    &:hover {
      background-color: rgba(var(--v-theme-primary), 0.08);
    }
  }

  .v-list-subheader {
    font-weight: 600;
    letter-spacing: 0.5px;
  }
}
</style>
