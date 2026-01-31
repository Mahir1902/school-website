"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface SubjectCategoryData {
  category: string;
  subjects: {
    name: string;
    description?: string;
  }[];
}

interface SubjectGridProps {
  categories: SubjectCategoryData[];
  columns?: 2 | 3;
  className?: string;
}

export default function SubjectGrid({
  categories,
  columns = 3,
  className
}: SubjectGridProps) {
  const [isVisible, setIsVisible] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => {
      if (gridRef.current) {
        observer.unobserve(gridRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={gridRef}
      className={cn(
        "grid gap-6",
        columns === 2
          ? "grid-cols-1 md:grid-cols-2"
          : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {categories.map((categoryData, categoryIndex) => (
        <div
          key={categoryIndex}
          className={cn(
            "rounded-lg overflow-hidden border border-border shadow-sm transition-all duration-700",
            "hover:shadow-lg",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
          style={{ transitionDelay: `${categoryIndex * 100}ms` }}
        >
          {/* Category Header */}
          <div className="bg-primary text-white p-4">
            <h3 className="font-orpheus text-lg font-semibold">
              {categoryData.category}
            </h3>
          </div>

          {/* Subjects List */}
          <div className="bg-card p-4">
            <ul className="space-y-3">
              {categoryData.subjects.map((subject, subjectIndex) => (
                <li
                  key={subjectIndex}
                  className="transition-colors duration-200 hover:bg-muted/50 p-2 rounded"
                >
                  <div className="font-proximaNova font-semibold text-foreground text-sm">
                    {subject.name}
                  </div>
                  {subject.description && (
                    <div className="font-proximaNova text-xs text-foreground/60 mt-1">
                      {subject.description}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
