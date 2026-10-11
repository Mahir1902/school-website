import { getGalleryImages } from "@/lib/content";
import PageHero from "@/components/newsEvents/PageHero";
import GalleryView from "./GalleryView";

export default function PhotoGalleryPage() {
  return (
    <div className="space-y-8">
      {/* Page Hero */}
      <PageHero
        title="Photo Gallery"
        subtitle="Explore moments and memories from school life"
        height="medium"
      />

      <GalleryView allImages={getGalleryImages()} />
    </div>
  );
}
