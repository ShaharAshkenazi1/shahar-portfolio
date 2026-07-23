"use client";

import { useEffect, useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";

export default function FloatingCV() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroBtn = document.querySelector<HTMLElement>(".btn-cv");
    if (!heroBtn) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 1.0 }
    );

    observer.observe(heroBtn);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href="/Shahar_Ashkenazi_CV.pdf"
      download="Shahar_Ashkenazi_CV.pdf"
      className={`fab-cv${visible ? " fab-cv--visible" : ""}`}
      aria-label="Download CV"
      onClick={() => sendGAEvent("event", "cv_downloaded", { source: "fab" })}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path
          d="M7 1v9m0 0L3.5 6.5M7 10l3.5-3.5M1.5 12.5h11"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>CV</span>
    </a>
  );
}
