import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';
import { FORMATIONS_DATA } from '@/data/formations';

export async function GET() {
  try {
    const payload = await getPayloadClient();

    // 1. Unpublish any obsolete formations not in the new realistic catalog
    const validSlugs = new Set(Object.values(FORMATIONS_DATA).map((f) => f.slug));
    const allExisting = await payload.find({ collection: 'formations', limit: 100 });
    for (const doc of allExisting.docs) {
      if (!validSlugs.has(doc.slug)) {
        await payload.update({
          collection: 'formations',
          id: doc.id,
          data: { published: false },
        });
      }
    }

    // 2. Upsert the 10 official realistic formations
    let seededCount = 0;
    for (const item of Object.values(FORMATIONS_DATA)) {
      const existing = await payload.find({
        collection: 'formations',
        where: { slug: { equals: item.slug } },
      });

      const formationPayload = {
        title: item.title,
        slug: item.slug,
        badge: item.badge,
        shortDesc: item.shortDesc,
        heroHeadline: item.heroHeadline,
        heroDescription: item.heroDescription,
        duration: item.duration,
        hours: item.hours,
        format: item.format,
        published: true,
        order: seededCount + 1,
        targetAudience: item.targetAudience.map((a) => ({ item: a })),
        prerequisites: item.prerequisites.map((p) => ({ item: p })),
        targetCertifications: item.targetCertifications.map((c) => ({
          title: c.title,
          organization: c.organization,
          level: c.level,
          desc: c.desc,
        })),
        months: item.months.map((m) => ({
          month: m.month,
          title: m.title,
          duration: m.duration,
          objectives: m.objectives,
          topics: m.topics.map((t) => ({ topic: t })),
          practicalLab: m.practicalLab,
          deliverable: m.deliverable,
        })),
        keyOutcomes: item.keyOutcomes.map((o) => ({ outcome: o })),
      };

      if (existing.docs.length === 0) {
        await payload.create({
          collection: 'formations',
          data: formationPayload,
        });
      } else {
        await payload.update({
          collection: 'formations',
          id: existing.docs[0].id,
          data: formationPayload,
        });
      }
      seededCount++;
    }

    return NextResponse.json({ success: true, seededFormations: seededCount });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
