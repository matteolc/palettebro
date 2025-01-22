import { RiLockLine, RiLockUnlockLine, RiPaletteLine } from '@remixicon/react';
import { ColorPicker } from '@palettebro/color-picker';
import { ThemeVariantEnum } from '@palettebro/theme-generator/types';
import clsx from 'clsx';
import { useContext, useState } from 'react';
import { sentenceCase } from '@/lib/string';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import { type BaseColors, PaletteContext } from '@/context/PaletteContext';
import { getPaletteColor } from '@/utils/get-palette-color';

export const PaletteToolbarColorSwatch = ({
  token,
  onLockUnlock,
}: { token: string; onLockUnlock?: () => void }) => {
  const [isLocked, setIsLocked] = useState(false);
  const { palette, setBaseColors, variant } = useContext(PaletteContext);

  if (!palette) return null;

  const name = getPaletteColor(token, palette, 'name');

  const classes = [
    // Optical border, implemented as the button background to avoid corner artifacts
    'border-transparent',
    // Button background, implemented as foreground layer to stack on top of pseudo-border layer
    'before:absolute before:inset-0 before:-z-10 before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-[--btn-bg]',
    // Drop shadow, applied to the inset `before` layer so it blends with the border
    'before:shadow',
    // Shim/overlay, inset to match button foreground and used for hover state + highlight shadow
    'after:absolute after:inset-0 after:-z-10 after:rounded-[calc(theme(borderRadius.lg)-1px)]',
    // Inner highlight shadow
    'after:shadow-[shadow:inset_0_1px_theme(colors.white/15%)]',
    // White overlay on hover
    'after:data-[active]:bg-[--btn-hover-overlay] after:data-[hover]:bg-[--btn-hover-overlay]',
  ];

  const EDITABLE_TOKENS = ['primary', 'secondary', 'accent'];

  const shouldShowColorPicker =
    (variant === ThemeVariantEnum.dynamic && EDITABLE_TOKENS.includes(token)) ||
    token === 'primary';
  const shouldShowLock =
    variant === ThemeVariantEnum.dynamic && EDITABLE_TOKENS.includes(token);

  return (
    <div
      style={{
        backgroundColor: `oklch(var(--${token}))`,
        color: `oklch(var(--on-${token}))`,
      }}
      className={clsx(classes, 'min-w-48 px-2.5 py-1.5 rounded-lg')}
    >
      <div className="flex flex-row items-stretch justify-between">
        <div className="flex flex-col items-start">
          <input
            type="text"
            className="hidden"
            defaultValue={isLocked ? getPaletteColor(token, palette) : ''}
            name={token}
          />
          <span className="text-md font-bold">{sentenceCase(token)}</span>
          <span className="text-xs">{name}</span>
        </div>
        <div className="flex flex-row items-center gap-0.5">
          {shouldShowColorPicker && (
            <Popover>
              <PopoverTrigger className="outline-none py-2 rounded-full">
                <RiPaletteLine />
              </PopoverTrigger>
              <PopoverContent
                sideOffset={14}
                className="w-full bg-white border-zinc-200 p-2.5 shadow-md h-fit overflow-y-scroll"
              >
                <ColorPicker
                  value={getPaletteColor(token, palette)}
                  onChange={(value: string) =>
                    getPaletteColor(token, palette) !== value &&
                    setBaseColors?.({ [token]: value } as BaseColors)
                  }
                />
              </PopoverContent>
            </Popover>
          )}
          {shouldShowLock && (
            <Popover>
              <PopoverTrigger
                className="outline-none py-2 rounded-full"
                onClick={() => {
                  setIsLocked(!isLocked);
                  onLockUnlock?.();
                }}
              >
                {isLocked ? <RiLockLine /> : <RiLockUnlockLine />}
              </PopoverTrigger>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};
