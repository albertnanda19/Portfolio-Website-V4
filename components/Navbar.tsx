"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence, useSpring } from "framer-motion";
import { useState, useEffect } from "react";

const navItems = [
  { label: "About", href: "#about", num: "01" },
  { label: "Skills", href: "#skills", num: "02" },
  { label: "Projects", href: "#projects", num: "03" },
  { label: "Experience", href: "#experience", num: "04" },
  { label: "Contact", href: "#contact", num: "05" },
];

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollY, scrollYProgress } = useScroll();
  const progressWidth = useSpring(0, { stiffness: 200, damping: 30 });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 400);
    setScrolled(latest > 80);
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressWidth.set(v * 100);
  });

  useEffect(() => {
    const ids = navItems.map((n) => n.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Progress bar */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "2px", zIndex: 100, background: "rgba(48,54,61,0.25)" }}>
        <motion.div
          style={{
            height: "100%",
            background: "linear-gradient(to right, var(--blue), var(--purple), var(--pink))",
            width: progressWidth.get() + "%",
          }}
          animate={{ width: progressWidth.get() + "%" }}
          transition={{ duration: 0 }}
        />
      </div>

      <motion.header
        style={{ position: "fixed", top: "10px", left: 0, right: 0, zIndex: 50 }}
        animate={{ y: hidden ? -80 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <motion.div
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "8px 12px 8px 20px",
              borderRadius: "100px",
              background: scrolled ? "rgba(13,17,23,0.88)" : "transparent",
              border: scrolled ? "1px solid rgba(48,54,61,0.55)" : "1px solid transparent",
              backdropFilter: scrolled ? "blur(20px)" : "none",
              transition: "background 0.3s, border-color 0.3s, backdrop-filter 0.3s, box-shadow 0.3s",
              boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.35)" : "none",
            }}
          >
            {/* Desktop links */}
            <nav
              className="nav-desktop-links"
              style={{ alignItems: "center", gap: "2px" }}
            >
              {navItems.map((item) => (
                <NavItem key={item.href} item={item} active={activeSection === item.href.slice(1)} />
              ))}
            </nav>

            {/* Mobile: section label or spacer */}
            <div className="nav-mobile-btn" style={{ display: "none" }}>
              {/* intentionally empty — overridden by CSS class */}
            </div>
            {activeSection && (
              <span
                style={{
                  fontSize: "0.8125rem", fontWeight: 600, color: "var(--fg-muted)",
                  letterSpacing: "0.04em",
                  display: "none", // CSS class overrides on mobile
                }}
                className="nav-section-mobile"
              >
                {navItems.find((n) => n.href.slice(1) === activeSection)?.label ?? ""}
              </span>
            )}

            {/* Right side: available badge + CTA */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* Available indicator — desktop */}
              <div
                className="nav-desktop-cta"
                style={{
                  alignItems: "center", gap: "6px",
                  padding: "5px 12px", borderRadius: "100px",
                  background: "rgba(63,185,80,0.08)",
                  border: "1px solid rgba(63,185,80,0.2)",
                  fontSize: "0.75rem", fontWeight: 600, color: "#3fb950",
                  cursor: "default",
                }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3fb950", boxShadow: "0 0 6px #3fb950", display: "inline-block" }} />
                Available
              </div>

              <motion.a
                href="#contact"
                className="nav-desktop-cta"
                style={{
                  alignItems: "center", gap: "6px",
                  padding: "8px 20px", borderRadius: "100px",
                  fontSize: "0.875rem", fontWeight: 700,
                  background: scrolled ? "var(--blue)" : "rgba(88,166,255,0.12)",
                  color: scrolled ? "#0d1117" : "var(--blue)",
                  border: scrolled ? "none" : "1px solid rgba(88,166,255,0.3)",
                  textDecoration: "none",
                  letterSpacing: "-0.01em",
                  transition: "background 0.3s, color 0.3s",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Hire me
              </motion.a>

              {/* Hamburger — mobile only, uses CSS class (no inline display) */}
              <button
                className="nav-mobile-btn"
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{
                  background: "rgba(22,27,34,0.8)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  width: "38px", height: "38px",
                  cursor: "pointer",
                  padding: 0,
                }}
                aria-label="Toggle menu"
              >
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    style={{ display: "block", width: "18px", height: "1.5px", background: "var(--fg)", borderRadius: "2px", margin: "0 auto" }}
                    animate={
                      mobileOpen
                        ? i === 0 ? { rotate: 45, y: 6.5 }
                        : i === 1 ? { opacity: 0, scaleX: 0 }
                        : { rotate: -45, y: -6.5 }
                        : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
                    }
                    transition={{ duration: 0.2 }}
                  />
                ))}
              </button>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="nav-mobile-menu"
            style={{
              position: "fixed", top: "68px", left: "16px", right: "16px", zIndex: 49,
              background: "rgba(13,17,23,0.97)",
              border: "1px solid var(--border)",
              borderRadius: "20px",
              padding: "8px",
              backdropFilter: "blur(24px)",
            }}
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                style={{
                  display: "flex", alignItems: "center", gap: "14px",
                  padding: "13px 18px",
                  color: activeSection === item.href.slice(1) ? "var(--blue)" : "var(--fg-muted)",
                  textDecoration: "none",
                  fontSize: "0.9375rem", fontWeight: 600,
                  borderRadius: "12px",
                  background: activeSection === item.href.slice(1) ? "rgba(88,166,255,0.07)" : "transparent",
                  transition: "all 0.15s",
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "var(--fg)"; }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = activeSection === item.href.slice(1) ? "rgba(88,166,255,0.07)" : "transparent";
                  e.currentTarget.style.color = activeSection === item.href.slice(1) ? "var(--blue)" : "var(--fg-muted)";
                }}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "var(--fg-subtle)", minWidth: "24px" }}>{item.num}</span>
                {item.label}
              </motion.a>
            ))}
            <div style={{ height: "1px", background: "var(--border-subtle)", margin: "8px 18px" }} />
            <a
              href="#contact"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                margin: "8px", padding: "14px",
                background: "var(--blue)", borderRadius: "12px",
                color: "#0d1117", fontWeight: 700, textDecoration: "none",
              }}
              onClick={() => setMobileOpen(false)}
            >
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "rgba(0,0,0,0.4)", display: "inline-block" }} />
              Hire me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavItem({ item, active }: { item: { label: string; href: string; num: string }; active: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={item.href}
      style={{
        position: "relative",
        display: "inline-flex", alignItems: "center", gap: "5px",
        padding: "6px 14px",
        borderRadius: "100px",
        fontSize: "0.875rem",
        fontWeight: active ? 600 : 500,
        color: active ? "var(--fg)" : hovered ? "var(--fg)" : "var(--fg-muted)",
        textDecoration: "none",
        transition: "color 0.2s",
        zIndex: 1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileTap={{ scale: 0.94 }}
    >
      {(hovered || active) && (
        <motion.span
          layoutId="nav-indicator"
          style={{
            position: "absolute", inset: 0,
            background: active ? "rgba(88,166,255,0.1)" : "rgba(255,255,255,0.05)",
            borderRadius: "100px",
            zIndex: -1,
          }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
        />
      )}
      {active && (
        <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--blue)", display: "inline-block", flexShrink: 0 }} />
      )}
      {item.label}
    </motion.a>
  );
}
