import React from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin, Heart } from 'lucide-react'

type FooterColumn = {
  title: string
  links: { label: string; url: string }[]
}

type FooterProps = {
  siteName?: string
  description?: string
  columns?: FooterColumn[]
  socialLinks?: { platform: string; url: string }[]
  contact?: {
    email?: string
    phone?: string
    address?: string
  }
  copyright?: string
}

export function Footer({
  siteName = 'Ponpes Al-Hikmah',
  description = 'Mendidik generasi Qurani yang berakhlak mulia.',
  columns = [],
  socialLinks = [],
  contact,
  copyright,
}: FooterProps) {
  const currentYear = new Date().getFullYear()
  const copyrightText = copyright?.replace('{year}', String(currentYear)) || `© ${currentYear} ${siteName}. All rights reserved.`

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <img src="/images/logo.png" alt={siteName} className="h-10 w-auto" />
              <div>
                <div className="font-bold text-lg">{siteName}</div>
                <div className="text-xs text-slate-400">Mendidik Generasi Qurani</div>
              </div>
            </Link>
            <p className="text-slate-400 text-sm mb-6">{description}</p>
            {contact && (
              <div className="space-y-3 text-sm text-slate-400">
                {contact.address && (
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{contact.address}</span>
                  </div>
                )}
                {contact.phone && (
                  <a href={`tel:${contact.phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
                    <Phone className="h-4 w-4 shrink-0" />
                    {contact.phone}
                  </a>
                )}
                {contact.email && (
                  <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                    <Mail className="h-4 w-4 shrink-0" />
                    {contact.email}
                  </a>
                )}
              </div>
            )}
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="font-semibold mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.url}>
                    <Link
                      href={link.url}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">{copyrightText}</p>
          <p className="text-sm text-slate-400 flex items-center gap-1">
            Dibuat dengan <Heart className="h-4 w-4 text-red-500 fill-red-500" /> untuk Pesantren
          </p>
        </div>
      </div>
    </footer>
  )
}
