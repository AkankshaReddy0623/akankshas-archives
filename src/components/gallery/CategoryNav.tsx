import Link from 'next/link';
import { categories } from '@/data/categories';

interface CategoryNavProps {
  currentSlug: string;
}

export default function CategoryNav({ currentSlug }: CategoryNavProps) {
  return (
    <nav className="w-full border-t border-white/10 pt-16 mt-20" aria-label="Related categories">
      <div className="mb-6 flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#A0A0A0]">
          Explore Other Genres
        </span>
        <Link
          href="/photography"
          className="text-xs font-mono uppercase tracking-[0.2em] text-[#E8B923] hover:underline transition-colors duration-200"
        >
          All Genres →
        </Link>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {categories.map((cat) => {
          const isCurrent = cat.slug === currentSlug;

          return (
            <Link
              key={cat.slug}
              href={`/photography/${cat.slug}`}
              className={`shrink-0 rounded-full px-4 py-2 text-xs uppercase tracking-[0.15em] transition-colors duration-200 ${
                isCurrent
                  ? 'bg-[#E8B923] text-[#020202] font-semibold'
                  : 'bg-white/5 border border-white/10 text-[#A0A0A0] hover:border-white/30 hover:text-[#F0F0F0]'
              }`}
            >
              {cat.shortTitle || cat.title}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
