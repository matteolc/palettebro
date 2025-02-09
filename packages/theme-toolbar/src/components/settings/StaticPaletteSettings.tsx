import { useContext } from 'react';
import { sentenceCase } from '@palettebro/theme-generator';
import { Checkbox } from '@/ui/checkbox';
import {
  RadioCardGroup,
  RadioCardIndicator,
  RadioCardItem,
} from '@/ui/radio-card';
import { PaletteContext } from '@/context/PaletteContext';
import { StaticThemePresetEnum } from '@palettebro/theme-generator';
import { SettingsSection } from './SettingsSection';

export const StaticPaletteSettings = () => {
  const { preset, setPreset, reverse, setReverse } = useContext(PaletteContext);

  return (
    <div className="grid grid-cols-1 h-[32rem]">
      <SettingsSection title="Preset">
        <RadioCardGroup
          value={preset}
          onValueChange={setPreset}
          className="text-sm grid grid-cols-2 gap-x-2 gap-y-1 "
        >
          {Object.keys(StaticThemePresetEnum).map((p) => (
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

      <div className="mt-auto pt-4 col-span-2">
        <SettingsSection
          title="Reverse"
          className="items-center"
          rightElement={
            <Checkbox checked={reverse} onCheckedChange={setReverse} />
          }
        />
      </div>
    </div>
  );
};
