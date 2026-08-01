import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { r2Storage } from '@payloadcms/storage-r2'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Categories } from './collections/Categories'
import { Santri } from './collections/Santri'
import { Ustadz } from './collections/Ustadz'
import { Kelas } from './collections/Kelas'
import { Asrama } from './collections/Asrama'
import { MataPelajaran } from './collections/MataPelajaran'
import { Ekstrakurikuler } from './collections/Ekstrakurikuler'
import { KalenderAkademik } from './collections/KalenderAkademik'
import { Prestasi } from './collections/Prestasi'
import { Pembayaran } from './collections/Pembayaran'
import { Pendaftaran } from './collections/Pendaftaran'
import { Announcements } from './collections/Announcements'
import { Gallery } from './collections/Gallery'
import { Programs } from './collections/Programs'
import { Testimonials } from './collections/Testimonials'
import { FAQ } from './collections/FAQ'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { Partners } from './collections/Partners'
import { Events } from './collections/Events'
import { Downloads } from './collections/Downloads'
import { Facilities } from './collections/Facilities'
import { Timeline } from './collections/Timeline'
import { Statistics } from './collections/Statistics'

import { Settings } from './globals/Settings'
import { Navigation } from './globals/Navigation'
import { Footer } from './globals/Footer'
import { Homepage } from './globals/Homepage'
import { SocialMedia } from './globals/SocialMedia'
import { DonationSettings } from './globals/DonationSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' | Panti Asuhan Muhammadiyah Asahan',
      description: 'CMS Panti Asuhan Muhammadiyah Asahan',
    },
  },
  collections: [
    Users,
    Media,
    Pages,
    Posts,
    Categories,
    Santri,
    Ustadz,
    Kelas,
    Asrama,
    MataPelajaran,
    Ekstrakurikuler,
    KalenderAkademik,
    Prestasi,
    Pembayaran,
    Pendaftaran,
    Announcements,
    Gallery,
    Programs,
    Testimonials,
    FAQ,
    ContactSubmissions,
    Partners,
    Events,
    Downloads,
    Facilities,
    Timeline,
    Statistics,
  ],
  globals: [
    Settings,
    Navigation,
    Footer,
    Homepage,
    SocialMedia,
    DonationSettings,
  ],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  secret: process.env.PAYLOAD_SECRET || 'default-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  plugins: [
    ...(process.env.R2_ACCOUNT_ID
      ? [
          r2Storage({
            collections: {
              media: true,
            },
            bucket: process.env.R2_BUCKET || 'panti-asuhan-media',
            accountID: process.env.R2_ACCOUNT_ID || '',
            accessKeyID: process.env.R2_ACCESS_KEY_ID || '',
            secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
          }),
        ]
      : []),
  ],
})
