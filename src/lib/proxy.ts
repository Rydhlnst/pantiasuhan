import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'

/**
 * Server-side admin authentication guard.
 * Use in server components and layouts to protect admin routes.
 *
 * @example
 * // In a server component or layout:
 * import { adminGuard } from '@/lib/proxy'
 *
 * export default async function AdminPage() {
 *   const session = await adminGuard()
 *   // session.isLoggedIn is guaranteed true here
 *   return <div>Admin content</div>
 * }
 */
export async function adminGuard() {
  const session = await getSession()
  if (!session.isLoggedIn) {
    redirect('/admin/login')
  }
  return session
}

/**
 * Server-side auth check without redirect.
 * Returns the session or null if not authenticated.
 * Useful for conditional rendering.
 */
export async function getAdminSession() {
  const session = await getSession()
  if (!session.isLoggedIn) return null
  return session
}