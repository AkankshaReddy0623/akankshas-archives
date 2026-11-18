import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageLayout from '@/components/layout/PageLayout';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import CategoryNav from '@/components/gallery/CategoryNav';
import { categories } from '@/data/categories';
import { siteConfig } from '@/data/site';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: `Gallery Not Found — ${siteConfig.name}`,
    };
  }

  return {
    title: `${category.title} — Photography — ${siteConfig.name}`,
    description: `${category.description} Photography portfolio by ${siteConfig.name}, based in ${siteConfig.location}.`,
  };
}

export default async function CategoryGalleryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const indexNumber = categories.findIndex((c) => c.slug === slug) + 1;
  const indexFormatted = String(indexNumber).padStart(2, '0');

  return (
    <PageLayout
      showBackLink
      backHref="/photography"
      backLabel="All Genres"
    >
      {/* Category Editorial Hero */}
      <div className="mb-12 border-b border-white/10 pb-8">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#E8B923]">
          {indexFormatted} {'//'} Photography
        </span>

        <h1 className="mt-3 font-serif text-4xl sm:text-5xl md:text-6xl text-[#F0F0F0] font-light tracking-tight">
          {category.title}
        </h1>

        <p className="mt-4 max-w-2xl text-base sm:text-lg text-[#A0A0A0] font-light leading-relaxed">
          {category.description}
        </p>
      </div>

      {/* Masonry / Justified Editorial Image Gallery */}
      <GalleryGrid images={category.images} categoryTitle={category.title} />

      {/* Cross-Category Navigation */}
      <CategoryNav currentSlug={category.slug} />
    </PageLayout>
  );
}
