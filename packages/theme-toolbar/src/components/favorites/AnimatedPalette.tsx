import { cn } from '@/lib/cn';
import { PaletteContext } from '@/context/PaletteContext';
import { RiDeleteBin6Line, RiEyeLine } from '@remixicon/react';
import { type ComponentType, useContext } from 'react';
import type { FormProps } from '@/types';

export function AnimatedPalette({
  colors,
  name,
  className,
  FormComponent,
  onDelete,
  formAction = '/favourites',
}: {
  name: string;
  colors: {
    hex: string;
  }[];
  className?: string;
  FormComponent?: ComponentType<FormProps>;
  onDelete?: (name: string) => void;
  formAction?: string;
}) {
  const { setBaseColors } = useContext(PaletteContext);
  const PADDING_MAP = {
    0: 100, // First color (bottom)
    1: 85, // Second color
    2: 67, // Third color
    3: 41, // Fourth color (top)
  } as const;
  const FormEl = FormComponent || 'form';

  const handleDelete = (e: React.FormEvent) => {
    if (onDelete) {
      e.preventDefault();
      onDelete(name);
    }
  };
  return (
    <div className="group grid grid-rows-8 gap-2 h-64 w-48">
      <div
        className={cn(
          'relative w-full overflow-hidden block rounded-xl row-span-6',
          className,
        )}
      >
        {[...colors].reverse().map((color, index) => (
          <div
            key={color.hex}
            className={cn(
              'absolute w-full font-inter text-xs text-black/90 origin-top first:rounded-xl last:rounded-t-xl',
            )}
            style={{
              backgroundColor: color.hex,
              height: `${PADDING_MAP[index as keyof typeof PADDING_MAP]}%`,
              animation: `place ${0 + index * 0.2}s ease-out`,
            }}
          />
        ))}
      </div>

      <div className="text-lg font-semibold">
        <div className="flex items-center justify-between">
          {name}
          <div className="flex gap-2 items-baseline">
            <button
              type="button"
              onClick={() =>
                setBaseColors?.({
                  primary: colors[0].hex,
                  secondary: colors[1].hex,
                  accent: colors[2].hex,
                })
              }
            >
              <RiEyeLine className="hidden group-hover:block h-4 w-4 hover:text-primary-950" />
            </button>
            <FormEl
              method="POST"
              action={formAction}
              className="hidden group-hover:block"
              onSubmit={handleDelete}
            >
              <input type="hidden" name="intent" value="DELETE" />
              <input type="hidden" name="palette" value={name} />
              <button type="submit">
                <RiDeleteBin6Line className="h-4 w-4 hover:text-primary-950" />
              </button>
            </FormEl>
          </div>
        </div>
      </div>
    </div>
  );
}
