'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Shield,
  Network,
  Phone,
  Video,
  Wrench,
  Key,
  Smartphone,
  Database,
  BarChart3,
  GraduationCap,
  CheckCircle2,
  Search,
  LayoutGrid,
  List,
  X,
  CalendarCheck,
} from 'lucide-react';
import { QuoteRequestButton } from '@/components/QuoteRequestButton';
import { cn } from '@/lib/utils';

export interface SerializedServiceItem {
  slug: string;
  title: string;
  category: string;
  group: 'securite-reseaux' | 'erp-logiciel' | 'telecoms-support' | 'formations';
  description: string;
  iconName: string;
  features: string[];
  partners?: string[];
  badge?: string;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  shield: Shield,
  network: Network,
  phone: Phone,
  video: Video,
  wrench: Wrench,
  key: Key,
  smartphone: Smartphone,
  database: Database,
  barchart: BarChart3,
  graduation: GraduationCap,
};

const FILTER_TABS = [
  { id: 'all', label: 'Toutes les expertises' },
  { id: 'securite-reseaux', label: 'Cybersécurité & Réseaux' },
  { id: 'erp-logiciel', label: 'ERP, Web & Digital' },
  { id: 'telecoms-support', label: 'Télécoms, Licences & Infogérance' },
  { id: 'formations', label: 'Formations & IA' },
] as const;

export function ServicesCatalogView({ services }: { services: SerializedServiceItem[] }) {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      const matchesTab = activeTab === 'all' || s.group === activeTab;
      if (!matchesTab) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        s.title.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.features.some((f) => f.toLowerCase().includes(q)) ||
        (s.partners && s.partners.some((p) => p.toLowerCase().includes(q)))
      );
    });
  }, [services, activeTab, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Interactive Filter, Search & Display Mode Toolbar */}
      <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-corporate-elevated">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1 lg:pb-0">
            {FILTER_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const count =
                tab.id === 'all'
                  ? services.length
                  : services.filter((s) => s.group === tab.id).length;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-semibold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer shrink-0',
                    isActive
                      ? 'bg-slate-900 text-white dark:bg-cyan-500 dark:text-slate-950 shadow-xs'
                      : 'bg-slate-100/80 dark:bg-slate-900/90 text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800'
                  )}
                >
                  <span>{tab.label}</span>
                  <span
                    className={cn(
                      'text-[11px] px-1.5 py-0.2 rounded-full font-bold',
                      isActive
                        ? 'bg-white/20 text-white dark:bg-slate-950/20 dark:text-slate-950'
                        : 'bg-slate-200/80 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input & View Mode Switcher */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filtrer (Fortinet, Odoo, Fibre...)"
                aria-label="Rechercher un service ou une technologie"
                className="w-full pl-9 pr-8 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Effacer la recherche"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Display Mode Toggle (Grid vs Executive List) */}
            <div
              className="inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800"
              role="group"
              aria-label="Mode d'affichage"
            >
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                title="Affichage en grille détaillée"
                aria-label="Affichage en grille détaillée"
                className={cn(
                  'p-1.5 rounded-lg transition-colors cursor-pointer',
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-2xs'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                )}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                title="Affichage en liste synthétique"
                aria-label="Affichage en liste synthétique"
                className={cn(
                  'p-1.5 rounded-lg transition-colors cursor-pointer',
                  viewMode === 'list'
                    ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-2xs'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Empty Search State */}
      {filteredServices.length === 0 ? (
        <div className="bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center">
          <p className="text-base font-bold text-slate-900 dark:text-white">
            Aucune expertise ne correspond à « {searchQuery} »
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Essayez un autre mot-clé (ex: Sophos, Cisco, Dolibarr, Office 365, Fibre) ou réinitialisez les filtres.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveTab('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors cursor-pointer"
          >
            Afficher tous les services
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* MODE 1: DETAILED BENTO GRID */
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {filteredServices.map((service) => {
            const Icon = ICON_MAP[service.iconName] || Shield;
            return (
              <div
                key={service.slug}
                className="group h-full bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-400/80 dark:hover:bg-[#0f1d3d] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-corporate-elevated hover:-translate-y-1 relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="w-11 h-11 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-100 dark:border-cyan-800/80 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100/80 dark:bg-slate-800/70 px-2.5 py-1 rounded-full">
                      {service.category}
                    </span>
                  </div>

                  <Link href={`/services/${service.slug}`} className="block">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2.5 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug">
                      {service.title}
                    </h3>
                  </Link>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5 text-pretty">
                    {service.description}
                  </p>

                  {/* Feature bullets */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                    {service.features.map((feat, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200 font-medium"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Partners / Tech stack tags & Actions */}
                <div>
                  {service.partners && service.partners.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                      {service.partners.map((p, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/90 px-2.5 py-0.5 rounded-md"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 gap-2">
                    <QuoteRequestButton
                      service={service.title}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 bg-slate-100 hover:bg-cyan-50 dark:bg-slate-800 dark:hover:bg-cyan-950/60 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
                    >
                      <span>Demander un devis</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </QuoteRequestButton>

                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline py-2 px-2"
                    >
                      <span>Découvrir l&apos;offre</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* MODE 2: COMPACT EXECUTIVE LIST (Fast DSI / Procurement Comparison) */
        <div className="space-y-3">
          {filteredServices.map((service) => {
            const Icon = ICON_MAP[service.iconName] || Shield;
            return (
              <div
                key={service.slug}
                className="group bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-400/80 p-5 sm:p-6 transition-all duration-200 shadow-corporate-elevated flex flex-col lg:flex-row lg:items-center justify-between gap-5"
              >
                <div className="flex items-start gap-4 max-w-3xl">
                  <div className="w-11 h-11 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-100 dark:border-cyan-800/80 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-semibold text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/60 px-2.5 py-0.5 rounded-full">
                        {service.category}
                      </span>
                      {service.partners &&
                        service.partners.map((p, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded"
                          >
                            {p}
                          </span>
                        ))}
                    </div>
                    <Link href={`/services/${service.slug}`} className="block">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {service.title}
                      </h3>
                    </Link>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-pretty">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="flex sm:items-center gap-2.5 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
                  <QuoteRequestButton
                    service={service.title}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-cyan-600 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span>Chiffrer ce besoin</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </QuoteRequestButton>

                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
                  >
                    <span>Détails</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Direct Audit Callout Strip below the catalog */}
      <div className="rounded-2xl bg-gradient-to-r from-[#020617] via-[#0A2540] to-[#020617] border border-slate-800 p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-corporate-elevated">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-300">
            <CalendarCheck className="w-4 h-4 text-emerald-400" />
            <span>Diagnostic d&apos;infrastructure sur site à Dakar &amp; Régions</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white">
            Vous hésitez entre plusieurs architectures ou souhaitez auditer votre existant ?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Nos ingénieurs certifiés se déplacent dans vos locaux sous 24h à 48h pour inspecter vos baies, votre couverture Wi-Fi et votre sécurité périmétrique.
          </p>
        </div>

        <Link
          href="/reserver-audit"
          className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#00D4FF] hover:bg-[#38BDF8] text-[#020617] font-bold text-xs sm:text-sm transition-all shadow-md"
        >
          <span>Réserver un audit sur site</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
