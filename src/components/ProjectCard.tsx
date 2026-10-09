"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ExternalLink, Globe, Shield, Sparkles, CheckCircle2 } from "lucide-react";

export interface ProjectItem {
  id: string | number;
  title: string;
  slug?: string;
  description?: string;
  sector?: string;
  websiteUrl?: string;
  previewScreenshotUrl?: string;
  coverImage?: any;
  clientLogo?: string;
  tags?: string[];
  isFlagship?: boolean;
}

export function ProjectCard({ project }: { project: ProjectItem }) {
  const [imageError, setImageError] = useState(false);

  const previewSrc =
    project.previewScreenshotUrl ||
    (typeof project.coverImage === "string"
      ? project.coverImage
      : project.coverImage?.url) ||
    "/images/gallery/galerie-1-baie-brassage.jpg";

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-cyan-500/50 transition-all duration-500 overflow-hidden">
      {/* Browser Window Frame Header */}
      <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>

        {project.websiteUrl && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800/80 text-[11px] font-mono text-slate-300 max-w-[220px] sm:max-w-xs truncate border border-slate-700/50">
            <Globe className="w-3 h-3 text-cyan-400 shrink-0" />
            <span className="truncate">{project.websiteUrl.replace(/^https?:\/\//, "")}</span>
          </div>
        )}

        <div className="w-6" />
      </div>

      {/* Screenshot Preview Area */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
        {!imageError ? (
          <Image
            src={previewSrc}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-400 p-6 text-center">
            <Globe className="w-12 h-12 text-cyan-500/50 mb-3" />
            <p className="text-sm font-semibold">{project.title}</p>
          </div>
        )}

        {/* Hover overlay with action button */}
        {project.websiteUrl && (
          <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-xl transition-transform hover:scale-105 cursor-pointer"
            >
              <span>Visiter le site en ligne</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

        {project.isFlagship && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-cyan-500/90 backdrop-blur-md text-slate-950 text-[11px] font-extrabold uppercase tracking-wider shadow-lg flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Référence Majeure
          </div>
        )}
      </div>

      {/* Card Content & Meta */}
      <div className="p-6 md:p-7 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-md border border-cyan-100">
              {project.sector || "Projet Web & Digital"}
            </span>
            {project.clientLogo ? (
              <div className="h-7 px-2.5 py-0.5 rounded-lg bg-slate-50 border border-slate-200/70 flex items-center justify-center shrink-0">
                <Image
                  src={project.clientLogo}
                  alt=""
                  width={90}
                  height={24}
                  unoptimized
                  className="max-h-5 max-w-[90px] w-auto h-auto object-contain"
                />
              </div>
            ) : project.websiteUrl ? (
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-400 hover:text-cyan-600 inline-flex items-center gap-1 font-medium transition-colors"
              >
                <span>Accéder</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ) : null}
          </div>

          <h3 className="text-xl font-bold text-slate-900 group-hover:text-cyan-600 transition-colors mb-3 leading-snug">
            {project.title}
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6">
            {project.description}
          </p>
        </div>

        {/* Tags and CTA */}
        <div>
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5 pt-4 border-t border-slate-100">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {project.websiteUrl && (
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-cyan-500 hover:bg-cyan-50/50 font-semibold text-xs transition-all gap-2"
            >
              <span>Ouvrir {project.websiteUrl.replace(/^https?:\/\//, "")}</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-500" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
