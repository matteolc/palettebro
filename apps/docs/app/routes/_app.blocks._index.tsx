import { BlockDisplay } from "~/components/blocks/block-display"
import { BlocksMap } from "~/components/blocks/blocks-map"

const FEATURED_BLOCKS: string[] = ["login-01"]

export default function Page() {
    return (
        <div>
        {FEATURED_BLOCKS.map((block) => (
          <div
            key={block}
            className="border-grid border-b py-8 first:pt-6 last:border-b-0 md:py-12"
          >
            <BlockDisplay item={BlocksMap[block as keyof typeof BlocksMap]} />
          </div>
        ))}
      </div>
    )
}