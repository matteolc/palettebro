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
    <div>
      <SettingsSection title="Preset">
        <RadioCardGroup
          value={preset}
          onValueChange={setPreset}
          className="text-lg"
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

      <SettingsSection
        title="Reverse"
        rightElement={
          <Checkbox checked={reverse} onCheckedChange={setReverse} />
        }
      />
    </div>
  );
};
