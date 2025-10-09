# Vocabulary Today

A beautiful, content‑first Next.js 14 site that delivers bite‑sized, high‑impact facts with a playful, themeable interface. Explore curated topics like Dubai as an emirate, Blood Falls in Antarctica, and the Darvaza Gas Crater (“Gates of Hell”), each with vivid imagery, rotating captions, and a focused reading experience. Join the discussion with anonymous‑by‑article identities, emoji reactions, and threaded replies — with optional email notifications for new activity.

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

## What you’ll find
- Theme‑aware UI with instant light/dark toggle
- Three‑pane layout: brand column, series list, and rich detail panel
- Per‑topic hero carousel with optional per‑slide labels
- Curated topics with publish date, read time, and “Fascinating Facts” cards
- Guest comments with per‑article anonymous names and nested replies
- Emoji reactions with toggle behavior and optimistic UI
- Creator badge for admin comments (server‑verified)
- Optional email notifications via Resend

## Live & local
- Local: after starting dev, open `http://localhost:3000`
- Production: deploy with Vercel in minutes (see Deployment)

## Tech stack
- Next.js 14 (App Router, TypeScript)
- React 18
- Tailwind CSS + Radix UI
- Prisma ORM
- next-themes (dark/light)

## Getting started
1. Install dependencies
```bash
pnpm install
```
2. Environment variables (create `.env`)
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
3. Database
```bash
pnpm prisma generate
pnpm db:push
```
4. Start
```bash
pnpm dev
```
5. Visit `http://localhost:3000`

### Admin/Creator access (optional)
Option A — one‑click helper route:
- Set `ADMIN_GUEST_TOKEN` in `.env`
- Visit `/api/admin/set-cookie` to set the cookie in your browser
- Refresh the page; your comments show the Creator badge

Option B — API login:
- POST `/api/admin/login` with JSON `{ "token": "<ADMIN_GUEST_TOKEN>" }`

### Email notifications (optional)
1. Create a free account at [Resend](https://resend.com)
2. Add keys to `.env` (`RESEND_API_KEY`, `ADMIN_EMAIL`, optional `RESEND_FROM`)
3. New comments/replies will send notifications to `ADMIN_EMAIL`

## Content & media
- Topics are defined on `app/page.tsx` as a curated array, each with:
  - `title`, `image`, `category`, `readTime`, `publishDate`
  - `carouselImages` and `carouselLabels` (optional)
  - `facts` list and optional “Did you know?” section
- The carousel falls back to a UAE‑emirates loop if no images are provided.

Recommended image sizes: ~1200×600 JPG/WebP, stored under `public/`.

## Project structure
```text
app/
  api/
    comments/          # GET/POST comments with anon identities
    reactions/         # Toggle + aggregate emoji reactions
    admin/
      login/           # POST token to set admin cookie
      set-cookie/      # Helper route to set ADMIN_GUEST_TOKEN cookie
    test-email/        # Optional: test Resend integration
  globals.css          # Global styles
  layout.tsx           # Metadata, fonts, ThemeProvider
  page.tsx             # Home (series + detail panel)
components/
  comments.tsx         # UI for comments + reactions
  detail-panel.tsx     # Rich article view + facts
  emirates-carousel.tsx# Hero carousel with labels
  theme-provider.tsx   # next-themes provider
  theme-toggle.tsx     # Theme toggle button
  topic-card.tsx       # Series list item
lib/
  anon-name.ts         # Anonymous name generator
  prisma.ts            # Prisma client
  utils.ts             # UI helpers
prisma/
  schema.prisma        # DB schema
  seed.ts              # Seed data (optional)
public/
  vt-logo.png          # App icon / favicon source
```

## API overview
- `GET /api/comments?articleSlug=<slug>` → list comments, current username, admin flag
- `POST /api/comments` `{ articleSlug, content, parentId? }` → create comment
- `POST /api/reactions` `{ commentId, emoji }` → toggle reaction
- `GET /api/reactions?commentId=<id>&commentId=<id>` → counts per emoji
- `GET /api/admin/set-cookie` → set Creator cookie (dev helper)
- `POST /api/admin/login` `{ token }` → programmatic Creator login

## Scripts
- `pnpm dev` – Start Next.js dev server
- `pnpm build` – Production build
- `pnpm start` – Run production server (after build)
- `pnpm lint` – Run Next.js linting
- `pnpm prisma generate` – Generate Prisma client
- `pnpm db:push` – Push schema changes to database
- `pnpm db:seed` – Seed database

## Theming & fonts
- `app/layout.tsx` loads `Montserrat` and wraps the app in `ThemeProvider`.
- Use `components/theme-toggle.tsx` to switch themes.

## Favicon / icons
- Configured in `app/layout.tsx` via `metadata.icons` pointing to `public/vt-logo.png`.
- Replace `public/vt-logo.png` to change the favicon without additional config.

## Deployment
- Vercel is recommended:
  1. Push to GitHub
  2. Import in Vercel
  3. Deploy (Next.js auto‑detected)
- Notes: builds can ignore ESLint/type errors and use unoptimized images depending on your `next.config.mjs`.

### Vercel Postgres
1. Create a Vercel Postgres database
2. Set env vars: `DATABASE_URL`, `ADMIN_GUEST_TOKEN`, `RESEND_API_KEY`, `ADMIN_EMAIL`, `RESEND_FROM`
3. Ensure routes that use `cookies()`/`headers()` are dynamic (see `app/api/admin/set-cookie/route.ts`).

### Reset production data
Use psql or a Postgres UI:
```sql
DELETE FROM "CommentReaction";
DELETE FROM "Comment";
DELETE FROM "GuestArticleName";
DELETE FROM "Guest";
-- Optional: DELETE FROM "Article";
```

## Contributing
- Fork, branch, commit (conventional), PR.
- Keep code clear, typed, and consistent.

## License
MIT © Contributors

---

## Polish checklist
- Add `.env.example` with placeholders
- Compress large `public/` images (JPG/WebP)
- Consider `next/image` if you add domains/config
- Add `format` script: `"format": "prettier --write ."`
- Add simple CI (install + build)
- Add OG metadata/social cards under `app/og`
