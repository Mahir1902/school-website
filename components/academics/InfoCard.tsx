import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  variant?: "default" | "primary" | "secondary";
  className?: string;
}

export default function InfoCard({
  icon: Icon,
  title,
  description,
  variant = "default",
  className,
}: InfoCardProps) {
  const variantClasses = {
    default: "bg-card border-border hover:border-primary/30",
    primary: "bg-primary/5 border-primary/20 hover:border-primary/50",
    secondary: "bg-secondary/5 border-secondary/20 hover:border-secondary/50",
  };

  const iconVariants = {
    default: "bg-primary/10 text-primary",
    primary: "bg-primary/20 text-primary",
    secondary: "bg-secondary/20 text-secondary",
  };

  return (
    <div
      className={cn(
        "border rounded-lg p-6 md:p-8",
        "hover:shadow-lg transition-all duration-300",
        "flex flex-col",
        variantClasses[variant],
        className
      )}
    >
      {/* Icon Container */}
      <div
        className={cn(
          "w-14 h-14 md:w-16 md:h-16 rounded-full",
          "flex items-center justify-center mb-4",
          iconVariants[variant]
        )}
      >
        <Icon className="w-7 h-7 md:w-8 md:h-8" />
      </div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-orpheus text-primary mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-foreground/70 font-proximaNova text-sm md:text-base leading-relaxed">
        {description}
      </p>
    </div>
  );
}
