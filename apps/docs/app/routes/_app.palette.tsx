import { NavLink, useLoaderData } from '@remix-run/react';
import { LoaderFunctionArgs } from '@vercel/remix';
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '~/components/PageHeader';
import {
  BASE_TOKENS,
  STATUS_TOKENS,
} from '~/components/palette/PaletteToolbar';
import { TokenColorPalette } from '~/components/palette/TokenColorPalette';
import { Button } from '~/components/ui/button';
import { loader as favouritesLoader } from '~/routes/kfavourites';

export const loader = favouritesLoader;

export default function Page() {
  const { palettes } = useLoaderData<typeof favouritesLoader>();
  console.dir(palettes, { depth: null });

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>All your color shades</PageHeaderHeading>
        <PageHeaderDescription>
          Here you can find all the color shades used in the palette.
        </PageHeaderDescription>
        <PageActions>
          <Button asChild size="sm">
            <NavLink to="/examples">Examples</NavLink>
          </Button>
          <Button asChild size="sm" variant="ghost">
            <NavLink to="/blocks">Browse Blocks</NavLink>
          </Button>
        </PageActions>
      </PageHeader>

      <div className="container mt-8 flex flex-col gap-y-4">
        {[...BASE_TOKENS, ...STATUS_TOKENS].map((token) => (
          <TokenColorPalette token={token} key={token} />
        ))}
      </div>
    </>
  );
}
