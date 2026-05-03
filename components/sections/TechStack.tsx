"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { techStack } from "@/lib/data";
import { techIconMap, techColorMap } from "@/lib/techIcons";
import { EncryptedTextOnView } from "@/components/ui/EncryptedText";

type Category = keyof typeof techStack;

const categories: { key: Category; label: string; color: string; desc: string }[] = [
  { key: "frontend", label: "Frontend", color: "#58a6ff", desc: "UI frameworks & styling" },
  { key: "backend", label: "Backend", color: "#3fb950", desc: "APIs & server frameworks" },
  { key: "database", label: "Database", color: "#d29922", desc: "Storage & querying" },
  { key: "devops", label: "DevOps", color: "#f85149", desc: "Cloud & infrastructure" },
  { key: "data", label: "Data & Analytics", color: "#a371f7", desc: "Pipelines & BI" },
  { key: "tools", label: "Tools", color: "#f778ba", desc: "Dev & productivity tools" },
  { key: "monitoring", label: "Monitoring", color: "#39d353", desc: "Observability & alerting" },
];

function TechItem({ tech, accentColor, index }: { tech: { name: string; icon: string }; accentColor: string; index: number }) {
  const Icon = techIconMap[tech.name];
  const iconColor = techColorMap[tech.name] ?? accentColor;

  return (
    <motion.div
      style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: "8px",
        padding: "16px 10px",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "14px",
        cursor: "default",
        transition: "all 0.2s",
      }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.025, duration: 0.22 }}
      whileHover={{
        scale: 1.07,
        borderColor: `${accentColor}55`,
        boxShadow: `0 6px 22px ${accentColor}14`,
        backgroundColor: `${accentColor}06`,
      }}
    >
      {Icon ? (
        <Icon size={28} style={{ color: iconColor, flexShrink: 0 }} />
      ) : (
        <span style={{ fontSize: "1.625rem" }}>{tech.icon}</span>
      )}
      <span style={{
        fontSize: "0.72rem",
        textAlign: "center",
        lineHeight: 1.3,
        color: "var(--fg-muted)",
        fontWeight: 500,
        wordBreak: "break-word",
      }}>
        {tech.name}
      </span>
    </motion.div>
  );
}

export function TechStack() {
  const [active, setActive] = useState<Category>("frontend");
  const { ref, inView } = useInView({ threshold: 0.06, triggerOnce: true });
  const activeCat = categories.find((c) => c.key === active)!;

  return (
    <section
      id="skills"
      ref={ref}
      className="grid-dots"
      style={{ padding: "100px 0", position: "relative", overflow: "hidden" }}
    >
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse at 50% 60%, ${activeCat.color}08, transparent 55%)`,
        transition: "background 0.6s",
      }} />

      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 32px", position: "relative" }}>

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end" style={{ marginBottom: "52px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="section-tag">Expertise</p>
            <EncryptedTextOnView
              text="Tech Stack"
              as="h2"
              style={{ fontSize: "clamp(2.25rem, 5vw, 3.25rem)", fontWeight: 900, letterSpacing: "-0.04em", display: "block" }}
            />
          </motion.div>
          <motion.p
            style={{ color: "var(--fg-muted)", lineHeight: 1.7, fontSize: "0.9875rem" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Technologies across frontend, backend, cloud, and data — built for production scale.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {/* Sidebar */}
          <motion.div
            style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {categories.map((cat) => {
              const isActive = active === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActive(cat.key)}
                  style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "11px 14px", borderRadius: "12px",
                    border: `1px solid ${isActive ? cat.color + "35" : "transparent"}`,
                    background: isActive ? `${cat.color}0a` : "transparent",
                    cursor: "pointer", fontFamily: "var(--font)",
                    textAlign: "left", transition: "all 0.18s", width: "100%",
                  }}
                  onMouseOver={(e) => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                  onMouseOut={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                >
                  <span style={{
                    width: "7px", height: "7px", borderRadius: "50%",
                    background: cat.color, flexShrink: 0,
                    boxShadow: isActive ? `0 0 8px ${cat.color}` : "none",
                    transition: "box-shadow 0.2s",
                  }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: "0.875rem", fontWeight: isActive ? 700 : 500,
                      color: isActive ? cat.color : "var(--fg-muted)",
                      transition: "color 0.18s",
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}>
                      {cat.label}
                    </div>
                    {isActive && (
                      <div style={{ fontSize: "0.72rem", color: "var(--fg-subtle)", marginTop: "1px" }}>
                        {cat.desc}
                      </div>
                    )}
                  </div>
                  {isActive && (
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: cat.color, opacity: 0.8 }}>
                      {techStack[cat.key].length}
                    </span>
                  )}
                </button>
              );
            })}
          </motion.div>

          {/* Grid */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={`header-${active}`}
                style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.22 }}
              >
                <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: activeCat.color, boxShadow: `0 0 10px ${activeCat.color}`, display: "inline-block" }} />
                <span style={{ fontWeight: 700 }}>{activeCat.label}</span>
                <span style={{ fontSize: "0.8125rem", color: "var(--fg-subtle)" }}>— {activeCat.desc}</span>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: "10px" }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                {techStack[active].map((tech, i) => (
                  <TechItem key={tech.name} tech={tech} accentColor={activeCat.color} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
