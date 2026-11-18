import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MapPin, Camera, Film } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { aboutContent } from '@/data/about';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: `About — ${siteConfig.name}`,
  description: `Learn about ${siteConfig.name}, a photographer and videographer based in ${siteConfig.location}. Creative philosophy, approach to visual storytelling, and background.`,
};

export default function AboutPage() {
  return (
    <PageLayout
      title="About Me"
      description="Exploring the intersection of human emotion, spatial atmosphere, and visual curiosity."
    >
      <div className="pb-24 space-y-24">
        {/* Main Profile Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Portrait */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0C0C0C] shadow-2xl">
              <Image
                src={aboutContent.portrait}
                alt={`${siteConfig.name} — Portrait`}
                fill
                priority
                className="object-cover filter contrast-[1.05]"
                sizes="(max-width: 1024px) 100vw, 420px"
              />

              {/* Editorial Frame Markings */}
              <div className="absolute top-4 left-4 text-[10px] font-mono tracking-widest text-[#A0A0A0] px-2.5 py-1 bg-black/60 backdrop-blur-md rounded border border-white/10">
                AKANKSHA REDDY
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono tracking-widest text-[#F0F0F0] px-3 py-2 bg-black/60 backdrop-blur-md rounded border border-white/10">
                <span>{siteConfig.location}</span>
                <span className="text-[#E8B923]">PHOTOGRAPHER</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Exact Copy */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#E8B923]">
                Creative Identity
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F0F0F0] font-light tracking-tight">
                Akanksha Reddy
              </h2>
              <div className="flex items-center gap-2 text-xs font-mono text-[#A0A0A0]">
                <MapPin className="h-3.5 w-3.5 text-[#E8B923]" />
                <span>Based in {siteConfig.location}</span>
              </div>
            </div>

            {/* Exact Required Copy */}
            <blockquote className="font-serif italic text-xl sm:text-2xl text-[#F0F0F0]/95 font-light leading-relaxed border-l-2 border-[#E8B923] pl-6 py-1">
              &ldquo;{aboutContent.intro}&rdquo;
            </blockquote>

            <div className="space-y-4 text-sm sm:text-base text-[#A0A0A0] leading-relaxed font-light">
              <p>
                {aboutContent.philosophy}
              </p>
              <p>
                {aboutContent.approach}
              </p>
            </div>

            {/* Quick Stats / Scope */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="p-4 rounded-xl border border-white/5 bg-[#0C0C0C]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#E8B923] mb-1">
                  <Camera className="h-4 w-4" />
                  <span>PHOTOGRAPHY</span>
                </div>
                <p className="text-xs text-[#A0A0A0]">12 distinct visual genres explored with dedicated focus.</p>
              </div>

              <div className="p-4 rounded-xl border border-white/5 bg-[#0C0C0C]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#E8B923] mb-1">
                  <Film className="h-4 w-4" />
                  <span>VIDEOGRAPHY</span>
                </div>
                <p className="text-xs text-[#A0A0A0]">Cinematic highlights, documentary BTS, and motion reels.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interests & Areas Section */}
        <div className="border-t border-white/10 pt-16">
          <div className="mb-10">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#E8B923]">
              Curiosity Areas
            </span>
            <h3 className="mt-2 font-serif text-3xl text-[#F0F0F0] font-light">
              Subjects &amp; Areas of Interest
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {aboutContent.interests.map((interest, i) => (
              <div
                key={interest}
                className="p-5 rounded-xl border border-white/10 bg-[#0C0C0C] flex flex-col justify-between group hover:border-[#E8B923]/40 transition-colors"
              >
                <span className="text-[11px] font-mono text-[#E8B923]">
                  0{i + 1}
                </span>
                <p className="mt-4 text-sm font-light text-[#F0F0F0]">
                  {interest}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing CTA */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#0C0C0C] via-[#080808] to-[#0C0C0C] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F0F0F0] font-light">
              Ready to create something memorable?
            </h3>
            <p className="text-sm text-[#A0A0A0] font-light max-w-md">
              Whether you need portraits, event documentation, or creative direction, let&apos;s start a conversation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/photography"
              className="px-6 py-3 rounded-full border border-white/20 text-[#F0F0F0] text-xs uppercase tracking-[0.2em] font-medium hover:border-[#E8B923] hover:text-[#E8B923] transition-colors"
            >
              Browse Galleries
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E8B923] text-[#020202] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-white transition-all shadow-lg shadow-[#E8B923]/10"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
