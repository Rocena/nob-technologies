import fs from 'fs';
import path from 'path';

export interface ChatHistoryItem {
  role: 'bot' | 'user' | 'assistant' | 'system';
  text: string;
}

export interface LearnedPattern {
  id: string;
  triggerPhrases: string[];
  topic: string;
  confidenceScore: number;
  updatedAt: string;
}

// In-memory runtime cache for learned patterns
let memoryLearnedCache: LearnedPattern[] = [];
let cacheLoaded = false;

const LEARNED_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'learned-chat.json');

// Initialize with rich pre-trained natural language patterns
const DEFAULT_LEARNED_PATTERNS: LearnedPattern[] = [
  {
    id: 'learn-typo-pricing',
    triggerPhrases: ['c koi le prix', 'cb ca coute', 'tarif stp', 'combien pour', 'c cher', 'les prix svp', 'cout moyen', 'kel prix'],
    topic: 'pricing',
    confidenceScore: 0.95,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'learn-typo-wifi-issue',
    triggerPhrases: ['mon wifi deconne', 'le wifi saute', 'connexion pourrie', 'reseau trop lent', 'ca coupe tt le tps', 'probleme internet'],
    topic: 'network-troubleshooting',
    confidenceScore: 0.95,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'learn-typo-virus',
    triggerPhrases: ['g un virus', 'ordi bloque', 'on s fait hacker', 'fichiers cryptes', 'rancon', 'pc infecte', 'ecran bloque'],
    topic: 'incident-response',
    confidenceScore: 0.98,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'learn-typo-training-inquiry',
    triggerPhrases: ['jveux apprendre', 'formation possible', 'cours du soir', 'certif cisco dispo', 'combien de tps la formation', 'formation pour debutant'],
    topic: 'training',
    confidenceScore: 0.95,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'learn-human-affirmation',
    triggerPhrases: ['oui', 'ok', 'daccord', 'dac', 'ca marche', 'je veux bien', 'pourquoi pas', 'vas y', 'exactement', 'c est ca', 'tout a fait'],
    topic: 'affirmation',
    confidenceScore: 0.92,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'learn-human-negation',
    triggerPhrases: ['non', 'nan', 'pas pour linstant', 'plus tard', 'pas besoin', 'laisse tomber', 'deedet'],
    topic: 'negation',
    confidenceScore: 0.92,
    updatedAt: new Date().toISOString(),
  },
];

export function getLearnedPatterns(): LearnedPattern[] {
  if (cacheLoaded && memoryLearnedCache.length > 0) {
    return memoryLearnedCache;
  }

  try {
    if (fs.existsSync(LEARNED_FILE_PATH)) {
      const raw = fs.readFileSync(LEARNED_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryLearnedCache = parsed;
        cacheLoaded = true;
        return memoryLearnedCache;
      }
    }
  } catch {
    // Fall back to default memory patterns
  }

  memoryLearnedCache = DEFAULT_LEARNED_PATTERNS;
  cacheLoaded = true;
  return memoryLearnedCache;
}

export function saveLearnedPattern(newPhrase: string, topic: string) {
  try {
    const patterns = getLearnedPatterns();
    const cleanPhrase = newPhrase.trim().toLowerCase();
    if (cleanPhrase.length < 3 || cleanPhrase.length > 80) return;

    const existing = patterns.find((p) => p.topic === topic);
    if (existing) {
      if (!existing.triggerPhrases.includes(cleanPhrase)) {
        existing.triggerPhrases.push(cleanPhrase);
        if (existing.triggerPhrases.length > 30) {
          existing.triggerPhrases.shift();
        }
        existing.confidenceScore = Math.min(1.0, existing.confidenceScore + 0.02);
        existing.updatedAt = new Date().toISOString();
      }
    } else {
      patterns.push({
        id: `learn-${Date.now()}`,
        triggerPhrases: [cleanPhrase],
        topic,
        confidenceScore: 0.85,
        updatedAt: new Date().toISOString(),
      });
    }

    memoryLearnedCache = patterns;

    // Persist to file asynchronously without blocking
    fs.promises.writeFile(LEARNED_FILE_PATH, JSON.stringify(patterns, null, 2), 'utf-8').catch(() => {
      // Ignore write errors in read-only / serverless environments
    });
  } catch {
    // Ignore error
  }
}

/**
 * Normalise un texte pour l'analyse en langage naturel :
 * Retire accents, ponctuation, espaces superflus, abréviations courantes.
 */
export function normalizeNaturalLanguage(text: string): string {
  let cleaned = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  // Remplacement des abréviations SMS / chat courantes en français
  const slangMap: Record<string, string> = {
    'c koi': 'c est quoi',
    'cb': 'combien',
    'slt': 'salut',
    'bjr': 'bonjour',
    'bsr': 'bonsoir',
    'mrci': 'merci',
    'mci': 'merci',
    'stp': 's il te plait',
    'svp': 's il vous plait',
    'prcq': 'parce que',
    'pk': 'pourquoi',
    'pkoi': 'pourquoi',
    'g ': 'j ai ',
    'jsuis': 'je suis',
    'jss': 'je suis',
    'ya': 'il y a',
    'rdv': 'rendez vous',
    'tel': 'telephone',
    'tps': 'temps',
    'pb': 'probleme',
    'tt': 'tout',
    'vs': 'vous',
    'kel': 'quel',
    'kelke': 'quelque',
  };

  for (const [abbr, full] of Object.entries(slangMap)) {
    cleaned = cleaned.replace(new RegExp(`\\b${abbr}\\b`, 'g'), full);
  }

  return cleaned.trim();
}

/**
 * Analyse le contexte multi-tours en examinant l'historique de la conversation
 */
export function analyzeConversationContext(
  userMessage: string,
  history: ChatHistoryItem[] = []
): {
  lastTopic?: string;
  isAffirmation: boolean;
  isNegation: boolean;
  isNumberAnswer: boolean;
  numberValue?: number;
  lastBotMessage?: string;
} {
  const normUser = normalizeNaturalLanguage(userMessage);
  const words = normUser.split(/[\s,.'?!]+/).filter(Boolean);

  const isAffirmation = /^(oui|ok|d accord|dac|ca marche|je veux bien|pourquoi pas|vas y|exactement|c est ca|tout a fait|waaw|yes|ouep)[.!?\s]*$/i.test(
    normUser
  );
  const isNegation = /^(non|nan|pas pour l instant|plus tard|pas besoin|laisse tomber|deedet|no)[.!?\s]*$/i.test(
    normUser
  );

  const numMatch = normUser.match(/\b(\d+)\b/);
  const isNumberAnswer = words.length <= 4 && Boolean(numMatch);
  const numberValue = numMatch ? parseInt(numMatch[1], 10) : undefined;

  const botMessages = history.filter((m) => m.role === 'bot' || m.role === 'assistant');
  const lastBot = botMessages.length > 0 ? botMessages[botMessages.length - 1] : undefined;
  const lastBotText = lastBot ? lastBot.text.toLowerCase() : '';

  let lastTopic: string | undefined;
  if (/cisco|ccna|power bi|formation|certif|cours/i.test(lastBotText)) {
    lastTopic = 'formation';
  } else if (/poste|utilisateur|serveur|ordinateur|volume/i.test(lastBotText)) {
    lastTopic = 'dimensionnement-postes';
  } else if (/cablage|baie|prise|locaux|bureau/i.test(lastBotText)) {
    lastTopic = 'cablage-reseau';
  } else if (/pare-feu|firewall|sophos|fortinet|cyber/i.test(lastBotText)) {
    lastTopic = 'cybersecurite';
  } else if (/erp|odoo|dolibarr|gestion|facturation/i.test(lastBotText)) {
    lastTopic = 'erp';
  } else if (/devis|chiffrage|formulaire/i.test(lastBotText)) {
    lastTopic = 'devis';
  } else if (/prenom|nom|email|whatsapp|coordonnees/i.test(lastBotText)) {
    lastTopic = 'contact-request';
  }

  return {
    lastTopic,
    isAffirmation,
    isNegation,
    isNumberAnswer,
    numberValue,
    lastBotMessage: lastBot?.text,
  };
}

/**
 * Génère le message humain de repli avec bouton WhatsApp quand Koffi ne comprend pas bien
 */
export function buildUnclearFallbackResponse(sessionId?: string): string {
  const refText = sessionId ? ` (Réf. #${sessionId})` : '';
  const waUrl = `https://wa.me/221773010838?text=Bonjour,%20j'%C3%A9changeais%20avec%20Koffi%20sur%20le%20site%20NOBTECH${encodeURIComponent(
    refText
  )}%20et%20je%20souhaite%20poser%20une%20question`;

  return (
    "Je ne suis pas tout à fait certain d'avoir bien compris votre demande, pardonnez-moi ! 😊 Pouvez-vous me la préciser en quelques mots ?\n\n" +
    "Si vous préférez, vous pouvez aussi échanger directement avec un de nos ingénieurs sur WhatsApp :\n" +
    `[💬 Échanger avec un ingénieur sur WhatsApp](${waUrl})`
  );
}
