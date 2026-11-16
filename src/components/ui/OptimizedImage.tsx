'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  className?: string;
  priority?: boolean;
  hover?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  caption,
  className = '',
  priority = false,
  hover = true,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      className={`group relative overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Loading placeholder */}
      {!isLoaded && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{ backgroundColor: '#191919' }}
        />
      )}

      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        onLoad={() => setIsLoaded(true)}
        className={`
          block h-auto w-full transition-all duration-500 ease-out
          ${hover ? 'group-hover:scale-[1.03]' : ''}
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
        `}
      />

      {/* Caption overlay on hover */}
      {caption && hover && (
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-12 transition-transform duration-400 ease-out group-hover:translate-y-0">
          <p className="font-sans text-sm font-light text-off-white/90">
            {caption}
          </p>
        </div>
      )}
    </motion.div>
  );
}
