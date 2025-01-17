import { Outlet } from '@remix-run/react';
import { PaletteProvider } from '@repo/theme-toolbar';
import { PaletteToolbarProvider } from '~/PaletteToolbarContext';
import { NavigationHeader } from '~/components/NavigationHeader';
import { PaletteToolbar } from '~/components/palette/PaletteToolbar';

export default function Page() {
  return (
    <PaletteProvider>
      <div className="min-h-screen flex flex-col">
        <NavigationHeader />
        <main className="w-full max-w-full mx-auto flex-1 flex flex-col mt-20">
          <Outlet />
          <PaletteToolbarProvider>
            <PaletteToolbar />
          </PaletteToolbarProvider>
        </main>
        <footer className="w-full max-w-7xl mx-auto p-10 flex justify-center">
          <span className="text-sm text-neutral-500">
            Made with ❤️ by <a href="https://github.com/matteolc">matteolc</a>
          </span>
        </footer>
      </div>
    </PaletteProvider>
  );
}
