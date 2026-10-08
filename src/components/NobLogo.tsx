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
  width = "auto", 
  height = 40,
  showText = true,
  showSlogan = false,
  textColor = "currentColor",
  layout = 'horizontal'
}) => {
  const isStacked = layout === 'stacked';

  // Calculations for SVG viewports
  const viewBox = isStacked
    ? "0 0 150 120"
    : (!showText 
        ? "0 0 76 76" 
        : (showSlogan ? "0 0 340 92" : "0 0 320 76"));

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox={viewBox}
      width={width} 
      height={height}
      className={className}
      fill="none"
      style={{ overflow: 'visible', display: 'inline-block', verticalAlign: 'middle' }}
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
          <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.35" />
          <stop offset="65%" stopColor="#10E760" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        <style>
          {`
            @keyframes shieldPulse {
              0%, 100% { transform: scale(1); filter: drop-shadow(0 0 6px rgba(0,212,255,0.3)); }
              50% { transform: scale(1.02); filter: drop-shadow(0 0 12px rgba(16,231,96,0.4)); }
            }
            .nob-shield-anim {
              transition: transform 0.3s ease, filter 0.3s ease;
            }
            .nob-logo-root:hover .nob-shield-anim {
              transform: scale(1.04);
              filter: drop-shadow(0 0 14px rgba(0,212,255,0.55));
            }
          `}
        </style>
      </defs>

      {/* --- STACKED LAYOUT (Footer Brand Column) --- */}
      {isStacked ? (
        <g>
          {/* Shield Centered at Top */}
          <g className="nob-shield-anim" style={{ transformOrigin: '75px 38px' }}>
            <circle cx="75" cy="38" r="35" fill="url(#nobShieldGlow)" />
            <image 
              href="/images/nobtech-shield.png" 
              x="37" 
              y="0" 
              width="76" 
              height="76" 
              preserveAspectRatio="xMidYMid meet" 
            />
          </g>

          {/* NOBTECH Centered Directly Below Shield */}
          {showText && (
            <text 
              x="75" 
              y="102" 
              textAnchor="middle" 
              dominantBaseline="central"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
              fontSize="28" 
              fontWeight="900" 
              letterSpacing="-0.3"
              className="nob-logo-text"
            >
              <tspan fill={textColor} className="nob-word-text">NOB</tspan>
              <tspan fill="url(#nobTechGrad)" className="nob-tech-text">TECH</tspan>
            </text>
          )}
        </g>
      ) : (
        /* --- HORIZONTAL LAYOUT (Header, Admin, Navigation) --- */
        <g>
          {/* Authentic Shield Emblem */}
          <g className="nob-shield-anim" style={{ transformOrigin: '38px 38px' }}>
            <circle cx="38" cy="38" r="35" fill="url(#nobShieldGlow)" />
            <image 
              href="/images/nobtech-shield.png" 
              x="0" 
              y="0" 
              width="76" 
              height="76" 
              preserveAspectRatio="xMidYMid meet" 
            />
          </g>

          {/* Dynamic Centered Brand Name: NOB + TECH */}
          {showText && (
            <g>
              <text 
                x="88"
                y={showSlogan ? "34" : "39"}
                dominantBaseline="central"
                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
                fontSize="46" 
                fontWeight="900" 
                letterSpacing="-0.5"
                className="nob-logo-text"
              >
                <tspan fill={textColor} className="nob-word-text">NOB</tspan>
                <tspan fill="url(#nobTechGrad)" className="nob-tech-text">TECH</tspan>
              </text>

              {/* Slogan officiel optionnel */}
              {showSlogan && (
                <g transform="translate(88, 68)">
                  <line x1="0" y1="0" x2="24" y2="0" stroke="#00D4FF" strokeWidth="2.5" strokeLinecap="round" />
                  <text 
                    x="32"
                    y="1"
                    dominantBaseline="central"
                    fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
                    fontSize="10" 
                    fontWeight="700" 
                    fill={textColor} 
                    letterSpacing="2.6"
                    opacity="0.85"
                  >
                    LA TECHNOLOGIE À VOTRE PORTÉE
                  </text>
                  <line x1="216" y1="0" x2="240" y2="0" stroke="#10E760" strokeWidth="2.5" strokeLinecap="round" />
                </g>
              )}
            </g>
          )}
        </g>
      )}
    </svg>
  );
};
