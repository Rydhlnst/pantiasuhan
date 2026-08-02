import { db } from '@/db'
import { categories } from '@/db/schema'
import { PostForm } from '../PostForm'
import { adminGuard } from '@/lib/proxy'

export default async function NewPostPage() {
  await adminGuard()
  const cats = await db.select({ id: categories.id, name: categories.name }).from(categories)

  return <PostForm categories={cats} />
}
