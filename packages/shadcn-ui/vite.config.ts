import { defineConfig } from 'vite';
import globPlugin from 'vite-plugin-glob';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path';

export default defineConfig({
    plugins: [tailwindcss(), globPlugin(), tsconfigPaths()],
    resolve: {
      mainFields: ['module', 'browser', 'main'],
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },      
    },
    build: {
      minify: true,
    },
});
