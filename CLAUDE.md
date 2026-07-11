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

## Architecture

Single-page portfolio — one route (`app/page.tsx`) that composes all sections in order:

```
Hero → Projects → Experience → Skills → Contact
```

Wrapped by layout-level UI: `Navbar`, `MobileNav`, `Footer`, `FloatingCV`, `ScrollProgress`, `SectionProgress`, `CursorFollower`, `RevealObserver`.

### `components/`
Each section is its own component. UI-only components with no shared state — all data is hardcoded inside each component.

### `lib/`
- **`pointer.ts`** — `isDesktopPointer()` / `useDesktopPointer()`: detects fine-pointer (mouse) vs touch. Used to gate desktop-only interactions.
- **`useMagnetic.ts`** — `useMagnetic<T>(strength, radius)`: hook that applies a CSS `translate` pull effect toward the cursor. Skips on touch devices via `isDesktopPointer()`.

### Design system (`app/globals.css`)
All colors and spacing use CSS custom properties (oklch). Key tokens:
- `--bg`, `--bg-2`, `--bg-3` — background layers
- `--fg`, `--fg-2`, `--muted`, `--muted-2` — text hierarchy
- `--accent`, `--accent-2`, `--accent-ink` — green accent (oklch hue 150)
- `--maxw: 1100px`, `--gutter: clamp(20px, 4vw, 48px)` — layout constraints

Use these tokens in new components; do not hardcode colors.

### Scroll reveal
`RevealObserver` sets up an `IntersectionObserver` that adds a CSS class to elements when they enter the viewport. Animatable elements use this class rather than JS-driven animation per component.
