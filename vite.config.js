import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { writeFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

// Dev-only endpoint: save an exported screen PNG into ./screenshots
function saveScreenshot() {
  return {
    name: 'save-screenshot',
    configureServer(server) {
      server.middlewares.use('/api/save-screenshot', (req, res, next) => {
        if (req.method !== 'POST') return next()
        let body = ''
        req.on('data', (c) => (body += c))
        req.on('end', () => {
          try {
            const { name, dataUrl } = JSON.parse(body)
            const base64 = String(dataUrl).replace(/^data:image\/png;base64,/, '')
            const dir = resolve(process.cwd(), 'screenshots')
            mkdirSync(dir, { recursive: true })
            const safe = String(name).replace(/[^a-zA-Z0-9._-]/g, '_')
            writeFileSync(resolve(dir, safe), Buffer.from(base64, 'base64'))
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: true, file: safe }))
          } catch (err) {
            res.statusCode = 500
            res.end(JSON.stringify({ ok: false, error: String(err) }))
          }
        })
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), saveScreenshot()],
  server: { host: true },
})
