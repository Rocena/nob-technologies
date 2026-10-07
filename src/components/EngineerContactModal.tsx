"use client";

import React, { useState, useEffect, useActionState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ShieldCheck, Loader2 } from "lucide-react";
import { submitContactForm } from "@/app/(frontend)/contact/actions";
import { Button } from "@/components/ui/button";
import { FormSuccessMessage } from "@/components/FormSuccessMessage";

interface EngineerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EngineerContactModal({ isOpen, onClose }: EngineerModalProps) {
  const [state, formAction, isPending] = useActionState(submitContactForm, null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [captchaA, setCaptchaA] = useState(3);
  const [captchaB, setCaptchaB] = useState(4);

  const generateCaptcha = () => {
    setCaptchaA(Math.floor(Math.random() * 8) + 1);
    setCaptchaB(Math.floor(Math.random() * 8) + 1);
  };

  useEffect(() => {
    if (isOpen) {
      generateCaptcha();
      setIsSuccess(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (state?.success) {
      setIsSuccess(true);
    }
  }, [state]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop with Silicon Valley glassmorphism */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#020617]/75 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Container: Clean, cohesive white & slate theme matching the rest of the site's forms */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-engineer-title"
            className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-8 z-10 text-slate-900"
          >
            {/* Header: Clean title, subtitle and close button without telemetry dots or ENG labels */}
            <div className="flex items-start justify-between p-6 sm:p-8 border-b border-slate-100 bg-slate-50/60">
              <div>
                <h3 id="modal-engineer-title" className="text-2xl font-bold tracking-tight text-slate-900">
                  Parler à un ingénieur
                </h3>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                  Échangez directement avec nos ingénieurs certifiés sur votre architecture, réseau ou cybersécurité.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer la boîte de dialogue"
                className="text-slate-400 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer shrink-0 ml-4"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 max-h-[calc(85vh-140px)] overflow-y-auto">
              {isSuccess ? (
                <FormSuccessMessage
                  title="Demande d'expertise transmise !"
                  message="Vos données et vos spécifications d'infrastructure ont été envoyées à notre pôle technique. Un ingénieur certifié prendra directement contact avec vous sous 24h ouvrées."
                  badge="Transmission confirmée"
                  onReset={onClose}
                  resetButtonText="Fermer la fenêtre"
                />
              ) : (
                <form action={formAction} className="space-y-6">
                  <input type="hidden" name="type" value="engineer" />
                  <input type="hidden" name="subject" value="Demande d'expertise technique" />

                  {/* Honeypot field for bots */}
                  <div className="hidden absolute opacity-0 -z-50" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
                  </div>

                  {state?.error && (
                    <div className="bg-red-50 text-red-800 p-4 rounded-sm border border-red-200 text-sm flex items-start gap-3">
                      <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <p>{state.error}</p>
                    </div>
                  )}

                  {/* Nom complet + Email pro */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2 relative">
                      <label htmlFor="modal-name" className="text-sm font-semibold text-slate-700">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        id="modal-name"
                        name="name"
                        required
                        placeholder="John Doe"
                        disabled={isPending}
                        className="w-full px-5 py-4 rounded-sm border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all duration-300 placeholder-slate-400 text-slate-800"
                      />
                    </div>

                    <div className="space-y-2 relative">
                      <label htmlFor="modal-email" className="text-sm font-semibold text-slate-700">
                        Email professionnel *
                      </label>
                      <input
                        type="email"
                        id="modal-email"
                        name="email"
                        required
                        placeholder="john@entreprise.com"
                        disabled={isPending}
                        className="w-full px-5 py-4 rounded-sm border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all duration-300 placeholder-slate-400 text-slate-800"
                      />
                    </div>
                  </div>

                  {/* Téléphone + Entreprise */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2 relative">
                      <label htmlFor="modal-phone" className="text-sm font-semibold text-slate-700">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        id="modal-phone"
                        name="phone"
                        placeholder="+221 77 000 00 00"
                        disabled={isPending}
                        className="w-full px-5 py-4 rounded-sm border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all duration-300 placeholder-slate-400 text-slate-800"
                      />
                    </div>

                    <div className="space-y-2 relative">
                      <label htmlFor="modal-company" className="text-sm font-semibold text-slate-700">
                        Entreprise / Organisation
                      </label>
                      <input
                        type="text"
                        id="modal-company"
                        name="company"
                        placeholder="Nom de votre structure"
                        disabled={isPending}
                        className="w-full px-5 py-4 rounded-sm border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all duration-300 placeholder-slate-400 text-slate-800"
                      />
                    </div>
                  </div>

                  {/* Informations techniques contextuelles */}
                  <div className="p-6 bg-slate-50 border border-slate-100 rounded-xl space-y-6">
                    <h4 className="font-semibold text-primary text-base">Informations techniques</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2 relative">
                        <label htmlFor="modal-infrastructure_size" className="text-sm font-semibold text-slate-700">
                          Taille de l'infrastructure
                        </label>
                        <select
                          id="modal-infrastructure_size"
                          name="infrastructure_size"
                          disabled={isPending}
                          className="w-full px-5 py-4 rounded-sm border border-slate-200 bg-white hover:bg-slate-50 focus:bg-white focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all duration-300 text-slate-700"
                        >
                          <option value="">Sélectionnez une option</option>
                          <option value="1 à 10 postes">1 à 10 postes / Petite structure</option>
                          <option value="10 à 50 postes">10 à 50 postes / PME</option>
                          <option value="Plus de 50 postes">Plus de 50 postes / Grande entreprise</option>
                          <option value="Multisites">Multisites / Datacenter</option>
                        </select>
                      </div>

                      <div className="space-y-2 relative">
                        <label htmlFor="modal-technologies" className="text-sm font-semibold text-slate-700">
                          Technologies utilisées
                        </label>
                        <input
                          type="text"
                          id="modal-technologies"
                          name="technologies"
                          placeholder="Ex: Cisco, Fortinet, Windows Server..."
                          disabled={isPending}
                          className="w-full px-5 py-4 rounded-sm border border-slate-200 bg-white hover:bg-slate-50 focus:bg-white focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all duration-300 placeholder-slate-400 text-slate-800"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Problématique / Message */}
                  <div className="space-y-2 relative">
                    <label htmlFor="modal-message" className="text-sm font-semibold text-slate-700">
                      Votre problématique technique *
                    </label>
                    <textarea
                      id="modal-message"
                      name="message"
                      rows={4}
                      required
                      placeholder="Décrivez la problématique technique ou le projet que vous rencontrez..."
                      disabled={isPending}
                      className="w-full px-5 py-4 rounded-sm border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all duration-300 resize-y placeholder-slate-400 text-slate-800"
                    />
                  </div>

                  {/* Anti-spam Math Captcha cohérent */}
                  {captchaA > 0 && (
                    <div className="bg-slate-50 p-4 border border-slate-200 rounded-sm flex flex-col sm:row items-center gap-4 justify-between">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-slate-400" />
                        <label htmlFor="modal-captcha_answer" className="text-sm font-semibold text-slate-700">
                          Vérification anti-spam : Combien font {captchaA} + {captchaB} ?
                        </label>
                      </div>
                      <div className="flex gap-2">
                        <input type="hidden" name="captcha_a" value={captchaA} />
                        <input type="hidden" name="captcha_b" value={captchaB} />
                        <input
                          type="number"
                          id="modal-captcha_answer"
                          name="captcha_answer"
                          required
                          min="2"
                          max="20"
                          placeholder="?"
                          disabled={isPending}
                          className="w-20 px-4 py-2 text-center rounded-sm border border-slate-300 focus:border-accent focus:ring-1 focus:ring-accent outline-none font-bold text-slate-900 bg-white"
                        />
                      </div>
                    </div>
                  )}

                  {/* Submit Button standard du site */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-14 text-base font-bold shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all duration-300 bg-accent text-[#020617] hover:bg-[#00B4D8]"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="animate-spin h-5 w-5 text-[#020617]" />
                          Transmission en cours...
                        </span>
                      ) : (
                        "Contacter un ingénieur"
                      )}
                    </Button>
                    <p className="text-xs text-slate-400 text-center mt-4">
                      Vos données sont sécurisées et ne seront jamais partagées.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
