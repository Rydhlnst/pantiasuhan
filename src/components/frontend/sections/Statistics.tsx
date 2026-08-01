'use client'

import React from 'react'
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
  layout?: 'grid' | 'carousel' | 'marquee'
  columns?: '2' | '3' | '4'
}

export function Statistics({
  title,
  subtitle,
  stats,
  layout = 'grid',
  columns = '4',
}: StatisticsProps) {
  const columnsClasses = {
    '2': 'grid-cols-2',
    '3': 'grid-cols-2 md:grid-cols-3',
    '4': 'grid-cols-2 md:grid-cols-4',
  }

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className={cn('grid gap-8', columnsClasses[columns])}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-xl shadow-sm"
            >
              <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                {stat.value}
              </div>
              <div className="text-slate-600 font-medium">{stat.label}</div>
              {stat.description && (
                <p className="text-sm text-slate-500 mt-2">{stat.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
