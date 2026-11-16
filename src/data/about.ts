export interface AboutContent {
  intro: string;
  philosophy: string;
  approachTitle: string;
  approach: string;
  interests: string[];
  portrait: string;
}

export const aboutContent: AboutContent = {
  intro:
    "I'm a photographer drawn to different stories, people, places and perspectives. From carefully composed portraits to fleeting candid moments, I enjoy exploring photography without limiting myself to a single genre.",
  philosophy:
    "I believe the most interesting work comes from staying curious. Every genre teaches you something new — the patience of portrait work, the instinct of street photography, the energy of live events. I don't want to pick one and forget the rest. Versatility isn't a lack of focus; it's a choice to keep exploring, to let each kind of photography sharpen the others. The camera is the same, but every story asks for something different, and that's what keeps it exciting.",
  approachTitle: 'How I Work',
  approach:
    "Whether it's a quiet afternoon portrait session or a chaotic festival, I try to stay present and let the moment lead. I'm drawn to natural light, honest expressions and the kind of frames that feel lived-in rather than posed. I shoot with intention but leave room for surprise — some of my favourite images are the ones I almost didn't take.",
  interests: [
    'Portrait & editorial photography',
    'Candid & documentary moments',
    'Classical dance & performing arts',
    'Street & travel photography',
    'Event & conference coverage',
    'Food & space photography',
    'Short-form cinematic video',
    'Behind-the-scenes storytelling',
  ],
  portrait: '/images/about/portrait.jpg',
};
