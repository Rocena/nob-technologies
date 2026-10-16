import { NextRequest, NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const payload = await getPayloadClient();
    const reqHeaders = await headers();

    // Authenticate user via payload
    const { user } = await payload.auth({ headers: reqHeaders });
    if (!user) {
      return new NextResponse('Non autorisé. Veuillez vous connecter au back office.', { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const format = (searchParams.get('format') || 'csv').toLowerCase();

    // Fetch all contact messages & form submissions
    const messagesRes = await payload.find({
      collection: 'contact-messages',
      limit: 1000,
      sort: '-createdAt',
    });

    const docs = messagesRes.docs || [];

    // 1. CSV EXPORT (with UTF-8 BOM for Excel)
    if (format === 'csv') {
      const headers = ['ID', 'Date', 'Nom & Prénom', 'Email', 'Téléphone', 'Entreprise', 'Objet / Formation', 'Statut', 'Message'];
      
      const rows = docs.map((d: any) => [
        `"${d.id}"`,
        `"${d.createdAt ? new Date(d.createdAt).toLocaleDateString('fr-FR') : ''}"`,
        `"${(d.name || '').replace(/"/g, '""')}"`,
        `"${(d.email || '').replace(/"/g, '""')}"`,
        `"${(d.phone || '').replace(/"/g, '""')}"`,
        `"${(d.company || '').replace(/"/g, '""')}"`,
        `"${(d.subject || '').replace(/"/g, '""')}"`,
        `"${(d.status || 'new').replace(/"/g, '""')}"`,
        `"${(d.message || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      ]);

      const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\r\n');

      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="rapport-formulaires-nobtech-${new Date().toISOString().slice(0, 10)}.csv"`,
        },
      });
    }

    // 2. EXCEL COMPATIBLE TSV / CSV
    if (format === 'excel' || format === 'xlsx') {
      const headers = ['ID', 'Date', 'Nom & Prénom', 'Email', 'Téléphone', 'Entreprise', 'Objet / Formation', 'Statut', 'Message'];
      
      const rows = docs.map((d: any) => [
        d.id,
        d.createdAt ? new Date(d.createdAt).toLocaleDateString('fr-FR') : '',
        (d.name || '').replace(/\t/g, ' '),
        (d.email || '').replace(/\t/g, ' '),
        (d.phone || '').replace(/\t/g, ' '),
        (d.company || '').replace(/\t/g, ' '),
        (d.subject || '').replace(/\t/g, ' '),
        d.status || 'new',
        (d.message || '').replace(/\t/g, ' ').replace(/\n/g, ' '),
      ]);

      const tsvContent = '\uFEFF' + [headers.join('\t'), ...rows.map((r) => r.join('\t'))].join('\r\n');

      return new NextResponse(tsvContent, {
        headers: {
          'Content-Type': 'application/vnd.ms-excel; charset=utf-8',
          'Content-Disposition': `attachment; filename="export-formulaires-nobtech-${new Date().toISOString().slice(0, 10)}.xls"`,
        },
      });
    }

    // 3. PDF EXECUTIVE REPORT (Print-optimized HTML document)
    const newCount = docs.filter((d: any) => d.status === 'new').length;
    const repliedCount = docs.filter((d: any) => d.status === 'replied').length;
    const totalCount = docs.length;

    const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Rapport d'Activité & Formulaires | NOB TECHNOLOGIES</title>
  <style>
    @page { size: A4 landscape; margin: 15mm; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    body { font-family: -apple-system, Arial, sans-serif; color: #0f172a; margin: 0; padding: 20px; font-size: 10pt; background: #fff; }
    .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #00d4ff; padding-bottom: 12px; margin-bottom: 20px; }
    .logo { font-size: 18pt; font-weight: 900; color: #0284c7; }
    .meta { text-align: right; font-size: 8.5pt; color: #64748b; }
    .kpi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 24px; }
    .kpi-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; }
    .kpi-val { font-size: 20pt; font-weight: 800; color: #0f172a; }
    .kpi-label { font-size: 8pt; color: #64748b; text-transform: uppercase; font-weight: 600; }
    table { width: 100%; border-collapse: collapse; font-size: 8.5pt; margin-top: 10px; }
    th { background: #0f172a; color: #ffffff; text-align: left; padding: 8px 10px; font-weight: 700; text-transform: uppercase; font-size: 7.5pt; }
    td { padding: 8px 10px; border-bottom: 1px solid #e2e8f0; color: #334155; }
    tr:nth-child(even) td { background: #f8fafc; }
    .badge-new { background: #fef3c7; color: #92400e; padding: 2px 6px; border-radius: 4px; font-weight: 700; font-size: 7pt; }
    .badge-replied { background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-weight: 700; font-size: 7pt; }
    .footer { margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 10px; font-size: 8pt; color: #64748b; display: flex; justify-content: space-between; }
    .actions { position: fixed; top: 15px; right: 20px; z-index: 999; }
    .btn { background: #0284c7; color: #fff; border: none; padding: 8px 16px; border-radius: 20px; font-weight: 700; cursor: pointer; }
    @media print { .actions { display: none !important; } }
  </style>
</head>
<body>
  <div class="actions">
    <button class="btn" onclick="window.print()">Imprimer / Enregistrer en PDF</button>
  </div>

  <div class="header">
    <div>
      <div class="logo">NOB TECHNOLOGIES</div>
      <div style="font-size: 11pt; font-weight: 700; margin-top: 2px;">Rapport Consolidé des Formulaires &amp; Demandes Web</div>
    </div>
    <div class="meta">
      Généré le : ${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}<br>
      Plateforme : NOBTECH OS v3.9 • Siège Dakar
    </div>
  </div>

  <div class="kpi-grid">
    <div class="kpi-card">
      <div class="kpi-val">${totalCount}</div>
      <div class="kpi-label">Total des demandes reçues</div>
    </div>
    <div class="kpi-card" style="border-left: 3px solid #f59e0b;">
      <div class="kpi-val" style="color: #d97706;">${newCount}</div>
      <div class="kpi-label">Nouvelles demandes à traiter</div>
    </div>
    <div class="kpi-card" style="border-left: 3px solid #10b981;">
      <div class="kpi-val" style="color: #059669;">${repliedCount}</div>
      <div class="kpi-label">Demandes traitées &amp; répondues</div>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width: 75px;">Date</th>
        <th style="width: 140px;">Contact</th>
        <th style="width: 160px;">Coordonnées</th>
        <th style="width: 110px;">Organisation</th>
        <th>Objet / Formation</th>
        <th style="width: 80px;">Statut</th>
      </tr>
    </thead>
    <tbody>
      ${docs.map((d: any) => `
        <tr>
          <td>${d.createdAt ? new Date(d.createdAt).toLocaleDateString('fr-FR') : '—'}</td>
          <td><strong>${d.name || 'Visiteur'}</strong></td>
          <td>${d.email || ''}<br><span style="color: #64748b;">${d.phone || 'Sans tel'}</span></td>
          <td>${d.company || 'Particulier'}</td>
          <td><strong>${d.subject || 'Contact'}</strong><div style="font-size: 7.5pt; color: #64748b; margin-top: 2px;">${(d.message || '').slice(0, 90)}...</div></td>
          <td><span class="${d.status === 'replied' ? 'badge-replied' : 'badge-new'}">${d.status === 'replied' ? 'RÉPONDU' : 'NOUVEAU'}</span></td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <div class="footer">
    <div>NOB TECHNOLOGIES — Rapport confidentiel d'exploitation commerciale.</div>
    <div>Page 1 • Total : ${totalCount} enregistrement(s)</div>
  </div>

  <script>
    if (window.location.search.includes('download=true')) {
      window.addEventListener('load', () => setTimeout(() => window.print(), 500));
    }
  </script>
</body>
</html>`;

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch (error: any) {
    return new NextResponse(`Erreur: ${error?.message}`, { status: 500 });
  }
}
