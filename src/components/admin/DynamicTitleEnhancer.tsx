'use client'

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export interface ContextConfig {
  title: string;
  subtitle: string;
  badge: string;
}

const collectionContextMap: Record<string, ContextConfig> = {
  articles: {
    title: 'Nouvel Article',
    subtitle: 'Rédigez et publiez une nouvelle analyse ou chronique tech pour le blog',
    badge: 'BLOG & ÉDITORIAL',
  },
  services: {
    title: 'Nouveau Service',
    subtitle: 'Définissez une nouvelle prestation ou offre d’expertise technologique',
    badge: 'EXPERTISES & OFFRES',
  },
  projects: {
    title: 'Nouvelle Réalisation',
    subtitle: 'Mettez en valeur une étude de cas ou un déploiement client à grande échelle',
    badge: 'PORTFOLIO & PROJETS',
  },
  pages: {
    title: 'Nouvelle Page Web',
    subtitle: 'Construisez une nouvelle page avec l’éditeur visuel de blocs modulaires',
    badge: 'CMS & NAVIGATION',
  },
  quotes: {
    title: 'Nouveau Devis',
    subtitle: 'Établissez une proposition commerciale chiffrée pour un prospect ou client',
    badge: 'COMMERCIAL & VENTES',
  },
  invoices: {
    title: 'Nouvelle Facture',
    subtitle: 'Générez une facture officielle et suivez l’état de son règlement',
    badge: 'FINANCE & FACTURATION',
  },
  customers: {
    title: 'Nouveau Client',
    subtitle: 'Enregistrez les coordonnées et informations de compte d’une entreprise cliente',
    badge: 'CRM & CLIENTS',
  },
  clients: {
    title: 'Nouveau Logo Partenaire / Client',
    subtitle: 'Ajoutez une référence client pour les carrousels de la page d’accueil',
    badge: 'RÉFÉRENCES',
  },
  testimonials: {
    title: 'Nouveau Témoignage',
    subtitle: 'Ajoutez un avis ou retour d’expérience certifié pour renforcer la crédibilité',
    badge: 'AVIS CLIENTS',
  },
  partners: {
    title: 'Nouveau Partenaire Technologique',
    subtitle: 'Ajoutez un éditeur, constructeur ou partenaire certifié au catalogue',
    badge: 'ALLIANCES & ÉDITEURS',
  },
  faq: {
    title: 'Nouvelle Question FAQ',
    subtitle: 'Rédigez une question récurrente et sa réponse détaillée pour aider vos visiteurs',
    badge: 'SUPPORT & FAQ',
  },
  'job-offers': {
    title: 'Nouvelle Offre d’Emploi',
    subtitle: 'Publiez une opportunité de recrutement pour attirer les meilleurs talents',
    badge: 'RECRUTEMENT & TALENTS',
  },
  'pricing-plans': {
    title: 'Nouveau Forfait / Tarif',
    subtitle: 'Configurez une formule tarifaire ou un pack d’accompagnement sur mesure',
    badge: 'GRILLE TARIFAIRE',
  },
  media: {
    title: 'Nouveau Média',
    subtitle: 'Téléversez une image haute résolution, un logo ou un document technique',
    badge: 'MÉDIATHÈQUE',
  },
  news: {
    title: 'Nouvelle Actualité',
    subtitle: 'Diffusez un communiqué officiel ou une annonce d’entreprise',
    badge: 'COMMUNICATION',
  },
  users: {
    title: 'Nouvel Utilisateur',
    subtitle: 'Créez un compte collaborateur et définissez ses droits d’accès au back-office',
    badge: 'SYSTÈME & UTILISATEURS',
  },
  'contact-messages': {
    title: 'Nouveau Message de Contact',
    subtitle: 'Enregistrez manuellement une demande de contact ou prise de rendez-vous',
    badge: 'MESSAGERIE',
  },
  'activity-logs': {
    title: 'Nouvel Événement Journalisé',
    subtitle: 'Enregistrez un log d’audit ou événement d’infrastructure',
    badge: 'AUDIT & LOGS',
  },
};

export const DynamicTitleEnhancer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    // Check if we are on a create route in any collection
    const isCreatePage = pathname && pathname.includes('/create');
    if (!isCreatePage) {
      // Remove any previously injected dynamic headers when navigating away from create
      const oldHeader = document.getElementById('custom-dynamic-header');
      if (oldHeader) oldHeader.remove();
      return;
    }

    // Extract collection slug from pathname: e.g. /admin/collections/articles/create -> articles
    const parts = pathname.split('/');
    const collIdx = parts.indexOf('collections');
    const collectionSlug = collIdx !== -1 && parts[collIdx + 1] ? parts[collIdx + 1] : parts[parts.length - 2];

    const config = collectionContextMap[collectionSlug] || {
      title: 'Nouvelle Création',
      subtitle: 'Complétez les champs ci-dessous pour créer et publier ce nouvel élément.',
      badge: 'NOUVEAU',
    };

    // Update document.title on tab
    document.title = `${config.title} - NOB TECHNOLOGIES`;

    const interval = setInterval(() => {
      // Find the header title element inside Payload CMS 3
      const targetSelectors = [
        '.doc-header__title',
        'h1.render-title',
        '.render-title',
        'h1.doc-header__title',
        'h1.fallback',
        'span[title*="Sans titre"]',
        'h1[title*="Sans titre"]',
        'h1.document-header__title'
      ];
      
      const titleElem = document.querySelector(targetSelectors.join(', '));
      const container = titleElem ? titleElem.closest('.doc-header, .document-header, header, .drawer__header, main') : document.querySelector('.doc-header, header');

      if (titleElem && container) {
        // Check if an input field already has a non-empty user-typed title
        const typedTitleInput = document.querySelector('input[name="title"], input[name="name"], input[name="headline"]') as HTMLInputElement | null;
        const hasUserTypedTitle = typedTitleInput && typedTitleInput.value.trim().length > 0;

        const existingCustomHeader = document.getElementById('custom-dynamic-header');

        if (hasUserTypedTitle) {
          // If the user has typed their title, let Payload render it or show the typed title
          if (existingCustomHeader) {
            const titleH1 = existingCustomHeader.querySelector('.dynamic-title-text');
            if (titleH1) titleH1.textContent = typedTitleInput.value;
          }
        } else {
          // Empty or untyped: show our customized contextual title & subtitle
          (titleElem as HTMLElement).style.display = 'none';

          if (!existingCustomHeader) {
            const wrapper = document.createElement('div');
            wrapper.id = 'custom-dynamic-header';
            wrapper.style.display = 'flex';
            wrapper.style.flexDirection = 'column';
            wrapper.style.gap = '6px';
            wrapper.style.marginBottom = '16px';
            wrapper.style.paddingTop = '4px';

            // Category / Badge Pill
            const badgePill = document.createElement('div');
            badgePill.style.display = 'inline-flex';
            badgePill.style.alignItems = 'center';
            badgePill.style.gap = '6px';
            badgePill.style.width = 'fit-content';
            badgePill.style.padding = '3px 10px';
            badgePill.style.borderRadius = '9999px';
            badgePill.style.fontSize = '10px';
            badgePill.style.fontWeight = '700';
            badgePill.style.letterSpacing = '0.08em';
            badgePill.style.textTransform = 'uppercase';
            badgePill.style.background = 'rgba(0, 212, 255, 0.12)';
            badgePill.style.border = '1px solid rgba(0, 212, 255, 0.35)';
            badgePill.style.color = '#00D4FF';
            badgePill.style.fontFamily = 'monospace';
            badgePill.textContent = `CRÉATION // ${config.badge}`;

            // Main Contextual Title
            const newTitle = document.createElement('h1');
            newTitle.className = 'dynamic-title-text';
            newTitle.innerText = config.title;
            newTitle.style.margin = '0';
            newTitle.style.fontSize = '1.85rem';
            newTitle.style.fontWeight = '800';
            newTitle.style.letterSpacing = '-0.025em';
            newTitle.style.background = 'linear-gradient(135deg, #00D4FF 0%, #38BDF8 60%, #60A5FA 100%)';
            newTitle.style.webkitBackgroundClip = 'text';
            newTitle.style.webkitTextFillColor = 'transparent';

            // Subtitle Description
            const subTitle = document.createElement('p');
            subTitle.innerText = config.subtitle;
            subTitle.style.margin = '0';
            subTitle.style.fontSize = '0.9rem';
            subTitle.style.color = 'var(--theme-elevation-500, #94A3B8)';
            subTitle.style.fontWeight = '400';
            subTitle.style.lineHeight = '1.4';

            wrapper.appendChild(badgePill);
            wrapper.appendChild(newTitle);
            wrapper.appendChild(subTitle);

            // Insert seamlessly next to the original title
            if (titleElem.parentNode) {
              titleElem.parentNode.insertBefore(wrapper, titleElem.nextSibling);
            }
          }
        }
      }
    }, 60);

    return () => clearInterval(interval);
  }, [pathname]);

  return <>{children}</>;
};
