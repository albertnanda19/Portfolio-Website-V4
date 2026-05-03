"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface TerminalLine {
  type: "command" | "output" | "comment" | "blank";
  text: string;
  color?: string;
}

const lines: TerminalLine[] = [
  { type: "comment", text: "# Albert's career snapshot" },
  { type: "blank", text: "" },
  { type: "command", text: "whoami" },
  { type: "output", text: "albert-mangiri  // Tech Lead & Software Engineer" },
  { type: "blank", text: "" },
  { type: "command", text: "cat location.txt" },
  { type: "output", text: "Indonesia 🇮🇩  —  UTC+7" },
  { type: "blank", text: "" },
  { type: "command", text: "cat career.json | jq '.roles[]'" },
  { type: "output", text: '"Tech Lead"', color: "#3fb950" },
  { type: "output", text: '"Senior Full-Stack Developer"', color: "#3fb950" },
  { type: "output", text: '"Data Engineer"', color: "#3fb950" },
  { type: "output", text: '"Software Engineer Intern"', color: "#3fb950" },
  { type: "blank", text: "" },
  { type: "command", text: "git log --oneline --count experience" },
  { type: "output", text: "6+ years of commits to production 🚀" },
  { type: "blank", text: "" },
  { type: "command", text: "echo $STATUS" },
  { type: "output", text: "OPEN_TO_WORK=true  |  AVAILABLE_NOW=true", color: "#58a6ff" },
];

function useTypingSound(muted: boolean) {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playClick = useCallback(() => {
    if (muted) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "square";
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.03);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // AudioContext unavailable
    }
  }, [muted]);

  return playClick;
}

export function Terminal() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [visibleCount, setVisibleCount] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [muted, setMuted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const playClick = useTypingSound(muted);

  const runLoop = useCallback(() => {
    let i = 0;
    const tick = () => {
      if (i < lines.length) {
        setVisibleCount(++i);
        playClick();
        const line = lines[i - 1];
        const delay = line.type === "blank" ? 80 : line.type === "command" ? 220 : 100;
        timerRef.current = setTimeout(tick, delay);
      } else {
        // Pause then restart
        timerRef.current = setTimeout(() => {
          setVisibleCount(0);
          timerRef.current = setTimeout(runLoop, 300);
        }, 2200);
      }
    };
    timerRef.current = setTimeout(tick, 400);
  }, [playClick]);

  useEffect(() => {
    if (!inView) return;
    runLoop();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [inView, runLoop]);

  useEffect(() => {
    const t = setInterval(() => setShowCursor((p) => !p), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      ref={ref}
      style={{
        background: "#0d1117",
        border: "1px solid var(--border)",
        borderRadius: "14px",
        overflow: "hidden",
        fontFamily: "'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace",
        fontSize: "0.875rem",
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Title bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: "8px",
        padding: "12px 18px",
        background: "#161b22",
        borderBottom: "1px solid var(--border)",
      }}>
        <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#f85149", display: "block" }} />
        <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#d29922", display: "block" }} />
        <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#3fb950", display: "block" }} />
        <span style={{ flex: 1, textAlign: "center", fontSize: "0.8125rem", color: "var(--fg-subtle)", letterSpacing: "0.02em" }}>
          albert@portfolio ~ bash
        </span>
        {/* Mute toggle */}
        <button
          onClick={() => setMuted((m) => !m)}
          style={{
            background: "transparent", border: "none", cursor: "pointer",
            color: muted ? "var(--fg-subtle)" : "var(--blue)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "2px", borderRadius: "4px",
            transition: "color 0.2s",
          }}
          title={muted ? "Unmute typing sound" : "Mute typing sound"}
        >
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
      </div>

      {/* Lines */}
      <div style={{ padding: "20px 22px", minHeight: "280px" }}>
        {lines.slice(0, visibleCount).map((line, i) => (
          <div key={i} style={{ lineHeight: 1.7, marginBottom: line.type === "blank" ? "4px" : "0" }}>
            {line.type === "command" && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: "#3fb950", userSelect: "none" }}>❯</span>
                <span style={{ color: "#e6edf3" }}>{line.text}</span>
              </div>
            )}
            {line.type === "output" && (
              <div style={{ paddingLeft: "18px", color: line.color ?? "#8b949e" }}>
                {line.text}
              </div>
            )}
            {line.type === "comment" && (
              <div style={{ color: "#6e7681", fontStyle: "italic" }}>{line.text}</div>
            )}
            {line.type === "blank" && <div style={{ height: "6px" }} />}
          </div>
        ))}

        {/* Cursor */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ color: "#3fb950", userSelect: "none" }}>❯</span>
          <span style={{
            display: "inline-block", width: "9px", height: "16px",
            background: showCursor ? "#58a6ff" : "transparent",
            borderRadius: "2px", transition: "background 0.1s",
          }} />
        </div>
      </div>
    </motion.div>
  );
}
