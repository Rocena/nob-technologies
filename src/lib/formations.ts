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

    const cmsMap = new Map<string, any>();
    if (result.docs && result.docs.length > 0) {
      result.docs.forEach((doc: any) => cmsMap.set(doc.slug, doc));
    }

    // Always serve all official formations from FORMATIONS_DATA, merged with any CMS edits
    const staticList = Object.values(FORMATIONS_DATA);
    return staticList.map((defaultData) => {
      const doc = cmsMap.get(defaultData.slug);
      if (!doc) return defaultData;

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
      };
    });
  } catch (error) {
    console.warn("Could not fetch formations from Payload CMS, falling back to static data:", error);
  }

  // Fallback to static formations data
  return Object.values(FORMATIONS_DATA);
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
        };
      }
    }
  } catch (error) {
    console.warn(`Could not fetch formation ${slug} from CMS:`, error);
  }

  return defaultData || null;
}
