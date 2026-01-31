import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: React.ReactNode;
  level?: "h1" | "h2" | "h3";
  align?: "left" | "center" | "right";
  showUnderline?: boolean;
  className?: string;
}

export default function SectionHeading({
  children,
  level = "h2",
  align = "center",
  showUnderline = true,
  className,
}: SectionHeadingProps) {
  const Tag = level;

  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  const sizeClasses = {
    h1: "text-3xl md:text-4xl lg:text-5xl",
    h2: "text-2xl md:text-3xl lg:text-4xl",
    h3: "text-xl md:text-2xl lg:text-3xl",
  };

  return (
    <div className={cn("flex flex-col", alignmentClasses[align], className)}>
      <Tag
        className={cn(
          "font-orpheus text-primary mb-4",
          sizeClasses[level]
        )}
      >
        {children}
      </Tag>
      {showUnderline && (
        <div className="w-20 h-1 bg-secondary mb-6" />
      )}
    </div>
  );
}
