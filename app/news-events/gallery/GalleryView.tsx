"use client";

import { useState } from "react";
import GalleryGrid from "@/components/newsEvents/GalleryGrid";
import Lightbox from "@/components/newsEvents/Lightbox";
import FilterBar from "@/components/newsEvents/FilterBar";
import type { GalleryImage } from "@/types/newsEvents";
import { Images } from "lucide-react";

const CATEGORIES = [
  "All",
  "Programs",
  "Study Tour",
  "Sports",
  "Celebrations",
  "Classroom",
  "Facilities",
  "Others"
];

export default function GalleryView({ allImages }: { allImages: GalleryImage[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [category, setCategory] = useState("all");

  const slug = category.toLowerCase().replace(/\s+/g, "-");
  const images = slug === "all" ? allImages : allImages.filter((i) => i.category === slug);

  const handleNext = () => {
    if (lightboxIndex !== null && lightboxIndex < images.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (lightboxIndex !== null && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    }
  };

  return (
    <div className="space-y-8">
      {/* Filter Bar */}
      <FilterBar
        categories={CATEGORIES}
        activeCategory={category}
        onCategoryChange={setCategory}
      />

      {/* Image Count */}
      <div className="pb-4 border-b border-border">
        <p className="font-proximaNova text-foreground/70">
          {images.length} {images.length === 1 ? "image" : "images"}
        </p>
      </div>

      {/* Gallery Grid */}
      {images.length > 0 && (
        <GalleryGrid images={images} onImageClick={setLightboxIndex} />
      )}

      {/* Empty State */}
      {images.length === 0 && (
        <div className="text-center py-12 bg-card border border-border rounded-lg">
          <Images className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
          <h3 className="font-inglobal font-bold text-xl text-foreground/70 mb-2">
            No Images Found
          </h3>
          <p className="font-proximaNova text-foreground/60">
            No images in this category yet. Try selecting a different category.
          </p>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </div>
  );
}
