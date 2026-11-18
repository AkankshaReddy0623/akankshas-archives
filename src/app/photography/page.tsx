import type { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import CategoryCard from '@/components/gallery/CategoryCard';
import { categories } from '@/data/categories';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: `Photography Index — ${siteConfig.name}`,
  description: `Explore the complete photography portfolio of ${siteConfig.name} across 12 distinct genres including portraits, classical dance, events, street narratives, and travel.`,
};

export default function PhotographyIndexPage() {
  return (
    <PageLayout
      title="Photography"
      description="Twelve visual genres. Rather than specializing in a single niche, I look for evocative light, honest posture, and genuine emotion wherever they appear."
    >
      <div className="pb-24">
        {/* Genre Index Counter */}
        <div className="mb-12 flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono uppercase tracking-[0.25em] text-[#A0A0A0]">
          <span>12 Genres</span>
          <span>Hyderabad &amp; Beyond</span>
        </div>

        {/* 12 Categories Editorial Index */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.slug}
              category={category}
              index={index}
              priority={index < 3}
            />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
