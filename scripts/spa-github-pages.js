import { copyFileSync } from 'node:fs'

// GitHub Pages serves 404.html for unknown paths — copy index so SPA routes work.
copyFileSync('dist/index.html', 'dist/404.html')
console.log('Created dist/404.html for GitHub Pages SPA routing')
