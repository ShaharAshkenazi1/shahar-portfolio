"use client";

import { useEffect, useState } from "react";
import { isDesktopPointer } from "@/lib/pointer";

const SECTIONS = [
  { id: "hero", label: "Intro" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function SectionProgress() {
  const [active, setActive] = useState(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!isDesktopPointer()) return;

    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => !!el
    );
    if (!els.length) return;

    setEnabled(true);

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = els.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  if (!enabled) return null;

  return (
    <nav className="section-progress" aria-label="Section progress">
      {SECTIONS.map((s, i) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`sp-dot${i === active ? " is-active" : ""}`}
          aria-label={s.label}
          aria-current={i === active ? "true" : undefined}
        >
          <span className="sp-dot-inner" />
        </a>
      ))}
    </nav>
  );
}
