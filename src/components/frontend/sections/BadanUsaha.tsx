'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type BadanUsahaProps = {
  sponsors?: string[]
  warungImage?: string
  depotImage?: string
  papanBungaImage?: string
  whatsappNumber?: string
}

type SlideData = {
  src: string
  label: string
  href: string
}

export function BadanUsaha({
  sponsors = [],
  warungImage = '/images/panti/warung.jpg',
  depotImage = '/images/panti/depot-air.jpg',
  papanBungaImage = '/images/panti/papan-bunga.jpg',
  whatsappNumber = '6281362453342',
}: BadanUsahaProps) {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const sponsorLabels = [
    'Biro Jasa Pengurusan Pajak, STNK, BPKB, KIR',
    'Biro Jasa Pengurusan Pajak',
  ]

  const slides: SlideData[] = [
    ...sponsors.map((src, i) => ({
      src,
      label: sponsorLabels[i] || `Badan Usaha ${i + 1}`,
      href: `https://wa.me/${whatsappNumber}?text=Assalamualaikum...saya%20tertarik%20dengan%20${encodeURIComponent(sponsorLabels[i] || 'badan usaha panti')}`,
    })),
    ...(warungImage
      ? [
          {
            src: warungImage,
            label: 'Warung Panti',
            href: `https://wa.me/${whatsappNumber}?text=Assalamualaikum...saya%20tertarik%20dengan%20warung%20panti`,
          },
        ]
      : []),
    ...(depotImage
      ? [
          {
            src: depotImage,
            label: 'Depot Air Minum',
            href: `https://wa.me/${whatsappNumber}?text=Assalamualaikum...saya%20tertarik%20dengan%20depot%20air%20minum%20panti`,
          },
        ]
      : []),
    ...(papanBungaImage
      ? [
          {
            src: papanBungaImage,
            label: 'Papan Bunga',
            href: `https://wa.me/${whatsappNumber}?text=Assalamualaikum...saya%20tertarik%20dengan%20papan%20bunga%20panti`,
          },
        ]
      : []),
  ]

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning || slides.length <= 1) return
      setIsTransitioning(true)
      setCurrent(index)
      setTimeout(() => setIsTransitioning(false), 700)
    },
    [isTransitioning, slides.length],
  )

  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true)
        setCurrent((prev) => (prev + 1) % slides.length)
        setTimeout(() => setIsTransitioning(false), 700)
      }
    }, 4000)
    return () => clearInterval(timer)
  }, [slides.length, isTransitioning])

  if (slides.length === 0) return null

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-block bg-[#1e3a5f] text-white text-xs font-semibold px-3 py-1 rounded-none mb-4">
            Badan Usaha
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Badan Usaha Meliputi
          </h2>
          <div className="w-12 h-1 bg-[#1e3a5f] mx-auto mt-3" />
        </div>

        {/* Desktop: full-width premium carousel */}
        <div className="hidden md:block">
          <Link
            href={slides[current].href}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative w-full aspect-[21/10] bg-white shadow-lg overflow-hidden group"
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className={cn(
                  'absolute inset-0 transition-all duration-700 ease-in-out',
                  index === current
                    ? 'opacity-100 scale-100 z-[1]'
                    : 'opacity-0 scale-[1.02] z-0',
                )}
              >
                <Image
                  src={slide.src}
                  alt={slide.label}
                  fill
                  className="object-contain group-hover:scale-[1.01] transition-transform duration-700"
                  sizes="100vw"
                  priority={index === 0}
                />
              </div>
            ))}

            {/* Label badge */}
            <div className="absolute bottom-4 left-4 z-[3]">
              <span className="inline-block bg-[#1e3a5f] text-white text-sm font-semibold px-4 py-2 rounded-none shadow-lg">
                {slides[current].label}
              </span>
            </div>
          </Link>

          {/* Dots */}
          {slides.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className={cn(
                    'transition-all duration-500 rounded-full',
                    index === current
                      ? 'w-8 h-2 bg-[#1e3a5f]'
                      : 'w-2 h-2 bg-slate-300 hover:bg-slate-400',
                  )}
                />
              ))}
            </div>
          )}
        </div>

        {/* Mobile: slide-by-slide */}
        <div className="md:hidden">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="flex-shrink-0 w-full">
                  <Link
                    href={slide.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative aspect-[16/10] bg-white shadow-md overflow-hidden"
                  >
                    <Image
                      src={slide.src}
                      alt={slide.label}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority={index === 0}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                      <span className="inline-block bg-[#1e3a5f] text-white text-xs font-semibold px-3 py-1.5 rounded-none">
                        {slide.label}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile dots */}
          {slides.length > 1 && (
            <div className="flex justify-center gap-2 mt-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className={cn(
                    'transition-all duration-500 rounded-full',
                    index === current
                      ? 'w-6 h-1.5 bg-[#1e3a5f]'
                      : 'w-1.5 h-1.5 bg-slate-300',
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
