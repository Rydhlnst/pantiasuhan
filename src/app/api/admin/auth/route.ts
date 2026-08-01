import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'admin123'

  if (password !== adminPassword) {
    return NextResponse.json({ error: 'Password salah' }, { status: 401 })
  }

  const session = await getSession()
  session.isLoggedIn = true
  await session.save()

  return NextResponse.json({ success: true })
}

export async function DELETE() {
  const session = await getSession()
  session.destroy()
  return NextResponse.json({ success: true })
}
