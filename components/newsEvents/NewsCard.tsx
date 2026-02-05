import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Calendar, User, ArrowRight } from "lucide-react";
import CategoryBadge from "./CategoryBadge";

interface NewsCardProps {
  news: {
    _id: string;
    title: string;
    slug: { current: string };
    publishedDate: string;
    excerpt?: string;
    featuredImage?: any;
    category?: string;
    author?: string;
    featured?: boolean;
  };
  featured?: boolean;
}

export default function NewsCard({ news, featured = false }: NewsCardProps) {
  const formattedDate = new Date(news.publishedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <Link
      href={`/news-events/news/${news.slug.current}`}
      className={`group block bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      {/* Featured Image */}
      {news.featuredImage && (
        <div className={`relative overflow-hidden bg-muted ${featured ? "h-64 md:h-96" : "h-48"}`}>
          <Image
            src={urlFor(news.featuredImage).url()}
            alt={news.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes={featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
          />
          {news.category && (
            <div className="absolute top-4 left-4">
              <CategoryBadge category={news.category} />
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className={`p-6 ${featured ? "md:p-8" : ""}`}>
        {/* Meta Information */}
        <div className="flex items-center gap-4 text-sm text-foreground/60 mb-3">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span className="font-proximaNova">{formattedDate}</span>
          </div>
          {news.author && (
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              <span className="font-proximaNova">{news.author}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3
          className={`font-orpheus font-bold text-primary mb-3 group-hover:text-secondary transition-colors line-clamp-2 ${
            featured ? "text-2xl md:text-3xl" : "text-xl"
          }`}
        >
          {news.title}
        </h3>

        {/* Excerpt */}
        {news.excerpt && (
          <p
            className={`font-proximaNova text-foreground/70 mb-4 ${
              featured ? "text-base line-clamp-3" : "text-sm line-clamp-2"
            }`}
          >
            {news.excerpt}
          </p>
        )}

        {/* Read More Link */}
        <div className="flex items-center gap-2 text-primary font-proximaNova font-semibold text-sm group-hover:gap-3 transition-all">
          <span>Read More</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
