"use client";

import React, { useActionState, useEffect, useState } from "react";
import { submitContactForm } from "./actions";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import { FormSuccessMessage } from "@/components/FormSuccessMessage";

export function ContactForm({ 
  formType = 'contact',
  initialService,
}: { 
  formType?: string;
  initialService?: string;
}) {
  const [state, formAction, isPending] = useActionState(submitContactForm, null);
  const [success, setSuccess] = React.useState(false);

  // Captcha Math
  const [captchaA, setCaptchaA] = useState(0);
  const [captchaB, setCaptchaB] = useState(0);

  useEffect(() => {
    // Generate simple math question on mount
    setCaptchaA(Math.floor(Math.random() * 10) + 1);
    setCaptchaB(Math.floor(Math.random() * 10) + 1);
  }, [state]); // Regenerate if form submission fails

  useEffect(() => {
    if (state?.success) {
      setSuccess(true);
    }
  }, [state]);

  if (success) {
    const successTitle =
      formType === 'engineer'
        ? 'Demande d’expertise transmise !'
        : formType === 'quote'
        ? 'Demande de devis enregistrée !'
        : 'Message envoyé avec succès !';

    const successMessage =
      formType === 'engineer'
        ? 'Votre problématique technique a bien été transmise à notre équipe. Un ingénieur certifié étudie votre architecture et prendra directement contact avec vous sous 24h ouvrées.'
        : formType === 'quote'
        ? 'Les détails de votre projet ont bien été enregistrés. Notre équipe commerciale et technique prépare une proposition adaptée et vous contactera sous 24h ouvrées.'
        : 'Votre message a bien été réceptionné par notre équipe. Un conseiller NOB TECHNOLOGIES prendra contact avec vous dans les plus brefs délais.';

    return (
      <FormSuccessMessage
        title={successTitle}
        message={successMessage}
        badge="Transmission confirmée"
        onReset={() => setSuccess(false)}
        resetButtonText="Envoyer une nouvelle demande"
      />
    );
  }

  let defaultSubject = "";
  let messageLabel = "Votre message *";
  let messagePlaceholder = "Comment pouvons-nous vous aider ?";
  let buttonText = "Envoyer le message";

  if (formType === 'quote') {
    defaultSubject = initialService ? `[Devis] ${initialService}` : "Demande de devis";
    messageLabel = "Détails du projet *";
    messagePlaceholder = initialService 
      ? `Précisez vos besoins pour ${initialService} : volume, contraintes, délais...`
      : "Décrivez vos besoins, vos contraintes et vos objectifs...";
    buttonText = "Demander mon devis";
  } else if (formType === 'engineer') {
    defaultSubject = initialService ? `[Expertise] ${initialService}` : "Demande d'expertise technique";
    messageLabel = "Votre problématique *";
    messagePlaceholder = initialService
      ? `Décrivez la problématique technique concernant ${initialService}...`
      : "Décrivez la problématique technique que vous rencontrez...";
    buttonText = "Contacter un ingénieur";
  }

  return (
    <form action={formAction} className="space-y-5 sm:space-y-6">
      {state?.error && (
        <div className="bg-red-50 text-red-800 p-4 rounded-xl border border-red-200 text-sm flex items-start gap-3">
          <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <p>{state.error}</p>
        </div>
      )}

      {/* Honeypot Field (Invisible for humans, bots will fill it) */}
      <div className="hidden absolute opacity-0 -z-50" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <input type="hidden" name="type" value={formType} />

      {/* Section 1: Informations Personnelles */}
      <div className="space-y-4">
        <p className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold">
          Coordonnées
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
              Nom complet <span className="text-cyan-600 dark:text-cyan-400">*</span>
            </label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required 
              autoComplete="name"
              placeholder="Ex: Jean Dupont"
              disabled={isPending}
              className="w-full px-4 py-3.5 sm:px-5 sm:py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all text-base sm:text-sm placeholder-slate-400 dark:placeholder-slate-500 text-slate-800 dark:text-white" 
            />
          </div>
          
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
              Email professionnel <span className="text-cyan-600 dark:text-cyan-400">*</span>
            </label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              autoComplete="email"
              inputMode="email"
              placeholder="jean@entreprise.sn"
              disabled={isPending}
              className="w-full px-4 py-3.5 sm:px-5 sm:py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all text-base sm:text-sm placeholder-slate-400 dark:placeholder-slate-500 text-slate-800 dark:text-white" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-1.5">
            <label htmlFor="phone" className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
              Numéro de téléphone <span className="text-cyan-600 dark:text-cyan-400">*</span>
            </label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              required
              autoComplete="tel"
              inputMode="tel"
              placeholder="+221 77 000 00 00"
              disabled={isPending}
              className="w-full px-4 py-3.5 sm:px-5 sm:py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all text-base sm:text-sm placeholder-slate-400 dark:placeholder-slate-500 text-slate-800 dark:text-white" 
            />
          </div>
          
          <div className="space-y-1.5">
            <label htmlFor="company" className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
              Entreprise / Organisation
            </label>
            <input 
              type="text" 
              id="company" 
              name="company" 
              autoComplete="organization"
              placeholder="Ex: Sonatel, Port Autonome..."
              disabled={isPending}
              className="w-full px-4 py-3.5 sm:px-5 sm:py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all text-base sm:text-sm placeholder-slate-400 dark:placeholder-slate-500 text-slate-800 dark:text-white" 
            />
          </div>
        </div>
      </div>

      {/* Section 2: Objet de la prise de contact */}
      <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
        <p className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold">
          Projet &amp; Objectifs
        </p>

        <div className="space-y-1.5">
          <label htmlFor="subject" className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
            Sujet de votre demande <span className="text-cyan-600 dark:text-cyan-400">*</span>
          </label>
          <input 
            type="text" 
            id="subject" 
            name="subject" 
            required 
            defaultValue={defaultSubject}
            placeholder="Ex: Audit sécurité, Câblage réseau, Cloud"
            disabled={isPending}
            className="w-full px-4 py-3.5 sm:px-5 sm:py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all text-base sm:text-sm placeholder-slate-400 dark:placeholder-slate-500 text-slate-800 dark:text-white" 
          />
        </div>

        {formType === 'quote' && (
          <div className="p-4 sm:p-6 bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-2xl space-y-5">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
              Spécifications du devis
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-1.5">
                <label htmlFor="budget" className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">Budget estimé</label>
                <div className="relative">
                  <select 
                    id="budget" 
                    name="budget" 
                    disabled={isPending}
                    className="w-full appearance-none px-4 py-3.5 sm:px-5 sm:py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all text-base sm:text-sm text-slate-800 dark:text-white cursor-pointer"
                  >
                    <option value="">Sélectionnez une fourchette</option>
                    <option value="Moins de 1 000 000 FCFA">Moins de 1 000 000 FCFA</option>
                    <option value="1M - 5M FCFA">1M - 5M FCFA</option>
                    <option value="5M - 15M FCFA">5M - 15M FCFA</option>
                    <option value="Plus de 15M FCFA">Plus de 15M FCFA</option>
                    <option value="Je ne sais pas encore">Je ne sais pas encore</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="deadline" className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">Délai souhaité</label>
                <div className="relative">
                  <select 
                    id="deadline" 
                    name="deadline" 
                    disabled={isPending}
                    className="w-full appearance-none px-4 py-3.5 sm:px-5 sm:py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all text-base sm:text-sm text-slate-800 dark:text-white cursor-pointer"
                  >
                    <option value="">Sélectionnez un délai</option>
                    <option value="Immédiat">Immédiat (Urgent)</option>
                    <option value="Dans le mois">Dans le mois</option>
                    <option value="Dans 1 à 3 mois">Dans 1 à 3 mois</option>
                    <option value="À plus long terme">À plus long terme</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 block">Services concernés</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-2.5">
                {["Câblage & Réseau", "Sécurité & Caméras", "Développement Logiciel", "Infogérance", "Téléphonie IP"].map((service) => (
                  <label key={service} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 active:bg-cyan-50/50 cursor-pointer hover:border-cyan-400 transition-all select-none">
                    <input type="checkbox" name="services" value={service} className="w-4 h-4 accent-cyan-500 rounded text-cyan-600" />
                    <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 leading-tight">{service}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {formType === 'engineer' && (
          <div className="p-4 sm:p-6 bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-2xl space-y-5">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
              Spécifications techniques
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-1.5">
                <label htmlFor="infrastructure_size" className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">Taille de l'infrastructure</label>
                <div className="relative">
                  <select 
                    id="infrastructure_size" 
                    name="infrastructure_size" 
                    disabled={isPending}
                    className="w-full appearance-none px-4 py-3.5 sm:px-5 sm:py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all text-base sm:text-sm text-slate-800 dark:text-white cursor-pointer"
                  >
                    <option value="">Sélectionnez une option</option>
                    <option value="1 à 10 postes">1 à 10 postes / Petite structure</option>
                    <option value="10 à 50 postes">10 à 50 postes / PME</option>
                    <option value="Plus de 50 postes">Plus de 50 postes / Grande entreprise</option>
                    <option value="Multisites">Multisites</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="technologies" className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">Technologies actuelles</label>
                <input 
                  type="text" 
                  id="technologies" 
                  name="technologies" 
                  placeholder="Ex: Cisco, Fortinet, Azure..."
                  disabled={isPending}
                  className="w-full px-4 py-3.5 sm:px-5 sm:py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all text-base sm:text-sm placeholder-slate-400 dark:placeholder-slate-500 text-slate-800 dark:text-white" 
                />
              </div>
            </div>
          </div>
        )}

        <div className="space-y-1.5">
          <label htmlFor="message" className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
            {messageLabel}
          </label>
          <textarea 
            id="message" 
            name="message" 
            rows={4} 
            required 
            placeholder={messagePlaceholder}
            disabled={isPending}
            className="w-full px-4 py-3.5 sm:px-5 sm:py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all text-base sm:text-sm placeholder-slate-400 dark:placeholder-slate-500 text-slate-800 dark:text-white resize-y" 
          />
        </div>
      </div>

      {/* Native Math Anti-Spam Captcha (Compact on Mobile) */}
      {captchaA > 0 && (
        <div className="bg-slate-50 dark:bg-slate-900/70 p-4 sm:p-4.5 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0" />
            <label htmlFor="captcha_answer" className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
              Vérification anti-spam : Combien font <span className="font-mono text-cyan-700 dark:text-cyan-400 font-bold">{captchaA} + {captchaB}</span> ?
            </label>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input type="hidden" name="captcha_a" value={captchaA} />
            <input type="hidden" name="captcha_b" value={captchaB} />
            <input 
              type="number" 
              id="captcha_answer"
              name="captcha_answer" 
              required
              min="2"
              max="20"
              inputMode="numeric"
              placeholder="?"
              disabled={isPending}
              className="w-full sm:w-20 px-4 py-2.5 sm:py-2 text-center rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none font-bold text-base sm:text-sm text-slate-900 dark:text-white"
            />
          </div>
        </div>
      )}

      {/* Bouton de soumission tactile */}
      <div className="pt-2">
        <Button 
          type="submit" 
          size="lg" 
          className="w-full h-13 sm:h-14 text-base font-bold rounded-xl bg-slate-900 hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white shadow-lg shadow-slate-900/10 active:scale-[0.99] transition-all duration-200 cursor-pointer" 
          disabled={isPending}
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Envoi en cours...
            </span>
          ) : buttonText}
        </Button>
        <p className="text-[11px] sm:text-xs text-slate-400 text-center mt-3">
          Vos données sont strictement confidentielles et traitées selon la norme ISO 27001.
        </p>
      </div>
    </form>
  );
}
