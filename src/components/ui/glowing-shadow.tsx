'use client';

import React from 'react';
import Link from 'next/link';

export interface GlowingShadowProps {
  children: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  glowClassName?: string;
  variant?: 'gold' | 'solid-gold' | 'antique' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

export function GlowingShadow({
  children,
  href,
  onClick,
  className = '',
  glowClassName = '',
  variant = 'gold',
  size = 'md',
  icon,
  type = 'button',
  disabled = false,
  target,
  rel,
  ariaLabel,
}: GlowingShadowProps) {
  // Size presets
  const sizeClasses = {
    sm: 'px-4 py-2 text-[11px] gap-1.5',
    md: 'px-6 py-3 text-xs sm:text-[13px] gap-2.5',
    lg: 'px-8 py-3.5 sm:py-4 text-xs sm:text-sm gap-3',
  }[size];

  // Glow color palettes (Deep black interiors + warm champagne/antique gold illumination)
  const glowConfig = {
    gold: {
      ambient: 'rgba(232, 185, 35, 0.45)',
      hover: 'rgba(232, 185, 35, 0.8)',
      gradient:
        'radial-gradient(ellipse at center, rgba(232, 185, 35, 0.55) 0%, rgba(212, 175, 55, 0.28) 45%, transparent 72%)',
      border: 'border-[#E8B923]/50 hover:border-[#E8B923]',
      activeRing: 'focus-visible:ring-[#E8B923]',
      text: 'text-[#F0F0F0] bg-[#0A0A0A] hover:bg-[#121212] hover:text-white',
      iconColor: 'text-[#E8B923]',
    },
    'solid-gold': {
      ambient: 'rgba(232, 185, 35, 0.5)',
      hover: 'rgba(232, 185, 35, 0.85)',
      gradient:
        'radial-gradient(ellipse at center, rgba(232, 185, 35, 0.6) 0%, rgba(212, 175, 55, 0.3) 45%, transparent 72%)',
      border: 'border-[#E8B923]',
      activeRing: 'focus-visible:ring-[#E8B923]',
      text: 'text-[#020202] bg-[#E8B923] hover:bg-[#F5C738]',
      iconColor: 'text-[#020202]',
    },
    antique: {
      ambient: 'rgba(212, 175, 55, 0.35)',
      hover: 'rgba(232, 195, 85, 0.65)',
      gradient:
        'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.45) 0%, rgba(160, 130, 40, 0.2) 50%, transparent 72%)',
      border: 'border-[#D4AF37]/35 hover:border-[#E8C355]/70',
      activeRing: 'focus-visible:ring-[#D4AF37]',
      text: 'text-[#F0F0F0] bg-[#0A0A0A] hover:bg-[#121212] hover:text-white',
      iconColor: 'text-[#D4AF37]',
    },
    subtle: {
      ambient: 'rgba(232, 185, 35, 0.22)',
      hover: 'rgba(232, 185, 35, 0.45)',
      gradient:
        'radial-gradient(ellipse at center, rgba(232, 185, 35, 0.3) 0%, rgba(120, 95, 20, 0.12) 55%, transparent 75%)',
      border: 'border-white/15 hover:border-[#E8B923]/50',
      activeRing: 'focus-visible:ring-[#E8B923]',
      text: 'text-[#F0F0F0] bg-[#080808] hover:bg-[#101010]',
      iconColor: 'text-[#E8B923]',
    },
  }[variant];

  // Base inner button content styling
  const innerContent = (
    <>
      <span className="relative z-10 font-medium tracking-[0.16em] uppercase flex items-center justify-center gap-2">
        {children}
        {icon && (
          <span className={`transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${glowConfig.iconColor}`}>
            {icon}
          </span>
        )}
      </span>

      {/* Subtle fine hairline reflection overlay */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#E8B923]/30 to-transparent opacity-60"
      />
    </>
  );

  const sharedButtonClasses = `
    group relative inline-flex items-center justify-center rounded-full
    transition-all duration-300 ease-out select-none
    focus-visible:outline-none focus-visible:ring-2 ${glowConfig.activeRing} focus-visible:ring-offset-2 focus-visible:ring-offset-[#020202]
    disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed
    ${className}
  `.trim();

  const innerButtonClasses = `
    relative z-10 inline-flex items-center justify-center rounded-full border
    ${sizeClasses} ${glowConfig.text} ${glowConfig.border}
    shadow-lg transition-all duration-300 ease-out
    group-hover:scale-[1.02] active:scale-[0.98]
  `.trim();

  // Glow Wrapper with multi-tier radial diffusion
  const glowElement = (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -inset-1 rounded-full transition-all duration-500 ease-out ${glowClassName}`}
    >
      {/* 1. Deep ambient aura (Always visible on mobile & desktop, deepens on hover) */}
      <div
        className="absolute inset-0 rounded-full blur-xl opacity-60 sm:opacity-50 group-hover:opacity-95 transition-opacity duration-500"
        style={{
          background: glowConfig.gradient,
        }}
      />

      {/* 2. Soft focused highlight (Behind border) */}
      <div
        className="absolute -inset-0.5 rounded-full blur-md opacity-45 sm:opacity-40 group-hover:opacity-85 transition-opacity duration-300"
        style={{
          background: glowConfig.gradient,
        }}
      />
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={sharedButtonClasses}
        onClick={onClick}
      >
        {glowElement}
        <span className={innerButtonClasses}>{innerContent}</span>
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      className={sharedButtonClasses}
      onClick={onClick}
    >
      {glowElement}
      <span className={innerButtonClasses}>{innerContent}</span>
    </button>
  );
}

export default GlowingShadow;
