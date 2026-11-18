export const COLORS = {
  deepBlack: '#020202',
  secondaryBlack: '#040404',
  elevatedBlack: '#080808',
  cardBlack: '#0C0C0C',
  hoverBlack: '#121212',
  charcoal: '#161616',
  offWhite: '#F0F0F0',
  secondaryText: '#A0A0A0',
  mutedGrey: '#707070',
  gold: '#E8B923',
} as const;

export const BREAKPOINTS = {
  mobile: 375,
  tablet: 768,
  laptop: 1024,
  desktop: 1440,
} as const;

export const ANIMATION = {
  duration: {
    fast: 0.2,
    normal: 0.4,
    slow: 0.6,
    hero: 0.8,
  },
  ease: {
    smooth: [0.25, 0.1, 0.25, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
  },
} as const;

export const GRID = {
  maxWidth: 1440,
  gutter: 24,
  columns: 12,
} as const;
