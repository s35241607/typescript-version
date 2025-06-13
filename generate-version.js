// Node.js 腳本使用 ES 模組語法
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 讀取 package.json
const pkg = JSON.parse(readFileSync(join(__dirname, 'package.json'), 'utf-8'))

const versionInfo = {
  version: pkg.version,
  buildTime: new Date().toISOString(),
}

writeFileSync(join(__dirname, 'public', 'version.json'), JSON.stringify(versionInfo, null, 2))
console.log('version.json 已產生:', versionInfo)
