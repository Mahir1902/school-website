"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { academicsNavItems } from "@/data/academics";

export default function AcademicsNav() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:block bg-white border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex items-center gap-6 overflow-x-auto py-4">
            {academicsNavItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-proximaNova font-semibold whitespace-nowrap",
                    "transition-colors duration-300 pb-1 border-b-2",
                    isActive
                      ? "text-primary border-primary"
                      : "text-foreground/70 border-transparent hover:text-primary hover:border-primary/30"
                  )}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Mobile Menu Button */}
        <div className="bg-white border-b border-border sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-lg font-orpheus text-primary">
              Academic Programs
            </h2>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white border-b border-border overflow-hidden"
            >
              <div className="px-6 pb-4 max-h-[70vh] overflow-y-auto">
                {academicsNavItems.map((item, index) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 py-3 px-4 rounded-lg",
                          "transition-colors duration-300",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-foreground/70 hover:bg-primary/5 hover:text-primary"
                        )}
                      >
                        {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
                        <div className="flex-1 min-w-0">
                          <div className="font-orpheus text-base">
                            {item.title}
                          </div>
                          {item.description && (
                            <div className="text-xs font-proximaNova text-foreground/60 truncate">
                              {item.description}
                            </div>
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
