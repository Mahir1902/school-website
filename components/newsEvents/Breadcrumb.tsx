"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  title: string;
  href: string;
  isLast?: boolean;
}

export default function Breadcrumb() {
  const pathname = usePathname();

  // Generate breadcrumb items from pathname
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { title: "Home", href: "/" }
    ];

    let currentPath = "";
    paths.forEach((path, index) => {
      currentPath += `/${path}`;

      // Format the title (replace hyphens with spaces and capitalize)
      const title = path
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      breadcrumbs.push({
        title,
        href: currentPath,
        isLast: index === paths.length - 1
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
        <ol className="flex items-center gap-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.href} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-foreground/40" />
              )}

              {crumb.isLast ? (
                <span className="flex items-center gap-1.5 font-proximaNova font-semibold text-primary">
                  {index === 0 && <Home className="w-4 h-4" />}
                  {crumb.title}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="flex items-center gap-1.5 font-proximaNova text-foreground/60 hover:text-primary transition-colors"
                >
                  {index === 0 && <Home className="w-4 h-4" />}
                  {crumb.title}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
