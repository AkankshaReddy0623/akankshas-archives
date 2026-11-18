import type { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import VideographyGrid from '@/components/videography/VideographyGrid';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: `Videography — ${siteConfig.name}`,
  description: `Cinematic motion, event highlight films, behind-the-scenes visual documents and promotional pieces directed and shot by ${siteConfig.name} in Hyderabad, India.`,
};

export default function VideographyPage() {
  return (
    <PageLayout
      title="Videography"
      description="Motion captures tempo, voice, and atmosphere in ways static frames cannot. Here is a curated selection of event highlights, cinematic vignettes, and narrative reels."
    >
      <div className="pb-24">
        <VideographyGrid />
      </div>
    </PageLayout>
  );
}
