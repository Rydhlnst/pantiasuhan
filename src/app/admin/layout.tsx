import { AdminLayout } from '@/components/admin/AdminLayout'
import { Toaster } from 'sonner'

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminLayout>{children}</AdminLayout>
      <Toaster position="top-right" richColors closeButton />
    </>
  )
}