"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { projects } from "@/lib/data";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { TiltCard } from "@/components/ui/TiltCard";

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });

  return (
    <TiltCard maxTilt={4} style={{ borderRadius: "16px", height: "100%" }}>
      <motion.article
        ref={ref}
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.06 }}
        whileHover={{ borderColor: "rgba(88,166,255,0.4)", boxShadow: "0 16px 48px rgba(0,0,0,0.35)" }}
      >
        {/* Image area */}
        <div style={{
          position: "relative",
          aspectRatio: "16/9",
          background: "#090e14",
          flexShrink: 0,
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, rgba(88,166,255,0.06), rgba(163,113,247,0.06))",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: "2.5rem", opacity: 0.16 }}>⚙️</span>
          </div>

          {project.featured && (
            <span style={{
              position: "absolute", top: "10px", left: "10px",
              padding: "3px 10px", borderRadius: "100px",
              fontSize: "0.6875rem", fontWeight: 700,
              background: "rgba(88,166,255,0.18)",
              color: "var(--blue)",
              border: "1px solid rgba(88,166,255,0.3)",
            }}>
              ★ Featured
            </span>
          )}

          <span style={{
            position: "absolute", bottom: "10px", right: "10px",
            width: "24px", height: "24px", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(13,17,23,0.7)", border: "1px solid var(--border)",
            fontSize: "0.6875rem", fontWeight: 700, color: "var(--fg-subtle)",
          }}>
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Content */}
        <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
          <h3 style={{ fontWeight: 700, fontSize: "0.9375rem", marginBottom: "7px", lineHeight: 1.35 }}>
            {project.title}
          </h3>
          <p style={{ color: "var(--fg-muted)", fontSize: "0.8375rem", lineHeight: 1.7, flex: 1, marginBottom: "14px" }}>
            {project.description}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "14px" }}>
            {project.tech.slice(0, 4).map((t) => (
              <span key={t} style={{
                padding: "2px 9px", borderRadius: "100px",
                fontSize: "0.6875rem", fontWeight: 600,
                background: "rgba(88,166,255,0.07)",
                border: "1px solid rgba(88,166,255,0.15)",
                color: "var(--blue)",
              }}>
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span style={{
                padding: "2px 9px", borderRadius: "100px",
                fontSize: "0.6875rem", fontWeight: 600,
                background: "rgba(110,118,129,0.1)",
                border: "1px solid rgba(110,118,129,0.2)",
                color: "var(--fg-subtle)",
              }}>
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          <div style={{ display: "flex", gap: "14px", paddingTop: "12px", borderTop: "1px solid var(--border-subtle)" }}>
            <a href={project.github} target="_blank" rel="noopener noreferrer" style={{
              display: "flex", alignItems: "center", gap: "5px",
              fontSize: "0.8125rem", color: "var(--fg-muted)", textDecoration: "none",
              fontWeight: 500, transition: "color 0.2s",
            }}
              onMouseOver={(e) => (e.currentTarget.style.color = "var(--fg)")}
              onMouseOut={(e) => (e.currentTarget.style.color = "var(--fg-muted)")}
            >
              <FaGithub size={13} /> Source
            </a>
            {project.deployment && (
              <a href={project.deployment} target="_blank" rel="noopener noreferrer" style={{
                display: "flex", alignItems: "center", gap: "5px",
                fontSize: "0.8125rem", color: "var(--blue)", textDecoration: "none", fontWeight: 500,
              }}>
                <ExternalLink size={12} /> Live
              </a>
            )}
          </div>
        </div>
      </motion.article>
    </TiltCard>
  );
}

export function Projects() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });
  const [showAll, setShowAll] = useState(false);

  const featuredProjects = projects.filter((p) => p.featured);
  const regularProjects = projects.filter((p) => !p.featured);
  const visibleRegular = showAll ? regularProjects : regularProjects.slice(0, 3);

  return (
    <section id="projects" ref={ref} style={{ padding: "100px 0", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }} className="grid-lines" />

      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 32px", position: "relative" }}>
        <motion.div
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px", flexWrap: "wrap", gap: "16px" }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div>
            <p className="section-tag">Portfolio</p>
            <h2 style={{ fontSize: "clamp(2.25rem, 5vw, 3.25rem)", fontWeight: 900, letterSpacing: "-0.04em", marginBottom: "10px" }}>
              Selected Projects
            </h2>
            <p style={{ color: "var(--fg-muted)", maxWidth: "460px", lineHeight: 1.7 }}>
              Projects that demonstrate my skills across the full stack.
            </p>
          </div>

          <a
            href="https://github.com/albertmangiri"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              fontSize: "0.875rem", color: "var(--fg-muted)",
              textDecoration: "none", fontWeight: 500, whiteSpace: "nowrap",
              padding: "9px 18px", borderRadius: "100px",
              border: "1px solid var(--border)",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => { e.currentTarget.style.color = "var(--fg)"; e.currentTarget.style.borderColor = "var(--fg-muted)"; }}
            onMouseOut={(e) => { e.currentTarget.style.color = "var(--fg-muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
          >
            <FaGithub size={15} />
            All on GitHub
          </a>
        </motion.div>

        {/* Featured: 2-col grid */}
        {featuredProjects.length > 0 && (
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            style={{ marginBottom: "16px" }}
          >
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}

        {/* Regular: 3-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleRegular.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i + featuredProjects.length} />
          ))}
        </div>

        {regularProjects.length > 3 && (
          <motion.div
            style={{ marginTop: "32px", textAlign: "center" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={() => setShowAll(!showAll)}
              style={{
                padding: "11px 26px", borderRadius: "100px",
                fontSize: "0.9rem", fontWeight: 600,
                color: "var(--fg-muted)", cursor: "pointer",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                fontFamily: "var(--font)",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => { e.currentTarget.style.color = "var(--blue)"; e.currentTarget.style.borderColor = "rgba(88,166,255,0.4)"; }}
              onMouseOut={(e) => { e.currentTarget.style.color = "var(--fg-muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
            >
              {showAll ? "Show less ↑" : `Show ${regularProjects.length - 3} more ↓`}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
