"use client";

import React, { useActionState, useEffect, useState } from "react";
import { submitQuoteForm } from "./actions";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/animations";
import { FormSuccessMessage } from "@/components/FormSuccessMessage";

export function DevisForm({ plan }: { plan: string }) {
  const [state, formAction, isPending] = useActionState(submitQuoteForm, null);
  const [success, setSuccess] = useState(false);

  // Captcha Math
  const [captchaA, setCaptchaA] = useState(0);
  const [captchaB, setCaptchaB] = useState(0);

  useEffect(() => {
    setCaptchaA(Math.floor(Math.random() * 10) + 1);
    setCaptchaB(Math.floor(Math.random() * 10) + 1);
  }, [state]);

  useEffect(() => {
    if (state?.success) {
      setSuccess(true);
    }
  }, [state]);

  if (success) {
    return (
      <FormSuccessMessage
        title="Demande de devis enregistrée !"
        message={`Votre demande pour l'offre ${plan.toUpperCase()} a bien été prise en compte. Notre pôle commercial et technique analyse vos spécifications et vous recontactera sous 24h ouvrées avec une proposition sur-mesure.`}
        badge="Plan d'infrastructure réservé"
        variant="dark"
        onReset={() => setSuccess(false)}
        resetButtonText="Demander un autre devis"
      />
    );
  }

  return (
    <FadeUp delay={0.2}>
      <form action={formAction} className="space-y-6 bg-[#020617] p-8 md:p-10 rounded-2xl border border-white/10 shadow-2xl relative">
        
        {state?.error && (
          <div className="bg-red-500/10 text-red-400 p-4 rounded-xl border border-red-500/20 text-sm flex items-start gap-3 relative z-10">
            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <p>{state.error}</p>
          </div>
        )}

        {/* Honeypot Field */}
        <div className="hidden absolute opacity-0 -z-50" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <input type="hidden" name="plan" value={plan} />

        <div className="grid md:grid-cols-2 gap-6 relative z-10">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-semibold text-slate-300">Nom complet *</label>
            <input 
              type="text" id="name" name="name" required placeholder="John Doe" disabled={isPending}
              className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white focus:bg-white/10 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all placeholder-slate-500" 
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold text-slate-300">Email *</label>
            <input 
              type="email" id="email" name="email" required placeholder="john@entreprise.com" disabled={isPending}
              className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white focus:bg-white/10 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all placeholder-slate-500" 
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 relative z-10">
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-semibold text-slate-300">Téléphone</label>
            <input 
              type="tel" id="phone" name="phone" placeholder="+221 77 000 00 00" disabled={isPending}
              className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white focus:bg-white/10 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all placeholder-slate-500" 
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="company" className="text-sm font-semibold text-slate-300">Entreprise</label>
            <input 
              type="text" id="company" name="company" placeholder="Nom de votre structure" disabled={isPending}
              className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white focus:bg-white/10 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all placeholder-slate-500" 
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 relative z-10">
          <div className="space-y-2">
            <label htmlFor="employees" className="text-sm font-semibold text-slate-300">Nombre d'employés</label>
            <select 
              id="employees" name="employees" disabled={isPending}
              className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white focus:bg-white/10 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all [&>option]:text-slate-900"
            >
              <option value="">Sélectionnez...</option>
              <option value="1-10">1 à 10</option>
              <option value="11-50">11 à 50</option>
              <option value="51-200">51 à 200</option>
              <option value="200+">Plus de 200</option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="deadline" className="text-sm font-semibold text-slate-300">Délai souhaité</label>
            <select 
              id="deadline" name="deadline" disabled={isPending}
              className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white focus:bg-white/10 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all [&>option]:text-slate-900"
            >
              <option value="">Sélectionnez...</option>
              <option value="Immédiat">Immédiat</option>
              <option value="1 mois">Moins d'un mois</option>
              <option value="3 mois">1 à 3 mois</option>
              <option value="Plus de 3 mois">Plus de 3 mois</option>
            </select>
          </div>
        </div>

        <div className="space-y-2 relative z-10">
          <label htmlFor="needs" className="text-sm font-semibold text-slate-300">Besoins spécifiques *</label>
          <textarea 
            id="needs" name="needs" rows={4} required placeholder="Décrivez vos besoins pour le plan..." disabled={isPending}
            className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white focus:bg-white/10 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all resize-y placeholder-slate-500" 
          />
        </div>

        {/* Math Captcha */}
        {captchaA > 0 && (
          <div className="bg-white/5 p-4 border border-white/10 rounded-xl flex flex-col sm:flex-row items-center gap-4 justify-between relative z-10">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-accent" />
              <label htmlFor="captcha_answer" className="text-sm font-semibold text-slate-300">
                Anti-spam : {captchaA} + {captchaB} = ?
              </label>
            </div>
            <div className="flex gap-2">
              <input type="hidden" name="captcha_a" value={captchaA} />
              <input type="hidden" name="captcha_b" value={captchaB} />
              <input 
                type="number" id="captcha_answer" name="captcha_answer" required min="2" max="20" placeholder="?" disabled={isPending}
                className="w-20 px-4 py-2 text-center rounded-xl border border-white/10 bg-white/10 text-white focus:border-accent focus:ring-2 focus:ring-accent/50 outline-none font-bold"
              />
            </div>
          </div>
        )}

        <div className="pt-4 relative z-10">
          <Button type="submit" size="lg" className="w-full h-14 text-base font-bold bg-accent text-[#020617] hover:bg-[#00B4D8] shadow-[0_0_25px_rgba(0,212,255,0.3)] hover:shadow-[0_0_40px_rgba(0,212,255,0.5)] transition-all duration-300" disabled={isPending}>
            {isPending ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-[#020617]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Envoi en cours...
              </span>
            ) : "Obtenir mon devis"}
          </Button>
        </div>
      </form>
    </FadeUp>
  );
}
