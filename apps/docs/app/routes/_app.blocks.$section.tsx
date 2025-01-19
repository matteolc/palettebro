import { useParams } from '@remix-run/react';
import type {
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@vercel/remix';
import { BlockDisplay } from '~/components/blocks/block-display';
import { BlocksMap } from '~/components/blocks/blocks-map';

import { generateMeta } from '~/utils/meta-utils';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const category = data?.category || '';
  const title = `${category.charAt(0).toUpperCase() + category.slice(1)} Blocks`;

  return generateMeta({
    title,
    description: `Explore our collection of ${category} UI blocks and components. Test your color palettes with real-world ${category} examples.`,
  });
};

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  const { category } = params;
  return { category };
};

export default function Page() {
  const { section } = useParams<{ section: string }>();
  if (!section) return null;

  const items = Object.entries(BlocksMap).filter(
    ([, item]) => item.section === section,
  );
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
  );
}
