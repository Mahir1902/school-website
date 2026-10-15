"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ChevronDown, CheckCircle } from "lucide-react";
import { SubjectCategoryData } from "@/components/academics/SubjectGrid";

interface SubjectAccordionProps {
  categories: SubjectCategoryData[];
  defaultOpenIndex?: number;
}

export default function SubjectAccordion({
  categories,
  defaultOpenIndex = 0
}: SubjectAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(defaultOpenIndex);
  const rootRef = useRef<HTMLDivElement>(null);
  const firstRun = useRef(true);

  // Panels stay mounted (closed ones start hidden via classes); on open the
  // subjects stagger in and their check icons pop (not on first load).
  useGSAP(() => {
    const skipItems = firstRun.current;
    firstRun.current = false;
    gsap.utils.toArray<HTMLElement>("[data-panel]").forEach((el) => {
      const open = Number(el.dataset.panel) === activeIndex;
      // GSAP tweens to the measured px height; restore "auto" so it reflows.
      gsap.to(el, {
        height: open ? "auto" : 0,
        duration: 0.35,
        ease: "power3.out",
        onComplete: open ? () => gsap.set(el, { height: "auto" }) : undefined,
      });
      gsap.to(el, { autoAlpha: open ? 1 : 0, duration: open ? 0.3 : 0.2, delay: open ? 0.1 : 0 });
      if (!open || skipItems) return;
      gsap.fromTo(el.querySelectorAll("[data-subject]"),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.25, ease: "power1.out", stagger: 0.03 });
      gsap.fromTo(el.querySelectorAll("[data-check]"),
        { scale: 0.8, rotation: -10 },
        { scale: 1, rotation: 0, duration: 0.3, ease: "back.out(2)" });
    });
  }, { dependencies: [activeIndex], scope: rootRef });

  return (
    <div ref={rootRef} className="space-y-2">
      {categories.map((category, index) => {
        const isOpen = activeIndex === index;

        return (
          <div
            key={index}
            className="border border-border rounded-lg overflow-hidden"
          >
            {/* Header Button */}
            <button
              onClick={() => setActiveIndex(isOpen ? null : index)}
              className={`w-full flex items-center justify-between p-6 transition-all duration-200 hover:scale-[1.005] active:scale-[0.995] ${
                isOpen
                  ? "bg-primary/5"
                  : "bg-card hover:shadow-md"
              }`}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${index}`}
              id={`accordion-header-${index}`}
            >
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-inglobal text-primary">
                  {category.category}
                </h3>
                <span className="text-sm text-foreground/60">
                  {category.subjects.length} subjects
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-primary transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Expandable Content */}
                <div
                  id={`accordion-content-${index}`}
                  data-panel={index}
                  className={`overflow-hidden ${
                    index === defaultOpenIndex ? "" : "invisible opacity-0 h-0"
                  }`}
                  aria-labelledby={`accordion-header-${index}`}
                >
                  <div className="p-6 md:p-8 bg-card border-t border-border">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.subjects.map((subject, idx) => (
                        <div
                          key={idx}
                          data-subject
                          className="flex items-start gap-2 group hover:translate-x-1 transition-[translate] duration-150"
                        >
                          <div data-check>
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-1 group-hover:text-secondary transition-colors" />
                          </div>
                          <div>
                            <p className="font-proximaNova font-semibold text-foreground">
                              {subject.name}
                            </p>
                            {subject.description && (
                              <p className="text-sm text-foreground/70">
                                {subject.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
          </div>
        );
      })}
    </div>
  );
}
