"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { certificates } from "@/lib/data";
import { ExternalLink, Award } from "lucide-react";
import { WaveDotsBg } from "@/components/ui/WaveDotsBg";

export function Certificates() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });

  return (
    <section id="certificates" ref={ref} style={{ padding: "96px 0", position: "relative", overflow: "hidden" }}>
      <WaveDotsBg spacing={34} amplitude={1.3} waveSpeed={1.1} color="163,113,247" style={{ opacity: 0.58 }} />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at center bottom, rgba(210,153,34,0.06), transparent 65%)",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px", position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: "48px" }}
        >
          <p className="section-tag">Credentials</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "12px" }}>
            Certificates
          </h2>
          <p style={{ color: "var(--fg-muted)", lineHeight: 1.7 }}>
            Professional certifications that validate my expertise.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
          {certificates.map((cert, i) => (
            <motion.a
              key={cert.id}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "28px",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "18px",
                textDecoration: "none",
                color: "var(--fg)",
                transition: "all 0.25s",
              }}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              whileHover={{
                y: -5,
                borderColor: "rgba(210,153,34,0.4)",
                boxShadow: "0 20px 50px rgba(210,153,34,0.1)",
              }}
            >
              {/* Icon */}
              <div style={{
                width: "48px", height: "48px",
                borderRadius: "12px",
                background: "rgba(210,153,34,0.1)",
                border: "1px solid rgba(210,153,34,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "20px",
              }}>
                <Award size={22} style={{ color: "var(--orange)" }} />
              </div>

              {/* Image placeholder */}
              <div style={{
                aspectRatio: "16/9",
                borderRadius: "10px",
                background: "var(--bg-canvas)",
                border: "1px solid var(--border)",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                marginBottom: "20px",
              }}>
                <span style={{ fontSize: "2.5rem" }}>🏆</span>
                <span style={{ fontSize: "0.75rem", color: "var(--fg-subtle)", marginTop: "8px" }}>cert-{i + 1}.jpg</span>
              </div>

              <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "6px", lineHeight: 1.3 }}>
                {cert.title}
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--blue)", fontWeight: 500, marginBottom: "4px" }}>
                {cert.issuer}
              </p>
              <p style={{ fontSize: "0.8125rem", color: "var(--fg-subtle)", marginBottom: "20px" }}>
                Issued {cert.date}
              </p>

              <div style={{
                display: "flex", alignItems: "center", gap: "6px",
                fontSize: "0.875rem", color: "var(--fg-subtle)",
                marginTop: "auto",
              }}>
                <ExternalLink size={13} />
                View credential
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
