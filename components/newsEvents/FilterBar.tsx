"use client";

interface FilterBarProps {
  categories: string[];
  activeCategory?: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}

export default function FilterBar({
  categories,
  activeCategory = "all",
  onCategoryChange,
  className = ""
}: FilterBarProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => {
          const isActive = activeCategory.toLowerCase() === category.toLowerCase();
          const categoryKey = category.toLowerCase().replace(/\s+/g, "-");

          return (
            <button
              key={categoryKey}
              onClick={() => onCategoryChange(category.toLowerCase())}
              className={`relative px-4 py-2 rounded-full font-proximaNova font-semibold text-sm whitespace-nowrap transition-all duration-200 hover:scale-105 active:scale-95 ${
                isActive
                  ? "bg-primary text-white"
                  : "text-foreground/70 hover:text-primary"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
