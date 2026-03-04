import { readFileSync } from 'fs'
import { join } from 'path'

const dataDir = join(process.cwd(), 'public', 'data')
const cache = new Map<string, unknown>()

export function loadData(filename: string): unknown {
  if (cache.has(filename)) return cache.get(filename)
  const raw = readFileSync(join(dataDir, filename), 'utf-8')
  const data = JSON.parse(raw)
  cache.set(filename, data)
  return data
}
