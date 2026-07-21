import { configDefaults, defineConfig } from 'vitest/config'
import filterConsole from '../utils/filterConsoleUtils';
const disableFilter = filterConsole(['MODULE_NOT_FOUND']);

export default defineConfig({
  test: {
    globals: true,
    watch: false,

    globalSetup: './config/vitest/vitest.setup.mts',
    coverage: {
      reporter: ['text', 'json', 'html', 'cobertura'],
      exclude: [
        '**/.history/**',
        '**/coverage/**',
        '**/dist/**',
        '**/lib/**',
        '**/app/**',
        '**/config/**',
        '*.config.*',
      ],
    },
    exclude: [...configDefaults.exclude],
  },
})
