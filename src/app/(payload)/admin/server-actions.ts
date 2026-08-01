'use server'

import { handleServerFunctions as _handleServerFunctions } from '@payloadcms/next/layouts'

export async function handleServerFunctions(
  ...args: Parameters<typeof _handleServerFunctions>
): ReturnType<typeof _handleServerFunctions> {
  return _handleServerFunctions(...args)
}
