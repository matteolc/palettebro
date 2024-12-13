import { ColorPaletteShades } from "~/components/ColorPaletteShades";

export default function Page() {
  return (
    <div className="grid grid-cols-1 space-y-20 mb-20">
      <ColorPaletteShades
        colors={["primary", "secondary", "accent", "neutral"]}
      />
      <ColorPaletteShades colors={["info", "success", "warning", "error"]} />
    </div>
  )
}

