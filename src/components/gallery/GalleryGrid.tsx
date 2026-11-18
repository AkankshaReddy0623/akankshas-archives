'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Maximize2, Image as ImageIcon } from 'lucide-react';
import Lightbox from './Lightbox';
import type { GalleryImage } from '@/data/categories';
import { motionTokens } from '@/lib/animations';

interface GalleryGridProps {
  images: GalleryImage[];
  categoryTitle?: string;
}

export default function GalleryGrid({ images, categoryTitle }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const activeTriggerRef = useRef<HTMLElement | null>(null);

  const openLightbox = (index: number, e: React.MouseEvent | React.KeyboardEvent) => {
    activeTriggerRef.current = e.currentTarget as HTMLElement;
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleClose = () => {
    setLightboxOpen(false);
    activeTriggerRef.current?.focus();
  };

  // Graceful empty state
  if (!images || images.length === 0) {
    return (
      <div className="py-24 text-center border border-white/5 rounded-2xl bg-[#080808] p-8 max-w-lg mx-auto">
        <div className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-[#E8B923] mb-4">
          <ImageIcon className="h-6 w-6" />
        </div>
        <h3 className="font-serif text-xl text-[#F0F0F0] font-light">Gallery In Preparation</h3>
        <p className="mt-2 text-xs sm:text-sm text-[#A0A0A0] font-light">
          Photographic plates for this genre are currently being selected and curated.
        </p>
      </div>
    );
  }

  // Editorial multi-column layout preserving natural aspect ratios
  // Column count: 3 on desktop, 2 on tablet, 1 on mobile
  return (
    <>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8">
        {images.map((image, index) => (
          <motion.div
            key={image.src}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: motionTokens.medium,
              delay: (index % 3) * 0.08,
              ease: motionTokens.gentle,
            }}
            className="break-inside-avoid"
          >
            <div
              role="button"
              tabIndex={0}
              onClick={(e) => openLightbox(index, e)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(index, e);
                }
              }}
              data-cursor="photo"
              aria-label={`View photo: ${image.alt}`}
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-[#0C0C0C] transition-all duration-300 hover:border-[#E8B923]/60 shadow-xl focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8B923]"
            >
              {/* Image Frame */}
              <div className="relative w-full overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.92] group-hover:brightness-100"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Subtle Restrained Hover Highlight with Minimal Zoom Cue */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="h-10 w-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#E8B923] shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Interactive Lightbox Viewer */}
      <Lightbox
        images={images}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={handleClose}
        onNavigate={setLightboxIndex}
        categoryTitle={categoryTitle}
      />
    </>
  );
}
