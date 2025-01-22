import { PaletteContext } from '@/context';
import { getPaletteColor } from '@/utils/get-palette-color';
import clsx from 'clsx';
import { useContext, useState } from 'react';
import { ContrastDialog } from './ContrastDialog';

export const PaletteColor = ({
  token,
  label,
  code,
  className = '',
  labelToken,
  borderRadius,
}: {
  token: string;
  label: string;
  code?: string;
  className?: string;
  labelToken?: string;
  borderRadius?: string;
}) => {
  const { palette } = useContext(PaletteContext);
  const [showContrastDialog, setShowContrastDialog] = useState(false);
  const color = getPaletteColor(token, palette);
  const textColor = labelToken ? getPaletteColor(labelToken, palette) : 'white';
  const colorName = getPaletteColor(token, palette, 'name');

  const handleInteraction = () => {
    setShowContrastDialog(true);
  };

  return (
    <>
      <div className={clsx('flex flex-col', className)}>
        <button
          type="button"
          className={clsx(
            'relative h-32 text-sm cursor-pointer w-full',
            borderRadius,
          )}
          style={{ backgroundColor: color, color: textColor }}
          onClick={handleInteraction}
        >
          <div className="absolute top-2 left-2 flex flex-col items-start max-w-[calc(100%-1rem)] w-full">
            <span className="text-lg font-bold truncate w-full text-left">
              {label}
            </span>
            <span className="text-xs font-normal text-left truncate w-full">
              {colorName}
            </span>
          </div>
          <span className="absolute bottom-2 right-2">{code}</span>
        </button>
      </div>
      <ContrastDialog
        isOpen={showContrastDialog}
        onClose={() => setShowContrastDialog(false)}
        backgroundColor={color}
        foregroundColor={textColor}
        colorName={label}
      />
    </>
  );
};
