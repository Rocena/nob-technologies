import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "dark" | "light" | "glass" | "glass-inverse" | "glass-accent" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";
    
    const variants: Record<string, string> = {
      // Solid turquoise CTA
      default: "bg-accent text-[#020617] hover:bg-[#00B4D8] shadow-[0_0_15px_rgba(0,212,255,0.2)] hover:shadow-[0_0_25px_rgba(0,212,255,0.4)]",
      dark: "bg-slate-900 text-white hover:bg-slate-800 shadow-[0_1px_4px_rgba(0,0,0,0.12)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]",
      light: "bg-white text-slate-900 hover:bg-gray-100 shadow-[0_0_30px_rgba(255,255,255,0.1)]",
      // Liquid glass — dark background (CTA section, hero)
      glass: "bg-gradient-to-br from-white/10 to-white/5 text-white hover:from-white/20 hover:to-white/10 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)] backdrop-blur-md",
      // Liquid glass — light background (header)
      "glass-inverse": "bg-gradient-to-br from-white/70 to-white/40 text-slate-900 hover:from-white/90 hover:to-white/60 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] backdrop-blur-md",
      // Liquid glass tinted accent turquoise — for header "Nous contacter"
      "glass-accent": "bg-gradient-to-br from-accent/15 to-accent/5 text-[#006B8A] font-bold hover:from-accent/25 hover:to-accent/10 border border-accent/40 shadow-[0_8px_32px_rgba(0,212,255,0.12),inset_0_1px_1px_rgba(0,212,255,0.2)] backdrop-blur-md hover:shadow-[0_8px_32px_rgba(0,212,255,0.25)] hover:text-[#005070]",
      outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-900 shadow-sm",
      ghost: "hover:bg-slate-100 text-slate-700",
      link: "text-blue-600 underline-offset-4 hover:underline",
    };

    const sizes = {
      default: "h-11 px-6 text-sm",
      sm: "h-9 px-4 text-sm",
      lg: "h-14 px-8 text-base",
      icon: "h-11 w-11",
    };

    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
