import { PaletteContext } from '@/context/PaletteContext';
import { sentenceCase } from '@/lib/string';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { getPaletteColor } from '@/utils/get-palette-color';
import clsx from 'clsx';
import { useContext } from 'react';

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
  const color = getPaletteColor(token, palette);
  const textColor = labelToken ? getPaletteColor(labelToken, palette) : 'white';
  const colorName = getPaletteColor(token, palette, 'name');

  return (
    <div className={clsx('flex flex-col', className)}>
      <div
        className={clsx('relative h-32 text-sm', borderRadius)}
        style={{ backgroundColor: color, color: textColor }}
      >
        <span className="absolute top-2 left-2">
          <div className="flex flex-col">
            {label}
            <div className="text-xs">{colorName}</div>
          </div>
        </span>
        <span className="absolute bottom-2 right-2">{code}</span>
      </div>
    </div>
  );
};

export const MuiColorPalette = () => {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>
          <h3 className="text-xl font-bold flex items-center">
            Material UI Palette
          </h3>
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
                  labelToken="surface-variant"
                  className="h-16"
                />
                <ColorBox
                  token="outline"
                  label="Outline"
                  code="NV-50"
                  labelToken="neutral-50"
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
                  labelToken="neutral-50"
                  borderRadius="rounded-t-md"
                />
                <ColorBox
                  token="inverse-on-surface"
                  label="Inverse On Surface"
                  code="N-95"
                  className="h-16"
                  labelToken="neutral-950"
                />
                <ColorBox
                  token="inverse-primary"
                  label="Inverse Primary"
                  code="P-80"
                  className="h-16"
                  labelToken="neutral-950"
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
