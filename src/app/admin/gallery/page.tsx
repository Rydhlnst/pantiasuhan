'use client'

import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { Loader2, Trash2, Upload, X, ZoomIn } from 'lucide-react'
import { toast } from 'sonner'

type MediaItem = {
  id: number
  alt: string
  caption: string | null
  category: string | null
  imageUrl: string
  createdAt: string
}

const CATEGORIES = [
  { value: 'general', label: 'Umum' },
  { value: 'activities', label: 'Kegiatan' },
  { value: 'facilities', label: 'Fasilitas' },
  { value: 'santri', label: 'Santri' },
  { value: 'event', label: 'Event' },
]

export default function GalleryPage() {
  const [items, setItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ alt: '', caption: '', category: 'general' })
  const [previewUrl, setPreviewUrl] = useState('')
  const [pendingFile, setPendingFile] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [zoomImage, setZoomImage] = useState<MediaItem | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  async function loadItems() {
    try {
      const res = await fetch('/api/admin/gallery')
      if (!res.ok) throw new Error('Gagal memuat galeri')
      setItems(await res.json())
    } catch {
      toast.error('Gagal memuat data galeri')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadItems() }, [])

  function handleFileSelect(file: File) {
    if (!file.type.startsWith('image/')) {
      toast.error('File harus berupa gambar')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Ukuran file maksimal 10MB')
      return
    }
    setError('')
    setPendingFile(file)
    setPreviewUrl(URL.createObjectURL(file))
    setShowForm(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!pendingFile || !form.alt) {
      toast.error('Keterangan gambar wajib diisi')
      return
    }
    setUploading(true)
    setError('')

    const loadingToast = toast.loading('Mengupload foto...')

    try {
      const uploadRes = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: pendingFile.name, contentType: pendingFile.type }),
      })
      if (!uploadRes.ok) throw new Error('Gagal mendapatkan upload URL')
      const { signedUrl, publicUrl } = await uploadRes.json()

      const putRes = await fetch(signedUrl, { method: 'PUT', body: pendingFile, headers: { 'Content-Type': pendingFile.type } })
      if (!putRes.ok) throw new Error('Gagal upload file ke server')

      const saveRes = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, imageUrl: publicUrl }),
      })
      if (!saveRes.ok) throw new Error('Gagal menyimpan data foto')

      toast.success('Foto berhasil diupload!', { id: loadingToast })
      setShowForm(false)
      setPendingFile(null)
      setPreviewUrl('')
      setForm({ alt: '', caption: '', category: 'general' })
      await loadItems()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Upload gagal. Coba lagi.', { id: loadingToast })
    } finally {
      setUploading(false)
    }
  }

  async function handleDelete(id: number, alt: string) {
    if (!confirm(`Hapus foto "${alt}"?`)) return
    const loadingToast = toast.loading('Menghapus foto...')
    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      if (!res.ok) throw new Error('Gagal menghapus foto')
      setItems((prev) => prev.filter((i) => i.id !== id))
      toast.success('Foto berhasil dihapus', { id: loadingToast })
    } catch {
      toast.error('Gagal menghapus foto', { id: loadingToast })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Galeri Foto</h1>
        <button
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium"
        >
          <Upload className="h-4 w-4" /> Upload Foto
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileSelect(f); e.target.value = '' }}
      />

      {/* Upload Form */}
      {showForm && (
        <div className="bg-white border border-slate-200 rounded p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800">Detail Foto</h2>
            <button onClick={() => { setShowForm(false); setPendingFile(null); setPreviewUrl('') }}>
              <X className="h-5 w-5 text-slate-400" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-6">
              {previewUrl && (
                <div className="relative w-40 h-32 rounded overflow-hidden border border-slate-200 flex-shrink-0 bg-slate-100">
                  <Image src={previewUrl} alt="preview" fill className="object-contain" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] text-center py-0.5 truncate px-1">
                    {pendingFile?.name}
                  </div>
                </div>
              )}
              <div className="flex-1 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Keterangan / Alt Text *</label>
                  <input
                    className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.alt}
                    onChange={(e) => setForm((f) => ({ ...f, alt: e.target.value }))}
                    placeholder="Deskripsi foto untuk aksesibilitas"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Caption</label>
                    <input
                      className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={form.caption}
                      onChange={(e) => setForm((f) => ({ ...f, caption: e.target.value }))}
                      placeholder="Opsional"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
                    <select
                      className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={form.category}
                      onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    >
                      {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={uploading}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded text-sm font-medium"
              >
                {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
                {uploading ? 'Mengupload...' : 'Simpan Foto'}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setPendingFile(null); setPreviewUrl('') }}
                className="px-4 py-2 border border-slate-300 rounded text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-slate-400" /></div>
      ) : items.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded p-12 text-center">
          <p className="text-slate-500 mb-3">Belum ada foto</p>
          <button onClick={() => inputRef.current?.click()} className="text-blue-600 underline text-sm">Upload foto pertama</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="group relative bg-white border border-slate-200 rounded overflow-hidden">
              <div
                className="relative aspect-square cursor-pointer"
                onClick={() => setZoomImage(item)}
              >
                <Image src={item.imageUrl} alt={item.alt} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <ZoomIn className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow" />
                </div>
              </div>
              <div className="p-2">
                <p className="text-xs font-medium text-slate-700 truncate">{item.alt}</p>
                {item.caption && <p className="text-xs text-slate-400 truncate">{item.caption}</p>}
              </div>
              <button
                onClick={() => handleDelete(item.id, item.alt)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                title="Hapus foto"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Zoom Modal */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setZoomImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setZoomImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-slate-300"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="relative w-full aspect-[4/3]">
              <Image src={zoomImage.imageUrl} alt={zoomImage.alt} fill className="object-contain" />
            </div>
            <div className="mt-2 text-center">
              <p className="text-white text-sm font-medium">{zoomImage.alt}</p>
              {zoomImage.caption && <p className="text-white/70 text-xs">{zoomImage.caption}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}