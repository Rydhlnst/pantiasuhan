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
        backgroundImage ? 'bg-black/60' : 'bg-gradient-to-br from-sky-500 to-cyan-500'
      )} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          {title}
        </h2>
        {description && (
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            {description}
          </p>
        )}
        {buttons.length > 0 && (
          <div className="flex flex-wrap gap-4 justify-center">
            {buttons.map((button, index) => (
              <Button
                key={index}
                asChild
                size="lg"
                className={cn(
                  'font-semibold px-8 py-3 text-base',
                  button.variant === 'outline'
                    ? 'bg-white text-sky-600 hover:bg-sky-50 border-2 border-white'
                    : button.variant === 'secondary'
                    ? 'bg-white text-sky-600 hover:bg-sky-50'
                    : 'bg-white text-sky-600 hover:bg-sky-50'
                )}
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



