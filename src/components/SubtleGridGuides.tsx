import React from "react";

/**
 * Subtle Engineering Grid Guides (Linear / Supabase Style)
 * Renders two subtle vertical hairline guide rules along the max-w-7xl content boundary on desktop.
 * - Framed gracefully from top to bottom
 * - Invisible on mobile/tablet to avoid screen edge clutter (< xl)
 * - Non-interactive (pointer-events-none) so clicks and scroll pass through freely
 */
export function SubtleGridGuides() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 mx-auto hidden w-full max-w-7xl xl:block"
    >
      <div className="relative h-full w-full border-x border-slate-200/60">
        {/* Micro-markers d'ingénierie (Linear / Supabase subtle crosshairs) */}
        <div className="absolute -left-[5px] top-2 font-mono text-[10px] leading-none text-slate-400/60 select-none">
          +
        </div>
        <div className="absolute -right-[5px] top-2 font-mono text-[10px] leading-none text-slate-400/60 select-none">
          +
        </div>
      </div>
    </div>
  );
}
