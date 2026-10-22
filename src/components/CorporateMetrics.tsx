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

function MetricItem({
  metric,
  isVisible,
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
    const duration = 1500;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
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
    <div className="flex flex-col justify-start px-2 sm:px-4 lg:px-6 py-4 sm:py-2">
      {/* Surtitre & Badge discret */}
      <div className="flex items-center gap-2 mb-2">
        <metric.Icon size={15} className={metric.iconColor} />
        <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-500">
          {metric.badge}
        </span>
      </div>

      {/* Grand Chiffre Percutant */}
      <div className="flex items-baseline gap-1 my-1">
        {metric.prefix && (
          <span className="text-2xl sm:text-3xl font-extrabold text-[#00D4FF] tracking-tight">
            {metric.prefix}
          </span>
        )}
        <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 tabular-nums">
          {displayNum}
        </span>
        <span className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]">
          {metric.suffix}
        </span>
      </div>

      {/* Titre Principal */}
      <h4 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight mt-1 mb-1">
        {metric.label}
      </h4>

      {/* Sous-texte / Détail */}
      <p className="text-xs text-slate-500 font-normal leading-relaxed">
        {metric.detail}
      </p>
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
      className="mb-14 pt-2 pb-6 border-y border-slate-200/80"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/70">
        {METRICS.map((metric, idx) => (
          <MetricItem
            key={metric.id}
            metric={metric}
            isVisible={isVisible}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
}
