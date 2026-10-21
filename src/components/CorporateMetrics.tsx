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
}

const METRICS: MetricData[] = [
  {
    id: "satisfaction",
    target: 100,
    decimals: 0,
    suffix: "%",
    label: "Conformité & Recette Technique",
    detail: "Recette contradictoire et certification sur chaque chantier",
    badge: "Qualité d'exécution",
    Icon: ShieldCheck,
  },
  {
    id: "experience",
    target: 15,
    decimals: 0,
    suffix: "+ ans",
    label: "Expérience Terrain",
    detail: "Ingénierie systèmes, réseaux télécoms et cybersécurité",
    badge: "Direction Technique",
    Icon: Briefcase,
  },
  {
    id: "performance",
    prefix: "< ",
    target: 1.2,
    decimals: 1,
    suffix: "s",
    label: "Temps de Réponse Applicatif",
    detail: "Plateformes web et portails cloud optimisés",
    badge: "Performance",
    Icon: Zap,
  },
  {
    id: "support",
    target: 24,
    decimals: 0,
    suffix: "/7",
    label: "Continuité & Infogérance",
    detail: "Supervision proactive et intervention sous SLA à Dakar",
    badge: "Disponibilité",
    Icon: Clock,
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
    const duration = 1200;

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
    <div className="flex flex-col justify-start px-3 sm:px-5 lg:px-6 py-4 sm:py-3">
      <div className="flex items-center gap-2 mb-2">
        <metric.Icon size={14} className="text-[#0284C7] dark:text-sky-400" />
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {metric.badge}
        </span>
      </div>

      <div className="flex items-baseline gap-1 my-1">
        {metric.prefix && (
          <span className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {metric.prefix}
          </span>
        )}
        <span className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-slate-900 dark:text-white tabular-nums">
          {displayNum}
        </span>
        <span className="text-lg sm:text-xl font-bold text-[#0284C7] dark:text-sky-400">
          {metric.suffix}
        </span>
      </div>

      <h4 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight mt-1 mb-0.5">
        {metric.label}
      </h4>

      <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
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
      className="mb-14 pt-3 pb-5 border-y border-slate-200 dark:border-slate-800"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-800">
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
