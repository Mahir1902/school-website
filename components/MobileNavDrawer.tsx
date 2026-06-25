"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import logo from "@/assets/sis-logo-removebg-preview.png";
import { navItems } from "@/data/navigation";

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

// Shared mobile navigation drawer (accordion). Opened by both the Hero "Menu"
// button and the ScrollNavbar hamburger. Mirrors the desktop nav exactly so the
// two surfaces can never drift apart. See docs/adr/0002.
export default function MobileNavDrawer({ isOpen, onClose }: MobileNavDrawerProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 z-[60]"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-[70] shadow-2xl overflow-y-auto"
          >
            <div className="p-8">
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-primary hover:text-secondary transition-colors duration-300"
                aria-label="Close menu"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Logo */}
              <div className="mb-10 mt-4">
                <Image src={logo} alt="SIS Logo" width={80} height={80} className="w-16 h-16" />
              </div>

              {/* Links */}
              <nav>
                <ul className="space-y-1">
                  {navItems.map((item) => {
                    const hasSections = !!item.sections?.length;
                    const isExpanded = expanded === item.title;

                    return (
                      <li key={item.title} className="border-b border-border/60">
                        <div className="flex items-center justify-between">
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className="flex-1 block text-xl font-inglobal text-primary hover:text-secondary transition-colors duration-300 py-3"
                          >
                            {item.title}
                          </Link>
                          {hasSections && (
                            <button
                              onClick={() =>
                                setExpanded(isExpanded ? null : item.title)
                              }
                              className="p-3 text-primary hover:text-secondary transition-colors"
                              aria-label={`${isExpanded ? "Collapse" : "Expand"} ${item.title}`}
                              aria-expanded={isExpanded}
                            >
                              <ChevronDown
                                className={`w-5 h-5 transition-transform duration-300 ${
                                  isExpanded ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                          )}
                        </div>

                        {/* Accordion content */}
                        <AnimatePresence initial={false}>
                          {hasSections && isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <div className="pb-4 pl-3 space-y-4">
                                {item.sections!.map((section) => (
                                  <div key={section.title}>
                                    <h4 className="text-xs font-inglobal font-semibold text-primary/70 uppercase tracking-wide mb-2">
                                      {section.title}
                                    </h4>
                                    <ul className="space-y-1">
                                      {section.items.map((sub) => (
                                        <li key={sub.href}>
                                          <Link
                                            href={sub.href}
                                            onClick={onClose}
                                            className="block text-base font-proximaNova text-foreground/70 hover:text-primary transition-colors py-1"
                                          >
                                            {sub.title}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Contact info */}
              <div className="mt-10 pt-8 border-t border-border">
                <p className="text-sm font-proximaNova text-foreground/60 mb-2">Contact Us</p>
                <p className="text-sm font-proximaNova text-foreground mb-1">+65 1234 5678</p>
                <p className="text-sm font-proximaNova text-foreground">info@sis.edu</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
