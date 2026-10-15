"use client";

import Image from "next/image";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { GalleryImage } from "@/types/newsEvents";

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

export default function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-proximaNova text-foreground/60">
          No images found in this category.
        </p>
      </div>
    );
  }

  return (
    <div>
      <ResponsiveMasonry
        columnsCountBreakpoints={{
          350: 1,
          640: 2,
          900: 3,
          1200: 4
        }}
      >
        <Masonry gutter="1rem">
          {images.map((image, index) => (
            <GalleryItem
              key={image.id}
              index={index}
              onClick={() => onImageClick(index)}
            >
              {/* Image */}
              <div className="relative w-full">
                <Image
                  src={image.image}
                  alt={image.alt || image.title}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h4 className="font-inglobal font-bold text-white text-sm md:text-base mb-1 line-clamp-2">
                    {image.title}
                  </h4>

                  {image.caption && (
                    <p className="font-proximaNova text-white/90 text-xs line-clamp-2 mb-2">
                      {image.caption}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-xs text-white/80">
                    {image.photographer && (
                      <span className="font-proximaNova">
                        📷 {image.photographer}
                      </span>
                    )}
                    {image.dateTaken && (
                      <span className="font-proximaNova">
                        {new Date(image.dateTaken).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric"
                        })}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </GalleryItem>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}

// Each item fades up on its own mount: Masonry remounts items when it
// re-lays out columns (after hydration, on breakpoint changes).
function GalleryItem({
  index,
  onClick,
  children
}: {
  index: number;
  onClick: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(ref.current,
      { y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power1.out", delay: index * 0.05 });
  });

  return (
    <div
      ref={ref}
      className="opacity-0 group cursor-pointer relative overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300"
      onClick={onClick}
      data-testid="gallery-image"
    >
      {children}
    </div>
  );
}
