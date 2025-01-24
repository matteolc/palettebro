import { useContext } from 'react';
import { sentenceCase } from '@/lib/string';
import { Checkbox } from '@/ui/checkbox';
import {
  RadioCardGroup,
  RadioCardIndicator,
  RadioCardItem,
} from '@/ui/radio-card';
import { PaletteContext } from '@/context/PaletteContext';
import { StaticThemePresetEnum } from '@palettebro/theme-generator/types';
import { SettingsSection } from './SettingsSection';

export const StaticPaletteSettings = () => {
  const { preset, setPreset, reverse, setReverse } = useContext(PaletteContext);

  return (
    <div className="flex flex-col h-[28rem]">
      <SettingsSection title="Preset">
        <RadioCardGroup
          value={preset}
          onValueChange={setPreset}
          className="text-sm grid grid-cols-1 gap-2"
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

      <div className="mt-auto pt-4">
        <SettingsSection
          title="Reverse"
          rightElement={
            <Checkbox checked={reverse} onCheckedChange={setReverse} />
          }
        />
      </div>
    </div>
  );
};
