"use client";

import React, { useEffect, useRef, useState } from "react";
import { ShieldCheck, Briefcase, Zap, Clock } from "lucide-react";

interface MetricData {
  id: string;
  prefix?: string;
  target: number;
  decimals?: number;
  suffix: string;
  label: string;
  detail: string;
  badge: string;
  Icon: React.ComponentType<{ className?: string; size?: number }>;
  iconColor: string;
  iconBg: string;
}

const METRICS: MetricData[] = [
  {
    id: "satisfaction",
    target: 100,
    decimals: 0,
    suffix: "%",
    label: "Satisfaction Client",
    detail: "Qualité d'intervention & suivi rigoureux",
    badge: "Garantie de Service",
    Icon: ShieldCheck,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50/80 border-emerald-200/80",
  },
  {
    id: "experience",
    target: 15,
    decimals: 0,
    suffix: "+ Ans",
    label: "Expérience Fondateur",
    detail: "Ingénierie, maintenance & systèmes",
    badge: "Expertise Senior",
    Icon: Briefcase,
    iconColor: "text-cyan-700",
    iconBg: "bg-cyan-50/80 border-cyan-200/80",
  },
  {
    id: "performance",
    prefix: "< ",
    target: 1.2,
    decimals: 1,
    suffix: "s",
    label: "Performance Web",
    detail: "Temps de chargement moyen sur mobile",
    badge: "Optimisation Élite",
    Icon: Zap,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50/80 border-amber-200/80",
  },
  {
    id: "support",
    target: 24,
    decimals: 0,
    suffix: "/7",
    label: "Disponibilité & Support",
    detail: "Infogérance & réactivité continue",
    badge: "Haute Disponibilité",
    Icon: Clock,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50/80 border-blue-200/80",
  },
];

function MetricCard({
  metric,
  isVisible,
  index,
}: {
  metric: MetricData;
  isVisible: boolean;
  index: number;
}) {
  const [val, setVal] = useState<number>(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    let startTime: number | null = null;
    let frameId: number;
    const duration = 1500; // 1.5s smooth duration

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Courbe d'accélération puis amortissement progressif (cubic ease-out)
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(metric.target * ease);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setVal(metric.target);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isVisible, metric.target]);

  const displayNum = isVisible
    ? metric.decimals && metric.decimals > 0
      ? val.toFixed(metric.decimals)
      : Math.round(val).toString()
    : metric.decimals && metric.decimals > 0
    ? metric.target.toFixed(metric.decimals)
    : metric.target.toString();

  return (
    <div
      className="group relative bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.04)] hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.1)] hover:border-cyan-300/80 transition-all duration-300 flex flex-col justify-between overflow-hidden"
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {/* Top corporate accent border */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Top Header inside Card */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center border ${metric.iconBg} ${metric.iconColor} transition-transform duration-300 group-hover:scale-105`}
          >
            <metric.Icon size={18} />
          </div>
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md bg-slate-100/90 text-slate-600 border border-slate-200/60">
            {metric.badge}
          </span>
        </div>

        {/* Big Number & Accents */}
        <div className="flex items-baseline gap-0.5 mb-2">
          {metric.prefix && (
            <span className="text-xl sm:text-2xl font-extrabold text-[#00D4FF] tracking-tight mr-1">
              {metric.prefix}
            </span>
          )}
          <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 tabular-nums">
            {displayNum}
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760] ml-1">
            {metric.suffix}
          </span>
        </div>

        {/* Corporate Label */}
        <h4 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight mb-1">
          {metric.label}
        </h4>
      </div>

      {/* Detail / Subtitle */}
      <div className="text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed pt-3 mt-3 border-t border-slate-100">
        {metric.detail}
      </div>
    </div>
  );
}

export function CorporateMetrics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-14"
    >
      {METRICS.map((metric, idx) => (
        <MetricCard
          key={metric.id}
          metric={metric}
          isVisible={isVisible}
          index={idx}
        />
      ))}
    </div>
  );
}
