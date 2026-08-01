'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Users, Image, MessageSquare, Megaphone, ArrowRight } from 'lucide-react'

type DashboardStats = {
  pages: number
  posts: number
  media: number
  users: number
  contactSubmissions: number
  announcements: number
}

export function DashboardView() {
  const [stats, setStats] = useState<DashboardStats>({
    pages: 0,
    posts: 0,
    media: 0,
    users: 0,
    contactSubmissions: 0,
    announcements: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const endpoints = [
          '/api/pages?limit=0',
          '/api/posts?limit=0',
          '/api/media?limit=0',
          '/api/users?limit=0',
          '/api/contact-submissions?limit=0',
          '/api/announcements?limit=0',
        ]

        const responses = await Promise.all(
          endpoints.map((url) => fetch(url).then((r) => r.json()))
        )

        setStats({
          pages: responses[0].totalDocs || 0,
          posts: responses[1].totalDocs || 0,
          media: responses[2].totalDocs || 0,
          users: responses[3].totalDocs || 0,
          contactSubmissions: responses[4].totalDocs || 0,
          announcements: responses[5].totalDocs || 0,
        })
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: 'Pages',
      value: stats.pages,
      icon: FileText,
      href: '/admin/collections/pages',
      color: 'bg-blue-500',
    },
    {
      title: 'Posts',
      value: stats.posts,
      icon: FileText,
      href: '/admin/collections/posts',
      color: 'bg-green-500',
    },
    {
      title: 'Media',
      value: stats.media,
      icon: Image,
      href: '/admin/collections/media',
      color: 'bg-purple-500',
    },
    {
      title: 'Users',
      value: stats.users,
      icon: Users,
      href: '/admin/collections/users',
      color: 'bg-orange-500',
    },
    {
      title: 'Messages',
      value: stats.contactSubmissions,
      icon: MessageSquare,
      href: '/admin/collections/contact-submissions',
      color: 'bg-red-500',
    },
    {
      title: 'Announcements',
      value: stats.announcements,
      icon: Megaphone,
      href: '/admin/collections/announcements',
      color: 'bg-cyan-500',
    },
  ]

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome to Beres CMS Admin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {statCards.map((card) => (
          <Link key={card.title} href={card.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  {card.title}
                </CardTitle>
                <div className={`${card.color} p-2 rounded-lg`}>
                  <card.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? '...' : card.value}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link
              href="/admin/collections/pages/create"
              className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <span className="text-sm font-medium">Create New Page</span>
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </Link>
            <Link
              href="/admin/collections/posts/create"
              className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <span className="text-sm font-medium">Create New Post</span>
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </Link>
            <Link
              href="/admin/collections/media"
              className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <span className="text-sm font-medium">Upload Media</span>
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </Link>
            <Link
              href="/admin/globals/settings"
              className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <span className="text-sm font-medium">Website Settings</span>
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </Link>
            <Link
              href="/admin/globals/navigation"
              className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <span className="text-sm font-medium">Manage Navigation</span>
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest changes in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <div className="flex-1">
                  <p className="text-sm">System initialized</p>
                  <p className="text-xs text-slate-400">Just now</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <div className="flex-1">
                  <p className="text-sm">Admin user created</p>
                  <p className="text-xs text-slate-400">Just now</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <div className="flex-1">
                  <p className="text-sm">Database configured</p>
                  <p className="text-xs text-slate-400">Just now</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
