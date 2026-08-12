"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { MouseEvent, ReactNode } from "react";

export function MagneticButton({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  const reducedMotion = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 20 });
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 20 });

  function handleMove(event: MouseEvent<HTMLAnchorElement>) {
    if (reducedMotion || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * 10);
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * 8);
  }

  return (
    <motion.a
      href={href}
      className={className}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.a>
  );
}
