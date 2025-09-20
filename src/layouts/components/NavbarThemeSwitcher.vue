<script setup lang="ts">
import type { ThemeSwitcherTheme } from '@layouts/types'

const themes: ThemeSwitcherTheme[] = [
  {
    name: 'light',
    icon: 'ri-sun-line',
  },
  {
    name: 'dark',
    icon: 'ri-moon-clear-line',
  },
  {
    name: 'ocean',
    icon: 'ri-water-flash-line',
  },
  {
    name: 'oceanDark',
    icon: 'ri-moon-foggy-line',
  },
  {
    name: 'sunset',
    icon: 'ri-sun-cloudy-line',
  },
  {
    name: 'forest',
    icon: 'ri-leaf-line',
  },
  {
    name: 'sakura',
    icon: 'ri-flower-line',
  },
  {
    name: 'black',
    icon: 'ri-contrast-2-line',
  },
  {
    name: 'black2',
    icon: 'ri-contrast-drop-2-line',
  },
  {
    name: 'black3',
    icon: 'ri-moon-clear-line',
  },
]
</script>

<template>
  <ThemeSwitcher :themes="themes" />
</template>
