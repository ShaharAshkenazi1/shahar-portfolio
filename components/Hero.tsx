"use client";

import Image from "next/image";
import { sendGAEvent } from "@next/third-parties/google";
import { useMagnetic } from "@/lib/useMagnetic";
import Terminal from "@/components/Terminal";
import RoleTypewriter from "@/components/RoleTypewriter";
import ParticleNetwork from "@/components/ParticleNetwork";

export default function Hero() {
  const cvRef = useMagnetic<HTMLAnchorElement>();
  const workRef = useMagnetic<HTMLAnchorElement>();
  return (
    <section className="hero" id="hero">
      <ParticleNetwork />
      <div className="wrap">

        <div className="hero-meta">
          <span className="label" data-reveal="">Tel Aviv, Israel</span>
        </div>

        <div className="hero-identity">
          <div className="hero-identity-text">
            <h1 className="hero-name" data-reveal="">Shahar Ashkenazi.</h1>
            <p className="hero-role" data-reveal="">
              <RoleTypewriter />
            </p>
            <span className="hero-badge" data-reveal="">
              <span className="hero-badge-dot" />
              Open to opportunities
            </span>
          </div>
          <div className="hero-photo-wrap" data-reveal="">
            <span className="hero-photo-placeholder" aria-hidden="true">
              Drop photo<br />shahar.png
            </span>
            <Image
              src="/images/shahar.png"
              alt="Portrait of Shahar Ashkenazi"
              fill
              priority
              style={{
                objectFit: "cover",
                objectPosition: "center 22%",
                transform: "scale(1.23) translateX(-10%)",
                transformOrigin: "center center",
                zIndex: 2,
              }}
            />
          </div>
        </div>

        <div className="hero-sub">
          <Terminal />

          <div className="cta-row" data-reveal="">
            <a
              ref={cvRef}
              className="btn btn-cv magnetic"
              href="/Shahar_Ashkenazi_CV.pdf"
              download="Shahar_Ashkenazi_CV.pdf"
              onClick={() => {
                sendGAEvent("event", "cv_downloaded");
                fetch("/api/cv-click", { method: "POST" });
              }}
            >
              <svg
                className="cv-icon"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M7 1v9m0 0L3.5 6.5M7 10l3.5-3.5M1.5 12.5h11"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Download CV
            </a>
            <a ref={workRef} className="btn btn-ghost magnetic" href="#projects">
              View my work <span className="arr">→</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
