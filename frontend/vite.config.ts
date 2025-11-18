import { fileURLToPath, URL } from 'node:url'

import { defineConfig, type PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
const plugins: PluginOption[] = [
  vue() as unknown as PluginOption,
  vueDevTools() as unknown as PluginOption,
]

export default defineConfig({
  plugins,
  server: {
    port: 8080,
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
