import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { getPayloadClient } from '@/lib/payload';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Container, Section } from '@/components/ui/layout';
import { Heading, Text } from '@/components/ui/typography';
import { GlowButton } from '@/components/GlowButton';
import { RichText } from '@/components/rich-text';
import { CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import Image from 'next/image';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

const RESERVED_AUTH_SLUGS = [
  'admin',
  'login',
  'create-first-user',
  'backoffice',
  'back-office',
  'bakoffice',
  'bak-office',
  'dashboard',
  'api',
  'graphql',
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (RESERVED_AUTH_SLUGS.includes(slug)) {
    return { title: 'Administration | NOB TECHNOLOGIES' };
  }
  try {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      limit: 1,
    });

    const page = res?.docs?.[0];
    if (!page) return { title: 'Page non trouvée | NOB TECHNOLOGIES' };

    return {
      title: `${page.metaTitle || page.title} | NOB TECHNOLOGIES`,
      description: page.metaDescription || page.shortDescription || 'Page NOB TECHNOLOGIES',
    };
  } catch {
    return { title: 'Page | NOB TECHNOLOGIES' };
  }
}

export default async function DynamicCMSPage({ params }: PageProps) {
  const { slug } = await params;

  if (RESERVED_AUTH_SLUGS.includes(slug)) {
    if (slug === 'login') redirect('/login');
    if (slug === 'create-first-user') redirect('/create-first-user');
    redirect('/admin');
  }
  let page: any = null;

  try {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
    });
    page = res?.docs?.[0];
  } catch (err) {
    // Fallback if db is unseeded
  }

  if (!page) {
    notFound();
  }

  const blocks = (page.layout as any[]) || [];

  return (
    <>
      <Header />
      <main className="flex-1 bg-background pt-24 min-h-[70vh]">
        {/* En-tête par défaut si aucun hero block n'est configuré */}
        {(!blocks.length || blocks[0]?.blockType !== 'hero') && (
          <Section className="bg-[#020617] text-white py-16 md:py-24 relative overflow-hidden border-b border-slate-800">
            <Container className="relative z-10 text-center max-w-4xl mx-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4">
                NOB TECHNOLOGIES
              </span>
              <Heading level={1} className="text-3xl md:text-5xl font-black mb-4 tracking-tight text-white">
                {page.title}
              </Heading>
              {page.shortDescription && (
                <Text className="text-slate-300 text-lg max-w-2xl mx-auto">
                  {page.shortDescription}
                </Text>
              )}
            </Container>
          </Section>
        )}

        {/* Rendu des blocs */}
        {blocks.map((block: any, idx: number) => {
          switch (block.blockType) {
            case 'hero':
              return (
                <Section key={idx} className="bg-[#020617] text-white py-20 md:py-32 relative overflow-hidden">
                  <Container className="relative z-10 text-center max-w-4xl mx-auto">
                    <Heading level={1} className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white">
                      {block.headline}
                    </Heading>
                    {block.subhead && (
                      <Text className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
                        {block.subhead}
                      </Text>
                    )}
                    {block.buttons?.length > 0 && (
                      <div className="flex flex-wrap items-center justify-center gap-4">
                        {block.buttons.map((btn: any, bIdx: number) => (
                          <GlowButton key={bIdx} href={btn.link}>
                            {btn.label}
                          </GlowButton>
                        ))}
                      </div>
                    )}
                  </Container>
                </Section>
              );

            case 'richText':
              return (
                <Section key={idx} className="py-14">
                  <Container className="max-w-4xl mx-auto">
                    <RichText data={block.content} />
                  </Container>
                </Section>
              );

            case 'image':
              const imgUrl = block.image?.url;
              return (
                <Section key={idx} className="py-10">
                  <Container className={block.width === 'full' ? 'max-w-7xl mx-auto' : 'max-w-4xl mx-auto'}>
                    {imgUrl && (
                      <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
                        <img src={imgUrl} alt={block.caption || 'Image'} className="w-full h-auto object-cover" />
                        {block.caption && (
                          <div className="p-3 text-center text-sm text-slate-500 bg-slate-50 border-t border-slate-100">
                            {block.caption}
                          </div>
                        )}
                      </div>
                    )}
                  </Container>
                </Section>
              );

            case 'featuresGrid':
              return (
                <Section key={idx} className="py-16 bg-slate-50 border-y border-slate-200/60">
                  <Container>
                    {block.sectionTitle && (
                      <Heading level={2} className="text-2xl md:text-4xl font-bold text-center mb-12 text-slate-900">
                        {block.sectionTitle}
                      </Heading>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {block.features?.map((f: any, fIdx: number) => (
                        <div key={fIdx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                          <CheckCircle2 className="w-8 h-8 text-cyan-500 mb-4" />
                          <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
                          <p className="text-slate-600 text-sm leading-relaxed">{f.description}</p>
                        </div>
                      ))}
                    </div>
                  </Container>
                </Section>
              );

            case 'cta':
              return (
                <Section key={idx} className="py-16 bg-gradient-to-br from-slate-900 to-slate-950 text-white text-center">
                  <Container className="max-w-3xl mx-auto">
                    <Heading level={2} className="text-3xl font-bold mb-4 text-white">{block.headline}</Heading>
                    {block.text && <p className="text-slate-300 mb-8">{block.text}</p>}
                    <GlowButton href={block.buttonLink}>{block.buttonLabel}</GlowButton>
                  </Container>
                </Section>
              );

            case 'stats':
              return (
                <Section key={idx} className="py-14 bg-white border-y border-slate-100">
                  <Container>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                      {block.stats?.map((s: any, sIdx: number) => (
                        <div key={sIdx}>
                          <div className="text-4xl md:text-5xl font-black text-cyan-600 mb-2">{s.value}</div>
                          <div className="text-sm font-semibold text-slate-600">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </Container>
                </Section>
              );

            case 'faq':
              return (
                <Section key={idx} className="py-16 bg-white">
                  <Container className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                      <HelpCircle className="w-10 h-10 text-cyan-500 mx-auto mb-3" />
                      <Heading level={2} className="text-3xl font-bold text-slate-900">{block.title || 'FAQ'}</Heading>
                    </div>
                    <div className="space-y-4">
                      {block.relation?.map((item: any, qIdx: number) => (
                        <div key={qIdx} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50">
                          <h4 className="font-semibold text-slate-900 mb-2">{item.question}</h4>
                          <div className="text-slate-600 text-sm">
                            <RichText data={item.answer} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Container>
                </Section>
              );

            case 'spacer':
              const hClass = block.height === 'small' ? 'h-8' : block.height === 'large' ? 'h-24' : 'h-16';
              return (
                <div key={idx} className={`${hClass} flex items-center justify-center`}>
                  {block.showLine && <hr className="w-full border-slate-200" />}
                </div>
              );

            default:
              return null;
          }
        })}
      </main>
      <Footer />
    </>
  );
}
