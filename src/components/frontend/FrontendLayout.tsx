import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

type FrontendLayoutProps = {
  children: React.ReactNode
  siteName?: string
  logo?: string | null
  navigation?: { label: string; url: string; children?: { label: string; url: string }[] }[]
  footer?: {
    columns?: { title: string; links: { label: string; url: string }[] }[]
    socialLinks?: { platform: string; url: string }[]
    copyright?: string
  }
  contact?: {
    email?: string
    phone?: string
    address?: string
  }
}

export function FrontendLayout({
  children,
  siteName = 'Beres CMS',
  logo,
  navigation = [],
  footer,
  contact,
}: FrontendLayoutProps) {
  return (
    <div className="frontend-root min-h-screen flex flex-col">
      <Header siteName={siteName} logo={logo} navigation={navigation} phone={contact?.phone} address={contact?.address} />
      <main className="flex-1 pt-[100px] lg:pt-[110px]">{children}</main>
      <Footer
        siteName={siteName}
        columns={footer?.columns}
        socialLinks={footer?.socialLinks}
        contact={contact}
        copyright={footer?.copyright}
      />
    </div>
  )
}

