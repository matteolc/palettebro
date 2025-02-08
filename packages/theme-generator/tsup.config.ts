import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: ['src/index.ts', 'src/services/index.ts', 'src/palettes/index.ts'],
  outDir: 'dist',
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  treeshake: true,
  minify: true,
  sourcemap: true,
  clean: true,
  noExternal: ['punycode'], // TODO: Remove this?
  esbuildOptions(options) {
    options.tsconfig = 'tsconfig.build.json';
    options.mainFields = ['module', 'main'];
    options.platform = 'neutral';
  },
  ...options,
}));
