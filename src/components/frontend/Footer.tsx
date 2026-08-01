'use client'

import React from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin, Heart, ArrowUp } from 'lucide-react'

type FooterColumn = {
  title: string
  links: { label: string; url: string }[]
}

type FooterProps = {
  siteName?: string
  description?: string
  columns?: FooterColumn[]
  socialLinks?: { platform: string; url: string }[]
  contact?: { email?: string; phone?: string; address?: string }
  copyright?: string
}

export function Footer({
  siteName = 'Panti Asuhan Muhammadiyah Asahan',
  description = 'Melayani anak yatim, piatu, fakir miskin, terlantar dengan penuh kasih sayang.',
  columns = [],
  contact,
  copyright,
}: FooterProps) {
  const currentYear = new Date().getFullYear()
  const copyrightText = copyright?.replace('{year}', String(currentYear)) || `© ${currentYear} ${siteName}`

  return (
    <footer>
      {/* Top Bar - White background with logo and info */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-5">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 md:gap-4 shrink-0">
              <img src="/images/logo.png" alt={siteName} className="h-14 md:h-20 w-auto" />
              <div>
                <div className="font-bold text-[#1e3a5f] text-xs sm:text-sm md:text-lg leading-tight uppercase">{siteName}</div>
                {contact?.address && (
                  <p className="text-slate-500 text-[10px] sm:text-xs md:text-sm leading-tight">{contact.address}</p>
                )}
                {contact?.phone && (
                  <p className="text-slate-500 text-[10px] sm:text-xs md:text-sm">Telp. {contact.phone}</p>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section - Dark navy background */}
      <div className="bg-[#1e3a5f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Description */}
            <div>
              <p className="text-sm text-white/70 leading-relaxed mb-4">{description}</p>
              {contact?.email && (
                <a href={`mailto:${contact.email}`} className="flex items-center gap-2.5 text-sm text-white/70 hover:text-white transition-colors">
                  <Mail className="h-4 w-4" />
                  {contact.email}
                </a>
              )}
            </div>

            {/* Link Columns */}
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{column.title}</h3>
                <ul className="space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.url}>
                      <Link href={link.url} className="text-sm text-white/60 hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/50">{copyrightText}</p>
            <p className="text-xs text-white/50 flex items-center gap-1">
              Dibuat dengan <Heart className="h-3 w-3 text-red-400 fill-red-400" /> untuk Panti Asuhan
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-10 h-10 bg-[#1e3a5f] hover:bg-[#162d4a] text-white flex items-center justify-center transition-all z-40 rounded-full shadow-lg"
      >
        <ArrowUp className="h-4 w-4" />
      </button>
    </footer>
  )
}