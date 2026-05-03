"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { experiences } from "@/lib/data";
import { Briefcase, GraduationCap } from "lucide-react";

function TimelineItem({ exp, index }: { exp: (typeof experiences)[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  const isOrg = exp.type === "Organization";

  return (
    <motion.div
      ref={ref}
      style={{ display: "flex", gap: "24px" }}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {/* Timeline dot + line */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <motion.div
          style={{
            position: "relative",
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            background: exp.current ? "rgba(88,166,255,0.12)" : "var(--bg-card)",
            border: `2px solid ${exp.current ? "var(--blue)" : "var(--border)"}`,
            zIndex: 1,
          }}
          whileHover={{ scale: 1.1 }}
        >
          {isOrg ? (
            <GraduationCap size={16} style={{ color: exp.current ? "var(--blue)" : "var(--fg-subtle)" }} />
          ) : (
            <Briefcase size={16} style={{ color: exp.current ? "var(--blue)" : "var(--fg-subtle)" }} />
          )}
          {exp.current && (
            <motion.div
              style={{
                position: "absolute", inset: "-4px",
                borderRadius: "50%",
                border: "2px solid var(--blue)",
              }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          )}
        </motion.div>

        {index < experiences.length - 1 && (
          <div style={{
            width: "2px",
            flex: 1,
            marginTop: "8px",
            background: "linear-gradient(to bottom, var(--border), transparent)",
            minHeight: "32px",
          }} />
        )}
      </div>

      {/* Card */}
      <div style={{ paddingBottom: "28px", flex: 1 }}>
        <div style={{
          padding: "20px 24px",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          transition: "border-color 0.2s",
        }}
          onMouseOver={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(88,166,255,0.3)")}
          onMouseOut={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)")}
        >
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "10px",
          }}>
            <div>
              <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "var(--fg)" }}>{exp.role}</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--blue)", fontWeight: 500, marginTop: "2px" }}>{exp.company}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
              <span style={{
                fontSize: "0.8125rem",
                color: "var(--fg-muted)",
                background: "var(--bg-canvas)",
                border: "1px solid var(--border)",
                padding: "3px 12px",
                borderRadius: "100px",
                whiteSpace: "nowrap",
              }}>
                {exp.period}
              </span>
              <span style={{
                fontSize: "0.6875rem",
                fontWeight: 600,
                padding: "2px 10px",
                borderRadius: "100px",
                background: isOrg ? "rgba(163,113,247,0.1)" : "rgba(88,166,255,0.1)",
                color: isOrg ? "var(--purple)" : "var(--blue)",
                border: `1px solid ${isOrg ? "rgba(163,113,247,0.2)" : "rgba(88,166,255,0.2)"}`,
              }}>
                {exp.type}
              </span>
            </div>
          </div>

          <p style={{ color: "var(--fg-muted)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "14px" }}>
            {exp.description}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {exp.tech.map((t) => (
              <span key={t} style={{
                fontSize: "0.75rem",
                padding: "3px 10px",
                borderRadius: "100px",
                background: "var(--bg-canvas)",
                border: "1px solid var(--border)",
                color: "var(--fg-subtle)",
                fontWeight: 500,
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Experience() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });

  return (
    <section id="experience" style={{ padding: "96px 0" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 32px" }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: "52px" }}
        >
          <p className="section-tag">Career</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "12px" }}>
            Experience
          </h2>
          <p style={{ color: "var(--fg-muted)", lineHeight: 1.7 }}>
            My professional journey — from student organization to tech leadership.
          </p>
        </motion.div>

        <div>
          {experiences.map((exp, i) => (
            <TimelineItem key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
