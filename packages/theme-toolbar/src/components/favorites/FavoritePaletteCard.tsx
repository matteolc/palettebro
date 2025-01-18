import type { ComponentType } from 'react';
import { PaletteSwatch } from './PaletteSwatch';
import type { FormProps } from '@/types';
import { RiDeleteBin6Line } from '@remixicon/react';

export function FavoritePaletteCard({
  name,
  primary,
  secondary,
  accent,
  FormComponent,
  onDelete,
  formAction = '/favourites',
}: {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  FormComponent?: ComponentType<FormProps>;
  onDelete?: (name: string) => Promise<void> | void;
  formAction?: string;
}) {
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
