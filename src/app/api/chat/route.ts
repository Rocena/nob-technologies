import { NextRequest, NextResponse } from "next/server";

interface ChatMessage {
  role: "user" | "bot" | "assistant" | "system";
  text: string;
}

// System prompt grounding any AI assistant on NOBTECH
const SYSTEM_PROMPT = `Tu t'appelles Koffi. Tu es le conseiller virtuel officiel et chaleureux de NOBTECH (nobtech.fr), entreprise sénégalaise et ouest-africaine de référence en solutions informatiques, réseaux et cybersécurité à Dakar.

Ton identité & ton style :
- Tu t'appelles Koffi. Présente-toi sous le nom de Koffi dès que l'utilisateur te salue ou te demande qui tu es.
- L'entreprise s'appelle NOBTECH.
- Tu parles comme un humain chaleureux, dynamique, bienveillant, poli, compétent et très naturel. Tu es comme un collègue ingénieur commercial sympa et attentif.
- Ne parle JAMAIS comme un robot ou un serveur vocal rigide. Pas de phrases bureaucratiques ou répétitives.
- Écoute activement l'utilisateur et adapte ta réponse au contexte précis de sa demande.
- Si l'utilisateur demande un devis ou souhaite « remplir un devis », NE LUI RENVOIE JAMAIS un message générique en boucle ! Donne-lui des choix clairs et concrets :
  1. Le lien direct vers notre formulaire en ligne : [Remplir le formulaire de devis](/contact)
  2. L'option de te décrire son besoin directement ici (type de projet, nombre de postes, locaux) pour un pré-cadrage immédiat.
  3. L'option d'en parler en direct avec un ingénieur sur WhatsApp (+221 77 301 08 38).
- Si l'utilisateur pose une question hors du cadre (humour, météo, pizza, blague...), réponds avec le sourire et un brin d'esprit, puis réoriente gentiment vers l'informatique.
- Si l'utilisateur salue en Wolof (« nanga def », « salaam »), réponds chaleureusement en intégrant des formules locales amicales (« Mangi fi rekk », « Wa aleikoum salam »).
- Si l'utilisateur demande de pirater un compte privé (Instagram, WhatsApp...), refuse fermement mais poliment en rappelant que NOBTECH fait uniquement de la cybersécurité défensive et éthique, mais propose de l'aider si son compte ou son entreprise subit une attaque.
- Si l'utilisateur est dans l'urgence ou en panne, sois réactif et donne immédiatement le numéro d'astreinte : +221 77 301 08 38.

Coordonnées officielles de NOBTECH :
- Création & Historique : Société d'ingénierie créée en 2020 à Dakar (6 ans d'expérience terrain).
- Fondateur : Ozias B. Nzongo, plus de 15 ans d'expérience métier terrain en réseaux, télécoms et cybersécurité.
- Satisfaction client : 100% de clients satisfaits.
- Siège : Route de l’Aéroport LSS lot N° 79, Dakar, Sénégal (repère Google Maps : QG3J+HP Dakar).
- Téléphone & WhatsApp : +221 77 301 08 38 / Fixe : +221 33 814 04 35
- Email officiel : contact@nobtech.fr
- Devis : 100% gratuits sous 24h ouvrées.

Pôles d'expertise clés :
1. Cybersécurité : Pare-feux Sophos XGS, Fortinet FortiGate, sauvegardes anti-ransomware Acronis, gestion PAM Wallix, tests d'intrusion (pentest).
2. Réseaux & Câblage : Câblage Cat 6A/7, baies de brassage 42U certifiées Fluke (ex: déploiement pour la Délégation de l'Union Européenne à Dakar), switchs Cisco, Wi-Fi d'entreprise.
3. ERP & Digitalisation : ERP 100% sur-mesure développés de bout en bout, et intégration des solutions Odoo et Dolibarr (stocks, facturation, CRM, comptabilité).
4. Web, Mobile & Réseaux Sociaux : Plateformes web performantes (ex: plateforme officielle de l'Hôtel du Parc / Parc Exotique du Sénégal), applications mobiles Flutter, gestion active de réseaux sociaux (Instagram & Facebook pour l'Hôtel du Parc).
5. Vente de Matériel & Licences : Serveurs d'entreprise Dell PowerEdge, switchs Cisco, licences officielles Microsoft 365.
6. Formations & Certifications : Cybersécurité Fondamentale avec Certificat International Cisco (test officiel sanctionné par Cisco), Microsoft Power BI & Business Intelligence, Fortinet NSE 4, Sophos, Microsoft 365, Cisco CCNA, Gestion de projet, ISO 27001/NIST, Ethical Hacking.`;

// Natural conversational human response generator (works 100% offline & without third-party API keys)
function generateNaturalResponse(userMessage: string, history: ChatMessage[] = []): string {
  const raw = userMessage.trim();
  const q = raw.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // strip accents
  const words = q.split(/[\s,.'?!;:()\-_\/]+/).filter((w) => w.length > 0);
  const isOneWord = words.length <= 1;

  // 1. Wolof & Salutations sénégalaises
  if (/^(nanga def|salaam|assalam|salam|mangi fi|ba beneen|na rekk|jerejef)/i.test(q)) {
    if (/nanga def/i.test(q)) {
      return "Mangi fi rekk, alhamdoulilah ! 👋 Je m'appelle Koffi, votre conseiller chez NOBTECH. Comment allez-vous ? Dites-moi comment je peux vous être utile pour vos projets informatiques ou réseau !";
    }
    if (/salaam|assalam|salam/i.test(q)) {
      return "Wa aleikoum salam ! 🙏 Bienvenue chez NOBTECH à Dakar. Je m'appelle Koffi, comment puis-je vous accompagner aujourd'hui ?";
    }
    if (/jerejef/i.test(q)) {
      return "Amul solo ! C'est un réel plaisir d'échanger avec vous. N'hésitez surtout pas si vous avez d'autres questions ! ✨";
    }
    return "Bienvenue chez NOBTECH à Dakar ! Je m'appelle Koffi, comment pouvons-nous vous aider aujourd'hui ?";
  }

  // 2. Salutations informelles ou classiques
  if (/^(bonjour|salut|bonsoir|hello|coucou|yo|bjr|salutations|hi|hey|rebonjour)[.!?\s]*$/i.test(q)) {
    const isEvening = new Date().getHours() >= 18;
    const greetingWord = isEvening ? "Bonsoir" : "Bonjour";
    const greetings = [
      `${greetingWord} ! Je m'appelle **Koffi**, ravi de vous accueillir chez **NOBTECH** 👋 Comment se passe votre journée ? Que puis-je faire pour vous aujourd'hui ?`,
      `${greetingWord} ! C'est un plaisir d'échanger avec vous, je suis **Koffi** de **NOBTECH**. Que vous ayez un besoin en cybersécurité, réseau, ERP ou formation, dites-moi tout, je suis là pour vous aider !`,
      `${greetingWord} et bienvenue chez **NOBTECH** ! Je suis **Koffi**, votre conseiller. Dites-moi tout : comment puis-je vous renseigner aujourd'hui ?`,
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  // 3. Question "T'es qui ?", "Qui es-tu ?", "Comment tu t'appelles ?"
  if (
    /(t['\s]?es qui|qui es-?tu|qui [eê]tes-?vous|c['\s]?est qui|es-?tu (une |un )?ia|tu es un robot|qui parle|comment tu t['\s]?appelles|ton nom|pr[eé]sente-?toi|pr[eé]sentez-?vous)/i.test(q) ||
    (isOneWord && words[0] === "qui")
  ) {
    return "Je m'appelle **Koffi**, conseiller digital chez **NOBTECH** ! 😊\n\nMon rôle, c'est de vous renseigner 24h/24 avec le sourire comme un vrai collègue au bureau : vous conseiller sur la cybersécurité, les réseaux d'entreprise, les baies 42U, les ERP et les formations certifiantes, et vous mettre en relation directe avec nos ingénieurs à Dakar.\n\nEt vous, quel projet ou besoin vous amène aujourd'hui ?";
  }

  // 4. Questions "Hors du cadre" (Humour, nourriture, vie perso, blagues, météo)
  if (/(pizza|manger|nourriture|caf[eé]|burger|plat|faim|livr)/i.test(q) && !/site|application|logiciel|erp/i.test(q)) {
    return "Haha, pas du tout ! 😄 Notre truc à nous chez **NOBTECH**, c'est plutôt les pare-feux, les baies de brassage et les lignes de code que la cuisine !\n\nPar contre, si vous gérez un restaurant ou un commerce et voulez créer son site web, déployer un Wi-Fi sécurisé ou gérer vos stocks avec un ERP, là on est les spécialistes ! Que cherchiez-vous à faire ?";
  }

  if (/(blague|raconte|humour|marrant|fais moi rire)/i.test(q)) {
    return "Avec plaisir ! 😄 Pourquoi les administrateurs réseaux et les développeurs détestent-ils la nature ?\n\n... Parce qu'il y a beaucoup trop de bugs et aucun bouton Ctrl+Z ! 🐛💻\n\nPlus sérieusement, comment se porte votre système informatique aujourd'hui ?";
  }

  if (/(m[eé]t[eé]o|quel temps|politique|pr[eé]sident|football|match)/i.test(q)) {
    return "Je préfère laisser la météo et le sport aux experts ! ☀️ Chez **NOBTECH**, ma spécialité c'est de veiller à ce que vos serveurs tournent à plein régime et que votre entreprise soit impénétrable face aux cyberattaques. Avez-vous un projet IT en tête ?";
  }

  // 5. Demande de piratage illégal
  if (/(pirat|hack)/i.test(q) && /(compte|instagram|facebook|whatsapp|snap|mot de passe|espion|t[eé]l[eé]phone|copine|mari)/i.test(q)) {
    return "Ah non, absolument pas ! 🚫 Chez **NOBTECH**, nous pratiquons exclusivement la cybersécurité éthique et légale. Nous aidons les entreprises et professionnels à se défendre contre les attaques, à auditer leurs systèmes et à former leurs équipes.\n\nEn revanche, si l'un de vos comptes ou le réseau de votre entreprise a été compromis ou piraté, nous pouvons intervenir pour sécuriser vos accès, nettoyer vos machines et restaurer vos données !";
  }

  // 6. Urgence, Panne critique, SOS
  if (/(urgence|en urgence|urgent|bloqu[eé]|sos|a l['\s]aide|help)/i.test(q) || (isOneWord && ["urgent", "sos", "allo", "aide"].includes(words[0]))) {
    return "Je suis là ! Dites-moi tout : quelle est l'urgence ? 🚨\n\n• Si vous subissez une panne bloquante, une coupure totale de réseau ou une cyberattaque suspecte, le plus rapide est d'appeler directement nos ingénieurs d'astreinte au **+221 77 301 08 38**.\n\nSinon, décrivez-moi brièvement le problème ici pour que je vous oriente tout de suite !";
  }

  // 7. Panne PC / Informatique
  if (/(mon pc|mon ordi|mon ordinateur|machine|en panne|ne d[eé]marre|d[eé]marre plus|ecran bleu|lent|rame|virus|infect[eé])/i.test(q)) {
    return "Aïe, c'est toujours frustrant quand le matériel fait des siennes ! 💻\n\nQuel est le symptôme exact ?\n• L'appareil refuse de s'allumer ?\n• Écran bleu ou redémarrages en boucle ?\n• Lenteur anormale ou messages bizarres (possible virus/ransomware) ?\n\nChez **NOBTECH**, nous gérons principalement les parcs informatiques complets d'entreprises, serveurs et réseaux. Expliquez-moi votre situation ou appelez notre support au **+221 77 301 08 38** pour voir comment nous pouvons vous débloquer !";
  }

  // 8. Stage, Emploi, Recrutement
  if (/(stage|recrutement|emploi|embauche|cv|job|candidat|postuler|travailler chez vous|rejoindre)/i.test(q) || (isOneWord && ["stage", "recrutement", "emploi", "cv", "job"].includes(words[0]))) {
    return "Vous souhaitez rejoindre l'équipe **NOBTECH** ? C'est une excellente idée ! 💼\n\nNous accueillons régulièrement des stagiaires et talents motivés en réseaux, cybersécurité, développement d'applications et administration système.\n\n👉 Envoyez simplement votre CV et une courte lettre de motivation à **contact@nobtech.fr** en précisant en objet « Candidature Stage » ou « Candidature Emploi ». Notre équipe RH vous répondra avec attention !";
  }

  // 9. Horaires & Disponibilité
  if (/(samedi|dimanche|week-?end|horaire|ouvert|heure|fermeture|quand venez-vous)/i.test(q)) {
    return "Voici nos créneaux d'ouverture ⏰ :\n\n• **Lundi au Vendredi** : 8h30 à 18h00 (accueil physique et interventions courantes).\n• **Samedi** : sessions de formation certifiante et ateliers pratiques.\n• **Astreinte 24h/24 & 7j/7** : pour nos clients sous contrat d'infogérance et de maintenance critique.\n\nVous avez besoin d'une intervention planifiée ou urgente ce week-end ?";
  }

  // 10. WhatsApp & Téléphone direct
  if (/(whatsapp|t[eé]l[eé]phone|num[eé]ro|appeler|joindre|direct|m['\s]appeler)/i.test(q)) {
    return "Vous pouvez nous joindre directement très facilement 📲 :\n\n• **WhatsApp & Mobile direct** : [Discuter sur WhatsApp (+221 77 301 08 38)](https://wa.me/221773010838?text=Bonjour%20Koffi,%20je%20souhaite%20obtenir%20des%20informations) (réponse très rapide par nos ingénieurs)\n• **Standard fixe** : +221 33 814 04 35\n• **Email** : contact@nobtech.fr\n\nN'hésitez pas à nous envoyer un message vocal ou texte sur WhatsApp, nous sommes très réactifs !";
  }

  // 11. Localisation : Dakar
  if (/(adresse|o[uù] [eê]tes|o[uù] se trouve|localisation|localiser|situer|si[eè]ge|venir vous voir|passer vous voir)/i.test(q) || (isOneWord && words[0] === "dakar")) {
    return "Nous sommes basés à Dakar ! 📍\n\n• **Adresse exacte** : Route de l’Aéroport LSS, lot N° 79, Dakar, Sénégal (repère Google Maps : **QG3J+HP Dakar**).\n• **Rayon d'action** : Tout Dakar (Plateau, Almadies, Zone Industrielle, etc.), les autres régions du Sénégal (Thiès, Mbour/Saly, Saint-Louis...) et dans la sous-région ouest-africaine.\n\nVous souhaitez planifier un rendez-vous à nos bureaux ou qu'un ingénieur passe dans vos locaux ?";
  }

  // 12. Délais d'intervention
  if (/(d[eé]lai|en combien de temps|quand pouvez|rapidit[eé]|planning)/i.test(q)) {
    return "Nos délais d'intervention sont conçus pour garantir la continuité de votre entreprise ⏱️ :\n\n• **Devis & cadrage technique** : sous 24h ouvrées, gratuit et sans engagement.\n• **Urgences critiques & pannes** : intervention sous 1h à 2h à Dakar via notre astreinte au **+221 77 301 08 38**.\n• **Projets structurants (câblage, baies 42U, pare-feu)** : démarrage sous 48h à 72h selon vos disponibilités.\n\nAvez-vous une date limite précise pour votre projet ?";
  }

  // 13. Moyens de paiement
  if (/(moyen de paiement|mode de paiement|comment payer|virement|cheque|orange money|wave|facture)/i.test(q)) {
    return "Pour faciliter la gestion comptable de nos clients, **NOBTECH** propose plusieurs modes de paiement transparents 💳 :\n\n• **Virement bancaire professionnel** (avec facture proforma et facture normalisée conforme)\n• **Chèque d'entreprise**\n• **Paiements mobiles professionnels** : Wave et Orange Money pour les interventions rapides et acomptes.\n\nToutes nos prestations font l'objet d'un contrat ou bon de commande officiel.";
  }

  // 14. Demande de lien direct vers le formulaire devis
  if (/(ouvrir le formulaire|formulaire devis|lien devis|page devis|formulaire de contact|formulaire)/i.test(q)) {
    return "Voici l'accès direct vers notre formulaire officiel de demande de devis :\n\n👉 [Accéder au formulaire de devis en ligne](/contact)\n\nPrenez une petite minute pour nous renseigner vos coordonnées et décrire votre projet. Nos ingénieurs analysent votre cahier des charges et vous répondent sous **24h ouvrées** avec une proposition claire et détaillée.\n\nJe reste là si vous avez une question en attendant ! 😊";
  }

  // 15. Devis spécifique Cybersécurité & Pare-feu
  if (/(cyber|s[eé]curit[eé]|firewall|pare-?feu|ransomware)/i.test(q) && /(devis|prix|tarif|combien|chiffr|cout|budget)/i.test(q)) {
    return "C'est bien noté pour votre projet de cybersécurité ! 🛡️ Chez **NOBTECH**, nous protégeons les réseaux et données des entreprises avec les pare-feux Sophos XGS et Fortinet FortiGate, et des sauvegardes anti-ransomware Acronis.\n\nPour vous chiffrer la solution adéquate :\n1. Combien de postes de travail, serveurs ou utilisateurs avez-vous environ à sécuriser ?\n2. S'agit-il d'équiper un nouveau réseau ou de remplacer un équipement existant ?\n\nVous pouvez me donner ces détails ici, ou les consigner dans notre [formulaire de devis](/contact) ou par [WhatsApp direct (+221 77 301 08 38)](https://wa.me/221773010838?text=Bonjour%20Koffi,%20je%20souhaite%20un%20devis%20cyber) !";
  }

  // 16. Devis spécifique Réseau & Câblage
  if (/(r[eé]seau|c[aâ]blage|baie|brassage|fibre|wifi)/i.test(q) && /(devis|prix|tarif|combien|chiffr|cout|budget)/i.test(q)) {
    return "Excellente démarche ! Une infrastructure réseau bien dimensionnée est essentielle pour la productivité de vos équipes. 🌐\n\nChez **NOBTECH**, nous assurons le câblage Cat 6A/7 certifié Fluke, l'aménagement de baies 42U et le Wi-Fi haute densité.\n\nPour calibrer le devis :\n1. S'agit-il de nouveaux bureaux ou de la rénovation d'un réseau existant ?\n2. Combien de prises RJ45 ou de pièces devez-vous raccorder ?\n\nDécrivez-moi vos locaux ici, ou partagez vos plans sur notre [formulaire de devis](/contact) ou sur [WhatsApp (+221 77 301 08 38)](https://wa.me/221773010838) !";
  }

  // 17. Devis spécifique ERP & Logiciel de gestion
  if (/(erp|odoo|dolibarr|logiciel|gestion|facturation)/i.test(q) && /(devis|prix|tarif|combien|chiffr|cout|budget)/i.test(q)) {
    return "Très bon réflexe ! La digitalisation de vos processus permet un gain de temps et un contrôle financier immédiats. 💼\n\n**NOBTECH** conçoit des ERP 100% sur-mesure et déploie les solutions de référence Odoo et Dolibarr (ventes, facturation conforme, stocks, achats, RH).\n\nPour préparer votre chiffrage :\n• Quels sont les 2 ou 3 modules essentiels pour votre activité ?\n• Combien de collaborateurs utiliseront l'outil au quotidien ?\n\nVous pouvez me l'indiquer ici ou remplir notre [formulaire de devis](/contact) !";
  }

  // 18. Spécifications de postes fournies par l'utilisateur (ex: "20 postes", "moins de 20 postes", etc.)
  if (/(moins de \d+|entre \d+ et \d+|plus de \d+|\d+\s*(postes|ordinateurs|pc|utilisateurs|salari[eé]s|employ[eé]s))/i.test(q)) {
    return "C'est bien noté pour ce volume ! Pour un parc de cette envergure, nous recommandons généralement un dimensionnement robuste et évolutif (pare-feu adapté nouvelle génération, commutation Gigabit manageable et plan de sauvegarde quotidien immuable).\n\nPour recevoir votre proposition chiffrée détaillée sous 24h ouvrées :\n👉 [Remplissez rapidement notre formulaire de devis](/contact)\n📲 Ou écrivez-nous sur [WhatsApp au +221 77 301 08 38](https://wa.me/221773010838?text=Bonjour%20Koffi,%20j'ai%20un%20projet%20pour%20ce%20volume%20de%20postes) avec ces détails !";
  }

  // 19. Nouveaux locaux à câbler
  if (/(nouveau|nouveaux|nouvelle)\s*(locaux|bureau|bureaux|batiment|immeuble|siege)/i.test(q)) {
    return "Félicitations pour vos nouveaux locaux ! 🎉 C'est le moment parfait pour installer un câblage certifié Cat 6A et une baie de brassage propre avant l'arrivée des équipes.\n\nNos ingénieurs se déplacent gratuitement à Dakar pour visiter votre site, effectuer le relevé technique et vous transmettre un devis détaillé sous 24h.\n\nSouhaitez-vous planifier une visite sur place ou échanger par téléphone au **+221 77 301 08 38** ?";
  }

  // 20. Demande générale de devis / "remplir un devis" / "demander un devis" / "prix"
  if (/(remplir un devis|demander un devis|faire un devis|obtenir un devis|devis gratuit|devis|c['\s]?est cher|combien [cç]a co[uû]te|prix|tarif|co[uû]t|budget|chiffrer)/i.test(q) || (isOneWord && ["prix", "devis", "tarif", "combien"].includes(words[0]))) {
    return "Avec grand plaisir ! Chez **NOBTECH**, nos devis sont **100% gratuits, sur-mesure et transmis sous 24h ouvrées** sans aucun engagement. 📋\n\nPour avancer au plus vite, vous avez **3 options très simples** :\n\n1️⃣ **Remplir notre formulaire guidé en 1 minute** :\n👉 [Cliquez ici pour ouvrir le formulaire de devis en ligne](/contact)\n\n2️⃣ **M'en dire deux mots directement ici** :\nDites-moi simplement : de quel type de projet s'agit-il (cybersécurité & pare-feu, câblage réseau, ERP, matériel, formation) et quel est le volume concerné ? Je note tout pour nos ingénieurs !\n\n3️⃣ **Échanger directement sur WhatsApp** avec notre équipe technique :\n📲 [Discuter sur WhatsApp (+221 77 301 08 38)](https://wa.me/221773010838?text=Bonjour%20Koffi,%20je%20souhaite%20obtenir%20un%20devis)\n\nQuel domaine vous intéresse en priorité ?";
  }

  // 21. Wi-Fi & Problèmes réseau local
  if (/(wi-?fi|wifi|borne wifi|sans fil|roaming)/i.test(q) || (isOneWord && words[0] === "wifi")) {
    return "Un Wi-Fi qui rame ou qui coupe en pleine réunion, c'est le cauchemar de toute entreprise ! 📶\n\nChez **NOBTECH**, nous déployons des bornes Wi-Fi professionnelles haute densité (Cisco Meraki, HPE Aruba, Ubiquiti UniFi) avec :\n• Couverture intégrale sans zone blanche (roaming fluide d'une pièce à l'autre).\n• Séparation étanche entre réseau salarié et réseau invité.\n• Limitation de bande passante pour empêcher les téléchargements abusifs.\n\nCombien d'utilisateurs ou de mètres carrés avez-vous environ ?";
  }

  // 22. Vente de matériel
  if (/(vendez|vente|acheter|achat|fourniture|mat[eé]riel|pc|serveur|dell|switch|routeur|baie|onduleur|armoire)/i.test(q) || (isOneWord && ["serveur", "switch", "routeur", "dell"].includes(words[0]))) {
    return "Oui, tout à fait ! Nous fournissons du matériel informatique d'entreprise garanti constructeur 🖥️ :\n\n• **Serveurs physiques** : Dell Technologies PowerEdge (tours et racks) configurés sur-mesure.\n• **Commutateurs & Routeurs** : Cisco Catalyst, HPE Aruba.\n• **Baies & Câblage** : Baies de brassage 19\" (12U à 42U), bandeaux, onduleurs APC/Eaton, jarretières optiques.\n• **Postes de travail** : PC professionnels et écrans pour équipes tertiaires.\n\nVous avez une référence précise en tête ou souhaitez-vous un conseil de dimensionnement ?";
  }

  // 23. Formations
  if (/(formation|certif|cours|apprendre|apprenant|ccna|fortinet|nse|sophos|phishing|ethical|hacking|nist|iso 27001|gestion de projet|initiation|power bi|cisco)/i.test(q) || (isOneWord && ["formation", "certif", "ccna"].includes(words[0]))) {
    return "Nos formations chez **NOBTECH** sont axées sur la pratique réelle et la préparation aux certifications internationales 🎓 :\n\n" +
      "1. **Cybersécurité Fondamentale & Certificat International Cisco** (4 sem.) : Test officiel sanctionné par le Certificat International Cisco en cybersécurité.\n" +
      "2. **Microsoft Power BI & Business Intelligence** (4 sem.) : Ingestion multi-sources (Excel, SQL, ERP), modélisation DAX et dashboards décisionnels interactifs.\n" +
      "3. **Sensibilisation au phishing** (2 sem.) : simulations et cas concrets anti-fraude.\n" +
      "4. **Initiation à l'IA** (4 sem.) : prompt engineering, IA générative et automatisation.\n" +
      "5. **Préparation Fortinet NSE 4 / FCP** (8 sem.) : maîtrise complète des pare-feux FortiGate.\n" +
      "6. **Initiation Sophos** (4 sem.) : pare-feux XGS et protection endpoint Intercept X.\n" +
      "7. **Initiation Microsoft 365** (4 sem.) : gestion de tenant, Teams, Exchange et Entra ID.\n" +
      "8. **Cisco CCNA 200-301** (10 sem.) : routage, switching et labs pratiques.\n" +
      "9. **Gestion de projet IT** (4 sem.) : méthodes Agiles, Scrum et gouvernance.\n" +
      "10. **Normes & Conformité** (6 sem.) : ISO 27001, NIST CSF 2.0, CDP Sénégal.\n" +
      "11. **Ethical Hacking & Pentest** (8 sem.) : tests d'intrusion éthiques et labs CTF.\n\n" +
      "Les cours se déroulent en présentiel dans nos Labs à Dakar ou à distance, avec formules du soir ou du samedi. C'est pour vous-même ou pour votre équipe ?";
  }

  // 24. ERP & Logiciels de gestion
  if (/(erp|odoo|dolibarr|logiciel de gestion|factur|stock|comptabilit[eé]|crm|rh)/i.test(q) || (isOneWord && ["erp", "odoo", "dolibarr"].includes(words[0]))) {
    return "Pour digitaliser la gestion de votre activité, **NOBTECH** propose deux approches éprouvées 💼 :\n\n" +
      "1. **ERP 100% Sur-Mesure** : Nous codons votre outil selon vos processus métiers spécifiques.\n" +
      "2. **Intégration Odoo & Dolibarr** : Déploiement et paramétrage complet (devis, facturation conforme, stocks, achats, CRM et RH).\n\n" +
      "Nous assurons également l'hébergement sécurisé, la migration de vos anciens fichiers Excel et la formation de vos collaborateurs. Quelle est votre activité ?";
  }

  // 25. Développement Web, Mobile & Réseaux Sociaux
  if (/(site web|site internet|site|application|mobile|flutter|d[eé]velopp|vitrine|e-commerce|boutique|instagram|facebook|reseaux sociaux|community)/i.test(q)) {
    return "Nous concevons des sites web, applications mobiles et pilotons la présence digitale des entreprises 💻📱 !\n\n• **Exemple phare** : Nous avons développé la plateforme web officielle de l'Hôtel du Parc (Parc Exotique du Sénégal à Somone) et nous gérons leurs réseaux sociaux officiels (**Instagram** et **Facebook**) pour booster leurs réservations directes.\n• **Technologies** : Next.js, React, Flutter, hébergement Cloud sécurisé.\n\nQuel type de site ou d'application souhaitez-vous lancer ?";
  }

  // 26. Cybersécurité, Pare-feu, Sauvegardes
  if (/(cyber|s[eé]curit[eé]|firewall|pare-?feu|antivirus|ransomware|sophos|fortinet|acronis|wallix|kaspersky|ddos)/i.test(q) || (isOneWord && ["cyber", "firewall", "sophos", "fortinet", "securite"].includes(words[0]))) {
    return "La cybersécurité, c'est notre spécialité numéro une ! 🛡️\n\n• **Pare-feux Next-Gen** : Sophos XGS et Fortinet FortiGate (filtrage web, VPN sécurisé, anti-intrusion).\n• **Sauvegardes anti-ransomware** : Acronis Cyber Protect (sauvegarde cloud immuable).\n• **Gestion des accès (PAM)** : Wallix Bastion pour verrouiller les comptes administrateurs.\n• **Audit & Tests de pénétration** : diagnostic complet de vos vulnérabilités.\n\nVous souhaitez auditer votre sécurité existante ou protéger un nouveau réseau ?";
  }

  // 27. Réseau & Câblage structuré
  if (/(r[eé]seau|c[aâ]blage|baie|brassage|fibre optique|cat 6|switch|cisco|aruba)/i.test(q) || (isOneWord && ["reseau", "cablage", "baie", "cisco"].includes(words[0]))) {
    return "Pour vos réseaux d'entreprise, **NOBTECH** réalise des installations physiques aux normes internationales 🌐 :\n\n• Pose et certification de câblage cuivre Cat 6A / 7 et rocade fibre optique.\n• Montage et peignage de baies de brassage 42U (notamment notre réalisation pour le bureau de l'Union Européenne à Dakar).\n• Commutation d'entreprise Cisco Catalyst et HPE Aruba.\n• Recette technique avec testeur de certification Fluke Networks.\n\nCombien de prises réseau ou de bureaux devez-vous équiper ?";
  }

  // 28. Expérience, Fondateur & Historique
  if (/(exp[eé]rience|anciennet[eé]|fondat|ozias|nzongo|fond[eé]|cr[eé][eé]|historique|satisfaction|avis client|avis|t[eé]moignage|depuis quand)/i.test(q)) {
    return "**NOBTECH** est une société d'ingénierie informatique de référence basée à Dakar 🇸🇳 :\n\n" +
      "• **Fondateur** : Ozias B. Nzongo, fort de plus de **15 ans d'expérience** métier en architecture réseau, télécoms, virtualisation et cybersécurité.\n" +
      "• **Création** : Fondée en 2020, avec aujourd'hui **6 ans d'expérience** terrain en tant qu'entreprise.\n" +
      "• **Satisfaction** : **100% de nos clients** sont pleinement satisfaits !\n" +
      "• **Avis client certifié** : *« Excellent travail franchement, très professionnel et surtout très réactif. Je ne pourrais pas trouver mieux ailleurs. »* — **Saad Diakhité**, DGA de l'Hôtel du Parc.\n" +
      "• **Références majeures** : Délégation de l'Union Européenne à Dakar, SETER (TER Dakar), Hôtel du Parc Exotique, Polyclinique P2A, Dolima, Simplon.\n\n" +
      "Avez-vous un projet dont vous aimeriez nous parler ?";
  }

  // 29. Clients & Réalisations
  if (/(client|confiance|r[eé]f[eé]rence|projet|r[eé]alisation|seter|ter|polyclinique|p2a|dolima|simplon|parc exotique|union europ[eé]enne|ue)/i.test(q) || (isOneWord && ["references", "clients"].includes(words[0]))) {
    return "De grandes institutions et entreprises nous font confiance au Sénégal 🏆 :\n\n" +
      "1. **Délégation de l'Union Européenne à Dakar** : Câblage réseau structuré blindé Cat 6A et baies 42U.\n" +
      "2. **SETER (TER de Dakar)** : Formation spécialisée des techniciens aux télécommunications ferroviaires GSM-R.\n" +
      "3. **Hôtel du Parc Exotique du Sénégal** : Plateforme web officielle, système de réservations directes et réseaux Instagram & Facebook.\n" +
      "4. **Polyclinique P2A (Dakar)** : Baies réseau, serveurs virtualisés VMware, téléphonie Yeastar et pare-feu FortiGate.\n" +
      "5. **Dolima (Laiterie du Berger)** : Infrastructure réseau d'entreprise et connectivité industrielle.\n" +
      "6. **Simplon Sénégal** : Formation pratique des apprenants aux infrastructures et à la cybersécurité.\n\n" +
      "Vous pouvez explorer toutes nos photos d'installations sur notre page [Réalisations](/realisations) !";
  }

  // 30. Remerciements et satisfaction
  if (/^(merci|super|parfait|nickel|top|merci beaucoup|c['\s]?est not[eé]|d['\s]?accord|ok|tres bien)[.!?\s]*$/i.test(q)) {
    return "C'est un vrai plaisir de vous aider ! 😊 N'hésitez surtout pas si vous avez d'autres questions. Vous pouvez aussi nous contacter à tout moment au **+221 77 301 08 38** ou demander un devis en 1 clic. Belle journée à vous ! ✨";
  }

  // 31. Question "Pourquoi ?"
  if (isOneWord && words[0] === "pourquoi") {
    return "Pourquoi choisir **NOBTECH** ? Parce que nous allions la réactivité locale à Dakar et l'exigence des standards internationaux ! 🚀\n\n• Des ingénieurs certifiés sur le terrain (Cisco, Fortinet, Sophos).\n• Des références majeures qui attestent de notre sérieux (Union Européenne, SETER / TER Dakar, Dolima, Polyclinique P2A).\n• Des solutions pérennes et durables, avec support technique disponible.\n\nQue cherchez-vous à améliorer dans votre entreprise ?";
  }

  // 32. Réponse générale naturelle & conversationnelle
  return "Je suis à votre écoute ! Chez **NOBTECH**, nous accompagnons les entreprises et professionnels dans quatre grands domaines :\n\n" +
    "• 🛡️ **Cybersécurité & Pare-feux** (Sophos, Fortinet, sauvegardes anti-ransomware Acronis)\n" +
    "• 🌐 **Réseaux, Wi-Fi & Câblage** (baies de brassage 42U, fibre optique, commutateurs Cisco)\n" +
    "• 💼 **ERP & Digitalisation** (logiciels sur-mesure, Odoo, Dolibarr, sites web)\n" +
    "• 🎓 **Formations certifiantes** (Cybersécurité Cisco, Power BI, Fortinet NSE 4, CCNA)\n\n" +
    "Dites-moi simplement en quelques mots ce que vous aimeriez réaliser ou le problème que vous rencontrez, et je vous orienterai avec grand plaisir ! Vous pouvez aussi joindre directement un de nos ingénieurs au **+221 77 301 08 38**.";
}

// Génère des choix interactifs de rebond pour aider l'utilisateur sans boucler à l'infini
export function computeSuggestions(userMessage: string, botReply: string = ""): string[] {
  const text = (userMessage + " " + botReply).toLowerCase();

  // Cas spécifique : détails de devis cyber
  if (/cyber|securite|firewall|sophos|fortinet/i.test(text) && /poste|taille|dimension|chiffr/i.test(text)) {
    return [
      "Moins de 20 postes",
      "Entre 20 et 50 postes",
      "Plus de 50 postes",
      "Ouvrir le formulaire devis"
    ];
  }

  // Cas spécifique : détails de devis réseau / câblage
  if (/reseau|cablage|baie|wifi/i.test(text) && /locaux|bureau|renov|piece|prise/i.test(text)) {
    return [
      "Nouveaux locaux à câbler",
      "Réorganiser la baie 42U",
      "Installation Wi-Fi pro",
      "Ouvrir le formulaire devis"
    ];
  }

  // Cas spécifique : détails de devis ERP
  if (/erp|odoo|dolibarr|gestion/i.test(text) && /module|processus|collaborateur/i.test(text)) {
    return [
      "Facturation & Devis",
      "Stocks & Commandes",
      "Comptabilité & RH",
      "ERP 100% sur-mesure"
    ];
  }

  // Devis général ou demande de prix (SANS JAMAIS reproposer "Demander un devis gratuit")
  if (/devis|prix|tarif|combien|factur|cout|budget|remplir/i.test(text)) {
    return [
      "Devis Cybersécurité & Pare-feu",
      "Devis Câblage & Réseau",
      "Devis ERP & Logiciel",
      "Ouvrir le formulaire devis",
      "Échanger sur WhatsApp"
    ];
  }

  if (/cyber|securite|firewall|sophos|fortinet|pare-feu|ransomware|hack/i.test(text)) {
    return [
      "Audit & Test d'intrusion (Pentest)",
      "Déploiement Pare-feu Sophos/Fortinet",
      "Sauvegardes anti-ransomware",
      "Devis Cybersécurité"
    ];
  }
  if (/formation|certif|ccna|cisco|cours|apprendre|stage|eleve|etudiant|power bi/i.test(text)) {
    return [
      "Certificat International Cisco",
      "Formation Cisco CCNA 200-301",
      "Microsoft Power BI & BI",
      "Programme Fortinet NSE 4"
    ];
  }
  if (/erp|odoo|dolibarr|logiciel|gestion|facturation|stock|crm/i.test(text)) {
    return [
      "ERP 100% sur-mesure",
      "Intégration Odoo",
      "Intégration Dolibarr",
      "Devis ERP & Logiciel"
    ];
  }
  if (/reseau|wifi|cablage|fibre|baie|switch|routeur|borne/i.test(text)) {
    return [
      "Câblage structuré & Baies 42U",
      "Wi-Fi professionnel haute densité",
      "Téléphonie IP & Standard VoIP",
      "Devis Câblage & Réseau"
    ];
  }
  if (/urgence|panne|bloque|sos|aide|lent|crash|incident/i.test(text)) {
    return [
      "Appeler l'astreinte (+221 77 301 08 38)",
      "Envoyer un message WhatsApp",
      "Diagnostic à distance",
      "Contrat d'infogérance 24/7"
    ];
  }
  if (/contact|adresse|telephone|whatsapp|localisation|dakar/i.test(text)) {
    return [
      "Écrire sur WhatsApp (+221 77 301 08 38)",
      "Localiser sur Google Maps",
      "Prendre rendez-vous",
      "Ouvrir le formulaire devis"
    ];
  }

  // Suggestions polyvalentes par défaut pour le démarrage
  return [
    "Demander un devis gratuit",
    "Cybersécurité & Firewalls",
    "Réseaux & Câblage",
    "Formations certifiantes"
  ];
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
            return NextResponse.json({
              reply: replyText,
              suggestions: computeSuggestions(message, replyText),
              model: "gemini-2.5-flash",
            });
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
            return NextResponse.json({
              reply: data.message.content,
              suggestions: computeSuggestions(message, data.message.content),
              model: "ollama-local",
            });
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
            return NextResponse.json({
              reply: replyText,
              suggestions: computeSuggestions(message, replyText),
              model,
            });
          }
        }
      } catch {
        // Fallback gracefully
      }
    }

    // Provider 4: Built-in Human Conversational Intelligence (100% reliable, zero license fee, immediate)
    const naturalReply = generateNaturalResponse(message, history);
    return NextResponse.json({
      reply: naturalReply,
      suggestions: computeSuggestions(message, naturalReply),
      model: "natural-human-engine",
    });
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
