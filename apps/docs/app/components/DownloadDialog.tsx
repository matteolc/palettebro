import { Button } from '@palettebro/shadcn-ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@palettebro/shadcn-ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@palettebro/shadcn-ui/tabs';
import { ScrollArea } from '@palettebro/shadcn-ui/scroll-area';
import { useContext } from 'react';

import { PaletteContext } from '@palettebro/theme-toolbar';
import {
  paletteToCssVars,
  ColorShadesPresetEnum,
} from '@palettebro/theme-generator';
import { getColorUtilities } from '@palettebro/tailwind-theme';

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
      id: 'tailwind',
      label: 'Tailwind CSS',
      description: 'Compatible with Tailwind CSS',
      preview: `/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: ${JSON.stringify(palette, null, 2).replace(/\n/g, '\n        ')}
      }
    }
  }
}`,
    },
    {
      id: 'shadcn',
      label: 'shadcn/ui',
      description: 'Compatible with shadcn/ui components',
      preview: `@layer base {
  :root {
${Object.entries(getColorUtilities(ColorShadesPresetEnum.tailwind))
  .map(([key, value]) => `    --${key}: ${value};`)
  .join('\n')}
  }
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
          <DialogTitle className="text-2xl font-bold">
            Download Palette
          </DialogTitle>
          <DialogDescription className="text-inverse-surface">
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
                <p className="text-sm">{option.description}</p>
                <div className="relative rounded-md border">
                  <ScrollArea className="h-[320px] w-[650px]">
                    <div className="min-w-max">
                      <pre className="p-4">
                        <code className="whitespace-pre font-mono text-sm">
                          {option.preview}
                        </code>
                      </pre>
                    </div>
                  </ScrollArea>
                </div>
                <Button>Download {option.label}</Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
