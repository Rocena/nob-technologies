'use client';

import { useState, useRef, useEffect } from 'react';
import {
  X,
  Minus,
  Send,
  User,
  Mail,
  Phone,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Star,
  Download,
  RotateCcw,
  LogOut,
  Sparkles,
  MessageSquare,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'bot' | 'user';
  text: string;
  time: string;
  suggestions?: string[];
}

interface VisitorProfile {
  name: string;
  email: string;
  phone: string;
  company: string;
}

interface StoredChatSession {
  sessionId: string;
  phase: 'prechat' | 'active' | 'ended';
  visitor: VisitorProfile;
  messages: Message[];
  contactMessageId?: string | null;
  hasNotifiedFirstMessage?: boolean;
  startedAt: number;
  lastActivityAt: number;
  rating?: number | null;
}

interface KnowledgeItem {
  keywords: string[];
  response: string;
}

const SESSION_STORAGE_KEY = 'nobtech_chat_session_v1';
const VISITOR_PROFILE_KEY = 'nobtech_visitor_profile_v1';
const SESSION_TIMEOUT_MS = 12 * 60 * 60 * 1000; // 12 hours corporate session expiration

function getTime() {
  return new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

function generateSessionId() {
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  const timePart = Date.now().toString(36).slice(-3).toUpperCase();
  return `SES-${timePart}${randomPart}`;
}

// Logo public et officiel de WhatsApp (cercle avec combiné et bulle de discussion)
export function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="WhatsApp"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

// Illustration d'un jeune homme africain souriant avec coupe afro soignée, lunettes modernes et fond cyan radieux
export function AssistantAvatar({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Koffi, Conseiller virtuel NOBTECH">
      <defs>
        {/* Fond dégradé tech NOBTECH */}
        <radialGradient id="koffi-bg" cx="32" cy="24" r="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="65%" stopColor="#0369A1" />
          <stop offset="100%" stopColor="#06182C" />
        </radialGradient>

        {/* Halo lumineux */}
        <radialGradient id="koffi-halo" cx="32" cy="18" r="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
        </radialGradient>

        {/* Teint de peau africain chaleureux et riche */}
        <linearGradient id="koffi-skin" x1="32" y1="16" x2="32" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#9C5E2D" />
          <stop offset="45%" stopColor="#874E23" />
          <stop offset="100%" stopColor="#693916" />
        </linearGradient>

        {/* Ombrage du cou */}
        <linearGradient id="koffi-neck" x1="32" y1="40" x2="32" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4A240C" />
          <stop offset="100%" stopColor="#6B3916" />
        </linearGradient>

        {/* Dégradé afro sur les tempes (taper fade) */}
        <linearGradient id="koffi-fade-l" x1="16" y1="20" x2="20" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#111116" />
          <stop offset="60%" stopColor="#3E2211" />
          <stop offset="100%" stopColor="#874E23" />
        </linearGradient>
        <linearGradient id="koffi-fade-r" x1="48" y1="20" x2="44" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#111116" />
          <stop offset="60%" stopColor="#3E2211" />
          <stop offset="100%" stopColor="#874E23" />
        </linearGradient>

        {/* Veste de costume corporate */}
        <linearGradient id="koffi-suit" x1="32" y1="46" x2="32" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>

        {/* Reflets verres lunettes */}
        <linearGradient id="koffi-lens" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
          <stop offset="50%" stopColor="#00D4FF" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.05" />
        </linearGradient>

        <style>{`
          @keyframes koffiBlink {
            0%, 90%, 100% { transform: scaleY(1); }
            95% { transform: scaleY(0.08); }
          }
          @keyframes koffiHeadTilt {
            0%, 100% { transform: rotate(0deg) translateY(0); }
            24% { transform: rotate(-1.8deg) translateY(-0.4px); }
            50% { transform: rotate(0.4deg) translateY(0.2px); }
            76% { transform: rotate(2deg) translateY(-0.3px); }
            92% { transform: rotate(-0.5deg) translateY(0.1px); }
          }
          @keyframes koffiBrowsLift {
            0%, 88%, 100% { transform: translateY(0); }
            94% { transform: translateY(-0.7px); }
          }
          .koffi-head-animated {
            transform-origin: 32px 50px;
            animation: koffiHeadTilt 5.5s ease-in-out infinite;
          }
          .koffi-eyes-blink {
            transform-origin: 32px 28px;
            animation: koffiBlink 3.8s ease-in-out infinite;
          }
          .koffi-brows-lift {
            transform-origin: 32px 23px;
            animation: koffiBrowsLift 3.8s ease-in-out infinite;
          }
        `}</style>
      </defs>

      {/* Cercle de fond & liseré cyan */}
      <circle cx="32" cy="32" r="31" fill="url(#koffi-bg)" stroke="#38BDF8" strokeWidth="1.5" />
      <circle cx="32" cy="20" r="22" fill="url(#koffi-halo)" />

      {/* Buste : Veste sombre & Chemise blanche avec cravate tech cyan */}
      <path d="M8 64 C8 52 18 47 32 47 C46 47 56 52 56 64 Z" fill="url(#koffi-suit)" />
      <path d="M24 48 L32 58 L40 48 L36 47 L32 53 L28 47 Z" fill="#FFFFFF" />
      <path d="M30.5 53 L32 64 L33.5 53 Z" fill="#00D4FF" />
      <path d="M23 49 L32 59 L41 49" stroke="#E2E8F0" strokeWidth="1" fill="none" strokeLinecap="round" />

      {/* Cou avec ombrage */}
      <path d="M24.5 39 H39.5 V50 C39.5 52.5 36.5 54 32 54 C27.5 54 24.5 52.5 24.5 50 Z" fill="url(#koffi-neck)" />

      {/* TÊTE ANIMÉE DE KOFFI (Dégradé afro, barbe soignée, traits nets) */}
      <g className="koffi-head-animated">
        {/* 1. COIFFURE DÉGRADÉ AFRO (AFRO TAPER FADE) */}
        {/* Volume afro supérieur texturé */}
        <path
          d="M17 19 C15 13 21 6 32 6 C43 6 49 13 47 19 C48 22 47 25 46 27 C44 23 43 18 39 16 C34 14 30 14 25 16 C21 18 20 23 18 27 C17 25 16 22 17 19 Z"
          fill="#111116"
        />
        {/* Boucles afro et épaisseur */}
        <circle cx="21" cy="14" r="7.5" fill="#141419" />
        <circle cx="32" cy="10" r="8.5" fill="#181820" />
        <circle cx="43" cy="14" r="7.5" fill="#141419" />
        <circle cx="26" cy="10.5" r="7" fill="#16161D" />
        <circle cx="38" cy="10.5" r="7" fill="#16161D" />
        {/* Textures de boucles afro */}
        <path d="M27 8 C29 6.8 32 6.8 34 8" stroke="#333342" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M19 12 C21 10.5 23 10.5 25 11.5" stroke="#333342" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M39 11.5 C41 10.5 43 10.5 45 12" stroke="#333342" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M30 13 C32 12 34 12 36 13" stroke="#2D2D3A" strokeWidth="1.5" strokeLinecap="round" />

        {/* Dégradé / Fade sur les tempes et côtés (Taper fade) */}
        <path d="M16 22 C16 22 19 23 19 29 L16.5 29 Z" fill="url(#koffi-fade-l)" />
        <path d="M48 22 C48 22 45 23 45 29 L47.5 29 Z" fill="url(#koffi-fade-r)" />

        {/* Oreilles bien proportionnées avec relief */}
        <ellipse cx="17.5" cy="32" rx="3.2" ry="5.2" fill="#7D461E" />
        <ellipse cx="17.5" cy="32" rx="1.8" ry="3.2" fill="#4D250C" />
        <ellipse cx="46.5" cy="32" rx="3.2" ry="5.2" fill="#7D461E" />
        <ellipse cx="46.5" cy="32" rx="1.8" ry="3.2" fill="#4D250C" />

        {/* 2. STRUCTURE DU VISAGE SCULPTÉE & EXPRESSIVE */}
        <path
          d="M19 24 C19 18 23 16 32 16 C41 16 45 18 45 24 C45 32 43 43.5 32 43.5 C21 43.5 19 32 19 24 Z"
          fill="url(#koffi-skin)"
        />

        {/* Contour net afro sur le front (Line-up / Barbershop contour) */}
        <path d="M20 22.5 H44 V24 C41 21.5 37 21 32 21 C27 21 23 21.5 20 24 Z" fill="#121217" />
        <path d="M20 22.5 L20 25.5" stroke="#121217" strokeWidth="1.8" strokeLinecap="square" />
        <path d="M44 22.5 L44 25.5" stroke="#121217" strokeWidth="1.8" strokeLinecap="square" />

        {/* Pommettes définies pour sculpter les traits */}
        <ellipse cx="23" cy="31" rx="2.8" ry="1.6" fill="#A86A38" fillOpacity="0.4" />
        <ellipse cx="41" cy="31" rx="2.8" ry="1.6" fill="#A86A38" fillOpacity="0.4" />

        {/* 3. SOURCILS BIEN DESSINÉS */}
        <g className="koffi-brows-lift">
          <path d="M22 23.5 C24.5 22 28 22.4 29.5 23.6" stroke="#0E0E12" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M34.5 23.6 C36 22.4 39.5 22 42 23.5" stroke="#0E0E12" strokeWidth="2.2" strokeLinecap="round" />
        </g>

        {/* 4. YEUX VIVANTS, EXPRESSIFS & CLIGNANTS */}
        <g className="koffi-eyes-blink">
          {/* Blanc des yeux avec profondeur */}
          <ellipse cx="25.8" cy="27.8" rx="3.2" ry="2.2" fill="#E2E8F0" />
          <ellipse cx="38.2" cy="27.8" rx="3.2" ry="2.2" fill="#E2E8F0" />
          {/* Iris sombre intense */}
          <circle cx="25.8" cy="27.8" r="1.9" fill="#101015" />
          <circle cx="38.2" cy="27.8" r="1.9" fill="#101015" />
          {/* Éclat de vie / Reflet blanc */}
          <circle cx="26.6" cy="27.1" r="0.8" fill="#FFFFFF" />
          <circle cx="39" cy="27.1" r="0.8" fill="#FFFFFF" />
          {/* Paupière supérieure nette */}
          <path d="M22.8 26.8 C24.5 25.8 27.2 25.8 28.8 26.8" stroke="#3D1E0B" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M35.2 26.8 C36.8 25.8 39.5 25.8 41.2 26.8" stroke="#3D1E0B" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* 5. LUNETTES TECH DESIGNER MODERNES */}
        <rect x="20.5" y="23.2" width="10.2" height="9.2" rx="3" fill="url(#koffi-lens)" stroke="#090D16" strokeWidth="1.8" />
        <rect x="33.3" y="23.2" width="10.2" height="9.2" rx="3" fill="url(#koffi-lens)" stroke="#090D16" strokeWidth="1.8" />
        <path d="M30.7 26.2 C31.7 25.4 32.3 25.4 33.3 26.2" stroke="#090D16" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M30.7 26.2 C31.7 25.4 32.3 25.4 33.3 26.2" stroke="#00D4FF" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M20.5 26.2 L17 26.8" stroke="#090D16" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M43.5 26.2 L47 26.8" stroke="#090D16" strokeWidth="1.6" strokeLinecap="round" />
        {/* Reflet verre */}
        <path d="M22.5 24.8 L26.5 24.8" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.85" />
        <path d="M35.3 24.8 L39.3 24.8" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.85" />

        {/* 6. NEZ BIEN DESSINÉ AVEC ARÊTE ET NARINES */}
        <path d="M32 27.5 V32" stroke="#663412" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M31.6 28 V31.5" stroke="#A86A38" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M29.5 32.8 C30.5 33.6 33.5 33.6 34.5 32.8" stroke="#4D230A" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="30" cy="32.8" r="0.7" fill="#3D1A06" />
        <circle cx="34" cy="32.8" r="0.7" fill="#3D1A06" />

        {/* 7. BARBE TAILLÉE SOIGNÉE & SOURIRE CHALEUREUX */}
        {/* Favoris dégradés descendant le long des joues */}
        <path d="M19 28 L19.8 35 L21 37 L20 38 L18.5 33 Z" fill="#121217" />
        <path d="M45 28 L44.2 35 L43 37 L44 38 L45.5 33 Z" fill="#121217" />

        {/* Moustache bien taillée au-dessus de la lèvre */}
        <path
          d="M26 35.5 C28 34.5 30.5 35 32 35.8 C33.5 35 36 34.5 38 35.5 C38.5 36.6 36.5 37.4 34.5 37 C33 36.6 32 37.2 32 37.2 C32 37.2 31 36.6 29.5 37 C27.5 37.4 25.5 36.6 26 35.5 Z"
          fill="#121217"
        />

        {/* Bouche souriante avec dents */}
        <path d="M26.5 37.5 C26.5 37.5 28.5 41.5 32 41.5 C35.5 41.5 37.5 37.5 37.5 37.5 Z" fill="#3D1215" />
        <path d="M27 37.8 C28.5 39.2 35.5 39.2 37 37.8 C36 37.3 28 37.3 27 37.8 Z" fill="#FFFFFF" />
        <path d="M25.8 37.2 C28.5 41.8 35.5 41.8 38.2 37.2" stroke="#2B0E05" strokeWidth="1.2" strokeLinecap="round" fill="none" />

        {/* Mouche / Soul patch sous la lèvre inférieure */}
        <path d="M31 39.8 H33 V41.2 C33 41.8 31 41.8 31 41.2 Z" fill="#121217" />

        {/* Barbe sculptée sur la mâchoire et le menton */}
        <path
          d="M20.5 37.5 C20.5 37.5 23 43.5 27 44.5 C29.5 45.2 34.5 45.2 37 44.5 C41 43.5 43.5 37.5 43.5 37.5 C43 40.5 40.5 44 37 45.2 C34 46 30 46 27 45.2 C23.5 44 21 40.5 20.5 37.5 Z"
          fill="#121217"
        />
        <path
          d="M27 42 C29 43.5 35 43.5 37 42 C36.5 44.8 34.5 45.8 32 45.8 C29.5 45.8 27.5 44.8 27 42 Z"
          fill="#121217"
        />
      </g>
    </svg>
  );
}

const INITIAL_SUGGESTIONS: string[] = [
  "Demander un devis gratuit",
  "Cybersécurité & Firewalls",
  "Réseaux & Câblage",
  "Formations certifiantes",
];

const DEFAULT_KNOWLEDGE_BASE: KnowledgeItem[] = [
  {
    keywords: ["prix", "tarif", "devis", "coût", "cout", "forfait", "abonnement", "chiffrer", "remplir"],
    response: "Avec grand plaisir ! Chez **NOBTECH**, nos devis sont **100% gratuits, sur-mesure et transmis sous 24h ouvrées** sans engagement. 📋\n\nPour aller au plus vite, vous pouvez :\n• **M'en dire deux mots ici** (type de projet, nombre de postes ou locaux) et je transmets tout à nos ingénieurs.\n• Ou remplir notre formulaire rapide : [Ouvrir le formulaire de devis en ligne](/contact)\n\nDe quel domaine s'agit-il en priorité ?"
  },
  {
    keywords: ["sécurité", "securite", "cyber", "cybersécurité", "firewall", "vpn", "protection", "hack", "virus", "sophos", "fortinet"],
    response: "La cybersécurité est le cœur de métier de **NOBTECH** ! 🛡️ Nous déployons des pare-feux nouvelle génération Sophos XGS & Fortinet FortiGate, des sauvegardes anti-ransomware Acronis, et assurons la gouvernance IAM avec Wallix. Avez-vous un réseau ou des postes à protéger ?"
  },
  {
    keywords: ["contact", "appel", "téléphone", "telephone", "email", "joindre", "rappel", "adresse", "dakar", "sénégal", "senegal", "localiser", "localisation"],
    response: "**NOBTECH** est situé à Dakar (Route de l’Aéroport LSS lot N° 79, repère Google Maps : QG3J+HP Dakar). 📍\n\nVous pouvez nous appeler directement au **+221 77 301 08 38** ou nous écrire à **contact@nobtech.fr**."
  },
  {
    keywords: ["réseau", "reseau", "wifi", "câblage", "cablage", "voip", "téléphonie", "cloud", "infogérance", "serveur", "informatique", "infrastructure"],
    response: "Pour vos infrastructures, **NOBTECH** réalise le câblage structuré cuivre & fibre optique, l'aménagement de baies 42U certifiées Fluke, le Wi-Fi d'entreprise haute densité et la téléphonie IP d'entreprise. 🌐"
  },
  {
    keywords: ["formation", "formations", "certifications", "certification", "ccna", "ccnp", "nse", "power bi", "cisco"],
    response: "Nous proposons des programmes d'excellence axés sur la pratique réelle et les certifications internationales : Cisco (CCNA & Certificat International Cisco), Microsoft Power BI, Fortinet NSE 4, Sophos et ISO 27001. Découvrez notre page [Formations](/formations) ! 🎓"
  },
  {
    keywords: ["erp", "odoo", "dolibarr", "gestion", "logiciel", "web", "mobile", "sur-mesure", "progiciel"],
    response: "Nous concevons des ERP 100% sur-mesure adaptés à vos processus métiers uniques, et intégrons les leaders Odoo et Dolibarr (ventes, stocks, facturation conforme, RH). Nous développons aussi vos plateformes web & applications mobiles. 🚀"
  },
  {
    keywords: ["bonjour", "salut", "hello", "bonsoir", "bjr", "coucou", "yo"],
    response: "Bonjour et bienvenue chez **NOBTECH** ! 👋 Je m'appelle **Koffi**, votre conseiller virtuel. Comment puis-je vous aider aujourd'hui ? Dites-moi tout sur votre projet informatique ou posez-moi vos questions !"
  },
  {
    keywords: ["merci", "thanks", "parfait", "super", "excellent", "top"],
    response: "Avec grand plaisir ! 😊 N'hésitez surtout pas si vous avez d'autres questions. Toute l'équipe **NOBTECH** reste à votre disposition au **+221 77 301 08 38** !"
  }
];

function fallbackSuggestions(text: string): string[] {
  const lower = text.toLowerCase();
  if (/pas tout a fait certain|pardonnez-moi|pas bien compris|whatsapp|ingenieur/i.test(lower)) {
    return [
      "WhatsApp (+221 77 301 08 38)",
      "Cybersécurité & Firewalls",
      "Réseaux & Câblage",
      "Formations certifiantes",
      "Demander un devis"
    ];
  }
  if (/devis|prix|tarif|combien|cout|remplir|chiffrer/i.test(lower)) {
    return [
      "Devis Cybersécurité & Pare-feu",
      "Devis Câblage & Réseau",
      "Devis ERP sur-mesure",
      "Ouvrir le formulaire devis"
    ];
  }
  if (/cyber|securite|firewall|sophos|fortinet/i.test(lower)) {
    return ["Audit & Test d'intrusion", "Pare-feu Sophos / Fortinet", "Sauvegardes anti-ransomware", "Devis Cybersécurité"];
  }
  if (/formation|certif|ccna|cisco|power bi/i.test(lower)) {
    return ["Certificat International Cisco", "Formation Cisco CCNA", "Formation Power BI"];
  }
  if (/erp|odoo|dolibarr|gestion/i.test(lower)) {
    return ["ERP 100% sur-mesure", "Intégration Odoo", "Intégration Dolibarr", "Devis ERP sur-mesure"];
  }
  if (/reseau|wifi|cablage|baie/i.test(lower)) {
    return ["Câblage structuré & Baies 42U", "Wi-Fi d'entreprise", "Standard VoIP", "Devis Câblage & Réseau"];
  }
  return ["Demander un devis gratuit", "Cybersécurité & Firewalls", "Réseaux & Câblage", "Formations certifiantes"];
}

function getBotResponse(input: string, knowledge: KnowledgeItem[], currentSessionId?: string): string {
  const lower = input.toLowerCase().trim();
  const words = lower.split(/[\s,.'?!]+/).filter(w => w.length > 0);
  
  if (words.length === 0) {
    return "Je vous écoute ! Dites-moi tout : comment puis-je vous aider aujourd'hui ? 😊";
  }

  // Affirmations
  if (/^(oui|ok|d['\s]?accord|dac|ca marche|je veux bien|pourquoi pas|exactement|c['\s]?est ca|tout a fait)[.!?\s]*$/i.test(lower)) {
    return "C'est un grand plaisir ! Dites-moi tout : quel projet ou point souhaitez-vous approfondir ?";
  }

  // Négations
  if (/^(non|nan|pas pour l['\s]instant|plus tard|pas besoin|laisse tomber)[.!?\s]*$/i.test(lower)) {
    return "Aucun problème, je comprends parfaitement ! 😊 Je reste à votre entière disposition dès que vous aurez besoin d'un conseil en informatique, réseau ou cybersécurité. Belle journée !";
  }

  if (/pizza|burger|nourriture|faim|manger/i.test(lower)) {
    return "Haha, pas du tout ! 😄 Notre truc chez **NOBTECH**, c'est plutôt les pare-feux, les baies 42U et les logiciels de gestion que les pizzas ! Par contre, si votre entreprise ou restaurant a besoin d'un réseau fiable, d'un site web ou d'un ERP de stock, comptez sur nous !";
  }
  if (/blague|humour|marrant/i.test(lower)) {
    return "Pourquoi les administrateurs réseaux et les développeurs détestent-ils la nature ? Parce qu'il y a trop de bugs et aucun Ctrl+Z ! 🐛💻 Comment se porte votre système informatique aujourd'hui ?";
  }
  if (/t['\s]?es qui|qui es-?tu|qui [eê]tes-?vous|es-?tu (une |un )?ia|qui parle|comment tu t['\s]?appelles/i.test(lower) || (words.length === 1 && words[0] === "qui")) {
    return "Je m'appelle **Koffi**, conseiller virtuel chez **NOBTECH** ! 😊\n\nMon rôle est de vous renseigner 24h/24 avec le sourire comme un collègue au bureau : vous conseiller sur nos expertises (cybersécurité, réseaux, baies 42U, ERP, formations) et vous mettre en relation directe avec nos ingénieurs à Dakar.\n\nQuel projet ou besoin vous amène aujourd'hui ?";
  }
  if (/stage|recrutement|emploi|cv|job/i.test(lower)) {
    return "Vous souhaitez rejoindre l'équipe **NOBTECH** ? 💼 C'est un plaisir ! Envoyez votre CV et lettre de motivation directement à **contact@nobtech.fr** avec en objet « Candidature Stage / Emploi ». Notre équipe RH l'étudiera avec attention !";
  }
  if (/urgent|urgence|sos|panne|bloqu/i.test(lower)) {
    return "Je suis là ! 🚨 S'il s'agit d'une panne bloquante ou d'un incident critique, appelez directement nos ingénieurs au **+221 77 301 08 38** pour une prise en charge immédiate. Sinon, décrivez-moi le problème ici !";
  }
  if (/whatsapp/i.test(lower)) {
    return "Vous pouvez nous écrire directement sur WhatsApp au **+221 77 301 08 38** 📲 ! [Cliquez ici pour démarrer la discussion](https://wa.me/221773010838?text=Bonjour%20Koffi,%20je%20souhaite%20obtenir%20des%20informations). Nos ingénieurs vous répondent très rapidement.";
  }
  if (/remplir un devis|demander un devis|devis gratuit|obtenir un devis|faire un devis|devis/i.test(lower)) {
    return "Avec grand plaisir ! Chez **NOBTECH**, nos devis sont **100% gratuits, personnalisés et sans engagement** sous 24h ouvrées. 📋\n\nPour une meilleure prise en charge de votre demande, pourriez-vous me communiquer votre prénom ainsi qu'un numéro de téléphone ou adresse e-mail ? Vous pouvez simplement me l'écrire ici dans le chat 😊\n\nVous pouvez également remplir notre formulaire guidé : [Ouvrir le formulaire de devis en ligne](/contact)\n\nQuel domaine vous intéresse en priorité ?";
  }

  let bestMatch: KnowledgeItem | null = null;
  let maxScore = 0;

  for (const entry of knowledge) {
    let score = 0;
    for (const word of words) {
      for (const keyword of entry.keywords) {
        if (word === keyword || (word.length >= 4 && (keyword.includes(word) || word.includes(keyword)))) {
          score += 1;
        }
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && maxScore > 0) {
    return bestMatch.response;
  }

  const refText = currentSessionId ? ` (Réf. #${currentSessionId})` : '';
  const waUrl = `https://wa.me/221773010838?text=Bonjour,%20j'%C3%A9changeais%20avec%20Koffi%20sur%20le%20site%20NOBTECH${encodeURIComponent(
    refText
  )}%20et%20je%20souhaite%20poser%20une%20question`;

  return (
    "Je ne suis pas tout à fait certain d'avoir bien compris votre demande, pardonnez-moi ! 😊 Pouvez-vous me la préciser en quelques mots ?\n\n" +
    "Pour une meilleure prise en charge de votre demande, vous pouvez aussi me communiquer votre nom et numéro de téléphone directement ici dans notre échange, ou nous joindre sur WhatsApp :\n" +
    `[WhatsApp : +221 77 301 08 38${refText}](${waUrl})`
  );
}

function renderFormattedChunk(chunk: string, keyPrefix: string) {
  const subParts = chunk.split(/(\*\*.*?\*\*)/g);
  return subParts.map((sub, j) => {
    if (sub.startsWith('**') && sub.endsWith('**') && sub.length >= 4) {
      return (
        <strong key={`${keyPrefix}-${j}`} className="font-semibold text-white">
          {sub.slice(2, -2)}
        </strong>
      );
    }
    return <span key={`${keyPrefix}-${j}`}>{sub}</span>;
  });
}

function renderText(text: string) {
  const parts = text.split(/(\[.*?\]\(.*?\))/g);
  return parts.map((part, i) => {
    const match = part.match(/\[(.*?)\]\((.*?)\)/);
    if (match) {
      const label = match[1];
      const href = match[2];
      const isExternal = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:');
      const isWhatsApp = href.includes('wa.me') || href.includes('whatsapp');

      if (isWhatsApp) {
        return (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="my-1.5 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-md shadow-[#25D366]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <WhatsAppIcon className="w-4 h-4 fill-current shrink-0" />
            <span>{label.replace(/^[💬📱\s]+/, '')}</span>
          </a>
        );
      }

      return (
        <a
          key={i}
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="inline-flex items-center gap-1 font-semibold text-[#00D4FF] hover:text-white underline underline-offset-2 transition-colors decoration-[#00D4FF]/40 hover:decoration-white"
        >
          {label}
        </a>
      );
    }
    return <span key={i}>{renderFormattedChunk(part, `p-${i}`)}</span>;
  });
}

function createWelcomeMessage(visitorName?: string, customGreeting?: string): Message {
  const firstName = visitorName ? visitorName.trim().split(/\s+/)[0] : '';
  const defaultGreeting = firstName
    ? `Bonjour **${firstName}** ! Ravi de vous accueillir chez **NOBTECH** 😊 Je suis **Koffi**, votre conseiller virtuel.\n\nQue vous ayez un projet en cybersécurité, besoin d'un audit, d'un coup de main sur vos réseaux ou envie d'un devis gratuit sous 24h, je suis là pour vous répondre simplement et avec le sourire !\n\nDites-moi tout, comment puis-je vous aider aujourd'hui ?`
    : customGreeting ||
      "Bonjour et bienvenue chez **NOBTECH** ! 😊 Je suis **Koffi**, votre conseiller virtuel.\n\nCybersécurité, câblage réseau, logiciels ERP ou formations certifiantes : dites-moi ce dont vous avez besoin et je vous oriente avec grand plaisir !\n\nPar quoi souhaitez-vous commencer aujourd'hui ?";

  return {
    id: 'init',
    role: 'bot',
    text: defaultGreeting,
    time: getTime(),
    suggestions: INITIAL_SUGGESTIONS,
  };
}

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [knowledge, setKnowledge] = useState<KnowledgeItem[]>(DEFAULT_KNOWLEDGE_BASE);
  const [cmsGreeting, setCmsGreeting] = useState<string>('');

  // Session lifecycle state: 'active' | 'ended' (direct conversation without blocking form)
  const [phase, setPhase] = useState<'prechat' | 'active' | 'ended'>('active');
  const [sessionId, setSessionId] = useState<string>(() => generateSessionId());
  const [contactMessageId, setContactMessageId] = useState<string | null>(null);
  const [hasNotifiedFirstMessage, setHasNotifiedFirstMessage] = useState<boolean>(false);
  const [showEndConfirm, setShowEndConfirm] = useState<boolean>(false);
  const [isEndingSession, setIsEndingSession] = useState<boolean>(false);
  const [rating, setRating] = useState<number | null>(null);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Visitor contact state
  const [visitor, setVisitor] = useState<VisitorProfile>({
    name: '',
    email: '',
    phone: '',
    company: '',
  });

  const [messages, setMessages] = useState<Message[]>([createWelcomeMessage()]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Refs for automatic serious conversation summary dispatch (pause timer + tab close)
  const summaryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSummarizedUserMsgCountRef = useRef<number>(0);
  const latestStateRef = useRef({
    phase,
    sessionId,
    contactMessageId,
    visitor,
    messages,
    rating,
  });

  useEffect(() => {
    latestStateRef.current = {
      phase,
      sessionId,
      contactMessageId,
      visitor,
      messages,
      rating,
    };
  }, [phase, sessionId, contactMessageId, visitor, messages, rating]);

  // Restore session & saved visitor profile from localStorage on mount
  useEffect(() => {
    try {
      const savedProfileRaw = localStorage.getItem(VISITOR_PROFILE_KEY);
      if (savedProfileRaw) {
        const parsedProfile = JSON.parse(savedProfileRaw);
        if (parsedProfile && typeof parsedProfile === 'object') {
          setVisitor({
            name: parsedProfile.name || '',
            email: parsedProfile.email || '',
            phone: parsedProfile.phone || '',
            company: parsedProfile.company || '',
          });
        }
      }

      const savedSessionRaw = localStorage.getItem(SESSION_STORAGE_KEY);
      if (savedSessionRaw) {
        const parsedSession: StoredChatSession = JSON.parse(savedSessionRaw);
        const now = Date.now();
        const isExpired =
          now - (parsedSession.lastActivityAt || parsedSession.startedAt || 0) >
          SESSION_TIMEOUT_MS;

        if (!isExpired && parsedSession.sessionId && parsedSession.phase === 'active') {
          setSessionId(parsedSession.sessionId);
          setPhase('active');
          setVisitor(parsedSession.visitor);
          if (Array.isArray(parsedSession.messages) && parsedSession.messages.length > 0) {
            setMessages(parsedSession.messages);
          }
          setContactMessageId(parsedSession.contactMessageId || null);
          setHasNotifiedFirstMessage(Boolean(parsedSession.hasNotifiedFirstMessage));
        } else if (isExpired) {
          localStorage.removeItem(SESSION_STORAGE_KEY);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Persist active session to localStorage whenever state updates
  useEffect(() => {
    try {
      if (phase === 'active') {
        const sessionToStore: StoredChatSession = {
          sessionId,
          phase,
          visitor,
          messages,
          contactMessageId,
          hasNotifiedFirstMessage,
          startedAt: Date.now(),
          lastActivityAt: Date.now(),
          rating,
        };
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionToStore));
      } else if (phase === 'ended') {
        localStorage.removeItem(SESSION_STORAGE_KEY);
      }
    } catch {
      // Ignore storage errors
    }
  }, [phase, sessionId, visitor, messages, contactMessageId, hasNotifiedFirstMessage, rating]);

  // Synchronise la base de connaissances dynamique depuis le CMS
  useEffect(() => {
    fetch('/api/chatbot-knowledge')
      .then((res) => res.json())
      .then((data) => {
        if (data?.greeting) {
          setCmsGreeting(data.greeting);
        }
        if (data?.knowledgeBase && Array.isArray(data.knowledgeBase) && data.knowledgeBase.length > 0) {
          setKnowledge([...data.knowledgeBase, ...DEFAULT_KNOWLEDGE_BASE]);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (phase === 'active') {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, phase]);

  useEffect(() => {
    if (open) {
      setUnreadCount(0);
      if (phase === 'active') {
        setTimeout(() => inputRef.current?.focus(), 250);
      }
    }
  }, [open, phase]);

  // Sync session & transcript with backend CRM & admin emails
  const syncSessionWithBackend = async (params: {
    action: 'sync' | 'summary' | 'end';
    updatedMessages: Message[];
    updatedVisitor?: VisitorProfile;
    notifyAdminsNow?: boolean;
    sessionRating?: number | null;
    keepalive?: boolean;
  }) => {
    const activeVisitor = params.updatedVisitor || visitor;

    const userMsgCount = params.updatedMessages.filter((m) => m.role === 'user').length;
    if (params.action === 'summary' || params.action === 'end' || params.notifyAdminsNow) {
      lastSummarizedUserMsgCountRef.current = userMsgCount;
    }

    try {
      const res = await fetch('/api/chat/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: Boolean(params.keepalive),
        body: JSON.stringify({
          action: params.action,
          sessionId,
          contactMessageId,
          visitor: activeVisitor,
          messages: params.updatedMessages.map((m) => ({
            id: m.id,
            role: m.role,
            text: m.text,
            time: m.time,
          })),
          rating: params.sessionRating ?? rating,
          notifyAdminsNow: Boolean(params.notifyAdminsNow),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.contactMessageId && !contactMessageId) {
          setContactMessageId(String(data.contactMessageId));
        }
      }
    } catch {
      // Fail silently so chat UX is never interrupted
    }
  };

  // Automatically send serious conversation summary if visitor leaves tab or closes browser
  useEffect(() => {
    const handleVisibilityOrUnload = () => {
      if (document.visibilityState !== 'hidden') return;
      const st = latestStateRef.current;
      if (st.phase !== 'active') return;
      const userMsgCount = st.messages.filter((m) => m.role === 'user').length;
      if (userMsgCount === 0 || userMsgCount <= lastSummarizedUserMsgCountRef.current) return;

      lastSummarizedUserMsgCountRef.current = userMsgCount;
      fetch('/api/chat/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body: JSON.stringify({
          action: 'summary',
          sessionId: st.sessionId,
          contactMessageId: st.contactMessageId,
          visitor: st.visitor,
          messages: st.messages.map((m) => ({
            id: m.id,
            role: m.role,
            text: m.text,
            time: m.time,
          })),
          rating: st.rating,
          notifyAdminsNow: true,
        }),
      }).catch(() => {});
    };

    document.addEventListener('visibilitychange', handleVisibilityOrUnload);
    window.addEventListener('pagehide', handleVisibilityOrUnload);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityOrUnload);
      window.removeEventListener('pagehide', handleVisibilityOrUnload);
    };
  }, []);


  const sendMessage = async (
    textToSend: string,
    overrideBaseMessages?: Message[],
    overrideVisitor?: VisitorProfile
  ) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isTyping) return;

    const currentMessages = overrideBaseMessages || messages;
    const currentVisitor = overrideVisitor || visitor;

    // Extract any email, phone or name mentioned directly in message
    const emailMatch = trimmed.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i);
    const phoneMatch = trimmed.match(/(?:\+221|00221)?\s*[73][05678]\s*\d{3}\s*\d{2}\s*\d{2}|\b\d{2}[-.\s]?\d{3}[-.\s]?\d{2}[-.\s]?\d{2}\b/);
    const nameIntroMatch = trimmed.match(/(?:je m['\s]?appelle|moi c['\s]?est|mon nom est|mon prénom est)\s+([A-ZÀ-ÿa-z\-]+(?:\s+[A-ZÀ-ÿa-z\-]+)?)/i);

    let detectedName = nameIntroMatch && nameIntroMatch[1] ? nameIntroMatch[1].trim() : '';
    if (!detectedName && !currentVisitor.name && !emailMatch && !phoneMatch) {
      const words = trimmed.split(/\s+/);
      if (words.length >= 1 && words.length <= 3 && /^[A-ZÀ-ÿa-z\s\-]+$/.test(trimmed) && trimmed.length >= 3 && trimmed.length <= 30) {
        const lastBot = currentMessages.slice().reverse().find((m) => m.role === 'bot');
        if (lastBot && /prénom|nom|coordonnées|contact/i.test(lastBot.text)) {
          detectedName = trimmed;
        }
      }
    }

    const enrichedVisitor: VisitorProfile = {
      name: currentVisitor.name || detectedName || (emailMatch ? emailMatch[0].split('@')[0] : ''),
      email: currentVisitor.email || (emailMatch ? emailMatch[0] : ''),
      phone: currentVisitor.phone || (phoneMatch ? phoneMatch[0] : ''),
      company: currentVisitor.company || '',
    };
    if (
      enrichedVisitor.name !== currentVisitor.name ||
      enrichedVisitor.email !== currentVisitor.email ||
      enrichedVisitor.phone !== currentVisitor.phone
    ) {
      setVisitor(enrichedVisitor);
      try {
        localStorage.setItem(VISITOR_PROFILE_KEY, JSON.stringify(enrichedVisitor));
      } catch {
        // Ignore
      }
    }

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
      time: getTime(),
    };

    const newMessages = [...currentMessages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    let finalMessagesWithBot = newMessages;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          sessionId,
          history: newMessages.slice(-6).map((m) => ({
            role: m.role,
            text: m.text,
          })),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const replyText = data.reply || getBotResponse(trimmed, knowledge, sessionId);
        const suggestions =
          Array.isArray(data.suggestions) && data.suggestions.length > 0
            ? data.suggestions
            : fallbackSuggestions(replyText);

        const botMsg: Message = {
          id: `bot-${Date.now()}`,
          role: 'bot',
          text: replyText,
          time: getTime(),
          suggestions,
        };
        finalMessagesWithBot = [...newMessages, botMsg];
        setMessages(finalMessagesWithBot);
      } else {
        const replyText = getBotResponse(trimmed, knowledge, sessionId);
        const botMsg: Message = {
          id: `bot-${Date.now()}`,
          role: 'bot',
          text: replyText,
          time: getTime(),
          suggestions: fallbackSuggestions(replyText),
        };
        finalMessagesWithBot = [...newMessages, botMsg];
        setMessages(finalMessagesWithBot);
      }
    } catch {
      const replyText = getBotResponse(trimmed, knowledge, sessionId);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        role: 'bot',
        text: replyText,
        time: getTime(),
        suggestions: fallbackSuggestions(replyText),
      };
      finalMessagesWithBot = [...newMessages, botMsg];
      setMessages(finalMessagesWithBot);
    } finally {
      setIsTyping(false);
      if (!open) {
        setUnreadCount((c) => c + 1);
      }
    }

    // 1. Always save transcript in real time to Payload CMS (`action: 'sync'`)
    await syncSessionWithBackend({
      action: 'sync',
      updatedMessages: finalMessagesWithBot,
      updatedVisitor: enrichedVisitor,
      notifyAdminsNow: false,
    });

    // 2. Schedule automatic email summary to admins after 35s of inactivity
    // (if the conversation is serious, `/api/chat/session` will dispatch the full summary email)
    if (summaryTimerRef.current) {
      clearTimeout(summaryTimerRef.current);
    }
    summaryTimerRef.current = setTimeout(() => {
      setHasNotifiedFirstMessage(true);
      syncSessionWithBackend({
        action: 'summary',
        updatedMessages: finalMessagesWithBot,
        updatedVisitor: enrichedVisitor,
        notifyAdminsNow: true,
      });
    }, 35000);
  };

  // End the current chat session cleanly & send full transcript to admins + visitor
  const handleEndSession = async () => {
    if (summaryTimerRef.current) {
      clearTimeout(summaryTimerRef.current);
      summaryTimerRef.current = null;
    }
    setIsEndingSession(true);
    try {
      await syncSessionWithBackend({
        action: 'end',
        updatedMessages: messages,
        notifyAdminsNow: true,
      });
    } finally {
      setIsEndingSession(false);
      setShowEndConfirm(false);
      setPhase('ended');
      try {
        localStorage.removeItem(SESSION_STORAGE_KEY);
      } catch {
        // Ignore
      }
    }
  };

  // Submit star rating after session close
  const handleRateSession = async (selectedRating: number) => {
    setRating(selectedRating);
    await syncSessionWithBackend({
      action: 'end',
      updatedMessages: messages,
      sessionRating: selectedRating,
      notifyAdminsNow: false,
    });
  };

  // Download full chat transcript as .txt file
  const handleDownloadTranscript = () => {
    const lines = [
      `====================================================`,
      `TRANSCRIPTION DE SESSION D'ASSISTANCE — NOBTECH`,
      `Référence Session : #${sessionId}`,
      `Date : ${new Date().toLocaleDateString('fr-FR')} à ${getTime()}`,
      `Visiteur : ${visitor.name} (${visitor.email} / ${visitor.phone})`,
      visitor.company ? `Entreprise : ${visitor.company}` : '',
      `Conseiller : Koffi (Conseiller virtuel NOBTECH)`,
      `====================================================`,
      ``,
      ...messages.map(
        (m) =>
          `[${m.time}] ${m.role === 'user' ? visitor.name : 'Koffi (NOBTECH)'} :\n${m.text}\n`
      ),
      `====================================================`,
      `NOB TECHNOLOGIES — Dakar, Sénégal`,
      `Tél / WhatsApp : +221 77 301 08 38 | contact@nobtech.fr`,
    ].filter(Boolean);

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NOBTECH-Transcription-${sessionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Reset to start a fresh active session (keeping visitor profile if previously filled)
  const handleNewSession = () => {
    setShowEndConfirm(false);
    setRating(null);
    setContactMessageId(null);
    setHasNotifiedFirstMessage(false);
    const newSid = generateSessionId();
    setSessionId(newSid);
    setMessages([createWelcomeMessage(visitor.name, cmsGreeting)]);
    setPhase('active');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Floating launcher button: juste Koffi dans la bulle (sans point vert, sans texte superflu) */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Réduire le chat' : 'Discuter avec Koffi, conseiller virtuel NOBTECH'}
        className={cn(
          'fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-[150] rounded-full transition-all duration-300 hover:scale-105 active:scale-95 group flex items-center justify-center select-none',
          open
            ? 'w-12 h-12 bg-[#020617] border border-[#00D4FF]/50 text-[#00D4FF] shadow-[0_8px_24px_rgba(0,0,0,0.5)]'
            : 'w-14 h-14 sm:w-16 sm:h-16 p-[2px] bg-gradient-to-tr from-[#0284C7] via-[#00D4FF] to-[#38BDF8] shadow-[0_10px_35px_rgba(0,212,255,0.45)] hover:shadow-[0_14px_45px_rgba(0,212,255,0.65)]'
        )}
      >
        {open ? (
          <X className="w-5 h-5 text-[#00D4FF]" />
        ) : (
          <div className="relative w-full h-full rounded-full bg-[#020617] overflow-hidden flex items-center justify-center">
            <AssistantAvatar className="w-full h-full transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]" />
          </div>
        )}

        {/* Badge messages non-lus si fermé */}
        {!open && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 min-w-5 px-1 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-[#020617] animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Corporate Chat Widget Container */}
      <div
        className={cn(
          'fixed bottom-20 right-3 sm:bottom-24 sm:right-6 z-[140] w-[calc(100vw-24px)] rounded-2xl border border-white/15 shadow-[0_24px_64px_rgba(0,0,0,0.7),0_0_0_1px_rgba(0,212,255,0.08)] backdrop-blur-xl bg-[#020617]/95 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right',
          isExpanded
            ? 'max-w-[520px] sm:w-[520px]'
            : 'max-w-[420px] sm:w-[420px]',
          open
            ? 'opacity-100 scale-100 pointer-events-auto translate-y-0'
            : 'opacity-0 scale-95 pointer-events-none translate-y-4'
        )}
        style={{ height: isExpanded ? '660px' : '560px', maxHeight: '84vh' }}
        role="dialog"
        aria-label="Discussion avec Koffi, conseiller virtuel NOBTECH"
        aria-modal="false"
      >
        {/* Corporate Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-gradient-to-r from-[#0A2540]/85 via-[#020617] to-[#0A2540]/85 shrink-0">
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#00D4FF]/25 to-[#0284c7]/35 border border-[#00D4FF]/50 flex items-center justify-center p-0.5 shadow-md">
              <AssistantAvatar className="w-9 h-9" />
            </div>
            {/* L'unique point vert indiquant la présence en ligne */}
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#020617]" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-sm font-bold text-white leading-tight">Koffi</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#00D4FF]/10 text-[#00D4FF] font-semibold border border-[#00D4FF]/25">
                NOBTECH
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10" title="Identifiant de session">
                #{sessionId}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-sans mt-0.5 truncate">
              {visitor.name ? (
                <span className="truncate">
                  À votre écoute, <strong className="text-slate-200 font-medium">{visitor.name.split(' ')[0]}</strong>
                </span>
              ) : (
                <span>Conseiller en ligne · À votre écoute</span>
              )}
            </div>
          </div>

          {/* Header Controls: WhatsApp direct + Expand/Compact + Minimize (—) + Terminer (✕) */}
          <div className="flex items-center gap-1 shrink-0">
            <a
              href={`https://wa.me/221773010838?text=Bonjour,%20j'%C3%A9changeais%20sur%20le%20site%20NOBTECH%20(R%C3%A9f.%20%23${sessionId})%20et%20je%20souhaite%20parler%20%C3%A0%20un%20ing%C3%A9nieur`}
              target="_blank"
              rel="noopener noreferrer"
              title="Échanger avec un ingénieur sur WhatsApp"
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#25D366] text-white hover:bg-[#20bd5a] shadow-[0_2px_8px_rgba(37,211,102,0.35)] transition-all cursor-pointer mr-0.5"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-current shrink-0" />
              <span>WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => setIsExpanded((v) => !v)}
              title={isExpanded ? 'Mode standard' : 'Agrandir la fenêtre'}
              className="hidden sm:inline-flex text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
              aria-label={isExpanded ? 'Mode standard' : 'Agrandir la fenêtre'}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>

            <button
              type="button"
              onClick={() => setOpen(false)}
              title="Réduire la fenêtre"
              className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
              aria-label="Réduire la fenêtre"
            >
              <Minus className="w-4 h-4" />
            </button>

            {phase === 'active' && (
              <button
                type="button"
                onClick={() => setShowEndConfirm(true)}
                title="Terminer la discussion"
                className="text-slate-400 hover:text-rose-400 transition-colors p-1.5 rounded-lg hover:bg-rose-500/10"
                aria-label="Terminer la discussion"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Executive Quick-Action Strip (1-Click Navigation & Requests) */}
        {phase === 'active' && (
          <div className="px-3.5 py-2 bg-white/[0.02] border-b border-white/10 flex items-center gap-1.5 overflow-x-auto custom-scrollbar-dark shrink-0">
            {[
              { label: 'Devis sous 24h', prompt: 'Je souhaite obtenir un devis personnalisé sous 24h' },
              { label: 'Audit Réseau & Sécurité', prompt: 'Comment réserver un audit réseau et cybersécurité sur site ?' },
              { label: 'Formations & Tarifs', prompt: 'Quels sont vos programmes de formation et tarifs ?' },
              { label: 'Parler à un ingénieur', prompt: 'Je souhaite être rappelé par un ingénieur' },
            ].map((action) => (
              <button
                key={action.label}
                type="button"
                disabled={isTyping}
                onClick={() => sendMessage(action.prompt)}
                className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-[#00D4FF]/15 text-slate-300 hover:text-[#00D4FF] border border-white/10 hover:border-[#00D4FF]/40 transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}

        {/* PHASE 2: ACTIVE CHAT SESSION */}
        {phase === 'active' && (
          <div className="relative flex-1 flex flex-col min-h-0">
            {/* Session Close Confirmation Drawer */}
            {showEndConfirm && (
              <div className="absolute inset-0 z-30 bg-[#020617]/95 backdrop-blur-md p-5 flex flex-col justify-center items-center text-center animate-in fade-in duration-200">
                <div className="w-12 h-12 rounded-2xl bg-[#00D4FF]/10 border border-[#00D4FF]/30 flex items-center justify-center text-[#00D4FF] mb-3">
                  <LogOut className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">
                  Terminer cette discussion ?
                </h4>
                <p className="text-xs text-slate-400 mt-1.5 max-w-[300px] leading-relaxed">
                  En terminant cet échange, un récapitulatif complet de votre conversation sera transmis à nos ingénieurs{visitor.email ? <> ainsi qu&apos;à <strong className="text-slate-200">{visitor.email}</strong></> : '.'}.
                </p>

                <div className="w-full space-y-2 mt-5">
                  <button
                    type="button"
                    disabled={isEndingSession}
                    onClick={handleEndSession}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#00D4FF] hover:bg-[#38BDF8] text-[#020617] font-bold text-xs transition-all disabled:opacity-50"
                  >
                    {isEndingSession
                      ? 'Transmission du récapitulatif...'
                      : 'Oui, terminer et envoyer le récapitulatif'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowEndConfirm(false);
                      setOpen(false);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 border border-white/10 font-semibold text-xs transition-all"
                  >
                    Simplement réduire la fenêtre (garder active)
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowEndConfirm(false)}
                    className="w-full py-2 text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    Annuler et reprendre la discussion
                  </button>
                </div>
              </div>
            )}

            {/* Messages list */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5 custom-scrollbar-dark">
              {messages.map((msg, i) => (
                <div
                  key={msg.id}
                  className={cn(
                    'flex gap-2.5',
                    msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  )}
                >
                  {msg.role === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00D4FF]/25 to-[#0284c7]/35 border border-[#00D4FF]/40 flex items-center justify-center shrink-0 mt-auto p-0.5 shadow-sm">
                      <AssistantAvatar className="w-7 h-7" />
                    </div>
                  )}
                  <div
                    className={cn(
                      'max-w-[84%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed text-pretty',
                      msg.role === 'user'
                        ? 'bg-[#00D4FF] text-[#020617] rounded-tr-sm font-medium shadow-sm'
                        : 'bg-white/[0.06] text-slate-200 rounded-tl-sm border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.2)]'
                    )}
                  >
                    <div className="whitespace-pre-line">{renderText(msg.text)}</div>

                    {/* Suggestions interactives sous la dernière réponse */}
                    {msg.role === 'bot' &&
                      msg.suggestions &&
                      msg.suggestions.length > 0 &&
                      i === messages.length - 1 && (
                        <div className="mt-3 pt-2.5 border-t border-white/10">
                          <p className="text-[10.5px] uppercase tracking-wider text-[#00D4FF] font-semibold mb-1.5">
                            Suggestions rapides :
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {msg.suggestions.map((sug, idx) => {
                              const isWhatsApp = /whatsapp/i.test(sug);
                              return (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => sendMessage(sug)}
                                  disabled={isTyping}
                                  className={cn(
                                    "text-xs px-2.5 py-1 rounded-full transition-all duration-200 font-medium active:scale-95 text-left disabled:opacity-50 inline-flex items-center gap-1.5",
                                    isWhatsApp
                                      ? "bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/40 hover:border-[#25D366]"
                                      : "bg-[#00D4FF]/10 hover:bg-[#00D4FF] text-[#00D4FF] hover:text-[#020617] border border-[#00D4FF]/30 hover:border-[#00D4FF]"
                                  )}
                                >
                                  {isWhatsApp && <WhatsAppIcon className="w-3.5 h-3.5 fill-current shrink-0" />}
                                  <span>{sug}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                    <div
                      className={cn(
                        'text-[9.5px] mt-1.5 font-mono',
                        msg.role === 'user' ? 'text-[#020617]/70 text-right' : 'text-slate-400'
                      )}
                    >
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-2.5 items-end">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00D4FF]/25 to-[#0284c7]/35 border border-[#00D4FF]/40 flex items-center justify-center shrink-0 p-0.5 shadow-sm">
                    <AssistantAvatar className="w-7 h-7" />
                  </div>
                  <div className="bg-white/[0.06] border border-white/10 rounded-2xl rounded-tl-sm px-3.5 py-2.5 flex items-center gap-1.5">
                    <span className="text-xs text-slate-400 mr-1">En cours de rédaction...</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input box */}
            <div className="px-3.5 py-3 border-t border-white/10 bg-white/[0.02] shrink-0">
              <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2 focus-within:border-[#00D4FF]/50 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Écrivez votre message à Koffi..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none"
                  aria-label="Votre message"
                  maxLength={500}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isTyping}
                  aria-label="Envoyer"
                  className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 shrink-0',
                    input.trim() && !isTyping
                      ? 'bg-[#00D4FF] text-[#020617] hover:scale-105 active:scale-95 shadow-[0_4px_12px_rgba(0,212,255,0.3)]'
                      : 'bg-white/5 text-slate-600 cursor-not-allowed'
                  )}
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500 px-1 mt-1.5">
                <span>
                  {visitor.phone || visitor.email ? (
                    <span className="text-emerald-400 font-medium">✓ Prise en charge : {visitor.phone || visitor.email}</span>
                  ) : (
                    <span className="text-slate-400">💬 Koffi est à votre écoute</span>
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => setShowEndConfirm(true)}
                  className="text-slate-400 hover:text-rose-400 font-medium transition-colors"
                >
                  Terminer l&apos;échange
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PHASE 3: SESSION ENDED & CORPORATE CSAT FEEDBACK */}
        {phase === 'ended' && (
          <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col items-center justify-between text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400 mb-2">
                Discussion terminée
              </span>

              <h3 className="text-base font-bold text-white">
                Merci pour votre échange{visitor.name ? `, ${visitor.name.split(' ')[0]}` : ''} !
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed max-w-[310px]">
                Le récapitulatif de votre conversation a été transmis à nos ingénieurs à Dakar{visitor.email ? <> ainsi qu&apos;à <strong className="text-slate-200">{visitor.email}</strong></> : '.'}
              </p>

              {/* Star Rating (CSAT) */}
              <div className="w-full mt-5 p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <p className="text-xs font-semibold text-slate-200 mb-2.5">
                  Comment évaluez-vous votre échange avec Koffi ?
                </p>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRateSession(star)}
                      className={cn(
                        'p-1.5 rounded-lg transition-transform hover:scale-110',
                        rating && rating >= star
                          ? 'text-amber-400'
                          : 'text-slate-600 hover:text-amber-300'
                      )}
                      aria-label={`Noter ${star} sur 5`}
                    >
                      <Star
                        className="w-6 h-6"
                        fill={rating && rating >= star ? 'currentColor' : 'none'}
                      />
                    </button>
                  ))}
                </div>
                {rating && (
                  <p className="text-[11px] text-emerald-400 font-medium mt-2">
                    Merci pour votre note de {rating}/5 !
                  </p>
                )}
              </div>
            </div>

            <div className="w-full space-y-2.5 mt-5">
              <button
                type="button"
                onClick={handleDownloadTranscript}
                className="w-full py-2.5 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 border border-white/10 font-semibold text-xs transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-[#00D4FF]" />
                Télécharger la transcription (.txt)
              </button>

              <button
                type="button"
                onClick={handleNewSession}
                className="w-full py-2.5 px-4 rounded-xl bg-[#00D4FF] hover:bg-[#38BDF8] text-[#020617] font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(0,212,255,0.25)]"
              >
                <RotateCcw className="w-4 h-4" />
                Démarrer un nouvel échange
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
