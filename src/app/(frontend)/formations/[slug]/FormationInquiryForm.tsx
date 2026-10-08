"use client";

import React, { useState, useActionState, useEffect } from "react";
import { submitContactForm } from "@/app/(frontend)/contact/actions";
import { FormSuccessMessage } from "@/components/FormSuccessMessage";
import { Send, Loader2, Sparkles, User, Mail, Phone, Building, Calendar, HelpCircle } from "lucide-react";
import { useEngineerModal } from "@/components/EngineerModalContext";

interface FormationInquiryFormProps {
  formationTitle: string;
  formationSlug: string;
}

export function FormationInquiryForm({ formationTitle, formationSlug }: FormationInquiryFormProps) {
  const [state, formAction, isPending] = useActionState(submitContactForm, null);
  const [captchaA, setCaptchaA] = useState(3);
  const [captchaB, setCaptchaB] = useState(4);
  const { openQuoteModal } = useEngineerModal();

  useEffect(() => {
    setCaptchaA(Math.floor(Math.random() * 8) + 2);
    setCaptchaB(Math.floor(Math.random() * 8) + 1);
  }, []);

  if (state?.success) {
    return (
      <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
        <FormSuccessMessage
          onReset={() => {
            window.location.reload();
          }}
        />
      </div>
    );
  }

  return (
    <div id="candidature" className="bg-slate-900/90 border border-cyan-500/20 rounded-2xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 uppercase">
            <Sparkles className="w-3 h-3" /> CANDIDATURE &bull; PROMOTION 2026
          </span>
          <button
            type="button"
            onClick={() => openQuoteModal(`Formation: ${formationTitle}`)}
            className="text-xs text-cyan-400 hover:text-cyan-300 underline font-medium"
          >
            Formulaire rapide
          </button>
        </div>
        <h3 className="text-2xl font-extrabold text-white">
          Postuler ou demander le syllabus complet
        </h3>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Remplissez ce formulaire pour recevoir la brochure détaillée, le calendrier des sessions et échanger avec un conseiller pédagogique.
        </p>
      </div>

      {state?.error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm">
          {state.error}
        </div>
      )}

      <form action={formAction} className="relative z-10 space-y-4">
        {/* Honeypot anti-bot */}
        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

        {/* Hidden subject */}
        <input
          type="hidden"
          name="subject"
          value={`[Candidature Formation 6 Mois] ${formationTitle}`}
        />
        <input type="hidden" name="services" value={`Formation: ${formationTitle} (6 Mois)`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Nom complet *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                name="name"
                required
                placeholder="ex. Mamadou Diallo"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Adresse Email professionnelle *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                name="email"
                required
                placeholder="votre.email@entreprise.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Numéro de téléphone *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="tel"
                name="phone"
                required
                placeholder="+221 77 000 00 00"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Entreprise ou Organisme
            </label>
            <div className="relative">
              <Building className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                name="company"
                placeholder="ex. Banque / Société / Indépendant"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Date de démarrage souhaitée
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              name="deadline"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors appearance-none"
            >
              <option value="Prochaine session (dans 3 semaines)">Prochaine session (dans 3 semaines)</option>
              <option value="Dans 1 mois">Dans 1 mois</option>
              <option value="Dans 2 à 3 mois">Dans 2 à 3 mois</option>
              <option value="Session sur mesure pour entreprise">Session sur mesure pour mon entreprise</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Votre profil & attentes pour ce programme *
          </label>
          <textarea
            name="message"
            required
            rows={4}
            placeholder="Parlez-nous de vos compétences actuelles, de vos objectifs de certification ou des besoins spécifiques de votre équipe..."
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none"
          />
        </div>

        {/* Captcha */}
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Sécurité anti-spam : Combien font <strong>{captchaA} + {captchaB}</strong> ?</span>
          </div>
          <input type="hidden" name="captcha_a" value={captchaA} />
          <input type="hidden" name="captcha_b" value={captchaB} />
          <input
            type="number"
            name="captcha_answer"
            required
            placeholder="?"
            className="w-20 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/20 text-white text-center text-sm font-mono font-bold focus:outline-none focus:border-cyan-400"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full mt-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm tracking-wide hover:from-cyan-400 hover:to-blue-500 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Enregistrement de votre candidature...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Envoyer ma candidature &bull; Réponse sous 24h</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
