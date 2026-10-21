"use client";

import React, { useState } from "react";
import { Download, FileText, CheckCircle2, X, Loader2, Phone, Mail, User, ShieldCheck } from "lucide-react";

interface BrochureDownloadModalProps {
  formationTitle: string;
  formationSlug: string;
  isOpen: boolean;
  onClose: () => void;
}

export function BrochureDownloadModal({
  formationTitle,
  formationSlug,
  isOpen,
  onClose,
}: BrochureDownloadModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Veuillez renseigner votre nom, email et numéro de téléphone.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`/api/formations/${formationSlug}/brochure`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          profileType: "particulier",
        }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Une erreur est survenue lors de l'envoi du programme.");
      }
    } catch {
      setError("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] overflow-y-auto flex min-h-full items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#030712] border border-cyan-500/30 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(0,212,255,0.15)] text-slate-100 overflow-hidden my-auto">
        <div className="h-1.5 w-full bg-[#0284C7]" />
        
        <div className="p-5 sm:p-7">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer z-10"
            aria-label="Fermer"
          >
            <X size={18} />
          </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
            <FileText size={24} />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
              Programme Complet (PDF)
            </span>
            <h3 className="text-lg font-bold text-white leading-tight">
              {formationTitle}
            </h3>
          </div>
        </div>

        {success ? (
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-emerald-500/30 text-center space-y-4 animate-in zoom-in-95 duration-300">
            <div className="relative mx-auto w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
              <div className="relative w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
                <CheckCircle2 size={32} />
              </div>
            </div>

            <div>
              <h4 className="text-lg font-extrabold text-white">Merci pour votre demande {name ? `, ${name}` : ""} !</h4>
              <p className="text-xs text-emerald-400 font-medium mt-1">
                Votre demande de programme a bien été prise en compte.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left space-y-2.5">
              <div className="flex items-start gap-2.5 text-xs text-slate-200">
                <Mail size={16} className="text-cyan-400 mt-0.5 shrink-0" />
                <span>
                  Le programme complet (syllabus &amp; calendrier) a été envoyé à :<br />
                  <strong className="text-white font-semibold underline decoration-cyan-400/50">{email}</strong>
                </span>
              </div>
              <div className="flex items-start gap-2.5 text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                <ShieldCheck size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                <span>
                  <strong className="text-slate-300">Données sécurisées &amp; protégées :</strong> Vos informations sont traitées en stricte conformité avec la CDP (Sénégal) et le RGPD. Aucun spam, aucune revente de données.
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <a
                href={`/api/formations/${formationSlug}/brochure?download=true`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Download size={15} />
                Ouvrir le PDF maintenant
              </a>
              <button
                type="button"
                onClick={() => {
                  setSuccess(false);
                  onClose();
                }}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-all"
              >
                Fermer
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-xs text-slate-300 leading-relaxed mb-5">
              Indiquez votre adresse email pour recevoir immédiatement le programme complet au format PDF (détail des modules, ateliers pratiques sur équipements réels et calendrier).
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
                  {error}
                </div>
              )}

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1.5">
                  Adresse Email <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nom@exemple.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">
                    Nom &amp; Prénom <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex : Ousmane Diallo"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">
                    Téléphone / WhatsApp <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+221 77 000 00 00"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs uppercase tracking-wider hover:opacity-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <FileText size={16} />}
                {loading ? "Envoi du programme en cours..." : "Recevoir le programme complet (PDF)"}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-1">
                <ShieldCheck size={12} className="text-emerald-400" />
                <span>Vos données sont strictement sécurisées (Conformité CDP Sénégal &amp; RGPD).</span>
              </div>
            </form>
          </>
        )}
        </div>
      </div>
    </div>
  );
}
