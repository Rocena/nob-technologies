import React from "react";
import { cn } from "@/lib/utils";

export const Heading = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | string;
  }
>(({ className, level = 2, as, ...props }, ref) => {
  const resolvedLevel = as
    ? (parseInt(as.replace('h', ''), 10) as 1 | 2 | 3 | 4 | 5 | 6) || level
    : level;
  const Tag = (as || `h${resolvedLevel}`) as React.ElementType;
  
  const sizes = {
    1: "font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.12]",
    2: "font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.2]",
    3: "font-display text-xl sm:text-2xl font-bold tracking-tight leading-snug",
    4: "font-display text-lg sm:text-xl font-bold leading-snug",
    5: "font-display text-base sm:text-lg font-semibold leading-normal",
    6: "font-display text-sm font-semibold leading-normal",
  };

  return (
    <Tag ref={ref as any} className={cn(sizes[resolvedLevel] || sizes[2], className)} {...props} />
  );
});
Heading.displayName = "Heading";

export const Text = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { variant?: "default" | "lead" | "muted" | "small" }
>(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal",
    lead: "text-lg sm:text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-normal",
    muted: "text-sm text-slate-500 dark:text-slate-400 leading-normal",
    small: "text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-normal",
  };

  return (
    <p ref={ref} className={cn(variants[variant], className)} {...props} />
  );
});
Text.displayName = "Text";

export const Eyebrow = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & { variant?: "cyan" | "accent" | "slate" }
>(({ className, variant = "cyan", ...props }, ref) => {
  const variants = {
    cyan: "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 border-cyan-200 dark:border-cyan-800/60",
    accent: "text-accent bg-accent/10 border-accent/30",
    slate: "text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700",
  };

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-[0.2em] uppercase border mb-4",
        variants[variant],
        className
      )}
      {...props}
    />
  );
});
Eyebrow.displayName = "Eyebrow";
