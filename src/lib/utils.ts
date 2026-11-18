import { categories } from '@/data/categories';
import type { Category } from '@/data/categories';

/**
 * Merge class names, filtering out falsy values.
 * A lightweight alternative to clsx / classnames.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Generate a data-URI SVG placeholder image.
 * Useful as a fallback `src` while real images load.
 */
export function generatePlaceholderUrl(
  width: number,
  height: number,
  text: string = `${width}×${height}`,
  bg: string = '#191919',
  fg: string = '#999999',
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="100%" height="100%" fill="${bg}" />
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
      font-family="system-ui, sans-serif" font-size="${Math.round(Math.min(width, height) * 0.06)}"
      fill="${fg}">${text}</text>
  </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/**
 * Look up a category by its URL slug.
 * Returns `undefined` when no match is found.
 */
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

/**
 * Build the public image path for a given category and filename.
 *
 * @example formatImagePath('portraits', '01.jpg')
 *          // → '/images/photography/portraits/01.jpg'
 */
export function formatImagePath(category: string, filename: string): string {
  return `/images/photography/${category}/${filename}`;
}
