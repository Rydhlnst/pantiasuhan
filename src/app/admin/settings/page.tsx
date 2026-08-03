'use client'

import React, { useEffect, useState } from 'react'
import { Loader2, Save } from 'lucide-react'
import { toast } from 'sonner'

type Settings = {
  siteName?: string
  siteDescription?: string
  phone?: string
  email?: string
  address?: string
  whatsapp?: string
  donationInfo?: string
  bankName?: string
  bankAccountNumber?: string
  bankAccountName?: string
}

export default function SettingsPage() {
  const [form, setForm] = useState<Settings>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => {
        if (!r.ok) throw new Error('Gagal memuat')
        return r.json()
      })
      .then((data) => { setForm(data); setLoading(false) })
      .catch(() => {
        toast.error('Gagal memuat pengaturan')
        setLoading(false)
      })
  }, [])

  function set(key: keyof Settings) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const loadingToast = toast.loading('Menyimpan pengaturan...')
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Gagal menyimpan')
      toast.success('Pengaturan berhasil disimpan!', { id: loadingToast })
    } catch {
      toast.error('Gagal menyimpan pengaturan', { id: loadingToast })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-slate-400" /></div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Pengaturan Situs</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Info Dasar */}
        <section className="bg-white border border-slate-200 rounded p-6 space-y-4">
          <h2 className="font-semibold text-slate-800">Informasi Situs</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Nama Situs" value={form.siteName} onChange={set('siteName')} />
            <Field label="Email" value={form.email} onChange={set('email')} type="email" />
          </div>
          <Field label="Deskripsi" value={form.siteDescription} onChange={set('siteDescription')} multiline />
        </section>

        {/* Kontak */}
        <section className="bg-white border border-slate-200 rounded p-6 space-y-4">
          <h2 className="font-semibold text-slate-800">Informasi Kontak</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="No. Telepon" value={form.phone} onChange={set('phone')} placeholder="082175723169" />
            <Field label="WhatsApp (format: 628xxx)" value={form.whatsapp} onChange={set('whatsapp')} placeholder="6282175723169" />
          </div>
          <Field label="Alamat" value={form.address} onChange={set('address')} multiline />
        </section>

        {/* Donasi */}
        <section className="bg-white border border-slate-200 rounded p-6 space-y-4">
          <h2 className="font-semibold text-slate-800">Informasi Donasi</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Nama Bank" value={form.bankName} onChange={set('bankName')} placeholder="Bank BRI" />
            <Field label="No. Rekening" value={form.bankAccountNumber} onChange={set('bankAccountNumber')} />
            <Field label="Atas Nama" value={form.bankAccountName} onChange={set('bankAccountName')} />
          </div>
          <Field label="Info Donasi" value={form.donationInfo} onChange={set('donationInfo')} multiline />
        </section>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-5 py-2 rounded text-sm font-medium transition-colors"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? 'Menyimpan...' : 'Simpan Pengaturan'}
          </button>
        </div>
      </form>
    </div>
  )
}

function Field({
  label, value, onChange, type = 'text', placeholder, multiline
}: {
  label: string
  value?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  type?: string
  placeholder?: string
  multiline?: boolean
}) {
  const cls = "w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      {multiline ? (
        <textarea className={`${cls} min-h-[80px] resize-y`} value={value ?? ''} onChange={onChange} placeholder={placeholder} />
      ) : (
        <input className={cls} type={type} value={value ?? ''} onChange={onChange} placeholder={placeholder} />
      )}
    </div>
  )
}