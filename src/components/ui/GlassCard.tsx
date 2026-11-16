'use client';

import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'heavy';
}

const intensityStyles = {
  light: {
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
  },
  medium: {
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
  },
  heavy: {
    backdropFilter: 'blur(28px)',
    WebkitBackdropFilter: 'blur(28px)',
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
  },
} as const;

export default function GlassCard({
  children,
  className = '',
  intensity = 'medium',
}: GlassCardProps) {
  return (
    <div
      className={`rounded-2xl p-6 transition-colors duration-300 ${className}`}
      style={intensityStyles[intensity]}
    >
      {children}
    </div>
  );
}
