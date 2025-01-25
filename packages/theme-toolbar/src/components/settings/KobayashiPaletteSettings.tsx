import { useContext } from 'react';
import { sentenceCase } from '../../lib/string';
import {
  RadioCardGroup,
  RadioCardIndicator,
  RadioCardItem,
} from '../../ui/radio-card';
import { KobayashiImageEnum } from '@palettebro/theme-generator/types';
import { SettingsSection } from './SettingsSection';
import { KobayashiPaletteContext } from '@/context/KobayashiPaletteContext';
import { Checkbox } from '@/ui/checkbox';

export const KobayashiPaletteSettings = () => {
  const { word, words, setWord, image, setImage, generative, setGenerative } =
    useContext(KobayashiPaletteContext);

  if (!word || !setImage) return null;

  return (
    <div className="flex flex-col h-[30rem]">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <SettingsSection title="Preset">
            <RadioCardGroup
              value={image}
              onValueChange={setImage}
              className="text-sm grid grid-cols-2 gap-x-2 gap-y-1 "
            >
              {Object.keys(KobayashiImageEnum).map((p) => (
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
          <SettingsSection title="Word">
            <RadioCardGroup
              value={word}
              onValueChange={setWord}
              className="text-sm grid grid-cols-2 gap-x-2 gap-y-1"
            >
              {words.map((p) => (
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
      </div>
      <div className="mt-auto pt-4">
        <SettingsSection
          title="Generative"
          className='items-center'
          rightElement={
            <Checkbox checked={generative} onCheckedChange={setGenerative} />
          }
        />
      </div>
    </div>
  );
};
