'use client'

import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function DeletePostButton({ id }: { id: number }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('Hapus berita ini?')) return
    await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' })
    router.refresh()
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
