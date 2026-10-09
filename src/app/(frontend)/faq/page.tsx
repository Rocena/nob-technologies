import { getPayloadClient } from '@/lib/payload'
import { Container, Section } from '@/components/ui/layout'
import { Heading, Text } from '@/components/ui/typography'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CTA } from '@/components/cta'
import { FadeUp, TextReveal } from '@/components/animations'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'FAQ | NOB TECHNOLOGIES',
  description: 'Foire aux questions concernant NOB TECHNOLOGIES et nos services d\'intégration et télécommunications.',
}

const fallbackFaqs = [
  {
    id: "faq-1",
    question: "Dans quels domaines intervenez-vous ?",
    answer: (
      <>
        Nous intervenons dans les domaines de l'informatique et du digital : câblage et infrastructure réseau, sécurité des données, vidéosurveillance, téléphonie IP, ainsi que le développement de logiciels, ERP et la création de sites web. <br/><br/>
        Découvrez le détail de nos compétences sur notre page <Link href="/services" className="text-accent hover:underline font-semibold">Nos Services</Link>.
      </>
    )
  },
  {
    id: "faq-2",
    question: "Faites-vous des prestations sur site ou à domicile ?",
    answer: (
      <>
        Oui, nos équipes techniques se déplacent directement dans vos locaux d'entreprise ou à votre domicile pour toutes les installations matérielles (réseau, caméras de surveillance, câblage) et la maintenance.
      </>
    )
  },
  {
    id: "faq-3",
    question: "Vos prestations sont-elles chères ?",
    answer: (
      <>
        Nous proposons des tarifs très compétitifs, adaptés à la taille de votre structure et à vos besoins spécifiques. Notre objectif est de démocratiser l'accès à une informatique professionnelle.
      </>
    )
  },
  {
    id: "faq-4",
    question: "Proposez-vous des contrats de maintenance (Infogérance) ?",
    answer: (
      <>
        Absolument. Nous proposons des contrats de maintenance pour garantir la continuité de vos opérations. Vous ne dépendez pas d'une seule personne, mais de toute notre équipe technique réactive. <br/><br/>
        <Link href="/contact" className="text-accent hover:underline font-semibold">Contactez-nous pour en savoir plus</Link>.
      </>
    )
  },
  {
    id: "faq-5",
    question: "Comment prendre rendez-vous ou demander un devis ?",
    answer: (
      <>
        Vous pouvez nous appeler directement au +221 33 814 04 35 ou +221 77 301 08 38, utiliser le <Link href="/contact" className="text-accent hover:underline font-semibold">formulaire de notre page Contact</Link>, ou nous rendre visite à notre adresse : Routes de l'aéroport Léopold Sédar Senghor, à Dakar.
      </>
    )
  },
  {
    id: "faq-6",
    question: "Êtes-vous présent dans d'autres pays ?",
    answer: (
      <>
        Nous sommes actuellement basés et opérons principalement au Sénégal. Toutefois, pour le développement logiciel et certaines prestations Cloud, nous pouvons accompagner des clients à l'international.
      </>
    )
  },
  {
    id: "faq-7",
    question: "Les équipements installés sont-ils de qualité ?",
    answer: (
      <>
        Oui, nous travaillons avec des partenaires d'envergure internationale pour vous fournir des équipements fiables, robustes et de qualité professionnelle. Vous pouvez en voir certains sur notre page <Link href="/a-propos" className="text-accent hover:underline font-semibold">À propos</Link>.
      </>
    )
  }
];

export default async function FAQPage() {
  let fetchedFaqs: any[] = [];
  try {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: 'faq',
      sort: 'order',
    });
    fetchedFaqs = res?.docs || [];
  } catch (err) {
    // Fallback if db is unseeded
  }

  // Use DB FAQs if available, otherwise fallback to hardcoded ones
  // We can't render JSX elements if they are stored as strings from Payload without an HTML parser.
  // For now, if fetchedFaqs is empty, we use the nice fallback array.
  const hasFaqsFromDb = fetchedFaqs.length > 0;

  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        <Section data-cursor-binary="true" className="bg-[#020617] text-white pt-28 pb-14 sm:pt-36 sm:pb-16 md:pt-40 md:pb-20 lg:pt-48 lg:pb-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"></div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
          
          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
              <TextReveal>
                <h1 className="text-white mb-6 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-balance">
                  Questions Fréquentes :{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]">
                    Toutes Vos Réponses en Toute Clarté
                  </span>
                </h1>
              </TextReveal>
              <FadeUp delay={0.2}>
                <p className="text-slate-300 text-base sm:text-lg md:text-xl font-normal max-w-2xl leading-relaxed">
                  Tout ce que vous devez savoir sur nos prestations, nos déploiements matériels, nos contrats de maintenance et nos garanties.
                </p>
              </FadeUp>
            </div>
          </Container>
        </Section>
        
        <Section className="py-16 md:py-24 bg-slate-50">
          <Container>
            <div className="max-w-3xl mx-auto">
              <div className="space-y-4">
                {(hasFaqsFromDb ? fetchedFaqs : fallbackFaqs).map((faq, idx) => (
                  <FadeUp key={faq.id || idx} delay={idx * 0.05}>
                    <details className="group bg-white border border-slate-200/90 hover:border-cyan-400/80 rounded-xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
                      <summary className="flex items-center justify-between p-6 font-bold text-slate-900 group-hover:text-cyan-700 cursor-pointer list-none text-base sm:text-lg transition-colors">
                        <span className="pr-6">{faq.question}</span>
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-cyan-50 transition-colors">
                          <Plus className="w-5 h-5 text-slate-500 group-hover:text-cyan-600 transition-transform duration-300 group-open:rotate-45" />
                        </div>
                      </summary>
                      <div className="p-6 pt-0 text-slate-600 text-sm sm:text-base leading-relaxed bg-white border-t border-slate-50">
                        {typeof faq.answer === 'string' ? <p>{faq.answer}</p> : faq.answer}
                      </div>
                    </details>
                  </FadeUp>
                ))}
              </div>

              {/* Bottom Support Callout */}
              <FadeUp delay={0.2}>
                <div className="mt-12 p-8 rounded-2xl bg-white border border-slate-200 text-center shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Vous avez une question spécifique sur votre infrastructure ?
                  </h3>
                  <p className="text-sm text-slate-600 max-w-xl mx-auto mb-6 leading-relaxed">
                    Nos ingénieurs et consultants IT analysent vos contraintes techniques et vous répondent sous 24h ouvrées.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-cyan-600 text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm"
                  >
                    <span>Poser votre question à nos experts</span>
                  </Link>
                </div>
              </FadeUp>
            </div>
          </Container>
        </Section>
        <CTA />
      </main>
      <Footer />
    </>
  )
}
