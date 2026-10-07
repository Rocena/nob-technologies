import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CookieConsent } from "@/components/CookieConsent";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import StickyCallout from "@/components/StickyCallout";
import { ChatBot } from "@/components/ChatBot";
import { CommandPaletteProvider } from "@/components/CommandPaletteProvider";
import { EngineerModalProvider } from "@/components/EngineerModalContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nobtech.fr'),
  title: { default: 'NOB TECHNOLOGIES | Solutions Informatiques & Télécoms', template: '%s | NOB TECHNOLOGIES' },
  description: 'NOB TECHNOLOGIES, société informatique spécialisée en cybersécurité, réseaux, cloud et développement logiciel à Dakar, Sénégal. Plus de 15 ans d\'expertise.',
  keywords: ['informatique', 'cybersécurité', 'réseaux', 'cloud', 'Dakar', 'Sénégal', 'NOB TECHNOLOGIES', 'infogérance', 'câblage'],
  authors: [{ name: 'NOB TECHNOLOGIES', url: 'https://nobtech.fr' }],
  creator: 'NOB TECHNOLOGIES',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://nobtech.fr',
    siteName: 'NOB TECHNOLOGIES',
    title: 'NOB TECHNOLOGIES | Solutions Informatiques & Télécoms',
    description: 'Société informatique spécialisée en cybersécurité, réseaux, cloud et développement logiciel. Plus de 15 ans d\'expertise au Sénégal.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'NOB TECHNOLOGIES' }],
  },
  twitter: { card: 'summary_large_image', title: 'NOB TECHNOLOGIES', description: 'Solutions informatiques haut de gamme au Sénégal.' },
  robots: { index: true, follow: true },
};

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground overflow-x-hidden">
        <CommandPaletteProvider>
          <EngineerModalProvider>
            <ScrollProgress />
            {children}
            <BackToTop />
            <StickyCallout />
            <CookieConsent />
            <ChatBot />
          </EngineerModalProvider>
        </CommandPaletteProvider>
      </body>
    </html>
  );
}
