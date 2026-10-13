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

export function KoffiAvatar({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Visage souriant de Koffi">
      <defs>
        <linearGradient id="koffi-head-grad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00D4FF" />
          <stop offset="100%" stopColor="#0077B6" />
        </linearGradient>
        <linearGradient id="koffi-glow" x1="18" y1="0" x2="18" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Antenne & voyant connecté */}
      <line x1="18" y1="2" x2="18" y2="6.5" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" />
      <circle cx="18" cy="2.5" r="2" fill="#10E760" />

      {/* Oreillettes stylisées */}
      <rect x="2" y="14" width="3" height="8" rx="1.5" fill="#00D4FF" />
      <rect x="31" y="14" width="3" height="8" rx="1.5" fill="#00D4FF" />

      {/* Tête souriante */}
      <rect x="5" y="7" width="26" height="23" rx="11" fill="url(#koffi-head-grad)" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="1" />
      <rect x="5" y="7" width="26" height="23" rx="11" fill="url(#koffi-glow)" />

      {/* Yeux expressifs souriants */}
      <path d="M 10.5 16.5 Q 13.5 13.5 16.5 16.5" stroke="#020617" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <path d="M 19.5 16.5 Q 22.5 13.5 25.5 16.5" stroke="#020617" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <circle cx="13.5" cy="14" r="0.8" fill="#FFFFFF" />
      <circle cx="22.5" cy="14" r="0.8" fill="#FFFFFF" />

      {/* Pommettes conviviales */}
      <ellipse cx="9" cy="20.5" rx="2" ry="1.2" fill="#FFFFFF" fillOpacity="0.35" />
      <ellipse cx="27" cy="20.5" rx="2" ry="1.2" fill="#FFFFFF" fillOpacity="0.35" />

      {/* Grand sourire amical */}
      <path d="M 12 21 Q 18 27.5 24 21" stroke="#020617" strokeWidth="2.4" strokeLinecap="round" fill="none" />
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
    response: "Bonjour et bienvenue chez NOB TECHNOLOGIES ! 👋 Je m'appelle Koffi. Comment puis-je vous aider aujourd'hui ? Je peux vous renseigner sur nos services de cybersécurité, réseaux, ERP, formations certifiantes ou vous orienter pour un devis gratuit."
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
  if (/t['\s]?es qui|qui es-?tu|es-?tu (une |un )?ia|qui parle|koffi/i.test(lower) || (words.length === 1 && words[0] === "qui")) {
    return "Je m'appelle Koffi, l'assistant virtuel de NOB TECHNOLOGIES ! 😊 Mon rôle est de vous renseigner 24h/24 avec le sourire comme un collègue au bureau : vous expliquer nos expertises et vous mettre en relation directe avec nos ingénieurs à Dakar.";
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
      text: "Bonjour ! Je m'appelle Koffi, l'assistant virtuel de NOB TECHNOLOGIES. Comment puis-je vous aider aujourd'hui ? 😊",
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
        aria-label={open ? 'Fermer la discussion avec Koffi' : 'Discuter avec Koffi'}
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
            <KoffiAvatar className="w-6 h-6 shrink-0 transition-transform duration-300 group-hover:rotate-6" />
            <div className="flex flex-col text-left leading-none">
              <span className="text-xs font-black tracking-tight text-[#020617]">Koffi</span>
              <span className="text-[10px] font-semibold opacity-80 hidden sm:inline">En ligne</span>
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
        aria-label="Discussion avec Koffi, assistant virtuel NOB TECHNOLOGIES"
        aria-modal="false"
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-white/[0.03] shrink-0">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30 flex items-center justify-center p-1">
              <KoffiAvatar className="w-7 h-7" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#020617]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white leading-tight">Koffi</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#00D4FF]/10 text-[#00D4FF] font-medium border border-[#00D4FF]/20">
                Assistant NOB TECH
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
                  <KoffiAvatar className="w-5 h-5" />
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
                
                {/* Suggestions interactives sous la dernière réponse de Koffi */}
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
                <KoffiAvatar className="w-5 h-5" />
              </div>
              <div className="bg-white/[0.06] border border-white/10 rounded-2xl rounded-tl-sm px-3.5 py-2.5 flex items-center gap-1.5">
                <span className="text-xs text-slate-400 mr-1">Koffi réfléchit...</span>
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
              placeholder="Écrivez à Koffi ou choisissez ci-dessus..."
              className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none"
              aria-label="Message pour Koffi"
              maxLength={500}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isTyping}
              aria-label="Envoyer à Koffi"
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
            <span>Koffi · Assistant NOB TECHNOLOGIES</span>
            <span>Entrée pour envoyer</span>
          </div>
        </div>
      </div>
    </>
  );
}
