import { useContext } from 'react';
import { PaletteContext } from '@repo/theme-toolbar';
import { Checkbox } from '~/components/ui/checkbox';
import { sentenceCase } from '~/lib/string';
import {
  RadioCardGroup,
  RadioCardIndicator,
  RadioCardItem,
} from '../RadioCard';

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
        {['split-complementary', 'tetrad', 'triad'].map((p) => (
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
        <Checkbox
          checked={reverse}
          onCheckedChange={setReverse}
          style={
            {
              '--primary': '14.08% 0.0044 285.82',
              '--on-primary': '100% 0 0',
            } as React.CSSProperties
          }
          className=""
        />
      </div>
    </>
  );
};
