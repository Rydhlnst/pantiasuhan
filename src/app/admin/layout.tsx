'use client'

import React from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Toaster } from 'sonner'
import { usePathname } from 'next/navigation'

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  if (isLoginPage) {
    return (
      <>
        {children}
        <Toaster position="top-right" richColors closeButton />
      </>
    )
  }

  return (
    <>
      <AdminLayout>{children}</AdminLayout>
      <Toaster position="top-right" richColors closeButton />
    </>
  )
}
