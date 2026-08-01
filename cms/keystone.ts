import { config, list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'
import {
  text,
  password,
  select,
  relationship,
  image,
  timestamp,
  checkbox,
  integer,
} from '@keystone-6/core/fields'
import { document } from '@keystone-6/fields-document'
import { createAuth } from '@keystone-6/auth'
import { statelessSessions } from '@keystone-6/core/session'

// ─── Auth ────────────────────────────────────────────────────────────────────

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  sessionData: 'name role',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    skipKeystoneWelcome: false,
  },
})

const sessionSecret =
  process.env.SESSION_SECRET ?? 'panti-asuhan-cms-dev-secret-ganti-di-production'

const session = statelessSessions({
  maxAge: 60 * 60 * 24 * 30,
  secret: sessionSecret,
})

// ─── Access helpers ───────────────────────────────────────────────────────────

type SessionContext = { session?: { data?: { role?: string } } }

const isAdmin = ({ session }: SessionContext) => session?.data?.role === 'admin'
const isEditor = ({ session }: SessionContext) =>
  ['admin', 'editor'].includes(session?.data?.role ?? '')
const isSignedIn = ({ session }: SessionContext) => !!session?.data

// ─── Config ───────────────────────────────────────────────────────────────────

export default withAuth(
  config({
    db: {
      provider: 'postgresql',
      url: process.env.DATABASE_URL ?? process.env.DATABASE_URI ?? '',
      enableLogging: false,
    },

    server: {
      port: parseInt(process.env.PORT ?? '8000'),
    },

    storage: {
      r2_images: {
        kind: 's3',
        type: 'image',
        bucketName: process.env.R2_BUCKET ?? '',
        region: 'auto',
        accessKeyId: process.env.R2_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? '',
        endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        pathPrefix: 'keystone/images/',
        signed: { expiry: 60 * 60 * 24 * 7 },
      },
    },

    lists: {
      // ─── User ─────────────────────────────────────────────────────────────
      User: list({
        access: {
          operation: {
            query: isSignedIn,
            create: isAdmin,
            update: isAdmin,
            delete: isAdmin,
          },
        },
        ui: {
          label: 'Pengguna',
          listView: { initialColumns: ['name', 'email', 'role'] },
        },
        fields: {
          name: text({ validation: { isRequired: true }, label: 'Nama' }),
          email: text({
            validation: { isRequired: true },
            isIndexed: 'unique',
            label: 'Email',
          }),
          password: password({ validation: { isRequired: true } }),
          role: select({
            label: 'Role',
            options: [
              { label: 'Admin', value: 'admin' },
              { label: 'Editor', value: 'editor' },
            ],
            defaultValue: 'editor',
            ui: { displayMode: 'segmented-control' },
          }),
          createdAt: timestamp({ defaultValue: { kind: 'now' } }),
        },
      }),

      // ─── Post / Berita ────────────────────────────────────────────────────
      Post: list({
        access: {
          operation: {
            query: allowAll,
            create: isEditor,
            update: isEditor,
            delete: isEditor,
          },
        },
        ui: {
          label: 'Berita',
          listView: {
            initialColumns: ['title', 'category', 'status', 'publishedAt'],
          },
        },
        fields: {
          title: text({ validation: { isRequired: true }, label: 'Judul' }),
          slug: text({
            validation: { isRequired: true },
            isIndexed: 'unique',
            label: 'Slug',
            ui: { description: 'URL-friendly, huruf kecil dan tanda hubung. Contoh: berita-terbaru' },
          }),
          excerpt: text({
            label: 'Ringkasan',
            ui: { displayMode: 'textarea' },
          }),
          content: document({
            label: 'Konten',
            formatting: true,
            links: true,
            dividers: true,
            layouts: [[1, 1]],
          }),
          featuredImage: image({ storage: 'r2_images', label: 'Gambar Utama' }),
          category: relationship({ ref: 'Category.posts', many: false, label: 'Kategori' }),
          author: relationship({ ref: 'User', many: false, label: 'Penulis' }),
          status: select({
            label: 'Status',
            options: [
              { label: 'Draft', value: 'draft' },
              { label: 'Published', value: 'published' },
            ],
            defaultValue: 'draft',
            ui: { displayMode: 'segmented-control' },
          }),
          publishedAt: timestamp({ label: 'Tanggal Publish' }),
          createdAt: timestamp({ defaultValue: { kind: 'now' } }),
          updatedAt: timestamp({ db: { updatedAt: true } }),
        },
      }),

      // ─── Category ────────────────────────────────────────────────────────
      Category: list({
        access: {
          operation: {
            query: allowAll,
            create: isEditor,
            update: isEditor,
            delete: isAdmin,
          },
        },
        ui: { label: 'Kategori' },
        fields: {
          name: text({ validation: { isRequired: true }, label: 'Nama' }),
          slug: text({
            validation: { isRequired: true },
            isIndexed: 'unique',
            label: 'Slug',
          }),
          posts: relationship({ ref: 'Post.category', many: true, label: 'Berita' }),
        },
      }),

      // ─── Media / Galeri ───────────────────────────────────────────────────
      Media: list({
        graphql: { plural: 'AllMedia' },
        access: {
          operation: {
            query: allowAll,
            create: isEditor,
            update: isEditor,
            delete: isEditor,
          },
        },
        ui: {
          label: 'Galeri Foto',
          listView: { initialColumns: ['alt', 'category', 'createdAt'] },
        },
        fields: {
          alt: text({ validation: { isRequired: true }, label: 'Keterangan / Alt Text' }),
          caption: text({ label: 'Caption' }),
          category: select({
            label: 'Kategori',
            options: [
              { label: 'Umum', value: 'general' },
              { label: 'Kegiatan', value: 'activities' },
              { label: 'Fasilitas', value: 'facilities' },
              { label: 'Santri', value: 'santri' },
              { label: 'Event', value: 'event' },
            ],
            defaultValue: 'general',
          }),
          image: image({ storage: 'r2_images', label: 'Foto' }),
          createdAt: timestamp({ defaultValue: { kind: 'now' } }),
        },
      }),

      // ─── Testimonial ──────────────────────────────────────────────────────
      Testimonial: list({
        access: {
          operation: {
            query: allowAll,
            create: isEditor,
            update: isEditor,
            delete: isEditor,
          },
        },
        ui: {
          label: 'Testimonial',
          listView: { initialColumns: ['name', 'role', 'featured', 'order'] },
        },
        fields: {
          name: text({ validation: { isRequired: true }, label: 'Nama' }),
          role: text({ label: 'Jabatan / Keterangan' }),
          content: text({
            validation: { isRequired: true },
            label: 'Isi Testimoni',
            ui: { displayMode: 'textarea' },
          }),
          photo: image({ storage: 'r2_images', label: 'Foto' }),
          featured: checkbox({ defaultValue: false, label: 'Tampilkan di Beranda' }),
          order: integer({ defaultValue: 0, label: 'Urutan' }),
          createdAt: timestamp({ defaultValue: { kind: 'now' } }),
        },
      }),

      // ─── FAQ ─────────────────────────────────────────────────────────────
      FAQ: list({
        access: {
          operation: {
            query: allowAll,
            create: isEditor,
            update: isEditor,
            delete: isEditor,
          },
        },
        ui: {
          label: 'FAQ',
          listView: { initialColumns: ['question', 'status', 'order'] },
        },
        fields: {
          question: text({ validation: { isRequired: true }, label: 'Pertanyaan' }),
          answer: text({
            validation: { isRequired: true },
            label: 'Jawaban',
            ui: { displayMode: 'textarea' },
          }),
          order: integer({ defaultValue: 0, label: 'Urutan' }),
          status: select({
            label: 'Status',
            options: [
              { label: 'Published', value: 'published' },
              { label: 'Draft', value: 'draft' },
            ],
            defaultValue: 'published',
            ui: { displayMode: 'segmented-control' },
          }),
          createdAt: timestamp({ defaultValue: { kind: 'now' } }),
        },
      }),

      // ─── Program / Layanan ────────────────────────────────────────────────
      Program: list({
        access: {
          operation: {
            query: allowAll,
            create: isEditor,
            update: isEditor,
            delete: isEditor,
          },
        },
        ui: {
          label: 'Program & Layanan',
          listView: { initialColumns: ['name', 'status', 'order'] },
        },
        fields: {
          name: text({ validation: { isRequired: true }, label: 'Nama Program' }),
          slug: text({
            validation: { isRequired: true },
            isIndexed: 'unique',
            label: 'Slug',
          }),
          description: text({ label: 'Deskripsi', ui: { displayMode: 'textarea' } }),
          icon: text({ label: 'Icon (emoji atau nama icon)' }),
          image: image({ storage: 'r2_images', label: 'Gambar' }),
          status: select({
            label: 'Status',
            options: [
              { label: 'Aktif', value: 'active' },
              { label: 'Tidak Aktif', value: 'inactive' },
            ],
            defaultValue: 'active',
            ui: { displayMode: 'segmented-control' },
          }),
          order: integer({ defaultValue: 0, label: 'Urutan' }),
          createdAt: timestamp({ defaultValue: { kind: 'now' } }),
        },
      }),

      // ─── Announcement / Pengumuman ────────────────────────────────────────
      Announcement: list({
        access: {
          operation: {
            query: allowAll,
            create: isEditor,
            update: isEditor,
            delete: isEditor,
          },
        },
        ui: {
          label: 'Pengumuman',
          listView: { initialColumns: ['title', 'type', 'status', 'publishedAt'] },
        },
        fields: {
          title: text({ validation: { isRequired: true }, label: 'Judul' }),
          content: text({
            validation: { isRequired: true },
            label: 'Isi',
            ui: { displayMode: 'textarea' },
          }),
          type: select({
            label: 'Tipe',
            options: [
              { label: 'Info', value: 'info' },
              { label: 'Peringatan', value: 'warning' },
              { label: 'Sukses', value: 'success' },
            ],
            defaultValue: 'info',
          }),
          status: select({
            label: 'Status',
            options: [
              { label: 'Published', value: 'published' },
              { label: 'Draft', value: 'draft' },
            ],
            defaultValue: 'published',
            ui: { displayMode: 'segmented-control' },
          }),
          publishedAt: timestamp({ defaultValue: { kind: 'now' }, label: 'Tanggal' }),
          createdAt: timestamp({ defaultValue: { kind: 'now' } }),
        },
      }),

      // ─── Statistic / Statistik ────────────────────────────────────────────
      Statistic: list({
        access: {
          operation: {
            query: allowAll,
            create: isEditor,
            update: isEditor,
            delete: isEditor,
          },
        },
        ui: {
          label: 'Statistik',
          listView: { initialColumns: ['label', 'value', 'order'] },
        },
        fields: {
          label: text({ validation: { isRequired: true }, label: 'Label' }),
          value: text({ validation: { isRequired: true }, label: 'Nilai' }),
          icon: text({ label: 'Icon' }),
          order: integer({ defaultValue: 0, label: 'Urutan' }),
          createdAt: timestamp({ defaultValue: { kind: 'now' } }),
        },
      }),

      // ─── Partner / Mitra ──────────────────────────────────────────────────
      Partner: list({
        access: {
          operation: {
            query: allowAll,
            create: isEditor,
            update: isEditor,
            delete: isEditor,
          },
        },
        ui: {
          label: 'Mitra & Donatur',
          listView: { initialColumns: ['name', 'order'] },
        },
        fields: {
          name: text({ validation: { isRequired: true }, label: 'Nama' }),
          logo: image({ storage: 'r2_images', label: 'Logo' }),
          website: text({ label: 'Website' }),
          order: integer({ defaultValue: 0, label: 'Urutan' }),
          createdAt: timestamp({ defaultValue: { kind: 'now' } }),
        },
      }),

      // ─── ContactSubmission / Pesan Masuk ─────────────────────────────────
      ContactSubmission: list({
        access: {
          operation: {
            query: isEditor,
            create: allowAll,
            update: isAdmin,
            delete: isAdmin,
          },
        },
        ui: {
          label: 'Pesan Masuk',
          listView: { initialColumns: ['name', 'email', 'subject', 'createdAt'] },
        },
        fields: {
          name: text({ label: 'Nama' }),
          email: text({ label: 'Email' }),
          phone: text({ label: 'No. HP' }),
          subject: text({ label: 'Subjek' }),
          message: text({ label: 'Pesan', ui: { displayMode: 'textarea' } }),
          status: select({
            label: 'Status',
            options: [
              { label: 'Baru', value: 'new' },
              { label: 'Diproses', value: 'in_progress' },
              { label: 'Selesai', value: 'resolved' },
            ],
            defaultValue: 'new',
          }),
          createdAt: timestamp({ defaultValue: { kind: 'now' } }),
        },
      }),

      // ─── SiteSetting / Pengaturan Situs ───────────────────────────────────
      SiteSetting: list({
        access: {
          operation: {
            query: allowAll,
            create: isAdmin,
            update: isAdmin,
            delete: isAdmin,
          },
        },
        isSingleton: true,
        ui: { label: 'Pengaturan Situs' },
        fields: {
          siteName: text({
            label: 'Nama Situs',
            defaultValue: 'Panti Asuhan Muhammadiyah Asahan',
          }),
          siteDescription: text({
            label: 'Deskripsi Situs',
            ui: { displayMode: 'textarea' },
          }),
          phone: text({ label: 'No. Telepon' }),
          email: text({ label: 'Email' }),
          address: text({ label: 'Alamat', ui: { displayMode: 'textarea' } }),
          whatsapp: text({ label: 'WhatsApp (format: 628xxxx)' }),
          logo: image({ storage: 'r2_images', label: 'Logo Situs' }),
          donationInfo: text({
            label: 'Info Donasi',
            ui: { displayMode: 'textarea' },
          }),
          bankName: text({ label: 'Nama Bank' }),
          bankAccountNumber: text({ label: 'No. Rekening' }),
          bankAccountName: text({ label: 'Nama Pemilik Rekening' }),
        },
      }),
    },

    session,
  })
)
