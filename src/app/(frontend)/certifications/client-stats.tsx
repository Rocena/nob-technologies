"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { FadeUp } from "@/components/animations";
import { Section, Container } from "@/components/ui/layout";

const stats = [
  { value: 15, suffix: "+", label: "Ans d'experience" },
  { value: 200, suffix: "+", label: "Projets realises" },
  { value: 98, suffix: "%", label: "Clients satisfaits" },
  { value: 50, suffix: "+", label: "Entreprises clientes" },
];

function AnimatedCounter({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">
      {count}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 bg-[#020617] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/8 rounded-full blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        <FadeUp>
          <div className="text-center mb-16">
            <p className="font-mono text-accent text-xs tracking-[0.3em] uppercase mb-4 font-bold">
              CHIFFRES CLES
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
              La confiance en chiffres
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Des annees d'experience et des centaines de deployements reussis a
              travers le Senegal et l'Afrique de l'Ouest.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.1}>
              <div className="text-center group">
                <div className="mb-3">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    inView={inView}
                  />
                </div>
                <p className="text-sm text-slate-400 font-medium tracking-wide">
                  {stat.label}
                </p>
                <div className="mt-4 mx-auto w-12 h-0.5 bg-gradient-to-r from-transparent via-accent/50 to-transparent group-hover:via-accent transition-all duration-500" />
              </div>
            </FadeUp>
          ))}
        </div>
      </Container>
    </section>
  );
}
