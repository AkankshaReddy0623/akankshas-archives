import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import PortfolioSection from '@/components/home/PortfolioSection';
import AboutSection from '@/components/home/AboutSection';
import ContactCTA from '@/components/home/ContactCTA';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: `${siteConfig.name} — Photography & Videography`,
  description: `${siteConfig.name} is a photographer and videographer based in ${siteConfig.location}. "${siteConfig.tagline}" Exploring diverse genres, portraits, dance, street, events, and cinematic stories.`,
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Portfolio Genre Navigation (12 categories + videography) */}
      <PortfolioSection />

      {/* 3. About Me Introduction */}
      <AboutSection />

      {/* 4. Contact CTA */}
      <ContactCTA />
    </>
  );
}
