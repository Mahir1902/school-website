"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath
}: PaginationProps) {
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const buildUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `${basePath}?${params.toString()}`;
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showMax = 5; // Maximum page numbers to show

    if (totalPages <= showMax) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show current page and neighbors
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav
      className="flex items-center justify-center gap-2 mt-12"
      aria-label="Pagination"
    >
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={buildUrl(currentPage - 1)}
          className="flex items-center gap-1 px-3 py-2 rounded-md bg-primary/10 text-primary hover:bg-primary hover:text-white font-proximaNova font-semibold text-sm transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </Link>
      ) : (
        <button
          disabled
          className="flex items-center gap-1 px-3 py-2 rounded-md bg-muted text-foreground/40 font-proximaNova font-semibold text-sm cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((pageNum, index) => {
          if (pageNum === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-foreground/40 font-proximaNova"
              >
                ...
              </span>
            );
          }

          const isActive = pageNum === currentPage;

          return (
            <Link
              key={pageNum}
              href={buildUrl(pageNum as number)}
              className={`min-w-[40px] px-3 py-2 rounded-md font-proximaNova font-semibold text-sm text-center transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
              }`}
            >
              {pageNum}
            </Link>
          );
        })}
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={buildUrl(currentPage + 1)}
          className="flex items-center gap-1 px-3 py-2 rounded-md bg-primary/10 text-primary hover:bg-primary hover:text-white font-proximaNova font-semibold text-sm transition-colors"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <button
          disabled
          className="flex items-center gap-1 px-3 py-2 rounded-md bg-muted text-foreground/40 font-proximaNova font-semibold text-sm cursor-not-allowed"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </nav>
  );
}
