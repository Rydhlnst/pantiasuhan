'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'
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
  siteName = 'Ponpes Al-Hikmah',
  logo,
  navigation = [],
  phone,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white shadow-md'
          : 'bg-white/95 backdrop-blur-sm'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-3">
            <img src={logo || '/images/logo.png'} alt={siteName} className="h-10 lg:h-12 w-auto" />
            <div className="hidden sm:block">
              <div className="font-bold text-slate-900 text-lg leading-tight">{siteName}</div>
              <div className="text-xs text-slate-500">Mendidik Generasi Qurani</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div
                key={item.url}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.url}
                  className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-green-600 transition-colors rounded-md hover:bg-green-50 flex items-center gap-1"
                >
                  {item.label}
                  {item.children && item.children.length > 0 && (
                    <ChevronDown className="h-3 w-3" />
                  )}
                </Link>
                {item.children && item.children.length > 0 && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-1">
                    <div className="bg-white rounded-lg shadow-lg border py-2 min-w-[200px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.url}
                          href={child.url}
                          className="block px-4 py-2 text-sm text-slate-600 hover:bg-green-50 hover:text-green-600"
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
            {phone && (
              <a href={`tel:${phone}`} className="flex items-center gap-2 text-sm text-slate-600">
                <Phone className="h-4 w-4" />
                {phone}
              </a>
            )}
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/donasi">Donasi</Link>
            </Button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-slate-600"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <div key={item.url}>
                <Link
                  href={item.url}
                  className="block py-2 text-slate-700 hover:text-green-600 font-medium"
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
                        className="block py-1 text-sm text-slate-500 hover:text-green-600"
                        onClick={() => setIsOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Button asChild className="w-full mt-4 bg-green-600 hover:bg-green-700">
              <Link href="/donasi" onClick={() => setIsOpen(false)}>Donasi</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
