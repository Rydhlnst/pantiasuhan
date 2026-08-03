// Run: node --env-file=.env scripts/migrate.mjs
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URI)

async function migrate() {
  console.log('Running migrations...')

  await sql`
    CREATE TABLE IF NOT EXISTS categories (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      excerpt TEXT,
      content TEXT,
      featured_image_url TEXT,
      category_id INTEGER REFERENCES categories(id),
      status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
      published_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS media (
      id SERIAL PRIMARY KEY,
      alt TEXT NOT NULL,
      caption TEXT,
      category TEXT DEFAULT 'general',
      image_url TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS site_settings (
      id INTEGER PRIMARY KEY DEFAULT 1,
      site_name TEXT DEFAULT 'Panti Asuhan Muhammadiyah Asahan',
      site_description TEXT,
      phone TEXT,
      email TEXT,
      address TEXT,
      whatsapp TEXT,
      donation_info TEXT,
      bank_name TEXT,
      bank_account_number TEXT,
      bank_account_name TEXT,
      updated_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `

  await sql`
    INSERT INTO site_settings (id, site_name, phone, whatsapp, address, bank_name, bank_account_number, bank_account_name)
    VALUES (
      1,
      'Panti Asuhan Muhammadiyah Asahan',
      '082175723169',
      '6282175723169',
      'Jl. Setia Budi, Kel. Selawan, Kec. Kisaran Timur, Kab. Asahan, Prov. Sumatera Utara',
      'Bank BRI',
      '327101024236534',
      'Panti Asuhan Muhammadiyah Asahan'
    )
    ON CONFLICT (id) DO NOTHING
  `

  await sql`
    CREATE TABLE IF NOT EXISTS faqs (
      id SERIAL PRIMARY KEY,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      "order" INTEGER DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft','published')),
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS testimonials (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT,
      content TEXT NOT NULL,
      photo_url TEXT,
      featured BOOLEAN DEFAULT false,
      "order" INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id SERIAL PRIMARY KEY,
      name TEXT,
      email TEXT,
      phone TEXT,
      subject TEXT,
      message TEXT,
      status TEXT DEFAULT 'new' CHECK (status IN ('new','in_progress','resolved')),
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `

  console.log('✅ Migration complete!')
  process.exit(0)
}

migrate().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
