"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";

interface GooeyInputProps {
  placeholder?: string;
  onSubmit?: (value: string) => void;
  buttonLabel?: string;
}

export function GooeyInput({ placeholder = "Enter your email...", onSubmit, buttonLabel = "Send" }: GooeyInputProps) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmit?.(value);
    setSent(true);
    setTimeout(() => { setSent(false); setValue(""); }, 2500);
  };

  return (
    <div style={{ position: "relative" }}>
      {/* SVG gooey filter */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="gooey-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -8" result="gooey" />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      <form onSubmit={handleSubmit}>
        <motion.div
          style={{
            display: "flex",
            filter: "url(#gooey-filter)",
            position: "relative",
          }}
          animate={focused ? { scale: 1.02 } : { scale: 1 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
        >
          <input
            type="email"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            style={{
              flex: 1,
              padding: "16px 24px",
              background: focused ? "#161b22" : "#13181f",
              border: `2px solid ${focused ? "var(--blue)" : "var(--border)"}`,
              borderRadius: "100px 0 0 100px",
              fontSize: "0.9375rem",
              color: "var(--fg)",
              outline: "none",
              fontFamily: "var(--font)",
              transition: "border-color 0.3s, background 0.3s",
            }}
          />
          <motion.button
            type="submit"
            style={{
              padding: "16px 28px",
              background: sent ? "var(--green)" : "var(--blue)",
              border: "none",
              borderRadius: "0 100px 100px 0",
              fontSize: "0.9375rem",
              fontWeight: 700,
              color: "#0d1117",
              cursor: "pointer",
              fontFamily: "var(--font)",
              whiteSpace: "nowrap",
              transition: "background 0.3s",
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            {sent ? "✓ Sent!" : buttonLabel}
          </motion.button>
        </motion.div>
      </form>

      {/* Gooey blob decorations */}
      {focused && (
        <>
          <motion.div
            style={{
              position: "absolute",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: "var(--blue)",
              top: "-8px", right: "60px",
              pointerEvents: "none",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1, y: [-5, 5, -5] }}
            transition={{ duration: 0.4, y: { repeat: Infinity, duration: 2 } }}
          />
          <motion.div
            style={{
              position: "absolute",
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "var(--purple)",
              bottom: "-6px", left: "80px",
              pointerEvents: "none",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.5, scale: 1, y: [5, -5, 5] }}
            transition={{ duration: 0.4, delay: 0.1, y: { repeat: Infinity, duration: 2.2 } }}
          />
        </>
      )}
    </div>
  );
}
