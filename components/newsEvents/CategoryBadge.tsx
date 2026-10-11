import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function CategoryBadge({
  category,
  size = "md",
  className
}: CategoryBadgeProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2"
  };

  // Category-specific colors using design system tokens
  const getCategoryColor = (cat: string) => {
    const lowerCat = cat.toLowerCase();

    // News categories
    if (lowerCat.includes("announcement")) {
      return "bg-accent text-accent-foreground";
    }
    if (lowerCat.includes("achievement")) {
      return "bg-secondary text-secondary-foreground";
    }
    if (lowerCat.includes("latest") || lowerCat.includes("news")) {
      return "bg-primary text-primary-foreground";
    }

    // Notice priorities
    if (lowerCat.includes("urgent")) {
      return "bg-destructive text-destructive-foreground";
    }

    // Event types
    if (lowerCat.includes("academic")) {
      return "bg-chart-3 text-primary-foreground";
    }
    if (lowerCat.includes("sports")) {
      return "bg-primary text-primary-foreground";
    }
    if (lowerCat.includes("cultural")) {
      return "bg-secondary text-secondary-foreground";
    }
    if (lowerCat.includes("community")) {
      return "bg-chart-2 text-foreground";
    }

    // Event status
    if (lowerCat.includes("upcoming")) {
      return "bg-background/95 text-primary ring-1 ring-inset ring-primary/30";
    }
    if (lowerCat.includes("ongoing")) {
      return "bg-secondary text-secondary-foreground";
    }
    if (lowerCat.includes("past")) {
      return "bg-muted/90 text-muted-foreground";
    }

    // Generic event fallback
    if (lowerCat.includes("event")) {
      return "bg-accent text-accent-foreground";
    }

    // Default
    return "bg-foreground/80 text-background";
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-proximaNova font-semibold capitalize rounded-full",
        sizeClasses[size],
        getCategoryColor(category),
        className
      )}
    >
      {category}
    </span>
  );
}
