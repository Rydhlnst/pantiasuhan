import { db } from '@/db'
import { categories } from '@/db/schema'
import { PostForm } from '../PostForm'

export default async function NewPostPage() {
  const cats = await db.select({ id: categories.id, name: categories.name }).from(categories)

  return <PostForm categories={cats} />
}
