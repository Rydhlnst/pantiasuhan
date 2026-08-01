'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type InfoCard = {
  title: string
  description: string
  image?: string
  link: string
  linkLabel?: string
}

type SekilasProps = {
  title?: string
  subtitle?: string
  cards: InfoCard[]
}

export function Sekilas({ title = 'Sekilas', subtitle, cards }: SekilasProps) {
  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-3 tracking-tight">{title}</h2>
          {subtitle && <p className="text-slate-500 max-w-2xl">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <Link key={index} href={card.link} className="group block">
              <div className="bg-white border border-slate-100 overflow-hidden transition-all duration-300 hover:border-slate-200 hover:shadow-lg h-full">
                {card.image && (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="text-base font-semibold text-slate-900 mb-2 group-hover:text-sky-500 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                    {card.description}
                  </p>
                  <span className="text-sm font-medium text-sky-500 flex items-center gap-1">
                    {card.linkLabel || 'Lihat Detail'}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
