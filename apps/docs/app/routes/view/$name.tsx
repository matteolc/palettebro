import { useParams } from 'react-router';
import { startTransition, useEffect, useState } from 'react';
import { BlocksMap } from '~/components/blocks/blocks-map';
import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = ({ params }) => {
  const blockName = params.name;
  const block = BlocksMap[blockName as keyof typeof BlocksMap];
  
  return [
    { title: `${block?.name || blockName} - Building Blocks for the Web` },
    { description: block?.description || `Interactive example of the ${blockName} building block for the web` },
  ];
};

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
