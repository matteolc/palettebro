import { BASE_TOKENS, STATUS_TOKENS } from "~/components/PaletteToolbar";
import { TokenColorPalette } from "~/components/TokenColorPalette";

export default function Page() {
  return (
    <div className="container mx-auto">
      {BASE_TOKENS.map((token) => (
        <TokenColorPalette token={token} key={token} />
      ))}
      {STATUS_TOKENS.map((token) => (
        <TokenColorPalette token={token} key={token} />
      ))}
    </div>
  )
}

