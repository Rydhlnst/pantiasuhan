'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
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
  overlay = 'dark',
  height = 'large',
  alignment = 'left',
  buttons = [],
}: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const hasSlides = slides && slides.length > 0
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!hasSlides || slides.length <= 1) return
    const timer = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true)
        setCurrentSlide((prev) => (prev + 1) % slides.length)
        setTimeout(() => setIsTransitioning(false), 600)
      }
    }, 6000)
    return () => clearInterval(timer)
  }, [hasSlides, slides?.length, isTransitioning])

  const goToSlide = (index: number) => {
    if (isTransitioning) return
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsTransitioning(true)
    setCurrentSlide(index)
    timeoutRef.current = setTimeout(() => setIsTransitioning(false), 600)
  }

  if (hasSlides) {
    const currentSlideData = slides[currentSlide]
    return (
      <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#1e3a5f]">
        {/* All slide images - preloaded */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={cn(
              'absolute inset-0 bg-cover bg-center transition-all duration-[1.5s]',
              index === currentSlide && !isTransitioning
                ? 'opacity-100 scale-100 z-[1]'
                : index === currentSlide && isTransitioning
                ? 'opacity-0 scale-105 z-[1]'
                : 'opacity-0 scale-100 z-0'
            )}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}

        {/* Dark overlay - subtle for text readability */}
        <div className="absolute inset-0 bg-black/40 z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent z-[2]" />

        {/* Decorative shapes - minimal */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[3]">
          <svg className="absolute bottom-0 left-0 w-full h-32 opacity-20" viewBox="0 0 1440 120" fill="none">
            <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,30 1440,60 L1440,120 L0,120 Z" fill="white" fillOpacity="0.3" />
          </svg>
        </div>

        {/* Content - left aligned */}
        <div className="relative z-10 w-full py-24 md:py-32 lg:py-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <div className={cn(
                "w-12 h-0.5 bg-white/60 mb-6 transition-all duration-700",
                isTransitioning ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
              )} />
              <h1
                key={`title-${currentSlide}`}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-500 mb-4 md:mb-6 tracking-tight drop-shadow-lg hero-fade-up"
              >
                {currentSlideData.title}
              </h1>
              {currentSlideData.subtitle && (
                <p
                  key={`sub-${currentSlide}`}
                  className="text-base md:text-lg lg:text-xl text-white/90 mb-4 drop-shadow hero-fade-up-delay-1"
                >
                  {currentSlideData.subtitle}
                </p>
              )}
              {currentSlideData.description && (
                <p
                  key={`desc-${currentSlide}`}
                  className="text-sm md:text-base text-white/80 mb-8 max-w-xl drop-shadow hero-fade-up-delay-2"
                >
                  {currentSlideData.description}
                </p>
              )}
              {currentSlideData.link && (
                <div
                  key={`btn-${currentSlide}`}
                  className="hero-fade-up-delay-3"
                >
                  <Button asChild size="lg" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30 px-8 h-12 text-sm font-medium tracking-wide group transition-all">
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

        {/* Dots indicator */}
        {slides.length > 1 && (
          <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  'transition-all duration-500 rounded-full',
                  index === currentSlide ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/60'
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
        !backgroundImage && 'bg-[#1e3a5f]'
      )}
    >
      {backgroundImage && (
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }} />
      )}
      {overlay !== 'none' && (
        <div className={cn(
          'absolute inset-0',
          overlay === 'dark' && 'bg-black/40',
          overlay === 'light' && 'bg-white/50',
          overlay === 'gradient' && 'bg-gradient-to-r from-black/50 via-black/20 to-transparent'
        )} />
      )}

      <div className="relative z-10 w-full py-24 md:py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn('max-w-2xl', alignmentClasses[alignment])}>
            <div className={cn("w-12 h-0.5 bg-white/60 mb-6", alignment === 'center' && 'mx-auto', alignment === 'right' && 'ml-auto')} />
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight drop-shadow-lg">
              {title}
            </h1>
            {subtitle && (
              <p className="text-base md:text-lg lg:text-xl text-white/90 mb-8 drop-shadow">
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
                      'px-8 h-12 text-sm font-medium tracking-wide group shadow-lg',
                      button.variant === 'outline'
                        ? 'bg-transparent text-white border border-white/40 hover:bg-white hover:text-[#1e3a5f]'
                        : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/30'
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