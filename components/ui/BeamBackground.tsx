"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export function BeamBackground({ count = 6 }: { count?: number }) {
  const beams = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: `${(i + 1) * (100 / (count + 1))}%`,
        delay: i * 0.9,
        duration: 4 + i * 0.5,
        opacity: 0.06 + (i % 3) * 0.02,
      })),
    [count]
  );

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {beams.map((beam, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            top: 0,
            left: beam.left,
            width: "1px",
            height: "60%",
            background: `linear-gradient(to bottom, transparent, rgba(88,166,255,${beam.opacity}), rgba(163,113,247,${beam.opacity}), transparent)`,
            transformOrigin: "top",
          }}
          animate={{
            y: ["0%", "170%"],
            opacity: [0, beam.opacity * 5, beam.opacity * 5, 0],
          }}
          transition={{
            duration: beam.duration,
            delay: beam.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
