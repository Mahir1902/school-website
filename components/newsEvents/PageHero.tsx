import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  height?: "small" | "medium" | "large";
  className?: string;
}

export default function PageHero({
  title,
  subtitle,
  height = "medium",
  className
}: PageHeroProps) {
  const heightClasses = {
    small: "h-32 md:h-40",
    medium: "h-48 md:h-56",
    large: "h-64 md:h-72"
  };

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center text-center bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-b border-border",
        heightClasses[height],
        className
      )}
    >
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-orpheus font-bold text-primary mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base md:text-lg font-proximaNova text-foreground/70 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      {/* Decorative accent */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-secondary rounded-t-full" />
    </div>
  );
}
