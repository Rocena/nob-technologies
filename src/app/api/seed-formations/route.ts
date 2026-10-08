import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';
import { FORMATIONS_DATA } from '@/data/formations';

export async function GET() {
  try {
    const payload = await getPayloadClient();

    let createdCount = 0;
    for (const item of Object.values(FORMATIONS_DATA)) {
      const existing = await payload.find({
        collection: 'formations',
        where: { slug: { equals: item.slug } },
      });

      if (existing.docs.length === 0) {
        await payload.create({
          collection: 'formations',
          data: {
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
            order: createdCount + 1,
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
          },
        });
        createdCount++;
      }
    }

    return NextResponse.json({ success: true, seededFormations: createdCount });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
