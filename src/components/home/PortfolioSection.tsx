'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowUpRight, Play, Film } from 'lucide-react';
import { categories } from '@/data/categories';

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="relative w-full bg-[#020202] pt-10 sm:pt-14 md:pt-20 pb-20 md:pb-28 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        {/* Section Header: Pure & Editorial — Photography Genres */}
        <div className="mb-12 sm:mb-16 border-b border-white/10 pb-6 sm:pb-8">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#F0F0F0] font-light tracking-tight">
            Photography Genres
          </h2>
        </div>

        {/* Structured 3x4 Grid for all 12 Photography Categories in Exact Required Order */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-24 md:mb-32">
          {categories.map((category, index) => {
            const indexFormatted = String(index + 1).padStart(2, '0');

            return (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.6,
                  delay: (index % 3) * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={`/photography/${category.slug}`}
                  data-cursor="photo"
                  className="group relative block w-full aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-[#0C0C0C] transition-all duration-300 hover:border-[#E8B923]/60 shadow-xl"
                >
                  {/* Category Thumbnail Image */}
                  <Image
                    src={category.thumbnail}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.85] group-hover:brightness-100"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/45 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-75" />

                  {/* Top Glass Badge: Simple Clean Numbering & Link Indicator */}
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
                    {/* Consistent Title Box with bottom baseline alignment */}
                    <div className="min-h-[3.5rem] lg:min-h-[4rem] flex flex-col justify-end">
                      <h3 className="font-serif text-xl sm:text-2xl lg:text-[1.65rem] text-[#F0F0F0] font-light tracking-tight leading-[1.25] group-hover:text-[#E8B923] transition-colors duration-200">
                        {category.title}
                      </h3>
                    </div>

                    {/* Description with clean line clamp and zero pixel clipping */}
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
          })}
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
