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
    <footer className="bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-5">
              <img src="/images/logo.png" alt={siteName} className="h-12 w-auto" />
              <div>
                <div className="font-semibold text-slate-900">{siteName}</div>
                <div className="text-xs text-blue-600">Melayani dengan Kasih Sayang</div>
              </div>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">{description}</p>
            {contact && (
              <div className="space-y-2.5 text-sm text-slate-500">
                {contact.address && (
                  <div className="flex items-start gap-2.5">
                    <MapPin className="h-4 w-4 mt-0.5 text-slate-400" />
                    <span>{contact.address}</span>
                  </div>
                )}
                {contact.phone && (
                  <a href={`tel:${contact.phone}`} className="flex items-center gap-2.5 hover:text-blue-600 transition-colors">
                    <Phone className="h-4 w-4 text-slate-400" />
                    {contact.phone}
                  </a>
                )}
                {contact.email && (
                  <a href={`mailto:${contact.email}`} className="flex items-center gap-2.5 hover:text-blue-600 transition-colors">
                    <Mail className="h-4 w-4 text-slate-400" />
                    {contact.email}
                  </a>
                )}
              </div>
            )}
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">{column.title}</h3>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.url}>
                    <Link href={link.url} className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400">{copyrightText}</p>
          <p className="text-xs text-slate-400 flex items-center gap-1">
            Dibuat dengan <Heart className="h-3 w-3 text-red-500 fill-red-500" /> untuk Panti Asuhan
          </p>
        </div>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-24 right-6 w-10 h-10 bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center transition-all z-40"
      >
        <ArrowUp className="h-4 w-4" />
      </button>
    </footer>
  )
}
