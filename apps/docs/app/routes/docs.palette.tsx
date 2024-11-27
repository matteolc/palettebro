import { defaultThemes } from "@repo/tailwind-theme";
import { usePalette } from "@repo/theme-generator/palettes";
import { useTheme } from "~/hooks/use-theme";

const PaletteItem = ({ token, color, name }: { token: string, color: string, name: string }) => (
  <div
    className="flex items-center justify-center py-4 px-4 first:rounded-tl-md first:rounded-bl-md last:rounded-tr-md last:rounded-br-md"
    style={{ backgroundColor: `oklch(var(--${token}))` }}
  >
    <div style={{ color: `oklch(var(--on-${token}))` }} className="flex flex-col items-center">
      <span
        className="text-xl sm:text-2xl font-bold text-center"
        style={{ color: `oklch(var(--on-${token}))` }}
      >
        {name}
      </span>
      <span className="text-sm sm:text-base font-normal text-center">
        {color}
      </span>
    </div>
  </div>
);

export default function Palette() {
  const theme = useTheme();
  const palette = usePalette(defaultThemes[theme]);

  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 max-w-full h-full">
      <div className="grid grid-col grid-cols-4 sm:grid-row">
        {(["primary", "secondary", "accent", "neutral"] as const).map((key) => (
          <PaletteItem key={key} token={key} color={palette[key]?.color} name={palette[key]?.name} />
        ))}
      </div>
      <div className="grid grid-col grid-cols-4 sm:grid-row">
        {(["info", "success", "warning", "error"] as const).map((key) => (
          <PaletteItem key={key} token={key} color={palette[key]?.color} name={palette[key]?.name} />
        ))}
      </div>
    </div>
  )

}
