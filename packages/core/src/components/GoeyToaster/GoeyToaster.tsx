import React from 'react';
import { Toaster } from 'sonner';
import type { ToasterConfig } from '../../types';

export interface GoeyToasterProps extends ToasterConfig {
  /**
   * Additional class name
   */
  className?: string;
}

/**
 * GoeyToaster - Container component for toast notifications
 * Wraps Sonner's Toaster with custom configuration
 */
export function GoeyToaster({
  position = 'bottom-right',
  maxToasts = 3,
  gap = 8,
  duration = 4000,
  theme = 'system',
  expand = false,
  offset = 16,
  richColors = false,
  closeOnPageNavigate = false,
  zIndex = 9999,
  className,
}: GoeyToasterProps) {
  return (
    <Toaster
      position={position}
      toastOptions={{
        duration,
        className,
      }}
      expand={expand}
      richColors={richColors}
      closeButton={false}
      theme={theme}
      offset={offset}
      visibleToasts={maxToasts}
      gap={gap}
      style={{ zIndex }}
      // Use unstyled mode for complete custom styling
      unstyled={false}
    />
  );
}
