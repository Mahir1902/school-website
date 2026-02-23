"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import {
  allGalleryImagesQuery,
  galleryImagesByCategoryQuery
} from "@/sanity/lib/queries";
import PageHero from "@/components/newsEvents/PageHero";
import GalleryGrid from "@/components/newsEvents/GalleryGrid";
import Lightbox from "@/components/newsEvents/Lightbox";
import FilterBar from "@/components/newsEvents/FilterBar";
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

export default function PhotoGalleryPage() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    async function fetchImages() {
      setLoading(true);

      try {
        let fetchedImages;
        if (category === "all") {
          fetchedImages = await client.fetch(allGalleryImagesQuery);
        } else {
          fetchedImages = await client.fetch(galleryImagesByCategoryQuery, {
            category: category.toLowerCase().replace(/\s+/g, "-")
          });
        }

        setImages(fetchedImages);
      } catch (error) {
        console.error("Error fetching gallery images:", error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [category]);

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
      {/* Page Hero */}
      <PageHero
        title="Photo Gallery"
        subtitle="Explore moments and memories from school life"
        height="medium"
      />

      {/* Filter Bar */}
      <FilterBar
        categories={CATEGORIES}
        activeCategory={category}
        onCategoryChange={setCategory}
      />

      {/* Image Count */}
      <div className="pb-4 border-b border-border">
        <p className="font-proximaNova text-foreground/70">
          {loading ? "Loading..." : `${images.length} ${images.length === 1 ? "image" : "images"}`}
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 font-proximaNova text-foreground/60">
            Loading images...
          </p>
        </div>
      )}

      {/* Gallery Grid */}
      {!loading && images.length > 0 && (
        <GalleryGrid images={images} onImageClick={setLightboxIndex} />
      )}

      {/* Empty State */}
      {!loading && images.length === 0 && (
        <div className="text-center py-12 bg-card border border-border rounded-lg">
          <Images className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
          <h3 className="font-orpheus font-bold text-xl text-foreground/70 mb-2">
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
