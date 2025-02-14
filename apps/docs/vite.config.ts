import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import globPlugin from 'vite-plugin-glob';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcssVite from '@tailwindcss/vite';

export default defineConfig(({ command, mode }) => {
  return {
    plugins: [globPlugin(), tsconfigPaths(), reactRouter(), tailwindcssVite()],
    ssr: {
      noExternal: command === 'build' ? true : undefined,
    },
    resolve: {
      mainFields: ['module', 'browser', 'main'],
    },
    build: {
      minify: true,
    },
  };
});
