import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items, className = '' }: { items: BreadcrumbItem[]; className?: string }) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Fil d'Ariane" className={`flex items-center text-xs font-medium text-slate-400 ${className}`}>
      <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2">
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors"
            title="Accueil"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Accueil</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5 sm:gap-2">
              <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
              {isLast || !item.href ? (
                <span className="text-slate-200 font-semibold truncate max-w-[200px] sm:max-w-[320px]">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-slate-400 hover:text-cyan-400 transition-colors truncate max-w-[150px] sm:max-w-[220px]"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
