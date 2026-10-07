import React from 'react';
import { NobLogo } from '../NobLogo';
import { Database, Cloud, Cpu, Network, Code, Lock } from 'lucide-react';

export const TechConstellation = () => {
  const nodes = [
    { id: 1, icon: Database, x: 80, y: 100, color: 'text-white', border: 'border-white/5', anim: 'animate-[float_7s_ease-in-out_infinite]' },
    { id: 2, icon: Cloud, x: 320, y: 90, color: 'text-[#00D4FF]', border: 'border-[#00D4FF]/20', anim: 'animate-[float_6s_ease-in-out_infinite_reverse]' },
    { id: 3, icon: Cpu, x: 90, y: 300, color: 'text-[#00D4FF]', border: 'border-[#00D4FF]/20', anim: 'animate-[float_8s_ease-in-out_infinite]' },
    { id: 4, icon: Network, x: 310, y: 320, color: 'text-white', border: 'border-white/5', anim: 'animate-[float_9s_ease-in-out_infinite_reverse]' },
    { id: 5, icon: Code, x: 180, y: 50, color: 'text-white', border: 'border-white/5', anim: 'animate-[float_5s_ease-in-out_infinite]' },
    { id: 6, icon: Lock, x: 340, y: 220, color: 'text-[#00D4FF]', border: 'border-white/5', anim: 'animate-[float_7s_ease-in-out_infinite_reverse]' },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
      <div className="relative w-[400px] h-[400px]">
        
        {/* Lignes de connexion et Icônes (Groupés pour bouger ensemble) */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {nodes.map((node) => {
            const Icon = node.icon;
            // On calcule la taille de la boîte pour centrer le SVG
            const boxSize = node.icon === Cloud || node.icon === Cpu ? 56 : 48;
            const iconSize = node.icon === Cloud || node.icon === Cpu ? 28 : 24;

            return (
              <g key={node.id} className={node.anim}>
                {/* Ligne connectée au centre. Le centre est caché par le logo central */}
                <line 
                  x1="200" 
                  y1="200" 
                  x2={node.x} 
                  y2={node.y} 
                  stroke="url(#lineGrad)" 
                  strokeWidth="1.5" 
                  strokeDasharray="4 4" 
                  opacity="0.3"
                />
                <foreignObject 
                  x={node.x - boxSize / 2} 
                  y={node.y - boxSize / 2} 
                  width={boxSize} 
                  height={boxSize}
                >
                  <div className={`w-full h-full flex items-center justify-center rounded-xl bg-slate-900/50 backdrop-blur-sm border ${node.border} ${node.color}`}>
                    <Icon size={iconSize} strokeWidth={1.5} />
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>

        {/* Center Node (Logo) placé par-dessus le SVG pour cacher l'origine des lignes */}
        <div className="absolute top-[160px] left-[160px] w-[80px] h-[80px] rounded-2xl border border-[#00D4FF]/30 flex items-center justify-center bg-[#020617] shadow-[0_0_50px_rgba(0,212,255,0.2)] z-10">
          <NobLogo height={32} showText={false} />
        </div>

      </div>
    </div>
  );
};
