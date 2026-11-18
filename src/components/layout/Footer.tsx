import Link from 'next/link';
import { siteConfig } from '@/data/site';
import { navLinks } from '@/data/navigation';

export default function Footer() {
  return (
    <footer className="bg-[#020202] border-t border-white/10 py-8">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#A0A0A0]">
        {/* Left: Name & Location */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="font-medium text-[#F0F0F0] hover:text-[#E8B923] uppercase tracking-wider transition-colors duration-200"
          >
            {siteConfig.name}
          </Link>
          <span className="text-white/20">•</span>
          <span>{siteConfig.location}</span>
        </div>

        {/* Center: Compact Navigation Links */}
        <nav className="flex flex-wrap items-center justify-center gap-6" aria-label="Footer Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-[#F0F0F0] transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Contact & Copyright */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 md:gap-4">
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#E8B923] transition-colors duration-200"
          >
            WhatsApp
          </a>
          <span className="text-white/20">•</span>
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#E8B923] transition-colors duration-200"
          >
            Instagram
          </a>
          <span className="text-white/20">•</span>
          <a
            href={siteConfig.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#E8B923] transition-colors duration-200"
          >
            LinkedIn
          </a>
          <span className="text-white/20">•</span>
          <a
            href={`mailto:${siteConfig.email}`}
            className="hover:text-[#E8B923] transition-colors duration-200"
          >
            Email
          </a>
          <span className="text-white/20">•</span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
