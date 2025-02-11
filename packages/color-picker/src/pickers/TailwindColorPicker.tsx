import { ColorGrid } from '~/components/ColorGrid';
import type { StringBasedPickerProps } from '~/types';
import tw4Colors from '~/data/tw4-colors.json';
import { parseColor, formatSchemistTo } from '@palettebro/theme-generator';

export const TailwindColorPicker: React.FC<StringBasedPickerProps> = ({
  onChange,
}: {
  onChange: (v: string) => void;
}) => {
  const handleChange = (color: string) => {
    const [colorFormat, schemistColor] = parseColor(color);
    if (!schemistColor || !colorFormat) return;
    onChange(formatSchemistTo(schemistColor, 'hex'));
  };

  const options = Object.entries(tw4Colors).map(([color, value]) => ({
    id: color,
    color: value,
    borderColor: value,
    label: color,
    sublabel: color,
  }));

  return <ColorGrid options={options} onChange={handleChange} />;
};
