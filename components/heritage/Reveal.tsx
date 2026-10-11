"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

// Visible on the server and without JS; only elements still below the fold on mount are hidden, then revealed.
export default function Reveal({
  as: Tag = "div",
  className = "",
  from,
  delay = 0,
  draw = false,
  children,
  style,
}: {
  as?: ElementType;
  className?: string;
  from?: "left" | "right";
  delay?: number;
  draw?: boolean;
  children?: ReactNode;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"idle" | "pending" | "in">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    setState("pending");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("in");
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cls = [
    className,
    draw ? "h-draw" : "h-reveal",
    from === "left" && "h-from-left",
    from === "right" && "h-from-right",
    state === "pending" && "h-pending",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag ref={ref} className={cls} style={{ ...style, "--h-delay": `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}
