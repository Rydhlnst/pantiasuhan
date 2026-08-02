'use client'

import React, { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'

type WhatsAppButtonProps = {
  phone: string
  message?: string
}

export function WhatsAppButton({ phone, message = 'Assalamualaikum...saya ingin mendapatkan informasi' }: WhatsAppButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const admins = [
    { name: 'Admin Rini', phone: '6282175723169' },
    { name: 'Admin Aryo', phone: '6281362453342' },
  ]

  function getUrl(adminPhone: string) {
    return `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="flex flex-col gap-2 animate-in slide-in-from-bottom-2 duration-200">
          {admins.map((admin) => (
            <a
              key={admin.phone}
              href={getUrl(admin.phone)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white rounded-full pl-4 pr-5 py-2.5 shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-slate-100"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center shrink-0">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-slate-800">{admin.name}</p>
                <p className="text-xs text-slate-500">{admin.phone}</p>
              </div>
            </a>
          ))}
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105"
        aria-label="Chat via WhatsApp"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </button>
    </div>
  )
}