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
  //     '/echo/post/json': {
  //       target: 'https://reqbin.com',
  //       changeOrigin: true,
  //       secure: false,
  //       rewrite: (path) => path.replace(/^\/echo\/post\/json/, '/echo/post/json'),
  //     }
  //   },
  //   cors: false
  // }
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
  server: {
    proxy: {
      '/api': {
        target: 'https://jsonplaceholder.typicode.com',
        changeOrigin: true,  // Needed to mask the origin to the target server
        secure: true,        // Should be true for https connections
        // rewrite: (path) => path.replace(/^\/api/, '/echo/post/json'),  // Proxy to reqbin endpoint
        rewrite: (path) => path.replace(/^\/api/, '/posts'),
      }
    }
  }
})
