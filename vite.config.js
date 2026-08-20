import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { handleContactRequest } from './server/contact-api.mjs'

function contactApi() {
  return {
    name: 'contact-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', (request, response, next) => {
        if (request.method === 'POST') return handleContactRequest(request, response)
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
    base: '/web/',
  plugins: [react(), contactApi()],
    build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
