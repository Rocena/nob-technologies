import { NextRequest, NextResponse } from "next/server";

interface ChatMessage {
  role: "user" | "bot" | "assistant" | "system";
  text: string;
}

// System prompt grounding any AI assistant on NOB TECHNOLOGIES
const SYSTEM_PROMPT = `Tu es l'assistant de NOB TECHNOLOGIES (nobtech.fr), société sénégalaise et ouest-africaine de référence en solutions informatiques, réseaux et cybersécurité à Dakar.

Ton identité & ton style :
- Tu parles comme un humain chaleureux, dynamique, poli, compétent et très naturel.
- Ne parle JAMAIS comme un robot ou un serveur vocal rigide. Pas de phrases bureaucratiques.
- Sois direct, bienveillant, et utilise des emojis avec parcimonie pour être convivial.
- Si l'utilisateur pose une question hors du cadre (humour, météo, pizza, blague...), réponds avec le sourire et un brin d'esprit, puis réoriente gentiment vers l'informatique.
- Si l'utilisateur salue en Wolof (« nanga def », « salaam »), réponds chaleureusement en intégrant des formules locales amicales (« Mangi fi rekk », « Wa aleikoum salam »).
- Si l'utilisateur demande de pirater un compte privé (Instagram, WhatsApp...), refuse fermement mais poliment en rappelant que NOB TECHNOLOGIES fait uniquement de la cybersécurité défensive et éthique, mais propose de l'aider si son compte ou son entreprise subit une attaque.
- Si l'utilisateur est dans l'urgence ou en panne, sois réactif et donne immédiatement le numéro d'astreinte : +221 77 301 08 38.

Coordonnées officielles de NOB TECHNOLOGIES :
- Siège : Route de l’Aéroport LSS lot N° 79, Dakar, Sénégal.
- Téléphone & WhatsApp : +221 77 301 08 38 / Fixe : +221 33 814 04 35
- Email officiel : contact@nobtech.fr
- Devis : 100% gratuits sous 24h ouvrées.

Pôles d'expertise clés :
1. Cybersécurité : Pare-feux Sophos XGS, Fortinet FortiGate, sauvegardes anti-ransomware Acronis, gestion PAM Wallix, tests d'intrusion (pentest).
2. Réseaux & Câblage : Câblage Cat 6A/7, baies de brassage 42U certifiées Fluke (ex: déploiement pour la Délégation de l'Union Européenne à Dakar), switchs Cisco, Wi-Fi d'entreprise.
3. ERP & Digitalisation : ERP 100% sur-mesure développés de bout en bout, et intégration des solutions Odoo et Dolibarr (stocks, facturation, CRM, comptabilité).
4. Web & Mobile : Plateformes web performantes (ex: plateforme officielle de l'Hôtel du Parc / Parc Exotique du Sénégal), applications mobiles Flutter.
5. Vente de Matériel & Licences : Serveurs d'entreprise Dell PowerEdge, switchs Cisco, licences officielles Microsoft 365.
6. Formations de 6 mois & Certifications : Initiation cybersécurité, sensibilisation phishing, IA, Fortinet NSE 4, Sophos, Microsoft 365, Cisco CCNA, Gestion de projet, ISO 27001/NIST, Ethical Hacking.`;

// Natural conversational human response generator (works 100% offline & without third-party API keys)
function generateNaturalResponse(userMessage: string, history: ChatMessage[] = []): string {
  const raw = userMessage.trim();
  const q = raw.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // strip accents
  const words = q.split(/[\s,.'?!;:()\-_\/]+/).filter((w) => w.length > 0);
  const isOneWord = words.length <= 1;

  // 1. Wolof & Greetings sénégalaises
  if (/^(nanga def|salaam|assalam|salam|mangi fi|ba beneen|na rekk|jerejef)/i.test(q)) {
    if (/nanga def/i.test(q)) {
      return "Mangi fi rekk, alhamdoulilah ! 👋 Bienvenue chez NOB TECHNOLOGIES. Comment allez-vous ? Dites-moi comment je peux vous être utile pour vos projets informatiques ou réseau !";
    }
    if (/salaam|assalam|salam/i.test(q)) {
      return "Wa aleikoum salam ! 🙏 Bienvenue chez NOB TECHNOLOGIES à Dakar. Comment puis-je vous accompagner aujourd'hui ?";
    }
    if (/jerejef/i.test(q)) {
      return "Amul solo ! C'est un réel plaisir d'échanger avec vous. N'hésitez surtout pas si vous avez d'autres questions ! ✨";
    }
    return "Bienvenue chez NOB TECHNOLOGIES à Dakar ! Comment pouvons-nous vous aider aujourd'hui ?";
  }

  // 2. Salutations informelles ou classiques
  if (/^(bonjour|salut|bonsoir|hello|coucou|yo|bjr|salutations|hi|hey|rebonjour)[.!?\s]*$/i.test(q)) {
    const isEvening = new Date().getHours() >= 18;
    const greetingWord = isEvening ? "Bonsoir" : "Bonjour";
    const greetings = [
      `${greetingWord} ! Ravi de vous accueillir chez NOB TECHNOLOGIES. 👋 Comment se passe votre journée ? Que puis-je faire pour vous aujourd'hui ?`,
      `${greetingWord} ! C'est un plaisir d'échanger avec vous. Que vous ayez un besoin en cybersécurité, réseau, ERP ou formation, dites-moi tout, je suis là pour vous aider !`,
      `${greetingWord} et bienvenue ! Dites-moi tout : comment puis-je vous renseigner aujourd'hui ?`,
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  // 3. Question "T'es qui ?", "Qui êtes-vous ?", "IA ou humain ?"
  if (
    /(t['\s]?es qui|qui es-?tu|qui [eê]tes-?vous|c['\s]?est qui|es-?tu (une |un )?ia|tu es un robot|qui parle|pr[eé]sente-?toi|pr[eé]sentez-?vous)/i.test(q) ||
    (isOneWord && words[0] === "qui")
  ) {
    return "Je suis l'assistant digital de NOB TECHNOLOGIES ! 🤖\n\nMon rôle, c'est de vous renseigner 24h/24 en direct comme le ferait un collègue au bureau : vous expliquer nos solutions (cybersécurité, réseaux, ERP, formations certifiantes) et vous mettre en relation avec nos vrais ingénieurs à Dakar.\n\nEt vous, qui êtes-vous ou quel projet vous amène ?";
  }

  // 4. Questions "Hors du cadre" (Humour, nourriture, vie perso, blagues, météo)
  if (/(pizza|manger|nourriture|caf[eé]|burger|plat|faim|livr)/i.test(q) && !/site|application|logiciel|erp/i.test(q)) {
    return "Haha, pas du tout ! 😄 Notre truc à nous chez NOB TECHNOLOGIES, c'est plutôt les pare-feux, les baies de brassage et les lignes de code que la cuisine !\n\nPar contre, si vous gérez un restaurant ou un commerce et voulez créer son site web, déployer un Wi-Fi sécurisé ou gérer vos stocks avec un ERP, là on est les spécialistes ! Que cherchiez-vous à faire ?";
  }

  if (/(blague|raconte|humour|marrant|fais moi rire)/i.test(q)) {
    return "Avec plaisir ! 😄 Pourquoi les administrateurs réseaux et les développeurs détestent-ils la nature ?\n\n... Parce qu'il y a beaucoup trop de bugs et aucun bouton Ctrl+Z ! 🐛💻\n\nPlus sérieusement, comment se porte votre système informatique aujourd'hui ?";
  }

  if (/(m[eé]t[eé]o|quel temps|politique|pr[eé]sident|football|match)/i.test(q)) {
    return "Je préfère laisser la météo et le sport aux experts ! ☀️ Chez NOB TECHNOLOGIES, ma spécialité c'est de veiller à ce que vos serveurs tournent à plein régime et que votre entreprise soit impénétrable face aux cyberattaques. Avez-vous un projet IT en tête ?";
  }

  // 5. Demande de piratage illégal (ex: "pirater un compte instagram / whatsapp")
  if (/(pirat|hack)/i.test(q) && /(compte|instagram|facebook|whatsapp|snap|mot de passe|espion|t[eé]l[eé]phone|copine|mari)/i.test(q)) {
    return "Ah non, absolument pas ! 🚫 Chez NOB TECHNOLOGIES, nous pratiquons exclusivement la cybersécurité éthique et légale. Nous aidons les entreprises et professionnels à se défendre contre les attaques, à auditer leurs systèmes et à former leurs équipes.\n\nEn revanche, si l'un de vos comptes ou le réseau de votre entreprise a été compromis ou piraté, nous pouvons intervenir pour sécuriser vos accès, nettoyer vos machines et restaurer vos données !";
  }

  // 6. Urgence, Panne critique, SOS, Allo, besoin d'un informaticien en urgence
  if (/(urgence|en urgence|urgent|bloqu[eé]|sos|a l['\s]aide|help)/i.test(q) || (isOneWord && ["urgent", "sos", "allo", "aide"].includes(words[0]))) {
    return "Je suis là ! Dites-moi tout : quelle est l'urgence ? 🚨\n\n• Si vous subissez une panne bloquante, une coupure totale de réseau ou une cyberattaque suspecte, le plus rapide est d'appeler directement nos ingénieurs d'astreinte au **+221 77 301 08 38**.\n\nSinon, décrivez-moi brièvement le problème ici pour que je vous oriente tout de suite !";
  }

  // 7. Panne PC / Informatique perso ou pro
  if (/(mon pc|mon ordi|mon ordinateur|machine|en panne|ne d[eé]marre|d[eé]marre plus|ecran bleu|lent|rame|virus|infect[eé])/i.test(q)) {
    return "Aïe, c'est toujours frustrant quand le matériel fait des siennes ! 💻\n\nQuel est le symptôme exact ?\n• L'appareil refuse de s'allumer ?\n• Écran bleu ou redémarrages en boucle ?\n• Lenteur anormale ou messages bizarres (possible virus/ransomware) ?\n\nChez NOB TECHNOLOGIES, nous gérons principalement les parcs informatiques complets d'entreprises, serveurs et réseaux. Expliquez-moi votre situation ou appelez notre support au +221 77 301 08 38 pour voir comment nous pouvons vous débloquer !";
  }

  // 8. Stage, Emploi, Recrutement, CV
  if (/(stage|recrutement|emploi|embauche|cv|job|candidat|postuler|travailler chez vous|rejoindre)/i.test(q) || (isOneWord && ["stage", "recrutement", "emploi", "cv", "job"].includes(words[0]))) {
    return "Vous souhaitez rejoindre l'équipe NOB TECHNOLOGIES ? C'est une excellente idée ! 💼\n\nNous accueillons régulièrement des stagiaires et talents motivés en réseaux, cybersécurité, développement d'applications et administration système.\n\n👉 Envoyez simplement votre CV et une courte lettre de motivation à **contact@nobtech.fr** en précisant en objet « Candidature Stage » ou « Candidature Emploi ». Notre équipe RH vous répondra avec attention !";
  }

  // 9. Horaires & Samedi / Dimanche / Disponibilité
  if (/(samedi|dimanche|week-?end|horaire|ouvert|heure|fermeture|quand venez-vous)/i.test(q)) {
    return "Voici nos créneaux d'ouverture ⏰ :\n\n• **Lundi au Vendredi** : 8h30 à 18h00 (accueil physique et interventions courantes).\n• **Samedi** : sessions de formation certifiante et ateliers pratiques.\n• **Astreinte 24h/24 & 7j/7** : pour nos clients sous contrat d'infogérance et de maintenance critique.\n\nVous avez besoin d'une intervention planifiée ou urgente ce week-end ?";
  }

  // 10. WhatsApp & Téléphone direct
  if (/(whatsapp|t[eé]l[eé]phone|num[eé]ro|appeler|joindre|direct|m['\s]appeler)/i.test(q)) {
    return "Vous pouvez nous joindre directement très facilement 📲 :\n\n• **WhatsApp & Mobile direct** : **+221 77 301 08 38** (réponse rapide par nos ingénieurs)\n• **Standard fixe** : +221 33 814 04 35\n• **Email** : contact@nobtech.fr\n\nN'hésitez pas à nous envoyer un message vocal ou texte sur WhatsApp, nous sommes très réactifs !";
  }

  // 11. Localisation : "Dakar", "Où êtes-vous ?", "Adresse", "Où se trouvent vos bureaux ?"
  if (/(adresse|o[uù] [eê]tes|o[uù] se trouve|localisation|localiser|situer|si[eè]ge|venir vous voir|passer vous voir)/i.test(q) || (isOneWord && words[0] === "dakar")) {
    return "Nous sommes basés à Dakar ! 📍\n\n• **Adresse exacte** : Route de l’Aéroport LSS, lot N° 79, Dakar, Sénégal.\n• **Rayon d'action** : Tout Dakar (Plateau, Almadies, Zone Industrielle, etc.), les autres régions du Sénégal (Thiès, Mbour/Saly, Saint-Louis...) et dans la sous-région ouest-africaine.\n\nVous souhaitez planifier un rendez-vous à nos bureaux ou qu'un ingénieur passe dans vos locaux ?";
  }

  // 12. Devis, Prix, Tarifs, "C'est cher ?"
  if (/(c['\s]?est cher|combien [cç]a co[uû]te|prix|tarif|devis|co[uû]t|budget|chiffrer|factur|moyen de paiement|wave|orange money)/i.test(q) || (isOneWord && ["prix", "devis", "tarif", "combien"].includes(words[0]))) {
    return "Pour vous répondre en toute franchise : nos tarifs sont étudiés pour être justes, compétitifs et transparents, adaptés aux PME comme aux grandes entreprises au Sénégal. 💼\n\nChaque besoin étant particulier (taille de vos locaux, nombre de postes, type de pare-feu ou modules ERP), nous établissons un **devis personnalisé 100% gratuit sous 24h ouvrées**.\n\n👉 Vous pouvez cliquer sur le bouton « Demander un devis » en haut du site, ou m'indiquer en 2 mots ce que vous souhaitez mettre en place pour que je vous donne une première estimation !";
  }

  // 13. Wi-Fi & Problèmes réseau local
  if (/(wi-?fi|wifi|borne wifi|sans fil|roaming)/i.test(q) || (isOneWord && words[0] === "wifi")) {
    return "Un Wi-Fi qui rame ou qui coupe en pleine réunion, c'est le cauchemar de toute entreprise ! 📶\n\nChez NOB TECHNOLOGIES, nous déployons des bornes Wi-Fi professionnelles haute densité (Cisco Meraki, HPE Aruba, Ubiquiti UniFi) avec :\n• Couverture intégrale sans zone blanche (roaming fluide d'une pièce à l'autre).\n• Séparation étanche entre réseau salarié et réseau invité.\n• Limitation de bande passante pour empêcher les téléchargements abusifs.\n\nCombien d'utilisateurs ou de mètres carrés avez-vous environ ?";
  }

  // 14. Vente de matériel (serveurs, pc, switch, routeur, baies)
  if (/(vendez|vente|acheter|achat|fourniture|mat[eé]riel|pc|serveur|dell|switch|routeur|baie|onduleur|armoire)/i.test(q) || (isOneWord && ["serveur", "switch", "routeur", "dell"].includes(words[0]))) {
    return "Oui, tout à fait ! Nous fournissons du matériel informatique d'entreprise garanti constructeur 🖥️ :\n\n• **Serveurs physiques** : Dell Technologies PowerEdge (tours et racks) configurés sur-mesure.\n• **Commutateurs & Routeurs** : Cisco Catalyst, HPE Aruba.\n• **Baies & Câblage** : Baies de brassage 19\" (12U à 42U), bandeaux, onduleurs APC/Eaton, jarretières optiques.\n• **Postes de travail** : PC professionnels et écrans pour équipes tertiaires.\n\nVous avez une référence précise en tête ou souhaitez-vous un conseil de dimensionnement ?";
  }

  // 15. Formations (Catalogue réaliste & intensif)
  if (/(formation|certif|cours|apprendre|apprenant|ccna|fortinet|nse|sophos|phishing|ethical|hacking|nist|iso 27001|gestion de projet|initiation)/i.test(q) || (isOneWord && ["formation", "certif", "ccna"].includes(words[0]))) {
    return "Nos formations sont axées sur la pratique réelle et la préparation aux certifications internationales 🎓 :\n\n" +
      "1. **Initiation à la cybersécurité** (4 sem.) : hygiène numérique et sécurisation des postes.\n" +
      "2. **Sensibilisation au phishing** (2 sem.) : simulations et cas concrets anti-fraude.\n" +
      "3. **Initiation à l'IA** (4 sem.) : prompt engineering, IA générative et automatisation.\n" +
      "4. **Préparation Fortinet NSE 4 / FCP** (8 sem.) : maîtrise complète des pare-feux FortiGate.\n" +
      "5. **Initiation Sophos** (4 sem.) : pare-feux XGS et protection endpoint Intercept X.\n" +
      "6. **Initiation Microsoft 365** (4 sem.) : gestion de tenant, Teams, Exchange et Entra ID.\n" +
      "7. **Cisco CCNA 200-301** (10 sem.) : routage, switching et labs pratiques.\n" +
      "8. **Gestion de projet IT** (4 sem.) : méthodes Agiles, Scrum et gouvernance.\n" +
      "9. **Normes & Conformité** (6 sem.) : ISO 27001, NIST CSF 2.0, CDP Sénégal.\n" +
      "10. **Ethical Hacking & Pentest** (8 sem.) : tests d'intrusion éthiques et labs CTF.\n\n" +
      "Les cours se déroulent en présentiel à Dakar ou à distance, avec formules en soirée ou le samedi. C'est pour vous-même ou pour former votre équipe ?";
  }

  // 16. ERP & Logiciels de gestion (Sur-mesure, Odoo, Dolibarr)
  if (/(erp|odoo|dolibarr|logiciel de gestion|factur|stock|comptabilit[eé]|crm|rh|devis)/i.test(q) || (isOneWord && ["erp", "odoo", "dolibarr"].includes(words[0]))) {
    return "Pour digitaliser la gestion de votre activité, nous avons deux approches complémentaires 💼 :\n\n" +
      "1. **ERP 100% Sur-Mesure** : Nous codons votre outil de gestion sur-mesure si vos processus métiers sont uniques et ne rentrent pas dans les cases standard.\n" +
      "2. **Intégration Odoo & Dolibarr** : Déploiement et paramétrage complet (devis, facturation conforme, gestion des stocks, achats, CRM et RH).\n\n" +
      "Nous assurons également l'hébergement sécurisé, la migration de vos anciens fichiers Excel et la formation de votre personnel. Quelle est votre activité ?";
  }

  // 17. Développement Web & Mobile, Plateformes
  if (/(site web|site internet|site|application|mobile|flutter|d[eé]velopp|vitrine|e-commerce|boutique)/i.test(q)) {
    return "Nous concevons des sites web et applications mobiles (iOS/Android) ultra-performants, modernes et sécurisés 💻📱 !\n\nNous avons par exemple réalisé la plateforme officielle de l'Hôtel du Parc (Parc Exotique du Sénégal à Somone) avec module de réservation en ligne rapide et optimisé mobile.\n\nQuel type de site ou d'application souhaitez-vous lancer ?";
  }

  // 18. Cybersécurité, Pare-feu, Sécurité informatique
  if (/(cyber|s[eé]curit[eé]|firewall|pare-?feu|antivirus|ransomware|sophos|fortinet|acronis|wallix|kaspersky|ddos)/i.test(q) || (isOneWord && ["cyber", "firewall", "sophos", "fortinet", "securite"].includes(words[0]))) {
    return "La cybersécurité, c'est notre spécialité numéro une ! 🛡️\n\n• **Pare-feux Next-Gen** : Sophos XGS et Fortinet FortiGate (filtrage web, VPN sécurisé, anti-intrusion).\n• **Sauvegardes anti-ransomware** : Acronis Cyber Protect (sauvegarde cloud immuable).\n• **Gestion des accès (PAM)** : Wallix Bastion pour verrouiller les comptes administrateurs.\n• **Audit & Tests de pénétration** : diagnostic complet de vos vulnérabilités.\n\nVous souhaitez auditer votre sécurité existante ou protéger un nouveau réseau ?";
  }

  // 19. Réseau & Câblage structuré
  if (/(r[eé]seau|c[aâ]blage|baie|brassage|fibre optique|cat 6|switch|cisco|aruba)/i.test(q) || (isOneWord && ["reseau", "cablage", "baie", "cisco"].includes(words[0]))) {
    return "Pour vos réseaux d'entreprise, nous réalisons des installations physiques aux normes internationales 🌐 :\n\n• Pose et certification de câblage cuivre Cat 6A / 7 et rocade fibre optique.\n• Montage et peignage de baies de brassage 42U (notamment notre réalisation pour le bureau de l'Union Européenne à Dakar).\n• Commutation d'entreprise Cisco Catalyst et HPE Aruba.\n• Recette technique avec testeur de certification Fluke Networks.\n\nCombien de prises réseau ou de bureaux devez-vous équiper ?";
  }

  // 20. Clients & Réalisations ("Ils nous font confiance", Références)
  if (/(client|confiance|r[eé]f[eé]rence|projet|r[eé]alisation|polyclinique|p2a|dolima|simplon|parc exotique|union europ[eé]enne|ue)/i.test(q) || (isOneWord && ["references", "clients"].includes(words[0]))) {
    return "De grandes institutions et entreprises nous font confiance au Sénégal 🏆 :\n\n" +
      "1. **Délégation de l'Union Européenne à Dakar** : Câblage réseau structuré blindé Cat 6A et baies 42U.\n" +
      "2. **Hôtel du Parc Exotique du Sénégal** : Plateforme web officielle de réservation et ERP d'établissement.\n" +
      "3. **Polyclinique P2A (Dakar)** : Baies réseau, serveurs virtualisés VMware, téléphonie Yeastar et pare-feu FortiGate.\n" +
      "4. **Dolima (Laiterie du Berger)** : Infrastructure réseau d'entreprise et connectivité industrielle.\n" +
      "5. **Simplon Sénégal** : Formation pratique des apprenants aux infrastructures et à la cybersécurité.\n\n" +
      "Vous pouvez explorer toutes nos photos d'installations sur notre page [Réalisations](/realisations) !";
  }

  // 21. Remerciements et satisfaction
  if (/^(merci|super|parfait|nickel|top|merci beaucoup|c['\s]?est not[eé]|d['\s]?accord|ok|tres bien)[.!?\s]*$/i.test(q)) {
    return "C'est un vrai plaisir de vous aider ! 😊 N'hésitez surtout pas si vous avez d'autres questions. Vous pouvez aussi nous contacter à tout moment au **+221 77 301 08 38** ou demander un devis en 1 clic. Belle journée à vous ! ✨";
  }

  // 22. Question "Pourquoi ?"
  if (isOneWord && words[0] === "pourquoi") {
    return "Pourquoi choisir NOB TECHNOLOGIES ? Parce que nous allions la réactivité locale à Dakar et l'exigence des standards internationaux ! 🚀\n\n• Des ingénieurs certifiés sur le terrain (Cisco, Fortinet, Sophos).\n• Des références majeures qui attestent de notre sérieux (Union Européenne, Dolima, Polyclinique P2A).\n• Des solutions pérennes et durables, avec support technique disponible.\n\nQue cherchez-vous à améliorer dans votre entreprise ?";
  }

  // 23. Réponse générale naturelle & conversationnelle (Attentive, chaleureuse et humaine)
  return "Je vous écoute ! Chez NOB TECHNOLOGIES, nous accompagnons les entreprises et professionnels dans quatre grands domaines :\n\n" +
    "• 🛡️ **Cybersécurité & Pare-feux** (Sophos, Fortinet, sauvegardes anti-ransomware Acronis)\n" +
    "• 🌐 **Réseaux, Wi-Fi & Câblage** (baies de brassage, fibre, commutateurs Cisco)\n" +
    "• 💼 **ERP & Digitalisation** (logiciels sur-mesure, Odoo, Dolibarr, sites web)\n" +
    "• 🎓 **Formations certifiantes** (Cybersécurité, Phishing, Fortinet NSE 4, Cisco CCNA, IA)\n\n" +
    "Dites-moi simplement en quelques mots ce que vous aimeriez réaliser ou le problème que vous rencontrez, et je vous orienterai avec grand plaisir ! Vous pouvez aussi joindre directement un de nos ingénieurs au +221 77 301 08 38.";
}

// Handler for the /api/chat route
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message invalide" }, { status: 400 });
    }

    // Provider 1: Google Gemini (Free Tier / Official API) if GEMINI_API_KEY is configured
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              systemInstruction: {
                parts: [{ text: SYSTEM_PROMPT }],
              },
              contents: [
                ...(Array.isArray(history)
                  ? history.map((m: any) => ({
                      role: m.role === "bot" ? "model" : "user",
                      parts: [{ text: m.text }],
                    }))
                  : []),
                { role: "user", parts: [{ text: message }] },
              ],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 600,
              },
            }),
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const replyText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            return NextResponse.json({ reply: replyText, model: "gemini-2.5-flash" });
          }
        }
      } catch {
        // Fallback gracefully
      }
    }

    // Provider 2: Ollama Local (100% free open-source on premise)
    const ollamaUrl = process.env.OLLAMA_BASE_URL;
    if (ollamaUrl) {
      try {
        const ollamaRes = await fetch(`${ollamaUrl}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: process.env.OLLAMA_MODEL || "llama3",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...(Array.isArray(history)
                ? history.map((m: any) => ({
                    role: m.role === "bot" ? "assistant" : "user",
                    content: m.text,
                  }))
                : []),
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
      } catch {
        // Fallback gracefully
      }
    }

    // Provider 3: Groq / OpenRouter / HuggingFace
    const openSourceKey =
      process.env.OPENSOURCE_AI_API_KEY ||
      process.env.GROQ_API_KEY ||
      process.env.OPENROUTER_API_KEY ||
      process.env.HF_TOKEN;

    if (openSourceKey) {
      try {
        const endpoint = process.env.GROQ_API_KEY
          ? "https://api.groq.com/openai/v1/chat/completions"
          : "https://openrouter.ai/api/v1/chat/completions";

        const model = process.env.GROQ_API_KEY
          ? "llama-3.3-70b-versatile"
          : process.env.OPENSOURCE_MODEL || "meta-llama/llama-3.2-3b-instruct:free";

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openSourceKey}`,
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...(Array.isArray(history)
                ? history.map((m: any) => ({
                    role: m.role === "bot" ? "assistant" : "user",
                    content: m.text,
                  }))
                : []),
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
      } catch {
        // Fallback gracefully
      }
    }

    // Provider 4: Built-in Human Conversational Intelligence (100% reliable, zero license fee, immediate)
    const naturalReply = generateNaturalResponse(message, history);
    return NextResponse.json({ reply: naturalReply, model: "natural-human-engine" });
  } catch {
    return NextResponse.json(
      {
        error: "Une erreur est survenue",
        reply:
          "Je suis temporairement indisponible. Vous pouvez nous contacter directement au +221 77 301 08 38 ou par email à contact@nobtech.fr.",
      },
      { status: 500 }
    );
  }
}
