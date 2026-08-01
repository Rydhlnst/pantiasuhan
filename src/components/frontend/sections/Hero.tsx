'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Slide = {
  title: string
  subtitle?: string
  description?: string
  image: string
  link?: string
  linkLabel?: string
}

type HeroProps = {
  slides?: Slide[]
  title?: string
  subtitle?: string
  backgroundImage?: string
  overlay?: 'none' | 'light' | 'dark' | 'gradient'
  height?: 'small' | 'medium' | 'large' | 'fullscreen'
  alignment?: 'left' | 'center' | 'right'
  buttons?: { label: string; url: string; variant?: 'primary' | 'secondary' | 'outline' | 'ghost' }[]
}

export function Hero({
  slides,
  title,
  subtitle,
  backgroundImage,
  overlay = 'gradient',
  height = 'large',
  alignment = 'center',
  buttons = [],
}: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const hasSlides = slides && slides.length > 0

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide(index)
    setTimeout(() => setIsTransitioning(false), 600)
  }, [isTransitioning])

  const nextSlide = useCallback(() => {
    if (!hasSlides) return
    goToSlide((currentSlide + 1) % slides.length)
  }, [hasSlides, currentSlide, slides?.length, goToSlide])

  const prevSlide = useCallback(() => {
    if (!hasSlides) return
    goToSlide((currentSlide - 1 + slides.length) % slides.length)
  }, [hasSlides, currentSlide, slides?.length, goToSlide])

  useEffect(() => {
    if (!hasSlides) return
    const timer = setInterval(nextSlide, 6000)
    return () => clearInterval(timer)
  }, [hasSlides, nextSlide])

  if (hasSlides) {
    const currentSlideData = slides[currentSlide]
    return (
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-950">
        <div
          className={cn(
            'absolute inset-0 bg-cover bg-center transition-all duration-[1.5s]',
            isTransitioning ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
          )}
          style={{ backgroundImage: `url(${currentSlideData.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

        <div className="relative z-10 w-full py-32 lg:py-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className={cn(
                "w-12 h-0.5 bg-white/60 mx-auto mb-8 transition-all duration-700",
                isTransitioning ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
              )} />
              <h1 className={cn(
                'text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 transition-all duration-700 tracking-tight',
                isTransitioning ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'
              )}>
                {currentSlideData.title}
              </h1>
              {currentSlideData.subtitle && (
                <p className={cn(
                  'text-lg md:text-xl text-white/80 mb-4 transition-all duration-700 delay-100',
                  isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                )}>
                  {currentSlideData.subtitle}
                </p>
              )}
              {currentSlideData.description && (
                <p className={cn(
                  'text-base text-white/60 mb-10 transition-all duration-700 delay-200 max-w-xl mx-auto',
                  isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                )}>
                  {currentSlideData.description}
                </p>
              )}
              {currentSlideData.link && (
                <div className={cn(
                  'transition-all duration-700 delay-300',
                  isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                )}>
                  <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-white/90 px-8 h-12 text-sm font-medium tracking-wide group">
                    <Link href={currentSlideData.link}>
                      {currentSlideData.linkLabel || 'SELENGKAPNYA'}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all border border-white/10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all border border-white/10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {slides.length > 1 && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  'transition-all duration-500',
                  index === currentSlide ? 'w-8 h-0.5 bg-white' : 'w-4 h-0.5 bg-white/30 hover:bg-white/50'
                )}
              />
            ))}
          </div>
        )}
      </section>
    )
  }

  const heightClasses = {
    small: 'min-h-[40vh]',
    medium: 'min-h-[50vh]',
    large: 'min-h-[70vh]',
    fullscreen: 'min-h-screen',
  }

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <section
      className={cn(
        'relative flex items-center justify-center',
        heightClasses[height],
        !backgroundImage && 'bg-slate-950'
      )}
    >
      {backgroundImage && (
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }} />
      )}
      {overlay !== 'none' && (
        <div className={cn(
          'absolute inset-0',
          overlay === 'dark' && 'bg-black/50',
          overlay === 'light' && 'bg-white/50',
          overlay === 'gradient' && 'bg-gradient-to-b from-black/60 via-black/40 to-black/60'
        )} />
      )}
      <div className="relative z-10 w-full py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn('max-w-3xl mx-auto', alignmentClasses[alignment])}>
            <div className="w-12 h-0.5 bg-white/60 mb-8 mx-auto" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg md:text-xl text-white/80 mb-10">
                {subtitle}
              </p>
            )}
            {buttons.length > 0 && (
              <div className={cn(
                'flex flex-wrap gap-4',
                alignment === 'center' && 'justify-center',
                alignment === 'right' && 'justify-end',
                alignment === 'left' && 'justify-start'
              )}>
                {buttons.map((button, index) => (
                  <Button
                    key={index}
                    asChild
                    size="lg"
                    className={cn(
                      'px-8 h-12 text-sm font-medium tracking-wide group',
                      button.variant === 'outline'
                        ? 'bg-transparent text-white border border-white/40 hover:bg-white hover:text-slate-900'
                        : 'bg-white text-slate-900 hover:bg-white/90'
                    )}
                  >
                    <Link href={button.url}>
                      {button.label}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
