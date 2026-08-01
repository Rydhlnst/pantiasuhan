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
    <section ref={ref} className="py-16 lg:py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && <h2 className="text-3xl md:text-4xl font-semibold text-white mb-3 tracking-tight">{title}</h2>}
            {subtitle && <p className="text-slate-400 max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        )}
        <div className={cn('grid gap-px bg-white/5', columnsClasses[columns])}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className={cn(
                "text-center p-8 bg-slate-950 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl md:text-5xl font-semibold text-white mb-2 tracking-tight">{stat.value}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
