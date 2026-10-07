"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpen, Clock, Sparkles } from 'lucide-react'

interface ArticleListClientProps {
  articles: any[]
}

export function ArticleListClient({ articles }: ArticleListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous')

  const categories = [
    'Tous',
    ...Array.from(new Set(articles.map((a) => a.category).filter(Boolean))),
  ]

  const filteredArticles =
    selectedCategory === 'Tous'
      ? articles
      : articles.filter((a) => a.category === selectedCategory)

  return (
    <div>
      {/* Category Filter Pills Bar */}
      {categories.length > 2 && (
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                type="button"
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-cyan-400 text-[#020617] shadow-[0_0_20px_rgba(0,212,255,0.4)] scale-105 font-bold'
                    : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>
      )}

      {/* Grid of Articles */}
      {filteredArticles.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10">
          {filteredArticles.map((item: any) => {
            const authorDisplayName =
              item.authorName ||
              (typeof item.author === 'object' && item.author?.name) ||
              'Ozias Nzongo'

            const formattedDate = new Date(
              item.publishedDate || item.createdAt
            ).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })

            const imageUrl =
              item.heroImage && typeof item.heroImage === 'object' && item.heroImage?.url
                ? item.heroImage.url
                : `/media/${item.slug}.jpg`

            return (
              <Link
                key={item.id}
                href={`/articles/${item.slug}`}
                className="group block h-full focus:outline-none"
              >
                <article className="h-full flex flex-col rounded-2xl bg-[#0B132B]/70 border border-slate-800 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,212,255,0.12)] hover:-translate-y-1 overflow-hidden backdrop-blur-md">
                  {/* Hero Cover Image Container */}
                  <div className="relative w-full aspect-[16/9] bg-gradient-to-tr from-[#020617] via-slate-900 to-cyan-950/40 border-b border-slate-800/80 overflow-hidden flex items-center justify-center">
                    <img
                      src={imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient Overlay for tech polish */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Pill Category Tag */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#020617]/85 text-cyan-300 border border-cyan-400/30 backdrop-blur-md shadow-lg">
                        {item.category || 'Culture Tech'}
                      </span>
                    </div>

                    {/* Reading Time Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-300 bg-slate-950/80 border border-white/10 backdrop-blur-md">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        {item.readingTime || '5 min'}
                      </span>
                    </div>
                  </div>

                  {/* Article Details */}
                  <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      {/* Meta Date */}
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-3.5">
                        <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Publié le {formattedDate}</span>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-200 line-clamp-2 leading-snug mb-3.5">
                        {item.title}
                      </h2>

                      {/* Summary / Chapeau */}
                      <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-6">
                        {item.summary}
                      </p>
                    </div>

                    {/* Card Footer: Author + CTA */}
                    <div className="pt-5 border-t border-slate-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-extrabold text-[#020617] shadow-md ring-2 ring-cyan-400/40">
                          {authorDisplayName.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-xs">
                          <div className="font-semibold text-slate-200">{authorDisplayName}</div>
                          <div className="text-[11px] text-slate-400">Pôle Ingénierie • NOB Tech</div>
                        </div>
                      </div>

                      <span className="inline-flex items-center text-xs font-bold text-cyan-400 group-hover:text-cyan-300 group-hover:translate-x-1.5 transition-all duration-200">
                        Lire l'article
                        <ArrowRight className="ml-1.5 w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-20 px-4 rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 max-w-xl mx-auto">
          <p className="text-slate-400 text-base mb-2">
            Aucun article dans cette catégorie pour le moment.
          </p>
          <button
            onClick={() => setSelectedCategory('Tous')}
            type="button"
            className="text-xs text-cyan-400 hover:underline mt-2 font-mono cursor-pointer"
          >
            Afficher tous les articles
          </button>
        </div>
      )}
    </div>
  )
}
