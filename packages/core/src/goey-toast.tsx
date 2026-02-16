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
  const { variant = 'default', ...restOptions } = options || {};

  return sonnerToast(message, {
    ...restOptions,
    // Pass variant as data for custom rendering
    data: {
      ...restOptions.data,
      variant,
    },
  });
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
  return toast(message, {
    ...options,
    variant: 'default',
    duration: Infinity, // Loading toasts don't auto-dismiss
    data: {
      ...options?.data,
      phase: 'loading',
    },
  });
};

/**
 * Show a promise-based toast that updates based on promise state
 */
toast.promise = async function <T, TData = unknown>(
  promise: Promise<T> | (() => Promise<T>),
  data: PromiseToastData<T, TData>
): Promise<T> {
  const promiseInstance = typeof promise === 'function' ? promise() : promise;

  return sonnerToast.promise(promiseInstance, {
    loading: data.loading,
    success: (result: T) => {
      if (typeof data.success === 'function') {
        return data.success(result);
      }
      return data.success;
    },
    error: (error: unknown) => {
      if (typeof data.error === 'function') {
        return data.error(error);
      }
      return data.error;
    },
    description: data.description
      ? {
          loading: data.description.loading,
          success:
            typeof data.description.success === 'function'
              ? (result: T) => data.description!.success!(result as T)
              : data.description.success,
          error:
            typeof data.description.error === 'function'
              ? (error: unknown) => data.description!.error!(error)
              : data.description.error,
        }
      : undefined,
    ...data.options,
  }) as Promise<T>;
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
  const { variant, ...restOptions } = options;

  sonnerToast(restOptions.title || '', {
    id,
    ...restOptions,
    data: {
      ...restOptions.data,
      variant: variant || undefined,
    },
  });
};

// Export as typed API
export { toast };
export type { ToastAPI };
