'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

type GalleryImage = {
  src: string
  alt: string
  caption?: string
}

type GalleryProps = {
  title?: string
  subtitle?: string
  images: GalleryImage[]
  layout?: 'grid' | 'masonry' | 'carousel' | 'lightbox'
  columns?: '2' | '3' | '4'
}

export function Gallery({
  title,
  subtitle,
  images,
  layout = 'grid',
  columns = '3',
}: GalleryProps) {
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null)

  const columnsClasses = {
    '2': 'grid-cols-1 md:grid-cols-2',
    '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className={cn('grid gap-4', columnsClasses[columns])}>
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-none group cursor-pointer"
              onClick={() => layout === 'lightbox' && setLightboxImage(image)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {image.caption && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-sm">
                    {image.caption}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {layout === 'lightbox' && lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 text-white hover:text-white/80"
          >
            <X className="h-8 w-8" />
          </button>
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full">
            <Image
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              fill
              className="object-contain"
            />
            {lightboxImage.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 text-white text-center">
                {lightboxImage.caption}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}


