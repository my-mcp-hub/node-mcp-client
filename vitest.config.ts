import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  test: {
    globalSetup: ['./vitest.global.ts'],
    coverage: {
      include: ['src/**/*.ts'],
      reporter: ['text', 'lcov', 'html'],
    },
    pool: 'threads',
    maxWorkers: 1,
  },
})
