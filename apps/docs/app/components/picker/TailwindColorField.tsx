import { useContext } from 'react';
import colors from 'tailwindcss/colors';
import { type BaseColors, PaletteContext } from '~/PaletteContext';

const tailwindColors = [
  'slate',
  'gray',
  'zinc',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
];

export const TailwindColorField = ({ token }: { token: string }) => {
  const { setBaseColors } = useContext(PaletteContext);

  const handleColorClick = (color: string) => {
    setBaseColors?.({ [token]: color } as BaseColors);
  };

  return (
    <div className="grid grid-cols-4 gap-4 my-4">
      {tailwindColors.map((color) => (
        <button
          type="button"
          key={color}
          className="group relative flex flex-col h-24 rounded-lg overflow-hidden "
          onClick={(e) =>
            handleColorClick(colors[color as keyof typeof colors][500])
          }
        >
          <div
            className="h-full w-full"
            style={{
              backgroundColor: colors[color as keyof typeof colors][500],
              borderColor: colors[color as keyof typeof colors][600],
            }}
          />
          <div className="absolute text-zinc-950 bottom-0 left-0 right-0 bg-white bg-opacity-90 p-2">
            <div className="text-xs font-bold">
              {colors[color as keyof typeof colors][500]}
            </div>
            <div className="text-xs truncate">{color}</div>
          </div>
        </button>
      ))}
    </div>
  );
};
