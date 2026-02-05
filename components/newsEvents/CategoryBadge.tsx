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

  // Category-specific colors
  const getCategoryColor = (cat: string) => {
    const lowerCat = cat.toLowerCase();

    if (lowerCat.includes("announcement")) {
      return "bg-blue-500/90 text-white";
    }
    if (lowerCat.includes("achievement")) {
      return "bg-secondary/90 text-primary";
    }
    if (lowerCat.includes("latest") || lowerCat.includes("news")) {
      return "bg-primary/90 text-white";
    }
    if (lowerCat.includes("urgent")) {
      return "bg-red-500/90 text-white";
    }
    if (lowerCat.includes("event")) {
      return "bg-purple-500/90 text-white";
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
