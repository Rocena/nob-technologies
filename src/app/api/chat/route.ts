import { NextRequest, NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";

interface ChatMessage {
  role: "user" | "bot" | "assistant" | "system";
  text: string;
}

// System prompt grounding the assistant on NOB TECHNOLOGIES
const SYSTEM_PROMPT = `Tu es l'assistant virtuel officiel de NOB TECHNOLOGIES (nobtech.fr), société sénégalaise et ouest-africaine de référence en solutions et services informatiques, réseaux et cybersécurité.

Identité & Coordonnées :
- Entreprise : NOB TECHNOLOGIES
- Site web officiel : nobtech.fr
- Téléphones : +221 77 301 08 38 / +221 33 814 04 35
- Email : contact@nobtech.fr
- Adresse physique : Route de l’Aéroport LSS lot N° 79, Dakar, Sénégal
- Devise : « Votre sécurité, notre priorité »

Expertises & Services clés :
1. Cybersécurité & Firewalls : Sophos (firewalls XGS, Intercept X), Fortinet (FortiGate NGFW), Acronis (sauvegarde anti-ransomware), Wallix (gestion des accès à privilèges PAM/IAM), Kaspersky, Allot (anti-DDoS), GateWatcher (NDR IA souveraine).
2. Réseaux & Câblage : Câblage structuré cuivre et fibre optique, baies de brassage, commutation Cisco Catalyst, HPE Aruba, Wi-Fi d'entreprise.
3. ERP & Digitalisation : Conception d'ERP sur-mesure développés de bout en bout pour vos processus métiers uniques, ainsi qu'intégration et paramétrage d'ERP de référence (Dolibarr, Odoo) pour la facturation, stocks, CRM, RH et comptabilité.
4. Développement Web & Mobile : Applications web sur-mesure (ex: plateforme officielle de l'Hôtel du Parc / Parc Exotique du Sénégal), applications mobiles Flutter (iOS/Android).
5. Sauvegarde & Cloud Hybride : Solutions Acronis & Veritas, continuité d'activité (PCA/PRA).
6. Téléphonie IP (VoIP) : Standards IP-PBX Yeastar, passerelles Sangoma et télécoms unifiées.
7. Vente de Licences IT & Matériels : Licences officielles Microsoft 365 (ESD & CSP), serveurs d'entreprise Dell PowerEdge.
8. Formations professionnelles & Préparation aux Certifications (Cursus intensifs sur 6 mois) :
   - Préparation Certifications IT : Cisco CCNA/CCNP, Fortinet NSE 4, Sophos Certified Engineer, CompTIA Security+.
   - Cybersécurité Offensive & Défensive : Audit ISO 27001, surveillance SOC/SIEM, pentest.
   - Automatisation & IA : Workflows n8n, Python, agents LLM et connecteurs ERP.
   (Important : Nous préparons et accompagnons méthodiquement vos équipes aux examens internationaux).

Demande de Devis :
- Les devis sont 100% gratuits et personnalisés. On peut cliquer sur le bouton « Demander un devis » sur le site pour ouvrir le formulaire instantané. Réponse garantie sous 24h ouvrées.

Ton style de communication :
- Chaleureux, courtois, précis, technique et très naturel en français.
- Ne parle jamais comme un automate rigide. Sois fluide, synthétique et engageant.
- Ne mentionne jamais de détails techniques internes comme « Connecté au CMS » ou « Base de données ».`;

// Natural conversational fallback generator when no external API key is configured
function generateNaturalResponse(userMessage: string, history: ChatMessage[] = []): string {
  const q = userMessage.toLowerCase().trim();
  const startsWithGreeting = /^(bonjour|salut|bonsoir|hello|coucou|yo|bjr|salutations)/i.test(q);
  const prefix = startsWithGreeting ? "Bonjour ! " : "";

  // 1. Salutations pures (sans question spécifique)
  if (/^(bonjour|salut|bonsoir|hello|coucou|yo|bjr|salutations|qui [eê]tes-?vous|pr[eé]sentez-?vous)[.!?\s]*$/i.test(q)) {
    const greetings = [
      "Bonjour et bienvenue chez NOB TECHNOLOGIES ! 👋 Je suis ravi de vous accueillir. Comment puis-je vous accompagner dans votre projet ou répondre à vos questions aujourd'hui ?",
      "Bonjour ! C'est un plaisir d'échanger avec vous. Que vous ayez un besoin en cybersécurité, en infrastructure réseau, en ERP ou sur nos formations de 6 mois, je suis à votre entière disposition.",
      "Bienvenue sur la plateforme de NOB TECHNOLOGIES ! Comment puis-je vous être utile aujourd'hui ?"
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  // 2. Remerciements / Clôture
  if (/^(merci|super|parfait|nickel|top|remercie|d'accord|ok merci)[.!?\s]*$/i.test(q)) {
    return "C'est un réel plaisir de vous renseigner ! N'hésitez surtout pas si vous avez la moindre autre question. Vous pouvez aussi demander un devis gratuit en 1 clic ou contacter nos ingénieurs au +221 77 301 08 38. Belle journée à vous ! ✨";
  }

  // 3. Demande de devis / Tarifs / Prix
  if (/(prix|tarif|devis|co[uû]t|combien|factur|commander|budget|chiffrer)/i.test(q)) {
    return "Nos devis sont personnalisés et 100% gratuits. 📋 Chaque infrastructure ayant ses spécificités (taille du parc, niveau de sécurité, volume d'utilisateurs), nos ingénieurs vous remettent une proposition détaillée sous 24h ouvrées.\n\nVous pouvez simplement cliquer sur le bouton « Demander un devis » en haut du site ou nous écrire à contact@nobtech.fr en précisant votre besoin.";
  }

  // 4. Formations & Préparation aux Certifications
  if (/(formation|certif|ccna|ccnp|nse|comptia|iso 27001|apprendre|programme|cours|6 mois|syllabus)/i.test(q)) {
    return "Nous proposons 3 grands programmes d'excellence sur 6 mois (180 heures de pratique en labs réels) :\n\n" +
      "1. Préparation aux Certifications IT : pour réussir les examens Cisco CCNA/CCNP, Fortinet NSE 4, Sophos Certified Engineer et CompTIA Security+.\n" +
      "2. Cybersécurité, Audit & SOC : gouvernance ISO 27001, analyse de vulnérabilités, surveillance SOC et détection des intrusions.\n" +
      "3. Automatisation d'Entreprise & IA : flux n8n, scripts Python, connecteurs ERP (Dolibarr/Odoo) et agents IA.\n\n" +
      "Vous pouvez consulter les programmes détaillés sur notre page dédiée [Formations](/formations) et candidater directement pour la prochaine promotion.";
  }

  // 5. Cybersécurité, Pare-feu & Partenaires (Sophos, Fortinet, Acronis, Wallix...)
  if (/(cyber|s[eé]curit[eé]|firewall|pare-?feu|sophos|fortinet|fortigate|antivirus|ransomware|acronis|wallix|kaspersky|hacker|piratage|ddos)/i.test(q)) {
    return "La cybersécurité est le cœur de métier de NOB TECHNOLOGIES 🛡️. Nous déployons les solutions des leaders mondiaux :\n\n" +
      "• Pare-feux Next-Gen : Sophos XGS et Fortinet FortiGate (NGFW).\n" +
      "• Protection des données : Sauvegardes cloud hybrides et bouclier anti-ransomware Acronis & Veritas.\n" +
      "• Gestion des accès à privilèges (PAM/IAM) : Wallix Bastion et BeyondTrust.\n" +
      "• Détection avancée : NDR par IA souveraine avec GateWatcher et protection anti-DDoS Allot.\n\n" +
      "Souhaitez-vous un audit de votre parc actuel ou le déploiement d'une appliance sécurisée ?";
  }

  // 6. Réseaux, Câblage & Matériel (Cisco, Dell, Baies, Fibre)
  if (/(r[eé]seau|c[aâ]bl|fibre|baie|switch|routeur|cisco|dell|serveur|aruba|wi-?fi|wifi|lan|wan)/i.test(q)) {
    return "Nous concevons et déployons des architectures réseau haute disponibilité 🌐 :\n\n" +
      "• Câblage structuré Cat 6A/7 et raccordement fibre optique.\n" +
      "• Aménagement complet de baies de brassage et data centers d'entreprise.\n" +
      "• Commutateurs et routeurs Cisco Catalyst, HPE Aruba.\n" +
      "• Serveurs physiques Dell Technologies PowerEdge et baies de stockage SAN/NAS.\n\n" +
      "Toutes nos installations font l'objet de tests de certification et de documentation technique complète.";
  }

  // 7. ERP, Digitalisation, Conception sur-mesure & Intégration
  if (/(erp|odoo|dolibarr|gestion|factur|stock|comptabilit[eé]|digitalis)/i.test(q)) {
    return "Pour la digitalisation et la gestion unifiée de votre entreprise, nous intervenons selon deux approches complémentaires 💼 :\n\n" +
      "1. Conception d'ERP 100% sur-mesure : Nous développons votre progiciel de gestion intégré de bout en bout, taillé pour vos processus métiers spécifiques et vos flux complexes.\n" +
      "2. Déploiement & Intégration d'ERP de référence (Dolibarr & Odoo) : Paramétrage modulaire complet (gestion commerciale, devis, stocks, facturation, CRM, RH et comptabilité).\n\n" +
      "• Interconnexions & API : synchronisation bidirectionnelle avec votre site web, vos applications mobiles ou vos outils métiers existants.\n" +
      "• Hébergement sécurisé, migration de données et formation approfondie de vos équipes.";
  }

  // 8. Développement Web & Mobile, Parc Exotique
  if (/(site|web|mobile|application|app|d[eé]velopp|parc exotique|vitrine|boutique)/i.test(q)) {
    return "Nous concevons des sites web et applications mobiles (iOS & Android) performants, élégants et ultra-sécurisés 💻📱.\n\n" +
      "Nous avons notamment réalisé la plateforme officielle de l'Hôtel du Parc (Parc Exotique du Sénégal à Somone) avec module de réservation en ligne rapide et adapté aux smartphones. Nous créons également des portails extranets et plateformes transactionnelles pour les entreprises.";
  }

  // 9. Licences Microsoft 365
  if (/(licence|microsoft|office|365|teams|esd|csp|outlook|word|excel)/i.test(q)) {
    return "NOB TECHNOLOGIES est distributeur officiel de licences Microsoft 365 (formats ESD & CSP) pour professionnels 📊.\n\n" +
      "Nous prenons en charge la fourniture des licences, la configuration de vos boîtes Exchange professionnelles, la mise en place de Microsoft Teams et la sécurisation des identités via Microsoft Entra ID.";
  }

  // 10. Téléphonie IP & Vidéosurveillance
  if (/(t[eé]l[eé]phon|voip|ipbx|pabx|yeastar|sangoma|cam[eé]ra|vid[eé]os surveillance|surveillance)/i.test(q)) {
    return "Nous installons des solutions de téléphonie IP (VoIP) de dernière génération avec Yeastar et Sangoma, ainsi que des systèmes de vidéosurveillance IP haute définition pour sécuriser vos locaux et entrepôts.";
  }

  // 11. Coordonnées & Contact
  if (/(contact|adresse|t[eé]l[eé]phone|num[eé]ro|mail|email|o[uù] [eê]tes|dakar|a[eé]roport|si[eè]ge)/i.test(q)) {
    return "Voici comment nous joindre directement 📍 :\n\n" +
      "• Siège : Route de l’Aéroport LSS lot N° 79, Dakar, Sénégal.\n" +
      "• Téléphone direct : +221 77 301 08 38 ou +221 33 814 04 35.\n" +
      "• Email officiel : contact@nobtech.fr\n" +
      "• Horaires : du lundi au vendredi de 8h30 à 18h00 (support d'astreinte 24/7 pour les contrats d'infogérance).";
  }

  // 12. Réponse contextuelle par défaut mais intelligente
  return "Je comprends votre demande concernant votre système d'information. Chez NOB TECHNOLOGIES, nous intervenons sur l'ensemble du spectre IT : cybersécurité (Sophos, Fortinet), réseaux & câblage, conception et intégration d'ERP (sur-mesure, Odoo, Dolibarr), développement web/mobile, licences Office 365 et formations certifiantes sur 6 mois.\n\nPourriez-vous préciser votre besoin afin que je vous oriente au mieux, ou souhaitez-vous échanger directement avec un ingénieur au +221 77 301 08 38 ?";
}

// Handler for the /api/chat route
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message invalide" }, { status: 400 });
    }

    // Check if an open-source LLM endpoint or key is configured
    const openSourceKey =
      process.env.OPENSOURCE_AI_API_KEY ||
      process.env.GROQ_API_KEY ||
      process.env.OPENROUTER_API_KEY ||
      process.env.HF_TOKEN;

    const ollamaUrl = process.env.OLLAMA_BASE_URL; // e.g. http://localhost:11434

    // Attempt 1: If Ollama is running locally (100% free open-source on premise)
    if (ollamaUrl) {
      try {
        const ollamaRes = await fetch(`${ollamaUrl}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: process.env.OLLAMA_MODEL || "llama3",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...(Array.isArray(history) ? history.map((m: any) => ({
                role: m.role === "bot" ? "assistant" : "user",
                content: m.text,
              })) : []),
              { role: "user", content: message },
            ],
            stream: false,
          }),
        });

        if (ollamaRes.ok) {
          const data = await ollamaRes.json();
          if (data.message?.content) {
            return NextResponse.json({ reply: data.message.content, model: "ollama-local" });
          }
        }
      } catch (err) {
        // Fallback gracefully
      }
    }

    // Attempt 2: If an Open-Source provider API key is configured (Groq / OpenRouter / HuggingFace)
    if (openSourceKey) {
      try {
        // Groq API (free open source inference) or OpenRouter
        const endpoint = process.env.GROQ_API_KEY
          ? "https://api.groq.com/openai/v1/chat/completions"
          : "https://openrouter.ai/api/v1/chat/completions";

        const model = process.env.GROQ_API_KEY
          ? "llama-3.3-70b-versatile"
          : (process.env.OPENSOURCE_MODEL || "meta-llama/llama-3.2-3b-instruct:free");

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${openSourceKey}`,
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...(Array.isArray(history) ? history.map((m: any) => ({
                role: m.role === "bot" ? "assistant" : "user",
                content: m.text,
              })) : []),
              { role: "user", content: message },
            ],
            temperature: 0.7,
            max_tokens: 450,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const replyText = data.choices?.[0]?.message?.content;
          if (replyText) {
            return NextResponse.json({ reply: replyText, model });
          }
        }
      } catch (err) {
        // Fallback gracefully
      }
    }

    // Attempt 3: Built-in Natural Language Intelligence (Free, no license, immediate, 100% reliable)
    const naturalReply = generateNaturalResponse(message, history);
    return NextResponse.json({ reply: naturalReply, model: "natural-intelligence" });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Une erreur est survenue", reply: "Je suis temporairement indisponible. Vous pouvez nous contacter directement au +221 77 301 08 38 ou par email à contact@nobtech.fr." },
      { status: 500 }
    );
  }
}
