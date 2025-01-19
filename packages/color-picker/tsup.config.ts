import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entryPoints: ['src/**/*.tsx', 'src/**/*.ts'],
  exclude: ['src/__tests__'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  external: ['react'],
  ...options,
}));
