
import { useMemo } from 'react';

export type GradientType = {
  card: string;
  accent?: string;
};

// Array of gradient colors for cards
const cardGradients = [
  'from-white to-gray-50/10 dark:from-gray-900 dark:to-gray-900/20',
  'from-white to-blue-50/10 dark:from-gray-900 dark:to-blue-900/20',
  'from-white to-purple-50/10 dark:from-gray-900 dark:to-purple-900/20',
  'from-white to-green-50/10 dark:from-gray-900 dark:to-green-900/20',
  'from-white to-stone-50/10 dark:from-gray-900 dark:to-stone-900/20',
  'from-white to-neutral-50/10 dark:from-gray-900 dark:to-neutral-900/20',
  'from-white to-zinc-50/10 dark:from-gray-900 dark:to-zinc-900/20',
  'from-white to-trust-light/5 dark:from-gray-900 dark:to-trust-dark/20',
];

// Grid-specific card gradients (has different format)
const gridCardGradients = [
  'from-gray-50 via-white to-gray-100 dark:from-gray-950/30 dark:via-gray-900 dark:to-gray-900/20',
  'from-blue-50 via-white to-blue-100 dark:from-blue-950/30 dark:via-gray-900 dark:to-blue-900/20',
  'from-purple-50 via-white to-purple-100 dark:from-purple-950/30 dark:via-gray-900 dark:to-purple-900/20',
  'from-green-50 via-white to-green-100 dark:from-green-950/30 dark:via-gray-900 dark:to-green-900/20',
  'from-stone-50 via-white to-stone-100 dark:from-stone-950/30 dark:via-gray-900 dark:to-stone-900/20',
  'from-neutral-50 via-white to-neutral-100 dark:from-neutral-950/30 dark:via-gray-900 dark:to-neutral-900/20',
  'from-zinc-50 via-white to-zinc-100 dark:from-zinc-950/30 dark:via-gray-900 dark:to-zinc-900/20',
  'from-white via-white/90 to-white/80 dark:from-gray-950/30 dark:via-gray-900 dark:to-gray-900/20',
];

// Array of accent line gradients for grid cards
const accentGradients = [
  'from-gray-400 via-gray-500 to-gray-400',
  'from-blue-400 via-blue-500 to-blue-400',
  'from-purple-400 via-purple-500 to-purple-400',
  'from-green-400 via-green-500 to-green-400',
  'from-stone-400 via-stone-500 to-stone-400',
  'from-neutral-400 via-neutral-500 to-neutral-400',
  'from-trust-primary via-trust-secondary to-trust-accent',
];

/**
 * Generate a deterministic gradient based on a string input
 * @param input String to generate the gradient from (e.g. company name)
 * @param viewType The view type ('list' or 'grid')
 * @returns Gradient classes
 */
export const useGradient = (input: string, viewType: 'list' | 'grid' = 'list'): GradientType => {
  return useMemo(() => {
    // Generate deterministic but random-looking index based on input string
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      hash = input.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % cardGradients.length;
    
    if (viewType === 'grid') {
      return {
        card: gridCardGradients[index],
        accent: accentGradients[index]
      };
    }
    
    return {
      card: cardGradients[index]
    };
  }, [input, viewType]);
};
