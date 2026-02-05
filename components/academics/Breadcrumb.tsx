"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Breadcrumb() {
  const pathname = usePathname();

  // Generate breadcrumb items from pathname
  const generateBreadcrumbs = () => {
    const paths = pathname.split("/").filter((path) => path);
    const breadcrumbs = [{ name: "Home", href: "/" }];

    let currentPath = "";
    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      // Convert path to readable format (e.g., "pre-school" => "Pre-School")
      const name = path
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      breadcrumbs.push({
        name,
        href: currentPath,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-primary/5 border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-4">
        <ol className="flex items-center flex-wrap gap-2 text-sm font-proximaNova">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const isFirst = index === 0;

          return (
            <li key={breadcrumb.href} className="flex items-center gap-2">
              {!isFirst && (
                <ChevronRight className="w-4 h-4 text-foreground/40" />
              )}

              {isLast ? (
                <span className="text-primary font-semibold flex items-center gap-1.5">
                  {isFirst && <Home className="w-4 h-4" />}
                  {breadcrumb.name}
                </span>
              ) : (
                <Link
                  href={breadcrumb.href}
                  className={cn(
                    "text-foreground/60 hover:text-primary",
                    "transition-colors duration-200",
                    "flex items-center gap-1.5"
                  )}
                >
                  {isFirst && <Home className="w-4 h-4" />}
                  {breadcrumb.name}
                </Link>
              )}
            </li>
          );
        })}
        </ol>
      </div>
    </nav>
  );
}
