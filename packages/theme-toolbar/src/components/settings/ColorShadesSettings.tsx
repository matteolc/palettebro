import { PaletteContext } from '@/context/PaletteContext';

import { useContext } from 'react';
import { SettingsSection } from './SettingsSection';
import {
  RadioCardGroup,
  RadioCardIndicator,
  RadioCardItem,
} from '@/ui/radio-card';
import { ColorShadesPresetEnum } from '@palettebro/theme-generator/types';
import { sentenceCase } from '@palettebro/theme-generator';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import { RiShadowLine } from '@remixicon/react';
import { Checkbox } from '@/ui/checkbox';

export const ColorShadesSettings = () => {
  const {
    colorShadesPreset,
    setColorShadesPreset,
    reverseLightDarkShades,
    setReverseLightDarkShades,
  } = useContext(PaletteContext);

  return (
    <Popover>
      <PopoverTrigger className="outline-none">
        <div className="px-1 py-2 rounded-full">
          <RiShadowLine />
        </div>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={14}
        align="start"
        className="w-full bg-white z-50 rounded-md border border-zinc-200 p-2.5 text-sm shadow-md"
      >
        <SettingsSection title="Shades Progression">
          <RadioCardGroup
            value={colorShadesPreset}
            onValueChange={setColorShadesPreset}
            className="text-lg"
          >
            {Object.keys(ColorShadesPresetEnum).map((p) => (
              <RadioCardItem
                key={p}
                value={p}
                className="flex items-center gap-3 py-2 text-zinc-950"
              >
                <RadioCardIndicator />
                <span>{sentenceCase(p.split('-').join(' '))}</span>
              </RadioCardItem>
            ))}
          </RadioCardGroup>
        </SettingsSection>
        <SettingsSection
          title="Reverse"
          rightElement={
            <Checkbox
              checked={reverseLightDarkShades}
              onCheckedChange={setReverseLightDarkShades}
            />
          }
        />
      </PopoverContent>
    </Popover>
  );
};
