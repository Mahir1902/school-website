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
      return "bg-accent/90 text-accent-foreground";
    }
    if (lowerCat.includes("achievement")) {
      return "bg-secondary/90 text-primary";
    }
    if (lowerCat.includes("latest") || lowerCat.includes("news")) {
      return "bg-primary/90 text-primary-foreground";
    }

    // Notice priorities
    if (lowerCat.includes("urgent")) {
      return "bg-destructive/90 text-destructive-foreground";
    }

    // Event types
    if (lowerCat.includes("academic")) {
      return "bg-blue-600/90 text-white dark:bg-blue-500/90";
    }
    if (lowerCat.includes("sports")) {
      return "bg-green-600/90 text-white dark:bg-green-500/90";
    }
    if (lowerCat.includes("cultural")) {
      return "bg-purple-600/90 text-white dark:bg-purple-500/90";
    }
    if (lowerCat.includes("community")) {
      return "bg-orange-500/90 text-white dark:bg-orange-400/90";
    }

    // Event status
    if (lowerCat.includes("upcoming")) {
      return "bg-emerald-500/90 text-white";
    }
    if (lowerCat.includes("ongoing")) {
      return "bg-amber-500/90 text-white";
    }
    if (lowerCat.includes("past")) {
      return "bg-muted/90 text-muted-foreground";
    }

    // Generic event fallback
    if (lowerCat.includes("event")) {
      return "bg-accent/90 text-accent-foreground";
    }

    // Default
    return "bg-foreground/80 text-background";
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-proximaNova font-semibold rounded-full backdrop-blur-sm",
        sizeClasses[size],
        getCategoryColor(category),
        className
      )}
    >
      {category}
    </span>
  );
}
