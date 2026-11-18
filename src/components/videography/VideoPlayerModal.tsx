'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Clock, Calendar, Film } from 'lucide-react';
import type { VideoProject } from '@/data/videography';

interface VideoPlayerModalProps {
  project: VideoProject | null;
  onClose: () => void;
}

export default function VideoPlayerModal({ project, onClose }: VideoPlayerModalProps) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#020202]/98 backdrop-blur-3xl p-4 sm:p-6 md:p-12"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
      >
        <div
          className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#0C0C0C] shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 p-6">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8B923]/10 border border-[#E8B923]/30 text-[#E8B923] text-xs font-mono uppercase tracking-widest">
                <Film className="h-3 w-3" />
                {project.category}
              </span>
              {project.duration && (
                <span className="flex items-center gap-1 text-xs text-[#A0A0A0] font-mono">
                  <Clock className="h-3 w-3 text-[#E8B923]" />
                  {project.duration}
                </span>
              )}
              {project.year && (
                <span className="flex items-center gap-1 text-xs text-[#A0A0A0] font-mono">
                  <Calendar className="h-3 w-3 text-[#E8B923]" />
                  {project.year}
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="flex items-center justify-center h-10 w-10 rounded-full border border-white/10 bg-black/40 text-[#F0F0F0] hover:border-[#E8B923] hover:text-[#E8B923] transition-colors duration-200 focus:outline-none"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Video Preview / Player Stage */}
          <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
            {project.videoUrl ? (
              <video
                src={project.videoUrl}
                controls
                autoPlay={false}
                playsInline
                poster={project.thumbnail}
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="relative h-full w-full flex items-center justify-center group">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover opacity-60 filter contrast-[1.1]"
                />
                <div className="absolute inset-0 bg-black/40" />

                <div className="relative z-10 flex flex-col items-center gap-4 text-center px-6">
                  <div className="flex items-center justify-center h-20 w-20 rounded-full bg-[#E8B923] text-[#020202] shadow-2xl shadow-[#E8B923]/40">
                    <Play className="h-8 w-8 fill-current translate-x-0.5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-mono text-[#E8B923] tracking-widest uppercase">
                      Preview Stand-In
                    </p>
                    <p className="text-xs text-[#A0A0A0] font-light max-w-sm">
                      Full cinematic footage will be uploaded directly. Poster frame loaded.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Info Bar */}
          <div className="p-6 md:p-8 space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F0F0F0] font-light tracking-tight">
              {project.title}
            </h3>
            <p className="text-sm text-[#A0A0A0] leading-relaxed font-light">
              {project.description}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
