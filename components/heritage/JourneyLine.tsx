"use client";

import { useEffect, useRef, useState } from "react";

// One continuous line through every [data-node] centre in the parent, measured with ResizeObserver
// and drawn on scroll. Gentle S-curves between nodes on wide screens, straight on narrow ones.
export default function JourneyLine() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [d, setD] = useState("");
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [drawn, setDrawn] = useState(true);

  useEffect(() => {
    const svg = svgRef.current;
    const host = svg?.parentElement;
    if (!svg || !host) return;

    const measure = () => {
      const box = host.getBoundingClientRect();
      const pts = [...host.querySelectorAll<HTMLElement>("[data-node]")].map((n) => {
        const r = n.getBoundingClientRect();
        return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 };
      });
      if (pts.length < 2) return;
      const sway = window.innerWidth >= 768 ? 34 : 0;
      let path = `M${pts[0].x} ${pts[0].y}`;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1];
        const b = pts[i];
        const dir = i % 2 ? 1 : -1;
        const dy = (b.y - a.y) / 2;
        path += ` C${a.x + sway * dir} ${a.y + dy} ${b.x + sway * dir} ${b.y - dy} ${b.x} ${b.y}`;
      }
      setSize({ w: box.width, h: box.height });
      setD(path);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(host);

    let io: IntersectionObserver | undefined;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && host.getBoundingClientRect().top > window.innerHeight * 0.8) {
      setDrawn(false);
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setDrawn(true);
            io?.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      io.observe(host);
    }
    return () => {
      ro.disconnect();
      io?.disconnect();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible text-secondary"
      viewBox={`0 0 ${size.w || 1} ${size.h || 1}`}
      fill="none"
    >
      {d && (
        <path
          d={d}
          pathLength={1}
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="1"
          style={{ strokeDashoffset: drawn ? 0 : 1, transition: "stroke-dashoffset 2.4s cubic-bezier(0.65, 0, 0.35, 1)" }}
        />
      )}
    </svg>
  );
}
