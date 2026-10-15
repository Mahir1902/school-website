"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

type Testimonial = { name: string; role: string; quote: string; initials: string };

// A deck of cards: the front card slides off to the left and moves to the back.
export default function TestimonialsClient({ items }: { items: Testimonial[] }) {
  const [order, setOrder] = useState(items.map((_, i) => i));
  const [leaving, setLeaving] = useState(false);

  const next = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(() => {
      setOrder((o) => [...o.slice(1), o[0]]);
      setLeaving(false);
    }, 450);
  };
  const prev = () => !leaving && setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);

  if (items.length === 0) return null;

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="relative grid" aria-live="polite">
        {order.map((idx, depth) => {
          const t = items[idx];
          const front = depth === 0;
          return (
            <figure
              key={idx}
              aria-hidden={!front}
              className={`h-stack-card col-start-1 row-start-1 rounded-2xl border border-border bg-card p-8 shadow-lg md:p-10 ${front && leaving ? "h-stack-out" : ""}`}
              style={{
                transform: `translateY(${depth * 14}px) scale(${1 - depth * 0.04}) rotate(${depth === 0 ? 0 : depth % 2 ? 2 : -2}deg)`,
                zIndex: items.length - depth,
                opacity: depth > 2 ? 0 : 1,
              }}
            >
              <Quote className="h-8 w-8 text-secondary" aria-hidden="true" />
              <blockquote className="mt-4 font-proximaNova text-lg leading-relaxed text-foreground/85 md:text-xl">“{t.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary font-poppins text-sm font-semibold text-primary-foreground">{t.initials}</span>
                <span className="min-w-0">
                  <span className="block font-poppins font-semibold text-foreground">{t.name}</span>
                  <span className="block font-proximaNova text-sm text-foreground/70">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>
      <div className="mt-12 flex items-center justify-center gap-4">
        <button type="button" onClick={prev} aria-label="Previous testimonial" className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button type="button" onClick={next} aria-label="Next testimonial" className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
