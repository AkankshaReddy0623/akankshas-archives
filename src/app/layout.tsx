import type { Metadata } from 'next';
import '@/styles/globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GrainOverlay from '@/components/ui/GrainOverlay';
import ScrollProgress from '@/components/ui/ScrollProgress';
import CustomCursor from '@/components/ui/CustomCursor';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: `${siteConfig.name} — Photography & Videography`,
  description: `${siteConfig.name} is a photographer and videographer based in ${siteConfig.location}. "${siteConfig.tagline}" Exploring diverse genres, portraits, dance, street, events, and cinematic stories.`,
  openGraph: {
    title: `${siteConfig.name} — Photography & Videography`,
    description: `${siteConfig.name} is a photographer and videographer based in ${siteConfig.location}. "${siteConfig.tagline}" Exploring diverse genres, portraits, dance, street, events, and cinematic stories.`,
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
    type: 'website',
    locale: 'en_US',
    siteName: siteConfig.name,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#020202] text-[#F0F0F0] font-sans antialiased selection:bg-[#E8B923] selection:text-[#020202] min-h-screen flex flex-col">
        <ScrollProgress />
        <CustomCursor />
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <GrainOverlay />
      </body>
    </html>
  );
}
