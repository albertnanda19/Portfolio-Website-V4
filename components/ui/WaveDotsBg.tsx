"use client";

import { useEffect, useRef } from "react";

interface Props {
  spacing?: number;
  amplitude?: number;
  waveSpeed?: number;
  color?: string;
  style?: React.CSSProperties;
}

export function WaveDotsBg({
  spacing = 36,
  amplitude = 1.1,
  waveSpeed = 0.9,
  color = "88,166,255",
  style,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, raf: number;
    let t = 0;

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    };
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += waveSpeed * 0.016;

      const cols = Math.ceil(W / spacing) + 1;
      const rows = Math.ceil(H / spacing) + 1;

      for (let xi = 0; xi < cols; xi++) {
        for (let yi = 0; yi < rows; yi++) {
          const x = xi * spacing;
          const y = yi * spacing;

          // Two overlapping sine waves create interference pattern
          const wave =
            Math.sin(xi * 0.45 + t) * Math.sin(yi * 0.45 + t * 0.7) +
            Math.sin(xi * 0.25 - t * 0.5) * 0.4;

          const norm = (wave + 1.4) / 2.8; // normalize 0..1
          const r = 0.6 + norm * amplitude;
          const alpha = 0.12 + norm * 0.45;

          ctx.beginPath();
          ctx.arc(x, y, Math.max(0.3, r), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color},${alpha})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [spacing, amplitude, waveSpeed, color]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}
