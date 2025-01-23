import { RiEqualizerLine } from '@remixicon/react';
import { ThemeVariantEnum } from '@palettebro/theme-generator/types';
import { useContext } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import { DynamicPaletteSettings } from './DynamicPaletteSettings';
import { PaletteContext } from '@/context/PaletteContext';
import { StaticPaletteSettings } from './StaticPaletteSettings';
import { MuiPaletteSettings } from './MuiPaletteSettings';
import { KobayashiPaletteSettings } from './KobayashiPaletteSettings';

const PALETTE_TABS = [
  {
    value: ThemeVariantEnum.static,
    label: 'Simple',
    content: <StaticPaletteSettings />,
  },
  {
    value: ThemeVariantEnum.mui,
    label: 'Material UI',
    content: <MuiPaletteSettings />,
  },
  {
    value: ThemeVariantEnum.dynamic,
    label: 'Generative',
    content: <DynamicPaletteSettings />,
  },
  {
    value: ThemeVariantEnum.kobayashi,
    label: 'Kobayashi',
    content: <KobayashiPaletteSettings />,
  },
] as const;

export const PaletteSettings = () => {
  const { variant, setVariant } = useContext(PaletteContext);

  return (
    <Popover>
      <PopoverTrigger className="outline-none">
        <div className="px-1 py-2 rounded-full">
          <RiEqualizerLine />
        </div>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={14}
        align="start"
        className="w-full min-h-[36rem] bg-white z-50 rounded-md border border-zinc-200 p-2.5 text-sm shadow-md"
      >
        <Tabs defaultValue={variant}>
          <TabsList className="bg-zinc-100 text-zinc-950">
            {PALETTE_TABS.map((tab) => (
              <TabsTrigger
                key={tab.value}
                className="data-[state=active]:bg-zinc-950 data-[state=active]:text-zinc-50"
                value={tab.value}
                onClick={() => setVariant?.(tab.value)}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {PALETTE_TABS.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};
