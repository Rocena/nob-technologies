import React from "react";
import { Container } from "./ui/layout";
import { Text } from "./ui/typography";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { getPayloadClient } from "@/lib/payload";
import { FooterEmergeText } from "./FooterEmergeText";
import { NobLogo } from "./NobLogo";
import { QuoteRequestButton } from "./QuoteRequestButton";

export async function Footer() {
  let settings: any = null;
  try {
    const payload = await getPayloadClient();
    settings = await payload.findGlobal({ slug: 'site-settings' });
  } catch (err) {
    // Graceful fallback during build or when database tables are initializing
  }
  
  const siteName = settings?.general?.siteName || "NOB TECHNOLOGIES";
  const desc = settings?.general?.siteDescription || "Solutions & Services Informatiques. Votre sécurité, notre priorité. Solutions complètes de cybersécurité & services managés.";
  const phone = settings?.contact?.phone || "+221 77 301 08 38 / +221 33 814 04 35";
  const email = settings?.contact?.email || "contact@nobtech.fr";

  return (
    <footer data-cursor-binary="true" className="relative bg-[#020617] text-white pt-12 pb-8 md:pt-16 md:pb-10 lg:pt-24 lg:pb-12 overflow-hidden border-t border-white/10">
      {/* Tech grid and glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-accent/10 rounded-[100%] blur-[120px] pointer-events-none"></div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 mb-10 md:mb-14 lg:mb-20">
          
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="mb-6">
              <NobLogo layout="stacked" height={80} textColor="#FFFFFF" showSlogan={false} />
            </div>
            <Text className="text-slate-400 mb-8 text-sm leading-relaxed max-w-sm">
              {desc}
            </Text>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 mb-8">
              <a href="https://www.linkedin.com/company/nob-technologies/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-sm border border-white/10 flex items-center justify-center bg-white/5 hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,119,181,0.4)]">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://twitter.com/NobTechnologies" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-sm border border-white/10 flex items-center justify-center bg-white/5 hover:bg-white hover:border-white hover:text-black transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://www.facebook.com/Nobtechnologies-101959825388540" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-sm border border-white/10 flex items-center justify-center bg-white/5 hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(24,119,242,0.4)]">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
              </a>
              <a href="https://www.instagram.com/nobtech21/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-sm border border-white/10 flex items-center justify-center bg-white/5 hover:bg-[#E1306C] hover:border-[#E1306C] hover:text-white transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(225,48,108,0.4)]">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>

            {/* Contact quick links */}
            <div className="flex items-center gap-4">
              <a href={`mailto:${email}`} title="Nous écrire par email" className="w-10 h-10 rounded-sm border border-white/10 flex items-center justify-center bg-white/5 hover:bg-accent hover:border-accent hover:text-[#020617] transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]">
                <Mail className="w-4 h-4" />
              </a>
              <a href={`tel:${phone.split('/')[0].trim().replace(/\s+/g, '')}`} title="Nous appeler" className="w-10 h-10 rounded-sm border border-white/10 flex items-center justify-center bg-white/5 hover:bg-accent hover:border-accent hover:text-[#020617] transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]">
                <Phone className="w-4 h-4" />
              </a>
              <a href="https://www.google.com/maps/search/?api=1&query=QG3J%2BHP+Dakar" target="_blank" rel="noopener noreferrer" title="Localisation Google Maps : QG3J+HP Dakar (Route de l'Aéroport)" className="w-10 h-10 rounded-sm border border-white/10 flex items-center justify-center bg-white/5 hover:bg-accent hover:border-accent hover:text-[#020617] transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]">
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="font-semibold text-xs tracking-[0.2em] uppercase text-slate-100 mb-6">Solutions</h4>
            <ul className="space-y-4">
              <li><Link href="/services" className="text-sm text-slate-400 hover:text-accent hover:translate-x-1 transition-all inline-block">Nos Services</Link></li>
              <li><Link href="/secteurs" className="text-sm text-slate-400 hover:text-accent hover:translate-x-1 transition-all inline-block">Secteurs d'activité</Link></li>
              <li><Link href="/realisations" className="text-sm text-slate-400 hover:text-accent hover:translate-x-1 transition-all inline-block">Réalisations</Link></li>
              <li>
                <QuoteRequestButton className="text-sm text-slate-400 hover:text-accent hover:translate-x-1 transition-all inline-block cursor-pointer text-left">
                  Demander un devis
                </QuoteRequestButton>
              </li>
            </ul>
          </div>
          
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-xs tracking-[0.2em] uppercase text-slate-100 mb-6">Entreprise</h4>
            <ul className="space-y-4">
              <li><Link href="/a-propos" className="text-sm text-slate-400 hover:text-accent hover:translate-x-1 transition-all inline-block">À propos</Link></li>
              <li><Link href="/partenaires" className="text-sm text-slate-400 hover:text-accent hover:translate-x-1 transition-all inline-block">Partenaires Constructeurs</Link></li>
              <li><Link href="/formations" className="text-sm text-slate-400 hover:text-accent hover:translate-x-1 transition-all inline-block">Formations & Certifications</Link></li>
              <li><Link href="/carrieres" className="text-sm text-slate-400 hover:text-accent hover:translate-x-1 transition-all inline-block">Carrières</Link></li>
              <li><Link href="/actualites" className="text-sm text-slate-400 hover:text-accent hover:translate-x-1 transition-all inline-block">Actualités</Link></li>
              <li><Link href="/articles" className="text-sm text-slate-400 hover:text-accent hover:translate-x-1 transition-all inline-block">Blog</Link></li>
              <li><Link href="/faq" className="text-sm text-slate-400 hover:text-accent hover:translate-x-1 transition-all inline-block">FAQ</Link></li>
            </ul>
          </div>
          
          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs tracking-[0.2em] uppercase mb-4 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]">
              Prêt à innover ?
            </h4>
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <p className="text-sm text-slate-300 mb-5 leading-relaxed font-normal relative z-10">
                Passez à la vitesse supérieure avec nos infrastructures cloud et réseaux sécurisés.
              </p>
              <Link href="/contact" className="relative z-10 group/btn inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760] text-[#020617] text-xs sm:text-sm font-bold rounded-xl hover:brightness-105 active:scale-95 shadow-[0_4px_16px_0_rgba(0,212,255,0.35)] hover:shadow-[0_6px_24px_rgba(16,231,96,0.35)] transition-all">
                <span>Démarrer un projet</span>
                <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <Text className="text-sm text-slate-500 relative z-10">
            © {new Date().getFullYear()} {siteName}. Tous droits réservés.
          </Text>
          <div className="flex items-center gap-6 relative z-10 flex-wrap">
            <Link href="/mentions-legales" className="text-sm text-slate-500 hover:text-white transition-colors">Mentions légales</Link>
            <Link href="/confidentialite" className="text-sm text-slate-500 hover:text-white transition-colors">Confidentialité</Link>
            <a
              href="/admin"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-[#00D4FF] px-2.5 py-1 rounded bg-white/[0.03] hover:bg-[#00D4FF]/10 border border-white/5 hover:border-[#00D4FF]/30 transition-all cursor-pointer"
              title="Accès Espace Administration & Back-Office"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Connexion Back-Office
            </a>
          </div>
        </div>

        {/* Giant Watermark Typography - Silicon Valley Style */}
        <div className="pt-8 pb-2 md:pt-12 md:pb-4 lg:pt-16 w-full">
          <FooterEmergeText />
        </div>
      </Container>
    </footer>
  );
}
