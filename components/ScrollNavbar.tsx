"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/sis-logo-removebg-preview.png";
import { Menu, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { academicsDropdownSections } from "@/data/academics";
import { newsEventsDropdownSections } from "@/data/newsEvents/navigation";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "#about" },
  { title: "Academics", href: "/academics", hasDropdown: true },
  { title: "Campus Life", href: "#campus" },
  { title: "Admissions", href: "#admissions" },
  { title: "News & Events", href: "/news-events", hasDropdown: true },
  { title: "Contact", href: "#contact" },
];

export default function ScrollNavbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [isVisible, setIsVisible] = useState(!isHomePage); // Always visible on non-home pages
  const [lastScrollY, setLastScrollY] = useState(0);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    // On non-home pages, always show navbar
    if (!isHomePage) {
      setIsVisible(true);
      return;
    }

    // On home page, show navbar only after scrolling
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when scrolled past 100px
      if (currentScrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isHomePage]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={isHomePage ? { y: -100, opacity: 0 } : false}
          animate={{ y: 0, opacity: 1 }}
          exit={isHomePage ? { y: -100, opacity: 0 } : undefined}
          transition={isHomePage ? { duration: 0.3, ease: "easeInOut" } : { duration: 0 }}
          className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md shadow-[0_4px_6px_-1px_rgb(156,163,175,0.5)] "
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 lg:py-2">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Logo */}
              <a
                href="#"
                onClick={(e) => handleNavClick(e, "#")}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <Image
                  src={logo}
                  alt="Singapore International School"
                  width={100}
                  height={100}
                  className="w-10 h-10 md:w-24 md:h-24 transition-transform duration-300 group-hover:scale-105"
                />
                {/* <div className="hidden lg:flex flex-col">
                  <span className="text-primary font-poppins font-semibold text-lg leading-tight">
                    SINGAPORE
                  </span>
                  <span className="text-primary font-poppins text-xs leading-tight">
                    International School
                  </span>
                </div> */}
              </a>

              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center gap-6 lg:gap-8">
                {navLinks.map((link) => {
                  // Get the appropriate dropdown data based on the link
                  const dropdownSections = link.title === "Academics"
                    ? academicsDropdownSections
                    : link.title === "News & Events"
                    ? newsEventsDropdownSections
                    : [];

                  return (
                    <div
                      key={link.title}
                      className="relative"
                      onMouseEnter={() => link.hasDropdown && setOpenDropdown(link.title)}
                      onMouseLeave={() => link.hasDropdown && setOpenDropdown(null)}
                    >
                      {link.hasDropdown ? (
                        <>
                          <Link
                            href={link.href}
                            className="text-sm lg:text-base font-proximaNova font-semibold text-primary hover:text-secondary transition-colors duration-300 cursor-pointer relative group flex items-center gap-1"
                          >
                            {link.title}
                            <ChevronDown className="w-4 h-4" />
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
                          </Link>

                          {/* Dropdown Menu */}
                          <AnimatePresence>
                            {openDropdown === link.title && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.2 }}
                                className={`absolute top-full mt-2 bg-white rounded-lg shadow-lg border border-border p-6 w-[600px] z-50 ${
                                  link.title === "News & Events" ? "right-0" : "left-0"
                                }`}
                              >
                                <div className="grid grid-cols-3 gap-6">
                                  {dropdownSections.map((section) => (
                                    <div key={section.title}>
                                      <h3 className="text-xs font-poppins font-semibold text-primary uppercase mb-3">
                                        {section.title}
                                      </h3>
                                      <ul className="space-y-2">
                                        {section.items.map((item) => (
                                          <li key={item.href}>
                                            <Link
                                              href={item.href}
                                              className="block text-sm font-proximaNova text-foreground/70 hover:text-primary transition-colors"
                                            >
                                              <div className="font-semibold">{item.title}</div>
                                              <div className="text-xs text-foreground/50">
                                                {item.description}
                                              </div>
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
                        </>
                      ) : (
                        <a
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                          className="text-sm lg:text-base font-proximaNova font-semibold text-primary hover:text-secondary transition-colors duration-300 cursor-pointer relative group"
                        >
                          {link.title}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Mobile Menu Icon (placeholder - connects to existing Hero menu) */}
              <div className="md:hidden">
                <Menu className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
