// Helper script to load .env before running keystone
// Usage: node start.mjs dev | node start.mjs build | node start.mjs start

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { spawn } from 'child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Load .env manually
try {
  const envFile = readFileSync(resolve(__dirname, '.env'), 'utf8')
  for (const line of envFile.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const val = trimmed.slice(eqIdx + 1).trim()
    if (!process.env[key]) process.env[key] = val
  }
  console.log('[start] .env loaded')
} catch {
  console.warn('[start] No .env file found')
}

const command = process.argv[2] || 'dev'
const keystoneBin = resolve(
  __dirname,
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'keystone.cmd' : 'keystone'
)

const child = spawn(keystoneBin, [command], {
  stdio: 'inherit',
  env: process.env,
  shell: true,
})

child.on('exit', (code) => process.exit(code ?? 0))
