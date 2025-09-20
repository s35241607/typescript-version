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

  // 🌑 Midnight Theme - 現代午夜主題 (重新設計)
  midnight: {
    dark: true,
    colors: {
      'primary': '#60A5FA', // Blue 400 (在深色背景上明亮的藍色)
      'on-primary': '#1E293B',
      'primary-darken-1': '#3B82F6', // Blue 500
      'secondary': '#A78BFA', // Violet 400
      'secondary-darken-1': '#8B5CF6', // Violet 500
      'on-secondary': '#1E293B',
      'success': '#34D399', // Emerald 400
      'success-darken-1': '#10B981', // Emerald 500
      'on-success': '#1E293B',
      'info': '#22D3EE', // Cyan 400
      'info-darken-1': '#06B6D4', // Cyan 500
      'on-info': '#1E293B',
      'warning': '#FBBF24', // Amber 400
      'warning-darken-1': '#F59E0B', // Amber 500
      'on-warning': '#1E293B',
      'error': '#F87171', // Red 400
      'error-darken-1': '#EF4444', // Red 500
      'on-error': '#1E293B',
      'background': '#0F172A', // Slate 900
      'on-background': '#F1F5F9', // Slate 100
      'surface': '#1E293B', // Slate 800
      'on-surface': '#F1F5F9',
      'grey-50': '#1E293B',
      'grey-100': '#334155',
      'grey-200': '#475569',
      'grey-300': '#64748B',
      'grey-400': '#94A3B8',
      'grey-500': '#CBD5E1',
      'grey-600': '#E2E8F0',
      'grey-700': '#F1F5F9',
      'grey-800': '#F8FAFC',
      'grey-900': '#FFFFFF',
      'perfect-scrollbar-thumb': '#475569',
      'skin-bordered-background': '#1E293B',
      'skin-bordered-surface': '#1E293B',
      'expansion-panel-text-custom-bg': '#334155',
      'track-bg': '#475569',
      'chat-bg': '#334155',
    },
    variables: {
      'code-color': '#60A5FA',
      'overlay-scrim-background': '#0F172A',
      'tooltip-background': '#F8FAFC',
      'overlay-scrim-opacity': 0.8,
      'hover-opacity': 0.08,
      'focus-opacity': 0.14,
      'selected-opacity': 0.12,
      'activated-opacity': 0.20,
      'pressed-opacity': 0.18,
      'disabled-opacity': 0.35,
      'dragged-opacity': 0.14,
      'border-color': '#F1F5F9',
      'border-opacity': 0.15,
      'table-header-color': '#334155',
      'high-emphasis-opacity': 0.95,
      'medium-emphasis-opacity': 0.80,
      'shadow-key-umbra-color': '#0F172A',
      'shadow-xs-opacity': '0.30',
      'shadow-sm-opacity': '0.32',
      'shadow-md-opacity': '0.34',
      'shadow-lg-opacity': '0.36',
      'shadow-xl-opacity': '0.38',
    },
  },

  // 🌌 Deep Space Theme - 深空主題 (全新設計)
  deepSpace: {
    dark: true,
    colors: {
      'primary': '#A855F7', // Violet 500 (神秘紫色)
      'on-primary': '#FFFFFF',
      'primary-darken-1': '#7C3AED', // Violet 600
      'secondary': '#06B6D4', // Cyan 500 (星空藍)
      'secondary-darken-1': '#0891B2', // Cyan 600
      'on-secondary': '#FFFFFF',
      'success': '#10B981', // Emerald 500
      'success-darken-1': '#059669', // Emerald 600
      'on-success': '#FFFFFF',
      'info': '#3B82F6', // Blue 500
      'info-darken-1': '#2563EB', // Blue 600
      'on-info': '#FFFFFF',
      'warning': '#F59E0B', // Amber 500
      'warning-darken-1': '#D97706', // Amber 600
      'on-warning': '#FFFFFF',
      'error': '#EF4444', // Red 500
      'error-darken-1': '#DC2626', // Red 600
      'on-error': '#FFFFFF',
      'background': '#030712', // Gray 950 (更深的背景)
      'on-background': '#E5E7EB', // Gray 200
      'surface': '#111827', // Gray 900
      'on-surface': '#E5E7EB',
      'grey-50': '#111827',
      'grey-100': '#1F2937',
      'grey-200': '#374151',
      'grey-300': '#4B5563',
      'grey-400': '#6B7280',
      'grey-500': '#9CA3AF',
      'grey-600': '#D1D5DB',
      'grey-700': '#E5E7EB',
      'grey-800': '#F3F4F6',
      'grey-900': '#FFFFFF',
      'perfect-scrollbar-thumb': '#4B5563',
      'skin-bordered-background': '#111827',
      'skin-bordered-surface': '#111827',
      'expansion-panel-text-custom-bg': '#1F2937',
      'track-bg': '#374151',
      'chat-bg': '#1F2937',
    },
    variables: {
      'code-color': '#A855F7',
      'overlay-scrim-background': '#030712',
      'tooltip-background': '#F3F4F6',
      'overlay-scrim-opacity': 0.9,
      'hover-opacity': 0.10,
      'focus-opacity': 0.16,
      'selected-opacity': 0.14,
      'activated-opacity': 0.22,
      'pressed-opacity': 0.20,
      'disabled-opacity': 0.30,
      'dragged-opacity': 0.16,
      'border-color': '#E5E7EB',
      'border-opacity': 0.12,
      'table-header-color': '#1F2937',
      'high-emphasis-opacity': 0.95,
      'medium-emphasis-opacity': 0.85,
      'shadow-key-umbra-color': '#030712',
      'shadow-xs-opacity': '0.35',
      'shadow-sm-opacity': '0.37',
      'shadow-md-opacity': '0.39',
      'shadow-lg-opacity': '0.41',
      'shadow-xl-opacity': '0.43',
    },
  },

  // 🔥 Carbon Theme - 炭黑現代主題 (重新設計)
  carbon: {
    dark: true,
    colors: {
      'primary': '#F97316', // Orange 500 (溫暖的橙色在黑色中突出)
      'on-primary': '#FFFFFF',
      'primary-darken-1': '#EA580C', // Orange 600
      'secondary': '#22D3EE', // Cyan 400 (清涼對比)
      'secondary-darken-1': '#06B6D4', // Cyan 500
      'on-secondary': '#000000',
      'success': '#22C55E', // Green 500
      'success-darken-1': '#16A34A', // Green 600
      'on-success': '#FFFFFF',
      'info': '#60A5FA', // Blue 400
      'info-darken-1': '#3B82F6', // Blue 500
      'on-info': '#FFFFFF',
      'warning': '#FBBF24', // Amber 400
      'warning-darken-1': '#F59E0B', // Amber 500
      'on-warning': '#000000',
      'error': '#F87171', // Red 400
      'error-darken-1': '#EF4444', // Red 500
      'on-error': '#FFFFFF',
      'background': '#18181B', // Zinc 900
      'on-background': '#F4F4F5', // Zinc 100
      'surface': '#27272A', // Zinc 800
      'on-surface': '#F4F4F5',
      'grey-50': '#27272A',
      'grey-100': '#3F3F46',
      'grey-200': '#52525B',
      'grey-300': '#71717A',
      'grey-400': '#A1A1AA',
      'grey-500': '#D4D4D8',
      'grey-600': '#E4E4E7',
      'grey-700': '#F4F4F5',
      'grey-800': '#FAFAFA',
      'grey-900': '#FFFFFF',
      'perfect-scrollbar-thumb': '#52525B',
      'skin-bordered-background': '#27272A',
      'skin-bordered-surface': '#27272A',
      'expansion-panel-text-custom-bg': '#3F3F46',
      'track-bg': '#52525B',
      'chat-bg': '#3F3F46',
    },
    variables: {
      'code-color': '#F97316',
      'overlay-scrim-background': '#18181B',
      'tooltip-background': '#FAFAFA',
      'overlay-scrim-opacity': 0.75,
      'hover-opacity': 0.08,
      'focus-opacity': 0.14,
      'selected-opacity': 0.12,
      'activated-opacity': 0.20,
      'pressed-opacity': 0.18,
      'disabled-opacity': 0.35,
      'dragged-opacity': 0.14,
      'border-color': '#F4F4F5',
      'border-opacity': 0.15,
      'table-header-color': '#3F3F46',
      'high-emphasis-opacity': 0.95,
      'medium-emphasis-opacity': 0.80,
      'shadow-key-umbra-color': '#18181B',
      'shadow-xs-opacity': '0.25',
      'shadow-sm-opacity': '0.27',
      'shadow-md-opacity': '0.29',
      'shadow-lg-opacity': '0.31',
      'shadow-xl-opacity': '0.33',
    },
  },

  // 🌊 Ocean Blue Theme - 清新海洋藍主題 (優化版)
  ocean: {
    dark: false,
    colors: {
      'primary': '#0EA5E9', // Sky Blue 500
      'on-primary': '#fff',
      'primary-darken-1': '#0284C7', // Sky Blue 600
      'secondary': '#8B5CF6', // Violet 500 (與藍色形成很好的對比)
      'secondary-darken-1': '#7C3AED', // Violet 600
      'on-secondary': '#fff',
      'success': '#059669', // Emerald 600 (更深的綠色，與藍色區分)
      'success-darken-1': '#047857', // Emerald 700
      'on-success': '#fff',
      'info': '#06B6D4', // Cyan 500 (保持藍綠色系但有區別)
      'info-darken-1': '#0891B2', // Cyan 600
      'on-info': '#fff',
      'warning': '#F59E0B', // Amber 500
      'warning-darken-1': '#D97706', // Amber 600
      'on-warning': '#fff',
      'error': '#EF4444', // Red 500
      'error-darken-1': '#DC2626', // Red 600
      'on-error': '#fff',
      'background': '#F8FAFC', // Slate 50 (更清爽的背景)
      'on-background': '#1E293B', // Slate 800
      'surface': '#FFFFFF', // Pure white for better contrast
      'on-surface': '#1E293B',
      'grey-50': '#F8FAFC',
      'grey-100': '#F1F5F9',
      'grey-200': '#E2E8F0',
      'grey-300': '#CBD5E1',
      'grey-400': '#94A3B8',
      'grey-500': '#64748B',
      'grey-600': '#475569',
      'grey-700': '#334155',
      'grey-800': '#1E293B',
      'grey-900': '#0F172A',
      'perfect-scrollbar-thumb': '#CBD5E1',
      'skin-bordered-background': '#FFFFFF',
      'skin-bordered-surface': '#FFFFFF',
      'expansion-panel-text-custom-bg': '#F8FAFC',
      'track-bg': '#F1F5F9',
      'chat-bg': '#F8FAFC',
    },
    variables: {
      'code-color': '#0EA5E9',
      'overlay-scrim-background': '#1E293B',
      'tooltip-background': '#1E293B',
      'overlay-scrim-opacity': 0.4,
      'hover-opacity': 0.06,
      'focus-opacity': 0.12,
      'selected-opacity': 0.1,
      'activated-opacity': 0.18,
      'pressed-opacity': 0.16,
      'dragged-opacity': 0.12,
      'disabled-opacity': 0.38,
      'border-color': '#1E293B',
      'border-opacity': 0.1,
      'table-header-color': '#F8FAFC',
      'high-emphasis-opacity': 0.92,
      'medium-emphasis-opacity': 0.75,
      'shadow-key-umbra-color': '#0EA5E9',
      'shadow-xs-opacity': '0.12',
      'shadow-sm-opacity': '0.14',
      'shadow-md-opacity': '0.16',
      'shadow-lg-opacity': '0.18',
      'shadow-xl-opacity': '0.20',
    },
  },

  // 🌙 Ocean Dark Theme - 深邃海洋夜晚主題 (優化版)
  oceanDark: {
    dark: true,
    colors: {
      'primary': '#38BDF8', // Sky Blue 400 (在深色背景上更亮)
      'on-primary': '#0F172A',
      'primary-darken-1': '#0EA5E9', // Sky Blue 500
      'secondary': '#A78BFA', // Violet 400 (在深色背景上更柔和)
      'secondary-darken-1': '#8B5CF6', // Violet 500
      'on-secondary': '#0F172A',
      'success': '#34D399', // Emerald 400
      'success-darken-1': '#10B981', // Emerald 500
      'on-success': '#0F172A',
      'info': '#22D3EE', // Cyan 400
      'info-darken-1': '#06B6D4', // Cyan 500
      'on-info': '#0F172A',
      'warning': '#FBBF24', // Amber 400
      'warning-darken-1': '#F59E0B', // Amber 500
      'on-warning': '#0F172A',
      'error': '#F87171', // Red 400
      'error-darken-1': '#EF4444', // Red 500
      'on-error': '#0F172A',
      'background': '#0F172A', // Slate 900
      'on-background': '#E2E8F0', // Slate 200
      'surface': '#1E293B', // Slate 800
      'on-surface': '#E2E8F0',
      'grey-50': '#1E293B',
      'grey-100': '#334155',
      'grey-200': '#475569',
      'grey-300': '#64748B',
      'grey-400': '#94A3B8',
      'grey-500': '#CBD5E1',
      'grey-600': '#E2E8F0',
      'grey-700': '#F1F5F9',
      'grey-800': '#F8FAFC',
      'grey-900': '#FFFFFF',
      'perfect-scrollbar-thumb': '#475569',
      'skin-bordered-background': '#1E293B',
      'skin-bordered-surface': '#1E293B',
      'expansion-panel-text-custom-bg': '#334155',
      'track-bg': '#475569',
      'chat-bg': '#334155',
    },
    variables: {
      'code-color': '#38BDF8',
      'overlay-scrim-background': '#0F172A',
      'tooltip-background': '#F8FAFC',
      'overlay-scrim-opacity': 0.6,
      'hover-opacity': 0.08,
      'focus-opacity': 0.14,
      'selected-opacity': 0.12,
      'activated-opacity': 0.20,
      'pressed-opacity': 0.18,
      'disabled-opacity': 0.35,
      'dragged-opacity': 0.14,
      'border-color': '#E2E8F0',
      'border-opacity': 0.15,
      'table-header-color': '#334155',
      'high-emphasis-opacity': 0.95,
      'medium-emphasis-opacity': 0.80,
      'shadow-key-umbra-color': '#0F172A',
      'shadow-xs-opacity': '0.25',
      'shadow-sm-opacity': '0.27',
      'shadow-md-opacity': '0.29',
      'shadow-lg-opacity': '0.31',
      'shadow-xl-opacity': '0.33',
    },
  },

  // 🌅 Sunset Theme - 溫暖日落主題 (優化版)
  sunset: {
    dark: false,
    colors: {
      'primary': '#F97316', // Orange 500
      'on-primary': '#fff',
      'primary-darken-1': '#EA580C', // Orange 600
      'secondary': '#EC4899', // Pink 500 (與橙色形成溫暖對比)
      'secondary-darken-1': '#DB2777', // Pink 600
      'on-secondary': '#fff',
      'success': '#10B981', // Emerald 500 (自然綠色平衡暖色)
      'success-darken-1': '#059669', // Emerald 600
      'on-success': '#fff',
      'info': '#3B82F6', // Blue 500 (冷暖對比)
      'info-darken-1': '#2563EB', // Blue 600
      'on-info': '#fff',
      'warning': '#EAB308', // Yellow 500
      'warning-darken-1': '#CA8A04', // Yellow 600
      'on-warning': '#000', // 黃色背景用黑字更清楚
      'error': '#EF4444', // Red 500
      'error-darken-1': '#DC2626', // Red 600
      'on-error': '#fff',
      'background': '#FFFBEB', // Amber 50 (避免 gradient，更相容)
      'on-background': '#78350F', // Amber 900
      'surface': '#FFFFFF', // Pure white
      'on-surface': '#78350F',
      'grey-50': '#FFFBEB',
      'grey-100': '#FEF3C7',
      'grey-200': '#FDE68A',
      'grey-300': '#FCD34D',
      'grey-400': '#FBBF24',
      'grey-500': '#F59E0B',
      'grey-600': '#D97706',
      'grey-700': '#B45309',
      'grey-800': '#92400E',
      'grey-900': '#78350F',
      'perfect-scrollbar-thumb': '#FCD34D',
      'skin-bordered-background': '#FFFFFF',
      'skin-bordered-surface': '#FFFFFF',
      'expansion-panel-text-custom-bg': '#FFFBEB',
      'track-bg': '#FEF3C7',
      'chat-bg': '#FFFBEB',
    },
    variables: {
      'code-color': '#F97316',
      'overlay-scrim-background': '#78350F',
      'tooltip-background': '#78350F',
      'overlay-scrim-opacity': 0.3,
      'hover-opacity': 0.06,
      'focus-opacity': 0.12,
      'selected-opacity': 0.1,
      'activated-opacity': 0.18,
      'pressed-opacity': 0.16,
      'dragged-opacity': 0.12,
      'disabled-opacity': 0.4,
      'border-color': '#78350F',
      'border-opacity': 0.12,
      'table-header-color': '#FFFBEB',
      'high-emphasis-opacity': 0.9,
      'medium-emphasis-opacity': 0.7,
      'shadow-key-umbra-color': '#F97316',
      'shadow-xs-opacity': '0.15',
      'shadow-sm-opacity': '0.17',
      'shadow-md-opacity': '0.19',
      'shadow-lg-opacity': '0.21',
      'shadow-xl-opacity': '0.23',
    },
  },

  // 🌲 Forest Theme - 自然森林主題 (優化版)
  forest: {
    dark: false,
    colors: {
      'primary': '#059669', // Emerald 600
      'on-primary': '#fff',
      'primary-darken-1': '#047857', // Emerald 700
      'secondary': '#0891B2', // Cyan 600 (大自然的水色)
      'secondary-darken-1': '#0E7490', // Cyan 700
      'on-secondary': '#fff',
      'success': '#22C55E', // Green 500 (稍淺的綠色作區別)
      'success-darken-1': '#16A34A', // Green 600
      'on-success': '#fff',
      'info': '#3B82F6', // Blue 500 (天空藍)
      'info-darken-1': '#2563EB', // Blue 600
      'on-info': '#fff',
      'warning': '#F59E0B', // Amber 500 (秋葉色)
      'warning-darken-1': '#D97706', // Amber 600
      'on-warning': '#fff',
      'error': '#DC2626', // Red 600 (稍深的紅色)
      'error-darken-1': '#B91C1C', // Red 700
      'on-error': '#fff',
      'background': '#F0FDF4', // Green 50
      'on-background': '#14532D', // Green 900
      'surface': '#FFFFFF', // Pure white
      'on-surface': '#14532D',
      'grey-50': '#F0FDF4',
      'grey-100': '#DCFCE7',
      'grey-200': '#BBF7D0',
      'grey-300': '#86EFAC',
      'grey-400': '#4ADE80',
      'grey-500': '#22C55E',
      'grey-600': '#16A34A',
      'grey-700': '#15803D',
      'grey-800': '#166534',
      'grey-900': '#14532D',
      'perfect-scrollbar-thumb': '#86EFAC',
      'skin-bordered-background': '#FFFFFF',
      'skin-bordered-surface': '#FFFFFF',
      'expansion-panel-text-custom-bg': '#F0FDF4',
      'track-bg': '#DCFCE7',
      'chat-bg': '#F0FDF4',
    },
    variables: {
      'code-color': '#059669',
      'overlay-scrim-background': '#14532D',
      'tooltip-background': '#14532D',
      'overlay-scrim-opacity': 0.35,
      'hover-opacity': 0.06,
      'focus-opacity': 0.12,
      'selected-opacity': 0.1,
      'activated-opacity': 0.18,
      'pressed-opacity': 0.16,
      'dragged-opacity': 0.12,
      'disabled-opacity': 0.4,
      'border-color': '#14532D',
      'border-opacity': 0.1,
      'table-header-color': '#F0FDF4',
      'high-emphasis-opacity': 0.9,
      'medium-emphasis-opacity': 0.7,
      'shadow-key-umbra-color': '#059669',
      'shadow-xs-opacity': '0.12',
      'shadow-sm-opacity': '0.14',
      'shadow-md-opacity': '0.16',
      'shadow-lg-opacity': '0.18',
      'shadow-xl-opacity': '0.20',
    },
  },

  // 🌸 Sakura Theme - 櫻花粉色主題 (優化版)
  sakura: {
    dark: false,
    colors: {
      'primary': '#EC4899', // Pink 500
      'on-primary': '#fff',
      'primary-darken-1': '#DB2777', // Pink 600
      'secondary': '#8B5CF6', // Violet 500 (與粉色形成優雅對比)
      'secondary-darken-1': '#7C3AED', // Violet 600
      'on-secondary': '#fff',
      'success': '#059669', // Emerald 600 (自然綠色平衡)
      'success-darken-1': '#047857', // Emerald 700
      'on-success': '#fff',
      'info': '#06B6D4', // Cyan 500 (清新藍綠)
      'info-darken-1': '#0891B2', // Cyan 600
      'on-info': '#fff',
      'warning': '#F59E0B', // Amber 500
      'warning-darken-1': '#D97706', // Amber 600
      'on-warning': '#fff',
      'error': '#EF4444', // Red 500
      'error-darken-1': '#DC2626', // Red 600
      'on-error': '#fff',
      'background': '#FDF2F8', // Pink 50
      'on-background': '#831843', // Pink 900
      'surface': '#FFFFFF', // Pure white
      'on-surface': '#831843',
      'grey-50': '#FDF2F8',
      'grey-100': '#FCE7F3',
      'grey-200': '#FBCFE8',
      'grey-300': '#F9A8D4',
      'grey-400': '#F472B6',
      'grey-500': '#EC4899',
      'grey-600': '#DB2777',
      'grey-700': '#BE185D',
      'grey-800': '#9D174D',
      'grey-900': '#831843',
      'perfect-scrollbar-thumb': '#F9A8D4',
      'skin-bordered-background': '#FFFFFF',
      'skin-bordered-surface': '#FFFFFF',
      'expansion-panel-text-custom-bg': '#FDF2F8',
      'track-bg': '#FCE7F3',
      'chat-bg': '#FDF2F8',
    },
    variables: {
      'code-color': '#EC4899',
      'overlay-scrim-background': '#831843',
      'tooltip-background': '#831843',
      'overlay-scrim-opacity': 0.3,
      'hover-opacity': 0.06,
      'focus-opacity': 0.12,
      'selected-opacity': 0.1,
      'activated-opacity': 0.18,
      'pressed-opacity': 0.16,
      'dragged-opacity': 0.12,
      'disabled-opacity': 0.4,
      'border-color': '#831843',
      'border-opacity': 0.1,
      'table-header-color': '#FDF2F8',
      'high-emphasis-opacity': 0.9,
      'medium-emphasis-opacity': 0.7,
      'shadow-key-umbra-color': '#EC4899',
      'shadow-xs-opacity': '0.15',
      'shadow-sm-opacity': '0.17',
      'shadow-md-opacity': '0.19',
      'shadow-lg-opacity': '0.21',
      'shadow-xl-opacity': '0.23',
    },
  },
}

export default themes
