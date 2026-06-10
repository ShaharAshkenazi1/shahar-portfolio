"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { useMagnetic } from "@/lib/useMagnetic";

export default function Navbar() {
  const contactRef = useMagnetic<HTMLAnchorElement>();

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a href="#top" className="mark" aria-label="Home">
          <span className="glyph">S</span>
          <span>Shahar Ashkenazi</span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
        </nav>
        <a
          ref={contactRef}
          href="#contact"
          className="nav-cta magnetic"
          onClick={() => sendGAEvent("event", "contact_clicked")}
        >
          Contact
        </a>
      </div>
    </header>
  );
}
