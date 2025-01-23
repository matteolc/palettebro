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

export const KobayashiPaletteSettings = () => {
  const { word, words, setWord, image, setImage } = useContext(
    KobayashiPaletteContext,
  );

  if (!word || !setImage) return null;

  return (
    <div className="grid grid-cols-2 gap-2">
      <div>
        <SettingsSection title="Image">
          <RadioCardGroup
            value={image}
            onValueChange={setImage}
            className="text-lg grid grid-cols-2 gap-x-2"
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
            className="text-lg"
          >
            {words.slice(0, 5).map((p) => (
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
  );
};
