"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import createGlobe from "cobe";

export function CobeGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);
  const phiRef = useRef(2.0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const size = canvas.offsetWidth || 400;

    globeRef.current = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: size * 2,
      height: size * 2,
      phi: phiRef.current,
      theta: 0.25,
      dark: 1,
      diffuse: 1.8,
      mapSamples: 20000,
      mapBrightness: 8,
      baseColor: [0.12, 0.18, 0.26],
      markerColor: [0.35, 0.65, 1],
      glowColor: [0.15, 0.45, 1],
      scale: 1,
      offset: [0, 0],
      markers: [
        { location: [-0.789, 113.921], size: 0.12 },  // Indonesia
        { location: [37.774, -122.419], size: 0.07 }, // San Francisco
        { location: [40.712, -74.005], size: 0.06 },  // New York
        { location: [51.507, -0.127], size: 0.06 },   // London
        { location: [35.676, 139.650], size: 0.07 },  // Tokyo
        { location: [1.352, 103.819], size: 0.07 },   // Singapore
        { location: [48.856, 2.352], size: 0.05 },    // Paris
        { location: [-33.868, 151.209], size: 0.05 }, // Sydney
        { location: [22.302, 114.177], size: 0.06 },  // Hong Kong
      ],
    });

    const animate = () => {
      phiRef.current += 0.004;
      globeRef.current?.update({ phi: phiRef.current });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      globeRef.current?.destroy();
    };
  }, []);

  return (
    <motion.div
      style={{ position: "relative", width: "100%", aspectRatio: "1/1" }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Glow behind */}
      <div style={{
        position: "absolute", inset: "12%", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(88,166,255,0.12), transparent 70%)",
        filter: "blur(20px)", pointerEvents: "none",
      }} />

      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", borderRadius: "50%", cursor: "crosshair" }}
      />

      {/* Ring */}
      <div style={{
        position: "absolute", inset: "-2%", borderRadius: "50%",
        border: "1px solid rgba(88,166,255,0.1)", pointerEvents: "none",
      }} />
    </motion.div>
  );
}
