import clsx from "clsx";
import { useContext } from "react";
import { sentenceCase } from "~/lib/string"
import { PaletteContext } from "~/PaletteContext";

const hints = {
  "neutral-100": "Default background",
  "neutral-200": "Secondary background, decorative border.",
  "neutral-300": "Decorative border",
  "neutral-400": "Field border",
  "neutral-600": "Disabled text",
  "neutral-700": "Control border (switch, checkbox, radio)",
  "neutral-800": "Secondary text",
  "neutral-900": "Text",
  "neutral-950": "Heading",
  ...Object.fromEntries(
    ["accent", "success", "warning", "error", "info", "primary", "secondary"].flatMap((palette) => [
      [`${palette}-100`, "Muted background"],
      [`${palette}-500`, "Component background (default), Text"],
      [`${palette}-600`, "Component background (hover)"],
      [`${palette}-700`, "Component background (active)"],
    ])
  ),
};


export const ColorPaletteShades = ({ colors }: { colors: string[] }) => {
  const { palette } = useContext(PaletteContext);

  if (!palette) {
    return null;
  }
    
  const colorMap = colors.reduce((acc, color) => {
    acc[color] = sentenceCase(color);
    return acc;
  }, {} as Record<string, string>);
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-x-2 gap-y-4 sm:grid-cols-1 space-y-20 mb-20">
      {colors.map((color) => {
        return (
          <div key={color} className="2xl:contents">
            <div className="grid mt-3 grid-cols-1 sm:grid-cols-11 gap-y-8 gap-x-2 sm:mt-2 2xl:mt-0">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((variant) => {
                const hint: string | undefined = hints[`${color}-${variant}` as keyof typeof hints];
                const textVariant = variant > 400 ? 50 : 950;
                const borderVariant = variant > 600 ? 950 : 50;
                return (
                  <div key={`${color}-${variant}`} className="relative rounded-md sm:w-full ring-1 ring-inset" style={{ "--tw-ring-color": `oklch(var(--${color}-200)/10)` } as React.CSSProperties}>
                    <div
                      className={clsx("h-20 rounded-[inherit] border-b border-[0.5px] p-2 leading-tight text-xs")}
                      style={{ backgroundColor: `oklch(var(--${color}-${variant}))`, color: `oklch(var(--${color}-${textVariant}))`, borderColor: `oklch(var(--${color}-${borderVariant}))` }}
                    >
                      <div className="flex items-start flex-col justify-between">
                        <div className="text-2xl font-bold">{variant}</div>
                        <div>{palette[`${color}-${variant}`]?.name}</div>
                      </div>
                    </div>
                    {hint && (
                      <div className="absolute bottom-0 left-1/2 flex w-full -translate-x-1/2 translate-y-full flex-col items-center justify-center p-2">
                        <div className="h-3 w-px" style={{ backgroundColor: "oklch(var(--neutral-800))" }} />
                        <p className="w-full text-center text-xs text-neutral">{hint}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  )
}