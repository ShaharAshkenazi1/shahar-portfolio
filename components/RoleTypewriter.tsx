"use client";

import { useEffect, useState } from "react";

const TITLES = ["Technical Product Manager", "Team Leader", "Builder", "Shipper"];

const TYPE_SPEED = 55;
const DELETE_SPEED = 28;
const HOLD_AFTER_TYPE = 1800;
const HOLD_AFTER_DELETE = 350;

type Phase = "idle" | "typing" | "holding" | "deleting" | "pausing";

export default function RoleTypewriter() {
  const [reduced, setReduced] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(isReduced);
    if (!isReduced) setPhase("typing");
  }, []);

  useEffect(() => {
    if (phase === "idle" || reduced) return;
    const word = TITLES[titleIndex];

    if (phase === "typing") {
      if (charCount < word.length) {
        const id = setTimeout(() => setCharCount((c) => c + 1), TYPE_SPEED);
        return () => clearTimeout(id);
      }
      const id = setTimeout(() => setPhase("holding"), 0);
      return () => clearTimeout(id);
    }

    if (phase === "holding") {
      const id = setTimeout(() => setPhase("deleting"), HOLD_AFTER_TYPE);
      return () => clearTimeout(id);
    }

    if (phase === "deleting") {
      if (charCount > 0) {
        const id = setTimeout(() => setCharCount((c) => c - 1), DELETE_SPEED);
        return () => clearTimeout(id);
      }
      const id = setTimeout(() => setPhase("pausing"), HOLD_AFTER_DELETE);
      return () => clearTimeout(id);
    }

    // pausing
    const id = setTimeout(() => {
      setTitleIndex((i) => (i + 1) % TITLES.length);
      setPhase("typing");
    }, 0);
    return () => clearTimeout(id);
  }, [phase, charCount, titleIndex, reduced]);

  const visible = reduced ? TITLES[0] : TITLES[titleIndex].slice(0, charCount);

  return (
    <span className="role-type">
      <span className="role-ghost" aria-hidden="true">{TITLES[0]}</span>
      <span className="role-live" aria-hidden="true">
        {visible}
        {!reduced && <span className="role-cursor" />}
      </span>
      <span className="visually-hidden">{TITLES[0]}</span>
    </span>
  );
}
