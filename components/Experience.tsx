"use client";

import { motion } from "framer-motion";
import { useDesktopPointer } from "@/lib/pointer";

const view = { once: true, margin: "-80px" as const };
const t = { duration: 0.55, ease: "easeOut" as const };
const hoverLift = { y: -5, transition: { type: "spring" as const, stiffness: 300, damping: 20 } };

export default function Experience() {
  const isDesktop = useDesktopPointer();

  return (
    <section id="experience">
      <div className="wrap">
        <motion.div
          className="sec-head"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={t}
          viewport={view}
        >
          <div className="label accent">02 / Experience</div>
          <h2>Where I&apos;ve worked</h2>
        </motion.div>

        <div className="sec-body">
          <div />
          <div className="exp-list">

            <motion.div
              className="exp-row exp-row--primary"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={isDesktop ? hoverLift : undefined}
              transition={{ ...t, delay: 0.05 }}
              viewport={view}
            >
              <div className="when">
                <span className="current-badge">
                  <span className="pulse" />
                  Current
                </span>
                Oct 2024 - Present
              </div>
              <div>
                <h3 className="who">Technical Product Manager</h3>
                <div className="where">Target Systems · Tel Aviv</div>
                <p className="gist">
                  Lead a cross-functional development team end-to-end, owning
                  the path from spec to production release.
                </p>
                <ul className="bullets">
                  <li>Own sprint planning, specs, QA, and release for a team of 5+ developers.</li>
                  <li>Design system integration architecture and API contracts between internal platforms and third-party vendors.</li>
                  <li>Drive technical discovery - translating enterprise client requirements into scoped, actionable delivery plans.</li>
                  <li>Manage stakeholder communication across technical and business teams.</li>
                  <li>Partner with QA on test strategy and own release readiness for production deployments.</li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              className="exp-row exp-row--secondary"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={isDesktop ? hoverLift : undefined}
              transition={{ ...t, delay: 0.12 }}
              viewport={view}
            >
              <div className="when">Jun 2021 - Jun 2022</div>
              <div>
                <h3 className="who">Sales Engineer</h3>
                <div className="where">Comax ERP</div>
                <p className="gist">
                  Technical pre-sales for enterprise prospects, bridging product
                  and sales teams. Delivered demos, scoped feasibility, and
                  supported onboarding for new clients.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="exp-row exp-row--secondary"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={isDesktop ? hoverLift : undefined}
              transition={{ ...t, delay: 0.2 }}
              viewport={view}
            >
              <div className="when">2016 - 2019</div>
              <div>
                <h3 className="who">Commando Squad Commander</h3>
                <div className="where">Duvdevan Unit · Israel Defense Forces</div>
                <p className="gist">
                  Commanded a 25-soldier squad in complex operational missions
                  requiring rapid decision-making under pressure. Trained and
                  developed soldiers, building team cohesion and execution
                  standards under demanding conditions.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
