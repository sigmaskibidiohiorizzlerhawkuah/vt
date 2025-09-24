# Vocabulary Today

A polished Next.js 14 App Router application that surfaces bite-sized facts with a clean, themeable UI and an image carousel featuring the UAE emirates.

<p align="center">
  <a href="https://nextjs.org">Next.js</a> ·
  <a href="https://react.dev/">React</a> ·
  <a href="https://tailwindcss.com/">Tailwind CSS</a> ·
  <a href="https://www.radix-ui.com/">Radix UI</a>
</p>

<p align="center">
  <img src="public/vt-logo.png" alt="Vocabulary Today Logo" width="96" />
</p>

---

## Features
- Theme-aware UI (light/dark) with one-click toggle
- Emirates carousel with responsive images
- Modular component architecture (cards, panels, hooks)
- Favicon and metadata configured via App Router `metadata`
- TypeScript-first setup with sensible defaults

## Demo
- Local: after running the dev server, open `http://localhost:3000`
- Production: deploy with Vercel in minutes (see Deployment)

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
3. Visit `http://localhost:3000`

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
  vt-logo.png          # App icon / favicon source (plus other images)
styles/
  globals.css          # Additional global styles
```

## Scripts
- `pnpm dev` – Start Next.js dev server
- `pnpm build` – Production build
- `pnpm start` – Run production server (after build)
- `pnpm lint` – Run Next.js linting

## Theming & fonts
- `app/layout.tsx` loads the `Montserrat` font and wraps the app in a `ThemeProvider`.
- Use `components/theme-toggle.tsx` to switch between light/dark.

## Favicon / app icons
- Configured in `app/layout.tsx` using `metadata.icons` pointing to `public/vt-logo.png` for icon, shortcut, and Apple touch.
- Replace `public/vt-logo.png` with your own image to change the favicon without additional code changes.

## Deployment
- Vercel recommended:
  1. Push this repo to GitHub
  2. Import the repository in Vercel
  3. Vercel auto-detects Next.js and deploys
- Notes: `next.config.mjs` ignores type and ESLint errors during builds and uses unoptimized images (no Image Optimization) by default.

## Contributing
- Fork the repo, create a feature branch, commit with conventional messages (e.g., `feat: add topic filters`), and open a PR.
- Keep code clear, typed, and consistent with the existing style.

## License
MIT © Contributors
