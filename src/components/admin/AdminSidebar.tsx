'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: '📊' },
  { label: 'Content', href: '/admin/collections/pages', icon: '📄', children: [
    { label: 'Pages', href: '/admin/collections/pages' },
    { label: 'Posts', href: '/admin/collections/posts' },
    { label: 'Categories', href: '/admin/collections/categories' },
  ]},
  { label: 'Media', href: '/admin/collections/media', icon: '🖼️' },
  { label: 'Modules', href: '/admin/collections/announcements', icon: '📦', children: [
    { label: 'Announcements', href: '/admin/collections/announcements' },
    { label: 'Gallery', href: '/admin/collections/gallery' },
    { label: 'Programs', href: '/admin/collections/programs' },
    { label: 'Testimonials', href: '/admin/collections/testimonials' },
    { label: 'FAQ', href: '/admin/collections/faq' },
    { label: 'Events', href: '/admin/collections/events' },
    { label: 'Downloads', href: '/admin/collections/downloads' },
  ]},
  { label: 'People', href: '/admin/collections/users', icon: '👥', children: [
    { label: 'Users', href: '/admin/collections/users' },
    { label: 'Staff', href: '/admin/collections/staff' },
    { label: 'Volunteers', href: '/admin/collections/volunteers' },
    { label: 'Partners', href: '/admin/collections/partners' },
  ]},
  { label: 'More', href: '/admin/collections/children-stories', icon: '📋', children: [
    { label: 'Children Stories', href: '/admin/collections/children-stories' },
    { label: 'Facilities', href: '/admin/collections/facilities' },
    { label: 'Timeline', href: '/admin/collections/timeline' },
    { label: 'Statistics', href: '/admin/collections/statistics' },
    { label: 'Donation Info', href: '/admin/collections/donation-information' },
    { label: 'Messages', href: '/admin/collections/contact-submissions' },
  ]},
  { label: 'Settings', href: '/admin/globals/settings', icon: '⚙️', children: [
    { label: 'Website Settings', href: '/admin/globals/settings' },
    { label: 'Navigation', href: '/admin/globals/navigation' },
    { label: 'Footer', href: '/admin/globals/footer' },
    { label: 'Homepage', href: '/admin/globals/homepage' },
    { label: 'Social Media', href: '/admin/globals/social-media' },
    { label: 'Donation Settings', href: '/admin/globals/donation-settings' },
  ]},
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen">
      <div className="p-4">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-slate-900 font-bold">B</span>
          </div>
          <span className="font-semibold">Beres CMS</span>
        </Link>
      </div>
      <nav className="mt-4">
        {navItems.map((item) => (
          <div key={item.href}>
            <Link
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-2 text-sm transition-colors',
                pathname === item.href
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              )}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
            {item.children && (
              <div className="ml-6">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={cn(
                      'block px-4 py-1.5 text-sm transition-colors',
                      pathname === child.href
                        ? 'text-white'
                        : 'text-slate-400 hover:text-white'
                    )}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}
