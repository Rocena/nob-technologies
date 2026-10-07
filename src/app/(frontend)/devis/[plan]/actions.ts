"use server";

import { getPayloadClient } from "@/lib/payload";
import { headers } from "next/headers";

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3;

export async function submitQuoteForm(prevState: any, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const company = formData.get("company") as string;
    const plan = formData.get("plan") as string;
    
    const employees = formData.get("employees") as string;
    const deadline = formData.get("deadline") as string;
    const needs = formData.get("needs") as string;

    // Honeypot check
    const honeypot = formData.get("website") as string;
    if (honeypot && honeypot.length > 0) {
      return { success: true, message: "Votre demande a bien été envoyée." };
    }

    // Math Captcha check
    const captchaA = parseInt(formData.get("captcha_a") as string);
    const captchaB = parseInt(formData.get("captcha_b") as string);
    const captchaAnswer = parseInt(formData.get("captcha_answer") as string);

    if (isNaN(captchaA) || isNaN(captchaB) || isNaN(captchaAnswer) || (captchaA + captchaB !== captchaAnswer)) {
      return { success: false, error: "Le résultat du calcul anti-spam est incorrect." };
    }

    // Rate limiting
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

    // Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return { success: false, error: "Le nom est invalide." };
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { success: false, error: "L'adresse email est invalide." };
    }
    if (!needs || typeof needs !== "string" || needs.trim().length < 10) {
      return { success: false, error: "Veuillez détailler vos besoins (minimum 10 caractères)." };
    }

    let message = `Demande de devis pour le plan : ${plan}\n\n`;
    message += `--- Détails spécifiques ---\n`;
    if (employees) message += `Nombre d'employés : ${employees}\n`;
    if (deadline) message += `Délai souhaité : ${deadline}\n`;
    message += `\nBesoins spécifiques :\n${needs}`;

    // Store in Payload CMS
    const payload = await getPayloadClient();
    const createdMsg = await payload.create({
      collection: "contact-messages",
      data: {
        name: name.trim(),
        email: email.trim(),
        phone: phone ? phone.trim() : undefined,
        company: company ? company.trim() : undefined,
        subject: `Demande de devis - Plan ${plan}`,
        message: message.trim(),
        status: "new",
      },
    });

    // Email notification
    try {
      const { sendEmail, generateClientAcknowledgmentHtml } = await import("@/lib/email");

      // Accusé de réception professionnel au client
      const clientHtml = generateClientAcknowledgmentHtml({
        name: name.trim(),
        subject: `Demande de devis - Plan ${plan}`,
        summary: message.trim(),
        referenceId: createdMsg?.id ? String(createdMsg.id) : undefined,
      });

      await sendEmail({
        to: email.trim(),
        subject: `Accusé de réception : Demande de devis (${plan}) - NOB TECHNOLOGIES`,
        html: clientHtml,
      });

      // Notification admin
      const adminHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
          <h2 style="color: #0A2540; margin-top: 0;">Nouvelle demande de devis reçue : Plan ${plan}</h2>
          <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #00B4D8;">
            <p style="margin: 4px 0;"><strong>Demandeur :</strong> ${name.trim()}</p>
            <p style="margin: 4px 0;"><strong>Email :</strong> <a href="mailto:${email.trim()}">${email.trim()}</a></p>
            <p style="margin: 4px 0;"><strong>Téléphone :</strong> ${phone ? phone.trim() : "Non renseigné"}</p>
            <p style="margin: 4px 0;"><strong>Entreprise :</strong> ${company ? company.trim() : "Non renseignée"}</p>
            <p style="margin: 4px 0;"><strong>Employés :</strong> ${employees ? employees.trim() : "Non renseigné"}</p>
            <p style="margin: 4px 0;"><strong>Délai :</strong> ${deadline ? deadline.trim() : "Non renseigné"}</p>
          </div>
          <h3 style="color: #1e293b; margin-bottom: 8px;">Besoins exprimés :</h3>
          <div style="color: #334155; line-height: 1.6; white-space: pre-wrap; background-color: #f1f5f9; padding: 16px; border-radius: 8px;">
            ${needs.trim()}
          </div>
          <p style="font-size: 12px; color: #94a3b8; margin-top: 24px; text-align: center;">
            Géré via le back-office NOB TECHNOLOGIES.
          </p>
        </div>
      `;

      await sendEmail({
        to: process.env.ADMIN_NOTIFY_EMAIL || "contact@nobtech.fr",
        replyTo: email.trim(),
        subject: `[Devis] Nouvelle demande de devis : ${plan} (${company || name})`,
        html: adminHtml,
      });
    } catch (emailError) {
      console.warn("L'email n'a pas pu être envoyé. Message sauvegardé dans le CMS.", emailError);
    }

    return { success: true, message: "Votre demande de devis a bien été envoyée." };

  } catch (error) {
    console.error("Quote form submission error:", error);
    return { success: false, error: "Une erreur interne est survenue. Veuillez réessayer plus tard." };
  }
}
