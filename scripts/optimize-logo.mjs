// Resize/optimize the logo for web without losing visible quality.
//
// The logo renders at ~36px in the navbar/footer and as a favicon, so a
// 1254px source is far larger than needed. We downscale with Lanczos3
// (high-quality resampling) and re-compress the PNG losslessly.
//
// Run:  npm run optimize:logo            (defaults to 256px)
//       npm run optimize:logo -- 320     (custom edge size)
//
// The pristine original is preserved as public/Logo.source.png, and every run
// resizes FROM that source — so repeated runs never compound quality loss.

import sharp from 'sharp'
import { existsSync, copyFileSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const target = join(root, 'public', 'Logo.png')
const source = join(root, 'public', 'Logo.source.png')

const size = Number(process.argv[2]) || 256
const kb = (p) => (statSync(p).size / 1024).toFixed(1)

if (!existsSync(target) && !existsSync(source)) {
  console.error('Error: public/Logo.png not found. Nothing to optimize.')
  process.exit(1)
}

// Preserve the original once, then always work from the pristine source.
if (!existsSync(source)) {
  copyFileSync(target, source)
  console.log(`• Saved pristine original → public/Logo.source.png (${kb(source)} KB)`)
}

const before = kb(source)

await sharp(source)
  .resize(size, size, {
    fit: 'inside', // keep aspect ratio, never enlarge past the source
    withoutEnlargement: true,
    kernel: 'lanczos3',
  })
  .png({ compressionLevel: 9, effort: 10, palette: false }) // full-colour, lossless
  .toFile(target + '.tmp')

// swap tmp → target
copyFileSync(target + '.tmp', target)
const { rmSync } = await import('node:fs')
rmSync(target + '.tmp')

const meta = await sharp(target).metadata()
console.log(
  `✓ Optimized public/Logo.png → ${meta.width}×${meta.height}px, ${before} KB → ${kb(target)} KB`,
)
