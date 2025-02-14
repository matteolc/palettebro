import { useParams } from 'react-router';
import type { MetaFunction } from 'react-router';
import { BlockDisplay } from '~/components/blocks/block-display';
import { BlocksMap } from '~/components/blocks/blocks-map';

import { generateMeta } from '~/utils/meta-utils';
import type { Route } from './+types/$section';

export const meta: MetaFunction = ({ data }) => {
  const category = (data as { category: string }).category || '';
  const title = `${category.charAt(0).toUpperCase() + category.slice(1)} Blocks`;

  return generateMeta({
    title,
    description: `Explore our collection of ${category} UI blocks and components. Test your color palettes with real-world ${category} examples.`,
  });
};

export const loader = async ({ params }: Route.LoaderArgs) => {
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
