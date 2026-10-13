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

// Illustration d'un jeune homme africain souriant avec des lunettes (moderne, pro, corporate)
export function AssistantAvatar({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Conseiller digital NOB TECHNOLOGIES">
      <defs>
        {/* Dégradé peau riche et naturelle */}
        <linearGradient id="skin-grad" x1="32" y1="14" x2="32" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8A5A36" />
          <stop offset="100%" stopColor="#5E381E" />
        </linearGradient>
        {/* Dégradé ombre sous mâchoire */}
        <linearGradient id="neck-shadow" x1="32" y1="40" x2="32" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#482A14" />
          <stop offset="100%" stopColor="#693F22" />
        </linearGradient>
        {/* Reflet verres de lunettes */}
        <linearGradient id="glass-glare" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.3" />
          <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
        </linearGradient>
        {/* Vêtement polo corporate */}
        <linearGradient id="shirt-grad" x1="32" y1="48" x2="32" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
      </defs>

      {/* Fond circulaire corporate */}
      <circle cx="32" cy="32" r="31" fill="#020617" stroke="#00D4FF" strokeWidth="1.5" strokeOpacity="0.4" />

      {/* Épaules & Vêtement */}
      <path d="M12 64 C12 52 20 48 32 48 C44 48 52 52 52 64 Z" fill="url(#shirt-grad)" />
      {/* Col du polo / veste moderne avec liseré cyan */}
      <path d="M24 50 L32 58 L40 50" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 51 L32 55 L36 51" fill="#FFFFFF" fillOpacity="0.15" />

      {/* Cou */}
      <path d="M25 40 H39 V51 C39 53 37 54 32 54 C27 54 25 53 25 51 Z" fill="url(#neck-shadow)" />

      {/* Oreilles */}
      <ellipse cx="17.5" cy="31" rx="3.5" ry="5.5" fill="#693F22" />
      <ellipse cx="17.5" cy="31" rx="2" ry="3.5" fill="#482A14" />
      <ellipse cx="46.5" cy="31" rx="3.5" ry="5.5" fill="#693F22" />
      <ellipse cx="46.5" cy="31" rx="2" ry="3.5" fill="#482A14" />

      {/* Visage / Mâchoire */}
      <path d="M19 25 C19 16 23 13 32 13 C41 13 45 16 45 25 C45 35 41 44 32 44 C23 44 19 35 19 25 Z" fill="url(#skin-grad)" />

      {/* Cheveux : coupe courte noire très soignée */}
      <path d="M18.5 24 C18 19 20 10 32 10 C44 10 46 19 45.5 24 C44 16 42 12 32 12 C22 12 20 16 18.5 24 Z" fill="#141416" />
      <path d="M19.5 16 C22 11.5 27 10 32 10 C37 10 42 11.5 44.5 16 C43 13 39 11 32 11 C25 11 21 13 19.5 16 Z" fill="#202024" />

      {/* Sourcils soignés */}
      <path d="M22 23 C24 21.5 27 21.5 29 23" stroke="#1A1A1E" strokeWidth="2" strokeLinecap="round" />
      <path d="M35 23 C37 21.5 40 21.5 42 23" stroke="#1A1A1E" strokeWidth="2" strokeLinecap="round" />

      {/* Yeux souriants & expressifs */}
      <ellipse cx="25.5" cy="27" rx="2.5" ry="2" fill="#181310" />
      <circle cx="26.2" cy="26.3" r="0.8" fill="#FFFFFF" />
      <ellipse cx="38.5" cy="27" rx="2.5" ry="2" fill="#181310" />
      <circle cx="39.2" cy="26.3" r="0.8" fill="#FFFFFF" />

      {/* Lunettes élégantes et modernes */}
      <rect x="21" y="22.5" width="9.5" height="8.5" rx="3.5" fill="url(#glass-glare)" stroke="#0F172A" strokeWidth="1.8" />
      <rect x="33.5" y="22.5" width="9.5" height="8.5" rx="3.5" fill="url(#glass-glare)" stroke="#0F172A" strokeWidth="1.8" />
      <path d="M30.5 25.5 C31.5 24.5 32.5 24.5 33.5 25.5" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M21 25.5 L17.5 26" stroke="#0F172A" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M43 25.5 L46.5 26" stroke="#0F172A" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M23 24 L27 24" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.7" />
      <path d="M35.5 24 L39.5 24" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.7" />

      {/* Nez */}
      <path d="M32 28.5 V32 C31 33 33 33 32 33" stroke="#482A14" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M30 33 C31 33.5 33 33.5 34 33" stroke="#482A14" strokeWidth="1.4" strokeLinecap="round" />

      {/* Pommettes souriantes */}
      <ellipse cx="20.5" cy="33" rx="2.2" ry="1.2" fill="#99583D" fillOpacity="0.4" />
      <ellipse cx="43.5" cy="33" rx="2.2" ry="1.2" fill="#99583D" fillOpacity="0.4" />

      {/* Grand sourire franc & chaleureux avec dents visibles */}
      <path d="M26 36.5 C26 36.5 28 41 32 41 C36 41 38 36.5 38 36.5 Z" fill="#4A1818" />
      <path d="M27 37 C28.5 38.5 35.5 38.5 37 37 C36 36.5 28 36.5 27 37 Z" fill="#FFFFFF" />
      <path d="M25 36.5 C28 40.5 36 40.5 39 36.5" stroke="#381E10" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

const INITIAL_SUGGESTIONS: string[] = [
  "Cybersécurité & Firewalls",
  "Réseaux & Câblage",
  "Formations certifiantes",
  "Demander un devis gratuit",
];

const DEFAULT_KNOWLEDGE_BASE: KnowledgeItem[] = [
  {
    keywords: ["prix", "tarif", "devis", "coût", "cout", "forfait", "abonnement", "chiffrer", "commander"],
    response: "Nos devis sont 100% personnalisés et gratuits ! Cliquez sur « Demander un devis » sur le site pour nous faire part de vos besoins, ou contactez directement nos ingénieurs. Nous vous répondons sous 24h ouvrées. 📋"
  },
  {
    keywords: ["sécurité", "securite", "cyber", "cybersécurité", "firewall", "vpn", "protection", "hack", "virus", "sophos", "fortinet"],
    response: "La cybersécurité est le cœur de métier de NOB TECHNOLOGIES ! Nous déployons des pare-feux nouvelle génération Sophos & Fortinet, des sauvegardes anti-ransomware Acronis, et assurons la gouvernance IAM avec Wallix. 🔐"
  },
  {
    keywords: ["contact", "appel", "téléphone", "telephone", "email", "joindre", "rappel", "adresse", "dakar", "sénégal", "senegal", "localiser", "localisation"],
    response: "NOB TECHNOLOGIES est situé à Dakar (Route de l’Aéroport LSS lot N° 79, repère Google Maps : QG3J+HP Dakar). Vous pouvez nous appeler au +221 77 301 08 38 / +221 33 814 04 35 ou nous écrire à contact@nobtech.fr. 📍📞"
  },
  {
    keywords: ["réseau", "reseau", "wifi", "câblage", "cablage", "voip", "téléphonie", "cloud", "infogérance", "serveur", "informatique", "infrastructure"],
    response: "Nous réalisons le câblage structuré cuivre & fibre, l'aménagement de baies de brassage, la téléphonie IP Yeastar & Cisco, et le déploiement de serveurs Dell et réseaux haute disponibilité. 🌐"
  },
  {
    keywords: ["formation", "formations", "certifications", "certification", "ccna", "ccnp", "nse", "comptia", "programme", "6 mois"],
    response: "Nous proposons des programmes d'immersion de 6 mois pour préparer vos équipes aux certifications d'élite : Cisco (CCNA/CCNP), Fortinet (NSE), CompTIA Security+, ainsi que des cursus en Audit Cybersécurité et Automatisation/IA. Découvrez notre page [Formations](/formations) ! 🎓"
  },
  {
    keywords: ["erp", "odoo", "dolibarr", "gestion", "logiciel", "web", "mobile", "sur-mesure", "progiciel"],
    response: "Nous concevons des ERP sur-mesure développés selon vos processus métiers spécifiques, et nous intégrons également les solutions de référence comme Dolibarr et Odoo. Nous développons aussi vos applications web & mobiles sur-mesure. 🚀"
  },
  {
    keywords: ["bonjour", "salut", "hello", "bonsoir", "bjr", "coucou", "yo"],
    response: "Bonjour et bienvenue chez NOB TECHNOLOGIES ! 👋 Comment puis-je vous aider aujourd'hui ? Je peux vous renseigner sur nos services de cybersécurité, réseaux, ERP, formations certifiantes ou vous orienter pour un devis gratuit."
  },
  {
    keywords: ["merci", "thanks", "parfait", "super", "excellent", "top"],
    response: "Avec grand plaisir ! N'hésitez pas si vous avez d'autres questions. L'équipe NOB TECHNOLOGIES reste à votre entière disposition au +221 77 301 08 38. 🙌"
  }
];

function fallbackSuggestions(text: string): string[] {
  const lower = text.toLowerCase();
  if (/devis|prix|tarif|combien|cout/i.test(lower)) {
    return ["Demander un devis gratuit", "Échanger avec un ingénieur", "Délai d'intervention"];
  }
  if (/cyber|securite|firewall|sophos|fortinet/i.test(lower)) {
    return ["Audit & Test d'intrusion", "Pare-feu Sophos / Fortinet", "Demander un devis cyber"];
  }
  if (/formation|certif|ccna|cisco/i.test(lower)) {
    return ["Certificat Cisco Cyber", "Formation Cisco CCNA", "Power BI & SOC Analytics"];
  }
  if (/erp|odoo|dolibarr|gestion/i.test(lower)) {
    return ["ERP 100% sur-mesure", "Intégration Odoo", "Intégration Dolibarr"];
  }
  if (/reseau|wifi|cablage|baie/i.test(lower)) {
    return ["Câblage structuré & Baies 42U", "Wi-Fi professionnel", "Standard VoIP"];
  }
  return ["Cybersécurité & Firewalls", "Réseaux, Câblage & Baies", "Formations certifiantes", "Demander un devis gratuit"];
}

function getBotResponse(input: string, knowledge: KnowledgeItem[]): string {
  const lower = input.toLowerCase().trim();
  const words = lower.split(/[\s,.'?!]+/).filter(w => w.length > 0);
  
  if (words.length === 0) {
    return "Je vous écoute ! Dites-moi tout : comment puis-je vous aider aujourd'hui ? 😊";
  }

  if (/pizza|burger|nourriture|faim|manger/i.test(lower)) {
    return "Haha, pas du tout ! 😄 Nous ne livrons pas de pizzas, mais nous sécurisons vos réseaux d'entreprise, installons des pare-feux et concevons des ERP sur-mesure. Si vous avez un besoin informatique, là vous pouvez compter sur nous !";
  }
  if (/blague|humour|marrant/i.test(lower)) {
    return "Pourquoi les administrateurs réseaux et les développeurs détestent-ils la nature ? Parce qu'il y a trop de bugs et aucun Ctrl+Z ! 🐛💻 Comment se porte votre système informatique aujourd'hui ?";
  }
  if (/t['\s]?es qui|qui es-?tu|es-?tu (une |un )?ia|qui parle/i.test(lower) || (words.length === 1 && words[0] === "qui")) {
    return "Je suis votre conseiller digital chez NOB TECHNOLOGIES ! 😊 Mon rôle est de vous renseigner 24h/24 avec le sourire comme un collègue au bureau : vous expliquer nos expertises et vous mettre en relation directe avec nos ingénieurs à Dakar.";
  }
  if (/stage|recrutement|emploi|cv|job/i.test(lower)) {
    return "Vous souhaitez rejoindre NOB TECHNOLOGIES ? 💼 C'est un plaisir ! Envoyez votre CV et lettre de motivation directement à contact@nobtech.fr avec en objet « Candidature Stage / Emploi ». Notre équipe RH l'étudiera avec attention !";
  }
  if (/urgent|urgence|sos|panne|bloqu/i.test(lower)) {
    return "Je suis là ! 🚨 S'il s'agit d'une panne bloquante ou d'un incident critique, appelez directement nos ingénieurs au +221 77 301 08 38 pour une prise en charge immédiate. Sinon, décrivez-moi le problème ici !";
  }
  if (/whatsapp/i.test(lower)) {
    return "Vous pouvez nous écrire directement sur WhatsApp au +221 77 301 08 38 📲 ! Nos ingénieurs vous répondent très rapidement.";
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

  return "Je vous écoute ! Chez NOB TECHNOLOGIES, nous intervenons en cybersécurité (Sophos, Fortinet), réseaux physiques & Wi-Fi, ERP sur-mesure (Odoo, Dolibarr), développement web et formations certifiantes à Dakar.\n\nDites-moi simplement ce que vous aimeriez réaliser ou joignez notre équipe au +221 77 301 08 38 !";
}

function renderText(text: string) {
  const parts = text.split(/(\[.*?\]\(.*?\))/g);
  return parts.map((part, i) => {
    const match = part.match(/\[(.*?)\]\((.*?)\)/);
    if (match) {
      return (
        <a key={i} href={match[2]} className="underline text-[#00D4FF] hover:text-[#00D4FF]/80 transition-colors">
          {match[1]}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [knowledge, setKnowledge] = useState<KnowledgeItem[]>(DEFAULT_KNOWLEDGE_BASE);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'bot',
      text: "Bonjour ! Je suis l'assistant virtuel de NOB TECHNOLOGIES. Comment puis-je vous aider aujourd'hui ? 😊",
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
        aria-label={open ? 'Fermer le chat' : 'Ouvrir le chat avec notre assistant'}
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
            <AssistantAvatar className="w-7 h-7 shrink-0 transition-transform duration-300 group-hover:scale-110" />
            <div className="flex flex-col text-left leading-none">
              <span className="text-xs font-black tracking-tight text-[#020617]">Assistant</span>
              <span className="text-[10px] font-semibold opacity-85 hidden sm:inline">En ligne</span>
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
        aria-label="Discussion avec l'assistant virtuel NOB TECHNOLOGIES"
        aria-modal="false"
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-white/[0.03] shrink-0">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30 flex items-center justify-center p-0.5">
              <AssistantAvatar className="w-8 h-8" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#020617]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white leading-tight">Conseiller Virtuel</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#00D4FF]/10 text-[#00D4FF] font-medium border border-[#00D4FF]/20">
                NOB TECH
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-sans flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Souriant &amp; disponible pour vous guider
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
                <div className="w-7 h-7 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/25 flex items-center justify-center shrink-0 mt-auto p-0.5">
                  <AssistantAvatar className="w-6 h-6" />
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
              <div className="w-7 h-7 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/25 flex items-center justify-center shrink-0 p-0.5">
                <AssistantAvatar className="w-6 h-6" />
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
            <span>Assistant Virtuel · NOB TECHNOLOGIES</span>
            <span>Entrée pour envoyer</span>
          </div>
        </div>
      </div>
    </>
  );
}
