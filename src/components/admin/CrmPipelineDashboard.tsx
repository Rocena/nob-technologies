'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  Kanban,
  FileText,
  Receipt,
  GraduationCap,
  PaperPlaneTilt,
  ArrowRight,
  Plus,
  ArrowsClockwise,
  CheckCircle,
  Printer,
  Certificate,
  ArrowUpRight,
  Globe,
} from '@phosphor-icons/react';

type ActiveBoard = 'quotes' | 'invoices' | 'admissions';

export const CrmPipelineDashboard: React.FC = () => {
  const [activeBoard, setActiveBoard] = useState<ActiveBoard>('quotes');
  const [quotes, setQuotes] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingReport, setSendingReport] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [qRes, iRes, aRes] = await Promise.all([
        fetch('/api/quotes?limit=100&depth=1&sort=-createdAt', { credentials: 'same-origin' }),
        fetch('/api/invoices?limit=100&depth=1&sort=-createdAt', { credentials: 'same-origin' }),
        fetch('/api/admissions?limit=100&depth=0&sort=-createdAt', { credentials: 'same-origin' }),
      ]);

      const [qJson, iJson, aJson] = await Promise.all([
        qRes.ok ? qRes.json() : { docs: [] },
        iRes.ok ? iRes.json() : { docs: [] },
        aRes.ok ? aRes.json() : { docs: [] },
      ]);

      setQuotes(qJson.docs || []);
      setInvoices(iJson.docs || []);
      setAdmissions(aJson.docs || []);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const showToast = (type: 'success' | 'error', text: string) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 4500);
  };

  const updateItemStatus = async (collection: string, id: string | number, status: string) => {
    try {
      const res = await fetch(`/api/${collection}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
        credentials: 'same-origin',
      });
      if (res.ok) {
        showToast('success', 'Statut mis à jour avec succès.');
        loadAll();
      } else {
        showToast('error', 'Impossible de mettre à jour le statut.');
      }
    } catch {
      showToast('error', 'Erreur réseau.');
    }
  };

  const handleConvertQuote = async (quoteId: string | number) => {
    try {
      const res = await fetch('/api/admin/quotes/convert-to-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quoteId }),
        credentials: 'same-origin',
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        showToast('success', data.message || 'Facture créée avec succès !');
        loadAll();
      } else {
        showToast('error', data.error || 'Erreur lors de la conversion.');
      }
    } catch {
      showToast('error', 'Erreur réseau.');
    }
  };

  const handleSendExecutiveReport = async () => {
    try {
      setSendingReport(true);
      const res = await fetch('/api/admin/reports/send-executive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
        credentials: 'same-origin',
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        showToast('success', data.message || 'Rapport exécutif envoyé par email !');
      } else {
        showToast('error', data.error || "Erreur lors de l'envoi du rapport.");
      }
    } catch {
      showToast('error', 'Erreur réseau.');
    } finally {
      setSendingReport(false);
    }
  };

  // KPIs
  const totalQuotesAmount = quotes.reduce((acc, q) => acc + (Number(q.total) || 0), 0);
  const wonQuotesAmount = quotes
    .filter((q) => q.status === 'accepted')
    .reduce((acc, q) => acc + (Number(q.total) || 0), 0);
  const paidInvoicesAmount = invoices
    .filter((i) => i.status === 'paid')
    .reduce((acc, i) => acc + (Number(i.total) || 0), 0);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#020617',
        color: '#f8fafc',
        padding: '84px 28px 110px',
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {/* HEADER */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '28px',
            paddingBottom: '22px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(0, 212, 255, 0.14)',
                  color: '#00D4FF',
                }}
              >
                <Kanban size={22} weight="duotone" />
              </span>
              <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, letterSpacing: '-0.02em' }}>
                Pipeline CRM, Facturation PDF &amp; Certifications
              </h1>
            </div>
            <p style={{ margin: '6px 0 0', fontSize: '13.5px', color: '#94a3b8' }}>
              Pilotage visuel en temps réel des opportunités B2B, factures PDF et attestations NOBTECH Academy.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '9px 15px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#f8fafc',
                fontSize: '12.5px',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <Globe size={16} color="#00D4FF" />
              <span>Voir le site</span>
            </a>

            <button
              type="button"
              onClick={loadAll}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '9px 14px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#cbd5e1',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <ArrowsClockwise size={15} />
              <span>Actualiser</span>
            </button>

            <button
              type="button"
              onClick={handleSendExecutiveReport}
              disabled={sendingReport}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 16px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
                border: 'none',
                color: '#ffffff',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 8px 20px -6px rgba(2, 132, 199, 0.5)',
              }}
            >
              <PaperPlaneTilt size={15} weight="bold" />
              <span>{sendingReport ? 'Envoi du rapport...' : 'Recevoir le Rapport Exécutif par Email'}</span>
            </button>

            <a
              href="/admin/collections/quotes/create"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 15px',
                borderRadius: '12px',
                background: '#00D4FF',
                color: '#020617',
                fontSize: '12.5px',
                fontWeight: 800,
                textDecoration: 'none',
              }}
            >
              <Plus size={15} weight="bold" />
              <span>Nouveau Devis</span>
            </a>
          </div>
        </div>

        {toast && (
          <div
            style={{
              marginBottom: '20px',
              padding: '12px 18px',
              borderRadius: '12px',
              background: toast.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              border: `1px solid ${toast.type === 'success' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`,
              color: toast.type === 'success' ? '#6ee7b7' : '#fca5a5',
              fontSize: '13px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <CheckCircle size={18} weight="fill" />
            <span>{toast.text}</span>
          </div>
        )}

        {/* SUMMARY KPI STRIP */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '14px',
            marginBottom: '26px',
          }}
        >
          <div style={{ padding: '18px 20px', borderRadius: '16px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Pipeline Devis B2B ({quotes.length})
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', marginTop: '6px', fontFamily: 'monospace' }}>
              {totalQuotesAmount.toLocaleString('fr-FR')} FCFA
            </div>
          </div>

          <div style={{ padding: '18px 20px', borderRadius: '16px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(16, 185, 129, 0.22)' }}>
            <div style={{ fontSize: '11.5px', color: '#6ee7b7', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Devis Acceptés / Signés
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#10b981', marginTop: '6px', fontFamily: 'monospace' }}>
              {wonQuotesAmount.toLocaleString('fr-FR')} FCFA
            </div>
          </div>

          <div style={{ padding: '18px 20px', borderRadius: '16px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(0, 212, 255, 0.22)' }}>
            <div style={{ fontSize: '11.5px', color: '#38bdf8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Factures Encaissées ({invoices.filter((i) => i.status === 'paid').length})
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#00D4FF', marginTop: '6px', fontFamily: 'monospace' }}>
              {paidInvoicesAmount.toLocaleString('fr-FR')} FCFA
            </div>
          </div>

          <div style={{ padding: '18px 20px', borderRadius: '16px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Candidatures &amp; Certificats Academy
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', marginTop: '6px' }}>
              {admissions.filter((a) => a.status === 'accepted').length} admis{' '}
              <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>/ {admissions.length} dossiers</span>
            </div>
          </div>
        </div>

        {/* BOARD SELECTOR TABS */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '22px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setActiveBoard('quotes')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              border: activeBoard === 'quotes' ? '1px solid #00D4FF' : '1px solid rgba(255,255,255,0.08)',
              background: activeBoard === 'quotes' ? 'rgba(0, 212, 255, 0.14)' : 'rgba(15, 23, 42, 0.6)',
              color: activeBoard === 'quotes' ? '#00D4FF' : '#94a3b8',
            }}
          >
            <FileText size={17} weight="duotone" />
            <span>Pipeline Devis Commercial ({quotes.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveBoard('invoices')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              border: activeBoard === 'invoices' ? '1px solid #00D4FF' : '1px solid rgba(255,255,255,0.08)',
              background: activeBoard === 'invoices' ? 'rgba(0, 212, 255, 0.14)' : 'rgba(15, 23, 42, 0.6)',
              color: activeBoard === 'invoices' ? '#00D4FF' : '#94a3b8',
            }}
          >
            <Receipt size={17} weight="duotone" />
            <span>Suivi Factures &amp; PDF ({invoices.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveBoard('admissions')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              border: activeBoard === 'admissions' ? '1px solid #00D4FF' : '1px solid rgba(255,255,255,0.08)',
              background: activeBoard === 'admissions' ? 'rgba(0, 212, 255, 0.14)' : 'rgba(15, 23, 42, 0.6)',
              color: activeBoard === 'admissions' ? '#00D4FF' : '#94a3b8',
            }}
          >
            <GraduationCap size={17} weight="duotone" />
            <span>Admissions &amp; Certificats Academy ({admissions.length})</span>
          </button>
        </div>

        {/* KANBAN COLUMNS : QUOTES */}
        {activeBoard === 'quotes' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: '16px',
              alignItems: 'start',
            }}
          >
            {[
              { id: 'draft', title: 'Brouillon / En préparation', color: '#94a3b8', next: 'sent', nextLabel: 'Marquer Envoyé' },
              { id: 'sent', title: 'Envoyé au client', color: '#38bdf8', next: 'accepted', nextLabel: 'Valider (Accepté)' },
              { id: 'accepted', title: 'Accepté & Signé', color: '#10b981', next: null, nextLabel: null },
              { id: 'rejected', title: 'Refusé / Archivé', color: '#f43f5e', next: 'draft', nextLabel: 'Réactiver' },
            ].map((col) => {
              const items = quotes.filter((q) => (q.status || 'draft') === col.id);
              const colTotal = items.reduce((acc, q) => acc + (Number(q.total) || 0), 0);
              return (
                <div
                  key={col.id}
                  style={{
                    background: 'rgba(15, 23, 42, 0.7)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '16px',
                    padding: '16px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: col.color }}>{col.title}</span>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '999px',
                        background: 'rgba(255,255,255,0.08)',
                        color: '#e2e8f0',
                      }}
                    >
                      {items.length}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#64748b', marginBottom: '14px' }}>
                    Total : {colTotal.toLocaleString('fr-FR')} FCFA
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {items.length === 0 ? (
                      <div style={{ padding: '24px 12px', textAlign: 'center', fontSize: '12px', color: '#475569', border: '1px dashed rgba(255,255,255,0.08)', borderRadius: '12px' }}>
                        Aucun devis dans cette étape
                      </div>
                    ) : (
                      items.map((q) => {
                        const cust = typeof q.customer === 'object' ? q.customer : null;
                        return (
                          <div
                            key={q.id}
                            style={{
                              padding: '14px',
                              borderRadius: '12px',
                              background: '#0f172a',
                              border: '1px solid rgba(255,255,255,0.08)',
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                              <span style={{ fontSize: '12px', fontFamily: 'monospace', fontWeight: 700, color: '#00D4FF' }}>
                                {q.quoteNumber}
                              </span>
                              <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#ffffff', fontFamily: 'monospace' }}>
                                {(q.total || 0).toLocaleString('fr-FR')} FCFA
                              </span>
                            </div>
                            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#e2e8f0', marginBottom: '10px' }}>
                              {cust?.companyName || cust?.contactName || 'Client B2B'}
                            </div>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                              <a
                                href={`/document/devis/${q.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  padding: '5px 9px',
                                  borderRadius: '8px',
                                  background: 'rgba(255,255,255,0.06)',
                                  color: '#cbd5e1',
                                  fontSize: '11px',
                                  fontWeight: 600,
                                  textDecoration: 'none',
                                }}
                              >
                                <Printer size={13} /> PDF
                              </a>

                              <a
                                href={`/admin/collections/quotes/${q.id}`}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  padding: '5px 9px',
                                  borderRadius: '8px',
                                  background: 'rgba(255,255,255,0.06)',
                                  color: '#cbd5e1',
                                  fontSize: '11px',
                                  fontWeight: 600,
                                  textDecoration: 'none',
                                }}
                              >
                                <span>Fiche</span> <ArrowUpRight size={12} />
                              </a>

                              {col.next && (
                                <button
                                  type="button"
                                  onClick={() => updateItemStatus('quotes', q.id, col.next!)}
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    padding: '5px 9px',
                                    borderRadius: '8px',
                                    background: 'rgba(0, 212, 255, 0.14)',
                                    border: 'none',
                                    color: '#38bdf8',
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                  }}
                                >
                                  <span>{col.nextLabel}</span> <ArrowRight size={11} />
                                </button>
                              )}

                              {col.id === 'accepted' && (
                                <button
                                  type="button"
                                  onClick={() => handleConvertQuote(q.id)}
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    padding: '5px 9px',
                                    borderRadius: '8px',
                                    background: 'rgba(16, 185, 129, 0.18)',
                                    border: 'none',
                                    color: '#6ee7b7',
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                  }}
                                >
                                  <Receipt size={12} /> Créer Facture
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* KANBAN COLUMNS : INVOICES */}
        {activeBoard === 'invoices' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: '16px',
              alignItems: 'start',
            }}
          >
            {[
              { id: 'draft', title: 'Brouillon / Proforma', color: '#94a3b8', next: 'sent', nextLabel: 'Émettre' },
              { id: 'sent', title: 'En attente de règlement', color: '#38bdf8', next: 'paid', nextLabel: 'Marquer Payée' },
              { id: 'paid', title: 'Acquittée / Payée', color: '#10b981', next: null, nextLabel: null },
              { id: 'overdue', title: 'Échéance dépassée', color: '#f43f5e', next: 'paid', nextLabel: 'Marquer Payée' },
            ].map((col) => {
              const items = invoices.filter((inv) => (inv.status || 'draft') === col.id);
              const colTotal = items.reduce((acc, inv) => acc + (Number(inv.total) || 0), 0);
              return (
                <div
                  key={col.id}
                  style={{
                    background: 'rgba(15, 23, 42, 0.7)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '16px',
                    padding: '16px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: col.color }}>{col.title}</span>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '999px',
                        background: 'rgba(255,255,255,0.08)',
                        color: '#e2e8f0',
                      }}
                    >
                      {items.length}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#64748b', marginBottom: '14px' }}>
                    Total : {colTotal.toLocaleString('fr-FR')} FCFA
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {items.length === 0 ? (
                      <div style={{ padding: '24px 12px', textAlign: 'center', fontSize: '12px', color: '#475569', border: '1px dashed rgba(255,255,255,0.08)', borderRadius: '12px' }}>
                        Aucune facture dans cette étape
                      </div>
                    ) : (
                      items.map((inv) => {
                        const cust = typeof inv.customer === 'object' ? inv.customer : null;
                        return (
                          <div
                            key={inv.id}
                            style={{
                              padding: '14px',
                              borderRadius: '12px',
                              background: '#0f172a',
                              border: '1px solid rgba(255,255,255,0.08)',
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                              <span style={{ fontSize: '12px', fontFamily: 'monospace', fontWeight: 700, color: '#00D4FF' }}>
                                {inv.invoiceNumber}
                              </span>
                              <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#ffffff', fontFamily: 'monospace' }}>
                                {(inv.total || 0).toLocaleString('fr-FR')} FCFA
                              </span>
                            </div>
                            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#e2e8f0', marginBottom: '10px' }}>
                              {cust?.companyName || cust?.contactName || 'Client B2B'}
                            </div>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                              <a
                                href={`/document/facture/${inv.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  padding: '5px 9px',
                                  borderRadius: '8px',
                                  background: 'rgba(255,255,255,0.06)',
                                  color: '#cbd5e1',
                                  fontSize: '11px',
                                  fontWeight: 600,
                                  textDecoration: 'none',
                                }}
                              >
                                <Printer size={13} /> Facture PDF
                              </a>

                              <a
                                href={`/admin/collections/invoices/${inv.id}`}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  padding: '5px 9px',
                                  borderRadius: '8px',
                                  background: 'rgba(255,255,255,0.06)',
                                  color: '#cbd5e1',
                                  fontSize: '11px',
                                  fontWeight: 600,
                                  textDecoration: 'none',
                                }}
                              >
                                <span>Fiche</span> <ArrowUpRight size={12} />
                              </a>

                              {col.next && (
                                <button
                                  type="button"
                                  onClick={() => updateItemStatus('invoices', inv.id, col.next!)}
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    padding: '5px 9px',
                                    borderRadius: '8px',
                                    background: 'rgba(16, 185, 129, 0.16)',
                                    border: 'none',
                                    color: '#6ee7b7',
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                  }}
                                >
                                  <span>{col.nextLabel}</span> <ArrowRight size={11} />
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* KANBAN COLUMNS : ADMISSIONS & CERTIFICATES */}
        {activeBoard === 'admissions' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '16px',
              alignItems: 'start',
            }}
          >
            {[
              { id: 'pending', title: 'Candidatures en attente', color: '#f59e0b' },
              { id: 'accepted', title: 'Admis & Certificats délivrables', color: '#10b981' },
              { id: 'declined', title: 'Candidatures déclinées', color: '#f43f5e' },
            ].map((col) => {
              const items = admissions.filter((a) => (a.status || 'pending') === col.id);
              return (
                <div
                  key={col.id}
                  style={{
                    background: 'rgba(15, 23, 42, 0.7)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '16px',
                    padding: '16px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: col.color }}>{col.title}</span>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '999px',
                        background: 'rgba(255,255,255,0.08)',
                        color: '#e2e8f0',
                      }}
                    >
                      {items.length}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {items.length === 0 ? (
                      <div style={{ padding: '24px 12px', textAlign: 'center', fontSize: '12px', color: '#475569', border: '1px dashed rgba(255,255,255,0.08)', borderRadius: '12px' }}>
                        Aucun candidat dans cette colonne
                      </div>
                    ) : (
                      items.map((adm) => (
                        <div
                          key={adm.id}
                          style={{
                            padding: '14px',
                            borderRadius: '12px',
                            background: '#0f172a',
                            border: '1px solid rgba(255,255,255,0.08)',
                          }}
                        >
                          <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff', marginBottom: '3px' }}>
                            {adm.candidateName}
                          </div>
                          <div style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 600, marginBottom: '4px' }}>
                            {adm.formationTitle}
                          </div>
                          <div style={{ fontSize: '11.5px', color: '#64748b', marginBottom: '10px' }}>
                            {adm.email} • {adm.phone}
                          </div>

                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            <a
                              href={`/document/certificat/${adm.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '5px 10px',
                                borderRadius: '8px',
                                background: 'rgba(0, 212, 255, 0.14)',
                                color: '#38bdf8',
                                fontSize: '11px',
                                fontWeight: 700,
                                textDecoration: 'none',
                              }}
                            >
                              <Certificate size={14} /> Certificat PDF
                            </a>

                            <a
                              href={`/admin/collections/admissions/${adm.id}`}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '5px 10px',
                                borderRadius: '8px',
                                background: 'rgba(255,255,255,0.06)',
                                color: '#cbd5e1',
                                fontSize: '11px',
                                fontWeight: 600,
                                textDecoration: 'none',
                              }}
                            >
                              <span>Dossier complet</span> <ArrowUpRight size={12} />
                            </a>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
