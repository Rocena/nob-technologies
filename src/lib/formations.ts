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

export async function getAllFormations(): Promise<Formation[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "formations",
      where: {
        published: {
          equals: true,
        },
      },
      sort: "order",
      limit: 100,
    });

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
      if (!doc) {
        return {
          ...defaultData,
          sessions: getDefaultSessionsForFormation(defaultData.slug),
        };
      }

      return {
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
    });

    // Also append any new formations created exclusively in the CMS
    for (const newDoc of cmsDocsOnly) {
      mergedList.push(buildFormationFromCmsDoc(newDoc));
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
    const result = await payload.find({
      collection: "formations",
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    });

    if (result.docs && result.docs.length > 0) {
      const doc = result.docs[0] as any;
      if (defaultData) {
        return {
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
      } else {
        // Formation created exclusively in CMS
        return buildFormationFromCmsDoc(doc);
      }
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
