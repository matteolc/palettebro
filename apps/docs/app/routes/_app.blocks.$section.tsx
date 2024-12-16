import { useParams } from "@remix-run/react";
import { BlockDisplay } from "~/components/blocks/block-display";
import {  BlocksMap } from "~/components/blocks/blocks-map";

export default function Page() {
    const { section } = useParams<{ section: string }>();
    if (!section) return null;

    const items = Object.entries(BlocksMap).filter(([, item]) => item.section === section);
    return (
        <div>
            {items.map(([key, item]) => (
                <div
                    key={key}
                    className="border-grid border-b py-8 first:pt-6 last:border-b-0 md:py-12"
                >
                    <BlockDisplay item={item} />
                </div>
            ))}
        </div>
    )
}