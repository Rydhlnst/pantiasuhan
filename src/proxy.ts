import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import type { AdminSession } from '@/lib/session'
import { sessionOptions } from '@/lib/session'

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (!pathname.startsWith('/admin') || pathname === '/admin/login') {
    return NextResponse.next()
  }

  const res = NextResponse.next()
  const session = await getIronSession<AdminSession>(req, res, sessionOptions)

  if (!session.isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*'],
}
