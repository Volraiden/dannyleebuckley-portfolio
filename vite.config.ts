import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'
// This helper is shared between local Vite dev and Netlify Functions.
// @ts-expect-error No separate type declaration needed for this server-only module.
import { handleChatRequest, handleSubmitBookingRequest } from './netlify/functions/shared.js'

function readRequestBody(req: NodeJS.ReadableStream) {
  return new Promise<string>((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
    })
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })
}

function localFunctionsPlugin(): Plugin {
  return {
    name: 'local-netlify-functions',
    configureServer(server) {
      const env = {
        ...process.env,
        ...loadEnv(server.config.mode, process.cwd(), ''),
      }

      server.middlewares.use('/.netlify/functions/chat', async (req, res) => {
        const result = await handleChatRequest({
          method: req.method ?? 'GET',
          body: await readRequestBody(req),
          env,
        })

        res.statusCode = result.statusCode
        Object.entries(result.headers ?? {}).forEach(([key, value]) => {
          res.setHeader(key, String(value))
        })
        res.end(result.body)
      })

      server.middlewares.use('/.netlify/functions/submit-booking', async (req, res) => {
        const result = await handleSubmitBookingRequest({
          method: req.method ?? 'GET',
          body: await readRequestBody(req),
          env,
        })

        res.statusCode = result.statusCode
        Object.entries(result.headers ?? {}).forEach(([key, value]) => {
          res.setHeader(key, String(value))
        })
        res.end(result.body)
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localFunctionsPlugin()],
})
