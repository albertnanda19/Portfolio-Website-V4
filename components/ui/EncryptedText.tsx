"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

interface EncryptedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  trigger?: boolean;
  speed?: number;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

export function EncryptedText({
  text,
  className = "",
  style,
  trigger = true,
  speed = 40,
  delay = 0,
  as: Tag = "span",
}: EncryptedTextProps) {
  const [displayed, setDisplayed] = useState<string[]>(text.split("").map(() => " "));
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startedRef = useRef(false);

  const scramble = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    const chars = text.split("");
    const iterations = Array(chars.length).fill(0);
    const maxIter = 6;
    let tick = 0;

    const frame = () => {
      const next = chars.map((ch, i) => {
        if (ch === " ") return " ";
        if (iterations[i] >= maxIter + i) return ch;
        iterations[i]++;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      });
      setDisplayed(next);
      tick++;
      if (next.some((ch, i) => ch !== chars[i] || iterations[i] < maxIter + i)) {
        frameRef.current = setTimeout(frame, speed);
      }
    };

    setTimeout(frame, delay * 1000);
  };

  useEffect(() => {
    if (trigger) scramble();
    return () => { if (frameRef.current) clearTimeout(frameRef.current); };
  }, [trigger]); // eslint-disable-line

  return (
    <Tag className={className} style={{ fontVariantNumeric: "tabular-nums", ...style }}>
      {displayed.join("")}
    </Tag>
  );
}

export function EncryptedTextOnView({
  text,
  className = "",
  style,
  speed = 35,
  delay = 0,
  as = "span",
}: EncryptedTextProps) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  return (
    <span ref={ref}>
      <EncryptedText text={text} className={className} style={style} trigger={inView} speed={speed} delay={delay} as={as} />
    </span>
  );
}
