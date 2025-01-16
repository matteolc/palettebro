import { useContext } from 'react';
import { PaletteContext } from './PaletteContext';

export const TokenShades = ({ token }: { token: string }) => {
  const { palette } = useContext(PaletteContext);
  if (!palette) return null;

  return (
    <div key={token}>
      <div className="flex flex-col gap-y-0.5">
        {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
          (variant) => {
            const textVariant = variant > 400 ? 50 : 950;
            const borderVariant = variant > 500 ? 950 : 50;
            return (
              <div
                key={`${token}-${variant}`}
                className="relative rounded-md sm:w-full ring-1 ring-inset"
                style={
                  {
                    '--tw-ring-color': `oklch(var(--${token}-${borderVariant})/10)`,
                  } as React.CSSProperties
                }
              >
                <div
                  className="rounded-[inherit] border-b border-[0.5px] p-2 leading-tight text-xs"
                  style={{
                    backgroundColor: `oklch(var(--${token}-${variant}))`,
                    color: `oklch(var(--${token}-${textVariant}))`,
                    borderColor: `oklch(var(--${token}-${borderVariant}))`,
                  }}
                >
                  <div className="flex items-start flex-col justify-between">
                    <div className="text-2xl font-bold">{variant}</div>
                    <div>{palette[`${token}-${variant}`]?.name}</div>
                  </div>
                </div>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
};
