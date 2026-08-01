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

type GalleryMasonryProps = {
  title?: string
  subtitle?: string
  images: GalleryImage[]
  columns?: '2' | '3' | '4'
}

export function GalleryMasonry({
  title,
  subtitle,
  images,
  columns = '3',
}: GalleryMasonryProps) {
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null)

  const columnsClasses = {
    '2': 'columns-1 md:columns-2',
    '3': 'columns-1 md:columns-2 lg:columns-3',
    '4': 'columns-1 md:columns-2 lg:columns-3 xl:columns-4',
  }

  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="text-center mb-8">
            {title && (
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{title}</h2>
            )}
            {subtitle && (
              <p className="text-slate-600">{subtitle}</p>
            )}
          </div>
        )}

        <div className={cn('gap-4 space-y-4', columnsClasses[columns])}>
          {images.map((image, index) => (
            <div
              key={index}
              className="break-inside-avoid cursor-pointer group"
              onClick={() => setLightboxImage(image)}
            >
              <div className="relative overflow-hidden rounded-none">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {image.caption && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-sm font-medium">
                      {image.caption}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 text-white hover:text-white/80 z-10"
          >
            <X className="h-8 w-8" />
          </button>
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
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


