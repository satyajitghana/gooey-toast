import type { SpringConfig, AnimationPreset } from '../../types';

/**
 * Spring animation presets for different animation styles
 */
export const springPresets: Record<AnimationPreset, SpringConfig> = {
  default: {
    type: 'spring',
    stiffness: 260,
    damping: 20,
  },
  gentle: {
    type: 'spring',
    stiffness: 120,
    damping: 14,
  },
  energetic: {
    type: 'spring',
    stiffness: 400,
    damping: 30,
  },
  minimal: {
    type: 'spring',
    stiffness: 200,
    damping: 25,
    mass: 1,
  },
};

/**
 * Calculate spring configuration based on bounce intensity
 * @param bounce - Bounce intensity (0.05-0.8)
 * @returns Spring configuration
 */
export function calculateSpring(bounce: number = 0.4): SpringConfig {
  // Clamp bounce value
  const clampedBounce = Math.max(0.05, Math.min(0.8, bounce));

  // Map bounce to stiffness (200-550)
  const stiffness = 200 + clampedBounce * 437.5;

  // Map bounce to damping (24-8) - lower damping = more bounce
  const damping = 24 - clampedBounce * 20;

  return {
    type: 'spring',
    stiffness: Math.round(stiffness),
    damping: Math.round(damping),
  };
}

/**
 * Get spring configuration for squish effect
 * Used for the landing squish when toast appears
 */
export function getSquishSpring(bounce: number = 0.4): SpringConfig {
  const config = calculateSpring(bounce);

  return {
    ...config,
    stiffness: config.stiffness * 1.2, // Slightly stiffer for squish
    damping: config.damping * 0.8, // Less damping for more bounce
  };
}
