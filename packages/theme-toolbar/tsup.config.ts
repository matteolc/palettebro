import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  esbuildOptions(options) {
    options.tsconfig = 'tsconfig.build.json';
    options.alias = {
      '@': './src',
    };
  },
  external: [
    'react',
    'react-dom',
    '@radix-ui/*',
    '@remixicon/react',
    '@palettebro/color-picker',
    '@palettebro/theme-generator',
  ],
});
