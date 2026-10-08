"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormSuccessMessageProps {
  title?: string;
  message?: string;
  badge?: string;
  onReset?: () => void;
  resetButtonText?: string;
  variant?: "light" | "dark";
}

export function FormSuccessMessage({
  title = "Merci d'avoir rempli notre formulaire !",
  message = "Votre demande a bien été envoyée et prise en compte par nos équipes. Un ingénieur NOB TECHNOLOGIES analysera vos spécifications et vous recontactera personnellement sous 24h ouvrées.",
  badge = "Demande envoyée & prise en compte",
  onReset,
  resetButtonText = "Fermer la fenêtre",
  variant = "light",
}: FormSuccessMessageProps) {
  const isDark = variant === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-2xl p-8 sm:p-12 text-center overflow-hidden relative ${
        isDark
          ? "bg-[#0B132B]/80 border border-emerald-500/30 text-white shadow-[0_0_60px_rgba(16,185,129,0.15)]"
          : "bg-emerald-50/70 border border-emerald-200 text-slate-900 shadow-xl shadow-emerald-950/5"
      }`}
    >
      {/* Decorative ambient aura */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
          isDark ? "bg-emerald-500/15" : "bg-emerald-400/20"
        }`}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Check Icon with Radar Ripple */}
        <div className="relative mb-6">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: [1, 1.4, 1.8], opacity: [0.6, 0.3, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            className={`absolute inset-0 rounded-full ${
              isDark ? "bg-emerald-400/30" : "bg-emerald-500/25"
            }`}
          />
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 260,
              delay: 0.1,
            }}
            className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg relative z-10 ${
              isDark
                ? "bg-gradient-to-tr from-emerald-600 to-teal-400 text-[#020617] ring-4 ring-emerald-500/20 shadow-emerald-500/30"
                : "bg-gradient-to-tr from-emerald-500 to-teal-500 text-white ring-4 ring-emerald-100 shadow-emerald-500/20"
            }`}
          >
            <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>{badge}</span>
        </motion.div>

        {/* Main Title */}
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          {title}
        </motion.h3>

        {/* Explanatory Message */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className={`text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-8 ${
            isDark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {message}
        </motion.p>

        {/* Commitment Micro-Cards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className={`grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md p-4 rounded-xl border mb-8 text-left ${
            isDark
              ? "bg-white/[0.03] border-white/10 text-slate-300"
              : "bg-white/80 border-slate-200 text-slate-700 shadow-sm"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
            <div className="text-xs">
              <span className="font-semibold block text-slate-900 dark:text-white">Délai garanti</span>
              <span className="text-slate-500 text-[11px]">Réponse sous 24h ouvrées</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <div className="text-xs">
              <span className="font-semibold block text-slate-900 dark:text-white">Confidentialité</span>
              <span className="text-slate-500 text-[11px]">Données strictement protégées</span>
            </div>
          </div>
        </motion.div>

        {/* Reset / Action Button */}
        {onReset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <Button
              onClick={onReset}
              variant={isDark ? "default" : "outline"}
              className={
                isDark
                  ? "bg-white/10 hover:bg-white/20 text-white font-medium"
                  : "border-slate-300 hover:bg-slate-100 text-slate-800 font-semibold"
              }
            >
              {resetButtonText}
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
