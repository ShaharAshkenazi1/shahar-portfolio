"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import {
  motion,
  useInView,
  useMotionValue,
  useMotionTemplate,
  useSpring,
} from "framer-motion";
import { isDesktopPointer } from "@/lib/pointer";
import { useMagnetic } from "@/lib/useMagnetic";

const view = { once: true, margin: "-60px" as const };
const t = { duration: 0.55, ease: "easeOut" as const };

const MAX_TILT = 9;

function useCardTilt() {
  const ref = useRef<HTMLButtonElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glareOpacity = useMotionValue(0);

  const rotateX = useSpring(rx, { stiffness: 280, damping: 28 });
  const rotateY = useSpring(ry, { stiffness: 280, damping: 28 });
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.4), transparent 60%)`;

  const onMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isDesktopPointer()) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rx.set((0.5 - py) * MAX_TILT * 2);
    ry.set((px - 0.5) * MAX_TILT * 2);
    gx.set(px * 100);
    gy.set(py * 100);
  };

  const onMouseEnter = () => {
    if (isDesktopPointer()) glareOpacity.set(1);
  };

  const onMouseLeave = () => {
    rx.set(0);
    ry.set(0);
    glareOpacity.set(0);
  };

  return { ref, rotateX, rotateY, glareBackground, glareOpacity, onMouseMove, onMouseEnter, onMouseLeave };
}

const PROJECTS = {
  headup: {
    eyebrow: "Case study · 01",
    title: "HeadUp",
    tagline:
      "A mobile wellness product that detects unhealthy smartphone posture in real time using phone sensors and delivers haptic feedback to build better habits - built end-to-end, then pivoted from B2C to B2B.",
    meta: [
      { label: "Role",     val: "Product Lead & Android Developer" },
      { label: "Program",  val: "Cherry Seed · Duvdevan Foundation × Reichman U." },
      { label: "Stack",    val: "Android · Kotlin · IMU Sensors · Foreground Services" },
      { label: "Timeline", val: "Nov 2025 - Mar 2026" },
    ],
    gallery: [
      { label: "Home / onboarding screen", img: "/images/headup-1.jpg" },
      { label: "Posture coaching state",   img: "/images/headup-2.png" },
      { label: "Insights & history view",  img: "/images/headup-3.png" },
    ],
    sections: [
      {
        title: "Overview",
        body: [
          `<ul>
            <li>Detects "Text Neck" via phone IMU sensors in real time</li>
            <li>Haptic nudge when bad posture detected - no popup, no sound</li>
            <li>Built in Cherry Seed accelerator, pivoted B2C → B2B after market validation</li>
          </ul>`,
        ],
      },
      {
        title: "Role & Ownership",
        body: [
          `<ul>
            <li>Solo PM + Android developer</li>
            <li>Owned everything: strategy, build, sensors, haptics, pitch, validation</li>
          </ul>`,
        ],
      },
      {
        title: "Product Vision",
        body: [
          `<ul>
            <li>Smartphone already knows its orientation - use it</li>
            <li>B2C showed low willingness to pay → repositioned as B2B employee wellness tool</li>
            <li>Same tech, different buyer: HR teams vs. individuals</li>
          </ul>`,
        ],
      },
      {
        title: "System Design",
        body: [
          `<ul>
            <li>Android Foreground Service - OS can't kill it</li>
            <li>IMU reads device tilt continuously</li>
            <li>Bad posture → haptic pattern via Vibrator API</li>
            <li>No backend required - runs entirely on-device</li>
          </ul>`,
        ],
      },
      {
        title: "Tech Stack",
        body: [
          "<p>Android Studio · Kotlin · Foreground Services · IMU Sensors · Haptic API · Vercel</p>",
        ],
      },
      {
        title: "Key Decisions",
        body: [
          `<ul>
            <li><strong>Foreground Service</strong> - keeps detection alive under memory pressure</li>
            <li><strong>Haptic-first</strong> - felt, not seen. Zero flow interruption</li>
            <li><strong>Sensor-only</strong> - no camera, no mic, no location. Privacy by design</li>
            <li><strong>B2B pivot</strong> - enterprise wellness budgets are real, consumer isn't</li>
          </ul>`,
        ],
      },
      {
        title: "Problems I Solved",
        body: [
          `<ul>
            <li><strong>IMU data is noisy</strong> - calibrated thresholds to distinguish bad posture from walking, lying down, pockets</li>
            <li><strong>Battery drain</strong> - tuned polling intervals for 8hr+ continuous use without impact</li>
            <li><strong>Android kills background processes</strong> - solved with Foreground Service + wakelock management</li>
            <li><strong>Permissions denied by default</strong> - handled battery exemptions, notifications across Android versions</li>
            <li><strong>Too much feedback = uninstall. Too little = no behavior change</strong> - found the right cadence through user testing</li>
            <li><strong>B2C showed low willingness to pay</strong> - pivoted to B2B enterprise wellness. Same tech, different buyer</li>
          </ul>`,
        ],
      },
    ],
  },

  carvertise: {
    eyebrow: "Case study · 02",
    title: "Carvertise",
    tagline:
      "A geofence-first advertising platform for digital screens installed in vehicles - content is dynamically requested based on real-time GPS location, not pushed on a fixed schedule.",
    meta: [
      { label: "Role",     val: "Solo PM & Builder" },
      { label: "Scope",    val: "MVP + technical spike" },
      { label: "Stack",    val: "Android · Kotlin · Firebase · GPS · JSON APIs" },
      { label: "Timeline", val: "2025" },
    ],
    gallery: [
      { label: "Zone management web view", img: "/images/carvetise-1.jpeg" },
      { label: "In-vehicle ad delivery",   img: "/images/carvetise-2.jpeg" },
      { label: "Geofence boundary state",  img: "/images/carvetise-3.jpeg" },
    ],
    sections: [
      {
        title: "Overview",
        body: [
          `<ul>
            <li>Geofence-first ad engine for in-vehicle screens</li>
            <li>Content requested by GPS location - not pushed on a fixed schedule</li>
            <li>Lightweight MVP to validate the core loop before investing in infrastructure</li>
          </ul>`,
        ],
      },
      {
        title: "Role & Ownership",
        body: [
          `<ul>
            <li>Solo PM + Android developer</li>
            <li>Owned everything: architecture, Android dev, geofence logic, Firebase, media delivery</li>
          </ul>`,
        ],
      },
      {
        title: "Product Vision",
        body: [
          `<ul>
            <li>Out-of-home ads are static - same message everywhere</li>
            <li>Hypothesis: location-triggered content outperforms fixed-schedule ads</li>
            <li>No ML stack needed - just location + timing</li>
          </ul>`,
        ],
      },
      {
        title: "System Design",
        body: [
          `<ul>
            <li>Android app subscribes to continuous GPS updates</li>
            <li>Zone map stored as remote JSON on cPanel server</li>
            <li>Zone match detected - Glide loads correct ad asset</li>
            <li>Firebase handles live config sync</li>
            <li>All zone matching runs on-device - no backend round-trip per check</li>
          </ul>`,
        ],
      },
      {
        title: "Tech Stack",
        body: [
          "<p>Android Studio · Kotlin · GPS APIs · Firebase Realtime DB · JSON APIs · Glide · cPanel</p>",
        ],
      },
      {
        title: "Key Decisions",
        body: [
          `<ul>
            <li><strong>Geofence-first</strong> - location decides the ad, not time</li>
            <li><strong>Client-side matching</strong> - low latency, no server call per zone check</li>
            <li><strong>Remote JSON config</strong> - update zones without app release</li>
            <li><strong>Offline fallback</strong> - last known ad shown if GPS/connectivity drops</li>
          </ul>`,
        ],
      },
      {
        title: "Problems I Solved",
        body: [
          `<ul>
            <li><strong>GPS error margins</strong> - tuned zone radius to avoid false positives from nearby zones</li>
            <li><strong>Fast-moving vehicles</strong> - GPS updates every 1-5s, handled with predictive zone buffering</li>
            <li><strong>Connectivity drops in tunnels/parking</strong> - graceful degradation, cache last valid ad</li>
            <li><strong>Media buffering during zone transitions</strong> - solved with Glide prefetch + memory cache</li>
            <li><strong>Firebase sync conflicts</strong> - handled config updates arriving mid-session</li>
          </ul>`,
        ],
      },
    ],
  },
} satisfies Record<string, {
  eyebrow: string;
  title: string;
  tagline: string;
  meta: { label: string; val: string }[];
  gallery: { label: string; img: string | null }[];
  sections: { title: string; body: string[] }[];
}>;

type ProjectKey = keyof typeof PROJECTS;

function ProjectModal({
  projectKey,
  onClose,
}: {
  projectKey: ProjectKey;
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const closingRef = useRef(false);
  const touchStartY = useRef(0);
  const modalInnerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const project = PROJECTS[projectKey];

  const handleClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setVisible(false);
    setTimeout(onClose, 350);
  }, [onClose]);

  useEffect(() => {
    let outerRaf: number;
    let innerRaf: number;
    outerRaf = requestAnimationFrame(() => {
      innerRaf = requestAnimationFrame(() => {
        setVisible(true);
        closeButtonRef.current?.focus();
      });
    });
    document.body.classList.add("modal-open");

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", onKey);
      cancelAnimationFrame(outerRaf);
      cancelAnimationFrame(innerRaf);
    };
  }, [handleClose]);

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const delta = e.touches[0].clientY - touchStartY.current;
    if (delta > 120 && (modalInnerRef.current?.scrollTop ?? 0) <= 0) handleClose();
  };

  return (
    <div
      className={`modal-root is-open${visible ? " is-visible" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
    >
      <div className="modal-backdrop" onClick={handleClose} />
      <div className="modal" role="document">
        <button
          ref={closeButtonRef}
          className="modal-close"
          type="button"
          aria-label="Close"
          onClick={handleClose}
        >
          <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M1 1l12 12M13 1L1 13"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="modal-inner" ref={modalInnerRef}>
          <header className="modal-head">
            <div className="label accent">{project.eyebrow}</div>
            <h2 id="modal-title">{project.title}</h2>
            <p className="modal-tagline">{project.tagline}</p>
          </header>

          <div className="modal-meta">
            {project.meta.map((m) => (
              <div key={m.label}>
                <div className="mm-label">{m.label}</div>
                <div className="mm-val">{m.val}</div>
              </div>
            ))}
          </div>

          <div className="modal-gallery">
            {project.gallery.map((g, i) => (
              <div key={i} className="gallery-slot">
                <span className="gs-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {g.img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={g.img} alt={g.label} />
                ) : (
                  <span className="gs-label">
                    {g.label}
                    <br />
                    <span style={{ opacity: 0.6 }}>drop screenshot</span>
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="modal-body">
            <div>
              {project.sections.map((s) => (
                <div key={s.title} className="modal-section">
                  <h4>{s.title}</h4>
                  {s.body.map((html, i) => (
                    <div
                      key={i}
                      dangerouslySetInnerHTML={{ __html: html }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <button
            className="modal-close-bottom"
            type="button"
            onClick={handleClose}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [openProject, setOpenProject] = useState<ProjectKey | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-100px" });
  const ctaClass = `card-cta-btn magnetic${gridInView ? " cta-pulse-once" : ""}`;

  const tiltA = useCardTilt();
  const tiltB = useCardTilt();
  const ctaRefA = useMagnetic<HTMLSpanElement>(0.3, 50);
  const ctaRefB = useMagnetic<HTMLSpanElement>(0.3, 50);

  return (
    <section id="projects">
      <div className="wrap">
        <motion.div
          className="sec-head"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={t}
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="label accent">01 / Projects</div>
          <h2>Personal projects</h2>
        </motion.div>

        <div className="sec-body">
          <div />
          <div className="work-grid" ref={gridRef}>

            <motion.button
              ref={tiltA.ref}
              className="card card-clickable"
              type="button"
              aria-label="View HeadUp case study"
              onClick={() => {
                sendGAEvent("event", "case_study_opened", { project: "headup" });
                setOpenProject("headup");
              }}
              onMouseMove={tiltA.onMouseMove}
              onMouseEnter={tiltA.onMouseEnter}
              onMouseLeave={tiltA.onMouseLeave}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, transition: { duration: 0.25, ease: "easeOut" } }}
              transition={{ ...t, delay: 0.05 }}
              viewport={view}
              style={{ rotateX: tiltA.rotateX, rotateY: tiltA.rotateY, transformPerspective: 900 }}
            >
              <motion.span
                className="card-glare"
                aria-hidden="true"
                style={{ background: tiltA.glareBackground, opacity: tiltA.glareOpacity }}
              />
              <div className="card-top">
                <h3 className="card-name">HeadUp</h3>
                <span className="card-when">Nov 2025 - Mar 2026</span>
              </div>
              <div className="card-context">Cherry Seed · Reichman University</div>
              <p className="card-desc">
                An Android app that detects <strong>unhealthy smartphone posture</strong> in real time and nudges users to correct it.
                Pivoted from consumer to <strong>B2B wellness</strong>.
              </p>
              <div className="card-stack">
                <span className="pill">Product lead</span>
                <span className="pill">Android</span>
                <span className="pill">Kotlin</span>
                <span className="pill">Phone sensors</span>
                <span className="pill">B2C → B2B</span>
              </div>
              <span ref={ctaRefA} className={ctaClass}>
                View case study <span className="arr">↗</span>
              </span>
            </motion.button>

            <motion.button
              ref={tiltB.ref}
              className="card card-clickable"
              type="button"
              aria-label="View Carvertise case study"
              onClick={() => {
                sendGAEvent("event", "case_study_opened", { project: "carvertise" });
                setOpenProject("carvertise");
              }}
              onMouseMove={tiltB.onMouseMove}
              onMouseEnter={tiltB.onMouseEnter}
              onMouseLeave={tiltB.onMouseLeave}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, transition: { duration: 0.25, ease: "easeOut" } }}
              transition={{ ...t, delay: 0.15 }}
              viewport={view}
              style={{ rotateX: tiltB.rotateX, rotateY: tiltB.rotateY, transformPerspective: 900 }}
            >
              <motion.span
                className="card-glare"
                aria-hidden="true"
                style={{ background: tiltB.glareBackground, opacity: tiltB.glareOpacity }}
              />
              <div className="card-top">
                <h3 className="card-name">Carvertise</h3>
                <span className="card-when">2025</span>
              </div>
              <div className="card-context">Personal project</div>
              <p className="card-desc">
                A <strong>geofence-first ad engine</strong> for in-vehicle screens - content loads by region as the car enters it.
                Built solo, end-to-end.
              </p>
              <div className="card-stack">
                <span className="pill">Solo build</span>
                <span className="pill">Android</span>
                <span className="pill">GPS</span>
                <span className="pill">Geofencing</span>
                <span className="pill">JSON config</span>
              </div>
              <span ref={ctaRefB} className={ctaClass}>
                View case study <span className="arr">↗</span>
              </span>
            </motion.button>

          </div>
        </div>
      </div>

      {openProject && (
        <ProjectModal
          projectKey={openProject}
          onClose={() => setOpenProject(null)}
        />
      )}
    </section>
  );
}
