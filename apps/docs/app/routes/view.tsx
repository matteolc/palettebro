import { Outlet } from '@remix-run/react';
import { PaletteProvider } from '@repo/theme-toolbar';
import React from 'react';

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
