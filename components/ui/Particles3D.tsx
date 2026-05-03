"use client";

import { useEffect, useRef } from "react";

interface Props {
  count?: number;
  speed?: number;
  style?: React.CSSProperties;
}

export function Particles3D({ count = 90, speed = 1.8, style }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fov = 400;
    const maxZ = 900;

    let W = 0, H = 0;
    let raf: number;

    type Star = { x: number; y: number; z: number };
    const stars: Star[] = Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 2400,
      y: (Math.random() - 0.5) * 2400,
      z: Math.random() * maxZ + 10,
    }));

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    };
    resize();

    const project = (x: number, y: number, z: number) => ({
      sx: (x / z) * fov + W / 2,
      sy: (y / z) * fov + H / 2,
      r: Math.min((fov / z) * 0.8, 2.2),
    });

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      for (const s of stars) {
        const cur = project(s.x, s.y, s.z);
        const prev = project(s.x, s.y, s.z + speed * 6);
        const alpha = Math.max(0, (1 - s.z / maxZ) * 0.65);

        // Trail
        ctx.beginPath();
        ctx.moveTo(prev.sx, prev.sy);
        ctx.lineTo(cur.sx, cur.sy);
        ctx.strokeStyle = `rgba(88,166,255,${alpha * 0.45})`;
        ctx.lineWidth = cur.r * 0.7;
        ctx.stroke();

        // Dot
        ctx.beginPath();
        ctx.arc(cur.sx, cur.sy, Math.max(0.3, cur.r), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(88,166,255,${alpha})`;
        ctx.fill();

        s.z -= speed;
        if (s.z < 1) {
          s.x = (Math.random() - 0.5) * 2400;
          s.y = (Math.random() - 0.5) * 2400;
          s.z = maxZ;
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
  }, [count, speed]);

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
