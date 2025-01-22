import { PaletteContext } from '@/context/PaletteContext';
import { sentenceCase } from '@/lib/string';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { getPaletteColor } from '@/utils/get-palette-color';
import clsx from 'clsx';
import { useContext, useState } from 'react';
import { ContrastDialog } from './ContrastDialog';

interface ColorBoxProps {
  token: string;
  label: string;
  code?: string;
  className?: string;
  labelToken?: string;
  borderRadius?: string;
}

const ColorBox = ({
  token,
  label,
  code,
  className = '',
  labelToken,
  borderRadius,
}: ColorBoxProps) => {
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
          className={clsx('relative h-32 text-sm cursor-pointer w-full', borderRadius)}
          style={{ backgroundColor: color, color: textColor }}
          onClick={handleInteraction}
        >
          <div className="absolute top-2 left-2 flex flex-col items-start max-w-[calc(100%-1rem)] w-full">
            <span className="text-lg font-bold truncate w-full text-left">{label}</span>
            <span className="text-xs font-normal text-left truncate w-full">{colorName}</span>
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

export const MuiColorPalette = () => {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>
          <h3 className="text-xl font-bold flex items-center">
            Color Tokens
          </h3>
          <p className="text-sm text-outline max-w-2xl">
            Color tokens are semantic variables that represent specific colors in your design system. They help maintain consistency and make it easier to update colors across your entire application.
          </p>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="max-w-full">
          <div className="grid grid-cols-4 gap-4  grid-rows-2">
            {/* First Row - Main Colors */}
            <div className="col-span-1 flex flex-col rounded-md">
              <ColorBox
                token="primary"
                label="Primary"
                code="P-40"
                labelToken="on-primary"
                borderRadius="rounded-t-md"
              />
              <ColorBox
                token="on-primary"
                label="On Primary"
                code="P-100"
                labelToken="primary"
                className="h-16"
                borderRadius="rounded-b-md"
              />
            </div>
            <div className="col-span-1 flex flex-col">
              <ColorBox
                token="secondary"
                label="Secondary"
                code="S-40"
                labelToken="on-secondary"
                borderRadius="rounded-t-md"
              />
              <ColorBox
                token="on-secondary"
                label="On Secondary"
                code="S-100"
                labelToken="secondary"
                className="h-16"
                borderRadius="rounded-b-md"
              />
            </div>
            <div className="col-span-1 flex flex-col">
              <ColorBox
                token="accent"
                label="Tertiary"
                code="T-40"
                labelToken="on-accent"
                borderRadius="rounded-t-md"
              />
              <ColorBox
                token="on-accent"
                label="On Tertiary"
                code="T-100"
                labelToken="accent"
                className="h-16"
                borderRadius="rounded-b-md"
              />
            </div>
            <div className="col-span-1 flex flex-col">
              <ColorBox
                token="error"
                label="Error"
                code="E-40"
                labelToken="on-error"
                borderRadius="rounded-t-md"
              />
              <ColorBox
                token="on-error"
                label="On Error"
                code="E-100"
                labelToken="error"
                className="h-16"
                borderRadius="rounded-b-md"
              />
            </div>

            {/* Container Colors */}
            <div className="col-span-1 flex flex-col">
              <ColorBox
                token="primary-container"
                label="Primary Container"
                code="P-90"
                labelToken="on-primary-container"
                borderRadius="rounded-t-md"
              />
              <ColorBox
                token="on-primary-container"
                label="On Primary Container"
                code="P-10"
                labelToken="primary-container"
                className="h-16"
                borderRadius="rounded-b-md"
              />
            </div>
            <div className="col-span-1 flex flex-col">
              <ColorBox
                token="secondary-container"
                label="Secondary Container"
                code="S-90"
                labelToken="on-secondary-container"
                borderRadius="rounded-t-md"
              />
              <ColorBox
                token="on-secondary-container"
                label="On Secondary Container"
                code="S-10"
                labelToken="secondary-container"
                className="h-16"
                borderRadius="rounded-b-md"
              />
            </div>
            <div className="col-span-1 flex flex-col">
              <ColorBox
                token="accent-container"
                label="Tertiary Container"
                code="T-90"
                labelToken="on-accent-container"
                borderRadius="rounded-t-md"
              />
              <ColorBox
                token="on-accent-container"
                label="On Tertiary Container"
                code="T-10"
                labelToken="accent-container"
                className="h-16"
                borderRadius="rounded-b-md"
              />
            </div>
            <div className="col-span-1 flex flex-col">
              <ColorBox
                token="error-container"
                label="Error Container"
                code="E-90"
                labelToken="on-error-container"
                borderRadius="rounded-t-md"
              />
              <ColorBox
                token="on-error-container"
                label="On Error Container"
                code="E-10"
                labelToken="error-container"
                className="h-16"
                borderRadius="rounded-b-md"
              />
            </div>

            <div className="col-span-3 row-span-4">
              {/* Surface Row */}
              <div className="col-span-4 grid grid-cols-3 gap-0">
                <ColorBox
                  token="surface-dim"
                  label="Surface Dim"
                  code="N-87"
                  labelToken="on-surface"
                  borderRadius="rounded-tl-md"
                />
                <ColorBox
                  token="surface"
                  label="Surface"
                  code="N-98"
                  labelToken="on-surface"
                />
                <ColorBox
                  token="surface-bright"
                  label="Surface Bright"
                  code="N-98"
                  labelToken="on-surface"
                  borderRadius="rounded-tr-md"
                />
              </div>

              {/* Surface Container Row */}
              <div className="col-span-4 grid grid-cols-5 gap-0">
                <ColorBox
                  token="surface-container-lowest"
                  label="Surf. Container Lowest"
                  code="N-100"
                  labelToken="on-surface"
                />
                <ColorBox
                  token="surface-container-low"
                  label="Surf. Container Low"
                  code="N-96"
                  labelToken="on-surface"
                />
                <ColorBox
                  token="surface-container"
                  label="Surf. Container"
                  code="N-94"
                  labelToken="on-surface"
                />
                <ColorBox
                  token="surface-container-high"
                  label="Surf. Container High"
                  code="N-92"
                  labelToken="on-surface"
                />
                <ColorBox
                  token="surface-container-highest"
                  label="Surf. Container Highest"
                  code="N-90"
                  labelToken="on-surface"
                />
              </div>

              {/* Bottom Row */}
              <div className="col-span-4 grid grid-cols-4 gap-0">
                <ColorBox
                  token="on-surface"
                  label="On Surface"
                  code="N-10"
                  labelToken="surface"
                  className="h-16"
                  borderRadius="rounded-bl-md"
                />
                <ColorBox
                  token="on-surface-variant"
                  label="On Surface Variant"
                  code="NV-30"
                  labelToken="surface"
                  className="h-16"
                />
                <ColorBox
                  token="outline"
                  label="Outline"
                  code="NV-50"
                  labelToken="surface"
                  className="h-16"
                />
                <ColorBox
                  token="outline-variant"
                  label="Outline Variant"
                  code="NV-80"
                  className="h-16"
                  borderRadius="rounded-br-md"
                />
              </div>
            </div>

            <div className="col-span-1 grid">
              {/* Last Row */}
              <div className="grid row-span-3 gap-0">
                <ColorBox
                  token="inverse-surface"
                  label="Inverse Surface"
                  code="N-20"
                  labelToken="surface"
                  borderRadius="rounded-t-md"
                />
                <ColorBox
                  token="inverse-on-surface"
                  label="Inverse On Surface"
                  code="N-95"
                  className="h-16"
                  labelToken="on-surface"
                />
                <ColorBox
                  token="inverse-primary"
                  label="Inverse Primary"
                  code="P-80"
                  className="h-16"
                  labelToken="on-surface"
                />
              </div>

              {/* Final Row */}
              <div className="grid row-span-1 grid-cols-2 gap-0">
                <ColorBox
                  token="scrim"
                  label="Scrim"
                  code="N-0"
                  className="h-16"
                  borderRadius="rounded-bl-md"
                />
                <ColorBox
                  token="shadow"
                  label="Shadow"
                  code="N-0"
                  className="h-16"
                  borderRadius="rounded-br-md"
                />
              </div>
            </div>
          </div>

          {/* Color Shades */}
          <div className="mt-8 space-y-8">
            {/* Primary Shades */}
            <div className="space-y-1">
              <div className="text-sm font-medium">Primary</div>
              <div className="grid grid-cols-[repeat(18,minmax(0,1fr))] gap-0">
                <ColorBox
                  token="primary-0"
                  label="0"
                  className="h-16"
                  borderRadius="rounded-l-md"
                />
                <ColorBox token="primary-5" label="5" className="h-16" />
                <ColorBox token="primary-10" label="10" className="h-16" />
                <ColorBox token="primary-15" label="15" className="h-16" />
                <ColorBox token="primary-20" label="20" className="h-16" />
                <ColorBox token="primary-25" label="25" className="h-16" />
                <ColorBox token="primary-30" label="30" className="h-16" />
                <ColorBox token="primary-35" label="35" className="h-16" />
                <ColorBox token="primary-40" label="40" className="h-16" />
                <ColorBox token="primary-50" label="50" className="h-16" />
                <ColorBox token="primary-60" label="60" className="h-16" />
                <ColorBox token="primary-70" label="70" className="h-16" />
                <ColorBox
                  token="primary-80"
                  label="80"
                  className="h-16"
                  labelToken="scrim"
                />
                <ColorBox
                  token="primary-90"
                  label="90"
                  className="h-16"
                  labelToken="scrim"
                />
                <ColorBox
                  token="primary-95"
                  label="95"
                  className="h-16"
                  labelToken="scrim"
                />
                <ColorBox
                  token="primary-98"
                  label="98"
                  className="h-16"
                  labelToken="scrim"
                />
                <ColorBox
                  token="primary-99"
                  label="99"
                  className="h-16"
                  labelToken="scrim"
                />
                <ColorBox
                  token="primary-100"
                  label="100"
                  className="h-16"
                  borderRadius="rounded-r-md"
                  labelToken="scrim"
                />
              </div>
            </div>

            {/* Secondary Shades */}
            <div className="space-y-1">
              <div className="text-sm font-medium">Secondary</div>
              <div className="grid grid-cols-[repeat(18,minmax(0,1fr))] gap-0">
                <ColorBox
                  token="secondary-0"
                  label="0"
                  className="h-16"
                  borderRadius="rounded-l-md"
                />
                <ColorBox token="secondary-5" label="5" className="h-16" />
                <ColorBox token="secondary-10" label="10" className="h-16" />
                <ColorBox token="secondary-15" label="15" className="h-16" />
                <ColorBox token="secondary-20" label="20" className="h-16" />
                <ColorBox token="secondary-25" label="25" className="h-16" />
                <ColorBox token="secondary-30" label="30" className="h-16" />
                <ColorBox token="secondary-35" label="35" className="h-16" />
                <ColorBox token="secondary-40" label="40" className="h-16" />
                <ColorBox token="secondary-50" label="50" className="h-16" />
                <ColorBox token="secondary-60" label="60" className="h-16" />
                <ColorBox token="secondary-70" label="70" className="h-16" />
                <ColorBox
                  token="secondary-80"
                  label="80"
                  className="h-16"
                  labelToken="scrim"
                />
                <ColorBox
                  token="secondary-90"
                  label="90"
                  className="h-16"
                  labelToken="scrim"
                />
                <ColorBox
                  token="secondary-95"
                  label="95"
                  className="h-16"
                  labelToken="scrim"
                />
                <ColorBox
                  token="secondary-98"
                  label="98"
                  className="h-16"
                  labelToken="scrim"
                />
                <ColorBox
                  token="secondary-99"
                  label="99"
                  className="h-16"
                  labelToken="scrim"
                />
                <ColorBox
                  token="secondary-100"
                  label="100"
                  className="h-16"
                  borderRadius="rounded-r-md"
                  labelToken="scrim"
                />
              </div>
            </div>

            {/* Accent/Tertiary Shades */}
            <div className="space-y-1">
              <div className="text-sm font-medium">Accent</div>
              <div className="grid grid-cols-[repeat(18,minmax(0,1fr))] gap-0">
                <ColorBox
                  token="accent-0"
                  label="0"
                  className="h-16"
                  borderRadius="rounded-l-md"
                />
                <ColorBox token="accent-5" label="5" className="h-16" />
                <ColorBox token="accent-10" label="10" className="h-16" />
                <ColorBox token="accent-15" label="15" className="h-16" />
                <ColorBox token="accent-20" label="20" className="h-16" />
                <ColorBox token="accent-25" label="25" className="h-16" />
                <ColorBox token="accent-30" label="30" className="h-16" />
                <ColorBox token="accent-35" label="35" className="h-16" />
                <ColorBox token="accent-40" label="40" className="h-16" />
                <ColorBox token="accent-50" label="50" className="h-16" />
                <ColorBox token="accent-60" label="60" className="h-16" />
                <ColorBox token="accent-70" label="70" className="h-16" />
                <ColorBox
                  token="accent-80"
                  label="80"
                  className="h-16"
                  labelToken="scrim"
                />
                <ColorBox
                  token="accent-90"
                  label="90"
                  className="h-16"
                  labelToken="scrim"
                />
                <ColorBox
                  token="accent-95"
                  label="95"
                  className="h-16"
                  labelToken="scrim"
                />
                <ColorBox
                  token="accent-98"
                  label="98"
                  className="h-16"
                  labelToken="scrim"
                />
                <ColorBox
                  token="accent-99"
                  label="99"
                  className="h-16"
                  labelToken="scrim"
                />
                <ColorBox
                  token="accent-100"
                  label="100"
                  className="h-16"
                  borderRadius="rounded-r-md"
                  labelToken="scrim"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
