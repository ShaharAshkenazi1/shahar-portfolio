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

Wrapped by layout-level UI: `Navbar`, `MobileNav`, `Footer`, `FloatingCV`, `ScrollProgress`, `SectionProgress`.

### `components/`
Each section is its own component. UI-only components with no shared state - all data is hardcoded inside each component.

Key non-section components:
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

### CV download tracking
Both the hero CV button (`components/Hero.tsx`) and the floating button (`components/FloatingCV.tsx`) fire:
1. A GA event (`cv_downloaded`) via `sendGAEvent`
2. A POST to `/api/cv-click` which emails the owner via Resend

## Environment variables
| Variable | Where | Purpose |
|----------|-------|---------|
| `RESEND_API_KEY` | Vercel (sensitive) | Resend email API key for CV download notifications |

## End of every session

Before finishing any session that touched code, do all four — the owner should never need to ask:

1. **Run `npm run lint` and `npm run build`** before pushing. Vercel auto-deploys from `main`, so a broken build must never be pushed.
2. **Commit and push** whatever is finished. Nothing should be left staged or local-only.
3. **Update this file** if something was learned that the next session needs and isn't obvious from the code — a non-obvious gotcha, a new setup step, a pattern to follow or avoid.
4. **Sync the North AI homepage.** Derive a short, plain-language goal/next-move phrase (project-card length, e.g. "Add North AI to the projects section" — not a paragraph) describing what this session left as the next thing to do. Write it via the Supabase MCP (project id `ogffbptcudyoikmrrukf`):
   ```sql
   update public.projects
   set current_goal = '<derived text>', updated_at = now()
   where id = 'portfolio';
   ```
   This is what North AI's homepage shows for Portfolio, so it should read like a real next move, not a status label. No approval needed — this runs automatically. If the write fails (MCP unavailable, etc.), note it and move on; never block session close on it.

If the session ends mid-task, say so plainly (what's done, what's left, what branch) rather than leaving it to be discovered.

### "Session shut-down" check

When the owner writes **"session shut-down"**, treat it as a request for a read-only status check, not a new round of the checklist above. Verify, in this order:

1. **Git**: `git status --short` is clean (nothing staged/unstaged/untracked that matters), and the current branch's HEAD matches its `origin` remote (fetch and compare — don't assume a local push landed).
2. **Build**: the last push passed `npm run build` locally, and Vercel's latest deployment for `main` is READY, not ERROR.
3. **North AI sync**: the `portfolio` row's `current_goal` in North AI's Supabase (project `ogffbptcudyoikmrrukf`) reflects current reality — read it back with `select current_goal from public.projects where id = 'portfolio';` and confirm it isn't describing already-finished work.

Then answer with a direct **yes** or **no** first, before any detail — the owner wants a fast readback, not a re-walk of the checklist. If "no", say exactly what's still open (uncommitted file, unpushed commit, stale goal, etc.) so it's a punch list, not a re-investigation.
