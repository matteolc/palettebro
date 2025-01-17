import { Outlet } from '@remix-run/react';
import React from 'react';
import { PaletteProvider } from '@repo/theme-toolbar';

export default function Page() {
  return (
    <React.Suspense fallback={null}>
      <div suppressHydrationWarning>
        <PaletteProvider>
          <Outlet />
        </PaletteProvider>
      </div>
    </React.Suspense>
  );
}
