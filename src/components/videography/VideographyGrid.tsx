'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Play, Clock, Calendar } from 'lucide-react';
import VideoPlayerModal from './VideoPlayerModal';
import { videoProjects, type VideoProject } from '@/data/videography';

export default function VideographyGrid() {
  const [selectedProject, setSelectedProject] = useState<VideoProject | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'Event Highlight', 'Cinematic Reel', 'Promotional', 'Behind the Scenes'];

  const filteredProjects = activeFilter === 'All'
    ? videoProjects
    : videoProjects.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* Category Filter Pills */}
      <div className="mb-12 flex flex-wrap items-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`rounded-full px-5 py-2 text-xs uppercase tracking-[0.2em] font-mono transition-colors duration-200 focus:outline-none ${
              activeFilter === cat
                ? 'bg-[#E8B923] text-[#020202] font-semibold shadow-md shadow-[#E8B923]/20'
                : 'bg-white/5 border border-white/10 text-[#A0A0A0] hover:border-white/30 hover:text-[#F0F0F0]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Video Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              onClick={() => setSelectedProject(project)}
              data-cursor="photo"
              className="group cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-[#0C0C0C] transition-all duration-300 hover:border-[#E8B923]/60 shadow-xl flex flex-col h-full"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.85] group-hover:brightness-100"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-black/20 to-transparent opacity-80" />

                {/* Top Badge: Category */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#F0F0F0] px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10">
                    {project.category}
                  </span>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <div className="flex items-center justify-center h-14 w-14 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#E8B923] transition-all duration-200 group-hover:scale-110 group-hover:bg-[#E8B923] group-hover:text-[#020202]">
                    <Play className="h-6 w-6 fill-current translate-x-0.5" />
                  </div>
                </div>

                {/* Bottom Metadata inside thumbnail */}
                <div className="absolute bottom-3 right-4 z-10 flex items-center gap-3 text-[11px] font-mono text-[#A0A0A0]">
                  {project.duration && (
                    <span className="flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded border border-white/5">
                      <Clock className="h-3 w-3 text-[#E8B923]" />
                      {project.duration}
                    </span>
                  )}
                  {project.year && (
                    <span className="flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded border border-white/5">
                      <Calendar className="h-3 w-3 text-[#E8B923]" />
                      {project.year}
                    </span>
                  )}
                </div>
              </div>

              {/* Text Information */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-[#F0F0F0] font-light tracking-tight group-hover:text-[#E8B923] transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#A0A0A0] leading-relaxed font-light">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#E8B923]">
                  <span className="tracking-widest uppercase">Watch Reel</span>
                  <span>▶</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video Modal Player */}
      <VideoPlayerModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
