# Vocabulary Today

A polished Next.js 14 App Router application that surfaces bite-sized facts with a clean, themeable UI and an image carousel featuring the UAE emirates. Features a complete guest commenting system with anonymous identities, emoji reactions, and nested replies.

<p align="center">
  <a href="https://nextjs.org">Next.js</a> ·
  <a href="https://react.dev/">React</a> ·
  <a href="https://tailwindcss.com/">Tailwind CSS</a> ·
  <a href="https://www.radix-ui.com/">Radix UI</a> ·
  <a href="https://prisma.io">Prisma</a>
</p>

<p align="center">
  <img src="public/vt-logo.png" alt="Vocabulary Today Logo" width="96" />
</p>

---

## Features
- Theme-aware UI (light/dark) with one-click toggle
- Carousel with per-topic images and labels
- Topics sidebar and detail panel with per-topic content
- Dubai article + Blood Falls, Antarctica article (2 min read)
- **Guest commenting system** with context-bound anonymous identities (per article)
- **Emoji reactions** with optimistic updates
- **Nested replies** with View/Hide (Creator replies always visible)
- **Admin/Creator badges** visible to all users (server-verified)
- Email notifications (Resend) for new comments/replies
- Modular component architecture (cards, panels, hooks)
- Favicon and metadata via App Router `metadata`
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
2. Set up environment variables
```bash
# Local development (SQLite)
DATABASE_URL="file:./prisma/dev.db"

# Admin cookie token (any unique string/UUID)
ADMIN_GUEST_TOKEN="your-admin-uuid-here"

# Email (optional)
RESEND_API_KEY="re_xxxxxxxxxx"
ADMIN_EMAIL="your-email@example.com"
RESEND_FROM="onboarding@resend.dev"
```
3. Set up the database
```bash
pnpm prisma generate
pnpm db:push
```
4. Start the dev server
```bash
pnpm dev
```
5. Visit `http://localhost:3000`

### Optional: Set up admin privileges
1. Generate a UUID for admin access
2. Add to `.env`: `ADMIN_GUEST_TOKEN="your-uuid-here"`
3. Visit `/api/admin/set-cookie` to become admin
4. Refresh the page to see Creator badge on your comments

### Optional: Set up email notifications
1. Sign up at [Resend](https://resend.com) (free tier available)
2. Get your API key from the dashboard
3. Add to `.env`:
   ```
   RESEND_API_KEY="re_xxxxxxxxxx"
   ADMIN_EMAIL="your-email@example.com"
   ```
4. Comments and replies will now send email notifications to your inbox

### Images used by the Blood Falls article
Place these images in `public/` (exact names):
- `blood-falls-antarctica-1.jpg` (also used for series card)
- `blood-falls-antarctica-2.jpg`
- `blood-falls-antarctica-3.jpg`
- `blood-falls-antarctica-4.jpg`
Recommended: ~1200×600 JPG or WebP.

## Project structure
```text
app/
  api/
    comments/          # Comments API (GET/POST)
    reactions/         # Emoji reactions API
    admin/             # Admin utilities
      set-cookie/      # Hidden route to set ADMIN_GUEST_TOKEN cookie
    test-email/        # Optional: test Resend integration
  globals.css          # App-level global styles (App Router)
  layout.tsx           # Root layout, fonts, ThemeProvider, metadata, icons
  page.tsx             # Home page (/)
components/
  comments.tsx         # Guest commenting system with reactions
  detail-panel.tsx     # Detail slide-over/panel
  emirates-carousel.tsx# Image/content carousel (supports per-topic images & labels)
  theme-provider.tsx   # Theme context provider (next-themes)
  theme-toggle.tsx     # Theme toggle button
  topic-card.tsx       # Card component for topics/facts
lib/
  anon-name.ts         # Anonymous username generator
  prisma.ts            # Prisma client
  utils.ts             # Utilities (e.g., class name helpers)
prisma/
  schema.prisma        # Database schema
  seed.ts              # Database seeding
public/
  vt-logo.png          # App icon / favicon source (plus other images)
```

## Scripts
- `pnpm dev` – Start Next.js dev server
- `pnpm build` – Production build
- `pnpm start` – Run production server (after build)
- `pnpm lint` – Run Next.js linting
- `pnpm prisma generate` – Generate Prisma client
- `pnpm db:push` – Push schema changes to database
- `pnpm db:seed` – Seed database with initial data

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

### Vercel Postgres setup
1. Create a Vercel Postgres database (choose Prisma Postgres template if shown)
2. In Vercel Project → Settings → Environment Variables, set:
   - `DATABASE_URL` = your Vercel Postgres URL
   - `ADMIN_GUEST_TOKEN`, `RESEND_API_KEY`, `ADMIN_EMAIL`, `RESEND_FROM` as needed
3. Build settings: run Prisma migrations before build (see `vercel-build.sh` if used) or configure "Install Command"/"Build Command" accordingly
4. If a route uses `cookies()`/`headers()`, ensure it is dynamic. Example: `app/api/admin/set-cookie/route.ts` exports `export const dynamic = 'force-dynamic'`.

### Resetting data (production DB)
Use psql or a Postgres UI to clear tables:
```sql
DELETE FROM "CommentReaction";
DELETE FROM "Comment";
DELETE FROM "GuestArticleName";
DELETE FROM "Guest";
-- Optional: DELETE FROM "Article";
```

## Contributing
- Fork the repo, create a feature branch, commit with conventional messages (e.g., `feat: add topic filters`), and open a PR.
- Keep code clear, typed, and consistent with the existing style.

## License
MIT © Contributors

---

## Polishing suggestions (GitHub-worthy)
- Create `.env.example` with placeholder keys to simplify onboarding
- Compress large images in `public/` (JPG/WebP) for faster loads
- Consider `next/image` for automatic responsive images (if you add domains/config)
- Add `format` script: `"format": "prettier --write ."`
- Add basic CI (GitHub Actions) for `pnpm install`, `pnpm build` to catch issues early
- Add OG metadata/social cards via `app/og` for richer link previews
