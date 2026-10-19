'use client';

import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertTriangle, Loader2, Sparkles } from 'lucide-react';

export const EmailTestField: React.FC = () => {
  const [recipient, setRecipient] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message?: string;
    error?: string;
    messageId?: string;
  } | null>(null);

  const handleTestSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setResult(null);

    try {
      const res = await fetch('/api/admin/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipient: recipient.trim() }),
        credentials: 'same-origin',
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setResult({
          success: true,
          message: data.message || 'E-mail de diagnostic envoyé avec succès !',
          messageId: data.messageId,
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
    <div className="p-6 md:p-8 bg-slate-900/90 rounded-2xl border border-slate-800 text-slate-100 shadow-xl max-w-3xl mt-4">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Mail size={24} />
          </div>
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              Tester la Configuration d&apos;Envoi E-mails
              <span className="text-[11px] px-2.5 py-0.5 rounded-full font-semibold bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/20">
                Diagnostic en direct
              </span>
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Envoie instantanément un email de test avec le logo et la charte graphique NOBTECH pour valider vos paramètres SMTP ci-dessus.
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 mb-5 text-xs text-slate-300 space-y-1.5">
        <p className="font-semibold text-white flex items-center gap-1.5">
          <Sparkles size={14} className="text-[#00D4FF]" /> Conseil de configuration :
        </p>
        <p className="text-slate-400 leading-relaxed">
          Pensez à cliquer sur <strong>« Enregistrer »</strong> en haut à droite si vous venez de modifier le serveur SMTP ou le mot de passe avant de lancer le test.
        </p>
      </div>

      <form onSubmit={handleTestSend} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1.5">
            Adresse email destinataire du test (optionnel, par défaut votre email administrateur) :
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="ex: contact@nobtech.fr ou votre-adresse@gmail.com"
              className="flex-1 py-2.5 px-3.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#00D4FF] focus:ring-2 focus:ring-[#00D4FF]/20 font-mono"
            />
            <button
              type="submit"
              disabled={sending}
              className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#0077b6] text-white text-xs font-bold uppercase tracking-wider hover:opacity-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00D4FF]/20 flex-shrink-0"
            >
              {sending ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
              {sending ? 'Envoi du test...' : 'Envoyer un e-mail de test'}
            </button>
          </div>
        </div>
      </form>

      {result && result.success && (
        <div className="mt-5 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-white">{result.message}</p>
            {result.messageId && (
              <p className="text-slate-400 font-mono text-[11px]">
                ID Message : <span className="text-emerald-300">{result.messageId}</span>
              </p>
            )}
            <p className="text-emerald-400/90 text-[11px]">
              Votre serveur SMTP est 100% opérationnel ! Les accusés de réception, alertes de devis et notifications seront délivrés normalement.
            </p>
          </div>
        </div>
      )}

      {result && !result.success && (
        <div className="mt-5 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 text-rose-400 mt-0.5" />
          <div className="space-y-1.5">
            <p className="font-semibold text-white">Échec de connexion ou d&apos;envoi SMTP :</p>
            <p className="font-mono text-[11px] bg-rose-950/50 p-2 rounded border border-rose-900/50 break-all text-rose-200">
              {result.error}
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-1 text-[11px] pt-1">
              <li><strong>Gmail :</strong> Assurez-vous d&apos;utiliser un <em>« Mot de passe d&apos;application »</em> (16 caractères) et non votre mot de passe habituel.</li>
              <li><strong>Port 587 :</strong> Décochez la case <em>« Connexion SSL directe »</em> (STARTTLS).</li>
              <li><strong>Port 465 :</strong> Cochez la case <em>« Connexion SSL directe »</em>.</li>
              <li>Vérifiez que le nom d&apos;utilisateur correspond exactement à l&apos;adresse de votre compte SMTP.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
