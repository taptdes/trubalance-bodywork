/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config'
import path from 'path'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss(), nodePolyfills()],
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
      '@/components': path.resolve(dirname, 'src/components'),
      '@/lib': path.resolve(dirname, 'src/lib'),
      '@/hooks': path.resolve(dirname, 'src/hooks'),
      '@/styles': path.resolve(dirname, 'src/styles'),
      '@/assets': path.resolve(dirname, 'src/assets'),
      buffer: 'buffer',
    },
  },
  define: {
    global: {},
  },
  envDir: path.resolve(dirname),
  assetsInclude: ['**/*.md'],
  test: {
    name: 'storybook',
    browser: {
      enabled: true,
      headless: true,
      instances: [{ browser: 'chromium' }],
    },
    setupFiles: ['.storybook/vitest.setup.ts'],
  },
})