"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect, useCallback } from "react";
import { certificates } from "@/lib/data";
import { Award, X, ChevronLeft, ChevronRight } from "lucide-react";
import { WaveDotsBg } from "@/components/ui/WaveDotsBg";

function CertificateLightbox({
  certs,
  initialIndex,
  onClose,
}: {
  certs: typeof certificates;
  initialIndex: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(initialIndex);
  const cert = certs[idx];

  const goPrev = useCallback(() => setIdx((i) => (i - 1 + certs.length) % certs.length), [certs.length]);
  const goNext = useCallback(() => setIdx((i) => (i + 1) % certs.length), [certs.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, goPrev, goNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.92)",
        backdropFilter: "blur(16px)",
        zIndex: 9500,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        cursor: "zoom-out",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "white",
          zIndex: 10,
        }}
      >
        <X size={18} />
      </button>

      <div
        style={{
          position: "absolute",
          top: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(255,255,255,0.6)",
          fontSize: "0.8125rem",
          fontWeight: 600,
          textAlign: "center",
          maxWidth: "80%",
        }}
      >
        {cert.title} — {cert.issuer}
      </div>

      <AnimatePresence mode="wait">
        <motion.img
          key={idx}
          src={cert.image}
          alt={cert.title}
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: "92vw",
            maxHeight: "80vh",
            objectFit: "contain",
            borderRadius: "12px",
            cursor: "default",
            boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
          }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        />
      </AnimatePresence>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          marginTop: "16px",
          color: "rgba(255,255,255,0.5)",
          fontSize: "0.8125rem",
          textAlign: "center",
          cursor: "default",
        }}
      >
        Issued {cert.date} · {idx + 1} / {certs.length}
      </div>

      {certs.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            style={{
              position: "absolute",
              left: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "50%",
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "white",
              zIndex: 10,
            }}
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            style={{
              position: "absolute",
              right: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "50%",
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "white",
              zIndex: 10,
            }}
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}
    </motion.div>
  );
}

export function Certificates() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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
            <motion.div
              key={cert.id}
              onClick={() => setLightboxIndex(i)}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "28px",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "18px",
                color: "var(--fg)",
                transition: "all 0.25s",
                cursor: "pointer",
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

              <div style={{
                aspectRatio: "16/9",
                borderRadius: "10px",
                background: "var(--bg-canvas)",
                border: "1px solid var(--border)",
                overflow: "hidden",
                marginBottom: "20px",
              }}>
                <img
                  src={cert.image}
                  alt={cert.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "6px", lineHeight: 1.3 }}>
                {cert.title}
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--blue)", fontWeight: 500, marginBottom: "4px" }}>
                {cert.issuer}
              </p>
              <p style={{ fontSize: "0.8125rem", color: "var(--fg-subtle)" }}>
                Issued {cert.date}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <CertificateLightbox
            certs={certificates}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
