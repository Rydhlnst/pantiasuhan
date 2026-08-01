import { pgTable, text, timestamp, boolean, integer, serial } from 'drizzle-orm/pg-core'

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  excerpt: text('excerpt'),
  content: text('content'),
  featuredImageUrl: text('featured_image_url'),
  categoryId: integer('category_id').references(() => categories.id),
  status: text('status', { enum: ['draft', 'published'] }).default('draft').notNull(),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const media = pgTable('media', {
  id: serial('id').primaryKey(),
  alt: text('alt').notNull(),
  caption: text('caption'),
  category: text('category').default('general'),
  imageUrl: text('image_url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const siteSettings = pgTable('site_settings', {
  id: integer('id').primaryKey().default(1),
  siteName: text('site_name').default('Panti Asuhan Muhammadiyah Asahan'),
  siteDescription: text('site_description'),
  phone: text('phone'),
  email: text('email'),
  address: text('address'),
  whatsapp: text('whatsapp'),
  donationInfo: text('donation_info'),
  bankName: text('bank_name'),
  bankAccountNumber: text('bank_account_number'),
  bankAccountName: text('bank_account_name'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const faqs = pgTable('faqs', {
  id: serial('id').primaryKey(),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  order: integer('order').default(0),
  status: text('status', { enum: ['draft', 'published'] }).default('published').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const testimonials = pgTable('testimonials', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  role: text('role'),
  content: text('content').notNull(),
  photoUrl: text('photo_url'),
  featured: boolean('featured').default(false),
  order: integer('order').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const contactSubmissions = pgTable('contact_submissions', {
  id: serial('id').primaryKey(),
  name: text('name'),
  email: text('email'),
  phone: text('phone'),
  subject: text('subject'),
  message: text('message'),
  status: text('status', { enum: ['new', 'in_progress', 'resolved'] }).default('new'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type Category = typeof categories.$inferSelect
export type Post = typeof posts.$inferSelect
export type Media = typeof media.$inferSelect
export type SiteSettings = typeof siteSettings.$inferSelect
export type FAQ = typeof faqs.$inferSelect
export type Testimonial = typeof testimonials.$inferSelect
export type ContactSubmission = typeof contactSubmissions.$inferSelect

export type NewPost = typeof posts.$inferInsert
export type NewMedia = typeof media.$inferInsert
