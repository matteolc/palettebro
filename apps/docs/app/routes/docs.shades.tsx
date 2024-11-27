import { ColorPaletteContainer } from "@repo/ui/Palette";

export default function Page() {
  return (
    <div className="grid grid-cols-1 space-y-20 mb-20">
      <ColorPaletteContainer
        colors={["primary", "secondary", "accent", "neutral"]}
      />
      <ColorPaletteContainer colors={["info", "success", "warning", "error"]} />
    </div>
  )
}

