'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Play, Film } from 'lucide-react';
import { categories } from '@/data/categories';
import GlowingShadow from '@/components/ui/glowing-shadow';
import { StackingCardsContainer, StackingCard } from '@/components/ui/stacking-cards';

/**
 * DesktopTiltCard — Subtle 3D Pointer Tilt Card with Spring Physics
 * Preserves the exact category thumbnail gradient placeholders, typography, and badges.
 */
function DesktopTiltCard({
  category,
  indexFormatted,
  shouldReduceMotion,
}: {
  category: (typeof categories)[number];
  indexFormatted: string;
  shouldReduceMotion: boolean | null;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Organic spring physics for tactile responsiveness
  const mouseXSpring = useSpring(x, { stiffness: 240, damping: 24 });
  const mouseYSpring = useSpring(y, { stiffness: 240, damping: 24 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: shouldReduceMotion ? '0deg' : rotateX,
        rotateY: shouldReduceMotion ? '0deg' : rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="perspective-1000 will-change-transform"
    >
      <Link
        href={`/photography/${category.slug}`}
        data-cursor="photo"
        className="group relative block w-full aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-[#0C0C0C] transition-all duration-300 hover:border-[#E8B923]/60 hover:shadow-2xl hover:shadow-[#E8B923]/10 shadow-xl"
      >
        {/* Category Thumbnail Image / Gradient Placeholder */}
        <Image
          src={category.thumbnail}
          alt={category.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-100 contrast-[1.02]"
          sizes="(max-width: 1024px) 50vw, 33vw"
        />

        {/* Gentle Bottom Tonal Shade for text legibility (leaves upper 70% pure) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/90 via-[#020202]/20 to-transparent opacity-75 transition-opacity duration-300 group-hover:opacity-60" />

        {/* Top Glass Badge */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <span className="text-[11px] font-mono tracking-widest text-[#F0F0F0]/90 px-3 py-1 rounded-full bg-black/60 backdrop-blur-xl border border-white/10">
            {indexFormatted}
          </span>
          <span className="h-8 w-8 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-[#F0F0F0] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight className="h-4 w-4 text-[#E8B923]" />
          </span>
        </div>

        {/* Bottom Content Frame */}
        <div className="absolute bottom-0 inset-x-0 p-6 sm:p-7 z-10">
          <div className="min-h-[3.5rem] lg:min-h-[4rem] flex flex-col justify-end">
            <h3 className="font-serif text-xl sm:text-2xl lg:text-[1.65rem] text-[#F0F0F0] font-light tracking-tight leading-[1.25] group-hover:text-[#E8B923] transition-colors duration-200">
              {category.title}
            </h3>
          </div>

          <div className="mt-2.5 min-h-[2.5rem]">
            <p className="text-xs sm:text-[13px] text-[#A0A0A0] font-light line-clamp-2 leading-relaxed">
              {category.description}
            </p>
          </div>

          <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.2em] text-[#E8B923]">
            <span>Open Gallery</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function PortfolioSection() {
  const desktopGridRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll tracking across the portfolio section for true scroll-driven desktop parallax
  const { scrollYProgress } = useScroll({
    target: desktopGridRef,
    offset: ['start end', 'end start'],
  });

  // Dynamic parallax speeds: All columns start strictly at 0px for perfect initial alignment!
  // As the visitor scrolls, the 3 columns move at distinct differential velocities.
  const col0Y = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -65]);
  const col1Y = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 80]);
  const col2Y = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -125]);

  // Distribute the 12 categories evenly across the 3 independent column wrappers
  const col0Categories = categories.filter((_, i) => i % 3 === 0);
  const col1Categories = categories.filter((_, i) => i % 3 === 1);
  const col2Categories = categories.filter((_, i) => i % 3 === 2);

  const renderDesktopCard = (category: (typeof categories)[number]) => {
    const originalIndex = categories.findIndex((c) => c.slug === category.slug);
    const indexFormatted = String(originalIndex + 1).padStart(2, '0');

    return (
      <DesktopTiltCard
        key={category.slug}
        category={category}
        indexFormatted={indexFormatted}
        shouldReduceMotion={shouldReduceMotion}
      />
    );
  };

  return (
    <section id="portfolio" className="relative w-full bg-transparent pt-10 sm:pt-14 md:pt-20 pb-20 md:pb-28 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        {/* Section Header: Pure & Editorial — Photography Genres */}
        <div className="mb-12 sm:mb-16 border-b border-white/10 pb-6 sm:pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E8B923] block mb-2">
              Curated Archive
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#F0F0F0] font-light tracking-tight">
              Photography Genres
            </h2>
          </div>
          <span className="text-xs font-mono text-[#A0A0A0] uppercase tracking-widest hidden sm:block">
            12 Disciplines
          </span>
        </div>

        {/* ─── DESKTOP & TABLET: Multi-speed Parallax 3-Column Layout (md+) ─── */}
        <div
          ref={desktopGridRef}
          className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 items-start mb-16 md:mb-20"
        >
          {/* Column 1 (Left: cards 01, 04, 07, 10) */}
          <motion.div
            style={{ y: col0Y }}
            className="flex flex-col gap-6 lg:gap-8 will-change-transform"
          >
            {col0Categories.map(renderDesktopCard)}
          </motion.div>

          {/* Column 2 (Center: cards 02, 05, 08, 11 - Counter-speed glide) */}
          <motion.div
            style={{ y: col1Y }}
            className="flex flex-col gap-6 lg:gap-8 will-change-transform"
          >
            {col1Categories.map(renderDesktopCard)}
          </motion.div>

          {/* Column 3 (Right: cards 03, 06, 09, 12 - Distinct speed glide) */}
          <motion.div
            style={{ y: col2Y }}
            className="flex flex-col gap-6 lg:gap-8 will-change-transform"
          >
            {col2Categories.map(renderDesktopCard)}
          </motion.div>
        </div>

        {/* ─── MOBILE: Physical Layered Stacking Cards Experience (< md) ─── */}
        <div className="md:hidden mb-14">
          <StackingCardsContainer>
            {categories.map((category, index) => {
              const indexFormatted = String(index + 1).padStart(2, '0');

              return (
                <StackingCard
                  key={category.slug}
                  index={index}
                  total={categories.length}
                >
                  <Link
                    href={`/photography/${category.slug}`}
                    className="group relative block w-full aspect-[4/5] overflow-hidden rounded-2xl"
                  >
                    {/* Category Thumbnail Image (Vibrant & crisp) */}
                    <Image
                      src={category.thumbnail}
                      alt={category.title}
                      fill
                      className="object-cover filter brightness-100 contrast-[1.02]"
                      sizes="100vw"
                    />

                    {/* Gentle bottom shade for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/90 via-[#020202]/25 to-transparent opacity-80" />

                    {/* Top Glass Badge */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      <span className="text-[11px] font-mono tracking-widest text-[#F0F0F0]/90 px-3 py-1 rounded-full bg-black/70 backdrop-blur-xl border border-white/10">
                        {indexFormatted}
                      </span>
                      <span className="h-8 w-8 rounded-full bg-black/70 backdrop-blur-xl border border-white/10 flex items-center justify-center text-[#E8B923]">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>

                    {/* Bottom Content Frame */}
                    <div className="absolute bottom-0 inset-x-0 p-5 z-10">
                      <h3 className="font-serif text-2xl text-[#F0F0F0] font-light tracking-tight leading-tight">
                        {category.title}
                      </h3>

                      <p className="mt-2 text-xs text-[#A0A0A0] font-light line-clamp-2 leading-relaxed">
                        {category.description}
                      </p>

                      <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.2em] text-[#E8B923]">
                        <span>Open Gallery</span>
                        <span>→</span>
                      </div>
                    </div>
                  </Link>
                </StackingCard>
              );
            })}
          </StackingCardsContainer>
        </div>

        {/* ─── Portfolio Exploration CTA with Glowing Champagne Gold Shadow ─── */}
        <div className="flex justify-center mb-20 md:mb-28">
          <GlowingShadow
            href="/photography"
            variant="gold"
            size="md"
            icon={<ArrowUpRight className="h-3.5 w-3.5" />}
          >
            Explore All 12 Genres
          </GlowingShadow>
        </div>

        {/* Separated, Prominent Videography Feature Section (Placed Strictly AFTER All 12 Photography Categories) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="border-t border-white/10 pt-16 sm:pt-20"
        >
          {/* Section Marker */}
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.3em] text-[#E8B923] mb-6">
            <span>Videography &amp; Cinematography</span>
          </div>

          <Link
            href="/videography"
            className="group relative block w-full overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-br from-[#0C0C0C] via-[#080808] to-[#020202] p-8 sm:p-12 md:p-16 transition-all duration-300 hover:border-[#E8B923]/60 shadow-2xl shadow-black/90"
          >
            {/* Ambient Warm Glow */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-[#E8B923]/6 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
              <div className="max-w-2xl space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8B923]/10 border border-[#E8B923]/30 text-[#E8B923] text-xs font-mono tracking-widest uppercase">
                  <Film className="h-3.5 w-3.5" />
                  <span>Cinematic Motion Work</span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F0F0F0] font-light tracking-tight group-hover:text-white transition-colors duration-200">
                  Videography &amp; Cinematography
                </h3>

                <p className="text-sm sm:text-base text-[#A0A0A0] leading-relaxed max-w-xl font-light">
                  Capturing tempo, soundscapes, and atmospheric presence through event highlight reels, artist profiles, behind-the-scenes visual documents, and promotional storytelling.
                </p>
              </div>

              {/* Action Circle */}
              <div className="flex items-center gap-5 shrink-0">
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-[#E8B923] text-[#020202] transition-transform duration-300 group-hover:scale-110 shadow-2xl shadow-[#E8B923]/30">
                  <Play className="h-8 w-8 fill-current translate-x-0.5" />
                </div>
                <div className="text-left">
                  <span className="block text-xs uppercase tracking-[0.2em] font-medium text-[#F0F0F0]">
                    Explore Reels
                  </span>
                  <span className="text-xs text-[#A0A0A0] font-mono">
                    View Work →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
