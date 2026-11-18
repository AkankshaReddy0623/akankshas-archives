import type { Metadata } from 'next';
import { Mail, ArrowUpRight } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: `Contact — ${siteConfig.name}`,
  description: `Get in touch with ${siteConfig.name} for photography inquiries, event coverage, and creative collaborations in ${siteConfig.location}.`,
};

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

export default function ContactPage() {
  return (
    <PageLayout>
      <div className="max-w-3xl w-full mx-auto my-auto py-6 sm:py-10 flex flex-col justify-center">
        {/* Compact Editorial Header */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F0F0F0] font-light tracking-tight">
            Contact
          </h1>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-[#A0A0A0] font-light leading-relaxed max-w-xl">
            Have a project, event, portrait session or creative idea? Let&apos;s connect.
          </p>
        </div>

        {/* Clean, Compact 2 × 2 Grid on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          {/* 1. WhatsApp (Primary / Most Prominent) */}
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between p-4 sm:p-4.5 rounded-xl border border-[#E8B923]/40 bg-[#0C0C0C]/90 hover:bg-[#121212] hover:border-[#E8B923] backdrop-blur-md transition-all duration-300 shadow-lg shadow-[#E8B923]/5"
          >
            <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
              <div className="flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-lg bg-[#E8B923]/10 border border-[#E8B923]/30 text-[#E8B923] group-hover:bg-[#E8B923] group-hover:text-[#020202] transition-all duration-300 shrink-0">
                <WhatsAppIcon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-lg sm:text-xl text-[#F0F0F0] font-light group-hover:text-[#E8B923] transition-colors leading-tight">
                    WhatsApp
                  </h2>
                  <span className="px-2 py-0.5 text-[9px] sm:text-[10px] font-mono tracking-wider text-[#E8B923] bg-[#E8B923]/10 border border-[#E8B923]/30 rounded-full uppercase">
                    Primary
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#A0A0A0] font-light truncate mt-1">
                  {siteConfig.whatsapp}
                </p>
              </div>
            </div>
            <div className="h-8 w-8 rounded-full bg-[#E8B923]/10 border border-[#E8B923]/30 flex items-center justify-center text-[#E8B923] group-hover:bg-[#E8B923] group-hover:text-[#020202] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 ml-3">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </a>

          {/* 2. Instagram */}
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between p-4 sm:p-4.5 rounded-xl border border-white/10 bg-[#0C0C0C]/80 hover:bg-[#121212] hover:border-[#E8B923]/60 backdrop-blur-md transition-all duration-300 shadow-lg"
          >
            <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
              <div className="flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-lg bg-white/5 border border-white/10 text-[#E8B923] group-hover:bg-[#E8B923] group-hover:text-[#020202] transition-all duration-300 shrink-0">
                <InstagramIcon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h2 className="font-serif text-lg sm:text-xl text-[#F0F0F0] font-light group-hover:text-[#E8B923] transition-colors leading-tight">
                  Instagram
                </h2>
                <p className="text-xs sm:text-sm text-[#A0A0A0] font-light truncate mt-1">
                  {siteConfig.instagram}
                </p>
              </div>
            </div>
            <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#A0A0A0] group-hover:text-[#E8B923] group-hover:border-[#E8B923]/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 ml-3">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </a>

          {/* 3. LinkedIn */}
          <a
            href={siteConfig.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between p-4 sm:p-4.5 rounded-xl border border-white/10 bg-[#0C0C0C]/80 hover:bg-[#121212] hover:border-[#E8B923]/60 backdrop-blur-md transition-all duration-300 shadow-lg"
          >
            <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
              <div className="flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-lg bg-white/5 border border-white/10 text-[#E8B923] group-hover:bg-[#E8B923] group-hover:text-[#020202] transition-all duration-300 shrink-0">
                <LinkedInIcon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h2 className="font-serif text-lg sm:text-xl text-[#F0F0F0] font-light group-hover:text-[#E8B923] transition-colors leading-tight">
                  LinkedIn
                </h2>
                <p className="text-xs sm:text-sm text-[#A0A0A0] font-light truncate mt-1">
                  {siteConfig.linkedin}
                </p>
              </div>
            </div>
            <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#A0A0A0] group-hover:text-[#E8B923] group-hover:border-[#E8B923]/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 ml-3">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </a>

          {/* 4. Email */}
          <a
            href={`mailto:${siteConfig.email}`}
            className="group relative flex items-center justify-between p-4 sm:p-4.5 rounded-xl border border-white/10 bg-[#0C0C0C]/80 hover:bg-[#121212] hover:border-[#E8B923]/60 backdrop-blur-md transition-all duration-300 shadow-lg"
          >
            <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
              <div className="flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-lg bg-white/5 border border-white/10 text-[#E8B923] group-hover:bg-[#E8B923] group-hover:text-[#020202] transition-all duration-300 shrink-0">
                <Mail className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h2 className="font-serif text-lg sm:text-xl text-[#F0F0F0] font-light group-hover:text-[#E8B923] transition-colors leading-tight">
                  Email
                </h2>
                <p className="text-xs sm:text-sm text-[#A0A0A0] font-light truncate mt-1">
                  {siteConfig.email}
                </p>
              </div>
            </div>
            <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#A0A0A0] group-hover:text-[#E8B923] group-hover:border-[#E8B923]/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 ml-3">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </a>
        </div>
      </div>
    </PageLayout>
  );
}
