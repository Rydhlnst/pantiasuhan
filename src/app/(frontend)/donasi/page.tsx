'use client'

import React, { useState } from 'react'
import { Hero } from '@/components/frontend/sections/Hero'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Heart, CreditCard, Building, CheckCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type DonationMethod = 'bank' | 'ewallet' | 'qris'

export default function DonasiPage() {
  const [amount, setAmount] = useState<number>(100000)
  const [customAmount, setCustomAmount] = useState('')
  const [selectedMethod, setSelectedMethod] = useState<DonationMethod>('bank')
  const [donorName, setDonorName] = useState('')
  const [donorPhone, setDonorPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const presetAmounts = [50000, 100000, 250000, 500000, 1000000]

  const handleAmountSelect = (value: number) => {
    setAmount(value)
    setCustomAmount('')
  }

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value)
    setAmount(parseInt(value) || 0)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSuccess(true)
    setIsSubmitting(false)
  }

  if (isSuccess) {
    return (
      <>
        <Hero title="Terima Kasih" height="small" overlay="dark" />
        <section className="py-16 lg:py-24">
          <div className="max-w-2xl mx-auto mx-auto px-4 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-none flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Donasi Diterima!</h2>
            <p className="text-slate-600 mb-8">
              Terima kasih atas donasi Anda sebesar {formatCurrency(amount)}.
              Semoga menjadi amal jariyah.
            </p>
            <Button onClick={() => setIsSuccess(false)}>Donasi Lagi</Button>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <Hero
        title="Donasi"
        subtitle="Bantu kami mewujudkan kesejahteraan sosial anak yatim."
        height="medium"
        overlay="dark"
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Formulir Donasi</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-4 block">Pilih Nominal</Label>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {presetAmounts.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => handleAmountSelect(preset)}
                        className={cn(
                          'p-3 rounded-none border-2 text-center transition-all',
                          amount === preset && !customAmount
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-slate-200 hover:border-slate-300'
                        )}
                      >
                        {formatCurrency(preset)}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">Rp</span>
                    <Input
                      type="number"
                      placeholder="Nominal custom"
                      value={customAmount}
                      onChange={(e) => handleCustomAmount(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium mb-4 block">Cara Donasi</Label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedMethod('bank')}
                      className={cn(
                        'p-4 rounded-none border-2 text-center transition-all',
                        selectedMethod === 'bank'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-slate-200 hover:border-slate-300'
                      )}
                    >
                      <Building className="h-6 w-6 mx-auto mb-2" />
                      <span className="text-sm font-medium">Transfer Bank</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-medium">Data Diri (Opsional)</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama</Label>
                      <Input id="name" value={donorName} onChange={(e) => setDonorName(e.target.value)} placeholder="Nama Anda" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">No. HP</Label>
                      <Input id="phone" value={donorPhone} onChange={(e) => setDonorPhone(e.target.value)} placeholder="Untuk konfirmasi" />
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting || amount <= 0}>
                  {isSubmitting ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Memproses...</>
                  ) : (
                    <><Heart className="mr-2 h-5 w-5" /> Donasi {formatCurrency(amount)}</>
                  )}
                </Button>
              </form>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-slate-50 rounded-none p-6 sticky top-24">
                <h3 className="font-semibold text-slate-900 mb-4">Rekening Donasi</h3>

                <div className="bg-white rounded-none p-4 mb-4">
                  <p className="font-bold text-slate-900">Bank BNI</p>
                  <p className="text-lg font-bold text-slate-900">3271 0102 4236 534</p>
                  <p className="text-sm text-slate-500">a.n. Panti Asuhan Muhammadiyah Asahan</p>
                </div>

                <div className="text-sm text-slate-600 space-y-2">
                  <p><strong>Cara donasi:</strong></p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Transfer ke rekening di atas</li>
                    <li>Screenshot bukti transfer</li>
                    <li>Kirim ke Admin Rini: 082175723169</li>
                    <li>Konfirmasi akan kami kirimkan</li>
                  </ol>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200">
                  <h4 className="font-medium text-slate-900 mb-2">Atau Datang Langsung</h4>
                  <p className="text-sm text-slate-600">
                    Jl. Setia Budi, Kel. Selawan, Kec. Kisaran Timur, Kab. Asahan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}



