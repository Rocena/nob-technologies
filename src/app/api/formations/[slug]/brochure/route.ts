import { NextRequest, NextResponse } from "next/server";
import { getFormationBySlug } from "@/lib/formations";
import { getPayloadClient } from "@/lib/payload";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const formation = await getFormationBySlug(slug);

    if (!formation) {
      return NextResponse.json({ error: "Formation introuvable" }, { status: 404 });
    }

    const body = await req.json().catch(() => ({}));
    const { name, email, phone, profileType } = body;

    // Sauvegarde immédiate du lead dans le CRM / Formulaires
    if (email) {
      try {
        const payload = await getPayloadClient();
        await payload.create({
          collection: "contact-messages",
          data: {
            name: name || "Prospect Brochure",
            email: email,
            phone: phone || "",
            company: profileType === "entreprise" ? "Entreprise / DSI" : "Particulier",
            subject: `[Brochure PDF] ${formation.title}`,
            message: `Demande de téléchargement de la brochure complète pour la formation : ${formation.title} (${formation.duration}). Profil : ${profileType || "Particulier"}. Téléphone : ${phone || "Non renseigné"}.`,
            status: "new",
          },
        });
      } catch (err) {
        console.warn("Erreur enregistrement lead brochure:", err);
      }
    }

    return NextResponse.json({ success: true, brochureUrl: `/api/formations/${slug}/brochure?download=true` });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Erreur serveur" }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const formation = await getFormationBySlug(slug);

  if (!formation) {
    return new NextResponse("Formation introuvable", { status: 404 });
  }

  const pricing = formation.pricing || {
    publicPrice: 245000,
    launchPrice: 199000,
    includedInPrice: [
      "Labs sur matériel physique réel à Dakar",
      "Simulations d'examens officielles chronométrées",
      "Mentorat par des ingénieurs certifiés en activité",
      "Soutenance de projet devant jury professionnel",
      "Certificat d'excellence officiel NOB TECHNOLOGIES vérifiable",
      "Méthodologie active (80% pratique terrain, 20% théorie)",
    ],
  };

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Brochure Officielle - ${formation.title} | NOB TECHNOLOGIES</title>
  <style>
    @page {
      size: A4;
      margin: 15mm 15mm 20mm 15mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 0;
      font-size: 11pt;
      line-height: 1.5;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #00d4ff;
      padding-bottom: 12px;
      margin-bottom: 20px;
    }
    .logo-box {
      font-size: 20pt;
      font-weight: 900;
      letter-spacing: -0.5px;
      color: #0284c7;
    }
    .logo-box span {
      color: #0f172a;
    }
    .company-meta {
      text-align: right;
      font-size: 8pt;
      color: #64748b;
      line-height: 1.3;
    }
    .badge {
      display: inline-block;
      background: #e0f2fe;
      color: #0369a1;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 8pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
    }
    h1 {
      font-size: 18pt;
      color: #0f172a;
      margin: 0 0 8px 0;
      line-height: 1.2;
    }
    .desc {
      font-size: 10pt;
      color: #334155;
      margin-bottom: 16px;
    }
    .specs-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 14px;
      margin-bottom: 20px;
    }
    .spec-item {
      font-size: 9pt;
    }
    .spec-label {
      color: #64748b;
      font-size: 8pt;
      text-transform: uppercase;
      font-weight: 600;
    }
    .spec-val {
      font-weight: 700;
      color: #0f172a;
    }
    .pricing-card {
      background: #f0fdf4;
      border: 1px solid #86efac;
      border-radius: 8px;
      padding: 14px;
      margin-bottom: 20px;
    }
    .price-row {
      display: flex;
      align-items: baseline;
      gap: 12px;
      margin-bottom: 6px;
    }
    .strikethrough-price {
      text-decoration: line-through;
      color: #ef4444;
      font-size: 12pt;
      font-weight: 700;
    }
    .final-price {
      color: #15803d;
      font-size: 18pt;
      font-weight: 900;
    }
    .payment-plan {
      font-size: 9pt;
      color: #166534;
      font-weight: 600;
      margin-top: 4px;
    }
    .inclusions-title {
      font-size: 9pt;
      font-weight: 700;
      text-transform: uppercase;
      color: #1e293b;
      margin: 10px 0 6px 0;
    }
    .inclusions-list {
      margin: 0;
      padding-left: 18px;
      font-size: 8.5pt;
      color: #334155;
    }
    .salary-box {
      background: #f8fafc;
      border-left: 3px solid #0284c7;
      padding: 10px 14px;
      margin-bottom: 20px;
      font-size: 9pt;
    }
    .salary-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      margin-top: 6px;
    }
    .module-card {
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 10px 12px;
      margin-bottom: 10px;
      page-break-inside: avoid;
    }
    .module-header {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 4px;
      margin-bottom: 6px;
      font-size: 9pt;
      font-weight: 700;
      color: #0369a1;
    }
    .module-title {
      font-size: 10pt;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 4px;
    }
    .module-lab {
      background: #f1f5f9;
      padding: 6px 8px;
      border-radius: 4px;
      font-size: 8.5pt;
      color: #1e293b;
      margin-top: 6px;
    }
    .footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 10px;
      margin-top: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7.5pt;
      color: #64748b;
    }
    .actions-bar {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #0f172a;
      color: white;
      padding: 12px 20px;
      border-radius: 50px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
      display: flex;
      gap: 12px;
      z-index: 9999;
    }
    .btn-print {
      background: #00d4ff;
      color: #020617;
      border: none;
      padding: 8px 16px;
      border-radius: 20px;
      font-weight: 700;
      cursor: pointer;
    }
    @media print {
      .actions-bar { display: none !important; }
    }
  </style>
</head>
<body>

  <div class="actions-bar">
    <span style="font-size: 13px; display: flex; align-items: center;">Brochure officielle prête à l'impression</span>
    <button class="btn-print" onclick="window.print()">Imprimer / Télécharger en PDF</button>
  </div>

  <!-- HEADER OFFICIEL -->
  <div class="header">
    <div class="logo-box">
      NOB <span>TECHNOLOGIES</span>
    </div>
    <div class="company-meta">
      <strong>NOB TECHNOLOGIES S.A.R.L</strong><br>
      Route de l'Aéroport Léopold Sédar Senghor, Lot N°79 — Dakar, Sénégal<br>
      Tél : +221 77 301 08 38 / +221 33 814 04 35<br>
      Email : contact@nobtech.fr • Web : www.nobtech.fr
    </div>
  </div>

  <!-- TITRE ET ACCROCHE -->
  <div class="badge">${formation.badge || "PROGRAMME CERTIFIANT"}</div>
  <h1>${formation.title}</h1>
  <p class="desc">${formation.shortDesc}</p>

  <!-- SPECIFICATIONS -->
  <div class="specs-grid">
    <div class="spec-item">
      <div class="spec-label">Durée & Volume</div>
      <div class="spec-val">${formation.duration} (${formation.hours})</div>
    </div>
    <div class="spec-item">
      <div class="spec-label">Rythme des cours</div>
      <div class="spec-val">${formation.pace || "Max 6h / semaine (soirs ou samedis)"}</div>
    </div>
    <div class="spec-item">
      <div class="spec-label">Format Pédagogique</div>
      <div class="spec-val">Présentiel Dakar (Labs réels) + Accès Cloud</div>
    </div>
  </div>

  <!-- TARIF & INCLUSIONS (MARKETING PSYCHOLOGY) -->
  <div class="pricing-card">
    <div style="font-size: 8.5pt; font-weight: 800; text-transform: uppercase; color: #166534; margin-bottom: 4px;">
      Tarification Officielle & Offre de Lancement
    </div>
    <div class="price-row">
      <span class="strikethrough-price">${pricing.publicPrice.toLocaleString("fr-FR")} FCFA</span>
      <span class="final-price">${pricing.launchPrice.toLocaleString("fr-FR")} FCFA</span>
      ${pricing.launchSpots ? `<span style="font-size: 8.5pt; background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; font-weight: 700;">Limité aux ${pricing.launchSpots} premières inscriptions</span>` : ""}
    </div>
    ${pricing.paymentPlan ? `<div class="payment-plan">Facilité de paiement : ${pricing.paymentPlan}</div>` : ""}
    ${pricing.note ? `<div style="font-size: 8pt; color: #64748b; margin-top: 2px;">* ${pricing.note}</div>` : ""}

    <div class="inclusions-title">Inclus dans la formation (Garantie Qualité & Excellence) :</div>
    <ul class="inclusions-list">
      ${(pricing.includedInPrice || []).map((inc: string) => `<li><strong>✓</strong> ${inc}</li>`).join("")}
    </ul>
  </div>

  <!-- REMUNERATION ET DEBOUCHES AU SENEGAL -->
  ${formation.career ? `
  <div class="salary-box">
    <strong>Débouchés & Salaires Mensuels Estimés au Sénégal :</strong>
    <div class="salary-grid">
      <div><strong>Junior (0-2 ans) :</strong><br>${formation.career.salarySenegal.junior}</div>
      <div><strong>Confirmé (2-5 ans) :</strong><br>${formation.career.salarySenegal.intermediate}</div>
      <div><strong>Senior / Lead :</strong><br>${formation.career.salarySenegal.senior}</div>
    </div>
    <div style="font-size: 8pt; color: #64748b; margin-top: 6px;">
      Postes visés : ${formation.career.targetRoles.map((r: any) => r.title).join(", ")}.
    </div>
  </div>
  ` : ""}

  <!-- PROGRAMME MOIS PAR MOIS -->
  <h2 style="font-size: 13pt; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin: 18px 0 12px 0;">
    Programme Détaillé des Modules d'Études
  </h2>

  ${formation.months.map((m: any) => `
    <div class="module-card">
      <div class="module-header">
        <span>Module ${m.month} : ${m.duration}</span>
        <span>Pratique & Validation</span>
      </div>
      <div class="module-title">${m.title}</div>
      <div style="font-size: 8.5pt; color: #475569; margin-bottom: 4px;"><strong>Objectif :</strong> ${m.objectives}</div>
      <div style="font-size: 8.5pt; color: #334155;"><strong>Compétences abordées :</strong> ${m.topics.join(" • ")}</div>
      <div class="module-lab">
        <strong>Atelier Pratique Lab :</strong> ${m.practicalLab}<br>
        <strong>Livrable attendu :</strong> ${m.deliverable}
      </div>
    </div>
  `).join("")}

  <!-- FOOTER OFFICIEL -->
  <div class="footer">
    <div>
      Document officiel délivré par la direction pédagogique de NOB TECHNOLOGIES.<br>
      Toute reproduction intégrale ou partielle sans accord préalable est interdite.
    </div>
    <div style="text-align: right;">
      Validité de l'offre : Session en cours • Inscriptions au standard : +221 77 301 08 38
    </div>
  </div>

  <script>
    // Si download=true, déclenche l'impression automatiquement
    if (window.location.search.includes('download=true')) {
      window.addEventListener('load', () => {
        setTimeout(() => window.print(), 600);
      });
    }
  </script>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
