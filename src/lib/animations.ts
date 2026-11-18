import type { Variants, Transition } from 'motion/react';

// ---------------------------------------------------------------------------
// Centralized Motion Tokens (Charles UX & Animation System)
// ---------------------------------------------------------------------------

export const motionTokens = {
  // Durations (in seconds)
  instant: 0,
  micro: 0.12,      // Micro-interactions (toggle, active state)
  fast: 0.18,       // Hover, press feedback, color shifts
  standard: 0.24,   // Buttons, dropdowns, small overlays
  medium: 0.32,     // Page transitions, modal reveals, drawers
  spatial: 0.38,    // Layout shifts, cards, accordion reveals
  reveal: 0.48,     // Hero entrances, section reveals

  // Easing Curves (Cubic Bezier arrays)
  easeOut: [0.32, 0.72, 0, 1] as const,     // Entrances, reveals, arrivals
  easeIn: [0.55, 0, 1, 0.45] as const,      // Exits, dismissals
  easeInOut: [0.77, 0, 0.175, 1] as const,  // Spatial reordering, bidirectional
  gentle: [0.16, 1, 0.3, 1] as const,       // Smooth cinematic settling

  // Spring Configurations
  springSnappy: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 32,
    mass: 0.8,
  },
  springSmooth: {
    type: 'spring' as const,
    stiffness: 260,
    damping: 26,
    mass: 1,
  },
  springGentle: {
    type: 'spring' as const,
    stiffness: 120,
    damping: 20,
    mass: 1,
  },
};

// ---------------------------------------------------------------------------
// Transition Presets
// ---------------------------------------------------------------------------

export const transitionFast: Transition = {
  duration: motionTokens.fast,
  ease: motionTokens.easeOut,
};

export const transitionStandard: Transition = {
  duration: motionTokens.standard,
  ease: motionTokens.easeOut,
};

export const transitionMedium: Transition = {
  duration: motionTokens.medium,
  ease: motionTokens.gentle,
};

export const transitionPage: Transition = {
  duration: motionTokens.medium,
  ease: motionTokens.gentle,
};

// ---------------------------------------------------------------------------
// Reduced-Motion Helper
// ---------------------------------------------------------------------------

/**
 * Returns `true` when the user prefers reduced motion.
 * Safe to call server-side (returns `false`).
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Wraps a variant set so that when reduced motion is preferred the `animate`
 * state snaps to the final values with zero transition or minimal opacity-only.
 */
function withReducedMotion(variants: Variants): Variants {
  return {
    ...variants,
    initial: {
      ...(typeof variants.initial === 'object' ? variants.initial : {}),
      y: 0,
      x: 0,
      scale: 1,
    },
    animate: {
      ...(typeof variants.animate === 'object' ? variants.animate : {}),
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.01,
      },
    },
    exit: {
      ...(typeof variants.exit === 'object' ? variants.exit : {}),
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.01,
      },
    },
  };
}

export function safeVariants(variants: Variants): Variants {
  return prefersReducedMotion() ? withReducedMotion(variants) : variants;
}

// ---------------------------------------------------------------------------
// Standard Component Variants
// ---------------------------------------------------------------------------

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: transitionStandard },
  exit: { opacity: 0, transition: { duration: motionTokens.fast, ease: motionTokens.easeIn } },
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: transitionMedium },
  exit: { opacity: 0, y: -8, transition: { duration: motionTokens.fast, ease: motionTokens.easeIn } },
};

export const fadeInScale: Variants = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1, transition: transitionMedium },
  exit: { opacity: 0, scale: 0.98, transition: { duration: motionTokens.fast, ease: motionTokens.easeIn } },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

// ---------------------------------------------------------------------------
// Viewport / Scroll-Trigger Settings
// ---------------------------------------------------------------------------

export const defaultViewport = {
  once: true,
  margin: '-60px',
} as const;

export const eagerViewport = {
  once: true,
  margin: '-30px',
} as const;
