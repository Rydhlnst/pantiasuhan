'use client'

import React from 'react'
import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative z-10 flex flex-col justify-center px-16">
          <Link href="/" className="inline-flex items-center gap-2 mb-12">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-slate-900 font-bold text-xl">B</span>
            </div>
            <span className="text-white font-semibold text-2xl">Beres CMS</span>
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">
            Premium Headless CMS Platform
          </h1>
          <p className="text-slate-300 text-lg max-w-md">
            Build modern, accessible web platforms for organizations worldwide.
            Manage content with ease.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-white font-semibold">Multi-Template</div>
              <div className="text-slate-300 text-sm">Support for various industries</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-white font-semibold">Page Builder</div>
              <div className="text-slate-300 text-sm">Drag & drop blocks</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-white font-semibold">SEO Optimized</div>
              <div className="text-slate-300 text-sm">Built-in SEO tools</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-white font-semibold">Fast & Secure</div>
              <div className="text-slate-300 text-sm">Enterprise-grade security</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  )
}
