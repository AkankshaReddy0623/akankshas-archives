'use client';

import { motion } from 'motion/react';
import { Mail } from 'lucide-react';
import { siteConfig } from '@/data/site';

function WhatsAppIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function InstagramIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

interface ContactCardItem {
  id: string;
  title: string;
  supporting: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  target?: string;
  rel?: string;
}

const contactCards: ContactCardItem[] = [
  {
    id: 'whatsapp',
    title: 'WhatsApp',
    supporting: '+91 7382700380',
    href: siteConfig.whatsappUrl,
    icon: WhatsAppIcon,
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    id: 'instagram',
    title: 'Instagram',
    supporting: '@akanksha.did.something',
    href: siteConfig.instagramUrl,
    icon: InstagramIcon,
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    supporting: 'Akanksha Reddy Padamati',
    href: siteConfig.linkedinUrl,
    icon: LinkedInIcon,
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    id: 'email',
    title: 'Email',
    supporting: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
    target: undefined,
    rel: undefined,
  },
];

export default function ContactCTA() {
  return (
    <section className="relative w-full bg-transparent py-20 sm:py-24 md:py-28 border-t border-white/5 overflow-hidden">
      {/* Background Ambient Glow (Subtle & Restrained) */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] bg-radial from-[#E8B923]/3 via-transparent to-transparent blur-3xl opacity-25" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-12 text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 sm:space-y-6"
        >
          {/* Badge */}
          <span className="inline-block text-xs font-mono uppercase tracking-[0.3em] text-[#E8B923]">
            Get in Touch
          </span>

          {/* Heading */}
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#F0F0F0] font-light tracking-tight leading-tight">
            Have a story worth capturing?
          </h2>

          {/* Single short invitation paragraph */}
          <p className="mx-auto max-w-xl text-base text-[#A0A0A0] leading-relaxed font-light">
            Whether you are planning a portrait session, event documentation, brand collaboration, or creative project — I would love to hear from you.
          </p>
        </motion.div>

        {/* Clean, Minimal Grid of Four Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {contactCards.map((card) => {
            const Icon = card.icon;
            return (
              <a
                key={card.id}
                href={card.href}
                target={card.target}
                rel={card.rel}
                aria-label={`Connect via ${card.title} - ${card.supporting}`}
                className="group relative flex flex-col items-center justify-center text-center p-6 sm:p-7 rounded-xl border border-white/10 bg-[#0A0A0A] hover:bg-[#111111] hover:border-[#E8B923]/50 transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8B923] focus-visible:border-[#E8B923] hover:-translate-y-1 shadow-lg hover:shadow-[#E8B923]/5"
              >
                {/* Gold/Yellow Platform Icon in Subtle Elevated Container */}
                <div className="mb-4 flex items-center justify-center h-11 w-11 rounded-full bg-white/[0.03] border border-white/[0.08] text-[#E8B923] group-hover:border-[#E8B923]/40 group-hover:bg-[#E8B923]/10 transition-all duration-300">
                  <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* White Platform Name */}
                <h3 className="font-serif text-lg sm:text-xl text-[#F0F0F0] font-light tracking-tight group-hover:text-[#E8B923] transition-colors duration-200">
                  {card.title}
                </h3>

                {/* Muted Grey Supporting Text */}
                <p className="mt-1.5 text-xs sm:text-[13px] text-[#A0A0A0] font-light leading-relaxed group-hover:text-[#CCCCCC] transition-colors duration-200 break-all sm:break-normal">
                  {card.supporting}
                </p>
              </a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
