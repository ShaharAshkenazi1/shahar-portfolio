# Shahar Ashkenazi — Portfolio

Personal portfolio site built with Next.js, Tailwind CSS, and Framer Motion.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Add your CV

Drop your CV as `public/cv.pdf`. The "Download CV" button in the hero links to `/cv.pdf`.

## Deploy to Vercel

**Option 1 — Vercel CLI**

```bash
npm i -g vercel
vercel
```

**Option 2 — GitHub import**

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Keep all defaults (Next.js is auto-detected) and click **Deploy**.

## Update LinkedIn URL

In `components/Contact.tsx`, update the `href` for the LinkedIn entry to your actual profile slug.

## Tech stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Font**: Inter (via next/font/google)
- **Dark mode**: System preference (`prefers-color-scheme`)
