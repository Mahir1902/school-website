"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { GalleryImage } from "@/types/newsEvents";

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
  const rootRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  // Fade in on open (the parent unmounts the lightbox on close).
  useGSAP(() => {
    gsap.from(rootRef.current, { opacity: 0, duration: 0.3 });
    gsap.from(infoRef.current, { opacity: 0, y: 20, duration: 0.3, delay: 0.2 });
  });

  // Each newly shown image scales in.
  useGSAP(() => {
    gsap.from(imageRef.current, { opacity: 0, scale: 0.9, duration: 0.3 });
  }, { dependencies: [currentImage.id] });

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
      <div
        ref={rootRef}
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
          <div
            key={currentImage.id}
            ref={imageRef}
            className="relative max-w-6xl max-h-[80vh] w-full h-full"
          >
            <Image
              src={currentImage.image}
              alt={currentImage.alt || currentImage.title}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Image Info */}
          <div
            ref={infoRef}
            className="mt-6 text-center max-w-2xl px-4"
          >
            <h3 className="font-inglobal font-bold text-xl md:text-2xl text-white mb-2">
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
          </div>
        </div>

        {/* Keyboard Hints */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-6 text-xs text-white/40 font-proximaNova">
          <span>← → Navigate</span>
          <span>ESC Close</span>
        </div>
      </div>
  );
}
