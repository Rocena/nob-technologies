'use client';

import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertTriangle, Loader2, Sparkles, FileText, CheckCheck, XCircle, Bell } from 'lucide-react';

const TEMPLATE_OPTIONS = [
  {
    id: 'diagnostic',
    label: 'Diagnostic SMTP Standard',
    description: 'Vérifie la liaison brute avec le serveur SMTP et les identifiants d\'authentification.',
    icon: Mail,
  },
  {
    id: 'ack',
    label: 'Modèle 1 : Accusé de réception Client',
    description: 'Teste l\'email officiel envoyé instantanément au client après soumission d\'un formulaire.',
    icon: CheckCheck,
  },
  {
    id: 'admin_notify',
    label: 'Modèle 2 : Notification Alerte Administrateur',
    description: 'Teste l\'alerte haute priorité transmise aux administrateurs avec récapitulatif.',
    icon: Bell,
  },
  {
    id: 'admission_accepted',
    label: 'Modèle 3 : Candidature Formation — Admission Validée',
    description: 'Teste l\'email d\'acceptation officiel avec la session, cohorte et félicitations.',
    icon: CheckCircle2,
  },
  {
    id: 'admission_declined',
    label: 'Modèle 4 : Candidature Formation — Non Retenue / Reportée',
    description: 'Teste l\'email bienveillant de refus ou de mise en liste d\'attente.',
    icon: XCircle,
  },
  {
    id: 'quote',
    label: 'Modèle 5 : Envoi de Devis Commercial Officiel',
    description: 'Teste l\'email accompagnant un devis chiffré avec le lien de téléchargement PDF.',
    icon: FileText,
  },
];

export const EmailTestField: React.FC = () => {
  const [recipient, setRecipient] = useState('');
  const [templateType, setTemplateType] = useState('diagnostic');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message?: string;
    error?: string;
    messageId?: string;
    templateTested?: string;
  } | null>(null);

  const selectedTemplate = TEMPLATE_OPTIONS.find((t) => t.id === templateType) || TEMPLATE_OPTIONS[0];

  const handleTestSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setResult(null);

    try {
      const res = await fetch('/api/admin/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient: recipient.trim(),
          templateType: templateType,
        }),
        credentials: 'same-origin',
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setResult({
          success: true,
          message: data.message || 'E-mail de test envoyé avec succès !',
          messageId: data.messageId,
          templateTested: selectedTemplate.label,
        });
      } else {
        setResult({
          success: false,
          error: data.error || 'Erreur lors de l’envoi de l’e-mail de test. Vérifiez vos identifiants SMTP.',
        });
      }
    } catch (err: any) {
      setResult({
        success: false,
        error: err?.message || 'Erreur réseau lors de la communication avec le serveur.',
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="p-6 md:p-8 bg-slate-900/95 rounded-2xl border border-slate-800 text-slate-100 shadow-xl max-w-4xl mt-4">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-500/10 text-[#00D4FF] border border-blue-500/20">
            <Mail size={24} />
          </div>
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              Tester l&apos;Envoi &amp; les Modèles d&apos;E-mails
              <span className="text-[11px] px-2.5 py-0.5 rounded-full font-semibold bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/20">
                Outil en direct
              </span>
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Envoyez un e-mail réel pour vérifier votre serveur SMTP ou prévisualiser le rendu des modèles personnalisés configurés dans le back-office.
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 mb-5 text-xs text-slate-300 space-y-1.5">
        <p className="font-semibold text-white flex items-center gap-1.5">
          <Sparkles size={14} className="text-[#00D4FF]" /> Conseil de test :
        </p>
        <p className="text-slate-400 leading-relaxed">
          Si vous venez de modifier un paramètre SMTP ou le texte d&apos;un modèle d&apos;e-mail, cliquez d&apos;abord sur <strong>« Enregistrer »</strong> en haut à droite pour sauvegarder vos modifications avant d&apos;effectuer le test.
        </p>
      </div>

      <form onSubmit={handleTestSend} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Choisir le modèle d&apos;e-mail à tester :
            </label>
            <select
              value={templateType}
              onChange={(e) => setTemplateType(e.target.value)}
              className="w-full py-2.5 px-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-[#00D4FF] focus:ring-2 focus:ring-[#00D4FF]/20 font-medium"
            >
              {TEMPLATE_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id} className="bg-slate-900 text-white py-1">
                  {opt.label}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-400 mt-1.5 italic">
              {selectedTemplate.description}
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Adresse email destinataire du test :
            </label>
            <input
              type="email"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="ex: contact@nobtech.fr ou votre-email@gmail.com"
              className="w-full py-2.5 px-3.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#00D4FF] focus:ring-2 focus:ring-[#00D4FF]/20 font-mono"
            />
            <p className="text-[11px] text-slate-400 mt-1.5">
              Laissez vide pour envoyer par défaut à votre adresse administrateur connectée.
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={sending}
            className="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#0077b6] text-white text-xs font-bold uppercase tracking-wider hover:opacity-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00D4FF]/20"
          >
            {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            {sending ? 'Génération & envoi du test...' : `Envoyer le test (${selectedTemplate.label.split(':')[0].trim()})`}
          </button>
        </div>
      </form>

      {result && result.success && (
        <div className="mt-5 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-white">{result.message}</p>
            {result.templateTested && (
              <p className="text-slate-300 text-[11px]">
                Modèle validé : <span className="text-emerald-400 font-semibold">{result.templateTested}</span>
              </p>
            )}
            {result.messageId && (
              <p className="text-slate-400 font-mono text-[11px]">
                Identifiant du message SMTP : <span className="text-emerald-300">{result.messageId}</span>
              </p>
            )}
            <p className="text-emerald-400/90 text-[11px]">
              Votre configuration SMTP et la génération du template sont 100% opérationnelles !
            </p>
          </div>
        </div>
      )}

      {result && !result.success && (
        <div className="mt-5 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 text-rose-400 mt-0.5" />
          <div className="space-y-1.5">
            <p className="font-semibold text-white">Échec de connexion ou d&apos;envoi SMTP :</p>
            <p className="font-mono text-[11px] bg-rose-950/50 p-2.5 rounded-lg border border-rose-900/50 break-all text-rose-200">
              {result.error}
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-1 text-[11px] pt-1">
              <li><strong>Gmail :</strong> Vous devez impérativement générer un <em>« Mot de passe d&apos;application »</em> (16 caractères) dans votre compte Google (Sécurité &gt; Validation en 2 étapes &gt; Mots de passe des applications).</li>
              <li><strong>Port 587 :</strong> Laissez la case <em>« Connexion SSL directe »</em> <strong>décochée</strong> (STARTTLS).</li>
              <li><strong>Port 465 :</strong> Cochez la case <em>« Connexion SSL directe »</em>.</li>
              <li>Vérifiez que le champ <em>Utilisateur SMTP</em> contient bien l&apos;adresse email complète.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
