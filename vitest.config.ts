import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    reporters: ['verbose'],
    clearMocks: true,
    restoreMocks: true,
    testTimeout: 5000,
  },
});
