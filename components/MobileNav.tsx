"use client";

import { useState, useEffect } from "react";

const ITEMS = [
  {
    id: "projects",
    label: "Projects",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    id: "experience",
    label: "Work",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2.5" y="7" width="15" height="10.5" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7 7V5.5a3 3 0 016 0V7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "skills",
    label: "Skills",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M4 10h12M4 6h8M4 14h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "contact",
    label: "Contact",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M2.5 7l7.5 5.5L17.5 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
] as const;

export default function MobileNav() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const sections = ITEMS.map(({ id }) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const topmost = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActive(topmost.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="mobile-nav" aria-label="Sections">
      {ITEMS.map(({ id, label, icon }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`mobile-nav-item${active === id ? " active" : ""}`}
          aria-current={active === id ? "page" : undefined}
        >
          {icon}
          <span>{label}</span>
        </a>
      ))}
    </nav>
  );
}
