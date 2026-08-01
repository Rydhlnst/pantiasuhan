'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
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
  const [currentCard, setCurrentCard] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || cards.length <= 1) return
    intervalRef.current = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % cards.length)
    }, 4000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isAutoPlaying, cards.length])

  // Scroll to current card
  useEffect(() => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth
      scrollRef.current.scrollTo({
        left: currentCard * cardWidth,
        behavior: 'smooth'
      })
    }
  }, [currentCard])

  const goToCard = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentCard(index)
    // Resume auto-play after 5 seconds
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const prevCard = () => {
    setIsAutoPlaying(false)
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const nextCard = () => {
    setIsAutoPlaying(false)
    setCurrentCard((prev) => (prev + 1) % cards.length)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[#1e3a5f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 tracking-tight">
            {title}
          </h2>
          <div className="w-12 h-1 bg-white/60 mt-3" />
          {subtitle && <p className="text-white/70 max-w-2xl mt-4">{subtitle}</p>}
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Cards Scroll Container */}
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-4 md:gap-6">
              {cards.map((card, index) => (
                <Link
                  key={index}
                  href={card.link}
                  className="group block flex-none w-[85%] sm:w-[70%] md:w-[45%] lg:w-[30%] snap-start"
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                >
                  <div className="bg-white overflow-hidden transition-all duration-300 hover:shadow-xl h-full">
                    {card.image && (
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-4 md:p-5">
                      <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2 group-hover:text-[#1e3a5f] transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                        {card.description}
                      </p>
                      <span className="text-sm font-medium text-[#1e3a5f] flex items-center gap-1">
                        {card.linkLabel || 'Lihat Detail'}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {cards.length > 1 && (
            <>
              <button
                onClick={prevCard}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 w-10 h-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center text-white transition-all border border-white/20 rounded-full z-10 hidden md:flex"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextCard}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 w-10 h-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center text-white transition-all border border-white/20 rounded-full z-10 hidden md:flex"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {/* Dots Indicator */}
        {cards.length > 1 && (
          <div className="flex justify-center gap-2 mt-6 md:mt-8">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => goToCard(index)}
                className={cn(
                  'transition-all duration-300 rounded-full',
                  index === currentCard
                    ? 'w-8 h-2 bg-white'
                    : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}