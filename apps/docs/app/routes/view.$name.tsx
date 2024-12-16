import { useParams } from "@remix-run/react";
import { startTransition, useEffect, useState } from "react";
import { BlocksMap } from "~/components/blocks/blocks-map";

export default function Page() {
    const { name } = useParams<{ name: string }>();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        startTransition(() => {
            setMounted(true);
        });
    }, []);
    if (!name) return null;

    const item = BlocksMap[name as keyof typeof BlocksMap];
    const Component = item.component;

    if (!mounted) return null;

    return <Component />;
}