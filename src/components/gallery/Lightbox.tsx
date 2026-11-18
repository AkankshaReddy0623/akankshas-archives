'use client';

import { useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryImage } from '@/data/categories';
import { motionTokens } from '@/lib/animations';

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
  categoryTitle?: string;
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  categoryTitle,
}: LightboxProps) {
  const currentImage = images[currentIndex];
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const handlePrev = useCallback(() => {
    if (images.length === 0) return;
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (images.length === 0) return;
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  // Keyboard navigation & focus trap
  useEffect(() => {
    if (!isOpen) return;

    // Focus close button on open
    const prevActiveElement = document.activeElement as HTMLElement | null;
    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'Tab' && dialogRef.current) {
        // Simple focus trap inside modal
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      prevActiveElement?.focus?.();
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Touch Swipe gestures for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 45) {
      handlePrev();
    } else if (deltaX < -45) {
      handleNext();
    }
    touchStartX.current = null;
  };

  return (
    <AnimatePresence>
      {isOpen && currentImage && (
        <motion.div
          ref={dialogRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: motionTokens.standard, ease: motionTokens.easeOut }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#020202]/98 backdrop-blur-3xl"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={currentImage.alt || 'Photography Lightbox'}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Control Bar */}
          <div
            className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-5 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#A0A0A0]">
              {categoryTitle && (
                <>
                  <span className="text-[#F0F0F0] uppercase tracking-wider">{categoryTitle}</span>
                  <span className="text-white/20">{'//'}</span>
                </>
              )}
              <span className="text-[#E8B923]">
                {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
              </span>
            </div>

            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="flex items-center justify-center h-11 w-11 rounded-full border border-white/10 bg-black/50 text-[#F0F0F0] backdrop-blur-md hover:border-[#E8B923] hover:text-[#E8B923] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8B923]"
              aria-label="Close image viewer (Escape)"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Previous Button (Hidden on small mobile screens to prefer swipe) */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="hidden sm:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 items-center justify-center h-12 w-12 rounded-full border border-white/10 bg-black/50 text-[#F0F0F0] backdrop-blur-md hover:border-[#E8B923] hover:text-[#E8B923] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8B923]"
              aria-label="Previous image (Left arrow)"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Main Image Stage */}
          <div
            className="relative max-h-[82vh] max-w-[92vw] md:max-w-[82vw] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              key={currentImage.src}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: motionTokens.fast, ease: motionTokens.gentle }}
              className="relative overflow-hidden rounded-lg border border-white/10 bg-[#080808] shadow-2xl"
              style={{
                maxHeight: '78vh',
                maxWidth: '86vw',
              }}
            >
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                width={currentImage.width}
                height={currentImage.height}
                className="h-auto w-auto max-h-[78vh] max-w-[86vw] object-contain select-none"
                priority
              />
            </motion.div>
          </div>

          {/* Next Button (Hidden on small mobile screens to prefer swipe) */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="hidden sm:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 items-center justify-center h-12 w-12 rounded-full border border-white/10 bg-black/50 text-[#F0F0F0] backdrop-blur-md hover:border-[#E8B923] hover:text-[#E8B923] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8B923]"
              aria-label="Next image (Right arrow)"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Mobile Swipe Hint */}
          <div className="sm:hidden absolute bottom-5 inset-x-0 text-center pointer-events-none text-[11px] font-mono tracking-widest text-[#A0A0A0]/70 uppercase">
            <span>Swipe left or right to browse</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
