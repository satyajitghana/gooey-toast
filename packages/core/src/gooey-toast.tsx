import { useState, useEffect, type ReactNode } from 'react'
import { toast } from 'sonner'
import { GooeyToast } from './components/gooey-toast'
import { ToastErrorBoundary } from './components/toast-error-boundary'
import type {
  GooeyToastOptions,
  GooeyPromiseData,
  GooeyToastPhase,
  GooeyToastType,
  GooeyToastAction,
  GooeyToastClassNames,
  GooeyToastTimings,
} from './types'

const DEFAULT_EXPANDED_DURATION = 4000

function GooeyToastWrapper({
  initialPhase,
  title,
  type,
  description,
  action,
  icon,
  classNames,
  fillColor,
  borderColor,
  borderWidth,
  timing,
  spring,
  bounce,
  toastId,
}: {
  initialPhase: GooeyToastPhase
  title: string
  type: GooeyToastType
  description?: ReactNode
  action?: GooeyToastAction
  icon?: ReactNode
  classNames?: GooeyToastClassNames
  fillColor?: string
  borderColor?: string
  borderWidth?: number
  timing?: GooeyToastTimings
  spring?: boolean
  bounce?: number
  toastId?: string | number
}) {
  return (
    <ToastErrorBoundary>
      <GooeyToast
        title={title}
        description={description}
        type={type}
        action={action}
        icon={icon}
        phase={initialPhase}
        classNames={classNames}
        fillColor={fillColor}
        borderColor={borderColor}
        borderWidth={borderWidth}
        timing={timing}
        spring={spring}
        bounce={bounce}
        toastId={toastId}
      />
    </ToastErrorBoundary>
  )
}

function PromiseToastWrapper<T>({
  promise,
  data,
  toastId,
}: {
  promise: Promise<T>
  data: GooeyPromiseData<T>
  toastId: string | number
}) {
  const [phase, setPhase] = useState<GooeyToastPhase>('loading')
  const [title, setTitle] = useState(data.loading)
  const [description, setDescription] = useState<ReactNode | undefined>(data.description?.loading)
  const [action, setAction] = useState<GooeyToastAction | undefined>(undefined)

  useEffect(() => {
    const resetDuration = (hasExpandedContent: boolean) => {
      const baseDuration = data.timing?.displayDuration ?? (hasExpandedContent ? DEFAULT_EXPANDED_DURATION : undefined)
      const collapseDurMs = 0.9 * 1000
      const duration = baseDuration != null && hasExpandedContent ? baseDuration + collapseDurMs : baseDuration
      if (duration != null) {
        toast.custom(() => (
          <PromiseToastWrapper promise={promise} data={data} toastId={toastId} />
        ), { id: toastId, duration })
      }
    }

    promise
      .then((result) => {
        const desc = typeof data.description?.success === 'function'
          ? data.description.success(result)
          : data.description?.success
        setTitle(
          typeof data.success === 'function'
            ? data.success(result)
            : data.success
        )
        setDescription(desc)
        setAction(data.action?.success)
        setPhase('success')
        resetDuration(Boolean(desc || data.action?.success))
      })
      .catch((err) => {
        const desc = typeof data.description?.error === 'function'
          ? data.description.error(err)
          : data.description?.error
        setTitle(
          typeof data.error === 'function' ? data.error(err) : data.error
        )
        setDescription(desc)
        setAction(data.action?.error)
        setPhase('error')
        resetDuration(Boolean(desc || data.action?.error))
      })
  }, [])

  return (
    <ToastErrorBoundary>
      <GooeyToast
        title={title}
        description={description}
        type={phase === 'loading' ? 'info' : (phase as GooeyToastType)}
        action={action}
        phase={phase}
        classNames={data.classNames}
        fillColor={data.fillColor}
        borderColor={data.borderColor}
        borderWidth={data.borderWidth}
        timing={data.timing}
        spring={data.spring}
        bounce={data.bounce}
      />
    </ToastErrorBoundary>
  )
}

function createGooeyToast(
  title: string,
  type: GooeyToastType,
  options?: GooeyToastOptions
) {
  const hasExpandedContent = Boolean(options?.description || options?.action)
  const baseDuration = options?.timing?.displayDuration ?? options?.duration ?? (options?.description ? DEFAULT_EXPANDED_DURATION : undefined)
  // Expanded toasts: Infinity duration, component controls dismiss (hover re-expand support)
  // Simple toasts: normal duration
  const duration = hasExpandedContent ? Infinity : baseDuration

  const toastId = options?.id ?? Math.random().toString(36).slice(2)

  return toast.custom(
    () => (
      <GooeyToastWrapper
        initialPhase={type}
        title={title}
        type={type}
        description={options?.description}
        action={options?.action}
        icon={options?.icon}
        classNames={options?.classNames}
        fillColor={options?.fillColor}
        borderColor={options?.borderColor}
        borderWidth={options?.borderWidth}
        timing={options?.timing}
        spring={options?.spring}
        bounce={options?.bounce}
        toastId={hasExpandedContent ? toastId : undefined}
      />
    ),
    {
      duration,
      id: toastId,
      onDismiss: options?.onDismiss,
      onAutoClose: options?.onAutoClose,
    }
  )
}

export const gooeyToast = Object.assign(
  (title: string, options?: GooeyToastOptions) =>
    createGooeyToast(title, 'default', options),
  {
    success: (title: string, options?: GooeyToastOptions) =>
      createGooeyToast(title, 'success', options),
    error: (title: string, options?: GooeyToastOptions) =>
      createGooeyToast(title, 'error', options),
    warning: (title: string, options?: GooeyToastOptions) =>
      createGooeyToast(title, 'warning', options),
    info: (title: string, options?: GooeyToastOptions) =>
      createGooeyToast(title, 'info', options),
    promise: <T,>(promise: Promise<T>, data: GooeyPromiseData<T>) => {
      const id = Math.random().toString(36).slice(2)
      return toast.custom(() => (
        <PromiseToastWrapper promise={promise} data={data} toastId={id} />
      ), {
        id,
        duration: (data.timing?.displayDuration != null || data.description) ? Infinity : undefined,
      })
    },
    loading: (title: string, options?: GooeyToastOptions) => {
      const id = options?.id ?? Math.random().toString(36).slice(2)
      toast.custom(
        () => (
          <GooeyToastWrapper
            initialPhase="loading"
            title={title}
            type="info"
            description={options?.description}
            action={options?.action}
            icon={options?.icon}
            classNames={options?.classNames}
            fillColor={options?.fillColor}
            borderColor={options?.borderColor}
            borderWidth={options?.borderWidth}
            timing={options?.timing}
            spring={options?.spring}
            bounce={options?.bounce}
            toastId={id}
          />
        ),
        { id, duration: Infinity }
      )
      return {
        dismiss: () => toast.dismiss(id),
        success: (newTitle: string, newOptions?: GooeyToastOptions) => {
          createGooeyToast(newTitle, 'success', { ...newOptions, id })
        },
        error: (newTitle: string, newOptions?: GooeyToastOptions) => {
          createGooeyToast(newTitle, 'error', { ...newOptions, id })
        },
      }
    },
    custom: (jsx: ReactNode, options?: { id?: string | number; duration?: number }) => {
      return toast.custom(() => <>{jsx}</>, options)
    },
    dismiss: toast.dismiss,
  }
)
