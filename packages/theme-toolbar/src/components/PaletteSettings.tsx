import { RiEqualizerLine } from '@remixicon/react';
import { ThemeVariantEnum } from '@palettebruh/theme-generator/types';
import { useContext } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { DynamicPaletteSettings } from './DynamicPaletteSettings';
import { PaletteContext } from './PaletteContext';
import { StaticPaletteSettings } from './StaticPaletteSettings';

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
        className="w-full min-h-[34rem] bg-white z-50 rounded-md  border p-2.5 text-sm shadow-md"
      >
        <Tabs defaultValue={variant}>
          <TabsList className="bg-zinc-100 text-zinc-950">
            <TabsTrigger
              className="data-[state=active]:bg-zinc-950 data-[state=active]:text-zinc-50"
              value="static"
              onClick={() => setVariant?.(ThemeVariantEnum.static)}
            >
              Static
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-zinc-950 data-[state=active]:text-zinc-50"
              value="dynamic"
              onClick={() => setVariant?.(ThemeVariantEnum.dynamic)}
            >
              Generative
            </TabsTrigger>
          </TabsList>
          <TabsContent value="static">
            <StaticPaletteSettings />
          </TabsContent>
          <TabsContent value="dynamic">
            <DynamicPaletteSettings />
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};
