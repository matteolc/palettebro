import colors from 'tailwindcss/colors';
import { ColorGrid } from '~/components/ColorGrid';
import type { StringBasedPickerProps } from '~/types';

export const TailwindColorPicker: React.FC<StringBasedPickerProps> = ({
  onChange,
}: {
  onChange: (v: string) => void;
}) => {
  const skipColors = ['current', 'transparent', 'black', 'white', 'inherit'];
  const options = Object.keys(colors)
    .filter((color) => !skipColors.includes(color))
    .map((color) => ({
      id: color,
      color: colors[color as keyof typeof colors][500],
      borderColor: colors[color as keyof typeof colors][600],
      label: colors[color as keyof typeof colors][500],
      sublabel: color,
    }));

  return <ColorGrid options={options} onChange={onChange} />;
};
