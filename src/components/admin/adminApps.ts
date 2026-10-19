import React from 'react';
import {
  Browsers,
  Question,
  Images,
  SuitcaseSimple,
  TagChevron,
  GraduationCap,
  FolderSimpleStar,
  Buildings,
  Handshake,
  Star,
  UsersThree,
  Receipt,
  FileText,
  NewspaperClipping,
  ChatCircleText,
  BookOpenText,
  UserGear,
  Pulse,
  SlidersHorizontal,
  FileCode,
  type Icon as PhosphorIcon,
} from '@phosphor-icons/react';

export type AdminApp = {
  name: string;
  Icon: React.ComponentType<{ size?: number | string; weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'; className?: string }>;
  href: string;
};
export type AdminAppGroup = { title: string; color: string; adminOnly?: boolean; apps: AdminApp[] };

export const appGroups: AdminAppGroup[] = [
  {
    title: 'Contenu & Navigation',
    color: '#0284C7',
    apps: [
      { name: 'Pages', Icon: Browsers, href: '/admin/collections/pages' },
      { name: 'FAQ', Icon: Question, href: '/admin/collections/faq' },
      { name: 'Médias', Icon: Images, href: '/admin/collections/media' },
    ],
  },
  {
    title: 'Expertises & Formations',
    color: '#0EA5E9',
    apps: [
      { name: 'Formations', Icon: GraduationCap, href: '/admin/collections/formations' },
      { name: 'Admissions', Icon: UsersThree, href: '/admin/collections/admissions' },
      { name: 'Services', Icon: SuitcaseSimple, href: '/admin/collections/services' },
      { name: 'Plans Tarifaires', Icon: TagChevron, href: '/admin/collections/pricing-plans' },
    ],
  },
  {
    title: 'Carrières',
    color: '#38BDF8',
    apps: [{ name: "Offres d'emploi", Icon: SuitcaseSimple, href: '/admin/collections/job-offers' }],
  },
  {
    title: 'Portfolio & Preuves',
    color: '#0284C7',
    apps: [
      { name: 'Réalisations', Icon: FolderSimpleStar, href: '/admin/collections/projects' },
      { name: 'Clients Web', Icon: Buildings, href: '/admin/collections/clients' },
      { name: 'Partenaires', Icon: Handshake, href: '/admin/collections/partners' },
      { name: 'Témoignages', Icon: Star, href: '/admin/collections/testimonials' },
    ],
  },
  {
    title: 'CRM & Facturation',
    color: '#0369A1',
    apps: [
      { name: 'Clients (CRM)', Icon: UsersThree, href: '/admin/collections/customers' },
      { name: 'Devis', Icon: FileText, href: '/admin/collections/quotes' },
      { name: 'Factures', Icon: Receipt, href: '/admin/collections/invoices' },
    ],
  },
  {
    title: 'Blog & Actualités',
    color: '#0284C7',
    apps: [
      { name: 'Articles', Icon: NewspaperClipping, href: '/admin/collections/articles' },
      { name: 'News', Icon: FileCode, href: '/admin/collections/news' },
    ],
  },
  {
    title: 'Interactions & Support',
    color: '#00B4D8',
    apps: [
      { name: 'Messages Contact', Icon: ChatCircleText, href: '/admin/collections/contact-messages' },
      { name: 'Aide & Tutoriel', Icon: BookOpenText, href: '/admin/aide' },
    ],
  },
  {
    title: 'Système & Accès',
    color: '#475569',
    adminOnly: true,
    apps: [
      { name: 'Utilisateurs', Icon: UserGear, href: '/admin/collections/users' },
      { name: "Journaux d'activité", Icon: Pulse, href: '/admin/collections/activity-logs' },
      { name: 'Paramètres du site', Icon: SlidersHorizontal, href: '/admin/globals/site-settings' },
    ],
  },
];

export function findAppByPath(pathname: string) {
  for (const g of appGroups) {
    for (const a of g.apps) {
      if (pathname === a.href || pathname.startsWith(a.href + '/')) return { app: a, group: g };
    }
  }
  return null;
}

const RECENT_KEY = 'nob-recent-apps';
export function getRecent(): string[] {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]'); } catch { return []; }
}
export function pushRecent(href: string) {
  try {
    const next = [href, ...getRecent().filter((h) => h !== href)].slice(0, 6);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch { /* ignore */ }
}
