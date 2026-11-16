export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Photography', href: '/photography' },
  { label: 'Videography', href: '/videography' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];
