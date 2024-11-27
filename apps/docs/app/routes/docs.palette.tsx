import { defaultThemes } from "@repo/tailwind-theme";
import { usePalette } from "@repo/theme-generator/palettes";
import { useTheme } from "~/hooks/use-theme";

export default function Palette() {
  const theme = useTheme();
  const palette = usePalette(defaultThemes[theme]);

  console.dir({ theme, palette }, { depth: null });

  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 max-w-full h-full">
      <div className="grid grid-col grid-cols-4 sm:grid-row">
        {(["primary", "secondary", "accent", "neutral"] as const).map((key) => (
          <div
            key={key}
            className="flex items-center justify-center py-4 px-4"
            style={{ backgroundColor: `oklch(var(--${key}))` }}
          >
            <div style={{ color: `oklch(var(--on-${key}))` }} className="flex flex-col items-center">
              <span
                className="text-xl sm:text-2xl font-bold"
                style={{ color: `oklch(var(--on-${key}))` }}
              >
                {palette[key]?.color}
              </span>
              <span className="text-sm sm:text-base font-normal text-center">
                {palette[key]?.name}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-col grid-cols-4 sm:grid-row">
        {(["info", "success", "warning", "error"] as const).map((key) => (
          <div
            key={key}
            className="flex items-center justify-center py-4 px-4"
            style={{ backgroundColor: `oklch(var(--${key}))` }}
          >
            <div style={{ color: `oklch(var(--on-${key}))` }} className="flex flex-col items-center">
              <span
                className="text-xl sm:text-2xl font-bold"
                style={{ color: `oklch(var(--on-${key}))` }}
              >
                {palette[key]?.color}
              </span>
              <span className="text-sm sm:text-base font-normal text-center">
                {palette[key]?.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

}
