'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Save, Eye } from 'lucide-react'
import { toast } from 'sonner'
import { RichTextEditor } from '@/components/admin/RichTextEditor'
import { ImageUpload } from '@/components/admin/ImageUpload'

type Category = { id: number; name: string }
type Post = {
  id?: number
  title?: string
  slug?: string
  excerpt?: string
  content?: string
  featuredImageUrl?: string
  categoryId?: number | null
  status?: string
}

export function PostForm({ post, categories }: { post?: Post; categories: Category[] }) {
  const router = useRouter()
  const isEdit = !!post?.id

  const [form, setForm] = useState({
    title: post?.title ?? '',
    slug: post?.slug ?? '',
    excerpt: post?.excerpt ?? '',
    content: post?.content ?? '',
    featuredImageUrl: post?.featuredImageUrl ?? '',
    categoryId: post?.categoryId ?? '',
    status: post?.status ?? 'draft',
  })
  const [saving, setSaving] = useState(false)

  function set(key: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }))
  }

  function autoSlug(title: string) {
    return title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  async function handleSubmit(status: 'draft' | 'published') {
    if (!form.title.trim()) {
      toast.error('Judul wajib diisi')
      return
    }
    setSaving(true)

    const loadingToast = toast.loading(isEdit ? 'Menyimpan perubahan...' : 'Membuat berita...')

    const payload = {
      ...form,
      status,
      categoryId: form.categoryId ? parseInt(form.categoryId as string) : null,
      slug: form.slug || autoSlug(form.title),
    }

    try {
      const res = await fetch(
        isEdit ? `/api/admin/posts/${post!.id}` : '/api/admin/posts',
        {
          method: isEdit ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      )
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Gagal menyimpan')
      }
      toast.success(isEdit ? 'Berita berhasil diupdate!' : 'Berita berhasil dibuat!', { id: loadingToast })
      router.push('/admin/posts')
      router.refresh()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Terjadi kesalahan', { id: loadingToast })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">{isEdit ? 'Edit Berita' : 'Tulis Berita Baru'}</h1>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSubmit('draft')}
            className="flex items-center gap-2 border border-slate-300 hover:bg-slate-50 disabled:opacity-50 px-4 py-2 rounded text-sm font-medium text-slate-700"
          >
            <Save className="h-4 w-4" />
            Simpan Draft
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSubmit('published')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded text-sm font-medium"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Eye className="h-4 w-4" />}
            {saving ? 'Menyimpan...' : 'Publish'}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-slate-200 rounded p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Judul *</label>
              <input
                className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.title}
                onChange={(e) => {
                  const title = e.target.value
                  setForm((f) => ({ ...f, title, slug: f.slug || autoSlug(title) }))
                }}
                placeholder="Judul berita"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Slug URL</label>
              <input
                className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                value={form.slug}
                onChange={set('slug')}
                placeholder="slug-berita-ini"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Ringkasan</label>
              <textarea
                className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                rows={3}
                value={form.excerpt}
                onChange={set('excerpt')}
                placeholder="Ringkasan singkat berita ini"
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded p-5">
            <label className="block text-sm font-medium text-slate-700 mb-2">Konten</label>
            <RichTextEditor
              value={form.content}
              onChange={(html) => setForm((f) => ({ ...f, content: html }))}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
              <select
                className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.categoryId}
                onChange={set('categoryId')}
              >
                <option value="">— Pilih Kategori —</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded p-5">
            <ImageUpload
              label="Gambar Utama"
              value={form.featuredImageUrl}
              onChange={(url) => setForm((f) => ({ ...f, featuredImageUrl: url }))}
            />
          </div>
        </div>
      </div>
    </div>
  )
}