"use client";

import { motion, useSpring } from "framer-motion";
import { useRef, MouseEvent as ReactMouseEvent, ReactNode } from "react";

interface WobbleCardProps {
  children: ReactNode;
  style?: React.CSSProperties;
  className?: string;
  containerStyle?: React.CSSProperties;
}

export function WobbleCard({ children, style, className, containerStyle }: WobbleCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, { stiffness: 180, damping: 10 });
  const rotateY = useSpring(0, { stiffness: 180, damping: 10 });
  const scale = useSpring(1, { stiffness: 260, damping: 18 });

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-y * 18);
    rotateY.set(x * 18);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => scale.set(1.02)}
      style={{
        perspective: "800px",
        rotateX,
        rotateY,
        scale,
        position: "relative",
        overflow: "hidden",
        borderRadius: "20px",
        ...containerStyle,
      }}
      className={className}
    >
      {/* Noise texture overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
          opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />
      {/* Inner shimmer */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.04), transparent 60%)",
        }}
      />
      <div style={{ position: "relative", zIndex: 3, ...style }}>
        {children}
      </div>
    </motion.div>
  );
}
