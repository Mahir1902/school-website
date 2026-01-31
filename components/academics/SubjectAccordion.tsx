"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  // Animation variants
  const containerVariants = {
    hidden: {
      height: 0,
      opacity: 0,
      transition: {
        height: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3, delay: 0.1 }
      }
    }
  };

  const chevronVariants = {
    collapsed: {
      rotate: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 25 }
    },
    expanded: {
      rotate: 180,
      transition: { type: "spring" as const, stiffness: 300, damping: 25 }
    }
  };

  const subjectItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.03, // 30ms stagger
        duration: 0.25,
        ease: "easeOut" as const
      }
    })
  };

  const checkIconVariants = {
    hidden: { scale: 0.8, rotate: -10 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 20
      }
    }
  };

  return (
    <div className="space-y-2">
      {categories.map((category, index) => {
        const isOpen = activeIndex === index;

        return (
          <div
            key={index}
            className="border border-border rounded-lg overflow-hidden"
          >
            {/* Header Button */}
            <motion.button
              onClick={() => setActiveIndex(isOpen ? null : index)}
              className={`w-full flex items-center justify-between p-6 transition-all duration-200 ${
                isOpen
                  ? "bg-primary/5"
                  : "bg-card hover:shadow-md"
              }`}
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.995 }}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${index}`}
              id={`accordion-header-${index}`}
            >
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-orpheus text-primary">
                  {category.category}
                </h3>
                <motion.span
                  className="text-sm text-foreground/60"
                  whileHover={{ scale: 1.05 }}
                >
                  {category.subjects.length} subjects
                </motion.span>
              </div>
              <motion.div
                variants={chevronVariants}
                animate={isOpen ? "expanded" : "collapsed"}
              >
                <ChevronDown className="w-5 h-5 text-primary" />
              </motion.div>
            </motion.button>

            {/* Expandable Content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-content-${index}`}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  style={{ overflow: "hidden" }}
                  aria-labelledby={`accordion-header-${index}`}
                >
                  <div className="p-6 md:p-8 bg-card border-t border-border">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.subjects.map((subject, idx) => (
                        <motion.div
                          key={idx}
                          custom={idx}
                          variants={subjectItemVariants}
                          initial="hidden"
                          animate="visible"
                          className="flex items-start gap-2 group hover:translate-x-1 transition-transform duration-150"
                        >
                          <motion.div
                            variants={checkIconVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-1 group-hover:text-secondary transition-colors" />
                          </motion.div>
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
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
