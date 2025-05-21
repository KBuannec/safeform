import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    exclude: [...configDefaults.exclude],
    coverage: {
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'], // ← inclut tous les fichiers .ts/.tsx
      exclude: ['src/**/__tests__/*', 'src/main.tsx', 'vite.config.ts'],
      reportsDirectory: './coverage', // ← optionnel, par défaut c'est coverage/
    },
  },
});
