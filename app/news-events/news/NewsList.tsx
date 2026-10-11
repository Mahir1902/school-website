"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import NewsCard from "@/components/newsEvents/NewsCard";
import FilterBar from "@/components/newsEvents/FilterBar";
import Pagination from "@/components/newsEvents/Pagination";
import type { News } from "@/types/newsEvents";

const ITEMS_PER_PAGE = 12;
const CATEGORIES = ["All", "Latest", "Achievements"];

function NewsContent({ allNews }: { allNews: News[] }) {
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const category = searchParams.get("category") || "all";

  const filtered = category === "all" ? allNews : allNews.filter((n) => n.category === category);
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const news = filtered.slice(start, start + ITEMS_PER_PAGE);

  const handleCategoryChange = (newCategory: string) => {
    // Update URL with new category
    const url = new URL(window.location.href);
    url.searchParams.set("category", newCategory);
    url.searchParams.set("page", "1"); // Reset to page 1
    window.history.pushState({}, "", url);

    // Trigger re-render
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <div className="space-y-8">
      {/* Filter Bar */}
      <FilterBar
        categories={CATEGORIES}
        activeCategory={category}
        onCategoryChange={handleCategoryChange}
      />

      {/* News Grid */}
      {news.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/news-events/news"
          />
        </>
      )}

      {/* Empty State */}
      {news.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg font-proximaNova text-foreground/60">
            No news articles found in this category.
          </p>
        </div>
      )}
    </div>
  );
}

export default function NewsList({ allNews }: { allNews: News[] }) {
  return (
    <Suspense
      fallback={
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 font-proximaNova text-foreground/60">Loading...</p>
        </div>
      }
    >
      <NewsContent allNews={allNews} />
    </Suspense>
  );
}
