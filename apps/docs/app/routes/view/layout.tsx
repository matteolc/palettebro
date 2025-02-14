import { Outlet } from 'react-router';
import { PaletteProvider } from '@palettebro/theme-toolbar';
import React from 'react';
import { themes } from '~/themes';

export default function Page() {
  return (
    <React.Suspense fallback={null}>
      <div suppressHydrationWarning>
        <PaletteProvider themes={themes}>
          <Outlet />
        </PaletteProvider>
      </div>
    </React.Suspense>
  );
}
