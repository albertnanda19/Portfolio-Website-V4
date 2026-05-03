"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useInView } from "react-intersection-observer";
import { projects, type Project } from "@/lib/data";
import { ExternalLink, ChevronLeft, ChevronRight, X, Code2, Maximize2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { TiltCard } from "@/components/ui/TiltCard";
import { WaveDotsBg } from "@/components/ui/WaveDotsBg";

function ImageLightbox({ images, initialIndex, title, onClose }: { images: string[]; initialIndex: number; title: string; onClose: () => void }) {
  const [idx, setIdx] = useState(initialIndex);

  const goPrev = useCallback(() => setIdx((i) => (i - 1 + images.length) % images.length), [images.length]);
  const goNext = useCallback(() => setIdx((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose, goPrev, goNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", backdropFilter: "blur(16px)", zIndex: 9500, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", cursor: "zoom-out" }}
    >
      <button
        onClick={onClose}
        style={{ position: "absolute", top: "20px", right: "20px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white", zIndex: 10 }}
      >
        <X size={18} />
      </button>

      <div style={{ position: "absolute", top: "24px", left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.6)", fontSize: "0.8125rem", fontWeight: 600 }}>
        {title} — {idx + 1} / {images.length}
      </div>

      <AnimatePresence mode="wait">
        <motion.img
          key={idx}
          src={images[idx]}
          alt={`${title} screenshot ${idx + 1}`}
          onClick={(e) => e.stopPropagation()}
          style={{ maxWidth: "92vw", maxHeight: "85vh", objectFit: "contain", borderRadius: "12px", cursor: "default", boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            style={{ position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "50%", width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white", zIndex: 10 }}
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            style={{ position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "50%", width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white", zIndex: 10 }}
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}
    </motion.div>
  );
}

function ImageCarousel({ images, title, compact = true, onMaximize }: { images: string[]; title: string; compact?: boolean; onMaximize?: (index: number) => void }) {
  const [idx, setIdx] = useState(0);
  const [hovered, setHovered] = useState(false);

  if (!images.length) return (
    <div style={{ aspectRatio: "16/9", background: "linear-gradient(135deg, rgba(88,166,255,0.06), rgba(163,113,247,0.06))", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontSize: "2rem", opacity: 0.18 }}>⚙️</span>
    </div>
  );

  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setIdx((i) => (i - 1 + images.length) % images.length); };
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setIdx((i) => (i + 1) % images.length); };

  return (
    <div
      style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden", background: "#090e14" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={idx}
          src={images[idx]}
          alt={`${title} screenshot ${idx + 1}`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          initial={{ opacity: 0, scale: 1.025 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <AnimatePresence>
            {hovered && (
              <>
                <motion.button
                  initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.15 }}
                  onClick={prev}
                  style={{ position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.68)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "50%", width: compact ? "26px" : "38px", height: compact ? "26px" : "38px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white", zIndex: 5 }}
                >
                  <ChevronLeft size={compact ? 13 : 19} />
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 6 }}
                  transition={{ duration: 0.15 }}
                  onClick={next}
                  style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.68)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "50%", width: compact ? "26px" : "38px", height: compact ? "26px" : "38px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white", zIndex: 5 }}
                >
                  <ChevronRight size={compact ? 13 : 19} />
                </motion.button>
              </>
            )}
          </AnimatePresence>

          {/* Dot indicators */}
          <div style={{ position: "absolute", bottom: "8px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "4px", zIndex: 5 }}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setIdx(i); }}
                style={{ width: i === idx ? "14px" : "5px", height: "5px", borderRadius: "3px", background: i === idx ? "white" : "rgba(255,255,255,0.35)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.2s" }}
              />
            ))}
          </div>

          {/* Counter */}
          <div style={{ position: "absolute", top: "8px", right: "8px", background: "rgba(0,0,0,0.68)", color: "rgba(255,255,255,0.88)", fontSize: "0.625rem", fontWeight: 700, padding: "2px 7px", borderRadius: "100px", letterSpacing: "0.04em", zIndex: 5 }}>
            {idx + 1}/{images.length}
          </div>
        </>
      )}

      <AnimatePresence>
        {hovered && onMaximize && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => { e.stopPropagation(); onMaximize(idx); }}
            style={{ position: "absolute", top: "8px", left: "8px", background: "rgba(0,0,0,0.68)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", width: compact ? "26px" : "34px", height: compact ? "26px" : "34px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white", zIndex: 5 }}
          >
            <Maximize2 size={compact ? 11 : 15} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape" && lightboxIndex === null) onClose(); };
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [onClose, lightboxIndex]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.84)", backdropFilter: "blur(12px)", zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 22, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 14, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "24px", width: "100%", maxWidth: "880px", maxHeight: "90vh", overflow: "hidden", display: "flex", flexDirection: "column" }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", overflow: "hidden" }}>
            {project.featured && (
              <span style={{ padding: "2px 9px", borderRadius: "100px", fontSize: "0.6875rem", fontWeight: 700, background: "rgba(88,166,255,0.15)", color: "var(--blue)", border: "1px solid rgba(88,166,255,0.3)", flexShrink: 0 }}>
                ★ Featured
              </span>
            )}
            <h3 style={{ fontWeight: 800, fontSize: "1.0625rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: "var(--bg-canvas)", border: "1px solid var(--border)", borderRadius: "50%", width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--fg-muted)", flexShrink: 0, marginLeft: "12px" }}
          >
            <X size={13} />
          </button>
        </div>

        {/* Body */}
        <div style={{ overflow: "auto", flex: 1 }} className="no-scrollbar">
          {/* Large image carousel */}
          <div style={{ width: "100%", flexShrink: 0 }}>
            <ImageCarousel images={project.images} title={project.title} compact={false} onMaximize={(idx) => setLightboxIndex(idx)} />
          </div>

          <div style={{ padding: "24px" }}>
            {/* Description */}
            <p style={{ color: "var(--fg-muted)", lineHeight: 1.82, marginBottom: "20px", fontSize: "0.925rem" }}>
              {project.longDescription || project.description}
            </p>

            {/* Key Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div style={{ marginBottom: "20px" }}>
                <p style={{ fontSize: "0.6875rem", fontWeight: 700, color: "var(--fg-subtle)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "10px" }}>
                  Key Highlights
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                  {project.highlights.map((h, i) => (
                    <li key={i} style={{ display: "flex", gap: "8px", fontSize: "0.875rem", color: "var(--fg-muted)", lineHeight: 1.65 }}>
                      <span style={{ color: "var(--blue)", flexShrink: 0, marginTop: "2px" }}>▸</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Patterns & Principles */}
            {project.principles && project.principles.length > 0 && (
              <div style={{ marginBottom: "20px" }}>
                <p style={{ fontSize: "0.6875rem", fontWeight: 700, color: "var(--fg-subtle)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "10px" }}>
                  Patterns & Principles
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {project.principles.map((p) => (
                    <span key={p} style={{ fontSize: "0.75rem", padding: "3px 10px", borderRadius: "100px", background: "rgba(163,113,247,0.08)", border: "1px solid rgba(163,113,247,0.2)", color: "var(--purple)", fontWeight: 500 }}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Full Tech Stack */}
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "0.6875rem", fontWeight: 700, color: "var(--fg-subtle)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "10px" }}>
                Tech Stack ({project.tech.length})
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {project.tech.map((t) => (
                  <span key={t} style={{ padding: "3px 10px", borderRadius: "100px", fontSize: "0.75rem", fontWeight: 600, background: "rgba(88,166,255,0.07)", border: "1px solid rgba(88,166,255,0.15)", color: "var(--blue)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div style={{ display: "flex", gap: "10px", paddingTop: "16px", borderTop: "1px solid var(--border)" }}>
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 18px", borderRadius: "100px", background: "var(--bg-canvas)", border: "1px solid var(--border)", fontSize: "0.875rem", color: "var(--fg-muted)", textDecoration: "none", fontWeight: 500, transition: "all 0.2s" }}
                onMouseOver={(e) => { e.currentTarget.style.color = "var(--fg)"; e.currentTarget.style.borderColor = "var(--fg-muted)"; }}
                onMouseOut={(e) => { e.currentTarget.style.color = "var(--fg-muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}>
                <FaGithub size={14} /> Source Code
              </a>
              {project.deployment && (
                <a href={project.deployment} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 18px", borderRadius: "100px", background: "rgba(88,166,255,0.1)", border: "1px solid rgba(88,166,255,0.3)", fontSize: "0.875rem", color: "var(--blue)", textDecoration: "none", fontWeight: 500 }}>
                  <ExternalLink size={13} /> Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <ImageLightbox
            images={project.images}
            initialIndex={lightboxIndex}
            title={project.title}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ProjectCard({ project, index, onDetails }: { project: Project; index: number; onDetails: () => void }) {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });
  const hasDetails = !!(project.highlights?.length || project.longDescription);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
    <TiltCard maxTilt={4} style={{ borderRadius: "16px", height: "100%" }}>
      <motion.article
        ref={ref}
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.06 }}
        whileHover={{ borderColor: "rgba(88,166,255,0.4)", boxShadow: "0 16px 48px rgba(0,0,0,0.35)" }}
      >
        {/* Image carousel */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <ImageCarousel images={project.images} title={project.title} onMaximize={(idx) => setLightboxIndex(idx)} />
          {project.featured && (
            <span style={{ position: "absolute", top: "10px", left: "10px", padding: "3px 10px", borderRadius: "100px", fontSize: "0.6875rem", fontWeight: 700, background: "rgba(88,166,255,0.18)", color: "var(--blue)", border: "1px solid rgba(88,166,255,0.3)", zIndex: 5 }}>
              ★ Featured
            </span>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", flex: 1 }}>
          <h3 style={{ fontWeight: 700, fontSize: "0.9375rem", marginBottom: "6px", lineHeight: 1.35 }}>
            {project.title}
          </h3>
          <p style={{ color: "var(--fg-muted)", fontSize: "0.8125rem", lineHeight: 1.72, marginBottom: "10px" }}>
            {project.description}
          </p>

          {/* Highlights preview (2 max) */}
          {project.highlights && project.highlights.length > 0 && (
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 10px", display: "flex", flexDirection: "column", gap: "4px" }}>
              {project.highlights.slice(0, 2).map((h, i) => (
                <li key={i} style={{ display: "flex", gap: "6px", fontSize: "0.75rem", color: "var(--fg-subtle)", lineHeight: 1.5 }}>
                  <span style={{ color: "var(--blue)", flexShrink: 0 }}>▸</span>
                  {h}
                </li>
              ))}
            </ul>
          )}

          {/* All tech tags — no truncation */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "12px", flex: 1, alignContent: "flex-start" }}>
            {project.tech.map((t) => (
              <span key={t} style={{ padding: "2px 8px", borderRadius: "100px", fontSize: "0.625rem", fontWeight: 600, background: "rgba(88,166,255,0.07)", border: "1px solid rgba(88,166,255,0.15)", color: "var(--blue)", whiteSpace: "nowrap" }}>
                {t}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "12px", paddingTop: "10px", borderTop: "1px solid var(--border)", alignItems: "center" }}>
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.8125rem", color: "var(--fg-muted)", textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "var(--fg)")}
              onMouseOut={(e) => (e.currentTarget.style.color = "var(--fg-muted)")}
            >
              <FaGithub size={12} /> Source
            </a>
            {project.deployment && (
              <a href={project.deployment} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.8125rem", color: "var(--blue)", textDecoration: "none", fontWeight: 500 }}>
                <ExternalLink size={11} /> Live
              </a>
            )}
            {hasDetails && (
              <button
                onClick={onDetails}
                style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "5px", fontSize: "0.75rem", color: "var(--fg-subtle)", background: "var(--bg-canvas)", border: "1px solid var(--border)", padding: "4px 10px", borderRadius: "100px", cursor: "pointer", fontFamily: "var(--font)", transition: "all 0.2s" }}
                onMouseOver={(e) => { e.currentTarget.style.color = "var(--blue)"; e.currentTarget.style.borderColor = "rgba(88,166,255,0.4)"; }}
                onMouseOut={(e) => { e.currentTarget.style.color = "var(--fg-subtle)"; e.currentTarget.style.borderColor = "var(--border)"; }}
              >
                <Code2 size={10} /> Details
              </button>
            )}
          </div>
        </div>
      </motion.article>
    </TiltCard>

    {mounted && createPortal(
      <AnimatePresence>
        {lightboxIndex !== null && (
          <ImageLightbox
            images={project.images}
            initialIndex={lightboxIndex}
            title={project.title}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>,
      document.body
    )}
    </>
  );
}

export function Projects() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const featuredProjects = projects.filter((p) => p.featured);
  const regularProjects = projects.filter((p) => !p.featured);
  const visibleRegular = showAll ? regularProjects : regularProjects.slice(0, 6);

  return (
    <section id="projects" ref={ref} style={{ padding: "100px 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }} className="grid-lines" />
      <WaveDotsBg spacing={42} amplitude={1.0} waveSpeed={0.8} style={{ opacity: 0.60 }} />

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
            href="https://github.com/albertnanda19"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem", color: "var(--fg-muted)", textDecoration: "none", fontWeight: 500, whiteSpace: "nowrap", padding: "9px 18px", borderRadius: "100px", border: "1px solid var(--border)", transition: "all 0.2s" }}
            onMouseOver={(e) => { e.currentTarget.style.color = "var(--fg)"; e.currentTarget.style.borderColor = "var(--fg-muted)"; }}
            onMouseOut={(e) => { e.currentTarget.style.color = "var(--fg-muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
          >
            <FaGithub size={15} /> All on GitHub
          </a>
        </motion.div>

        {/* Featured: 2-col */}
        {featuredProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ marginBottom: "16px" }}>
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} onDetails={() => setSelectedProject(project)} />
            ))}
          </div>
        )}

        {/* Regular: 3-col */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleRegular.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i + featuredProjects.length} onDetails={() => setSelectedProject(project)} />
          ))}
        </div>

        {regularProjects.length > 6 && (
          <motion.div style={{ marginTop: "32px", textAlign: "center" }} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}>
            <button
              onClick={() => setShowAll(!showAll)}
              style={{ padding: "11px 26px", borderRadius: "100px", fontSize: "0.9rem", fontWeight: 600, color: "var(--fg-muted)", cursor: "pointer", background: "var(--bg-card)", border: "1px solid var(--border)", fontFamily: "var(--font)", transition: "all 0.2s" }}
              onMouseOver={(e) => { e.currentTarget.style.color = "var(--blue)"; e.currentTarget.style.borderColor = "rgba(88,166,255,0.4)"; }}
              onMouseOut={(e) => { e.currentTarget.style.color = "var(--fg-muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
            >
              {showAll ? "Show less ↑" : `Show ${regularProjects.length - 6} more ↓`}
            </button>
          </motion.div>
        )}
      </div>

      {/* Modal portal — avoids z-index / overflow:hidden clip issues */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
