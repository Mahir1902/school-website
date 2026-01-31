import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "secondary" | "outline";
  size?: "sm" | "default" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  className?: string;
}

export default function CTAButton({
  children,
  href,
  onClick,
  variant = "default",
  size = "default",
  icon: Icon,
  iconPosition = "right",
  className,
}: CTAButtonProps) {
  const content = (
    <>
      {Icon && iconPosition === "left" && (
        <Icon className="w-4 h-4" />
      )}
      {children}
      {Icon && iconPosition === "right" && (
        <Icon className="w-4 h-4" />
      )}
    </>
  );

  const classes = cn(
    "transition-transform duration-300 hover:scale-105",
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          buttonVariants({ variant, size }),
          classes
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <Button
      onClick={onClick}
      variant={variant}
      size={size}
      className={classes}
    >
      {content}
    </Button>
  );
}
