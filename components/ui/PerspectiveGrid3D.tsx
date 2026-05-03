"use client";

import { useEffect, useRef } from "react";

interface Props {
  style?: React.CSSProperties;
  horizonAt?: number; // 0..1, fraction of canvas height
}

export function PerspectiveGrid3D({ style, horizonAt = 0.58 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, raf: number, offset = 0;

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    };
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const horizon = H * horizonAt;
      const vx = W / 2;
      const cols = 20;
      const rows = 24;

      // Vertical lines converging at vanishing point
      for (let i = -cols; i <= cols; i++) {
        const bx = vx + (i / cols) * W * 0.82;
        const isMid = Math.abs(i) <= 1;
        ctx.beginPath();
        ctx.moveTo(bx, H);
        ctx.lineTo(vx, horizon);
        ctx.strokeStyle = `rgba(88,166,255,${isMid ? 0.22 : 0.09})`;
        ctx.lineWidth = isMid ? 1.2 : 0.8;
        ctx.stroke();
      }

      // Horizontal lines — depth-animated, flying toward viewer
      offset = (offset + 0.005) % 1;
      for (let i = 0; i < rows; i++) {
        const d = ((i / rows) + offset) % 1;
        const y = horizon + (H - horizon) * Math.pow(d, 2.2);
        if (y <= horizon + 1 || y > H) continue;
        const alpha = d * 0.28;
        const lw = d * 1.8;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.strokeStyle = `rgba(88,166,255,${alpha})`;
        ctx.lineWidth = lw;
        ctx.stroke();
      }

      // Horizon glow
      const grad = ctx.createLinearGradient(0, 0, W, 0);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(0.15, "rgba(88,166,255,0.18)");
      grad.addColorStop(0.42, "rgba(163,113,247,0.5)");
      grad.addColorStop(0.58, "rgba(88,166,255,0.5)");
      grad.addColorStop(0.85, "rgba(88,166,255,0.18)");
      grad.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.moveTo(0, horizon);
      ctx.lineTo(W, horizon);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.stroke();

      raf = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [horizonAt]);

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
