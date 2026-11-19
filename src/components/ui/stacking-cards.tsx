'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

export interface StackingCardProps {
  index: number;
  total?: number;
  children: React.ReactNode;
  className?: string;
  topOffset?: number;
  maxOffsetSteps?: number;
  offsetStep?: number;
}

export function StackingCard({
  index,
  children,
  className = '',
  topOffset = 92,
  maxOffsetSteps = 3,
  offsetStep = 6,
}: StackingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Track the scroll progress of this specific card relative to the viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start start', 'end start'],
  });

  // Scale down earlier cards subtly as subsequent cards scroll over them (1 -> 0.95)
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [1, 0.95]
  );

  // Subtle physical archive tilt (alternating slight rotation of ±0.4 degrees)
  const rotationAngle = (index % 2 === 0 ? -0.4 : 0.4);
  const rotateZ = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, rotationAngle]
  );

  // Subtle depth darkness: earlier stacked cards gain soft depth contrast (1 -> 0.94, never dark!)
  const brightness = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [1, 0.94]
  );

  // Calculate clamped ledge offset so cards never get pushed down out of the viewport
  const offsetIndex = Math.min(index, maxOffsetSteps);
  const calculatedTop = topOffset + offsetIndex * offsetStep;

  return (
    <div
      ref={cardRef}
      className="sticky w-full transition-all duration-300"
      style={{
        top: `${calculatedTop}px`,
        zIndex: index + 10,
      }}
    >
      <motion.div
        style={{
          scale,
          rotateZ,
          filter: `brightness(${brightness})`,
          transformOrigin: 'top center',
        }}
        transition={{ ease: [0.16, 1, 0.3, 1] }}
        className={`relative w-full rounded-2xl md:rounded-3xl border border-white/10 bg-[#0C0C0C] shadow-2xl shadow-black/90 transition-colors duration-300 ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}

export interface StackingCardsContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function StackingCardsContainer({
  children,
  className = '',
}: StackingCardsContainerProps) {
  return (
    <div className={`relative flex flex-col gap-6 md:gap-10 pb-12 md:pb-20 ${className}`}>
      {children}
    </div>
  );
}

export default StackingCard;
