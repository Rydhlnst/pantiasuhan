/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type { Metadata } from 'next'
import config from '@payload-config'
import { RootLayout } from '@payloadcms/next/layouts'
import React from 'react'
import { importMap } from './importMap'
import { handleServerFunctions } from './server-actions'
import './custom.scss'

type Args = {
  children: React.ReactNode
}

export const generateMetadata = async (): Promise<Metadata> => ({
  title: 'Panti Asuhan Muhammadiyah Asahan - Admin',
})

const Layout = async ({ children }: Args) => {
  return (
    <RootLayout
      config={config}
      importMap={importMap}
      serverFunction={handleServerFunctions}
    >
      {children}
    </RootLayout>
  )
}

export default Layout
