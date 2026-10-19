"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  GraduationCap,
  Loader2,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  User,
  Mail,
  Phone,
  Briefcase,
  Layers,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormationOption {
  title: string;
  slug: string;
  duration?: string;
  category?: string;
}

export const FORMATION_CATALOG_OPTIONS: FormationOption[] = [
  {
    title: "Cisco CCNA 200-301 : Administration Réseaux & Certifications",
    slug: "cisco-ccna",
    duration: "10 Semaines",
    category: "Réseaux & Certifications",
  },
  {
    title: "Parcours Métier : Administrateur Réseaux & Systèmes (CCNA + Win/Linux + VMware)",
    slug: "reseaux-systemes",
    duration: "6 Mois",
    category: "Parcours Diplômant Métier",
  },
  {
    title: "Parcours Expert Cybersécurité : Cursus Intégral 8 Mois (ISO 27001 + Cisco Cyber + NSE 4 + Pentest)",
    slug: "parcours-expert-cybersecurite",
    duration: "8 Mois",
    category: "Parcours Diplômant Cybersécurité",
  },
  {
    title: "Fortinet NSE 4 (FortiOS & FortiGate) : Sécurité Réseau Avancée",
    slug: "preparation-certification-fortinet-nse4",
    duration: "2 Mois",
    category: "Cybersécurité & Pare-feux",
  },
  {
    title: "Ethical Hacking & Pentest : Tests d'Intrusion & Sécurité Offensive",
    slug: "ethical-hacking",
    duration: "2 Mois",
    category: "Cybersécurité Offensive",
  },
  {
    title: "Cadre de Conformité & Normes de Cybersécurité (ISO 27001 / NIST)",
    slug: "cadre-conformite-normes-reglementations",
    duration: "1 Mois",
    category: "Gouvernance & Risques",
  },
  {
    title: "Pare-feu Sophos XGS : Administration & Protection Périmétrique",
    slug: "initiation-sophos",
    duration: "1 Mois",
    category: "Cybersécurité & Pare-feux",
  },
  {
    title: "Gestion de Projet IT : Méthodes Agiles, Scrum & Pilotage Technique",
    slug: "gestion-de-projet",
    duration: "1 Mois",
    category: "Management IT & Méthodes",
  },
  {
    title: "Microsoft Power BI : Analyse de Données & Business Intelligence",
    slug: "power-bi",
    duration: "1 Mois",
    category: "Data & Décisionnel",
  },
  {
    title: "Cybersécurité Fondamentale & Certificat International Cisco",
    slug: "initiation-cybersecurite",
    duration: "1 Mois",
    category: "Cybersécurité Fondamentale",
  },
  {
    title: "Microsoft 365 : Administration, Sécurité & Travail Collaboratif",
    slug: "initiation-microsoft-365",
    duration: "1 Mois",
    category: "Systèmes & Cloud Microsoft",
  },
  {
    title: "Introduction à l'IA Générative : Productivité, Prompts & Automatisation",
    slug: "initiation-intelligence-artificielle",
    duration: "1 Mois",
    category: "IA & Automatisation",
  },
  {
    title: "Sensibilisation au Phishing & Cas Pratiques de Cyberattaque",
    slug: "sensibilisation-phishing-cas-pratiques",
    duration: "2 Semaines",
    category: "Sensibilisation & Vigilance",
  },
];

interface FormationApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFormationTitle?: string;
  initialFormationSlug?: string;
  initialSession?: string;
}

export function FormationApplyModal({
  isOpen,
  onClose,
  initialFormationTitle,
  initialFormationSlug,
  initialSession,
}: FormationApplyModalProps) {
  const [selectedFormationSlug, setSelectedFormationSlug] = useState<string>("");
  const [selectedFormationTitle, setSelectedFormationTitle] = useState<string>("");

  const [candidateName, setCandidateName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentStatus, setCurrentStatus] = useState("Salarié en activité");
  const [currentLevel, setCurrentLevel] = useState("Intermédiaire (bases réseau/système)");
  const [targetSession, setTargetSession] = useState("Prochaine Rentrée Officielle (dans les 30 jours)");
  const [preferredSchedule, setPreferredSchedule] = useState("Cours du soir (18h30 - 21h00)");
  const [format, setFormat] = useState("Hybride (Campus Dakar + Visio interactif)");
  const [fundingMode, setFundingMode] = useState("Financement personnel / Échelonné sans frais");
  const [motivation, setMotivation] = useState("");

  const [captchaA, setCaptchaA] = useState(3);
  const [captchaB, setCaptchaB] = useState(4);
  const [captchaAnswer, setCaptchaAnswer] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedAdmission, setSubmittedAdmission] = useState<{
    id: string;
    candidateName: string;
    email: string;
    formationTitle: string;
    targetSession: string;
  } | null>(null);

  const generateCaptcha = () => {
    setCaptchaA(Math.floor(Math.random() * 8) + 2);
    setCaptchaB(Math.floor(Math.random() * 8) + 1);
    setCaptchaAnswer("");
  };

  // Sync initial formation when opened
  useEffect(() => {
    if (isOpen) {
      generateCaptcha();
      setErrorMessage(null);
      setSubmittedAdmission(null);

      // Find matching formation
      let matched = FORMATION_CATALOG_OPTIONS[0];
      if (initialFormationSlug) {
        const found = FORMATION_CATALOG_OPTIONS.find((f) => f.slug === initialFormationSlug);
        if (found) matched = found;
      } else if (initialFormationTitle) {
        const found = FORMATION_CATALOG_OPTIONS.find(
          (f) =>
            f.title.toLowerCase().includes(initialFormationTitle.toLowerCase()) ||
            initialFormationTitle.toLowerCase().includes(f.title.toLowerCase())
        );
        if (found) matched = found;
      }

      setSelectedFormationSlug(matched.slug);
      setSelectedFormationTitle(initialFormationTitle || matched.title);
      if (initialSession) {
        setTargetSession(initialSession);
      }

      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, initialFormationSlug, initialFormationTitle, initialSession]);

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

  const handleFormationSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = e.target.value;
    setSelectedFormationSlug(slug);
    const found = FORMATION_CATALOG_OPTIONS.find((f) => f.slug === slug);
    if (found) {
      setSelectedFormationTitle(found.title);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (Number(captchaAnswer) !== captchaA + captchaB) {
      setErrorMessage("Vérification anti-spam incorrecte. Veuillez corriger le calcul.");
      return;
    }

    if (!candidateName.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage("Veuillez renseigner votre nom complet, votre email et votre numéro WhatsApp.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/formations/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateName,
          email,
          phone,
          formationTitle: selectedFormationTitle || "Formation Professionnelle",
          formationSlug: selectedFormationSlug,
          targetSession,
          preferredSchedule,
          currentLevel,
          currentStatus,
          format,
          motivation: motivation
            ? `${motivation} (Financement envisagé : ${fundingMode})`
            : `Financement envisagé : ${fundingMode}`,
          captcha_a: captchaA,
          captcha_b: captchaB,
          captcha_answer: captchaAnswer,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setSubmittedAdmission({
          id: data.admissionId || String(Date.now()),
          candidateName,
          email,
          formationTitle: selectedFormationTitle,
          targetSession,
        });
      } else {
        setErrorMessage(
          data.error || "Une erreur est survenue lors de l'enregistrement de votre candidature."
        );
      }
    } catch {
      setErrorMessage("Erreur de connexion avec le serveur. Veuillez réessayer ultérieurement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop with dark blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#020617]/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-formation-title"
            className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-6 z-10 text-slate-900"
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 sm:p-8 border-b border-slate-100 bg-slate-50/80">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20 text-cyan-600 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-100/80 text-cyan-800 border border-cyan-200">
                      Admission Officielle
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                      Dakar &bull; Présentiel &amp; Hybride
                    </span>
                  </div>
                  <h3 id="modal-formation-title" className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
                    Postuler à la formation
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Complétez votre dossier de candidature en 2 minutes. Examen sous 24h ouvrées par notre équipe pédagogique d&apos;ingénieurs certifiés.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer la boîte de dialogue"
                className="text-slate-400 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer shrink-0 ml-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 max-h-[calc(85vh-140px)] overflow-y-auto">
              {submittedAdmission ? (
                /* Success Screen */
                <div className="text-center py-6 sm:py-8 space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div className="space-y-2">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Dossier N° NOB-ADM-{submittedAdmission.id}
                    </span>
                    <h4 className="text-2xl font-extrabold text-slate-900">
                      Candidature enregistrée avec succès !
                    </h4>
                    <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Félicitations <strong>{submittedAdmission.candidateName}</strong> ! Votre dossier pour la formation <strong>« {submittedAdmission.formationTitle} »</strong> ({submittedAdmission.targetSession}) a bien été transmis au comité technique de NOB TECHNOLOGIES.
                    </p>
                  </div>

                  {/* Highlights Card */}
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/90 text-left space-y-3 text-xs text-slate-700">
                    <div className="flex items-start gap-2.5">
                      <Mail className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                      <span>Un accusé de réception officiel avec les détails de votre cursus a été envoyé à <strong>{submittedAdmission.email}</strong>.</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Notre responsable des admissions étudie vos prérequis sous <strong>24 heures ouvrées</strong>.</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Phone className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>Vous recevrez un appel ou un message WhatsApp pour valider votre place et convenir de votre calendrier.</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Button
                      type="button"
                      onClick={onClose}
                      className="w-full sm:w-auto px-8 py-3 bg-slate-900 hover:bg-cyan-600 text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-md"
                    >
                      Fermer la fenêtre
                    </Button>
                  </div>
                </div>
              ) : (
                /* Application Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMessage && (
                    <div className="bg-rose-50 text-rose-800 p-4 rounded-xl border border-rose-200 text-xs sm:text-sm flex items-start gap-3">
                      <svg className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <p>{errorMessage}</p>
                    </div>
                  )}

                  {/* 1. Formation ciblée */}
                  <div className="space-y-1.5">
                    <label htmlFor="modal-formation-select" className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                      <span>Formation ciblée *</span>
                      <span className="text-[11px] font-mono text-cyan-700 font-bold lowercase">certifiante</span>
                    </label>
                    <select
                      id="modal-formation-select"
                      value={selectedFormationSlug}
                      onChange={handleFormationSelectChange}
                      disabled={loading}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none text-xs sm:text-sm font-semibold text-slate-900 transition-all cursor-pointer"
                    >
                      {FORMATION_CATALOG_OPTIONS.map((f) => (
                        <option key={f.slug} value={f.slug}>
                          {f.title} ({f.duration})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 2. Nom complet + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="modal-candidate-name" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        id="modal-candidate-name"
                        value={candidateName}
                        onChange={(e) => setCandidateName(e.target.value)}
                        required
                        placeholder="Ex: Ibrahima Ndiaye"
                        disabled={loading}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none text-xs sm:text-sm transition-all placeholder-slate-400 text-slate-900"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="modal-candidate-email" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                        Adresse Email *
                      </label>
                      <input
                        type="email"
                        id="modal-candidate-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="ibrahima@exemple.sn"
                        disabled={loading}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none text-xs sm:text-sm transition-all placeholder-slate-400 text-slate-900"
                      />
                    </div>
                  </div>

                  {/* 3. Téléphone WhatsApp + Statut actuel */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="modal-candidate-phone" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                        Téléphone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        id="modal-candidate-phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        placeholder="+221 77 000 00 00"
                        disabled={loading}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none text-xs sm:text-sm transition-all placeholder-slate-400 text-slate-900"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="modal-candidate-status" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                        Statut professionnel actuel *
                      </label>
                      <select
                        id="modal-candidate-status"
                        value={currentStatus}
                        onChange={(e) => setCurrentStatus(e.target.value)}
                        disabled={loading}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none text-xs sm:text-sm text-slate-800 transition-all cursor-pointer"
                      >
                        <option value="Salarié en activité">Salarié IT / Entreprise en poste</option>
                        <option value="Reconversion professionnelle">En reconversion professionnelle vers l&apos;IT</option>
                        <option value="Étudiant / Jeune diplômé">Étudiant / Jeune diplômé</option>
                        <option value="Indépendant / Freelance">Indépendant / Consultant IT</option>
                        <option value="Demandeur d'emploi">En recherche active d&apos;opportunités</option>
                      </select>
                    </div>
                  </div>

                  {/* 4. Session de rentrée + Horaires préférés */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="modal-target-session" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                        Session de rentrée souhaitée
                      </label>
                      <select
                        id="modal-target-session"
                        value={targetSession}
                        onChange={(e) => setTargetSession(e.target.value)}
                        disabled={loading}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none text-xs sm:text-sm text-slate-800 transition-all cursor-pointer"
                      >
                        <option value="Prochaine Rentrée Officielle (dans les 30 jours)">
                          Prochaine Rentrée Officielle (dans les 30 jours)
                        </option>
                        <option value="Session du mois prochain">
                          Session du mois prochain
                        </option>
                        <option value="Cursus accéléré / Bootcamp">
                          Cursus accéléré / Bootcamp
                        </option>
                        <option value="Formation Intra-Entreprise sur-mesure">
                          Formation Intra-Entreprise sur-mesure
                        </option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="modal-preferred-schedule" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                        Créneau horaire préféré
                      </label>
                      <select
                        id="modal-preferred-schedule"
                        value={preferredSchedule}
                        onChange={(e) => setPreferredSchedule(e.target.value)}
                        disabled={loading}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none text-xs sm:text-sm text-slate-800 transition-all cursor-pointer"
                      >
                        <option value="Cours du soir (18h30 - 21h00)">Cours du soir (18h30 - 21h00)</option>
                        <option value="Samedi matin (09h00 - 13h00)">Samedi matin (09h00 - 13h00)</option>
                        <option value="Samedi après-midi (14h00 - 18h00)">Samedi après-midi (14h00 - 18h00)</option>
                        <option value="Horaires flexibles / E-learning">Horaires flexibles / E-learning</option>
                      </select>
                    </div>
                  </div>

                  {/* 5. Modalité + Financement */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="modal-format" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                        Mode d&apos;apprentissage
                      </label>
                      <select
                        id="modal-format"
                        value={format}
                        onChange={(e) => setFormat(e.target.value)}
                        disabled={loading}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none text-xs sm:text-sm text-slate-800 transition-all cursor-pointer"
                      >
                        <option value="Hybride (Campus Dakar + Visio interactif)">
                          Hybride (Campus Dakar + Visio interactif)
                        </option>
                        <option value="100% Présentiel sur bancs d'essai réels à Dakar">
                          100% Présentiel sur bancs d&apos;essai réels à Dakar
                        </option>
                        <option value="100% En ligne / À distance">
                          100% En ligne / À distance
                        </option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="modal-funding" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                        Prise en charge financière
                      </label>
                      <select
                        id="modal-funding"
                        value={fundingMode}
                        onChange={(e) => setFundingMode(e.target.value)}
                        disabled={loading}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none text-xs sm:text-sm text-slate-800 transition-all cursor-pointer"
                      >
                        <option value="Financement personnel / Échelonné sans frais">
                          Financement personnel / Échelonné sans frais
                        </option>
                        <option value="Prise en charge Entreprise / Employeur">
                          Prise en charge Entreprise / Employeur
                        </option>
                        <option value="Financement 3FPT / Fonds de formation">
                          Financement 3FPT / Fonds de formation
                        </option>
                        <option value="À discuter avec un conseiller">
                          À discuter avec un conseiller
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* 6. Motivations */}
                  <div className="space-y-1.5">
                    <label htmlFor="modal-candidate-motivation" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Objectif ou motivations (Optionnel)
                    </label>
                    <textarea
                      id="modal-candidate-motivation"
                      value={motivation}
                      onChange={(e) => setMotivation(e.target.value)}
                      rows={2}
                      placeholder="Ex: Valider ma certification CCNA, monter en compétences sur la cybersécurité des firewalls, préparer une promotion..."
                      disabled={loading}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none text-xs sm:text-sm transition-all placeholder-slate-400 text-slate-900 resize-none"
                    />
                  </div>

                  {/* 7. Anti-spam Captcha */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-700">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Vérification anti-spam : Combien font <strong>{captchaA} + {captchaB}</strong> ?</span>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <input
                        type="number"
                        value={captchaAnswer}
                        onChange={(e) => setCaptchaAnswer(e.target.value)}
                        required
                        placeholder="Réponse"
                        disabled={loading}
                        className="w-full sm:w-28 px-3 py-2 text-center text-xs sm:text-sm font-bold bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* 8. Footer & Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-[11px] text-slate-500 flex items-center gap-1.5 order-2 sm:order-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Dossier examiné confidentiellement sous 24h</span>
                    </p>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-slate-900 to-cyan-950 hover:from-cyan-600 hover:to-emerald-600 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md active:scale-95 cursor-pointer order-1 sm:order-2 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Enregistrement du dossier...</span>
                        </>
                      ) : (
                        <>
                          <span>Soumettre ma candidature</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
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
