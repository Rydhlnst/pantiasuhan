'use client'

import React, { useState } from 'react'
import { Hero } from '@/components/frontend/sections/Hero'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle, Loader2, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function PendaftaranPage() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const [formData, setFormData] = useState({
    studentName: '',
    nisn: '',
    gender: '',
    birthPlace: '',
    birthDate: '',
    address: '',
    previousSchool: '',
    programChoice: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    parentOccupation: '',
    monthlyIncome: '',
    motivation: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/pendaftaran', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to submit')

      setIsSuccess(true)
    } catch {
      alert('Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <>
        <Hero
          title="Pendaftaran Berhasil"
          height="small"
          overlay="dark"
        />
        <section className="py-16 lg:py-24">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Pendaftaran Berhasil!</h2>
            <p className="text-slate-600 mb-8">
              Data pendaftaran Anda telah kami terima. Tim kami akan menghubungi Anda
              dalam 1×24 jam untuk proses selanjutnya.
            </p>
            <div className="bg-slate-50 rounded-xl p-6 text-left mb-8">
              <h3 className="font-semibold mb-4">Yang perlu disiapkan:</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-500" />
                  Fotocopy Ijazah terakhir
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-500" />
                  Fotocopy Akta Kelahiran
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-500" />
                  Fotocopy Kartu Keluarga
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-500" />
                  Pas Foto 3×4 (4 lembar)
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-500" />
                  Surat Keterangan Sehat dari Puskesmas
                </li>
              </ul>
            </div>
            <Button onClick={() => window.location.reload()}>
              Daftar Lagi
            </Button>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <Hero
        title="Pendaftaran Santri Baru"
        subtitle="Daftarkan putra/putri Anda di Pondok Pesantren Al-Hikmah."
        height="medium"
        overlay="dark"
        backgroundImage="/pendaftaran-hero.jpg"
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border p-8">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className={cn('flex items-center gap-2', step >= 1 ? 'text-blue-600' : 'text-slate-400')}>
                <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium', step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200')}>
                  1
                </div>
                <span className="hidden sm:inline text-sm font-medium">Data Santri</span>
              </div>
              <div className="w-12 h-px bg-slate-200" />
              <div className={cn('flex items-center gap-2', step >= 2 ? 'text-blue-600' : 'text-slate-400')}>
                <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium', step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200')}>
                  2
                </div>
                <span className="hidden sm:inline text-sm font-medium">Data Orang Tua</span>
              </div>
              <div className="w-12 h-px bg-slate-200" />
              <div className={cn('flex items-center gap-2', step >= 3 ? 'text-blue-600' : 'text-slate-400')}>
                <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium', step >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-200')}>
                  3
                </div>
                <span className="hidden sm:inline text-sm font-medium">Konfirmasi</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold mb-4">Data Calon Santri</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="studentName">Nama Lengkap *</Label>
                      <Input
                        id="studentName"
                        value={formData.studentName}
                        onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nisn">NISN</Label>
                      <Input
                        id="nisn"
                        value={formData.nisn}
                        onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Jenis Kelamin *</Label>
                      <select
                        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        required
                      >
                        <option value="">Pilih</option>
                        <option value="male">Laki-laki</option>
                        <option value="female">Perempuan</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birthPlace">Tempat Lahir</Label>
                      <Input
                        id="birthPlace"
                        value={formData.birthPlace}
                        onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birthDate">Tanggal Lahir</Label>
                      <Input
                        id="birthDate"
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Alamat Lengkap *</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="previousSchool">Asal Sekolah</Label>
                      <Input
                        id="previousSchool"
                        value={formData.previousSchool}
                        onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Pilihan Program *</Label>
                      <select
                        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                        value={formData.programChoice}
                        onChange={(e) => setFormData({ ...formData, programChoice: e.target.value })}
                        required
                      >
                        <option value="">Pilih Program</option>
                        <option value="tsanawiyah">Tsanawiyah (MTs)</option>
                        <option value="aliyah">Aliyah (MA)</option>
                        <option value="tahfidz">Tahfidz Quran</option>
                        <option value="kitab">Kitab Kuning</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="button" onClick={() => setStep(2)}>
                      Selanjutnya
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold mb-4">Data Orang Tua/Wali</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="parentName">Nama Orang Tua/Wali *</Label>
                      <Input
                        id="parentName"
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parentPhone">No. HP *</Label>
                      <Input
                        id="parentPhone"
                        value={formData.parentPhone}
                        onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="parentEmail">Email</Label>
                      <Input
                        id="parentEmail"
                        type="email"
                        value={formData.parentEmail}
                        onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parentOccupation">Pekerjaan</Label>
                      <Input
                        id="parentOccupation"
                        value={formData.parentOccupation}
                        onChange={(e) => setFormData({ ...formData, parentOccupation: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motivation">Motivasi Masuk Pesantren</Label>
                    <Textarea
                      id="motivation"
                      value={formData.motivation}
                      onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                      placeholder="Ceritakan motivasi Anda memasukkan anak ke pesantren..."
                    />
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setStep(1)}>
                      Kembali
                    </Button>
                    <Button type="button" onClick={() => setStep(3)}>
                      Selanjutnya
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold mb-4">Konfirmasi Data</h3>

                  <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Data Santri</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-slate-500">Nama</div>
                        <div>{formData.studentName || '-'}</div>
                        <div className="text-slate-500">NISN</div>
                        <div>{formData.nisn || '-'}</div>
                        <div className="text-slate-500">Jenis Kelamin</div>
                        <div>{formData.gender === 'male' ? 'Laki-laki' : formData.gender === 'female' ? 'Perempuan' : '-'}</div>
                        <div className="text-slate-500">Program</div>
                        <div>{formData.programChoice || '-'}</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Data Orang Tua</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-slate-500">Nama</div>
                        <div>{formData.parentName || '-'}</div>
                        <div className="text-slate-500">No. HP</div>
                        <div>{formData.parentPhone || '-'}</div>
                        <div className="text-slate-500">Email</div>
                        <div>{formData.parentEmail || '-'}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
                    <strong>Catatan:</strong> Pastikan data yang diisi sudah benar. Tim kami akan
                    menghubungi Anda untuk proses verifikasi dan wawancara.
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setStep(2)}>
                      Kembali
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Mengirim...
                        </>
                      ) : (
                        'Kirim Pendaftaran'
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
