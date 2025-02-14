import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/components/ui/*.tsx'],
  outDir: 'dist',
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true,
  treeshake: true,
  minify: true,
  sourcemap: true,
  clean: true,
  esbuildOptions(options) {
    options.tsconfig = 'tsconfig.build.json';
    options.alias = {
      '@': './src',
    };
  },
  external: ['react'],
});
