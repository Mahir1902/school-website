"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { latestNewsQuery, newsByCategoryQuery } from "@/sanity/lib/queries";
import PageHero from "@/components/newsEvents/PageHero";
import NewsCard from "@/components/newsEvents/NewsCard";
import FilterBar from "@/components/newsEvents/FilterBar";
import Pagination from "@/components/newsEvents/Pagination";

const ITEMS_PER_PAGE = 12;
const CATEGORIES = ["All", "Latest", "Achievements"];

function NewsContent() {
  const searchParams = useSearchParams();
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const currentPage = Number(searchParams.get("page")) || 1;
  const category = searchParams.get("category") || "all";

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);

      const start = (currentPage - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;

      try {
        let fetchedNews;
        if (category === "all") {
          fetchedNews = await client.fetch(latestNewsQuery, { start, end });
        } else {
          fetchedNews = await client.fetch(newsByCategoryQuery, {
            category,
            start,
            end
          });
        }

        setNews(fetchedNews);

        // Calculate total pages (approximate - would need count query for exact)
        setTotalPages(Math.ceil(fetchedNews.length >= ITEMS_PER_PAGE ? currentPage + 1 : currentPage));
      } catch (error) {
        console.error("Error fetching news:", error);
        setNews([]);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [currentPage, category]);

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

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 font-proximaNova text-foreground/60">Loading news...</p>
        </div>
      )}

      {/* News Grid */}
      {!loading && news.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <NewsCard key={item._id} news={item} />
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
      {!loading && news.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg font-proximaNova text-foreground/60">
            No news articles found in this category.
          </p>
        </div>
      )}
    </div>
  );
}

export default function NewsHub() {
  return (
    <div className="space-y-8">
      {/* Page Hero */}
      <PageHero
        title="Latest News"
        subtitle="Stay informed with updates and stories from our school community"
        height="medium"
      />

      <Suspense
        fallback={
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 font-proximaNova text-foreground/60">Loading...</p>
          </div>
        }
      >
        <NewsContent />
      </Suspense>
    </div>
  );
}
