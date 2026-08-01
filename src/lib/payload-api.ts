const PAYLOAD_API_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

type FetchOptions = {
  method?: string
  body?: unknown
  headers?: Record<string, string>
  next?: { revalidate?: number }
}

export async function fetchPayload<T = unknown>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { method = 'GET', body, headers = {}, next } = options

  const res = await fetch(`${PAYLOAD_API_URL}/api${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    ...(next ? { next } : {}),
  })

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`)
  }

  return res.json()
}

// Fetch single global
export async function fetchGlobal<T = unknown>(
  slug: string,
  options?: FetchOptions
): Promise<T> {
  return fetchPayload<T>(`/globals/${slug}`, options)
}

// Fetch collection
export async function fetchCollection<T = unknown>(
  slug: string,
  params?: string,
  options?: FetchOptions
): Promise<{ docs: T[]; totalDocs: number }> {
  const query = params ? `?${params}` : ''
  return fetchPayload<{ docs: T[]; totalDocs: number }>(`/${slug}${query}`, options)
}

// Fetch single document
export async function fetchDoc<T = unknown>(
  collection: string,
  slug: string,
  options?: FetchOptions
): Promise<T> {
  const docs = await fetchCollection<T>(
    collection,
    `where[slug][equals]=${slug}&limit=1`,
    options
  )
  return docs.docs[0]
}

// Helper to get full image URL
export function getMediaUrl(url: string | null | undefined): string {
  if (!url) return '/placeholder.jpg'
  if (url.startsWith('http')) return url
  return `${PAYLOAD_API_URL}${url}`
}
