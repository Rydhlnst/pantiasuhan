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
    <section className="relative py-16 md:py-20 lg:py-24">
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className={cn(
        'absolute inset-0',
        backgroundImage ? 'bg-black/60' : 'bg-[#1e3a5f]'
      )} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
          {title}
        </h2>
        <div className="w-12 h-1 bg-white/60 mx-auto mb-4" />
        {description && (
          <p className="text-base md:text-lg text-white/80 mb-8 max-w-2xl mx-auto">
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
                    ? 'bg-transparent text-white border-2 border-white hover:bg-white/10'
                    : button.variant === 'secondary'
                    ? 'bg-white text-[#1e3a5f] hover:bg-white/90'
                    : 'bg-white text-[#1e3a5f] hover:bg-white/90'
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