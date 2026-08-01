'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type CTAProps = {
  title: string
  description?: string
  backgroundImage?: string
  buttons?: { label: string; url: string; variant?: 'primary' | 'secondary' | 'outline' }[]
  alignment?: 'left' | 'center' | 'right'
}

export function CTA({
  title,
  description,
  backgroundImage,
  buttons = [],
  alignment = 'center',
}: CTAProps) {
  return (
    <section className="relative py-20 lg:py-28">
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className={cn(
        'absolute inset-0',
        backgroundImage ? 'bg-black/60' : 'bg-slate-900'
      )} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          {title}
        </h2>
        {description && (
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            {description}
          </p>
        )}
        {buttons.length > 0 && (
          <div className="flex flex-wrap gap-4 justify-center">
            {buttons.map((button, index) => (
              <Button
                key={index}
                asChild
                variant={button.variant === 'outline' ? 'outline' : 'default'}
                size="lg"
                className={button.variant === 'secondary' ? 'bg-white text-slate-900 hover:bg-white/90' : ''}
              >
                <Link href={button.url}>{button.label}</Link>
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
