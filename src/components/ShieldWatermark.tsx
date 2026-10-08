import React from 'react';

interface ShieldWatermarkProps {
  className?: string;
  size?: number | string;
  opacity?: number;
  glow?: boolean;
  position?: 'center' | 'top-right' | 'bottom-right' | 'bottom-left' | 'top-left';
}

export function ShieldWatermark({
  className = "",
  size = 480,
  opacity = 0.05,
  glow = true,
  position = 'center',
}: ShieldWatermarkProps) {
  const positionClasses = {
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'top-right': 'top-0 right-0 translate-x-1/4 -translate-y-1/4',
    'bottom-right': 'bottom-0 right-0 translate-x-1/4 translate-y-1/4',
    'bottom-left': 'bottom-0 left-0 -translate-x-1/4 translate-y-1/4',
    'top-left': 'top-0 left-0 -translate-x-1/4 -translate-y-1/4',
  }[position];

  return (
    <div 
      aria-hidden="true" 
      className={`absolute pointer-events-none select-none z-0 ${positionClasses} ${className}`}
      style={{
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
        opacity,
      }}
    >
      {glow && (
        <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src="/images/nobtech-shield.png" 
        alt="" 
        className="w-full h-full object-contain filter drop-shadow-[0_0_50px_rgba(0,212,255,0.35)]" 
      />
    </div>
  );
}
