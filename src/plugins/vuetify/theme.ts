import type { ThemeDefinition } from 'vuetify'

export const staticPrimaryColor = '#8C57FF'
export const staticPrimaryDarkenColor = '#7E4EE6'

export const themes: Record<string, ThemeDefinition> = {
  light: {
    dark: false,
    colors: {
      'primary': staticPrimaryColor,
      'on-primary': '#fff',
      'primary-darken-1': '#7E4EE6',
      'secondary': '#8A8D93',
      'secondary-darken-1': '#7C7F84',
      'on-secondary': '#fff',
      'success': '#56CA00',
      'success-darken-1': '#4DB600',
      'on-success': '#fff',
      'info': '#16B1FF',
      'info-darken-1': '#149FE6',
      'on-info': '#fff',
      'warning': '#FFB400',
      'warning-darken-1': '#E6A200',
      'on-warning': '#fff',
      'error': '#FF4C51',
      'error-darken-1': '#E64449',
      'on-error': '#fff',
      'background': '#f4f5fa',
      'on-background': '#2E263D',
      'surface': '#fff',
      'on-surface': '#2E263D',
      'grey-50': '#FAFAFA',
      'grey-100': '#F5F5F5',
      'grey-200': '#EEEEEE',
      'grey-300': '#E0E0E0',
      'grey-400': '#BDBDBD',
      'grey-500': '#9E9E9E',
      'grey-600': '#757575',
      'grey-700': '#616161',
      'grey-800': '#424242',
      'grey-900': '#212121',
      'perfect-scrollbar-thumb': '#dbdade',
      'skin-bordered-background': '#fff',
      'skin-bordered-surface': '#fff',
      'expansion-panel-text-custom-bg': '#fafafa',
      'track-bg': '#F0F2F8',
      'chat-bg': '#F7F6FA',
    },

    variables: {
      'code-color': '#d400ff',
      'overlay-scrim-background': '#2E263D',
      'tooltip-background': '#1A0E33',
      'overlay-scrim-opacity': 0.5,
      'hover-opacity': 0.04,
      'focus-opacity': 0.1,
      'selected-opacity': 0.08,
      'activated-opacity': 0.16,
      'pressed-opacity': 0.14,
      'dragged-opacity': 0.1,
      'disabled-opacity': 0.4,
      'border-color': '#2E263D',
      'border-opacity': 0.12,
      'table-header-color': '#F6F7FB',
      'high-emphasis-opacity': 0.9,
      'medium-emphasis-opacity': 0.7,

      // 👉 shadows
      'shadow-key-umbra-color': '#2E263D',
      'shadow-xs-opacity': '0.16',
      'shadow-sm-opacity': '0.18',
      'shadow-md-opacity': '0.20',
      'shadow-lg-opacity': '0.22',
      'shadow-xl-opacity': '0.24',
    },
  },

  dark: {
    dark: true,
    colors: {
      'primary': staticPrimaryColor,
      'on-primary': '#fff',
      'primary-darken-1': '#7E4EE6',
      'secondary': '#8A8D93',
      'secondary-darken-1': '#7C7F84',
      'on-secondary': '#fff',
      'success': '#56CA00',
      'success-darken-1': '#4DB600',
      'on-success': '#fff',
      'info': '#16B1FF',
      'info-darken-1': '#149FE6',
      'on-info': '#fff',
      'warning': '#FFB400',
      'warning-darken-1': '#E6A200',
      'on-warning': '#fff',
      'error': '#FF4C51',
      'error-darken-1': '#E64449',
      'on-error': '#fff',
      'background': '#28243D',
      'on-background': '#E7E3FC',
      'surface': '#312d4b',
      'on-surface': '#E7E3FC',
      'grey-50': '#2A2E42',
      'grey-100': '#2F3349',
      'grey-200': '#4A5072',
      'grey-300': '#5E6692',
      'grey-400': '#7983BB',
      'grey-500': '#8692D0',
      'grey-600': '#AAB3DE',
      'grey-700': '#B6BEE3',
      'grey-800': '#CFD3EC',
      'grey-900': '#E7E9F6',
      'perfect-scrollbar-thumb': '#4a5072',
      'skin-bordered-background': '#312d4b',
      'skin-bordered-surface': '#312d4b',
      'expansion-panel-text-custom-bg': '#373350',
      'track-bg': '#474360',
      'chat-bg': '#373452',
    },

    variables: {
      'code-color': '#d400ff',
      'overlay-scrim-background': '#312D4B',
      'tooltip-background': '#F7F4FF',
      'overlay-scrim-opacity': 0.5,
      'hover-opacity': 0.04,
      'focus-opacity': 0.1,
      'selected-opacity': 0.08,
      'activated-opacity': 0.16,
      'pressed-opacity': 0.14,
      'disabled-opacity': 0.4,
      'dragged-opacity': 0.1,
      'border-color': '#E7E3FC',
      'border-opacity': 0.12,
      'table-header-color': '#3D3759',
      'high-emphasis-opacity': 0.9,
      'medium-emphasis-opacity': 0.7,

      // 👉 Shadows
      'shadow-key-umbra-color': '#131120',
      'shadow-xs-opacity': '0.20',
      'shadow-sm-opacity': '0.22',
      'shadow-md-opacity': '0.24',
      'shadow-lg-opacity': '0.26',
      'shadow-xl-opacity': '0.28',
    },
  },
  black: {
    dark: true,
    colors: {
      'primary': '#6200EE', // 主要顏色
      'on-primary': '#FFFFFF', // 主要顏色上的文本顏色
      'primary-darken-1': '#3700B3', // 主要顏色的加深版本
      'secondary': '#03DAC6', // 次要顏色
      'secondary-darken-1': '#018786', // 次要顏色的加深版本
      'on-secondary': '#000000', // 次要顏色上的文本顏色
      'success': '#4CAF50', // 成功顏色
      'success-darken-1': '#388E3C', // 成功顏色的加深版本
      'on-success': '#FFFFFF', // 成功顏色上的文本顏色
      'info': '#2196F3', // 資訊顏色
      'info-darken-1': '#1976D2', // 資訊顏色的加深版本
      'on-info': '#FFFFFF', // 資訊顏色上的文本顏色
      'warning': '#FF9800', // 警告顏色
      'warning-darken-1': '#F57C00', // 警告顏色的加深版本
      'on-warning': '#FFFFFF', // 警告顏色上的文本顏色
      'error': '#F44336', // 錯誤顏色
      'error-darken-1': '#D32F2F', // 錯誤顏色的加深版本
      'on-error': '#FFFFFF', // 錯誤顏色上的文本顏色
      'background': '#121212', // 背景顏色
      'on-background': '#E0E0E0', // 背景上的文本顏色
      'surface': '#1E1E1E', // 表面顏色
      'on-surface': '#E0E0E0', // 表面上的文本顏色
      'grey-50': '#2A2A2A',
      'grey-100': '#3D3D3D',
      'grey-200': '#606060',
      'grey-300': '#757575',
      'grey-400': '#9E9E9E',
      'grey-500': '#BDBDBD',
      'grey-600': '#E0E0E0',
      'grey-700': '#F5F5F5',
      'grey-800': '#FFFFFF',
      'grey-900': '#FFFFFF',
      'perfect-scrollbar-thumb': '#444444',
      'skin-bordered-background': '#1E1E1E',
      'skin-bordered-surface': '#1E1E1E',
      'expansion-panel-text-custom-bg': '#292929',
      'track-bg': '#2D2D2D',
      'chat-bg': '#292929',
    },

    variables: {
      'code-color': '#d400ff',
      'overlay-scrim-background': '#121212',
      'tooltip-background': '#F7F4FF',
      'overlay-scrim-opacity': 0.5,
      'hover-opacity': 0.04,
      'focus-opacity': 0.1,
      'selected-opacity': 0.08,
      'activated-opacity': 0.16,
      'pressed-opacity': 0.14,
      'disabled-opacity': 0.4,
      'dragged-opacity': 0.1,
      'border-color': '#E0E0E0',
      'border-opacity': 0.12,
      'table-header-color': '#3D3D3D',
      'high-emphasis-opacity': 0.9,
      'medium-emphasis-opacity': 0.7,

      // 👉 Shadows
      'shadow-key-umbra-color': '#131120',
      'shadow-xs-opacity': '0.20',
      'shadow-sm-opacity': '0.22',
      'shadow-md-opacity': '0.24',
      'shadow-lg-opacity': '0.26',
      'shadow-xl-opacity': '0.28',
    },
  },
  black2: {
    dark: true,
    colors: {
      'primary': '#6200EE', // 主要顏色
      'on-primary': '#FFFFFF', // 主要顏色上的文本顏色
      'primary-darken-1': '#3700B3', // 主要顏色的加深版本
      'secondary': '#03DAC6', // 次要顏色
      'secondary-darken-1': '#018786', // 次要顏色的加深版本
      'on-secondary': '#000000', // 次要顏色上的文本顏色
      'success': '#4CAF50', // 成功顏色
      'success-darken-1': '#388E3C', // 成功顏色的加深版本
      'on-success': '#FFFFFF', // 成功顏色上的文本顏色
      'info': '#2196F3', // 資訊顏色
      'info-darken-1': '#1976D2', // 資訊顏色的加深版本
      'on-info': '#FFFFFF', // 資訊顏色上的文本顏色
      'warning': '#FF9800', // 警告顏色
      'warning-darken-1': '#F57C00', // 警告顏色的加深版本
      'on-warning': '#FFFFFF', // 警告顏色上的文本顏色
      'error': '#F44336', // 錯誤顏色
      'error-darken-1': '#D32F2F', // 錯誤顏色的加深版本
      'on-error': '#FFFFFF', // 錯誤顏色上的文本顏色
      'background': '#1E1E1E', // 背景顏色，稍微亮一點
      'on-background': '#E0E0E0', // 背景上的文本顏色
      'surface': '#252525', // 表面顏色，稍微亮一點
      'on-surface': '#E0E0E0', // 表面上的文本顏色
      'grey-50': '#2A2A2A',
      'grey-100': '#3D3D3D',
      'grey-200': '#606060',
      'grey-300': '#757575',
      'grey-400': '#9E9E9E',
      'grey-500': '#BDBDBD',
      'grey-600': '#E0E0E0',
      'grey-700': '#F5F5F5',
      'grey-800': '#FFFFFF',
      'grey-900': '#FFFFFF',
      'perfect-scrollbar-thumb': '#444444',
      'skin-bordered-background': '#252525',
      'skin-bordered-surface': '#252525',
      'expansion-panel-text-custom-bg': '#292929',
      'track-bg': '#2D2D2D',
      'chat-bg': '#292929',
    },

    variables: {
      'code-color': '#d400ff',
      'overlay-scrim-background': '#1E1E1E',
      'tooltip-background': '#F7F4FF',
      'overlay-scrim-opacity': 0.5,
      'hover-opacity': 0.04,
      'focus-opacity': 0.1,
      'selected-opacity': 0.08,
      'activated-opacity': 0.16,
      'pressed-opacity': 0.14,
      'disabled-opacity': 0.4,
      'dragged-opacity': 0.1,
      'border-color': '#E0E0E0',
      'border-opacity': 0.12,
      'table-header-color': '#3D3D3D',
      'high-emphasis-opacity': 0.9,
      'medium-emphasis-opacity': 0.7,

      // 👉 Shadows
      'shadow-key-umbra-color': '#131120',
      'shadow-xs-opacity': '0.20',
      'shadow-sm-opacity': '0.22',
      'shadow-md-opacity': '0.24',
      'shadow-lg-opacity': '0.26',
      'shadow-xl-opacity': '0.28',
    },
  },
  black3: {
    dark: true,
    colors: {
      'primary': '#BB86FC', // 主要顏色
      'on-primary': '#000000', // 主要顏色上的文本顏色
      'primary-darken-1': '#3700B3', // 主要顏色的加深版本
      'secondary': '#03DAC6', // 次要顏色
      'secondary-darken-1': '#018786', // 次要顏色的加深版本
      'on-secondary': '#000000', // 次要顏色上的文本顏色
      'success': '#4CAF50', // 成功顏色
      'success-darken-1': '#388E3C', // 成功顏色的加深版本
      'on-success': '#FFFFFF', // 成功顏色上的文本顏色
      'info': '#2196F3', // 資訊顏色
      'info-darken-1': '#1976D2', // 資訊顏色的加深版本
      'on-info': '#FFFFFF', // 資訊顏色上的文本顏色
      'warning': '#FF9800', // 警告顏色
      'warning-darken-1': '#F57C00', // 警告顏色的加深版本
      'on-warning': '#FFFFFF', // 警告顏色上的文本顏色
      'error': '#F44336', // 錯誤顏色
      'error-darken-1': '#D32F2F', // 錯誤顏色的加深版本
      'on-error': '#FFFFFF', // 錯誤顏色上的文本顏色
      'background': '#121212', // 背景顏色
      'on-background': '#E0E0E0', // 背景上的文本顏色
      'surface': '#1F1F1F', // 表面顏色
      'on-surface': '#E0E0E0', // 表面上的文本顏色
      'grey-50': '#2A2A2A',
      'grey-100': '#3D3D3D',
      'grey-200': '#606060',
      'grey-300': '#757575',
      'grey-400': '#9E9E9E',
      'grey-500': '#BDBDBD',
      'grey-600': '#E0E0E0',
      'grey-700': '#F5F5F5',
      'grey-800': '#FFFFFF',
      'grey-900': '#FFFFFF',
      'perfect-scrollbar-thumb': '#444444',
      'skin-bordered-background': '#1F1F1F',
      'skin-bordered-surface': '#1F1F1F',
      'expansion-panel-text-custom-bg': '#292929',
      'track-bg': '#2D2D2D',
      'chat-bg': '#292929',
    },

    variables: {
      'code-color': '#d400ff',
      'overlay-scrim-background': '#121212',
      'tooltip-background': '#F7F4FF',
      'overlay-scrim-opacity': 0.5,
      'hover-opacity': 0.04,
      'focus-opacity': 0.1,
      'selected-opacity': 0.08,
      'activated-opacity': 0.16,
      'pressed-opacity': 0.14,
      'disabled-opacity': 0.4,
      'dragged-opacity': 0.1,
      'border-color': '#E0E0E0',
      'border-opacity': 0.12,
      'table-header-color': '#3D3D3D',
      'high-emphasis-opacity': 0.9,
      'medium-emphasis-opacity': 0.7,

      // 👉 Shadows
      'shadow-key-umbra-color': '#131120',
      'shadow-xs-opacity': '0.20',
      'shadow-sm-opacity': '0.22',
      'shadow-md-opacity': '0.24',
      'shadow-lg-opacity': '0.26',
      'shadow-xl-opacity': '0.28',
    },
  },
}

export default themes
