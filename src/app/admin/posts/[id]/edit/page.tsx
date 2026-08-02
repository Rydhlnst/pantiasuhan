import { db } from '@/db'
import { posts, categories } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { PostForm } from '../../PostForm'
import { adminGuard } from '@/lib/proxy'

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  await adminGuard()
  const { id } = await params
  const postId = parseInt(id)

  const [post, cats] = await Promise.all([
    db.select().from(posts).where(eq(posts.id, postId)).then((r) => r[0]),
    db.select({ id: categories.id, name: categories.name }).from(categories),
  ])

  if (!post) notFound()

  return (
    <PostForm
      post={{
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt ?? '',
        content: post.content ?? '',
        featuredImageUrl: post.featuredImageUrl ?? '',
        categoryId: post.categoryId,
        status: post.status,
      }}
      categories={cats}
    />
  )
}
