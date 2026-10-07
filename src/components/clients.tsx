import React from "react";
import { Container, Section } from "@/components/ui/layout";
import { FadeUp } from "@/components/animations";
import { ClientLogoImg } from "./ClientLogoImg";

export function Clients({ clients = [] }: { clients: any[] }) {
  if (clients.length === 0) return null;

  return (
    <Section className="py-12 md:py-16 lg:py-24 bg-white border-b border-slate-100 overflow-hidden">
      <Container>
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <FadeUp>
            <p className="font-mono text-accent text-sm md:text-base tracking-[0.25em] uppercase mb-4 opacity-90 font-bold">
              &gt;_ NOS PARTENAIRES
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Ils nous ont fait confiance
            </h2>
          </FadeUp>
        </div>
        
        {/* Simple Flex Wrap for logos */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 lg:gap-20">
          {clients.filter((c: any) => c.displayStatus !== false).map((client, idx) => {
            const logoUrl = client.logo?.url || '';
            if (!logoUrl) return null;

            return (
              <FadeUp key={client.id || idx} delay={0.1 * (idx % 5)}>
                <div className="relative group w-32 md:w-40 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100">
                  <ClientLogoImg 
                    src={logoUrl} 
                    alt={client.name || 'Partenaire'} 
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </FadeUp>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
