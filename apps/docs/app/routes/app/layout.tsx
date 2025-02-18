import { Form, Outlet, useFetcher } from 'react-router';
import type { FormProps as RemixFormProps } from 'react-router';
import {
  KobayashiPaletteContextProvider,
  PaletteProvider,
  PaletteToolbar,
  GenerativePaletteContextProvider,
} from '@palettebro/theme-toolbar';
import type { FormProps as ToolbarFormProps } from '@palettebro/theme-toolbar';
import type { ComponentType } from 'react';
import { NavigationHeader } from '~/components/NavigationHeader';
import { useHints } from '~/hooks/use-hints';
import { themes } from '~/themes';

const FormWrapper: ComponentType<ToolbarFormProps> = (props) => {
  return <Form {...(props as unknown as RemixFormProps)} />;
};

export default function Page() {
  const hints = useHints();
  return (
    <PaletteProvider lightOrDark={hints.theme} themes={themes}>
      <div className="min-h-screen flex flex-col">
        <NavigationHeader />
        <main className="w-full max-w-full mx-auto flex-1 flex flex-col mt-20">
          <Outlet />
          <GenerativePaletteContextProvider>
            <KobayashiPaletteContextProvider>
              <PaletteToolbar
                FormComponent={FormWrapper}
                useFetcher={(options) => {
                  // biome-ignore lint/correctness/useHookAtTopLevel: <explanation>
                  const fetcher = useFetcher(options);
                  return { state: fetcher.state, data: fetcher.data };
                }}
              />
            </KobayashiPaletteContextProvider>
          </GenerativePaletteContextProvider>
        </main>
        <footer className="w-full max-w-7xl mx-auto p-10 flex justify-center">
          <span className="text-sm text-muted-foreground">
            Made with ❤️ by{' '}
            <a href="https://github.com/matteolc/palettebro">matteolc</a>
          </span>
        </footer>
      </div>
    </PaletteProvider>
  );
}
