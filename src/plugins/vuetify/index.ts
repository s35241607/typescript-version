import type { App } from 'vue'
import LuxonAdapter from '@date-io/luxon'

import { createVuetify } from 'vuetify'
import { VBtn } from 'vuetify/components/VBtn'
import defaults from './defaults'
import { icons } from './icons'
import { themes } from './theme'

// Styles

import '@core/scss/template/libs/vuetify/index.scss'
import 'vuetify/styles'

export default function (app: App) {
  const vuetify = createVuetify({
    aliases: {
      IconBtn: VBtn,
    },
    defaults,
    icons,
    theme: {
      defaultTheme: localStorage.getItem('theme') ?? 'dark',
      themes,
    },
    date: {
      adapter: LuxonAdapter,
      formats: {
        keyboardDate: 'yyyy-MM-dd',
      },
    },
  })

  app.use(vuetify)
}
