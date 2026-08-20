import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const BASE = process.env.SCREENSHOT_BASE || 'https://ozyma-website.vercel.app'
const OUT = new URL('../docs/screenshots/', import.meta.url)

const pages = [
  { path: '/', name: 'home', fullPage: true },
  { path: '/tools', name: 'tools', fullPage: true },
  { path: '/tools/pranayama', name: 'pranayama', fullPage: true },
  { path: '/therapies', name: 'therapies', fullPage: true },
  { path: '/levels', name: 'levels', fullPage: true },
  { path: '/classes', name: 'classes', fullPage: true },
  { path: '/classes/in-schools', name: 'in-schools', fullPage: true },
  { path: '/ttc', name: 'ttc', fullPage: true },
  { path: '/contact', name: 'contact', fullPage: true },
  { path: '/team', name: 'team', fullPage: true },
  { path: '/about', name: 'about', fullPage: true },
]

await mkdir(OUT, { recursive: true })

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
})
const page = await context.newPage()

for (const entry of pages) {
  const url = `${BASE}${entry.path}`
  console.log(`Capturing ${url}`)
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(1200)
  const file = new URL(`${entry.name}.png`, OUT)
  await page.screenshot({
    path: file.pathname.replace(/^\/([A-Za-z]:)/, '$1'),
    fullPage: entry.fullPage,
  })
  console.log(`Saved ${entry.name}.png`)
}

await browser.close()
console.log('Done')
