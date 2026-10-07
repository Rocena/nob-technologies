"use server";

import { getPayloadClient } from "@/lib/payload";
import { headers } from "next/headers";

// Basic in-memory rate limiting map for Server Actions
// Note: In a serverless distributed environment (like Vercel), this resets per instance.
// For robust production, use Redis or DB.
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3;

export async function submitContactForm(prevState: any, formData: FormData) {
  try {
    // 1. Extract data
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const company = formData.get("company") as string;
    const subject = formData.get("subject") as string;
    let message = formData.get("message") as string;

    // Extract dynamic contextual fields
    const budget = formData.get("budget") as string;
    const deadline = formData.get("deadline") as string;
    const services = formData.getAll("services").join(", ");
    const infrastructure_size = formData.get("infrastructure_size") as string;
    const technologies = formData.get("technologies") as string;

    // Append dynamic fields to the main message
    const extraDetails = [];
    if (budget) extraDetails.push(`Budget estimé : ${budget}`);
    if (deadline) extraDetails.push(`Délai souhaité : ${deadline}`);
    if (services) extraDetails.push(`Services concernés : ${services}`);
    if (infrastructure_size) extraDetails.push(`Taille de l'infrastructure : ${infrastructure_size}`);
    if (technologies) extraDetails.push(`Technologies utilisées : ${technologies}`);
    
    if (extraDetails.length > 0) {
      message = "--- Détails du projet ---\n" + extraDetails.join("\n") + "\n\n--- Message ---\n" + message;
    }
    
    // 2. Honeypot check (hidden field to trap bots)
    const honeypot = formData.get("website") as string;
    if (honeypot && honeypot.length > 0) {
      // Bot detected, silently reject
      return { success: true, message: "Votre message a bien été envoyé." };
    }

    // 2.5 Math Captcha check
    const captchaA = parseInt(formData.get("captcha_a") as string);
    const captchaB = parseInt(formData.get("captcha_b") as string);
    const captchaAnswer = parseInt(formData.get("captcha_answer") as string);

    if (isNaN(captchaA) || isNaN(captchaB) || isNaN(captchaAnswer) || (captchaA + captchaB !== captchaAnswer)) {
      return { success: false, error: "Le résultat du calcul anti-spam est incorrect." };
    }

    // 3. Rate limiting (using IP)
    const headersList = await headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const realIp = headersList.get('x-real-ip');
    const identifier = forwardedFor?.split(',')[0] || realIp || "fallback-ip";
    
    const now = Date.now();
    const rlData = rateLimitMap.get(identifier) || { count: 0, lastReset: now };
    if (now - rlData.lastReset > RATE_LIMIT_WINDOW) {
      rlData.count = 1;
      rlData.lastReset = now;
    } else {
      rlData.count++;
      if (rlData.count > MAX_REQUESTS_PER_WINDOW) {
        return { success: false, error: "Trop de requêtes. Veuillez patienter avant de réessayer." };
      }
    }
    rateLimitMap.set(identifier, rlData);

    // 4. Server-side Validation
    if (!name || typeof name !== "string" || name.trim().length < 2 || name.length > 100) {
      return { success: false, error: "Le nom doit contenir entre 2 et 100 caractères." };
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 150) {
      return { success: false, error: "L'adresse email est invalide." };
    }
    if (phone && (typeof phone !== "string" || phone.length > 30)) {
      return { success: false, error: "Le numéro de téléphone est invalide (max 30 caractères)." };
    }
    if (company && (typeof company !== "string" || company.length > 150)) {
      return { success: false, error: "Le nom de l'entreprise est trop long (max 150 caractères)." };
    }
    if (!subject || typeof subject !== "string" || subject.trim().length < 2 || subject.length > 150) {
      return { success: false, error: "Le sujet est obligatoire (max 150 caractères)." };
    }
    if (!message || typeof message !== "string" || message.trim().length < 10 || message.length > 2000) {
      return { success: false, error: "Le message doit contenir entre 10 et 2000 caractères." };
    }

    // 5. Store in Payload CMS
    const payload = await getPayloadClient();
    const createdMsg = await payload.create({
      collection: "contact-messages",
      data: {
        name: name.trim(),
        email: email.trim(),
        phone: phone ? phone.trim() : undefined,
        company: company ? company.trim() : undefined,
        subject: subject.trim(),
        message: message.trim(),
        status: "new",
      },
    });

    // 6. Envoyer les emails réels via Nodemailer
    try {
      const { sendEmail, generateClientAcknowledgmentHtml } = await import("@/lib/email");

      // 6.1 Accusé de réception professionnel envoyé au client/prospect
      const clientHtml = generateClientAcknowledgmentHtml({
        name: name.trim(),
        subject: subject.trim(),
        summary: message.trim(),
        referenceId: createdMsg?.id ? String(createdMsg.id) : undefined,
      });

      await sendEmail({
        to: email.trim(),
        subject: `Accusé de réception : ${subject.trim()} - NOB TECHNOLOGIES`,
        html: clientHtml,
      });

      // 6.2 Notification à l'équipe interne NOB TECHNOLOGIES
      const adminHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
          <h2 style="color: #0A2540; margin-top: 0;">Nouveau message de contact reçu</h2>
          <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #00B4D8;">
            <p style="margin: 4px 0;"><strong>Expéditeur :</strong> ${name.trim()}</p>
            <p style="margin: 4px 0;"><strong>Email :</strong> <a href="mailto:${email.trim()}">${email.trim()}</a></p>
            <p style="margin: 4px 0;"><strong>Téléphone :</strong> ${phone ? phone.trim() : "Non renseigné"}</p>
            <p style="margin: 4px 0;"><strong>Entreprise :</strong> ${company ? company.trim() : "Non renseignée"}</p>
          </div>
          <h3 style="color: #1e293b; margin-bottom: 8px;">Objet : ${subject.trim()}</h3>
          <div style="color: #334155; line-height: 1.6; white-space: pre-wrap; background-color: #f1f5f9; padding: 16px; border-radius: 8px;">
            ${message.trim()}
          </div>
          <p style="font-size: 12px; color: #94a3b8; margin-top: 24px; text-align: center;">
            Géré via le back-office NOB TECHNOLOGIES. Répondez directement depuis le back-office ou depuis votre messagerie.
          </p>
        </div>
      `;

      await sendEmail({
        to: process.env.ADMIN_NOTIFY_EMAIL || "contact@nobtech.fr",
        replyTo: email.trim(),
        subject: `[Site Web] Nouveau message : ${subject.trim()}`,
        html: adminHtml,
      });
    } catch (emailError) {
      console.warn("Notification email warning:", emailError);
    }

    // 7. Return Success
    return { success: true, message: "Votre message a bien été envoyé." };

  } catch (error) {
    console.error("Form submission error:", error);
    return { success: false, error: "Une erreur interne est survenue. Veuillez réessayer plus tard." };
  }
}
