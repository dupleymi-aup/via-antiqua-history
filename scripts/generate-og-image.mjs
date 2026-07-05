import sharp from 'sharp'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const svgBg = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F7F4EE"/>
      <stop offset="100%" stop-color="#EDE4D4"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
</svg>`)

const icon = readFileSync(resolve(root, 'public', 'logo-512.png'))

const iconResized = await sharp(icon).resize(256, 256).png().toBuffer()

await sharp(svgBg)
  .composite([{ input: iconResized, top: 120, left: 472 }])
  .png()
  .toFile(resolve(root, 'public', 'og-image.png'))

console.warn('Generated public/og-image.png 1200x630')