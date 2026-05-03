"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TiltCard } from "@/components/ui/TiltCard";
import { Terminal } from "@/components/ui/Terminal";
import { EncryptedTextOnView } from "@/components/ui/EncryptedText";

const highlights = [
  { icon: "🚀", title: "6+ Years", sub: "Professional experience" },
  { icon: "🏗️", title: "20+ Projects", sub: "Shipped to production" },
  { icon: "☁️", title: "Multi-cloud", sub: "AWS · GCP · Azure" },
  { icon: "👥", title: "Team Lead", sub: "Engineering teams of 8+" },
];

const bios = [
  "Hi, I'm Albert — a Software Engineer based in Indonesia with 6+ years of experience building digital products from the ground up. I specialize in creating robust full-stack applications, data infrastructure, and developer tools that scale.",
  "My journey started in a campus IT organization where I fell in love with building things. Since then, I've worked across startups and enterprises — always with a bias toward shipping quality software.",
];

export function About() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="about" ref={ref} style={{ padding: "100px 0", position: "relative", overflow: "hidden" }}>
      {/* Decorative ghost text */}
      <div style={{
        position: "absolute", right: "-2%", top: "50%", transform: "translateY(-50%)",
        fontSize: "20rem", fontWeight: 900, lineHeight: 1,
        color: "transparent", WebkitTextStroke: "1px rgba(48,54,61,0.25)",
        pointerEvents: "none", userSelect: "none", letterSpacing: "-0.05em",
      }}>
        AM
      </div>

      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 32px", position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "52px" }}
        >
          <p className="section-tag">About me</p>
          <EncryptedTextOnView
            text="The person behind the code"
            as="h2"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.1, display: "block" }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* LEFT */}
          <motion.div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
          >
            {/* Photo + identity row */}
            <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
              <TiltCard maxTilt={6} style={{ flexShrink: 0 }}>
                <div style={{
                  width: "140px", height: "180px",
                  borderRadius: "18px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  overflow: "hidden", position: "relative",
                }}>
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(145deg, rgba(88,166,255,0.1), rgba(163,113,247,0.07))",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ fontSize: "2.75rem" }}>👨‍💻</span>
                    <span style={{ fontSize: "0.625rem", color: "var(--fg-subtle)", marginTop: "8px", textAlign: "center", padding: "0 8px" }}>
                      main.jpg
                    </span>
                  </div>
                  <div style={{ position: "absolute", top: "8px", right: "8px", width: "18px", height: "18px", borderTop: "2px solid var(--blue)", borderRight: "2px solid var(--blue)", borderTopRightRadius: "5px" }} />
                  <div style={{ position: "absolute", bottom: "8px", left: "8px", width: "18px", height: "18px", borderBottom: "2px solid var(--purple)", borderLeft: "2px solid var(--purple)", borderBottomLeftRadius: "5px" }} />
                </div>
              </TiltCard>

              <div style={{ paddingTop: "8px", flex: 1 }}>
                <h3 style={{ fontWeight: 800, fontSize: "1.125rem", marginBottom: "4px" }}>Albert Mangiri</h3>
                <p style={{ color: "var(--blue)", fontSize: "0.875rem", fontWeight: 600, marginBottom: "14px" }}>
                  Tech Lead · Software Engineer
                </p>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "5px 12px", borderRadius: "100px",
                  background: "rgba(63,185,80,0.09)",
                  border: "1px solid rgba(63,185,80,0.22)",
                  fontSize: "0.8125rem", fontWeight: 600, color: "#3fb950",
                  marginBottom: "14px",
                }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3fb950", boxShadow: "0 0 6px #3fb950" }} />
                  Open to work
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  {[{ icon: "📍", text: "Indonesia" }, { icon: "📧", text: "alberttmangiri@gmail.com" }].map((item) => (
                    <div key={item.text} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8125rem", color: "var(--fg-muted)" }}>
                      <span>{item.icon}</span><span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pull quote */}
            <div style={{
              padding: "20px 22px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderLeft: "3px solid var(--blue)",
              borderRadius: "0 14px 14px 0",
            }}>
              <p style={{ fontSize: "0.9875rem", lineHeight: 1.75, color: "var(--fg-muted)", fontStyle: "italic" }}>
                &ldquo;I bridge the gap between engineering excellence and product thinking — always with a bias toward shipping quality software.&rdquo;
              </p>
            </div>

            {/* Extra photos */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
              {[2, 3, 4].map((n) => (
                <div key={n} style={{
                  aspectRatio: "1",
                  borderRadius: "12px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: "1.4rem" }}>📸</span>
                  <span style={{ fontSize: "0.625rem", color: "var(--fg-subtle)", marginTop: "4px" }}>photo-{n}.jpg</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.25 }}
          >
            {/* Bio text */}
            <div>
              {bios.map((bio, i) => (
                <p key={i} style={{ color: "var(--fg-muted)", lineHeight: 1.85, fontSize: "0.9875rem", marginBottom: "14px" }}>
                  {bio}
                </p>
              ))}
            </div>

            {/* Terminal — Aceternity style */}
            <Terminal />

            {/* Highlight grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {highlights.map((h, i) => (
                <motion.div
                  key={h.title}
                  style={{
                    padding: "18px",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "14px",
                    transition: "all 0.2s",
                  }}
                  initial={{ opacity: 0, y: 14 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.07 }}
                  whileHover={{ borderColor: "rgba(88,166,255,0.35)", y: -2 }}
                >
                  <span style={{ fontSize: "1.375rem", display: "block", marginBottom: "7px" }}>{h.icon}</span>
                  <p style={{ fontWeight: 800, fontSize: "1rem", marginBottom: "2px" }}>{h.title}</p>
                  <p style={{ fontSize: "0.8rem", color: "var(--fg-subtle)" }}>{h.sub}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
