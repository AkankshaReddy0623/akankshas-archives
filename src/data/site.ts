export interface SiteConfig {
  name: string;
  tagline: string;
  subtitle: string;
  location: string;
  email: string;
  instagram: string;
  instagramUrl: string;
  description: string;
  ogImage: string;
  url: string;
}

export const siteConfig: SiteConfig = {
  name: 'Akanksha Reddy',
  tagline: 'My niche is not having one.',
  subtitle: 'Photography · Videography · Everything in between.',
  location: 'Hyderabad, India',
  email: 'hello@akankshareddy.com',
  instagram: '@akankshareddy',
  instagramUrl: 'https://instagram.com/akankshareddy',
  description:
    'Akanksha Reddy is a photographer and videographer based in Hyderabad, India — capturing stories across portraits, events, dance, street life and everything in between.',
  ogImage: '/images/og-image.jpg',
  url: 'https://akankshareddy.com',
};
