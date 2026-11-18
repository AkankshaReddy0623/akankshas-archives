'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/data/site';

// Dynamically import Three.js 3D WebGL scene (client-only, lazy-loaded)
const HeroScene3D = dynamic(() => import('./HeroScene3D'), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  const portraitRef = useRef<HTMLDivElement>(null);

  // Subtle interactive pointer parallax for the foreground cut-out portrait (Zero React re-renders)
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReduced) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animId: number;

    const handlePointer = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 10;
      targetY = (e.clientY / window.innerHeight - 0.5) * 6;
    };

    const loop = () => {
      animId = requestAnimationFrame(loop);
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      if (portraitRef.current) {
        portraitRef.current.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      }
    };

    window.addEventListener('mousemove', handlePointer, { passive: true });
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handlePointer);
    };
  }, []);

  return (
    <section className="relative w-full bg-[#020202] pt-20 sm:pt-24 lg:pt-26 pb-6 sm:pb-8 flex flex-col justify-start">
      {/* Three.js Interactive 3D WebGL Canvas Layer (z-0) */}
      <HeroScene3D />

      {/* ======================================================== */}
      {/* PART A: VISUAL COMPOSITION                               */}
      {/* ======================================================== */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 flex flex-col">
        {/* 1. Top Hero Metadata Bar — Clear of floating navbar with reserved space */}
        <div className="relative w-full flex flex-wrap items-center justify-between gap-y-1.5 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-[#A0A0A0]/80 pb-2 sm:pb-3">
          {/* Left: Archives Label */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#E8B923] animate-pulse" />
            <span className="text-[#F0F0F0]/90">AKANKSHA&apos;S ARCHIVES</span>
          </motion.div>

          {/* Center: Location Header (Centered on desktop, inline on mobile) */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="md:absolute md:left-1/2 md:-translate-x-1/2 text-center text-[#A0A0A0]/90 tracking-[0.25em]"
          >
            <span>HYDERABAD, INDIA</span>
          </motion.div>

          {/* Right: Exact Unabbreviated Offerings Marker */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-1.5 text-[#E8B923]"
          >
            <span>PHOTOGRAPHY &amp; VIDEOGRAPHY</span>
          </motion.div>
        </div>

        {/* 2. Visual Artwork Stage: Controlled Diagonal Typography Trail + Foreground Portrait */}
        <div className="relative w-full flex items-end justify-center h-[220px] xs:h-[250px] sm:h-[280px] md:h-[310px] lg:h-[340px] xl:h-[360px] overflow-hidden">
          {/* Five-Layer Balanced Symmetrical Diagonal Typography Stack (z-10) */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden z-10"
            aria-hidden="true"
          >
            {/* Layer 5: Outlined Echo (Left — Symmetrically Extended Outwards) */}
            <div
              className="absolute text-[17vw] xs:text-[15.5vw] sm:text-[13.5vw] md:text-[12vw] lg:text-[10vw] xl:text-[9vw] font-black uppercase tracking-[-0.03em] leading-none whitespace-nowrap text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.10)] -translate-x-12 sm:-translate-x-18 md:-translate-x-24 lg:-translate-x-28 translate-y-7 sm:translate-y-10 md:translate-y-12 lg:translate-y-14 z-[1]"
            >
              PORTFOLIO
            </div>

            {/* Layer 4: Outlined Echo (Right — Symmetrically Extended Outwards) */}
            <div
              className="absolute text-[17vw] xs:text-[15.5vw] sm:text-[13.5vw] md:text-[12vw] lg:text-[10vw] xl:text-[9vw] font-black uppercase tracking-[-0.03em] leading-none whitespace-nowrap text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.10)] translate-x-12 sm:translate-x-18 md:translate-x-24 lg:translate-x-28 -translate-y-7 sm:-translate-y-10 md:-translate-y-12 lg:-translate-y-14 z-[2]"
            >
              PORTFOLIO
            </div>

            {/* Layer 3: Secondary Solid Echo (Left — Symmetrically Positioned to the Left) */}
            <div
              className="absolute text-[17vw] xs:text-[15.5vw] sm:text-[13.5vw] md:text-[12vw] lg:text-[10vw] xl:text-[9vw] font-black uppercase tracking-[-0.03em] leading-none whitespace-nowrap text-white/[0.14] -translate-x-6 sm:-translate-x-9 md:-translate-x-12 lg:-translate-x-14 translate-y-3.5 sm:translate-y-5 md:translate-y-6 lg:translate-y-7 z-[3]"
            >
              PORTFOLIO
            </div>

            {/* Layer 2: Secondary Solid Echo (Right — Symmetrically Positioned to the Right) */}
            <div
              className="absolute text-[17vw] xs:text-[15.5vw] sm:text-[13.5vw] md:text-[12vw] lg:text-[10vw] xl:text-[9vw] font-black uppercase tracking-[-0.03em] leading-none whitespace-nowrap text-white/[0.14] translate-x-6 sm:translate-x-9 md:translate-x-12 lg:translate-x-14 -translate-y-3.5 sm:-translate-y-5 md:-translate-y-6 lg:-translate-y-7 z-[4]"
            >
              PORTFOLIO
            </div>

            {/* Layer 1: Main Typography Anchor (Center — Prominent, Crisp Off-White) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center translate-x-0 translate-y-0 z-[5]"
            >
              {/* Golden Tactile Underlay Plate */}
              <div className="absolute text-[17vw] xs:text-[15.5vw] sm:text-[13.5vw] md:text-[12vw] lg:text-[10vw] xl:text-[9vw] font-black uppercase tracking-[-0.03em] leading-none whitespace-nowrap text-transparent [-webkit-text-stroke:1px_rgba(232,185,35,0.22)] translate-y-[2px] opacity-75">
                PORTFOLIO
              </div>

              {/* Dominant Bright Off-White Word */}
              <div className="text-[17vw] xs:text-[15.5vw] sm:text-[13.5vw] md:text-[12vw] lg:text-[10vw] xl:text-[9vw] font-black uppercase tracking-[-0.03em] leading-none whitespace-nowrap text-[#F0F0F0] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
                PORTFOLIO
              </div>
            </motion.div>
          </div>

          {/* Foreground Cut-Out Photographic Portrait — Isolated & Naturally Overlapping (z-20) */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 mx-auto flex items-end justify-center pointer-events-none"
          >
            <div
              ref={portraitRef}
              className="relative flex items-end justify-center will-change-transform"
            >
              {/* Subtle Ambient Backlight Glow directly behind subject silhouette */}
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[220px] w-[220px] xs:h-[250px] xs:w-[250px] sm:h-[300px] sm:w-[300px] md:h-[350px] md:w-[350px] rounded-full bg-radial from-[#E8B923]/12 via-transparent to-transparent blur-3xl opacity-60 pointer-events-none -z-10"
              />

              {/* Truly Isolated Cut-Out Portrait with Silhouette Drop-Shadow & Bottom Dissolve Mask */}
              <div className="relative w-[145px] xs:w-[165px] sm:w-[195px] md:w-[225px] lg:w-[250px] xl:w-[270px] aspect-[1177/2015] [mask-image:linear-gradient(to_bottom,black_82%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_82%,transparent_100%)]">
                <Image
                  src="/images/hero/portrait.webp"
                  alt="Akanksha Reddy — Portrait"
                  fill
                  priority
                  sizes="(max-width: 640px) 165px, (max-width: 768px) 195px, (max-width: 1024px) 225px, 270px"
                  className="object-contain object-bottom filter contrast-[1.04] drop-shadow-[0_16px_28px_rgba(0,0,0,0.92)]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* PART B: IDENTITY AND ACTIONS                              */}
      {/* ======================================================== */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 pt-3 sm:pt-4">
        <div className="border-t border-white/10 pt-3 sm:pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4 lg:gap-8">
          {/* LEFT: Complete Identity Block (Name, Smaller Golden Tagline, Subtitle) */}
          <div className="flex flex-col space-y-1">
            <motion.h1
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-light tracking-tight text-[#F0F0F0] uppercase leading-none"
            >
              {siteConfig.name}
            </motion.h1>

            {/* Smaller, Refined Golden Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="font-serif italic text-xs sm:text-sm md:text-base text-[#E8B923] font-light leading-snug"
            >
              &ldquo;{siteConfig.tagline}&rdquo;
            </motion.p>

            {/* Supporting Line */}
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="text-[9px] sm:text-[10px] md:text-[11px] text-[#A0A0A0] tracking-wider uppercase font-light pt-0.5"
            >
              {siteConfig.subtitle}
            </motion.p>
          </div>

          {/* RIGHT: Both CTA Buttons (Horizontally aligned, vertically centered to identity block) */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="flex items-center gap-2.5 sm:gap-3 shrink-0 pt-1 md:pt-0"
          >
            {/* Primary CTA: Yellow/Gold Default, Smoothly Turns White on Hover */}
            <Link
              href="#portfolio"
              className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#E8B923] text-[#020202] text-[11px] sm:text-xs uppercase tracking-[0.16em] font-semibold hover:bg-[#F0F0F0] transition-colors duration-200 shadow-xl shadow-[#E8B923]/20 hover:shadow-white/20"
            >
              <span>Explore my portfolio</span>
              <ArrowDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
            </Link>

            {/* Secondary CTA: Refined Glass Border */}
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-[#F0F0F0] text-[11px] sm:text-xs uppercase tracking-[0.16em] font-medium hover:border-[#E8B923] hover:text-[#E8B923] transition-colors duration-200"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
