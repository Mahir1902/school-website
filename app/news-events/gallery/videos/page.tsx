import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { videoGalleryQuery } from "@/sanity/lib/queries";
import PageHero from "@/components/newsEvents/PageHero";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Play, Calendar, Video } from "lucide-react";
import CategoryBadge from "@/components/newsEvents/CategoryBadge";

export const metadata: Metadata = {
  title: "Video Gallery",
  description: "Watch highlights, virtual tours, and video content from Singapore International School"
};

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function VideoGalleryPage() {
  const videos = await client.fetch(videoGalleryQuery);

  return (
    <div className="space-y-8">
      {/* Page Hero */}
      <PageHero
        title="Video Gallery"
        subtitle="Watch highlights, tours, and memorable moments"
        height="medium"
      />

      {/* Video Count */}
      <div className="pb-4 border-b border-border">
        <p className="font-proximaNova text-foreground/70">
          {videos.length} {videos.length === 1 ? "video" : "videos"}
        </p>
      </div>

      {/* Videos Grid */}
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video: any) => {
            const uploadDate = new Date(video.uploadDate).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
                year: "numeric"
              }
            );

            return (
              <a
                key={video._id}
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Thumbnail */}
                <div className="relative h-48 bg-muted overflow-hidden">
                  {video.thumbnail ? (
                    <Image
                      src={urlFor(video.thumbnail).url()}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                      <Video className="w-16 h-16 text-primary/40" />
                    </div>
                  )}

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center transition-colors">
                      <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  {video.duration && (
                    <div className="absolute top-4 right-4 px-2 py-1 bg-black/80 text-white text-xs font-proximaNova font-semibold rounded">
                      {video.duration}
                    </div>
                  )}

                  {/* Category Badge */}
                  {video.category && (
                    <div className="absolute top-4 left-4">
                      <CategoryBadge category={video.category} size="sm" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-orpheus font-bold text-lg text-primary mb-2 group-hover:text-secondary transition-colors line-clamp-2">
                    {video.title}
                  </h3>

                  {video.description && (
                    <p className="font-proximaNova text-sm text-foreground/70 mb-3 line-clamp-2">
                      {video.description}
                    </p>
                  )}

                  {/* Meta Info */}
                  <div className="flex items-center gap-2 text-xs text-foreground/60">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="font-proximaNova">{uploadDate}</span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-card border border-border rounded-lg">
          <Video className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
          <h3 className="font-orpheus font-bold text-xl text-foreground/70 mb-2">
            No Videos Available
          </h3>
          <p className="font-proximaNova text-foreground/60">
            Check back soon for new video content
          </p>
        </div>
      )}
    </div>
  );
}
