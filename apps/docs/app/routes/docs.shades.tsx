import { ColorPaletteShades } from "~/components/ColorPaletteShades";
import { useContext } from "react";
import { PaletteContext } from "~/PaletteContext";

export default function Page() {
  const { palette } = useContext(PaletteContext);

  if (!palette) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 space-y-20 mb-20">
      <ColorPaletteShades
        palette={palette}
        colors={["primary", "secondary", "accent", "neutral"]}
      />
      <ColorPaletteShades palette={palette} colors={["info", "success", "warning", "error"]} />
    </div>
  )
}

