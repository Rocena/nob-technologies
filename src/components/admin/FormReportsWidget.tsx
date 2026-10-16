'use client';

import React from 'react';
import { FileSpreadsheet, FileText, Download, Printer } from 'lucide-react';

export const FormReportsWidget: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5 mt-2">
      <span className="text-xs font-semibold text-slate-400 mr-1 hidden sm:inline-block">
        Exports &amp; Rapports :
      </span>
      <a
        href="/api/admin/reports/export?format=csv"
        download
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-sm"
        title="Télécharger l'ensemble des formulaires et prospects au format CSV"
      >
        <Download size={13} className="text-[#00D4FF]" />
        <span>CSV</span>
      </a>

      <a
        href="/api/admin/reports/export?format=excel"
        download
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-xs font-semibold text-emerald-300 hover:text-white transition-all shadow-sm"
        title="Ouvrir directement dans Microsoft Excel"
      >
        <FileSpreadsheet size={13} className="text-emerald-400" />
        <span>Excel</span>
      </a>

      <a
        href="/api/admin/reports/export?format=pdf&download=true"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-xs font-semibold text-cyan-300 hover:text-white transition-all shadow-sm"
        title="Ouvrir le rapport d'activité exécutif prêt à imprimer"
      >
        <Printer size={13} className="text-[#00D4FF]" />
        <span>Rapport PDF</span>
      </a>
    </div>
  );
};
