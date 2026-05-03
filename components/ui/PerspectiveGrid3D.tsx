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
      const cols = 18;
      const rows = 22;

      // Vertical lines converging at vanishing point
      for (let i = -cols; i <= cols; i++) {
        const bx = vx + (i / cols) * W * 0.78;
        const isMid = Math.abs(i) <= 1;
        ctx.beginPath();
        ctx.moveTo(bx, H);
        ctx.lineTo(vx, horizon);
        ctx.strokeStyle = `rgba(88,166,255,${isMid ? 0.12 : 0.045})`;
        ctx.lineWidth = isMid ? 1 : 0.7;
        ctx.stroke();
      }

      // Horizontal lines — depth-animated, flying toward viewer
      offset = (offset + 0.0045) % 1;
      for (let i = 0; i < rows; i++) {
        const d = ((i / rows) + offset) % 1; // depth 0 (horizon) → 1 (viewer)
        const y = horizon + (H - horizon) * Math.pow(d, 2.4);
        if (y <= horizon + 1 || y > H) continue;
        const alpha = d * 0.17;
        const lw = d * 1.4;
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
      grad.addColorStop(0.2, "rgba(88,166,255,0.1)");
      grad.addColorStop(0.45, "rgba(163,113,247,0.3)");
      grad.addColorStop(0.55, "rgba(88,166,255,0.3)");
      grad.addColorStop(0.8, "rgba(88,166,255,0.1)");
      grad.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.moveTo(0, horizon);
      ctx.lineTo(W, horizon);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
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
