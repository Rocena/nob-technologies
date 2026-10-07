import React from 'react';

interface NobLogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  showText?: boolean;
  textColor?: string;
}

export const NobLogo: React.FC<NobLogoProps> = ({ 
  className = "", 
  width = "auto", 
  height = 40,
  showText = true,
  textColor = "currentColor" 
}) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox={showText ? "0 0 540 80" : "0 0 80 80"}
      width={width} 
      height={height}
      className={className}
      fill="none"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="nobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D4FF" />
          <stop offset="50%" stopColor="#0088CC" />
          <stop offset="100%" stopColor="#004488" />
        </linearGradient>
        
        <style>
          {`
            @keyframes faceIn {
              0% { opacity: 0; transform: translateY(4px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            @keyframes lineDraw {
              0% { stroke-dashoffset: 50; opacity: 0; }
              100% { stroke-dashoffset: 0; opacity: 1; }
            }
            .face-top { animation: faceIn 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s both; }
            .face-left { animation: faceIn 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s both; }
            .face-right { animation: faceIn 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s both; }
            .wire-glow { 
              stroke-dasharray: 50; 
              animation: lineDraw 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.4s both; 
            }
          `}
        </style>
      </defs>

      {/* LE LOGOMARK */}
      <g transform="translate(6, 6) scale(1.15)">
        {/* Faces animées en cascade */}
        <polygon points="32,6 12,18 32,30 52,18" fill="#33DDFF" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="0.8" strokeLinejoin="round" className="face-top" />
        <polygon points="12,18 32,30 32,54 12,42" fill="#0A9FE0" stroke="#FFFFFF" strokeOpacity="0.25" strokeWidth="0.8" strokeLinejoin="round" className="face-left" />
        <polygon points="32,30 52,18 52,42 32,54" fill="#1565C0" stroke="#FFFFFF" strokeOpacity="0.25" strokeWidth="0.8" strokeLinejoin="round" className="face-right" />
        
        {/* Lignes lumineuses tracées dynamiquement */}
        <polyline points="32,30 32,54" stroke="#00D4FF" strokeWidth="1.5" className="wire-glow" />
        <polyline points="12,18 32,30 52,18" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.5" className="wire-glow" />
      </g>

      {/* LE LOGOTYPE */}
      {showText && (
        <g transform="translate(90, 52)">
          <text 
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
            fontSize="40" 
            fontWeight="900" 
            fill={textColor} 
            letterSpacing="-0.5"
          >
            NOB
          </text>
          <text 
            x="96"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
            fontSize="38" 
            fontWeight="600" 
            fill={textColor} 
            letterSpacing="2.5"
          >
            TECHNOLOGIES
          </text>
        </g>
      )}
    </svg>
  );
};
