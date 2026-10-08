import React from 'react';

interface NobLogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  showText?: boolean;
  showSlogan?: boolean;
  textColor?: string;
}

export const NobLogo: React.FC<NobLogoProps> = ({ 
  className = "", 
  width = "auto", 
  height = 40,
  showText = true,
  showSlogan = false,
  textColor = "currentColor" 
}) => {
  const viewBox = !showText 
    ? "0 0 76 76" 
    : (showSlogan ? "0 0 340 92" : "0 0 320 76");

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox={viewBox}
      width={width} 
      height={height}
      className={className}
      fill="none"
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* TECH Cyan-to-Emerald Signature Gradient */}
        <linearGradient id="nobTechGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00D4FF" />
          <stop offset="50%" stopColor="#00F0FF" />
          <stop offset="100%" stopColor="#10E760" />
        </linearGradient>

        {/* Shield Outer Border Neon Gradient */}
        <linearGradient id="nobBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E5FF" />
          <stop offset="100%" stopColor="#10E760" />
        </linearGradient>

        {/* Shield Radial Glow */}
        <radialGradient id="nobShieldGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.4" />
          <stop offset="65%" stopColor="#10E760" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        <style>
          {`
            @keyframes shieldPulse {
              0%, 100% { transform: scale(1); filter: drop-shadow(0 0 6px rgba(0,212,255,0.3)); }
              50% { transform: scale(1.02); filter: drop-shadow(0 0 12px rgba(16,231,96,0.4)); }
            }
            .nob-shield-anim {
              transform-origin: 38px 38px;
              transition: transform 0.3s ease, filter 0.3s ease;
            }
            .nob-logo-root:hover .nob-shield-anim {
              transform: scale(1.04);
              filter: drop-shadow(0 0 14px rgba(0,212,255,0.55));
            }
          `}
        </style>
      </defs>

      {/* LE LOGOMARK : Authentic Shield Emblem */}
      <g className="nob-shield-anim">
        {/* Ambient Glow */}
        <circle cx="38" cy="38" r="35" fill="url(#nobShieldGlow)" />

        {/* Fallback Vector Heptagon Shield */}
        <polygon 
          points="38,2 66,13 74,44 54,72 22,72 2,44 10,13" 
          fill="#031E3E" 
          stroke="url(#nobBorderGrad)" 
          strokeWidth="2.5" 
          strokeLinejoin="round" 
        />

        {/* High-Resolution Emblem Image Overlay */}
        <image 
          href="/images/nobtech-shield-256.png" 
          x="0" 
          y="0" 
          width="76" 
          height="76" 
          preserveAspectRatio="xMidYMid meet" 
        />
      </g>

      {/* LE LOGOTYPE : NOB + TECH */}
      {showText && (
        <g transform="translate(86, 0)">
          {/* Mot "NOB" : S'adapte au fond/thème (blanc en sombre, marine en clair) */}
          <text 
            x="0"
            y="52"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
            fontSize="46" 
            fontWeight="900" 
            fill={textColor} 
            letterSpacing="-0.5"
            className="nob-word-text"
          >
            NOB
          </text>

          {/* Mot "TECH" : Dégradé Cyan-Vert Signature Immuable */}
          <text 
            x="100"
            y="52"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
            fontSize="46" 
            fontWeight="900" 
            fill="url(#nobTechGrad)" 
            letterSpacing="-0.5"
            className="nob-tech-text"
          >
            TECH
          </text>

          {/* Slogan officiel optionnel */}
          {showSlogan && (
            <g transform="translate(0, 78)">
              {/* Ligne accent cyan gauche */}
              <line x1="2" y1="-4" x2="28" y2="-4" stroke="#00D4FF" strokeWidth="2.5" strokeLinecap="round" />

              {/* Texte slogan */}
              <text 
                x="36"
                y="0"
                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
                fontSize="10" 
                fontWeight="700" 
                fill={textColor} 
                letterSpacing="2.8"
                opacity="0.85"
              >
                LA TECHNOLOGIE À VOTRE PORTÉE
              </text>

              {/* Ligne accent vert droite */}
              <line x1="226" y1="-4" x2="252" y2="-4" stroke="#10E760" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          )}
        </g>
      )}
    </svg>
  );
};

