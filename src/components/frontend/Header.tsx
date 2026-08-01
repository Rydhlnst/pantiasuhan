'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Phone, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type NavItem = {
  label: string
  url: string
  children?: { label: string; url: string }[]
}

type HeaderProps = {
  siteName?: string
  logo?: string | null
  navigation?: NavItem[]
  phone?: string
}

export function Header({
  siteName = 'Panti Asuhan Muhammadiyah Asahan',
  logo,
  navigation = [],
  phone,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-white shadow-sm' : 'bg-white'
    )}>
      <div className="bg-sky-500 text-white text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <span>Panti Asuhan Yatim Muhammadiyah Kisaran</span>
          {phone && (
            <a href={`tel:${phone}`} className="flex items-center gap-1 hover:text-sky-100 transition-colors">
              <Phone className="h-3 w-3" />
              {phone}
            </a>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <img src={logo || '/images/logo.png'} alt={siteName} className="h-12 w-auto" />
            <div className="hidden sm:block">
              <div className="font-semibold text-slate-900 text-base">{siteName}</div>
              <div className="text-[10px] text-sky-500 font-medium">Melayani dengan Kasih Sayang</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {navigation.map((item) => (
              <div
                key={item.url}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.url}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1"
                >
                  {item.label}
                  {item.children && item.children.length > 0 && (
                    <ChevronDown className={cn("h-3 w-3 transition-transform", activeDropdown === item.label && "rotate-180")} />
                  )}
                </Link>
                {item.children && item.children.length > 0 && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="bg-white shadow-lg border border-slate-100 py-1.5 min-w-[180px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.url}
                          href={child.url}
                          className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Button asChild className="bg-sky-500 hover:bg-sky-600 text-white px-5 h-9 text-sm">
              <Link href="/donasi">
                <Heart className="h-3.5 w-3.5 mr-1.5" />
                Donasi
              </Link>
            </Button>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-slate-600">
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-1">
            {navigation.map((item) => (
              <div key={item.url}>
                <Link
                  href={item.url}
                  className="block py-2 px-3 text-slate-700 hover:bg-slate-50 text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.url}
                        href={child.url}
                        className="block py-1.5 px-3 text-sm text-slate-500 hover:bg-slate-50"
                        onClick={() => setIsOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Button asChild className="w-full mt-3 bg-sky-500 hover:bg-sky-600">
              <Link href="/donasi" onClick={() => setIsOpen(false)}>Donasi</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
