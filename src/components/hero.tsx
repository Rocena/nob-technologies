"use client";

import React, { useState } from "react";
import { Container, Section } from "./ui/layout";
import { ArrowRight, ShieldCheck, Network, Server, GraduationCap, CheckCircle2, MapPin } from "lucide-react";
import Link from "next/link";
import { TalkToEngineerButton } from "./TalkToEngineerButton";

const INFRA_LAYERS = [
  {
    code: "SYS-01",
    title: "Cybersécurité & Défense Périmétrique",
    spec: "Sophos XGS · Fortinet FortiGate NGFW · Acronis",
    desc: "Segmentation VLAN, VPN IPsec/SSL inter-sites, filtrage applicatif, audit de conformité CDP et protection anti-ransomware.",
    metric: "SLA 99,98% · Audit 24h",
    href: "/services/cybersecurite",
    Icon: ShieldCheck,
  },
  {
    code: "NET-02",
    title: "Câblage Structuré & Réseaux Télécoms",
    spec: "Cuivre Cat 6A/7 · Fibre Optique · Certification Fluke",
    desc: "Ingénierie LAN/WAN, peignage méthodique de baies 42U, interconnexion optique et Wi-Fi haute densité Cisco & HPE Aruba.",
    metric: "ISO/IEC 11801 · Recette Fluke",
    href: "/services/reseaux-telecoms",
    Icon: Network,
  },
  {
    code: "CLD-03",
    title: "Serveurs, Virtualisation, ERP & Plateformes",
    spec: "Dell PowerEdge · VMware · Odoo/Dolibarr · Next.js",
    desc: "Consolidation de salles serveurs, licences Microsoft 365 CSP, intégration d'ERP métiers et développement d'applications sur-mesure.",
    metric: "Haute Disponibilité · Dakar",
    href: "/services/erp-digitalisation",
    Icon: Server,
  },
  {
    code: "ACD-04",
    title: "NOBTECH Academy & Certifications IT",
    spec: "Cisco CCNA · Fortinet NSE 4 · GSM-R · Power BI",
    desc: "Immersion pratique sur bancs physiques pour ingénieurs, techniciens réseaux et équipes IT d'institutions publiques et privées.",
    metric: "Travaux Pratiques sur Baies",
    href: "/formations",
    Icon: GraduationCap,
  },
];

export function Hero() {
  const [activeLayer, setActiveLayer] = useState(0);

  return (
    <Section className="relative overflow-hidden bg-[#060B14] text-white pt-32 sm:pt-36 lg:pt-40 pb-20 sm:pb-28 border-b border-slate-800/80">
      {/* Subtle architectural drafting grid — no neon blobs */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          {/* Left Column (7 cols): Editorial Authority, Left-Aligned */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-md bg-white/[0.04] border border-white/10 text-xs text-slate-300 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-medium">Cabinet d&apos;ingénierie IT, Réseaux &amp; Cybersécurité</span>
              <span className="text-slate-600">|</span>
              <span className="inline-flex items-center gap-1 text-slate-400">
                <MapPin className="w-3 h-3 text-sky-400" />
                Dakar, Sénégal
              </span>
            </div>

            <h1
              className="text-white font-extrabold tracking-tight leading-[1.08] mb-6"
              style={{ fontSize: "clamp(2.25rem, 1.5rem + 2.8vw, 4rem)" }}
            >
              Infrastructures réseaux, cybersécurité et systèmes critiques pour entreprises exigeantes.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-[62ch] mb-9 font-normal">
              Depuis plus de 15 ans, nos ingénieurs certifiés conçoivent, câblent et sécurisent les architectures informatiques des institutions diplomatiques, infrastructures de transport, établissements de santé et entreprises au Sénégal.
            </p>

            {/* Primary Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-12">
              <Link
                href="/reserver-audit"
                className="group inline-flex items-center justify-center gap-2.5 h-12 sm:h-13 px-6 sm:px-7 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold text-sm sm:text-[15px] border border-sky-400/30 shadow-[0_1px_2px_rgba(2,6,23,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] transition-colors duration-200"
              >
                <span>Planifier un audit technique</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>

              <TalkToEngineerButton />
            </div>

            {/* Verifiable Field Credentials Strip */}
            <div className="w-full pt-7 border-t border-white/10">
              <div className="text-xs text-slate-400 font-medium mb-3.5">
                Déploiements vérifiés en production à Dakar et au Sénégal :
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { client: "Union Européenne", mission: "Câblage Cat 6A & Baies 42U" },
                  { client: "SETER (TER Dakar)", mission: "Télécoms Ferroviaires GSM-R" },
                  { client: "Polyclinique P2A", mission: "VMware, VoIP & FortiGate" },
                  { client: "Hôtel du Parc Exotique", mission: "Plateforme Web, Cloud & ERP" },
                ].map((ref) => (
                  <div key={ref.client} className="border-l-2 border-slate-700 pl-3 py-0.5">
                    <div className="text-xs font-bold text-white leading-snug">{ref.client}</div>
                    <div className="text-[11px] text-slate-400 leading-tight mt-0.5">{ref.mission}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Interactive Architecture Specification Dossier */}
          <div className="lg:col-span-5 w-full">
            <div className="rounded-xl bg-[#0B1528] border border-slate-800 shadow-2xl overflow-hidden">
              {/* Top Dossier Header */}
              <div className="px-5 py-3.5 bg-[#081020] border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-semibold text-sky-400">
                    ARCHITECTURE NOBTECH
                  </span>
                </div>
                <span className="font-mono text-[11px] text-slate-400">
                  4 Pôles d&apos;Ingénierie
                </span>
              </div>

              {/* Interactive Layer Selector */}
              <div className="divide-y divide-slate-800/90">
                {INFRA_LAYERS.map((layer, idx) => {
                  const isActive = activeLayer === idx;
                  const LayerIcon = layer.Icon;
                  return (
                    <div
                      key={layer.code}
                      onMouseEnter={() => setActiveLayer(idx)}
                      onClick={() => setActiveLayer(idx)}
                      className={`p-4 sm:p-5 transition-colors cursor-pointer ${
                        isActive ? "bg-slate-900/90" : "bg-transparent hover:bg-slate-900/40"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                              isActive
                                ? "bg-sky-500/15 border-sky-400/40 text-sky-400"
                                : "bg-slate-900 border-slate-800 text-slate-400"
                            }`}
                          >
                            <LayerIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[10px] text-slate-500 font-semibold">
                                {layer.code}
                              </span>
                              <h2 className="text-sm font-bold text-white leading-snug">
                                {layer.title}
                              </h2>
                            </div>
                            <div className="font-mono text-[11px] text-sky-400/90 mt-0.5">
                              {layer.spec}
                            </div>
                          </div>
                        </div>

                        <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-slate-300 shrink-0">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          {layer.metric}
                        </span>
                      </div>

                      {isActive && (
                        <div className="mt-3 pl-11 pr-1">
                          <p className="text-xs text-slate-300 leading-relaxed mb-2.5">
                            {layer.desc}
                          </p>
                          <Link
                            href={layer.href}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors"
                          >
                            <span>Consulter les spécifications</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Dossier Footer */}
              <div className="px-5 py-3 bg-[#081020] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Intervention sur site : Dakar &amp; régions</span>
                <Link
                  href="/services"
                  className="font-semibold text-white hover:text-sky-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>Catalogue complet</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
