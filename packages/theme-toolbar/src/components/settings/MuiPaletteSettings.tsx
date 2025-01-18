import { RadioCardIndicator } from '@/ui/radio-card';

import { RadioCardGroup, RadioCardItem } from '@/ui/radio-card';
import { MuiThemePresetEnum } from '@palettebruh/theme-generator/types';
import { sentenceCase } from 'node_modules/@palettebruh/theme-generator/src/utils/strings';
import { useContext } from 'react';
import { PaletteContext } from '../../context/PaletteContext';
import { Slider } from '@/ui/slider';

export const MuiPaletteSettings = () => {
  const { preset, setPreset, contrast, setContrast } =
    useContext(PaletteContext);

  return (
    <div>
      <div className="flex flex-row items-center justify-between text-zinc-950">
        <div className="text-lg mb-2 font-bold">Preset</div>
      </div>
      <RadioCardGroup
        value={preset}
        onValueChange={setPreset}
        className="text-lg mb-4 grid grid-cols-2 gap-2"
      >
        {Object.keys(MuiThemePresetEnum).map((p) => (
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
      <div className="col-span-2">
        <div className="flex flex-row items-center justify-between text-zinc-950">
          <div className="text-lg mb-2 font-bold">Contrast</div>
          <div className="text-lg  mb-2">{contrast}</div>
        </div>
        <Slider
          value={[contrast ?? 0]}
          min={-1.0}
          step={0.1}
          max={1.0}
          onValueChange={(value: number[]) => setContrast?.(value[0])}
        />
      </div>
    </div>
  );
};
