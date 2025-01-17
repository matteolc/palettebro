import { vitePlugin as remix } from '@remix-run/dev';
import { vercelPreset } from '@vercel/remix/vite';
import { defineConfig } from 'vite';
import globPlugin from 'vite-plugin-glob';
import tsconfigPaths from 'vite-tsconfig-paths';

const isVercel = process.env.VERCEL === "1";

declare module '@remix-run/node' {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    globPlugin(),
    tsconfigPaths(),
    remix({
      ...isVercel && { presets: [vercelPreset()] },
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
  ],
});
