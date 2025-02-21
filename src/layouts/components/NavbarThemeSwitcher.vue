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
    name: 'black',
    icon: 'ri-moon-clear-line',
  },
  {
    name: 'black2',
    icon: 'ri-moon-clear-line',
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
