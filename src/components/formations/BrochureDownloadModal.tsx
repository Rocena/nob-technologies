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
        // Ouvre le PDF / Brochure imprimable dans un nouvel onglet
        window.open(`/api/formations/${formationSlug}/brochure?download=true`, "_blank");
        setTimeout(() => {
          onClose();
          setSuccess(false);
        }, 2500);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
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
              Brochure Officielle PDF
            </span>
            <h3 className="text-lg font-bold text-white leading-tight">
              {formationTitle}
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-6">
          Recevez instantanément la plaquette complète au format PDF : programme détaillé des modules, grille tarifaire, facilités de paiement échelonné et dates des prochaines rentrées à Dakar.
        </p>

        {success ? (
          <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
            <CheckCircle2 size={40} className="text-emerald-400 mx-auto" />
            <h4 className="text-base font-bold text-white">Brochure générée avec succès !</h4>
            <p className="text-xs text-slate-300">
              Le document s&apos;ouvre dans votre navigateur. Vous pouvez également l&apos;enregistrer ou l&apos;imprimer directement.
            </p>
          </div>
        ) : (
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
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
              {loading ? "Génération de la brochure..." : "Télécharger la brochure PDF complète"}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-1">
              <ShieldCheck size={12} className="text-emerald-400" />
              <span>Vos coordonnées sont strictement confidentielles (Politique RGPD &amp; CDP Sénégal).</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
