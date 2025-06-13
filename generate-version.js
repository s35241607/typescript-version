/* eslint-disable @typescript-eslint/no-var-requires */
// Node.js 腳本允許使用 require 語法
const { writeFileSync } = require('node:fs')
const { join } = require('node:path')
const pkg = require('./package.json')

const versionInfo = {
  version: pkg.version,
  buildTime: new Date().toISOString(),
}

writeFileSync(join(__dirname, 'public', 'version.json'), JSON.stringify(versionInfo, null, 2))
console.log('version.json 已產生:', versionInfo)
