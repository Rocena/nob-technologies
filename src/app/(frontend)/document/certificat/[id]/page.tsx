import React from 'react';
import { notFound } from 'next/navigation';
import { getPayloadClient } from '@/lib/payload';
import { DocumentPrintBar } from '@/components/DocumentPrintBar';

export default async function CertificatePDFPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const payload = await getPayloadClient();

  let admission: any;
  try {
    admission = await payload.findByID({
      collection: 'admissions',
      id,
      depth: 0,
    });
  } catch {
    return notFound();
  }

  if (!admission) return notFound();

  const year = new Date(admission.createdAt || Date.now()).getFullYear();
  const certCode = `NOB-CERT-${year}-${String(admission.id).padStart(4, '0').toUpperCase()}`;
  const issueDate = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#020617',
        padding: '48px 20px 110px',
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @page { size: A4 landscape; margin: 0; }
            @media print {
              body, html { background: #ffffff !important; margin: 0 !important; padding: 0 !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
              .no-print, header, footer { display: none !important; }
              .cert-sheet { box-shadow: none !important; margin: 0 auto !important; width: 100% !important; max-width: 100% !important; border-radius: 0 !important; }
            }
          `,
        }}
      />

      <div
        className="cert-sheet"
        style={{
          width: '100%',
          maxWidth: '1040px',
          background: '#ffffff',
          borderRadius: '24px',
          padding: '18px',
          boxShadow: '0 30px 90px rgba(0, 212, 255, 0.18)',
          position: 'relative',
        }}
      >
        {/* Inner Ornate Corporate Frame */}
        <div
          style={{
            border: '2px solid #0284C7',
            borderRadius: '18px',
            padding: '48px 56px',
            position: 'relative',
            overflow: 'hidden',
            background: 'radial-gradient(circle at 90% 10%, rgba(0, 212, 255, 0.06), transparent 45%), #ffffff',
          }}
        >
          {/* Top Corner Accent */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '8px',
              background: 'linear-gradient(90deg, #0f172a 0%, #0284C7 50%, #10E760 100%)',
            }}
          />

          {/* Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '36px',
              borderBottom: '1px solid #e2e8f0',
              paddingBottom: '24px',
            }}
          >
            <div>
              <div style={{ fontSize: '26px', fontWeight: 900, letterSpacing: '-0.03em', color: '#0f172a' }}>
                NOB <span style={{ color: '#0284C7' }}>TECHNOLOGIES</span>
              </div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', letterSpacing: '0.16em', textTransform: 'uppercase', marginTop: '4px' }}>
                NOBTECH ACADEMY • CENTRE D&apos;EXCELLENCE &amp; INGÉNIERIE IT
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '10.5px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Identifiant Officiel
              </div>
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  fontWeight: 800,
                  color: '#0284C7',
                  background: '#f0f9ff',
                  border: '1px solid #bae6fd',
                  padding: '4px 12px',
                  borderRadius: '8px',
                  marginTop: '4px',
                }}
              >
                {certCode}
              </div>
            </div>
          </div>

          {/* Center Body */}
          <div style={{ textAlign: 'center', padding: '10px 0 28px' }}>
            <div
              style={{
                display: 'inline-block',
                fontSize: '12px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.24em',
                color: '#0284C7',
                marginBottom: '12px',
              }}
            >
              ATTESTATION OFFICIELLE DE RÉUSSITE &amp; DE COMPÉTENCES
            </div>

            <p style={{ margin: '0 0 14px', fontSize: '15px', color: '#475569' }}>
              La Direction Générale et le Conseil Pédagogique de <strong>NOB TECHNOLOGIES</strong> certifient que :
            </p>

            <h1
              style={{
                margin: '0 0 18px',
                fontSize: '40px',
                fontWeight: 900,
                color: '#0f172a',
                letterSpacing: '-0.02em',
                borderBottom: '2px solid #e2e8f0',
                display: 'inline-block',
                padding: '0 32px 10px',
              }}
            >
              {admission.candidateName}
            </h1>

            <p style={{ margin: '0 auto 14px', fontSize: '15.5px', color: '#334155', maxWidth: '720px', lineHeight: 1.6 }}>
              a suivi avec succès et validé les évaluations pratiques et techniques du programme de formation professionnelle :
            </p>

            <div
              style={{
                margin: '16px auto 20px',
                padding: '16px 32px',
                background: 'linear-gradient(135deg, #0f172a 0%, #0c4a6e 100%)',
                color: '#ffffff',
                borderRadius: '14px',
                display: 'inline-block',
                fontSize: '22px',
                fontWeight: 800,
                letterSpacing: '-0.01em',
                boxShadow: '0 12px 28px -8px rgba(2, 132, 199, 0.35)',
              }}
            >
              {admission.formationTitle}
            </div>

            <div style={{ fontSize: '13.5px', color: '#64748b', fontWeight: 600 }}>
              Promotion / Session : <strong style={{ color: '#0f172a' }}>{admission.targetSession || 'Session Certifiante'}</strong>
            </div>
          </div>

          {/* Footer Signatures & Seal */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              alignItems: 'end',
              gap: '24px',
              marginTop: '24px',
              paddingTop: '28px',
              borderTop: '1px solid #e2e8f0',
            }}
          >
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Fait à Dakar, Sénégal
              </div>
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>
                Délivré le {issueDate}
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '6px' }}>
                Vérifiable auprès de NOB TECHNOLOGIES ({certCode})
              </div>
            </div>

            {/* Official Seal Badge */}
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '92px',
                  height: '92px',
                  borderRadius: '50%',
                  border: '3px double #0284C7',
                  background: '#f0f9ff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  color: '#0369a1',
                }}
              >
                <span style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.1em' }}>CERTIFIÉ</span>
                <span style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a' }}>NOBTECH</span>
                <span style={{ fontSize: '8.5px', fontWeight: 700, color: '#0284C7' }}>ACADEMY</span>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Pour NOB TECHNOLOGIES
              </div>
              <div
                style={{
                  fontFamily: 'Georgia, serif',
                  fontStyle: 'italic',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#0284C7',
                  marginTop: '8px',
                }}
              >
                La Direction Générale
              </div>
              <div style={{ fontSize: '11.5px', color: '#475569', marginTop: '2px' }}>
                Signature &amp; Cachet Officiel
              </div>
            </div>
          </div>
        </div>
      </div>

      <DocumentPrintBar
        title={`Imprimer le Certificat ${certCode}`}
        backHref={`/admin/collections/admissions/${admission.id}`}
      />
    </div>
  );
}
