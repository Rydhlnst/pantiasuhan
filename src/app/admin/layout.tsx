import { adminGuard } from '@/lib/proxy'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Toaster } from 'sonner'

export default async function AdminRootLayout({ children }: { children: React.ReactNode }) {
  await adminGuard()
  return (
    <>
      <AdminLayout>{children}</AdminLayout>
      <Toaster position="top-right" richColors closeButton />
    </>
  )
}