import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { usePrefersReducedMotion } from '../../hooks';
import {
  SuccessIcon,
  ErrorIcon,
  WarningIcon,
  InfoIcon,
  SpinnerIcon,
  DefaultIcon,
} from '../icons';
import { ToastErrorBoundary } from '../ToastErrorBoundary';
import { morphPath, morphPathCenter } from '../../lib/morphing';
import {
  springPresets,
  calculateSpring,
  getEntranceVariants,
  actionVariants,
} from '../../lib/animations';
import type {
  ToastVariant,
  ToastPosition,
  ToastAction,
  ToastClassNames,
  AnimationPreset,
} from '../../types';

export interface GoeyToastProps {
  /**
   * Unique toast identifier
   */
  id: string | number;

  /**
   * Toast variant
   */
  variant?: ToastVariant;

  /**
   * Main toast message
   */
  title?: string | React.ReactNode;

  /**
   * Optional description
   */
  description?: string | React.ReactNode;

  /**
   * Custom icon (overrides variant icon)
   */
  icon?: React.ReactNode;

  /**
   * Action button configuration
   */
  action?: ToastAction;

  /**
   * Position on screen
   */
  position?: ToastPosition;

  /**
   * Enable spring animations
   */
  spring?: boolean;

  /**
   * Bounce intensity (0.05-0.8)
   */
  bounce?: number;

  /**
   * Animation preset
   */
  animationPreset?: AnimationPreset;

  /**
   * Custom class names
   */
  classNames?: ToastClassNames;

  /**
   * Whether toast is visible
   */
  visible?: boolean;

  /**
   * Loading state
   */
  loading?: boolean;
}

/**
 * Get the appropriate icon for a toast variant
 */
function getVariantIcon(variant: ToastVariant = 'default', loading?: boolean) {
  if (loading) {
    return <SpinnerIcon className="gooey-toast-icon" />;
  }

  switch (variant) {
    case 'success':
      return <SuccessIcon className="gooey-toast-icon" />;
    case 'error':
      return <ErrorIcon className="gooey-toast-icon" />;
    case 'warning':
      return <WarningIcon className="gooey-toast-icon" />;
    case 'info':
      return <InfoIcon className="gooey-toast-icon" />;
    default:
      return <DefaultIcon className="gooey-toast-icon" />;
  }
}

/**
 * Get variant-specific color classes
 */
function getVariantClasses(variant: ToastVariant = 'default'): string {
  const baseClasses = 'gooey-toast-wrapper';

  return cn(baseClasses, `gooey-toast-${variant}`);
}

/**
 * Main GoeyToast component
 * Renders an individual toast notification with blob morphing animation
 */
export const GoeyToast = React.memo<GoeyToastProps>(
  ({
    id,
    variant = 'default',
    title,
    description,
    icon,
    action,
    position = 'bottom-right',
    spring = true,
    bounce = 0.4,
    animationPreset = 'default',
    classNames,
    visible = true,
    loading,
  }) => {
    const prefersReducedMotion = usePrefersReducedMotion();

    // Get animation configuration
    const springConfig = useMemo(() => {
      if (prefersReducedMotion || !spring) {
        return { duration: 0.2 };
      }

      if (animationPreset && springPresets[animationPreset]) {
        return springPresets[animationPreset];
      }

      return calculateSpring(bounce);
    }, [prefersReducedMotion, spring, animationPreset, bounce]);

    // Get entrance/exit variants
    const entranceVariants = useMemo(
      () => getEntranceVariants(position),
      [position]
    );

    // Determine if position is on the left
    const isLeft = position.includes('left');
    const isCenter = position.includes('center');

    // Simplified blob morphing for now (we'll enhance this in Phase 4)
    const blobPath = useMemo(() => {
      const width = 300;
      const height = 64;
      const morphT = visible ? 0.2 : 0; // Slight morph when visible

      return isCenter
        ? morphPathCenter(width, height, morphT)
        : morphPath(width, height, morphT, isLeft);
    }, [visible, isCenter, isLeft]);

    // Get the icon to display
    const displayIcon = icon || getVariantIcon(variant, loading);

    // Variant classes
    const wrapperClasses = cn(
      getVariantClasses(variant),
      classNames?.wrapper
    );

    return (
      <ToastErrorBoundary>
        <AnimatePresence mode="wait">
          {visible && (
            <motion.div
              key={id}
              className={wrapperClasses}
              variants={entranceVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={springConfig}
              role={variant === 'error' ? 'alert' : 'status'}
              aria-live={variant === 'error' ? 'assertive' : 'polite'}
              aria-atomic="true"
            >
              {/* SVG blob background */}
              <svg
                className={cn('gooey-toast-blob', classNames?.blob)}
                viewBox="0 0 300 64"
                preserveAspectRatio="none"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                }}
                aria-hidden="true"
              >
                <motion.path
                  d={blobPath}
                  fill="currentColor"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                />
              </svg>

              {/* Toast content */}
              <div className={cn('gooey-toast-content', classNames?.content)}>
                {/* Icon */}
                {displayIcon && (
                  <div className={cn('gooey-toast-icon', classNames?.icon)}>
                    {displayIcon}
                  </div>
                )}

                {/* Text content */}
                <div className={cn('gooey-toast-text', classNames?.text)}>
                  {title && (
                    <div className={cn('gooey-toast-title', classNames?.title)}>
                      {title}
                    </div>
                  )}
                  {description && (
                    <div
                      className={cn(
                        'gooey-toast-description',
                        classNames?.description
                      )}
                    >
                      {description}
                    </div>
                  )}
                </div>

                {/* Action button */}
                {action && (
                  <motion.button
                    className={cn('gooey-toast-action', classNames?.action)}
                    onClick={action.onClick}
                    variants={actionVariants}
                    initial="initial"
                    animate="animate"
                    whileTap="tap"
                    aria-label={action.altText || action.label}
                  >
                    {action.label}
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </ToastErrorBoundary>
    );
  }
);

GoeyToast.displayName = 'GoeyToast';
