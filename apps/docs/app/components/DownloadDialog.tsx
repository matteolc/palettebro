import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { useContext } from 'react';

import { PaletteContext } from '@palettebruh/theme-toolbar';
import { paletteToCssVars } from '@palettebruh/theme-generator';

export function DownloadDialog() {
  const { palette } = useContext(PaletteContext);

  if (!palette) return null;

  const downloadOptions = [
    {
      id: 'simple',
      label: 'Simple CSS',
      description: 'Basic CSS custom properties',
      preview: `:root {
${Object.entries(paletteToCssVars(palette))
  .map(([key, value]) => `  ${key}: oklch(${value});`)
  .join('\n')}
}`,
    },
    {
      id: 'material',
      label: 'Material UI',
      description: 'Compatible with Material UI theme',
      preview: `const theme = createTheme({
  palette: {
    primary: {
      50: 'oklch(0.97 0.01 0)',
      100: 'oklch(0.93 0.02 0)',
      200: 'oklch(0.89 0.03 0)',
      300: 'oklch(0.85 0.04 0)',
      400: 'oklch(0.81 0.05 0)',
      500: 'oklch(0.77 0.06 0)',
      600: 'oklch(0.73 0.07 0)',
      700: 'oklch(0.69 0.08 0)',
      800: 'oklch(0.65 0.09 0)',
      900: 'oklch(0.61 0.1 0)',
    },
  },
});`,
    },
    {
      id: 'shadcn',
      label: 'shadcn/ui',
      description: 'Compatible with shadcn/ui components',
      preview: `/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'oklch(0.97 0.01 0)',
          100: 'oklch(0.93 0.02 0)',
          200: 'oklch(0.89 0.03 0)',
          300: 'oklch(0.85 0.04 0)',
          400: 'oklch(0.81 0.05 0)',
          500: 'oklch(0.77 0.06 0)',
          600: 'oklch(0.73 0.07 0)',
          700: 'oklch(0.69 0.08 0)',
          800: 'oklch(0.65 0.09 0)',
          900: 'oklch(0.61 0.1 0)',
        },
      },
    },
  },
}`,
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Download</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Download Palette</DialogTitle>
          <DialogDescription>
            Choose a format to download your color palette
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="simple" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            {downloadOptions.map((option) => (
              <TabsTrigger key={option.id} value={option.id}>
                {option.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {downloadOptions.map((option) => (
            <TabsContent key={option.id} value={option.id}>
              <div className="flex flex-col gap-4">
                <p className="text-sm">
                  {option.description}
                </p>
                <ScrollArea className="h-[320px] w-full rounded-md border text-sm">
                  <pre className="p-4">
                    <code>{option.preview}</code>
                  </pre>
                </ScrollArea>
                <Button>Download {option.label}</Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
