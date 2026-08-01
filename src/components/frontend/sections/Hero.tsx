'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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
    setTimeout(() => setIsTransitioning(false), 500)
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
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [hasSlides, nextSlide])

  // Carousel mode (like the screenshot)
  if (hasSlides) {
    const currentSlideData = slides[currentSlide]
    return (
      <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-slate-900">
        {/* Background Image */}
        <div
          className={cn(
            'absolute inset-0 bg-cover bg-center transition-all duration-700',
            isTransitioning ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
          )}
          style={{ backgroundImage: `url(${currentSlideData.image})` }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <h1 className={cn(
                'text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 transition-all duration-500',
                isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              )}>
                {currentSlideData.title}
              </h1>
              {currentSlideData.subtitle && (
                <p className={cn(
                  'text-lg md:text-xl text-white/80 mb-6 transition-all duration-500 delay-100',
                  isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                )}>
                  {currentSlideData.subtitle}
                </p>
              )}
              {currentSlideData.description && (
                <p className={cn(
                  'text-base text-white/70 mb-8 transition-all duration-500 delay-200',
                  isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                )}>
                  {currentSlideData.description}
                </p>
              )}
              {currentSlideData.link && (
                <div className={cn(
                  'transition-all duration-500 delay-300',
                  isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                )}>
                  <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                    <Link href={currentSlideData.link}>
                      {currentSlideData.linkLabel || 'SELENGKAPNYA'}
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Prev/Next Buttons */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all z-20"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all z-20"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Navigation Dots */}
        {slides.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  'transition-all duration-300 rounded-full',
                  index === currentSlide
                    ? 'w-8 h-3 bg-white'
                    : 'w-3 h-3 bg-white/50 hover:bg-white/75'
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </section>
    )
  }

  // Static hero mode (single image)
  const heightClasses = {
    small: 'py-20',
    medium: 'py-32',
    large: 'py-40',
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
        'relative flex items-center',
        heightClasses[height],
        !backgroundImage && 'bg-slate-900'
      )}
    >
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {overlay !== 'none' && (
        <div
          className={cn(
            'absolute inset-0',
            overlay === 'dark' && 'bg-black/60',
            overlay === 'light' && 'bg-white/60',
            overlay === 'gradient' && 'bg-gradient-to-b from-black/70 to-black/40'
          )}
        />
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className={cn(alignmentClasses[alignment])}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
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
      </div>
    </section>
  )
}
