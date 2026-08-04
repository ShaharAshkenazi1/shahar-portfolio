"use client";

import { useEffect, useRef } from "react";
import { isDesktopPointer } from "@/lib/pointer";

export default function DotGrid() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = spotlightRef.current;
    if (!el || !isDesktopPointer()) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${e.clientX}px`);
        el.style.setProperty("--my", `${e.clientY}px`);
        raf = 0;
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="dot-grid" aria-hidden="true">
      <div className="dot-grid-base" />
      <div ref={spotlightRef} className="dot-grid-spotlight" />
    </div>
  );
}
