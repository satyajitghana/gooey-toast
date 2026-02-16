import type { Variants } from 'framer-motion';
import type { ToastPosition } from '../../types';

/**
 * Get entrance animation variants based on position
 * @param position - Toast position on screen
 * @returns Framer Motion variants
 */
export function getEntranceVariants(position: ToastPosition): Variants {
  const isTop = position.startsWith('top');
  const isLeft = position.includes('left');
  const isRight = position.includes('right');

  return {
    initial: {
      opacity: 0,
      y: isTop ? -20 : 20,
      x: isLeft ? -20 : isRight ? 20 : 0,
      scale: 0.9,
    },
    animate: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      y: isTop ? -10 : 10,
      x: isLeft ? -10 : isRight ? 10 : 0,
      scale: 0.95,
    },
  };
}

/**
 * Blob morph animation variants
 */
export const morphVariants: Variants = {
  pill: {
    scale: 1,
  },
  blob: {
    scale: 1.02,
  },
};

/**
 * Squish effect variants for interactive feedback
 */
export const squishVariants: Variants = {
  idle: {
    scaleY: 1,
  },
  squish: {
    scaleY: 0.95,
  },
};

/**
 * Hover interaction variants
 */
export const hoverVariants: Variants = {
  idle: {
    scale: 1,
  },
  hover: {
    scale: 1.02,
  },
};

/**
 * Action button variants
 */
export const actionVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  tap: {
    scale: 0.95,
  },
};
