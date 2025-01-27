import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { PaletteColorWithClassNames } from './PaletteColorWithClassNames';

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
              <PaletteColorWithClassNames
                token="background"
                bgClassName="bg-background"
                labelClassName="text-foreground"
                label="Background"
                borderRadius="rounded-t-md"
              />
              <PaletteColorWithClassNames
                token="on-background"
                label="Foreground"
                bgClassName="bg-foreground"
                labelClassName="text-background"
                borderRadius="rounded-b-md"
                className="h-16"
              />
            </div>
            {/* Card */}
            <div className="col-span-1 flex flex-col">
              <PaletteColorWithClassNames
                token="surface-container-low"
                label="Card"
                bgClassName="bg-card"
                labelClassName="text-card-foreground"
                borderRadius="rounded-t-md"
              />
              <PaletteColorWithClassNames
                token="on-surface"
                label="Card Foreground"
                bgClassName="bg-card-foreground"
                labelClassName="text-card"
                borderRadius="rounded-b-md"
                className="h-16"
              />
            </div>
            {/* Popover */}
            <div className="col-span-1 flex flex-col">
              <PaletteColorWithClassNames
                token="surface-container-lowest"
                label="Popover"
                bgClassName="bg-popover"
                labelClassName="text-popover-foreground"
                borderRadius="rounded-t-md"
              />
              <PaletteColorWithClassNames
                token="on-surface"
                label="Popover Foreground"
                bgClassName="bg-popover-foreground"
                labelClassName="text-popover"
                borderRadius="rounded-b-md"
                className="h-16"
              />
            </div>

            {/* Muted */}
            <div className="col-span-1 flex flex-col">
              <PaletteColorWithClassNames
                token="on-secondary"
                label="Muted"
                bgClassName="bg-muted"
                labelClassName="text-muted-foreground"
                borderRadius="rounded-t-md"
              />
              <PaletteColorWithClassNames
                token="secondary"
                label="Muted Foreground"
                bgClassName="bg-muted-foreground"
                labelClassName="text-muted"
                borderRadius="rounded-b-md"
                className="h-16"
              />
            </div>

            {/* Destructive */}
            <div className="col-span-1 flex flex-col">
              <PaletteColorWithClassNames
                token="error"
                label="Destructive"
                bgClassName="bg-destructive"
                labelClassName="text-destructive-foreground"
                borderRadius="rounded-t-md"
              />
              <PaletteColorWithClassNames
                token="on-error"
                label="Destructive Foreground"
                bgClassName="bg-destructive-foreground"
                labelClassName="text-destructive"
                borderRadius="rounded-b-md"
                className="h-16"
              />
            </div>

            <div className="grid grid-cols-4 col-span-4 gap-0">
              {/* Sidebar */}
              <div className="col-span-1 flex flex-col">
                <PaletteColorWithClassNames
                  token="surface-container"
                  label="Sidebar"
                  labelClassName="text-sidebar-foreground"
                  bgClassName="bg-sidebar"
                  borderRadius="rounded-tl-md"
                />
                <PaletteColorWithClassNames
                  token="on-surface"
                  label="Sidebar Foreground"
                  bgClassName="bg-sidebar-foreground"
                  labelClassName="text-sidebar"
                  borderRadius="rounded-bl-md"
                  className="h-16"
                />
              </div>
              <div className="col-span-1 flex flex-col">
                <PaletteColorWithClassNames
                  token="surface-container-high"
                  label="Sidebar Border"
                  labelClassName="text-sidebar-foreground"
                  bgClassName="bg-sidebar-border"
                />
                <PaletteColorWithClassNames
                  token="outline-variant"
                  label="Sidebar Ring"
                  labelClassName="text-sidebar-foreground"
                  bgClassName="bg-sidebar-ring"
                  className="h-16"
                />
              </div>
              <div className="col-span-1 flex flex-col">
                <PaletteColorWithClassNames
                  token="primary"
                  label="Sidebar Primary"
                  labelClassName="text-sidebar-primary-foreground"
                  bgClassName="bg-sidebar-primary"
                />
                <PaletteColorWithClassNames
                  token="on-primary"
                  label="Sidebar Primary FG"
                  labelClassName="text-sidebar-primary"
                  bgClassName="bg-sidebar-primary-foreground"
                  className="h-16"
                />
              </div>
              <div className="col-span-1 flex flex-col">
                <PaletteColorWithClassNames
                  token="accent"
                  label="Sidebar Accent"
                  labelClassName="text-sidebar-accent-foreground"
                  bgClassName="bg-sidebar-accent"
                  borderRadius="rounded-tr-md"
                />
                <PaletteColorWithClassNames
                  token="on-accent"
                  label="Sidebar Accent FG"
                  bgClassName="bg-sidebar-accent-foreground"
                  labelClassName="text-sidebar-accent"
                  borderRadius="rounded-br-md"
                  className="h-16"
                />
              </div>
            </div>
            {/* Border and Ring */}
            <div className="col-span-1">
              <div className="grid grid-rows-3 gap-0">
                <PaletteColorWithClassNames
                  token="surface-container-high"
                  label="Border"
                  bgClassName="bg-border"
                  labelClassName="text-foreground"
                  borderRadius="rounded-t-md"
                  className="h-16"
                />
                <PaletteColorWithClassNames
                  token="outline-variant"
                  label="Ring"
                  bgClassName="bg-ring"
                  labelClassName="text-foreground"
                  className="h-16"
                />
                <PaletteColorWithClassNames
                  token="outline"
                  label="Input"
                  bgClassName="bg-input"
                  labelClassName="text-foreground"
                  borderRadius="rounded-b-md"
                  className="h-16"
                />
              </div>
            </div>
          </div>

          {/* Chart Colors */}
          <div className="space-y-1">
            <div className="grid grid-cols-11 gap-0">
              <PaletteColorWithClassNames
                token="primary-rainbow-0"
                label="Chart 1"
                labelClassName="text-on-primary"
                bgClassName="bg-chart-1"
                borderRadius="rounded-l-md"
                className="h-16"
              />
              <PaletteColorWithClassNames
                token="primary-rainbow-1"
                label="Chart 2"
                labelClassName="text-on-primary"
                bgClassName="bg-chart-2"
                className="h-16"
              />
              <PaletteColorWithClassNames
                token="primary-rainbow-2"
                label="Chart 3"
                labelClassName="text-on-primary"
                bgClassName="bg-chart-3"
                className="h-16"
              />
              <PaletteColorWithClassNames
                token="primary-rainbow-3"
                label="Chart 4"
                labelClassName="text-on-primary"
                bgClassName="bg-chart-4"
                className="h-16"
              />
              <PaletteColorWithClassNames
                token="primary-rainbow-4"
                label="Chart 5"
                labelClassName="text-on-primary"
                bgClassName="bg-chart-5"
                className="h-16"
              />
              <PaletteColorWithClassNames
                token="primary-rainbow-5"
                label="Chart 6"
                labelClassName="text-on-primary"
                bgClassName="bg-chart-6"
                className="h-16"
              />
              <PaletteColorWithClassNames
                token="primary-rainbow-6"
                label="Chart 7"
                labelClassName="text-on-primary"
                bgClassName="bg-chart-7"
                className="h-16"
              />
              <PaletteColorWithClassNames
                token="primary-rainbow-7"
                label="Chart 8"
                labelClassName="text-on-primary"
                bgClassName="bg-chart-8"
                className="h-16"
              />
              <PaletteColorWithClassNames
                token="primary-rainbow-8"
                label="Chart 9"
                labelClassName="text-on-primary"
                bgClassName="bg-chart-9"
                className="h-16"
              />
              <PaletteColorWithClassNames
                token="primary-rainbow-9"
                label="Chart 10"
                labelClassName="text-on-primary"
                bgClassName="bg-chart-10"
                className="h-16"
              />
              <PaletteColorWithClassNames
                token="primary-rainbow-10"
                label="Chart 11"
                labelClassName="text-on-primary"
                bgClassName="bg-chart-11"
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
