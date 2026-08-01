import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { contactSubmissions } from '@/db/schema'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, phone, subject, message } = body

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'Semua field wajib diisi' }, { status: 400 })
  }

  await db.insert(contactSubmissions).values({ name, email, phone, subject, message })
  return NextResponse.json({ success: true }, { status: 201 })
}
