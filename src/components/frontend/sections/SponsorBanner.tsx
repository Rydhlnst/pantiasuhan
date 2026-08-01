'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type SponsorBannerProps = {
  images?: string[]
  whatsappNumber?: string
}

export function SponsorBanner({ images = [], whatsappNumber = '6281362453342' }: SponsorBannerProps) {
  if (images.length === 0) return null

  return (
    <section className="w-full bg-white">
      {images.map((src, index) => (
        <Link
          key={index}
          href={`https://wa.me/${whatsappNumber}?text=Assalamualaikum...saya%20tertarik%20dengan%20CV%20Panti%20Bersinar`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >
          <Image
            src={src}
            alt={`Sponsor ${index + 1}`}
            width={1920}
            height={1080}
            className="w-full h-auto object-contain"
            priority={index === 0}
          />
        </Link>
      ))}
    </section>
  )
}