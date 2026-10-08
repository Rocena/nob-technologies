import { getPayloadClient } from "@/lib/payload";
import { FORMATIONS_DATA, Formation } from "@/data/formations";

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

    if (result.docs && result.docs.length > 0) {
      return result.docs.map((doc: any) => {
        // Find default fallback for partner logos if needed
        const defaultData = FORMATIONS_DATA[doc.slug];

        return {
          slug: doc.slug,
          title: doc.title,
          badge: doc.badge || defaultData?.badge || "FORMATION EXPERT",
          shortDesc: doc.shortDesc || defaultData?.shortDesc || "",
          heroHeadline: doc.heroHeadline || defaultData?.heroHeadline || doc.title,
          heroDescription: doc.heroDescription || defaultData?.heroDescription || doc.shortDesc || "",
          duration: doc.duration || defaultData?.duration || "6 Mois (24 semaines)",
          hours: doc.hours || defaultData?.hours || "180 heures",
          format: doc.format || defaultData?.format || "Présentiel & Hybride",
          targetAudience: Array.isArray(doc.targetAudience) && doc.targetAudience.length > 0
            ? doc.targetAudience.map((a: any) => typeof a === 'string' ? a : (a.item || a.text || ''))
            : (defaultData?.targetAudience || []),
          prerequisites: Array.isArray(doc.prerequisites) && doc.prerequisites.length > 0
            ? doc.prerequisites.map((p: any) => typeof p === 'string' ? p : (p.item || p.text || ''))
            : (defaultData?.prerequisites || []),
          partnerLogos: defaultData?.partnerLogos || [
            { name: "Cisco", logo: "/images/partners/cisco-color.svg" },
            { name: "Fortinet", logo: "/images/partners/fortinet.svg" },
            { name: "Sophos", logo: "/images/partners/sophos.svg" },
          ],
          targetCertifications: Array.isArray(doc.targetCertifications) && doc.targetCertifications.length > 0
            ? doc.targetCertifications.map((c: any) => ({
                title: c.title,
                organization: c.organization || "",
                level: c.level || "Spécialiste",
                desc: c.desc || "",
              }))
            : (defaultData?.targetCertifications || []),
          months: Array.isArray(doc.months) && doc.months.length > 0
            ? doc.months.map((m: any) => ({
                month: m.month,
                title: m.title,
                duration: m.duration || `Mois ${m.month}`,
                objectives: m.objectives || "",
                topics: Array.isArray(m.topics) ? m.topics.map((t: any) => typeof t === 'string' ? t : (t.topic || '')) : [],
                practicalLab: m.practicalLab || "",
                deliverable: m.deliverable || "",
              }))
            : (defaultData?.months || []),
          keyOutcomes: Array.isArray(doc.keyOutcomes) && doc.keyOutcomes.length > 0
            ? doc.keyOutcomes.map((o: any) => typeof o === 'string' ? o : (o.outcome || ''))
            : (defaultData?.keyOutcomes || []),
          career: defaultData?.career,
        };
      });
    }
  } catch (error) {
    console.warn("Could not fetch formations from Payload CMS, falling back to static data:", error);
  }

  // Fallback to static formations data
  return Object.values(FORMATIONS_DATA);
}

export async function getFormationBySlug(slug: string): Promise<Formation | null> {
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
      const defaultData = FORMATIONS_DATA[doc.slug];

      return {
        slug: doc.slug,
        title: doc.title,
        badge: doc.badge || defaultData?.badge || "FORMATION EXPERT",
        shortDesc: doc.shortDesc || defaultData?.shortDesc || "",
        heroHeadline: doc.heroHeadline || defaultData?.heroHeadline || doc.title,
        heroDescription: doc.heroDescription || defaultData?.heroDescription || doc.shortDesc || "",
        duration: doc.duration || defaultData?.duration || "6 Mois (24 semaines)",
        hours: doc.hours || defaultData?.hours || "180 heures",
        format: doc.format || defaultData?.format || "Présentiel & Hybride",
        targetAudience: Array.isArray(doc.targetAudience) && doc.targetAudience.length > 0
          ? doc.targetAudience.map((a: any) => typeof a === 'string' ? a : (a.item || a.text || ''))
          : (defaultData?.targetAudience || []),
        prerequisites: Array.isArray(doc.prerequisites) && doc.prerequisites.length > 0
          ? doc.prerequisites.map((p: any) => typeof p === 'string' ? p : (p.item || p.text || ''))
          : (defaultData?.prerequisites || []),
        partnerLogos: defaultData?.partnerLogos || [
          { name: "Cisco", logo: "/images/partners/cisco-color.svg" },
          { name: "Fortinet", logo: "/images/partners/fortinet.svg" },
          { name: "Sophos", logo: "/images/partners/sophos.svg" },
        ],
        targetCertifications: Array.isArray(doc.targetCertifications) && doc.targetCertifications.length > 0
          ? doc.targetCertifications.map((c: any) => ({
              title: c.title,
              organization: c.organization || "",
              level: c.level || "Spécialiste",
              desc: c.desc || "",
            }))
          : (defaultData?.targetCertifications || []),
        months: Array.isArray(doc.months) && doc.months.length > 0
          ? doc.months.map((m: any) => ({
              month: m.month,
              title: m.title,
              duration: m.duration || `Mois ${m.month}`,
              objectives: m.objectives || "",
              topics: Array.isArray(m.topics) ? m.topics.map((t: any) => typeof t === 'string' ? t : (t.topic || '')) : [],
              practicalLab: m.practicalLab || "",
              deliverable: m.deliverable || "",
            }))
          : (defaultData?.months || []),
        keyOutcomes: Array.isArray(doc.keyOutcomes) && doc.keyOutcomes.length > 0
          ? doc.keyOutcomes.map((o: any) => typeof o === 'string' ? o : (o.outcome || ''))
          : (defaultData?.keyOutcomes || []),
        career: defaultData?.career,
      };
    }
  } catch (error) {
    console.warn(`Could not fetch formation [${slug}] from Payload CMS:`, error);
  }

  // Fallback to static
  return FORMATIONS_DATA[slug] || null;
}
