'use client'

import React, { useState, useEffect, useRef } from 'react'
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

  const prevSlide = () => {
    if (!hasSlides || isTransitioning) return
    goToSlide((currentSlide - 1 + slides.length) % slides.length)
  }

  const nextSlide = () => {
    if (!hasSlides || isTransitioning) return
    goToSlide((currentSlide + 1) % slides.length)
  }

  if (hasSlides) {
    const currentSlideData = slides[currentSlide]
    return (
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-sky-50">
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

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/70 via-blue-400/50 to-cyan-400/40 z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent z-[2]" />

        {/* Decorative shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[3]">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-sky-300/20 blur-2xl animate-pulse" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-cyan-300/25 blur-xl" />
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-yellow-300/15 blur-lg" />
          <svg className="absolute bottom-0 left-0 w-full h-32 opacity-30" viewBox="0 0 1440 120" fill="none">
            <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,30 1440,60 L1440,120 L0,120 Z" fill="white" fillOpacity="0.3" />
          </svg>
          <div className="absolute top-20 right-1/4 w-3 h-3 rounded-full bg-yellow-400/40" />
          <div className="absolute top-1/3 right-16 w-2 h-2 rounded-full bg-sky-300/50" />
          <div className="absolute bottom-1/3 left-20 w-4 h-4 rounded-full bg-cyan-300/30" />
          <svg className="absolute top-0 left-0 w-48 h-48 opacity-20" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="1" strokeDasharray="8 4" />
            <circle cx="100" cy="100" r="50" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full py-32 lg:py-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className={cn(
                "w-12 h-0.5 bg-white/60 mx-auto mb-8 transition-all duration-700",
                isTransitioning ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
              )} />
              <h1
                key={`title-${currentSlide}`}
                className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 tracking-tight drop-shadow-lg hero-fade-up"
              >
                {currentSlideData.title}
              </h1>
              {currentSlideData.subtitle && (
                <p
                  key={`sub-${currentSlide}`}
                  className="text-lg md:text-xl text-white/90 mb-4 drop-shadow hero-fade-up-delay-1"
                >
                  {currentSlideData.subtitle}
                </p>
              )}
              {currentSlideData.description && (
                <p
                  key={`desc-${currentSlide}`}
                  className="text-base text-white/80 mb-10 max-w-xl mx-auto drop-shadow hero-fade-up-delay-2"
                >
                  {currentSlideData.description}
                </p>
              )}
              {currentSlideData.link && (
                <div
                  key={`btn-${currentSlide}`}
                  className="hero-fade-up-delay-3"
                >
                  <Button asChild size="lg" className="bg-sky-500 hover:bg-sky-600 text-white px-8 h-12 text-sm font-medium tracking-wide group shadow-lg shadow-sky-500/30">
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

        {/* Navigation arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center text-white transition-all border border-white/20 rounded-full z-10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center text-white transition-all border border-white/20 rounded-full z-10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Dots indicator */}
        {slides.length > 1 && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  'transition-all duration-500 rounded-full',
                  index === currentSlide ? 'w-8 h-2 bg-sky-400' : 'w-2 h-2 bg-white/40 hover:bg-white/60'
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
        !backgroundImage && 'bg-sky-50'
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
          overlay === 'gradient' && 'bg-gradient-to-br from-sky-500/60 via-blue-400/40 to-cyan-400/30'
        )} />
      )}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-sky-300/20 blur-2xl" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-cyan-300/25 blur-xl" />
        <svg className="absolute top-0 left-0 w-48 h-48 opacity-20" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="1" strokeDasharray="8 4" />
        </svg>
      </div>

      <div className="relative z-10 w-full py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn('max-w-3xl mx-auto', alignmentClasses[alignment])}>
            <div className="w-12 h-0.5 bg-white/60 mb-8 mx-auto" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 tracking-tight drop-shadow-lg">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg md:text-xl text-white/90 mb-10 drop-shadow">
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
                        ? 'bg-transparent text-white border border-white/40 hover:bg-white hover:text-sky-600'
                        : 'bg-sky-500 text-white hover:bg-sky-600 shadow-sky-500/30'
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