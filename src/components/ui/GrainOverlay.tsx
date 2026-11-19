'use client';

/**
 * Authentic 35mm Analogue Film Grain & Darkroom Atmosphere
 *
 * Recreates the exact high-ISO 35mm analogue silver-halide film scan reference
 * provided by the artist (dense, organic, irregular particle distribution with
 * natural intensity variation on a deep obsidian #020202 base).
 *
 * - Isolated fixed background layer at z-0 strictly behind main content
 * - Uses a seamless, tileable 35mm film scan asset
 * - Pointer-events: none (cannot block clicks or touches)
 * - Zero content dimming or blurring
 * - Zero expensive animation loops
 */
export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* 1. Deep Obsidian #020202 Foundation with Whisper-Subtle Warmth */}
      <div
        className="absolute inset-0 bg-[#020202]"
        style={{
          background: `
            radial-gradient(ellipse 80% 40% at 50% 0%, rgba(232, 185, 35, 0.012) 0%, transparent 65%)
          `,
        }}
      />

      {/* 2. Restrained Authentic 35mm Silver Halide Film Grain (Subtle Analogue Feel) */}
      <div
        className="absolute inset-0 mix-blend-screen opacity-[0.11]"
        style={{
          backgroundImage: "url('/images/film-grain.webp')",
          backgroundRepeat: 'repeat',
          backgroundSize: '448px 448px',
        }}
      />
    </div>
  );
}
