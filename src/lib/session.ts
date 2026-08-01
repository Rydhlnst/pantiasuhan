import { getIronSession, SessionOptions } from 'iron-session'
import { cookies } from 'next/headers'

export type AdminSession = {
  isLoggedIn: boolean
}

export const sessionOptions: SessionOptions = {
  password: process.env.ADMIN_SESSION_SECRET ?? 'panti-asuhan-session-secret-min-32-chars!!',
  cookieName: 'admin_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
}

export async function getSession() {
  const cookieStore = await cookies()
  return getIronSession<AdminSession>(cookieStore, sessionOptions)
}
