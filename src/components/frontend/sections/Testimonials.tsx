'use client'

import React from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

type Testimonial = {
  name: string
  role?: string
  organization?: string
  content: string
  avatar?: string | null
  rating?: number
}

type TestimonialsProps = {
  title?: string
  subtitle?: string
  testimonials: Testimonial[]
  layout?: 'carousel' | 'grid' | 'masonry'
}

export function Testimonials({
  title,
  subtitle,
  testimonials,
  layout = 'grid',
}: TestimonialsProps) {
  return (
    <section className="py-16 lg:py-24 bg-slate-50">
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
          layout === 'grid' && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
          layout === 'masonry' && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        )}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-none shadow-sm"
            >
              {testimonial.rating && (
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'h-5 w-5',
                        i < testimonial.rating!
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-slate-200'
                      )}
                    />
                  ))}
                </div>
              )}
              <p className="text-slate-600 mb-6 italic">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                {testimonial.avatar && (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-none object-cover"
                  />
                )}
                <div>
                  <div className="font-medium text-slate-900">
                    {testimonial.name}
                  </div>
                  {(testimonial.role || testimonial.organization) && (
                    <div className="text-sm text-slate-500">
                      {testimonial.role}
                      {testimonial.role && testimonial.organization && ' at '}
                      {testimonial.organization}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


