'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Program = {
  title: string
  slug: string
  excerpt?: string
  featuredImage?: string | null
  category?: string
}

type ProgramsProps = {
  title?: string
  subtitle?: string
  programs: Program[]
  layout?: 'grid' | 'carousel'
  viewAllUrl?: string
}

export function Programs({
  title,
  subtitle,
  programs,
  layout = 'grid',
  viewAllUrl = '/programs',
}: ProgramsProps) {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className={cn(
          'grid gap-8',
          layout === 'grid' && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        )}>
          {programs.map((program) => (
            <Link
              key={program.slug}
              href={`/programs/${program.slug}`}
              className="group block"
            >
              <div className="bg-white rounded-none shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                {program.featuredImage && (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={program.featuredImage}
                      alt={program.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {program.category && (
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-none text-xs font-medium text-slate-700">
                        {program.category}
                      </div>
                    )}
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-sky-500 transition-colors">
                    {program.title}
                  </h3>
                  {program.excerpt && (
                    <p className="text-slate-600 text-sm line-clamp-2">
                      {program.excerpt}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {viewAllUrl && (
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href={viewAllUrl}>
                View All Programs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}


