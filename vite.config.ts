import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
  plugins: [react()],
  // server: {
  //   proxy: {
  //     // Proxy API requests to the dummyjson API during development
  //     '/auth': {
  //       target: 'https://dummyjson.com',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/auth/, '/auth'), // rewrite the path
  //     },
  //   },
  // },
})
