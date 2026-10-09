"use client";

import React, { useState, useEffect, useActionState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Loader2 } from "lucide-react";
import { submitContactForm } from "@/app/(frontend)/contact/actions";
import { Button } from "@/components/ui/button";
import { FormSuccessMessage } from "@/components/FormSuccessMessage";

interface EngineerModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: "quote" | "engineer";
  initialService?: string;
}

const SERVICE_OPTIONS = [
  "Cybersécurité & Firewalls (Sophos, Fortinet)",
  "Réseaux d'Entreprise, Câblage & Wi-Fi",
  "ERP & Digitalisation (Conception sur-mesure, Odoo, Dolibarr)",
  "Développement d'Applications Web & Mobile",
  "Vente de Licences Microsoft 365 (ESD & CSP)",
  "Formations & Préparation aux Certifications (6 mois)",
  "Téléphonie IP (VoIP Yeastar, Cisco) & Vidéosurveillance",
  "Infogérance, Supervision & Support Proactif 24/7",
  "Autre projet ou étude sur-mesure",
];

export function EngineerContactModal({
  isOpen,
  onClose,
  mode = "quote",
  initialService,
}: EngineerModalProps) {
  const [state, formAction, isPending] = useActionState(submitContactForm, null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [captchaA, setCaptchaA] = useState(3);
  const [captchaB, setCaptchaB] = useState(4);
  const [selectedService, setSelectedService] = useState<string>("");

  const serviceOptions = React.useMemo(() => {
    if (initialService && !SERVICE_OPTIONS.includes(initialService)) {
      return [initialService, ...SERVICE_OPTIONS];
    }
    return SERVICE_OPTIONS;
  }, [initialService]);

  const generateCaptcha = () => {
    setCaptchaA(Math.floor(Math.random() * 8) + 1);
    setCaptchaB(Math.floor(Math.random() * 8) + 1);
  };

  useEffect(() => {
    if (isOpen) {
      generateCaptcha();
      setIsSuccess(false);
      setSelectedService(initialService || SERVICE_OPTIONS[0]);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, initialService]);

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

  const isQuoteMode = mode === "quote";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
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

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-engineer-title"
            className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-6 z-10 text-slate-900"
          >
            {/* Header: Clean title, subtitle and close button */}
            <div className="flex items-start justify-between p-6 sm:p-8 border-b border-slate-100 bg-slate-50/70">
              <div>
                <h3 id="modal-engineer-title" className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  {isQuoteMode ? "Demander un devis personnalisé" : "Parler à un ingénieur expert"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                  {isQuoteMode
                    ? selectedService
                      ? `Recevez une proposition chiffrée sur-mesure pour « ${selectedService} » sous 24h ouvrées.`
                      : "Recevez une proposition sur-mesure sous 24h ouvrées et échangez directement avec nos ingénieurs."
                    : selectedService
                      ? `Échangez directement avec un ingénieur certifié sur votre projet de « ${selectedService} ».`
                      : "Échangez directement avec notre équipe technique sur votre architecture, réseau ou cybersécurité."}
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
                  title="Votre demande a bien été transmise"
                  message="Nous accusons bonne réception de vos informations. Nos équipes d'ingénierie NOB TECHNOLOGIES étudient vos éléments et vous recontacteront sous 24h ouvrées."
                  badge="Prise en charge confirmée"
                  onReset={onClose}
                  resetButtonText="Fermer la fenêtre"
                />
              ) : (
                <form action={formAction} className="space-y-5">
                  <input type="hidden" name="type" value={isQuoteMode ? "devis" : "engineer"} />
                  <input
                    type="hidden"
                    name="subject"
                    value={
                      isQuoteMode
                        ? `[Demande de Devis] ${selectedService || "Projet IT"}`
                        : `[Consultation Ingénieur] ${selectedService || "Projet IT"}`
                    }
                  />

                  {/* Honeypot field for bots */}
                  <div className="hidden absolute opacity-0 -z-50" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
                  </div>

                  {state?.error && (
                    <div className="bg-rose-50 text-rose-800 p-4 rounded-xl border border-rose-200 text-xs sm:text-sm flex items-start gap-3">
                      <svg className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <p>{state.error}</p>
                    </div>
                  )}

                  {/* Service selector */}
                  <div className="space-y-1.5">
                    <label htmlFor="modal-service" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Service / Projet concerné *
                    </label>
                    <select
                      id="modal-service"
                      name="services"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      disabled={isPending}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none text-xs sm:text-sm font-medium text-slate-900 transition-all cursor-pointer"
                    >
                      {serviceOptions.map((svc) => (
                        <option key={svc} value={svc}>
                          {svc}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Nom complet + Email pro */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="modal-name" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        id="modal-name"
                        name="name"
                        required
                        placeholder="Moussa Diop"
                        disabled={isPending}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none text-xs sm:text-sm transition-all placeholder-slate-400 text-slate-900"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="modal-email" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                        Email professionnel *
                      </label>
                      <input
                        type="email"
                        id="modal-email"
                        name="email"
                        required
                        placeholder="moussa@entreprise.sn"
                        disabled={isPending}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none text-xs sm:text-sm transition-all placeholder-slate-400 text-slate-900"
                      />
                    </div>
                  </div>

                  {/* Téléphone + Entreprise */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="modal-phone" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                        Téléphone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        id="modal-phone"
                        name="phone"
                        required
                        placeholder="+221 77 301 08 38"
                        disabled={isPending}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none text-xs sm:text-sm transition-all placeholder-slate-400 text-slate-900"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="modal-company" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                        Entreprise / Organisation
                      </label>
                      <input
                        type="text"
                        id="modal-company"
                        name="company"
                        placeholder="Société SA / PME"
                        disabled={isPending}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none text-xs sm:text-sm transition-all placeholder-slate-400 text-slate-900"
                      />
                    </div>
                  </div>

                  {/* Délai & Budget */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="modal-deadline" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                        Délai souhaité
                      </label>
                      <select
                        id="modal-deadline"
                        name="deadline"
                        disabled={isPending}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none text-xs sm:text-sm text-slate-800 transition-all cursor-pointer"
                      >
                        <option value="Urgent (Immédiat)">Urgent (Immédiat)</option>
                        <option value="Dans les 30 jours">Dans les 30 jours</option>
                        <option value="1 à 3 mois">1 à 3 mois</option>
                        <option value="Simple demande d'information">Simple demande d'information</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="modal-budget" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                        Budget prévisionnel
                      </label>
                      <select
                        id="modal-budget"
                        name="budget"
                        disabled={isPending}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none text-xs sm:text-sm text-slate-800 transition-all cursor-pointer"
                      >
                        <option value="Non défini">À évaluer avec l'ingénieur</option>
                        <option value="Moins de 1M FCFA">Moins de 1.000.000 FCFA</option>
                        <option value="1M à 5M FCFA">1.000.000 à 5.000.000 FCFA</option>
                        <option value="5M à 20M FCFA">5.000.000 à 20.000.000 FCFA</option>
                        <option value="Plus de 20M FCFA">Projet d'envergure (&gt; 20M FCFA)</option>
                      </select>
                    </div>
                  </div>

                  {/* Message / Cahier des charges */}
                  <div className="space-y-1.5">
                    <label htmlFor="modal-message" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Description de vos besoins & Spécifications *
                    </label>
                    <textarea
                      id="modal-message"
                      name="message"
                      required
                      rows={3}
                      placeholder="Décrivez votre besoin : nombre d'utilisateurs, sites à équiper, technologies recherchées..."
                      disabled={isPending}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none text-xs sm:text-sm transition-all placeholder-slate-400 text-slate-900 resize-none"
                    />
                  </div>

                  {/* Anti-spam Captcha */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-700">
                      <ShieldCheck className="w-4 h-4 text-cyan-600 shrink-0" />
                      <span>Vérification de sécurité : Combien font <strong>{captchaA} + {captchaB}</strong> ?</span>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <input type="hidden" name="captcha_a" value={captchaA} />
                      <input type="hidden" name="captcha_b" value={captchaB} />
                      <input
                        type="number"
                        name="captcha_answer"
                        required
                        placeholder="Réponse"
                        disabled={isPending}
                        className="w-full sm:w-28 px-3 py-2 text-center text-xs sm:text-sm font-bold bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-[11px] text-slate-500 flex items-center gap-1.5 order-2 sm:order-1">
                      Prise en charge directe sous 24h ouvrées
                    </p>

                    <Button
                      type="submit"
                      disabled={isPending}
                      className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-cyan-600 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md active:scale-95 cursor-pointer order-1 sm:order-2 flex items-center justify-center gap-2"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Envoi en cours...</span>
                        </>
                      ) : (
                        <span>{isQuoteMode ? "Envoyer ma demande de devis" : "Transmettre ma demande"}</span>
                      )}
                    </Button>
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
