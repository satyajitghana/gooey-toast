import type { ReactNode } from 'react'
import type { ExternalToast, ToasterProps } from 'sonner'

export type GooeyToastType = 'default' | 'success' | 'error' | 'warning' | 'info'

export interface GooeyToastTimings {
  displayDuration?: number
}

export interface GooeyToastClassNames {
  wrapper?: string
  content?: string
  header?: string
  title?: string
  icon?: string
  description?: string
  actionWrapper?: string
  actionButton?: string
}

export interface GooeyToastAction {
  label: string
  onClick: () => void
  successLabel?: string
}

export interface GooeyToastData {
  title: string
  description?: ReactNode
  type: GooeyToastType
  action?: GooeyToastAction
  icon?: ReactNode
  duration?: number
  classNames?: GooeyToastClassNames
  fillColor?: string
  borderColor?: string
  borderWidth?: number
  spring?: boolean
  bounce?: number
}

export interface GooeyToastOptions {
  description?: ReactNode
  action?: GooeyToastAction
  icon?: ReactNode
  duration?: number
  id?: string | number
  classNames?: GooeyToastClassNames
  fillColor?: string
  borderColor?: string
  borderWidth?: number
  timing?: GooeyToastTimings
  spring?: boolean
  bounce?: number
  onDismiss?: () => void
  onAutoClose?: () => void
}

export interface GooeyPromiseData<T> {
  loading: string
  success: string | ((data: T) => string)
  error: string | ((error: unknown) => string)
  description?: {
    loading?: ReactNode
    success?: ReactNode | ((data: T) => ReactNode)
    error?: ReactNode | ((error: unknown) => ReactNode)
  }
  action?: {
    success?: GooeyToastAction
    error?: GooeyToastAction
  }
  classNames?: GooeyToastClassNames
  fillColor?: string
  borderColor?: string
  borderWidth?: number
  timing?: GooeyToastTimings
  spring?: boolean
  bounce?: number
  onDismiss?: () => void
  onAutoClose?: () => void
}

export type GooeyToastPhase = 'loading' | 'default' | 'success' | 'error' | 'warning' | 'info'

export interface GooeyToasterProps {
  position?: ToasterProps['position']
  duration?: number
  gap?: number
  offset?: number | string
  theme?: 'light' | 'dark'
  toastOptions?: Partial<ExternalToast>
  expand?: boolean
  closeButton?: boolean
  richColors?: boolean
  visibleToasts?: number
  dir?: 'ltr' | 'rtl'
  spring?: boolean
  bounce?: number
}
