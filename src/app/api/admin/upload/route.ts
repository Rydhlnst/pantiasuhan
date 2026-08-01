import { NextRequest, NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { getSession } from '@/lib/session'

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session.isLoggedIn) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { filename, contentType } = await req.json()
  const ext = filename.split('.').pop()
  const key = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET!,
    Key: key,
    ContentType: contentType,
  })

  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 300 })
  const publicUrl = `${process.env.R2_PUBLIC_ENDPOINT}/${key}`

  return NextResponse.json({ signedUrl, publicUrl, key })
}
