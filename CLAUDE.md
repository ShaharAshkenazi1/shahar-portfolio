# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run lint     # ESLint
```

No test suite exists in this project.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript** · **Tailwind CSS v4**
- **framer-motion** for animations, **lucide-react** for icons
- **@vercel/analytics** + **Google Analytics** (`G-XCCESCW7BC`) wired in `app/layout.tsx`
- **Resend** for transactional email (`resend` package, API key in `RESEND_API_KEY` env var)

## Architecture

Single-page portfolio — one route (`app/page.tsx`) that composes all sections in order:

```
Hero -> Projects -> Experience -> Skills -> Contact
```

Wrapped by layout-level UI: `Navbar`, `AnnouncementBanner`, `MobileNav`, `Footer`, `FloatingCV`, `ScrollProgress`, `SectionProgress`, `CursorFollower`, `RevealObserver`.

Page content fades in on first load via `PageTransition` (wraps `{children}` in `app/layout.tsx`).

### `components/`
Each section is its own component. UI-only components with no shared state - all data is hardcoded inside each component.

Key non-section components:
- **`AnnouncementBanner`** - sticky "Open to roles" bar below navbar, dismissed once per session via `sessionStorage`
- **`PageTransition`** - framer-motion fade+slide wrapper applied at layout level
- **`FloatingCV`** - fixed bottom-right CV download button, appears when hero CV button scrolls out of view

### `app/api/cv-click/route.ts`
POST endpoint called by both CV download buttons (hero + floating). Sends an email to `ashkenazi1997@gmail.com` via Resend on every click. Requires `RESEND_API_KEY` env var (set in Vercel, not in code).

### `lib/`
- **`pointer.ts`** - `isDesktopPointer()` / `useDesktopPointer()`: detects fine-pointer (mouse) vs touch. Used to gate desktop-only interactions.
- **`useMagnetic.ts`** - `useMagnetic<T>(strength, radius)`: hook that applies a CSS `translate` pull effect toward the cursor. Skips on touch devices via `isDesktopPointer()`.

### Design system (`app/globals.css`)
All colors and spacing use CSS custom properties (oklch). Key tokens:
- `--bg`, `--bg-2`, `--bg-3` - background layers
- `--fg`, `--fg-2`, `--muted`, `--muted-2` - text hierarchy
- `--accent`, `--accent-2`, `--accent-ink` - green accent (oklch hue 150)
- `--maxw: 1100px`, `--gutter: clamp(20px, 4vw, 48px)` - layout constraints

Use these tokens in new components; do not hardcode colors.

### Scroll reveal
`RevealObserver` sets up an `IntersectionObserver` that adds a CSS class to elements when they enter the viewport. Animatable elements use this class rather than JS-driven animation per component.

### CV download tracking
Both the hero CV button (`components/Hero.tsx`) and the floating button (`components/FloatingCV.tsx`) fire:
1. A GA event (`cv_downloaded`) via `sendGAEvent`
2. A POST to `/api/cv-click` which emails the owner via Resend

## Environment variables
| Variable | Where | Purpose |
|----------|-------|---------|
| `RESEND_API_KEY` | Vercel (sensitive) | Resend email API key for CV download notifications |
