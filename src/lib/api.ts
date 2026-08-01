'use client'

import { useEffect, useState, useCallback } from 'react'

type FetchOptions = {
  method?: string
  body?: unknown
  headers?: Record<string, string>
}

export function usePayload() {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const stored = document.cookie
      .split('; ')
      .find((row) => row.startsWith('payload-token='))
      ?.split('=')[1]
    setToken(stored || null)
  }, [])

  const fetchAPI = useCallback(
    async <T = unknown>(endpoint: string, options: FetchOptions = {}): Promise<T> => {
      const { method = 'GET', body, headers = {} } = options

      const res = await fetch(`/api${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `JWT ${token}` } : {}),
          ...headers,
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
      })

      if (!res.ok) {
        throw new Error(`API Error: ${res.status}`)
      }

      return res.json()
    },
    [token]
  )

  return { token, fetchAPI }
}

export async function fetchAPI<T = unknown>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { method = 'GET', body, headers = {} } = options

  const res = await fetch(`/api${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  })

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`)
  }

  return res.json()
}
