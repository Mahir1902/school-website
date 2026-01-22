"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/assets/sis-logo-removebg-preview.png";
import { Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { title: "Home", href: "#" },
  { title: "About Us", href: "#about" },
  { title: "Academic Programs", href: "#programs" },
  { title: "Campus Life", href: "#campus" },
  { title: "Admissions", href: "#admissions" },
  { title: "News & Events", href: "#news" },
  { title: "Contact", href: "#contact" },
];

export default function ScrollNavbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when scrolled past 100px and scrolling down or at any position past 100px
      if (currentScrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }} 
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
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
                {navLinks.map((link) => (
                  <a
                    key={link.title}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm lg:text-base font-proximaNova font-semibold text-primary hover:text-secondary transition-colors duration-300 cursor-pointer relative group"
                  >
                    {link.title}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
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
