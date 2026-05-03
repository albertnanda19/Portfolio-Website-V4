"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, FormEvent } from "react";
import { contact } from "@/lib/data";
import { Globe, ArrowUpRight, Mail, Send, CheckCircle2 } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { BeamBackground } from "@/components/ui/BeamBackground";
import { EncryptedTextOnView } from "@/components/ui/EncryptedText";

const links = [
  { Icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}`, color: "#f85149" },
  { Icon: FaGithub, label: "GitHub", value: "@albertnanda19", href: contact.github, color: "#e6edf3" },
  { Icon: FaLinkedin, label: "LinkedIn", value: "Albert Mangiri", href: contact.linkedin, color: "#58a6ff" },
  { Icon: FaInstagram, label: "Instagram", value: "@albert.fnc", href: contact.instagram, color: "#f778ba" },
  { Icon: Globe, label: "Website", value: "albertm.vercel.app", href: contact.website, color: "#3fb950" },
];

function InputField({
  label, type = "text", placeholder, value, onChange, required,
}: {
  label: string; type?: string; placeholder: string;
  value: string; onChange: (v: string) => void; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "var(--fg-muted)", marginBottom: "8px", letterSpacing: "0.02em" }}>
        {label}{required && <span style={{ color: "var(--blue)", marginLeft: "3px" }}>*</span>}
      </label>
      <div style={{ position: "relative" }}>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          required={required}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%", padding: "13px 16px",
            background: "rgba(13,17,23,0.6)",
            border: `1px solid ${focused ? "rgba(88,166,255,0.45)" : "var(--border)"}`,
            borderRadius: "12px",
            color: "var(--fg)", fontSize: "0.9375rem",
            fontFamily: "var(--font)",
            outline: "none",
            transition: "border-color 0.2s, box-shadow 0.2s",
            boxShadow: focused ? "0 0 0 3px rgba(88,166,255,0.08)" : "none",
          }}
        />
        {focused && (
          <motion.div
            layoutId={`field-glow-${label}`}
            style={{
              position: "absolute", inset: 0, borderRadius: "12px",
              background: "radial-gradient(ellipse at 50% 0%, rgba(88,166,255,0.06), transparent 70%)",
              pointerEvents: "none",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </div>
    </div>
  );
}

export function Contact() {
  const { ref, inView } = useInView({ threshold: 0.06, triggerOnce: true });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [msgFocused, setMsgFocused] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const body = `Hi Albert,\n\nMy name is ${name}.\n\n${message}\n\nBest,\n${name}\n(${email})`;
    window.location.href = `mailto:${contact.email}?subject=Hello from your portfolio — ${name}&body=${encodeURIComponent(body)}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: "100px 0 64px",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(to bottom, var(--bg-canvas), #060b11)",
      }}
    >
      <BeamBackground count={10} />

      <div style={{
        position: "absolute", bottom: "-10%", left: "50%", transform: "translateX(-50%)",
        width: "900px", height: "400px",
        background: "radial-gradient(ellipse, rgba(88,166,255,0.05), transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ position: "absolute", top: 0, left: "8%", right: "8%", height: "1px", background: "linear-gradient(to right, transparent, var(--border), transparent)" }} />

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 32px", position: "relative" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: "56px", textAlign: "center" }}
        >
          <p className="section-tag">Let&apos;s connect</p>
          <EncryptedTextOnView
            text="Have a project in mind?"
            as="h2"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1.05,
              marginBottom: "18px", display: "block",
            }}
          />
          <p style={{ color: "var(--fg-muted)", fontSize: "1.0625rem", lineHeight: 1.75, maxWidth: "520px", margin: "0 auto" }}>
            Whether you&apos;re building something new, improving existing systems,
            or just want to talk tech — I&apos;m open to it.
          </p>
        </motion.div>

        {/* Two-col: form + links */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left: contact form */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div style={{
              background: "rgba(19,24,31,0.75)",
              border: "1px solid var(--border)",
              borderRadius: "20px",
              padding: "32px",
              backdropFilter: "blur(12px)",
              position: "relative",
              overflow: "hidden",
            }}>
              {/* Subtle top glow */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                background: "linear-gradient(to right, transparent, rgba(88,166,255,0.3), transparent)",
              }} />

              <h3 style={{ fontWeight: 800, fontSize: "1.125rem", marginBottom: "6px" }}>Send a message</h3>
              <p style={{ color: "var(--fg-subtle)", fontSize: "0.875rem", marginBottom: "28px", lineHeight: 1.6 }}>
                I typically reply within 24 hours.
              </p>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField label="Name" placeholder="Your name" value={name} onChange={setName} required />
                  <InputField label="Email" type="email" placeholder="your@email.com" value={email} onChange={setEmail} required />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "var(--fg-muted)", marginBottom: "8px", letterSpacing: "0.02em" }}>
                    Message <span style={{ color: "var(--blue)" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <textarea
                      placeholder="Tell me about your project, idea, or just say hello..."
                      value={message}
                      required
                      rows={5}
                      onChange={(e) => setMessage(e.target.value)}
                      onFocus={() => setMsgFocused(true)}
                      onBlur={() => setMsgFocused(false)}
                      style={{
                        width: "100%", padding: "13px 16px",
                        background: "rgba(13,17,23,0.6)",
                        border: `1px solid ${msgFocused ? "rgba(88,166,255,0.45)" : "var(--border)"}`,
                        borderRadius: "12px",
                        color: "var(--fg)", fontSize: "0.9375rem",
                        fontFamily: "var(--font)",
                        outline: "none", resize: "vertical",
                        transition: "border-color 0.2s, box-shadow 0.2s",
                        boxShadow: msgFocused ? "0 0 0 3px rgba(88,166,255,0.08)" : "none",
                        lineHeight: 1.7,
                      }}
                    />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="sent"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                        padding: "14px", borderRadius: "12px",
                        background: "rgba(63,185,80,0.1)",
                        border: "1px solid rgba(63,185,80,0.25)",
                        color: "#3fb950", fontWeight: 600, fontSize: "0.9375rem",
                      }}
                    >
                      <CheckCircle2 size={18} />
                      Email client opened — message ready to send!
                    </motion.div>
                  ) : (
                    <motion.button
                      key="submit"
                      type="submit"
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                        padding: "14px 24px", borderRadius: "12px",
                        background: "var(--blue)", color: "#0d1117",
                        fontWeight: 700, fontSize: "0.9375rem",
                        border: "none", cursor: "pointer",
                        fontFamily: "var(--font)",
                        transition: "background 0.2s",
                      }}
                      whileHover={{ scale: 1.02, backgroundColor: "#79c0ff" }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Send size={16} />
                      Send message
                    </motion.button>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>

          {/* Right: social links + info */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div>
              <p style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "6px" }}>Or find me on</p>
              <p style={{ color: "var(--fg-subtle)", fontSize: "0.875rem", lineHeight: 1.65 }}>
                I&apos;m active on GitHub and LinkedIn. Feel free to reach out anywhere.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", gap: "14px",
                    padding: "14px 16px",
                    background: "rgba(19,24,31,0.75)",
                    border: "1px solid var(--border)",
                    borderRadius: "14px", textDecoration: "none", color: "var(--fg)",
                    backdropFilter: "blur(8px)",
                  }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.35, delay: 0.3 + i * 0.06 }}
                  whileHover={{ y: -2, borderColor: link.color, boxShadow: `0 6px 24px ${link.color}16`, backgroundColor: `${link.color}08` }}
                >
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "10px",
                    background: `${link.color}12`, border: `1px solid ${link.color}22`,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <link.Icon size={15} style={{ color: link.color }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "0.7rem", color: "var(--fg-subtle)", marginBottom: "1px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>
                      {link.label}
                    </p>
                    <p style={{ fontSize: "0.875rem", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {link.value}
                    </p>
                  </div>
                  <ArrowUpRight size={13} style={{ color: "var(--fg-subtle)", flexShrink: 0 }} />
                </motion.a>
              ))}
            </div>

            {/* Availability card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.65 }}
              style={{
                padding: "20px",
                background: "rgba(63,185,80,0.06)",
                border: "1px solid rgba(63,185,80,0.2)",
                borderRadius: "14px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#3fb950", boxShadow: "0 0 8px #3fb950", display: "inline-block" }} />
                <p style={{ fontWeight: 700, fontSize: "0.9375rem", color: "#3fb950" }}>Open to opportunities</p>
              </div>
              <p style={{ fontSize: "0.8375rem", color: "var(--fg-muted)", lineHeight: 1.65 }}>
                Currently available for full-time roles, freelance projects, and technical consulting. Based in Indonesia, open to remote globally.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          style={{ marginTop: "72px", paddingTop: "28px", borderTop: "1px solid var(--border-subtle)", color: "var(--fg-subtle)", fontSize: "0.875rem", lineHeight: 1.8, textAlign: "center" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
        >
          <p>Designed & built by <span className="text-gradient" style={{ fontWeight: 700 }}>Albert Mangiri</span> · {new Date().getFullYear()}</p>
          <p style={{ marginTop: "4px", fontSize: "0.8125rem" }}>Next.js · Poppins · Framer Motion · Three.js · Cobe</p>
        </motion.div>
      </div>
    </section>
  );
}
