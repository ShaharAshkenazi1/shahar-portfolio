"use client";

import { useEffect, useRef } from "react";
import { isDesktopPointer } from "@/lib/pointer";

export function useMagnetic<T extends HTMLElement>(strength = 0.35, radius = 60) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !isDesktopPointer()) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const reach = radius + Math.max(rect.width, rect.height) / 2;
      const dist = Math.hypot(dx, dy);

      if (dist < reach) {
        const pull = (1 - dist / reach) * strength;
        el.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`;
      } else {
        el.style.transform = "";
      }
    };

    const onLeave = () => {
      el.style.transform = "";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.style.transform = "";
    };
  }, [strength, radius]);

  return ref;
}
