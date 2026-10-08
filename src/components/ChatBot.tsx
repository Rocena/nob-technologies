'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'bot' | 'user';
  text: string;
  time: string;
}

interface KnowledgeItem {
  keywords: string[];
  response: string;
}

function getTime() {
  return new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

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
    response: "NOB TECHNOLOGIES est situé à Dakar (Azura de l’Aéroport, 1SS lot N° 79). Vous pouvez nous appeler au +221 77 310 83 18 / +221 33 814 24 55 ou nous écrire à contact@nobtech.fr. 📍📞"
  },
  {
    keywords: ["réseau", "reseau", "wifi", "câblage", "cablage", "voip", "téléphonie", "cloud", "infogérance", "serveur", "informatique", "infrastructure"],
    response: "Nous réalisons le câblage structuré cuivre & fibre, l'aménagement de baies de brassage, la téléphonie IP Yeastar/Sangoma, et le déploiement de serveurs Dell et réseaux Cisco. 🌐"
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
    response: "Bonjour et bienvenue chez NOB TECHNOLOGIES ! 👋 Comment puis-je vous aider aujourd'hui ? Je peux vous renseigner sur nos services de cybersécurité, réseaux, ERP, formations de 6 mois ou vous orienter pour un devis gratuit."
  },
  {
    keywords: ["merci", "thanks", "parfait", "super", "excellent", "top"],
    response: "Avec grand plaisir ! N'hésitez pas si vous avez d'autres questions. L'équipe NOB TECHNOLOGIES reste à votre entière disposition au +221 77 310 83 18. 🙌"
  }
];

function getBotResponse(input: string, knowledge: KnowledgeItem[]): string {
  const lower = input.toLowerCase();
  const words = lower.split(/[\s,.'?!]+/).filter(w => w.length > 1);
  
  if (words.length === 0) {
    return "Pourriez-vous préciser votre question ? 😊";
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

  return "Je ne suis pas sûr de bien comprendre votre demande. 🧐 Pourriez-vous reformuler plus spécifiquement ? Autrement, je vous invite à contacter un agent humain sur notre page [Contact](/contact) pour une assistance personnalisée.";
}

// Render simple markdown links
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
      text: "Bonjour ! Je suis l'assistant de NOB TECHNOLOGIES. Comment puis-je vous aider aujourd'hui ? 👋",
      time: getTime(),
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
            }
          ]);
        }
        if (data?.knowledgeBase && Array.isArray(data.knowledgeBase) && data.knowledgeBase.length > 0) {
          // Fusionne la base CMS avec la base par défaut (les réponses CMS sont prioritaires)
          setKnowledge([...data.knowledgeBase, ...DEFAULT_KNOWLEDGE_BASE]);
        }
      })
      .catch(() => { /* conserve les réglages locaux */ });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const send = async () => {
    const trimmed = input.trim();
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
        const botMsg: Message = {
          id: `bot-${Date.now()}`,
          role: 'bot',
          text: replyText,
          time: getTime(),
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        const botMsg: Message = {
          id: `bot-${Date.now()}`,
          role: 'bot',
          text: getBotResponse(trimmed, knowledge),
          time: getTime(),
        };
        setMessages((prev) => [...prev, botMsg]);
      }
    } catch {
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        role: 'bot',
        text: getBotResponse(trimmed, knowledge),
        time: getTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Fermer le chat' : 'Ouvrir le chat'}
        className={cn(
          'fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-[150] flex items-center gap-2 rounded-full px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-[0_8px_32px_rgba(0,212,255,0.3)] transition-all duration-300 hover:scale-105 active:scale-95',
          open
            ? 'bg-[#020617] border border-[#00D4FF]/40 text-[#00D4FF]'
            : 'bg-[#00D4FF] text-[#020617]'
        )}
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
        {!open && (
          <>
            <span className="text-sm font-bold hidden sm:inline">Chat IA</span>
            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-green-400 text-[9px] font-bold text-white">
              IA
            </span>
          </>
        )}
      </button>

      {/* Chat window */}
      <div
        className={cn(
          'fixed bottom-20 right-3 sm:bottom-24 sm:right-8 z-[140] w-[calc(100vw-24px)] max-w-[380px] sm:w-[380px] rounded-2xl border border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.5)] backdrop-blur-xl bg-[#020617]/95 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right',
          open
            ? 'opacity-100 scale-100 pointer-events-auto translate-y-0'
            : 'opacity-0 scale-95 pointer-events-none translate-y-4'
        )}
        style={{ height: '450px' }}
        role="dialog"
        aria-label="Assistant NOB TECH"
        aria-modal="false"
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-white/[0.03] shrink-0">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30 flex items-center justify-center">
              <Bot className="w-4 h-4 text-[#00D4FF]" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#020617]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-white leading-tight">Assistant NOB TECH</div>
            <div className="text-[10px] text-[#00D4FF]/80 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Assistant Virtuel · En ligne
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-slate-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
            aria-label="Fermer le chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin scrollbar-thumb-white/10">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'flex gap-2',
                msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              )}
            >
              {msg.role === 'bot' && (
                <div className="w-7 h-7 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/20 flex items-center justify-center shrink-0 mt-auto">
                  <Bot className="w-3 h-3 text-[#00D4FF]" />
                </div>
              )}
              <div
                className={cn(
                  'max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                  msg.role === 'user'
                    ? 'bg-[#00D4FF] text-[#020617] rounded-tr-sm font-medium'
                    : 'bg-white/[0.07] text-slate-200 rounded-tl-sm border border-white/5'
                )}
              >
                <p>{renderText(msg.text)}</p>
                <p className={cn(
                  'text-[10px] mt-1',
                  msg.role === 'user' ? 'text-[#020617]/60 text-right' : 'text-slate-500'
                )}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-2 items-end">
              <div className="w-7 h-7 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/20 flex items-center justify-center shrink-0">
                <Bot className="w-3 h-3 text-[#00D4FF]" />
              </div>
              <div className="bg-white/[0.07] border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-3 py-3 border-t border-white/10 bg-white/[0.02] shrink-0">
          <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2 focus-within:border-[#00D4FF]/40 transition-colors">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Posez votre question..."
              className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none"
              aria-label="Message"
              maxLength={500}
            />
            <button
              onClick={send}
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
        </div>
      </div>
    </>
  );
}
