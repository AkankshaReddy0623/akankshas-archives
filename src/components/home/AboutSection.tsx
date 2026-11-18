'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { aboutContent } from '@/data/about';

export default function AboutSection() {
  return (
    <section className="relative w-full bg-[#020202] py-28 md:py-36 border-t border-white/5 overflow-hidden">
      {/* Background Ambient Radial Glow */}
      <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-radial from-[#E8B923]/6 via-transparent to-transparent blur-3xl opacity-40" />

      {/* Ghost Background Editorial Watermark */}
      <div
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 select-none text-[16vw] font-black uppercase tracking-tighter text-white/[0.012] leading-none z-0"
        aria-hidden="true"
      >
        VISION
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Framed Editorial Portrait with Glass Badges */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Framed Card with Multi-layer Border Effect */}
            <div className="relative mx-auto max-w-md lg:max-w-none aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-[#0C0C0C] shadow-2xl shadow-black/90">
              <Image
                src={aboutContent.portrait}
                alt={`${siteConfig.name} — Photographer`}
                fill
                className="object-cover filter contrast-[1.05]"
                sizes="(max-width: 1024px) 80vw, 420px"
              />

              {/* Top Glass Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-[10px] font-mono tracking-widest text-[#F0F0F0]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E8B923]" />
                  AKANKSHA REDDY
                </span>
              </div>

              {/* Bottom Glass Metadata Strip */}
              <div className="absolute bottom-4 inset-x-4 z-10 flex items-center justify-between px-4 py-2.5 rounded-xl bg-black/75 backdrop-blur-xl border border-white/10 text-[11px] font-mono text-[#F0F0F0]">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-[#E8B923]" />
                  <span>{siteConfig.location}</span>
                </div>
                <span className="text-[#E8B923] tracking-widest uppercase">Photographer</span>
              </div>
            </div>

            {/* Subtle Offset Frame Accent */}
            <div className="hidden sm:block absolute -inset-3 -z-10 rounded-3xl border border-white/5 -rotate-1 pointer-events-none" />
          </motion.div>

          {/* Right Column: Layered Editorial Typography */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-8"
          >
            <div>
              <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.3em] text-[#E8B923]">
                <span>About Me</span>
              </div>

              {/* Required Heading */}
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#F0F0F0] font-light tracking-tight leading-tight">
                Curiosity over confinement.
              </h2>
            </div>

            {/* Required Exact Copy */}
            <blockquote className="font-serif italic text-xl sm:text-2xl text-[#F0F0F0]/95 font-light leading-relaxed border-l-2 border-[#E8B923] pl-6 py-1">
              &ldquo;{aboutContent.intro}&rdquo;
            </blockquote>

            {/* Concise Creative Philosophy */}
            <p className="text-sm sm:text-base text-[#A0A0A0] leading-relaxed font-light">
              I believe the most compelling visual work comes from staying open. Every genre teaches something vital — the quiet patience required for a portrait, the instinctive timing demanded by street life, and the kinetic energy of live performances. The camera remains a tool of discovery, not a limitation.
            </p>

            {/* Location & Navigation Link */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-[#A0A0A0]">
                <MapPin className="h-4 w-4 text-[#E8B923]" />
                <span className="text-[#F0F0F0]">{siteConfig.location}</span>
              </div>

              <Link
                href="/about"
                className="group inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] font-medium text-[#F0F0F0] hover:text-[#E8B923] transition-colors"
              >
                <span>More About Me</span>
                <ArrowUpRight className="h-4 w-4 text-[#E8B923] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
