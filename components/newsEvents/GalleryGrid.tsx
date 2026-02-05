"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { motion } from "framer-motion";

interface GalleryImage {
  _id: string;
  title: string;
  image: any;
  alt?: string;
  caption?: string;
  photographer?: string;
  dateTaken?: string;
  category?: string;
  aspectRatio?: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

export default function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
  // Animation variants for staggered appearance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const
      }
    }
  };

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
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
            <motion.div
              key={image._id}
              variants={itemVariants}
              className="group cursor-pointer relative overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-300"
              onClick={() => onImageClick(index)}
              data-testid="gallery-image"
            >
              {/* Image */}
              <div className="relative w-full">
                <Image
                  src={urlFor(image.image).url()}
                  alt={image.alt || image.title}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h4 className="font-orpheus font-bold text-white text-sm md:text-base mb-1 line-clamp-2">
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
            </motion.div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </motion.div>
  );
}
