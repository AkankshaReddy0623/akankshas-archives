interface ImagePlaceholderProps {
  width: number;
  height: number;
  category?: string;
}

/**
 * Generates a data URI SVG placeholder for use with next/image or as a src.
 * Shows category name, "PLACEHOLDER" label, and dimensions on a dark charcoal background.
 */
export function generatePlaceholderDataUri(
  width: number,
  height: number,
  category?: string
): string {
  const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="#191919"/>
    <rect x="1" y="1" width="${width - 2}" height="${height - 2}" fill="none" stroke="#333333" stroke-width="1"/>
    <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="${Math.max(14, Math.min(width, height) * 0.04)}" fill="#999999" letter-spacing="0.3em">${category ? category.toUpperCase() : 'IMAGE'}</text>
    <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="${Math.max(10, Math.min(width, height) * 0.025)}" fill="#666666" letter-spacing="0.2em">PLACEHOLDER</text>
    <text x="50%" y="63%" dominant-baseline="middle" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="${Math.max(9, Math.min(width, height) * 0.02)}" fill="#555555">${width} × ${height}</text>
  </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export default function ImagePlaceholder({
  width,
  height,
  category,
}: ImagePlaceholderProps) {
  const dataUri = generatePlaceholderDataUri(width, height, category);

  return (
    <img
      src={dataUri}
      alt={category ? `${category} placeholder` : 'Placeholder image'}
      width={width}
      height={height}
      className="block"
    />
  );
}
