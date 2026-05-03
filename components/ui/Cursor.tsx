"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cursorX = useSpring(mouseX, { damping: 25, stiffness: 350 });
  const cursorY = useSpring(mouseY, { damping: 25, stiffness: 350 });
  const trailX = useSpring(mouseX, { damping: 40, stiffness: 150 });
  const trailY = useSpring(mouseY, { damping: 40, stiffness: 150 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest("a, button, [data-hover]"));
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9999,
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "white",
          mixBlendMode: "difference",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{ scale: isHovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      {/* Ring */}
      <motion.div
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9998,
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovering ? "44px" : "32px",
          height: isHovering ? "44px" : "32px",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.35)",
          opacity: isVisible ? 0.7 : 0,
          transition: "width 0.2s, height 0.2s",
        }}
        animate={{ scale: isHovering ? 1 : 1 }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
