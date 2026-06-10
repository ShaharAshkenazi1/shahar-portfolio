"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { sendGAEvent } from "@next/third-parties/google";

const view = { once: true, margin: "-60px" as const };
const t = { duration: 0.55, ease: "easeOut" as const };

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("ashkenazi1997@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact">
      <div className="wrap">
        <motion.div
          className="sec-head"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={t}
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="label accent">04 / Contact</div>
          <h2>Get in touch</h2>
        </motion.div>

        <div className="sec-body">
          <div />
          <div>
            <motion.span
              className="availability"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ...t, delay: 0.05 }}
              viewport={view}
            >
              <span className="pulse" />
              Open to product opportunities
            </motion.span>

            <motion.div
              className="contact-grid"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ...t, delay: 0.12 }}
              viewport={view}
            >
              <a
                className="contact-card"
                href="mailto:ashkenazi1997@gmail.com"
                onClick={handleCopy}
              >
                <span className="lbl">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M2.5 7l7.5 5.5L17.5 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Email
                </span>
                <span className={`val${copied ? " val--copied" : ""}`}>
                  {copied ? "Copied ✓" : "ashkenazi1997@gmail.com"}
                </span>
                <span className="arr">↗</span>
              </a>
              <a
                className="contact-card"
                href="https://www.linkedin.com/in/shahar-ashkenazi-pmo"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sendGAEvent("event", "linkedin_clicked")}
              >
                <span className="lbl">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M6 8.5v5M6 6v.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    <path d="M10 13.5v-2.75A2.25 2.25 0 0114.5 13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 8.5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  LinkedIn
                </span>
                <span className="val">shahar-ashkenazi-pmo</span>
                <span className="arr">↗</span>
              </a>
              <a className="contact-card" href="tel:+972542156321">
                <span className="lbl">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M3 4.5A1.5 1.5 0 014.5 3h2.379a1 1 0 01.948.684l1 3a1 1 0 01-.29 1.06l-1.19 1.19a9.014 9.014 0 004.72 4.72l1.19-1.19a1 1 0 011.06-.29l3 1a1 1 0 01.683.948V15.5A1.5 1.5 0 0116.5 17C9.044 17 3 10.956 3 4.5z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Phone
                </span>
                <span className="val">+972 54-215-6321</span>
                <span className="arr">↗</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
