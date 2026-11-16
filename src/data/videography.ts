export interface VideoProject {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  videoUrl?: string;
  duration?: string;
  year?: string;
}

export const videoProjects: VideoProject[] = [
  {
    id: 'annual-gala-highlight',
    title: 'Annual Gala Night',
    description:
      'A highlight reel capturing the energy and elegance of a corporate gala evening — from arrivals and speeches to the dance floor.',
    category: 'Event Highlight',
    thumbnail: '/images/videography/annual-gala-highlight.jpg',
    duration: '3:24',
    year: '2024',
  },
  {
    id: 'hyderabad-mornings',
    title: 'Hyderabad Mornings',
    description:
      'A cinematic short exploring the quiet side of Hyderabad at dawn — chai stalls, empty lanes and the first light hitting the old city.',
    category: 'Cinematic Reel',
    thumbnail: '/images/videography/hyderabad-mornings.jpg',
    duration: '2:48',
    year: '2024',
  },
  {
    id: 'cafe-promo',
    title: 'Café Launch Promo',
    description:
      'A promotional video for a specialty café, showcasing the interiors, menu highlights and the overall vibe of the space.',
    category: 'Promotional',
    thumbnail: '/images/videography/cafe-promo.jpg',
    duration: '1:45',
    year: '2023',
  },
  {
    id: 'dance-rehearsal-bts',
    title: 'Dance Rehearsal — Behind the Scenes',
    description:
      'An intimate look at the preparation behind a classical dance performance — warm-ups, costume adjustments and last-minute run-throughs.',
    category: 'Behind the Scenes',
    thumbnail: '/images/videography/dance-rehearsal-bts.jpg',
    duration: '4:12',
    year: '2024',
  },
  {
    id: 'music-fest-recap',
    title: 'Music Festival Recap',
    description:
      'A fast-paced highlight reel from a two-day outdoor music festival — crowd energy, artist performances and backstage moments.',
    category: 'Event Highlight',
    thumbnail: '/images/videography/music-fest-recap.jpg',
    duration: '2:56',
    year: '2023',
  },
  {
    id: 'street-food-trail',
    title: 'Street Food Trail',
    description:
      'A cinematic journey through Hyderabad\'s street food scene — sizzling pans, vibrant colours and the people behind the stalls.',
    category: 'Cinematic Reel',
    thumbnail: '/images/videography/street-food-trail.jpg',
    duration: '3:10',
    year: '2024',
  },
];
