import {
  RadioCardIndicator,
  RadioCardGroup,
  RadioCardItem,
} from '@/ui/radio-card';
import { MuiThemePresetEnum } from '@palettebro/theme-generator/types';
import { sentenceCase } from '@palettebro/theme-generator';
import { useContext } from 'react';
import { PaletteContext } from '@/context/PaletteContext';
import { SettingsSection } from './SettingsSection';
import { SettingsSlider } from './SettingsSlider';

export const MuiPaletteSettings = () => {
  const { preset, setPreset, contrast, setContrast } =
    useContext(PaletteContext);

  return (
    <div className="flex flex-col h-[30rem]">
      <SettingsSection title="Preset">
        <RadioCardGroup
          value={preset}
          onValueChange={setPreset}
          className="text-sm grid grid-cols-2 gap-x-2 gap-y-1"
        >
          {Object.keys(MuiThemePresetEnum).map((p) => (
            <RadioCardItem
              key={p}
              value={p}
              className="flex items-center gap-3 py-2 text-zinc-950 "
            >
              <RadioCardIndicator />
              <span>{sentenceCase(p.split('-').join(' '))}</span>
            </RadioCardItem>
          ))}
        </RadioCardGroup>
      </SettingsSection>

      <div className="mt-auto pt-4">
        <SettingsSlider
          title="Contrast"
          value={contrast ?? 0}
          onChange={setContrast ?? (() => {})}
          min={-1.0}
          max={1.0}
          step={0.1}
        />
      </div>
    </div>
  );
};
