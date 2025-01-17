import { RiDeleteBin6Line, RiEyeLine } from '@remixicon/react';
import { RiCheckLine, RiClipboardLine } from '@remixicon/react';
import { type ComponentType, useContext, useState } from 'react';
import { cn } from '../lib/cn';
import { PaletteContext } from './PaletteContext';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

interface AnimatedPaletteProps {
  name: string;
  colors: {
    hex: string;
  }[];
  className?: string;
  FormComponent?: ComponentType<FormProps>;
  onDelete?: (name: string) => void;
  formAction?: string;
}

const PADDING_MAP = {
  0: 100, // First color (bottom)
  1: 85, // Second color
  2: 67, // Third color
  3: 41, // Fourth color (top)
} as const;

export function AnimatedPalette({
  colors,
  name,
  className,
  FormComponent,
  onDelete,
  formAction = '/favourites',
}: AnimatedPaletteProps) {
  const { setBaseColors } = useContext(PaletteContext);

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
        {colors.map((color, index) => (
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
                  primary: colors[3].hex,
                  secondary: colors[2].hex,
                  accent: colors[1].hex,
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

interface PaletteSwatchProps {
  color: string;
  className?: string;
}

export function PaletteSwatch({ color, className }: PaletteSwatchProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <button
      type="button"
      onClick={copyToClipboard}
      className={cn(
        'isolate group relative h-10 w-10 rounded-md transition-all hover:ring-2 hover:ring-ring hover:ring-offset-2',
        className,
      )}
      style={{ backgroundColor: color }}
    >
      <span className="sr-only">Copy color: {color}</span>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
        {copied ? (
          <RiCheckLine className="h-4 w-4 text-white drop-shadow-md" />
        ) : (
          <RiClipboardLine className="h-4 w-4 text-white drop-shadow-md" />
        )}
      </div>
      <div className="absolute -bottom-8 left-1/2 hidden -translate-x-1/2 rounded bg-popover px-2 py-1 text-xs group-hover:block">
        {color}
      </div>
    </button>
  );
}

interface FavoritePaletteCardProps {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  FormComponent?: ComponentType<FormProps>;
  onDelete?: (name: string) => Promise<void> | void;
  formAction?: string;
}

export function FavoritePaletteCard({
  name,
  primary,
  secondary,
  accent,
  FormComponent,
  onDelete,
  formAction = '/favourites',
}: FavoritePaletteCardProps) {
  const FormEl = FormComponent || 'form';

  const handleDelete = async (e: React.MouseEvent) => {
    if (onDelete) {
      e.preventDefault();
      await onDelete(name);
    }
  };

  return (
    <div className="relative rounded-lg border bg-card p-4 transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-medium">{name}</h3>
        {onDelete ? (
          <button
            type="button"
            onClick={handleDelete}
            className="opacity-100 transition-opacity"
          >
            <RiDeleteBin6Line className="h-4 w-4" />
          </button>
        ) : (
          <FormEl
            method="POST"
            action={formAction}
            className="opacity-100 transition-opacity"
          >
            <input type="hidden" name="intent" value="DELETE" />
            <input type="hidden" name="palette" value={name} />
            <button type="submit">
              <RiDeleteBin6Line className="h-4 w-4" />
            </button>
          </FormEl>
        )}
      </div>
      <div className="flex gap-2">
        <PaletteSwatch color={primary} />
        <PaletteSwatch color={secondary} />
        <PaletteSwatch color={accent} />
      </div>
    </div>
  );
}
