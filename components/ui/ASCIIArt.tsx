"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ASCII = `
  ___  __  ___  __  _  _  ___  ___  ___  __
 / __)(  )(  _)(  )( \\/ )(  _)(  _)(  ,\\(  )
( (__  )(  ) _) )(  )  (  ) _) ) _) )    )(
 \\___)(__)(___)(__) (_/\\_)(___)(___)(_/\\_)__)
`;

const MINI = `
 █████╗ ███╗   ███╗
██╔══██╗████╗ ████║
███████║██╔████╔██║
██╔══██║██║╚██╔╝██║
██║  ██║██║ ╚═╝ ██║
╚═╝  ╚═╝╚═╝     ╚═╝
`.trim();

interface ASCIIArtProps {
  art?: "default" | "mini";
  className?: string;
  style?: React.CSSProperties;
  color?: string;
}

export function ASCIIArt({ art = "mini", className = "", style, color = "rgba(88,166,255,0.35)" }: ASCIIArtProps) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const lines = (art === "mini" ? MINI : ASCII).split("\n");

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden", ...style }}>
      {lines.map((line, i) => (
        <motion.div
          key={i}
          style={{
            fontFamily: "monospace",
            fontSize: "clamp(0.55rem, 1.2vw, 0.8rem)",
            lineHeight: 1.2,
            color,
            whiteSpace: "pre",
            letterSpacing: "0.05em",
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4, delay: i * 0.06 }}
        >
          {line}
        </motion.div>
      ))}
    </div>
  );
}
