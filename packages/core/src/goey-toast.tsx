import { toast as sonnerToast } from 'sonner';
import type {
  ToastAPI,
  ToastOptions,
  ToastReturn,
  PromiseToastData,
} from './types';

/**
 * Main toast function - shows a toast notification
 */
function toast(
  message: string | React.ReactNode,
  options?: ToastOptions
): ToastReturn {
  const {
    variant = 'default',
    data,
    spring,
    bounce,
    animationPreset,
    customAnimation,
    ariaLive,
    ariaLabel,
    dismissible,
    closeButton,
    pauseOnHover,
    onDismiss,
    onAction,
    fillColor,
    borderColor,
    borderWidth,
    classNames,
    ...sonnerOptions
  } = options || {};

  // For now, use basic Sonner toast
  // In future phases, we'll integrate custom rendering
  return sonnerToast(message, sonnerOptions);
}

/**
 * Show a success toast
 */
toast.success = function (
  message: string | React.ReactNode,
  options?: Omit<ToastOptions, 'variant'>
): ToastReturn {
  return toast(message, { ...options, variant: 'success' });
};

/**
 * Show an error toast
 */
toast.error = function (
  message: string | React.ReactNode,
  options?: Omit<ToastOptions, 'variant'>
): ToastReturn {
  return toast(message, { ...options, variant: 'error' });
};

/**
 * Show a warning toast
 */
toast.warning = function (
  message: string | React.ReactNode,
  options?: Omit<ToastOptions, 'variant'>
): ToastReturn {
  return toast(message, { ...options, variant: 'warning' });
};

/**
 * Show an info toast
 */
toast.info = function (
  message: string | React.ReactNode,
  options?: Omit<ToastOptions, 'variant'>
): ToastReturn {
  return toast(message, { ...options, variant: 'info' });
};

/**
 * Show a loading toast
 */
toast.loading = function (
  message: string | React.ReactNode,
  options?: Omit<ToastOptions, 'variant'>
): ToastReturn {
  const {
    data,
    spring,
    bounce,
    animationPreset,
    customAnimation,
    ariaLive,
    ariaLabel,
    dismissible,
    closeButton,
    pauseOnHover,
    onDismiss,
    onAction,
    fillColor,
    borderColor,
    borderWidth,
    classNames,
    ...sonnerOptions
  } = options || {};

  return sonnerToast.loading(message, {
    ...sonnerOptions,
    duration: Infinity,
  });
};

/**
 * Show a promise-based toast that updates based on promise state
 */
toast.promise = function <T, TData = unknown>(
  promise: Promise<T> | (() => Promise<T>),
  data: PromiseToastData<T, TData>
): Promise<T> {
  const promiseInstance = typeof promise === 'function' ? promise() : promise;

  // Use Sonner's promise method directly
  sonnerToast.promise(promiseInstance, {
    loading: data.loading as string,
    success: (result: T) => {
      if (typeof data.success === 'function') {
        return data.success(result) as string;
      }
      return data.success as string;
    },
    error: (error: unknown) => {
      if (typeof data.error === 'function') {
        return data.error(error) as string;
      }
      return data.error as string;
    },
  });

  return promiseInstance;
};

/**
 * Dismiss a specific toast by ID or all toasts
 */
toast.dismiss = function (id?: string | number): void {
  if (id !== undefined) {
    sonnerToast.dismiss(id);
  }
};

/**
 * Dismiss all toasts
 */
toast.dismissAll = function (): void {
  sonnerToast.dismiss();
};

/**
 * Update an existing toast
 */
toast.update = function (
  id: string | number,
  options: Partial<ToastOptions>
): void {
  const {
    variant,
    data,
    spring,
    bounce,
    animationPreset,
    customAnimation,
    ariaLive,
    ariaLabel,
    dismissible,
    closeButton,
    pauseOnHover,
    onDismiss,
    onAction,
    fillColor,
    borderColor,
    borderWidth,
    classNames,
    ...sonnerOptions
  } = options;

  sonnerToast(sonnerOptions.title || '', {
    id,
    ...sonnerOptions,
  });
};

// Export as typed API
export { toast };
export type { ToastAPI };
