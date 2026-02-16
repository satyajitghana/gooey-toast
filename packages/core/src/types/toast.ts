import type { ReactNode } from 'react';

/**
 * Toast variant types
 */
export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

/**
 * Toast position on screen
 */
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

/**
 * Toast phase for promise-based toasts
 */
export type ToastPhase =
  | 'loading'
  | 'default'
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

/**
 * Animation preset options
 */
export type AnimationPreset = 'default' | 'gentle' | 'energetic' | 'minimal';

/**
 * ARIA live region politeness
 */
export type AriaLive = 'polite' | 'assertive' | 'off';

/**
 * Action button configuration
 */
export interface ToastAction {
  /**
   * Label displayed on the action button
   */
  label: string;

  /**
   * Callback function when action is clicked
   */
  onClick: () => void | Promise<void>;

  /**
   * Optional label shown after successful action completion
   */
  successLabel?: string;

  /**
   * Alt text for accessibility
   */
  altText?: string;
}

/**
 * Custom class names for styling override
 */
export interface ToastClassNames {
  wrapper?: string;
  blob?: string;
  content?: string;
  icon?: string;
  text?: string;
  title?: string;
  description?: string;
  action?: string;
}

/**
 * Spring animation configuration
 */
export interface SpringConfig {
  type: 'spring';
  stiffness: number;
  damping: number;
  mass?: number;
}

/**
 * Custom animation configuration
 */
export interface CustomAnimationConfig {
  duration?: number;
  spring?: Partial<SpringConfig>;
  morphDuration?: number;
}

/**
 * Core toast options (generic for custom data)
 */
export interface ToastOptions<TData = unknown> {
  /**
   * Toast variant (determines icon and color scheme)
   */
  variant?: ToastVariant;

  /**
   * Main message title
   */
  title?: string | ReactNode;

  /**
   * Optional description text
   */
  description?: string | ReactNode;

  /**
   * Custom icon component (overrides variant icon)
   */
  icon?: ReactNode;

  /**
   * Action button configuration
   */
  action?: ToastAction;

  /**
   * Duration in milliseconds (Infinity for persistent)
   * @default 4000
   */
  duration?: number;

  /**
   * Position on screen
   * @default 'bottom-right'
   */
  position?: ToastPosition;

  /**
   * Custom fill color for blob background
   */
  fillColor?: string;

  /**
   * Custom border color
   */
  borderColor?: string;

  /**
   * Border width in pixels
   * @default 1
   */
  borderWidth?: number;

  /**
   * Enable spring animations
   * @default true
   */
  spring?: boolean;

  /**
   * Bounce intensity (0.05-0.8)
   * @default 0.4
   */
  bounce?: number;

  /**
   * Animation preset
   * @default 'default'
   */
  animationPreset?: AnimationPreset;

  /**
   * Custom animation configuration
   */
  customAnimation?: CustomAnimationConfig;

  /**
   * Custom class names
   */
  classNames?: ToastClassNames;

  /**
   * ARIA live region politeness
   * @default 'polite'
   */
  ariaLive?: AriaLive;

  /**
   * Custom ARIA label
   */
  ariaLabel?: string;

  /**
   * Whether toast can be dismissed by user
   * @default true
   */
  dismissible?: boolean;

  /**
   * Show close button
   * @default false
   */
  closeButton?: boolean;

  /**
   * Pause timer on hover
   * @default true
   */
  pauseOnHover?: boolean;

  /**
   * Custom data attached to toast
   */
  data?: TData;

  /**
   * Callback when toast is dismissed
   */
  onDismiss?: (id: string | number) => void;

  /**
   * Callback when action is triggered
   */
  onAction?: () => void;

  /**
   * Unique identifier (auto-generated if not provided)
   */
  id?: string | number;
}

/**
 * Promise toast data configuration
 */
export interface PromiseToastData<T, TData = unknown> {
  /**
   * Message shown during loading state
   */
  loading: string | ReactNode;

  /**
   * Message shown on success
   */
  success: string | ReactNode | ((data: T) => string | ReactNode);

  /**
   * Message shown on error
   */
  error: string | ReactNode | ((error: unknown) => string | ReactNode);

  /**
   * Optional descriptions for each state
   */
  description?: {
    loading?: string | ReactNode;
    success?: string | ReactNode | ((data: T) => string | ReactNode);
    error?: string | ReactNode | ((error: unknown) => string | ReactNode);
  };

  /**
   * Additional toast options
   */
  options?: Omit<ToastOptions<TData>, 'variant'>;
}

/**
 * Toast configuration for Toaster component
 */
export interface ToasterConfig {
  /**
   * Default position for all toasts
   * @default 'bottom-right'
   */
  position?: ToastPosition;

  /**
   * Maximum number of toasts to show
   * @default 3
   */
  maxToasts?: number;

  /**
   * Gap between toasts in pixels
   * @default 8
   */
  gap?: number;

  /**
   * Default duration in milliseconds
   * @default 4000
   */
  duration?: number;

  /**
   * Enable spring animations globally
   * @default true
   */
  spring?: boolean;

  /**
   * Default bounce intensity
   * @default 0.4
   */
  bounce?: number;

  /**
   * Theme mode
   * @default 'system'
   */
  theme?: 'light' | 'dark' | 'system';

  /**
   * Expand toasts by default
   * @default false
   */
  expand?: boolean;

  /**
   * Offset from viewport edges in pixels
   * @default 16
   */
  offset?: number;

  /**
   * Rich colors for variants
   * @default false
   */
  richColors?: boolean;

  /**
   * Close toasts on navigation
   * @default false
   */
  closeOnPageNavigate?: boolean;

  /**
   * Z-index for toast container
   * @default 9999
   */
  zIndex?: number;
}

/**
 * Internal toast data (extends Sonner's toast data)
 */
export interface InternalToastData extends ToastOptions {
  id: string | number;
  phase?: ToastPhase;
  promise?: Promise<unknown>;
  createdAt: number;
}

/**
 * Toast API return type
 */
export type ToastReturn = string | number;

/**
 * Toast API
 */
export interface ToastAPI {
  /**
   * Show a toast notification
   */
  (message: string | ReactNode, options?: ToastOptions): ToastReturn;

  /**
   * Show a success toast
   */
  success(message: string | ReactNode, options?: Omit<ToastOptions, 'variant'>): ToastReturn;

  /**
   * Show an error toast
   */
  error(message: string | ReactNode, options?: Omit<ToastOptions, 'variant'>): ToastReturn;

  /**
   * Show a warning toast
   */
  warning(message: string | ReactNode, options?: Omit<ToastOptions, 'variant'>): ToastReturn;

  /**
   * Show an info toast
   */
  info(message: string | ReactNode, options?: Omit<ToastOptions, 'variant'>): ToastReturn;

  /**
   * Show a loading toast
   */
  loading(message: string | ReactNode, options?: Omit<ToastOptions, 'variant'>): ToastReturn;

  /**
   * Show a promise-based toast
   */
  promise<T, TData = unknown>(
    promise: Promise<T> | (() => Promise<T>),
    data: PromiseToastData<T, TData>
  ): Promise<T>;

  /**
   * Dismiss a toast by ID
   */
  dismiss(id?: string | number): void;

  /**
   * Update an existing toast
   */
  update(id: string | number, options: Partial<ToastOptions>): void;

  /**
   * Dismiss all toasts
   */
  dismissAll(): void;
}
