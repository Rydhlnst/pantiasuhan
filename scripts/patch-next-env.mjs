/**
 * Patches @next/env@16.x to add a .default export so that Payload's
 * ESM import `import nextEnvImport from '@next/env'` doesn't get undefined.
 *
 * Root cause: @next/env@16 sets __esModule:true but has no .default property.
 * tsx's CJS interop then resolves the default import as undefined.
 */
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

let nextEnvPath
try {
  nextEnvPath = require.resolve('@next/env')
} catch {
  console.log('[patch-next-env] @next/env not found, skipping patch.')
  process.exit(0)
}

const content = readFileSync(nextEnvPath, 'utf8')
const patch = '\nif(typeof module!=="undefined"&&module.exports&&module.exports.__esModule&&!module.exports.default){module.exports.default=module.exports;}\n'

if (content.includes('module.exports.default=module.exports')) {
  console.log('[patch-next-env] Already patched, skipping.')
  process.exit(0)
}

writeFileSync(nextEnvPath, content + patch, 'utf8')
console.log('[patch-next-env] Patched', nextEnvPath)
