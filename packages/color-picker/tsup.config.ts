import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entryPoints: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  minify: true,
  treeshake: true,
  sourcemap: true,
  esbuildOptions(options) {
    options.tsconfig = 'tsconfig.build.json';
    options.alias = {
      '~': './src',
    };
  },
  external: ['react'],
  ...options,
}));
