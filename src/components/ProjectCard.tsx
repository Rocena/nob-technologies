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
    <div className="group flex flex-col bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden">
      {/* Top Corporate Metadata Bar */}
      <div className="px-5 py-3.5 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between gap-3">
        <span className="text-[11px] font-semibold tracking-wide uppercase text-slate-700 bg-white px-2.5 py-1 rounded-md border border-slate-200/80 shadow-2xs">
          {project.sector || "Ingénierie & Systèmes"}
        </span>

        {project.clientLogo ? (
          <div className="h-7 px-2.5 py-0.5 rounded-md bg-white border border-slate-200/80 flex items-center justify-center shrink-0 shadow-2xs">
            <Image
              src={project.clientLogo}
              alt=""
              width={90}
              height={22}
              unoptimized
              className="max-h-4.5 max-w-[85px] w-auto h-auto object-contain"
            />
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 bg-emerald-50/80 px-2.5 py-0.5 rounded-md border border-emerald-200/60">
            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
            <span>Déployé</span>
          </div>
        )}
      </div>

      {/* Visual / Screenshot Area */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900 border-b border-slate-100">
        {!imageError ? (
          <Image
            src={previewSrc}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-400 p-6 text-center">
            <Globe className="w-10 h-10 text-cyan-500/50 mb-2" />
            <p className="text-xs font-semibold">{project.title}</p>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-white text-[10.5px] font-medium border border-slate-800 flex items-center gap-1.5 shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Infrastructure Active</span>
        </div>

        {/* Direct link button if website */}
        {project.websiteUrl && (
          <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4">
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-semibold text-xs shadow-lg transition-transform hover:scale-105 cursor-pointer"
            >
              <span>Accéder au site officiel</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-600" />
            </a>
          </div>
        )}
      </div>

      {/* Card Content & Meta */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-cyan-700 transition-colors mb-2.5 leading-snug">
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-5">
            {project.description}
          </p>
        </div>

        {/* Tags and Action */}
        <div>
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4 pt-3.5 border-t border-slate-100">
              {project.tags.slice(0, 4).map((tag, i) => (
                <span
                  key={i}
                  className="text-[10.5px] font-medium text-slate-600 bg-slate-100/90 px-2 py-0.5 rounded-md border border-slate-200/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {project.websiteUrl ? (
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full py-2 px-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 font-semibold text-xs transition-colors gap-1.5"
            >
              <span>Visiter la plateforme</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-600" />
            </a>
          ) : (
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium pt-1">
              <span>Ingénierie & déploiement sur site</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Certifié
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
