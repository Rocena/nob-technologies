"use client";

import React, { useEffect, useRef } from "react";
import { Container, Section } from "@/components/ui/layout";
import { Heading, Text } from "@/components/ui/typography";
import { GlowButton } from "@/components/GlowButton";
import { FadeUp } from "@/components/animations";

function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    const count = 40;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = "rgba(0, 212, 255, 0.3)";
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-30"
      aria-hidden="true"
    />
  );
}

export function CTA() {
  return (
    <Section data-cursor-binary="true" className="bg-[#020617] py-16 md:py-24 lg:py-32 relative overflow-hidden border-t border-white/5">
      {/* Interactive Network Background */}
      <NetworkBackground />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-transparent to-[#020617]/80 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-[#00D4FF]/10 via-[#00F0FF]/8 to-[#10E760]/8 rounded-full blur-[100px] pointer-events-none"></div>

      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <FadeUp>
            <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase mb-4 sm:mb-6 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]">
              ACCÉLÉRATION DIGITALE &bull; PASSEZ À L&apos;ACTION
            </p>
            <Heading level={2} className="mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Passez à la vitesse supérieure avec nos{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]">
                infrastructures cloud et réseaux sécurisés.
              </span>
            </Heading>
            <Text className="text-base sm:text-lg md:text-xl text-slate-400 mb-10 md:mb-12 leading-relaxed max-w-2xl mx-auto">
              Nos ingénieurs certifiés analysent vos besoins et conçoivent une architecture sur-mesure. Premier audit offert, sans engagement.
            </Text>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GlowButton href="/contact" className="w-full sm:w-auto px-8 md:px-12">
                Démarrer un projet
              </GlowButton>
            </div>
          </FadeUp>
        </div>
      </Container>
    </Section>
  );
}