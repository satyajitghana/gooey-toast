// Main toast API
export { toast } from './goey-toast';
export type { ToastAPI } from './goey-toast';

// Components
export { GoeyToaster, GoeyToast, ToastErrorBoundary } from './components';
export type { GoeyToasterProps, GoeyToastProps } from './components';

// Hooks
export { usePrefersReducedMotion } from './hooks';

// Types
export type {
  ToastVariant,
  ToastPosition,
  ToastPhase,
  AnimationPreset,
  AriaLive,
  ToastAction,
  ToastClassNames,
  SpringConfig,
  CustomAnimationConfig,
  ToastOptions,
  PromiseToastData,
  ToasterConfig,
  ToastReturn,
} from './types';

// Utilities
export { cn } from './lib/utils';
