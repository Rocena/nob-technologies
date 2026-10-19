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
  const [profileType, setProfileType] = useState<"particulier" | "entreprise">("particulier");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !phone) {
      setError("Veuillez renseigner votre email et numéro de téléphone.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`/api/formations/${formationSlug}/brochure`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || "Visiteur",
          email: email.trim(),
          phone: phone.trim(),
          profileType,
        }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Une erreur est survenue lors de la génération.");
      }
    } catch {
      setError("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <FileText size={24} />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
              Syllabus &amp; Programme Complet
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
                  Le syllabus complet ainsi que la grille tarifaire ont été envoyés à :<br />
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
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Renseignez votre email pour recevoir directement le syllabus officiel complet (curriculum détaillé des modules, ateliers pratiques sur baie physique, tarif avec facilité de paiement et débouchés au Sénégal).
            </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
                {error}
              </div>
            )}

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1.5">
                Nom &amp; Prénom
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex : Ousmane Diallo"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    placeholder="nom@domaine.sn"
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

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1.5">
                Vous vous inscrivez en tant que :
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setProfileType("particulier")}
                  className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                    profileType === "particulier"
                      ? "bg-cyan-500/20 border-cyan-400 text-white font-semibold"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  Particulier / Salarié
                </button>
                <button
                  type="button"
                  onClick={() => setProfileType("entreprise")}
                  className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                    profileType === "entreprise"
                      ? "bg-cyan-500/20 border-cyan-400 text-white font-semibold"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  Entreprise / Direction IT
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760] text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <FileText size={16} />}
              {loading ? "Envoi du programme complet en cours..." : "Recevoir le programme complet par email"}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-1">
              <ShieldCheck size={12} className="text-emerald-400" />
              <span>Vos coordonnées sont strictement confidentielles (Politique RGPD &amp; CDP Sénégal).</span>
            </div>
          </form>
          </>
        )}
      </div>
    </div>
  );
}
