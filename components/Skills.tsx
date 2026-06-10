"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Cpu,
  Target,
  Bot,
  MousePointer2,
  Layers,
  PenTool,
  Globe,
  GitMerge,
  Flame,
  GitBranch,
  LayoutDashboard,
  RefreshCw,
  Send,
  BookOpen,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const categories: {
  label: string;
  Icon: LucideIcon;
  items: { label: string; Icon: LucideIcon }[];
}[] = [
  {
    label: "AI & Product",
    Icon: Sparkles,
    items: [
      { label: "Claude Code", Icon: Bot },
      { label: "Cursor",      Icon: MousePointer2 },
      { label: "Notion",      Icon: Layers },
      { label: "Figma",       Icon: PenTool },
    ],
  },
  {
    label: "Engineering",
    Icon: Cpu,
    items: [
      { label: "REST APIs",           Icon: Globe },
      { label: "System Integrations", Icon: GitMerge },
      { label: "Firebase",            Icon: Flame },
      { label: "Git",                 Icon: GitBranch },
      { label: "Postman",             Icon: Send },
    ],
  },
  {
    label: "Execution",
    Icon: Target,
    items: [
      { label: "Jira",           Icon: LayoutDashboard },
      { label: "Agile Delivery", Icon: RefreshCw },
      { label: "Confluence",     Icon: BookOpen },
    ],
  },
];

const view = { once: true, margin: "-60px" as const };
const t = { duration: 0.5, ease: "easeOut" as const };

function SkillItem({ label, Icon, delay }: { label: string; Icon: LucideIcon; delay: number }) {
  return (
    <motion.li
      className="skill-item"
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ ...t, delay }}
      viewport={view}
    >
      <span className="skill-item-icon">
        <Icon size={13} aria-hidden="true" />
      </span>
      {label}
    </motion.li>
  );
}

export default function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <motion.div
          className="sec-head"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={t}
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="label accent">03 / Skills</div>
          <h2>Skills &amp; Tools</h2>
        </motion.div>

        <div className="sec-body">
          <div />
          <div className="skills-grid">
            {categories.map((cat, ci) => (
              <motion.div
                key={cat.label}
                className={`skill-card${ci === 0 ? " skill-card--featured" : ""}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ ...t, delay: 0.05 + ci * 0.07 }}
                viewport={view}
              >
                <span className="skill-card-index" aria-hidden="true">
                  {String(ci + 1).padStart(2, "0")}
                </span>
                <div className="skill-card-head">
                  <span className="skill-card-icon">
                    <cat.Icon size={18} aria-hidden="true" />
                  </span>
                  <p className="skills-col-label">{cat.label}</p>
                </div>
                <ul className="skill-list">
                  {cat.items.map((item, ii) => (
                    <SkillItem
                      key={item.label}
                      label={item.label}
                      Icon={item.Icon}
                      delay={0.08 + ci * 0.07 + ii * 0.05}
                    />
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
