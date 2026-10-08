import React from 'react';

interface NobLogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  showText?: boolean;
  showSlogan?: boolean;
  textColor?: string;
  layout?: 'horizontal' | 'stacked';
}

export const NobLogo: React.FC<NobLogoProps> = ({ 
  className = "", 
  height = 40,
  showText = true,
  showSlogan = false,
  textColor = "currentColor",
  layout = 'horizontal'
}) => {
  const isStacked = layout === 'stacked';
  const numHeight = typeof height === 'number' ? height : parseInt(String(height), 10) || 40;

  if (isStacked) {
    const shieldSize = Math.round(numHeight * 0.65);
    const fontSize = Math.round(numHeight * 0.28);

    return (
      <div className={`inline-flex flex-col items-center justify-center select-none ${className}`}>
        {/* Shield */}
        <div 
          style={{ width: shieldSize, height: shieldSize }} 
          className="relative shrink-0 flex items-center justify-center nob-shield-anim"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/images/nobtech-shield.png" 
            alt="NOBTECH" 
            className="w-full h-full object-contain relative z-10" 
          />
        </div>

        {/* Text NOBTECH */}
        {showText && (
          <div 
            className="flex items-center justify-center font-sans font-black tracking-[-0.03em] leading-none mt-2.5"
            style={{ fontSize: `${fontSize}px` }}
          >
            <span style={{ color: textColor }} className="nob-word-text">NOB</span>
            <span className="nob-tech-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760] bg-clip-text text-transparent">TECH</span>
          </div>
        )}
      </div>
    );
  }

  // Horizontal Layout (Default: Header, Navbar, Admin Top Bar)
  const shieldSize = numHeight;
  const fontSize = Math.round(numHeight * 0.58);

  return (
    <div className={`inline-flex items-center justify-center select-none ${className}`}>
      {/* Shield */}
      <div 
        style={{ width: shieldSize, height: shieldSize }} 
        className="relative shrink-0 flex items-center justify-center nob-shield-anim"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/images/nobtech-shield.png" 
          alt="NOBTECH" 
          className="w-full h-full object-contain relative z-10" 
        />
      </div>

      {/* Dynamic Brand Text: NOB + TECH */}
      {showText && (
        <div className="flex flex-col justify-center ml-2 sm:ml-2.5">
          <div 
            className="flex items-center font-sans font-black tracking-[-0.03em] leading-none"
            style={{ fontSize: `${fontSize}px` }}
          >
            <span style={{ color: textColor }} className="nob-word-text">NOB</span>
            <span className="nob-tech-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760] bg-clip-text text-transparent">TECH</span>
          </div>

          {showSlogan && (
            <div className="flex items-center gap-1.5 mt-1">
              <span className="h-[1.5px] w-2.5 bg-[#00D4FF]" />
              <span style={{ color: textColor }} className="text-[9px] font-bold tracking-[0.2em] uppercase opacity-85 whitespace-nowrap">
                LA TECHNOLOGIE À VOTRE PORTÉE
              </span>
              <span className="h-[1.5px] w-2.5 bg-[#10E760]" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
