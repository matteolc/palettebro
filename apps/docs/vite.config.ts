import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import globPlugin from 'vite-plugin-glob';
import tsconfigPaths from 'vite-tsconfig-paths';

const isVercel = process.env.VERCEL === '1';

export default defineConfig(({ isSsrBuild, command, mode }) => {
  return {
    plugins: [globPlugin(), tsconfigPaths(), reactRouter()],
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
