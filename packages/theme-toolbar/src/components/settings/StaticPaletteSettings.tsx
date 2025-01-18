import { useContext } from 'react';
import { sentenceCase } from '../../lib/string';
import { Checkbox } from '../../ui/checkbox';
import {
  RadioCardGroup,
  RadioCardIndicator,
  RadioCardItem,
} from '../../ui/radio-card';
import { PaletteContext } from '../../context/PaletteContext';
import { StaticThemePresetEnum } from '@palettebruh/theme-generator/types';

export const StaticPaletteSettings = () => {
  const { preset, setPreset, reverse, setReverse } = useContext(PaletteContext);

  return (
    <>
      <div className="flex flex-row items-center justify-between text-zinc-950">
        <div className="text-lg mb-2 font-bold">Preset</div>
      </div>
      <RadioCardGroup
        value={preset}
        onValueChange={setPreset}
        className="text-lg mb-4"
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
      <div className="flex flex-row items-center justify-between text-zinc-950">
        <div className="text-lg mb-2 font-bold">Reverse</div>
        <Checkbox checked={reverse} onCheckedChange={setReverse} />
      </div>
    </>
  );
};
