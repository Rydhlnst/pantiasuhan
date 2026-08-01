'use client'

import React from 'react'
import { MessageCircle } from 'lucide-react'

type WhatsAppButtonProps = {
  phone: string
  message?: string
}

export function WhatsAppButton({ phone, message = 'Assalamualaikum...saya ingin mendapatkan informasi' }: WhatsAppButtonProps) {
  const url = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
      aria-label="Chat via WhatsApp"
    >
      <MessageCircle className="h-7 w-7 text-white" />
    </a>
  )
}
