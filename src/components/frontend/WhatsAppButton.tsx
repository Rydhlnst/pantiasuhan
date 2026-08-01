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
      className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-green-600 hover:bg-green-700 flex items-center justify-center shadow-lg transition-all hover:scale-105"
      aria-label="Chat via WhatsApp"
    >
      <MessageCircle className="h-5 w-5 text-white" />
    </a>
  )
}
