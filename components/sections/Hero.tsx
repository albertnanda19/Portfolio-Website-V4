"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, Suspense } from "react";
import { TypewriterText } from "@/components/ui/AnimatedText";
import { EncryptedText } from "@/components/ui/EncryptedText";
import { ASCIIArt } from "@/components/ui/ASCIIArt";
import { BeamBackground } from "@/components/ui/BeamBackground";
import { PerspectiveGrid3D } from "@/components/ui/PerspectiveGrid3D";
import { Particles3D } from "@/components/ui/Particles3D";
import { roles } from "@/lib/data";
import dynamic from "next/dynamic";

const CobeGlobe = dynamic(
  () => import("@/components/three/CobeGlobe").then((m) => ({ default: m.CobeGlobe })),
  { ssr: false, loading: () => <div style={{ width: "100%", aspectRatio: "1/1" }} /> }
);

const floatingBadges = [
  { label: "Indonesia 🇮🇩", left: "3%", top: "20%" },
  { label: "Singapore 🇸🇬", left: "70%", top: "8%" },
  { label: "Open to work", left: "2%", top: "68%" },
  { label: "Remote ✓", left: "74%", top: "72%" },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scaleDown = useTransform(scrollYProgress, [0, 0.5], [1, 0.97]);

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "var(--bg-canvas)",
      }}
    >
      {/* 3D perspective grid floor */}
      <PerspectiveGrid3D horizonAt={0.62} style={{ opacity: 0.9 }} />

      {/* 3D particle starfield */}
      <Particles3D count={100} speed={1.8} style={{ opacity: 0.72 }} />

      <BeamBackground count={8} />

      {/* Ambient */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "5%", left: "-8%", width: "60vw", height: "60vw", maxWidth: "650px", maxHeight: "650px", borderRadius: "50%", background: "radial-gradient(circle, rgba(88,166,255,0.06), transparent 65%)", filter: "blur(50px)" }} />
        <div style={{ position: "absolute", bottom: "0%", right: "-5%", width: "50vw", height: "50vw", maxWidth: "550px", maxHeight: "550px", borderRadius: "50%", background: "radial-gradient(circle, rgba(163,113,247,0.06), transparent 65%)", filter: "blur(50px)" }} />
      </div>

      <motion.div
        style={{ y: yParallax, opacity: opacityFade, scale: scaleDown, position: "relative", zIndex: 10, width: "100%" }}
      >
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "100px 32px 64px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* LEFT */}
            <div>
              {/* ASCII art decoration */}
              <ASCIIArt
                art="mini"
                style={{ marginBottom: "20px" }}
                color="rgba(88,166,255,0.22)"
              />

              {/* Pre-tag */}
              <motion.div
                style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span style={{ display: "inline-block", width: "28px", height: "2px", background: "var(--blue)", borderRadius: "2px" }} />
                <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--blue)" }}>
                  Portfolio — 2025
                </span>
              </motion.div>

              {/* Name with encrypted text effect */}
              <div style={{ marginBottom: "20px", overflow: "hidden" }}>
                <motion.div
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <EncryptedText
                    text="Albert"
                    as="h1"
                    style={{
                      fontSize: "clamp(3.4rem, 8vw, 6.5rem)",
                      fontWeight: 900,
                      letterSpacing: "-0.05em",
                      lineHeight: 0.92,
                      color: "var(--fg)",
                      display: "block",
                    }}
                    speed={45}
                    delay={0.5}
                  />
                </motion.div>
                <motion.div
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <EncryptedText
                    text="Mangiri"
                    as="h1"
                    className="text-gradient glow-text"
                    style={{
                      fontSize: "clamp(3.4rem, 8vw, 6.5rem)",
                      fontWeight: 900,
                      letterSpacing: "-0.05em",
                      lineHeight: 0.92,
                      display: "block",
                    }}
                    speed={40}
                    delay={0.75}
                  />
                </motion.div>
              </div>

              {/* Role */}
              <motion.div
                style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "24px", flexWrap: "wrap" }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.75 }}
              >
                <span style={{ color: "var(--fg-muted)", fontSize: "1rem" }}>I&apos;m a</span>
                <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--blue)", minWidth: "250px", display: "inline-block" }}>
                  <TypewriterText texts={roles} />
                </span>
              </motion.div>

              {/* Description */}
              <motion.p
                style={{ color: "var(--fg-muted)", fontSize: "0.9875rem", lineHeight: 1.8, maxWidth: "430px", marginBottom: "36px" }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.85 }}
              >
                Passionate about building scalable systems, crafting beautiful interfaces,
                and turning data into actionable insights.
              </motion.p>

              {/* Buttons */}
              <motion.div
                style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "44px" }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.95 }}
              >
                <motion.a
                  href="#projects"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    padding: "13px 28px", borderRadius: "100px",
                    fontWeight: 700, fontSize: "0.9375rem",
                    background: "var(--blue)", color: "#0d1117",
                    textDecoration: "none",
                  }}
                  whileHover={{ scale: 1.04, backgroundColor: "#79c0ff" }}
                  whileTap={{ scale: 0.96 }}
                >
                  View my work
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.a>
                <motion.a
                  href="#contact"
                  className="gradient-border"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    padding: "13px 28px", borderRadius: "100px",
                    fontWeight: 700, fontSize: "0.9375rem",
                    color: "var(--blue)", textDecoration: "none",
                  }}
                  whileHover={{ backgroundColor: "rgba(88,166,255,0.07)" }}
                  whileTap={{ scale: 0.96 }}
                >
                  Get in touch
                </motion.a>
              </motion.div>

              {/* Stats */}
              <motion.div
                style={{ display: "flex", gap: "28px", paddingTop: "28px", borderTop: "1px solid var(--border-subtle)" }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.05 }}
              >
                {[{ n: "3+", l: "Years" }, { n: "13+", l: "Projects" }, { n: "10+", l: "Stacks" }].map((s) => (
                  <div key={s.l}>
                    <div className="text-gradient" style={{ fontSize: "1.75rem", fontWeight: 900, lineHeight: 1 }}>{s.n}</div>
                    <div style={{ fontSize: "0.8125rem", color: "var(--fg-subtle)", marginTop: "5px", fontWeight: 500 }}>{s.l}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT: Cobe Globe */}
            <div style={{ position: "relative" }}>
              <Suspense fallback={null}>
                <CobeGlobe />
              </Suspense>

              {/* Floating location badges */}
              {floatingBadges.map((badge, i) => (
                <motion.div
                  key={badge.label}
                  className="gradient-border"
                  style={{
                    position: "absolute",
                    left: badge.left, top: badge.top,
                    padding: "6px 14px",
                    borderRadius: "100px",
                    fontSize: "0.8125rem", fontWeight: 700,
                    color: "var(--fg-muted)",
                    background: "rgba(13,17,23,0.85)",
                    backdropFilter: "blur(10px)",
                    whiteSpace: "nowrap",
                  }}
                  initial={{ opacity: 0, scale: 0.6, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 1.4 + i * 0.18, type: "spring", stiffness: 200, damping: 20 }}
                  whileHover={{ scale: 1.06, color: "var(--fg)" }}
                >
                  {badge.label}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mouse scroll indicator */}
      <motion.div
        style={{
          position: "absolute", bottom: "28px", left: "50%",
          transform: "translateX(-50%)", display: "flex",
          flexDirection: "column", alignItems: "center", gap: "8px",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <motion.div
          style={{
            width: "22px", height: "36px", borderRadius: "12px",
            border: "1.5px solid var(--border)",
            display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "5px",
          }}
        >
          <motion.div
            style={{ width: "3px", height: "8px", borderRadius: "2px", background: "var(--blue)" }}
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
