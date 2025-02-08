import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true,
  treeshake: false,
  minify: true,
  sourcemap: true,
  clean: true,
  injectStyle: false,
  esbuildOptions(options) {
    options.tsconfig = 'tsconfig.build.json';
    options.alias = {
      '@': './src',
    };
  },
  external: ['react'],
});
