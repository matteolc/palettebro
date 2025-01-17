import { Form, Outlet, useFetcher } from '@remix-run/react';
import type { ComponentType } from 'react';
import {
  PaletteProvider,
  PaletteToolbar,
  PaletteToolbarProvider,
} from '@repo/theme-toolbar';
import type { FormProps as ToolbarFormProps } from '@repo/theme-toolbar/types';
import type { FormProps as RemixFormProps } from '@remix-run/react';
import { NavigationHeader } from '~/components/NavigationHeader';
import { useHints } from '~/hooks/use-hints';

const FormWrapper: ComponentType<ToolbarFormProps> = (props) => {
  return <Form {...(props as unknown as RemixFormProps)} />;
};

export default function Page() {
  const hints = useHints();
  return (
    <PaletteProvider lightOrDark={hints.theme}>
      <div className="min-h-screen flex flex-col">
        <NavigationHeader />
        <main className="w-full max-w-full mx-auto flex-1 flex flex-col mt-20">
          <Outlet />
          <PaletteToolbarProvider>
            <PaletteToolbar FormComponent={FormWrapper} useFetcher={useFetcher} />
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
