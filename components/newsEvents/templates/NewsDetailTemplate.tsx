import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { formatNewsDate } from "@/lib/dateUtils";
import PortableTextContent from "@/components/newsEvents/PortableTextContent";
import NewsCard from "@/components/newsEvents/NewsCard";
import CategoryBadge from "@/components/newsEvents/CategoryBadge";
import { Calendar, User } from "lucide-react";
import type { News } from "@/types/newsEvents";

interface NewsDetailTemplateProps {
  article: News;
  relatedArticles: News[];
}

/**
 * News Detail Template
 * Reusable template for rendering news article detail pages
 */
export default function NewsDetailTemplate({ article, relatedArticles }: NewsDetailTemplateProps) {
  const publishedDate = formatNewsDate(article.publishedDate);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] lg:h-[500px] -mx-6 md:-mx-8 lg:-mx-10">
        {article.featuredImage ? (
          <>
            <Image
              src={urlFor(article.featuredImage).url()}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/40" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
        )}

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          {article.category && (
            <div className="mb-4">
              <CategoryBadge category={article.category} />
            </div>
          )}
          <h1 className="font-inglobal font-bold text-3xl md:text-5xl text-white mb-4 max-w-4xl">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-4 text-white/90">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span className="font-proximaNova">{publishedDate}</span>
            </div>
            {article.author && (
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="font-proximaNova">{article.author}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Content */}
        <div className="lg:col-span-2 space-y-6">
          {article.excerpt && (
            <p className="text-lg text-foreground/80 font-proximaNova leading-relaxed">
              {article.excerpt}
            </p>
          )}

          {article.content && article.content.length > 0 && (
            <PortableTextContent content={article.content} />
          )}

          {article.tags && article.tags.length > 0 && (
            <div className="pt-6 border-t border-border">
              <h3 className="font-inglobal font-bold text-lg text-foreground mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-muted text-foreground/70 text-sm rounded-full font-proximaNova"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:sticky lg:top-24 h-fit space-y-4">
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <h3 className="font-inglobal font-bold text-xl text-primary">Article Info</h3>

            <div className="space-y-3 font-proximaNova text-sm">
              <div>
                <div className="text-foreground/60 mb-1">Published</div>
                <div className="text-foreground">{publishedDate}</div>
              </div>

              {article.category && (
                <div>
                  <div className="text-foreground/60 mb-1">Category</div>
                  <CategoryBadge category={article.category} />
                </div>
              )}

              {article.author && (
                <div>
                  <div className="text-foreground/60 mb-1">Author</div>
                  <div className="text-foreground">{article.author}</div>
                </div>
              )}
            </div>
          </div>

          {/* Back to News Link */}
          <Link
            href="/news-events/news"
            className="block text-center px-4 py-2 border border-border rounded-md font-proximaNova text-sm hover:bg-muted transition-colors"
          >
            ← Back to News
          </Link>
        </div>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="pt-12 border-t border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-inglobal font-bold text-3xl text-primary">
              Related Articles
            </h2>
            <Link
              href="/news-events/news"
              className="font-proximaNova text-sm text-primary hover:text-secondary transition-colors"
            >
              View All News →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle: News) => (
              <NewsCard key={relatedArticle._id} news={relatedArticle} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
