"use client";

import { useEffect, useRef, useState } from "react";

type Segment = string | { count: number; suffix: string; from?: number; comma?: boolean };

type TermLine = {
  segments: Segment[];
  color: "gray" | "green" | "yellow" | "blank";
  speed: number;
};

const LINES: TermLine[] = [
  { segments: ["> loading profile..."], color: "gray", speed: 30 },
  { segments: [""], color: "blank", speed: 0 },
  {
    segments: ["01  Scaling an enterprise platform"],
    color: "green",
    speed: 12,
  },
  {
    segments: ["    1 → ", { count: 5, suffix: "", from: 1 }, "  Enterprise Clients"],
    color: "green",
    speed: 12,
  },
  {
    segments: ["    30 → ", { count: 350, suffix: "+", from: 30 }, "  Active Professionals"],
    color: "green",
    speed: 12,
  },
  {
    segments: ["    ", { count: 1000, suffix: "+", comma: true }, "  Records Processed Daily"],
    color: "green",
    speed: 12,
  },
  { segments: [""], color: "blank", speed: 0 },
  {
    segments: [
      "02  Leading 3 concurrent software projects and managing a cross-functional team of 5 developers from planning to production.",
    ],
    color: "green",
    speed: 12,
  },
  { segments: [""], color: "blank", speed: 0 },
  {
    segments: [
      "03  Leveraging AI tools such as Claude Code, Cursor, and ChatGPT to accelerate product delivery, technical planning, and software development.",
    ],
    color: "green",
    speed: 12,
  },
  { segments: [""], color: "blank", speed: 0 },
  { segments: ["> status: open to opportunities ✓"], color: "yellow", speed: 30 },
];

const START_DELAY = 450;
const BLANK_PAUSE = 140;
const LINE_PAUSE = 240;
const COUNT_DURATION = 380;
const COUNT_PAUSE = 120;

function Counter({
  to,
  suffix,
  from = 0,
  comma = false,
  start,
}: {
  to: number;
  suffix: string;
  from?: number;
  comma?: boolean;
  start: boolean;
}) {
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / COUNT_DURATION, 1);
      setValue(Math.round(from + progress * (to - from)));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, to, from]);

  const text = comma
    ? value.toLocaleString("en-US")
    : String(value).padStart(String(to).length, "0");
  return <>{text}{suffix}</>;
}

export default function Terminal({ onDone }: { onDone?: () => void }) {
  const [started, setStarted] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [segIndex, setSegIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const done = lineIndex >= LINES.length;
  const calledOnDoneRef = useRef<(() => void) | undefined>(undefined);

  useEffect(() => {
    const id = setTimeout(() => setStarted(true), START_DELAY);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (done && onDone && calledOnDoneRef.current !== onDone) {
      calledOnDoneRef.current = onDone;
      onDone();
    }
  }, [done, onDone]);

  useEffect(() => {
    if (!started || done) return;
    const line = LINES[lineIndex];
    const seg = line.segments[segIndex];
    const isLastSeg = segIndex === line.segments.length - 1;

    const advance = (delay: number) => {
      const id = setTimeout(() => {
        if (isLastSeg) {
          setLineIndex((i) => i + 1);
          setSegIndex(0);
          setCharIndex(0);
        } else {
          setSegIndex((s) => s + 1);
          setCharIndex(0);
        }
      }, delay);
      return () => clearTimeout(id);
    };

    if (typeof seg === "string") {
      if (seg === "") return advance(BLANK_PAUSE);
      if (charIndex < seg.length) {
        const id = setTimeout(() => setCharIndex((c) => c + 1), line.speed);
        return () => clearTimeout(id);
      }
      return advance(isLastSeg ? LINE_PAUSE : 0);
    }

    return advance(COUNT_DURATION + COUNT_PAUSE);
  }, [started, done, lineIndex, segIndex, charIndex]);

  const segState = (li: number, si: number): "done" | "active" | "pending" => {
    if (li < lineIndex) return "done";
    if (li > lineIndex) return "pending";
    if (si < segIndex) return "done";
    if (si > segIndex) return "pending";
    return "active";
  };

  return (
    <div className="terminal" data-reveal="">
      <div className="terminal-bar">
        <span className="terminal-dot terminal-dot-red" aria-hidden="true" />
        <span className="terminal-dot terminal-dot-yellow" aria-hidden="true" />
        <span className="terminal-dot terminal-dot-green" aria-hidden="true" />
        <span className="terminal-title">Shahar_Ashkenazi_Portfolio</span>
      </div>

      <div className="terminal-body" aria-hidden="true">
        {LINES.map((line, li) => (
          <div key={li} className={`terminal-line terminal-${line.color}`}>
            {line.segments.map((seg, si) => {
              const state = !started ? "pending" : segState(li, si);

              if (typeof seg === "string") {
                const typedChars =
                  state === "done" ? seg.length : state === "active" ? charIndex : 0;
                const visible = seg.slice(0, typedChars);
                const hidden = seg.slice(typedChars);
                return (
                  <span key={si}>
                    <span>{visible}</span>
                    <span className="terminal-hidden">{hidden}</span>
                    {state === "active" && seg !== "" && <span className="terminal-cursor" />}
                  </span>
                );
              }

              return (
                <span key={si} className={state === "pending" ? "terminal-hidden" : undefined}>
                  <Counter
                    to={seg.count}
                    suffix={seg.suffix}
                    from={seg.from}
                    comma={seg.comma}
                    start={state !== "pending"}
                  />
                  {state === "active" && <span className="terminal-cursor" />}
                </span>
              );
            })}
            {done && li === LINES.length - 1 && <span className="terminal-cursor" />}
          </div>
        ))}
      </div>

      <ul className="visually-hidden">
        <li>
          Scaling an enterprise platform: 1 to 5 enterprise clients, 30 to 350+ active professionals, 1,000+ records processed daily.
        </li>
        <li>
          Leading 3 concurrent software projects and managing a cross-functional team of 5 developers from planning to production.
        </li>
        <li>
          Leveraging AI tools such as Claude Code, Cursor, and ChatGPT to accelerate product delivery, technical planning, and software development.
        </li>
      </ul>
    </div>
  );
}
