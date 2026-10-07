import React from "react";
import { cn } from "@/lib/utils";

export const Heading = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & { level?: 1 | 2 | 3 | 4 | 5 | 6 }
>(({ className, level = 2, ...props }, ref) => {
  const Tag = `h${level}` as React.ElementType;
  
  const sizes = {
    1: "font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-primary",
    2: "font-display text-4xl sm:text-5xl font-bold tracking-tight text-primary",
    3: "font-display text-2xl sm:text-3xl font-semibold text-primary",
    4: "font-display text-xl sm:text-2xl font-semibold text-text",
    5: "font-display text-lg sm:text-xl font-semibold text-text",
    6: "font-display text-base font-semibold text-text",
  };

  return (
    <Tag ref={ref as any} className={cn(sizes[level], className)} {...props} />
  );
});
Heading.displayName = "Heading";

export const Text = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { variant?: "default" | "lead" | "muted" | "small" }
>(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "text-base text-text leading-relaxed",
    lead: "text-lg sm:text-xl text-muted leading-relaxed",
    muted: "text-base text-muted",
    small: "text-sm text-muted",
  };

  return (
    <p ref={ref} className={cn(variants[variant], className)} {...props} />
  );
});
Text.displayName = "Text";
