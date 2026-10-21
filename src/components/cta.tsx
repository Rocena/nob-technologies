"use client";

import React from "react";
import { Container, Section } from "@/components/ui/layout";
import { GlowButton } from "@/components/GlowButton";
import { TalkToEngineerButton } from "@/components/TalkToEngineerButton";
import { Phone, Mail, MapPin, ShieldCheck } from "lucide-react";

export function CTA() {
  return (
    <Section className="bg-[#0B1528] py-20 md:py-28 relative overflow-hidden border-t border-slate-800">
      <Container className="relative z-10">
        <div className="rounded-2xl bg-[#060B14] border border-slate-800 p-8 sm:p-10 md:p-14">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-400 mb-3">
                <ShieldCheck className="w-4 h-4" />
                <span>Consultation &amp; Audit sur site à Dakar</span>
              </div>
              <h2
                className="font-extrabold tracking-tight text-white leading-[1.12] mb-4"
                style={{ fontSize: "clamp(1.75rem, 1.2rem + 2vw, 2.75rem)" }}
              >
                Un projet d&apos;infrastructure réseau, de cybersécurité ou de digitalisation ?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-[60ch] mb-7">
                Nos ingénieurs certifiés évaluent votre existant sur site (baies de brassage, pare-feux, serveurs, parc applicatif) et vous remettent un cahier de recommandations chiffré sous 24h à 48h.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <GlowButton href="/contact" size="lg">
                  Demander un chiffrage
                </GlowButton>
                <TalkToEngineerButton />
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl bg-[#0B1528] border border-slate-800 p-6 space-y-4">
                <div className="text-xs font-mono uppercase text-slate-400 pb-3 border-b border-slate-800">
                  Coordonnées directes · Siège Dakar
                </div>

                <a
                  href="tel:+221773010838"
                  className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="text-xs text-slate-400">Ligne directe &amp; WhatsApp</div>
                      <div className="text-sm font-bold text-white">+221 77 301 08 38</div>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    24/7
                  </span>
                </a>

                <a
                  href="tel:+221338140435"
                  className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-sky-400" />
                    <div>
                      <div className="text-xs text-slate-400">Standard fixe Dakar</div>
                      <div className="text-sm font-bold text-white">+221 33 814 04 35</div>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400">Bureau</span>
                </a>

                <a
                  href="mailto:contact@nobtech.fr"
                  className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-sky-400" />
                    <div>
                      <div className="text-xs text-slate-400">Service commercial &amp; appels d&apos;offres</div>
                      <div className="text-sm font-bold text-white">contact@nobtech.fr</div>
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>Route de l&apos;Aéroport LSS (QG3J+HP), Dakar, Sénégal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
