'use client';

export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[45] overflow-hidden"
    >
      {/* 1. Primary Tactile Film Grain & Aged Paper Fibres Layer */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.085] mix-blend-screen"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="analog-grain-filter" x="0%" y="0%" width="100%" height="100%">
          {/* Fine film grain turbulence */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            stitchTiles="stitch"
            result="fineGrain"
          />
          {/* Subtle paper fibre organic mottling */}
          <feTurbulence
            type="turbulence"
            baseFrequency="0.04"
            numOctaves="2"
            result="paperFibres"
          />
          {/* Blend fine grain with organic paper fibres */}
          <feComposite
            in="fineGrain"
            in2="paperFibres"
            operator="arithmetic"
            k1="0.2"
            k2="0.6"
            k3="0.4"
            k4="0"
            result="compositeTexture"
          />
          <feColorMatrix
            in="compositeTexture"
            type="matrix"
            values="
              0.8 0 0 0 0
              0 0.8 0 0 0
              0 0 0.8 0 0
              0 0 0 1 0"
          />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#analog-grain-filter)"
        />
      </svg>

      {/* 2. Organic Luminance Variation & Atmospheric Darkroom Vignette */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, transparent 40%, rgba(2, 2, 2, 0.45) 85%, rgba(0, 0, 0, 0.75) 100%)',
        }}
      />
    </div>
  );
}
