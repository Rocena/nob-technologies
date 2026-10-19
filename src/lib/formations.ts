import { getPayloadClient } from "@/lib/payload";
import {
  FORMATIONS_DATA,
  Formation,
  FormationSession,
  getDefaultSessionsForFormation,
  DEFAULT_FORMATION_INCLUSIONS,
  DEFAULT_FORMATION_OFFERINGS,
} from "@/data/formations";

function mapCmsSessions(docSessions: any[] | undefined, slug: string): FormationSession[] {
  if (Array.isArray(docSessions) && docSessions.length > 0) {
    return docSessions.map((s: any) => ({
      id: s.id,
      name: s.name,
      startDate: s.startDate ? new Date(s.startDate).toISOString().split("T")[0] : undefined,
      schedule: s.schedule || undefined,
      format: s.format || "hybride",
      status: s.status || "open",
      availableSeats: typeof s.availableSeats === "number" ? s.availableSeats : 10,
      location: s.location || "Campus NOB TECHNOLOGIES — Dakar",
    }));
  }
  return getDefaultSessionsForFormation(slug);
}

function buildFormationFromCmsDoc(doc: any): Formation {
  return {
    slug: doc.slug,
    title: doc.title,
    badge: doc.badge || "FORMATION PROFESSIONNELLE • NOB TECHNOLOGIES",
    category: doc.category || "IT & Cybersécurité",
    shortDesc: doc.shortDesc || "",
    heroHeadline: doc.heroHeadline || doc.title,
    heroDescription: doc.heroDescription || doc.shortDesc || "",
    targetAudience: Array.isArray(doc.targetAudience) ? doc.targetAudience.map((a: any) => a.item || a) : [],
    prerequisites: Array.isArray(doc.prerequisites) ? doc.prerequisites.map((p: any) => p.item || p) : [],
    duration: doc.duration || "Variable selon cursus",
    hours: doc.hours || "Pratique intensive & Labs",
    pace: "Rythme flexible (Soirs ou Samedis)",
    format: doc.format || "Présentiel & Hybride (Dakar / Visio)",
    partnerLogos:
      Array.isArray(doc.partnerLogos) && doc.partnerLogos.length > 0
        ? doc.partnerLogos.map((p: any) => ({ name: p.name, logo: p.logo }))
        : (FORMATIONS_DATA[doc.slug]?.partnerLogos || []),
    targetCertifications: Array.isArray(doc.targetCertifications)
      ? doc.targetCertifications.map((c: any) => ({
          title: c.title,
          organization: c.organization || "Organisme Partenaire",
          level: c.level || "Certification Professionnelle",
          desc: c.desc || "",
        }))
      : [],
    months: Array.isArray(doc.months)
      ? doc.months.map((m: any) => ({
          month: m.month || 1,
          title: m.title || `Mois ${m.month || 1}`,
          duration: m.duration || "4 semaines",
          objectives: m.objectives || "",
          topics: Array.isArray(m.topics) ? m.topics.map((t: any) => t.topic || t) : [],
          practicalLab: m.practicalLab || "Travaux Pratiques en laboratoire",
          deliverable: m.deliverable || "Évaluation continue et validation de compétences",
        }))
      : [],
    keyOutcomes: Array.isArray(doc.keyOutcomes) ? doc.keyOutcomes.map((o: any) => o.outcome || o) : [],
    offerings: DEFAULT_FORMATION_OFFERINGS,
    pricing: {
      publicPrice: 250000,
      launchPrice: 199000,
      launchSpots: 10,
      remainingSpots: 4,
      includedInPrice: DEFAULT_FORMATION_INCLUSIONS,
    },
    sessions: mapCmsSessions(doc.sessions, doc.slug),
  };
}

/**
 * Dynamic pricing calculation based on real applicant numbers in the Admissions collection.
 * Guarantee against deceptive advertising: if 10 candidates apply, the promotional price disappears.
 */
function applyDynamicPricing(formation: Formation, count: number): Formation {
  if (!formation.pricing) return formation;

  const launchSpots = formation.pricing.launchSpots;
  if (!launchSpots || launchSpots <= 0) {
    return formation;
  }

  const applicationsCount = count;
  const remainingSpots = Math.max(0, launchSpots - applicationsCount);
  const isPromoExpired = remainingSpots <= 0;

  const updatedPricing = {
    ...formation.pricing,
    totalApplicationsCount: applicationsCount,
    remainingSpots,
    isPromoExpired,
  };

  if (isPromoExpired) {
    // Si les 10 places ont été atteintes, le prix de promotion disparaît
    // On applique et affiche strictement le prix standard pour garantir l'absence de publicité mensongère
    updatedPricing.launchPrice = formation.pricing.publicPrice;
    updatedPricing.promoPrice = undefined;
    updatedPricing.note = `Offre de lancement expirée : les ${launchSpots} places au tarif préférentiel ont été pourvues. Inscriptions au tarif standard.`;
  }

  return {
    ...formation,
    pricing: updatedPricing,
  };
}

async function getAdmissionsCountsMap(payload: any): Promise<Map<string, number>> {
  const countsMap = new Map<string, number>();
  try {
    const admissionsResult = await payload.find({
      collection: "admissions",
      limit: 2000,
      overrideAccess: true,
      select: {
        formationSlug: true,
        status: true,
      },
    });

    if (admissionsResult?.docs && Array.isArray(admissionsResult.docs)) {
      for (const adm of admissionsResult.docs) {
        if (adm?.formationSlug && adm.status !== "declined") {
          const s = String(adm.formationSlug).trim().toLowerCase();
          countsMap.set(s, (countsMap.get(s) || 0) + 1);
        }
      }
    }
  } catch {
    // Fallback silencieux si la base n'est pas encore connectée
  }
  return countsMap;
}

export async function getAllFormations(): Promise<Formation[]> {
  try {
    const payload = await getPayloadClient();
    const [result, admissionsMap] = await Promise.all([
      payload.find({
        collection: "formations",
        where: {
          published: {
            equals: true,
          },
        },
        sort: "order",
        limit: 100,
      }),
      getAdmissionsCountsMap(payload),
    ]);

    const cmsMap = new Map<string, any>();
    const cmsDocsOnly: any[] = [];

    if (result.docs && result.docs.length > 0) {
      result.docs.forEach((doc: any) => {
        cmsMap.set(doc.slug, doc);
        if (!FORMATIONS_DATA[doc.slug]) {
          cmsDocsOnly.push(doc);
        }
      });
    }

    const staticList = Object.values(FORMATIONS_DATA);
    const mergedList: Formation[] = staticList.map((defaultData) => {
      const doc = cmsMap.get(defaultData.slug);
      const baseFormation = !doc
        ? {
            ...defaultData,
            sessions: getDefaultSessionsForFormation(defaultData.slug),
          }
        : {
            ...defaultData,
            title: doc.title || defaultData.title,
            badge: doc.badge || defaultData.badge,
            shortDesc: doc.shortDesc || defaultData.shortDesc,
            heroHeadline: doc.heroHeadline || defaultData.heroHeadline,
            heroDescription: doc.heroDescription || defaultData.heroDescription,
            duration: doc.duration || defaultData.duration,
            hours: doc.hours || defaultData.hours,
            format: doc.format || defaultData.format,
            sessions: mapCmsSessions(doc.sessions, defaultData.slug),
          };

      const count = admissionsMap.get(baseFormation.slug.toLowerCase()) || 0;
      return applyDynamicPricing(baseFormation, count);
    });

    // Also append any new formations created exclusively in the CMS
    for (const newDoc of cmsDocsOnly) {
      const baseFormation = buildFormationFromCmsDoc(newDoc);
      const count = admissionsMap.get(baseFormation.slug.toLowerCase()) || 0;
      mergedList.push(applyDynamicPricing(baseFormation, count));
    }

    return mergedList;
  } catch (error) {
    console.warn("Could not fetch formations from Payload CMS, falling back to static data:", error);
  }

  // Fallback to static formations data with default sessions
  return Object.values(FORMATIONS_DATA).map((f) => ({
    ...f,
    sessions: getDefaultSessionsForFormation(f.slug),
  }));
}

export async function getFormationBySlug(slug: string): Promise<Formation | null> {
  const defaultData = FORMATIONS_DATA[slug];

  try {
    const payload = await getPayloadClient();
    const [result, admissionsResult] = await Promise.all([
      payload.find({
        collection: "formations",
        where: {
          slug: {
            equals: slug,
          },
        },
        limit: 1,
      }),
      payload.find({
        collection: "admissions",
        where: {
          and: [
            { formationSlug: { equals: slug } },
            { status: { not_equals: "declined" } },
          ],
        },
        overrideAccess: true,
        limit: 100,
      }),
    ]);

    const count = admissionsResult?.totalDocs ?? (admissionsResult?.docs?.length || 0);

    if (result.docs && result.docs.length > 0) {
      const doc = result.docs[0] as any;
      if (defaultData) {
        const formation: Formation = {
          ...defaultData,
          title: doc.title || defaultData.title,
          badge: doc.badge || defaultData.badge,
          shortDesc: doc.shortDesc || defaultData.shortDesc,
          heroHeadline: doc.heroHeadline || defaultData.heroHeadline,
          heroDescription: doc.heroDescription || defaultData.heroDescription,
          duration: doc.duration || defaultData.duration,
          hours: doc.hours || defaultData.hours,
          format: doc.format || defaultData.format,
          sessions: mapCmsSessions(doc.sessions, defaultData.slug),
        };
        return applyDynamicPricing(formation, count);
      } else {
        // Formation created exclusively in CMS
        return applyDynamicPricing(buildFormationFromCmsDoc(doc), count);
      }
    }

    if (defaultData) {
      const formation: Formation = {
        ...defaultData,
        sessions: getDefaultSessionsForFormation(defaultData.slug),
      };
      return applyDynamicPricing(formation, count);
    }
  } catch (error) {
    console.warn(`Could not fetch formation ${slug} from CMS:`, error);
  }

  if (defaultData) {
    return {
      ...defaultData,
      sessions: getDefaultSessionsForFormation(defaultData.slug),
    };
  }

  return null;
}
