import { useContext } from 'react';
import colors from 'tailwindcss/colors';
import { PaletteToolbarContext } from '~/PaletteToolbarContext';
import { sentenceCase } from '~/lib/string';
import {
  RadioCardGroup,
  RadioCardIndicator,
  RadioCardItem,
} from '../RadioCard';
import { Slider } from '../ui/slider';

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
  } = useContext(PaletteToolbarContext);

  if (!temperature) return null;
  if (!setTemperature) return null;

  return (
    <div className="grid grid-cols-2 gap-2">
      {/* <div>
            <div className="flex flex-row items-center justify-between text-zinc-950">
                <div className="text-lg mb-2 font-bold">Profile</div>
            </div>
            <RadioCardGroup value={profile} onValueChange={setProfile} className="text-lg mb-4">
                {["transformer", "diffusion", "creative"].map((p) => (
                    <RadioCardItem key={p} value={p} className="flex items-center gap-3 py-2 text-zinc-950">
                        <RadioCardIndicator />
                        <span>{sentenceCase(p.split("-").join(" "))}</span>
                    </RadioCardItem>
                ))}
            </RadioCardGroup>
        </div> */}

      <div>
        <div className="flex flex-row items-center justify-between text-zinc-950">
          <div className="text-lg mb-2 font-bold">Preset</div>
        </div>
        <RadioCardGroup
          value={preset}
          onValueChange={setPreset}
          className="text-lg mb-4"
        >
          {[
            'default',
            'high-contrast',
            'bright-light',
            'pastel',
            'vibrant',
            'dark',
            'hyper-color',
          ].map((p) => (
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
      </div>

      <div>
        <div className="flex flex-row items-center justify-between text-zinc-950">
          <div className="text-lg mb-2 font-bold">Target</div>
        </div>
        <RadioCardGroup
          value={page}
          onValueChange={setPage}
          className="text-lg mb-4"
        >
          {['website-magazine', 'brand-2', 'brand-3', 'website-1'].map((p) => (
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
      </div>

      <div className="col-span-2">
        <div className="flex flex-row items-center justify-between text-zinc-950">
          <div className="text-lg mb-2 font-bold">Temperature</div>
          <div className="text-lg  mb-2">{temperature}</div>
        </div>
        <Slider
          style={
            {
              '--primary': '14.08% 0.0044 285.82',
              '--primary-50': '97.5% 0.0044 285.82',
            } as React.CSSProperties
          }
          value={[temperature]}
          min={0}
          step={0.1}
          max={2.4}
          onValueChange={(value: number[]) => setTemperature(value[0])}
        />
      </div>
    </div>
  );
};
