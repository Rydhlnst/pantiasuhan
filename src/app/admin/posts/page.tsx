import { db } from '@/db'
import { posts, categories } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import Link from 'next/link'
import { Plus, Pencil } from 'lucide-react'
import { DeletePostButton } from './DeletePostButton'
import { adminGuard } from '@/lib/proxy'

export default async function PostsPage() {
  await adminGuard()
  const allPosts = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      status: posts.status,
      publishedAt: posts.publishedAt,
      createdAt: posts.createdAt,
      categoryName: categories.name,
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .orderBy(desc(posts.createdAt))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Berita</h1>
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium"
        >
          <Plus className="h-4 w-4" /> Tulis Berita
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded overflow-hidden">
        {allPosts.length === 0 ? (
          <div className="px-5 py-12 text-center text-sm text-slate-500">
            Belum ada berita.{' '}
            <Link href="/admin/posts/new" className="text-blue-600 underline">Tulis sekarang</Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left px-4 py-3 font-medium text-slate-600">Judul</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden sm:table-cell">Kategori</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Status</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden md:table-cell">Tanggal</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allPosts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-800 line-clamp-1">{p.title}</p>
                    <p className="text-xs text-slate-400">/{p.slug}</p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-slate-500">{p.categoryName ?? '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      p.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {p.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-slate-500">
                    {new Date(p.createdAt).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <Link href={`/admin/posts/${p.id}/edit`} className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded" title="Edit">
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <DeletePostButton id={p.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
