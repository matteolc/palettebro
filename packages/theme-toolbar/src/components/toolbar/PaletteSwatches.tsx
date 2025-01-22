import { RiInformationLine, RiInformationOffLine } from '@remixicon/react';
import { useState } from 'react';
import { Skeleton } from '@/ui/skeleton';
import { ColorSwatch } from './ColorSwatch';
import { BASE_TOKENS, STATUS_TOKENS } from '@/const';
import { SimpleColorSwatch } from './SimpleColorSwatch';

export const PaletteSwatches = ({
  onLockUnlock,
  isLoading,
}: { onLockUnlock?: () => void; isLoading: boolean }) => {
  const [showStatePalette, setShowStatePalette] = useState(false);

  return (
    <>
      {showStatePalette ? (
        <div className="ml-4 flex flex-row gap-1">
          {STATUS_TOKENS.map((token) =>
            isLoading ? (
              <Skeleton
                key={token}
                className="h-[52px] w-48 rounded-lg bg-zinc-200"
              />
            ) : (
              <ColorSwatch
                token={token}
                key={token}
                onLockUnlock={onLockUnlock}
              />
            ),
          )}
        </div>
      ) : (
        <div className="flex flex-row gap-1">
          {BASE_TOKENS.map((token) =>
            isLoading ? (
              <Skeleton
                key={token}
                className="h-[52px] w-48 rounded-lg bg-zinc-200"
              />
            ) : (
              <SimpleColorSwatch token={token} key={token} />
            ),
          )}
        </div>
      )}

      {/* <button
        type="button"
        className="px-1 py-2 rounded-full"
        onClick={() => setShowStatePalette?.(!showStatePalette)}
      >
        {showStatePalette ? <RiInformationOffLine /> : <RiInformationLine />}
      </button> */}
    </>
  );
};
