'use client'

import React, { useEffect, useState, useRef } from 'react'
import { cn } from '@/lib/utils'

type Statistic = {
  value: string
  label: string
  icon?: string
  description?: string
}

type StatisticsProps = {
  title?: string
  subtitle?: string
  stats: Statistic[]
  columns?: '2' | '3' | '4'
}

export function Statistics({
  title,
  subtitle,
  stats,
  columns = '4',
}: StatisticsProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const columnsClasses = {
    '2': 'grid-cols-2',
    '3': 'grid-cols-2 md:grid-cols-3',
    '4': 'grid-cols-2 md:grid-cols-4',
  }

  return (
    <section ref={ref} className="py-12 md:py-16 lg:py-20 bg-[#1e3a5f] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/5 blur-xl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {(title || subtitle) && (
          <div className="text-center mb-8 md:mb-12">
            {title && <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 tracking-tight">{title}</h2>}
            <div className="w-12 h-1 bg-white/60 mx-auto mt-3" />
            {subtitle && <p className="text-white/70 max-w-2xl mx-auto mt-4">{subtitle}</p>}
          </div>
        )}
        <div className={cn('grid gap-px bg-white/10', columnsClasses[columns])}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className={cn(
                "text-center p-6 md:p-8 bg-[#1e3a5f]/80 backdrop-blur-sm transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight">{stat.value}</div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}