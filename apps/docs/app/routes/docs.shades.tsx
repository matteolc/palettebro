import { defaultThemes } from "@repo/tailwind-theme";
import { usePalette } from "@repo/theme-generator/palettes";
import { ColorPaletteContainer } from "@repo/ui/Palette";
import { useTheme } from "~/hooks/use-theme";

export default function Page() {
  const theme = useTheme();
  const palette = usePalette(defaultThemes[theme]);

  return (
    <div className="grid grid-cols-1 space-y-20 mb-20">
      <ColorPaletteContainer
        palette={palette}
        colors={["primary", "secondary", "accent", "neutral"]}
      />
      <ColorPaletteContainer palette={palette} colors={["info", "success", "warning", "error"]} />
    </div>
  )
}

