# Vocabulary Today App

A Next.js 14 App Router project showcasing random facts with a clean UI, theming, and a UAE emirates carousel. Favicon and global theming are wired in the root layout.

## Tech stack
- Next.js 14 (App Router, TypeScript)
- React 18
- Tailwind CSS 4 + PostCSS
- Radix UI primitives / shadcn-style components
- next-themes for dark/light theme

## Getting started
1. Install dependencies
```bash
pnpm install
```
2. Start the dev server
```bash
pnpm dev
```
3. Open `http://localhost:3000`

## Scripts
- `pnpm dev`: Start Next.js dev server
- `pnpm build`: Production build
- `pnpm start`: Start production server (after build)
- `pnpm lint`: Run Next.js linting

## Project structure
```text
app/
  globals.css          # App-level global styles (App Router)
  layout.tsx           # Root layout, fonts, ThemeProvider, metadata, icons
  page.tsx             # Home page (/)
components/
  detail-panel.tsx     # Detail slide-over/panel
  emirates-carousel.tsx# Image/content carousel
  theme-provider.tsx   # Theme context provider (next-themes)
  theme-toggle.tsx     # Theme toggle button
  topic-card.tsx       # Card component for topics/facts
hooks/
  use-mobile.ts        # Viewport/mobile detection
  use-toast.ts         # Toast primitive wrapper
lib/
  utils.ts             # Utilities (e.g., class name helpers)
public/
  vt-logo.png          # Favicon source (also other images)
styles/
  globals.css          # Additional global styles
```

## Theming & fonts
- `app/layout.tsx` loads the `Montserrat` font and wraps the app in `ThemeProvider`.
- Use `components/theme-toggle.tsx` to switch between light/dark.

## Favicon / app icons
- Configured in `app/layout.tsx` via `metadata.icons` and points to `public/vt-logo.png` for icon, shortcut, and Apple touch.
- Replace `public/vt-logo.png` to change the favicon without code changes.

## Deployment
- Works well on Vercel:
  1. Push to a Git repo
  2. Import the project in Vercel
  3. Automatic Next.js build and deploy
- `next.config.mjs` ignores type and ESLint errors during builds and uses unoptimized images.

## Notes
- Routes follow App Router conventions. Example: `app/about/page.tsx` → `/about`.
- Images live under `public/` and are referenced by path (e.g., `/vt-logo.png`).
