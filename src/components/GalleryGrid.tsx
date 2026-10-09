"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ZoomIn, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { FadeUp } from "./animations";

export interface GalleryItem {
  id: string;
  title: string;
  category: "baies" | "cablage" | "equipements" | "tous";
  categoryLabel: string;
  image: string;
  description: string;
  date?: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Baie de brassage 42U & peignage — Union Européenne (Dakar)",
    category: "baies",
    categoryLabel: "Baies & Racks",
    image: "/images/gallery/galerie-1-baie-brassage.jpg",
    description: "Peignage et repérage méthodique des liaisons RJ45 Cat 6A dans la baie informatique de la Délégation de l'Union Européenne à Dakar.",
  },
  {
    id: "g2",
    title: "Câblage serveurs & interconnexion — Union Européenne (Dakar)",
    category: "cablage",
    categoryLabel: "Câblage & Fibre",
    image: "/images/gallery/galerie-2-cablage-serveurs.jpg",
    description: "Interconnexion des commutateurs réseau (Switchs) et serveurs rackables avec cordons certifiés pour l'infrastructure de l'UE à Dakar.",
  },
  {
    id: "g3",
    title: "Armoire d'infrastructure 42U — Union Européenne (Dakar)",
    category: "baies",
    categoryLabel: "Baies & Racks",
    image: "/images/gallery/galerie-3-rack-infrastructure.jpg",
    description: "Installation complète d’une armoire réseau 42U avec gestion de l’alimentation et ventilation pour la Délégation de l'UE à Dakar.",
  },
  {
    id: "g4",
    title: "Raccordement réseau & tests Fluke — Union Européenne (Dakar)",
    category: "equipements",
    categoryLabel: "Équipements Réseau",
    image: "/images/gallery/galerie-4-installation-reseau.jpg",
    description: "Mise en service des équipements d’accès réseau et tests de réflectométrie sur liaisons montantes au bureau de l'UE à Dakar.",
  },
  {
    id: "g5",
    title: "Équipements télécoms & routeurs professionnels",
    category: "equipements",
    categoryLabel: "Équipements Réseau",
    image: "/images/gallery/galerie-5-equipement-telecom.jpg",
    description: "Configuration et sécurisation de passerelles télécoms et routeurs d’interconnexion multi-sites.",
  },
  {
    id: "g6",
    title: "Intégration de pare-feu et routeurs de tête",
    category: "equipements",
    categoryLabel: "Équipements Réseau",
    image: "/images/gallery/galerie-6-routeur-firewall.jpg",
    description: "Déploiement physique des firewalls de nouvelle génération et switchs d’agrégation ciblés.",
  },
  {
    id: "g7",
    title: "Salle serveurs & datacenter local — Union Européenne (Dakar)",
    category: "baies",
    categoryLabel: "Baies & Racks",
    image: "/images/gallery/galerie-7-salle-serveurs.jpg",
    description: "Vue d’ensemble de la salle serveurs et de la distribution réseau physique réalisée pour la Délégation de l'Union Européenne au Sénégal.",
  },
  {
    id: "g8",
    title: "Cheminement filaire sous faux-plancher — Union Européenne (Dakar)",
    category: "cablage",
    categoryLabel: "Câblage & Fibre",
    image: "/images/gallery/galerie-8-interconnexion.jpg",
    description: "Passage et fixation sous chemin de câbles pour garantir une circulation d’air optimale et zéro interférence dans les bureaux de l'UE à Dakar.",
  },
  {
    id: "g9",
    title: "Armoire murale de distribution d'étage",
    category: "baies",
    categoryLabel: "Baies & Racks",
    image: "/images/gallery/galerie-9-armoire-reseau.jpg",
    description: "Coffret mural 12U raccordant les postes de travail d’un plateau de bureaux avec switch PoE.",
  },
];

export function GalleryGrid() {
  const [activeFilter, setActiveFilter] = useState<string>("tous");
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const filteredItems = activeFilter === "tous"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  const openLightbox = (index: number) => {
    setSelectedItemIndex(index);
  };

  const closeLightbox = () => {
    setSelectedItemIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((selectedItemIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((selectedItemIndex + 1) % filteredItems.length);
    }
  };

  return (
    <div>
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12">
        {[
          { id: "tous", label: "Toutes les installations" },
          { id: "baies", label: "Baies & Racks 42U" },
          { id: "cablage", label: "Câblage & Fibre" },
          { id: "equipements", label: "Équipements & Télécoms" },
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              activeFilter === filter.id
                ? "bg-slate-900 text-cyan-400 shadow-md border border-slate-700"
                : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredItems.map((item, idx) => (
          <FadeUp key={item.id} delay={idx * 0.05}>
            <div
              onClick={() => openLightbox(idx)}
              className="group relative rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-cyan-500/50 transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay hover badge */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500 text-slate-950 font-bold text-xs shadow-lg">
                    <ZoomIn className="w-3.5 h-3.5" /> Agrandir la photo
                  </span>
                </div>

                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-cyan-300 border border-white/10 uppercase tracking-wider">
                  {item.categoryLabel}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1.5 group-hover:text-cyan-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedItemIndex !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center"
          >
            <div className="relative w-full h-[60vh] sm:h-[70vh] rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black">
              <Image
                src={filteredItems[selectedItemIndex].image}
                alt={filteredItems[selectedItemIndex].title}
                fill
                priority
                className="object-contain"
              />
            </div>
            
            <div className="mt-4 text-center text-white max-w-xl">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                {filteredItems[selectedItemIndex].categoryLabel} &bull; Photo {selectedItemIndex + 1} / {filteredItems.length}
              </span>
              <h4 className="text-lg font-bold">
                {filteredItems[selectedItemIndex].title}
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                {filteredItems[selectedItemIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
