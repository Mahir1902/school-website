"use client";

import { useEffect } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryImage {
  _id: string;
  title: string;
  image: any;
  alt?: string;
  caption?: string;
  photographer?: string;
  dateTaken?: string;
}

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrevious
}: LightboxProps) {
  const currentImage = images[currentIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        onNext();
      } else if (e.key === "ArrowLeft") {
        onPrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrevious]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
        onClick={onClose}
        data-testid="lightbox"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Previous Button */}
        {currentIndex > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {currentIndex < images.length - 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Image Container */}
        <div
          className="flex flex-col items-center justify-center h-full p-4 md:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Main Image */}
          <motion.div
            key={currentImage._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-6xl max-h-[80vh] w-full h-full"
          >
            <Image
              src={urlFor(currentImage.image).url()}
              alt={currentImage.alt || currentImage.title}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </motion.div>

          {/* Image Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-center max-w-2xl px-4"
          >
            <h3 className="font-orpheus font-bold text-xl md:text-2xl text-white mb-2">
              {currentImage.title}
            </h3>

            {currentImage.caption && (
              <p className="font-proximaNova text-sm md:text-base text-white/80 mb-3">
                {currentImage.caption}
              </p>
            )}

            <div className="flex items-center justify-center gap-6 text-xs md:text-sm text-white/60">
              {currentImage.photographer && (
                <span className="font-proximaNova">
                  📷 {currentImage.photographer}
                </span>
              )}
              {currentImage.dateTaken && (
                <span className="font-proximaNova">
                  {new Date(currentImage.dateTaken).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                  })}
                </span>
              )}
              <span className="font-proximaNova">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Keyboard Hints */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-6 text-xs text-white/40 font-proximaNova">
          <span>← → Navigate</span>
          <span>ESC Close</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
