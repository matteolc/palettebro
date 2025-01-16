import ralColors from '~/data/ral.json';
import { ColorGrid } from '~/components/ColorGrid';
import type { StringBasedPickerProps } from '~/types';

export const RALColorPicker: React.FC<StringBasedPickerProps> = ({
  onChange,
}: {
  onChange: (v: string) => void;
}) => {
  const options = Object.keys(ralColors).map((key) => ({
    id: key,
    color: ralColors[key as keyof typeof ralColors].hex,
    label: key,
    sublabel: ralColors[key as keyof typeof ralColors].name,
  }));

  return <ColorGrid options={options} onChange={onChange} />;
};