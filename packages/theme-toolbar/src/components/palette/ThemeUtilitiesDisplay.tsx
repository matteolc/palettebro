import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { PaletteColor } from './PaletteColor';

export const ThemeUtilitiesDisplay = () => {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>
          <h3 className="text-xl font-bold">Utility Classes</h3>
          <p className="text-sm text-outline max-w-2xl">
            Default utility classes used across the theme for consistent styling
            of common UI elements.
          </p>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Background and Foreground */}
          <div className="grid grid-cols-5 gap-4 grid-rows-2">
            <div className="col-span-1 flex flex-col">
              <PaletteColor
                token="background"  
                labelToken="on-background"
                label="Background"
                borderRadius="rounded-t-md"
              />
              <PaletteColor
                token="on-background"
                label="Foreground"
                labelToken="background"
                borderRadius="rounded-b-md"
                className="h-16"
              />
            </div>
            {/* Card */}
            <div className="col-span-1 flex flex-col">
              <PaletteColor
                token="surface-container-low"
                label="Card"
                labelToken="on-surface"
                borderRadius="rounded-t-md"
              />
              <PaletteColor
                token="on-surface"
                label="Card Foreground"
                labelToken="surface"
                borderRadius="rounded-b-md"
                className="h-16"
              />
            </div>
            {/* Popover */}
            <div className="col-span-1 flex flex-col">
              <PaletteColor
                token="surface-container-lowest"
                label="Popover"
                labelToken="on-surface"
                borderRadius="rounded-t-md"
              />
              <PaletteColor
                token="on-surface"
                label="Popover Foreground"
                labelToken="surface"
                borderRadius="rounded-b-md"
                className="h-16"
              />
            </div>

            {/* Muted */}
            <div className="col-span-1 flex flex-col">
              <PaletteColor
                token="on-secondary"
                label="Muted"
                labelToken="secondary"
                borderRadius="rounded-t-md"
              />
              <PaletteColor
                token="secondary"
                label="Muted Foreground"
                labelToken="on-secondary"
                borderRadius="rounded-b-md"
                className="h-16"
              />
            </div>

            {/* Destructive */}
            <div className="col-span-1 flex flex-col">
              <PaletteColor
                token="error"
                label="Destructive"
                labelToken="on-error"
                borderRadius="rounded-t-md"
              />
              <PaletteColor
                token="on-error"
                label="Destructive Foreground"
                labelToken="error"
                borderRadius="rounded-b-md"
                className="h-16"
              />
            </div>

            <div className="grid grid-cols-4 col-span-4 gap-0">
              {/* Sidebar */}
              <div className="col-span-1 flex flex-col">
                <PaletteColor
                  token="surface-container"
                  label="Sidebar"
                  labelToken="on-surface"
                  borderRadius="rounded-tl-md"
                />
                <PaletteColor
                  token="on-surface"
                  label="Sidebar Foreground"
                  labelToken="surface"
                  borderRadius="rounded-bl-md"
                  className="h-16"
                />
              </div>
              <div className="col-span-1 flex flex-col">
                <PaletteColor
                  token="surface-container-high"
                  label="Sidebar Border"
                  labelToken="on-surface"
                />
                <PaletteColor
                  token="outline-variant"
                  label="Sidebar Ring"
                  labelToken="on-surface"
                  className="h-16"
                />
              </div>
              <div className="col-span-1 flex flex-col">
                <PaletteColor
                  token="primary"
                  label="Sidebar Primary"
                  labelToken="on-primary"
                />
                <PaletteColor
                  token="on-primary"
                  label="Sidebar Primary FG"
                  labelToken="primary"
                  className="h-16"
                />
              </div>
              <div className="col-span-1 flex flex-col">
                <PaletteColor
                  token="accent"
                  label="Sidebar Accent"
                  labelToken="on-accent"
                  borderRadius="rounded-tr-md"
                />
                <PaletteColor
                  token="on-accent"
                  label="Sidebar Accent FG"
                  labelToken="accent"
                  borderRadius="rounded-br-md"
                  className="h-16"
                />
              </div>
            </div>
            {/* Border and Ring */}
            <div className="col-span-1">
              <div className="grid grid-rows-3 gap-0">
                <PaletteColor
                  token="surface-container-high"
                  label="Border"
                  labelToken="on-background"
                  borderRadius="rounded-t-md"
                  className="h-16"
                />
                <PaletteColor
                  token="outline-variant"
                  label="Ring"
                  labelToken="on-background"
                  className="h-16"
                />
                <PaletteColor
                  token="outline"
                  label="Input"
                  labelToken="on-background"
                  borderRadius="rounded-b-md"
                  className="h-16"
                />
              </div>
            </div>
          </div>

          {/* Chart Colors */}
          <div className="space-y-1">
            <div className="grid grid-cols-11 gap-0">
              <PaletteColor
                token="primary-rainbow-0"
                label="Chart 1"
                labelToken="background"
                borderRadius="rounded-l-md"
                className="h-16"
              />
              <PaletteColor
                token="primary-rainbow-1"
                label="Chart 2"
                labelToken="background"
                className="h-16"
              />
              <PaletteColor
                token="primary-rainbow-2"
                label="Chart 3"
                labelToken="background"
                className="h-16"
              />
              <PaletteColor
                token="primary-rainbow-3"
                label="Chart 4"
                labelToken="background"
                className="h-16"
              />
              <PaletteColor
                token="primary-rainbow-4"
                label="Chart 5"
                labelToken="background"
                className="h-16"
              />
              <PaletteColor
                token="primary-rainbow-5"
                label="Chart 6"
                labelToken="background"
                className="h-16"
              />
              <PaletteColor
                token="primary-rainbow-6"
                label="Chart 7"
                labelToken="background"
                className="h-16"
              />
              <PaletteColor
                token="primary-rainbow-7"
                label="Chart 8"
                labelToken="background"
                className="h-16"
              />
              <PaletteColor
                token="primary-rainbow-8"
                label="Chart 9"
                labelToken="background"
                className="h-16"
              />
              <PaletteColor
                token="primary-rainbow-9"
                label="Chart 10"
                labelToken="background"
                className="h-16"
              />
              <PaletteColor
                token="primary-rainbow-10"
                label="Chart 11"
                labelToken="background"
                className="h-16"
                borderRadius="rounded-r-md"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
