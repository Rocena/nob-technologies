"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ZoomIn, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { FadeUp } from "./animations";

export interface GalleryItem {
  id: string;
  title: string;
  category: "baies" | "cablage" | "equipements" | "digital" | "tous";
  categoryLabel: string;
  image: string;
  description: string;
  date?: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g6",
    title: "Formation pratique & manipulation sur baie GSM-R (SETER / TER Dakar)",
    category: "baies",
    categoryLabel: "Baies & Télécoms",
    image: "/images/projects/seter-gsmr-formation-rack.jpg",
    description: "Ateliers pratiques et formation in-situ dispensés aux techniciens de la SETER sur baie d'équipements GSM-R (BBU, liaisons radio sol-train et jarretières optiques) pour la sûreté d'exploitation du Train Express Régional de Dakar.",
  },
  {
    id: "g1",
    title: "Pose de goulottes murales & déroulage du câblage réseau",
    category: "cablage",
    categoryLabel: "Câblage & Goulottes",
    image: "/images/gallery/galerie-1-baie-brassage.jpg",
    description: "Équipe technique NOB Technologies sur site : pose des plinthes techniques murales Legrand et déroulage du câblage cuivre Cat 6A depuis le touret.",
  },
  {
    id: "g3",
    title: "Coffret mural 9U FINEN & baie de brassage (Dolima — Laiterie du Berger)",
    category: "baies",
    categoryLabel: "Baies & Coffrets",
    image: "/images/gallery/dolima-coffret-mural-finen.jpg",
    description: "Fixation murale et mise en service d’un coffret informatique FINEN à porte vitrée sécurisée avec passage des câbles réseau bleus et intégration Legrand pour Dolima.",
  },
  {
    id: "g_dolima_punchdown",
    title: "Peignage minutieux & raccordement LSA-IDC 24 ports (Dolima)",
    category: "cablage",
    categoryLabel: "Câblage & Raccordement",
    image: "/images/gallery/dolima-peignage-punchdown-rj45.jpg",
    description: "Vue arrière du panneau de brassage 24 ports Cat 6 : dénudage millimétré des paires torsadées, reprise de masse blindée et sertissage IDC conforme T568 pour l'usine Dolima.",
  },
  {
    id: "g_dolima_patchpanel",
    title: "Bandeau de brassage 24 ports RJ45 Cat 6 numéroté (Dolima)",
    category: "equipements",
    categoryLabel: "Baies & Brassage",
    image: "/images/gallery/dolima-cablage-panneau-brassage.jpg",
    description: "Face avant du bandeau de brassage RJ45 haute densité avec repérage des liaisons 1 à 24 et cordon patch pour l'infrastructure réseau Dolima.",
  },
  {
    id: "g2",
    title: "Boîte de sol Legrand encastrée & prises RJ45 repérées",
    category: "cablage",
    categoryLabel: "Câblage & Prises",
    image: "/images/gallery/galerie-2-cablage-serveurs.jpg",
    description: "Raccordement d'une boîte de sol au carrelage avec plastrons RJ45 identifiés (ports 9 à 13) et alimentation électrique pour postes de travail.",
  },
  {
    id: "g4",
    title: "Test de continuité RJ45 & contrôle au testeur numérique",
    category: "equipements",
    categoryLabel: "Tests & Certification",
    image: "/images/gallery/galerie-4-installation-reseau.jpg",
    description: "Vérification rigoureuse au testeur numérique de chaque liaison RJ45 sur le bandeau de brassage pour certifier l’intégrité des paires torsadées.",
  },
  {
    id: "g7",
    title: "Tirage de câbles en faux-plafond & passage en couloir",
    category: "cablage",
    categoryLabel: "Câblage & Chemins",
    image: "/images/gallery/galerie-7-salle-serveurs.jpg",
    description: "Passage sous dalle et cheminement en faux-plafond des faisceaux de câbles réseau le long du couloir de circulation sur escabeau.",
  },
  {
    id: "g8",
    title: "Sertissage & raccordement minutieux en boîte de sol",
    category: "cablage",
    categoryLabel: "Câblage & Prises",
    image: "/images/gallery/galerie-8-interconnexion.jpg",
    description: "Sertissage manuel précis des connecteurs RJ45 et ajustement des conducteurs à la pince coupante dans le boîtier de sol encastré.",
  },
  {
    id: "g9",
    title: "Goulottes techniques murales Legrand & blocs prises",
    category: "cablage",
    categoryLabel: "Câblage & Goulottes",
    image: "/images/gallery/galerie-9-armoire-reseau.jpg",
    description: "Pose des plinthes et goulottes compartimentées Legrand le long des murs, intégrant prises électriques rouges et plastrons RJ45 informatiques.",
  },
  {
    id: "g5",
    title: "Équipe technique en salle d'équipements (EPI & sécurité chantier)",
    category: "equipements",
    categoryLabel: "Chantiers & Équipe",
    image: "/images/gallery/galerie-5-equipement-telecom.jpg",
    description: "Supervision technique sur site par les ingénieurs NOB Technologies avec équipements de protection individuelle (gilets haute visibilité et casques).",
  },
  {
    id: "g10",
    title: "Centre de données & serveurs haute disponibilité",
    category: "baies",
    categoryLabel: "Baies & Datacenter",
    image: "/images/projects/reseau-switching-datacenter.jpg",
    description: "Architecture de serveurs et commutation haute densité en armoires fermées avec jarretières optiques et voyants d'activité pour infrastructure critique.",
  },
  {
    id: "g11",
    title: "Tableau de bord ERP & digitalisation des flux de gestion",
    category: "digital",
    categoryLabel: "ERP & Logiciels",
    image: "/images/projects/erp-dashboard.jpg",
    description: "Interface de gestion d'entreprise déployée sur-mesure (suivi des stocks, facturation, statistiques de vente et comptabilité analytique).",
  },
  {
    id: "g12",
    title: "Formation des apprenants sur les réseaux informatiques (Classe & Labs)",
    category: "digital",
    categoryLabel: "Formations Réseaux",
    image: "/images/gallery/formation-reseaux-apprenants-classe.jpg",
    description: "Session plénière et travaux dirigés en salle de cours : architectures réseaux d'entreprise, adressage IP, routage, commutation et manipulation sur ordinateurs portables.",
  },
  {
    id: "g_formation_ateliers",
    title: "Ateliers pratiques & manipulation réseaux par les apprenants",
    category: "digital",
    categoryLabel: "Ateliers Pratiques",
    image: "/images/gallery/formation-reseaux-ateliers-pratiques.jpg",
    description: "Mise en situation réelle : déroulage des liaisons réseau, connexion de baies et exercices pratiques de configuration par les apprenants encadrés par NOB Technologies.",
  },
  {
    id: "g_formation_cours",
    title: "Cours magistral & schémas d'architectures réseaux vidéoprojetés",
    category: "digital",
    categoryLabel: "Cours & Théorie",
    image: "/images/gallery/formation-reseaux-cours-instructeur.jpg",
    description: "Présentation interactive avec vidéoprojecteur : transmission des protocoles de télécoms, segmentation VLAN, sécurité périmétrique et préparation aux certifications.",
  },
  {
    id: "g_formation_videoproj",
    title: "Session intensive & lab de configuration en salle multimédia",
    category: "digital",
    categoryLabel: "Labs Multimédia",
    image: "/images/gallery/formation-reseaux-videoprojection-lab.jpg",
    description: "Atelier interactif en conditions réelles : simulations d'infrastructures, diagnostic réseau pas à pas et validation des compétences techniques des apprenants.",
  },
  {
    id: "g13",
    title: "Commutation de haute sécurité & liaisons RJ45 certifiées",
    category: "equipements",
    categoryLabel: "Équipements Réseau",
    image: "/images/projects/datacenter-firewall.jpg",
    description: "Bandeau de brassage haute densité avec repérage numérique des ports et cordons réseau de catégorie supérieure pour la sécurité périmétrique.",
  },
  {
    id: "g14",
    title: "Banc de configuration & hyperviseur VMware ESXi (Polyclinique P2A)",
    category: "equipements",
    categoryLabel: "Virtualisation VMware",
    image: "/images/gallery/polyclinique-p2a-serveur-vmware-esxi.jpg",
    description: "Installation et recette sur banc d'essai du serveur de virtualisation VMware ESXi (console DCUI), liaisons fibre optique SFP+ et routage pour la Polyclinique P2A de Dakar.",
  },
  {
    id: "g_p2a_baie",
    title: "Baie serveurs, switching Cisco & pare-feu (Polyclinique P2A)",
    category: "baies",
    categoryLabel: "Baies Médicales",
    image: "/images/gallery/polyclinique-p2a-baie-serveurs-complete.jpg",
    description: "Armoire technique complète en production : bandeaux de brassage Cat 6, switch de distribution Cisco, pare-feu réseau et serveurs de santé haute disponibilité pour la clinique.",
  },
  {
    id: "g_p2a_chassis",
    title: "Châssis de stockage hotswap & supervision onduleur (Polyclinique P2A)",
    category: "baies",
    categoryLabel: "Stockage & Onduleur",
    image: "/images/gallery/polyclinique-p2a-chassis-stockage-onduleur.jpg",
    description: "Détail des baies de disques durs hotswap sécurisées avec voyants de statut, commutateur d'agrégation et monitoring d'alimentation continue (UPS / onduleur 100%).",
  },
  {
    id: "g15",
    title: "Baie 42U, câblage Cat 6A & certification Fluke (Union Européenne Dakar)",
    category: "baies",
    categoryLabel: "Baies & Racks",
    image: "/images/projects/union-europeenne-baie-42u.jpg",
    description: "Déploiement complet du câblage réseau Cat 6A/7, baie de brassage 42U, peignage méthodique des liaisons et recette de conformité avec testeur Fluke pour la Délégation de l'Union Européenne à Dakar.",
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
          { id: "baies", label: "Baies & Racks" },
          { id: "cablage", label: "Câblage & Goulottes" },
          { id: "equipements", label: "Équipements & Tests" },
          { id: "digital", label: "ERP & Formations" },
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
