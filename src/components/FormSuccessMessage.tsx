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
  title = "Votre demande a bien été transmise",
  message = "Nous accusons bonne réception de vos informations. Nos ingénieurs NOB TECHNOLOGIES analysent vos spécifications techniques et vous contacteront avec une réponse concrète sous 24h ouvrées.",
  badge = "Prise en charge confirmée",
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
      {/* Aura diffuse néon d'arrière-plan (blur-3xl) */}
      <div
        className={`absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-opacity duration-1000 ${
          isDark
            ? "bg-gradient-to-tr from-emerald-500/20 via-teal-500/15 to-cyan-500/10"
            : "bg-gradient-to-tr from-emerald-400/25 via-teal-300/20 to-cyan-400/15"
        }`}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Check Icon with Multi-ring Radar Wave */}
        <div className="relative mb-6 flex items-center justify-center">
          {/* Onde radar 1 (vague principale) */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0.7 }}
            animate={{ scale: [0.8, 1.5, 2.1], opacity: [0.7, 0.35, 0] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className={`absolute w-20 h-20 rounded-full border ${
              isDark
                ? "border-emerald-400/60 bg-emerald-500/15"
                : "border-emerald-500/50 bg-emerald-500/10"
            }`}
            aria-hidden="true"
          />

          {/* Onde radar 2 (vague déphasée pour effet continu) */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0.6 }}
            animate={{ scale: [0.8, 1.5, 2.1], opacity: [0.6, 0.3, 0] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "easeOut",
              delay: 1.3,
            }}
            className={`absolute w-20 h-20 rounded-full border ${
              isDark
                ? "border-teal-400/50 bg-teal-500/10"
                : "border-teal-500/40 bg-teal-500/10"
            }`}
            aria-hidden="true"
          />

          {/* Halo doux statique immédiat */}
          <div
            className={`absolute w-24 h-24 rounded-full blur-md ${
              isDark ? "bg-emerald-400/20" : "bg-emerald-500/15"
            }`}
            aria-hidden="true"
          />

          {/* Icône de validation avec animation spring */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              damping: 16,
              stiffness: 260,
              delay: 0.1,
            }}
            className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl relative z-10 ${
              isDark
                ? "bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-slate-950 ring-4 ring-emerald-500/20 shadow-[0_0_35px_rgba(16,185,129,0.35)]"
                : "bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-500 text-white ring-4 ring-emerald-100 shadow-[0_10px_30px_rgba(16,185,129,0.25)]"
            }`}
          >
            <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
          </motion.div>
        </div>

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
