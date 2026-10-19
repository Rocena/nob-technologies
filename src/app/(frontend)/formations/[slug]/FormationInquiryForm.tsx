"use client";

import React, { useState, useEffect } from "react";
import {
  Send,
  Loader2,
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  HelpCircle,
  GraduationCap,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  MapPin,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { FormationSession } from "@/data/formations";

interface FormationInquiryFormProps {
  formationTitle: string;
  formationSlug: string;
  sessions?: FormationSession[];
}

export function FormationInquiryForm({
  formationTitle,
  formationSlug,
  sessions = [],
}: FormationInquiryFormProps) {
  const [captchaA, setCaptchaA] = useState(3);
  const [captchaB, setCaptchaB] = useState(4);
  const [captchaAnswer, setCaptchaAnswer] = useState("");

  const [candidateName, setCandidateName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentStatus, setCurrentStatus] = useState("Salarié en activité");
  const [currentLevel, setCurrentLevel] = useState("Intermédiaire (bases réseau/système)");
  const [selectedSession, setSelectedSession] = useState(
    sessions[0]?.name || "Prochaine Rentrée Officielle"
  );
  const [preferredSchedule, setPreferredSchedule] = useState("Cours du soir (18h30 - 21h00)");
  const [format, setFormat] = useState("Hybride (Campus Dakar + Visio interactif)");
  const [motivation, setMotivation] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedAdmission, setSubmittedAdmission] = useState<{
    id: string;
    candidateName: string;
    email: string;
    targetSession: string;
  } | null>(null);

  useEffect(() => {
    setCaptchaA(Math.floor(Math.random() * 8) + 2);
    setCaptchaB(Math.floor(Math.random() * 8) + 1);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (Number(captchaAnswer) !== captchaA + captchaB) {
      setErrorMessage("Réponse au calcul de sécurité anti-spam incorrecte. Veuillez corriger.");
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
          formationTitle,
          formationSlug,
          targetSession: selectedSession,
          preferredSchedule,
          currentLevel,
          currentStatus,
          format,
          motivation,
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
          targetSession: selectedSession,
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

  if (submittedAdmission) {
    return (
      <div
        id="candidature"
        className="bg-slate-900/95 border border-emerald-500/40 rounded-3xl p-8 sm:p-10 backdrop-blur-xl relative overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center max-w-xl mx-auto space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 inline-block mb-3">
              Dossier Reçu &bull; Réf. #ADM-{submittedAdmission.id.slice(-6).toUpperCase()}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Candidature enregistrée avec succès !
            </h3>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">
              Merci <strong>{submittedAdmission.candidateName}</strong>. Votre dossier pour la formation{" "}
              <strong className="text-cyan-300">{formationTitle}</strong> ({submittedAdmission.targetSession}) est désormais entre les mains de notre jury d&apos;admission.
            </p>
          </div>

          {/* Details summary */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 text-left text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Email de notification :</span>
              <span className="font-semibold text-white">{submittedAdmission.email}</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Cohorte ciblée :</span>
              <span className="font-semibold text-cyan-400">{submittedAdmission.targetSession}</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Délai d&apos;examen :</span>
              <span className="font-semibold text-emerald-400">Sous 24h ouvrées</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Un email d&apos;accusé de réception automatique vient d&apos;être expédié à votre adresse. Dès que l&apos;administrateur aura statué sur votre dossier dans le back-office, vous recevrez un email officiel d&apos;admission avec votre convocation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={`https://wa.me/221774138586?text=${encodeURIComponent(
                `Bonjour NOB TECHNOLOGIES, je viens de soumettre mon dossier d'admission pour la formation ${formationTitle} (Réf #ADM-${submittedAdmission.id.slice(-6).toUpperCase()}).`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-600/20"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Échanger sur WhatsApp (+221 77 413 85 86)</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setSubmittedAdmission(null);
                setMotivation("");
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
            >
              Soumettre une autre demande
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="candidature"
      className="bg-slate-900/90 border border-cyan-500/30 rounded-3xl p-6 sm:p-10 backdrop-blur-xl relative overflow-hidden shadow-2xl"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Title & Context */}
      <div className="relative z-10 mb-8 pb-6 border-b border-white/10">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Dossier d&apos;inscription &amp; Candidature
        </h3>
        <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
          Sélectionnez votre session de rentrée ci-dessous et complétez vos coordonnées. Chaque candidature est examinée individuellement par l&apos;équipe de direction technique de NOB TECHNOLOGIES. Vous recevrez une notification par email dès validation de votre inscription.
        </p>
      </div>

      {/* Sessions Quick Pick Cards */}
      {sessions.length > 0 && (
        <div className="relative z-10 mb-8 space-y-3">
          <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
            1. Choisissez votre session de rentrée :
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {sessions.map((sess, idx) => {
              const isSelected = selectedSession === sess.name;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedSession(sess.name)}
                  className={`text-left p-4 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? "bg-gradient-to-b from-cyan-950/70 to-slate-900 border-cyan-400 shadow-lg shadow-cyan-950/50"
                      : "bg-slate-950/60 border-white/10 hover:border-white/30 text-slate-400"
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          sess.status === "limited"
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        }`}
                      >
                        {sess.status === "limited"
                          ? "Dernières places"
                          : `${sess.availableSeats || 10} places`}
                      </span>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      )}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white pt-1">
                      {sess.name}
                    </div>
                    {sess.startDate && (
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Démarrage : {sess.startDate}</span>
                      </div>
                    )}
                    {sess.schedule && (
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{sess.schedule}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-500 pt-2 border-t border-white/5 mt-3 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span className="truncate">{sess.location || "Campus Dakar & Visio"}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm flex items-center gap-2">
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
        <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
          2. Coordonnées &amp; Profil du candidat :
        </label>

        {/* Row 1: Nom & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Nom complet du candidat *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                required
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                placeholder="ex. Mamadou Lamine Ndiaye"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
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
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre.email@domaine.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Row 2: Téléphone & Situation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Téléphone / WhatsApp direct *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+221 77 000 00 00"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Situation actuelle / Entreprise / Études
            </label>
            <div className="relative">
              <Building className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={currentStatus}
                onChange={(e) => setCurrentStatus(e.target.value)}
                placeholder="ex. Salarié IT / Reconversion / Étudiant Master..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Row 3: Créneaux & Modalité */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Session sélectionnée
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={selectedSession}
                onChange={(e) => setSelectedSession(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition-colors"
              >
                {sessions.map((s, idx) => (
                  <option key={idx} value={s.name}>
                    {s.name}
                  </option>
                ))}
                {sessions.length === 0 && (
                  <option value="Prochaine Rentrée">Prochaine Rentrée</option>
                )}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Horaires &amp; Rythme préféré
            </label>
            <div className="relative">
              <Clock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={preferredSchedule}
                onChange={(e) => setPreferredSchedule(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition-colors"
              >
                <option value="Cours du soir (18h30 - 21h00)">Cours du soir (18h30 - 21h00)</option>
                <option value="Samedi matin intensif (9h00 - 13h00)">Samedi matin (9h00 - 13h00)</option>
                <option value="Format Bootcamp plein temps">Bootcamp plein temps</option>
                <option value="Horaires flexibles">Horaires flexibles</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Niveau technique actuel
            </label>
            <div className="relative">
              <GraduationCap className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={currentLevel}
                onChange={(e) => setCurrentLevel(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition-colors"
              >
                <option value="Débutant motivé en reconversion">Débutant motivé</option>
                <option value="Intermédiaire (bases réseau/système)">Intermédiaire (avec bases)</option>
                <option value="Professionnel IT confirmé">Professionnel IT confirmé</option>
              </select>
            </div>
          </div>
        </div>

        {/* Row 4: Motivation */}
        <div>
          <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Votre projet professionnel &amp; Vos attentes pour ce programme *
          </label>
          <textarea
            required
            rows={4}
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
            placeholder="Décrivez brièvement vos motivations, les compétences que vous souhaitez acquérir (ex: passer la certification, obtenir une promotion, changer de poste)..."
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none"
          />
        </div>

        {/* Captcha anti-bot */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              Validation de sécurité anti-spam : Combien font <strong>{captchaA} + {captchaB}</strong> ?
            </span>
          </div>
          <input
            type="number"
            required
            value={captchaAnswer}
            onChange={(e) => setCaptchaAnswer(e.target.value)}
            placeholder="?"
            className="w-20 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/20 text-white text-center text-sm font-mono font-bold focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm tracking-wide transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-cyan-500/20 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transmission de votre dossier d&apos;admission...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Valider &amp; Soumettre mon dossier d&apos;admission</span>
            </>
          )}
        </button>

        <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-2 pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Examen sous 24h &bull; Notification officielle d&apos;admission transmise par email &bull; Confidentialité garantie</span>
        </p>
      </form>
    </div>
  );
}
