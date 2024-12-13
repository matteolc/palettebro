import { BASE_TOKENS, STATUS_TOKENS } from "~/components/PaletteToolbar";
import { TokenColorPalette } from "~/components/TokenColorPalette";

export default function Page() {
  return (
    <div className="flex flex-col gap-y-4">
      {BASE_TOKENS.map((token) => (
        <TokenColorPalette token={token} key={token} />
      ))}
      {STATUS_TOKENS.map((token) => (
        <TokenColorPalette token={token} key={token} />
      ))}
    </div>
  )
}

