import pantoneColors from '~/data/pantone-numbers.json';
import { ColorGrid } from '~/components/ColorGrid';
import type { StringBasedPickerProps } from '~/types';

export const PantoneColorPicker: React.FC<StringBasedPickerProps> = ({
  onChange,
}: {
  onChange: (v: string) => void;
}) => {
  const options = Object.keys(pantoneColors).map((key) => ({
    id: key,
    color: `#${pantoneColors[key as keyof typeof pantoneColors].hex}`,
    label: key,
    sublabel: pantoneColors[key as keyof typeof pantoneColors].name,
  }));

  return <ColorGrid options={options} onChange={onChange} />;
};
