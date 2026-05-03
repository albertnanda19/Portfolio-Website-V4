"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PerspectiveGrid3D } from "@/components/ui/PerspectiveGrid3D";
import { Particles3D } from "@/components/ui/Particles3D";

const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;

export function SplashScreen() {
  const [phase, setPhase] = useState<"in" | "split" | "done">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("split"), 3000);
    const t2 = setTimeout(() => setPhase("done"), 3900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "done") return null;
  const splitting = phase === "split";

  return (
    <>
      {/* Canvas bg layer */}
      <motion.div
        style={{
          position: "fixed", inset: 0, background: "#0d1117",
          zIndex: 9990, overflow: "hidden",
        }}
        animate={splitting ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.55, delay: splitting ? 0.42 : 0 }}
      >
        <PerspectiveGrid3D horizonAt={0.62} style={{ opacity: 0.9 }} />
        <Particles3D count={80} speed={1.5} style={{ opacity: 0.42 }} />
        <div style={{
          position: "absolute", top: "6%", left: "4%",
          width: "55vw", height: "55vw", maxWidth: "640px", maxHeight: "640px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(88,166,255,0.08), transparent 60%)",
          filter: "blur(70px)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "6%", right: "4%",
          width: "48vw", height: "48vw", maxWidth: "580px", maxHeight: "580px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(163,113,247,0.08), transparent 60%)",
          filter: "blur(70px)", pointerEvents: "none",
        }} />
      </motion.div>

      {/* Top curtain */}
      <motion.div
        style={{
          position: "fixed", top: 0, left: 0, right: 0, height: "51vh",
          background: "#0d1117", zIndex: 9992,
        }}
        animate={{ y: splitting ? "-100%" : "0%" }}
        transition={{ duration: 0.78, ease: CURTAIN_EASE }}
      />

      {/* Bottom curtain */}
      <motion.div
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0, height: "51vh",
          background: "#0d1117", zIndex: 9992,
        }}
        animate={{ y: splitting ? "100%" : "0%" }}
        transition={{ duration: 0.78, ease: CURTAIN_EASE }}
      />

      {/* Center content */}
      <motion.div
        style={{
          position: "fixed", inset: 0, zIndex: 9993,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          pointerEvents: "none", fontFamily: "var(--font)",
        }}
        animate={splitting ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.28 }}
      >
        {/* Corner brackets */}
        <CornerBrackets />

        {/* Footer */}
        <motion.p
          style={{
            position: "absolute", bottom: "7%", left: "50%", transform: "translateX(-50%)",
            fontSize: "0.625rem", color: "var(--fg-subtle)", fontFamily: "monospace",
            letterSpacing: "0.12em", textTransform: "uppercase", whiteSpace: "nowrap",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.5 }}
        >
          © 2026 · albertmangiri.dev
        </motion.p>

        {/* AM monogram with glow */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div
            aria-hidden
            style={{
              position: "absolute", inset: 0,
              fontSize: "clamp(6rem, 20vw, 16rem)",
              fontWeight: 900, lineHeight: 1, letterSpacing: "-0.06em",
              color: "#a371f7", filter: "blur(42px)", opacity: 0.28,
              userSelect: "none", display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            AM
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 1.55, filter: "blur(32px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            style={{
              fontSize: "clamp(6rem, 20vw, 16rem)",
              fontWeight: 900, lineHeight: 1, letterSpacing: "-0.06em",
              background: "linear-gradient(135deg, #58a6ff 0%, #a371f7 50%, #f778ba 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              userSelect: "none", position: "relative",
            }}
          >
            AM
          </motion.div>
        </div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: "1px", width: "110px",
            background: "linear-gradient(to right, transparent, rgba(88,166,255,0.5), rgba(163,113,247,0.5), transparent)",
            margin: "12px 0 20px",
          }}
        />

        {/* Name */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "1.0625rem", fontWeight: 700,
            letterSpacing: "0.3em", textTransform: "uppercase",
            color: "var(--fg)", margin: 0,
          }}
        >
          Albert Mangiri
        </motion.p>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.5 }}
          style={{
            fontSize: "0.7rem", color: "var(--fg-subtle)",
            letterSpacing: "0.15em", textTransform: "uppercase",
            marginTop: "10px", fontFamily: "monospace",
          }}
        >
          Software Engineer · Indonesia
        </motion.p>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.45 }}
          style={{ marginTop: "52px", width: "180px" }}
        >
          <div style={{ height: "1px", background: "rgba(48,54,61,0.55)", borderRadius: "2px", overflow: "hidden" }}>
            <motion.div
              style={{ height: "100%", borderRadius: "2px", background: "linear-gradient(to right, #58a6ff, #a371f7, #f778ba)" }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 1.55, duration: 1.2, ease: [0.37, 0, 0.63, 1] }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 1.65 }}
              style={{ fontSize: "0.575rem", color: "var(--fg-subtle)", letterSpacing: "0.13em", fontFamily: "monospace", margin: 0 }}
            >
              INITIALIZING...
            </motion.p>
            <PercentCounter startDelay={1.55} duration={1.2} />
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

function CornerBrackets() {
  const corners = [
    { style: { top: "6%", left: "5%" }, bt: true, bl: true },
    { style: { top: "6%", right: "5%" }, bt: true, br: true },
    { style: { bottom: "6%", left: "5%" }, bb: true, bl: true },
    { style: { bottom: "6%", right: "5%" }, bb: true, br: true },
  ];
  return (
    <>
      {corners.map((c, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute", width: "28px", height: "28px",
            ...c.style,
            borderTop: c.bt ? "1px solid rgba(88,166,255,0.28)" : undefined,
            borderBottom: c.bb ? "1px solid rgba(88,166,255,0.28)" : undefined,
            borderLeft: c.bl ? "1px solid rgba(88,166,255,0.28)" : undefined,
            borderRight: c.br ? "1px solid rgba(88,166,255,0.28)" : undefined,
          }}
          initial={{ opacity: 0, scale: 1.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.38 + i * 0.06, duration: 0.5 }}
        />
      ))}
    </>
  );
}

function PercentCounter({ startDelay, duration }: { startDelay: number; duration: number }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const delayMs = startDelay * 1000;
    const durationMs = duration * 1000;
    let rafId: number;
    let startTime: number | null = null;

    const tick = (now: number) => {
      if (startTime === null) {
        const elapsed = now - performance.now() + delayMs;
        if (elapsed > 0) { rafId = requestAnimationFrame(tick); return; }
        startTime = now;
      }
      const t = Math.min((now - startTime) / durationMs, 1);
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      setPct(Math.round(eased * 100));
      if (t < 1) rafId = requestAnimationFrame(tick);
    };

    const timeout = setTimeout(() => {
      startTime = performance.now();
      rafId = requestAnimationFrame((now) => {
        startTime = now;
        rafId = requestAnimationFrame(tick);
      });
    }, delayMs);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafId);
    };
  }, [startDelay, duration]);

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.55 }}
      transition={{ delay: startDelay }}
      style={{ fontSize: "0.625rem", color: "var(--fg-muted)", letterSpacing: "0.06em", fontFamily: "monospace", margin: 0 }}
    >
      {pct}%
    </motion.p>
  );
}
