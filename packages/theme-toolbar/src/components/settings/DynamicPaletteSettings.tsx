import { useContext } from 'react';
import { sentenceCase } from '../../lib/string';
import {
  RadioCardGroup,
  RadioCardIndicator,
  RadioCardItem,
} from '../../ui/radio-card';
import { GenerativePaletteContext } from '../../context/GenerativePaletteContext';
import {
  GenerativeThemePageEnum,
  GenerativeThemePresetEnum,
} from '@palettebruh/theme-generator/types';
import { SettingsSection } from './SettingsSection';
import { SettingsSlider } from './SettingsSlider';

export const DynamicPaletteSettings = () => {
  const {
    temperature,
    setTemperature,
    preset,
    setPreset,
    profile,
    setProfile,
    page,
    setPage,
  } = useContext(GenerativePaletteContext);

  if (!temperature || !setTemperature) return null;

  return (
    <div className="grid grid-cols-2 gap-2">
      <div>
        <SettingsSection title="Preset">
          <RadioCardGroup
            value={preset}
            onValueChange={setPreset}
            className="text-lg"
          >
            {Object.keys(GenerativeThemePresetEnum).map((p) => (
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
      </div>

      <div>
        <SettingsSection title="Variant">
          <RadioCardGroup
            value={page}
            onValueChange={setPage}
            className="text-lg"
          >
            {Object.keys(GenerativeThemePageEnum).map((p) => (
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
      </div>

      <div className="col-span-2">
        <SettingsSlider
          title="Temperature"
          value={temperature}
          onChange={setTemperature}
          min={0}
          max={2.4}
          step={0.1}
        />
      </div>
    </div>
  );
};
