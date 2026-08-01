'use client'

import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function DeletePostButton({ id }: { id: number }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('Hapus berita ini?')) return
    const loadingToast = toast.loading('Menghapus berita...')
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Gagal menghapus')
      toast.success('Berita berhasil dihapus', { id: loadingToast })
      router.refresh()
    } catch {
      toast.error('Gagal menghapus berita', { id: loadingToast })
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded"
      title="Hapus"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  )
}