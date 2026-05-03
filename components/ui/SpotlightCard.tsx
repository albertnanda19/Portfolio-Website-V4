"use client";

import { useRef, MouseEvent, ReactNode, CSSProperties } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  spotlightColor?: string;
}

export function SpotlightCard({ children, className = "", style, spotlightColor = "rgba(88,166,255,0.08)" }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty("--mouse-x", `${x}%`);
    ref.current.style.setProperty("--mouse-y", `${y}%`);
    ref.current.style.setProperty("--spotlight-color", spotlightColor);
  };

  return (
    <div
      ref={ref}
      className={`spotlight-card ${className}`}
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        transition: "border-color 0.25s, transform 0.25s, box-shadow 0.25s",
        ...style,
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle 220px at var(--mouse-x, 50%) var(--mouse-y, 50%), ${spotlightColor}, transparent 70%)`,
          opacity: 0,
          transition: "opacity 0.3s",
          pointerEvents: "none",
          zIndex: 1,
          borderRadius: "inherit",
        }}
        className="spotlight-inner"
      />
      <div style={{ position: "relative", zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
}
