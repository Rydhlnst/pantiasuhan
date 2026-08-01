import { db } from '@/db'
import { posts, media, contactSubmissions } from '@/db/schema'
import { eq, count } from 'drizzle-orm'
import Link from 'next/link'
import { FileText, Images, MessageSquare, Plus } from 'lucide-react'

export default async function DashboardPage() {
  const [[postCount], [mediaCount], [messageCount]] = await Promise.all([
    db.select({ count: count() }).from(posts),
    db.select({ count: count() }).from(media),
    db.select({ count: count() }).from(contactSubmissions).where(eq(contactSubmissions.status, 'new')),
  ])

  const recentPosts = await db.select({
    id: posts.id,
    title: posts.title,
    status: posts.status,
    createdAt: posts.createdAt,
  }).from(posts).orderBy(posts.createdAt).limit(5)

  const stats = [
    { label: 'Total Berita', value: postCount.count, icon: FileText, href: '/admin/posts', color: 'blue' },
    { label: 'Total Foto', value: mediaCount.count, icon: Images, href: '/admin/gallery', color: 'green' },
    { label: 'Pesan Baru', value: messageCount.count, icon: MessageSquare, href: '#', color: 'orange' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="bg-white border border-slate-200 rounded p-5 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{s.label}</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{s.value}</p>
              </div>
              <div className={`p-3 rounded-full ${
                s.color === 'blue' ? 'bg-blue-50' :
                s.color === 'green' ? 'bg-green-50' : 'bg-orange-50'
              }`}>
                <s.icon className={`h-6 w-6 ${
                  s.color === 'blue' ? 'text-blue-600' :
                  s.color === 'green' ? 'text-green-600' : 'text-orange-600'
                }`} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <h2 className="font-semibold text-slate-800">Berita Terbaru</h2>
          <Link href="/admin/posts/new" className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700">
            <Plus className="h-4 w-4" /> Tambah Berita
          </Link>
        </div>
        {recentPosts.length === 0 ? (
          <div className="px-5 py-8 text-center text-sm text-slate-500">
            Belum ada berita. <Link href="/admin/posts/new" className="text-blue-600 underline">Tambah sekarang</Link>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {recentPosts.map((p) => (
              <li key={p.id} className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="text-sm font-medium text-slate-800">{p.title}</p>
                  <p className="text-xs text-slate-400">{new Date(p.createdAt).toLocaleDateString('id-ID')}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  p.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  {p.status === 'published' ? 'Published' : 'Draft'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
