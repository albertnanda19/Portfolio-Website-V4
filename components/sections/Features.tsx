"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { WobbleCard } from "@/components/ui/WobbleCard";
import { Particles3D } from "@/components/ui/Particles3D";

const features = [
  {
    icon: "⚡",
    title: "Full-Stack Engineering",
    desc: "End-to-end product development from database schema to pixel-perfect UI. React, Node.js, and everything between.",
    color: "#58a6ff",
    size: "large",
  },
  {
    icon: "📊",
    title: "Data Engineering",
    desc: "Building pipelines that process millions of events. ETL, data warehouses, real-time streaming.",
    color: "#a371f7",
    size: "small",
  },
  {
    icon: "☁️",
    title: "Cloud & DevOps",
    desc: "Infrastructure as code, CI/CD pipelines, container orchestration, and multi-cloud deployments.",
    color: "#f85149",
    size: "small",
  },
  {
    icon: "🏗️",
    title: "System Architecture",
    desc: "Designing scalable, fault-tolerant systems. Microservices, event-driven, and distributed systems.",
    color: "#3fb950",
    size: "medium",
  },
  {
    icon: "👥",
    title: "Tech Leadership",
    desc: "Managing engineering teams, running code reviews, establishing best practices and mentoring engineers.",
    color: "#d29922",
    size: "medium",
  },
  {
    icon: "🔍",
    title: "Analytics & BI",
    desc: "Turning raw data into actionable insights with dashboards, reports, and self-service analytics tools.",
    color: "#f778ba",
    size: "small",
  },
];

const gridAreas: Record<number, string> = {
  0: "span 2",
  1: "span 1",
  2: "span 1",
  3: "span 1",
  4: "span 1",
  5: "span 1",
};

export function Features() {
  const { ref, inView } = useInView({ threshold: 0.06, triggerOnce: true });

  return (
    <section ref={ref} style={{ padding: "100px 0", position: "relative", overflow: "hidden" }}>
      <Particles3D count={50} speed={1.1} style={{ opacity: 0.3 }} />
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 32px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "52px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
        >
          <p className="section-tag">What I do</p>
          <h2 style={{ fontSize: "clamp(2.25rem, 5vw, 3.25rem)", fontWeight: 900, letterSpacing: "-0.04em", maxWidth: "600px" }}>
            Building at every layer of the stack
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridAutoRows: "minmax(180px, auto)",
          gap: "14px",
        }}
          className="bento-features"
        >
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              style={{ gridColumn: i === 0 ? "span 2" : "span 1" }}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              {i === 0 ? (
                /* Large first card — WobbleCard */
                <WobbleCard
                  containerStyle={{
                    background: `linear-gradient(135deg, var(--bg-card), rgba(${feat.color === "#58a6ff" ? "88,166,255" : "88,166,255"},0.04))`,
                    border: "1px solid var(--border)",
                    height: "100%",
                    cursor: "default",
                  }}
                  style={{ padding: "28px 30px", height: "100%", display: "flex", flexDirection: "column" }}
                >
                  <div style={{
                    width: "52px", height: "52px",
                    borderRadius: "14px",
                    background: `${feat.color}14`,
                    border: `1px solid ${feat.color}28`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.625rem",
                    marginBottom: "22px",
                  }}>
                    {feat.icon}
                  </div>
                  <h3 style={{ fontWeight: 800, fontSize: "1.25rem", marginBottom: "12px", lineHeight: 1.2 }}>
                    {feat.title}
                  </h3>
                  <p style={{ color: "var(--fg-muted)", fontSize: "0.9375rem", lineHeight: 1.8, flex: 1 }}>
                    {feat.desc}
                  </p>
                  <div style={{
                    height: "2px",
                    background: `linear-gradient(to right, ${feat.color}, transparent)`,
                    borderRadius: "2px",
                    marginTop: "24px",
                    opacity: 0.5,
                  }} />
                </WobbleCard>
              ) : (
                <SpotlightCard
                  spotlightColor={`${feat.color}12`}
                  style={{
                    padding: "28px 30px",
                    borderRadius: "18px",
                    height: "100%",
                    cursor: "default",
                    transition: "border-color 0.25s, transform 0.25s",
                  }}
                >
                  <div
                    style={{ height: "100%", display: "flex", flexDirection: "column" }}
                    onMouseOver={(e) => {
                      const parent = e.currentTarget.closest(".spotlight-card") as HTMLElement;
                      if (parent) { parent.style.borderColor = `${feat.color}45`; parent.style.transform = "translateY(-3px)"; }
                    }}
                    onMouseOut={(e) => {
                      const parent = e.currentTarget.closest(".spotlight-card") as HTMLElement;
                      if (parent) { parent.style.borderColor = "var(--border)"; parent.style.transform = "translateY(0)"; }
                    }}
                  >
                    <div style={{
                      width: "48px", height: "48px",
                      borderRadius: "12px",
                      background: `${feat.color}12`,
                      border: `1px solid ${feat.color}25`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.5rem",
                      marginBottom: "20px",
                    }}>
                      {feat.icon}
                    </div>
                    <h3 style={{ fontWeight: 800, fontSize: "1.125rem", marginBottom: "10px", lineHeight: 1.2 }}>
                      {feat.title}
                    </h3>
                    <p style={{ color: "var(--fg-muted)", fontSize: "0.9125rem", lineHeight: 1.75, flex: 1 }}>
                      {feat.desc}
                    </p>
                    <div style={{
                      height: "2px",
                      background: `linear-gradient(to right, ${feat.color}, transparent)`,
                      borderRadius: "2px",
                      marginTop: "20px",
                      opacity: 0.4,
                    }} />
                  </div>
                </SpotlightCard>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
