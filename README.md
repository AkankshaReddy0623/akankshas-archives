# Akanksha Reddy — Photography & Videography Portfolio

A bespoke, production-ready digital portfolio and creative archive for **Akanksha Reddy**, photographer and videographer based in **Hyderabad, India**.

> **"My niche is not having one."**  
> *Photography · Videography · Everything in between.*

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Current Implemented Features](#2-current-implemented-features)
3. [Technology Stack](#3-technology-stack)
4. [Project Directory Structure](#4-project-directory-structure)
5. [Getting Started](#5-getting-started)
6. [Beginner-Friendly Customization Guide](#6-beginner-friendly-customization-guide)
7. [Consolidated Project Status & Architectural History](#7-consolidated-project-status--architectural-history)
8. [GitHub Repository Preparation & Verification](#8-github-repository-preparation--verification)

---

## 1. Project Overview

### Purpose
This project is an immersive digital portfolio built to showcase Akanksha Reddy's multi-disciplinary creative work across **12 distinct photography genres** and **cinematic videography**. It serves as an authoritative personal archive, an interactive showcase, and a direct inquiry gateway for prospective clients, collaborators, and agencies.

### Design Philosophy — The "Unslop" Dark Editorial Aesthetic
Rather than relying on generic modern templates, flat cards, or heavy UI frameworks, the portfolio is crafted with a bespoke, tactile editorial identity:
- **Atmospheric Darkroom Palette:** Deep near-black background (`#020202`), layered surface tones (`#080808`, `#0C0C0C`), crisp off-white typography (`#F0F0F0`), muted descriptors (`#A0A0A0`), and preserved warm gold/yellow accents (`#E8B923`).
- **Tactile Analog Texture:** A fine-grain overlay synthesizing 35mm film grain with organic paper fibres (`GrainOverlay.tsx`), framed with a soft darkroom vignette to add physical texture without muddying text contrast or lifting the deep black baseline.
- **Dimensional 3D Archival Space:** An interactive Three.js environment (`HeroScene3D.tsx`) with floating hairline photographic frames, optical aperture rings, viewfinder brackets, and golden dust particles that respond to mouse motion with calibrated velocity damping.
- **Ambient Lighting System:** The cursor is accompanied by a soft, diffused ambient glow (`CustomCursor.tsx`) that gently illuminates background textures without obscuring artwork.
- **Cinematic Motion:** Centralized, choreographed motion tokens (`animations.ts`) using custom cubic bezier curves and fluid spring physics, fully respectful of reduced-motion accessibility preferences.

---

## 2. Current Implemented Features

Every feature listed below is fully implemented, verified, and running in production:

### 1. Symmetrical 5-Layer Hero Composition
- **Balanced Diagonal Typography Stack:** Five layered instances of the word **"PORTFOLIO"** arranged in an intentional symmetrical diagonal rhythm around a bright off-white central anchor with drop shadows and golden underlay plate.
- **Transparent Cut-Out Portrait:** Seamlessly integrates a high-resolution transparent cut-out photograph (`/images/hero/portrait.webp`) in the foreground (`z-20`), overlapping the typography naturally.
- **Zero React Re-render Parallax:** Parallax mouse movement is decoupled from React's state loop and driven directly by a `requestAnimationFrame` (RAF) ref transform lerp loop for smooth 60fps interaction.
- **Reserved Navigation Zone:** Calibrated top spacing prevents overlap with the floating header across desktop and mobile screens.

### 2. Interactive Three.js 3D Hero Scene
- **Dimensional Archival Space:** Floating photographic wireframe plates, viewfinder corner brackets, rule-of-thirds grid guides, and dual-layer warm golden dust particles.
- **100% GPU Resource Disposal:** Automatically tracks and disposes all geometries, materials, and textures when unmounting, eliminating GPU memory leaks.
- **Background Tab Suspension:** Pauses the rendering loop when the user switches tabs via `document.visibilitychange` to conserve CPU, GPU, and battery.

### 3. Photography Genre Navigation & Masonry Galleries
- **12 Dedicated Photography Disciplines:**
  1. Corporate & Events (`/photography/corporate-events`)
  2. Family & Candid (`/photography/family-candid`)
  3. Portraits (`/photography/portraits`)
  4. Classical Dance (`/photography/classical-dance`)
  5. Theatre & Stage (`/photography/theatre-stage`)
  6. Kids & Childhood (`/photography/kids-childhood`)
  7. Art & Workshops (`/photography/art-workshops`)
  8. Fests & Carnivals (`/photography/fests-carnivals`)
  9. Food, Cafés & Spaces (`/photography/food-cafes-spaces`)
  10. Live Music & Performances (`/photography/live-music`)
  11. Street (`/photography/street`)
  12. Travel & Landscapes (`/photography/travel-landscapes`)
- **Photography Overview (`/photography`):** Editorial index with direct links, genre numbers, and sample plates.
- **Masonry Grid (`GalleryGrid.tsx`):** Preserves native aspect ratios (landscape, portrait, square) without aggressive cropping.
- **Empty State Fallback:** Displays an archival viewfinder graphic with a reset filter action if zero images match a filter.

### 4. Interactive Fullscreen Lightbox
- **Exit & Entrance Animations:** Fully wrapped in `<AnimatePresence>` for smooth entry and exit transitions.
- **Keyboard Navigation:** Full support for `ArrowLeft`, `ArrowRight`, and `Escape` keys.
- **Mobile Touch Swipe:** Detects horizontal swipe gestures (`onTouchStart`, `onTouchMove`, `onTouchEnd`) for natural thumb browsing on mobile devices.
- **Accessibility & Focus Restoration:** Traps focus within the modal while open and restores focus back to the originating thumbnail upon closing.
- **Metadata Display:** Shows current plate index (e.g. `03 / 06`), image title, caption, and a mobile swipe hint.

### 5. Videography Showcase & Modal Player
- **Filterable Category Pills:** Organizes projects by category (*Cinematic Reel*, *Event Highlight*, *Promotional*, *Behind the Scenes*).
- **Interactive Video Cards:** Hover zoom effects, duration tags, and custom play badges.
- **Dedicated Video Player Modal (`VideoPlayerModal.tsx`):** Seamless video playback with backdrop blur and responsive controls.

### 6. Streamlined Single-Screen Contact Page (`/contact`)
- **Single-Screen Desktop Layout:** Heading, introductory copy, 4-card contact grid, navigation bar, and footer all fit within a standard desktop viewport (`100vh`) without vertical scrolling.
- **Priority-Ordered Direct Channels:**
  1. **WhatsApp (Primary Direct Contact):** Highlighted with a gold accent border, gold icon, `PRIMARY` badge, and direct link (`https://wa.me/917382700380`).
  2. **Instagram:** Displays `@akanksha.did.something` (`https://www.instagram.com/akanksha.did.something/`).
  3. **LinkedIn:** Displays `Akanksha Reddy` (`https://www.linkedin.com/in/akanksha-reddy-padamati/`).
  4. **Email:** Displays `akankshareddy0623@gmail.com` (`mailto:akankshareddy0623@gmail.com`).

### 7. Homepage Sections
- **Hero:** Oversized typography echoes, transparent portrait cut-out, Three.js 3D depth, identity block, and primary CTAs.
- **Portfolio Navigation Section:** 12-genre interactive grid with category previews and counters.
- **Videography Showcase Section:** Clean spotlight featuring video reels with direct modal triggers.
- **About Me Section:** Editorial introduction ("Curiosity over confinement") with a streamlined **"MORE ABOUT ME"** link to the full `/about` page.
- **Get in Touch Section:** Clean 4-card horizontal grid matching the contact page priority order.

### 8. Floating Navigation & Header System
- **Floating Pill Navbar (`Header.tsx`):** Centered floating bar with blurred backdrop and gold ambient ring.
- **Grounding Scrolled Backdrop:** A smooth multi-stop gradient (`h-36 sm:h-44 bg-gradient-to-b from-[#020202] via-[#020202]/85 via-[#020202]/40 to-transparent`) emerges on scroll so page content dissolves naturally under the bar.
- **Spring Active Indicator:** Motion for React's `layoutId="activeNavIndicator"` moves seamlessly between links with spring physics.
- **Desktop Dropdown Menu:** 12-genre glassmorphic dropdown with category numbers.
- **Mobile Navigation Drawer:** Fullscreen dark glass overlay with an expandable accordion for all 12 photography genres.
- **Touch Target Accessibility:** All buttons and interactive toggles adhere to WCAG $\ge 44\times 44\text{px}$ touch targets with visible gold focus rings (`focus-visible:ring-1 focus-visible:ring-[#E8B923]`).

### 9. Page Transitions & Centralized Motion
- **Seamless Page Transitions (`template.tsx`):** Subtle 320ms crossfade with 6px vertical settling motion on route changes.
- **Motion Tokens (`animations.ts`):** Centralized easing curves (`easeOut`, `easeIn`, `easeInOut`, `gentle`) and duration tokens (`micro: 0.12s`, `fast: 0.18s`, `standard: 0.24s`, `medium: 0.32s`, `spatial: 0.38s`, `reveal: 0.48s`).

---

## 3. Technology Stack

| Category | Technology | Version | Purpose |
|---|---|---|---|
| **Framework** | [Next.js](https://nextjs.org/) | `16.4.6` | App Router, Static Site Generation (SSG), React Server Components |
| **UI Library** | [React](https://react.dev/) | `19.3.0` | Component architecture & client-side rendering |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `^5.0.0` | Strict static type checking |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `4.3.3` | Utility-first styling with `@theme` design tokens |
| **Motion** | [Motion for React](https://motion.dev/) | `^14.14.0` | Physics-based spring animations, layout transitions, gestures |
| **3D Graphics** | [Three.js](https://threejs.org/) | `^0.187.0` | WebGL archival 3D scene & particle system |
| **Type Definitions** | `@types/three` | `^0.187.0` | TypeScript definitions for Three.js |
| **Icons** | [Lucide React](https://lucide.dev/) | `^1.73.0` | Minimal SVG iconography |
| **Code Quality** | [ESLint](https://eslint.org/) | `^9.0.0` | Static code analysis & Next.js linting rules |

*Note: The website is completely static and data-driven; it currently requires no runtime backend database or external authentication services.*

---

## 4. Project Directory Structure

```text
akanksha-portfolio/
├── .editorconfig               # Cross-editor formatting rules (indent, charset, line endings)
├── .gitignore                  # Git ignore rules for Next.js, caches, OS files, and logs
├── AGENTS.md                   # Next.js 16 development conventions reference
├── eslint.config.mjs           # ESLint configuration
├── next.config.ts              # Next.js configuration (Webpack build flags & optimization)
├── package.json                # Project dependencies, scripts, and metadata
├── package-lock.json           # Deterministic lockfile for npm dependencies
├── tsconfig.json               # TypeScript compiler options (strict mode, path aliases)
├── README.md                   # Master project documentation & customization guide
│
├── public/                     # Static assets served directly from the root URL
│   ├── images/
│   │   ├── hero/
│   │   │   ├── portrait.webp   # Active transparent cut-out hero portrait (optimized WebP)
│   │   │   └── portrait.png    # High-resolution source cut-out portrait (PNG)
│   │   ├── about/
│   │   │   └── portrait.jpg    # About page editorial portrait
│   │   ├── videography/        # Videography project thumbnail images
│   │   ├── photography/        # 12 genre subdirectories containing image plates & thumbnails
│   │   └── og-image.jpg        # OpenGraph social share card preview
│   └── videos/                 # Local video files (optional; or embed external links)
│
├── src/                        # Main application source code
│   ├── app/                    # Next.js App Router (pages and layouts)
│   │   ├── layout.tsx          # Root layout: metadata, fonts, Header, Footer, Grain, Cursor
│   │   ├── template.tsx        # Route transition wrapper with motionTokens
│   │   ├── globals.css         # Global styles & Tailwind v4 theme directives
│   │   ├── page.tsx            # Homepage: Hero, Portfolio, Videography, About, Contact CTA
│   │   ├── about/
│   │   │   └── page.tsx        # Full About page route (/about)
│   │   ├── contact/
│   │   │   └── page.tsx        # Single-screen Contact page route (/contact)
│   │   ├── photography/
│   │   │   ├── page.tsx        # Photography overview route (/photography)
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Dynamic static gallery route (/photography/[slug])
│   │   └── videography/
│   │       └── page.tsx        # Videography showcase route (/videography)
│   │
│   ├── components/             # Reusable UI components organized by domain
│   │   ├── home/
│   │   │   ├── Hero.tsx        # 5-layer balanced typography echoes + portrait cut-out
│   │   │   ├── HeroScene3D.tsx # Three.js WebGL scene with 100% GPU resource disposal
│   │   │   ├── PortfolioSection.tsx # 12-genre portfolio navigation cards
│   │   │   ├── AboutSection.tsx # Homepage editorial bio section
│   │   │   └── ContactCTA.tsx  # Homepage 4-card minimal contact grid
│   │   ├── gallery/
│   │   │   ├── GalleryGrid.tsx # Masonry photography gallery grid with empty state
│   │   │   ├── Lightbox.tsx    # Fullscreen modal viewer with touch swipe & keyboard
│   │   │   └── CategoryNav.tsx # Cross-genre navigation pills
│   │   ├── videography/
│   │   │   ├── VideographyGrid.tsx   # Video card grid with category filtering
│   │   │   └── VideoPlayerModal.tsx  # Video playback modal dialog
│   │   ├── layout/
│   │   │   ├── Header.tsx      # Floating pill navbar, dropdown, and mobile menu
│   │   │   ├── Footer.tsx      # Minimal 3-column footer with copyright & links
│   │   │   └── PageLayout.tsx  # Shared page wrapper with breadcrumb & title
│   │   └── ui/
│   │       ├── GrainOverlay.tsx # Multi-frequency SVG film grain + paper fiber texture
│   │       ├── CustomCursor.tsx # Soft diffused ambient light cursor (zero React re-renders)
│   │       └── ScrollProgress.tsx # Top gold reading progress indicator
│   │
│   ├── data/                   # Typed central data sources (the website's CMS)
│   │   ├── categories.ts       # 12 photography genres, descriptions & 72 image plates
│   │   ├── videography.ts      # Videography projects, categories, durations, and links
│   │   ├── about.ts            # Bio, philosophy, approach, and discipline list
│   │   ├── navigation.ts       # Main navigation menu links
│   │   └── site.ts             # Name, tagline, location, and verified contact channels
│   │
│   ├── lib/                    # Shared libraries and utilities
│   │   ├── animations.ts       # Motion tokens, easing curves, spring presets, reduced motion
│   │   ├── constants.ts        # Design tokens: palette colors, breakpoints, spacing
│   │   └── utils.ts            # Helper functions: cn (clsx/tailwind-merge), path builders
│   │
│   └── styles/
│       └── globals.css         # Custom utility classes and theme configuration
│
└── scripts/
    └── generate-placeholders.js # Utility script to generate procedural placeholder graphics
```

---

## 5. Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- **Node.js:** Version `18.18.0` or higher (Node `20.x` LTS recommended). Verify with:
  ```bash
  node -v
  ```
- **npm:** Included with Node.js (version 9 or higher). Verify with:
  ```bash
  npm -v
  ```

### 1. Installation
Clone or navigate to the project root directory and install dependencies:
```bash
# Navigate to the portfolio directory
cd akanksha-portfolio

# Install project dependencies
npm install
```

### 2. Running the Development Server
Start the local development server:
```bash
npm run dev
```
Once started, open your browser and navigate to:
```text
http://localhost:3000
```
The application supports hot module reloading—edits to code or data files will immediately reflect in the browser.

### 3. Production Build & Static Export
To verify that all TypeScript types, routes, and components compile cleanly for production:
```bash
npm run build
```
This command runs `next build --webpack` and statically prerenders all **20 routes** into optimized HTML, CSS, and JavaScript.

### 4. Running the Production Server Locally
After building, you can preview the production bundle locally:
```bash
npm run start
```

### 5. Running Code Quality Checks
To verify code formatting and TypeScript types without building:
```bash
# Run TypeScript type check
npx tsc --noEmit

# Run ESLint linter
npm run lint
```

### 6. Environment Variables Notice
**This project does not require an `.env` or `.env.local` file to run.**  
All data (content, categories, links, and contact channels) is static, centralized in `src/data/`, and bundled at build time. No API keys or secret tokens are needed. If you later integrate a third-party service (such as an analytics provider or email API), you can create a `.env.local` file (which is already protected in `.gitignore`).

### 7. Common Setup Issues & Troubleshooting

| Issue | Cause | Solution |
|---|---|---|
| **Port 3000 in use** | Another process is using port 3000 | Run on a different port: `npm run dev -- -p 3001` |
| **Node version error** | Node.js version is below 18.18 | Update Node.js to LTS version (20.x or higher) from [nodejs.org](https://nodejs.org/) |
| **TypeScript build cache stale** | Previous build cache corrupted | Delete `.next` and recompile: `rmdir /s /q .next && npm run build` |
| **Windows PowerShell script restriction** | PowerShell ExecutionPolicy blocks npm | Run PowerShell as Admin and execute: `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` |

---

## 6. Beginner-Friendly Customization Guide

Because the website uses a **data-driven architecture**, you do not need to edit complex React JSX or HTML structures to change your content. Most changes are made by editing simple TypeScript files in `src/data/` or placing image files in `public/images/`.

### 1. Updating Personal Information & Taglines
- **File:** [`src/data/site.ts`](file:///c:/akankshas-archive/akanksha-portfolio/src/data/site.ts)
- Open this file to change your name, tagline, subtitle, and location:
  ```typescript
  export const siteConfig = {
    name: 'Akanksha Reddy',
    tagline: 'My niche is not having one.',
    subtitle: 'Photography · Videography · Everything in between.',
    location: 'Hyderabad, India',
    // ...
  };
  ```
- Changing these values automatically updates the Header, Hero, Footer, About page, and Contact cards across the entire website simultaneously.

### 2. Updating Contact Channels & Social Media
- **File:** [`src/data/site.ts`](file:///c:/akankshas-archive/akanksha-portfolio/src/data/site.ts)
- Update your active contact channels:
  ```typescript
  email: 'akankshareddy0623@gmail.com',
  whatsapp: '+91 7382700380',
  whatsappUrl: 'https://wa.me/917382700380',
  instagram: '@akanksha.did.something',
  instagramUrl: 'https://www.instagram.com/akanksha.did.something/',
  linkedin: 'Akanksha Reddy',
  linkedinUrl: 'https://www.linkedin.com/in/akanksha-reddy-padamati/',
  ```
- All contact buttons, footer links, and the 4-card contact grid will immediately update with your new links.

### 3. Replacing the Hero Transparent Cut-Out Portrait
- **Active Asset File:** `public/images/hero/portrait.webp`
- **Source PNG Backup:** `public/images/hero/portrait.png`
- **Guidelines:**
  1. The hero portrait requires an **isolated subject with a transparent background** (alpha channel). Do not use a rectangular photograph with a visible background.
  2. Recommended aspect ratio: approximately `3:4` vertical portrait (e.g. `1200×1600px` or `800×1060px`).
  3. Export your transparent image as a `.webp` (or `.png`), name it `portrait.webp`, and overwrite the file in `public/images/hero/portrait.webp`.
  4. The image will automatically overlap the layered typography with the soft silhouette backlight and bottom dissolve mask.

### 4. Replacing the About Page Portrait
- **File:** `public/images/about/portrait.jpg`
- **Guidelines:** A vertical editorial photograph (`3:4` ratio, e.g. `900×1200px`). Overwrite `public/images/about/portrait.jpg` with your new image.

### 5. Adding, Removing, or Reordering Gallery Photographs
- **Data File:** [`src/data/categories.ts`](file:///c:/akankshas-archive/akanksha-portfolio/src/data/categories.ts)
- **Image Directory:** `public/images/photography/{genre-slug}/`
- Each photography category contains an `images` array. To add a photograph:
  1. Save your photograph into `public/images/photography/{slug}/` (for example: `07.jpg`).
  2. Open `src/data/categories.ts`, find the corresponding category by its `slug` (e.g., `portraits`), and add an entry:
     ```typescript
     {
       src: '/images/photography/portraits/07.jpg',
       alt: 'Portrait of artist in studio',
       caption: 'Studio session, Jubilee Hills',
       width: 1200,
       height: 1600,
       orientation: 'portrait', // 'portrait' | 'landscape' | 'square'
     },
     ```
  3. **To reorder images:** Simply change the order of the items in the `images` array. The masonry grid will arrange them from top to bottom, left to right.
  4. **To remove an image:** Delete its object from the array and remove the file from the folder.

### 6. Updating Category Titles, Descriptions & Thumbnails
- **Data File:** [`src/data/categories.ts`](file:///c:/akankshas-archive/akanksha-portfolio/src/data/categories.ts)
- Each category has:
  - `title`: The full display title (e.g., `'Corporate & Events'`)
  - `shortTitle`: The shorter title used in pills and dropdown menus (e.g., `'Corporate'`)
  - `description`: Editorial sentence describing the genre's aesthetic and philosophy
  - `thumbnail`: Path to the cover image shown on `/photography` and the homepage grid

### 7. Adding or Editing Videography Content
- **Data File:** [`src/data/videography.ts`](file:///c:/akankshas-archive/akanksha-portfolio/src/data/videography.ts)
- **Thumbnail Directory:** `public/images/videography/`
- Add or modify video projects:
  ```typescript
  {
    id: 'hyderabad-monsoon-film',
    title: 'Hyderabad Monsoon Chronicles',
    description: 'A 4K visual poem capturing the Old City under rainfall.',
    category: 'Cinematic Reel', // Choose: 'Cinematic Reel' | 'Event Highlight' | 'Promotional' | 'Behind the Scenes'
    thumbnail: '/images/videography/hyderabad-monsoon.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID', // Direct video file or embed link
    duration: '2:45',
    year: '2026',
  }
  ```

### 8. Editing the About Page Content
- **Data File:** [`src/data/about.ts`](file:///c:/akankshas-archive/akanksha-portfolio/src/data/about.ts)
- Update your biography paragraphs, core philosophy, creative approach, and discipline list.

### 9. Customizing Colors & Styling Tokens
- **Design Tokens:** [`src/lib/constants.ts`](file:///c:/akankshas-archive/akanksha-portfolio/src/lib/constants.ts)
- **Tailwind v4 Theme:** [`src/styles/globals.css`](file:///c:/akankshas-archive/akanksha-portfolio/src/styles/globals.css)
- If you ever want to fine-tune the gold accent or background values:
  - Gold Accent: `#E8B923`
  - Near-Black Canvas: `#020202`
  - Off-White Text: `#F0F0F0`

---

## 7. Consolidated Project Status & Architectural History

*This section permanently consolidates all historical milestones, audits, and architectural decisions from both prior project status logs.*

### Completed Milestones
1. **Balanced Symmetrical Hero Typography Stack:** Replaced asymmetrical right-heavy echoes with a calibrated 5-layer symmetrical diagonal stack centered on the bright white `PORTFOLIO` anchor.
2. **Transparent Cut-Out Portrait Integration:** Replaced the rectangular container with an isolated foreground portrait (`portrait.webp`) in natural proportions with soft ambient backlight and zero border artifacts.
3. **Decoupled Hero Parallax:** Moved mouse parallax from React component state to an internal `requestAnimationFrame` ref transform lerp loop, completely eliminating 60fps re-renders of the Hero DOM.
4. **Three.js WebGL Archival Space:** Built an interactive 3D scene with floating frames, aperture rings, corner brackets, and warm particles. Implemented 100% leak-free GPU disposal arrays and `visibilitychange` tab suspension.
5. **Multi-Frequency Grain & Paper Texture:** Implemented an SVG filter combining fine 35mm grain with organic paper fibers and a darkroom vignette, removing repetitive 256px tiled raster patterns.
6. **Ambient Cursor Illumination:** Completely eliminated the solid yellow circle pointer. Replaced with a subtle 380px radial ambient glow driven by a 60fps RAF lerp loop (disabled on touch & reduced motion).
7. **Centralized Motion Tokens:** Unified all animation durations and custom cubic bezier easing curves in `animations.ts`. Added a cohesive 320ms crossfade route transition in `template.tsx`.
8. **Lightbox Polish:** Wrapped `<AnimatePresence>` around the modal for smooth exits, added touch swipe gesture navigation for mobile, and implemented focus trapping with automatic focus restoration.
9. **Single-Screen Contact Page:** Refined `/contact` so that heading, introductory text, 4 contact cards, header, and footer fit inside 100vh on desktop without vertical scrolling. WhatsApp highlighted as primary contact.
10. **Homepage Contact CTA 4-Card Grid:** Created an equal-sized, 4-card horizontal grid on desktop matching the Contact page channels.
11. **Header & Navigation Elevation:** Added a multi-stop ambient gradient backdrop on scroll (`h-36 sm:h-44`), enlarged mobile touch targets to $\ge 44\times 44\text{px}$, and added high-contrast gold focus rings.
12. **Dead Code Elimination:** Deleted unused, redundant components (`AnimatedSection.tsx`, `GlassCard.tsx`, `ImagePlaceholder.tsx`, `OptimizedImage.tsx`, `SectionHeading.tsx`).
13. **Technical Verification:** TypeScript compilation passed with 0 errors (`npx tsc --noEmit`). Production build compiled cleanly with all **20 static routes** prerendered (`npm run build`).

### Critical Architectural Decisions & Invariants
- **Domain Notice:** The domain `akankshareddy.com` is **not owned** by the author. All metadata, sitemaps, and site configs avoid claiming this domain (`metadataBase` and `siteConfig.url` are kept clean and relative).
- **Preserved Color Palette:** The gold accent (`#E8B923`) and deep near-black background (`#020202`) are permanent brand invariants.
- **Pure Static Architecture:** The website is designed to be hosted on any modern static hosting platform (Vercel, Netlify, Cloudflare Pages, GitHub Pages, or AWS S3/CloudFront) with zero server runtime overhead.

### Pending Content Updates (For the Owner)
- [ ] Replace placeholder photographs in `public/images/photography/` with high-resolution original works.
- [ ] Add original video reels or YouTube/Vimeo embed links in `src/data/videography.ts`.
- [ ] Review personal biography copy in `src/data/about.ts`.
- [ ] Choose an open-source or proprietary license when creating the GitHub repository.

---

## 8. GitHub Repository Preparation & Verification

This project has been cleaned up, structured, and verified prior to Git initialization:

- **Clean Configuration:** A standard `.editorconfig` has been added for consistent indentation and line endings across IDEs.
- **Strict `.gitignore`:** Excludes `node_modules/`, Next.js build outputs (`.next/`, `out/`, `build/`), environment files (`.env*`), debug logs (`*.log`), OS files (`.DS_Store`, `Thumbs.db`), and editor caches (`.idea/`, `.vscode/`).
- **No Secrets or Credentials:** Codebase audited—zero private keys, API secrets, or personal passwords exist in the code.
- **Consolidated Documentation:** Replaced multiple fragmented status files with this unified, comprehensive `README.md`.
- **Validation Run:**
  - TypeScript Check: `npx tsc --noEmit` → **0 errors**
  - Production Build: `npm run build` → **20/20 routes prerendered successfully**

---

## License

All photographs, videography, text content, and creative assets are copyright © Akanksha Reddy. All rights reserved.  
*(You may add a software license such as MIT for the underlying codebase when creating your GitHub repository if desired.)*
