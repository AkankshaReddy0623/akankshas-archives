'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ArrowUpRight, X } from 'lucide-react';
import GlowingShadow from '@/components/ui/glowing-shadow';
import { navLinks } from '@/data/navigation';
import { categories } from '@/data/categories';
import { siteConfig } from '@/data/site';

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [photoDropdownOpen, setPhotoDropdownOpen] = useState(false);
  const [mobilePhotoOpen, setMobilePhotoOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Track scroll position to visually ground the floating navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Close menus on route change without cascading effect renders
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMobileOpen(false);
    setPhotoDropdownOpen(false);
    setMobilePhotoOpen(false);
  }

  // Click outside and Escape key listeners
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setPhotoDropdownOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPhotoDropdownOpen(false);
        setMobileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const isLinkActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Grounding Ambient Gradient Backdrop (Smoothly emerges when scrolled) */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 inset-x-0 h-36 sm:h-44 z-40 transition-opacity duration-500 ease-out bg-gradient-to-b from-[#020202] via-[#020202]/85 via-[#020202]/40 to-transparent ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Floating Pill-Shaped Navigation Bar */}
      <header className="fixed top-4 sm:top-6 inset-x-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
        <nav
          className={`pointer-events-auto relative flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border transition-all duration-300 ease-out w-full max-w-5xl ${
            isScrolled
              ? 'border-white/12 bg-[#080808]/92 backdrop-blur-2xl shadow-2xl shadow-black/90 ring-1 ring-[#E8B923]/10'
              : 'border-white/8 bg-[#0a0a0a]/75 backdrop-blur-xl shadow-xl shadow-black/60 ring-1 ring-white/5'
          }`}
          aria-label="Main Navigation"
        >
          {/* Left: Identity */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="h-7 w-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#E8B923] group-hover:border-[#E8B923]/50 transition-colors duration-200">
              <span className="h-2 w-2 rounded-full bg-[#E8B923] transition-transform duration-300 group-hover:scale-125" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs sm:text-[13px] font-medium tracking-[0.18em] uppercase text-[#F0F0F0] group-hover:text-[#E8B923] transition-colors duration-200 leading-tight">
                {siteConfig.name}
              </span>
              <span className="text-[9px] font-mono tracking-widest uppercase text-[#A0A0A0]/70 leading-tight">
                Hyderabad
              </span>
            </div>
          </Link>

          {/* Centre: Navigation Links (Desktop) */}
          <ul className="hidden md:flex items-center gap-1 bg-white/[0.02] p-1 rounded-full border border-white/5 relative">
            {navLinks.map((link) => {
              if (link.href === '/photography') {
                const isPhotoActive = pathname.startsWith('/photography');

                return (
                  <li
                    key={link.href}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => setPhotoDropdownOpen(true)}
                    onMouseLeave={() => setPhotoDropdownOpen(false)}
                  >
                    <div className="relative inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium tracking-wider">
                      {isPhotoActive && (
                        <motion.div
                          layoutId="activeNavIndicator"
                          className="absolute inset-0 rounded-full bg-[#E8B923]/15 border border-[#E8B923]/35 shadow-sm shadow-[#E8B923]/10"
                          transition={{
                            type: 'spring',
                            stiffness: 380,
                            damping: 30,
                            mass: 0.8,
                          }}
                        />
                      )}

                      <Link
                        href="/photography"
                        className={`relative z-10 focus:outline-none transition-colors duration-200 ${
                          isPhotoActive ? 'text-[#E8B923]' : 'text-[#F0F0F0]/80 hover:text-[#F0F0F0]'
                        }`}
                      >
                        {link.label}
                      </Link>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setPhotoDropdownOpen((prev) => !prev);
                        }}
                        aria-expanded={photoDropdownOpen}
                        aria-label="Toggle photography genres dropdown"
                        className={`relative z-10 p-1.5 -mr-1 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8B923] rounded-full ${
                          isPhotoActive ? 'text-[#E8B923]' : 'text-[#F0F0F0]/60 hover:text-[#E8B923]'
                        }`}
                      >
                        <ChevronDown
                          className={`h-3 w-3 transition-transform duration-300 ${
                            photoDropdownOpen ? 'rotate-180 text-[#E8B923]' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {/* Dark Glassmorphic Photography Dropdown Menu */}
                    <AnimatePresence>
                      {photoDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.98 }}
                          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50 pointer-events-auto"
                        >
                          <div className="w-[380px] rounded-2xl border border-white/10 bg-[#080808]/96 backdrop-blur-2xl p-4 shadow-2xl shadow-black/95 ring-1 ring-white/5">
                            {/* Header */}
                            <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/5 text-[10px] font-mono uppercase tracking-[0.2em] text-[#A0A0A0]">
                              <span>12 Genres</span>
                              <Link
                                href="/photography"
                                onClick={() => setPhotoDropdownOpen(false)}
                                className="text-[#E8B923] hover:underline flex items-center gap-1 transition-colors duration-200"
                              >
                                Overview <ArrowUpRight className="h-3 w-3" />
                              </Link>
                            </div>

                            {/* 12 Categories List in Exact Required Order */}
                            <div className="grid grid-cols-2 gap-1 max-h-[360px] overflow-y-auto pr-1">
                              {categories.map((cat, idx) => {
                                const isCatActive = pathname === `/photography/${cat.slug}`;
                                const num = String(idx + 1).padStart(2, '0');

                                return (
                                  <Link
                                    key={cat.slug}
                                    href={`/photography/${cat.slug}`}
                                    onClick={() => setPhotoDropdownOpen(false)}
                                    className={`group flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors duration-200 ${
                                      isCatActive
                                        ? 'bg-[#E8B923]/10 text-[#E8B923] font-medium border border-[#E8B923]/30'
                                        : 'text-[#F0F0F0]/80 hover:text-[#F0F0F0] hover:bg-white/[0.04]'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 truncate">
                                      <span className="font-mono text-[10px] text-[#A0A0A0]/60 group-hover:text-[#E8B923] transition-colors duration-200">
                                        {num}
                                      </span>
                                      <span className="truncate">{cat.shortTitle || cat.title}</span>
                                    </div>
                                    {isCatActive && (
                                      <span className="h-1.5 w-1.5 rounded-full bg-[#E8B923] shrink-0" />
                                    )}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              }

              const active = isLinkActive(link.href);

              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    className="relative inline-block px-3 py-1.5 rounded-full text-xs font-medium tracking-wider focus:outline-none"
                  >
                    {active && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 rounded-full bg-[#E8B923]/15 border border-[#E8B923]/35 shadow-sm shadow-[#E8B923]/10"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                          mass: 0.8,
                        }}
                      />
                    )}
                    <span
                      className={`relative z-10 transition-colors duration-200 ${
                        active ? 'text-[#E8B923]' : 'text-[#F0F0F0]/80 hover:text-[#F0F0F0]'
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right: Primary CTA (Desktop & Tablet) */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <GlowingShadow
              href="/contact"
              variant="gold"
              size="sm"
              icon={<ArrowUpRight className="h-3.5 w-3.5" />}
            >
              Get in Touch
            </GlowingShadow>

            {/* Mobile menu button on tablet */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="flex md:hidden items-center justify-center min-h-[44px] min-w-[44px] h-10 w-10 rounded-full border border-white/10 bg-white/5 text-[#F0F0F0] hover:text-[#E8B923] hover:border-[#E8B923]/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8B923] transition-colors duration-200"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>

          {/* Mobile Right Controls (<640px) */}
          <div className="flex sm:hidden items-center gap-1.5">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-3 py-1.5 min-h-[40px] rounded-full bg-[#E8B923] text-[#020202] text-[10px] uppercase tracking-wider font-semibold hover:bg-white transition-colors duration-200"
            >
              Get in Touch
            </Link>
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="flex items-center justify-center min-h-[44px] min-w-[44px] h-10 w-10 rounded-full border border-white/10 bg-white/5 text-[#F0F0F0] hover:text-[#E8B923] hover:border-[#E8B923]/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8B923] transition-colors duration-200"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Panel Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-overlay"
            className="fixed inset-0 z-40 flex flex-col bg-[#020202]/98 backdrop-blur-3xl md:hidden overflow-y-auto px-6 pt-28 pb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="flex flex-col gap-5 max-w-md mx-auto w-full">
              {/* Home */}
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className={`text-2xl font-light tracking-wide transition-colors ${
                  pathname === '/' ? 'text-[#E8B923]' : 'text-[#F0F0F0]'
                }`}
              >
                Home
              </Link>

              {/* Photography Accordion */}
              <div className="border-t border-b border-white/10 py-3">
                <div className="flex items-center justify-between">
                  <Link
                    href="/photography"
                    onClick={() => setMobileOpen(false)}
                    className={`text-2xl font-light tracking-wide transition-colors ${
                      pathname.startsWith('/photography') ? 'text-[#E8B923]' : 'text-[#F0F0F0]'
                    }`}
                  >
                    Photography
                  </Link>

                  <button
                    type="button"
                    onClick={() => setMobilePhotoOpen((prev) => !prev)}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#A0A0A0] hover:text-[#E8B923] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8B923] rounded-full transition-colors"
                    aria-label="Expand photography categories"
                  >
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-300 ${
                        mobilePhotoOpen ? 'rotate-180 text-[#E8B923]' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Expanded 12 Genres in Mobile */}
                <AnimatePresence>
                  {mobilePhotoOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden pt-3 space-y-2 pl-3 border-l border-[#E8B923]/30 ml-2 mt-2"
                    >
                      <Link
                        href="/photography"
                        onClick={() => setMobileOpen(false)}
                        className="block text-xs uppercase tracking-[0.2em] font-mono text-[#E8B923] py-1"
                      >
                        All 12 Genres Overview →
                      </Link>

                      {categories.map((cat, i) => {
                        const isCatActive = pathname === `/photography/${cat.slug}`;
                        const num = String(i + 1).padStart(2, '0');

                        return (
                          <Link
                            key={cat.slug}
                            href={`/photography/${cat.slug}`}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-3 py-1.5 text-sm transition-colors ${
                              isCatActive ? 'text-[#E8B923] font-medium' : 'text-[#A0A0A0] hover:text-[#F0F0F0]'
                            }`}
                          >
                            <span className="font-mono text-xs text-[#E8B923]/60">{num}</span>
                            <span>{cat.title}</span>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Videography */}
              <Link
                href="/videography"
                onClick={() => setMobileOpen(false)}
                className={`text-2xl font-light tracking-wide transition-colors ${
                  pathname.startsWith('/videography') ? 'text-[#E8B923]' : 'text-[#F0F0F0]'
                }`}
              >
                Videography
              </Link>

              {/* About */}
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className={`text-2xl font-light tracking-wide transition-colors ${
                  pathname === '/about' ? 'text-[#E8B923]' : 'text-[#F0F0F0]'
                }`}
              >
                About
              </Link>

              {/* Contact */}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className={`text-2xl font-light tracking-wide transition-colors ${
                  pathname === '/contact' ? 'text-[#E8B923]' : 'text-[#F0F0F0]'
                }`}
              >
                Contact
              </Link>

              {/* Mobile CTA */}
              <div className="pt-4 flex justify-center">
                <GlowingShadow
                  href="/contact"
                  variant="gold"
                  size="md"
                  className="w-full"
                  onClick={() => setMobileOpen(false)}
                  icon={<ArrowUpRight className="h-4 w-4" />}
                >
                  Get in Touch
                </GlowingShadow>
              </div>

              {/* Mobile Footer Info */}
              <div className="pt-6 mt-4 border-t border-white/10 text-xs font-mono text-[#A0A0A0] space-y-2">
                <p>{siteConfig.name} {'//'} {siteConfig.location}</p>
                <p className="text-[#E8B923]">{siteConfig.email}</p>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
