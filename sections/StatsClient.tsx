"use client";

import { useEffect, useRef, useState } from "react";

type Stat = { value: number; suffix: string; label: string };

// Counts up when scrolled into view; server/no-JS render shows the final figures.
export default function StatsClient({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDListElement>(null);
  const [progress, setProgress] = useState(1);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top <= window.innerHeight) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setArmed(false);
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min((now - start) / 1800, 1);
          setProgress(1 - Math.pow(1 - t, 4));
          if (t < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    setProgress(0);
    setArmed(true);
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <dl ref={ref} className={`h-reveal grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 ${armed ? "h-pending" : ""}`}>
      {stats.map((s) => (
        <div key={s.label} className="flex min-w-0 flex-col text-center">
          <dt className="order-2 mt-3 font-proximaNova text-base font-semibold text-foreground/75 md:text-lg">{s.label}</dt>
          <dd className="order-1 font-inglobal text-5xl font-bold text-primary tabular-nums md:text-6xl">
            {Math.round(s.value * progress)}
            {s.suffix}
          </dd>
          <span aria-hidden="true" className="h-grow order-3 mx-auto mt-3 block h-1 w-16 rounded-full bg-secondary" />
        </div>
      ))}
    </dl>
  );
}
