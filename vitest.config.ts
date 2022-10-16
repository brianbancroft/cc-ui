/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()], // eslint-disable-line
  test: {
    globals: true,
    setupFiles: ['./test/setup.ts'],
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      /**
       * Storybook (specifically the interactions addon) requires that we use their
       *   instrumented version of jest-expect. So our storybook does so. To make
       *   these interactions still work in vitest we have @storybook/jest aliased
       *   to resolve to vitest which, critically, exports { expect } as well.
       */
      '@storybook/jest': 'vitest',
    },
  },
})
