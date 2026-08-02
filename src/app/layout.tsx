import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Panti Asuhan Muhammadiyah Asahan',
    template: '%s | Panti Asuhan Muhammadiyah Asahan',
  },
  description: 'Panti Asuhan Anak Yatim Putra/Putri Muhammadiyah Kisaran - Asahan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body suppressHydrationWarning className="bg-background text-foreground font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
