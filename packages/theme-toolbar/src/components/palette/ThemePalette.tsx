import { Card, CardContent, CardHeader, CardTitle } from '@palettebro/shadcn-ui/card';
import { PaletteColor } from './PaletteColor';
import { useContext } from 'react';
import { PaletteContext } from '@/context/PaletteContext';
import { ColorShadesPresetEnum } from '@palettebro/theme-generator';

export const ThemePalette = () => {
  const { isDark, colorShadesPreset, reverseLightDarkShades } =
    useContext(PaletteContext);

  const getCode = (lightCode: string, darkCode: string) => {
    return isDark ? darkCode : lightCode;
  };

  const getShadesLabelToken = (shade: number) => {
    if (!reverseLightDarkShades) {
      return shade >= 80 ? 'scrim' : undefined;
    }
    return shade <= 20 ? 'scrim' : undefined;
  };

  const getTailwindShadesLabelToken = (shade: number) => {
    if (!reverseLightDarkShades) {
      return shade <= 400 ? 'scrim' : undefined;
    }
    return shade >= 600 ? 'scrim' : undefined;
  };

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>
          <h3 className="text-xl font-bold flex items-center">Color Tokens</h3>
          <p className="text-sm text-outline max-w-2xl">
            Color tokens are semantic variables that represent specific colors
            in your design system. They help maintain consistency and make it
            easier to update colors across your entire application.
          </p>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="max-w-full">
          <div className="grid grid-cols-4 gap-4  grid-rows-2">
            {/* First Row - Main Colors */}
            <div className="col-span-1 flex flex-col rounded-md">
              <PaletteColor
                token="primary"
                label="Primary"
                code={getCode('P-40', 'P-80')}
                labelToken="on-primary"
                borderRadius="rounded-t-md"
              />
              <PaletteColor
                token="on-primary"
                label="On Primary"
                code={getCode('P-100', 'P-20')}
                labelToken="primary"
                className="h-16"
                borderRadius="rounded-b-md"
              />
            </div>
            <div className="col-span-1 flex flex-col">
              <PaletteColor
                token="secondary"
                label="Secondary"
                code={getCode('S-40', 'S-80')}
                labelToken="on-secondary"
                borderRadius="rounded-t-md"
              />
              <PaletteColor
                token="on-secondary"
                label="On Secondary"
                code={getCode('S-100', 'S-20')}
                labelToken="secondary"
                className="h-16"
                borderRadius="rounded-b-md"
              />
            </div>
            <div className="col-span-1 flex flex-col">
              <PaletteColor
                token="accent"
                label="Tertiary"
                code={getCode('T-40', 'T-80')}
                labelToken="on-accent"
                borderRadius="rounded-t-md"
              />
              <PaletteColor
                token="on-accent"
                label="On Tertiary"
                code={getCode('T-100', 'T-20')}
                labelToken="accent"
                className="h-16"
                borderRadius="rounded-b-md"
              />
            </div>
            <div className="col-span-1 flex flex-col">
              <PaletteColor
                token="error"
                label="Error"
                code={getCode('E-40', 'E-80')}
                labelToken="on-error"
                borderRadius="rounded-t-md"
              />
              <PaletteColor
                token="on-error"
                label="On Error"
                code={getCode('E-100', 'E-20')}
                labelToken="error"
                className="h-16"
                borderRadius="rounded-b-md"
              />
            </div>

            {/* Container Colors */}
            <div className="col-span-1 flex flex-col">
              <PaletteColor
                token="primary-container"
                label="Primary Container"
                code={getCode('P-90', 'P-30')}
                labelToken="on-primary-container"
                borderRadius="rounded-t-md"
              />
              <PaletteColor
                token="on-primary-container"
                label="On Primary Container"
                code={getCode('P-10', 'P-90')}
                labelToken="primary-container"
                className="h-16"
                borderRadius="rounded-b-md"
              />
            </div>
            <div className="col-span-1 flex flex-col">
              <PaletteColor
                token="secondary-container"
                label="Secondary Container"
                code={getCode('S-90', 'S-30')}
                labelToken="on-secondary-container"
                borderRadius="rounded-t-md"
              />
              <PaletteColor
                token="on-secondary-container"
                label="On Secondary Container"
                code={getCode('S-10', 'S-90')}
                labelToken="secondary-container"
                className="h-16"
                borderRadius="rounded-b-md"
              />
            </div>
            <div className="col-span-1 flex flex-col">
              <PaletteColor
                token="accent-container"
                label="Tertiary Container"
                code={getCode('T-90', 'T-30')}
                labelToken="on-accent-container"
                borderRadius="rounded-t-md"
              />
              <PaletteColor
                token="on-accent-container"
                label="On Tertiary Container"
                code={getCode('T-10', 'T-90')}
                labelToken="accent-container"
                className="h-16"
                borderRadius="rounded-b-md"
              />
            </div>
            <div className="col-span-1 flex flex-col">
              <PaletteColor
                token="error-container"
                label="Error Container"
                code={getCode('E-90', 'E-30')}
                labelToken="on-error-container"
                borderRadius="rounded-t-md"
              />
              <PaletteColor
                token="on-error-container"
                label="On Error Container"
                code={getCode('E-10', 'E-90')}
                labelToken="error-container"
                className="h-16"
                borderRadius="rounded-b-md"
              />
            </div>

            <div className="col-span-3 row-span-4">
              {/* Surface Row */}
              <div className="col-span-4 grid grid-cols-3 gap-0">
                <PaletteColor
                  token="surface-dim"
                  label="Surface Dim"
                  code={getCode('N-87', 'N-6')}
                  labelToken="on-surface"
                  borderRadius="rounded-tl-md"
                />
                <PaletteColor
                  token="surface"
                  label="Surface"
                  code={getCode('N-98', 'N-6')}
                  labelToken="on-surface"
                />
                <PaletteColor
                  token="surface-bright"
                  label="Surface Bright"
                  code={getCode('N-98', 'N-24')}
                  labelToken="on-surface"
                  borderRadius="rounded-tr-md"
                />
              </div>

              {/* Surface Container Row */}
              <div className="col-span-4 grid grid-cols-5 gap-0">
                <PaletteColor
                  token="surface-container-lowest"
                  label="Surf. Container Lowest"
                  code={getCode('N-100', 'N-4')}
                  labelToken="on-surface"
                />
                <PaletteColor
                  token="surface-container-low"
                  label="Surf. Container Low"
                  code={getCode('N-96', 'N-10')}
                  labelToken="on-surface"
                />
                <PaletteColor
                  token="surface-container"
                  label="Surf. Container"
                  code={getCode('N-94', 'N-12')}
                  labelToken="on-surface"
                />
                <PaletteColor
                  token="surface-container-high"
                  label="Surf. Container High"
                  code={getCode('N-92', 'N-17')}
                  labelToken="on-surface"
                />
                <PaletteColor
                  token="surface-container-highest"
                  label="Surf. Container Highest"
                  code={getCode('N-90', 'N-24')}
                  labelToken="on-surface"
                />
              </div>

              {/* Bottom Row */}
              <div className="col-span-4 grid grid-cols-4 gap-0">
                <PaletteColor
                  token="on-surface"
                  label="On Surface"
                  code={getCode('N-10', 'N-90')}
                  labelToken="surface"
                  className="h-16"
                  borderRadius="rounded-bl-md"
                />
                <PaletteColor
                  token="on-surface-variant"
                  label="On Surface Variant"
                  code={getCode('NV-30', 'NV-90')}
                  labelToken="surface"
                  className="h-16"
                />
                <PaletteColor
                  token="outline"
                  label="Outline"
                  code={getCode('NV-50', 'NV-60')}
                  labelToken="surface"
                  className="h-16"
                />
                <PaletteColor
                  token="outline-variant"
                  label="Outline Variant"
                  code={getCode('NV-80', 'NV-30')}
                  className="h-16"
                  borderRadius="rounded-br-md"
                />
              </div>
            </div>

            <div className="col-span-1 grid">
              {/* Last Row */}
              <div className="grid row-span-3 gap-0">
                <PaletteColor
                  token="inverse-surface"
                  label="Inverse Surface"
                  code={getCode('N-20', 'N-90')}
                  labelToken="surface"
                  borderRadius="rounded-t-md"
                />
                <PaletteColor
                  token="inverse-on-surface"
                  label="Inverse On Surface"
                  code={getCode('N-95', 'N-20')}
                  className="h-16"
                  labelToken="on-surface"
                />
                <PaletteColor
                  token="inverse-primary"
                  label="Inverse Primary"
                  code={getCode('P-80', 'P-40')}
                  className="h-16"
                  labelToken="on-surface"
                />
              </div>

              {/* Final Row */}
              <div className="grid row-span-1 grid-cols-2 gap-0">
                <PaletteColor
                  token="scrim"
                  label="Scrim"
                  code="N-0"
                  className="h-16"
                  borderRadius="rounded-bl-md"
                />
                <PaletteColor
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
          {colorShadesPreset === ColorShadesPresetEnum.mui && (
            <div className="mt-8 space-y-8">
              <div className="space-y-1">
                {/* Primary Shades */}
                <div className="space-y-1">
                  <div className="text-sm font-medium">Primary</div>
                  <div className="grid grid-cols-[repeat(18,minmax(0,1fr))] gap-0">
                    <PaletteColor
                      token="primary-0"
                      label="0"
                      className="h-16"
                      borderRadius="rounded-l-md"
                      labelToken={getShadesLabelToken(0)}
                    />
                    <PaletteColor
                      token="primary-5"
                      label="5"
                      className="h-16"
                      labelToken={getShadesLabelToken(5)}
                    />
                    <PaletteColor
                      token="primary-10"
                      label="10"
                      className="h-16"
                      labelToken={getShadesLabelToken(10)}
                    />
                    <PaletteColor
                      token="primary-15"
                      label="15"
                      className="h-16"
                      labelToken={getShadesLabelToken(15)}
                    />
                    <PaletteColor
                      token="primary-20"
                      label="20"
                      className="h-16"
                      labelToken={getShadesLabelToken(20)}
                    />
                    <PaletteColor
                      token="primary-25"
                      label="25"
                      className="h-16"
                      labelToken={getShadesLabelToken(25)}
                    />
                    <PaletteColor
                      token="primary-30"
                      label="30"
                      className="h-16"
                      labelToken={getShadesLabelToken(30)}
                    />
                    <PaletteColor
                      token="primary-35"
                      label="35"
                      className="h-16"
                      labelToken={getShadesLabelToken(35)}
                    />
                    <PaletteColor
                      token="primary-40"
                      label="40"
                      className="h-16"
                      labelToken={getShadesLabelToken(40)}
                    />
                    <PaletteColor
                      token="primary-50"
                      label="50"
                      className="h-16"
                      labelToken={getShadesLabelToken(50)}
                    />
                    <PaletteColor
                      token="primary-60"
                      label="60"
                      className="h-16"
                      labelToken={getShadesLabelToken(60)}
                    />
                    <PaletteColor
                      token="primary-70"
                      label="70"
                      className="h-16"
                      labelToken={getShadesLabelToken(70)}
                    />
                    <PaletteColor
                      token="primary-80"
                      label="80"
                      className="h-16"
                      labelToken={getShadesLabelToken(80)}
                    />
                    <PaletteColor
                      token="primary-90"
                      label="90"
                      className="h-16"
                      labelToken={getShadesLabelToken(90)}
                    />
                    <PaletteColor
                      token="primary-95"
                      label="95"
                      className="h-16"
                      labelToken={getShadesLabelToken(95)}
                    />
                    <PaletteColor
                      token="primary-98"
                      label="98"
                      className="h-16"
                      labelToken={getShadesLabelToken(98)}
                    />
                    <PaletteColor
                      token="primary-99"
                      label="99"
                      className="h-16"
                      labelToken={getShadesLabelToken(99)}
                    />
                    <PaletteColor
                      token="primary-100"
                      label="100"
                      className="h-16"
                      borderRadius="rounded-r-md"
                      labelToken={getShadesLabelToken(100)}
                    />
                  </div>
                </div>

                {/* Secondary Shades */}
                <div className="space-y-1 mt-8">
                  <div className="text-sm font-medium">Secondary</div>
                  <div className="grid grid-cols-[repeat(18,minmax(0,1fr))] gap-0">
                    <PaletteColor
                      token="secondary-0"
                      label="0"
                      className="h-16"
                      borderRadius="rounded-l-md"
                      labelToken={getShadesLabelToken(0)}
                    />
                    <PaletteColor
                      token="secondary-5"
                      label="5"
                      className="h-16"
                      labelToken={getShadesLabelToken(5)}
                    />
                    <PaletteColor
                      token="secondary-10"
                      label="10"
                      className="h-16"
                      labelToken={getShadesLabelToken(10)}
                    />
                    <PaletteColor
                      token="secondary-15"
                      label="15"
                      className="h-16"
                      labelToken={getShadesLabelToken(15)}
                    />
                    <PaletteColor
                      token="secondary-20"
                      label="20"
                      className="h-16"
                      labelToken={getShadesLabelToken(20)}
                    />
                    <PaletteColor
                      token="secondary-25"
                      label="25"
                      className="h-16"
                      labelToken={getShadesLabelToken(25)}
                    />
                    <PaletteColor
                      token="secondary-30"
                      label="30"
                      className="h-16"
                      labelToken={getShadesLabelToken(30)}
                    />
                    <PaletteColor
                      token="secondary-35"
                      label="35"
                      className="h-16"
                      labelToken={getShadesLabelToken(35)}
                    />
                    <PaletteColor
                      token="secondary-40"
                      label="40"
                      className="h-16"
                      labelToken={getShadesLabelToken(40)}
                    />
                    <PaletteColor
                      token="secondary-50"
                      label="50"
                      className="h-16"
                      labelToken={getShadesLabelToken(50)}
                    />
                    <PaletteColor
                      token="secondary-60"
                      label="60"
                      className="h-16"
                      labelToken={getShadesLabelToken(60)}
                    />
                    <PaletteColor
                      token="secondary-70"
                      label="70"
                      className="h-16"
                      labelToken={getShadesLabelToken(70)}
                    />
                    <PaletteColor
                      token="secondary-80"
                      label="80"
                      className="h-16"
                      labelToken={getShadesLabelToken(80)}
                    />
                    <PaletteColor
                      token="secondary-90"
                      label="90"
                      className="h-16"
                      labelToken={getShadesLabelToken(90)}
                    />
                    <PaletteColor
                      token="secondary-95"
                      label="95"
                      className="h-16"
                      labelToken={getShadesLabelToken(95)}
                    />
                    <PaletteColor
                      token="secondary-98"
                      label="98"
                      className="h-16"
                      labelToken={getShadesLabelToken(98)}
                    />
                    <PaletteColor
                      token="secondary-99"
                      label="99"
                      className="h-16"
                      labelToken={getShadesLabelToken(99)}
                    />
                    <PaletteColor
                      token="secondary-100"
                      label="100"
                      className="h-16"
                      borderRadius="rounded-r-md"
                      labelToken={getShadesLabelToken(100)}
                    />
                  </div>
                </div>

                {/* Accent/Tertiary Shades */}
                <div className="space-y-1 mt-8">
                  <div className="text-sm font-medium">Accent</div>
                  <div className="grid grid-cols-[repeat(18,minmax(0,1fr))] gap-0">
                    <PaletteColor
                      token="accent-0"
                      label="0"
                      className="h-16"
                      borderRadius="rounded-l-md"
                      labelToken={getShadesLabelToken(0)}
                    />
                    <PaletteColor
                      token="accent-5"
                      label="5"
                      className="h-16"
                      labelToken={getShadesLabelToken(5)}
                    />
                    <PaletteColor
                      token="accent-10"
                      label="10"
                      className="h-16"
                      labelToken={getShadesLabelToken(10)}
                    />
                    <PaletteColor
                      token="accent-15"
                      label="15"
                      className="h-16"
                      labelToken={getShadesLabelToken(15)}
                    />
                    <PaletteColor
                      token="accent-20"
                      label="20"
                      className="h-16"
                      labelToken={getShadesLabelToken(20)}
                    />
                    <PaletteColor
                      token="accent-25"
                      label="25"
                      className="h-16"
                      labelToken={getShadesLabelToken(25)}
                    />
                    <PaletteColor
                      token="accent-30"
                      label="30"
                      className="h-16"
                      labelToken={getShadesLabelToken(30)}
                    />
                    <PaletteColor
                      token="accent-35"
                      label="35"
                      className="h-16"
                      labelToken={getShadesLabelToken(35)}
                    />
                    <PaletteColor
                      token="accent-40"
                      label="40"
                      className="h-16"
                      labelToken={getShadesLabelToken(40)}
                    />
                    <PaletteColor
                      token="accent-50"
                      label="50"
                      className="h-16"
                      labelToken={getShadesLabelToken(50)}
                    />
                    <PaletteColor
                      token="accent-60"
                      label="60"
                      className="h-16"
                      labelToken={getShadesLabelToken(60)}
                    />
                    <PaletteColor
                      token="accent-70"
                      label="70"
                      className="h-16"
                      labelToken={getShadesLabelToken(70)}
                    />
                    <PaletteColor
                      token="accent-80"
                      label="80"
                      className="h-16"
                      labelToken={getShadesLabelToken(80)}
                    />
                    <PaletteColor
                      token="accent-90"
                      label="90"
                      className="h-16"
                      labelToken={getShadesLabelToken(90)}
                    />
                    <PaletteColor
                      token="accent-95"
                      label="95"
                      className="h-16"
                      labelToken={getShadesLabelToken(95)}
                    />
                    <PaletteColor
                      token="accent-98"
                      label="98"
                      className="h-16"
                      labelToken={getShadesLabelToken(98)}
                    />
                    <PaletteColor
                      token="accent-99"
                      label="99"
                      className="h-16"
                      labelToken={getShadesLabelToken(99)}
                    />
                    <PaletteColor
                      token="accent-100"
                      label="100"
                      className="h-16"
                      borderRadius="rounded-r-md"
                      labelToken={getShadesLabelToken(100)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {colorShadesPreset === ColorShadesPresetEnum.tailwind && (
            <div className="mt-8 space-y-8">
              <div className="space-y-1">
                {/* Primary Shades */}
                <div className="space-y-1">
                  <div className="text-sm font-medium">Primary</div>
                  <div className="grid grid-cols-[repeat(11,minmax(0,1fr))] gap-0">
                    <PaletteColor
                      token="primary-50"
                      label="50"
                      className="h-16"
                      borderRadius="rounded-l-md"
                      labelToken={getTailwindShadesLabelToken(50)}
                    />
                    <PaletteColor
                      token="primary-100"
                      label="100"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(100)}
                    />
                    <PaletteColor
                      token="primary-200"
                      label="200"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(200)}
                    />
                    <PaletteColor
                      token="primary-300"
                      label="300"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(300)}
                    />
                    <PaletteColor
                      token="primary-400"
                      label="400"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(400)}
                    />
                    <PaletteColor
                      token="primary-500"
                      label="500"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(500)}
                    />
                    <PaletteColor
                      token="primary-600"
                      label="600"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(600)}
                    />
                    <PaletteColor
                      token="primary-700"
                      label="700"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(700)}
                    />
                    <PaletteColor
                      token="primary-800"
                      label="800"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(800)}
                    />
                    <PaletteColor
                      token="primary-900"
                      label="900"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(900)}
                    />
                    <PaletteColor
                      token="primary-950"
                      label="950"
                      className="h-16"
                      borderRadius="rounded-r-md"
                      labelToken={getTailwindShadesLabelToken(950)}
                    />
                  </div>
                </div>

                {/* Secondary Shades */}
                <div className="space-y-1 mt-8">
                  <div className="text-sm font-medium">Secondary</div>
                  <div className="grid grid-cols-[repeat(11,minmax(0,1fr))] gap-0">
                    <PaletteColor
                      token="secondary-50"
                      label="50"
                      className="h-16"
                      borderRadius="rounded-l-md"
                      labelToken={getTailwindShadesLabelToken(50)}
                    />
                    <PaletteColor
                      token="secondary-100"
                      label="100"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(100)}
                    />
                    <PaletteColor
                      token="secondary-200"
                      label="200"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(200)}
                    />
                    <PaletteColor
                      token="secondary-300"
                      label="300"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(300)}
                    />
                    <PaletteColor
                      token="secondary-400"
                      label="400"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(400)}
                    />
                    <PaletteColor
                      token="secondary-500"
                      label="500"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(500)}
                    />
                    <PaletteColor
                      token="secondary-600"
                      label="600"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(600)}
                    />
                    <PaletteColor
                      token="secondary-700"
                      label="700"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(700)}
                    />
                    <PaletteColor
                      token="secondary-800"
                      label="800"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(800)}
                    />
                    <PaletteColor
                      token="secondary-900"
                      label="900"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(900)}
                    />
                    <PaletteColor
                      token="secondary-950"
                      label="950"
                      className="h-16"
                      borderRadius="rounded-r-md"
                      labelToken={getTailwindShadesLabelToken(950)}
                    />
                  </div>
                </div>

                {/* Accent Shades */}
                <div className="space-y-1 mt-8">
                  <div className="text-sm font-medium">Accent</div>
                  <div className="grid grid-cols-[repeat(11,minmax(0,1fr))] gap-0">
                    <PaletteColor
                      token="accent-50"
                      label="50"
                      className="h-16"
                      borderRadius="rounded-l-md"
                      labelToken={getTailwindShadesLabelToken(50)}
                    />
                    <PaletteColor
                      token="accent-100"
                      label="100"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(100)}
                    />
                    <PaletteColor
                      token="accent-200"
                      label="200"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(200)}
                    />
                    <PaletteColor
                      token="accent-300"
                      label="300"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(300)}
                    />
                    <PaletteColor
                      token="accent-400"
                      label="400"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(400)}
                    />
                    <PaletteColor
                      token="accent-500"
                      label="500"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(500)}
                    />
                    <PaletteColor
                      token="accent-600"
                      label="600"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(600)}
                    />
                    <PaletteColor
                      token="accent-700"
                      label="700"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(700)}
                    />
                    <PaletteColor
                      token="accent-800"
                      label="800"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(800)}
                    />
                    <PaletteColor
                      token="accent-900"
                      label="900"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(900)}
                    />
                    <PaletteColor
                      token="accent-950"
                      label="950"
                      className="h-16"
                      borderRadius="rounded-r-md"
                      labelToken={getTailwindShadesLabelToken(950)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {colorShadesPreset === ColorShadesPresetEnum.bootstrap && (
            <div className="mt-8 space-y-8">
              <div className="space-y-1">
                {/* Primary Shades */}
                <div className="space-y-1">
                  <div className="text-sm font-medium">Primary</div>
                  <div className="grid grid-cols-[repeat(9,minmax(0,1fr))] gap-0">
                    <PaletteColor
                      token="primary-100"
                      label="100"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(100)}
                      borderRadius="rounded-l-md"
                    />
                    <PaletteColor
                      token="primary-200"
                      label="200"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(200)}
                    />
                    <PaletteColor
                      token="primary-300"
                      label="300"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(300)}
                    />
                    <PaletteColor
                      token="primary-400"
                      label="400"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(400)}
                    />
                    <PaletteColor
                      token="primary-500"
                      label="500"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(500)}
                    />
                    <PaletteColor
                      token="primary-600"
                      label="600"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(600)}
                    />
                    <PaletteColor
                      token="primary-700"
                      label="700"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(700)}
                    />
                    <PaletteColor
                      token="primary-800"
                      label="800"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(800)}
                    />
                    <PaletteColor
                      token="primary-900"
                      label="900"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(900)}
                      borderRadius="rounded-r-md"
                    />
                  </div>
                </div>

                {/* Secondary Shades */}
                <div className="space-y-1 mt-8">
                  <div className="text-sm font-medium">Secondary</div>
                  <div className="grid grid-cols-[repeat(9,minmax(0,1fr))] gap-0">
                    <PaletteColor
                      token="secondary-100"
                      label="100"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(100)}
                      borderRadius="rounded-l-md"
                    />
                    <PaletteColor
                      token="secondary-200"
                      label="200"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(200)}
                    />
                    <PaletteColor
                      token="secondary-300"
                      label="300"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(300)}
                    />
                    <PaletteColor
                      token="secondary-400"
                      label="400"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(400)}
                    />
                    <PaletteColor
                      token="secondary-500"
                      label="500"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(500)}
                    />
                    <PaletteColor
                      token="secondary-600"
                      label="600"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(600)}
                    />
                    <PaletteColor
                      token="secondary-700"
                      label="700"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(700)}
                    />
                    <PaletteColor
                      token="secondary-800"
                      label="800"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(800)}
                    />
                    <PaletteColor
                      token="secondary-900"
                      label="900"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(900)}
                      borderRadius="rounded-r-md"
                    />
                  </div>
                </div>

                {/* Accent Shades */}
                <div className="space-y-1 mt-8">
                  <div className="text-sm font-medium">Accent</div>
                  <div className="grid grid-cols-[repeat(9,minmax(0,1fr))] gap-0">
                    <PaletteColor
                      token="accent-100"
                      label="100"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(100)}
                      borderRadius="rounded-l-md"
                    />
                    <PaletteColor
                      token="accent-200"
                      label="200"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(200)}
                    />
                    <PaletteColor
                      token="accent-300"
                      label="300"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(300)}
                    />
                    <PaletteColor
                      token="accent-400"
                      label="400"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(400)}
                    />
                    <PaletteColor
                      token="accent-500"
                      label="500"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(500)}
                    />
                    <PaletteColor
                      token="accent-600"
                      label="600"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(600)}
                    />
                    <PaletteColor
                      token="accent-700"
                      label="700"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(700)}
                    />
                    <PaletteColor
                      token="accent-800"
                      label="800"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(800)}
                    />
                    <PaletteColor
                      token="accent-900"
                      label="900"
                      className="h-16"
                      labelToken={getTailwindShadesLabelToken(900)}
                      borderRadius="rounded-r-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
