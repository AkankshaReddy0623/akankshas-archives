import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Category } from '@/data/categories';

interface CategoryCardProps {
  category: Category;
  index: number;
  priority?: boolean;
}

export default function CategoryCard({ category, index, priority = false }: CategoryCardProps) {
  const indexFormatted = String(index + 1).padStart(2, '0');

  return (
    <Link
      href={`/photography/${category.slug}`}
      data-cursor="photo"
      className="group relative flex flex-col justify-between h-full rounded-2xl border border-white/10 bg-[#0C0C0C] transition-all duration-300 hover:border-[#E8B923]/60 shadow-xl overflow-hidden"
    >
      {/* 1. Thumbnail Container (Layers 1-3 & 5) */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#080808]">
        {/* Layer 2: Image background */}
        <Image
          src={category.thumbnail}
          alt={category.title}
          fill
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.85] group-hover:brightness-100"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Layer 3: Gradient Vignette Overlay (strictly isolated inside thumbnail) */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-black/25 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Layer 5: Category Number Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-block text-[11px] font-mono tracking-widest text-[#F0F0F0]/90 px-3 py-1 bg-black/75 backdrop-blur-md rounded-full border border-white/10">
            {indexFormatted}
          </span>
        </div>

        {/* Hover Arrow Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className="h-7 w-7 rounded-full bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-center text-[#F0F0F0] opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight className="h-3.5 w-3.5 text-[#E8B923]" />
          </span>
        </div>
      </div>

      {/* 2. Dedicated Text Content Area */}
      <div className="relative z-10 p-6 sm:p-7 flex-1 flex flex-col justify-between bg-[#0C0C0C]">
        {/* Layer 6: Title and Description */}
        <div className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl text-[#F0F0F0] font-light tracking-tight leading-snug group-hover:text-[#E8B923] transition-colors duration-200">
            {category.title}
          </h2>

          <p className="text-xs sm:text-[13px] text-[#A0A0A0] font-light leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Layer 7: OPEN GALLERY Link and Interactive Indicator */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono uppercase tracking-[0.2em] text-[#E8B923]">
          <span>Open Gallery</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  );
}
