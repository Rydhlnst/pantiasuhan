'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

type Post = {
  title: string
  slug: string
  excerpt?: string
  featuredImage?: string | null
  publishedAt?: string
  category?: { name: string; slug: string }
}

type LatestPostsProps = {
  title?: string
  subtitle?: string
  posts: Post[]
  layout?: 'grid' | 'list'
  viewAllUrl?: string
}

export function LatestPosts({
  title,
  subtitle,
  posts,
  layout = 'grid',
  viewAllUrl = '/news',
}: LatestPostsProps) {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className={cn(
          'grid gap-8',
          layout === 'grid' && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
          layout === 'list' && 'grid-cols-1'
        )}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/news/${post.slug}`}
              className="group block"
            >
              <div className={cn(
                'bg-white rounded-none shadow-sm overflow-hidden hover:shadow-md transition-shadow',
                layout === 'list' && 'flex'
              )}>
                {post.featuredImage && (
                  <div className={cn(
                    'relative overflow-hidden',
                    layout === 'grid' ? 'aspect-[16/10]' : 'w-48 shrink-0'
                  )}>
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  {post.category && (
                    <div className="text-sm text-sky-500 font-medium mb-2">
                      {post.category.name}
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-sky-500 transition-colors">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                  )}
                  {post.publishedAt && (
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Calendar className="h-4 w-4" />
                      {formatDate(post.publishedAt)}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {viewAllUrl && (
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href={viewAllUrl}>
                View All News
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}


