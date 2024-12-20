import { RiInformationLine, RiInformationOffLine } from '@remixicon/react';
import { useState } from 'react';
import { ColorSwatch } from './ColorSwatch';
import { BASE_TOKENS, STATUS_TOKENS } from './PaletteToolbar';

export const PaletteSwatches = ({
  onLockUnlock,
}: { onLockUnlock?: () => void }) => {
  const [showStatePalette, setShowStatePalette] = useState(false);

  return (
    <>
      {showStatePalette ? (
        <div className="mx-4 flex flex-row gap-1">
          {STATUS_TOKENS.map((token) => (
            <ColorSwatch
              token={token}
              key={token}
              onLockUnlock={onLockUnlock}
            />
          ))}
        </div>
      ) : (
        <div className="mx-4 flex flex-row gap-1">
          {BASE_TOKENS.map((token) => (
            <ColorSwatch token={token} key={token} />
          ))}
        </div>
      )}

      <button
        type="button"
        className="px-1 py-2 rounded-full"
        onClick={() => setShowStatePalette?.(!showStatePalette)}
      >
        {showStatePalette ? <RiInformationOffLine /> : <RiInformationLine />}
      </button>
    </>
  );
};
