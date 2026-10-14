'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'bot' | 'user';
  text: string;
  time: string;
  suggestions?: string[];
}

interface KnowledgeItem {
  keywords: string[];
  response: string;
}

function getTime() {
  return new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

// Illustration d'un jeune homme africain souriant avec coupe afro soignée, lunettes modernes et fond cyan radieux
export function AssistantAvatar({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Koffi, Conseiller digital NOBTECH">
      <defs>
        {/* Fond cyan radieux à fort contraste (évite le fond noir) */}
        <radialGradient id="nob-avatar-bg" cx="32" cy="24" r="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="55%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0369A1" />
        </radialGradient>
        {/* Halo doux intérieur pour détacher l'afro */}
        <radialGradient id="nob-afro-halo" cx="32" cy="20" r="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
        </radialGradient>
        {/* Teinte de peau riche, chaude et bien éclairée */}
        <linearGradient id="nob-skin-grad" x1="32" y1="18" x2="32" y2="45" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A86E45" />
          <stop offset="60%" stopColor="#8E532B" />
          <stop offset="100%" stopColor="#6E3C1B" />
        </linearGradient>
        {/* Ombre sous le menton */}
        <linearGradient id="nob-neck-grad" x1="32" y1="41" x2="32" y2="53" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#552C12" />
          <stop offset="100%" stopColor="#7B421E" />
        </linearGradient>
        {/* Reflet verres de lunettes */}
        <linearGradient id="nob-glass-glare" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="45%" stopColor="#00D4FF" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.08" />
        </linearGradient>
        {/* Vêtement corporate sombre avec contraste */}
        <linearGradient id="nob-suit-grad" x1="32" y1="48" x2="32" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
      </defs>

      {/* Fond circulaire cyan lumineux (contraste maximal) */}
      <circle cx="32" cy="32" r="31" fill="url(#nob-avatar-bg)" stroke="#BAE6FD" strokeWidth="1.5" />
      <circle cx="32" cy="22" r="22" fill="url(#nob-afro-halo)" />

      {/* Épaules & Veste corporate */}
      <path d="M10 64 C10 52 19 47 32 47 C45 47 54 52 54 64 Z" fill="url(#nob-suit-grad)" />

      {/* Col de chemise blanc net (très visible et corporate) */}
      <path d="M24 48 L32 58 L40 48 L36 47 L32 53 L28 47 Z" fill="#FFFFFF" />
      {/* Cravate / liseré cyan NOB TECH */}
      <path d="M30.5 53 L32 64 L33.5 53 Z" fill="#00D4FF" />
      <path d="M23 49 L32 59 L41 49" stroke="#E2E8F0" strokeWidth="1" fill="none" strokeLinecap="round" />

      {/* Cou */}
      <path d="M25 39 H39 V50 C39 52.5 36.5 54 32 54 C27.5 54 25 52.5 25 50 Z" fill="url(#nob-neck-grad)" />

      {/* COUPE AFRO : Volume généreux et silhouette arrondie naturelle */}
      {/* Base dense afro */}
      <path d="M14 31 C11 25 12 17 17 11 C22 5 32 4 42 7 C48 10 53 17 53 25 C53 29 51 33 48 35 C49 27 47 18 42 15 C36 12 28 12 22 15 C17 18 15 26 16 35 C14.5 34 14 32.5 14 31 Z" fill="#141417" />
      <circle cx="21" cy="18" r="9" fill="#18181C" />
      <circle cx="32" cy="13" r="10.5" fill="#18181C" />
      <circle cx="43" cy="18" r="9" fill="#18181C" />
      <circle cx="16" cy="27" r="6.5" fill="#18181C" />
      <circle cx="48" cy="27" r="6.5" fill="#18181C" />
      <circle cx="26" cy="14" r="8.5" fill="#18181C" />
      <circle cx="38" cy="14" r="8.5" fill="#18181C" />

      {/* Textures / reflets de boucles afro en relief */}
      <path d="M28 8 C30 7 34 7 36 8" stroke="#383842" strokeWidth="2" strokeLinecap="round" />
      <path d="M19 13 C21 11 24 11 26 12" stroke="#383842" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M38 12 C40 11 43 11 45 13" stroke="#383842" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14 22 C14 20 16 19 18 20" stroke="#383842" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M46 20 C48 19 50 20 50 22" stroke="#383842" strokeWidth="1.6" strokeLinecap="round" />

      {/* Oreilles */}
      <ellipse cx="17.5" cy="32" rx="3.5" ry="5.5" fill="#8E532B" />
      <ellipse cx="17.5" cy="32" rx="2" ry="3.5" fill="#5E351A" />
      <ellipse cx="46.5" cy="32" rx="3.5" ry="5.5" fill="#8E532B" />
      <ellipse cx="46.5" cy="32" rx="2" ry="3.5" fill="#5E351A" />

      {/* Visage / Mâchoire jeune et souriant */}
      <path d="M19 26 C19 19 23 16 32 16 C41 16 45 19 45 26 C45 35.5 41 43.5 32 43.5 C23 43.5 19 35.5 19 26 Z" fill="url(#nob-skin-grad)" />

      {/* Ligne de coupe frontale nette (Barber line-up) */}
      <path d="M19 24 C23 20.5 28 20 32 20 C36 20 41 20.5 45 24 C43 21 38 19.5 32 19.5 C26 19.5 21 21 19 24 Z" fill="#141417" />

      {/* Sourcils expressifs et soignés */}
      <path d="M22 24 C24.5 22.5 28 22.8 29.5 24" stroke="#121214" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M34.5 24 C36 22.8 39.5 22.5 42 24" stroke="#121214" strokeWidth="2.2" strokeLinecap="round" />

      {/* Yeux vifs et souriants */}
      <ellipse cx="25.5" cy="28" rx="2.5" ry="2.2" fill="#141416" />
      <circle cx="26.3" cy="27.3" r="0.9" fill="#FFFFFF" />
      <ellipse cx="38.5" cy="28" rx="2.5" ry="2.2" fill="#141416" />
      <circle cx="39.3" cy="27.3" r="0.9" fill="#FFFFFF" />

      {/* Lunettes modernes bien définies */}
      <rect x="20.5" y="23.5" width="10" height="9" rx="3.5" fill="url(#nob-glass-glare)" stroke="#090D16" strokeWidth="2" />
      <rect x="33.5" y="23.5" width="10" height="9" rx="3.5" fill="url(#nob-glass-glare)" stroke="#090D16" strokeWidth="2" />
      {/* Pont de lunettes avec accent cyan NOB TECH */}
      <path d="M30.5 26.5 C31.5 25.5 32.5 25.5 33.5 26.5" stroke="#090D16" strokeWidth="2" strokeLinecap="round" />
      <path d="M30.5 26.5 C31.5 25.5 32.5 25.5 33.5 26.5" stroke="#38BDF8" strokeWidth="0.8" strokeLinecap="round" />
      {/* Branches */}
      <path d="M20.5 26.5 L17 27" stroke="#090D16" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M43.5 26.5 L47 27" stroke="#090D16" strokeWidth="1.8" strokeLinecap="round" />
      {/* Reflets blancs nets sur les verres */}
      <path d="M22.5 25 L27 25" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.85" />
      <path d="M35.5 25 L40 25" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.85" />

      {/* Nez net */}
      <path d="M32 29.5 V33 C31.2 33.8 32.8 33.8 32 33.8" stroke="#5A2E12" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M30 33.8 C31 34.4 33 34.4 34 33.8" stroke="#5A2E12" strokeWidth="1.5" strokeLinecap="round" />

      {/* Pommettes souriantes */}
      <ellipse cx="20.5" cy="34" rx="2.5" ry="1.5" fill="#BA7040" fillOpacity="0.35" />
      <ellipse cx="43.5" cy="34" rx="2.5" ry="1.5" fill="#BA7040" fillOpacity="0.35" />

      {/* Grand sourire chaleureux avec dents blanches visibles */}
      <path d="M25.5 36.5 C25.5 36.5 28 42 32 42 C36 42 38.5 36.5 38.5 36.5 Z" fill="#4C1518" />
      <path d="M26.2 37 C27.8 39 36.2 39 37.8 37 C36.5 36.3 27.5 36.3 26.2 37 Z" fill="#FFFFFF" />
      <path d="M24.5 36.5 C27.5 41.5 36.5 41.5 39.5 36.5" stroke="#3D1A06" strokeWidth="1.6" strokeLinecap="round" fill="none" />
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
    response: "Avec grand plaisir ! Chez **NOBTECH**, nos devis sont **100% gratuits, sur-mesure et sans engagement** sous 24h ouvrées. 📋\n\nPour aller au plus vite, 3 possibilités s'offrent à vous :\n\n1️⃣ **Remplir notre formulaire guidé en 1 minute** :\n👉 [Ouvrir le formulaire de devis en ligne](/contact)\n\n2️⃣ **M'en dire deux mots ici** :\nDites-moi simplement quel est votre projet (cybersécurité & pare-feu, câblage réseau, ERP, matériel, formation) et le nombre de postes ou locaux concernés. Je note tout pour nos ingénieurs !\n\n3️⃣ **Échanger directement sur WhatsApp** avec notre équipe technique :\n📲 [Discuter sur WhatsApp (+221 77 301 08 38)](https://wa.me/221773010838?text=Bonjour%20Koffi,%20je%20souhaite%20obtenir%20un%20devis)\n\nQuel domaine vous intéresse en priorité ?"
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
    response: "Bonjour et bienvenue chez **NOBTECH** ! 👋 Je m'appelle **Koffi**. Comment puis-je vous aider aujourd'hui ? Dites-moi tout sur votre projet informatique ou posez-moi vos questions !"
  },
  {
    keywords: ["merci", "thanks", "parfait", "super", "excellent", "top"],
    response: "Avec grand plaisir ! 😊 N'hésitez surtout pas si vous avez d'autres questions. Toute l'équipe **NOBTECH** reste à votre disposition au **+221 77 301 08 38** !"
  }
];

function fallbackSuggestions(text: string): string[] {
  const lower = text.toLowerCase();
  if (/devis|prix|tarif|combien|cout|remplir|chiffrer/i.test(lower)) {
    return [
      "Devis Cybersécurité & Pare-feu",
      "Devis Câblage & Réseau",
      "Devis ERP sur-mesure",
      "Ouvrir le formulaire devis",
      "Échanger sur WhatsApp"
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

function getBotResponse(input: string, knowledge: KnowledgeItem[]): string {
  const lower = input.toLowerCase().trim();
  const words = lower.split(/[\s,.'?!]+/).filter(w => w.length > 0);
  
  if (words.length === 0) {
    return "Je vous écoute ! Dites-moi tout : comment puis-je vous aider aujourd'hui ? 😊";
  }

  if (/pizza|burger|nourriture|faim|manger/i.test(lower)) {
    return "Haha, pas du tout ! 😄 Notre truc chez **NOBTECH**, c'est plutôt les pare-feux, les baies 42U et les logiciels de gestion que les pizzas ! Par contre, si votre entreprise ou restaurant a besoin d'un réseau fiable, d'un site web ou d'un ERP de stock, comptez sur nous !";
  }
  if (/blague|humour|marrant/i.test(lower)) {
    return "Pourquoi les administrateurs réseaux et les développeurs détestent-ils la nature ? Parce qu'il y a trop de bugs et aucun Ctrl+Z ! 🐛💻 Comment se porte votre système informatique aujourd'hui ?";
  }
  if (/t['\s]?es qui|qui es-?tu|qui [eê]tes-?vous|es-?tu (une |un )?ia|qui parle|comment tu t['\s]?appelles/i.test(lower) || (words.length === 1 && words[0] === "qui")) {
    return "Je m'appelle **Koffi**, conseiller digital chez **NOBTECH** ! 😊\n\nMon rôle est de vous renseigner 24h/24 avec le sourire comme un collègue au bureau : vous conseiller sur nos expertises (cybersécurité, réseaux, baies 42U, ERP, formations) et vous mettre en relation directe avec nos ingénieurs à Dakar.\n\nQuel projet ou besoin vous amène aujourd'hui ?";
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
    return "Avec grand plaisir ! Chez **NOBTECH**, nos devis sont **100% gratuits, personnalisés et sans engagement** sous 24h ouvrées. 📋\n\nPour aller au plus vite, 3 possibilités s'offrent à vous :\n\n1️⃣ **Remplir notre formulaire guidé en 1 minute** :\n👉 [Ouvrir le formulaire de devis en ligne](/contact)\n\n2️⃣ **M'en dire deux mots ici** :\nDites-moi simplement quel est votre projet (cybersécurité & pare-feu, câblage réseau, ERP, matériel, formation) et le nombre de postes ou locaux concernés. Je note tout pour nos ingénieurs !\n\n3️⃣ **Échanger directement sur WhatsApp** avec notre équipe technique :\n📲 [Discuter sur WhatsApp (+221 77 301 08 38)](https://wa.me/221773010838?text=Bonjour%20Koffi,%20je%20souhaite%20obtenir%20un%20devis)\n\nQuel domaine vous intéresse en priorité ?";
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

  return "Je suis à votre écoute ! Chez **NOBTECH**, nous intervenons en cybersécurité (Sophos, Fortinet), réseaux & câblage certifié, ERP sur-mesure (Odoo, Dolibarr), développement web et formations certifiantes à Dakar.\n\nDites-moi simplement ce que vous aimeriez réaliser ou joignez notre équipe au **+221 77 301 08 38** !";
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

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [knowledge, setKnowledge] = useState<KnowledgeItem[]>(DEFAULT_KNOWLEDGE_BASE);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'bot',
      text: "Bonjour ! Je m'appelle **Koffi**, votre conseiller chez **NOBTECH** 👋\n\nQue ce soit pour sécuriser vos réseaux, installer un pare-feu, concevoir un ERP ou estimer un devis gratuit sous 24h, je suis là pour vous accompagner avec grand plaisir !\n\nComment puis-je vous aider aujourd'hui ? 😊",
      time: getTime(),
      suggestions: INITIAL_SUGGESTIONS,
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Synchronise la base de connaissances dynamique depuis le CMS
  useEffect(() => {
    fetch('/api/chatbot-knowledge')
      .then((res) => res.json())
      .then((data) => {
        if (data?.greeting) {
          setMessages([
            {
              id: 'init',
              role: 'bot',
              text: data.greeting,
              time: getTime(),
              suggestions: INITIAL_SUGGESTIONS,
            }
          ]);
        }
        if (data?.knowledgeBase && Array.isArray(data.knowledgeBase) && data.knowledgeBase.length > 0) {
          setKnowledge([...data.knowledgeBase, ...DEFAULT_KNOWLEDGE_BASE]);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const sendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
      time: getTime(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: newMessages.slice(-6).map((m) => ({
            role: m.role,
            text: m.text,
          })),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const replyText = data.reply || getBotResponse(trimmed, knowledge);
        const suggestions = Array.isArray(data.suggestions) && data.suggestions.length > 0
          ? data.suggestions
          : fallbackSuggestions(replyText);

        const botMsg: Message = {
          id: `bot-${Date.now()}`,
          role: 'bot',
          text: replyText,
          time: getTime(),
          suggestions,
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        const replyText = getBotResponse(trimmed, knowledge);
        const botMsg: Message = {
          id: `bot-${Date.now()}`,
          role: 'bot',
          text: replyText,
          time: getTime(),
          suggestions: fallbackSuggestions(replyText),
        };
        setMessages((prev) => [...prev, botMsg]);
      }
    } catch {
      const replyText = getBotResponse(trimmed, knowledge);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        role: 'bot',
        text: replyText,
        time: getTime(),
        suggestions: fallbackSuggestions(replyText),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Fermer le chat' : 'Ouvrir le chat avec Koffi, conseiller NOBTECH'}
        className={cn(
          'fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-[150] flex items-center gap-2.5 rounded-full px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-[0_8px_32px_rgba(0,212,255,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 group',
          open
            ? 'bg-[#020617] border border-[#00D4FF]/40 text-[#00D4FF]'
            : 'bg-[#00D4FF] text-[#020617]'
        )}
      >
        {open ? (
          <X className="w-5 h-5" />
        ) : (
          <>
            <AssistantAvatar className="w-8 h-8 shrink-0 transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]" />
            <div className="flex flex-col text-left leading-none">
              <span className="text-xs font-black tracking-tight text-[#020617]">Koffi</span>
              <span className="text-[10px] font-semibold opacity-85 hidden sm:inline">Conseiller NOBTECH</span>
            </div>
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-[#020617]" />
          </>
        )}
      </button>

      {/* Chat window */}
      <div
        className={cn(
          'fixed bottom-20 right-3 sm:bottom-24 sm:right-8 z-[140] w-[calc(100vw-24px)] max-w-[400px] sm:w-[400px] rounded-2xl border border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.6)] backdrop-blur-xl bg-[#020617]/95 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right',
          open
            ? 'opacity-100 scale-100 pointer-events-auto translate-y-0'
            : 'opacity-0 scale-95 pointer-events-none translate-y-4'
        )}
        style={{ height: '520px', maxHeight: '82vh' }}
        role="dialog"
        aria-label="Discussion avec Koffi, conseiller digital NOBTECH"
        aria-modal="false"
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-white/[0.03] shrink-0">
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#00D4FF]/25 to-[#0284c7]/35 border border-[#00D4FF]/50 flex items-center justify-center p-0.5 shadow-md">
              <AssistantAvatar className="w-9 h-9" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#020617]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white leading-tight">Koffi</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#00D4FF]/10 text-[#00D4FF] font-medium border border-[#00D4FF]/20">
                NOBTECH
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-sans flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Conseiller en ligne · Répond sous 1s
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-slate-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
            aria-label="Fermer le chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages list */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5 scrollbar-thin scrollbar-thumb-white/10">
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
                  'max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                  msg.role === 'user'
                    ? 'bg-[#00D4FF] text-[#020617] rounded-tr-sm font-medium shadow-sm'
                    : 'bg-white/[0.06] text-slate-200 rounded-tl-sm border border-white/10'
                )}
              >
                <div className="whitespace-pre-line">{renderText(msg.text)}</div>
                
                {/* Suggestions interactives sous la dernière réponse */}
                {msg.role === 'bot' && msg.suggestions && msg.suggestions.length > 0 && i === messages.length - 1 && (
                  <div className="mt-3 pt-2.5 border-t border-white/10">
                    <p className="text-[10.5px] uppercase tracking-wider text-[#00D4FF] font-semibold mb-1.5">
                      Suggestions rapides :
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestions.map((sug, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => sendMessage(sug)}
                          disabled={isTyping}
                          className="text-xs px-2.5 py-1 rounded-full bg-[#00D4FF]/10 hover:bg-[#00D4FF] text-[#00D4FF] hover:text-[#020617] border border-[#00D4FF]/30 hover:border-[#00D4FF] transition-all duration-200 font-medium active:scale-95 text-left disabled:opacity-50"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className={cn(
                  'text-[9.5px] mt-1.5 font-mono',
                  msg.role === 'user' ? 'text-[#020617]/70 text-right' : 'text-slate-400'
                )}>
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
              placeholder="Posez votre question ou choisissez ci-dessus..."
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
            <span>Koffi · Conseiller NOBTECH</span>
            <span>Entrée pour envoyer</span>
          </div>
        </div>
      </div>
    </>
  );
}
